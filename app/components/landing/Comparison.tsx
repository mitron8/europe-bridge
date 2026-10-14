"use client";

import React from "react";
import { Check, Minus } from "lucide-react";

const rows = [
  {
    feature: "University focus",
    others: "Pushes paid private colleges for higher commissions",
    us: "100% focus on €0-tuition public universities, including TU9",
  },
  {
    feature: "SOP & mentorship",
    others: "Generic copy-paste templates written by agents",
    us: "One-on-one review by real German university alumni",
  },
  {
    feature: "APS & visa",
    others: "Slow manual filing and unexpected visa delays",
    us: "Expedited APS tracking and a 99.2% visa approval rate",
  },
  {
    feature: "On-ground support",
    others: "Support ends at the airport boarding gate",
    us: "Help with WG housing and city registration after you land",
  },
];

export default function Comparison() {
  return (
    <section id="about" data-stack className="lp-sheet lp-grain relative overflow-hidden bg-[var(--lp-ink)] py-28 text-white sm:py-36">
      <div data-parallax="140" className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[var(--lp-red)]/[0.12] blur-[120px]" />
      <div className="lp-container relative">
        <div data-parallax="34" className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <div data-reveal className="lp-eyebrow lp-eyebrow--light mb-6">
              Why EuropeBridge
            </div>
            <h2 data-reveal-lines className="lp-h2 !text-white">
              <span className="lp-line-mask">
                <span>The smart way</span>
              </span>
              <span className="lp-line-mask">
                <span>
                  <em className="!text-[var(--lp-gold-soft)]">to Germany.</em>
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-[1.7] text-white/55">
            Traditional agencies earn on where they send you. We don&apos;t — so the advice is about what is right for your
            profile.
          </p>
        </div>

        {/* Desktop table */}
        <div data-reveal className="mt-20 hidden md:block">
          <div className="grid grid-cols-[220px_1fr_1fr] border-b border-white/15 pb-5 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <div className="text-white/40">Compared on</div>
            <div className="px-8 text-white/40">Traditional agencies</div>
            <div className="flex items-center gap-2 px-8 text-[var(--lp-gold-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" /> EuropeBridge
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.feature} className="group grid grid-cols-[220px_1fr_1fr] border-b border-white/10">
              <div className="lp-serif py-8 text-[24px] leading-tight">{r.feature}</div>
              <div className="flex items-start gap-3 px-8 py-8 text-[15px] leading-relaxed text-white/40">
                <Minus className="mt-1 h-4 w-4 shrink-0 text-white/25" />
                {r.others}
              </div>
              <div className="flex items-start gap-3 bg-white/[0.03] px-8 py-8 text-[15px] leading-relaxed text-white transition-colors duration-500 group-hover:bg-white/[0.06]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--lp-red)]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {r.us}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile stacked */}
        <div className="mt-14 space-y-4 md:hidden">
          {rows.map((r) => (
            <div key={r.feature} data-reveal className="rounded-2xl border border-white/10 p-6">
              <div className="lp-serif text-[24px]">{r.feature}</div>
              <div className="mt-4 flex gap-3 text-[14px] text-white/40">
                <Minus className="mt-0.5 h-4 w-4 shrink-0" /> {r.others}
              </div>
              <div className="mt-3 flex gap-3 text-[14px] text-white">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lp-red)]" strokeWidth={3} /> {r.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
