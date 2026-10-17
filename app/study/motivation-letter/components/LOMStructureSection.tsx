"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  SplitSquareVertical, 
  AlertTriangle, 
  Check, 
  X, 
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
    <section id="section-structure" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20 text-[var(--lp-red)] text-xs font-mono uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Consular Anatomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
            The Anatomy of a <span className="text-[var(--lp-red)] italic">Winning Visa LOM</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal leading-relaxed">
            Over 30% of German visa delays and rejections stem from submitting an academic university SOP instead of a consular-tailored Letter of Motivation.
          </p>
        </div>

        {/* Tab Selector */}
        <div data-reveal className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] gap-1.5">
            <button
              onClick={() => setActiveTab('sop_vs_lom')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sop_vs_lom'
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
              }`}
            >
              <SplitSquareVertical className="w-4 h-4 text-[var(--lp-red)]" />
              <span>SOP vs Visa LOM</span>
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'breakdown'
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>5 Core Consular Sections</span>
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'examples'
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
              }`}
            >
              <Check className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>Sample Excerpt Comparison</span>
            </button>
          </div>
        </div>

        {/* Tab 1: SOP vs Visa LOM Table */}
        {activeTab === 'sop_vs_lom' && (
          <div data-reveal id="section-sop-vs-lom" className="bg-[var(--lp-card)] p-6 sm:p-8 border border-[var(--lp-rule)] rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--lp-rule)] pb-5">
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--lp-ink)]">
                  Why You Cannot Reuse Your University SOP for the Visa
                </h3>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] font-normal mt-1">
                  Admissions committees judge academic potential; consular officers enforce immigration law (§ 16b AufenthG).
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--lp-red)]/10 text-[var(--lp-red)] rounded-lg border border-[var(--lp-red)]/20 text-xs font-mono shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>#1 Consular Delay Factor</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--lp-rule)] text-[var(--lp-muted)] font-mono text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 w-1/4">Criteria</th>
                    <th className="py-3 px-4 w-3/8">University SOP (Admissions)</th>
                    <th className="py-3 px-4 w-3/8 text-[var(--lp-red)] bg-[var(--lp-paper-2)]/60 font-semibold">
                      Consular Visa LOM (German Embassy)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--lp-rule)] text-[var(--lp-text)]">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)]">Target Reader</td>
                    <td className="py-3.5 px-4 text-[var(--lp-muted)]">University Professor & Admissions Committee</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)] bg-[var(--lp-paper-2)]/30">
                      Consular Visa Officer & Foreigners Authority (Ausländerbehörde)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)]">Primary Goal</td>
                    <td className="py-3.5 px-4 text-[var(--lp-muted)]">Prove academic caliber, intellect & research passion</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)] bg-[var(--lp-paper-2)]/30">
                      Prove genuine study intent, course continuity & financial viability
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)]">Key Content</td>
                    <td className="py-3.5 px-4 text-[var(--lp-muted)]">Theories, professor citations, campus prestige</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)] bg-[var(--lp-paper-2)]/30">
                      Specific module syllabus, €11,904 blocked account, career return roadmap
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)]">Tone & Style</td>
                    <td className="py-3.5 px-4 text-[var(--lp-muted)]">Academic, storytelling, inspirational narrative</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)] bg-[var(--lp-paper-2)]/30">
                      Formal administrative, structured, fact-grounded, unambiguous
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)]">Length</td>
                    <td className="py-3.5 px-4 text-[var(--lp-muted)]">Usually 1.5 – 2 pages (800–1200 words)</td>
                    <td className="py-3.5 px-4 font-semibold text-[var(--lp-ink)] bg-[var(--lp-paper-2)]/30">
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
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consularSections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center text-[var(--lp-red)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-[var(--lp-muted)] font-semibold">
                        PART {sec.num}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-[var(--lp-ink)] leading-snug">
                      {sec.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--lp-rule)] flex items-center gap-1 text-[11px] font-mono text-[var(--lp-red)]">
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
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weak / Generic Excerpt */}
            <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
                <div className="flex items-center gap-2 text-[var(--lp-red)] font-semibold text-sm">
                  <X className="w-4 h-4" />
                  <span>Weak / Generic SOP Excerpt (Triggers Scrutiny)</span>
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20 px-2 py-0.5 rounded-full">
                  High Risk
                </span>
              </div>

              <div className="p-4 bg-[var(--lp-paper)] rounded-xl border border-[var(--lp-rule)] text-xs text-[var(--lp-muted)] leading-relaxed italic space-y-2">
                <p>
                  &ldquo;Germany is a world-renowned technological hub known as the land of ideas. I have dreamed of studying in Germany since childhood. The university has great rankings and world-class infrastructure. After graduating, I hope to gain valuable experience and become a successful engineer.&rdquo;
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--lp-muted)]">
                <p className="flex items-start gap-1.5">
                  <span className="text-[var(--lp-red)] font-bold">✕</span>
                  <span>Cliché generalizations about Germany rather than course justification.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-[var(--lp-red)] font-bold">✕</span>
                  <span>No mention of exact curriculum modules, professors, or lab infrastructure.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-[var(--lp-red)] font-bold">✕</span>
                  <span>Vague career outcome indicating ambiguous immigration intentions.</span>
                </p>
              </div>
            </div>

            {/* Strong / Consular Ready Excerpt */}
            <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
                <div className="flex items-center gap-2 text-[var(--lp-ink)] font-semibold text-sm">
                  <Check className="w-4 h-4 text-[var(--lp-gold)]" />
                  <span>EuropeBridge Consular-Ready Excerpt</span>
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] border border-[var(--lp-gold)]/25 px-2 py-0.5 rounded-full">
                  Approved Standard
                </span>
              </div>

              <div className="p-4 bg-[var(--lp-paper)] rounded-xl border border-[var(--lp-rule)] text-xs text-[var(--lp-text)] leading-relaxed space-y-2">
                <p>
                  &ldquo;Building upon my Bachelor&apos;s in Mechanical Engineering (German Equivalent 1.6) and my thesis on Finite Element Analysis in Automotive Drivetrains, the M.Sc. Computational Mechanics at RWTH Aachen provides precisely the advanced modules I require—specifically <em>Nonlinear Continuum Mechanics</em> under Prof. Dr. [Name] and the <em>Aachen High-Performance Computing Cluster</em>. With an activated Blocked Account (€11,904) and comprehensive statutory insurance via TK, my studies are fully funded. Post-graduation, I intend to transition into CAE simulation roles within the expanding EV engineering sector in India.&rdquo;
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--lp-muted)]">
                <p className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Clear grade conversion & logical bridge from undergraduate thesis.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Pins down exact modules and specialized university lab resources.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Confirms €11,904 blocked funding & states unambiguous career return roadmap.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
