export const site = {
  name: "Agjent038",
  legalName: "Agjent038 Sh.p.k.",
  tagline: "Pranimës AI për qendrat e thirrjeve në Kosovë",
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

export const nav: { label: string; href: string }[] = [
  { label: "Platforma", href: "/platform" },
  { label: "Zgjidhjet", href: "/solutions" },
  { label: "Rezultatet", href: "/results" },
  { label: "Çmimet", href: "/pricing" },
  { label: "Njohuritë", href: "/insights" },
  { label: "Kompania", href: "/company" },
];

export function absoluteUrl(path = "/") {
  return `${site.domain}${path}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: SeoInput) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords: [
      "pranimës AI Kosovë",
      "qendër thirrjesh AI Kosovë",
      "mbështetje klienti AI Kosovë",
      "pranimës virtual Prishtinë",
      "automatizim qendre thirrjesh shqip",
      "agjent zanor gjuhë shqipe",
      "automatizim BPO Kosovë",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "sq_AL",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
