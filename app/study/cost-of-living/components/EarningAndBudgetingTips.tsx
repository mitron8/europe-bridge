"use client";
import React from 'react';
import { PiggyBank, Briefcase, CreditCard, Radio, Percent, CheckCircle2 } from 'lucide-react';

export const EarningAndBudgetingTips = () => {
  return (
    <section id="section-budgeting" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            06
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Financial Optimization</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Smart Budgeting &amp; Earning While Studying
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          International students in Germany are legally permitted to work part-time to subsidize their living costs. Combining part-time income with student discounts ensures financial independence.
        </p>

        {/* Earning While Studying Box */}
        <div className="p-6 rounded-2xl bg-gray-900 text-white space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <Briefcase className="w-6 h-6 text-germany-red" />
            <div>
              <h3 className="font-extrabold text-white text-lg">Work Allowance Regulations (2026)</h3>
              <p className="text-xs text-gray-400">German Student Visa Work Rights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs font-black text-germany-gold uppercase tracking-wider">Legal Allowance</span>
              <div className="text-xl font-black text-white">140 Full Days <span className="text-xs font-normal text-gray-400">or 280 Half Days / yr</span></div>
              <p className="text-xs text-gray-300">Under German immigration law, non-EU students can work up to 20 hours per week during term time.</p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs font-black text-green-400 uppercase tracking-wider">Minijob Tax-Free Limit</span>
              <div className="text-xl font-black text-white">€603 / month</div>
              <p className="text-xs text-gray-300">Effective 2026, Minijob earnings up to €603/mo are completely tax-free and exempt from social contributions.</p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs font-black text-red-400 uppercase tracking-wider">Werkstudent Position</span>
              <div className="text-xl font-black text-white">€14 – €20 / hour</div>
              <p className="text-xs text-gray-300">Working student jobs at companies in your field (Software, Engineering, Finance) earn €1,100–€1,500 gross/mo.</p>
            </div>
          </div>
        </div>

        {/* GEZ Broadcasting Fee & Banking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GEZ Broadcast Fee */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <h3 className="font-extrabold text-germany-black text-lg flex items-center gap-2">
              <Radio className="w-5 h-5 text-amber-700" />
              GEZ Broadcasting Fee (Rundfunkbeitrag)
            </h3>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              Every household in Germany must pay the mandatory TV/Radio fee of <strong className="text-germany-black">€18.36 per month</strong>.
            </p>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-gray-700 font-semibold space-y-1">
              <div>💡 <strong>WG Flatmate Hack:</strong> In a shared flat (WG), only ONE person pays for the whole apartment. Split the €18.36 fee evenly among all flatmates (~€4.50/mo per person)!</div>
            </div>
          </div>

          {/* Student Banking */}
          <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
            <h3 className="font-extrabold text-germany-black text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-germany-red" />
              Free Student Banking &amp; Transfers
            </h3>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Open a free digital current account (<em>Girokonto</em>) with <strong>N26, DKB, or ING</strong> to avoid monthly bank maintenance fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Use <strong>Wise</strong> or <strong>Revolut</strong> for international currency transfers to get mid-market exchange rates without hidden bank markups.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
