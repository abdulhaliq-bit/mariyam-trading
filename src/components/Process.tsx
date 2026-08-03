import { Reveal } from "./Reveal";
import { SectionHeading } from "./Features";
import { process } from "@/data";
import { ArrowRight, WhatsApp } from "./Icons";

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden border-y border-white/5 bg-garage-2 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 tex-speed" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The process" title="Five steps. No mystery"
          accent="in between." body="From the first call to your first service reminder, you always know where the vehicle is and what's next." />

        {/* Desktop timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-7 h-[2px] bg-white/8" />
          <div className="absolute left-0 right-0 top-7 h-[2px] bg-gradient-to-r from-red via-red/50 to-transparent origin-left" style={{ width: "80%" }} />
          <div className="grid grid-cols-5 gap-6">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100} y={16}>
                <div className="group">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-xl border border-white/12 bg-garage font-display text-[16px] font-black text-chrome-3 transition-all duration-400 group-hover:border-red group-hover:bg-red group-hover:text-black group-hover:shadow-[0_0_24px_rgba(190,243,35,.4)]">
                    {p.step}
                  </span>
                  <h3 className="font-display mt-6 text-[17px] font-bold uppercase text-white">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-chrome-3">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <ol className="relative mt-12 lg:hidden">
          <span className="absolute bottom-4 left-7 top-4 w-[2px] bg-white/8" />
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 70} x={10} y={10}>
              <li className="relative flex gap-5 pb-8">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/12 bg-garage font-display text-[15px] font-black text-red">
                  {p.step}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-[16px] font-bold uppercase text-white">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-chrome-3">{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-xl border border-white/10 bg-white/[.02] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[16px] font-bold text-white">Most people start with a twenty-minute call.</p>
              <p className="mt-1 text-[13px] text-chrome-3">No obligation — just a straight answer on what's possible.</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <a href="https://wa.me/94777346406" className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-3 text-[12px] font-bold text-white transition-colors hover:border-green/40 hover:text-green">
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-lg bg-red px-4 py-3 text-[12px] font-bold uppercase text-black transition-all hover:shadow-[0_0_20px_rgba(190,243,35,.4)]">
                Book <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
