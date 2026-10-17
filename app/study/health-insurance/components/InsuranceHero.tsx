"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, HeartHandshake, Check, FileCheck, Building2 } from 'lucide-react';

export const InsuranceHero = () => {
  return (
    <section id="overview" className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-reveal>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
        <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
        <span>/</span>
        <span className="text-[var(--lp-text)] font-semibold">Health Insurance</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Main Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)] inline-block">
            Settlement &amp; Relocation
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--lp-ink)] font-normal tracking-tight leading-[1.15]">
            German Health Insurance <em className="italic text-[var(--lp-red)] font-serif">Setup &amp; Support</em>
          </h1>

          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed max-w-xl">
            Compare and activate the right German health insurance for university enrollment and visa approval. Free digital <strong className="text-[var(--lp-text)]">M10 certificate</strong> transmitted directly to your university registrar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a 
              href="#booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold"
            >
              <span>Apply for Coverage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#section-comparison"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#eae5db]/60 text-[var(--lp-text)] hover:bg-[#eae5db] border border-[#e5e0d3] transition-colors text-xs font-semibold"
            >
              <span>Public vs. Private</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--lp-red)]" />
            </a>
          </div>

          <div className="text-xs text-[var(--lp-muted)] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--lp-gold)]" />
            <span><strong className="text-[var(--lp-text)]">0€ Advisory Fee</strong> • Electronic M10 notification sent directly to your university</span>
          </div>

          {/* Highlights Grid */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#e5e0d3]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Requirement</p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">100% Mandatory</p>
            </div>
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#e5e0d3]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Student Rate</p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--lp-red)] mt-0.5">~€140–€150/mo</p>
            </div>
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#e5e0d3]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Travel Cover</p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--lp-ink)] mt-0.5">Free Incoming</p>
            </div>
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#e5e0d3]">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Turnaround</p>
              <p className="text-xs sm:text-sm font-semibold text-[var(--lp-gold)] mt-0.5">Within 24 Hours</p>
            </div>
          </div>
        </div>

        {/* Right: Insurance Summary Card */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
              <h2 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Digital M10 Certificate</h2>
            </div>
            <span className="text-[10px] font-mono uppercase text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-2 py-0.5 rounded-full border border-[var(--lp-gold)]/20">
              Instant
            </span>
          </div>

          <div className="space-y-3 text-xs text-[var(--lp-muted)]">
            <p className="leading-relaxed">
              In Germany, health insurance is required before university enrollment can be completed. Public providers issue an electronic notification (M10) directly to your university.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#e5e0d3]">
              {[
                "Direct electronic reporting to 400+ German universities",
                "Free doctor visits, hospital treatment & prescription coverage",
                "Includes statutory nursing care (Pflegeversicherung)",
                "Complimentary incoming travel insurance for visa submission"
              ].map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[var(--lp-text)]">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed text-[var(--lp-muted)]">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] text-xs text-[var(--lp-muted)]">
            <strong className="text-[var(--lp-text)]">TK &amp; Barmer Partners:</strong> EuropeBridge provides direct setup at zero fee to you.
          </div>
        </div>
      </div>
    </section>
  );
};
