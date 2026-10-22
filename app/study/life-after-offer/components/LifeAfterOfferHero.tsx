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
    <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.3), rgba(201,163,91,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Careers &amp; Settlement</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Headline & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Post-Study &amp; Career Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[50px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              Life After the Offer: <em className="lp-script text-[var(--lp-red)]">Careers, Blue Card &amp; PR</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.65] font-normal max-w-xl">
              Germany faces acute engineering and STEM labor shortages. Convert your university admit into a European career with an <strong className="text-[var(--lp-text)]">18-month job search visa (§20)</strong>, <strong className="text-[var(--lp-text)]">EU Blue Card</strong> at reduced thresholds (€45,934/yr), and <strong className="text-[var(--lp-text)]">permanent residence in 21 months</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link 
                href="/tools/net-salary-calculator"
                className="lp-btn lp-btn--red text-xs font-semibold shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculate Net Salary &amp; Blue Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a 
                href="#section-job-seeker"
                className="lp-btn lp-btn--dark text-xs font-semibold"
              >
                <Clock className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                <span>18-Month Search Visa</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--lp-muted)] pt-2 border-t border-[var(--lp-rule)]">
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
          <div className="lg:col-span-5 bg-[var(--lp-card)] rounded-3xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.05)]">
            <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
              <h2 className="lp-serif text-xl font-semibold text-[var(--lp-text)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
                <span>Career Benchmarks</span>
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-2.5 py-0.5 rounded-full border border-[var(--lp-gold)]/20">
                2026 Thresholds
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--lp-muted)] font-semibold uppercase text-[10px]">Recent Graduate Blue Card</span>
                  <span className="lp-serif text-lg font-semibold text-[var(--lp-red)]">€45,934</span>
                </div>
                <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                  Applies to STEM graduates and any university alumnus within 3 years of degree completion.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--lp-muted)] font-semibold uppercase text-[10px]">Fast-Track Permanent Residence</span>
                  <span className="lp-serif text-lg font-semibold text-[var(--lp-text)]">21 Months</span>
                </div>
                <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                  Settlement permit with B1 German certificate (or 27 months with basic A1 German).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eae5db]/50 border border-[#e2ddd3] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--lp-muted)] font-semibold uppercase text-[10px]">German Naturalization</span>
                  <span className="lp-serif text-lg font-semibold text-[var(--lp-gold)]">5 Years</span>
                </div>
                <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">
                  Student visa years count towards total stay. Dual citizenship fully recognized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
