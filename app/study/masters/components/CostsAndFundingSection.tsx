"use client";

import React from 'react';
import { Euro, Wallet, PiggyBank, ArrowRight, Building, Award, Check } from 'lucide-react';
import Link from 'next/link';

export const CostsAndFundingSection = () => {
  const expenseBreakdown = [
    { category: "Student Housing (Warmmiete)", cost: "€380 – €650 / mo", desc: "Includes heating, electricity, water & internet in student dormitories (Studentenwohnheim) or shared flats (WG)." },
    { category: "Public Health Insurance", cost: "€130 / mo", desc: "Statutory student health coverage (TK, Barmer, AOK) granting free doctor visits and hospital treatment." },
    { category: "Food & Groceries", cost: "€200 – €260 / mo", desc: "Supermarkets (Lidl, Aldi, Rewe) plus subsidized university canteen meals (Mensa) costing €3–€5." },
    { category: "Mobile, Wi-Fi & GEZ", cost: "€35 – €50 / mo", desc: "Unlimited 5G mobile plan + mandatory household broadcasting fee (Rundfunkbeitrag split across WG)." },
    { category: "Semester Ticket (Transit)", cost: "Included in Semesterbeitrag", desc: "Covers free regional buses, trams, U-Bahn, S-Bahn, and regional RE trains throughout the semester." },
    { category: "Personal & Leisure", cost: "€100 – €150 / mo", desc: "Clothing, gym memberships, weekend outings, and European student travel." },
  ];

  const cityComparison = [
    { city: "Munich / Frankfurt", tier: "Tier 1 (High Cost)", rent: "€550 – €800", total: "€1,100 – €1,350/mo", note: "Top engineering & finance hubs; high Werkstudent hourly pay (€18–€25/hr)." },
    { city: "Berlin / Hamburg / Stuttgart", tier: "Tier 1.5 (Moderate-High)", rent: "€450 – €650", total: "€1,000 – €1,200/mo", note: "Thriving tech startup ecosystem, automotive and aerospace corridors." },
    { city: "Aachen / Dresden / Leipzig", tier: "Tier 2 (Student-Friendly)", rent: "€300 – €450", total: "€800 – €950/mo", note: "Massive student density, very affordable living, excellent TU9 institutions." },
    { city: "Ilmenau / Clausthal / Chemnitz", tier: "Tier 3 (Ultra Low Cost)", rent: "€220 – €320", total: "€700 – €820/mo", note: "Lowest cost of living in Germany, highly specialized engineering faculties." },
  ];

  return (
    <section id="costs" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Financial Planning
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Tuition, Living Costs &amp; <em className="italic text-[var(--lp-red)] font-serif">Funding</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Germany remains one of the world’s most accessible master&apos;s destinations. Here is the transparent breakdown of actual expenses.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Public Tuition</span>
            <Euro className="w-4 h-4 text-[var(--lp-red)]" />
          </div>
          <div className="font-serif text-3xl font-normal text-[var(--lp-ink)]">0€ / Year</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
            15 out of 16 German federal states charge <strong className="text-[var(--lp-text)]">zero tuition</strong> for international master&apos;s students. Baden-Württemberg charges €1,500/semester.
          </p>
        </div>

        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Blocked Account</span>
            <Wallet className="w-4 h-4 text-[var(--lp-gold)]" />
          </div>
          <div className="font-serif text-3xl font-normal text-[var(--lp-ink)]">€11,904 / Year</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
            Statutory financial proof mandated for the German national student visa. Unlocks <strong className="text-[var(--lp-text)]">€992/month</strong> directly to your personal current account.
          </p>
        </div>

        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Monthly Living Cost</span>
            <PiggyBank className="w-4 h-4 text-[var(--lp-red)]" />
          </div>
          <div className="font-serif text-3xl font-normal text-[var(--lp-ink)]">€850 – €1,150</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
            Covers rent, health insurance, food, and transport. Most students fund this via part-time Werkstudent work (<strong className="text-[var(--lp-text)]">€1,000–€1,600/mo</strong>).
          </p>
        </div>
      </div>

      {/* Monthly Budget Breakdown & City Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Breakdown Items */}
        <div className="lg:col-span-6 bg-[#faf8f3] rounded-2xl p-6 sm:p-7 border border-[#e5e0d3] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#e5e0d3] pb-3">
            <Euro className="w-4 h-4 text-[var(--lp-red)]" />
            <h3 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Detailed Monthly Living Budget</h3>
          </div>

          <div className="space-y-2.5">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="p-3 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-xs text-[var(--lp-text)]">{item.category}</span>
                  <span className="font-mono text-xs font-semibold text-[var(--lp-red)] shrink-0">{item.cost}</span>
                </div>
                <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* City Tiers Table */}
        <div className="lg:col-span-6 bg-[#faf8f3] rounded-2xl p-6 sm:p-7 border border-[#e5e0d3] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#e5e0d3] pb-3">
              <Building className="w-4 h-4 text-[var(--lp-gold)]" />
              <h3 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Living Costs by City Tier</h3>
            </div>

            <div className="space-y-2.5">
              {cityComparison.map((city) => (
                <div key={city.city} className="p-3 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold text-xs text-[var(--lp-text)]">{city.city}</span>
                      <span className="text-[10px] font-mono text-[var(--lp-muted)] block">{city.tier}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-semibold text-[var(--lp-ink)]">{city.total}</span>
                      <span className="text-[10px] text-[var(--lp-muted)] block">Rent: {city.rent}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--lp-muted)] pt-1 border-t border-[#e5e0d3] leading-relaxed">{city.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <Link
              href="/study/cost-of-living"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--lp-red)] hover:underline"
            >
              <span>Explore interactive Cost of Living guide for 40+ German cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Major Scholarships Banner */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--lp-gold)]" />
              <h3 className="font-serif text-xl font-normal text-[var(--lp-ink)]">
                Scholarships for Master&apos;s Students
              </h3>
            </div>
            <p className="text-xs text-[var(--lp-muted)] mt-1">
              Because tuition is free, German scholarships focus on living allowances and travel stipends.
            </p>
          </div>
          <Link
            href="/study/scholarships"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--lp-ink)] text-[#faf8f3] hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
          >
            <span>All Scholarships Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
            <div className="font-semibold text-[var(--lp-text)]">DAAD Study Scholarships</div>
            <div className="text-[var(--lp-red)] font-serif text-lg font-normal">€934 / month</div>
            <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Full living stipend, travel allowance, and health insurance for exceptional master&apos;s applicants worldwide.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
            <div className="font-semibold text-[var(--lp-text)]">Deutschlandstipendium</div>
            <div className="text-[var(--lp-red)] font-serif text-lg font-normal">€300 / month</div>
            <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Co-funded 50/50 by the federal government and industrial corporate sponsors (Siemens, BASF, BMW).</p>
          </div>

          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
            <div className="font-semibold text-[var(--lp-text)]">Party &amp; Foundation Grants</div>
            <div className="text-[var(--lp-red)] font-serif text-lg font-normal">€750 – €900 / month</div>
            <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Heinrich Böll, Konrad Adenauer, and Friedrich Ebert foundations awarding grants for civic leadership.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
