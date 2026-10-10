"use client";
import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Clock, PhoneCall } from 'lucide-react';

export const BlockedAccountCTA = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <div 
        className="rounded-[30px] bg-[#111111] bg-germany-black p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_-5px_-5px_12px_rgba(0,0,0,0.7),inset_5px_5px_12px_rgba(255,255,255,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left border border-white/10"
      >
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] cursor-default">
            <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" />
            <span>Ready for Your Visa Appointment?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Get Your Official Blocking Confirmation <br className="hidden sm:inline" />
            <span className="text-germany-gold">In Under 24 Hours</span>
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            Don&apos;t let financial documentation delay your German student visa. Submit your application today to receive 1-on-1 advisor assistance, choose the best BaFin-licensed provider, and unlock up to €247 in health insurance cashback.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] text-neutral-300 font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-germany-gold" /> Foreign Office Approved
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-germany-gold" /> 60-Minute Advisor Callback
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" /> 100% Refund on Visa Rejection
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <a 
            href="#booking" 
            className="neu-btn-primary w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
          >
            <span>Open Blocked Account</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a 
            href="#calculator" 
            className="text-xs font-bold text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
          >
            Estimate INR Conversion →
          </a>
        </div>
      </div>
    </section>
  );
};
