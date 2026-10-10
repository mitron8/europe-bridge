"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Wallet, 
  HeartPulse, 
  Bus, 
  Utensils, 
  Wifi, 
  Briefcase, 
  ArrowRight, 
  Info,
  ChevronDown,
  TrendingDown,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface CityData {
  name: string;
  state: string;
  tier: 'High' | 'Medium' | 'Affordable';
  dormRent: number;
  wgRent: number;
  studioRent: number;
  groceries: number;
  diningMultiplier: number;
  tag: string;
}

const CITIES: CityData[] = [
  { name: 'Munich', state: 'Bavaria', tier: 'High', dormRent: 380, wgRent: 680, studioRent: 980, groceries: 210, diningMultiplier: 1.25, tag: 'TUM / LMU' },
  { name: 'Frankfurt', state: 'Hesse', tier: 'High', dormRent: 360, wgRent: 620, studioRent: 890, groceries: 200, diningMultiplier: 1.2, tag: 'Goethe Uni' },
  { name: 'Berlin', state: 'Berlin', tier: 'High', dormRent: 350, wgRent: 580, studioRent: 840, groceries: 190, diningMultiplier: 1.15, tag: 'TU Berlin / HU' },
  { name: 'Hamburg', state: 'Hamburg', tier: 'High', dormRent: 340, wgRent: 560, studioRent: 810, groceries: 195, diningMultiplier: 1.15, tag: 'TUHH / Uni Hamburg' },
  { name: 'Stuttgart', state: 'Baden-Württemberg', tier: 'High', dormRent: 340, wgRent: 550, studioRent: 790, groceries: 190, diningMultiplier: 1.15, tag: 'Uni Stuttgart' },
  { name: 'Heidelberg', state: 'Baden-Württemberg', tier: 'Medium', dormRent: 330, wgRent: 520, studioRent: 740, groceries: 185, diningMultiplier: 1.1, tag: 'Heidelberg Uni' },
  { name: 'Cologne (Köln)', state: 'North Rhine-Westphalia', tier: 'Medium', dormRent: 320, wgRent: 510, studioRent: 730, groceries: 180, diningMultiplier: 1.1, tag: 'Uni Cologne' },
  { name: 'Düsseldorf', state: 'North Rhine-Westphalia', tier: 'Medium', dormRent: 320, wgRent: 500, studioRent: 720, groceries: 180, diningMultiplier: 1.1, tag: 'HHU Düsseldorf' },
  { name: 'Aachen', state: 'North Rhine-Westphalia', tier: 'Medium', dormRent: 290, wgRent: 430, studioRent: 630, groceries: 170, diningMultiplier: 1.0, tag: 'RWTH Aachen' },
  { name: 'Nuremberg (FAU)', state: 'Bavaria', tier: 'Medium', dormRent: 290, wgRent: 440, studioRent: 640, groceries: 175, diningMultiplier: 1.0, tag: 'FAU Erlangen-Nbg' },
  { name: 'Leipzig', state: 'Saxony', tier: 'Affordable', dormRent: 260, wgRent: 360, studioRent: 520, groceries: 165, diningMultiplier: 0.95, tag: 'Uni Leipzig' },
  { name: 'Dresden', state: 'Saxony', tier: 'Affordable', dormRent: 250, wgRent: 350, studioRent: 490, groceries: 165, diningMultiplier: 0.95, tag: 'TU Dresden' },
  { name: 'Chemnitz', state: 'Saxony', tier: 'Affordable', dormRent: 230, wgRent: 280, studioRent: 410, groceries: 155, diningMultiplier: 0.9, tag: 'TU Chemnitz' },
  { name: 'Magdeburg', state: 'Saxony-Anhalt', tier: 'Affordable', dormRent: 240, wgRent: 300, studioRent: 430, groceries: 155, diningMultiplier: 0.9, tag: 'OVGU Magdeburg' },
];

