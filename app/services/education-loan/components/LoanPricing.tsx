"use client";
import React from 'react';
import { Tag, Percent, ShieldCheck } from 'lucide-react';

export const LoanPricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-6 shadow-[0_4px_24px_rgba(22,22,26,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-gold)] flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[var(--lp-gold)]" /> Customized Interest Rates &amp; Terms
            </span>
            <h3 className="lp-serif text-2xl sm:text-3xl font-semibold text-[var(--lp-text)]">
              Transparent Pricing &amp; Zero Platform Markups
            </h3>
          </div>
          <span className="px-4 py-1.5 bg-[var(--lp-ink)] text-white font-semibold text-xs rounded-full w-fit shadow-xs">
            No Extra Advisory Fees
          </span>
        </div>

        <p className="text-sm sm:text-[15px] text-[var(--lp-muted)] leading-relaxed max-w-3xl font-normal">
          Interest rates and loan processing fees are determined directly by partner financial institutions (like HDFC Credila) based on your academic profile, GRE/IELTS scores, course, co-borrower income, and collateral status. EuropeBridge provides completely free counseling and application tracking without adding any hidden charges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-[#ece7dd]/50 rounded-2xl border border-[#e2ddd3] space-y-1.5">
            <span className="text-[11px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Competitive Interest Rate</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">10.25% – 11.75% <span className="text-xs font-normal text-[var(--lp-muted)]">p.a.</span></div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Customized rates based on credit score &amp; profile strength.</p>
          </div>

          <div className="p-5 bg-[#ece7dd]/50 rounded-2xl border border-[#e2ddd3] space-y-1.5">
            <span className="text-[11px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Moratorium Period</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">Course Duration + 12 Mo</div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">No principal repayment required while studying in Germany.</p>
          </div>

          <div className="p-5 bg-[#ece7dd]/50 rounded-2xl border border-[#e2ddd3] space-y-1.5">
            <span className="text-[11px] font-semibold text-[var(--lp-gold)] uppercase tracking-wider">Tax Benefit (Sec 80E)</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">100% Tax Deduction</div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Interest paid is 100% tax deductible under Indian Income Tax Section 80E.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
