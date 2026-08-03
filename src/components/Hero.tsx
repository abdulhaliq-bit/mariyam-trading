import { cn } from "@/utils/cn";
import { CountUp, Reveal } from "./Reveal";

import { stats } from "@/data";

/** Rotating tachometer badge */
function Tacho() {
  return (
    <div className="relative h-[110px] w-[110px] shrink-0 sm:h-[130px] sm:w-[130px]">
      <svg viewBox="0 0 120 120" className="anim-spin-slow absolute inset-0 h-full w-full">
        <defs><path id="tr" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text fill="currentColor" className="text-chrome-3" fontSize="8.5" letterSpacing="3.5">
          <textPath href="#tr">VERIFIED IMPORT · 212-PT INSPECTION · EST.2003 ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-[22px] grid place-items-center rounded-full border-2 border-red bg-garage glow-red-sm text-center sm:inset-[26px]">
        <span className="font-display text-[13px] font-black uppercase leading-[1.15] text-white">
          Every<br/>Unit
        </span>
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient video & taillights */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        {/* Background video block - high-end luxury sports car cinematic b-roll close-up shots */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-45 sm:opacity-50 transition-opacity duration-1000"
          style={{ filter: "brightness(0.7) contrast(1.15) saturate(0.95)" }}
          src="https://videos.pexels.com/video-files/29498797/12698110_4070_2160_24fps.mp4"
        />
        {/* Shading overlay mask - optimized for brightened cinematic details and crystal clear copy */}
        <div className="absolute inset-0 bg-gradient-to-b from-garage/20 via-garage/60 to-garage" />
        
        <div className="absolute right-0 top-0 h-[70vh] w-[60vw] bg-[radial-gradient(ellipse_at_right_top,rgba(190,243,35,.08),transparent_55%)]" />
        <div className="absolute left-0 top-1/3 h-[40vh] w-[40vw] bg-[radial-gradient(circle,rgba(240,168,40,.04),transparent_60%)]" />
        {/* speed lines across the top */}
        <div className="absolute left-0 right-0 top-[20%] h-px bg-gradient-to-r from-transparent via-red/30 to-transparent speed-line" />
        <div className="absolute left-0 right-0 top-[32%] h-px bg-gradient-to-r from-transparent via-red/15 to-transparent speed-line" style={{ animationDelay: "0.8s" }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 text-center">
        <div className="flex flex-col items-center">
          {/* Copy */}
          <div className="w-full flex flex-col items-center">
            <Reveal y={12}>
              <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/10 pb-4">
                <span className="inline-flex items-center gap-2 rounded-md bg-red/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red">
                  <span className="anim-blink h-1.5 w-1.5 rounded-full bg-red" />
                  Open today
                </span>
                <span className="label text-[10px] text-chrome-4">148 Galle Road · Colombo 06</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 text-center">
                <span className="h-display block text-[clamp(2.4rem,8.5vw,5.8rem)] text-white">
                  Premium cars.
                </span>
                <span className="h-display block text-[clamp(2.4rem,8.5vw,5.8rem)] text-white">
                  One honest
                </span>
                <span className="h-display block text-[clamp(2.4rem,8.5vw,5.8rem)] text-red">
                  landed price.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center">
                <p className="max-w-xl text-[16px] leading-[1.7] text-chrome-2 sm:text-[18px] text-center md:text-left">
                  Mariyam Trading Company sources, verifies and lands premium vehicles across Sri Lanka — with
                  documented provenance, an itemised cost sheet signed before you pay, and every customs form
                  handled by us.
                </p>
                <div className="shrink-0"><Tacho /></div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats bar — instrument cluster style */}
        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-garage-2 sm:mt-24 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={cn(
                "group relative px-5 py-6 text-center transition-colors duration-300 hover:bg-garage-3 sm:px-6 sm:py-7",
                i < stats.length - 1 && "border-b border-white/5 lg:border-b-0 lg:border-r",
                i % 2 === 0 && i < stats.length -1 && "border-r border-white/5",
              )}>
                <dd className="font-display text-[36px] font-black leading-none text-white sm:text-[44px]">
                  <CountUp to={s.value} decimals={"decimals" in s ? (s.decimals as number) : 0} suffix={s.suffix} />
                </dd>
                <p className="mt-2 text-[12px] text-chrome-3">{s.label}</p>
                {/* gauge underline */}
                <span className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
