"use client";
import React from 'react';
import Link from 'next/link';
import { Target, ChevronRight } from 'lucide-react';

export const ToolHeroHeader = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 border-b border-[#e5e0d3] bg-[#fbf9f4]">
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.025] to-transparent blur-3xl" 
      />

      <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
          <Link href="/" className="transition-colors hover:text-[#16161a]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/tools" className="transition-colors hover:text-[#16161a]">
            Free Tools
          </Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="font-semibold text-[#16161a]">Admission Chance Predictor</span>
        </nav>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
          <Target className="w-3.5 h-3.5 text-[#9e2a2b]" />
          <span className="font-semibold text-[#16161a]">100-Point Profile Fit Algorithm</span>
          <span className="text-[#9a958c]">|</span>
          <span>TU9 &amp; Public Universities 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
          German Master&apos;s Admission Chance Predictor. <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#9e2a2b]">Evaluate Your Profile Fit &amp; TU9 Likelihood.</span>
        </h1>

        <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
          Evaluate your admission probability for public German universities based on your CGPA, field of study, target university tier, language test scores, and work experience on a 100-point fit scale.
        </p>
      </div>
    </section>
  );
};

