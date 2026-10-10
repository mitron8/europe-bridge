"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, FileCheck, AlertCircle, CheckCircle2, XCircle, Award, BookOpen, Layers } from 'lucide-react';

interface TabContent {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  recommendedFor: string;
  dos: string[];
  donts: string[];
  germanExpectation: string;
}

const TABS: TabContent[] = [
  {
    id: 'academic',
    label: 'Academic LOR',
    badge: 'Professors & Mentors',
    icon: GraduationCap,
    title: 'Academic Letter of Recommendation',
    description: 'Written from the perspective of your university professors, HoDs, or thesis project guides who observed your academic rigor, coursework, and laboratory problem solving.',
    recommendedFor: 'Mandatory for all German Master’s & Bachelor’s admissions (TUM, RWTH Aachen, TU Berlin, FAU Erlangen, etc.).',
    dos: [
      'Cites exact course codes, seminar names, and percentile/rank within class cohort',
      'Highlights laboratory experimental competence, analytical curiosity, and viva performance',
      'Details your final-year thesis/capstone topic, methodologies used, and personal contribution',
      'Uses official university letterhead with institutional email (.edu, .ac.in) and university stamp'
    ],
    donts: [
      'Vague, hollow flattery ("student is punctual, disciplined, and very nice")',
      'Generic template letters downloaded online where only the student’s name is swapped',
      'Signed by a professor who never taught you a relevant STEM/field module',
      'Generic personal Gmail/Yahoo contact addresses without an official institutional domain'
    ],
    germanExpectation: 'German admissions committees (Prüfungsausschuss) examine academic LORs to verify whether your foundational knowledge matches the specific ECTS prerequisites of their curriculum.'
  },
  {
    id: 'professional',
    label: 'Professional LOR',
    badge: 'Managers & Team Leads',
    icon: Briefcase,
    title: 'Professional / Employer Letter of Recommendation',
    description: 'Written by your direct engineering manager, technical lead, or department head covering your real-world problem-solving, project ownership, and technical contributions.',
    recommendedFor: 'Ideal for applicants with 6+ months of work or internship experience, especially for applied science degrees (Fachhochschulen) or specialized data/management programs.',
    dos: [
      'Describes concrete technical stack, architecture, or deliverables you spearheaded',
      'Mentions quantitative impact (e.g., "reduced latency by 28%", "built API handled 50k daily hits")',
      'Evaluates team collaboration, autonomy, code reviews, and cross-functional leadership',
      'Printed on corporate letterhead with company registration/HR contact credentials'
    ],
    donts: [
      'Vague HR service certificates stating merely start/end dates and designation',
      'Revealing proprietary NDA business data while omitting the candidate’s engineering role',
      'Written by a peer, junior coworker, or family member rather than a reporting authority',
      'Focusing exclusively on sales/attendance rather than technical competence'
    ],
    germanExpectation: 'German universities value professional LORs when they demonstrate self-reliant engineering problem-solving and maturity beyond classroom theory.'
  },
  {
    id: 'german-rules',
    label: 'German Faculty Standards',
    badge: 'What Committees Value',
    icon: Award,
    title: 'The German Admissions Committee Standards',
    description: 'German university admission panels evaluate recommendations very differently from US or UK universities. Flattery is penalized; verifiable precision is rewarded.',
    recommendedFor: 'Essential reading to avoid immediate rejection by German academic review committees.',
    dos: [
      'Tone: Objective, fact-focused, and academic rather than dramatic storytelling',
      'Distinct Perspectives: LOR 1 & LOR 2 must emphasize different strengths (e.g., LOR 1 on research/thesis, LOR 2 on lab algorithms/internship)',
      'Official Validation: Physical or digital verifiable signature, official institutional stamp, and faculty contact info',
      'Standard Length: 1 to 1.5 pages (400-500 words) — concise, sharp, and easy for professors to read'
    ],
    donts: [
      'Overblown American-style superlative phrases ("top 0.01% genius in human history")',
      'Having both recommenders repeat identical sentence structures or paragraphs',
      'Letters lacking official university/corporate letterhead and department seal',
      'Submitting expired or non-dated recommendation letters'
    ],
    germanExpectation: 'German professors look for evidence of your capacity to conduct independent scientific research (Wissenschaftliches Arbeiten). Our writers calibrate every letter to reflect this exact standard.'
  }
];

export const LorRecommenderGuide = () => {
  const [activeTab, setActiveTab] = useState<string>('academic');

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];
  const IconComponent = currentTab.icon;

  return (
    <section className="py-16 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Recommender Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            Academic vs. Professional <span className="text-germany-red">LORs for Germany</span>
          </h2>
          <p className="text-base text-gray-600 font-medium">
            Understand how German university selection panels assess your letters. We customize both letters in your bundle so they reinforce each other without sounding identical.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TABS.map((tab) => {
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
                <Layers className="w-4 h-4 text-amber-700" />
                <span>2 LORs Included in Bundle</span>
              </div>
            </div>

            {/* Scope / Recommended For */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-germany-red shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong className="text-germany-black font-extrabold">Who should choose this: </strong>
                {currentTab.recommendedFor}
              </div>
            </div>

            {/* Do's and Don'ts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's Card */}
              <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>What We Include in Your LOR</h4>
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
                  <h4>Common Pitfalls to Avoid</h4>
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

            {/* German Faculty Expectation Note */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  German Admissions Reality Check
                </h5>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {currentTab.germanExpectation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
