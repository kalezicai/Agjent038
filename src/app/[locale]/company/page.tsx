import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
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
      ? "Kompania — Ndërtuar në Prishtinë për Operatorët Kosovarë"
      : "Company — Built in Prishtina for Kosovo Operators",
    description: isAlb
      ? "Agjent038 është një ekip i bazuar në Pristinë që ndërton pranimës AI me zë shqip natyror për qendra thirrjesh, klinika dhe biznese shërbimesh në Kosovë dhe rajon."
      : "Agjent038 is a Prishtina-based team building Albanian-native AI receptionists for call centres, clinics and service businesses across Kosovo and the region.",
    path: "/company",
    keywords: ["AI company Kosovo", "Prishtina AI startup", "Albanian AI team"],
    locale,
  });
}

async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Company" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const messages = await getMessages({ locale });
  const principles = (messages.CompanyPrinciples ?? []) as Array<{ title: string; body: string }>;
  const facts = (messages.CompanyFacts ?? []) as Array<[string, string]>;
  const limitsBody = (messages.CompanyLimits ?? "") as string;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Company", item: absoluteUrl("/company") },
    ],
  };

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
            <div className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-navy md:text-4xl">{v}</div>
                  <div className="mt-2 text-sm text-ink-mute">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow={t("howWeWorkEyebrow")}
            title={t("howWeWorkTitle")}
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full bg-paper p-7 transition-colors duration-500 hover:bg-canvas">
                  <span className="text-[11px] tracking-[0.22em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-4 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-mute">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow={t("responsibilityEyebrow")}
              title={t("responsibilityTitle")}
              lede={t("responsibilityLede")}
            />
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {limitsBody}
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact">{tCommon("contactUs")}</ButtonLink>
            </div>
          </div>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <h3 className="font-display text-xl">{t("contactTitle")}</h3>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("office")}</dt>
                  <dd className="mt-1.5 text-ink-soft">
                    {site.address.street}<br />
                    {site.address.postalCode} {site.address.city}, {site.address.countryName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("email")}</dt>
                  <dd className="mt-1.5">
                    <a className="text-ink-soft transition-colors hover:text-navy" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("phone")}</dt>
                  <dd className="mt-1.5">
                    <a className="text-ink-soft transition-colors hover:text-navy" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("hours")}</dt>
                  <dd className="mt-1.5 text-ink-soft">
                    {t("hoursDescription")}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default CompanyPage;
