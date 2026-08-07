import type { Metadata } from "next";
import { getStaticMessages } from "@/i18n/static-messages";
import { Link } from "@/i18n/navigation";
import Dashboard from "@/components/dashboard";
import OrbScene from "@/components/orb-scene";
import Reveal from "@/components/reveal";
import Accordion from "@/components/accordion";
import ExplainerAnimation from "@/components/explainer-animation";
import { ButtonLink, Card, Eyebrow, JsonLd, Section, SectionHead } from "@/components/ui";
import { absoluteUrl, buildMetadata, site } from "@/lib/site";
import { locales, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAlb = locale === "sq";
  return buildMetadata({
    title: isAlb
      ? "Agjentë Zanorë AI për Qendrat e Thirrjeve në Kosovë — Çdo Thirrje e Përgjigjur, 24/7"
      : "AI Voice Agents for Kosovo Call Centres — Every Call Answered, 24/7",
    description: isAlb
      ? "Agjent038 përgjigjet çdo thirrje hyrëse me mbështetje shumëgjuhëshe, rezervon takime, zgjidh biletat e nivelit të parë dhe eskalon me kontekst. Gati në dy javë nga 499€ në muaj."
      : "Agjent038 answers every inbound call with multilingual support, books appointments, resolves tier-1 tickets and escalates with context. Live in two weeks from €499/month.",
    path: "/",
    keywords: [
      "AI receptionist Kosovo",
      "24/7 call answering Kosovo",
      "AI voice agent call center",
    ],
    locale,
  });
}

