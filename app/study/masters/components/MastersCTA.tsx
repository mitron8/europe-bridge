"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export const MastersCTA = () => {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[30px] bg-[#111111] bg-germany-black p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_0_-4px_10px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-germany-red/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-germany-gold/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Left Side Content */}
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-inner cursor-default">
            <GraduationCap className="w-3.5 h-3.5 text-germany-gold" />
            <span>EuropeBridge Master&apos;s Launchpad</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Ready to Begin Your <span className="text-germany-gold">Tuition-Free Master&apos;s</span> in Germany?
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            Evaluate your bachelor&apos;s transcript, calculate your Bavarian GPA, map your credit requirements, and get verified admissions guidance directly from students already studying at TU9 universities.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 0€ Tuition Public Universities
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-germany-gold" /> 180 &amp; 210 ECTS Mapping
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-germany-gold" /> APS &amp; Visa Advisory
            </span>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/tools/admission-chance"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-germany-red hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(230,57,70,0.4)] whitespace-nowrap transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-germany-gold" />
              <span>Evaluate Admission Odds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signup"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-germany-black hover:text-germany-red font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign Up Free</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-semibold pt-1">
            <span>No agency fees</span>
            <span>•</span>
            <span>Instant German GPA conversion</span>
            <span>•</span>
            <span>Unbiased university matching</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
