import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Features";
import { testimonials } from "@/data";
import { ArrowUpRight, Google, Star } from "./Icons";

export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="reviews" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Google reviews" title="1,240+ reviews. The word that repeats"
          accent="is trust."
          body="Public, verified reviews from people who drove away and came back."
          aside={<a href="#reviews" className="group inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase text-white transition-all hover:border-white/30">
            <Google className="h-3.5 w-3.5" /> All reviews <ArrowUpRight className="h-3.5 w-3.5 text-red" />
          </a>}
        />

        {/* Lead quote */}
        <Reveal delay={80}>
          <figure className="mt-12 rounded-2xl border border-red/20 bg-red/[.04] p-8 sm:p-10 lg:flex lg:gap-12">
            <blockquote className="flex-1 text-[22px] font-medium italic leading-[1.5] text-chrome sm:text-[28px] lg:text-[32px]">
              <span className="text-red">"</span>{lead.quote}<span className="text-red">"</span>
            </blockquote>
            <figcaption className="mt-6 flex flex-col justify-end gap-2 border-t border-white/10 pt-6 lg:mt-0 lg:w-[220px] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 text-amber" />)}</span>
              <p className="text-[17px] font-bold text-white">{lead.name}</p>
              <p className="label text-[9px] text-chrome-4">{lead.role}</p>
              <span className="inline-flex w-fit items-center gap-1.5 rounded bg-white/8 px-2 py-1 text-[10px] font-semibold text-chrome-3">
                <Google className="h-3 w-3" />{lead.badge}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80} y={14}>
              <figure className="group flex h-full flex-col rounded-xl border border-white/8 bg-white/[.02] p-6 transition-all duration-400 hover:border-white/20 hover:bg-white/[.04]">
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="h-3 w-3 text-amber" />)}</span>
                  <span className="label text-[8.5px] text-chrome-4">{t.badge}</span>
                </div>
                <blockquote className="mt-4 flex-1 text-[14px] leading-[1.7] text-chrome-2">"{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg font-tech text-[11px] font-bold",
                    t.accent ? "bg-red text-white" : "border border-white/12 bg-white/5 text-chrome-2")}>{t.initials}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-bold text-white">{t.name}</span>
                    <span className="label block truncate text-[8.5px] text-chrome-4">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
