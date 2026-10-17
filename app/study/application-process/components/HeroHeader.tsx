"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, Calendar, Euro, Clock } from 'lucide-react';

export const HeroHeader = () => {
  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-reveal>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
        <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
        <span>/</span>
        <span className="text-[var(--lp-text)] font-semibold">Application Process</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)] inline-block">
            Step-by-Step Guide 2026
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--lp-ink)] font-normal tracking-tight leading-[1.15]">
            How to Apply to <em className="italic text-[var(--lp-red)] font-serif">German Universities</em>
          </h1>

          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed max-w-xl">
            Applying to a public German university is a structured six-step journey. Learn how to shortlist courses, format documents, navigate uni-assist vs. direct portals, block accounts, and secure admission offers.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <a
              href="#section-research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold"
            >
              <span>Explore the 6 Steps</span>
            </a>
            <Link
              href="/tools/admission-chance"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#eae5db]/60 text-[var(--lp-text)] hover:bg-[#eae5db] border border-[#e5e0d3] transition-colors text-xs font-semibold"
            >
              <span>Check Eligibility</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats sidebar/card */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#e5e0d3] pb-3">
            <Compass className="w-4 h-4 text-[var(--lp-red)]" />
            <h2 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Application Benchmarks</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)] block">Winter Intake</span>
              <span className="text-[var(--lp-ink)] font-serif text-base font-normal block">July 15</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Standard federal cutoff</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)] block">Summer Intake</span>
              <span className="text-[var(--lp-ink)] font-serif text-base font-normal block">January 15</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Limited course openings</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)] block">uni-assist Fee</span>
              <span className="text-[var(--lp-red)] font-serif text-base font-normal block">€75</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">+€30 per extra course</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)] block">Decision Window</span>
              <span className="text-[var(--lp-gold)] font-serif text-base font-normal block">4–8 Weeks</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Post-deadline evaluation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
