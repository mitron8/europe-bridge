"use client";
import React from 'react';
import { CheckCircle2, Clock, Zap, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const CoverLetterPricing = () => {
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
            Transparent Cover Letter Plans
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Select the turnaround speed that fits your upcoming VFS biometrics slot or university application cutoff.
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
                  Standard Order
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹999</span>
                  <span className="text-xs text-gray-500 font-bold">/ per Cover Letter</span>
                </div>
                <p className="mt-2 text-xs font-bold text-gray-500 flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-germany-red" />
                  First draft delivered in 3 working days
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Consulate-ready Cover Letter</strong> tailored for German Visa / VFS</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Educational &amp; professional background synopsis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Program, university, health insurance &amp; blocked account summary</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Comprehensive list of appended documents</strong> (dossier index)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Two rounds of student review (major + minor changes)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Delivered in printable PDF + editable Word document</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn px-6 py-4 text-sm font-extrabold text-germany-black hover:text-germany-red bg-gray-50 border border-gray-300 w-full flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>Select Standard Plan — ₹999</span>
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
                  Express Order (24 Hours)
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹1,499</span>
                  <span className="text-xs text-gray-500 font-bold">/ per Cover Letter</span>
                </div>
                <p className="mt-2 text-xs font-bold text-germany-red flex items-center justify-center gap-1.5">
                  <Zap className="w-4 h-4 text-germany-red fill-current" />
                  First draft delivered in 1 working day (24 hours)
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Same high content quality as Standard</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Guaranteed 24-hour turnaround</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Two rounds of expedited student review</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Priority drafting queue assigned to lead visa specialist</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Tailored for students with urgent VFS biometrics dates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Revisions incorporated within 12 hours of feedback</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn-primary px-6 py-4 text-sm font-extrabold w-full flex items-center justify-center gap-2 text-center shadow-md cursor-pointer"
              >
                <span>Select Express Plan — ₹1,499</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-900 font-bold text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Trusted by a community of 100,000+ students. Formatted for official German Consulate &amp; VFS submission.</span>
        </div>
      </div>
    </section>
  );
};
