"use client";

import { useEffect, useRef, useState } from "react";

interface HowItWorksTranslations {
  headline: string;
  subtitle: string;
  steps: Array<{ num: string; label: string; title: string; desc: string }>;
  callerMessage: string;
  aiMessage: string;
  dashboard: {
    live: string;
    title: string;
    kpis: Array<{ label: string; value: string; delta: string }>;
    chartLabel: string;
  };
  toast: { title: string; sub: string };
  tablet: {
    success: string;
    successDesc: string;
    stats: Array<{ label: string; value: string }>;
    summaryTitle: string;
    summaryBody: string;
  };
}

interface HowItWorksAnimationProps {
  translations: HowItWorksTranslations;
  className?: string;
}

export default function HowItWorksAnimation({
  translations: t,
  className,
}: HowItWorksAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [counters, setCounters] = useState({ calls: 0, contain: 0, missed: 412 });
  const [showToast, setShowToast] = useState(false);
  const [showAiMsg, setShowAiMsg] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
        } else {
          setRun(false);
          setActiveStep(0);
          setCounters({ calls: 0, contain: 0, missed: 412 });
          setShowToast(false);
          setShowAiMsg(false);
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    timersRef.current.push(
      setTimeout(() => setActiveStep(1), 0),
      setTimeout(() => setActiveStep(2), 1800),
      setTimeout(() => {
        const duration = 1200;
        const start = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCounters({
            calls: Math.round(1284 * ease),
            contain: Math.round(68 * ease),
            missed: Math.round(412 * (1 - ease)),
          });
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, 2200),
      setTimeout(() => setShowAiMsg(true), 3000),
      setTimeout(() => setActiveStep(3), 3800),
      setTimeout(() => setShowToast(true), 4200)
    );

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [run]);

  const d = (s: number) => (run ? `${s}s` : undefined);

  return (
    <div
      ref={containerRef}
      className={className ?? "w-full max-w-5xl mx-auto"}
      role="img"
      aria-label="How Agjent038 works — animated walkthrough of the AI voice agent call flow"
    >
      <style>{`
        .hiw{position:relative;width:100%;aspect-ratio:1040/580;background:var(--canvas,#f8f8f6);border-radius:24px;overflow:hidden;font-family:var(--font-s,ui-sans-serif,system-ui,sans-serif)}
        .hiw::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,#d6d5d0 0.5px,transparent 0.5px);background-size:24px 24px;opacity:.22;pointer-events:none}
        .hiw *{box-sizing:border-box}
        .hiw-headline{position:absolute;top:28px;left:50%;transform:translateX(-50%);text-align:center;z-index:10;white-space:nowrap}
        .hiw-headline-t{font-family:var(--font-d,"Iowan Old Style","Palatino Linotype","Book Antiqua",Palatino,Georgia,serif);font-size:clamp(16px,2.5vw,26px);font-weight:700;letter-spacing:-.03em;color:var(--ink,#0b1220)}
        .hiw-headline-s{font-size:clamp(8px,1.1vw,11px);color:var(--ink-m,#6b7488);margin-top:6px;font-weight:500}
        .hiw-steps{position:absolute;top:72px;left:50%;transform:translateX(-50%);display:flex;gap:clamp(80px,17vw,180px);z-index:10}
        .hiw-step{display:flex;align-items:center;gap:6px;opacity:0;transition:opacity .5s ease}
        .hiw-step.vis{opacity:1}
        .hiw-step-n{font-family:var(--font-d,"Iowan Old Style","Palatino Linotype","Book Antiqua",Palatino,Georgia,serif);font-size:clamp(9px,1.1vw,11px);font-weight:700;color:var(--line,#e6e5e0);transition:color .5s ease}
        .hiw-step-n.done{color:var(--navy,#0e2440)}
        .hiw-step-l{font-size:clamp(7px,0.9vw,9px);color:var(--ink-m,#6b7488);font-weight:500;text-transform:uppercase;letter-spacing:.06em}
        .hiw-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;height:100%;padding:0 clamp(24px,5vw,52px);padding-top:96px}
        .hiw-col{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}
        .hiw-phone{width:clamp(70px,11.5vw,120px);aspect-ratio:120/228;background:var(--ink,#0b1220);border-radius:clamp(14px,2.3vw,24px);position:relative;box-shadow:0 24px 56px rgba(11,18,32,0.3);opacity:0;transform:scale(0);transition:all .65s cubic-bezier(.175,.885,.32,1.275)}
        .hiw-phone.vis{opacity:1;transform:scale(1)}
        .hiw-phone-screen{position:absolute;top:8px;left:5px;right:5px;bottom:8px;background:var(--paper,#fff);border-radius:clamp(10px,1.7vw,18px);overflow:hidden}
        .hiw-phone-notch{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:34px;height:4px;background:var(--ink,#0b1220);border-radius:2px;z-index:2}
        .hiw-phone-bar{position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.06)}
        .hiw-waveform{display:flex;align-items:center;justify-content:center;gap:2px;height:28px;padding:0 12px;opacity:0;transition:opacity .5s ease .8s}
        .hiw-waveform.vis{opacity:1}
        .hiw-wave-bar{width:3px;border-radius:2px;background:var(--mint,#0f766e);transform-origin:center}
        .hiw-wave-bar.on{animation:hiw-wave 1.2s ease-in-out infinite}
        @keyframes hiw-wave{0%,100%{height:4px;opacity:.4}50%{height:22px;opacity:1}}
        .hiw-mic-wrap{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .5s ease .8s}
        .hiw-mic-wrap.vis{opacity:1}
        .hiw-mic-pulse{position:absolute;width:36px;height:36px;border-radius:50%;border:1.5px solid var(--mint,#0f766e);opacity:0}
        .hiw-mic-pulse.on{animation:hiw-mic-pulse 2s ease-out infinite}
        @keyframes hiw-mic-pulse{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.8);opacity:0}}
        .hiw-mic{width:30px;height:30px;border-radius:50%;background:var(--mint,#0f766e);display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
        .hiw-laptop{width:clamp(160px,28vw,290px);position:relative;opacity:0;transform:scale(0);transition:all .65s cubic-bezier(.175,.885,.32,1.275) 1.8s}
        .hiw-laptop.vis{opacity:1;transform:scale(1)}
        .hiw-laptop-lid{width:100%;aspect-ratio:290/176;background:var(--ink,#0b1220);border-radius:clamp(6px,0.9vw,10px) clamp(6px,0.9vw,10px) 0 0;padding:clamp(4px,0.65vw,7px);position:relative;box-shadow:0 12px 40px rgba(11,18,32,0.25)}
        .hiw-laptop-screen{width:100%;height:100%;background:var(--canvas,#f8f8f6);border-radius:clamp(2px,0.35vw,4px);overflow:hidden}
        .hiw-laptop-cam{position:absolute;top:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:#333;border-radius:50%}
        .hiw-laptop-base{position:absolute;bottom:0;left:-12px;right:-12px;height:9px;background:linear-gradient(#c8c8c8,#aaa);border-radius:0 0 6px 6px}
        .hiw-laptop-base::after{content:'';position:absolute;top:2px;left:50%;transform:translateX(-50%);width:44px;height:2.5px;background:rgba(0,0,0,0.06);border-radius:1px}
        .hiw-d-bar{height:clamp(10px,1.5vw,16px);background:var(--paper,#fff);border-bottom:1px solid var(--line,#e6e5e0);display:flex;align-items:center;gap:3.5px;padding:0 6px}
        .hiw-d-dot{width:4px;height:4px;border-radius:50%}
        .hiw-d-live{margin-left:auto;font-size:clamp(3.5px,0.5vw,5px);color:var(--mint,#0f766e);font-weight:700;text-transform:uppercase;letter-spacing:.08em;display:flex;align-items:center;gap:2.5px}
        .hiw-d-live-dot{width:3px;height:3px;background:var(--mint,#0f766e);border-radius:50%;animation:hiw-blink 1.5s ease-in-out infinite}
        @keyframes hiw-blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hiw-d-kpis{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:6px}
        .hiw-d-kpi{background:var(--paper,#fff);border-radius:6px;padding:6px 7px;box-shadow:0 1px 3px rgba(11,18,32,0.04)}
        .hiw-d-kpi-l{font-size:clamp(3.5px,0.5vw,5px);color:var(--ink-m,#6b7488);text-transform:uppercase;letter-spacing:.05em;font-weight:600}
        .hiw-d-kpi-v{font-size:clamp(8px,1.15vw,12px);font-weight:800;color:var(--navy,#0e2440);margin-top:2px;font-family:var(--font-d,"Iowan Old Style","Palatino Linotype","Book Antiqua",Palatino,Georgia,serif)}
        .hiw-d-kpi-d{font-size:clamp(3.5px,0.5vw,5px);font-weight:700;color:var(--mint,#0f766e)}
        .hiw-d-chart{margin:0 6px;background:var(--paper,#fff);border-radius:6px;padding:6px;box-shadow:0 1px 3px rgba(11,18,32,0.04)}
        .hiw-d-chart-l{font-size:clamp(3.5px,0.5vw,5px);color:var(--ink-m,#6b7488);text-transform:uppercase;letter-spacing:.05em;font-weight:600;margin-bottom:5px}
        .hiw-d-bars{display:flex;align-items:flex-end;gap:2.5px;height:40px}
        .hiw-d-b{flex:1;border-radius:2px 2px 0 0;transform-origin:bottom;transform:scaleY(0);transition:transform .8s cubic-bezier(.22,1,.36,1)}
        .hiw-d-b.vis{transform:scaleY(1)}
        .hiw-tab{width:clamp(80px,13.3vw,138px);aspect-ratio:138/192;background:var(--ink,#0b1220);border-radius:clamp(10px,1.5vw,16px);position:relative;box-shadow:0 24px 56px rgba(11,18,32,0.25);padding:clamp(4px,0.65vw,7px);opacity:0;transform:scale(0);transition:all .65s cubic-bezier(.175,.885,.32,1.275) 4.2s}
        .hiw-tab.vis{opacity:1;transform:scale(1)}
        .hiw-tab-screen{width:100%;height:100%;background:var(--paper,#fff);border-radius:clamp(6px,1vw,11px);overflow:hidden;position:relative}
        .hiw-toast{position:absolute;top:14px;right:14px;left:14px;background:var(--paper,#fff);border-radius:8px;padding:8px 10px;box-shadow:0 4px 16px rgba(11,18,32,0.1);border-left:3px solid var(--mint,#0f766e);display:flex;align-items:center;gap:7px;opacity:0;transform:translateX(20px);transition:all .5s cubic-bezier(.22,1,.36,1)}
        .hiw-toast.vis{opacity:1;transform:translateX(0)}
        .hiw-toast-icon{width:20px;height:20px;border-radius:50%;background:var(--mint,#0f766e);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .hiw-toast-text{font-size:clamp(4px,0.55vw,5.5px);color:var(--ink,#0b1220);font-weight:600;line-height:1.4}
        .hiw-toast-sub{font-size:clamp(3px,0.45vw,4.5px);color:var(--ink-m,#6b7488);font-weight:400;margin-top:1px}
        .hiw-conn{position:absolute;top:50%;display:flex;align-items:center;transform:translateY(-50%);opacity:0;transition:opacity .5s ease}
        .hiw-conn.vis{opacity:1}
        .hiw-conn-line{height:1.5px;width:clamp(28px,5.4vw,56px);background:var(--line,#e6e5e0);border-radius:1px;position:relative;overflow:visible}
        .hiw-conn-arr{width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:6px solid var(--line,#e6e5e0)}
        .hiw-bub{position:absolute;padding:clamp(6px,1.1vw,11px) clamp(10px,1.6vw,17px);border-radius:clamp(7px,1.15vw,12px);font-size:clamp(7px,1vw,10.5px);font-weight:500;line-height:1.55;max-width:clamp(95px,16vw,165px);box-shadow:0 10px 28px -6px rgba(11,18,32,0.12);opacity:0;transform:translateX(-28px);transition:all .5s cubic-bezier(.22,1,.36,1)}
        .hiw-bub.vis{opacity:1;transform:translateX(0)}
        .hiw-bub-user{background:var(--navy,#0e2440);color:#fff;border-bottom-left-radius:4px}
        .hiw-bub-ai{background:var(--mint,#0f766e);color:#fff;border-bottom-right-radius:4px}
        .hiw-typing{display:flex;gap:3px;align-items:center;padding:2px 0}
        .hiw-typing-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,0.6)}
        .hiw-typing-dot.on{animation:hiw-typing-bounce .6s ease-in-out infinite}
        .hiw-typing-dot:nth-child(2).on{animation-delay:.15s}
        .hiw-typing-dot:nth-child(3).on{animation-delay:.3s}
        @keyframes hiw-typing-bounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}
        .hiw-lbl{text-align:center;position:absolute;left:50%;transform:translateX(-50%);opacity:0;transition:all .55s cubic-bezier(.22,1,.36,1)}
        .hiw-lbl.vis{opacity:1;transform:translateX(-50%) translateY(0)}
        .hiw-lbl-t{font-size:clamp(10px,1.45vw,15px);font-weight:700;letter-spacing:-.025em;font-family:var(--font-d,"Iowan Old Style","Palatino Linotype","Book Antiqua",Palatino,Georgia,serif);color:var(--ink,#0b1220)}
        .hiw-lbl-s{font-size:clamp(6px,0.82vw,8.5px);color:var(--ink-m,#6b7488);margin-top:4px;font-weight:500;line-height:1.4}
        .hiw-mesh{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;opacity:0;transition:opacity 1s ease}
        .hiw-mesh.vis{opacity:1}
        .hiw-mesh-1{left:-40px;top:100px;width:260px;height:260px;background:linear-gradient(135deg,rgba(14,36,64,0.09),rgba(14,36,64,0.02))}
        .hiw-mesh-2{left:380px;top:-40px;width:300px;height:300px;background:linear-gradient(135deg,rgba(15,118,110,0.07),rgba(15,118,110,0.01))}
        .hiw-mesh-3{right:-30px;top:120px;width:240px;height:240px;background:linear-gradient(135deg,rgba(178,138,76,0.08),rgba(178,138,76,0.02))}
        .hiw-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden}
        .hiw-p{position:absolute;width:2px;height:2px;border-radius:50%;opacity:0}
        .hiw-p-n{background:var(--navy,#0e2440)}.hiw-p-m{background:var(--mint,#0f766e)}.hiw-p-g{background:var(--gold,#b28a4c)}
        @keyframes hiw-particle{0%{transform:translate(0,0);opacity:0}15%{opacity:.4}85%{opacity:.4}100%{transform:translate(var(--dx),var(--dy));opacity:0}}
      `}</style>

      <div className="hiw">
        {/* Mesh blobs */}
        <div className={`hiw-mesh hiw-mesh-1 ${run ? "vis" : ""}`} />
        <div className={`hiw-mesh hiw-mesh-2 ${run ? "vis" : ""}`} style={{ transitionDelay: ".5s" }} />
        <div className={`hiw-mesh hiw-mesh-3 ${run ? "vis" : ""}`} style={{ transitionDelay: "1s" }} />

        {/* Particles */}
        <div className="hiw-particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className={`hiw-p hiw-p-${["n", "m", "g"][i % 3]}`}
              style={{
                left: `${(i * 7.1 + 3) % 100}%`,
                top: `${(i * 11.3 + 5) % 100}%`,
                ["--dx" as string]: `${(i * 4.3 - 30)}px`,
                ["--dy" as string]: `${(i * 5.7 - 30)}px`,
                animation: run ? `hiw-particle ${6 + (i % 5)}s ease-in-out ${(i * 0.7) % 4}s infinite` : undefined,
              }}
            />
          ))}
        </div>

        {/* Headline */}
        <div className="hiw-headline" style={{ opacity: run ? 1 : 0, transition: "opacity .5s ease .2s" }}>
          <div className="hiw-headline-t">{t.headline}</div>
          <div className="hiw-headline-s">{t.subtitle}</div>
        </div>

        {/* Step numbers */}
        <div className="hiw-steps">
          {t.steps.map((step, i) => (
            <div key={step.num} className={`hiw-step ${run ? "vis" : ""}`} style={{ transitionDelay: `${i * 1.8}s` }}>
              <span className={`hiw-step-n ${activeStep >= i + 1 ? "done" : ""}`}>{step.num}</span>
              <span className="hiw-step-l">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="hiw-grid">
          {/* Col 1: Phone */}
          <div className="hiw-col">
            <div className={`hiw-phone ${run ? "vis" : ""}`}>
              <div className="hiw-phone-screen">
                <div className="hiw-phone-notch" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "22px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,var(--navy,#0e2440),var(--navy-s,#1d3c63))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(14,36,64,0.25)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div style={{ fontSize: "8.5px", fontWeight: 700, color: "var(--navy,#0e2440)", marginTop: "8px", fontFamily: "var(--font-d,serif)" }}>+383 49 123 456</div>
                  <div style={{ fontSize: "6px", color: "var(--ink-m,#6b7488)", marginTop: "2px", fontWeight: 500 }}>{t.steps[0].title}</div>
                </div>
                <div className={`hiw-waveform ${run ? "vis" : ""}`}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="hiw-wave-bar on" style={{ height: "4px", animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <div className={`hiw-mic-wrap ${run ? "vis" : ""}`}>
                  <div className="hiw-mic-pulse on" />
                  <div className="hiw-mic">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "10px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "20px" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 01-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 00-2.67-1.85.996.996 0 01-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
                  </div>
                </div>
              </div>
              <div className="hiw-phone-bar" />
            </div>
            <div className={`hiw-lbl ${run ? "vis" : ""}`} style={{ bottom: "-32px", transitionDelay: ".4s" }}>
              <div className="hiw-lbl-t">{t.steps[0].title}</div>
              <div className="hiw-lbl-s">{t.steps[0].desc}</div>
            </div>
          </div>

          {/* Col 2: Laptop */}
          <div className="hiw-col">
            <div className={`hiw-laptop ${run ? "vis" : ""}`}>
              <div className="hiw-laptop-lid">
                <div className="hiw-laptop-cam" />
                <div className="hiw-laptop-screen">
                  <div className="hiw-d-bar">
                    <div className="hiw-d-dot" style={{ background: "#ff5f57" }} />
                    <div className="hiw-d-dot" style={{ background: "#febc2e" }} />
                    <div className="hiw-d-dot" style={{ background: "#28c840" }} />
                    <span style={{ fontSize: "clamp(3.5px,0.5vw,5px)", color: "var(--ink-m,#6b7488)", marginLeft: "6px", fontWeight: 600 }}>{t.dashboard.title}</span>
                    <div className="hiw-d-live"><div className="hiw-d-live-dot" />{t.dashboard.live}</div>
                  </div>
                  <div className="hiw-d-kpis">
                    {t.dashboard.kpis.map((kpi, i) => (
                      <div key={kpi.label} className="hiw-d-kpi">
                        <div className="hiw-d-kpi-l">{kpi.label}</div>
                        <div className="hiw-d-kpi-v">
                          {i === 0 ? counters.calls.toLocaleString() : i === 1 ? `${counters.contain}%` : i === 3 ? counters.missed : kpi.value}
                        </div>
                        <div className="hiw-d-kpi-d">{kpi.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hiw-d-chart">
                    <div className="hiw-d-chart-l">{t.dashboard.chartLabel}</div>
                    <div className="hiw-d-bars">
                      {[30, 45, 38, 60, 52, 72, 65, 82, 76, 92, 86, 96].map((h, i) => (
                        <div
                          key={i}
                          className={`hiw-d-b ${run ? "vis" : ""}`}
                          style={{
                            height: `${h}%`,
                            background: i < 7 ? "var(--navy,#0e2440)" : i < 11 ? "var(--mint,#0f766e)" : "var(--gold,#b28a4c)",
                            transitionDelay: `${2.4 + i * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hiw-laptop-base" />
            </div>
            <div className={`hiw-lbl ${run ? "vis" : ""}`} style={{ bottom: "-32px", transitionDelay: "2s" }}>
              <div className="hiw-lbl-t">{t.steps[1].title}</div>
              <div className="hiw-lbl-s">{t.steps[1].desc}</div>
            </div>
          </div>

          {/* Col 3: Tablet */}
          <div className="hiw-col">
            <div className={`hiw-tab ${run ? "vis" : ""}`}>
              <div className="hiw-tab-screen">
                <div className={`hiw-toast ${showToast ? "vis" : ""}`}>
                  <div className="hiw-toast-icon">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <div className="hiw-toast-text">{t.toast.title}</div>
                    <div className="hiw-toast-sub">{t.toast.sub}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "28px" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "linear-gradient(135deg,var(--gold,#b28a4c),var(--gold-l,#c9a35e))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(178,138,76,0.3)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div style={{ fontSize: "clamp(8px,1.15vw,12px)", fontWeight: 700, color: "var(--ink,#0b1220)", marginTop: "12px", fontFamily: "var(--font-d,serif)" }}>{t.tablet.success}</div>
                  <div style={{ fontSize: "clamp(4.5px,0.63vw,6.5px)", color: "var(--ink-m,#6b7488)", marginTop: "4px", textAlign: "center", lineHeight: 1.6 }}>{t.tablet.successDesc}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", padding: "14px 12px 0" }}>
                  {t.tablet.stats.map((stat, i) => (
                    <div key={stat.label} style={{ textAlign: "center", borderLeft: i > 0 ? "1px solid var(--line,#e6e5e0)" : undefined, borderRight: i < 2 ? "1px solid var(--line,#e6e5e0)" : undefined }}>
                      <div style={{ fontSize: "clamp(3.5px,0.5vw,5px)", color: "var(--ink-m,#6b7488)", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: "clamp(8px,1.15vw,12px)", fontWeight: 800, color: i === 1 ? "var(--mint,#0f766e)" : i === 2 ? "var(--gold,#b28a4c)" : "var(--navy,#0e2440)", marginTop: "3px", fontFamily: "var(--font-d,serif)" }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ margin: "12px 10px 0", background: "var(--canvas,#f8f8f6)", borderRadius: "6px", padding: "8px 10px" }}>
                  <div style={{ fontSize: "clamp(3.5px,0.5vw,5px)", color: "var(--ink-m,#6b7488)", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 600, marginBottom: "5px" }}>{t.tablet.summaryTitle}</div>
                  <div style={{ fontSize: "clamp(4px,0.57vw,6px)", color: "var(--ink-s,#3a4356)", lineHeight: 1.6 }}>{t.tablet.summaryBody}</div>
                </div>
              </div>
            </div>
            <div className={`hiw-lbl ${run ? "vis" : ""}`} style={{ bottom: "-32px", transitionDelay: "4.4s" }}>
              <div className="hiw-lbl-t">{t.steps[2].title}</div>
              <div className="hiw-lbl-s">{t.steps[2].desc}</div>
            </div>
          </div>
        </div>

        {/* Connectors */}
        <div className={`hiw-conn ${run ? "vis" : ""}`} style={{ left: "clamp(160px,30.5vw,318px)", transitionDelay: "1.4s" }}>
          <div className="hiw-conn-line" />
          <div className="hiw-conn-arr" />
        </div>
        <div className={`hiw-conn ${run ? "vis" : ""}`} style={{ left: "clamp(360px,64vw,668px)", transitionDelay: "3.8s" }}>
          <div className="hiw-conn-line" />
          <div className="hiw-conn-arr" />
        </div>

        {/* Chat bubbles */}
        <div className={`hiw-bub hiw-bub-user ${run ? "vis" : ""}`} style={{ left: "clamp(140px,27vw,280px)", top: "clamp(80px,22vw,130px)", transitionDelay: "2.8s" }}>
          {t.callerMessage}
        </div>
        <div className={`hiw-bub hiw-bub-ai ${run ? "vis" : ""}`} style={{ left: "clamp(300px,50vw,520px)", top: "clamp(200px,53vw,310px)", transitionDelay: "3.6s", borderBottomRightRadius: "4px" }}>
          {!showAiMsg ? (
            <div className="hiw-typing">
              <div className="hiw-typing-dot on" />
              <div className="hiw-typing-dot on" />
              <div className="hiw-typing-dot on" />
            </div>
          ) : (
            t.aiMessage
          )}
        </div>
      </div>
    </div>
  );
}
