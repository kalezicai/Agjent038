const bars = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.42, 0.85, 0.55, 0.3];

export type OrbDict = {
  liveCall: string;
  greeting: string;
  answeredIn: string;
  outcome: string;
  appointmentBooked: string;
  syncedToCrm: string;
};

export default function OrbScene({ dict }: { dict: OrbDict }) {
  return (
    <div className="scene-3d relative mx-auto aspect-square w-full max-w-[520px]">
      {/* soft ground shadow */}
      <div className="absolute inset-x-[18%] bottom-[8%] h-10 rounded-[50%] bg-navy/15 blur-2xl" />

      {/* orbit rings */}
      <div className="absolute inset-[8%]">
        <div className="orbit absolute inset-0">
          <div className="orbit-ring" />
          <div
            className="orbit-ring"
            style={{ transform: "scale(0.78) translateZ(40px)" }}
          />
          <div
            className="orbit-ring"
            style={{ transform: "scale(0.56) translateZ(80px)" }}
          />
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(178,138,76,0.15)]" />
          <span
            className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-navy/60"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
      </div>

      {/* core sphere */}
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="float-slow relative h-full w-full">
          <div className="pulse-ring absolute inset-0 rounded-full" />
          <div
            className="absolute inset-0 rounded-full shadow-[0_30px_60px_-20px_rgba(14,36,64,0.45)]"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, #ffffff 0%, #e8eef6 24%, #9fb3ca 58%, #1d3c63 96%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full mix-blend-overlay"
            style={{
              background:
                "conic-gradient(from 210deg, rgba(255,255,255,0.9), rgba(178,138,76,0.35), rgba(255,255,255,0.15), rgba(255,255,255,0.85))",
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex h-8 items-end gap-[3px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="wave-bar w-[3px] rounded-full bg-white/90"
                  style={{
                    height: `${h * 100}%`,
                    animationDelay: `${i * 0.09}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute left-[22%] top-[16%] h-[18%] w-[26%] rounded-full bg-white/70 blur-md" />
        </div>
      </div>

      {/* floating glass chips */}
      <div className="float-slower absolute left-[-4%] top-[16%] w-[190px] rounded-xl border border-line bg-white/85 p-3.5 shadow-lift backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            {dict.liveCall}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-ink">
          {dict.greeting}
        </p>
        <p className="mt-1.5 text-[11px] text-ink-mute">{dict.answeredIn}</p>
      </div>

      <div
        className="float-slow absolute bottom-[14%] right-[-2%] w-[186px] rounded-xl border border-line bg-white/85 p-3.5 shadow-lift backdrop-blur"
        style={{ animationDelay: "1.4s" }}
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          {dict.outcome}
        </p>
        <p className="mt-2 text-[13px] font-medium text-ink">
          {dict.appointmentBooked}
        </p>
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full w-[82%] rounded-full bg-navy" />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-mute">
          {dict.syncedToCrm}
        </p>
      </div>

      <div
        className="float-slower absolute right-[6%] top-[4%] rounded-full border border-line bg-white/85 px-3.5 py-2 shadow-soft backdrop-blur"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="text-[11px] font-medium text-navy">EN · DE · FR · IT</span>
      </div>
    </div>
  );
}
