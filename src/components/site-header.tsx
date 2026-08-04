"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import LanguageSwitcher from "@/components/language-switcher";

function Mark() {
  return (
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
      <span className="font-display text-lg leading-none">A</span>
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
    </span>
  );
}

const navItems = [
  { key: "platform", href: "/platform" },
  { key: "solutions", href: "/solutions" },
  { key: "results", href: "/results" },
  { key: "pricing", href: "/pricing" },
  { key: "insights", href: "/insights" },
  { key: "company", href: "/company" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  const isActive = (href: string) => {
    const clean = pathname.replace(/^\/(sq|en|de)(\/|$)/, "/") || "/";
    return clean === href || clean.startsWith(`${href}/`);
  };
  const tHome = useTranslations("Home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-line"
          : "border-b border-transparent bg-canvas"
      }`}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Mark />
            <span className="leading-tight">
              <span className="font-display block text-lg text-ink">
                {site.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                Prishtinë
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
            >
              {tHome("heroCta")}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-paper lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-paper transition-all duration-500 lg:hidden ${
          open ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="shell flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <LanguageSwitcher />
          </div>
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-navy px-5 py-3 text-center text-sm font-medium text-white"
          >
            {tHome("heroCta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
