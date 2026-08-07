import type { Metadata } from "next";
import { getStaticMessages } from "@/i18n/static-messages";
import Accordion from "@/components/accordion";
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
      ? "FAQ — Pyetje për Pranimësin AI të Përgjigjura"
      : "FAQ — AI Receptionist Questions Answered",
    description: isAlb
      ? "Përgjigje për cilësinë e mbështetjes shumëgjuhëshe, eskalimin, kohën e nisjes, mbrojtjen e të dhënave, integrimin e telefonisë dhe planet tona."
      : "Answers on multilingual support, escalation, onboarding time, data protection, telephony integration and our plans.",
    path: "/faq",
    keywords: ["AI receptionist FAQ", "AI call answering questions Kosovo"],
    locale,
  });
}

async function FaqPage({ params }: Props) {
  const { locale } = await params;

  const messages = await getStaticMessages(locale);
  const faqNs = (messages.FAQ ?? {}) as Record<string, string>;
  const commonNs = (messages.Common ?? {}) as Record<string, string>;
  const faqs = (messages.FAQs ?? []) as Array<{ q: string; a: string }>;
  const technical = (messages.TechnicalFAQ ?? []) as Array<{ q: string; a: string }>;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl("/faq") },
    ],
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-paper border-b border-line">
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{faqNs.home}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {faqNs.eyebrow}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{faqNs.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {faqNs.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {faqNs.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{faqNs.cta1}</ButtonLink>
              <ButtonLink href="/platform" variant="ghost">{faqNs.cta2}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow={faqNs.generalEyebrow} title={faqNs.generalTitle} />
          <Accordion items={faqs} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow={faqNs.technicalEyebrow} title={faqNs.technicalTitle} />
          <Accordion items={technical} defaultOpen={-1} />
        </div>
      </Section>

      <Section tone="navy">
        <div className="text-center">
          <SectionHead
            invert
            align="center"
            eyebrow={faqNs.stillDecidingEyebrow}
            title={faqNs.stillDecidingTitle}
            lede={faqNs.stillDecidingLede}
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="light">{commonNs.contactUs}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

export default FaqPage;
