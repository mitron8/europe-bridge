"use client";
import React from 'react';
import { Tag, Percent, ShieldCheck } from 'lucide-react';

export const LoanPricing = () => {
  return (
    <section className="py-8 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 bg-amber-50/70 border border-amber-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> Customized Interest Rates &amp; Terms
            </span>
            <h3 className="text-2xl font-black text-germany-black font-display">
              Transparent Pricing &amp; Zero Platform Markups
            </h3>
          </div>
          <span className="px-4 py-2 bg-germany-black text-white font-extrabold text-xs rounded-xl w-fit">
            No Extra Advisory Fees
          </span>
        </div>

        <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-3xl">
          Interest rates and loan processing fees are determined directly by partner financial institutions (like HDFC Credila) based on your academic profile, GRE/IELTS scores, course, co-borrower income, and collateral status. EuropeBridge provides completely free counseling and application tracking without adding any hidden charges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Competitive Interest Rate</span>
            <div className="text-lg font-black text-germany-black">10.25% – 11.75% <span className="text-xs font-normal text-gray-500">p.a.</span></div>
            <p className="text-[11px] text-gray-500 font-medium">Customized rates based on credit score &amp; profile strength.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Moratorium Period</span>
            <div className="text-lg font-black text-germany-black">Course Duration + 12 Months</div>
            <p className="text-[11px] text-gray-500 font-medium">No principal repayment required while studying in Germany.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-green-800 uppercase">Tax Benefit (Sec 80E)</span>
            <div className="text-lg font-black text-green-800">100% Tax Deduction</div>
            <p className="text-[11px] text-gray-500 font-medium">Interest paid is 100% tax deductible under Indian Income Tax Section 80E.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
