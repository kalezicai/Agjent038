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
  priceFrom: 499,
  currency: "USD",
  languages: ["Albanian", "English", "Serbian", "German", "Turkish"],
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
    "automatizim qendre thirrjesh shqip",
    "agjent zanor gjuhë shqipe",
    "automatizim BPO Kosovë",
  ],
  en: [
    "AI receptionist Kosovo",
    "AI call centre Kosovo",
    "AI customer support Kosovo",
    "virtual receptionist Prishtina",
    "call centre automation Albanian",
    "AI voice agent Albanian language",
    "BPO automation Kosovo",
  ],
  de: [
    "KI-Rezeptionist Kosovo",
    "KI-Callcenter Kosovo",
    "KI-Kundenbetreuung Kosovo",
    "virtueller Rezeptionist Pristina",
    "Callcenter-Automatisierung Albanisch",
    "KI-Stimmapent Albanische Sprache",
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
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
