"use client";

import { useEffect, useRef } from "react";

interface ExplainerAnimationProps {
  className?: string;
}

export default function ExplainerAnimation({
  className,
}: ExplainerAnimationProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const hideControls = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Hide the PlaybackBar
        doc.querySelectorAll("[data-omelette-chrome]").forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });

        // Fix the root container: remove dark background frame
        const root = doc.querySelector("[data-om-starter]");
        if (root) {
          (root as HTMLElement).style.background = "transparent";
        }

        // Fix the canvas wrapper: remove padding, border-radius, background
        const canvasWrap =
          root?.querySelector(":scope > div:first-child") as HTMLElement | null;
        if (canvasWrap) {
          canvasWrap.style.padding = "0";
          canvasWrap.style.borderRadius = "0";
          canvasWrap.style.background = "transparent";
        }

        // Remove SVG box-shadow and border
        const svg = doc.querySelector(
          "svg[data-om-exportable-video-with-duration-secs]"
        );
        if (svg) {
          (svg as HTMLElement).style.boxShadow = "none";
          (svg as HTMLElement).style.border = "none";
          (svg as HTMLElement).style.borderRadius = "0";
        }

        // Hide loading / thumbnail overlays
        const loading = doc.getElementById("__bundler_loading");
        if (loading) loading.style.display = "none";
        const thumb = doc.getElementById("__bundler_thumbnail");
        if (thumb) thumb.style.display = "none";

        // Catch-all stylesheet
        const style = doc.createElement("style");
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
      } catch {
        // cross-origin — cannot access
      }
    };

    const handleLoad = () => {
      hideControls();
      // Re-run after a short delay to catch dynamically rendered elements
      setTimeout(hideControls, 500);
      setTimeout(hideControls, 1500);
    };

    iframe.addEventListener("load", handleLoad);

    // IntersectionObserver for play/pause
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (iframe.contentWindow) {
          if (entry.isIntersecting) {
            iframe.contentWindow.postMessage(
              { type: "explainer:play" },
              "*"
            );
          } else {
            iframe.contentWindow.postMessage(
              { type: "explainer:pause" },
              "*"
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(iframe);
    return () => {
      iframe.removeEventListener("load", handleLoad);
      observer.unobserve(iframe);
    };
  }, []);

  return (
    <div
      className={className ?? "w-full max-w-5xl mx-auto"}
      role="img"
      aria-label="Agjent038 explainer — animated walkthrough showing how the AI voice agent works"
    >
      <div className="relative w-full overflow-hidden rounded-2xl bg-canvas">
        <div className="relative w-full" style={{ paddingBottom: "60%" }}>
          <iframe
            ref={iframeRef}
            src="/explainer.html"
            className="absolute inset-0 h-full w-full"
            style={{ border: "none", outline: "none", boxShadow: "none" }}
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
