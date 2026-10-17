"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const MastersHeroHeader = () => {
  return (
    <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Warm Ambient Glow */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40 blur-[100px] -z-10"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.25), rgba(230,57,70,0.12), transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Eyebrow Badge */}
        <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#e5e0d3] bg-[#faf8f3]/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-text)] shadow-xs backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
          Master&apos;s Strategy Guide 2026
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 data-reveal className="lp-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--lp-text)] tracking-[-0.02em] leading-[1.08]">
              Master&apos;s Degree in <em className="lp-script text-[var(--lp-red)]">Germany</em>
            </h1>

            <p data-reveal className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Tuition-free higher education at world-class public universities. Discover 400+ English-taught Master&apos;s programs, prerequisite ECTS credit mapping, blocked account funding, and an 18-month direct career pathway into Europe&apos;s leading economy.
            </p>

            {/* Quick Action Buttons */}
            <div data-reveal className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/tools/admission-chance"
                className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Check My Admission Chances</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <a
                href="#university-types"
                className="lp-btn lp-btn--dark justify-center text-sm"
              >
                <span>Explore TU9 vs. UAS</span>
              </a>
            </div>

            {/* Reassurance Micro-Badges */}
            <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[var(--lp-muted)] pt-1">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                0€ Tuition at Public Universities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                400+ English-Taught Degrees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                18-Month Post-Study Job Visa
              </span>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div data-reveal className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.04)]">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <span>Master&apos;s at a Glance</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3] text-[10.5px] font-semibold uppercase tracking-wider shrink-0">
                  2026 Data
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Tuition Fees</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-red)]">0€ / Sem</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">Free at public unis</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Standard Duration</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">2 Years</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">4 Sem (120 ECTS)</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Teaching Medium</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">English</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">IELTS 6.5 / TOEFL</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Semester Fee</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">€150 – €350</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">Transit pass included</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Proof of Funds</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">€11,904 / Yr</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">€992 / mo living</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="block text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider mb-1">Work Rights</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">140 Days</span>
                  <span className="block text-[10.5px] text-[var(--lp-faint)] mt-0.5">Working student roles</span>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-[#ece7dd]/60 border border-[#e2ddd3] flex items-start gap-2.5 text-xs text-[var(--lp-text)]">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs leading-relaxed text-[var(--lp-muted)]">
                  <strong className="text-[var(--lp-text)] font-semibold">Indian, Chinese &amp; Vietnamese students:</strong> APS certification is mandatory prior to visa appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
