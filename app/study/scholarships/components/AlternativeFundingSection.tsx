"use client";

import React from 'react';
import Link from 'next/link';
import { Wallet, Briefcase, Landmark, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const AlternativeFundingSection = () => {
  return (
    <section id="alternative-funding" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Financial Safety Nets
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Didn&apos;t Win a Full Grant? <em className="italic text-[var(--lp-red)] font-serif">Here is the Plan.</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Germany is unique: with <strong className="text-[var(--lp-text)]">0€ tuition</strong> and statutory work rights, a scholarship is not required to afford an elite German education.
        </p>
      </div>

      {/* 4 Alternative Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Working Student & Part-Time Jobs */}
        <div className="bg-[#faf8f3] rounded-2xl p-5 sm:p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">140 Full Days Work Rule</h3>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Work up to 140 full days per year. Werkstudent jobs in tech, engineering, and business pay <strong className="text-[var(--lp-text)]">€16–€24 / hr</strong> (€1,200–€1,900/mo).
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5e0d3] text-xs font-mono text-[var(--lp-gold)]">
            Covers 100% of Living Expenses
          </div>
        </div>

        {/* 2. Minijob Tax-Free Threshold */}
        <div className="bg-[#faf8f3] rounded-2xl p-5 sm:p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
              <Wallet className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">Tax-Free Minijobs</h3>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Earn up to <strong className="text-[var(--lp-text)]">€538 / month</strong> completely exempt from German income tax and social security contributions.
            </p>
          </div>
          <div className="pt-3 border-t border-[#e5e0d3] text-xs font-mono text-[var(--lp-gold)]">
            Zero Income Tax
          </div>
        </div>

        {/* 3. Blocked Account */}
        <div className="bg-[#faf8f3] rounded-2xl p-5 sm:p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
              <ShieldCheck className="w-4 h-4 text-[var(--lp-red)]" />
            </div>
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">Blocked Account</h3>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Mandatory visa proof of <strong className="text-[var(--lp-text)]">€11,904</strong>. Unlocks €992 into your personal current account each month upon arrival.
            </p>
          </div>
          <Link
            href="/services/blocked-account"
            className="pt-3 border-t border-[#e5e0d3] text-xs font-semibold text-[var(--lp-red)] hover:underline flex items-center gap-1"
          >
            <span>Blocked Account Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4. Education Loans */}
        <div className="bg-[#faf8f3] rounded-2xl p-5 sm:p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
              <Landmark className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">Education Loans</h3>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Collateral-free and secured education loans to fund your blocked account deposit, flight tickets, and visa processing fees.
            </p>
          </div>
          <Link
            href="/services/education-loan"
            className="pt-3 border-t border-[#e5e0d3] text-xs font-semibold text-[var(--lp-red)] hover:underline flex items-center gap-1"
          >
            <span>Explore Loan Options</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
