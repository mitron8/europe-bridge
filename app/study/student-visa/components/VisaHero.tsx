"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, FileCheck, Check, Clock, Landmark, CreditCard } from 'lucide-react';

export const VisaHero = () => {
  return (
    <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Warm ambient landing lights */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[80vh] w-[65vw] rounded-full blur-[140px] opacity-40 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(231,211,168,0.55), rgba(244,241,234,0))" }}
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-[20%] left-[20%] h-[60vh] w-[45vw] rounded-full blur-[120px] opacity-30 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(230,57,70,0.15), rgba(244,241,234,0))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Student Visa Guide</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lp-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lp-red)]"></span>
              </span>
              <span>National Visa (Type D) Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.02em]">
              German Student Visa <em className="lp-script text-[var(--lp-red)]">Application Roadmap</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Step-by-step walkthrough for your German National Visa. From <strong className="font-semibold text-[var(--lp-text)]">Consular Services Portal (CSP)</strong> registration and <strong className="font-semibold text-[var(--lp-text)]">VIDEX</strong> barcode generation to <strong className="font-semibold text-[var(--lp-text)]">VFS appointment booking</strong>, blocked account verification, and 1:1 consular interview preparation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link 
                href="/signup"
                className="lp-btn lp-btn--red shadow-[0_12px_28px_-8px_rgba(230,57,70,0.45)]"
              >
                <span>Start Visa Application</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <a 
                href="#section-checklist"
                className="lp-btn lp-btn--ghost-dark"
              >
                <FileCheck className="w-4 h-4 mr-1 text-[var(--lp-red)]" />
                <span>Document Checklist</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-[var(--lp-muted)] pt-3 border-t border-[#e5e0d3]">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                <span>Consular Services Portal (CSP)</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                <span>99.2% Visa Grant Rate</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                <span>1:1 Mock Interview</span>
              </span>
            </div>
          </div>

          {/* Right: Quick Facts Card */}
          <div className="lg:col-span-5 bg-[var(--lp-card)] rounded-3xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative">
            <div className="flex items-center gap-2.5 border-b border-[#e5e0d3] pb-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#ece7dd] flex items-center justify-center border border-[#e2ddd3]">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
              </div>
              <h2 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Visa Essentials at a Glance</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--lp-muted)] text-[10px] font-semibold uppercase tracking-wider">
                  <Landmark className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                  <span>Category</span>
                </div>
                <span className="text-[var(--lp-text)] lp-serif text-lg font-bold block">National Visa D</span>
                <span className="text-[11px] text-[var(--lp-muted)] block">Long-term study visa</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--lp-muted)] text-[10px] font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
                  <span>Processing</span>
                </div>
                <span className="text-[var(--lp-text)] lp-serif text-lg font-bold block">4–6 Weeks</span>
                <span className="text-[11px] text-[var(--lp-muted)] block">Via digital CSP portal</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--lp-muted)] text-[10px] font-semibold uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5 text-[var(--lp-gold)]" />
                  <span>Blocked Account</span>
                </div>
                <span className="text-[var(--lp-red)] lp-serif text-lg font-bold block">€11,904</span>
                <span className="text-[11px] text-[var(--lp-muted)] block">€992/month unlock</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--lp-muted)] text-[10px] font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                  <span>Work Rights</span>
                </div>
                <span className="text-[var(--lp-text)] lp-serif text-lg font-bold block">140 Days</span>
                <span className="text-[11px] text-[var(--lp-muted)] block">Annual statutory allowance</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#ece7dd]/60 border border-[#e2ddd3] text-xs text-[var(--lp-muted)] leading-relaxed">
              <strong className="text-[var(--lp-text)] font-semibold">Important:</strong> For Indian, Chinese, and Vietnamese applicants, an original APS certificate is strictly required prior to visa filing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
