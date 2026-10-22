"use client";
import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, ArrowRight, Check, GraduationCap, Compass } from 'lucide-react';

export const ScholarshipsHero = () => {
  return (
    <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Warm ambient landing lights */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[80vh] w-[65vw] rounded-full blur-[140px] opacity-40 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(231,211,168,0.55), rgba(244,241,234,0))" }}
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-[20%] left-[20%] h-[60vh] w-[45vw] rounded-full blur-[120px] opacity-30 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(230,57,70,0.15), rgba(244,241,234,0))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Scholarships &amp; Funding</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Hero Editorial */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lp-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lp-red)]"></span>
              </span>
              <span>Funding &amp; Financial Aid 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.02em]">
              Scholarships &amp; Grants for <em className="lp-script text-[var(--lp-red)]">German Universities</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              German public universities already offer <strong className="font-semibold text-[var(--lp-text)]">0€ tuition</strong>. Combining this with DAAD, Deutschlandstipendium, or foundation stipends makes your Master&apos;s or doctorate completely self-sustaining.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-[var(--lp-card)] rounded-2xl p-4 sm:p-5 border border-[#e5e0d3] text-center shadow-xs">
                <span className="block lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">0€</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] mt-1 block">Public Tuition</span>
              </div>
              <div className="bg-[var(--lp-card)] rounded-2xl p-4 sm:p-5 border border-[#e5e0d3] text-center shadow-xs">
                <span className="block lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-red)]">€992/mo</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] mt-1 block">DAAD Stipend</span>
              </div>
              <div className="bg-[var(--lp-card)] rounded-2xl p-4 sm:p-5 border border-[#e5e0d3] text-center shadow-xs">
                <span className="block lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-gold)]">30,000+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-muted)] mt-1 block">Natl. Recipients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Tool Navigation Card */}
          <div className="lg:col-span-5 bg-[var(--lp-card)] rounded-3xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative">
            <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ece7dd] flex items-center justify-center border border-[#ded8cb]">
                  <Award className="w-4 h-4 text-[var(--lp-red)]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Dedicated Evaluation Tool</span>
                  <h2 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Admission &amp; Scholarship Matcher</h2>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Find funding opportunities suited to your academic background, degree tier, and field of study using our dedicated interactive tool.
            </p>

            <div className="space-y-2.5">
              <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-start gap-3 text-xs">
                <GraduationCap className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--lp-text)] block font-semibold">DAAD &amp; National Fellowships</strong>
                  <span className="text-[var(--lp-muted)]">€992/mo + health insurance for competitive profiles (GPA ≤ 1.9).</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-start gap-3 text-xs">
                <Award className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--lp-text)] block font-semibold">Deutschlandstipendium</strong>
                  <span className="text-[var(--lp-muted)]">€300/mo merit grant awarded directly through university international offices.</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-start gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--lp-text)] block font-semibold">Foundation Grants (Stiftungen)</strong>
                  <span className="text-[var(--lp-muted)]">Over 13 political, religious, and philanthropic foundations funding students.</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <Link
                href="/tools/admission-chance"
                className="lp-btn lp-btn--dark w-full justify-center group text-xs"
              >
                <span>Evaluate Profile in Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/tools/german-grade-calculator"
                className="text-xs text-[var(--lp-muted)] hover:text-[var(--lp-red)] transition-colors inline-flex items-center gap-1.5 justify-center w-full font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                <span>Calculate your German GPA first &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
