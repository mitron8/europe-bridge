"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';

export const MotivationPricing = () => {
  return (
    <section id="section-pricing" className="py-16 px-6 lg:px-12 bg-white/50 border-t border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Zero Hidden Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Simple, Transparent <span className="text-germany-red">Pricing</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Invest in a flawless consular document that protects your university admission and prevents costly visa rejections or rescheduling delays.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Standard Order */}
          <div className="neu-card p-6 sm:p-8 bg-white border-2 border-gray-200/90 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-5 space-y-1 text-center">
                <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Standard Order</p>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-germany-black">₹3,999</span>
                  <span className="text-xs font-bold text-gray-500">all inclusive</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full mt-2">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <span>First draft in 3 working days</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Consulate-ready LOM</strong> written completely from scratch</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Two rounds</strong> of student reviews &amp; revisions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Plagiarism-free</strong>, profile &amp; module specific</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Delivered as a <strong>Google Doc</strong> for easy commenting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Includes German Mission salutation &amp; § 16b citation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/signup?service=lom&plan=standard"
                className="w-full neu-btn py-3.5 px-6 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-gray-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer bg-gray-50 hover:bg-white"
              >
                <span>Order Standard - ₹3,999</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Express Order (Dark / Premium) */}
          <div className="neu-card-dark p-6 sm:p-8 relative border-2 border-germany-red shadow-2xl flex flex-col justify-between space-y-6 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-germany-red/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="border-b border-white/15 pb-5 space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-germany-red text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Express Fast-Track
                  </span>
                </div>
                <p className="text-xs font-black text-amber-300 uppercase tracking-wider">Express Order</p>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">₹4,999</span>
                  <span className="text-xs font-bold text-gray-300">all inclusive</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-200 bg-white/10 px-3 py-1 rounded-full mt-2">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>First draft in 1 working day (24 hrs)</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white font-bold">Same premium consular quality as Standard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-amber-200 font-semibold">Compressed 24-hour turnaround SLA</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Two rounds</strong> of priority student reviews</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Assigned to <strong>Senior Visa Editorial Lead</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Recommended for students with approaching <strong>VFS appointment dates</strong></span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <Link
                href="/signup?service=lom&plan=express"
                className="w-full neu-btn-primary py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Express - ₹4,999</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Endorsement */}
        <div className="text-center max-w-xl mx-auto text-xs font-bold text-gray-500">
          Trusted by over 10,000+ Indian &amp; international students admitted to top German universities including TU Munich, RWTH Aachen, TU Berlin, and University of Stuttgart.
        </div>
      </div>
    </section>
  );
};
