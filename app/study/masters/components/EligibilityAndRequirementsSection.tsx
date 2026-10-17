"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, CheckCircle2, FileText, Globe, Award, BookCheck, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const EligibilityAndRequirementsSection = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'language' | 'aps' | 'tests'>('academic');

  return (
    <section id="requirements" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 scroll-mt-28">
      {/* Header */}
      <div data-reveal className="space-y-3 max-w-3xl">
        <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Eligibility Blueprint
        </div>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
          Master&apos;s Admission Requirements <em className="lp-script text-[var(--lp-red)]">in Germany</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          German university admissions are merit-driven and objective, focusing strictly on foundational credit matching, grade conversion, and certified documentation.
        </p>
      </div>

      {/* Tab Switcher */}
      <div data-reveal className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar p-1.5 bg-[#ece7dd]/60 rounded-2xl w-fit border border-[#e2ddd3]">
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'academic'
              ? 'bg-[var(--lp-ink)] text-white shadow-xs'
              : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
          }`}
        >
          1. Academic &amp; ECTS Matching
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'language'
              ? 'bg-[var(--lp-ink)] text-white shadow-xs'
              : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
          }`}
        >
          2. Language Proficiency
        </button>
        <button
          onClick={() => setActiveTab('aps')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'aps'
              ? 'bg-[var(--lp-ink)] text-white shadow-xs'
              : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
          }`}
        >
          3. APS Verification
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'tests'
              ? 'bg-[var(--lp-ink)] text-white shadow-xs'
              : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
          }`}
        >
          4. GRE &amp; GATE Rules
        </button>
      </div>

      {/* Tab Content Cards */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <AnimatePresence mode="wait">
          {activeTab === 'academic' && (
            <motion.div
              key="academic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--lp-rule)] pb-4">
                <div>
                  <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
                    Bachelor&apos;s Degree Alignment &amp; The &quot;Consecutive&quot; Doctrine
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
                    German public universities mandate that your master&apos;s curriculum must be directly related to your undergraduate major.
                  </p>
                </div>
                <Link
                  href="/study/requirements"
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline shrink-0"
                >
                  Full requirements guide &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <BookCheck className="w-5 h-5 text-[var(--lp-red)]" />
                    <span>3-Year vs. 4-Year Bachelor&apos;s Degrees</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    Germany requires a total of <strong>300 ECTS</strong> for a Master&apos;s qualification (180–240 undergraduate ECTS + 60–120 postgraduate ECTS):
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                      <span><strong>4-Year Degrees (B.Tech / B.E. / BS):</strong> 240 ECTS equivalent. Universally eligible for all 2-year (120 ECTS) programs.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                      <span><strong>3-Year Degrees (BSc / BCA / BCom):</strong> 180 ECTS equivalent. Eligible for many 120 ECTS master&apos;s degrees, or may require a preparatory bridging semester.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--lp-red)]" />
                    <span>The Modified Bavarian Formula</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    German universities calculate grades from <strong>1.0 (Best)</strong> to <strong>4.0 (Minimum Pass)</strong>, with 5.0 denoting fail.
                  </p>
                  <div className="p-3 bg-white/70 rounded-xl border border-[#e2ddd3] text-xs text-[var(--lp-text)] font-mono overflow-x-auto whitespace-nowrap shadow-xs">
                    German Grade = 1 + 3 &times; [(Nmax - N) / (Nmax - Nmin)]
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--lp-ink)]"></span>
                      <span><strong>1.0 to 1.9:</strong> Sehr Gut (Competitive for TUM, RWTH, TU Berlin)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8a857c]"></span>
                      <span><strong>2.0 to 2.5:</strong> Gut (Eligible for ~80% of German public master&apos;s)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--lp-gold)]"></span>
                      <span><strong>2.6 to 3.0:</strong> Befriedigend (Requires targeted university selection)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
                  Language Certification Requirements
                </h3>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
                  For English-taught programs, IELTS or TOEFL is required. German is optional for admissions but valuable for daily life and career growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[var(--lp-red)]" />
                    <span>English Language Credentials</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">IELTS Academic</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Minimum 6.5 overall (no individual band below 6.0). Elite departments may ask for 7.0.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">TOEFL iBT</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Minimum 80 to 92 points. Selective research courses require 95–100+.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">Medium of Instruction (MOI) Certificate</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Accepted by a small fraction (~15%) of institutions. Standard IELTS is universally safer.</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[var(--lp-gold)]" />
                    <span>German Language Expectations</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">For English Programs (Zero Level)</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Not required for admissions or the student visa. You can enter Germany with 0 German proficiency.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">Basic A1 / A2 Requirement</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Certain universities (e.g., TU Munich) ask for proof of A1 German before graduation.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd3] shadow-xs">
                      <div className="font-semibold text-xs text-[var(--lp-text)]">For German-Taught Master&apos;s (C1 Level)</div>
                      <div className="text-[var(--lp-muted)] text-xs mt-0.5">Requires TestDaF (4x4), Goethe-Zertifikat C1, telc C1 Hochschule, or DSH-2.</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'aps' && (
            <motion.div
              key="aps"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
                  Akademische Prüfstelle (APS) Certificate
                </h3>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
                  Mandatory document verification procedure for applicants holding credentials from India, China, and Vietnam.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--lp-red)]" />
                    <span>Why is APS Mandatory?</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    The German Embassy established the APS desk to verify the authenticity of Indian and international university degrees, transcripts, and mark sheets directly with the awarding registrar.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#ece7dd]/60 border border-[var(--lp-rule-strong)] text-xs font-semibold text-[var(--lp-text)]">
                    Without an official digital APS verification certificate, VFS Germany will immediately reject your student visa appointment.
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[var(--lp-gold)]" />
                    <span>Timeline &amp; Cost Protocol</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-text)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                      <span><strong>Processing Fee:</strong> ₹18,000 INR (bank transfer to German Embassy).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                      <span><strong>Duration:</strong> Typically 3 to 6 weeks. Begin 3 months before your deadline.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                      <span><strong>Format:</strong> Secure digitally signed PDF certificate issued via email.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/study/aps"
                  className="lp-btn lp-btn--dark inline-flex text-xs"
                >
                  <span>Read Full APS Document Checklist &amp; Step-by-Step Guide</span>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === 'tests' && (
            <motion.div
              key="tests"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
                  Standardized Exams: GRE and GATE Requirements
                </h3>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
                  Unlike US universities, the majority of German public universities DO NOT require GRE. However, specific premier departments make it mandatory.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--lp-red)]" />
                    <span>Universities Requiring GRE General</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-text)] leading-relaxed">
                    <li className="p-3 bg-white/70 rounded-xl border border-[#e2ddd3] shadow-xs">
                      <strong>RWTH Aachen:</strong> Mandatory for M.Sc. Computer Science and select engineering programs (160+ Quantitative).
                    </li>
                    <li className="p-3 bg-white/70 rounded-xl border border-[#e2ddd3] shadow-xs">
                      <strong>TU Munich (TUM):</strong> Mandatory for M.Sc. Informatics and Data Engineering for non-EU degrees (Quantitative score 164+).
                    </li>
                    <li className="p-3 bg-white/70 rounded-xl border border-[#e2ddd3] shadow-xs">
                      <strong>Saarland University:</strong> Recommended for CS and Visual Computing applications.
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
                  <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
                    <BookCheck className="w-5 h-5 text-[var(--lp-gold)]" />
                    <span>GATE (India) Acceptance</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                    Both <strong>TU Munich</strong> and <strong>RWTH Aachen</strong> officially accept qualifying GATE scores in Computer Science, Mechanical, and Electrical Engineering from Indian applicants in lieu of or alongside GRE credentials.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#ece7dd]/60 border border-[#e2ddd3] text-xs font-semibold text-[var(--lp-text)]">
                    A 90th+ percentile GATE score significantly elevates your admission standing at elite technical faculties.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
