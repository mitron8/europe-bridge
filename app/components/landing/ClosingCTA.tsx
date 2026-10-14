"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ShaderCanvas from "./ShaderCanvas";

export default function ClosingCTA() {
  return (
    <section id="cta" data-stack className="relative bg-[var(--lp-paper)] pb-16 sm:pb-24">
      <div className="lp-container">
        <div
          data-reveal
          className="lp-grain relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] px-6 py-12 text-center text-white shadow-[0_24px_60px_-20px_rgba(13,13,15,0.4)] sm:px-12 sm:py-14 lg:px-16"
        >
          {/* Subtle ambient shader backdrop */}
          <div className="opacity-45">
            <ShaderCanvas
              focus={[0, -0.2]}
              speed={0.6}
              colors={[
                [0.04, 0.04, 0.05],
                [0.45, 0.06, 0.09],
                [0.72, 0.54, 0.28],
                [0.98, 0.92, 0.8],
              ]}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d10]/70 via-[#0d0d10]/40 to-[#0d0d10]/85" />

          {/* Content container */}
          <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-gold-soft)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] shadow-[0_0_8px_var(--lp-red)]" />
              Free Evaluation
            </div>

            {/* Headline */}
            <h2 className="lp-serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.14] tracking-[-0.02em] text-white">
              Ready to start your <em className="lp-script text-[var(--lp-gold-soft)]">German journey?</em>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 max-w-[540px] text-[15px] sm:text-[16px] leading-[1.65] text-white/75">
              Audit your course prerequisites, calculate your German GPA, and connect with a dedicated TU9 alumni guide.
            </p>

            {/* Button group */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/login"
                className="lp-btn lp-btn--red w-full justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.5)] sm:w-auto"
              >
                Start free evaluation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/admission-chance"
                className="lp-btn lp-btn--ghost-light w-full justify-center sm:w-auto"
              >
                Check chances
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[var(--lp-red)]" /> 100% free initial assessment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[var(--lp-gold)]" /> 400+ public universities
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-white/70" /> Direct TU9 alumni mentorship
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

