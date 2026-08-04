import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Reveal from "@/components/reveal";
import { ButtonLink, Eyebrow, Section, SectionHead } from "@/components/ui";
import { buildMetadata } from "@/lib/site";
import { locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Console" });
  const isAlb = locale === "sq";
  return buildMetadata({
    title: isAlb
      ? "Konsola — Kontrolloni Agjentin Tuaj AI"
      : "Console — Control Your AI Agent",
    description: isAlb
      ? "Paneli i menaxhimit për klientët Agjent038: monitoroni thirrjet, shikoni raportet mujore dhe kontrolloni aftësitë e agjentit tuaj."
      : "Management dashboard for Agjent038 customers: monitor calls, view monthly reports and control your agent capabilities.",
    path: "/console",
    keywords: ["AI agent dashboard", "call centre console"],
    locale,
  });
}

async function ConsolePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Console" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <>
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
        <SectionHead
          eyebrow={t("dashboardEyebrow")}
          title={t("dashboardTitle")}
          lede={t("dashboardLede")}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {["calls", "containment", "performance", "settings"].map((key, i) => (
            <Reveal key={key} delay={i * 90}>
              <div className="rounded-2xl border border-line bg-canvas/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-lift">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <span className="font-display text-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-5 text-lg">{t(`${key}Title`)}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-mute">{t(`${key}Desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-line bg-paper p-10 text-center md:p-14">
          <h2 className="font-display mx-auto max-w-2xl text-2xl leading-snug md:text-3xl">
            {t("cta")}
          </h2>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">{tCommon("requestAudit")}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ConsolePage;
