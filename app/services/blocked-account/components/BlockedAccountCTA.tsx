"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const BlockedAccountCTA = () => {
  return (
    <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-8 sm:p-12 bg-gradient-to-r from-germany-black via-gray-900 to-germany-black text-white relative overflow-hidden rounded-3xl shadow-xl">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Ready for Visa Appointment?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight">
              Get Your Official Blocking Confirmation <span className="text-germany-red">In 24 Hours</span>
            </h2>

            <p className="text-gray-300 font-medium text-base leading-relaxed">
              Don't let financial paperwork delay your German student visa. Submit your application today and get full guidance from EuropeBridge advisors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a 
              href="#booking" 
              className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center gap-2 shadow-lg"
            >
              <span>Open Blocked Account</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
