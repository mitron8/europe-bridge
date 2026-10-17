"use client";

import React, { useState } from 'react';
import { 
  FileCheck, 
  GraduationCap, 
  CreditCard, 
  FileBadge, 
  HeartHandshake, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const VisaDocumentsChecklist = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'finance' | 'identity' | 'insurance'>('academic');

  const categories = [
    { id: 'academic', label: 'Academic & APS', icon: GraduationCap },
    { id: 'finance', label: 'Financial Proof (€11,904)', icon: CreditCard },
    { id: 'identity', label: 'Identity & Passport', icon: FileBadge },
    { id: 'insurance', label: 'Insurance & SOP', icon: HeartHandshake },
  ] as const;

  const documentData = {
    academic: [
      { name: "University Admission Letter (Zulassungsbescheid)", note: "Unconditional offer letter or conditional admission for Master's/Bachelor's." },
      { name: "Original APS Certificate", note: "Mandatory verification certificate for students from India, China, and Vietnam." },
      { name: "Degree Certificates & Transcripts", note: "Originals + 2 sets of photocopies of Bachelor's degree and semester mark sheets." },
      { name: "Language Proficiency Certificate", note: "Official IELTS (6.5+), TOEFL iBT, or TestDaF/Goethe-Zertifikat as per university course guidelines." },
      { name: "Tabular Curriculum Vitae", note: "Up-to-date CV in standard European format (Europass) without unexplained academic gaps." },
    ],
    finance: [
      { name: "Blocked Account Confirmation ('06 Confirmation')", note: "Official confirmation proving €11,904 in an approved provider (Expatrio, Fintiba, Coracle)." },
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
      { name: "Statutory German Student Health Insurance (GKV)", note: "Electronic transmission confirmation from a German public sickness fund (TK, AOK, Barmer)." },
      { name: "Incoming Travel Health Insurance", note: "Coverage of min €30,000 covering your arrival date until official university enrollment date." },
      { name: "Statement of Purpose / Motivation Letter", note: "Detailed 1–2 page letter explaining why you chose Germany, the specific curriculum, and career goals." },
      { name: "Declaration on True & Complete Information", note: "Standard signed Section 54/55 Residence Act declaration form." },
    ],
  };

  return (
    <section id="section-checklist" className="scroll-mt-32 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Consular Checklist 2026
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Required Documents for <em className="italic text-[var(--lp-red)] font-serif">German Student Visa</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          German consulates require two complete identical sets of documents arranged in a precise sequence.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-xs'
                  : 'bg-[#faf8f3] text-[var(--lp-muted)] hover:bg-[#eae5db] hover:text-[var(--lp-text)] border-[#e5e0d3]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Checklist Card */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-4">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-ink)]">
              {categories.find(c => c.id === activeTab)?.label}
            </h3>
            <p className="text-xs text-[var(--lp-muted)] mt-0.5">
              Ensure all certificates are in English or German with sworn translation if needed.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2.5 py-1 rounded-full border border-[var(--lp-red)]/20">
            2 Sets Required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentData[activeTab].map((doc, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--lp-text)] leading-snug">
                  {doc.name}
                </span>
              </div>
              <p className="text-xs text-[var(--lp-muted)] pl-5.5 leading-relaxed">
                {doc.note}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] flex items-start gap-3 text-xs text-[var(--lp-muted)]">
          <AlertTriangle className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[var(--lp-text)]">Assembly Instruction:</strong> Do not staple documents. German consulates require loose sheets assembled into two distinct folders held by paper clips.
          </p>
        </div>
      </div>
    </section>
  );
};
