import { useRef, type SVGProps } from "react";
import { Reveal } from "./Reveal";
import { Logo } from "./Nav";
import { Clock, Mail, MapPin, Phone } from "./Icons";

const columns = [
  { title: "Inventory", links: ["SUVs & Crossovers", "Executive Saloons", "Electric & Hybrid", "Performance", "Request a Model"], href: "#inventory" },
  { title: "Services", links: ["Import to Order", "Trade-in & Upgrade", "Leasing & Finance", "Corporate Fleet", "Aftercare"], href: "#contact" },
  { title: "Company", links: ["Our Process", "Client Reviews", "Transparency Charter", "Careers", "Contact"], href: "#process" },
];

const Social = ({ path, ...p }: SVGProps<SVGSVGElement> & { path: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...p}><path d={path} /></svg>
);

const socials = [
  { name: "Facebook", path: "M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.25-1.5 1.5-1.5H16.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.6v3h2.7v8h3.2z", href: "https://www.facebook.com/p/Mariyam-Trading-Company-100063841127842" },
  { name: "Instagram", path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.5 1-.9 1.4-.4.4-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.5-1.4-.9-.4-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.5-1 .9-1.4.4-.4.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.9-11.1a1.55 1.55 0 11-1.55-1.55A1.55 1.55 0 0118.9 5.2z", href: "https://www.instagram.com/mariyam_trading" },
  { name: "YouTube", path: "M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.1V8.9l5.2 3.1-5.2 3.1z", href: "#top" },
];

export default function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleCopyrightClick = () => {
    clickCount.current++;
    clearTimeout(clickTimer.current);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      onOpenAdmin();
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    }
  };

  return (
    <footer className="relative border-t border-white/8 bg-garage-2 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-white/8 pb-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)_minmax(0,1.1fr)]">
          <Reveal>
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-[13px] leading-[1.7] text-chrome-3">
                Licensed vehicle importer in Colombo since 2003. Sourcing, clearance, registration and aftercare under one roof.
              </p>
              <div className="mt-6 flex gap-2">
                {socials.map(s => (
                  <a key={s.name} href={s.href} target={s.href !== "#top" ? "_blank" : undefined} rel="noopener noreferrer" aria-label={s.name}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-chrome-4 transition-all duration-300 hover:border-red hover:bg-red hover:text-black">
                    <Social path={s.path} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col, i) => (
              <Reveal key={col.title} delay={60 + i * 50}>
                <div>
                  <p className="label text-[10px] text-chrome-4">{col.title}</p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map(l => (
                      <li key={l}><a href={col.href} className="text-[13px] text-chrome-3 transition-colors hover:text-white">{l}</a></li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="rounded-xl border border-white/8 bg-white/[.02] p-5">
              <p className="label text-[10px] text-chrome-4">Visit the showroom</p>
              <ul className="mt-4 space-y-3.5 text-[13px] text-chrome-3">
                <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-red" /><span>148 Galle Road, Wellawatte<br/>Colombo 06</span></li>
                <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-red" />Mon – Sun · 8:30am – 7pm</li>
                <li><a href="tel:+94777346406" className="flex gap-3 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-red" />077 734 6406</a></li>
                <li><a href="tel:+94773213251" className="flex gap-3 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-red" />077 321 3251</a></li>
                <li><a href="mailto:mariyam331@yahoo.com" className="flex gap-3 hover:text-white"><Mail className="h-4 w-4 shrink-0 text-red" />mariyam331@yahoo.com</a></li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="cursor-default select-none text-[12px] text-chrome-4" onClick={handleCopyrightClick}>
            © {new Date().getFullYear()} Mariyam Trading Company (Pvt) Ltd
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Transparency"].map(l => (
              <a key={l} href="#top" className="text-[12px] text-chrome-4 transition-colors hover:text-white">{l}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized scrolling masthead */}
      <div className="mask-fade-x overflow-hidden border-t border-white/5">
        <div className="anim-marquee-slow pause-hover flex w-max">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="font-display shrink-0 select-none pr-10 text-[14vw] font-black uppercase leading-[1.05] tracking-tight text-white/[.04]">
              Mariyam Trading Co. ✦ Premium Imports ✦
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
