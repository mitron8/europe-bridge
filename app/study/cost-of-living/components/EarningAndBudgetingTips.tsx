"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Briefcase, CreditCard, Radio, Percent, CheckCircle2 } from 'lucide-react';

export const EarningAndBudgetingTips = () => {
  return (
    <section id="section-budgeting" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            06
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
              Financial Optimization
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Smart Budgeting &amp; <em className="lp-script text-[var(--lp-red)]">Earning While Studying</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          International students in Germany are legally permitted to work part-time to subsidize their living costs. Combining part-time income with student discounts ensures financial independence.
        </p>

        {/* Earning While Studying Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0d10] text-white space-y-6 shadow-md border border-white/10">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Briefcase className="w-6 h-6 text-[var(--lp-red)]" />
            <div>
              <h3 className="lp-serif text-xl font-semibold text-white">Work Allowance Regulations (2026)</h3>
              <p className="text-xs text-white/60">German Student Visa Work Rights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="space-y-2 p-4 bg-white/[0.04] rounded-xl border border-white/10">
              <span className="text-[10.5px] font-semibold text-[var(--lp-gold-soft)] uppercase tracking-wider">Legal Allowance</span>
              <div className="lp-serif text-xl font-bold text-white">140 Full Days <span className="text-xs font-normal text-white/60">or 280 Half Days / yr</span></div>
              <p className="text-xs text-white/70 leading-relaxed">Under German immigration law, non-EU students can work up to 20 hours per week during term time.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="space-y-2 p-4 bg-white/[0.04] rounded-xl border border-white/10">
              <span className="text-[10.5px] font-semibold text-[var(--lp-gold-soft)] uppercase tracking-wider">Minijob Tax-Free Limit</span>
              <div className="lp-serif text-xl font-bold text-white">€603 / month</div>
              <p className="text-xs text-white/70 leading-relaxed">Effective 2026, Minijob earnings up to €603/mo are completely tax-free and exempt from social contributions.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="space-y-2 p-4 bg-white/[0.04] rounded-xl border border-white/10">
              <span className="text-[10.5px] font-semibold text-white/80 uppercase tracking-wider">Working Student Position</span>
              <div className="lp-serif text-xl font-bold text-white">€14 – €20 / hour</div>
              <p className="text-xs text-white/70 leading-relaxed">Working student jobs at companies in your field (Software, Engineering, Finance) earn €1,100–€1,500 gross/mo.</p>
            </motion.div>
          </div>
        </div>

        {/* GEZ Broadcasting Fee & Banking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GEZ Broadcast Fee */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <Radio className="w-5 h-5 text-[var(--lp-gold)]" />
              Broadcasting Fee (GEZ)
            </h3>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Every household in Germany must pay the mandatory TV/Radio fee of <strong className="text-[var(--lp-text)] font-semibold">€18.36 per month</strong>.
            </p>
            <div className="p-3.5 bg-white/70 rounded-xl border border-[#e2ddd3] text-xs text-[var(--lp-text)] space-y-1 shadow-xs">
              <div>💡 <strong className="font-semibold">Shared Flat Hack:</strong> In a shared flat, only ONE person pays for the whole apartment. Split the €18.36 fee evenly among all flatmates (~€4.50/mo per person)!</div>
            </div>
          </motion.div>

          {/* Student Banking */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[var(--lp-red)]" />
              Free Student Banking &amp; Transfers
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Open a free digital checking account with <strong className="text-[var(--lp-text)] font-semibold">N26, DKB, or ING</strong> to avoid monthly bank maintenance fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>Use <strong className="text-[var(--lp-text)] font-semibold">Wise</strong> or <strong className="text-[var(--lp-text)] font-semibold">Revolut</strong> for international currency transfers to get mid-market exchange rates without hidden bank markups.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
