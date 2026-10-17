"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckSquare, Square, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

export const APSDocumentsChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    aps1: true,
    aps2: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const apsDocs = [
    { id: 'aps1', title: "Printed & Signed APS Application Form", desc: "Downloaded from aps-india.de portal after completing online registration." },
    { id: 'aps2', title: "Proof of Payment (INR 18,000)", desc: "Payment receipt or bank transaction confirmation printout (CCAvenue or NEFT)." },
    { id: 'aps3', title: "Passport Copy (Photo & Address Pages)", desc: "Color copy of valid international passport (original passport not sent by post)." },
    { id: 'aps4', title: "2 Passport-Sized Biometric Photographs", desc: "35mm x 45mm light background biometric photos according to embassy rules." },
    { id: 'aps5', title: "10th Standard Mark Sheet & Board Certificate", desc: "Attested copy of 10th / Secondary School Certificate (SSLC / CBSE / ICSE)." },
    { id: 'aps6', title: "12th Standard Mark Sheet & Board Certificate", desc: "Attested copy of 12th / Higher Secondary Certificate detailing subject marks." },
    { id: 'aps7', title: "Bachelor's Degree or Provisional Certificate", desc: "Original degree certificate or official provisional degree certificate." },
    { id: 'aps8', title: "All Semester Transcripts / Mark Sheets", desc: "Individual mark sheets for every semester (1 to 8), including backlog mark sheets." },
    { id: 'aps9', title: "Master's Degree & Transcripts (If Applicable)", desc: "Required if applying for post-Master's / PhD or submitting Master's qualification." },
    { id: 'aps10', title: "Language Certificates (IELTS/TOEFL/TestDaF)", desc: "Copy of language score cards if available at the time of submission." },
  ];

  const readyCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = Math.round((readyCount / apsDocs.length) * 100);

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
              Section #2
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Required Documents <em className="lp-script text-[var(--lp-red)]">Checklist</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Prepare both original documents and certified copies before courier submission to APS India in New Delhi.
            </p>
          </div>
        </div>

        {/* Interactive Checklist Card */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-5 flex-wrap gap-4">
            <div>
              <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">APS Submission Document Bundle</h3>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-0.5">Click items to track your document assembly progress</p>
            </div>
            <div className="text-xs font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-3.5 py-1.5 rounded-full border border-[var(--lp-red)]/20 shadow-xs">
              {readyCount} of {apsDocs.length} Ready ({progressPct}%)
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#ece7dd] h-2 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[var(--lp-red)] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apsDocs.map((doc) => {
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

        {/* Attestation & Formatting Rules */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <ShieldCheck className="w-5 h-5 text-[var(--lp-red)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Notary / Gazetted Attestation</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Photocopies of certificates must be attested by a registered notary public or a Class-I gazetted officer.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <Download className="w-5 h-5 text-[var(--lp-text)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Backlog Mark Sheets</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              If you had any re-evaluations or backlogs, include all supplementary exam attempt mark sheets in chronological order.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-5 space-y-2 shadow-xs"
          >
            <AlertTriangle className="w-5 h-5 text-[var(--lp-gold)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text)]">Courier Address</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Send hard copies via registered post / Speed Post / Bluedart to the APS India Office in Chanakyapuri, New Delhi.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
