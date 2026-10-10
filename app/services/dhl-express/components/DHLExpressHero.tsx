"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Package, 
  CheckCircle2, 
  MapPin, 
  Building2,
  Plane
} from 'lucide-react';

export const DHLExpressHero = () => {
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
          <span className="text-germany-black font-extrabold">DHL Express Courier</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>Student Air Express 2026</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>50%+ Student Discount</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                DHL Express University Courier <br className="hidden sm:inline" />
                <span className="text-germany-red">Flat ₹2,033 to Germany</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Send your university application dossiers, sealed transcripts, and APS documents to German public universities and uni-assist e.V. Berlin. Guaranteed <strong className="text-germany-black font-extrabold">3–4 working day air transit</strong> with free doorstep pickup across India and official 10-digit AWB tracking.
            </p>

            {/* Quick Guarantees Pill Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-gray-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-germany-red" />
                3–4 Working Days Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Free Doorstep Pickup Across India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Sealed Transcripts Kept Intact
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#booking" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Book Courier at ₹2,033</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#how-it-works" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>How It Works</span>
              </a>

              <a 
                href="#comparison" 
                className="text-xs font-bold text-gray-600 hover:text-germany-red underline underline-offset-4 py-2 sm:py-0"
              >
                Compare Tariffs
              </a>
            </div>

            <p className="text-xs font-semibold text-gray-500">
              Flat <span className="font-extrabold text-germany-black">₹2,033 per application packet</span> · 50%+ discount vs counter rate of ₹4,200.
            </p>
          </div>

          {/* Quick Facts Card Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-6 border border-gray-200 relative bg-white"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shadow-inner">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">2026 Student Courier Rates</h3>
                  <p className="text-xs text-gray-500 font-medium">DHL Express Air Logistics Network</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Discounted Student Tariff</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-germany-red font-display">₹2,033</span>
                    <span className="text-xs text-gray-400 line-through ml-2">₹4,200</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Weight &amp; Envelope Size</span>
                  <span className="text-sm font-black text-germany-black">Up to 500g (A4 / A3 Flyer)</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" /> Transit to Germany
                  </span>
                  <span className="text-sm font-black text-emerald-800">3–4 Working Days</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200">
                  <span className="text-xs font-extrabold text-blue-800 uppercase flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" /> Deliveries
                  </span>
                  <span className="text-sm font-black text-blue-800">uni-assist &amp; German Unis</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-600 font-medium leading-relaxed flex items-center gap-2 border-t border-gray-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Free doorstep pickup, 10-digit AWB, &amp; signed delivery confirmation.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

