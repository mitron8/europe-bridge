"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';

export const WhatIsAPS = () => {
  return (
    <section id="section-what-is-aps" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-germany-red" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #1</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">What is APS &amp; Why is it Required?</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                The <em className="italic font-bold">Akademische Prüfstelle (APS)</em> is an official verification wing of the German Embassy.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/thinking.png" 
            alt="APS Thinking Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Core Purpose Overview */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            APS was established by the German Foreign Office and the DAAD to authenticate higher education certificates, mark sheets, and academic credentials before students submit university or visa applications. It ensures that degrees earned abroad are genuine and verified at the source university level.
          </p>

          {/* Mandatory Countries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Mandatory Region</span>
              <h3 className="font-extrabold text-germany-black text-base">APS India (New Delhi)</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Required for all Indian students applying for Bachelor's, Master's, or PhD programs in Germany.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
              <span className="text-xs font-black uppercase text-red-900 tracking-wider">Mandatory Region</span>
              <h3 className="font-extrabold text-germany-black text-base">APS China (Beijing)</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Required for Chinese applicants; includes document verification and potential written evaluation tests.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <span className="text-xs font-black uppercase text-blue-900 tracking-wider">Mandatory Region</span>
              <h3 className="font-extrabold text-germany-black text-base">APS Vietnam (Hanoi)</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Required for Vietnamese applicants pursuing undergraduate or postgraduate studies in Germany.
              </p>
            </div>
          </div>
        </div>

        {/* 15 March 2026 Rule Alert */}
        <div className="neu-card p-6 border-l-4 border-l-germany-red bg-red-50/30 space-y-3">
          <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm uppercase tracking-wide">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>March 15, 2026 Update: 70% Class XII Rule for Bachelor's</span>
          </div>
          <p className="text-xs text-gray-700 font-medium leading-relaxed">
            APS India enforces a strict threshold for Bachelor's applicants: your Class XII aggregate must be at least <strong>70%</strong> to be evaluated for direct undergraduate entry. If your Class XII score is below 70%, your standard pathway is a 1-year preparatory foundation year before enrolling in a degree program. Master's and PhD applicants are unaffected by this 70% rule.
          </p>
        </div>

        {/* Exclusions & Exemptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Distance Ed Exclusion */}
          <div className="neu-card p-6 space-y-3 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
              <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Distance-Education Exclusion</span>
            </div>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              APS India does not verify distance-education or correspondence degrees for 14 regulated disciplines (including medicine, pharmacy, law, nursing, teaching, MPhil, and PhD). Correspondence degrees in these fields are not accepted for German admission.
            </p>
          </div>

          {/* Who is Exempt? */}
          <div className="neu-card p-6 space-y-3 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Who is Exempt from APS?</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Direct Professor PhD Invitation:</strong> PhD candidates with an official invitation letter from a German doctoral advisor.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>DAAD &amp; Govt Scholars:</strong> Students holding DAAD or official bilateral government scholarships.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Other Countries:</strong> Students from Pakistan, Bangladesh, Nepal, Sri Lanka do not need APS.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
