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

  const readyCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = Math.round((readyCount / coreDocs.length) * 100);

  return (
    <section id="section-documents" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <FileText className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #3
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Required Documents <em className="lp-script text-[var(--lp-red)]">Checklist</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              German university admissions are strictly document-driven. Incomplete applications are rejected automatically without review.
            </p>
          </div>
        </div>

        {/* Core Documents Checklist */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-5 flex-wrap gap-4">
            <div>
              <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Core Document Bundle (Mandatory for All)</h3>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-0.5">Click items to track your preparation status</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-3.5 py-1.5 rounded-full border border-[var(--lp-red)]/20 shadow-xs">
                {readyCount} of {coreDocs.length} Ready ({progressPct}%)
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#ece7dd] h-2 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[var(--lp-red)] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreDocs.map((doc) => {
              const isChecked = !!checkedItems[doc.id];
              return (
                <motion.div 
                  key={doc.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleCheck(doc.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked 
                      ? 'bg-white border-[var(--lp-text)]/40 shadow-xs' 
                      : 'bg-[#ece7dd]/40 border-[#e2ddd3] hover:border-[#16161a]/30'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[var(--lp-red)]" />
                    ) : (
                      <Square className="w-5 h-5 text-[var(--lp-faint)]" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm sm:text-[15px] font-semibold ${isChecked ? 'text-[var(--lp-text)] line-through opacity-70' : 'text-[var(--lp-text)]'}`}>
                      {doc.title}
                    </h4>
                    <p className="text-xs text-[var(--lp-muted)] mt-1 leading-relaxed">{doc.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Qualitative & Additional Requirements */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[var(--lp-text)] bg-[#ece7dd] border border-[#ded8cb]">
              Additional Dossier Components
            </span>
          </div>
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Qualitative &amp; Country-Specific Requirements</h3>
          <div className="space-y-3">
            {additionalDocs.map((doc, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--lp-text)] text-sm sm:text-[15px]">{doc.title}</span>
                  <span className="text-[10.5px] font-semibold text-[var(--lp-text)] bg-[var(--lp-gold-soft)]/60 px-2.5 py-0.5 rounded-full border border-[var(--lp-gold)]/40 shrink-0">
                    {doc.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">{doc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formatting & Scan Rules */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <ShieldCheck className="w-5 h-5 text-[var(--lp-red)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Official Translations</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Any document not issued in English or German must be translated by an officially sworn translator with seal &amp; stamp.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <Download className="w-5 h-5 text-[var(--lp-text)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">PDF Scan Limits</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Keep digital PDF scans crisp, clear, color-scanned, and under 5 MB per file for uni-assist and university portal uploads.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <AlertTriangle className="w-5 h-5 text-[var(--lp-gold)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Notarization Age</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Some universities (e.g., LMU Munich) require certified true copies notarized within the last 6 months.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
