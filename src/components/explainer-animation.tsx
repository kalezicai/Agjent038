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

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.documentElement.setAttribute("lang", localeRef.current);
        iframe.contentWindow?.postMessage(
          { type: "agjent038:locale", locale: localeRef.current },
          "*"
        );
      } catch {
        // cross-origin
      }
    };

    iframe.addEventListener("load", handleLoad);
    handleLoad();

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
      <div className="relative w-full" style={{ background: "#0a0a0a", borderRadius: 0 }}>
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
