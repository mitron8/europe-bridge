"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, CheckCircle2, Clock, ShieldCheck, ScrollText } from 'lucide-react';

export const MotivationHero = () => {
  return (
    <section id="overview" className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/study/application-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Motivation Letter</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <ScrollText className="w-4 h-4" />
              <span>Admissions &amp; Visa Services</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Letter of Motivation for <span className="text-germany-red">German Student Visa</span>
              </h1>
              <motion.img 
                src="/doodles/CV.png" 
                alt="Curriculum Vitae and Motivation Letter Doodle"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              The mandatory Letter of Motivation (LOM) drafted for your German Student Visa application (§ 16b AufenthG). Addressed directly to the consulate, it articulates your academic background, justifies why Germany and your specific university curriculum, and establishes unambiguous post-study return ties.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a 
                href="#pricing"
                className="neu-btn-primary px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Get My Motivation Letter Written</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#structure"
                className="neu-btn px-6 py-3.5 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0]/80 shadow-2xs flex items-center gap-2 cursor-pointer bg-white"
              >
                <span>Consular LOM Anatomy</span>
                <FileText className="w-4 h-4 text-gray-500" />
              </a>
            </div>

            <div className="text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>From <strong>₹3,999</strong> • First draft delivered in <strong>1 to 3 working days</strong></span>
            </div>

            {/* Micro Highlights Pill Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Format</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">Consulate Ready</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Delivery</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">1 or 3 Days</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Revisions</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">2 Review Rounds</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Originality</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">100% Plagiarism Free</p>
              </div>
            </div>
          </div>

          {/* Right: Claymorphic Consular Document Preview Card */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-7 relative border-2 border-white/80 shadow-xl space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-germany-red/10 border border-germany-red/20 flex items-center justify-center text-germany-red font-black">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-germany-black">Consular Letter Specification</h3>
                    <p className="text-[11px] text-gray-500 font-semibold">German National Visa (Type D - § 16b)</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Consulate Standard
                </span>
              </div>

              {/* Sample Preview Snippet */}
              <div className="bg-gray-50/90 rounded-xl p-4 border border-gray-200/70 font-mono text-[11px] text-gray-700 space-y-2 leading-relaxed shadow-inner">
                <div className="text-gray-400 font-sans text-[10px] uppercase font-bold tracking-wider">To: Visa Section</div>
                <div className="text-germany-black font-semibold font-sans">
                  Embassy / Consulate General of the Federal Republic of Germany
                </div>
                <div className="text-gray-500 font-sans text-[10px] italic">
                  Re: Application for Student Visa pursuant to Section 16b AufenthG
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <p className="text-gray-600 font-sans text-xs line-clamp-3">
                  &ldquo;Having secured unconditional admission to the Master of Science in Data Science at TU Munich, I submit this statement to detail my academic progression, specific curriculum choices in Machine Learning modules, and structured career trajectory upon graduation...&rdquo;
                </p>
              </div>

              {/* Quality Standards Checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Customized to your target mission (Delhi, Mumbai, Bengaluru, Chennai, or Kolkata)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Module-by-module alignment preventing generic motivation rejections</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Clear financial declaration (€11,904 blocked account &amp; living expenses)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strong economic &amp; familial return intent to satisfy consular scrutiny</span>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <p className="text-[11px] font-bold text-amber-900 leading-snug">
                  100% human-written from scratch. Zero generic templates, zero AI hallmarks. Verified with plagiarism reports.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
