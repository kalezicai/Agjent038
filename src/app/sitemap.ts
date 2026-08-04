import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { locales, defaultLocale } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solutions", priority: 0.85, changeFrequency: "monthly" },
    { path: "/results", priority: 0.85, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/company", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      const path = `/${locale}${route.path}`;
      entries.push({
        url: absoluteUrl(path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, absoluteUrl(`/${l}${route.path}`)])
          ),
        },
      });
    }
  }

  for (const article of articles) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}/insights/${article.slug}`),
        lastModified: new Date(article.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, absoluteUrl(`/${l}/insights/${article.slug}`)])
          ),
        },
      });
    }
  }

  return entries;
}
