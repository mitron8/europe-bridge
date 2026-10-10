"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  GraduationCap, 
  Languages, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Award, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface BlueprintTab {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  germanRule: string;
  dos: string[];
  donts: string[];
  facultyInsight: string;
}

const BLUEPRINT_TABS: BlueprintTab[] = [
  {
    id: 'tabular-format',
    label: 'Tabellarischer Aufbau',
    badge: 'Structure & Layout',
    icon: FileText,
    title: 'The German Tabular Structure (Tabellarischer Lebenslauf)',
    description: 'German institutions mandate a two-column, reverse-chronological layout with strict month/year dates on the left and crisp, quantifiable descriptions on the right.',
    germanRule: 'A German CV is not a narrative storytelling document; it is a structured, factual reference sheet designed for 30-second scanning by German professors.',
    dos: [
      'Strict MM/YYYY - MM/YYYY left date column for all educational and professional positions',
      'Categorized sections: Schulbildung / Studium (Education), Berufserfahrung (Experience), Projekte (Projects), Kenntnisse (Skills)',
      'Clean typography with consistent margins, ATS-friendly single/two-page structure',
      'Concluding line with Location, Date, and Digital Signature (Standard German formality)'
    ],
    donts: [
      'Vague dates like "2022 - 2023" without specifying the exact months (triggers gap queries)',
      'Unstructured creative graphics, infographics, or progress skill bars that break ATS parsers',
      'Wordy introductory summaries full of generic buzzwords ("Hardworking synergy-driven leader")',
      'Random order of events; must follow strict reverse chronological hierarchy'
    ],
    facultyInsight: 'German admissions committees (Prüfungsausschuss) examine the tabular timeline to immediately verify whether your degree duration complies with standard Bachelor cycles.'
  },
  {
    id: 'gapless-timeline',
    label: 'Lückenloser Lebenslauf',
    badge: 'Zero Unexplained Gaps',
    icon: Calendar,
    title: 'The Gapless Timeline Requirement (Lückenlos)',
    description: 'In Germany, any unmentioned period longer than 1 to 2 months between schooling, university, or employment is viewed with suspicion unless explicitly accounted for.',
    germanRule: 'Every single month of your adult academic and professional life must be accounted for cleanly.',
    dos: [
      'Proactively document transition periods (e.g., "Preparation for Master’s entrance exams & German A1/A2 certification")',
      'Account for pandemic delays, gap years, or independent research with productive framing',
      'Highlight self-study, open-source development, or technical capstones during sabbatical windows',
      'Ensure uninterrupted flow from secondary school completion directly to university degree'
    ],
    donts: [
      'Leaving a 6-month or 1-year blank gap after graduating college hoping reviewers won’t notice',
      'Fabricating fake internships or dubious freelance gigs that cannot be verified by official certificates',
      'Vague labels like "Personal time off" without specifying constructive activities or exam preparation',
      'Conflicting dates between your marksheet issuance date and your CV education entry'
    ],
    facultyInsight: 'A gap without explanation frequently causes uni-assist or German visa officers to issue formal inquiries or reject applications on suspicion of inactive study periods.'
  },
  {
    id: 'academic-calibration',
    label: 'Academic & ECTS Alignment',
    badge: 'University Prerequisites',
    icon: GraduationCap,
    title: 'ECTS & German Grade Equivalents',
    description: 'Showcasing your Indian or international degree in terms German faculty readily understand: converted grades, credit hours, and thesis specifications.',
    germanRule: 'Admission committees require clear mapping of your prior coursework to their specific credit (ECTS) prerequisites.',
    dos: [
      'Include your original CGPA alongside the converted German GPA (Bavarian Formula, e.g., 1.5 Sehr Gut)',
      'Explicitly state your final Bachelor Thesis title, faculty advisor, and core methodologies used',
      'Highlight relevant technical modules and laboratory semester credits matching the target German curriculum',
      'Mention academic awards, semester top rank, or national competitive exam percentiles (GATE/JEE)'
    ],
    donts: [
      'Omitting your final grade or presenting unverified unofficial conversion scales',
      'Listing generic high-school subjects while omitting university laboratory coursework',
      'Neglecting to cite your capstone/bachelor thesis project',
      'Claiming ECTS credit hours that do not match your official degree transcript'
    ],
    facultyInsight: 'Faculty evaluating Master’s applications in mechanical, electrical, or computer science look directly at your thesis and core math/engineering modules to confirm subject equivalence.'
  },
  {
    id: 'language-skills',
    label: 'Skills & CEFR Languages',
    badge: 'Certified Classification',
    icon: Languages,
    title: 'Language Proficiency & Technical Competency Grid',
    description: 'German employers and academic departments expect skills and language abilities to be categorized by standardized proficiency levels rather than subjective percentages.',
    germanRule: 'Never rate skills with arbitrary 5-star ratings or 85% progress bars. Use objective proficiency levels (CEFR for languages, Proficient/Familiar for tech).',
    dos: [
      'Languages classified strictly according to European CEFR framework (e.g., English: C1 / IELTS 7.5; German: A2 Goethe-Zertifikat)',
      'Technical tools grouped by domain: Programming (Python, C++), Frameworks (React, PyTorch), Tools & CAD (SolidWorks, Git)',
      'Mention verifiable certifications, hackathons, and published research papers or patents',
      'Specify practical application of tools rather than an exhaustive unranked keyword dump'
    ],
    donts: [
      'Subjective progress bars ("Java 90%", "Leadership 80%") that convey zero quantifiable meaning',
      'Claiming "Fluent in German" when you only hold an introductory A1 certificate',
      'Listing software or libraries you cannot explain during a faculty or technical interview',
      'Mixing languages without identifying your native mother tongue (Muttersprache)'
    ],
    facultyInsight: 'Even for 100% English-taught programs, displaying German A1/A2 learning on your Lebenslauf demonstrates genuine integration commitment and gives you an edge.'
  }
];

export const CvGermanBlueprint = () => {
  const [activeTab, setActiveTab] = useState<string>('tabular-format');

  const currentTab = BLUEPRINT_TABS.find((t) => t.id === activeTab) || BLUEPRINT_TABS[0];
  const IconComponent = currentTab.icon;

  return (
    <section id="blueprint" className="py-16 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>German CV Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            How a German <span className="text-germany-red">Lebenslauf</span> Really Works
          </h2>
          <p className="text-base text-gray-600 font-medium">
            German universities and employers look for precision, consistency, and complete transparency. Discover the structural rules we follow to craft your document.
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
                <span>German Standard Guaranteed</span>
              </div>
            </div>

            {/* Core Principle Pill */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-start gap-3">
              <Award className="w-5 h-5 text-germany-red shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong className="text-germany-black font-extrabold">Fundamental Principle: </strong>
                {currentTab.germanRule}
              </div>
            </div>

            {/* Do's and Don'ts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's Card */}
              <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>How EuropeBridge Prepares This</h4>
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
                  <h4>Mistakes Leading to Inquiries or Rejection</h4>
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
                  Admissions Officer Perspective
                </h5>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {currentTab.facultyInsight}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
