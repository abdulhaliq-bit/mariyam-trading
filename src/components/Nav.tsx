import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { navLinks } from "@/data";
import { ArrowRight, Close, Menu, Phone, WhatsApp } from "./Icons";

export function Logo() {
  return (
    <a href="#top" className="group flex items-center transition-opacity hover:opacity-90" aria-label="Mariyam Trading Company home">
      <img
        src="/images/logo.png"
        alt="Mariyam Trading Company Logo"
        className="h-10 w-auto max-w-[130px] sm:max-w-[145px] object-contain"
      />
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
      let current = "";
      navLinks.forEach((l) => {
        const el = document.querySelector(l.href);
        if (el && (el as HTMLElement).getBoundingClientRect().top <= 140) current = l.href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-garage/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,.4)]"
            : "border-white/5 bg-transparent",
        )}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Logo />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200",
                        active === l.href ? "text-red" : "text-chrome-3 hover:text-white",
                      )}
                    >
                      {l.label}
                      <span className={cn(
                        "absolute inset-x-2 bottom-0 h-[2px] bg-red transition-transform duration-300 origin-left",
                        active === l.href ? "scale-x-100" : "scale-x-0",
                      )} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a href="tel:+94777346406" className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[12px] font-semibold text-chrome-2 transition-colors hover:border-white/25 hover:text-white md:inline-flex">
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">077 734 6406</span>
                <span className="xl:hidden">Call</span>
              </a>
              <a href="#contact" className="group hidden items-center gap-2 rounded-lg bg-red px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-black shadow-[0_0_20px_rgba(190,243,35,.3)] transition-all duration-300 hover:bg-red-3 hover:shadow-[0_0_30px_rgba(190,243,35,.5)] sm:inline-flex">
                Book a Viewing
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white transition-colors hover:border-white/30 lg:hidden"
              >
                {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        {/* red progress bar */}
        <div className="h-[2px] bg-white/5">
          <div className="h-full bg-red glow-red-sm transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Mobile slide-over */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
        <div className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
        <div className={cn(
          "absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col border-l border-white/10 bg-garage-2 transition-transform duration-500 ease-[cubic-bezier(.72,0,.24,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}>
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="label text-[10px] text-chrome-4">Navigation</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white">
              <Close className="h-4 w-4" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto px-5">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/5 py-4 transition-colors hover:text-red"
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateX(16px)", transitionProperty: "opacity,transform,color" }}
                >
                  <span className="font-display text-[32px] font-bold uppercase text-white">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 p-5 space-y-3">
            <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-red px-5 py-4 text-[13px] font-bold uppercase text-black">
              Book a Viewing <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://wa.me/94777346406" className="flex items-center justify-center gap-2 rounded-lg border border-white/12 px-5 py-3 text-[13px] font-semibold text-white">
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
