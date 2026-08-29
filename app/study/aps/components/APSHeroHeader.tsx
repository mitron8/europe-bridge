"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ShieldCheck, FileCheck2, Clock, Banknote } from 'lucide-react';

export const APSHeroHeader = () => {
  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">APS Verification Guide</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Official Verification Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                APS Verification Guide for <span className="text-germany-red">Germany</span>
              </h1>
              <motion.img 
                src="/doodles/visa approved.png" 
                alt="APS Visa Approved Doodle"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              The APS (<em className="italic font-bold">Akademische Prüfstelle</em>) certificate is mandatory for students from India, China, and Vietnam applying to German universities. Learn the step-by-step process, required documents, fee details, and interview preparation.
            </p>

            {/* At a Glance Box */}
            <div className="neu-card p-6 border-l-4 border-l-germany-red relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-germany-red">At a Glance Summary</span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated May 2026
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                APS verifies your academic documents before universities or visa officers process your application. Mandatory for students from India, China, and Vietnam. Verification takes <strong className="text-germany-black">2 to 3 months</strong>. The official fee is <strong className="text-germany-red">INR 18,000</strong>. Issued as a digitally-signed PDF certificate. Without APS, no German student visa will be issued.
              </p>
            </div>
          </div>

          {/* Key Facts Quick Grid */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-4 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-extrabold text-germany-black text-lg border-b border-gray-200 pb-3">
                APS Snapshot &amp; Quick Facts
              </h3>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-germany-red" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Official Fee</span>
                      <div className="text-sm font-extrabold text-germany-black">INR 18,000</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">CCAvenue / Transfer</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-800" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Processing Time</span>
                      <div className="text-sm font-extrabold text-germany-black">2 to 3 Months</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Apply Early</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Certificate Format</span>
                      <div className="text-sm font-extrabold text-germany-black">Digital Signed PDF</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">No Expiry</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Interview Duration</span>
                      <div className="text-sm font-extrabold text-germany-black">15–20 Minutes</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Personal / Online</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
