"use client";
import React from 'react';
import { UtensilsCrossed, ShoppingCart, Sparkles, Tag, CheckCircle2 } from 'lucide-react';

export const FoodAndGroceriesSection = () => {
  return (
    <section id="section-food" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            03
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Daily Necessities</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Food &amp; Grocery Expenses
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          Germany has some of the most competitive supermarket pricing in Western Europe. International students can eat nutritious, well-balanced meals without breaking the bank.
        </p>

        {/* 3 Monthly Food Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Budget Cook</span>
              <span className="text-xl font-black text-germany-black">€150 – €200<span className="text-xs font-normal text-gray-500">/mo</span></span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Home Cooking Baseline</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              100% home-cooked meals bought at discount supermarkets (Aldi, Lidl, Netto). Simple, cost-effective, and highly realistic.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 shadow-sm space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-germany-red bg-red-100 px-2.5 py-1 rounded-full">Most Common</span>
              <span className="text-xl font-black text-germany-black">€200 – €300<span className="text-xs font-normal text-gray-500">/mo</span></span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Balanced Student Mix</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Mainly home cooking + daily university <em>Mensa</em> lunch + weekend coffee or street food (Kebab, Currywurst, Pizza).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Dining Out</span>
              <span className="text-xl font-black text-germany-black">€300 – €450<span className="text-xs font-normal text-gray-500">/mo</span></span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Frequent Restaurant Dining</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Regular restaurant dinners (€10–€20 per meal) and frequent food delivery app orders (Lieferando, UberEats).
            </p>
          </div>
        </div>

        {/* Supermarket Guide Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm font-medium">
            <thead className="bg-germany-black text-white text-xs uppercase tracking-wider font-extrabold">
              <tr>
                <th className="py-4 px-5">Supermarket Chains</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr className="hover:bg-gray-50">
                <td className="py-3.5 px-5 font-bold text-germany-black">Aldi Süd / Nord, Lidl</td>
                <td className="py-3.5 px-5 text-green-700 font-extrabold text-xs">Hard Discount</td>
                <td className="py-3.5 px-5 text-gray-700 text-xs font-medium">Cheapest staples (rice, pasta, eggs, milk, fruits, veggies).</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3.5 px-5 font-bold text-germany-black">Penny, Netto</td>
                <td className="py-3.5 px-5 text-green-700 font-extrabold text-xs">Discount</td>
                <td className="py-3.5 px-5 text-gray-700 text-xs font-medium">Quick everyday grocery essentials at lower prices.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3.5 px-5 font-bold text-germany-black">REWE, Edeka</td>
                <td className="py-3.5 px-5 text-amber-700 font-extrabold text-xs">Standard Premium</td>
                <td className="py-3.5 px-5 text-gray-700 text-xs font-medium">Broader brand selection, fresh deli, international items.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3.5 px-5 font-bold text-germany-black">Asian &amp; Indian Supermarkets</td>
                <td className="py-3.5 px-5 text-germany-red font-extrabold text-xs">Specialty Import</td>
                <td className="py-3.5 px-5 text-gray-700 text-xs font-medium">Spices, Basmati rice, lentils (dal), noodles, sauces from home.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3.5 px-5 font-bold text-germany-black">Turkish Markets (e.g. Eurogida)</td>
                <td className="py-3.5 px-5 text-germany-red font-extrabold text-xs">Fresh Produce &amp; Halal</td>
                <td className="py-3.5 px-5 text-gray-700 text-xs font-medium">Fresh vegetables at low prices, bulk herbs, halal meat.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mensa Feature Highlight */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-extrabold text-germany-black text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              University Cafeteria (Mensa) Subsidies
            </h4>
            <p className="text-xs text-gray-700 font-medium leading-relaxed max-w-2xl">
              German university <em>Mensas</em> are heavily state-subsidized. A full, hot, nutritious lunch (including vegetarian/vegan choices) costs between <strong className="text-germany-black">€2.50 and €4.50</strong> for registered students.
            </p>
          </div>
          <div className="px-4 py-2 bg-amber-200/70 text-amber-900 font-extrabold text-xs rounded-xl shrink-0">
            ~€3.00 Avg Meal
          </div>
        </div>
      </div>
    </section>
  );
};
