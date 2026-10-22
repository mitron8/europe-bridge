"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, ShieldCheck, ScrollText, Check } from 'lucide-react';

export const MotivationHero = () => {
  return (
    <section id="overview" className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
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
          <span className="text-[var(--lp-text)] font-bold">Motivation Letter</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Visa &amp; Admissions SOP 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[50px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              Letter of Motivation for <em className="lp-script text-[var(--lp-red)]">German Student Visa</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] font-normal leading-[1.65] max-w-xl">
              The mandatory Letter of Motivation (LOM) drafted for your German Student Visa application (§ 16b AufenthG). Addressed directly to the consulate, it articulates your academic background, justifies why Germany and your specific university curriculum, and establishes unambiguous post-study return ties.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a 
                href="#pricing"
                className="lp-btn lp-btn--red text-xs font-semibold shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Get My Motivation Letter Written</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#structure"
                className="lp-btn lp-btn--dark text-xs font-semibold"
              >
                <span>Consular LOM Anatomy</span>
                <FileText className="w-3.5 h-3.5 text-[var(--lp-red)]" />
              </a>
            </div>

            <div className="text-xs text-[var(--lp-muted)] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--lp-gold)]" />
              <span>From <strong className="text-[var(--lp-text)]">₹3,999</strong> • First draft delivered in <strong className="text-[var(--lp-text)]">1 to 3 working days</strong></span>
            </div>

            {/* Micro Highlights Pill Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[#e5e0d3]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Format</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-text)] mt-0.5">Consulate Ready</p>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[#e5e0d3]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Revisions</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-red)] mt-0.5">Unlimited 14 Days</p>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[#e5e0d3]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Success Rate</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-text)] mt-0.5">99.4% Approval</p>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[#e5e0d3]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Originality</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-gold)] mt-0.5">100% Plagiarism Free</p>
              </div>
            </div>
          </div>

          {/* Right: Consular Document Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] p-6 sm:p-8 rounded-3xl border border-[#e5e0d3] shadow-[0_12px_40px_rgba(22,22,26,0.05)] space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center text-[var(--lp-red)]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="lp-serif text-sm font-semibold text-[var(--lp-text)]">Consular Letter Specification</h3>
                    <p className="text-[11px] text-[var(--lp-muted)] font-mono">German National Visa (Type D - § 16b)</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] rounded-full border border-[var(--lp-gold)]/25">
                  Consulate Standard
                </span>
              </div>

              {/* Sample Preview Snippet */}
              <div className="bg-[var(--lp-paper)] rounded-2xl p-4 border border-[var(--lp-rule)] text-[11.5px] text-[var(--lp-text)] space-y-2 leading-relaxed">
                <div className="text-[var(--lp-muted)] text-[10px] uppercase font-semibold tracking-wider">To: Visa Section</div>
                <div className="text-[var(--lp-text)] font-semibold lp-serif">
                  Embassy / Consulate General of the Federal Republic of Germany
                </div>
                <div className="text-[var(--lp-muted)] text-[10px] italic">
                  Re: Application for Student Visa pursuant to Section 16b AufenthG
                </div>
                <div className="h-px bg-[var(--lp-rule)] my-2" />
                <p className="text-[var(--lp-muted)] text-xs line-clamp-3">
                  &ldquo;Having secured unconditional admission to the Master of Science in Data Science at TU Munich, I submit this statement to detail my academic progression, specific curriculum choices in Machine Learning modules, and structured career trajectory upon graduation...&rdquo;
                </p>
              </div>

              {/* Quality Standards Checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Customized to your target mission (Delhi, Mumbai, Bengaluru, Chennai, or Kolkata)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Module-by-module alignment preventing generic motivation rejections</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Clear financial declaration (€11,904 blocked account &amp; living expenses)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Strong economic &amp; familial return intent to satisfy consular scrutiny</span>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="bg-[#eae5db]/60 rounded-2xl p-3.5 border border-[#e5e0d3] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--lp-gold)] shrink-0" />
                <p className="text-[11px] font-medium text-[var(--lp-text)] leading-snug">
                  100% human-written from scratch. Zero generic templates, zero AI hallmarks. Verified with plagiarism reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
