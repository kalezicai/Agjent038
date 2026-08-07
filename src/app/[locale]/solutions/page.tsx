import type { Metadata } from "next";
import { getStaticMessages } from "@/i18n/static-messages";
import { Link } from "@/i18n/navigation";
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

type Solution = {
  slug: string;
  name: string;
  headline: string;
  body: string;
  wins: string[];
};

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
      "hotel AI reservations",
      "AI order status support",
    ],
    locale,
  });
}

async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  const messages = await getStaticMessages(locale);
  const solutionsNs = (messages.Solutions ?? {}) as Record<string, string>;
  const solutionsData = (messages.SolutionsList ?? []) as Solution[];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Solutions", item: absoluteUrl("/solutions") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-paper border-b border-line">
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{solutionsNs.home}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {solutionsNs.eyebrow}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{solutionsNs.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {solutionsNs.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {solutionsNs.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{solutionsNs.cta}</ButtonLink>
              <ButtonLink href="/platform" variant="ghost">{solutionsNs.cta2}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper">
        <div className="space-y-4">
          {solutionsData.map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 3) * 80}>
              <Link
                href={`/solutions/${solution.slug}`}
                className="group block rounded-2xl border border-line bg-canvas/50 p-8 transition-all duration-500 hover:border-navy/15 hover:bg-paper hover:shadow-soft md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                      {String(i + 1).padStart(2, "0")} — {solution.name}
                    </span>
                    <h2 className="font-display mt-5 text-2xl leading-snug md:text-[1.75rem]">
                      {solution.headline}
                    </h2>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {solution.body}
                    </p>
                    <ul className="mt-7 grid gap-3 border-t border-line pt-6">
                      {solution.wins.map((w) => (
                        <li key={w} className="flex gap-3 text-sm text-ink-mute">
                           <span className="text-gold" aria-hidden="true">◆</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy">
                      {solutionsNs.allSolutions} →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHead
            eyebrow={solutionsNs.notListedEyebrow}
            title={solutionsNs.notListedTitle}
            lede={solutionsNs.notListedLede}
          />
          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <p className="text-sm leading-relaxed text-ink-soft">
                {solutionsNs.auditDescription}
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact">{solutionsNs.cta}</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default SolutionsPage;
