"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[30px] bg-germany-black p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-[12px_12px_30px_rgba(71,85,105,0.3),inset_0_-4px_10px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-germany-red/15 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-germany-gold/20 rounded-full blur-[70px] pointer-events-none" />

        {/* Left Side Content */}
        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-inner cursor-default">
            <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" />
            <span>Dedicated Application Guidance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Need Expert Help with Your <span className="text-germany-gold">Applications?</span>
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            From shortlisting programs matching your ECTS credits to drafting motivation letters, submitting via uni-assist, and securing visa appointments — alumni mentors guide every milestone.
          </p>
        </div>

        {/* Right Side Buttons & Reassurance */}
        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="neu-btn-primary w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(230,57,70,0.35)] whitespace-nowrap transition-colors"
            >
              <span>Get Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/tools/admission-chance"
              className="neu-btn w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-extrabold text-germany-black bg-white hover:text-germany-red flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Evaluate Odds</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 font-semibold pt-1">
            <span>✓ ECTS Prerequisite Auditing</span>
            <span>•</span>
            <span>✓ 100% Free Initial Review</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
