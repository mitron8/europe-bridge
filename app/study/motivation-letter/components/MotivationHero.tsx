"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, ShieldCheck, ScrollText, Check } from 'lucide-react';

export const MotivationHero = () => {
  return (
    <section id="overview" className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-mono text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/study/application-process" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span>/</span>
          <span className="text-[var(--lp-ink)] font-semibold">Motivation Letter</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Main Hero Content */}
          <div data-reveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20 text-[var(--lp-red)] text-xs font-mono uppercase tracking-wider">
              <ScrollText className="w-3.5 h-3.5" />
              <span>Admissions & Visa Services</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--lp-ink)] leading-tight tracking-tight flex-1">
                Letter of Motivation for <span className="text-[var(--lp-red)] italic">German Student Visa</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] font-normal leading-relaxed">
              The mandatory Letter of Motivation (LOM) drafted for your German Student Visa application (§ 16b AufenthG). Addressed directly to the consulate, it articulates your academic background, justifies why Germany and your specific university curriculum, and establishes unambiguous post-study return ties.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a 
                href="#pricing"
                className="px-7 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[var(--lp-red)] hover:bg-[var(--lp-red)]/90 transition-all flex items-center gap-2 shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <span>Get My Motivation Letter Written</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#structure"
                className="px-6 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-ink)] hover:text-[var(--lp-red)] border border-[var(--lp-rule)] bg-[var(--lp-card)] transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Consular LOM Anatomy</span>
                <FileText className="w-4 h-4 text-[var(--lp-muted)]" />
              </a>
            </div>

            <div className="text-xs sm:text-sm font-mono text-[var(--lp-muted)] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--lp-gold)]" />
              <span>From <strong className="text-[var(--lp-ink)]">₹3,999</strong> • First draft delivered in <strong className="text-[var(--lp-ink)]">1 to 3 working days</strong></span>
            </div>

            {/* Micro Highlights Pill Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[var(--lp-card)] rounded-xl border border-[var(--lp-rule)] transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[10px] font-mono font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Format</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">Consulate Ready</p>
              </div>
              <div className="p-3 bg-[var(--lp-card)] rounded-xl border border-[var(--lp-rule)] transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[10px] font-mono font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Delivery</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">1 or 3 Days</p>
              </div>
              <div className="p-3 bg-[var(--lp-card)] rounded-xl border border-[var(--lp-rule)] transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[10px] font-mono font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Revisions</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">2 Review Rounds</p>
              </div>
              <div className="p-3 bg-[var(--lp-card)] rounded-xl border border-[var(--lp-rule)] transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[10px] font-mono font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Originality</p>
                <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">100% Plagiarism Free</p>
              </div>
            </div>
          </div>

          {/* Right: Consular Document Preview Card */}
          <div data-reveal className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] p-6 sm:p-7 rounded-2xl border border-[var(--lp-rule)] shadow-sm space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center text-[var(--lp-red)]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[var(--lp-ink)]">Consular Letter Specification</h3>
                    <p className="text-[11px] text-[var(--lp-muted)] font-mono">German National Visa (Type D - § 16b)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] rounded-full border border-[var(--lp-gold)]/25">
                  Consulate Standard
                </span>
              </div>

              {/* Sample Preview Snippet */}
              <div className="bg-[var(--lp-paper)] rounded-xl p-4 border border-[var(--lp-rule)] font-mono text-[11px] text-[var(--lp-text)] space-y-2 leading-relaxed">
                <div className="text-[var(--lp-muted)] text-[10px] uppercase font-semibold tracking-wider">To: Visa Section</div>
                <div className="text-[var(--lp-ink)] font-semibold font-serif">
                  Embassy / Consulate General of the Federal Republic of Germany
                </div>
                <div className="text-[var(--lp-muted)] text-[10px] italic">
                  Re: Application for Student Visa pursuant to Section 16b AufenthG
                </div>
                <div className="h-px bg-[var(--lp-rule)] my-2" />
                <p className="text-[var(--lp-muted)] font-serif text-xs line-clamp-3">
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
                  <span>Clear financial declaration (€11,904 blocked account & living expenses)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Strong economic & familial return intent to satisfy consular scrutiny</span>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="bg-[var(--lp-paper-2)] rounded-xl p-3.5 border border-[var(--lp-rule)] flex items-center gap-3">
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
