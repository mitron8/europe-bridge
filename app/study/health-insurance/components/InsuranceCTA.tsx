"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export const InsuranceCTA = () => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[30px] bg-[#111111] bg-germany-black p-6 sm:p-8 lg:p-9 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_0_-4px_10px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-germany-red/15 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-germany-gold/20 rounded-full blur-[70px] pointer-events-none" />

        {/* Left Side Content */}
        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full font-bold text-germany-gold text-xs shadow-inner cursor-default">
            <HeartPulse className="w-3.5 h-3.5 text-germany-gold" />
            <span>Digital Health Insurance Setup</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            Get Your Official German Health Insurance in <span className="text-germany-gold">24 Hours</span>
          </h2>

          <p className="text-neutral-300 font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
            EuropeBridge coordinates directly with certified German public insurers (TK, Barmer) to issue your instant visa certificate and transmit digital M10 notifications at €0 agency fees.
          </p>
        </div>

        {/* Right Side Buttons & Reassurance */}
        <div className="relative z-10 flex flex-col items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-germany-red hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(230,57,70,0.35)] whitespace-nowrap transition-colors"
            >
              <span>Get Insurance Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/services/blocked-account"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-germany-black hover:text-germany-red font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Value Package</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 font-semibold pt-1">
            <span>✓ 100% Embassy &amp; VFS Compliant</span>
            <span>•</span>
            <span>✓ Instant Digital M10</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
