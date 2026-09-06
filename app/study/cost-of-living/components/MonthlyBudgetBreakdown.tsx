"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Info, CheckCircle2, TrendingUp } from 'lucide-react';

export const MonthlyBudgetBreakdown = () => {
  return (
    <section id="section-breakdown" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            01
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Financial Baseline 2026</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Itemized Monthly Budget Breakdown
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          The German Federal Ministry of Education and Research sets the mandatory student visa financial proof (Blocked Account) at <strong className="text-germany-black">€11,904 per year (€992 per month)</strong>. This amount represents the official minimum required to cover basic living expenses. Below is how that budget translates in real life across different German city tiers:
        </p>

        {/* Budget Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm font-medium">
            <thead className="bg-germany-black text-white text-xs uppercase tracking-wider font-extrabold">
              <tr>
                <th className="py-4 px-5">Expense Category</th>
                <th className="py-4 px-5 text-green-400">Budget City <span className="block text-[10px] text-gray-400 normal-case">e.g. Leipzig, Chemnitz</span></th>
                <th className="py-4 px-5 text-amber-400">Mid-Range City <span className="block text-[10px] text-gray-400 normal-case">e.g. Berlin, Hannover</span></th>
                <th className="py-4 px-5 text-red-400">Expensive City <span className="block text-[10px] text-gray-400 normal-case">e.g. Munich, Frankfurt</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900 flex items-center gap-2">
                  <span>Rent (Shared Flat Room)</span>
                </td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€280 – €380</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€400 – €500</td>
                <td className="py-3.5 px-5 text-germany-red font-bold">€550 – €750</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Food & Groceries</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€180 – €220</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€220 – €280</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€250 – €320</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Public Health Insurance</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€141 – €146</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€141 – €146</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€141 – €146</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Public Transit (Deutschlandticket)</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€63</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€63</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€63</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Phone SIM & Home Broadband</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€15 – €25</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€15 – €25</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€15 – €25</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Books & Study Materials</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€20 – €30</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€20 – €40</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€20 – €40</td>
              </tr>
              <tr className="hover:bg-red-50/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-gray-900">Personal Care & Entertainment</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€50 – €100</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€80 – €150</td>
                <td className="py-3.5 px-5 text-gray-700 font-semibold">€100 – €200</td>
              </tr>
              <tr className="bg-red-100/60 font-black text-germany-black">
                <td className="py-4 px-5 text-base font-display">Total Monthly Spend</td>
                <td className="py-4 px-5 text-base text-green-700">€730 – €930</td>
                <td className="py-4 px-5 text-base text-amber-700">€920 – €1,200</td>
                <td className="py-4 px-5 text-base text-red-700">€1,120 – €1,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* City Categorization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-green-50/60 border border-green-200 space-y-2">
            <span className="text-xs font-black uppercase text-green-700 tracking-wider">Budget-Friendly Cities</span>
            <p className="text-sm text-gray-700 font-semibold">Leipzig, Chemnitz, Magdeburg, Greifswald, Ilmenau, Siegen</p>
            <p className="text-xs text-gray-500">Ideal for students on tight budgets. Very affordable student dorms and shared flat rooms under €350/mo.</p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">Mid-Range Cities</span>
            <p className="text-sm text-gray-700 font-semibold">Berlin, Hannover, Bremen, Dortmund, Aachen, Dresden</p>
            <p className="text-xs text-gray-500">Balanced cost of living with vibrant tech hubs, student life, and abundant part-time working student jobs.</p>
          </div>
          <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
            <span className="text-xs font-black uppercase text-red-700 tracking-wider">High-Cost Metropolises</span>
            <p className="text-sm text-gray-700 font-semibold">Munich, Frankfurt, Stuttgart, Hamburg, Cologne</p>
            <p className="text-xs text-gray-500">Competitive housing markets, but compensated by higher student hourly pay rates (€14–20/hr) and top corporate headquarters.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
