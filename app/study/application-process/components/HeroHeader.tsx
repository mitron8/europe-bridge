"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export const HeroHeader = () => {
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
          <span className="text-germany-black font-extrabold">Application Process</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Step-by-Step Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                How to Apply to <span className="text-germany-red">German Universities</span>
              </h1>
              <motion.img 
                src="/doodles/happy.png" 
                alt="Compass Doodle"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Applying to a public German university is a six-step journey. Learn how to shortlist courses, prepare documents, navigate uni-assist vs. direct portals, block accounts, secure conditional admissions, and apply for visas.
            </p>
          </div>

          {/* Quick Stats sidebar/card */}
          <div className="lg:col-span-5">
            <div className="neu-card p-6 bg-white space-y-4">
              <h3 className="font-display text-lg text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
                <Compass className="w-5 h-5 text-germany-red" />
                <span>Application Quick Facts</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-600">
                <div className="p-3.5 rounded-2xl bg-[#FDFBF7]">
                  <span className="block text-gray-400 text-[10px] uppercase">Winter Deadline</span>
                  <span className="text-germany-black text-sm">July 15</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FDFBF7]">
                  <span className="block text-gray-400 text-[10px] uppercase">Summer Deadline</span>
                  <span className="text-germany-black text-sm">January 15</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FDFBF7]">
                  <span className="block text-gray-400 text-[10px] uppercase">uni-assist Fee</span>
                  <span className="text-germany-black text-sm">€75 (+€30 addl.)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FDFBF7]">
                  <span className="block text-gray-400 text-[10px] uppercase">Avg. Processing</span>
                  <span className="text-germany-black text-sm">4–8 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
