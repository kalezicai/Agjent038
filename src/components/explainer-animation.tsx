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
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (iframeRef.current) {
          if (entry.isIntersecting) {
            iframeRef.current.contentWindow?.postMessage(
              { type: "explainer:play" },
              "*"
            );
          } else {
            iframeRef.current.contentWindow?.postMessage(
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

    const el = iframeRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      className={className ?? "w-full max-w-5xl mx-auto"}
      role="img"
      aria-label="Agjent038 explainer — animated walkthrough showing how the AI voice agent works"
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-canvas shadow-soft">
        <div className="relative w-full" style={{ paddingBottom: "60%" }}>
          <iframe
            ref={iframeRef}
            src="/explainer.html"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allow="autoplay"
            title="Agjent038 explainer animation"
          />
        </div>
      </div>
    </div>
  );
}
