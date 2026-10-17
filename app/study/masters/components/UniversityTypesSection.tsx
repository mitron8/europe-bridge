"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, XCircle, ArrowRight, HelpCircle, Briefcase, GraduationCap, Microscope } from 'lucide-react';

export const UniversityTypesSection = () => {
  const [selectedType, setSelectedType] = useState<'TU' | 'HAW' | 'Private'>('TU');

  const comparisonRows = [
    { feature: "Primary Pedagogy", tu: "Theoretical depth, mathematical foundations & scientific research", haw: "Applied practical engineering, hands-on lab work & industrial problem solving", private: "Market-tailored curriculum, management & business emphasis" },
    { feature: "Tuition Fees", tu: "0€ Tuition (except Baden-Württemberg €1,500/sem)", haw: "0€ Tuition (except Baden-Württemberg €1,500/sem)", private: "€10,000 – €26,000 / year" },
    { feature: "Mandatory Internship", tu: "Optional or short industrial seminar (thesis in lab/industry)", haw: "Mandatory 1-semester corporate internship (Praxissemester)", private: "Integrated company projects & networking" },
    { feature: "Direct PhD Pathway", tu: "Direct qualification (Dr.-Ing. / Dr. rer. nat.)", haw: "Possible via university cooperation or recent state PhD rights", private: "Rare / conditional on accreditation" },
    { feature: "Typical Class Size", tu: "Large lecture halls (100–300 students in core modules)", haw: "Small seminar cohorts (25–45 students per class)", private: "Small cohorts (15–30 students)" },
    { feature: "Admission Cutoffs", tu: "Strict ECTS credit prerequisites, competitive German GPA", haw: "Practical profile weightage, flexible course matching", private: "High acceptance rate, commercial intake" },
  ];

  return (
    <section id="university-types" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 scroll-mt-28">
      {/* Header */}
      <div data-reveal className="space-y-3 max-w-3xl">
        <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Institutional Landscape
        </div>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
          Technical Universities (TU9) vs. <em className="lp-script text-[var(--lp-red)]">Applied Sciences (HAW)</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Germany differentiates between classic research universities and practice-oriented universities of applied sciences. Both issue globally accredited Master of Science (M.Sc.) or Master of Engineering (M.Eng.) degrees.
        </p>
      </div>

      {/* 3 Main Categories Card Deck */}
      <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Research University / TU9 */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedType('TU')}
          className={`bg-[var(--lp-card)] border rounded-3xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] ${
            selectedType === 'TU' ? 'border-[var(--lp-ink)] shadow-md' : 'border-[#e5e0d3] hover:border-[#16161a]/30'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-red)] flex items-center justify-center border border-[#e2ddd3]">
                <Microscope className="w-6 h-6" />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3]">
                Research Heavy
              </span>
            </div>

            <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">
              Technical Universities (TU / Uni)
            </h3>
            <p className="text-xs text-[var(--lp-muted)] font-medium">E.g., TU Munich, RWTH Aachen, TU Berlin, KIT</p>

            <ul className="mt-4 space-y-2.5 text-xs text-[var(--lp-text)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Rigorous theoretical foundations &amp; scientific research</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Direct pathway to doctoral (Dr.-Ing.) programs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>0€ Tuition at all public campuses (except BW)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--lp-rule)] flex items-center justify-between text-xs font-semibold text-[var(--lp-red)]">
            <span>Ideal for R&amp;D and PhD Aspirants</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Universities of Applied Sciences / HAW */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedType('HAW')}
          className={`bg-[var(--lp-card)] border rounded-3xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] ${
            selectedType === 'HAW' ? 'border-[var(--lp-ink)] shadow-md' : 'border-[#e5e0d3] hover:border-[#16161a]/30'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-gold)] flex items-center justify-center border border-[#e2ddd3]">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--lp-gold-soft)]/50 text-[var(--lp-text)] border border-[var(--lp-gold)]/30">
                Industry Ready
              </span>
            </div>

            <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">
              Applied Sciences (HAW / FH)
            </h3>
            <p className="text-xs text-[var(--lp-muted)] font-medium">E.g., TH Köln, Munich UAS, Frankfurt UAS, Esslingen</p>

            <ul className="mt-4 space-y-2.5 text-xs text-[var(--lp-text)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Mandatory paid industrial internship semester (Praxissemester)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Professors must hold minimum 3–5 years corporate leadership</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Small cohort sizes &amp; hands-on industrial labs</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--lp-rule)] flex items-center justify-between text-xs font-semibold text-[var(--lp-gold)]">
            <span>Ideal for Rapid Corporate Employment</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Private Universities */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedType('Private')}
          className={`bg-[var(--lp-card)] border rounded-3xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] ${
            selectedType === 'Private' ? 'border-[var(--lp-ink)] shadow-md' : 'border-[#e5e0d3] hover:border-[#16161a]/30'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center border border-[#e2ddd3]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3]">
                Commercial
              </span>
            </div>

            <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">
              Private Universities
            </h3>
            <p className="text-xs text-[var(--lp-muted)] font-medium">E.g., Frankfurt School of Finance, WHU, ESMT</p>

            <ul className="mt-4 space-y-2.5 text-xs text-[var(--lp-text)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>High acceptance rates with rolling intakes</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-[var(--lp-faint)] shrink-0 mt-0.5" />
                <span>High tuition fees: €12,000–€28,000 per year</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Career fairs &amp; dedicated executive recruitment desks</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--lp-rule)] flex items-center justify-between text-xs font-semibold text-[var(--lp-muted)]">
            <span>Verify State Accreditation First</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* Comprehensive Comparative Matrix Table */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--lp-rule)] pb-4">
          <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">
            Side-by-Side Comparison Matrix
          </h3>
          <span className="text-xs font-medium text-[var(--lp-muted)] block sm:hidden">
            Scroll horizontally to compare
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3] shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm font-normal">
            <thead className="bg-[var(--lp-ink)] text-white text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-5">Feature / Dimension</th>
                <th className="py-4 px-5 text-[var(--lp-gold-soft)] font-semibold">Technical University (TU / Uni)</th>
                <th className="py-4 px-5 text-white/90 font-semibold">Applied Sciences (HAW / FH)</th>
                <th className="py-4 px-5 text-white/70 font-semibold">Private Universities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7dd] bg-white/70">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="hover:bg-[#ece7dd]/40 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)] whitespace-nowrap text-xs">{row.feature}</td>
                  <td className="py-3.5 px-5 leading-relaxed text-xs text-[var(--lp-text)]">{row.tu}</td>
                  <td className="py-3.5 px-5 leading-relaxed text-xs text-[var(--lp-muted)]">{row.haw}</td>
                  <td className="py-3.5 px-5 leading-relaxed text-xs text-[var(--lp-muted)]">{row.private}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] text-xs text-[var(--lp-text)] flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-[var(--lp-muted)]">
            <strong className="text-[var(--lp-text)] font-semibold">Industry Perception:</strong> German employers (including BMW, Bosch, Siemens, and SAP) value graduates from both TUs and HAWs equally for engineering, data, and software positions. For R&amp;D laboratories and algorithm engineering, TUs carry higher weight; for plant operations, production, and deployment engineering, HAW alumni are frequently preferred for their practical readiness.
          </p>
        </div>
      </div>
    </section>
  );
};
