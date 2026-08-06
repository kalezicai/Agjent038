import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Accordion from "@/components/accordion";
import Reveal from "@/components/reveal";
import {
  ButtonLink,
  Eyebrow,
  JsonLd,
  Section,
  SectionHead,
} from "@/components/ui";
import { absoluteUrl, buildMetadata, site } from "@/lib/site";
import { locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAlb = locale === "sq";
  return buildMetadata({
    title: isAlb
      ? "Çmimet — Pranimës AI nga 299€ në Muaj"
      : "Pricing — AI Receptionist from €299 per Month",
    description: isAlb
      ? "Çmime transparente për pranimësin AI Agjent038: Overflow në 299€/muaj, Pranimi në 499€/muaj, Operacionet në 899€/muaj dhe Enterprise. Pa tarifë vendosje, muaj për muaj, gjithçka e përfshirë."
      : "Transparent pricing for the Agjent038 AI receptionist: Overflow at €299/month, Reception at €499/month, Operations at €899/month, and Enterprise. No setup fee, month-to-month, everything included.",
    path: "/pricing",
    keywords: [
      "AI receptionist price Kosovo",
      "AI customer support cost",
      "AI receptionist pricing",
      "call center automation pricing",
    ],
    locale,
  });
}

async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pricing" });

  const messages = await getMessages({ locale });
  const plans = (messages.Plans ?? []) as Array<{
    name: string;
    price: string;
    cadence: string;
    meta: string;
    summary: string;
    includes: string[];
    cta: string;
    featured?: boolean;
  }>;
  const inclusions = (messages.Inclusions ?? []) as string[];
  const faqs = (messages.FAQs ?? []) as Array<{ q: string; a: string }>;
  const comparisonData = (messages.PricingCompare ?? []) as [string, string, string, string, string][];
  const contextData = (messages.PricingContext ?? []) as [string, string][];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Agjent038 AI Receptionist",
    description:
      "AI receptionist and customer support agent for Kosovo call centres, answering 24/7 with multilingual support.",
    brand: { "@type": "Brand", name: site.name },
    offers: plans.slice(0, 3).map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price.replace(/[€,]/g, ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={faqLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-paper border-b border-line">
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{t("home")}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {t("eyebrow")}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {t("title")}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {t("description")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{t("cta1")}</ButtonLink>
              <ButtonLink href="/platform" variant="ghost">{t("cta2")}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-canvas/70">
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-mute"></th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-mute">Human agent</th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-navy">Agjent038</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t("anchorCost"), "€1,000+/mo", "From €299/mo"],
                  [t("anchorHours"), "40 h/week", "168 h/week"],
                  [t("anchorConcurrency"), "1 call at a time", "Unlimited"],
                  [t("anchorAvailability"), "Shifts, breaks, PTO", "24/7/365"],
                  [t("anchorRamp"), "Weeks of hiring", "Live in 2 weeks"],
                ].map(([label, human, ai], i) => (
                  <tr key={label} className={`border-t border-line ${i % 2 ? "bg-paper" : "bg-canvas/30"}`}>
                    <td className="px-6 py-4 font-medium text-ink">{label}</td>
                    <td className="px-6 py-4 text-ink-mute">{human}</td>
                    <td className="px-6 py-4 font-medium text-navy">{ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500 ${
                  plan.featured
                    ? "border-navy/20 bg-navy text-white shadow-lift lg:-mt-4 lg:mb-4"
                    : "border-line bg-canvas/50 hover:-translate-y-1 hover:bg-paper hover:shadow-lift"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    {t("mostChosen")}
                  </span>
                ) : null}

                <h2 className={`font-display text-xl ${plan.featured ? "text-white" : "text-ink"}`}>
                  {plan.name}
                </h2>
                <p className={`mt-2 text-[11px] uppercase tracking-[0.16em] ${plan.featured ? "text-white/45" : "text-ink-mute"}`}>
                  {plan.meta}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className={`font-display text-4xl ${plan.featured ? "text-white" : "text-navy"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? "text-white/50" : "text-ink-mute"}`}>
                    {plan.cadence}
                  </span>
                </div>

                <p className={`mt-5 text-sm leading-relaxed ${plan.featured ? "text-white/70" : "text-ink-soft"}`}>
                  {plan.summary}
                </p>

                <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 ${plan.featured ? "border-white/10" : "border-line"}`}>
                  {plan.includes.map((f) => (
                    <li key={f} className={`flex gap-2.5 text-[13px] leading-relaxed ${plan.featured ? "text-white/80" : "text-ink-soft"}`}>
                       <span className="text-gold" aria-hidden="true">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-navy hover:bg-gold-soft"
                      : "bg-navy text-white hover:bg-ink"
                  }`}
                >
                  {plan.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-xs text-ink-mute">
            {t("extraConversations")}
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead
          eyebrow={t("includedEyebrow")}
          title={t("includedTitle")}
          lede={t("includedLede")}
        />
        <div className="mt-12 flex flex-wrap gap-2.5">
          {inclusions.map((item, i) => (
            <Reveal key={item} delay={i * 30} as="span">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-soft">
                 <span className="text-gold" aria-hidden="true">◆</span>
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead eyebrow={t("compareEyebrow")} title={t("compareTitle")} />
        <Reveal delay={80}>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-canvas/70">
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-mute">Feature</th>
                  {plans.map((p) => (
                    <th key={p.name} className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row[0]} className={`border-t border-line transition-colors duration-300 hover:bg-canvas/60 ${i % 2 ? "bg-paper" : "bg-paper"}`}>
                    <td className="px-6 py-4 text-ink-soft">{row[0]}</td>
                    <td className="px-6 py-4 text-ink">{row[1]}</td>
                    <td className="px-6 py-4 text-ink">{row[2]}</td>
                    <td className="px-6 py-4 text-ink">{row[3]}</td>
                    <td className="px-6 py-4 text-ink">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHead
            eyebrow={t("contextEyebrow")}
            title={t("contextTitle")}
            lede={t("contextLede")}
          />
          <Reveal delay={100}>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {contextData.map(([v, l]) => (
                <div key={l} className="bg-paper p-7">
                  <div className="font-display text-3xl text-navy">{v}</div>
                  <div className="mt-2 text-sm text-ink-mute">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            invert
            eyebrow={t("questionsEyebrow")}
            title={t("questionsTitle")}
          />
          <div className="rounded-2xl bg-paper p-8">
            <Accordion items={faqs.slice(3, 9)} />
          </div>
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="light">{t("cta")}</ButtonLink>
          <Link
            href="/results"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white transition-all duration-300 hover:border-white/60"
          >
            {t("ctaSecondary")} →
          </Link>
        </div>
      </Section>
    </>
  );
}

export default PricingPage;
