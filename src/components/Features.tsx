import type { ComponentType, SVGProps, ReactNode } from "react";
import { Reveal } from "./Reveal";
import { features } from "@/data";
import { ArrowRight, Bank, Exchange, Monitor, Receipt, ShieldCheck, Wrench } from "./Icons";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  shield: ShieldCheck, receipt: Receipt, monitor: Monitor, exchange: Exchange, bank: Bank, wrench: Wrench,
};

export function SectionHeading({ eyebrow, title, accent, body, aside }: {
  eyebrow: string; title: string; accent?: string; body?: string; aside?: ReactNode;
}) {
  return (
    <div className={aside ? "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" : ""}>
      <div>
        <Reveal>
          <span className="label inline-flex items-center gap-2 rounded-md bg-red/10 px-2.5 py-1 text-[10px] text-red">
            <span className="h-1 w-1 rounded-full bg-red" />{eyebrow}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-4 font-display text-[32px] font-extrabold uppercase leading-[.95] tracking-tight text-white sm:text-[44px] lg:text-[52px]">
            {title} {accent && <span className="text-red">{accent}</span>}
          </h2>
        </Reveal>
        {body && <Reveal delay={130}><p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-chrome-2">{body}</p></Reveal>}
      </div>
      {aside && <Reveal delay={160} className="shrink-0">{aside}</Reveal>}
    </div>
  );
}

export default function Features() {
  return (
    <section id="why" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Mariyam"
          title="Anyone can promise trust. We hand you"
          accent="the file."
          body="Twenty-two years of importing taught us one thing: buyers don't want charm — they want evidence. So we built a process where every claim comes with a document."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon] ?? ShieldCheck;
            return (
              <Reveal key={f.title} delay={(i % 3) * 80} y={16}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[.02] p-6 transition-all duration-400 hover:border-red/35 hover:bg-white/[.04] sm:p-7">
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[.04] text-red transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="label text-[10px] text-chrome-4">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display mt-6 text-[18px] font-bold uppercase leading-tight text-white">{f.title}</h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-chrome-3">{f.body}</p>
                  <span className="label mt-5 inline-flex items-center gap-2 border-t border-white/8 pt-4 text-[9.5px] text-chrome-4 transition-colors group-hover:text-red">
                    <ArrowRight className="h-3 w-3" />{f.tag}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
