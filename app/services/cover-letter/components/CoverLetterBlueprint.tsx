"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Landmark, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  Briefcase, 
  ShieldCheck, 
  GraduationCap,
  FolderOpen
} from 'lucide-react';

interface BlueprintTab {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  coreRule: string;
  featuresList: { title: string; desc: string }[];
  dos: string[];
  donts: string[];
  insiderTip: string;
}

const BLUEPRINT_TABS: BlueprintTab[] = [
  {
    id: "cover-vs-lom",
    label: "Cover Letter vs. Motivation Letter",
    badge: "Core Distinction",
    icon: Layers,
    title: "Understanding the Cover Letter vs. Letter of Motivation (LOM)",
    description: "Many students confuse a Cover Letter with a Letter of Motivation (LOM). In the German visa application system, they serve two fundamentally distinct purposes.",
    coreRule: "A Cover Letter is the executive summary & document index of your application dossier; the LOM is your personal narrative defending academic and legal intent.",
    featuresList: [
      {
        title: "Cover Letter (Begleitschreiben)",
        desc: "Strictly 1 page. Summarizes personal vitals, VIDEX reference, degree admitted, funding summary, and acts as the master index of all documents appended in your 2-set dossier."
      },
      {
        title: "Letter of Motivation (Motivationsschreiben)",
        desc: "Typically 1.5 to 2 pages. In-depth personal story covering past academic progression, specific German university modules, § 16b AufenthG legal intent, and post-study career plans."
      },
      {
        title: "Target Reader at VFS / Embassy",
        desc: "The consular officer reads the Cover Letter first to confirm dossier completeness before diving into the individual certificates and the full Motivation Letter."
      }
    ],
    dos: [
      "Keep it strictly to 1 page using standard German DIN 5008 letterhead formatting",
      "Include your VIDEX barcode / application reference number clearly in the subject line",
      "Provide a clean, numbered index of all appended certificates in the exact VFS submission order",
      "Explicitly mention your Sperrkonto (€11,904 confirmation) and statutory health insurance provider"
    ],
    donts: [
      "Do NOT write multiple pages of emotional storytelling in a cover letter (that belongs in the LOM)",
      "Do NOT omit your exact passport number, German university student ID, or VIDEX reference",
      "Do NOT use informal greetings like 'Hi Germany Embassy' — use formal German business salutations"
    ],
    insiderTip: "Consular officers review dossiers in under 3 minutes. A clean Cover Letter with a synchronized document index prevents misplaced paperwork and delays."
  },
  {
    id: "dossier-anatomy",
    label: "Anatomy of a German Visa Cover Letter",
    badge: "5 Essential Pillars",
    icon: FolderOpen,
    title: "The 5 Structural Pillars of an Embassy-Ready Cover Letter",
    description: "Every German consular Cover Letter prepared by EuropeBridge follows the standard German business correspondence convention (DIN 5008) to ensure instant verification.",
    coreRule: "Clear, factual, and legally aligned with regional German mission document submission checklists.",
    featuresList: [
      {
        title: "1. Formal Header & Embassy Recipient",
        desc: "Full applicant contact details (Place, Date), German Embassy/Consulate address (e.g. New Delhi, Mumbai), and bold subject line with VIDEX reference."
      },
      {
        title: "2. Academic Admission Synopsis",
        desc: "Exact name of degree (e.g. MSc Data Engineering), admitted university, department, intake semester, and official language of instruction."
      },
      {
        title: "3. Educational & Professional Background",
        desc: "Succinct 2-paragraph overview of your Bachelor's degree, CGPA, graduation institute, and relevant industrial/research experience."
      },
      {
        title: "4. Financial & Insurance Preparedness",
        desc: "Explicit declaration of €11,904 blocked account with official Sperrkonto provider, education loan sanction, and health insurance confirmation."
      },
      {
        title: "5. Comprehensive Appended Document Index",
        desc: "Itemized, numbered list of all accompanying documents arranged according to the VFS two-set physical dossier guidelines."
      }
    ],
    dos: [
      "Reference your exact German Consulate jurisdiction (Delhi, Mumbai, BLR, Chennai, Kolkata, HYD)",
      "Match document names verbatim with your physical certificate headings (APS Certificate, Degree Transcript, etc.)",
      "Include place and date at the top right as per German administrative standards"
    ],
    donts: [
      "Don't leave financial details ambiguous — state the exact blocked amount or loan provider",
      "Don't forget the original blue-ink signature placeholder above your printed name",
      "Don't list documents that are not physically present in your VFS dossier folder"
    ],
    insiderTip: "The document index in your Cover Letter serves as a checklist for the VFS officer during biometrics submission, ensuring zero missing items are flagged."
  },
  {
    id: "use-cases",
    label: "Other Applications (Jobs & Ausbildung)",
    badge: "Versatile Coverage",
    icon: Briefcase,
    title: "Cover Letters for German Jobs, Werkstudent & Ausbildung",
    description: "Beyond student visas, EuropeBridge crafts German-standard cover letters (Anschreiben) for corporate employment, working student contracts, and vocational apprenticeships.",
    coreRule: "Tailored to European HR screening and German industry expectations with compelling competency matching.",
    featuresList: [
      {
        title: "Werkstudent & Internship Cover Letters",
        desc: "Targeted cover letters highlighting German university enrollment, available 20-hour work permits, technical stack, and immediate availability."
      },
      {
        title: "Ausbildung (Vocational Training)",
        desc: "Written to satisfy both the German employer and immigration office regarding German language proficiency (B1/B2) and long-term vocational dedication."
      },
      {
        title: "Direct University Admission Letters",
        desc: "Formal cover note accompanying physical application dossiers for universities requiring hard-copy postal verification before admission."
      }
    ],
    dos: [
      "Highlight German language proficiency level (Goethe/TestDaF/telc) when applying for jobs or Ausbildung",
      "Connect previous practical projects directly to the German company's open position requirements",
      "Mention your legal work authorization status in Germany upfront"
    ],
    donts: [
      "Never submit a generic template that doesn't mention the company's specific division",
      "Don't exceed 1 page — German HR managers strictly expect a concise 1-page Anschreiben",
      "Don't repeat your CV verbatim; explain why your qualifications make you the ideal candidate"
    ],
    insiderTip: "In Germany, a personalized Anschreiben that references the company's recent projects or technologies increases interview invitation rates by over 60%."
  }
];

