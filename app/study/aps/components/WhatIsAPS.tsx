"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const WhatIsAPS = () => {
  return (
    <section id="section-what-is-aps" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Section #1
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              What is APS &amp; <em className="lp-script text-[var(--lp-red)]">Why is it Required?</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              The <em className="italic font-bold text-[var(--lp-text)]">Akademische Prüfstelle (APS)</em> is an official verification wing of the German Embassy.
            </p>
          </div>
        </div>

        {/* Core Purpose Overview */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <p className="text-sm sm:text-[15px] text-[var(--lp-text)] leading-[1.7] font-normal">
            APS was established by the German Foreign Office and the DAAD to authenticate higher education certificates, mark sheets, and academic credentials before students submit university or visa applications. It ensures that degrees earned abroad are genuine and verified at the source university level.
          </p>

          {/* Mandatory Countries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-gold)]">Mandatory Region</span>
              <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">APS India (New Delhi)</h3>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Required for all Indian students applying for Bachelor's, Master's, or PhD programs in Germany.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">Mandatory Region</span>
              <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">APS China (Beijing)</h3>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Required for Chinese applicants; includes document verification and potential written evaluation tests.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-blue-700">Mandatory Region</span>
              <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">APS Vietnam (Hanoi)</h3>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Required for Vietnamese applicants pursuing undergraduate or postgraduate studies in Germany.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 15 March 2026 Rule Alert */}
        <div data-reveal className="bg-[#ece7dd]/65 border border-[#ded8cb] rounded-2xl p-6 shadow-xs space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] font-semibold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>March 15, 2026 Update: 70% Class XII Rule for Bachelor&apos;s</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
            APS India enforces a strict threshold for Bachelor&apos;s applicants: your Class XII aggregate must be at least <strong className="text-[var(--lp-text)] font-semibold">70%</strong> to be evaluated for direct undergraduate entry. If your Class XII score is below 70%, your standard pathway is a 1-year preparatory foundation year before enrolling in a degree program. Master&apos;s and PhD applicants are unaffected by this 70% rule.
          </p>
        </div>

        {/* Exclusions & Exemptions */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Distance Ed Exclusion */}
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="lp-serif">Distance-Education Exclusion</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              APS India does not verify distance-education or correspondence degrees for 14 regulated disciplines (including medicine, pharmacy, law, nursing, teaching, MPhil, and PhD). Correspondence degrees in these fields are not accepted for German admission.
            </p>
          </motion.div>

          {/* Who is Exempt? */}
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="lp-serif">Who is Exempt from APS?</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Direct Professor PhD Invitation:</strong> PhD candidates with an official invitation letter from a German doctoral advisor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">DAAD &amp; Govt Scholars:</strong> Students holding DAAD or official bilateral government scholarships.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Other Countries:</strong> Students from Pakistan, Bangladesh, Nepal, Sri Lanka do not need APS.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
