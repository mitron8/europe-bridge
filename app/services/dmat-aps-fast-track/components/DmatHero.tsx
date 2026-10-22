"use client";

import React from 'react';
import Link from 'next/link';
import { CalendarClock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DmatHero = () => {
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
          <span className="text-[var(--lp-text)] font-bold">dMAT + APS Fast-Track</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Official g.a.s.t. &amp; APS Requirement 2026
            </div>

            <h1 className="lp-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[var(--lp-text)] tracking-[-0.02em] leading-[1.08]">
              The New dMAT, Handled <em className="lp-script text-[var(--lp-red)]">Before Your Deadline</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              dMAT is now part of the mandatory APS verification process for Indian Master&apos;s applicants from select degree backgrounds. We handle your official <strong className="text-[var(--lp-text)] font-bold">g.a.s.t. portal registration</strong>, help secure a test slot in your preferred Indian city, provide comprehensive practice &amp; mock tests, and synchronize your APS timeline.
            </p>

            <div className="p-4 rounded-2xl bg-[var(--lp-card)] border border-[var(--lp-rule)] text-xs sm:text-sm font-medium text-[var(--lp-text)] flex items-start gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[var(--lp-red)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--lp-text)] font-bold">100% Money-Back Guarantee:</strong> We register you for the dMAT before the official registration deadline closes, or you get a full 100% refund of our service fee.
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href="#pricing" 
                className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Start My Registration</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a 
                href="#eligibility-check" 
                className="lp-btn lp-btn--dark justify-center text-sm"
              >
                <span>Am I Required to Take dMAT?</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-[var(--lp-faint)]">
              Flat <span className="font-bold text-[var(--lp-text)]">₹9,999</span> · Complete registration management, preparation roadmap, &amp; APS tracking.
            </p>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.04)]">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2.5">
                  <CalendarClock className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <span>dMAT at a Glance</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3] text-[10.5px] font-semibold uppercase tracking-wider shrink-0">
                  g.a.s.t. Verified
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Format</span>
                  <span className="font-bold text-[var(--lp-text)]">Digital Center-Based Exam</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Duration</span>
                  <span className="font-bold text-[var(--lp-text)]">175 Minutes</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Test Cities in India</span>
                  <span className="font-bold text-[var(--lp-text)]">Delhi, Mumbai, Bengaluru +</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-text)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
                    APS Synergy
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">Direct Certificate Linkage</span>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-[var(--lp-rule)]">
                <a 
                  href="#why-it-matters" 
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Learn how dMAT impacts your APS timeline</span>
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
