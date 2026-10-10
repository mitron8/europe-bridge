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
  Award, 
  Layers, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

interface GuideTab {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  coreRule: string;
  dos: string[];
  donts: string[];
  consularInsight: string;
}

const GUIDE_TABS: GuideTab[] = [
  {
    id: 'lom-vs-sop',
    label: 'Visa LOM vs University SOP',
    badge: 'Crucial Difference',
    icon: Landmark,
    title: 'Why You Cannot Submit Your University SOP for Your Visa',
    description: 'A University SOP is written for faculty professors to prove your academic and ECTS research competence. A Visa Letter of Motivation is written for German consular officers to verify your genuine study intent and legal eligibility.',
    coreRule: 'The visa officer is not assessing your lab code; they are legally vetting whether you are a bona fide student with adequate funds and a clear educational purpose.',
    dos: [
      'Formal letterhead addressed directly to your regional mission (e.g. "To: Embassy of the Federal Republic of Germany, New Delhi")',
      'Include your Passport Number, Date of Birth, and University Enrollment/Matriculation ID in the header',
      'Articulate why Germany was chosen over your home country and other study destinations (US, UK, Canada)',
      'Explicitly reference your Sperrkonto (Blocked Account of €11,904) and financial self-sufficiency'
    ],
    donts: [
      'Submitting a pure university SOP that talks solely about technical thesis electives and lab equipment',
      'Addressing the letter to "Respected Admissions Committee" or "Dear Professor"',
      'Omitting any explanation of living costs, health insurance, and city accommodation in Germany',
      'Failing to connect your bachelor’s degree logically to the intended Master’s program'
    ],
    consularInsight: 'German consular officers routinely reject or delay visa files where students simply attach their university SOP, as it fails to address the statutory immigration questions required by § 16b of the German Residence Act (Aufenthaltsgesetz).'
  },
  {
    id: 'consular-pillars',
    label: 'The 4 Consular Pillars',
    badge: 'Structure Blueprint',
    icon: Layers,
    title: 'The Four Structural Pillars of a Winning Visa LOM',
    description: 'Every successful German visa motivation letter follows a rigorous, logical progression that satisfies both the German consulate and the municipal foreigners’ authority (Ausländerbehörde).',
    coreRule: 'Every paragraph must answer a specific consular doubt: Why Germany? Why this program? How is it funded? What is the career return?',
    dos: [
      'Pillar 1 (Academic Background): Clear chronology of your undergraduate degree, GPA, and foundational coursework',
      'Pillar 2 (Why Germany & Institution): Practical reasons including tuition-free public education, industrial ties, and state infrastructure',
      'Pillar 3 (Financial Feasibility): Clear breakdown of your blocked account (€11,904), travel insurance, and family stability',
      'Pillar 4 (Career Trajectory): Realistic post-graduation plans demonstrating high-demand engineering or management leadership'
    ],
    donts: [
      'Generic praise ("Germany has castles, beer, and great cars") instead of industrial curriculum facts',
      'Mentioning reliance on part-time jobs (minijobs) to cover basic living expenses (viewed as a financial risk)',
      'Leaving unaddressed academic backlogs, exam sabbatical years, or career transition periods',
      'Vague career conclusions like "I want to settle down and find any job in Europe"'
    ],
    consularInsight: 'The foreigners’ office in your university’s city evaluates your LOM to confirm you understand the realistic cost of student living in their specific federal state.'
  },
  {
    id: 'embassy-red-flags',
    label: 'Red Flags & Pitfalls',
    badge: 'Rejection Traps',
    icon: AlertCircle,
    title: 'Common Red Flags That Trigger Consular Scrutiny',
    description: 'Understand the exact phrases and narrative blunders that make visa officers flag an application for intense scrutiny or in-person interview grilling.',
    coreRule: 'Ambiguity creates suspicion. The more specific, verifiable, and transparent your motivation, the faster your visa is stamped.',
    dos: [
      'Maintain total consistency with your VIDEX form, CV timeline, and university admission dates',
      'Demonstrate awareness of German language basics (A1/A2 learning) even for English-taught degrees',
      'Explain any career transition or study gaps with constructive, productive framing',
      'Keep the document between 1.5 to 2 clean A4 pages (around 700 to 1,000 words)'
    ],
    donts: [
      'Expressing permanent immigration intent (Einwanderungsabsicht) before your studies have even begun',
      'Copying generic ChatGPT phrases ("beacon of innovation", "since childhood it was my burning desire")',
      'Discrepancies between your stated financial sponsor and your official bank remittance documents',
      'Using informal language, rhetorical flourishes, or emotional pleading'
    ],
    consularInsight: 'Visa officers are trained to detect AI-generated and template letters within 15 seconds. EuropeBridge writes 100% original, human-crafted letters tailored strictly to your profile.'
  }
];

export const LomVsSopGuide = () => {
  const [activeTab, setActiveTab] = useState<string>('lom-vs-sop');

  const currentTab = GUIDE_TABS.find((t) => t.id === activeTab) || GUIDE_TABS[0];
  const IconComponent = currentTab.icon;

  return (
    <section id="comparison" className="py-16 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Consular Document Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            Visa Motivation Letter <span className="text-germany-red">vs. University SOP</span>
          </h2>
          <p className="text-base text-gray-600 font-medium">
            Learn why your university Statement of Purpose will not work for your visa, and how we craft a consulate-ready letter that satisfies German immigration authorities.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {GUIDE_TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-sm transition-all duration-200 cursor-pointer ${
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

        {/* Active Tab Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="neu-card p-6 sm:p-10 border border-gray-100 space-y-8"
          >
            {/* Header of Active Tab */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center shrink-0">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-germany-black">
                    {currentTab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {currentTab.description}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold shrink-0 self-start md:self-center">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Consular Compliance Guaranteed</span>
              </div>
            </div>

            {/* Core Principle Pill */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-start gap-3">
              <Award className="w-5 h-5 text-germany-red shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong className="text-germany-black font-extrabold">Fundamental Consular Principle: </strong>
                {currentTab.coreRule}
              </div>
            </div>

            {/* Do's and Don'ts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's Card */}
              <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>How EuropeBridge Crafts Your LOM</h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-emerald-950 font-medium">
                  {currentTab.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts Card */}
              <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-rose-800 font-extrabold text-base">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h4>Pitfalls That Trigger Embassy Queries</h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-rose-950 font-medium">
                  {currentTab.donts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consular Officer Note */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  German Consular Officer Perspective
                </h5>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {currentTab.consularInsight}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
