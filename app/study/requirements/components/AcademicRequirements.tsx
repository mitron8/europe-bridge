"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export const AcademicRequirements = () => {
  const [selectedLevel, setSelectedLevel] = useState<'masters' | 'bachelors' | 'phd'>('masters');

  const gradeTableData = [
    { IndianPct: "85%+", germanGrade: "1.0 – 1.5", competitiveness: "Highly Competitive", badgeColor: "bg-[var(--lp-ink)] text-white border-[var(--lp-ink)]" },
    { IndianPct: "75% – 84%", germanGrade: "1.5 – 2.0", competitiveness: "Competitive", badgeColor: "bg-[#ece7dd] text-[var(--lp-text)] border-[#e2ddd3]" },
    { IndianPct: "65% – 74%", germanGrade: "2.0 – 2.5", competitiveness: "Good Prospects", badgeColor: "bg-[#ece7dd]/60 text-[var(--lp-text)] border-[#e2ddd3]" },
    { IndianPct: "60% – 64%", germanGrade: "2.5 – 3.0", competitiveness: "Limited Options", badgeColor: "bg-[var(--lp-gold-soft)]/50 text-[var(--lp-text)] border-[var(--lp-gold)]/40" },
    { IndianPct: "Below 60%", germanGrade: "3.0+", competitiveness: "Very Few Programs", badgeColor: "bg-[var(--lp-red)]/10 text-[var(--lp-red)] border-[var(--lp-red)]/20" },
  ];

  return (
    <section id="section-academic" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <GraduationCap className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #1
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Academic Requirements &amp; <em className="lp-script text-[var(--lp-red)]">Grades</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              German universities evaluate your academic background based on degree recognition, subject relevance, and converted GPA.
            </p>
          </div>
        </div>

        {/* Grade Conversion Benchmarks */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
            <div>
              <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">German Grade Competitiveness Scale</h3>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-0.5">Conversion from Indian Percentage to German Grade (1.0 = Highest, 4.0 = Minimum Pass)</p>
            </div>
            <a 
              href="#section-bavarian"
              className="lp-link text-xs sm:text-sm font-semibold text-[var(--lp-red)] hover:text-[var(--lp-red-deep)] flex items-center gap-1 group"
            >
              See Bavarian Formula <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3]/80">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#ece7dd]/80 border-b border-[#e2ddd3] text-[var(--lp-muted)] text-[11px] font-semibold uppercase tracking-wider">
                  <th className="p-4 rounded-tl-xl">Your Percentage (India)</th>
                  <th className="p-4">German Grade (Approx.)</th>
                  <th className="p-4 rounded-tr-xl">Competitiveness Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece7dd] bg-white/50">
                {gradeTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#ece7dd]/40 transition-colors duration-150">
                    <td className="p-4 font-semibold text-[var(--lp-text)]">{row.IndianPct}</td>
                    <td className="p-4 font-bold text-[var(--lp-red)] lp-serif text-base sm:text-lg">{row.germanGrade}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold border shadow-2xs ${row.badgeColor}`}>
                        {row.competitiveness}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Degree Requirements by Level Tabs */}
        <div data-reveal className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Degree Requirements by Level</h3>
            <div className="flex bg-[#ece7dd] p-1 rounded-full gap-1 border border-[#e2ddd3] shadow-inner">
              {(['masters', 'bachelors', 'phd'] as const).map((level) => (
                <button 
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    selectedLevel === level ? 'bg-[var(--lp-ink)] text-white shadow-sm' : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
                  }`}
                >
                  {level === 'masters' ? "Master's Degree" : level === 'bachelors' ? "Bachelor's Degree" : "PhD / Doctorate"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedLevel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] space-y-4"
            >
              {selectedLevel === 'masters' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
                    <Award className="w-5 h-5 text-[var(--lp-red)]" />
                    <span className="lp-serif">Master's Program Requirements</span>
                  </div>
                  <ul className="space-y-3.5 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Completed Bachelor's Degree:</strong> Minimum 3 years / 180 ECTS credits from a recognized university (H+ status on Anabin).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">GPA Cutoff:</strong> Most public Master's programs require a German GPA of 2.5 or better (approx. 65%+ in Indian scale).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Subject Specificity (Consecutive Degrees):</strong> German Master's degrees are strict. Your Bachelor's major must directly align with the Master's discipline (e.g. Mechanical Eng to Mechanical Eng).</span>
                    </li>
                  </ul>
                </div>
              )}

              {selectedLevel === 'bachelors' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
                    <BookOpen className="w-5 h-5 text-[var(--lp-red)]" />
                    <span className="lp-serif">Bachelor's Program Requirements</span>
                  </div>
                  <ul className="space-y-3.5 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Secondary School Certificate:</strong> 12th Standard Higher Secondary Certificate (CBSE/ICSE/State Board) with strong science/math grades.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-[var(--lp-gold)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Foundation Year (Studienkolleg):</strong> If your 12th certificate is not considered 100% equivalent to the German Abitur, you must complete a 1-year preparatory course and pass the Feststellungsprüfung (FSP).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Direct Entry Exemption:</strong> Students with 1 year of completed Bachelor's in their home country or qualifying JEE Advanced rank can bypass the foundation year.</span>
                    </li>
                  </ul>
                </div>
              )}

              {selectedLevel === 'phd' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
                    <GraduationCap className="w-5 h-5 text-[var(--lp-red)]" />
                    <span className="lp-serif">PhD &amp; Doctoral Research Requirements</span>
                  </div>
                  <ul className="space-y-3.5 text-[14.5px] text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Completed Master's Degree:</strong> Strong academic record (German grade 2.0 or better) with rigorous thesis research.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] mt-1 shrink-0" />
                      <span><strong className="font-semibold text-[var(--lp-text)]">Doctoral Supervisor (Doktorvater):</strong> Formal acceptance from a German professor or admission into an organized Graduate School / DFG program.</span>
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ECTS & Subject Prerequisites Note */}
        <div data-reveal className="bg-[#ece7dd]/50 border border-[#e2ddd3] rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--lp-gold-soft)]/60 text-[var(--lp-text)] flex items-center justify-center font-bold shrink-0 shadow-2xs">
            !
          </div>
          <div>
            <h4 className="lp-serif font-semibold text-[var(--lp-text)] text-base">Prerequisite Credit Watch (Zugangsvoraussetzungen)</h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed mt-1">
              Having a high GPA is not enough. German universities review your transcript course by course. For example, a CS Master's at TU Munich may require a minimum of 18 ECTS in Theoretical Computer Science, 12 ECTS in Higher Mathematics, and 8 ECTS in Databases. Always check specific module requirements beforehand!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
