"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Landmark, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Award, 
  Layers, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

interface Stage {
  id: string;
  stepNumber: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  keyRequirements: string[];
  europeBridgeRole: string[];
  criticalTip: string;
}

const STAGES: Stage[] = [
  {
    id: 'csp-videx',
    stepNumber: '01',
    label: 'CSP Portal & VIDEX',
    badge: 'Digital Filing',
    icon: FileText,
    title: 'Consular Services Portal (CSP) & Digital VIDEX',
    description: 'The German Federal Foreign Office (Auswärtiges Amt) now requires all Indian student visa applicants to submit their application digitally through the Consular Services Portal before booking VFS.',
    keyRequirements: [
      'Digital entry form creation on the official Auswärtiges Amt portal',
      'Accurate VIDEX long-term visa questionnaire filled with university and address details',
      'Upload of preliminary scanned documents: Admission letter, APS certificate, degree certificates',
      'Preliminary digital verification and clearance email from the German consular team'
    ],
    europeBridgeRole: [
      'We register and structure your CSP portal profile with zero data discrepancies',
      'Review and verify all uploaded PDFs against strict German embassy resolution and size guidelines',
      'Draft and input accurate German university faculty contact and accommodation addresses',
      'Respond immediately to any CSP correction requests from German visa officers'
    ],
    criticalTip: 'Even a minor typographical mismatch between your passport name and your VIDEX form can lead to CSP rejection or require re-submitting from scratch.'
  },
  {
    id: 'blocked-health',
    stepNumber: '02',
    label: 'Blocked Account & Insurance',
    badge: 'Financial Proof',
    icon: Landmark,
    title: 'Blocked Account (€11,904) & Statutory Health Insurance',
    description: 'Demonstrating sufficient financial resources to support your first year of living in Germany, along with comprehensive German statutory healthcare coverage.',
    keyRequirements: [
      'Official Sperrkonto (Blocked Account) confirmation letter of €11,904 / year',
      'Confirmation of German statutory health insurance (TK, Barmer, or DAK) from matriculation day',
      'Incoming travel health insurance covering your journey until semester commencement',
      'Tuition fee payment receipt (if attending a university in Baden-Württemberg or private university)'
    ],
    europeBridgeRole: [
      'Direct assistance with setup through authorized providers (Expatrio, Fintiba, Coracle)',
      'Verification of the "06 Blocked Amount Confirmation" PDF required for CSP and VFS',
      'Free statutory health insurance enrollment with zero upfront fee until arrival in Germany',
      'Guidance on outward remittance and tax-compliant education loan disbursement'
    ],
    criticalTip: 'Ensure your blocked account confirmation clearly shows your name exactly as per your passport. Provisional remittance receipts are not accepted by the embassy.'
  },
  {
    id: 'vfs-biometrics',
    stepNumber: '03',
    label: 'VFS Slot & Dossier',
    badge: 'Physical Biometrics',
    icon: Calendar,
    title: 'VFS Biometrics Slot & Two-Set Document Dossier',
    description: 'Once your CSP application is cleared, you are invited to book a physical appointment at your designated German VFS jurisdiction for fingerprint biometrics and original document verification.',
    keyRequirements: [
      'Jurisdiction verification: Delhi, Mumbai, Bengaluru, Chennai, Kolkata, or Hyderabad (based on 6 months residence)',
      'Official VFS appointment confirmation letter and payment receipt',
      'Two identical sets of application dossiers printed on clean A4 paper in exact embassy order',
      'Valid passport (minimum 12 months validity, at least 3 blank pages) and biometric photos'
    ],
    europeBridgeRole: [
      'Monitoring and booking VFS appointment slots during high-demand peak intake windows',
      'Personalized document arrangement checklist matching your specific German consulate jurisdiction',
      'Verification of biometric photograph specifications (35x45mm, light gray background, 80% face)',
      'Pre-submission audit of both physical dossier sets to ensure zero missing papers'
    ],
    criticalTip: 'Do not staple any documents in your German visa dossier; the embassy requires all sheets loose and held solely with paper clips.'
  },
  {
    id: 'interview-prep',
    stepNumber: '04',
    label: '1:1 Interview Coaching',
    badge: 'Visa Stamping',
    icon: Users,
    title: '1:1 Consular Mock Interview & Visa Stamping',
    description: 'Face the visa officer or VFS desk with total confidence. Master your study motivations, German university modules, and post-graduation career plan.',
    keyRequirements: [
      'Deep familiarity with your Master’s/Bachelor’s curriculum, elective tracks, and professors',
      'Clear articulation of why Germany and why your chosen university was selected over others',
      'Coherent explanation of funding sources, blocked account, and family background',
      'Understanding of visa validity (usually issued for 3, 6, or 12 months, converted to residence permit in Germany)'
    ],
    europeBridgeRole: [
      '1:1 mock interview with our senior German visa consultant simulating actual consular questions',
      'Preparation for tricky questions: study gaps, career switch rationale, and German language level',
      'Embassy tracking and handling of any additional verification inquiries (Zusatzfragebogen)',
      'Arrival guidance on city registration (Anmeldung) and residence permit appointment'
    ],
    criticalTip: 'Never say you plan to settle permanently in Germany during the visa interview. German visa officers need to see clear intent to complete your studies and advance your career.'
  }
];

export const VisaRoadmap = () => {
  const [activeStageId, setActiveStageId] = useState<string>('csp-videx');

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];
  const IconComponent = currentStage.icon;

  return (
    <section id="roadmap" className="py-16 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The 2026 German Visa Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            How The German Student Visa <span className="text-germany-red">Process Works</span>
          </h2>
          <p className="text-base text-gray-600 font-medium">
            Germany now uses a hybrid digital-physical system. Explore each stage of the Consular Services Portal (CSP) and VFS Global appointment pipeline.
          </p>
        </div>

        {/* Stage Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STAGES.map((stage) => {
            const StageIcon = stage.icon;
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer ${
                  isActive
                    ? 'border-germany-red bg-red-50/70 shadow-md scale-102'
                    : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-germany-red text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    Stage {stage.stepNumber}
                  </span>
                  <StageIcon className={`w-4 h-4 ${isActive ? 'text-germany-red' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-germany-black">
                    {stage.label}
                  </h4>
                  <span className="text-[10px] font-bold uppercase text-gray-500">
                    {stage.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="neu-card p-6 sm:p-10 border border-gray-100 space-y-8"
          >
            {/* Stage Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center shrink-0">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-germany-red tracking-wider">
                    Stage {currentStage.stepNumber} of 04
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-germany-black">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {currentStage.description}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold shrink-0 self-start md:self-center">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Expert Supervised</span>
              </div>
            </div>

            {/* Key Requirements vs How EuropeBridge Helps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Requirements */}
              <div className="p-6 bg-gray-50/80 border border-gray-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-extrabold text-base">
                  <Layers className="w-5 h-5 text-gray-700" />
                  <h4>Official Embassy Requirements</h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                  {currentStage.keyRequirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Do */}
              <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>How EuropeBridge Handles This For You</h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-emerald-950 font-medium">
                  {currentStage.europeBridgeRole.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Critical Consular Tip */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Consular Officer Insider Insight
                </h5>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {currentStage.criticalTip}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
