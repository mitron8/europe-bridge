"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckSquare, Square, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

export const RequiredDocuments = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    doc1: true,
    doc2: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const coreDocs = [
    { id: 'doc1', title: "Degree Certificate / Provisional Degree", desc: "Original degree certificate or provisional certificate with apostille/legalization." },
    { id: 'doc2', title: "Official Academic Transcripts", desc: "All semester mark sheets detailing subjects, marks obtained, and credit breakdown." },
    { id: 'doc3', title: "Language Proficiency Score Card", desc: "Official score report (IELTS Academic, TOEFL, TestDaF, or Goethe certificate)." },
    { id: 'doc4', title: "Valid International Passport", desc: "Color copy of passport photo page & address page (valid for at least 1 year)." },
    { id: 'doc5', title: "Tabular Academic CV (Europass / Standard format)", desc: "Reverse-chronological CV detailing education, projects, skills, and work history without gaps." },
    { id: 'doc6', title: "Passport Biometric Photographs", desc: "35mm x 45mm light background biometric photos according to German embassy standards." },
  ];

  const additionalDocs = [
    { title: "Statement of Purpose (SOP) / Motivation Letter", badge: "Critical", desc: "1–2 page essay detailing why you chose this specific program, university, and career path. Often the deciding factor for admission." },
    { title: "Letters of Recommendation (LOR)", badge: "1–2 Letters", desc: "Academic references from professors or workplace supervisors printed on official institutional letterhead with stamp/signature." },
    { title: "APS Certificate (India, China, Vietnam)", badge: "Mandatory", desc: "Verification certificate issued by the Academic Evaluation Centre (APS) confirming degree authenticity." },
    { title: "GRE / GMAT Test Scores", badge: "Optional / Specific", desc: "GMAT for top business programs; GRE for select technical programs like TU Munich / RWTH Aachen." },
    { title: "Course Curriculum / Syllabus", badge: "If Requested", desc: "Official module catalog from your Bachelor's university mapping subject ECTS credits for prerequisite matching." },
  ];

  return (
    <section id="section-documents" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <FileText className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #3</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Required Documents Checklist</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                German university admissions are strictly document-driven. Incomplete applications are rejected automatically without review.
              </p>
            </div>
          </div>
        </div>

        {/* Core Documents Checklist */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h3 className="font-extrabold text-germany-black text-lg">Core Document Bundle (Mandatory for All)</h3>
              <p className="text-xs text-gray-500 font-medium">Click items to track your preparation status</p>
            </div>
            <div className="text-xs font-black text-germany-red bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
              {Object.values(checkedItems).filter(Boolean).length} of {coreDocs.length} Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreDocs.map((doc) => {
              const isChecked = !!checkedItems[doc.id];
              return (
                <div 
                  key={doc.id}
                  onClick={() => toggleCheck(doc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked 
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-sm' 
                      : 'bg-gray-50/80 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-extrabold ${isChecked ? 'text-emerald-950 line-through' : 'text-germany-black'}`}>
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{doc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qualitative & Additional Requirements */}
        <div className="neu-card p-6 sm:p-8 space-y-6 border-l-4 border-l-germany-gold">
          <h3 className="font-extrabold text-germany-black text-lg">Qualitative &amp; Country-Specific Requirements</h3>
          <div className="space-y-4">
            {additionalDocs.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-germany-black text-sm">{doc.title}</span>
                  <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    {doc.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formatting & Scan Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-germany-red" />
            <h4 className="text-xs font-black uppercase text-germany-black">Official Translations</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Any document not issued in English or German must be translated by an officially sworn translator with seal &amp; stamp.
            </p>
          </div>

          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <Download className="w-5 h-5 text-germany-black" />
            <h4 className="text-xs font-black uppercase text-germany-black">PDF Scan Limits</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Keep digital PDF scans crisp, clear, color-scanned, and under 5 MB per file for uni-assist and university portal uploads.
            </p>
          </div>

          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="text-xs font-black uppercase text-germany-black">Notarization Age</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Some universities (e.g., LMU Munich) require certified true copies notarized within the last 6 months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
