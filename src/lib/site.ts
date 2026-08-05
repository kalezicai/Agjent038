export const site = {
  name: "Agjent038",
  legalName: "Agjent038 Sh.p.k.",
  tagline: "AI receptionist for Kosovo call centres",
  domain: "https://agjent038.com",
  email: "hello@agjent038.com",
  phone: "+383 49 000 300",
  address: {
    street: "Rr. Ukshin Hoti 12",
    city: "Prishtina",
    region: "Prishtina",
    postalCode: "10000",
    country: "XK",
    countryName: "Kosovo",
  },
  priceFrom: 299,
  currency: "EUR",
  languages: ["English"],
} as const;

export function absoluteUrl(path = "/") {
  return `${site.domain}${path}`;
}

const ogLocaleMap: Record<string, string> = {
  sq: "sq_AL",
  en: "en_GB",
  de: "de_DE",
};

const baseKeywords: Record<string, string[]> = {
  sq: [
    "pranimës AI Kosovë",
    "qendër thirrjesh AI Kosovë",
    "mbështetje klienti AI Kosovë",
    "pranimës virtual Prishtinë",
    "automatizim qendre thirrjesh",
    "agjent zanor shumëgjuhësh",
    "automatizim BPO Kosovë",
  ],
  en: [
    "AI receptionist Kosovo",
    "AI call centre Kosovo",
    "AI customer support Kosovo",
    "virtual receptionist Prishtina",
    "call centre automation Kosovo",
    "multilingual AI voice agent",
    "BPO automation Kosovo",
  ],
  de: [
    "KI-Rezeptionist Kosovo",
    "KI-Callcenter Kosovo",
    "KI-Kundenbetreuung Kosovo",
    "virtueller Rezeptionist Pristina",
    "Callcenter-Automatisierung Kosovo",
    "mehrsprachiger KI-Stimmapent",
    "BPO-Automatisierung Kosovo",
  ],
};

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  locale?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  locale = "sq",
}: SeoInput) {
  const url = absoluteUrl(path);
  const localeKw = baseKeywords[locale] ?? baseKeywords.sq;
  return {
    title,
    description,
    keywords: [...localeKw, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: ogLocaleMap[locale] ?? "sq_AL",
      images: [
        {
          url: absoluteUrl("/opengraph-image.png"),
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [absoluteUrl("/opengraph-image.png")],
    },
  };
}
