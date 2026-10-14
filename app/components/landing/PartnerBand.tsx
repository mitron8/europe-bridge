"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";

export default function PartnerBand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("EUROLINGO25");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="language-school" data-stack className="relative bg-[var(--lp-paper)] pb-28 sm:pb-36">
      <div className="lp-container">
        <div
          data-reveal
          className="relative grid gap-10 overflow-hidden rounded-[32px] border border-[var(--lp-rule)] bg-[var(--lp-paper-2)] p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:p-16"
        >
          <div
            aria-hidden
            data-parallax="70"
            className="lp-serif pointer-events-none absolute -bottom-10 right-4 select-none text-[220px] leading-none text-[var(--lp-text)] opacity-[0.04] sm:text-[300px]"
          >
            Deutsch
          </div>

          <div className="relative" data-parallax="16">
            <div className="lp-eyebrow mb-6">Official partner · Eurolingo Academy</div>
            <h3 className="lp-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.12]">
              Learn German with <em className="text-[var(--lp-red)]">native trainers</em>, from{" "}
              <span className="align-[0.08em] font-[family-name:var(--lp-sans)] text-[0.62em] font-medium tracking-[-0.01em]">A1 to C1</span>.
            </h3>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-[var(--lp-muted)]">
              Live interactive batches, native German instructors, and Goethe &amp; TestDaF exam preparation through our
              partner, Eurolingo Academy.
            </p>
          </div>

          <div className="relative flex flex-col gap-5">
            <div className="rounded-2xl border border-[var(--lp-rule)] bg-[var(--lp-card)] p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--lp-muted)]">
                  Exclusive offer
                </span>
                <span className="lp-serif text-[44px] leading-none text-[var(--lp-red)]">25% off</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-dashed border-[var(--lp-rule-strong)] px-4 py-3">
                <div>
                  <div className="text-[11px] text-[var(--lp-faint)]">Use code</div>
                  <div className="font-mono text-[16px] font-semibold tracking-[0.12em]">EUROLINGO25</div>
                </div>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--lp-ink)] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[var(--lp-ink-3)]"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <a href="#language-school" className="lp-btn lp-btn--dark w-full sm:w-auto sm:self-start">
              Explore Eurolingo classes <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
