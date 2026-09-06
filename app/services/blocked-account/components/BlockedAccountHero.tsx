"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle2, ArrowRight, Wallet, Landmark } from 'lucide-react';

export const BlockedAccountHero = () => {
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
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Blocked Account for Germany</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Landmark className="w-4 h-4" />
              <span>Official Visa Requirement 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Blocked Account for <span className="text-germany-red">Germany</span>
              </h1>
              <motion.img 
                src="/doodles/visa approved.png" 
                alt="Visa Approved Mascot"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Open your mandatory German blocked account for your student visa interview. Speak to an expert counselor within 60 minutes, submit your passport details, and receive your official blocking confirmation within 24 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#booking" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Apply for Blocked Account</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#features" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>See How It Works</span>
              </a>
            </div>
          </div>

          {/* Quick Facts Card Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-6 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">2026 Official Rates</h3>
                  <p className="text-xs text-gray-500 font-medium">Approved by Federal Foreign Office</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Annual Blocked Amount</span>
                  <span className="text-xl font-black text-germany-black">€11,904</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Monthly Payout Rate</span>
                  <span className="text-xl font-black text-germany-red">€992 <span className="text-xs font-normal text-gray-500">/mo</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-green-50/80 rounded-2xl border border-green-200">
                  <span className="text-xs font-extrabold text-green-800 uppercase flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-700" /> Confirmation Time
                  </span>
                  <span className="text-sm font-black text-green-800">Within 24 Hours</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 font-medium leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span>100% money-back guarantee in case of official visa rejection.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
