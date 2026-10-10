"use client";
import React from 'react';
import { CheckCircle2, Clock, Zap, ArrowRight, ShieldCheck, FileText, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const BundlePricing = () => {
  return (
    <section id="pricing" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Transparent Document Bundle Plans
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Save ₹3,997 compared to individual ordering while ensuring perfect cross-document synchronization.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <motion.div 
            className="neu-card p-6 sm:p-8 flex flex-col justify-between border-2 border-gray-200 bg-white relative hover:border-gray-300 transition-all shadow-sm"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-5 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                  Standard Bundle
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹13,999</span>
                  <span className="text-xs text-gray-500 font-bold">/ full 4-doc suite</span>
                </div>
                <p className="mt-2 text-xs font-bold text-gray-500 flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-germany-red" />
                  First drafts delivered in 3 to 5 working days
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Standard 2-Page Course-Specific SOP</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Two LORs</strong> (Academic, Professional, or mixed)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Europass Tabellarischer CV</strong> (German format, max 2 pages)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Synchronized drafting across all documents for consistent narrative</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Two rounds of student review per document via Google Docs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>100% Plagiarism-free and Turnitin-checked</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn px-6 py-4 text-sm font-extrabold text-germany-black hover:text-germany-red bg-gray-50 border border-gray-300 w-full flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>Select Standard Bundle — ₹13,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Express Plan (Popular) */}
          <motion.div 
            className="neu-card p-6 sm:p-8 flex flex-col justify-between border-2 border-germany-red bg-gradient-to-b from-white to-red-50/20 relative shadow-md"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-germany-red text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Fastest Turnaround</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-red-100 pb-5 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-germany-red">
                  Express Bundle (48 Hours)
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹18,999</span>
                  <span className="text-xs text-gray-500 font-bold">/ full 4-doc suite</span>
                </div>
                <p className="mt-2 text-xs font-bold text-germany-red flex items-center justify-center gap-1.5">
                  <Zap className="w-4 h-4 text-germany-red fill-current" />
                  First drafts delivered in 1 to 2 working days (48 hours)
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Same complete scope as Standard</strong> (SOP + 2 LORs + CV)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Guaranteed 48-hour first draft delivery</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Priority drafting queue assigned to Senior German Admissions Editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Expedited review cycle: revisions incorporated within 12 hours of feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Tailored for students facing imminent Uni-Assist or portal deadlines</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn-primary px-6 py-4 text-sm font-extrabold w-full flex items-center justify-center gap-2 text-center shadow-md cursor-pointer"
              >
                <span>Select Express Bundle — ₹18,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-900 font-bold text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Trusted by a community of 100,000+ students. Formatted for official German public university &amp; Uni-Assist admissions.</span>
        </div>
      </div>
    </section>
  );
};
