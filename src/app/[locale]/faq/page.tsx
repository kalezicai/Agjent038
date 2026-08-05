import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "FAQ" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const messages = await getMessages({ locale });
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
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow={t("generalEyebrow")} title={t("generalTitle")} />
          <Accordion items={faqs} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow={t("technicalEyebrow")} title={t("technicalTitle")} />
          <Accordion items={technical} defaultOpen={-1} />
        </div>
      </Section>

      <Section tone="navy">
        <div className="text-center">
          <SectionHead
            invert
            align="center"
            eyebrow={t("stillDecidingEyebrow")}
            title={t("stillDecidingTitle")}
            lede={t("stillDecidingLede")}
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="light">{tCommon("contactUs")}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

export default FaqPage;
