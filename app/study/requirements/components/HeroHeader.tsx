"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Calculator, Check, Compass, BookOpen } from 'lucide-react';

export const HeroHeader = () => {
  return (
    <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Warm ambient landing lights */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[80vh] w-[65vw] rounded-full blur-[140px] opacity-40 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(231,211,168,0.55), rgba(244,241,234,0))" }}
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-[20%] left-[20%] h-[60vh] w-[45vw] rounded-full blur-[120px] opacity-30 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(230,57,70,0.15), rgba(244,241,234,0))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Admission Requirements</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lp-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lp-red)]"></span>
              </span>
              <span>Complete Admission Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.02em]">
              Admission Requirements for <em className="lp-script text-[var(--lp-red)]">German Universities</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              GPA conversion rules, language score cutoffs (IELTS, TOEFL, TestDaF), document checklists, and application timelines to qualify for tuition-free public German universities.
            </p>

            {/* At a Glance Box */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ece7dd]/70 border border-[#ded8cb] rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-[0_8px_24px_rgba(22,22,26,0.04)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--lp-red)] bg-white/80 border border-[#e5e0d3] shadow-xs">
                  <Compass className="w-3.5 h-3.5 text-[var(--lp-red)]" /> At a Glance Summary
                </span>
                <span className="text-[11.5px] font-medium text-[var(--lp-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--lp-faint)]" /> Updated May 2026
                </span>
              </div>
              <p className="text-[14.5px] text-[var(--lp-text)] leading-[1.7] font-normal">
                To study in Germany, you need a recognized secondary or Bachelor&apos;s degree (converted via the modified Bavarian formula to the German 1.0–4.0 scale), language proficiency (IELTS 6.0–6.5 or TestDaF 4x4), and an <strong className="font-semibold text-[var(--lp-text)]">APS certificate</strong> (mandatory for India, China, Vietnam). Standard deadlines: <strong className="text-[var(--lp-red)] font-semibold">July 15</strong> (Winter) &amp; <strong className="text-[var(--lp-red)] font-semibold">Jan 15</strong> (Summer).
              </p>
            </motion.div>
          </motion.div>

          {/* Dedicated Tool Navigation Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative"
            >
              <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#ded8cb] shadow-xs">
                    <Calculator className="w-5 h-5 text-[var(--lp-red)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Dedicated Evaluation Tool</span>
                    <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">German Grade Calculator</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                German universities use the modified Bavarian formula where <strong className="text-[var(--lp-text)] font-semibold">1.0 is the highest possible score</strong> and 4.0 is the minimum passing grade.
              </p>

              <div className="space-y-2.5">
                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--lp-text)]">1.0 &ndash; 1.5 (Very Good)</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--lp-ink)] text-white text-[10.5px] font-semibold">TU9 Competitive</span>
                </div>
                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--lp-text)]">1.6 &ndash; 2.5 (Good)</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/15 text-emerald-800 text-[10.5px] font-semibold">Strong Eligibility</span>
                </div>
                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--lp-text)]">2.6 &ndash; 3.0 (Satisfactory)</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 text-[10.5px] font-semibold">Non-NC Recommended</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link 
                  href="/tools/german-grade-calculator"
                  className="lp-btn lp-btn--dark w-full justify-center text-xs group"
                >
                  <span>Launch German Grade Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link 
                  href="/tools/admission-chance"
                  className="text-xs text-[var(--lp-muted)] hover:text-[var(--lp-red)] transition-colors inline-flex items-center gap-1.5 justify-center w-full font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                  <span>Or predict university admission chances &rarr;</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
