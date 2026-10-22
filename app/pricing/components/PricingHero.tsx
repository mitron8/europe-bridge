"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, GraduationCap, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const PricingHero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[#e5e0d3] bg-[#fbf9f4]">
      {/* Ambient background glow */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.035] via-[#c9a35b]/[0.025] to-transparent blur-3xl select-none" 
      />

      <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
          <Link href="/" className="transition-colors hover:text-[#16161a]">
            Home
          </Link>
          <span className="text-[#a49f94]">/</span>
          <span className="font-semibold text-[#16161a]">Pricing &amp; Packages</span>
        </nav>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-4 py-1.5 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-5">
          <Award className="w-3.5 h-3.5 text-[#9e2a2b]" />
          <span className="font-semibold text-[#16161a]">Transparent Pricing 2026</span>
          <span className="text-[#9a958c]">|</span>
          <span>Zero Commission from Universities · 100% Public Focus</span>
        </div>

        {/* Main H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.12]">
          Germany University <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#9e2a2b]">Admission Packages &amp; Plans.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl mx-auto text-[15px] sm:text-[17px] text-[#5e5b54] leading-relaxed">
          Choose a comprehensive counselling plan. Our former German university alumni and senior admissions editors work with you 1-on-1 on course shortlisting, SOP, LORs, CV, portal filings, and your student visa.
        </p>

        {/* Trust Badges Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-[#4a4740]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2e7d46]" />
            5,000+ Students Guided
          </span>
          <span className="text-[#dcd7cb] hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2e7d46]" />
            98.4% Visa Success Rate
          </span>
          <span className="text-[#dcd7cb] hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1 text-[#b58117]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-[#16161a] ml-1 font-bold">4.9/5</span>
            <span className="text-[#787369] font-normal">(1,200+ Reviews)</span>
          </span>
        </div>

        {/* Quick Nav Anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#packages"
            className="px-5 py-2.5 rounded-full bg-[#16161a] text-white text-xs sm:text-sm font-bold hover:bg-[#2b2b31] transition-all shadow-sm"
          >
            View Admission Packages
          </a>
          <a
            href="#cost-comparison"
            className="px-5 py-2.5 rounded-full bg-white border border-[#dcd7cb] text-[#16161a] text-xs sm:text-sm font-bold hover:bg-[#f3efe6] transition-all"
          >
            Germany vs. Other Countries ROI
          </a>
          <a
            href="#comparison-matrix"
            className="px-5 py-2.5 rounded-full bg-white border border-[#dcd7cb] text-[#16161a] text-xs sm:text-sm font-bold hover:bg-[#f3efe6] transition-all"
          >
            Feature-by-Feature Matrix
          </a>
        </div>
      </div>
    </section>
  );
};
