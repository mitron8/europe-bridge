"use client";
import React from 'react';
import { CheckCircle2, Clock, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const SopPricing = () => {
  return (
    <section id="pricing" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece7dd] text-[#16161a] border border-[#dcd7cb] text-xs font-bold uppercase tracking-wider">
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16161a] font-display">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-[#5e5b54] font-medium">
            Select the turnaround timeline that matches your university or Uni-Assist deadline.
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
                  Standard Order
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#16161a] font-display">₹4,999</span>
                  <span className="text-xs text-[#787369] font-medium">/ per SOP</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5e5b54] flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#16161a]" />
                  First draft delivered in 3 working days
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 text-xs sm:text-sm text-[#5e5b54] font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Course &amp; university-specific SOP</strong> crafted from your background</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">2 full rounds of student review</strong> via Google Docs comments</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>100% Plagiarism-free and human written (no ChatGPT/AI templates)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Direct mapping to German curriculum modules and faculty labs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Final delivery in formatted PDF &amp; editable Word document</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="px-6 py-4 text-sm font-bold text-[#16161a] hover:text-[#b4232f] bg-white border border-[#e5e0d3] hover:border-[#16161a] rounded-2xl w-full flex items-center justify-center gap-2 text-center transition-all cursor-pointer shadow-xs"
              >
                <span>Order Standard Plan — ₹4,999</span>
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
              <span>Fastest Delivery</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-[#e5e0d3] pb-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b4232f]">
                  Express Order (24 Hours)
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#16161a] font-display">₹5,999</span>
                  <span className="text-xs text-[#787369] font-medium">/ per SOP</span>
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
                  <span><strong className="text-[#16161a] font-bold">Everything included in Standard Order</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#16161a] font-bold">Guaranteed 24-hour draft turnaround</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Priority writing queue assigned to lead Germany admissions editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Fast-track review rounds completed within 12 hours of student feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0 mt-0.5" />
                  <span>Ideal for imminent Uni-Assist, VPD, or scholarship deadlines</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn-primary px-6 py-4 text-sm font-bold w-full flex items-center justify-center gap-2 text-center shadow-xs cursor-pointer"
              >
                <span>Order Express Plan — ₹5,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Community Proof */}
        <p className="text-center text-xs font-semibold text-[#787369] max-w-md mx-auto pt-2">
          Accepted by top German universities including TUM, RWTH Aachen, KIT, Uni Stuttgart, and FAU Erlangen.
        </p>
      </div>
    </section>
  );
};
