import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import LeadForm from "@/components/lead-form";
import Reveal from "@/components/reveal";
import { Eyebrow, JsonLd, Section } from "@/components/ui";
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
      ? "Rezervoni një Demonstrim — Dëgjoni Agjent038 duke Përgjigjur në Thirrjet Tuaja"
      : "Book a Demo — Hear Agjent038 Handle Your Own Calls",
    description: isAlb
      ? "Kërkoni një auditim 30-minutësh thirrjesh. Ne analizojmë njëzet thirrjet tuaja reale dhe kthejmë një vlerësim të sinqertë të përmbajtjes plus një regjistrim të Agjent038 duke u përgjigjur në industrinë tuaj."
      : "Request a 30-minute call audit. We analyse twenty of your real calls and return an honest containment estimate plus a recording of Agjent038 answering in your industry.",
    path: "/contact",
    keywords: [
      "AI receptionist demo Kosovo",
      "book AI call center demo",
      "contact Agjent038 Prishtina",
    ],
    locale,
  });
}

async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      email: site.email,
      telephone: site.phone,
    },
  };

  const expectations = t.raw("expectations") as Array<{ step: string; body: string }>;

  return (
    <>
      <JsonLd data={contactLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-paper border-b border-line">
        <ol className="shell flex items-center gap-2 py-3 text-[12px] text-ink-mute">
          <li>
            <a href="/" className="transition-colors hover:text-ink">{t("home")}</a>
          </li>
          <li aria-hidden="true" className="text-line">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {t("eyebrow")}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <Reveal>
                <Eyebrow>{t("eyebrow")}</Eyebrow>
                <h1 className="font-display mt-6 text-[2.3rem] leading-[1.08] md:text-[3.1rem]">
                  {t("title")}
                </h1>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft">
                  {t("description")}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <ol className="mt-12 space-y-5 border-t border-line pt-10">
                  {expectations.map((e, i) => (
                    <li key={e.step} className="flex gap-5">
                      <span className="font-display mt-0.5 text-sm text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{e.step}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{e.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-12 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("email")}</p>
                    <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-ink-soft transition-colors hover:text-navy">
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">{tCommon("phone")}</p>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-ink-soft transition-colors hover:text-navy">
                      {site.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <LeadForm source="contact" />
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            [t("noSetupFee"), t("noSetupFeeDescription")],
            [t("monthToMonth"), t("monthToMonthDescription")],
            [t("gdpr"), t("gdprDescription")],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="rounded-2xl border border-line bg-canvas/50 p-7">
                <h2 className="font-display text-lg">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

export default ContactPage;
