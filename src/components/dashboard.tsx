"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const VOLUME = [42, 55, 48, 71, 66, 84, 78, 92, 88, 96, 90, 100];
const LABELS = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

export default function Dashboard({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Dashboard");
  const [tick, setTick] = useState(0);
  const tickRef = useRef(0);

  const kpis = useMemo(() => [
    { label: t("callsAnswered"), value: "1,284", delta: "+18%", good: true },
    { label: t("containment"), value: "68%", delta: "+11 pts", good: true },
    { label: t("avgAnswer"), value: "0.4s", delta: "-6.1s", good: true },
    { label: t("missedCalls"), value: "0", delta: "-412", good: true },
  ], [t]);

  const feed = useMemo(() => t.raw("feed") as Array<{
    lang: string;
    intent: string;
    outcome: string;
    dur: string;
    tone: string;
  }>, [t]);

  const languages = useMemo(() => t.raw("languages") as Array<{ code: string; pct: number }>, [t]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      tickRef.current = (tickRef.current + 1) % feed.length;
      setTick(tickRef.current);
    }, 2600);
    return () => clearInterval(id);
  }, [feed.length, prefersReducedMotion]);

  const points = useMemo(() =>
    VOLUME.map((v, i) => `${(i / (VOLUME.length - 1)) * 100},${100 - v * 0.85}`).join(" "),
  []);

  return (
    <div
      className="tilt-card overflow-hidden rounded-2xl border border-line bg-paper shadow-lift"
      role="region"
      aria-label={t("consoleName")}
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line bg-canvas/70 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 text-xs font-medium text-ink-soft">
            {t("consoleName")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          <span className="text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            {t("live")}
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {/* KPI row */}
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="rounded-xl border border-line bg-canvas/60 p-4 transition-colors duration-300 hover:border-navy/15"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                {k.label}
              </dt>
              <dd className="font-display mt-2 text-2xl text-navy">{k.value}</dd>
              <dd className="mt-1 text-[11px] font-medium text-mint">
                {k.delta}
              </dd>
            </div>
          ))}
        </dl>

        <div
          className={`mt-4 grid gap-4 ${
            compact ? "" : "lg:grid-cols-[1.6fr_1fr]"
          }`}
        >
          {/* chart */}
          <div className="rounded-xl border border-line p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-ink">
                {t("conversationsHandled")}
              </p>
              <p className="text-[11px] text-ink-mute">{t("todayHourly")}</p>
            </div>
            <div className="relative mt-5 h-40">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full"
                role="img"
                aria-label={t("conversationsHandled")}
              >
                <title>{t("conversationsHandled")}</title>
                <defs>
                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1d3c63" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1d3c63" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[25, 50, 75].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={y}
                    y2={y}
                    stroke="#e6e5e0"
                    strokeWidth="0.4"
                  />
                ))}
                <polygon
                  points={`0,100 ${points} 100,100`}
                  fill="url(#fillGrad)"
                />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#0e2440"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="draw-line"
                />
              </svg>
              <div className="pointer-events-none absolute inset-x-0 -bottom-5 flex justify-between text-[10px] text-ink-mute">
                {LABELS.map((l, i) => (
                  <span key={l} className={i % 2 ? "opacity-0 md:opacity-100" : ""}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-line pt-4">
              <div>
                <p className="text-[11px] text-ink-mute">{t("peakConcurrency")}</p>
                <p className="mt-1 text-sm font-medium text-ink">37 calls</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-mute">{t("escalated")}</p>
                <p className="mt-1 text-sm font-medium text-ink">32%</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-mute">{t("csat")}</p>
                <p className="mt-1 text-sm font-medium text-ink">4.6 / 5</p>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="space-y-4">
            <div className="rounded-xl border border-line p-5">
              <p className="text-sm font-medium text-ink">{t("languageMix")}</p>
              <ul className="mt-4 space-y-3">
                {languages.map((l, i) => (
                  <li key={l.code}>
                    <div className="flex justify-between text-[11px] text-ink-mute">
                      <span>{l.code}</span>
                      <span>{l.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas">
                      <div
                        className="h-full rounded-full bg-navy/80 transition-[width] duration-1000 ease-out"
                        style={{
                          width: `${l.pct}%`,
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">{t("liveQueue")}</p>
                <span className="text-[11px] text-ink-mute">{t("autoRefresh")}</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {feed.map((f, i) => (
                  <li
                    key={f.intent}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[12px] transition-all duration-500 ${
                      i === tick
                        ? "bg-canvas ring-1 ring-navy/10"
                        : "bg-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-navy/5 text-[10px] font-medium text-navy">
                        {f.lang}
                      </span>
                      <span className="text-ink-soft">{f.intent}</span>
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] text-ink-mute">{f.dur}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          f.tone === "gold"
                            ? "bg-gold-soft text-[#7a5a24]"
                            : "bg-mint/10 text-mint"
                        }`}
                      >
                        {f.outcome}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
