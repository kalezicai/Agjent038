import type { Metadata } from "next";
import { getStaticMessages } from "@/i18n/static-messages";
import { notFound } from "next/navigation";
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

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SLUGS = [
  "call-centers",
  "clinics",
  "hospitality",
  "radhë-logjistika",
  "shërbime-financiare",
  "pasuria-e-paluajtshme",
] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAlb = locale === "sq";

  const messages = await getStaticMessages(locale);
  const solutions = (messages.SolutionsList ?? []) as Solution[];
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) return {};

  const keywordMap: Record<string, string[]> = {
    "call-centers": [
      "AI call center Kosovo",
      "BPO automation",
      "call centre AI receptionist",
      "contact center overflow Kosovo",
    ],
    clinics: [
      "clinic answering service Kosovo",
      "dental appointment AI",
      "medical receptionist automation",
      "clinic phone AI Prishtina",
    ],
    hospitality: [
      "hotel AI reservations",
      "restaurant booking AI Kosovo",
      "hotel receptionist automation",
      "hospitality AI voice agent",
    ],
    "radhë-logjistika": [
      "order status AI Kosovo",
      "retail customer support automation",
      "logistics call handling AI",
      "delivery update voice agent",
    ],
    "shërbime-financiare": [
      "bank AI customer service Kosovo",
      "insurance claims automation",
      "fintech support AI",
      "financial services voice agent",
    ],
    "pasuria-e-paluajtshme": [
      "real estate AI receptionist Kosovo",
      "property enquiry automation",
      "real estate booking AI",
      "property agent call handling",
    ],
  };

  return buildMetadata({
    title: isAlb
      ? `${solution.name} — Zgjidhje AI për Kosovë`
      : `${solution.name} — AI Solutions for Kosovo`,
    description: solution.headline,
    path: `/solutions/${slug}`,
    keywords: keywordMap[slug] ?? [],
    locale,
  });
}

async function SolutionPage({ params }: Props) {
  const { locale, slug } = await params;

  const messages = await getStaticMessages(locale);
  const solutions = (messages.SolutionsList ?? []) as Solution[];
  const solution = solutions.find((s) => s.slug === slug);

  if (!solution) notFound();

  const solNs = (messages.Solutions ?? {}) as Record<string, string>;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Agjent038 — ${solution.name}`,
    description: solution.body,
    provider: {
      "@type": "Organization",
      name: "Agjent038",
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "Kosovo",
    },
    serviceType: "AI customer support",
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow>{solNs.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {solution.name}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {solution.headline}
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl leading-snug">
                {solution.headline}
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                {solution.body}
              </p>
              <div className="mt-9">
                <ButtonLink href="/contact">{solNs.cta}</ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-navy/15 bg-navy p-8 text-white">
              <h3 className="font-display text-lg">{solNs.winsTitle}</h3>
              <ul className="mt-6 space-y-4">
                {solution.wins.map((w) => (
                  <li key={w} className="flex gap-3 text-[13px] leading-relaxed text-white/80">
                     <span className="mt-1 text-gold" aria-hidden="true">◆</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead
          eyebrow={solNs.notListedEyebrow}
          title={solNs.notListedTitle}
          lede={solNs.notListedLede}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">{solNs.cta}</ButtonLink>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink transition-all duration-300 hover:border-navy/20 hover:shadow-soft"
          >
            ← {solNs.allSolutions}
          </Link>
        </div>
      </Section>
    </>
  );
}

export default SolutionPage;
