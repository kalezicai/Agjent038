"use client";

import { useEffect, useRef } from "react";

interface ExplainerAnimationProps {
  className?: string;
  locale?: string;
}

export default function ExplainerAnimation({
  className,
  locale = "en",
}: ExplainerAnimationProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let patchTimer: ReturnType<typeof setInterval> | null = null;

    const patchDocument = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        doc.documentElement.setAttribute("lang", localeRef.current);

        // Kill PlaybackBar completely
        doc.querySelectorAll("[data-omelette-chrome]").forEach((el) => {
          const s = (el as HTMLElement).style;
          s.cssText = "display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;";
        });

        // Strip every element down to zero padding/border/margin/shadow
        doc.querySelectorAll("*").forEach((el) => {
          const s = (el as HTMLElement).style;
          if (!s) return;
          if (s.borderRadius) s.borderRadius = "0";
          if (s.boxShadow && s.boxShadow !== "none") s.boxShadow = "none";
          if (s.borderColor && s.borderColor !== "transparent") s.borderColor = "transparent";
        });

        // Root: transparent, no padding
        const root = doc.querySelector("[data-om-starter]");
        if (root) {
          (root as HTMLElement).style.cssText += ";background:transparent!important;padding:0!important;margin:0!important;inset:0!important;";
        }

        // Canvas wrapper
        const canvasWrap = root?.querySelector(":scope > div:first-child") as HTMLElement | null;
        if (canvasWrap) {
          canvasWrap.style.cssText += ";padding:0!important;border-radius:0!important;background:transparent!important;border:none!important;box-shadow:none!important;";
        }

        // SVG
        const svg = doc.querySelector("svg[data-om-exportable-video-with-duration-secs]");
        if (svg) {
          (svg as HTMLElement).style.cssText += ";box-shadow:none!important;border:none!important;border-radius:0!important;";
        }

        // Loading/thumbnail
        const loading = doc.getElementById("__bundler_loading");
        if (loading) loading.style.display = "none";
        const thumb = doc.getElementById("__bundler_thumbnail");
        if (thumb) thumb.style.display = "none";

        // Inject stylesheet
        if (!doc.getElementById("agjent038-patch")) {
          const style = doc.createElement("style");
          style.id = "agjent038-patch";
          style.textContent = `
            html, body { margin: 0 !important; padding: 0 !important; background: #0a0a0a !important; overflow: hidden !important; }
            [data-omelette-chrome] { display: none !important; }
            [data-om-starter] { background: transparent !important; }
            [data-om-starter] > div:first-child { padding: 0 !important; border-radius: 0 !important; background: transparent !important; }
            svg[data-om-exportable-video-with-duration-secs] { box-shadow: none !important; border: none !important; border-radius: 0 !important; }
            #__bundler_loading, #__bundler_thumbnail { display: none !important; }
            x-dc, helmet, x-import { display: contents !important; }
          `;
          doc.head.appendChild(style);
        }

        // Post locale
        iframe.contentWindow?.postMessage(
          { type: "agjent038:locale", locale: localeRef.current },
          "*"
        );
      } catch {
        // cross-origin
      }
    };

    const handleLoad = () => {
      patchDocument();
      setTimeout(patchDocument, 300);
      setTimeout(patchDocument, 800);
      setTimeout(patchDocument, 1500);
      setTimeout(patchDocument, 3000);

      let count = 0;
      patchTimer = setInterval(() => {
        patchDocument();
        count++;
        if (count > 10) {
          clearInterval(patchTimer!);
          patchTimer = null;
        }
      }, 2000);
    };

    iframe.addEventListener("load", handleLoad);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              { type: entry.isIntersecting ? "explainer:play" : "explainer:pause" },
              "*"
            );
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(iframe);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      io.unobserve(iframe);
      if (patchTimer) clearInterval(patchTimer);
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      iframe.contentDocument?.documentElement.setAttribute("lang", locale);
      iframe.contentWindow?.postMessage({ type: "agjent038:locale", locale }, "*");
    } catch {
      // cross-origin
    }
  }, [locale]);

  return (
    <div
      className={className ?? "w-full max-w-5xl mx-auto"}
      role="img"
      aria-label="Agjent038 explainer — animated walkthrough showing how the AI voice agent works"
    >
      <div className="relative w-full" style={{ borderRadius: 0, overflow: "hidden" }}>
        <div className="relative w-full" style={{ paddingBottom: "60%" }}>
          <iframe
            ref={iframeRef}
            src="/explainer.html"
            className="absolute inset-0 h-full w-full"
            style={{ border: "none", outline: "none", boxShadow: "none", borderRadius: 0 }}
            loading="lazy"
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin"
            title="Agjent038 explainer animation"
          />
        </div>
      </div>
    </div>
  );
}
