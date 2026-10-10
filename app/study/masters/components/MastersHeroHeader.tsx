"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Award, CheckCircle2, Clock, Euro, BookOpen, Briefcase } from 'lucide-react';

export const MastersHeroHeader = () => {
  return (
    <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 px-3.5 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Master&apos;s in Germany</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-germany-red shrink-0" />
              <span>Complete 2026 Master&apos;s Strategy Guide</span>
            </div>

            <div className="flex items-center sm:items-start gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1 break-words">
                Master&apos;s Degree in <span className="text-germany-red">Germany</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
              Tuition-free higher education at world-class public universities. Discover 400+ English-taught Master&apos;s programs, prerequisite ECTS credit mapping, blocked account funding, and an 18-month direct career pathway into Europe&apos;s industrial powerhouse.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <Link
                href="/tools/admission-chance"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-germany-red hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(230,57,70,0.35)] transition-all hover:scale-[1.02]"
              >
                <span>Check My Admission Chances</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="#university-types"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-white hover:bg-neutral-50 text-germany-black border border-gray-200 font-extrabold text-xs sm:text-sm text-center shadow-xs transition-colors"
              >
                <span>Explore TU9 vs. UAS</span>
              </Link>
            </div>

            {/* Reassurance Micro-Badges */}
            {/* Reassurance Micro-Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs font-bold text-gray-600 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                0€ Tuition at Public Universities
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                400+ English-Taught Degrees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                18-Month Post-Study Job Visa
              </span>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="neu-card p-4 sm:p-6 bg-white space-y-3.5 sm:space-y-4 shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
              <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
                <h3 className="font-display text-base sm:text-lg text-germany-black flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-germany-red shrink-0" />
                  <span>Master&apos;s at a Glance (2026)</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0">
                  Official Data
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs font-bold text-gray-700">
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Average Tuition</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-red">€0 / Sem</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">Free at public unis</span>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Duration</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-black">2 Years</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">4 Sem (120 ECTS)</span>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Language</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-black">100% English</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">IELTS 6.5 / TOEFL</span>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Semester Fee</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-black">€150 – €350</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">Transit included</span>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Blocked Account</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-black">€11,904 / Yr</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">€992 / mo living</span>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0]/80 hover:border-germany-red/30 transition-colors">
                  <span className="block text-gray-500 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">Work Rights</span>
                  <span className="font-display text-sm sm:text-base font-black text-germany-black">140 Days</span>
                  <span className="block text-[9px] sm:text-[10px] text-gray-500 font-normal mt-0.5">Werkstudent jobs</span>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs leading-relaxed">
                  <strong>Indian, Chinese &amp; Vietnamese students:</strong> APS certification is mandatory prior to visa appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
