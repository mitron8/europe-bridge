"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Globe2, 
  Clock,
  Calculator
} from 'lucide-react';

export const LifeAfterOfferHero = () => {
  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Glow Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Life After Offer & Careers</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Headline & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Post-Study & Career Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Life After the Offer: <span className="text-germany-red">Careers, Blue Card & PR</span> in Germany
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Germany does not just educate you—<strong>it wants you to stay</strong>. Turn your university admit into a thriving European career with an <strong>18-month job seeker visa (§20 AufenthG)</strong>, the <strong>EU Blue Card</strong> at reduced recent-graduate thresholds (€45,934/yr), <strong>permanent residence in 21 months</strong>, and a clear path to dual citizenship.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a 
                href="#section-calculator"
                className="neu-btn-primary px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Check Blue Card Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#section-job-seeker"
                className="neu-btn px-6 py-3.5 text-xs font-black uppercase tracking-wider text-germany-black hover:text-germany-red border border-[#EBE7E0]/80 shadow-2xs flex items-center gap-2 cursor-pointer bg-white"
              >
                <Clock className="w-4 h-4 text-germany-red" />
                <span>18-Month Job Seeker Visa</span>
              </a>
            </div>

            {/* Quick check highlights */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-600 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>18-Mo Unrestricted Work Rights</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>21-Mo PR with B1 German</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dual Citizenship (2024+ Reform)</span>
              </span>
            </div>
          </div>

          {/* Right Column: 2026 Fast Facts & Key Thresholds Card */}
          <div className="lg:col-span-5">
            <div className="neu-card p-6 bg-white space-y-4 shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
              <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
                <h3 className="font-display text-lg text-germany-black flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-germany-red" />
                  <span>2026 German Career Benchmarks</span>
                </h3>
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-germany-red" />
                  Updated 2026
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-gray-700">
                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-germany-red" />
                    <span>Post-Study Search</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">18 Months</span>
                  <span className="text-[10px] text-gray-400 font-medium">Any part-time/full-time job</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <CreditCard className="w-3 h-3 text-germany-red" />
                    <span>Grad Blue Card</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">€45,934.20/yr</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Degrees &lt; 3 yrs old</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Award className="w-3 h-3 text-germany-red" />
                    <span>Permanent Stay (PR)</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">21 Months</span>
                  <span className="text-[10px] text-gray-400 font-medium">With Blue Card + B1 German</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs hover:border-germany-red/30 transition-colors space-y-1">
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Globe2 className="w-3 h-3 text-germany-red" />
                    <span>German Citizenship</span>
                  </div>
                  <span className="text-germany-black text-sm font-black block">5 Years</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Dual passport permitted</span>
                </div>
              </div>

              {/* Pro Tip Highlight Bar */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">The Werkstudent Advantage</span>
                  <span className="text-[11px] text-amber-800 font-medium leading-relaxed">
                    Over 65% of international graduates convert working student roles or industry Master's theses directly into permanent full-time employment before graduation day.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
