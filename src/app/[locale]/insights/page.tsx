import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { ButtonLink, Eyebrow, JsonLd, Section } from "@/components/ui";
import { articles } from "@/lib/content";
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
      ? "Njohuritë — AI, Qendra Thirrjesh dhe Mbështetje Klienti në Kosovë"
      : "Insights — AI, Call Centres and Customer Support in Kosovo",
    description: isAlb
      ? "Shkrim operational për njerëzit përgjegjës për një radhë telefoni — ekonomi, detaje teknike dhe përputhja, pa glossy-n e furnizuesit."
      : "Practical writing on missed-call economics, AI voice agents in Albanian, GDPR and call recording, and how automation changes contact-centre operations in Kosovo.",
    path: "/insights",
    keywords: [
      "call center blog Kosovo",
      "AI voice agent Albanian article",
      "contact centre automation insights",
    ],
  });
}

async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Insights" });
  const tArt = await getTranslations({ locale, namespace: "Articles" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const listLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Agjent038 Insights",
    url: absoluteUrl("/insights"),
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      url: absoluteUrl(`/insights/${a.slug}`),
    })),
  };

  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd data={listLd} />

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
        </div>
      </section>

      <Section tone="paper">
        <Reveal>
          <Link
            href={`/insights/${lead.slug}`}
            className="group grid gap-8 rounded-2xl border border-line bg-canvas/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-lift md:grid-cols-[1.2fr_0.8fr] md:p-10"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                {t("featured")} · {lead.category}
              </span>
              <h2 className="font-display mt-5 text-2xl leading-snug md:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                {lead.description}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy">
                {tCommon("readArticle")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
            <div className="flex flex-col justify-end gap-2 border-t border-line pt-6 text-xs text-ink-mute md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <span>
                {new Date(lead.date).toLocaleDateString(locale === "sq" ? "sq-AL" : locale === "de" ? "de-DE" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>{lead.readingTime}</span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link
                href={`/insights/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-canvas/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-lift"
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {a.category}
                </span>
                <h2 className="font-display mt-4 text-lg leading-snug">{a.title}</h2>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-mute">{a.description}</p>
                <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[11px] text-ink-mute">
                  {a.readingTime}
                  <span className="text-navy transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-line bg-paper p-10 text-center md:p-14">
          <h2 className="font-display mx-auto max-w-2xl text-2xl leading-snug md:text-3xl">
            {t("cta")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">
            We will audit twenty of your calls and write up what automation
            would realistically contain, at no cost.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">{tCommon("requestAudit")}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

export default InsightsPage;