export const CoverLetterBlueprint = () => {
  const [activeTab, setActiveTab] = useState<string>('cover-vs-lom');

  const currentTab = BLUEPRINT_TABS.find((t) => t.id === activeTab) || BLUEPRINT_TABS[0];
  const IconComponent = currentTab.icon;

  return (
    <section id="blueprint" className="py-14 px-6 lg:px-12 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Consular Document Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display tracking-tight">
            Cover Letter <span className="text-germany-red">Standards &amp; Structure</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Discover why the Cover Letter is the crucial introductory index of your German visa dossier and how it differs from a university Statement of Purpose.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BLUEPRINT_TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-germany-red text-white shadow-md shadow-red-200 scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-gray-500'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="neu-card p-6 sm:p-10 border-2 border-gray-200 bg-gray-50/50 space-y-8"
          >
            {/* Header with Title & Core Rule */}
            <div className="border-b border-gray-200 pb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 text-germany-red rounded-2xl">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-germany-black">
                    {currentTab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    {currentTab.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-3 mt-3">
                <AlertCircle className="w-5 h-5 text-germany-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black uppercase text-germany-red block">
                    Essential Consular Guideline
                  </span>
                  <span className="text-xs sm:text-sm text-germany-black font-semibold">
                    {currentTab.coreRule}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTab.featuresList.map((item, idx) => (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <span className="text-xs font-black text-germany-red uppercase tracking-wider block">
                    {item.title}
                  </span>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Crucial Elements to Include</span>
                </div>
                <ul className="space-y-2.5 text-xs text-emerald-950 font-medium">
                  {currentTab.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-red-50/70 border border-red-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-black text-sm uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-red-700" />
                  <span>Costly Pitfalls to Avoid</span>
                </div>
                <ul className="space-y-2.5 text-xs text-red-950 font-medium">
                  {currentTab.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-700 font-bold shrink-0 mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Insider Tip Callout */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3 text-xs sm:text-sm text-amber-950 font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Consular Insider Tip: {currentTab.insiderTip}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
