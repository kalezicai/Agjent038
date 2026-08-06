"use client";

import { useTranslations } from "next-intl";
import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="grid-paper radial-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display mt-6 max-w-xl text-3xl leading-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          {t("description")}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">{t("home")}</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            {t("contact")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
