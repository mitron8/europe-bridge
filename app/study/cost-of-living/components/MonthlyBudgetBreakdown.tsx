"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Info, CheckCircle2, TrendingUp } from 'lucide-react';

export const MonthlyBudgetBreakdown = () => {
  return (
    <section id="section-breakdown" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            01
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Financial Baseline 2026
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Itemized Monthly <em className="lp-script text-[var(--lp-red)]">Budget Breakdown</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          The German Federal Ministry of Education and Research sets the mandatory student visa financial proof (Blocked Account) at <strong className="text-[var(--lp-text)] font-semibold">€11,904 per year (€992 per month)</strong>. This amount represents the official minimum required to cover basic living expenses. Below is how that budget translates in real life across different German city tiers:
        </p>

        {/* Budget Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3] shadow-xs">
          <table className="w-full text-left text-sm font-normal">
            <thead className="bg-[var(--lp-ink)] text-white text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-5">Expense Category</th>
                <th className="py-4 px-5 text-white/90">Budget City <span className="block text-[10px] text-white/60 normal-case font-normal">e.g. Leipzig, Chemnitz</span></th>
                <th className="py-4 px-5 text-[var(--lp-gold-soft)]">Mid-Range City <span className="block text-[10px] text-white/60 normal-case font-normal">e.g. Berlin, Hannover</span></th>
                <th className="py-4 px-5 text-white/90">Expensive City <span className="block text-[10px] text-white/60 normal-case font-normal">e.g. Munich, Frankfurt</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7dd] bg-white/70">
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Rent (Shared Flat Room)</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€280 – €380</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€400 – €500</td>
                <td className="py-3.5 px-5 text-[var(--lp-red)] font-semibold">€550 – €750</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Food &amp; Groceries</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€180 – €220</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€220 – €280</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€250 – €320</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Public Health Insurance</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€141 – €146</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€141 – €146</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€141 – €146</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Public Transit (Deutschlandticket)</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€63</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€63</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€63</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Phone SIM &amp; Home Broadband</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€15 – €25</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€15 – €25</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€15 – €25</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Books &amp; Study Materials</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€20 – €30</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€20 – €40</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€20 – €40</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Personal Care &amp; Entertainment</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€50 – €100</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€80 – €150</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)]">€100 – €200</td>
              </tr>
              <tr className="bg-[#ece7dd]/80 font-bold text-[var(--lp-text)]">
                <td className="py-4 px-5 text-base lp-serif">Total Monthly Spend</td>
                <td className="py-4 px-5 text-base text-[var(--lp-text)]">€730 – €930</td>
                <td className="py-4 px-5 text-base text-[var(--lp-gold)]">€920 – €1,200</td>
                <td className="py-4 px-5 text-base text-[var(--lp-red)]">€1,120 – €1,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* City Categorization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-muted)]">Budget-Friendly Cities</span>
            <p className="text-sm text-[var(--lp-text)] font-semibold">Leipzig, Chemnitz, Magdeburg, Greifswald, Ilmenau, Siegen</p>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Ideal for students on tight budgets. Very affordable student dorms and shared flat rooms under €350/mo.</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-gold)]">Mid-Range Cities</span>
            <p className="text-sm text-[var(--lp-text)] font-semibold">Berlin, Hannover, Bremen, Dortmund, Aachen, Dresden</p>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Balanced cost of living with vibrant tech hubs, student life, and abundant part-time working student jobs.</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">High-Cost Metropolises</span>
            <p className="text-sm text-[var(--lp-text)] font-semibold">Munich, Frankfurt, Stuttgart, Hamburg, Cologne</p>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Competitive housing markets, but compensated by higher student hourly pay rates (€14–20/hr) and top corporate headquarters.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
