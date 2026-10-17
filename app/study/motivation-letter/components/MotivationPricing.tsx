"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Clock, Check } from 'lucide-react';

export const MotivationPricing = () => {
  return (
    <section id="section-pricing" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20 text-[var(--lp-red)] text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Zero Hidden Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
            Simple, Transparent <span className="text-[var(--lp-red)] italic">Pricing</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal leading-relaxed">
            Invest in a flawless consular document that protects your university admission and prevents costly visa rejections or rescheduling delays.
          </p>
        </div>

        {/* Pricing Cards */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Standard Order */}
          <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="space-y-4">
              <div className="border-b border-[var(--lp-rule)] pb-5 space-y-1 text-center">
                <p className="text-xs font-mono font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Standard Order</p>
                <div className="mt-2 flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[var(--lp-ink)]">₹3,999</span>
                  <span className="text-xs font-mono text-[var(--lp-muted)]">all inclusive</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-[var(--lp-muted)] bg-[var(--lp-paper-2)] px-3 py-1 rounded-full mt-2 border border-[var(--lp-rule)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>First draft in 3 working days</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[var(--lp-text)]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span><strong className="text-[var(--lp-ink)]">Consulate-ready LOM</strong> written completely from scratch</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span><strong className="text-[var(--lp-ink)]">Two rounds</strong> of student reviews & revisions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span><strong className="text-[var(--lp-ink)]">100% Plagiarism-free</strong>, profile & module specific</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Delivered as a <strong className="text-[var(--lp-ink)]">Google Doc</strong> for easy commenting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Includes German Mission salutation & § 16b citation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--lp-rule)]">
              <Link
                href="/signup?service=lom&plan=standard"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-ink)] hover:text-[var(--lp-red)] border border-[var(--lp-rule)] bg-[var(--lp-paper)] hover:bg-[var(--lp-card)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Standard - ₹3,999</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Express Order (Dark / Premium) */}
          <div className="bg-[var(--lp-ink)] text-white border border-white/10 rounded-3xl p-6 sm:p-8 relative shadow-xl flex flex-col justify-between space-y-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--lp-red)]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--lp-gold)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="border-b border-white/10 pb-5 space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--lp-red)] text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Express Fast-Track
                  </span>
                </div>
                <p className="text-xs font-mono font-semibold text-[var(--lp-gold)] uppercase tracking-wider">Express Order</p>
                <div className="mt-2 flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-white">₹4,999</span>
                  <span className="text-xs font-mono text-white/50">all inclusive</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-white/80 bg-white/10 px-3 py-1 rounded-full mt-2 border border-white/10">
                  <Zap className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
                  <span>First draft in 1 working day (24 hrs)</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Same premium consular quality as Standard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span className="text-[var(--lp-gold)]">Compressed 24-hour turnaround SLA</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span><strong className="text-white">Two rounds</strong> of priority student reviews</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Assigned to <strong className="text-white">Senior Visa Editorial Lead</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Recommended for students with approaching <strong className="text-white">VFS appointment dates</strong></span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <Link
                href="/signup?service=lom&plan=express"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[var(--lp-red)] hover:bg-[var(--lp-red)]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Order Express - ₹4,999</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Endorsement */}
        <div data-reveal className="text-center max-w-xl mx-auto text-xs font-mono text-[var(--lp-muted)]">
          Trusted by over 10,000+ Indian & international students admitted to top German universities including TU Munich, RWTH Aachen, TU Berlin, and University of Stuttgart.
        </div>
      </div>
    </section>
  );
};
