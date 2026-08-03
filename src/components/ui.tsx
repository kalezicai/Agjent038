import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-mute">
      <span className="h-px w-6 bg-gold" />
      {children}
    </span>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "canvas",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "paper" | "navy";
}) {
  const tones = {
    canvas: "bg-canvas",
    paper: "bg-paper",
    navy: "bg-navy text-white",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="shell py-20 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`font-display mt-5 text-3xl leading-[1.1] md:text-[2.75rem] ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            invert ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 will-change-transform";
  const variants = {
    primary:
      "bg-navy text-white shadow-soft hover:bg-ink hover:shadow-lift hover:-translate-y-0.5",
    ghost:
      "border border-line bg-paper text-ink hover:border-navy/30 hover:-translate-y-0.5 hover:shadow-soft",
    light:
      "bg-white text-navy hover:bg-gold-soft hover:-translate-y-0.5 shadow-soft",
  } as const;
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-navy/15 hover:shadow-lift ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
  note,
  invert = false,
}: {
  value: string;
  label: string;
  note?: string;
  invert?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display text-4xl md:text-5xl ${
          invert ? "text-white" : "text-navy"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-3 text-sm font-medium ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {label}
      </div>
      {note ? (
        <p
          className={`mt-2 text-sm leading-relaxed ${
            invert ? "text-white/60" : "text-ink-mute"
          }`}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
