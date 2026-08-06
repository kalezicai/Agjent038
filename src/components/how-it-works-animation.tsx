"use client";

import { useEffect, useRef, useState } from "react";

interface HowItWorksAnimationProps {
  className?: string;
}

export default function HowItWorksAnimation({ className }: HowItWorksAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
        } else {
          setRun(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const d = (s: number) => (run ? `${s}s` : undefined);

  return (
    <div
      ref={containerRef}
      className={className ?? "w-full max-w-4xl mx-auto aspect-video"}
      role="img"
      aria-label="How Agjent038 works — animated walkthrough of the AI voice agent call flow"
    >
      <style>{`
        .hiw{position:relative;width:100%;height:100%;background:#f8f8f6;border-radius:16px;overflow:hidden}
        .hiw *{position:absolute;box-sizing:border-box}
        .hiw-run .hiw-pop{animation:hiw-pop .5s cubic-bezier(.2,.8,.3,1.2) both}
        .hiw-run .hiw-fade{animation:hiw-fade .35s ease both}
        .hiw-run .hiw-bounce{animation:hiw-bounce .55s cubic-bezier(.2,.8,.3,1.3) both}
        .hiw-run .hiw-slide{animation:hiw-slide .4s ease both}
        .hiw-run .hiw-pulse{animation:hiw-pulse 2s ease-in-out infinite}
        .hiw-run .hiw-check{animation:hiw-check .4s ease both}
        @keyframes hiw-pop{0%{transform:var(--t) scale(0);opacity:0}60%{transform:var(--t) scale(1.1)}100%{transform:var(--t) scale(1);opacity:1}}
        @keyframes hiw-fade{0%{opacity:0}100%{opacity:1}}
        @keyframes hiw-bounce{0%{transform:var(--t,translate(-50%,-50%)) translateY(20px) scale(0);opacity:0}60%{transform:var(--t,translate(-50%,-50%)) translateY(-4px) scale(1.06)}100%{transform:var(--t,translate(-50%,-50%)) translateY(0) scale(1);opacity:1}}
        @keyframes hiw-slide{0%{opacity:0;transform:translateY(-50%) translateX(-14px)}100%{opacity:1;transform:translateY(-50%) translateX(0)}}
        @keyframes hiw-pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.25}50%{transform:translate(-50%,-50%) scale(1.35);opacity:0}}
        @keyframes hiw-check{0%{stroke-dashoffset:40;opacity:0}100%{stroke-dashoffset:0;opacity:1}}
      `}</style>

      <div className={`hiw ${run ? "hiw-run" : ""}`}>
        {/* Phase 1: Incoming call */}
        <div className="hiw-pop" style={{"--t":"translate(-50%,-50%)" as React.CSSProperties, left:"12%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", background:"#0e2440", opacity:0, animationDelay:d(0)}} />
        <div className="hiw-fade" style={{left:"12%", top:"50%", transform:"translate(-50%,-50%)", width:"2.5%", height:"5.5%", borderRadius:5, background:"#fff", opacity:0, animationDelay:d(0.3)}} />
        <div className="hiw-fade" style={{left:"12%", top:"calc(50% + 1.2%)", transform:"translate(-50%,-50%)", width:"1.8%", height:"3.2%", borderRadius:2, background:"#b8dbe8", opacity:0, animationDelay:d(0.3)}} />
        <div className="hiw-pulse" style={{left:"12%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", border:"2px solid #0e2440", opacity:0, animationDelay:d(0.1)}} />

        {/* Arrow 1 */}
        <div className="hiw-fade" style={{left:"24%", top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", opacity:0, animationDelay:d(0.8)}}>
          <div style={{width:"3.5vw", maxWidth:40, height:2, background:"#b8dbe8", borderRadius:1}} />
          <div style={{width:0, height:0, borderTop:"5px solid transparent", borderBottom:"5px solid transparent", borderLeft:"7px solid #b8dbe8"}} />
        </div>

        {/* Phase 2: AI processes */}
        <div className="hiw-bounce" style={{"--t":"translate(-50%,-50%)" as React.CSSProperties, left:"48%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", background:"#0f766e", opacity:0, animationDelay:d(1.5)}} />
        <div className="hiw-fade" style={{left:"48%", top:"50%", transform:"translate(-50%,-50%)", width:"6%", aspectRatio:"1", borderRadius:6, background:"#fff", opacity:0, animationDelay:d(1.7)}} />
        <div className="hiw-pulse" style={{left:"48%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", border:"2px solid #0f766e", opacity:0, animationDelay:d(1.8)}} />

        {/* Chat bubble: caller */}
        <div className="hiw-slide" style={{left:"40%", top:"22%", width:"11%", height:"5%", borderRadius:10, background:"#0e2440", opacity:0, animationDelay:d(2.2)}} />
        <div className="hiw-fade" style={{left:"43.5%", top:"22%", transform:"translateY(-50%)", display:"flex", gap:3, opacity:0, animationDelay:d(2.5)}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width:4, height:4, borderRadius:"50%", background:"#fff", opacity:0, animation: run ? `hiw-fade .3s ease ${2.5 + i * 0.15}s both` : undefined}} />
          ))}
        </div>

        {/* Chat bubble: AI response */}
        <div className="hiw-slide" style={{left:"40%", top:"78%", width:"11%", height:"5%", borderRadius:10, background:"#0f766e", opacity:0, animationDelay:d(2.8)}} />
        <div className="hiw-fade" style={{left:"42.5%", top:"76.5%", width:"7%", height:1.5, borderRadius:1, background:"rgba(255,255,255,0.5)", opacity:0, animationDelay:d(3)}} />
        <div className="hiw-fade" style={{left:"42.5%", top:"79.5%", width:"5%", height:1.5, borderRadius:1, background:"rgba(255,255,255,0.5)", opacity:0, animationDelay:d(3.1)}} />

        {/* Arrow 2 */}
        <div className="hiw-fade" style={{left:"60%", top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", opacity:0, animationDelay:d(3.5)}}>
          <div style={{width:"3.5vw", maxWidth:40, height:2, background:"#b8dbe8", borderRadius:1}} />
          <div style={{width:0, height:0, borderTop:"5px solid transparent", borderBottom:"5px solid transparent", borderLeft:"7px solid #b8dbe8"}} />
        </div>

        {/* Phase 3: Task complete */}
        <div className="hiw-bounce" style={{"--t":"translate(-50%,-50%)" as React.CSSProperties, left:"84%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", background:"#b28a4c", opacity:0, animationDelay:d(4.2)}} />
        <div className="hiw-fade" style={{left:"84%", top:"50%", transform:"translate(-50%,-50%)", opacity:0, animationDelay:d(4.5)}}>
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <path className="hiw-check" d="M3 11L10 18L25 4" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray:40, strokeDashoffset:40, opacity:0, animationDelay:d(4.5)}} />
          </svg>
        </div>
        <div className="hiw-pulse" style={{left:"84%", top:"50%", width:"13%", aspectRatio:"1", borderRadius:"50%", background:"rgba(178,138,76,0.2)", opacity:0, animationDelay:d(4.6)}} />

        {/* Labels */}
        <div className="hiw-fade" style={{left:"12%", top:"84%", transform:"translateX(-50%)", padding:"3px 12px", borderRadius:11, background:"rgba(14,36,64,0.8)", color:"#fff", fontSize:"clamp(8px,1.1vw,11px)", fontWeight:500, letterSpacing:"0.05em", whiteSpace:"nowrap" as const, opacity:0, animationDelay:d(0.2)}}>Incoming</div>
        <div className="hiw-fade" style={{left:"48%", top:"84%", transform:"translateX(-50%)", padding:"3px 12px", borderRadius:11, background:"rgba(15,118,110,0.8)", color:"#fff", fontSize:"clamp(8px,1.1vw,11px)", fontWeight:500, letterSpacing:"0.05em", whiteSpace:"nowrap" as const, opacity:0, animationDelay:d(1.6)}}>AI handles</div>
        <div className="hiw-fade" style={{left:"84%", top:"84%", transform:"translateX(-50%)", padding:"3px 12px", borderRadius:11, background:"rgba(178,138,76,0.8)", color:"#fff", fontSize:"clamp(8px,1.1vw,11px)", fontWeight:500, letterSpacing:"0.05em", whiteSpace:"nowrap" as const, opacity:0, animationDelay:d(4.3)}}>Done</div>
      </div>
    </div>
  );
}
