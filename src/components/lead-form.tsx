"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-mute/70 focus:border-navy/40 focus:ring-4 focus:ring-navy/5";

const labelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink-mute";

export default function LeadForm({
  source = "contact",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-paper p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/10 text-mint">
          ✓
        </div>
        <h3 className="font-display mt-6 text-2xl">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          A specialist will reply within one business day with a proposed time
          and a short recording of Zana handling a call in your industry. No
          slide deck, no obligation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-paper p-7 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            className={inputClass}
            placeholder="Arbër Krasniqi"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            className={inputClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className={inputClass}
            placeholder="+383 …"
          />
        </div>
        {!compact && (
          <>
            <div>
              <label className={labelClass} htmlFor="monthlyCalls">
                Monthly inbound calls
              </label>
              <select id="monthlyCalls" name="monthlyCalls" className={inputClass}>
                <option>Under 500</option>
                <option>500 – 1,000</option>
                <option>1,000 – 4,000</option>
                <option>4,000 – 10,000</option>
                <option>10,000+</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="plan">
                Plan of interest
              </label>
              <select id="plan" name="plan" className={inputClass}>
                <option>Reception — $499/mo</option>
                <option>Operations — $1,290/mo</option>
                <option>Enterprise</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          What would you like Zana to handle?
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className={inputClass}
          placeholder="After-hours reservations, order status calls, appointment booking…"
        />
      </div>

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a demo"}
      </button>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-mute">
        We reply within one business day. Your details stay with us — no
        reselling, no newsletters you did not ask for.
      </p>
    </form>
  );
}
