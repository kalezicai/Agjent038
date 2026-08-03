import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { JsonLd } from "@/components/ui";
import { absoluteUrl, site } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "Agjent038 — Agjentë Zanorë AI për Qendrat e Thirrjeve në Kosovë",
    template: "%s | Agjent038",
  },
  description:
    "Agjent038 përgjigjet çdo thirrje në shqip, anglisht, serbisht, gjermanisht dhe turqisht — 24/7. Ndërtuar për qendrat e thirrjeve, klinikat dhe BPO-të në Kosovë. Gati në dy javë nga 499$ në muaj.",
  keywords: [
    "pranimës AI Kosovë",
    "qendër thirrjesh AI Kosovë",
    "mbështetje klienti AI Kosovë",
    "agjent zanor shqip",
    "pranimës virtual Prishtinë",
    "automatizim qendre thirrjesh Kosovë",
    "shërbim përgjigjje AI Shqipëri",
    "automatizim BPO Kosovë",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "technology",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "sq_AL",
    url: absoluteUrl("/"),
    title: "Agjent038 — Agjentë Zanorë AI për Qendrat e Thirrjeve në Kosovë",
    description:
      "Çdo thirrje e përgjigjur në 0.4 sekonda, në pesë gjuhë, gjatë gjithë ditës. Nga 499$ në muaj.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agjent038 — Agjentë Zanorë AI për Qendrat e Thirrjeve në Kosovë",
    description:
      "Çdo thirrje e përgjigjur në 0.4 sekonda, në pesë gjuhë, gjatë gjithë ditës. Nga 499$ në muaj.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f6",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  legalName: site.legalName,
  url: site.domain,
  email: site.email,
  telephone: site.phone,
  description:
    "Agjent038 ndërton pranimës dhe agjentë mbështetjeje klienti AI për qendra thirrjesh dhe biznese shërbimesh në Kosovë, duke përgjigjur 24/7 në shqip, anglisht, serbisht, gjermanisht dhe turqisht.",
  areaServed: ["Kosovo", "Albania", "North Macedonia", "Switzerland", "Germany"],
  knowsLanguage: site.languages,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [],
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": absoluteUrl("/#service"),
  serviceType: "Pranimës AI dhe agjent mbështetjeje klienti",
  provider: { "@id": absoluteUrl("/#organization") },
  areaServed: { "@type": "Country", name: "Kosovo" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Qendra thirrjesh, BPO, klinika, hotele dhe biznese shërbimesh",
  },
  offers: {
    "@type": "Offer",
    price: site.priceFrom,
    priceCurrency: site.currency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: site.priceFrom,
      priceCurrency: site.currency,
      unitText: "MONTH",
    },
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/pricing"),
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationLd} />
          <JsonLd data={serviceLd} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Kaloni te përmbajtja
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
