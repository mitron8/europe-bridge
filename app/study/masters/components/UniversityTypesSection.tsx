"use client";

import React, { useState } from 'react';
import { Building2, Compass, CheckCircle2, XCircle, ArrowRight, HelpCircle, Briefcase, GraduationCap, Microscope } from 'lucide-react';
import Link from 'next/link';

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
    <section id="university-types" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2.5 sm:space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-[11px] sm:text-xs font-black uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Institutional Landscape</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          TU9 Universities vs. <span className="text-germany-red">Universities of Applied Sciences (UAS / HAW)</span>
        </h2>
        <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany differentiates between classic research universities and practice-oriented universities of applied sciences. Both issue globally recognized Master of Science (M.Sc.) or Master of Engineering (M.Eng.) degrees.
        </p>
      </div>

      {/* 3 Main Categories Card Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Research University / TU9 */}
        <div 
          onClick={() => setSelectedType('TU')}
          className={`neu-card p-6 sm:p-7 bg-white cursor-pointer transition-all relative overflow-hidden ${
            selectedType === 'TU' ? 'ring-2 ring-germany-red shadow-[8px_8px_24px_rgba(230,57,70,0.15)]' : 'hover:scale-[1.01]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-germany-red">
              Research Heavy
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-germany-black">
            Technical Universities (TU / Uni)
          </h3>
          <p className="text-xs text-gray-500 font-semibold mt-1">E.g., TU Munich, RWTH Aachen, TU Berlin, KIT</p>

          <ul className="mt-4 space-y-2 text-xs font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Rigorous theoretical foundations &amp; algorithm development</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Direct highway to PhD (Dr.-Ing.) programs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>0€ Tuition at all public campuses (except BW)</span>
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold text-germany-red">
            <span>Ideal for R&amp;D and PhD Aspirants</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Universities of Applied Sciences / HAW */}
        <div 
          onClick={() => setSelectedType('HAW')}
          className={`neu-card p-6 sm:p-7 bg-white cursor-pointer transition-all relative overflow-hidden ${
            selectedType === 'HAW' ? 'ring-2 ring-germany-red shadow-[8px_8px_24px_rgba(230,57,70,0.15)]' : 'hover:scale-[1.01]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
              Industry Ready
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-germany-black">
            Applied Sciences (HAW / FH)
          </h3>
          <p className="text-xs text-gray-500 font-semibold mt-1">E.g., TH Köln, Munich UAS, Frankfurt UAS, Esslingen</p>

          <ul className="mt-4 space-y-2 text-xs font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mandatory paid industrial internship semester (Praxissemester)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Professors must hold minimum 3–5 years corporate leadership</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Small cohort sizes &amp; hands-on industrial labs</span>
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold text-germany-gold">
            <span>Ideal for Rapid Corporate Employment</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Private Universities */}
        <div 
          onClick={() => setSelectedType('Private')}
          className={`neu-card p-6 sm:p-7 bg-white cursor-pointer transition-all relative overflow-hidden ${
            selectedType === 'Private' ? 'ring-2 ring-germany-red shadow-[8px_8px_24px_rgba(230,57,70,0.15)]' : 'hover:scale-[1.01]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-200 text-gray-800">
              Commercial
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-germany-black">
            Private Universities
          </h3>
          <p className="text-xs text-gray-500 font-semibold mt-1">E.g., Frankfurt School of Finance, WHU, ESMT</p>

          <ul className="mt-4 space-y-2 text-xs font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>High acceptance rates with rolling intakes</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>High tuition fees: €12,000–€28,000 per year</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Career fairs &amp; dedicated executive recruitment desks</span>
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold text-gray-700">
            <span>Verify State Accreditation First</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Comprehensive Comparative Matrix Table */}
      <div className="neu-card p-4 sm:p-8 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE7E0] pb-3">
          <h3 className="font-display text-lg sm:text-xl font-bold text-germany-black">
            Side-by-Side Comparison Matrix
          </h3>
          <span className="text-[11px] font-bold text-gray-500 block sm:hidden">
            👈 Swipe horizontally to compare 👉
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar sm:overflow-visible -mx-2 sm:mx-0 px-2 sm:px-0">
          <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-500 uppercase tracking-wider text-[10px] sm:text-[11px] font-black">
                <th className="py-2.5 sm:py-3 pr-3 sm:pr-4">Feature / Dimension</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-germany-red font-black">Technical University (TU / Uni)</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-amber-700 font-black">Applied Sciences (HAW / FH)</th>
                <th className="py-2.5 sm:py-3 pl-3 sm:pl-4 text-gray-700 font-black">Private Universities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {comparisonRows.map((row, idx) => (
                <tr key={row.feature} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3 pr-3 sm:pr-4 font-bold text-germany-black whitespace-nowrap text-xs">{row.feature}</td>
                  <td className="py-3 px-3 sm:px-4 leading-relaxed text-xs">{row.tu}</td>
                  <td className="py-3 px-3 sm:px-4 leading-relaxed text-xs">{row.haw}</td>
                  <td className="py-3 pl-3 sm:pl-4 leading-relaxed text-xs">{row.private}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 font-medium flex items-start gap-2.5 sm:gap-3 mt-4">
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs leading-relaxed">
            <strong>Industry Perception Myth:</strong> German employers (including BMW, Bosch, and SAP) value graduates from both TUs and HAWs equally for engineering, data, and software positions. For R&amp;D laboratories and algorithm engineering, TUs carry higher weight; for plant operations, production, and deployment engineering, HAW alumni are frequently preferred for their practical readiness.
          </p>
        </div>
      </div>
    </section>
  );
};
