"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileCheck, UserCheck, Check } from 'lucide-react';

export const MotivationCTA = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <div 
        data-reveal
        className="rounded-3xl bg-[var(--lp-ink)] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--lp-red)]/15 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--lp-gold)]/10 rounded-full blur-[70px] pointer-events-none" />

        {/* Left Side Content */}
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full font-mono text-[var(--lp-gold)] text-xs">
            <FileCheck className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
            <span>Academic SOP & Consular LOM Crafting</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Craft a Motivation Letter That <span className="text-[var(--lp-gold)] italic">Committees Remember</span>
          </h2>

          <p className="text-white/70 font-light text-xs sm:text-sm leading-relaxed max-w-xl">
            100% original, faculty-tailored writing that highlights your prerequisite coursework, thesis plans, and academic strengths without generic AI boilerplate.
          </p>
        </div>

        {/* Right Side Buttons & Reassurance */}
        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[var(--lp-red)] hover:bg-[var(--lp-red)]/90 text-white font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md whitespace-nowrap transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get SOP Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/tools/admission-chance"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>Target Programs</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-white/60 pt-1">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-[var(--lp-gold)]" /> Zero AI Boilerplate
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-[var(--lp-gold)]" /> German Alumni Review
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
