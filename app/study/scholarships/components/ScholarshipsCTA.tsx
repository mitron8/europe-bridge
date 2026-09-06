"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const ScholarshipsCTA = () => {
  return (
    <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-8 sm:p-12 bg-gradient-to-r from-germany-black via-gray-900 to-germany-black text-white relative overflow-hidden rounded-3xl shadow-xl">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Scholarship Evaluation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight">
              Need Help Finding & Winning <span className="text-germany-red">German Scholarships?</span>
            </h2>

            <p className="text-gray-300 font-medium text-base leading-relaxed">
              Our specialized advisors evaluate your academic background, convert your grades to the German scale, craft winning motivation letters, and identify which high-value grants you can realistically secure.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-gray-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free German Grade Assessment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailored SOP & LOR Review
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> University + DAAD Shortlist
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/#cta"
              className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Get Free Profile Evaluation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/tools/admission-chance"
              className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 cursor-pointer"
            >
              <span>Admission Chance Tool</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
