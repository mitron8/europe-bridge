"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Banknote, Clock, Landmark, CheckCircle2, TrendingDown } from 'lucide-react';

export const RemittanceHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Outward Remittance</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Banknote className="w-4 h-4" />
              <span>Financial Settlement • RBI LRS Compliant</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Outward Remittance for Germany <br className="hidden sm:inline" />
                <span className="text-germany-red">At Wholesale Forex Rates</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
              Send funds to Germany for your blocked account, university tuition, and rent deposit. Enjoy domestic INR transfers, a callback within 60 minutes, and official transfer confirmation within 48 hours.
            </p>

            {/* Clean CTA Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <a 
                href="#booking" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Apply for Outward Remittance</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#calculator" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>Calculate Rate &amp; TCS</span>
              </a>
            </div>

            {/* Clean Trust Indicators Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-gray-600 font-bold">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 60-Min Callback
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" /> Credit in &lt; 48 Hours
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> €0 Intermediary Deduction
              </span>
            </div>
          </div>

          {/* Clean Right-Side Live Snapshot Card */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-6 border border-gray-200/90 relative bg-white/90 shadow-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              {/* Snapshot Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-bold shadow-inner">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-germany-black text-base">Verified Transfer Route</h3>
                    <p className="text-xs text-gray-500 font-medium">RBI Authorized Dealer Network</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Rates</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-600 font-semibold">Blocked Account Transfer</span>
                  <span className="font-extrabold text-germany-black">€11,904 – €12,053</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-600 font-semibold">Intermediary Wire Cut</span>
                  <span className="font-extrabold text-emerald-700">€0 Guaranteed</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-600 font-semibold">Deposit Method</span>
                  <span className="font-extrabold text-germany-black">Domestic INR (NEFT / RTGS)</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-700" /> Avg. Savings vs Retail Banks
                  </span>
                  <span className="font-black text-emerald-800 text-sm">₹25,000–₹35,000</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 text-xs text-gray-500 font-medium leading-relaxed flex items-center gap-2 border-t border-gray-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes official stamped confirmation letter for your VFS visa file.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
