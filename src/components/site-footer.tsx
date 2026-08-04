import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations, getMessages } from "next-intl/server";
import { site } from "@/lib/site";

const solutionsLinks = [
  { slug: "call-centers" },
  { slug: "clinics" },
  { slug: "hospitality" },
  { slug: "radhë-logjistika" },
  { slug: "shërbime-financiare" },
];

export default async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tProductLinks = await getTranslations({ locale, namespace: "FooterProductLinks" });
  const messages = await getMessages({ locale });
  const solutionsList = (messages.SolutionsList ?? []) as Array<{ slug: string; name: string }>;
  const solutionsMap = new Map(solutionsList.map((s) => [s.slug, s.name]));

  const columns = [
    {
      title: t("product"),
      links: [
        { label: tProductLinks("platform"), href: "/platform" },
        { label: tProductLinks("pricing"), href: "/pricing" },
        { label: tProductLinks("results"), href: "/results" },
        { label: tProductLinks("faq"), href: "/faq" },
      ],
    },
    {
      title: t("solutions"),
      links: solutionsLinks.map((s) => ({
        label: solutionsMap.get(s.slug) ?? s.slug,
        href: `/solutions#${s.slug}`,
      })),
    },
    {
      title: t("company"),
      links: [
        { label: t("about"), href: "/company" },
        { label: t("insights"), href: "/insights" },
        { label: t("contact"), href: "/contact" },
        { label: tProductLinks("bookDemo"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
                <span className="font-display text-lg leading-none">A</span>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-display text-lg">{site.name}</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-mute">
              {t("description")}
            </p>
            <div className="mt-6 space-y-1 text-sm text-ink-soft">
              <p>{site.address.street}</p>
              <p>
                {site.address.postalCode} {site.address.city},{" "}
                {site.address.countryName}
              </p>
              <p className="pt-2">
                <a
                  className="transition-colors hover:text-navy"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  className="transition-colors hover:text-navy"
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-mute">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors duration-300 hover:text-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-14 flex flex-col gap-4 pt-8 text-xs text-ink-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t("copyright")}
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{t("gdpr")}</span>
            <span>{t("euResidency")}</span>
            <span>{t("fromPrice")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
