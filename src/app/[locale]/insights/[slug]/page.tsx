import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { JsonLd, Section } from "@/components/ui";
import { articles } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/site";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    keywords: ["AI call centre Kosovo", "Albanian voice agent guide", article.title],
  });
}

function ArticlePage({ params }: Props) {
  const { locale, slug } = use(params);
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  setRequestLocale(locale);
  const t = useTranslations("Insights");
  const tArt = useTranslations("Articles");
  const tCommon = useTranslations("Common");

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: absoluteUrl(`/insights/${article.slug}`),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
      { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/insights/${article.slug}`) },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="grid-paper radial-fade pointer-events-none absolute inset-0" />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-navy"
            >
              <span className="transition-transform duration-300">←</span>
              {tCommon("insights")}
            </Link>
            <span className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-gold">{article.category}</span>
            <h1 className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.08] md:text-[3.4rem]">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center gap-4 text-xs text-ink-mute">
              <span>
                {new Date(article.date).toLocaleDateString(locale === "sq" ? "sq-AL" : locale === "de" ? "de-DE" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-gold">·</span>
              <span>{article.readingTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper">
        <article className="mx-auto max-w-3xl prose">
          <p className="text-lg leading-relaxed text-ink-soft first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-gold">
            {article.description}
          </p>

          {article.sections.map((section) => (
            <div key={section.heading} className="mt-12">
              <h2 className="font-display text-2xl leading-snug">{section.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{section.body}</p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {article.takeaways && (
            <div className="mt-14 rounded-2xl border border-line bg-canvas/50 p-8">
              <h3 className="font-display text-lg">{tArt("takeaways")}</h3>
              <ul className="mt-4 space-y-3">
                {article.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Section>

      <Section>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-paper p-10 text-center md:p-14">
          <h2 className="font-display max-w-2xl text-2xl leading-snug md:text-3xl">
            Ready to see what containment looks like on your actual queue?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            We will audit twenty of your calls and write up what automation
            would realistically contain, at no cost.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/20"
          >
            {tCommon("requestAudit")}
          </Link>
        </div>
      </Section>
    </>
  );
}

export default ArticlePage;
