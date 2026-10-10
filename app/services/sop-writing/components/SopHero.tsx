"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Clock, ArrowRight, ShieldCheck, CheckCircle2, Award, PenTool, Layers } from 'lucide-react';

export const SopHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-12 right-12 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-6 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">SOP Writing Service</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <PenTool className="w-4 h-4" />
              <span>Documents &amp; Applications 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Statement of Purpose Writing for <span className="text-germany-red">Germany</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Professionally written Statement of Purpose tailored specifically to your academic background, target course curriculum, and German university expectations. 100% original, plagiarism-free, and aligned with TU9 &amp; public university admissions criteria.
            </p>

            {/* Quick Guarantees Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-gray-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-germany-red" />
                First draft in 3 working days (or 24h Express)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                2 student review rounds included
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                100% Plagiarism &amp; AI-free guarantee
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#pricing" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Get My SOP Written</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#features" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>See What You Get</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-gray-500">
              From <span className="font-extrabold text-germany-black">₹4,999</span> · Delivered as a collaborative Google Doc with comment-driven revisions.
            </p>
          </div>

          {/* Quick Facts Card Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-6 border border-amber-100 relative bg-amber-50/40"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">German SOP Standards</h3>
                  <p className="text-xs text-gray-500 font-medium">Academic, Focused &amp; Evidence-Based</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Tone &amp; Style</span>
                  <span className="text-sm font-black text-germany-black">Academic &amp; Research-Oriented</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Standard Turnaround</span>
                  <span className="text-sm font-black text-germany-red">3 Days <span className="text-xs font-normal text-gray-500">(1 Day Express)</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Word Count</span>
                  <span className="text-sm font-black text-germany-black">800 – 1,200 Words (or Uni Spec)</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-green-50/90 rounded-2xl border border-green-200">
                  <span className="text-xs font-extrabold text-green-900 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    Student Review
                  </span>
                  <span className="text-xs font-black text-green-800">2 Complete Rounds of Edits</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <a 
                  href="#how-it-works" 
                  className="text-xs font-extrabold text-germany-red hover:underline inline-flex items-center gap-1"
                >
                  <span>See our 5-step drafting workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
