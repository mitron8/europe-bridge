"use client";

import React from 'react';
import { ArrowRight, Truck, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const DHLCTA = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <div 
        className="rounded-[30px] bg-[#111111] bg-germany-black p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_-5px_-5px_12px_rgba(0,0,0,0.7),inset_5px_5px_12px_rgba(255,255,255,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left border border-white/10"
      >
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] cursor-default">
            <Truck className="w-3.5 h-3.5 text-germany-gold" />
            <span>Don&apos;t Risk Missing University Deadlines</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Dispatch Your Applications to Germany <br className="hidden sm:inline" />
            <span className="text-germany-gold">For Only ₹2,033 / Application</span>
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            Doorstep home pickup, 3–4 working days guaranteed transit, and continuous live tracking to uni-assist e.V. and all public German university admission desks.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] text-neutral-300 font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-germany-gold" /> Free Doorstep Home Pickup
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-germany-gold" /> 3–4 Working Days Delivery
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" /> Sealed Transcripts Protected
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <a 
            href="#booking" 
            className="neu-btn-primary w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
          >
            <span>Book Courier Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <span className="text-[11px] text-neutral-400 font-medium">
            24-hour callback Mon–Sat
          </span>
        </div>
      </div>
    </section>
  );
};
