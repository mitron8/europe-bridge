"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const InsuranceCTA = () => {
  return (
    <section className="py-16 px-6 lg:px-12 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="neu-card p-8 sm:p-12 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden space-y-6 shadow-2xl">
          {/* Ambient circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Doodle */}
          <motion.img
            src="/doodles/german cutie.png"
            alt="German Cutie Mascot"
            className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 object-contain opacity-95 hidden lg:block pointer-events-none drop-shadow-2xl"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Full Health Cover From Day One</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display leading-tight text-white">
              Arrive in Germany Protected with Official Health Insurance
            </h2>

            <p className="text-sm sm:text-base text-red-100 font-medium leading-relaxed">
              Don&apos;t wait until you land in Frankfurt or Munich. Set up your statutory or private German health insurance now with zero advisory fees, free incoming travel cover, and immediate university M10 notification.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a 
                href="#booking"
                className="neu-btn-gold px-8 py-3.5 text-sm font-black text-germany-black flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Apply for Health Insurance Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link 
                href="/study/student-visa"
                className="px-6 py-3.5 rounded-full text-xs font-bold text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Explore Visa Checklist</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-red-100 font-semibold relative z-10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>100% Free Consultation &amp; Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>Complimentary Incoming Travel Cover</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>Direct Electronic M10 University Push</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