async function HomePage({ params }: Props) {
  const { locale } = await params;

  const messages = await getStaticMessages(locale);
  const homeNs = (messages.Home ?? {}) as Record<string, unknown>;
  const platformPillars = (messages.PlatformPillars ?? []) as Array<{
    glyph: string;
    title: string;
    description: string;
    detail?: string[];
  }>;
  const capabilities = (messages.Capabilities ?? []) as Array<{
    glyph: string;
    title: string;
    description: string;
  }>;
  const steps = (messages.Steps ?? []) as Array<{
    step: string;
    title: string;
    body: string;
    days: string;
  }>;
  const faqs = (messages.FAQs ?? []) as Array<{ q: string; a: string }>;
  const integrations = (messages.Integrations ?? []) as string[];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 6).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  const beforeItems = (homeNs.BeforeAfter as Record<string, string[]>)?.today ?? [];
  const afterItems = (homeNs.BeforeAfter as Record<string, string[]>)?.after ?? [];

  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={websiteLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft shadow-soft">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
                  {homeNs.heroEyebrow as string}
                </span>
              </Reveal>

              <Reveal delay={40}>
                <h2 className="mt-5 text-sm font-medium tracking-wide text-navy-soft">
                  {homeNs.heroSubhead as string}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display mt-7 text-[2.6rem] leading-[1.05] text-ink sm:text-5xl lg:text-[3.75rem]">
                  {homeNs.heroTitle1 as string}
                  <br />
                  <span className="text-navy-soft">{homeNs.heroTitle2 as string}</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                  {homeNs.heroDescription as string}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <ButtonLink href="/contact">{homeNs.heroCta as string}</ButtonLink>
                  <ButtonLink href="/results" variant="ghost">
                    {homeNs.heroCtaSecondary as string}
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
                  {[
                    [homeNs.stat1Value as string, homeNs.stat1Label as string],
                    [homeNs.stat2Value as string, homeNs.stat2Label as string],
                    [homeNs.stat3Value as string, homeNs.stat3Label as string],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <dt className="font-display text-2xl text-navy md:text-3xl">
                        {v}
                      </dt>
                      <dd className="mt-1.5 text-xs leading-snug text-ink-mute">
                        {l}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <OrbScene />
            </Reveal>
          </div>
        </div>

        <div className="relative border-y border-line bg-paper/60 py-5">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
            <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
              {[...integrations, ...integrations].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-sm font-medium tracking-wide text-ink-mute"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <Section tone="paper">
        <SectionHead
          eyebrow={homeNs.outcomesEyebrow as string}
          title={homeNs.outcomesTitle as string}
          lede={homeNs.outcomesLede as string}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {(homeNs.Outcomes as Array<{ stat: string; label: string; note: string }> ?? []).map((o, i) => (
            <Reveal key={o.label} delay={i * 90}>
              <div className="h-full bg-paper p-8 transition-colors duration-500 hover:bg-canvas">
                <div className="font-display text-4xl text-navy md:text-5xl">
                  {o.stat}
                </div>
                <p className="mt-4 text-sm font-medium text-ink">{o.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                  {o.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Reveal>
          <ExplainerAnimation locale={locale} />
        </Reveal>
      </Section>

      {/* BEFORE / AFTER */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow={homeNs.shiftEyebrow as string}
              title={homeNs.shiftTitle as string}
              lede={homeNs.shiftLede as string}
            />
            <div className="mt-9">
              <ButtonLink href="/results" variant="ghost">
                {homeNs.shiftCta as string}
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-paper p-7">
                <Eyebrow>{homeNs.today as string}</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {beforeItems.map((b: string) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-mute">
                      <span className="mt-2 h-px w-3 shrink-0 bg-line" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-2xl border border-navy/15 bg-navy p-7 text-white shadow-lift">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                  <span className="h-px w-6 bg-gold" />
                  {homeNs.withAgjent038 as string}
                </span>
                <ul className="mt-6 space-y-4">
                  {afterItems.map((a: string) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed text-white/85">
                      <span className="mt-1.5 text-gold">◆</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* DASHBOARD */}
      <Section tone="paper">
        <SectionHead
          align="center"
          eyebrow={homeNs.dashboardEyebrow as string}
          title={homeNs.dashboardTitle as string}
          lede={homeNs.dashboardLede as string}
        />
        <Reveal delay={120}>
          <div className="scene-3d mt-14">
            <Dashboard />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/platform" variant="ghost">
              {homeNs.explorePlatform as string}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* PILLARS */}
      <Section>
        <SectionHead
          eyebrow={homeNs.pillarsEyebrow as string}
          title={homeNs.pillarsTitle as string}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {platformPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <Card className="h-full">
                <span className="font-display text-2xl text-gold">{p.glyph}</span>
                <h3 className="font-display mt-5 text-xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                {p.detail ? (
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {p.detail.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[13px] text-ink-mute">
                        <span className="text-gold">·</span>
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

      {/* CAPABILITIES */}
      <Section tone="paper">
        <SectionHead
          eyebrow={homeNs.capabilitiesEyebrow as string}
          title={homeNs.capabilitiesTitle as string}
          lede={homeNs.capabilitiesLede as string}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 80}>
              <div className="group h-full bg-paper p-7 transition-colors duration-500 hover:bg-canvas">
                <span className="text-[11px] font-medium tracking-[0.22em] text-gold">{c.glyph}</span>
                <h3 className="font-display mt-4 text-lg leading-snug">{c.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute">{c.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHead
          eyebrow={homeNs.processEyebrow as string}
          title={homeNs.processTitle as string}
          lede={homeNs.processLede as string}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-line">{s.step}</span>
                  <span className="rounded-full bg-canvas px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-mute">{s.days}</span>
                </div>
                <h3 className="font-display mt-6 text-lg">{s.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRICING TEASER */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHead
              invert
              eyebrow={homeNs.pricingEyebrow as string}
              title={homeNs.pricingTitle as string}
              lede={homeNs.pricingLede as string}
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/pricing" variant="light">
                {homeNs.pricingCta as string}
              </ButtonLink>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white transition-all duration-300 hover:border-white/60"
              >
                {homeNs.pricingDemo as string} →
              </Link>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                {homeNs.receptionPlan as string}
              </p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-5xl text-white">€499</span>
                <span className="text-sm text-white/50">{homeNs.monthLabel as string}</span>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {(homeNs.pricingFeatures as string[] ?? []).map((f) => (
                  <li key={f} className="flex gap-2.5 text-[13px] text-white/80">
                    <span className="text-gold">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="paper">
        <SectionHead
          align="center"
          eyebrow={homeNs.testimonialsEyebrow as string}
          title={homeNs.testimonialsTitle as string}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {(homeNs.Testimonials as Array<{ quote: string; name: string; role: string; org: string }> ?? []).map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-canvas/60 p-8">
                <span className="font-display text-3xl leading-none text-gold">&ldquo;</span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-ink-mute">{testimonial.role} · {testimonial.org}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow={homeNs.faqEyebrow as string}
            title={homeNs.faqTitle as string}
          />
          <div>
            <Accordion items={faqs.slice(0, 6)} />
            <div className="mt-8">
              <ButtonLink href="/faq" variant="ghost">
                {homeNs.faqCta as string}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line bg-paper">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-24 text-center md:py-32">
          <Reveal>
            <Eyebrow>{homeNs.processEyebrow as string}</Eyebrow>
            <h2 className="font-display mx-auto mt-6 max-w-3xl text-3xl leading-[1.1] md:text-[2.9rem]">
              {homeNs.ctaTitle as string}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              {homeNs.ctaDescription as string}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">{homeNs.ctaBookAudit as string}</ButtonLink>
              <ButtonLink href="/pricing" variant="ghost">
                {homeNs.ctaReviewPricing as string}
              </ButtonLink>
            </div>
            <p className="mt-8 text-xs text-ink-mute">
              {homeNs.ctaLocation as string} ·{" "}
              <a className="hover:text-navy" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default HomePage;
