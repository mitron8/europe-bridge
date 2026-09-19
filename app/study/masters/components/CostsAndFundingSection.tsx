"use client";

import React from 'react';
import { DollarSign, Euro, Wallet, PiggyBank, Award, CheckCircle2, ShieldCheck, ArrowRight, Building } from 'lucide-react';
import Link from 'next/link';

export const CostsAndFundingSection = () => {
  const expenseBreakdown = [
    { category: "Student Housing (Warmmiete)", cost: "€380 – €650 / month", desc: "Includes heating, electricity, water & internet in student dormitories (Studentenwohnheim) or shared flats (WG)." },
    { category: "Public Health Insurance", cost: "€130 / month", desc: "Statutory student health coverage (TK, Barmer, AOK) granting free doctor visits and hospital treatment." },
    { category: "Food & Groceries", cost: "€200 – €260 / month", desc: "Supermarkets (Lidl, Aldi, Rewe) plus subsidized university canteen meals (Mensa) costing €3–€5." },
    { category: "Mobile, Wi-Fi & GEZ", cost: "€35 – €50 / month", desc: "Unlimited 5G mobile plan + mandatory household broadcasting fee (Rundfunkbeitrag split across WG)." },
    { category: "Semester Ticket (Transit)", cost: "Included in Semesterbeitrag", desc: "Covers free regional buses, trams, U-Bahn, S-Bahn, and regional RE trains throughout the semester." },
    { category: "Personal & Leisure", cost: "€100 – €150 / month", desc: "Clothing, gym memberships, weekend outings, and European student travel." },
  ];

  const cityComparison = [
    { city: "Munich / Frankfurt", tier: "Tier 1 (High Cost)", rent: "€550 – €800", total: "€1,100 – €1,350/mo", note: "Top engineering & finance hubs; high Werkstudent hourly pay (€18–€25/hr)." },
    { city: "Berlin / Hamburg / Stuttgart", tier: "Tier 1.5 (Moderate-High)", rent: "€450 – €650", total: "€1,000 – €1,200/mo", note: "Thriving tech startup ecosystem, automotive and aerospace corridors." },
    { city: "Aachen / Dresden / Leipzig", tier: "Tier 2 (Student-Friendly)", rent: "€300 – €450", total: "€800 – €950/mo", note: "Massive student density, very affordable living, excellent TU9 institutions." },
    { city: "Ilmenau / Clausthal / Chemnitz", tier: "Tier 3 (Ultra Low Cost)", rent: "€220 – €320", total: "€700 – €820/mo", note: "Lowest cost of living in Germany, highly specialized engineering faculties." },
  ];

  return (
    <section id="costs" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-xs font-black uppercase tracking-wider">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Financial Planning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          Tuition, Living Costs &amp; <span className="text-germany-red">Funding Your Degree</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany is one of the most cost-effective study abroad destinations in the world. Understand the real numbers without hidden agency surprises.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neu-card p-6 bg-white space-y-3 border-t-4 border-germany-red">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Public Tuition</span>
            <Euro className="w-5 h-5 text-germany-red" />
          </div>
          <div className="text-3xl font-display font-black text-germany-black">0€ / Year</div>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            15 out of 16 German federal states charge <strong>zero tuition</strong> for international master&apos;s students. Baden-Württemberg is the single exception charging €1,500/semester.
          </p>
        </div>

        <div className="neu-card p-6 bg-white space-y-3 border-t-4 border-germany-gold">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Blocked Account (2026)</span>
            <Wallet className="w-5 h-5 text-germany-gold" />
          </div>
          <div className="text-3xl font-display font-black text-germany-black">€11,904 / Year</div>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Statutory proof of financial resources mandated for the German national student visa. Unlocks <strong>€992/month</strong> directly into your German bank account.
          </p>
        </div>

        <div className="neu-card p-6 bg-white space-y-3 border-t-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Average Monthly Cost</span>
            <PiggyBank className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-display font-black text-germany-black">€850 – €1,150</div>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Covers rent, compulsory public health insurance, groceries, transit, and mobile. Can be fully offset via part-time Werkstudent work (€1,000–€1,600/mo).
          </p>
        </div>
      </div>

      {/* Monthly Budget Breakdown & City Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Breakdown Items */}
        <div className="lg:col-span-6 neu-card p-6 sm:p-7 bg-white space-y-4">
          <h3 className="font-display text-xl font-bold text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
            <Euro className="w-5 h-5 text-germany-red" />
            <span>Detailed Monthly Living Budget</span>
          </h3>

          <div className="space-y-3">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-germany-black">{item.category}</span>
                  <span className="font-extrabold text-xs text-germany-red">{item.cost}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* City Tiers Table */}
        <div className="lg:col-span-6 neu-card p-6 sm:p-7 bg-white space-y-4">
          <h3 className="font-display text-xl font-bold text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
            <Building className="w-5 h-5 text-germany-gold" />
            <span>Living Cost Variations by City</span>
          </h3>

          <div className="space-y-3">
            {cityComparison.map((city) => (
              <div key={city.city} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-germany-black">{city.city}</span>
                    <span className="text-[10px] text-gray-400 block">{city.tier}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xs text-germany-black">{city.total}</span>
                    <span className="text-[10px] text-gray-500 block">Rent: {city.rent}</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 font-medium pt-1 border-t border-gray-200/60">{city.note}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/study/cost-of-living"
              className="text-xs font-extrabold text-germany-red hover:underline flex items-center gap-1.5"
            >
              <span>Explore our interactive Cost of Living calculator across 40+ German cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Major Scholarships Banner */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-germany-black flex items-center gap-2">
              <Award className="w-5 h-5 text-germany-gold" />
              <span>Scholarships for Master&apos;s Students in Germany</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Because public tuition is already free, German scholarships focus on funding monthly living stipends.
            </p>
          </div>
          <Link
            href="/study/scholarships"
            className="px-4 py-2 rounded-full bg-germany-black hover:bg-neutral-800 text-white font-extrabold text-xs whitespace-nowrap shrink-0 shadow-xs"
          >
            All Scholarships Guide &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-1.5">
            <div className="font-bold text-germany-black">DAAD Study Scholarships</div>
            <div className="text-germany-red font-black text-sm">€934 / month</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Full living stipend, travel allowance, and health insurance for exceptional master&apos;s applicants worldwide.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-1.5">
            <div className="font-bold text-germany-black">Deutschlandstipendium</div>
            <div className="text-germany-red font-black text-sm">€300 / month</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Co-funded by the federal government and industrial corporate sponsors (Siemens, BASF). Awarded based on academic merit.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-1.5">
            <div className="font-bold text-germany-black">Party &amp; Foundation Grants</div>
            <div className="text-germany-red font-black text-sm">€750 – €900 / month</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Heinrich Böll, Konrad Adenauer, and Friedrich Ebert foundations awarding grants for civic leadership and academic distinction.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
