"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("LeadForm");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    // Static export: simulate success without backend
    setTimeout(() => setStatus("sent"), 800);
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-paper p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/10 text-mint">
          ✓
        </div>
        <h3 className="font-display mt-6 text-2xl">{t("successTitle")}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          {t("successBody")}
        </p>
      </div>
    );
  }

  const callRanges = t.raw("callRanges") as string[];
  const planOptions = t.raw("planOptions") as string[];

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-paper p-7 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {t("fullName")}
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
            {t("workEmail")}
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
            {t("company")}
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
            {t("phone")}
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
                {t("monthlyCalls")}
              </label>
              <select id="monthlyCalls" name="monthlyCalls" className={inputClass}>
                {callRanges.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="plan">
                {t("planOfInterest")}
              </label>
              <select id="plan" name="plan" className={inputClass}>
                {planOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className={inputClass}
          placeholder={t("placeholderMessage")}
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
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-mute">
        {t("privacy")}
      </p>
    </form>
  );
}
