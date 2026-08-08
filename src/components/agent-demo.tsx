"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import OrbScene from "@/components/orb-scene";

export type AgentDemoDict = {
  aria: string;
  tryLabel: string;
  hint: string;
  callsLeftOne: string;
  callsLeftMany: string;
  checking: string;
  connecting: string;
  live: string;
  timeLeft: string;
  endCall: string;
  ended: string;
  tryAgain: string;
  quotaExceeded: string;
  micError: string;
  serviceError: string;
};

const MAX_CALL_SECONDS = 120;
const WORKER_URL =
  process.env.NEXT_PUBLIC_DEMO_WORKER_URL ?? "https://demo.agjent038.com";

type Status = "idle" | "checking" | "starting" | "talking" | "ended";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function AgentDemo({ dict }: { dict: AgentDemoDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(MAX_CALL_SECONDS);
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<RetellWebClient | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cleanupCall = useCallback(() => {
    clearTimer();
    clientRef.current?.stopCall();
    clientRef.current = null;
  }, [clearTimer]);

  useEffect(() => {
    return () => cleanupCall();
  }, [cleanupCall]);

  useEffect(() => {
    fetch(`${WORKER_URL}/api/demo/status`, { signal: AbortSignal.timeout(8000) })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: unknown) => {
        const maybe = data as { remaining?: number } | null;
        if (maybe && typeof maybe.remaining === "number") {
          setRemaining(maybe.remaining);
        }
      })
      .catch(() => {
        // Worker unreachable; calls will surface a service error on click.
      });
  }, []);

  const startCall = useCallback(async () => {
    if (status === "talking" || status === "checking" || status === "starting") {
      return;
    }
    setError(null);

    if (remaining === 0) {
      setStatus("ended");
      return;
    }

    setStatus("checking");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setStatus("ended");
      setError(name === "NotAllowedError" || name === "SecurityError" ? dict.micError : dict.serviceError);
      return;
    }

    let tokenResponse: Response;
    try {
      tokenResponse = await fetch(`${WORKER_URL}/api/demo/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      setStatus("ended");
      setError(dict.serviceError);
      return;
    }

    if (tokenResponse.status === 429) {
      setRemaining(0);
      setStatus("ended");
      setError(dict.quotaExceeded);
      return;
    }

    let data: { accessToken?: string; remaining?: number };
    try {
      data = (await tokenResponse.json()) as { accessToken?: string; remaining?: number };
    } catch {
      setStatus("ended");
      setError(dict.serviceError);
      return;
    }

    if (!tokenResponse.ok || !data.accessToken) {
      setStatus("ended");
      setError(dict.serviceError);
      return;
    }

    if (typeof data.remaining === "number") {
      setRemaining(data.remaining);
    }

    const client = new RetellWebClient();
    clientRef.current = client;

    client.on("call_started", () => {
      setStatus("talking");
      setSecondsLeft(MAX_CALL_SECONDS);
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            cleanupCall();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });

    client.on("call_ended", () => {
      clearTimer();
      clientRef.current = null;
      setStatus((prev) => (prev === "talking" ? "ended" : prev));
      setRemaining((prev) => (prev === null ? prev : Math.max(0, prev - 1)));
    });

    client.on("error", () => {
      clearTimer();
      clientRef.current = null;
      setStatus("ended");
      setError(dict.serviceError);
    });

    setStatus("starting");
    try {
      await client.startCall({ accessToken: data.accessToken });
    } catch {
      setStatus("ended");
      setError(dict.serviceError);
    }
  }, [cleanupCall, clearTimer, dict, remaining, status]);

  const endCall = useCallback(() => {
    clientRef.current?.stopCall();
  }, []);

  const remainingLabel =
    remaining === null
      ? dict.hint
      : remaining === 0
        ? dict.quotaExceeded
        : remaining === 1
          ? dict.callsLeftOne
          : dict.callsLeftMany.replace("{n}", String(remaining));

  const idleHint = remaining === null ? dict.hint : remainingLabel;

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div
        className="group relative cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={dict.aria}
        onClick={startCall}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            startCall();
          }
        }}
      >
        <OrbScene />

        <div
          className={`pointer-events-none absolute inset-[8%] rounded-full transition-opacity duration-300 ${
            status === "talking" ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full shadow-[0_0_80px_24px_rgba(24,120,90,0.25)]" />
        </div>

        {status === "idle" ? (
          <>
            <div className="demo-call-pulse pointer-events-none absolute inset-[10%] rounded-full" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-[8%] rounded-full opacity-0 shadow-[0_0_0_6px_rgba(178,138,76,0.14)] transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
          </>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2.5">
        {status === "talking" ? (
          <div className="flex items-center gap-4 rounded-full border border-line bg-paper px-5 py-2.5 shadow-soft">
            <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {dict.live}
            </span>
            <span className="font-display text-sm tabular-nums text-navy">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-[11px] text-ink-mute">{dict.timeLeft}</span>
            <button
              type="button"
              onClick={endCall}
              className="rounded-full border border-navy/15 bg-navy px-4 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-navy-soft"
            >
              {dict.endCall}
            </button>
          </div>
        ) : (
          <div
            className={`flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-center shadow-soft ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-line bg-paper text-ink-soft"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${
                error ? "bg-red-400" : "bg-mint"
              }`}
            />
            <span className="text-[13px] font-medium">
              {error
                ? error
                : status === "checking"
                  ? dict.checking
                  : status === "starting"
                    ? dict.connecting
                    : status === "ended"
                      ? dict.ended
                      : idleHint}
            </span>
            {status === "ended" && !error && remaining !== 0 ? (
              <button
                type="button"
                onClick={startCall}
                className="text-[12px] font-medium text-navy underline underline-offset-4 hover:text-gold"
              >
                {dict.tryAgain}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
