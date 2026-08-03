import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { ArrowRight, Check, Clock, MapPin, ShieldCheck, WhatsApp } from "./Icons";

const interests = ["Buy from stock", "Import to order", "Trade-in & upgrade", "Corporate fleet"];

import { loadEnquiries, saveEnquiries, type Enquiry } from "@/data";

export default function CTA() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(interests[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const email = (data.get("email") as string)?.trim() || undefined;
    const notes = (data.get("notes") as string)?.trim() || undefined;

    if (!name || !phone) return;

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      name,
      phone,
      email,
      interest,
      notes,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      resolved: false,
    };

    const current = loadEnquiries();
    saveEnquiries([newEnquiry, ...current]);
    window.dispatchEvent(new Event("mtc-enquiries-updated"));

    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]">
        <img src="https://images.pexels.com/photos/6873190/pexels-photo-6873190.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600" alt="" loading="lazy" className="h-full w-full object-cover opacity-[.12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-garage via-garage/95 to-garage/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 rounded-md bg-red/15 px-2.5 py-1 text-[10px] text-red">
                <span className="anim-blink h-1.5 w-1.5 rounded-full bg-red" /> Now taking enquiries
              </span>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-5 font-display text-[36px] font-extrabold uppercase leading-[.92] text-white sm:text-[50px]">
                Your next car deserves <span className="text-red">a straight answer.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-chrome-2">
                Tell us what you're after. We'll return within one working hour with real options, real numbers, and the documents to back them up.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Clock, k: "1 hour", v: "First response" },
                  { icon: ShieldCheck, k: "No pressure", v: "Refundable deposits" },
                  { icon: MapPin, k: "Island-wide", v: "Covered delivery" },
                ].map(item => (
                  <div key={item.k} className="rounded-xl border border-white/8 bg-white/[.03] p-4">
                    <item.icon className="h-4 w-4 text-red" />
                    <p className="mt-3 text-[15px] font-bold text-white">{item.k}</p>
                    <p className="label mt-1 text-[9px] text-chrome-4">{item.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={290}>
              <a href="https://wa.me/94777346406" className="group mt-7 inline-flex items-center gap-2.5 text-[13px] font-semibold text-chrome-2 transition-colors hover:text-green">
                <WhatsApp className="h-4 w-4 text-green" /> Prefer WhatsApp? Message us now
                <ArrowRight className="anim-nudge h-3.5 w-3.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={180} y={20}>
            <div className="rounded-2xl border border-white/10 bg-garage-2 shadow-[0_20px_60px_rgba(0,0,0,.5)]">
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
                <span className="label text-[10px] text-chrome-4">Enquiry form</span>
                <span className="label text-[10px] text-chrome-4">MTC / 2026</span>
              </div>

              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-xl bg-red text-black glow-red-sm">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="font-display mt-5 text-[22px] font-bold uppercase text-white">Enquiry received</h3>
                  <p className="mt-2 max-w-xs text-[13px] text-chrome-3">An advisor will call within one working hour with your shortlist and landed costs.</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-6 text-[12px] font-bold text-red hover:underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5 p-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" id="name" placeholder="Your name" />
                    <Field label="Phone / WhatsApp" id="phone" type="tel" placeholder="+94 7X XXX XXXX" />
                  </div>
                  <Field label="Email" id="email" type="email" placeholder="you@example.com" req={false} />

                  <fieldset>
                    <legend className="label mb-2 text-[9px] text-chrome-4">I'm interested in</legend>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(it => (
                        <button key={it} type="button" onClick={() => setInterest(it)} aria-pressed={interest === it}
                          className={`rounded-md border px-3 py-2 text-[12px] font-semibold transition-all ${interest === it ? "border-red bg-red/15 text-red" : "border-white/10 text-chrome-3 hover:border-white/25 hover:text-white"}`}>
                          {it}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="notes" className="label mb-2 block text-[9px] text-chrome-4">Budget & preferences</label>
                    <textarea id="notes" rows={3} placeholder="e.g. 7-seat SUV, under LKR 45M, hybrid preferred"
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/[.03] px-4 py-3 text-[14px] text-white placeholder:text-chrome-4 outline-none transition-colors focus:border-red/50" />
                  </div>

                  <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red px-6 py-4 text-[14px] font-bold uppercase tracking-wide text-black shadow-[0_0_30px_rgba(190,243,35,.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(190,243,35,.5)]">
                    Get my shortlist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[11px] text-chrome-4">We only contact you about this enquiry. Never shared.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, placeholder, type = "text", req = true }: { label: string; id: string; placeholder: string; type?: string; req?: boolean; }) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 block text-[9px] text-chrome-4">{label}</label>
      <input id={id} name={id} type={type} required={req} placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[.03] px-4 py-3 text-[14px] text-white placeholder:text-chrome-4 outline-none transition-colors focus:border-red/50" />
    </div>
  );
}
