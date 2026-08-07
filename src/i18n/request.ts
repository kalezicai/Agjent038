import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined;
  try {
    locale = await requestLocale;
  } catch {
    // During static export, requestLocale calls headers() which is unavailable
  }
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "sq";
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
