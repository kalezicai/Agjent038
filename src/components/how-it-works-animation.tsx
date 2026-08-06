"use client";

import { useEffect, useRef, useState } from "react";

type LottiePlayer = {
  load: (options: { path: string; loop?: boolean; autoplay?: boolean }) => void;
  play: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (options: {
        container: HTMLElement;
        renderer: string;
        loop: boolean;
        autoplay: boolean;
        path: string;
      }) => LottiePlayer;
    };
  }
}

interface HowItWorksAnimationProps {
  className?: string;
}

export default function HowItWorksAnimation({ className }: HowItWorksAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<LottiePlayer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) return;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
    return () => {
      script.onload = null;
    };
  }, [scriptLoaded]);

  useEffect(() => {
    if (!isVisible || !scriptLoaded || !containerRef.current) return;
    if (playerRef.current) return;

    const lottie = window.lottie;
    if (!lottie) return;

    const player = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/projects/how-it-works/scene-1/lottie.json",
    });

    playerRef.current = player;

    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, [isVisible, scriptLoaded]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "w-full max-w-4xl mx-auto aspect-video"}
      role="img"
      aria-label="How Agjent038 works — animated walkthrough of the AI voice agent call flow"
    />
  );
}
