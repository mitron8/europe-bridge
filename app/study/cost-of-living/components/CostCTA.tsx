"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const CostCTA = () => {
  return (
    <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-8 sm:p-12 bg-gradient-to-r from-germany-black via-gray-900 to-germany-black text-white relative overflow-hidden rounded-3xl shadow-xl">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>EuropeBridge Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight">
              Planning Your Financial Strategy for <span className="text-germany-red">Germany?</span>
            </h2>

            <p className="text-gray-300 font-medium text-base leading-relaxed">
              Use our AI-driven Admission &amp; Budget Evaluator or speak directly with our senior German education advisors to map out your exact cost of living, blocked account setup, and scholarship opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link 
              href="/#hero" 
              className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center gap-2 shadow-lg"
            >
              <span>Get Free Evaluation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/tools/admission-chance"
              className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200"
            >
              <span>Admission Chance Tool</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
