"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2, FileCheck, Building2, Send } from 'lucide-react';

export const InsuranceHero = () => {
  return (
    <section id="overview" className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/study/application-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Health Insurance</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Settlement &amp; Relocation</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                German Health Insurance <span className="text-germany-red">Setup &amp; Support</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Expert guidance to help you understand, compare, and set up the right health insurance for your move to Germany. Public vs. private, students vs. workers, coverage from day one—all coordinated with your German university and the embassy.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a 
                href="#booking"
                className="neu-btn-primary px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Apply for Health Insurance</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#comparison"
                className="neu-btn px-6 py-3.5 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0]/80 shadow-2xs flex items-center gap-2 cursor-pointer bg-white"
              >
                <span>Compare Public vs Private</span>
                <ShieldCheck className="w-4 h-4 text-gray-500" />
              </a>
            </div>

            <div className="text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span><strong>€0 Advisory Fee</strong> • Free digital <strong>M10 certificate</strong> sent directly to your university</span>
            </div>

            {/* Highlights Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Requirement</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">100% Mandatory</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Student Rate</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">~€140–€150/mo</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Travel Cover</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">Free Incoming Cover</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Setup Speed</p>
                <p className="text-xs sm:text-sm font-extrabold text-germany-black mt-0.5">Within 24 Hours</p>
              </div>
            </div>
          </div>

          {/* Right: Claymorphic Insurance Card Preview */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-7 relative border-2 border-white/80 shadow-xl space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-black">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-germany-black">German Insurance Certificate</h3>
                    <p className="text-[11px] text-gray-500 font-semibold">Versicherungsbescheinigung (M10)</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Visa &amp; Enrollment Ready
                </span>
              </div>

              {/* Sample Certificate Display */}
              <div className="bg-gray-50/90 rounded-xl p-4 border border-gray-200/70 text-xs text-gray-700 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-gray-200">
                  <span className="font-bold text-gray-500 uppercase">Provider Scheme:</span>
                  <span className="font-extrabold text-germany-black">Statutory Public (GKV)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-gray-200">
                  <span className="font-bold text-gray-500 uppercase">M10 eXchange Status:</span>
                  <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Transmitted to University
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-gray-200">
                  <span className="font-bold text-gray-500 uppercase">Incoming Travel Cover:</span>
                  <span className="font-bold text-germany-black">Complimentary (Up to 92 days)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-gray-500 uppercase">Consular Acceptance:</span>
                  <span className="font-bold text-emerald-700">100% Guaranteed</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free consultation &amp; unbiased provider comparison</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct digital notification (SM10) sent to German university</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bilingual support in English &amp; regional languages</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No upfront payment required until arrival in Germany</span>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/80 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-amber-700 shrink-0" />
                <p className="text-[11px] font-bold text-amber-900 leading-snug">
                  Official partner coordination with TK (Techniker Krankenkasse), Barmer, AOK, and certified private insurers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
