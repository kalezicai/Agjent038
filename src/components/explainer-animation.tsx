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
        const style = doc.createElement("style");
        style.textContent = `
          [class*="playback"], [class*="control"], [class*="timeline-bar"],
          [class*="play-bar"], [class*="scrubber"], [class*="progress"],
          [data-om-timeline], [class*="om-"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `;
        doc.head.appendChild(style);
      } catch {
        // cross-origin
      }
    };

    const handleLoad = () => {
      hideControls();
      try {
        iframe.contentWindow?.postMessage(
          { type: "explainer:play" },
          "*"
        );
      } catch {
        // ignore
      }
    };

    iframe.addEventListener("load", handleLoad);

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
