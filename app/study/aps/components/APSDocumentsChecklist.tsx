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
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #2</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Required Documents Checklist</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Prepare both original documents and certified copies before courier submission to APS India in New Delhi.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/CV.png" 
            alt="APS Document Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: -6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Interactive Checklist Card */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h3 className="font-extrabold text-germany-black text-lg">APS Submission Document Bundle</h3>
              <p className="text-xs text-gray-500 font-medium">Click items to track your document assembly progress</p>
            </div>
            <div className="text-xs font-black text-germany-red bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
              {Object.values(checkedItems).filter(Boolean).length} of {apsDocs.length} Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apsDocs.map((doc) => {
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

        {/* Attestation & Formatting Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-germany-red" />
            <h4 className="text-xs font-black uppercase text-germany-black">Notary / Gazetted Attestation</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Photocopies of certificates must be attested by a registered notary public or a Class-I gazetted officer.
            </p>
          </div>

          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <Download className="w-5 h-5 text-germany-black" />
            <h4 className="text-xs font-black uppercase text-germany-black">Backlog Mark Sheets</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              If you had any re-evaluations or backlogs, include all supplementary exam attempt mark sheets in chronological order.
            </p>
          </div>

          <div className="neu-card p-5 space-y-2 border border-gray-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="text-xs font-black uppercase text-germany-black">Courier Address</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Send hard copies via registered post / Speed Post / Bluedart to the APS India Office in Chanakyapuri, New Delhi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
