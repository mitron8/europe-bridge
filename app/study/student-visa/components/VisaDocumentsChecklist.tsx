"use client";

import React, { useState } from 'react';
import { 
  FileCheck, 
  GraduationCap, 
  CreditCard, 
  FileBadge, 
  HeartHandshake, 
  CheckCircle2, 
  AlertTriangle,
  Download
} from 'lucide-react';

export const VisaDocumentsChecklist = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'finance' | 'identity' | 'insurance'>('academic');

  const categories = [
    { id: 'academic', label: 'Academic & APS', icon: GraduationCap },
    { id: 'finance', label: 'Financial Proof (€11,904)', icon: CreditCard },
    { id: 'identity', label: 'Identity & Passport', icon: FileBadge },
    { id: 'insurance', label: 'Insurance & Motivation', icon: HeartHandshake },
  ] as const;

  const documentData = {
    academic: [
      { name: "University Admission Letter (Zulassungsbescheid)", note: "Unconditional offer letter or conditional admission for Master's/Bachelor's." },
      { name: "Original APS Certificate", note: "Mandatory verification certificate for students from India, China, and Vietnam." },
      { name: "Degree Certificates & Transcripts", note: "Originals + 2 sets of notarized photocopies of Bachelor's degree and semester mark sheets." },
      { name: "Language Proficiency Certificate", note: "Official IELTS (6.5+ recommended), TOEFL iBT, or TestDaF/Goethe-Zertifikat as per university course guidelines." },
      { name: "Tabular Curriculum Vitae", note: "Up-to-date CV in standard European format (Europass) without unexplained academic gaps." },
    ],
    finance: [
      { name: "Blocked Account Confirmation ('06 Confirmation')", note: "Official confirmation proving €11,904 (€992/month for 12 months) in an approved provider (Expatrio, Fintiba, Coracle)." },
      { name: "Education Loan Sanction Letter (Optional)", note: "From an authorized NBFC or scheduled commercial bank if financing living or tuition costs." },
      { name: "Scholarship Award Letter (If Applicable)", note: "Official DAAD, Erasmus, or foundation award letter stating monthly stipend amounts." },
      { name: "Sponsor's Formal Obligation (Verpflichtungserklärung)", note: "Only required if an eligible relative residing in Germany sponsors your living costs." },
    ],
    identity: [
      { name: "Valid National Passport", note: "Must have at least 2 blank pages and be valid for at least 12 months beyond your planned departure date." },
      { name: "3 Biometric Passport Photographs", note: "Recent (less than 6 months old), 35mm x 45mm, white background, neutral expression adhering to German consular norms." },
      { name: "Completed VIDEX Application Form", note: "Two printed copies of the finalized VIDEX form signed on all designated pages with 2D barcode." },
      { name: "VFS Appointment Letter & Confirmation", note: "Official appointment confirmation printout issued by VFS Global." },
    ],
    insurance: [
      { name: "Statutory German Student Health Insurance (GKV)", note: "Electronic transmission confirmation from a German public sickness fund (Techniker Krankenkasse - TK, AOK, Barmer)." },
      { name: "Incoming Travel Health Insurance", note: "Coverage of min €30,000 covering your arrival date until official university enrollment date." },
      { name: "Statement of Purpose / Motivation Letter", note: "Detailed 1–2 page letter explaining why you chose Germany, the specific university syllabus, and your career trajectory." },
      { name: "Declaration on True & Complete Information", note: "Standard signed Section 54/55 Residence Act declaration form." },
    ],
  };

  return (
    <section id="section-checklist" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>2026 Consular Checklist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display leading-tight">
            Required Documents for <span className="text-germany-red">German Student Visa</span>
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Consulates require two complete identical sets of documents arranged in a precise order. Explore the mandatory checklist below.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-germany-black text-white shadow-md scale-105 border border-germany-black'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-[#EBE7E0]/80 shadow-2xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-germany-gold' : 'text-gray-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Checklist Card */}
        <div className="neu-card p-6 sm:p-10 bg-white space-y-6 shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-4">
            <div>
              <h3 className="font-display text-xl text-germany-black font-bold">
                {categories.find(c => c.id === activeTab)?.label}
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                Ensure all documents are in English or German with official sworn translations if needed.
              </p>
            </div>
            <span className="text-xs font-black uppercase text-germany-red bg-red-50 px-3 py-1 rounded-full border border-red-200">
              2 Copies Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentData[activeTab].map((doc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs space-y-2 hover:border-germany-red/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-germany-black leading-snug">
                      {doc.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium pl-6 leading-relaxed">
                    {doc.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3 text-xs text-gray-700">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-germany-black block">Important Assembly Instruction:</span>
              <p className="text-gray-600 font-medium leading-relaxed">
                Do not staple any original or photocopy documents. Consulates require documents in loose sheets organized in two distinct folders with separate paper clips. EuropeBridge provides a pre-assembled document dossier template.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
