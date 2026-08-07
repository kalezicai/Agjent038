import type { Metadata } from "next";
import { getStaticMessages } from "@/i18n/static-messages";
import Dashboard from "@/components/dashboard";
import Reveal from "@/components/reveal";
import { ButtonLink, Eyebrow, JsonLd, Section, SectionHead } from "@/components/ui";
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

  const messages = await getStaticMessages(locale);
  const conNs = (messages.Console ?? {}) as Record<string, string>;
  const commonNs = (messages.Common ?? {}) as Record<string, string>;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Console", item: absoluteUrl("/console") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-paper border-b border-line">
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{conNs.home}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {conNs.eyebrow}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{conNs.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {conNs.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {conNs.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{commonNs.requestAudit}</ButtonLink>
              <ButtonLink href="/platform" variant="ghost">{conNs.seeHow}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Live Dashboard preview */}
      <Section tone="paper">
        <SectionHead
          align="center"
          eyebrow={conNs.previewEyebrow}
          title={conNs.previewTitle}
        />
        <Reveal delay={100}>
          <div className="scene-3d mt-14">
            <Dashboard compact />
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/contact">{commonNs.requestAudit}</ButtonLink>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead
          eyebrow={conNs.dashboardEyebrow}
          title={conNs.dashboardTitle}
          lede={conNs.dashboardLede}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {["calls", "containment", "performance", "settings"].map((key, i) => (
            <Reveal key={key} delay={i * 90}>
              <div className="rounded-2xl border border-line bg-canvas/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-lift">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <span className="font-display text-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-5 text-lg">{conNs[`${key}Title`]}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-mute">{conNs[`${key}Desc`]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-line bg-paper p-10 text-center md:p-14">
          <h2 className="font-display mx-auto max-w-2xl text-2xl leading-snug md:text-3xl">
            {conNs.cta}
          </h2>
          <div className="mt-9 flex justify-center gap-3">
            <ButtonLink href="/contact">{commonNs.requestAudit}</ButtonLink>
            <ButtonLink href="/pricing" variant="ghost">{commonNs.seePricing}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ConsolePage;
