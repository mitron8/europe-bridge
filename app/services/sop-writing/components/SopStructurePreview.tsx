"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, AlertCircle, Layers, FileText, ArrowRight, X } from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  germanFocus: string;
  whatWeWrite: string;
  commonMistake: string;
}

const PILLARS: Pillar[] = [
  {
    id: "academic",
    title: "1. Academic Foundations & ECTS Proof",
    germanFocus: "German admission boards check if your undergraduate courses meet their strict prerequisite modules (Prüfungsordnung).",
    whatWeWrite: "Direct mapping of your bachelor courses, quantitative coursework, and capstone project directly to the target master's prerequisites.",
    commonMistake: "Writing emotional childhood stories about when you first used a computer or opened a toy engine (German professors skip this immediately)."
  },
  {
    id: "projects",
    title: "2. Technical Projects & Research",
    germanFocus: "Concrete technical methodology, tools used, results achieved, and engineering problem-solving capabilities.",
    whatWeWrite: "Structured breakdown of your best technical projects, undergraduate thesis, GitHub code repositories, or peer-reviewed publications.",
    commonMistake: "Listing vague generic project titles without describing your specific technical contribution, libraries, or measurable outcomes."
  },
  {
    id: "curriculum",
    title: "3. Target Course & Module Deep Dive",
    germanFocus: "Why this exact university instead of 400 other public universities in Germany? Which specific professors and modules fit your goals?",
    whatWeWrite: "Deep analysis of the university's official module catalog (Modulhandbuch), elective tracks, institute research groups, and lab facilities.",
    commonMistake: "Copy-pasting generic praises like 'Your university is world-renowned with great infrastructure' that could apply to any school."
  },
  {
    id: "career",
    title: "4. Post-Study Industry Trajectory",
    germanFocus: "Coherent career goals aligned with German / European industrial demands (e.g. Industrie 4.0, Green Energy, AI in Healthcare).",
    whatWeWrite: "A logical career roadmap connecting your master's thesis topic to industry research, R&D roles, or Ph.D. aspirations.",
    commonMistake: "Saying 'I want to settle in Germany for higher salary' instead of describing professional engineering or research ambitions."
  }
];

export const SopStructurePreview = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const currentPillar = PILLARS.find(p => p.id === activeTab) || PILLARS[0];

  return (
    <section id="structure" className="py-8 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 border border-[#e5e0d3] bg-[#faf8f3] space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e0d3] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ece7dd] text-[#16161a] border border-[#dcd7cb] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#16161a]" />
              <span>The German Academic SOP Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#16161a] font-display">
              Why German SOPs Are Different From US/UK Essays
            </h2>
            <p className="text-sm text-[#5e5b54] font-medium">
              German university admission boards look for hard academic evidence and syllabus relevance, not flowery storytelling. Explore how our writers engineer each section:
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#e5e0d3] shadow-xs shrink-0 text-center">
            <span className="text-[11px] font-bold text-[#5e5b54] uppercase tracking-wider block">Standard Length</span>
            <div className="text-lg font-black text-[#b4232f]">800 – 1,200 Words</div>
            <span className="text-[10px] font-medium text-[#787369]">Exact Word &amp; Page Constraints Met</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#ece7dd]/60 p-1.5 rounded-2xl border border-[#e5e0d3]">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === pillar.id
                  ? 'bg-white text-[#16161a] shadow-xs font-black border border-[#e5e0d3]'
                  : 'text-[#5e5b54] hover:text-[#16161a]'
              }`}
            >
              {pillar.title}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* What We Write */}
          <div className="p-6 rounded-2xl bg-white border border-[#e5e0d3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16161a]">
              <CheckCircle2 className="w-4 h-4 text-[#16161a]" />
              <span>The EuropeBridge German Standard</span>
            </div>
            <h3 className="text-base font-bold text-[#16161a]">
              {currentPillar.whatWeWrite}
            </h3>
            <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
              <strong className="text-[#16161a]">German Committee Focus:</strong> {currentPillar.germanFocus}
            </p>
          </div>

          {/* Common Mistake Avoided */}
          <div className="p-6 rounded-2xl bg-white border border-[#e5e0d3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b4232f]">
              <AlertCircle className="w-4 h-4 text-[#b4232f]" />
              <span>Common Mistake We Eliminate</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5e5b54] font-medium leading-relaxed">
              {currentPillar.commonMistake}
            </p>
            <span className="text-[11px] font-semibold text-[#b4232f] flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 shrink-0 text-[#b4232f]" />
              Why students get rejected by TU9 admission professors.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
