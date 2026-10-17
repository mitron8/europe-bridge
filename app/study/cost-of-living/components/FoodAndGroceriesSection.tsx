"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ShoppingCart, Tag, CheckCircle2 } from 'lucide-react';

export const FoodAndGroceriesSection = () => {
  return (
    <section id="section-food" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            03
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
              Daily Necessities
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Food &amp; <em className="lp-script text-[var(--lp-red)]">Grocery Expenses</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Germany has some of the most competitive supermarket pricing in Western Europe. International students can eat nutritious, well-balanced meals without breaking the bank.
        </p>

        {/* 3 Monthly Food Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-text)] bg-[#ece7dd] px-2.5 py-1 rounded-full border border-[#e2ddd3]">Budget Cook</span>
              <span className="lp-serif text-xl font-bold text-[var(--lp-text)]">€150 – €200<span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span></span>
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">Home Cooking Baseline</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              100% home-cooked meals bought at discount supermarkets (Aldi, Lidl, Netto). Simple, cost-effective, and highly realistic.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/60 border border-[var(--lp-rule-strong)] space-y-3 relative shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2.5 py-1 rounded-full border border-[var(--lp-red)]/20">Most Common</span>
              <span className="lp-serif text-xl font-bold text-[var(--lp-text)]">€200 – €300<span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span></span>
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">Balanced Student Mix</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Mainly home cooking + daily university <em>Mensa</em> lunch + weekend coffee or street food (Kebab, Currywurst, Pizza).
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold-soft)]/50 px-2.5 py-1 rounded-full border border-[var(--lp-gold)]/30">Dining Out</span>
              <span className="lp-serif text-xl font-bold text-[var(--lp-text)]">€300 – €450<span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span></span>
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">Frequent Restaurant Dining</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Regular restaurant dinners (€10–€20 per meal) and frequent food delivery app orders (Lieferando, UberEats).
            </p>
          </motion.div>
        </div>

        {/* Supermarket Guide Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3] shadow-xs">
          <table className="w-full text-left text-sm font-normal">
            <thead className="bg-[var(--lp-ink)] text-white text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-5">Supermarket Chains</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7dd] bg-white/70">
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Aldi Süd / Nord, Lidl</td>
                <td className="py-3.5 px-5 text-[var(--lp-text)] font-semibold text-xs">Hard Discount</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)] text-xs">Cheapest staples (rice, pasta, eggs, milk, fruits, veggies).</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Penny, Netto</td>
                <td className="py-3.5 px-5 text-[var(--lp-text)] font-semibold text-xs">Discount</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)] text-xs">Quick everyday grocery essentials at lower prices.</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">REWE, Edeka</td>
                <td className="py-3.5 px-5 text-[var(--lp-gold)] font-semibold text-xs">Standard Premium</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)] text-xs">Broader brand selection, fresh deli, international items.</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Asian &amp; Indian Supermarkets</td>
                <td className="py-3.5 px-5 text-[var(--lp-red)] font-semibold text-xs">Specialty Import</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)] text-xs">Spices, Basmati rice, lentils (dal), noodles, sauces from home.</td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[var(--lp-text)]">Turkish Markets (e.g. Eurogida)</td>
                <td className="py-3.5 px-5 text-[var(--lp-red)] font-semibold text-xs">Fresh Produce &amp; Halal</td>
                <td className="py-3.5 px-5 text-[var(--lp-muted)] text-xs">Fresh vegetables at low prices, bulk herbs, halal meat.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mensa Feature Highlight */}
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-[var(--lp-gold)]" />
              University Cafeteria (Mensa) Subsidies
            </h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed max-w-2xl">
              German university <em>Mensas</em> are heavily state-subsidized. A full, hot, nutritious lunch (including vegetarian/vegan choices) costs between <strong className="text-[var(--lp-text)] font-semibold">€2.50 and €4.50</strong> for registered students.
            </p>
          </div>
          <div className="px-4 py-2 bg-[var(--lp-gold-soft)]/60 text-[var(--lp-text)] font-semibold text-xs rounded-full shrink-0 border border-[var(--lp-gold)]/40 shadow-xs">
            ~€3.00 Avg Meal
          </div>
        </motion.div>
      </div>
    </section>
  );
};
