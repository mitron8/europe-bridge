"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  ArrowRight, 
  Check, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Clock,
  Calculator
} from 'lucide-react';

export const LifeAfterOfferHero = () => {
  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-reveal>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
        <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
        <span>/</span>
        <span className="text-[var(--lp-text)] font-semibold">Careers &amp; Settlement</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hero Headline & Description */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)] inline-block">
            Post-Study &amp; Career Guide 2026
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--lp-ink)] font-normal tracking-tight leading-[1.15]">
            Life After the Offer: <em className="italic text-[var(--lp-red)] font-serif">Careers, Blue Card &amp; PR</em>
          </h1>

          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed max-w-xl">
            Germany faces acute engineering and STEM labor shortages. Convert your university admit into a European career with an <strong className="text-[var(--lp-text)]">18-month job search visa (§20)</strong>, <strong className="text-[var(--lp-text)]">EU Blue Card</strong> at reduced thresholds (€45,934/yr), and <strong className="text-[var(--lp-text)]">permanent residence in 21 months</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a 
              href="#section-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Check Blue Card Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#section-job-seeker"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#eae5db]/60 text-[var(--lp-text)] hover:bg-[#eae5db] border border-[#e5e0d3] transition-colors text-xs font-semibold"
            >
              <Clock className="w-3.5 h-3.5 text-[var(--lp-red)]" />
              <span>18-Month Search Visa</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--lp-muted)] pt-2 border-t border-[#e5e0d3]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>18-Month Unrestricted Work Rights</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>21-Mo PR with B1 German</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
              <span>Dual Citizenship Permitted</span>
            </span>
          </div>
        </div>

        {/* Right Column: Key Career Benchmarks */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3">
            <h2 className="font-serif text-lg font-normal text-[var(--lp-ink)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
              <span>Career Benchmarks</span>
            </h2>
            <span className="text-[10px] font-mono text-[var(--lp-muted)]">2026 Thresholds</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--lp-muted)] font-mono uppercase text-[10px]">Recent Graduate Blue Card</span>
                <span className="font-serif text-lg font-normal text-[var(--lp-red)]">€45,934</span>
              </div>
              <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                Applies to STEM graduates and any university alumnus within 3 years of degree completion.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--lp-muted)] font-mono uppercase text-[10px]">Fast-Track Permanent Residence</span>
                <span className="font-serif text-lg font-normal text-[var(--lp-ink)]">21 Months</span>
              </div>
              <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                Settlement permit with B1 German certificate (or 27 months with basic A1 German).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--lp-muted)] font-mono uppercase text-[10px]">German Naturalization</span>
                <span className="font-serif text-lg font-normal text-[var(--lp-gold)]">5 Years</span>
              </div>
              <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                Student visa years count towards total stay. Dual citizenship fully recognized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
