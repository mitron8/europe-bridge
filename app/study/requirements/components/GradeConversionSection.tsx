"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, HelpCircle, CheckCircle2, TrendingUp, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

export const GradeConversionSection = () => {
  return (
    <section id="section-bavarian" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <Calculator className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #5
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Grade Conversion &amp; <em className="lp-script text-[var(--lp-red)]">Bavarian Formula</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              German admissions convert foreign degrees and transcripts to the German 1.0–4.0 scale using the standardized modified Bavarian formula.
            </p>
          </div>
        </div>

        {/* Bavarian Formula Explainer & Tool Navigation Card */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--lp-rule)] pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Standardized German Evaluation</span>
              <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">The Modified Bavarian Formula</h3>
            </div>
            <Link 
              href="/tools/german-grade-calculator"
              className="lp-btn lp-btn--dark text-xs self-start sm:self-auto group shrink-0"
            >
              <span>Open Dedicated Grade Tool</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Formula Mechanics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-[#ece7dd]/60 border border-[#ded8cb] font-mono text-xs sm:text-sm text-[var(--lp-text)] space-y-2">
                <div className="font-semibold text-[var(--lp-red)] uppercase tracking-wider text-[11px]">Official KMK Formula</div>
                <div className="p-3 bg-white/80 rounded-xl border border-[#ded8cb] font-bold text-center text-sm sm:text-base tracking-wide">
                  German Grade = 1 + 3 &times; [(N<sub>max</sub> &minus; N<sub>d</sub>) / (N<sub>max</sub> &minus; N<sub>pass</sub>)]
                </div>
                <ul className="text-xs text-[var(--lp-muted)] space-y-1 pt-1 font-sans">
                  <li>&bull; <strong className="text-[var(--lp-text)] font-semibold font-mono">N<sub>max</sub></strong>: Maximum achievable grade in your system (e.g., 100% or 10.0 CGPA)</li>
                  <li>&bull; <strong className="text-[var(--lp-text)] font-semibold font-mono">N<sub>pass</sub></strong>: Minimum passing grade required for degree award (e.g., 40% or 4.0 CGPA)</li>
                  <li>&bull; <strong className="text-[var(--lp-text)] font-semibold font-mono">N<sub>d</sub></strong>: Your achieved overall score / CGPA</li>
                </ul>
              </div>

              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                German university admissions offices and uni-assist strictly evaluate Indian, US, British, and global transcripts with this calculation. In Germany, <strong className="text-[var(--lp-text)] font-semibold">a lower number signifies a stronger academic ranking</strong>: 1.0 is the top distinction, and 4.0 represents the cutoff passing threshold.
              </p>
            </div>

            {/* Quick Conversion Benchmarks */}
            <div className="lg:col-span-5 bg-[#ece7dd]/40 border border-[#ded8cb] rounded-2xl p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--lp-muted)]">Scale Calibration Reference</span>
                <span className="text-[10px] font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2 py-0.5 rounded-full">Indian System</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white/70 rounded-xl border border-[#ded8cb] flex items-center justify-between">
                  <span className="text-[var(--lp-muted)]">80% &ndash; 100% (First Class with Dist.)</span>
                  <span className="font-bold text-[var(--lp-text)]">1.0 &ndash; 1.5</span>
                </div>
                <div className="p-3 bg-white/70 rounded-xl border border-[#ded8cb] flex items-center justify-between">
                  <span className="text-[var(--lp-muted)]">70% &ndash; 79% (First Class)</span>
                  <span className="font-bold text-[var(--lp-text)]">1.6 &ndash; 2.2</span>
                </div>
                <div className="p-3 bg-white/70 rounded-xl border border-[#ded8cb] flex items-center justify-between">
                  <span className="text-[var(--lp-muted)]">60% &ndash; 69% (Second Class)</span>
                  <span className="font-bold text-[var(--lp-text)]">2.3 &ndash; 2.8</span>
                </div>
              </div>

              <Link 
                href="/tools/german-grade-calculator"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-[var(--lp-ink)] text-white text-xs font-semibold hover:bg-[var(--lp-ink-3)] transition-colors shadow-xs"
              >
                <span>Calculate Your Exact Grade in Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* NC vs Non-NC Programs */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-all"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[var(--lp-red)] bg-[var(--lp-red)]/10">Restricted Admission</span>
            <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Restricted Admission Programs (NC)</h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              NC programs have a fixed quota of seats. Applicants are ranked strictly by GPA. Popular subjects (Business, Data Science, Psychology) may require a top grade of 1.2–1.8.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-all"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-500/10">Unrestricted Admission</span>
            <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Open Admission Programs (Non-NC)</h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              No seat limit. As long as you meet the minimum academic prerequisite credits (e.g. German grade 2.5 or better) and language score, you are guaranteed admission.
            </p>
          </motion.div>
        </div>

        {/* How to Compensate for Borderline GPA */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="lp-serif">How to Compensate for a Borderline GPA (2.6 – 3.0)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-4 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-1.5 shadow-xs">
              <span className="text-xs font-semibold text-[var(--lp-red)]">1. Work Experience</span>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">2+ years of relevant industry experience can boost your rank points.</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-4 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-1.5 shadow-xs">
              <span className="text-xs font-semibold text-[var(--lp-red)]">2. Research Papers</span>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Published papers or patents demonstrate advanced research capabilities.</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-4 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-1.5 shadow-xs">
              <span className="text-xs font-semibold text-[var(--lp-red)]">3. GRE Scores</span>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">A high GRE score (315+) can offset a lower undergraduate GPA at TU Munich/RWTH.</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-4 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-1.5 shadow-xs">
              <span className="text-xs font-semibold text-[var(--lp-red)]">4. Tailored SOP</span>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">A compelling motivation letter explaining academic growth and project work.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
