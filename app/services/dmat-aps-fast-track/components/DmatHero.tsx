"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarClock, ArrowRight, ShieldCheck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export const DmatHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Blur Accents */}
      <div className="absolute top-12 right-12 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-6 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">dMAT + APS Fast-Track</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <CalendarClock className="w-4 h-4" />
              <span>Official g.a.s.t. &amp; APS Requirement</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                The New dMAT, Handled <span className="text-germany-red">Before Your Deadline</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              dMAT is now part of the mandatory APS verification process for Indian Master&apos;s applicants from select degree backgrounds. We handle your official <strong className="text-germany-black font-bold">g.a.s.t. portal registration</strong>, help secure a test slot in your preferred Indian city, provide comprehensive practice &amp; mock tests, and synchronize your APS timeline.
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/90 text-xs sm:text-sm font-bold text-amber-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <span>
                <strong className="text-germany-black">100% Money-Back Guarantee:</strong> We register you for the dMAT before the official registration deadline closes, or you get a full 100% refund of our service fee.
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#pricing" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Start My Registration</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#eligibility-check" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>Check If It Applies to Me (Free)</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-gray-500">
              EuropeBridge Service Fee: <span className="font-extrabold text-germany-black">₹1,999</span> · The 150 EUR exam fee is paid directly to g.a.s.t.
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
                  <CalendarClock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">Fast-Track Key Facts</h3>
                  <p className="text-xs text-gray-500 font-medium">Summer &amp; Winter 2026-2027</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Service Fee</span>
                  <span className="text-xl font-black text-germany-black">₹1,999</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Official Exam Fee</span>
                  <span className="text-base font-black text-germany-red">€150 <span className="text-xs font-normal text-gray-500">(to g.a.s.t.)</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-white rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Test Locations</span>
                  <span className="text-sm font-black text-germany-black">10 Cities in India</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-green-50/90 rounded-2xl border border-green-200">
                  <span className="text-xs font-extrabold text-green-900 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    Deadline Promise
                  </span>
                  <span className="text-xs font-black text-green-800">100% Refundable Guarantee</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <a 
                  href="#how-it-works" 
                  className="text-xs font-extrabold text-germany-red hover:underline inline-flex items-center gap-1"
                >
                  <span>See what we handle for you</span>
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
