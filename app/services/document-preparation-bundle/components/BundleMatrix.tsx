"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  ClipboardList, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Award
} from 'lucide-react';

interface MatrixDoc {
  id: string;
  name: string;
  role: string;
  standalonePrice: string;
  icon: React.ElementType;
  whatItDoes: string;
  crossSyncPoint: string;
  admissionsImpact: string;
}

const MATRIX_DOCS: MatrixDoc[] = [
  {
    id: "sop",
    name: "Statement of Purpose (SOP)",
    role: "Core Academic Narrative",
    standalonePrice: "₹4,999",
    icon: FileText,
    whatItDoes: "2-page customized essay articulating your academic background, ECTS coursework prerequisites, target university modules, and post-study career trajectory.",
    crossSyncPoint: "Directly cites the research projects and lab courses verified in your academic LOR, and matches the chronological employment dates listed on your CV.",
    admissionsImpact: "Proves course fitness and satisfies the academic admissions committee's prerequisite criteria."
  },
  {
    id: "lors",
    name: "Two Letters of Recommendation",
    role: "Third-Party Endorsements",
    standalonePrice: "₹7,998 (₹3,999 × 2)",
    icon: MessageSquare,
    whatItDoes: "Two distinct recommendation letters (Academic, Professional, or balanced) detailing specific projects, quantitative contributions, and personal character.",
    crossSyncPoint: "Recommenders substantiate the exact key technical achievements and analytical rigor you highlighted in your personal statement.",
    admissionsImpact: "Validates your academic credibility through authoritative professor/manager testimonials."
  },
  {
    id: "cv",
    name: "Europass Tabellarischer Lebenslauf",
    role: "Factual Chronological Baseline",
    standalonePrice: "₹4,999",
    icon: ClipboardList,
    whatItDoes: "Clean, German-standard 2-page reverse-chronological CV highlighting education, projects, technical skills, certifications, and language scores.",
    crossSyncPoint: "Serves as the factual index that anchors the dates, institutions, publications, and tools discussed in your SOP and LORs.",
    admissionsImpact: "Gives German reviewers a 30-second snapshot of your Bavarian grade and relevant work history."
  }
];

export const BundleMatrix = () => {
  const [activeDoc, setActiveDoc] = useState<string>('sop');

  const selectedDoc = MATRIX_DOCS.find((d) => d.id === activeDoc) || MATRIX_DOCS[0];
  const IconComponent = selectedDoc.icon;

  return (
    <section id="bundle-matrix" className="py-14 px-6 lg:px-12 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Harmonized Application Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display tracking-tight">
            Why Documents Must Be <span className="text-germany-red">Drafted Together</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            When you order individual documents separately from disparate sources, conflicting timelines and mismatched skills arouse suspicion. Our bundle ensures your entire dossier speaks with one cohesive, verified voice.
          </p>
        </div>

        {/* Pricing Comparison Bar */}
        <div className="neu-card p-6 sm:p-8 bg-gradient-to-r from-red-50 via-white to-amber-50 border-2 border-red-200 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-gray-500 tracking-wider">
                Individual Ala-Carte Cost vs. Bundle
              </span>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-2xl sm:text-3xl font-bold line-through text-gray-400 font-display">
                  ₹17,996
                </span>
                <span className="text-3xl sm:text-4xl font-black text-germany-black font-display">
                  ₹13,999
                </span>
                <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-black rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Save ₹3,997 (22% OFF)
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Includes 1 Course SOP (₹4,999) + 2 LORs (₹7,998) + 1 Europass CV (₹4,999).
              </p>
            </div>

            <a
              href="#booking"
              className="neu-btn-primary px-6 py-3.5 text-xs sm:text-sm font-black flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
            >
              <span>Claim Bundle Savings</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Interactive 3-Document Synchronization Tabs */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MATRIX_DOCS.map((doc) => {
              const DocIcon = doc.icon;
              const isActive = doc.id === activeDoc;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDoc(doc.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-2 text-left cursor-pointer ${
                    isActive
                      ? 'border-germany-red bg-red-50/70 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-germany-red text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <DocIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 line-through">
                      {doc.standalonePrice}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-germany-black">
                      {doc.name}
                    </h4>
                    <span className="text-[11px] font-bold text-gray-500">
                      {doc.role}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Detail Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDoc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="neu-card p-6 sm:p-8 border-2 border-gray-200 bg-gray-50/50 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="p-3 bg-red-100 text-germany-red rounded-2xl">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-germany-black">
                    {selectedDoc.name} — Strategic Purpose
                  </h3>
                  <p className="text-xs text-gray-600 font-medium">
                    {selectedDoc.whatItDoes}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-germany-red tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>How EuropeBridge Synchronizes It</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    {selectedDoc.crossSyncPoint}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900 tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Committee Impact at German University</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {selectedDoc.admissionsImpact}
                  </p>
                </div>
              </div>

              {/* Contrast with disjointed approach */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 font-medium leading-relaxed">
                  <strong className="font-bold text-amber-900">Why ordering separately is risky:</strong> Independent writers often use different project names, misalign graduation timelines, or invent skills never referenced on the CV, creating immediate red flags during faculty review.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
