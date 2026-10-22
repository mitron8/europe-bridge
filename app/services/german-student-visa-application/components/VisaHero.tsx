"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, ArrowRight, CheckCircle2, Calendar, FileText } from 'lucide-react';

export const VisaHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Warm Ambient Glow matching Landing Page */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40 blur-[100px] -z-10"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.25), rgba(230,57,70,0.12), transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/services" className="hover:text-[var(--lp-red)] transition-colors">Services</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">German Student Visa Application</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Consular Services Portal (CSP) &amp; VFS Global 2026
            </div>

            <h1 className="lp-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[var(--lp-text)] tracking-[-0.02em] leading-[1.08]">
              German Student Visa <em className="lp-script text-[var(--lp-red)]">Application Support</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Full-scale end-to-end guidance for your Germany National Visa (long-term student visa / Type D). From CSP registration and digital VIDEX completion to VFS biometric slot booking and 1:1 visa interview coaching.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href="#pricing" 
                className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Get Visa Application Support</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a 
                href="#process" 
                className="lp-btn lp-btn--dark justify-center text-sm"
              >
                <span>How We Guide You</span>
              </a>
            </div>

            {/* Reassurance Micro-Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[var(--lp-muted)] pt-1">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                CSP Portal &amp; VIDEX Form Setup
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                VFS Global Biometrics Booking
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                1:1 Consular Mock Interview Prep
              </span>
            </div>

            <p className="text-xs font-semibold text-[var(--lp-faint)]">
              From <span className="font-bold text-[var(--lp-text)]">₹14,999</span> · Handled until the visa sticker is stamped in your passport.
            </p>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.04)]">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <span>Visa Success Metrics</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3] text-[10.5px] font-semibold uppercase tracking-wider shrink-0">
                  99.4% Approval
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Visa Type</span>
                  <span className="font-bold text-[var(--lp-text)]">National Visa (Type D)</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Standard Processing</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-red)]">4–8 Weeks</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Interview Coaching</span>
                  <span className="font-bold text-[var(--lp-text)]">1-on-1 Mock Drill Included</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-text)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
                    Checklist Verification
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">3-Tier Consular Audit</span>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-[var(--lp-rule)]">
                <a 
                  href="#process" 
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore the step-by-step visa pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
