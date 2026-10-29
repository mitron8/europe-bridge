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
    <section id="comparison" className="py-14 px-6 lg:px-12 bg-white relative scroll-mt-28">
      <div id="bundle-matrix" className="-mt-28 pt-28 pointer-events-none absolute" />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece7dd] text-[#16161a] border border-[#dcd7cb] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Harmonized Application Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16161a] font-display tracking-tight">
            Why Documents Must Be <span className="text-[#b4232f]">Drafted Together</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5e5b54] font-medium">
            When you order individual documents separately from disparate sources, conflicting timelines and mismatched skills arouse suspicion. Our bundle ensures your entire dossier speaks with one cohesive, verified voice.
          </p>
        </div>

        {/* Pricing Comparison Bar */}
        <div className="p-6 sm:p-8 bg-[#faf8f3] rounded-3xl border border-[#e5e0d3] shadow-xs max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider">
                Individual Ala-Carte Cost vs. Bundle
              </span>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-2xl sm:text-3xl font-bold line-through text-[#787369] font-display">
                  ₹17,996
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#16161a] font-display">
                  ₹13,999
                </span>
                <span className="px-2.5 py-1 bg-[#16161a] text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Save ₹3,997 (22% OFF)
                </span>
              </div>
              <p className="text-xs text-[#5e5b54] font-medium">
                Includes 1 Course SOP (₹4,999) + 2 LORs (₹7,998) + 1 Europass CV (₹4,999).
              </p>
            </div>

            <a
              href="#booking"
              className="neu-btn-primary px-6 py-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
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
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-start gap-2 text-left cursor-pointer ${
                    isActive
                      ? 'border-[#16161a] bg-[#faf8f3] shadow-xs'
                      : 'border-[#e5e0d3] bg-white hover:border-[#c5bfb3]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-[#16161a] text-white' : 'bg-[#ece7dd] text-[#16161a]'}`}>
                      <DocIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#787369] line-through">
                      {doc.standalonePrice}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#16161a]">
                      {doc.name}
                    </h4>
                    <span className="text-[11px] font-medium text-[#5e5b54]">
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
              className="p-6 sm:p-8 rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] space-y-6 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-[#e5e0d3] pb-4">
                <div className="p-3 bg-[#ece7dd] text-[#16161a] rounded-2xl border border-[#dcd7cb]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#16161a]">
                    {selectedDoc.name} — Strategic Purpose
                  </h3>
                  <p className="text-xs text-[#5e5b54] font-medium">
                    {selectedDoc.whatItDoes}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#e5e0d3] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#b4232f] tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>How EuropeBridge Synchronizes It</span>
                  </div>
                  <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
                    {selectedDoc.crossSyncPoint}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#e5e0d3] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#16161a] tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#16161a]" />
                    <span>Committee Impact at German University</span>
                  </div>
                  <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
                    {selectedDoc.admissionsImpact}
                  </p>
                </div>
              </div>

              {/* Contrast with disjointed approach */}
              <div className="p-4 bg-white rounded-2xl border border-[#e5e0d3] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#b4232f] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5e5b54] font-medium leading-relaxed">
                  <strong className="font-bold text-[#16161a]">Why ordering separately is risky:</strong> Independent writers often use different project names, misalign graduation timelines, or invent skills never referenced on the CV, creating immediate red flags during faculty review.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
