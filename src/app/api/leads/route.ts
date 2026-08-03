import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

function str(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const name = str(body.name, 160);
    const email = str(body.email, 200);

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(leads)
      .values({
        name,
        email,
        company: str(body.company, 200),
        phone: str(body.phone, 60),
        seats: str(body.seats, 60),
        monthlyCalls: str(body.monthlyCalls, 60),
        plan: str(body.plan, 60),
        source: str(body.source, 80) ?? "website",
        message: str(body.message, 4000),
      })
      .returning({ id: leads.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not save your request. Please email us directly." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(100);
    return NextResponse.json({ ok: true, count: rows.length, leads: rows });
  } catch {
    return NextResponse.json({ ok: false, leads: [] }, { status: 500 });
  }
}
