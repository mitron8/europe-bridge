"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, Briefcase, Landmark, Calculator, ArrowRight, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

export const AlternativeFundingSection = () => {
  return (
    <section id="alternative-funding" className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Wallet className="w-4 h-4" />
            <span>Financial Planning & Safety Nets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Didn’t Win a Full Scholarship? Don’t Worry.
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Germany is one of the only countries worldwide where you do <strong>not</strong> need a scholarship to afford an elite education. With €0 tuition and generous student work rights, you can comfortably finance your degree.
          </p>
        </div>

        {/* 4 Alternative Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Working Student & Part-Time Jobs */}
          <div className="neu-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-germany-black">140 Full Days / 280 Half Days</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Germany’s updated skilled immigration law allows students to work up to <strong>140 full days</strong> per year. Working student jobs in tech, engineering, and finance pay <strong>€14 to €22 / hr</strong> (€1,100–€1,700/mo).
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs font-bold text-emerald-700">
              Covers 100% of Living Expenses
            </div>
          </div>

          {/* 2. Minijob Tax-Free Threshold */}
          <div className="neu-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-germany-black">Tax-Free Minijobs</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Earn up to <strong>€538 – €603 per month</strong> completely free of German income taxes and social security contributions. Ideal for cafes, tutoring, logistics, and campus libraries.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs font-bold text-amber-800">
              Zero Tax Deduction
            </div>
          </div>

          {/* 3. Blocked Account */}
          <div className="neu-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-germany-red">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-germany-black">Blocked Account</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                The German student visa requirement of <strong>€11,904/year (€992/month)</strong>. Once you arrive in Germany, €992 unlocks into your local current account every single month.
              </p>
            </div>
            <Link
              href="/services/blocked-account"
              className="pt-3 border-t border-gray-100 text-xs font-bold text-germany-red hover:underline flex items-center gap-1"
            >
              <span>Blocked Account Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Non-Collateral Education Loans */}
          <div className="neu-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-germany-black">Education Loans</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Collateral-free and secured education loans covering your blocked account deposit, flight tickets, and visa fees. Repayment starts only after you land a full-time job.
              </p>
            </div>
            <Link
              href="/services/education-loan"
              className="pt-3 border-t border-gray-100 text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>Explore Loan Options</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cost of Living Cross-Link Banner */}
        <div className="neu-card p-6 sm:p-8 bg-gradient-to-r from-[#FDFBF7] via-amber-50/30 to-red-50/30 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-200/60 text-amber-950 text-[11px] font-black uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Budget Planner</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-germany-black">
              Calculate Your Real Monthly Living Expenses in Germany
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              Explore city-by-city rent benchmarks (Berlin vs. Munich vs. Aachen), food costs, public transit discounts (€63/month Deutschlandticket), and student health insurance rates.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/study/cost-of-living"
              className="neu-btn-primary px-6 py-3 text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>Open Cost of Living Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
