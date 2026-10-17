"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, TrendingUp } from 'lucide-react';

export const CityCostComparison = () => {
  const cities = [
    {
      name: "Munich (München)",
      tier: "Expensive",
      badgeColor: "bg-[var(--lp-red)]/10 text-[var(--lp-red)] border-[var(--lp-red)]/20",
      wgCost: "€550 – €750",
      groceries: "€250 – €320",
      totalBudget: "€1,200 – €1,500",
      desc: "Germany's most expensive city with high rental prices. However, Munich offers top-tier universities (TUM, LMU) and the highest hourly pay for working student jobs (€15–€20/hr) at BMW, Siemens, Allianz.",
    },
    {
      name: "Berlin",
      tier: "Mid-Range / Rising",
      badgeColor: "bg-[var(--lp-gold-soft)]/50 text-[var(--lp-text)] border-[var(--lp-gold)]/40",
      wgCost: "€450 – €600",
      groceries: "€220 – €280",
      totalBudget: "€1,000 – €1,300",
      desc: "Capital city with vibrant nightlife, international culture, and Europe's largest tech startup ecosystem. Housing is increasingly competitive, but public transit and food options remain varied.",
    },
    {
      name: "Frankfurt am Main",
      tier: "Expensive",
      badgeColor: "bg-[var(--lp-red)]/10 text-[var(--lp-red)] border-[var(--lp-red)]/20",
      wgCost: "€500 – €650",
      groceries: "€230 – €290",
      totalBudget: "€1,100 – €1,400",
      desc: "Germany's financial center (home to ECB & Deutsche Bank). High living costs, but unbeatable career opportunities for finance, economics, business analytics, and data science students.",
    },
    {
      name: "Leipzig",
      tier: "Budget-Friendly",
      badgeColor: "bg-[#ece7dd] text-[var(--lp-text)] border-[#e2ddd3]",
      wgCost: "€280 – €380",
      groceries: "€180 – €230",
      totalBudget: "€750 – €950",
      desc: "One of the most popular student hubs in eastern Germany ('Hypezig'). Known for low rents, historic university charm, rich art scene, and comfortable student lifestyle under €900/mo.",
    },
    {
      name: "Chemnitz, Magdeburg & Greifswald",
      tier: "Ultra-Budget",
      badgeColor: "bg-[var(--lp-ink)] text-white border-[var(--lp-ink)]",
      wgCost: "€220 – €320",
      groceries: "€160 – €210",
      totalBudget: "€700 – €880",
      desc: "Affordable university towns with strong STEM engineering programs (TU Chemnitz, OvGU Magdeburg). Dormitory availability is high, making it easy to live entirely within your blocked account payout.",
    },
  ];

  return (
    <section id="section-cities" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            05
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
              Location Matrix
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              City-by-City <em className="lp-script text-[var(--lp-red)]">Living Cost Comparison</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Your choice of university city will be the single biggest factor influencing your monthly expenditures. Below is a realistic comparison of major student hubs:
        </p>

        <div className="space-y-4">
          {cities.map((city, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white/70 border border-[#e2ddd3] shadow-xs hover:border-[var(--lp-red)]/40 hover:shadow-md transition-all space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">{city.name}</h3>
                </div>
                <span className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${city.badgeColor} w-fit shadow-2xs`}>
                  {city.tier}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                {city.desc}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#e2ddd3]/60 text-center">
                <div className="p-3 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]/70">
                  <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider">WG Room</div>
                  <div className="text-sm font-semibold text-[var(--lp-text)] mt-0.5">{city.wgCost}</div>
                </div>
                <div className="p-3 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]/70">
                  <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider">Groceries</div>
                  <div className="text-sm font-semibold text-[var(--lp-text)] mt-0.5">{city.groceries}</div>
                </div>
                <div className="p-3 bg-[#ece7dd]/60 rounded-xl border border-[#e2ddd3]">
                  <div className="text-[10px] font-semibold text-[var(--lp-red)] uppercase tracking-wider">Total Monthly</div>
                  <div className="text-sm font-bold text-[var(--lp-red)] mt-0.5">{city.totalBudget}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
