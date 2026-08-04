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
      ? "Zgjidhjet — Mbështetje Klienti AI sipas Industrisë në Kosovë"
      : "Solutions — AI Customer Support by Industry in Kosovo",
    description: isAlb
      ? "Si e shërben Agjent038 qendrat e thirrjeve dhe BPO-të, klinikat, hotelet, tregtinë dhe logjistikën, shërbimet financiare dhe pasurinë e paluajtshme në Kosovë. Rezultate konkrete sipas industrisë."
      : "How Agjent038 serves call centres and BPOs, clinics, hotels, retail and logistics, financial services and real estate across Kosovo. Concrete outcomes per industry.",
    path: "/solutions",
    keywords: [
      "AI support for BPO Kosovo",
      "clinic answering service Prishtina",
      "hotel AI reservations Albanian",
      "AI order status support",
    ],
    locale,
  });
}

async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Solutions" });
  const messages = await getMessages({ locale });
  const solutionsData = (messages.SolutionsList ?? []) as Array<{ slug: string; name: string; headline: string; body: string; wins: string[] }>;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Solutions", item: absoluteUrl("/solutions") },
    ],
  };

  const slugs = ["call-centers", "clinics", "hospitality", "radhë-logjistika", "shërbime-financiare", "pasuria-e-paluajtshme"];
  const solutionsMap = new Map(solutionsData.map((s) => [s.slug, s]));

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
        </div>
      </section>

      <Section tone="paper">
        <div className="space-y-4">
          {slugs.map((slug, i) => (
            <Reveal key={slug} delay={(i % 3) * 80}>
              <article
                id={slug}
                className="scroll-mt-28 rounded-2xl border border-line bg-canvas/50 p-8 transition-all duration-500 hover:border-navy/15 hover:bg-paper hover:shadow-soft md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                      {String(i + 1).padStart(2, "0")} — {solutionsMap.get(slug)?.name ?? slug}
                    </span>
                    <h2 className="font-display mt-5 text-2xl leading-snug md:text-[1.75rem]">
                      {solutionsMap.get(slug)?.headline ?? ""}
                    </h2>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {solutionsMap.get(slug)?.body ?? ""}
                    </p>
                    <ul className="mt-7 grid gap-3 border-t border-line pt-6">
                      {(solutionsMap.get(slug)?.wins ?? []).map((w) => (
                        <li key={w} className="flex gap-3 text-sm text-ink-mute">
                          <span className="text-gold">◆</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHead
            eyebrow={t("notListedEyebrow")}
            title={t("notListedTitle")}
            lede={t("notListedLede")}
          />
          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <p className="text-sm leading-relaxed text-ink-soft">
                {t("auditDescription")}
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact">{t("cta")}</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default SolutionsPage;
