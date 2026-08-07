export const locales = ["sq", "en", "de", "fr", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sq";

export const localeNames: Record<Locale, string> = {
  sq: "Shqip",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

export const localeFlags: Record<Locale, string> = {
  sq: "🇽🇰",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  it: "🇮🇹",
};
