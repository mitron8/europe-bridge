"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  SplitSquareVertical, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Coins, 
  Briefcase 
} from 'lucide-react';

export const LOMStructureSection = () => {
  const [activeTab, setActiveTab] = useState<'sop_vs_lom' | 'breakdown' | 'examples'>('sop_vs_lom');

  const consularSections = [
    {
      num: "01",
      icon: Building2,
      title: "Consular Mission Header & Statutory Reference",
      desc: "Addressed to your exact territorial German Mission (Embassy in New Delhi or Consulates in Mumbai, Bengaluru, Chennai, or Kolkata). Explicitly cites application under Section 16b AufenthG (Residence Act for Study Purposes)."
    },
    {
      num: "02",
      icon: GraduationCap,
      title: "Academic Background & Educational Progression",
      desc: "A concise summary of your undergraduate degree, final GPA/German equivalent grade, relevant coursework, thesis topic, and any industry experience—demonstrating logical academic continuity."
    },
    {
      num: "03",
      icon: BookOpen,
      title: "Why Germany & Specific Curriculum Modules",
      desc: "Zero generic praise. Our writers pinpoint 3–4 specific modules, laboratories, faculty chairs, and specialized electives from your target university handbook that cannot be pursued in your home country."
    },
    {
      num: "04",
      icon: Coins,
      title: "Financial Feasibility & Living Preparedness",
      desc: "Transparent declaration of your €11,904 Blocked Account (Sperrkonto), recognized statutory health insurance (TK / Barmer / Expat), and realistic understanding of student living costs in your specific German city."
    },
    {
      num: "05",
      icon: Briefcase,
      title: "Long-Term Career Blueprint & Genuine Return Ties",
      desc: "Clear projection of target professional roles, salary benchmarks, and economic ties in your home country upon completing the Master’s degree—satisfying consular scrutiny regarding bona fide student status."
    }
  ];

  return (
    <section id="section-structure" className="py-16 px-6 lg:px-12 bg-white/60 border-y border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Consular Anatomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            The Anatomy of a <span className="text-germany-red">Winning Visa LOM</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Over 30% of German visa delays and rejections stem from submitting an academic university SOP instead of a consular-tailored Letter of Motivation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('sop_vs_lom')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sop_vs_lom'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <SplitSquareVertical className="w-4 h-4 text-germany-red" />
              <span>SOP vs Visa LOM</span>
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'breakdown'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>5 Core Consular Sections</span>
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'examples'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sample Excerpt Comparison</span>
            </button>
          </div>
        </div>

        {/* Tab 1: SOP vs Visa LOM Table */}
        {activeTab === 'sop_vs_lom' && (
          <div id="section-sop-vs-lom" className="neu-card p-6 sm:p-8 bg-white border border-gray-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <h3 className="text-xl font-extrabold text-germany-black">
                  Why You Cannot Reuse Your University SOP for the Visa
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                  Admissions committees judge academic potential; consular officers enforce immigration law (§ 16b AufenthG).
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-germany-red rounded-lg border border-red-200 text-xs font-bold shrink-0">
                <AlertTriangle className="w-4 h-4" />
                <span>#1 Consular Delay Factor</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                    <th className="py-3 px-4 font-black text-gray-500 uppercase tracking-wider w-1/4">Criteria</th>
                    <th className="py-3 px-4 font-black text-gray-700 uppercase tracking-wider w-3/8">
                      University SOP (Admissions)
                    </th>
                    <th className="py-3 px-4 font-black text-germany-red uppercase tracking-wider w-3/8 bg-red-50/60">
                      Consular Visa LOM (German Embassy)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-medium text-gray-700">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-germany-black">Target Reader</td>
                    <td className="py-3.5 px-4 text-gray-600">University Professor &amp; Admissions Committee</td>
                    <td className="py-3.5 px-4 font-semibold text-germany-black bg-red-50/30">
                      Consular Visa Officer &amp; Foreigners Authority (Ausländerbehörde)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-germany-black">Primary Goal</td>
                    <td className="py-3.5 px-4 text-gray-600">Prove academic caliber, intellect &amp; research passion</td>
                    <td className="py-3.5 px-4 font-semibold text-germany-black bg-red-50/30">
                      Prove genuine study intent, course continuity &amp; financial viability
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-germany-black">Key Content</td>
                    <td className="py-3.5 px-4 text-gray-600">Theories, professor citations, campus prestige</td>
                    <td className="py-3.5 px-4 font-semibold text-germany-black bg-red-50/30">
                      Specific module syllabus, €11,904 blocked account, career return roadmap
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-germany-black">Tone &amp; Style</td>
                    <td className="py-3.5 px-4 text-gray-600">Academic, storytelling, inspirational narrative</td>
                    <td className="py-3.5 px-4 font-semibold text-germany-black bg-red-50/30">
                      Formal administrative, structured, fact-grounded, unambiguous
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-germany-black">Length</td>
                    <td className="py-3.5 px-4 text-gray-600">Usually 1.5 – 2 pages (800–1200 words)</td>
                    <td className="py-3.5 px-4 font-semibold text-germany-black bg-red-50/30">
                      Strictly concise: 1 to 1.5 pages max (600–800 words for rapid consular review)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: 5 Core Consular Sections */}
        {activeTab === 'breakdown' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consularSections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div 
                  key={idx} 
                  className={`neu-card p-6 bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-4 ${
                    idx === 0 ? 'lg:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-black text-gray-400">
                        PART {sec.num}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-germany-black leading-snug">
                      {sec.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-bold text-germany-red">
                    <span>Consular check guaranteed</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Sample Excerpt Comparison */}
        {activeTab === 'examples' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weak / Generic Excerpt */}
            <div className="neu-card p-6 bg-red-50/40 border-2 border-red-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-red-200/70 pb-3">
                <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                  <XCircle className="w-5 h-5 text-germany-red" />
                  <span>Weak / Generic SOP Excerpt (Triggers Visa Scrutiny)</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-200/70 text-red-900 px-2 py-0.5 rounded-full">
                  High Risk
                </span>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-red-100 font-sans text-xs text-gray-700 leading-relaxed italic space-y-2">
                <p>
                  &ldquo;Germany is a world-renowned technological hub known as the land of ideas. I have dreamed of studying in Germany since childhood. The university has great rankings and world-class infrastructure. After graduating, I hope to gain valuable experience and become a successful engineer.&rdquo;
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-red-900 font-semibold">
                <p className="flex items-start gap-1.5">
                  <span className="text-germany-red font-bold">✕</span>
                  <span>Cliché generalizations about Germany rather than course justification.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-germany-red font-bold">✕</span>
                  <span>No mention of exact curriculum modules, professors, or lab infrastructure.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-germany-red font-bold">✕</span>
                  <span>Vague career outcome indicating ambiguous immigration intentions.</span>
                </p>
              </div>
            </div>

            {/* Strong / Consular Ready Excerpt */}
            <div className="neu-card p-6 bg-emerald-50/40 border-2 border-emerald-300/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200/70 pb-3">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>EuropeBridge Consular-Ready Excerpt</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
                  Approved Standard
                </span>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-emerald-100 font-sans text-xs text-gray-700 leading-relaxed space-y-2">
                <p>
                  &ldquo;Building upon my Bachelor&apos;s in Mechanical Engineering (German Equivalent 1.6) and my thesis on Finite Element Analysis in Automotive Drivetrains, the M.Sc. Computational Mechanics at RWTH Aachen provides precisely the advanced modules I require—specifically <em>Nonlinear Continuum Mechanics</em> under Prof. Dr. [Name] and the <em>Aachen High-Performance Computing Cluster</em>. With an activated Blocked Account (€11,904) and comprehensive statutory insurance via TK, my studies are fully funded. Post-graduation, I intend to transition into CAE simulation roles within the expanding EV engineering sector in India.&rdquo;
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-emerald-900 font-semibold">
                <p className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Clear grade conversion &amp; logical bridge from undergraduate thesis.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Pins down exact modules and specialized university lab resources.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Confirms €11,904 blocked funding &amp; states unambiguous career return roadmap.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
