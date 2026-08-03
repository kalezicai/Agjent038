import type { Metadata } from "next";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads, roiEstimates } from "@/db/schema";
import { Eyebrow } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Console — Pipeline",
  robots: { index: false, follow: false },
};

async function getData() {
  try {
    const rows = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(50);
    const [counts] = await db
      .select({
        total: sql<number>`count(*)::int`,
        week: sql<number>`count(*) filter (where created_at > now() - interval '7 days')::int`,
      })
      .from(leads);
    const [roi] = await db
      .select({
        total: sql<number>`count(*)::int`,
        avgSavings: sql<number>`coalesce(round(avg(monthly_savings)),0)::int`,
      })
      .from(roiEstimates);
    return { rows, counts, roi, error: false };
  } catch {
    return {
      rows: [],
      counts: { total: 0, week: 0 },
      roi: { total: 0, avgSavings: 0 },
      error: true,
    };
  }
}

export default async function ConsolePage() {
  const { rows, counts, roi, error } = await getData();

  const kpis = [
    { label: "Total enquiries", value: counts?.total ?? 0 },
    { label: "Last 7 days", value: counts?.week ?? 0 },
    { label: "ROI models run", value: roi?.total ?? 0 },
    {
      label: "Avg. modelled gain",
      value: `$${(roi?.avgSavings ?? 0).toLocaleString("en-US")}`,
    },
  ];

  return (
    <div className="bg-canvas">
      <div className="shell py-16 md:py-20">
        <Eyebrow>Internal</Eyebrow>
        <h1 className="font-display mt-5 text-3xl md:text-4xl">
          Pipeline console
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Live view of demo requests and ROI models captured from the website.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-paper p-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                {k.label}
              </p>
              <p className="font-display mt-3 text-3xl text-navy">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-paper">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-canvas/60">
                {["Received", "Name", "Company", "Email", "Volume", "Plan", "Source"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-mute"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-ink-mute"
                  >
                    {error
                      ? "Database unavailable."
                      : "No enquiries yet. Submissions from the demo form appear here instantly."}
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-line/70 transition-colors hover:bg-canvas/50"
                  >
                    <td className="px-5 py-4 text-ink-mute">
                      {new Date(r.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">{r.name}</td>
                    <td className="px-5 py-4 text-ink-soft">
                      {r.company ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{r.email}</td>
                    <td className="px-5 py-4 text-ink-soft">
                      {r.monthlyCalls ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{r.plan ?? "—"}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-canvas px-2.5 py-1 text-[11px] text-ink-mute">
                        {r.source}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