export default function CostOfLivingEstimatorPage() {
  const [selectedCityName, setSelectedCityName] = useState<string>('Munich');
  const [housingType, setHousingType] = useState<'dorm' | 'wg' | 'studio'>('wg');
  const [diningStyle, setDiningStyle] = useState<'home' | 'balanced' | 'eatout'>('balanced');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const city = useMemo(() => {
    return CITIES.find(c => c.name === selectedCityName) || CITIES[0];
  }, [selectedCityName]);

  // Breakdown calculations
  const breakdown = useMemo(() => {
    // 1. Rent
    let rent = city.wgRent;
    if (housingType === 'dorm') rent = city.dormRent;
    if (housingType === 'studio') rent = city.studioRent;

    // 2. Health Insurance (Official 2026 GKV student rate: ~€128)
    const healthInsurance = 128;

    // 3. Groceries & Food
    let foodMultiplier = 1.0;
    if (diningStyle === 'home') foodMultiplier = 0.85;
    if (diningStyle === 'eatout') foodMultiplier = 1.4;
    const food = Math.round(city.groceries * foodMultiplier * city.diningMultiplier);

    // 4. Public Transport (Deutschlandticket for students / Semesterticket)
    const transport = 29;

    // 5. Telecom & GEZ
    const telecom = 35; // SIM + shared home wifi + Rundfunkbeitrag share

    // 6. Leisure & Misc
    const misc = diningStyle === 'eatout' ? 120 : diningStyle === 'balanced' ? 80 : 50;

    const total = rent + healthInsurance + food + transport + telecom + misc;
    
    // Comparison against standard blocked monthly payout of €992
    const blockedAccountMonthly = 992;
    const difference = blockedAccountMonthly - total;

    return {
      rent,
      healthInsurance,
      food,
      transport,
      telecom,
      misc,
      total,
      blockedAccountMonthly,
      difference
    };
  }, [city, housingType, diningStyle]);

  return (
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            2026 Student Budget Planner
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            Germany Cost of Living Estimator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Compare monthly living expenses across German university cities. See how your estimated rent, food, health insurance, and transport stack up against the <strong>€992/month</strong> blocked account payout.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md space-y-6">
              
              {/* City Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                  1. Select Target University City
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CITIES.map((c) => {
                    const isSelected = selectedCityName === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedCityName(c.name)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-germany-red/10 border-germany-red text-germany-black dark:text-white font-bold ring-1 ring-germany-red/30'
                            : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{c.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                            c.tier === 'High' ? 'text-rose-500 bg-rose-500/10' :
                            c.tier === 'Medium' ? 'text-amber-500 bg-amber-500/10' :
                            'text-emerald-500 bg-emerald-500/10'
                          }`}>
                            {c.tier}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block truncate mt-0.5">{c.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Housing Type */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                  2. Accommodation Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'dorm', label: 'Dorm (Wohnheim)', sub: 'Cheapest, high waitlist', price: city.dormRent },
                    { id: 'wg', label: 'Shared Flat (WG)', sub: 'Most common student choice', price: city.wgRent },
                    { id: 'studio', label: 'Private Apartment', sub: 'Single studio room', price: city.studioRent },
                  ].map((h) => {
                    const isSelected = housingType === h.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setHousingType(h.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-germany-red text-white border-germany-red shadow-xs'
                            : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{h.label}</p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                          {h.sub}
                        </p>
                        <p className="text-xs font-black mt-2">
                          ~€{h.price} / mo
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lifestyle / Food */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                  3. Dining & Lifestyle Pattern
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'home', label: 'Cook at Home', desc: 'Aldi, Lidl, Rewe' },
                    { id: 'balanced', label: 'Balanced', desc: 'Mensa + Cooking' },
                    { id: 'eatout', label: 'Frequent Dining', desc: 'Cafes, takeout' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDiningStyle(d.id as any)}
                      className={`p-2.5 rounded-xl text-center border transition-colors cursor-pointer ${
                        diningStyle === d.id
                          ? 'bg-germany-black dark:bg-[#151B27] text-white border-germany-red'
                          : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <p className="text-xs font-bold">{d.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{d.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Part-time Jobs & Minijob Info Card */}
            <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-germany-red" />
                Working While Studying in Germany
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                International students on a German visa can work up to <strong>140 full days (or 280 half days) per year</strong>. A standard student job (Werkstudent or 538€ Minijob) pays €14–€18/hour, earning you €538 to €1,100/month tax-free or with minimal deductions, easily bridging any living cost deficits.
              </p>
            </div>
          </div>

          {/* Right Column: Output Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border-2 border-germany-red/30 dark:border-germany-red/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold" />

              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                Estimated Monthly Budget in {city.name}
              </span>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black font-display text-germany-black dark:text-white tracking-tight">
                  €{breakdown.total}
                </span>
                <span className="text-xs font-bold text-gray-400">/ Month</span>
              </div>

              {/* Blocked Account Balance Indicator */}
              <div className={`p-3.5 rounded-xl border text-xs font-bold mb-6 flex items-center justify-between ${
                breakdown.difference >= 0
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  {breakdown.difference >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-amber-500" />
                  )}
                  <span>
                    {breakdown.difference >= 0 
                      ? `Surplus: +€${breakdown.difference}/mo saved`
                      : `Deficit: -€${Math.abs(breakdown.difference)}/mo gap`}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-gray-400">vs €992 Sperrkonto</span>
              </div>

              {/* Category Breakdown Table */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 space-y-2.5 mb-6 text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-germany-red" />
                    Warm Rent & Utilities:
                  </span>
                  <span className="font-bold text-germany-black dark:text-white">€{breakdown.rent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    Statutory Health Insurance:
                  </span>
                  <span className="font-bold text-germany-black dark:text-white">€{breakdown.healthInsurance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-500" />
                    Groceries & Food:
                  </span>
                  <span className="font-bold text-germany-black dark:text-white">€{breakdown.food}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Bus className="w-3.5 h-3.5 text-blue-500" />
                    Public Transit (Student Pass):
                  </span>
                  <span className="font-bold text-germany-black dark:text-white">€{breakdown.transport}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-indigo-500" />
                    Phone, Wifi & GEZ Tax:
                  </span>
                  <span className="font-bold text-germany-black dark:text-white">€{breakdown.telecom}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-800 font-bold">
                  <span className="text-gray-500">Leisure & Contingencies:</span>
                  <span className="text-germany-black dark:text-white">€{breakdown.misc}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href="/tools/blocked-account-calculator"
                  className="w-full neu-btn-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md text-white"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  Calculate Required Sperrkonto Deposit
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/study/scholarships"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Explore German Scholarships (DAAD & Deutschlandstipendium) →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto pb-20">
        <h2 className="text-2xl font-black font-display text-germany-black dark:text-white mb-6 text-center">
          Cost of Living FAQ
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "What is 'Warmmiete' vs 'Kaltmiete' in German rentals?",
              a: "'Kaltmiete' (cold rent) is the base rent for the space only. 'Warmmiete' includes essential utility costs like central heating, water, and building maintenance. Electricity and personal internet are usually billed separately unless in a student dorm."
            },
            {
              q: "What is the Deutschlandticket and how much is it for students?",
              a: "The Deutschlandticket offers unlimited local train, tram, bus, and S-Bahn travel across all of Germany. German universities now offer the subsidized student version at €29.40 per month, saving international students hundreds of euros annually."
            },
            {
              q: "Which German cities have the lowest cost of living for students?",
              a: "Cities in Eastern Germany such as Leipzig, Dresden, Chemnitz, Magdeburg, and Halle offer high-quality public universities with student living costs between €650 and €780 per month, where rooms in shared flats can be found under €350 warm rent."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="neu-card bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-germany-black dark:text-white flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
