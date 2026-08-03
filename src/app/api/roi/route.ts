import { NextResponse } from "next/server";
import { db } from "@/db";
import { roiEstimates } from "@/db/schema";

export const dynamic = "force-dynamic";

function num(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const [row] = await db
      .insert(roiEstimates)
      .values({
        monthlyCalls: num(body.monthlyCalls),
        agents: num(body.agents),
        agentCost: num(body.agentCost),
        automationRate: num(body.automationRate, 68),
        monthlySavings: num(body.monthlySavings),
        payload: (body.payload as Record<string, unknown>) ?? {},
      })
      .returning({ id: roiEstimates.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save estimate" }, { status: 500 });
  }
}
