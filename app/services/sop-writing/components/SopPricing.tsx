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
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Select the turnaround timeline that matches your university or Uni-Assist deadline.
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
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹4,999</span>
                  <span className="text-xs text-gray-500 font-bold">/ per SOP</span>
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
                  <span><strong className="text-germany-black font-bold">Course &amp; university-specific SOP</strong> crafted from your background</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">2 full rounds of student review</strong> via Google Docs comments</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>100% Plagiarism-free and human written (no ChatGPT/AI templates)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Direct mapping to German curriculum modules and faculty labs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Final delivery in formatted PDF &amp; editable Word document</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn px-6 py-4 text-sm font-extrabold text-germany-black hover:text-germany-red bg-gray-50 border border-gray-300 w-full flex items-center justify-center gap-2 text-center"
              >
                <span>Order Standard Plan — ₹4,999</span>
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
              <span>Fastest Delivery</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-red-100 pb-5 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-germany-red">
                  Express Order (24 Hours)
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹5,999</span>
                  <span className="text-xs text-gray-500 font-bold">/ per SOP</span>
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
                  <span><strong className="text-germany-black font-bold">Everything included in Standard Order</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span><strong className="text-germany-black font-bold">Guaranteed 24-hour draft turnaround</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Priority writing queue assigned to lead Germany admissions editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Fast-track review rounds completed within 12 hours of student feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
                  <span>Ideal for imminent Uni-Assist, VPD, or scholarship deadlines</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a 
                href="#booking"
                className="neu-btn-primary px-6 py-4 text-sm font-extrabold w-full flex items-center justify-center gap-2 text-center shadow-md"
              >
                <span>Order Express Plan — ₹5,999</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Community Proof */}
        <p className="text-center text-xs font-bold text-gray-500 max-w-md mx-auto pt-2">
          Accepted by top German universities including TUM, RWTH Aachen, KIT, Uni Stuttgart, and FAU Erlangen.
        </p>
      </div>
    </section>
  );
};
