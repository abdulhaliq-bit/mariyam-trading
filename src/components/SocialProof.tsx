import { Reveal } from "./Reveal";
import { brands } from "@/data";
import { Bank, Globe, ShieldCheck } from "./Icons";

const badges = [
  { icon: Globe, title: "Licensed importer", body: "Registered with DMT & Sri Lanka Customs on every unit." },
  { icon: Bank, title: "9 partner banks", body: "Side-by-side rates, pre-approval inside 24 hours." },
  { icon: ShieldCheck, title: "Full documentation", body: "Auction sheets, export certs & inspection reports on file." },
];

export default function SocialProof() {
  return (
    <>
      {/* brand marquee — like a tyre-wall of sponsors */}
      <div className="relative overflow-hidden border-y border-white/10 bg-garage-2 py-4">
        <div className="mask-fade-x flex">
          <div className="anim-marquee pause-hover flex shrink-0 items-center gap-12 pr-12">
            {[...brands, ...brands].map((b, i) => (
              <span key={`${b}-${i}`} className="font-display shrink-0 text-[14px] font-bold uppercase tracking-[.15em] text-chrome-4 transition-colors duration-300 hover:text-red sm:text-[16px]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="border-b border-white/5 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {badges.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="group flex h-full gap-4 rounded-xl border border-white/8 bg-white/[.02] p-5 transition-all duration-300 hover:border-red/30 hover:bg-white/[.04]">
                  <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-red transition-transform duration-500 group-hover:scale-110" />
                  <div>
                    <p className="text-[14px] font-bold text-white">{b.title}</p>
                    <p className="mt-1 text-[13px] text-chrome-3">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
