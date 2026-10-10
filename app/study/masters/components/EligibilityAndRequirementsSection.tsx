"use client";

import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, FileText, Globe, Award, BookCheck, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const EligibilityAndRequirementsSection = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'language' | 'aps' | 'tests'>('academic');

  return (
    <section id="requirements" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2.5 sm:space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-[11px] sm:text-xs font-black uppercase tracking-wider">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Eligibility Blueprint</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          Master&apos;s Admission Requirements <span className="text-germany-red">in Germany</span>
        </h2>
        <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
          German admissions committees do not evaluate candidates on hollow personal essays. Admissions are strictly criteria-driven based on academic credit alignment, German GPA, and certified credentials.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1 -mx-2 sm:mx-0">
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'academic'
              ? 'bg-germany-black text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          1. Academic &amp; ECTS Matching
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'language'
              ? 'bg-germany-black text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          2. Language Proficiency
        </button>
        <button
          onClick={() => setActiveTab('aps')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'aps'
              ? 'bg-germany-black text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          3. APS Verification
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'tests'
              ? 'bg-germany-black text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          4. GRE &amp; GATE Rules
        </button>
      </div>

      {/* Tab Content Cards */}
      <div className="neu-card p-4 sm:p-8 bg-white space-y-4 sm:space-y-6">
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-germany-black">
                  Bachelor&apos;s Degree Alignment &amp; The &quot;Consecutive&quot; Doctrine
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  German universities mandate that your master&apos;s discipline must be directly related to your undergraduate major.
                </p>
              </div>
              <Link
                href="/study/requirements"
                className="text-xs font-extrabold text-germany-red hover:underline shrink-0"
              >
                Deep-dive requirements guide &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <BookCheck className="w-5 h-5 text-germany-red" />
                  <span>3-Year vs. 4-Year Bachelor&apos;s Degrees</span>
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Germany requires a total of <strong>300 ECTS</strong> for a Master&apos;s qualification (180–240 undergraduate ECTS + 60–120 postgraduate ECTS):
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>4-Year Degrees (B.Tech / B.E. / BS):</strong> 240 ECTS equivalent. Universally eligible for all 2-year (120 ECTS) and 1.5-year (90 ECTS) programs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>3-Year Degrees (BSc / BCA / BCom):</strong> 180 ECTS equivalent. Eligible for many 120 ECTS master&apos;s degrees, or may require a preparatory pre-master&apos;s bridging semester if credits fall short.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <Award className="w-5 h-5 text-germany-red" />
                  <span>The Bavarian Formula (German GPA Conversion)</span>
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  German universities rank grades from <strong>1.0 (Best)</strong> to <strong>4.0 (Minimum Pass)</strong>, with 5.0 indicating fail.
                </p>
                <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 font-mono overflow-x-auto whitespace-nowrap">
                  German Grade = 1 + 3 &times; [(Nmax - N) / (Nmax - Nmin)]
                </div>
                <ul className="space-y-1.5 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span><strong>1.0 to 1.9:</strong> Sehr Gut (Competitive for TUM, RWTH, TU Berlin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span><strong>2.0 to 2.5:</strong> Gut (Eligible for ~80% of German public master&apos;s)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span><strong>2.6 to 3.0:</strong> Befriedigend (Requires targeted HAW selection)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="space-y-6">
            <div className="border-b border-[#EBE7E0] pb-4">
              <h3 className="font-display text-xl font-bold text-germany-black">
                Language Certification (English &amp; German Requirements)
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                For English-taught programs, IELTS or TOEFL is mandatory. German is optional for admissions but essential for post-graduation employability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <Globe className="w-5 h-5 text-germany-red" />
                  <span>English Tests Accepted</span>
                </h4>
                <div className="space-y-3 text-gray-700">
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">IELTS Academic</div>
                    <div className="text-gray-500 text-xs mt-0.5">Minimum 6.5 overall (no individual band below 6.0). Elite programs at TUM/RWTH may ask for 7.0.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">TOEFL iBT</div>
                    <div className="text-gray-500 text-xs mt-0.5">Minimum 80 to 92 points. Highly selective research courses require 95–100+.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">Medium of Instruction (MOI) Certificate</div>
                    <div className="text-gray-500 text-xs mt-0.5">Accepted only by a small fraction (~15%) of universities. Standard IELTS is strongly recommended.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <Globe className="w-5 h-5 text-germany-gold" />
                  <span>German Language: When Do You Need It?</span>
                </h4>
                <div className="space-y-3 text-gray-700">
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">For English Programs (Zero Level)</div>
                    <div className="text-gray-500 text-xs mt-0.5">Not required for admissions or the student visa. You can enter Germany with 0 German proficiency.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">Basic A1 / A2 Requirement</div>
                    <div className="text-gray-500 text-xs mt-0.5">Certain universities (e.g., TU Munich, RWTH) ask for proof of A1 German by the end of the 2nd semester.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-gray-200">
                    <div className="font-bold text-germany-black">For German-Taught Master&apos;s (C1 Level)</div>
                    <div className="text-gray-500 text-xs mt-0.5">Requires TestDaF (4x4), Goethe-Zertifikat C1, telc C1 Hochschule, or DSH-2.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aps' && (
          <div className="space-y-6">
            <div className="border-b border-[#EBE7E0] pb-4">
              <h3 className="font-display text-xl font-bold text-germany-black">
                Akademische Prüfstelle (APS) Certificate
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Mandatory document verification procedure for applicants holding school/college credentials from India, China, and Vietnam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-germany-red" />
                  <span>Why is APS Mandatory?</span>
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  The German Embassy established the APS desk to verify the authenticity of Indian and international university degrees, transcripts, and mark sheets directly with the awarding registrar.
                </p>
                <div className="p-3 rounded-xl bg-red-50 text-red-900 border border-red-200 text-xs font-semibold">
                  Without an official digital APS verification certificate, VFS Germany will immediately reject your student visa appointment.
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>Timeline &amp; Cost Protocol</span>
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Processing Fee:</strong> ₹18,000 INR (non-refundable bank transfer to German Embassy).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Processing Duration:</strong> Typically 3 to 6 weeks. Begin this process 3 months before your application deadline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Delivery:</strong> Secure digitally signed PDF certificate sent directly to your registered email.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/study/aps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-germany-black hover:bg-neutral-800 text-white font-extrabold text-xs shadow-xs"
              >
                <span>Read Full APS Document Checklist &amp; Step-by-Step Guide</span>
                <ClipboardCheck className="w-4 h-4 text-germany-gold" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="border-b border-[#EBE7E0] pb-4">
              <h3 className="font-display text-xl font-bold text-germany-black">
                Standardized Exams: GRE and GATE Requirements
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Unlike US universities, the majority of German public universities DO NOT require GRE. However, specific premier departments make it mandatory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <Award className="w-5 h-5 text-germany-red" />
                  <span>Universities Requiring GRE General</span>
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <strong>RWTH Aachen:</strong> Mandatory for M.Sc. Computer Science and specific mechanical engineering specializations (Minimum 160 Quantitative).
                  </li>
                  <li className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <strong>TU Munich (TUM):</strong> Mandatory or high aptitude scoring weightage for M.Sc. Informatics and Data Engineering for non-EU degrees (Quantitative score 164+).
                  </li>
                  <li className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <strong>Saarland University:</strong> Strongly recommended for top-tier CS and Visual Computing applications.
                  </li>
                </ul>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
                <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
                  <BookCheck className="w-5 h-5 text-amber-600" />
                  <span>GATE (India) Acceptance</span>
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Both <strong>TU Munich</strong> and <strong>RWTH Aachen</strong> officially accept qualifying GATE scores in Computer Science, Mechanical, and Electrical Engineering from Indian applicants in lieu of or alongside GRE credentials.
                </p>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                  A 90th+ percentile GATE score significantly elevates your admission standing at elite technical faculties.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
