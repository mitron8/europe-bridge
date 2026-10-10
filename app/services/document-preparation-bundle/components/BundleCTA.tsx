"use client";
import React from 'react';
import { ArrowRight, Layers, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const BundleCTA = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <div 
        className="rounded-[30px] bg-[#111111] bg-germany-black p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_-5px_-5px_12px_rgba(0,0,0,0.7),inset_5px_5px_12px_rgba(255,255,255,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left"
      >
        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] cursor-default">
            <Layers className="w-3.5 h-3.5 text-germany-gold" />
            <span>Complete 4-Document Application Trifecta</span>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Submit a Synchronized Application to <span className="text-germany-gold">German Universities</span>
            </h2>
          </div>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            Get your 2-page SOP, two customized LORs, and Europass Tabellarischer Lebenslauf written together by German admissions specialists. Save ₹3,997 instantly.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <a 
            href="#booking" 
            className="neu-btn-primary w-full sm:w-auto px-8 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md whitespace-nowrap cursor-pointer"
          >
            <span>Order Your Document Bundle</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 font-semibold pt-0.5">
            <span>✓ ₹13,999 (Save ₹3,997)</span>
            <span>•</span>
            <span>✓ 2 Review Rounds</span>
            <span>•</span>
            <span>✓ Express 48h Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
