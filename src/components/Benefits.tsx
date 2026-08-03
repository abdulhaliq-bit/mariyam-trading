import { CountUp, Reveal } from "./Reveal";
import { SectionHeading } from "./Features";
import { ArrowRight, Check } from "./Icons";

const promises = [
  { title: "One price, agreed in writing", body: "The landed-cost sheet you sign is the amount you pay. No end-of-deal adjustments." },
  { title: "Documents before deposits", body: "Auction sheet, inspection report and history check — shared before any money moves." },
  { title: "Your paperwork, our problem", body: "Customs, duty, RMV registration and insurance handled in-house by our desk." },
  { title: "A name that stayed put", body: "Same family, same showroom, same phone number since 2003. Reachable after handover." },
];

export default function Benefits() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-16} y={20} duration={850}>
            <figure className="relative lg:sticky lg:top-28">
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-garage-2">
                <img src="https://images.pexels.com/photos/29566879/pexels-photo-29566879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200"
                  alt="Vehicles inside the Mariyam Trading Company showroom" loading="lazy"
                  className="h-[350px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 sm:h-[460px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-garage via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="label text-[9px] text-chrome-4">Colombo 06 showroom</p>
                  <p className="font-display mt-1 text-[18px] font-bold uppercase text-white">Open 8:30am – 7:00pm, seven days</p>
                </div>
              </div>
              {/* floating stat chips */}
              <div className="absolute -right-2 top-4 flex gap-2 sm:-right-6">
                <div className="rounded-lg border border-white/10 bg-garage-2/95 px-3.5 py-3 text-center backdrop-blur-md">
                  <p className="font-display text-[24px] font-black text-red"><CountUp to={48} suffix="h" /></p>
                  <p className="label mt-1 text-[8px] text-chrome-4">Trade-in</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-garage-2/95 px-3.5 py-3 text-center backdrop-blur-md">
                  <p className="font-display text-[24px] font-black text-green"><CountUp to={71} suffix="%" /></p>
                  <p className="label mt-1 text-[8px] text-chrome-4">Repeat</p>
                </div>
              </div>
            </figure>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Transparency charter"
              title="Four promises we put"
              accent="in writing."
              body="Trust isn't painted on a showroom wall. It's commitments you hold us to, on paper, every deal."
            />
            <ol className="mt-10 border-t border-white/10">
              {promises.map((p, i) => (
                <Reveal key={p.title} delay={i * 70} y={12}>
                  <li className="group flex items-start gap-4 border-b border-white/5 py-5 transition-colors hover:bg-white/[.02] sm:gap-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-red/30 bg-red/10 text-red">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-white">{p.title}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-chrome-3">{p.body}</p>
                    </div>
                    <ArrowRight className="ml-auto mt-2 hidden h-4 w-4 shrink-0 -translate-x-2 text-red opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={280}>
              <a href="#process" className="group mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-red">
                See how a purchase actually runs
                <ArrowRight className="anim-nudge h-3.5 w-3.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
