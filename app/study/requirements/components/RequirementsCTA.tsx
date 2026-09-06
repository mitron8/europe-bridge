"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export const RequirementsCTA = () => {
  return (
    <section className="py-16 px-6 lg:px-12 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="neu-card p-8 sm:p-12 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden space-y-6 shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Success Doodle Accent */}
          <motion.img
            src="/doodles/sucesss.png"
            alt="Success Doodle"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 object-contain opacity-90 hidden lg:block pointer-events-none drop-shadow-xl"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Unbiased Eligibility Check</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display leading-tight">
              Unsure If You Meet German University Cutoffs?
            </h2>

            <p className="text-sm sm:text-base text-red-100 font-medium leading-relaxed">
              Get an instant AI-powered profile evaluation or talk directly to our German admission experts. We analyze your GPA, degree credits, language scores, and APS status to match you with 100% tuition-free public universities.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                href="/signup"
                className="neu-btn-gold px-8 py-3 text-sm font-extrabold text-germany-black flex items-center gap-2 shadow-lg"
              >
                <span>Evaluate My Admission Chance Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/#hero"
                className="px-6 py-3 rounded-full text-xs font-bold text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Book 1-on-1 Counselor Session</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-red-100 font-semibold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>100% Unbiased Public University Shortlist</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>APS &amp; Visa Guidance Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
