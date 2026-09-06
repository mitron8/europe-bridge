"use client";
import React, { useState } from 'react';
import { MapPin, Building2, TrendingUp } from 'lucide-react';

export const CityCostComparison = () => {
  const cities = [
    {
      name: "Munich (München)",
      tier: "Expensive",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      wgCost: "€550 – €750",
      groceries: "€250 – €320",
      totalBudget: "€1,200 – €1,500",
      desc: "Germany's most expensive city with high rental prices. However, Munich offers top-tier universities (TUM, LMU) and the highest hourly pay for working student jobs (€15–€20/hr) at BMW, Siemens, Allianz.",
    },
    {
      name: "Berlin",
      tier: "Mid-Range / Rising",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      wgCost: "€450 – €600",
      groceries: "€220 – €280",
      totalBudget: "€1,000 – €1,300",
      desc: "Capital city with vibrant nightlife, international culture, and Europe's largest tech startup ecosystem. Housing is increasingly competitive, but public transit and food options remain varied.",
    },
    {
      name: "Frankfurt am Main",
      tier: "Expensive",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      wgCost: "€500 – €650",
      groceries: "€230 – €290",
      totalBudget: "€1,100 – €1,400",
      desc: "Germany's financial center (home to ECB & Deutsche Bank). High living costs, but unbeatable career opportunities for finance, economics, business analytics, and data science students.",
    },
    {
      name: "Leipzig",
      tier: "Budget-Friendly",
      badgeColor: "bg-green-100 text-green-800 border-green-200",
      wgCost: "€280 – €380",
      groceries: "€180 – €230",
      totalBudget: "€750 – €950",
      desc: "One of the most popular student hubs in eastern Germany ('Hypezig'). Known for low rents, historic university charm, rich art scene, and comfortable student lifestyle under €900/mo.",
    },
    {
      name: "Chemnitz, Magdeburg & Greifswald",
      tier: "Ultra-Budget",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      wgCost: "€220 – €320",
      groceries: "€160 – €210",
      totalBudget: "€700 – €880",
      desc: "Affordable university towns with strong STEM engineering programs (TU Chemnitz, OvGU Magdeburg). Dormitory availability is high, making it easy to live entirely within your blocked account payout.",
    },
  ];

  return (
    <section id="section-cities" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            05
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Location Matrix</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              City-by-City Living Cost Comparison
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          Your choice of university city will be the single biggest factor influencing your monthly expenditures. Below is a realistic comparison of major student hubs:
        </p>

        <div className="space-y-6">
          {cities.map((city, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-germany-red shrink-0" />
                  <h3 className="font-extrabold text-germany-black text-lg">{city.name}</h3>
                </div>
                <span className={`px-3 py-1 text-xs font-extrabold rounded-full border ${city.badgeColor} w-fit`}>
                  {city.tier}
                </span>
              </div>

              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {city.desc}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-[11px] font-bold text-gray-400 uppercase">WG Room</div>
                  <div className="text-sm font-black text-germany-black mt-0.5">{city.wgCost}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-[11px] font-bold text-gray-400 uppercase">Groceries</div>
                  <div className="text-sm font-black text-germany-black mt-0.5">{city.groceries}</div>
                </div>
                <div className="p-3 bg-red-50/80 rounded-xl border border-red-100">
                  <div className="text-[11px] font-bold text-germany-red uppercase">Total Monthly</div>
                  <div className="text-sm font-black text-germany-black mt-0.5">{city.totalBudget}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
