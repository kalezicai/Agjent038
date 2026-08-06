import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Dashboard from "@/components/dashboard";
import Reveal from "@/components/reveal";
import {
  ButtonLink,
  Card,
  Eyebrow,
  JsonLd,
  Section,
  SectionHead,
} from "@/components/ui";
import { absoluteUrl, buildMetadata } from "@/lib/site";
import { locales, type Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAlb = locale === "sq";
  return buildMetadata({
    title: isAlb
      ? "Platforma — Si Funksionon Pranimësi AI Agjent038"
      : "The Platform — How the Agjent038 AI Receptionist Works",
    description: isAlb
      ? "Brenda Agjent038: zë shqip natyror, vonesë nën 600ms, integrim telefoni dhe CRM, politikë eskalimi, AA e automatizuar dhe një konsolë e gjallë. Ndërtuar për qendrat e thirrjeve në Kosovë."
      : "Inside Agjent038: Albanian-native voice, sub-600ms latency, telephony and CRM integration, escalation policy, automated QA and a live console. Built for Kosovo call centres.",
    path: "/platform",
    keywords: [
      "AI voice agent architecture",
      "AI receptionist integration 3CX Asterisk Twilio",
      "Albanian speech recognition call center",
    ],
    locale,
  });
}

const GUARDRAIL_ICONS = ["◆", "◇", "○", "☆"];

const INTEGRATION_CATEGORIES: Record<string, string[]> = {
  telephony: ["3CX", "Asterisk", "FreePBX", "Twilio", "SIP Trunk"],
  crm: ["HubSpot", "Salesforce", "Zoho", "Pipedrive", "Freshsales"],
  calendar: ["Google Calendar", "Outlook", "Calendly", "Acuity"],
  helpdesk: ["Zendesk", "Freshdesk", "Intercom", "Jira Service"],
};

async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Platform" });

  const messages = await getMessages({ locale });
  const platformPillars = (messages.PlatformPillars ?? []) as Array<{
    glyph: string;
    title: string;
    description: string;
    detail?: string[];
  }>;
  const capabilities = (messages.Capabilities ?? []) as Array<{
    title: string;
    description: string;
  }>;
  const steps = (messages.Steps ?? []) as Array<{
    step: string;
    title: string;
    body: string;
    days: string;
  }>;
  const integrations = (messages.Integrations ?? []) as string[];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Platform", item: absoluteUrl("/platform") },
    ],
  };

  const stack = t.raw("stack") as Array<{ layer: string; title: string; body: string }>;
  const guardrailsData = t.raw("guardrails") as Array<{ title: string; body: string }>;

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="bg-paper border-b border-line"
      >
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{t("home")}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {t("title")}
          </li>
        </ol>
      </nav>

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
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{t("cta1")}</ButtonLink>
              <ButtonLink href="/pricing" variant="ghost">{t("cta2")}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Architecture — visual stack with connecting arrows */}
      <Section tone="paper">
        <SectionHead
          eyebrow={t("architectureEyebrow")}
          title={t("architectureTitle")}
          lede={t("architectureLede")}
        />
        <div className="mt-14 relative">
          <div className="absolute left-[calc(1rem+0.5rem)] top-0 bottom-0 hidden w-px bg-line md:block" aria-hidden="true" />
          <div className="space-y-3">
            {stack.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="group relative grid gap-4 rounded-2xl border border-line bg-canvas/50 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-navy/15 hover:bg-paper hover:shadow-soft md:grid-cols-[160px_200px_1fr] md:items-baseline">
                  {/* Connection dot */}
                  <div className="absolute -left-3 top-7 hidden h-3 w-3 rounded-full border-2 border-navy bg-paper md:block" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold">{s.layer}</span>
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow={t("pillarsEyebrow")}
          title={t("pillarsTitle")}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {platformPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <Card className="h-full">
                <span className="font-display text-2xl text-gold" aria-hidden="true">{p.glyph}</span>
                <h3 className="font-display mt-5 text-xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                {p.detail ? (
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {p.detail.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[13px] text-ink-mute">
                        <span className="text-gold" aria-hidden="true">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Console preview with CTA */}
      <Section tone="paper">
        <SectionHead
          align="center"
          eyebrow={t("consoleEyebrow")}
          title={t("consoleTitle")}
          lede={t("consoleLede")}
        />
        <Reveal delay={100}>
          <div className="scene-3d mt-14">
            <Dashboard />
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/console">{t("cta1")}</ButtonLink>
          <ButtonLink href="/pricing" variant="ghost">{t("cta2")}</ButtonLink>
        </div>
      </Section>

      {/* Guardrails with icons */}
      <Section>
        <SectionHead
          eyebrow={t("guardrailsEyebrow")}
          title={t("guardrailsTitle")}
          lede={t("guardrailsLede")}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {guardrailsData.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="h-full bg-paper p-8 transition-colors duration-500 hover:bg-canvas">
                <span className="font-display text-xl text-gold" aria-hidden="true">
                  {GUARDRAIL_ICONS[i] ?? GUARDRAIL_ICONS[0]}
                </span>
                <h3 className="font-display mt-4 text-lg">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHead
          invert
          align="center"
          eyebrow={t("capabilitiesEyebrow")}
          title={t("capabilitiesTitle")}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 80}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-500 hover:bg-white/[0.08]">
                <h3 className="font-display text-base leading-snug text-white">{c.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-white/60">{c.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Categorized integrations */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead
              eyebrow={t("integrationsEyebrow")}
              title={t("integrationsTitle")}
              lede={t("integrationsLede")}
            />
          </div>
          <div className="space-y-6 self-center">
            {Object.entries(INTEGRATION_CATEGORIES).map(([category, items]) => (
              <div key={category}>
                <p className="mb-2.5 text-[10px] uppercase tracking-[0.18em] font-medium text-ink-mute">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((name, i) => (
                    <Reveal key={name} delay={i * 20} as="span">
                      <span className="inline-block rounded-full border border-line bg-canvas px-4 py-2 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:bg-paper hover:shadow-soft">
                        {name}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Deployment flow with arrows */}
      <Section>
        <SectionHead
          eyebrow={t("deploymentEyebrow")}
          title={t("deploymentTitle")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-line bg-paper p-7">
                {/* Flow arrow (hidden on last step) */}
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-line lg:block"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-navy">{s.step}</span>
                  <span className="rounded-full bg-canvas px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-mute">{s.days}</span>
                </div>
                <h3 className="font-display mt-6 text-lg">{s.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/contact">{t("cta1")}</ButtonLink>
        </div>
      </Section>
    </>
  );
}

export default PlatformPage;
