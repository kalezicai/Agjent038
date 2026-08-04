import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/reveal";
import RoiCalculator from "@/components/roi-calculator";
import {
  ButtonLink,
  Eyebrow,
  JsonLd,
  Section,
  SectionHead,
  Stat,
} from "@/components/ui";
import { absoluteUrl, buildMetadata } from "@/lib/site";
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
      ? "Rezultatet & ROI — Çfarë Kthen një Pranimës AI"
      : "Results & ROI — What an AI Receptionist Returns",
    description: isAlb
      ? "Modeloni kthimin e një pranimesi AI për qendrën tuaj të thirrjeve: thirrje të rimarra, kapacitet liruar dhe fitim mujor neto. Referenca reale nga zbatimet e gjalla në Kosovë."
      : "Model the return of an AI receptionist for your call centre: recovered calls, released agent capacity and net monthly gain. Real benchmarks from live Kosovo deployments.",
    path: "/results",
    keywords: [
      "AI receptionist ROI calculator",
      "call center cost savings Kosovo",
      "missed call cost calculator",
    ],
    locale,
  });
}

async function ResultsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Results" });
  const tCases = await getTranslations({ locale, namespace: "Cases" });

  const messages = await getMessages({ locale });
  const cases = (messages.Cases ?? []) as Array<{
    tag: string;
    title: string;
    context: string;
    metrics: [string, string][];
    quote: string;
  }>;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Results", item: absoluteUrl("/results") },
    ],
  };

  const outcomes = (messages.Home?.Outcomes ?? []) as Array<{ stat: string; label: string; note: string }>;
  const testimonialData = (messages.Home?.Testimonials ?? []) as Array<{ quote: string; name: string; role: string; org: string }>;

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {t("title")}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {t("description")}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((o) => (
                <Stat key={o.label} value={o.stat} label={o.label} note={o.note} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper" id="calculator">
        <SectionHead
          eyebrow={t("roiModelEyebrow")}
          title={t("roiTitle")}
          lede={t("roiLede")}
        />
        <div className="mt-14">
          <RoiCalculator />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow={t("deploymentsEyebrow")}
          title={t("deploymentsTitle")}
        />
        <div className="mt-14 space-y-5">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="rounded-2xl border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-10">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">{c.tag}</span>
                <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <h2 className="font-display text-2xl leading-snug">{c.title}</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{c.context}</p>
                    <p className="mt-6 border-l-2 border-gold pl-5 text-[15px] italic leading-relaxed text-ink-soft">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-line bg-line">
                    {c.metrics.map(([v, l]) => (
                      <div key={l} className="bg-canvas/70 p-5">
                        <div className="font-display text-2xl text-navy">{v}</div>
                        <div className="mt-1.5 text-[11px] leading-snug text-ink-mute">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHead
          invert
          align="center"
          eyebrow={t("testimonialsEyebrow")}
          title={t("testimonialsTitle")}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonialData.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-white/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-white/50">{testimonial.role} · {testimonial.org}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href="/contact" variant="light">{t("cta")}</ButtonLink>
        </div>
      </Section>
    </>
  );
}

export default ResultsPage;
