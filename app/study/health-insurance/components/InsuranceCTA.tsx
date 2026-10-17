"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export const InsuranceCTA = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4" data-reveal>
      <div className="rounded-3xl bg-[var(--lp-ink)] p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        {/* Left Side Content */}
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-mono text-[var(--lp-gold)] text-xs cursor-default">
            <HeartPulse className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
            <span>Digital Health Insurance Setup</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-tight">
            Get Your Official German Health Insurance in <em className="italic text-[var(--lp-gold)] font-serif">24 Hours</em>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            EuropeBridge coordinates directly with certified German statutory providers (TK, Barmer) to issue your instant visa certificate and transmit digital M10 notifications at 0€ agency fees.
          </p>
        </div>

        {/* Right Side Buttons */}
        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[var(--lp-red)] hover:bg-[#b5322b] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
            >
              <span>Get Insurance Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/services/blocked-account"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-[var(--lp-ink)] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Value Package</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 font-mono pt-1">
            <span>100% Embassy &amp; VFS Compliant</span>
            <span>•</span>
            <span>Instant Digital M10</span>
          </div>
        </div>
      </div>
    </section>
  );
};
