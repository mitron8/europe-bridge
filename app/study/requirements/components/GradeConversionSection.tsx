"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, HelpCircle, CheckCircle2, TrendingUp, Lightbulb } from 'lucide-react';

export const GradeConversionSection = () => {
  const [maxGrade, setMaxGrade] = useState<number>(100);
  const [passGrade, setPassGrade] = useState<number>(40);
  const [userScore, setUserScore] = useState<number>(75);

  const calculateGermanGrade = () => {
    if (!userScore || userScore < passGrade) return "4.0 (Fail)";
    if (userScore >= maxGrade) return "1.0 (Best)";
    
    const result = 1 + 3 * ((maxGrade - userScore) / (maxGrade - passGrade));
    return result.toFixed(2);
  };

  const germanGrade = calculateGermanGrade();

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
              German admissions convert foreign grades to the German 1.0–4.0 scale using the standardized modified Bavarian formula.
            </p>
          </div>
        </div>

        {/* Interactive Bavarian Calculator Card */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="border-b border-[var(--lp-rule)] pb-4">
            <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Interactive Bavarian Formula Calculator</h3>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-0.5">Input your grading system's maximum score, passing score, and your achieved marks.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--lp-text)] mb-1.5">Maximum Possible Score (Nmax)</label>
                  <input
                    type="number"
                    value={maxGrade}
                    onChange={(e) => setMaxGrade(Number(e.target.value))}
                    className="w-full bg-[#ece7dd]/50 border border-[#e2ddd3] rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--lp-text)] focus:bg-white focus:border-[var(--lp-red)] transition-all outline-none shadow-inner"
                    placeholder="e.g. 100 or 10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--lp-text)] mb-1.5">Minimum Passing Score (Npass)</label>
                  <input
                    type="number"
                    value={passGrade}
                    onChange={(e) => setPassGrade(Number(e.target.value))}
                    className="w-full bg-[#ece7dd]/50 border border-[#e2ddd3] rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--lp-text)] focus:bg-white focus:border-[var(--lp-red)] transition-all outline-none shadow-inner"
                    placeholder="e.g. 40 or 4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--lp-text)] mb-1.5">Your Score / CGPA (N-achieved)</label>
                <input
                  type="number"
                  value={userScore}
                  onChange={(e) => setUserScore(Number(e.target.value))}
                  className="w-full bg-[#ece7dd]/50 border border-[#e2ddd3] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--lp-red)] focus:bg-white focus:border-[var(--lp-red)] transition-all outline-none shadow-inner"
                  placeholder="e.g. 78 or 8.2"
                />
              </div>

              {/* Mathematical Formula Preview */}
              <div className="p-4 rounded-2xl bg-[#ece7dd]/60 border border-[#e2ddd3] text-xs text-[var(--lp-muted)] space-y-1 font-mono">
                <div className="font-semibold text-[var(--lp-text)]">Formula: German Grade = 1 + 3 × [(Nmax - Nd) / (Nmax - Npass)]</div>
                <div>Calculation: 1 + 3 × [({maxGrade} - {userScore}) / ({maxGrade} - {passGrade})]</div>
              </div>
            </div>

            {/* Calculated Result Display */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-5 bg-[#ece7dd]/50 border border-[#e2ddd3] rounded-2xl p-6 text-center space-y-3 shadow-xs"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Converted German GPA</span>
              <div className="lp-serif text-5xl font-bold text-[var(--lp-text)] tracking-tight">
                {germanGrade}
              </div>
              <p className="text-xs font-medium text-[var(--lp-muted)]">
                Scale: 1.0 (Very Good / Excellent) &rarr; 4.0 (Sufficient / Pass)
              </p>
            </motion.div>
          </div>
        </div>

        {/* NC vs Non-NC Programs */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 border-l-4 border-l-[var(--lp-red)] shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">Restricted Admission</span>
            <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Restricted Admission Programs (NC)</h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              NC programs have a fixed quota of seats. Applicants are ranked strictly by GPA. Popular subjects (Business, Data Science, Psychology) may require a top grade of 1.2–1.8.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 border-l-4 border-l-[var(--lp-ink)] shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Unrestricted Admission</span>
            <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Open Admission Programs (Non-NC)</h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              No seat limit. As long as you meet the minimum academic prerequisite credits (e.g. German grade 2.5 or better) and language score, you are guaranteed admission.
            </p>
          </motion.div>
        </div>

        {/* How to Compensate for Borderline GPA */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 border-t-4 border-t-[var(--lp-gold)] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
            <Lightbulb className="w-5 h-5 text-[var(--lp-gold)]" />
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
