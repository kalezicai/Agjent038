"use client";

import { useEffect, useState } from "react";

const kpis = [
  { label: "Calls answered", value: "1,284", delta: "+18%", good: true },
  { label: "Containment", value: "68%", delta: "+11 pts", good: true },
  { label: "Avg. answer", value: "0.4s", delta: "-6.1s", good: true },
  { label: "Missed calls", value: "0", delta: "-412", good: true },
];

const volume = [42, 55, 48, 71, 66, 84, 78, 92, 88, 96, 90, 100];
const labels = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

const feed = [
  {
    lang: "SQ",
    intent: "Rezervim termini",
    outcome: "Booked",
    dur: "1:12",
    tone: "mint",
  },
  {
    lang: "EN",
    intent: "Order status",
    outcome: "Resolved",
    dur: "0:48",
    tone: "mint",
  },
  {
    lang: "DE",
    intent: "Reklamation",
    outcome: "Escalated",
    dur: "2:05",
    tone: "gold",
  },
  {
    lang: "SQ",
    intent: "Informacion çmimi",
    outcome: "Resolved",
    dur: "0:39",
    tone: "mint",
  },
  {
    lang: "SR",
    intent: "Promena termina",
    outcome: "Rescheduled",
    dur: "1:27",
    tone: "mint",
  },
];

const languages = [
  { code: "Albanian", pct: 58 },
  { code: "English", pct: 19 },
  { code: "German", pct: 12 },
  { code: "Serbian", pct: 7 },
  { code: "Turkish", pct: 4 },
];

export default function Dashboard({ compact = false }: { compact?: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % feed.length), 2600);
    return () => clearInterval(id);
  }, []);

  const points = volume
    .map((v, i) => `${(i / (volume.length - 1)) * 100},${100 - v * 0.85}`)
    .join(" ");

  return (
    <div className="tilt-card overflow-hidden rounded-2xl border border-line bg-paper shadow-lift">
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line bg-canvas/70 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 text-xs font-medium text-ink-soft">
            Zana Console · Operations
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          <span className="text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            Live
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="rounded-xl border border-line bg-canvas/60 p-4 transition-colors duration-300 hover:border-navy/15"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                {k.label}
              </p>
              <p className="font-display mt-2 text-2xl text-navy">{k.value}</p>
              <p className="mt-1 text-[11px] font-medium text-mint">
                {k.delta}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-4 grid gap-4 ${
            compact ? "" : "lg:grid-cols-[1.6fr_1fr]"
          }`}
        >
          {/* chart */}
          <div className="rounded-xl border border-line p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-ink">
                Conversations handled
              </p>
              <p className="text-[11px] text-ink-mute">Today · hourly</p>
            </div>
            <div className="relative mt-5 h-40">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
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
                {labels.map((l, i) => (
                  <span key={l} className={i % 2 ? "opacity-0 md:opacity-100" : ""}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-line pt-4">
              <div>
                <p className="text-[11px] text-ink-mute">Peak concurrency</p>
                <p className="mt-1 text-sm font-medium text-ink">37 calls</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-mute">Escalated</p>
                <p className="mt-1 text-sm font-medium text-ink">32%</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-mute">CSAT</p>
                <p className="mt-1 text-sm font-medium text-ink">4.6 / 5</p>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="space-y-4">
            <div className="rounded-xl border border-line p-5">
              <p className="text-sm font-medium text-ink">Language mix</p>
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
                <p className="text-sm font-medium text-ink">Live queue</p>
                <span className="text-[11px] text-ink-mute">auto-refresh</span>
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
