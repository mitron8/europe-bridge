"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, FileCheck, Check, Clock, Landmark, CreditCard } from 'lucide-react';

export const VisaHero = () => {
  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-reveal>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
        <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
        <span>/</span>
        <span className="text-[var(--lp-text)] font-semibold">Student Visa Guide</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Main Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)] inline-block">
            National Visa (Type D) Guide 2026
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--lp-ink)] font-normal tracking-tight leading-[1.15]">
            German Student Visa <em className="italic text-[var(--lp-red)] font-serif">Application Roadmap</em>
          </h1>

          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed max-w-xl">
            Step-by-step walkthrough for your German National Visa. From <strong className="text-[var(--lp-text)]">Consular Services Portal (CSP)</strong> registration and <strong className="text-[var(--lp-text)]">VIDEX</strong> barcode generation to <strong className="text-[var(--lp-text)]">VFS appointment booking</strong>, blocked account verification, and 1:1 consular interview preparation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold"
            >
              <span>Start Visa Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a 
              href="#section-checklist"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#eae5db]/60 text-[var(--lp-text)] hover:bg-[#eae5db] border border-[#e5e0d3] transition-colors text-xs font-semibold"
            >
              <FileCheck className="w-3.5 h-3.5 text-[var(--lp-red)]" />
              <span>Document Checklist</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--lp-muted)] pt-2 border-t border-[#e5e0d3]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>Consular Services Portal (CSP)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>99.2% Visa Grant Rate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>1:1 Mock Interview</span>
            </span>
          </div>
        </div>

        {/* Right: Quick Facts Card */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#e5e0d3] pb-3">
            <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
            <h2 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Visa Essentials at a Glance</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex items-center gap-1 text-[var(--lp-muted)] text-[10px] font-mono uppercase tracking-wider">
                <Landmark className="w-3 h-3 text-[var(--lp-red)]" />
                <span>Category</span>
              </div>
              <span className="text-[var(--lp-ink)] font-serif text-base font-normal block">National Visa D</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Long-term study visa</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex items-center gap-1 text-[var(--lp-muted)] text-[10px] font-mono uppercase tracking-wider">
                <Clock className="w-3 h-3 text-[var(--lp-gold)]" />
                <span>Processing</span>
              </div>
              <span className="text-[var(--lp-ink)] font-serif text-base font-normal block">4–6 Weeks</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Via digital CSP portal</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex items-center gap-1 text-[var(--lp-muted)] text-[10px] font-mono uppercase tracking-wider">
                <CreditCard className="w-3 h-3 text-[var(--lp-gold)]" />
                <span>Blocked Account</span>
              </div>
              <span className="text-[var(--lp-red)] font-serif text-base font-normal block">€11,904</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">€992/month unlock</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex items-center gap-1 text-[var(--lp-muted)] text-[10px] font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-[var(--lp-red)]" />
                <span>Work Rights</span>
              </div>
              <span className="text-[var(--lp-ink)] font-serif text-base font-normal block">140 Days</span>
              <span className="text-[10px] text-[var(--lp-muted)] block">Annual statutory allowance</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] text-xs text-[var(--lp-muted)]">
            <strong className="text-[var(--lp-text)]">Important:</strong> For Indian, Chinese, and Vietnamese applicants, an original APS certificate is strictly required prior to visa filing.
          </div>
        </div>
      </div>
    </section>
  );
};
