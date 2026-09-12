"use client";
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const BlockedAccountCTA = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <div 
        className="rounded-[30px] bg-germany-black p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-[12px_12px_30px_rgba(71,85,105,0.32),inset_-5px_-5px_12px_rgba(0,0,0,0.7),inset_5px_5px_12px_rgba(255,255,255,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left"
      >
        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] cursor-default">
            <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" />
            <span>Ready for Visa Appointment?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Get Your Official Blocking Confirmation <span className="text-germany-gold">In 24 Hours</span>
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            Don&apos;t let financial paperwork delay your German student visa. Submit your application today and get full guidance from EuropeBridge advisors.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <a 
            href="#booking" 
            className="neu-btn-primary w-full sm:w-auto px-8 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
          >
            <span>Open Blocked Account</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 font-semibold pt-0.5">
            <span>✓ Foreign Office Approved</span>
            <span>•</span>
            <span>✓ 24h Confirmation</span>
          </div>
        </div>

      </div>
    </section>
  );
};
