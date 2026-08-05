"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function currency(n: number) {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

export default function RoiCalculator() {
  const t = useTranslations("Roi");
  const [state, setState] = useState({
    calls: 4000,
    missed: 28,
    value: 40,
    agents: 6,
    cost: 1000,
  });
  const [saved, setSaved] = useState<"idle" | "saving" | "done">("idle");

  const fields = [
    { key: "calls" as const, label: t("callsPerMonth"), min: 300, max: 20000, step: 100, suffix: "" },
    { key: "missed" as const, label: t("shareUnanswered"), min: 0, max: 60, step: 1, suffix: "%" },
    { key: "value" as const, label: t("avgCallValue"), min: 5, max: 300, step: 5, suffix: "€" },
    { key: "agents" as const, label: t("agentsTier1"), min: 1, max: 40, step: 1, suffix: "" },
    { key: "cost" as const, label: t("costPerAgent"), min: 500, max: 3000, step: 50, suffix: "€" },
  ];

  const result = useMemo(() => {
    const missedCalls = (state.calls * state.missed) / 100;
    const recovered = missedCalls * 0.86;
    const conversion = 0.12;
    const recoveredRevenue = recovered * conversion * state.value;

    const automationRate = 0.68;
    const tier1Calls = state.calls * 0.72;
    const automatedCalls = tier1Calls * automationRate;
    const capacityPerAgent = state.calls / Math.max(state.agents, 1);
    const agentsFreed = Math.min(
      state.agents - 1,
      automatedCalls / Math.max(capacityPerAgent, 1),
    );
    const laborSaving = Math.max(agentsFreed, 0) * state.cost;

    const plan = state.calls <= 400 ? 299 : state.calls <= 1000 ? 499 : state.calls <= 2500 ? 899 : 2400;
    const gross = recoveredRevenue + laborSaving;
    const net = gross - plan;
    const roi = plan > 0 ? (net / plan) * 100 : 0;

    return {
      missedCalls,
      recovered,
      recoveredRevenue,
      laborSaving,
      automatedCalls,
      plan,
      gross,
      net,
      roi,
      agentsFreed: Math.max(agentsFreed, 0),
    };
  }, [state]);

  async function save() {
    // Static export: no backend — just show saved state
    setSaved("saving");
    setTimeout(() => setSaved("done"), 600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-line bg-paper p-7">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink-mute">
          {t("yourOperation")}
        </p>
        <div className="mt-7 space-y-7">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor={f.key}
                  className="text-sm text-ink-soft"
                >
                  {f.label}
                </label>
                <span className="font-display text-lg text-navy">
                  {f.suffix === "€" ? "€" : ""}
                  {state[f.key].toLocaleString("en-US")}
                  {f.suffix === "%" ? "%" : ""}
                </span>
              </div>
              <input
                id={f.key}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={state[f.key]}
                onChange={(e) =>
                  setState((s) => ({ ...s, [f.key]: Number(e.target.value) }))
                }
                className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-line accent-navy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/15 bg-navy p-7 text-white">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
          {t("projectedImpact")}
        </p>

        <div className="mt-7 border-b border-white/10 pb-7">
          <p className="text-sm text-white/60">{t("netGain")}</p>
          <p className="font-display mt-2 text-5xl">{currency(result.net)}</p>
          <p className="mt-3 text-sm text-white/60">
            {Math.round(result.roi).toLocaleString("en-US")}% {t("returnOn")}{" "}
            {currency(result.plan)} {t("agjent038Plan").toLowerCase()}
          </p>
        </div>

        <dl className="mt-7 space-y-4 text-sm">
          {[
            [
              t("callsRecovered"),
              `${Math.round(result.recovered).toLocaleString("en-US")} / month`,
            ],
            [t("revenueRecovered"), currency(result.recoveredRevenue)],
            [
              t("agentCapacity"),
              `${result.agentsFreed.toFixed(1)} FTE · ${currency(result.laborSaving)}`,
            ],
            [
              t("conversationsAutomated"),
              Math.round(result.automatedCalls).toLocaleString("en-US"),
            ],
            [t("agjent038Plan"), `${currency(result.plan)} / month`],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between border-b border-white/5 pb-3"
            >
              <dt className="text-white/55">{k}</dt>
              <dd className="font-medium text-white">{v}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={save}
          disabled={saved === "saving"}
          className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-navy transition-all duration-300 hover:bg-gold-soft disabled:opacity-60"
        >
          {saved === "done"
            ? t("saved")
            : saved === "saving"
              ? t("saving")
              : t("saveEstimate")}
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/40">
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
