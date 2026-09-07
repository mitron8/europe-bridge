"use client";

import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const VisaSupportPlans = () => {
  return (
    <section id="section-pricing" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display leading-tight">
            Comprehensive <span className="text-germany-red">Visa Assistance Plans</span>
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Zero hidden fees. Full-scale assistance from certified German education counsellors with setup within 1 to 2 working days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Plan 1: Premium Visa Support */}
          <div className="neu-card p-8 bg-white flex flex-col justify-between space-y-6 shadow-[12px_12px_30px_rgba(210,205,195,0.6)] border border-[#EBE7E0]/80 relative hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="border-b border-[#EBE7E0] pb-4 space-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Standard Filing</span>
                <h3 className="font-display text-2xl font-bold text-germany-black">Premium Plan</h3>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-germany-black">₹14,999</span>
                  <span className="text-xs text-gray-500 font-bold">/ applicant</span>
                </div>
                <p className="text-xs text-gray-500 font-medium pt-1">
                  Setup initiated within 1–2 working days post-consultation.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Consular Services Portal (CSP) Registration Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Official Entry Form digital data entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>VIDEX Form generation with verified 2D barcode</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Document audit, PDF optimization &amp; upload support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>CSP email query &amp; document correction handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>VFS Global biometric appointment slot booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1:1 Visa Mock Interview preparation session</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated on-call visa counselor support</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/signup"
                className="w-full neu-btn py-3.5 px-6 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0] shadow-xs flex items-center justify-center gap-2 bg-white"
              >
                <span>Choose Premium Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Plan 2: Complete Plan (Highlighted) */}
          <div className="neu-card-dark p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden hover:-translate-y-1 transition-all border border-white/10">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-germany-red/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-germany-gold/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="border-b border-white/15 pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-germany-gold uppercase tracking-wider">Most Popular</span>
                  <span className="text-[10px] font-black uppercase text-white bg-germany-red px-2.5 py-0.5 rounded-full shadow-xs">
                    Recommended
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Complete Plan</h3>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹19,999</span>
                  <span className="text-xs text-gray-300 font-bold">/ applicant</span>
                </div>
                <p className="text-xs text-gray-300 font-medium pt-1">
                  End-to-end visa dossier, drafting, embassy compliance &amp; relocation guidance.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white font-bold">Everything included in Premium Plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Custom Letter of Motivation (LOM) drafted by German experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Official Visa Cover Letter drafting &amp; formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Embassy correction &amp; additional documents support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Priority WhatsApp &amp; on-call senior counselor access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complimentary: Education Loan &amp; Blocked Account assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free Outward Remittance &amp; Student Forex Travel Card setup</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="/signup"
                className="w-full neu-btn-primary py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Complete Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        <div className="text-center text-xs font-bold text-gray-500">
          <span>Trusted by thousands of international students across EuropeBridge partner universities.</span>
        </div>
      </div>
    </section>
  );
};
