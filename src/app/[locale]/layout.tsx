import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HtmlLang from "@/components/html-lang";
import { JsonLd } from "@/components/ui";
import { absoluteUrl, site } from "@/lib/site";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const layoutMessages = (messages.Layout ?? {}) as {
    skipToContent?: string;
    jsonLdDescription?: string;
    jsonLdServiceType?: string;
    jsonLdAudienceType?: string;
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
    description: layoutMessages.jsonLdDescription ?? "",
    areaServed: ["Kosovo"],
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
    serviceType: layoutMessages.jsonLdServiceType ?? "",
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: "Kosovo" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: layoutMessages.jsonLdAudienceType ?? "",
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

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HtmlLang />
      <JsonLd data={organizationLd} />
      <JsonLd data={serviceLd} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {layoutMessages.skipToContent ?? "Skip to content"}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
