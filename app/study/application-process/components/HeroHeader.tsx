"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, Calendar, Euro, Clock, ArrowRight } from 'lucide-react';

export const HeroHeader = () => {
  return (
    <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.3), rgba(201,163,91,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Application Process</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Step-by-Step Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[50px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              How to Apply to <em className="lp-script text-[var(--lp-red)]">German Universities</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.65] font-normal max-w-xl">
              Applying to a public German university is a structured six-step journey. Learn how to shortlist courses, format documents, navigate uni-assist vs. direct portals, block accounts, and secure admission offers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#section-research"
                className="lp-btn lp-btn--red text-xs font-semibold shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Explore the 6 Steps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/tools/admission-chance"
                className="lp-btn lp-btn--dark text-xs font-semibold"
              >
                <span>Check Eligibility</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats sidebar/card */}
          <div className="lg:col-span-5 bg-[var(--lp-card)] rounded-3xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.05)]">
            <div className="flex items-center gap-2 border-b border-[var(--lp-rule)] pb-3">
              <Compass className="w-4 h-4 text-[var(--lp-red)]" />
              <h2 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Application Benchmarks</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] block">Winter Intake</span>
                <span className="text-[var(--lp-text)] lp-serif text-base font-semibold block">July 15</span>
                <span className="text-[10.5px] text-[var(--lp-muted)] block">Standard federal cutoff</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] block">Summer Intake</span>
                <span className="text-[var(--lp-text)] lp-serif text-base font-semibold block">January 15</span>
                <span className="text-[10.5px] text-[var(--lp-muted)] block">Limited course openings</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] block">uni-assist Fee</span>
                <span className="text-[var(--lp-red)] lp-serif text-base font-semibold block">€75</span>
                <span className="text-[10.5px] text-[var(--lp-muted)] block">+€30 per extra course</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] block">Decision Window</span>
                <span className="text-[var(--lp-gold)] lp-serif text-base font-semibold block">4–8 Weeks</span>
                <span className="text-[10.5px] text-[var(--lp-muted)] block">Post-deadline evaluation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
