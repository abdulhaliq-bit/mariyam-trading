import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Features";
import { categories, loadVehicles, type Vehicle } from "@/data";
import { ArrowUpRight } from "./Icons";

const toneStyles: Record<Vehicle["statusTone"], string> = {
  stock: "bg-green/15 text-green",
  transit: "bg-amber/15 text-amber",
  order: "bg-white/10 text-chrome-3",
};

function VehicleCard({ v, index }: { v: Vehicle; index: number }) {
  const allImages = v.images && v.images.length > 0 ? v.images : [v.image];
  const hasMultiple = allImages.length > 1;
  const [activeImg, setActiveImg] = useState(0);
  const rows: [string, string][] = [["Year", v.year], ["Odo", v.mileage], ["Fuel", v.fuel], ["Box", v.gearbox]];
  return (
    <article className="anim-rise group flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-garage-2 transition-all duration-400 hover:border-red/30 hover:shadow-[0_0_40px_rgba(190,243,35,.12)]"
      style={{ animationDelay: `${index * 60}ms` }}>
      <div className="relative overflow-hidden">
        <img src={allImages[activeImg] || v.image} alt={v.name} loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-all duration-500 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-garage-2 via-transparent to-transparent" />
        <span className={cn("absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold backdrop-blur-sm", toneStyles[v.statusTone])}>
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />{v.status}
        </span>
        {v.highlight && (
          <span className="absolute right-3 top-3 rounded-md bg-red/20 px-2 py-1 text-[10px] font-bold text-red backdrop-blur-sm">✦ {v.highlight}</span>
        )}

        {/* Image navigation dots + arrows */}
        {hasMultiple && (
          <>
            <button onClick={(e) => { e.preventDefault(); setActiveImg(i => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Previous image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={(e) => { e.preventDefault(); setActiveImg(i => (i + 1) % allImages.length); }}
              className="absolute right-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Next image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {allImages.map((_, i) => (
                <button key={i} onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                  className={cn("h-1.5 rounded-full transition-all duration-300", i === activeImg ? "w-5 bg-red" : "w-1.5 bg-white/50 hover:bg-white/80")}
                  aria-label={`Image ${i + 1}`} />
              ))}
            </div>
            <span className="absolute bottom-3 right-3 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white/70 backdrop-blur-sm">
              {activeImg + 1}/{allImages.length}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="label text-[9px] text-chrome-4">{v.category}</p>
        <h3 className="font-display mt-2 text-[19px] font-bold uppercase leading-tight text-white">{v.name}</h3>
        <p className="mt-1 text-[13px] text-chrome-3">{v.tagline}</p>
        <dl className="mt-4 grid grid-cols-2 gap-1.5">
          {rows.map(([k, val]) => (
            <div key={k} className="flex items-baseline rounded bg-white/[.03] px-2.5 py-1.5">
              <dt className="label text-[8.5px] text-chrome-4">{k}</dt>
              <span className="leader" />
              <dd className="font-tech text-[11px] text-chrome-2">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/8 pt-4">
          <div>
            <p className="label text-[8px] text-chrome-4">All-in price</p>
            <p className="font-display mt-0.5 text-[22px] font-black leading-none text-white">{v.price}</p>
          </div>
          <a href="#contact" className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-red px-3 py-2 text-[11px] font-bold uppercase text-black transition-all hover:shadow-[0_0_20px_rgba(190,243,35,.4)]">
            Reserve <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Showcase() {
  const [allVehicles, setAllVehicles] = useState(loadVehicles);
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => active === "All" ? allVehicles : allVehicles.filter(v => v.category === active), [active, allVehicles]);

  // Listen for admin panel updates
  useEffect(() => {
    const handler = () => setAllVehicles(loadVehicles());
    window.addEventListener("mtc-vehicles-updated", handler);
    window.addEventListener("storage", handler);
    return () => { window.removeEventListener("mtc-vehicles-updated", handler); window.removeEventListener("storage", handler); };
  }, []);

  return (
    <section id="inventory" className="relative scroll-mt-24 border-y border-white/5 bg-garage-2/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live inventory"
          title="The showroom floor,"
          accent="online."
          body="Real units, real documents, real prices — updated every morning. Request a 360° walkaround video on WhatsApp anytime."
          aside={<a href="#contact" className="group inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-[13px] font-bold uppercase text-white transition-all hover:border-red/40 hover:bg-white/10">
            Can't see it? Send the spec <ArrowUpRight className="h-3.5 w-3.5 text-red" />
          </a>}
        />

        <Reveal delay={100}>
          <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
            <div role="tablist" className="flex min-w-max gap-1 rounded-lg border border-white/8 bg-white/[.02] p-1">
              {categories.map(c => {
                const isActive = c === active;
                const count = c === "All" ? allVehicles.length : allVehicles.filter(v => v.category === c).length;
                return (
                  <button key={c} role="tab" aria-selected={isActive} onClick={() => setActive(c)}
                    className={cn("rounded-md px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-all duration-300",
                      isActive ? "bg-red text-black shadow-[0_0_20px_rgba(190,243,35,.3)]" : "text-chrome-3 hover:bg-white/5 hover:text-white")}>
                    {c} <span className="ml-1 text-[10px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div key={active} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v, i) => <VehicleCard key={v.id} v={v} index={i} />)}
        </div>
      </div>
    </section>
  );
}
