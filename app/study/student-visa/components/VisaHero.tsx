"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, FileCheck, CheckCircle2, Clock, Landmark, CreditCard } from 'lucide-react';

export const VisaHero = () => {
  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Student Visa Guide</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>National Visa (Type D) Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                German Student Visa <span className="text-germany-red">Application Guide</span>
              </h1>
              <motion.img 
                src="/doodles/visa approved.png" 
                alt="Visa Approved Doodle"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Full-scale support and step-by-step walkthrough for your Germany National Visa. From <strong>Consular Services Portal (CSP)</strong> registration and <strong>VIDEX</strong> document upload to <strong>VFS appointment booking</strong>, financial proof verification, and 1:1 visa interview prep.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link 
                href="/signup"
                className="neu-btn-primary px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Start Visa Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#section-checklist"
                className="neu-btn px-6 py-3.5 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0]/80 shadow-2xs flex items-center gap-2 cursor-pointer bg-white"
              >
                <FileCheck className="w-4 h-4 text-germany-red" />
                <span>Document Checklist</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-600 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Consular Services Portal (CSP) 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>99.2% Visa Approval Rate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1:1 Mock Interview Included</span>
              </span>
            </div>
          </div>

          {/* Right: Quick Facts Card */}
          <div className="lg:col-span-5">
            <div className="neu-card p-6 bg-white space-y-4 shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
              <h3 className="font-display text-lg text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
                <ShieldCheck className="w-5 h-5 text-germany-red" />
                <span>Visa Fast Facts & Requirements</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3.5 text-xs font-bold text-gray-700">
                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Landmark className="w-3 h-3 text-germany-red" />
                    <span>Visa Category</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">National Visa D</span>
                  <span className="text-[10px] text-gray-400 font-medium">Long-term study visa</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-germany-red" />
                    <span>Processing Time</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">4–6 Weeks</span>
                  <span className="text-[10px] text-gray-400 font-medium">Via digital CSP portal</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <CreditCard className="w-3 h-3 text-germany-red" />
                    <span>Blocked Account</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">€11,904 / Year</span>
                  <span className="text-[10px] text-gray-400 font-medium">€992 / month required</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-germany-red" />
                    <span>Embassy Fee</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">€75.00</span>
                  <span className="text-[10px] text-gray-400 font-medium">Payable at VFS appointment</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs font-semibold text-amber-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-ping" />
                <span><strong>2026 Update:</strong> Consular Services Portal (CSP) is now mandatory for applicants across India &amp; Asia.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
