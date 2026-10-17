"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, CheckCircle, Info, FileCheck } from 'lucide-react';

export const LanguageRequirements = () => {
  const [activeTab, setActiveTab] = useState<'english' | 'german'>('english');

  const englishExams = [
    { test: "IELTS Academic", minScore: "6.0 – 6.5", competitiveScore: "7.0+", notes: "Overall band score required. No band below 6.0 in most cases." },
    { test: "TOEFL iBT", minScore: "80 – 90", competitiveScore: "100+", notes: "Subscores usually 20+ in each section (Reading, Writing, Listening, Speaking)." },
    { test: "Cambridge C1 Advanced", minScore: "Grade C (180+)", competitiveScore: "Grade B (193+)", notes: "Lifetime validity, accepted across Germany." },
  ];

  const germanExams = [
    { test: "TestDaF", reqLevel: "TDN 4 (4x4)", notes: "Most widely accepted. Score of at least 4 in all 4 parts (Reading, Listening, Writing, Speaking)." },
    { test: "DSH", reqLevel: "DSH-2 (or DSH-3)", notes: "University-administered exam taken directly on-campus in Germany before semester start." },
    { test: "Goethe-Zertifikat", reqLevel: "C1 or C2", notes: "Official Goethe Institute certificate. C1 is recognized by nearly all universities." },
    { test: "telc Deutsch C1 Hochschule", reqLevel: "C1 Hochschule", notes: "Popular alternative to TestDaF, especially at Fachhochschulen (Applied Sciences)." },
  ];

  return (
    <section id="section-language" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <Languages className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #2
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Language Proficiency <em className="lp-script text-[var(--lp-red)]">Scores</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Whether your course is taught in English or German, you must submit valid standardized proof of language ability.
            </p>
          </div>
        </div>

        {/* Tab Toggle Controls */}
        <div data-reveal className="flex justify-center">
          <div className="bg-[#ece7dd] p-1 rounded-full inline-flex gap-1.5 border border-[#e2ddd3] shadow-inner">
            <button
              onClick={() => setActiveTab('english')}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'english'
                  ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English Taught Programs</span>
            </button>
            <button
              onClick={() => setActiveTab('german')}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'german'
                  ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>German Taught Programs</span>
            </button>
          </div>
        </div>

        {/* Animated Tab Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'english' ? (
            <motion.div 
              key="english"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Accepted English Proficiency Tests</h3>
                  <span className="text-xs font-medium text-[var(--lp-muted)] bg-[#ece7dd] px-3 py-1 rounded-full border border-[#e2ddd3]">
                    Valid for 2 years
                  </span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3]/80">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#ece7dd]/80 border-b border-[#e2ddd3] text-[var(--lp-muted)] text-[11px] font-semibold uppercase tracking-wider">
                        <th className="p-4 rounded-tl-xl">Test Name</th>
                        <th className="p-4">Typical Minimum</th>
                        <th className="p-4">Competitive Score</th>
                        <th className="p-4 rounded-tr-xl">Important Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ece7dd] bg-white/50">
                      {englishExams.map((exam, idx) => (
                        <tr key={idx} className="hover:bg-[#ece7dd]/40 transition-colors duration-150">
                          <td className="p-4 font-semibold text-[var(--lp-text)]">{exam.test}</td>
                          <td className="p-4 font-semibold text-[var(--lp-text)]">{exam.minScore}</td>
                          <td className="p-4 font-bold text-[var(--lp-red)] lp-serif text-base">{exam.competitiveScore}</td>
                          <td className="p-4 text-xs text-[var(--lp-muted)] leading-relaxed">{exam.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Medium of Instruction (MOI) Exemption Box */}
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-6 border-l-4 border-l-[var(--lp-red)] flex items-start gap-4 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="lp-serif font-semibold text-[var(--lp-text)] text-base">English Test Waiver (MOI Certificate)</h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    Can you skip IELTS/TOEFL? Yes, if your Bachelor's degree was 100% instructed in English and your university issues an official <strong className="text-[var(--lp-text)] font-semibold">Medium of Instruction (MOI) Certificate</strong>. However, top universities like TU Munich and RWTH Aachen still require official IELTS/TOEFL test scores regardless of MOI.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="german"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
                <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Accepted German Proficiency Certificates</h3>
                  <span className="text-xs font-medium text-[var(--lp-muted)] bg-[#ece7dd] px-3 py-1 rounded-full border border-[#e2ddd3]">
                    CEFR Standard C1
                  </span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3]/80">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#ece7dd]/80 border-b border-[#e2ddd3] text-[var(--lp-muted)] text-[11px] font-semibold uppercase tracking-wider">
                        <th className="p-4 rounded-tl-xl">Certificate</th>
                        <th className="p-4">Required German Level</th>
                        <th className="p-4 rounded-tr-xl">Key Details &amp; Validity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ece7dd] bg-white/50">
                      {germanExams.map((exam, idx) => (
                        <tr key={idx} className="hover:bg-[#ece7dd]/40 transition-colors duration-150">
                          <td className="p-4 font-semibold text-[var(--lp-text)]">{exam.test}</td>
                          <td className="p-4 font-bold text-[var(--lp-red)] lp-serif text-base">{exam.reqLevel}</td>
                          <td className="p-4 text-xs text-[var(--lp-muted)] leading-relaxed">{exam.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-6 border-l-4 border-l-[var(--lp-gold)] flex items-start gap-4 shadow-sm"
              >
                <Info className="w-5 h-5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="lp-serif font-semibold text-[var(--lp-text)] text-base">German Basics for English Programs</h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    Even if your Master's course is taught 100% in English, learning basic German (A1/A2 level) is strongly recommended. It boosts your student visa approval rate and is essential for finding part-time jobs and post-grad employment in Germany.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
