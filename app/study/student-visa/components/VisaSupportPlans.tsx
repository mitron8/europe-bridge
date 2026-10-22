"use client";

import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const VisaSupportPlans = () => {
  return (
    <section id="section-pricing" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Transparent Assistance Plans
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          Comprehensive <em className="lp-script text-[var(--lp-red)]">Visa Support Plans</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Zero hidden agency surcharges. Professional assistance from certified counsellors with setup within 1 to 2 working days.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
        
        {/* Plan 1: Premium Visa Support */}
        <div className="bg-[#faf8f3] rounded-3xl p-7 sm:p-8 border border-[#e5e0d3] flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-4">
            <div className="border-b border-[#e5e0d3] pb-4 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Standard Filing</span>
              <h3 className="font-serif text-2xl font-normal text-[var(--lp-ink)]">Premium Plan</h3>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-[var(--lp-ink)]">₹14,999</span>
                <span className="text-xs text-[var(--lp-muted)] font-mono">/ applicant</span>
              </div>
              <p className="text-xs text-[var(--lp-muted)] pt-1">
                Setup initiated within 1–2 working days post-consultation.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--lp-muted)]">
              {[
                "Consular Services Portal (CSP) Registration Support",
                "Official Entry Form digital data entry",
                "VIDEX Form generation with verified 2D barcode",
                "Document audit, PDF optimization & upload support",
                "CSP email query & document correction handling",
                "VFS Global biometric appointment slot tracking",
                "1:1 Visa Mock Interview preparation session",
                "Dedicated on-call visa counselor support"
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#eae5db] hover:bg-[#e0dad0] text-[var(--lp-text)] text-xs font-semibold transition-colors"
            >
              <span>Choose Premium Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Plan 2: Complete Plan (Dark Card in var(--lp-ink)) */}
        <div className="bg-[var(--lp-ink)] text-[#faf8f3] rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="space-y-4">
            <div className="border-b border-white/15 pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)]">End-to-End Pack</span>
                <span className="text-[9px] font-mono uppercase text-white bg-[var(--lp-red)] px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-white">Complete Plan</h3>
              <div className="flex items-baseline gap-1 pt-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-white">₹19,999</span>
                <span className="text-xs text-neutral-400 font-mono">/ applicant</span>
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                Full visa dossier, drafting, embassy compliance &amp; relocation support.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-300">
              {[
                "Everything included in Premium Plan",
                "Custom Letter of Motivation (LOM) drafted by German experts",
                "Official Visa Cover Letter drafting & formatting",
                "Embassy correction & additional documents support",
                "Priority WhatsApp & on-call senior counselor access",
                "Complimentary Education Loan & Blocked Account setup",
                "Free Outward Remittance & Student Forex Card guidance"
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[var(--lp-red)] hover:bg-[#b5322b] text-white text-xs font-semibold transition-colors"
            >
              <span>Choose Complete Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-[var(--lp-muted)]">
        <span>Trusted by international scholars across German public universities and research institutes.</span>
      </div>
    </section>
  );
};
