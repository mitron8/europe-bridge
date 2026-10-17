"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Calculator, Check, Sparkles } from 'lucide-react';

export const HeroHeader = () => {
  const [quickPercentage, setQuickPercentage] = useState<number>(78);

  // Quick Bavarian formula estimation with standard Indian scale (Max 100, Pass 40)
  const calculateQuickGermanGrade = (pct: number) => {
    if (!pct || pct < 40) return "N/A";
    const grade = 1 + 3 * ((100 - pct) / (100 - 40));
    return grade.toFixed(2);
  };

  const germanGrade = calculateQuickGermanGrade(quickPercentage);

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
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
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/#our-process" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
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
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-[0_4px_24px_rgba(22,22,26,0.03)] border-l-4 border-l-[var(--lp-red)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--lp-red)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--lp-red)]" /> At a Glance Summary
                </span>
                <span className="text-[11.5px] font-medium text-[var(--lp-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--lp-faint)]" /> Updated May 2026
                </span>
              </div>
              <p className="text-[14.5px] text-[var(--lp-text)] leading-[1.7] font-normal">
                To study in Germany, you need a recognized secondary or Bachelor's degree (converted via the modified Bavarian formula to the German 1.0–4.0 scale), language proficiency (IELTS 6.0–6.5 or TestDaF 4x4), and an <strong className="font-semibold text-[var(--lp-text)]">APS certificate</strong> (mandatory for India, China, Vietnam). Standard deadlines: <strong className="text-[var(--lp-red)] font-semibold">July 15</strong> (Winter) &amp; <strong className="text-[var(--lp-red)] font-semibold">Jan 15</strong> (Summer).
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Grade Estimator Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
                  <Calculator className="w-6 h-6 text-[var(--lp-text)]" />
                </div>
                <div>
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Instant German GPA Check</h3>
                  <p className="text-xs text-[var(--lp-muted)] mt-0.5">Estimate your grade on the German scale (1.0 to 4.0)</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-[var(--lp-text)]">
                  <span>Your Academic Score (%)</span>
                  <span className="text-[var(--lp-red)] font-bold text-sm bg-[var(--lp-red)]/10 px-2.5 py-0.5 rounded-full">{quickPercentage}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={quickPercentage} 
                  onChange={(e) => setQuickPercentage(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#ece7dd] rounded-lg appearance-none cursor-pointer accent-[var(--lp-red)] transition-all"
                />
                <div className="flex justify-between text-[11px] text-[var(--lp-muted)] font-medium">
                  <span>40% (Passing)</span>
                  <span>70% (First Class)</span>
                  <span>100% (Distinction)</span>
                </div>
              </div>

              <motion.div 
                key={germanGrade}
                initial={{ scale: 0.98, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-[#ece7dd]/60 rounded-2xl p-5 flex items-center justify-between border border-[#e2ddd3]"
              >
                <div>
                  <div className="text-[11px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider">German Scale Result</div>
                  <div className="lp-serif text-3xl sm:text-4xl font-bold text-[var(--lp-text)] mt-0.5">
                    {germanGrade} <span className="text-xs font-normal text-[var(--lp-muted)]">(1.0 is best)</span>
                  </div>
                </div>
                  <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-xs ${
                    Number(germanGrade) <= 1.5 ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)]' :
                    Number(germanGrade) <= 2.2 ? 'bg-[#ece7dd] text-[var(--lp-text)] border-[#e2ddd3]' :
                    Number(germanGrade) <= 2.8 ? 'bg-[var(--lp-gold-soft)]/50 text-[var(--lp-text)] border-[var(--lp-gold)]/40' : 'bg-[var(--lp-red)]/10 text-[var(--lp-red)] border-[var(--lp-red)]/20'
                  }`}>
                    {Number(germanGrade) <= 1.5 ? 'Highly Competitive' :
                     Number(germanGrade) <= 2.2 ? 'Competitive' :
                     Number(germanGrade) <= 2.8 ? 'Good Prospects' : 'Limited Options'}
                  </span>
              </motion.div>

              <a 
                href="#section-bavarian"
                className="lp-btn lp-btn--dark w-full justify-center text-xs group"
              >
                <span>Full Grade Conversion Formula</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
