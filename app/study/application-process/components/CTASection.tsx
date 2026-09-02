"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="neu-card p-8 md:p-12 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
          {/* Top flag stripe */}
          <div className="absolute top-0 left-0 w-full h-2 flex">
            <div className="flex-1 bg-germany-black"></div>
            <div className="flex-1 bg-germany-red"></div>
            <div className="flex-1 bg-germany-gold"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-extrabold text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-germany-red" />
                <span>Get Professional Guidance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display text-germany-black leading-tight">
                Need Help with Your German University Applications?
              </h2>
              <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                From finding courses matching your credit profile to drafting motivation letters, requesting uni-assist VPDs, and blocking visa funds — our counsellors guide you through every step.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              <Link 
                href="/profile-evaluation"
                className="w-full md:w-auto neu-btn-primary py-3.5 px-8 text-xs font-black uppercase text-white flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get Free Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[10px] text-gray-400 font-bold">No commitments, 100% free review</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
