import { useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { faqs } from "@/data";
import { Phone, Plus, WhatsApp } from "./Icons";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-md bg-red/10 px-2.5 py-1 text-[10px] text-red">
                <span className="h-1 w-1 rounded-full bg-red" />FAQ
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 font-display text-[34px] font-extrabold uppercase leading-[.95] text-white sm:text-[44px]">
                Everything buyers ask, <span className="text-red">answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.7] text-chrome-2">
                If it isn't here, ask us directly — you'll get a real person, usually within fifteen minutes during showroom hours.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href="https://wa.me/94777346406" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 px-5 py-3 text-[12px] font-bold text-white transition-colors hover:border-green/40 hover:text-green">
                  <WhatsApp className="h-4 w-4" /> WhatsApp
                </a>
                <a href="tel:+94777346406" className="inline-flex items-center justify-center gap-2 rounded-lg bg-red px-5 py-3 text-[12px] font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(190,243,35,.4)]">
                  <Phone className="h-4 w-4" /> 077 734 6406
                </a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 50} y={10}>
                  <div className={cn("overflow-hidden rounded-xl border transition-all duration-400",
                    isOpen ? "border-red/30 bg-red/[.04]" : "border-white/8 bg-white/[.02]")}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start gap-4 px-5 py-5 text-left">
                      <span className={cn("label mt-1 shrink-0 text-[10px] transition-colors", isOpen ? "text-red" : "text-chrome-4")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("flex-1 text-[15px] font-bold leading-snug transition-colors",
                        isOpen ? "text-white" : "text-chrome-2 hover:text-white")}>{f.q}</span>
                      <span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-all duration-400",
                        isOpen ? "rotate-[135deg] border-red bg-red text-black" : "border-white/15 text-chrome-3")}>
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                    <div className={cn("grid transition-all duration-500 ease-[cubic-bezier(.2,.9,.3,1)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-14 text-[13.5px] leading-[1.75] text-chrome-3">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
