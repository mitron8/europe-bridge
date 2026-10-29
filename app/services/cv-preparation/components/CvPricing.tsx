"use client";
import React from 'react';
import { CheckCircle2, Clock, Zap, ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const CvPricing = () => {
  return (
    <section id="pricing" className="py-14 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece7dd] text-[#16161a] border border-[#dcd7cb] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16161a] font-display">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-[#5e5b54] font-medium">
            Select the turnaround timeline that matches your university application, uni-assist deadline, or job submission.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <motion.div 
            className="p-6 sm:p-8 flex flex-col justify-between rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] relative hover:border-[#16161a] transition-all shadow-xs"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <div className="border-b border-[#e5e0d3] pb-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5e5b54]">
                  Standard CV Preparation
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#16161a] font-display">₹4,999</span>
                  <span className="text-xs text-[#787369] font-medium">/ per CV</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5e5b54] flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#16161a]" />
                  First draft delivered in 2 to 3 working days
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-[#5e5b54] font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Full Tabellarischer Lebenslauf</strong> according to German academic standards</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Lückenlos timeline structuring</strong> with zero unexplained gaps</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Coursework, Bachelor thesis, and German grade (Bavarian Formula) integration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Categorized CEFR languages (A1-C2) and technical toolstack classification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Dual Delivery</strong>: Ready-to-upload PDF + editable Word DOCX</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>2 student review rounds included for final adjustments</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="px-6 py-4 text-sm font-bold text-[#16161a] hover:text-[#b4232f] bg-white border border-[#e5e0d3] hover:border-[#16161a] rounded-2xl w-full flex items-center justify-center gap-2 text-center transition-all cursor-pointer shadow-xs"
              >
                <span>Select Standard CV — ₹4,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Express Plan (Popular) */}
          <motion.div 
            className="p-6 sm:p-8 flex flex-col justify-between rounded-3xl border-2 border-[#16161a] bg-white relative shadow-md"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#16161a] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Fastest Turnaround</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-[#e5e0d3] pb-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b4232f]">
                  Express CV Order (24 Hours)
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#16161a] font-display">₹5,999</span>
                  <span className="text-xs text-[#787369] font-medium">/ per CV</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#b4232f] flex items-center justify-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#b4232f] fill-current" />
                  First draft delivered in 1 working day (24 hours)
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-[#5e5b54] font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Everything included in Standard CV Plan</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Guaranteed 24-hour draft turnaround</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Priority drafting queue assigned directly to lead Germany admissions editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Fast-track review cycle: revisions incorporated within 12 hours of feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Ideal for imminent uni-assist, VPD, or German visa consulate appointments</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn-primary px-6 py-4 text-sm font-bold w-full flex items-center justify-center gap-2 text-center shadow-xs cursor-pointer"
              >
                <span>Select Express CV — ₹5,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 bg-[#faf8f3] rounded-2xl border border-[#e5e0d3] max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-[#16161a] font-semibold text-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#b4232f] shrink-0" />
          <span>One-time fee. Delivered in PDF and editable Word formats, with revisions included. Trusted by 100,000+ students.</span>
        </div>
      </div>
    </section>
  );
};
