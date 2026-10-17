"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Check } from 'lucide-react';

export const LifeAfterOfferCTA = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div data-reveal className="relative rounded-3xl bg-[var(--lp-ink)] text-white p-8 sm:p-12 lg:p-16 border border-white/10 overflow-hidden shadow-2xl">
          {/* Subtle warm glow background */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[var(--lp-red)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -top-24 w-96 h-96 bg-[var(--lp-gold)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-mono uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
              <span>End-to-End European Career Guidance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
              Ready to Turn Your German Degree into an <span className="text-[var(--lp-red)] italic">International Career?</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl font-light">
              From finding universities with the highest Werkstudent conversion rates to tailoring your German Tabellarischer Lebenslauf, navigating the 18-month job seeker visa, and securing your EU Blue Card—EuropeBridge is with you every step of the journey.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/profile-evaluation"
                className="px-8 py-3.5 rounded-xl bg-[var(--lp-red)] text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[var(--lp-red)]/90 transition-all shadow-md flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Get My Free Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/study/masters"
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Explore Master&apos;s Guide</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-white/70 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>100% Free Initial Evaluation</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Public University Alumni Mentors</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Blue Card Negotiation Advice</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
