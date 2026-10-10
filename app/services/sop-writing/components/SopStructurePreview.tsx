"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, AlertCircle, Layers, FileText, ArrowRight } from 'lucide-react';

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
      <div className="neu-card p-6 sm:p-10 border-2 border-amber-200/90 bg-gradient-to-b from-white to-amber-50/30 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>The German Academic SOP Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Why German SOPs Are Different From US/UK Essays
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              German university admission boards look for hard academic evidence and syllabus relevance, not flowery storytelling. Explore how our writers engineer each section:
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs shrink-0 text-center">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block">Standard Length</span>
            <div className="text-lg font-black text-germany-red">800 – 1,200 Words</div>
            <span className="text-[10px] font-bold text-gray-400">Exact Word &amp; Page Constraints Met</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === pillar.id
                  ? 'bg-white text-germany-black shadow-sm font-black border border-gray-200/80'
                  : 'text-gray-600 hover:text-germany-black'
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
          <div className="p-6 rounded-2xl bg-white border-2 border-green-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-green-800">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>The EuropeBridge German Standard</span>
            </div>
            <h3 className="text-base font-extrabold text-germany-black">
              {currentPillar.whatWeWrite}
            </h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              <strong className="text-germany-black">German Committee Focus:</strong> {currentPillar.germanFocus}
            </p>
          </div>

          {/* Common Mistake Avoided */}
          <div className="p-6 rounded-2xl bg-red-50/70 border-2 border-red-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red">
              <AlertCircle className="w-4 h-4 text-germany-red" />
              <span>Common Mistake We Eliminate</span>
            </div>
            <p className="text-xs sm:text-sm text-red-950 font-medium leading-relaxed">
              {currentPillar.commonMistake}
            </p>
            <span className="text-[11px] font-bold text-red-700 block">
              ✗ Why students get rejected by TU9 admission professors.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
