"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LifeAfterOfferCTA = () => {
  return (
    <section className="py-16 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="neu-card p-8 lg:p-12 bg-white relative overflow-hidden border border-[#EBE7E0] shadow-[16px_16px_36px_rgba(210,205,195,0.7)]">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-12 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>End-to-End European Career Guidance</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display">
                Ready to Turn Your German Degree into an <span className="text-germany-red">International Career?</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
                From finding universities with the highest Werkstudent conversion rates to tailoring your German Tabellarischer Lebenslauf, navigating the 18-month job seeker visa, and securing your EU Blue Card—EuropeBridge is with you every step of the journey.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/profile-evaluation"
                  className="neu-btn-primary px-8 py-4 text-xs font-black uppercase tracking-wider text-white flex items-center gap-2.5 shadow-md cursor-pointer"
                >
                  <span>Get My Free Evaluation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/study/masters"
                  className="neu-btn px-7 py-4 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0] shadow-xs flex items-center gap-2 cursor-pointer bg-white"
                >
                  <span>Explore Master&apos;s Guide</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-3 text-xs font-bold text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free Initial Evaluation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>German Public University Alumni Mentors</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Blue Card Salary Negotiation Advice</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
