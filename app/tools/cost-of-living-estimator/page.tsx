"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyFAQ } from '@/app/study/components/StudyFAQ';
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
  ChevronRight,
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
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 border-b border-[#e5e0d3] bg-[#fbf9f4]">
          <div 
            aria-hidden 
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.025] to-transparent blur-3xl" 
          />

          <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
              <Link href="/" className="transition-colors hover:text-[#16161a]">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <Link href="/tools" className="transition-colors hover:text-[#16161a]">
                Free Tools
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <span className="font-semibold text-[#16161a]">Cost of Living Estimator</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <Building2 className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">2026 Student Budget Planner</span>
              <span className="text-[#9a958c]">|</span>
              <span>14+ German University Cities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              Germany Cost of Living Estimator. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">City Rents, Student Expenses &amp; Blocked Account Match.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Compare monthly living expenses across German university cities. See how your estimated rent, food, health insurance, and transport stack up against the <strong>&euro;992/month</strong> blocked account payout.
            </p>
          </div>
        </section>

        {/* Main Calculator */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm space-y-6">
                
                {/* City Selection */}
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-2.5">
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
                              ? 'bg-[#f4f1ea] border-[#16161a] text-[#16161a] font-bold shadow-2xs'
                              : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[12.5px] font-bold truncate">{c.name}</span>
                            <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              c.tier === 'High' ? 'text-[#9e2a2b] bg-[#9e2a2b]/10' :
                              c.tier === 'Medium' ? 'text-[#787369] bg-[#e5e0d3]' :
                              'text-[#16161a] bg-[#e5e0d3]'
                            }`}>
                              {c.tier}
                            </span>
                          </div>
                          <span className="text-[10.5px] text-[#787369] block truncate mt-0.5">{c.tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Housing Type */}
                <div className="pt-5 border-t border-[#ece7dd]">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-2.5">
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
                              ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                              : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                          }`}
                        >
                          <p className="text-[12.5px] font-bold">{h.label}</p>
                          <p className={`text-[10.5px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#787369]'}`}>
                            {h.sub}
                          </p>
                          <p className="text-[12.5px] font-bold mt-2">
                            ~&euro;{h.price} / mo
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lifestyle / Food */}
                <div className="pt-5 border-t border-[#ece7dd]">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-2.5">
                    3. Dining &amp; Lifestyle Pattern
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
                            ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                            : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        <p className="text-[12px] font-bold">{d.label}</p>
                        <p className={`text-[10px] mt-0.5 ${diningStyle === d.id ? 'text-white/80' : 'text-[#787369]'}`}>{d.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Part-time Jobs & Minijob Info Card */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm space-y-3">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#9e2a2b]" />
                  Working While Studying in Germany
                </h3>
                <p className="text-[12.5px] text-[#5e5b54] leading-relaxed">
                  International students on a German visa can work up to <strong>140 full days (or 280 half days) per year</strong>. A standard student job (Werkstudent or 538&euro; Minijob) pays &euro;14&ndash;&euro;18/hour, earning you &euro;538 to &euro;1,100/month tax-free or with minimal deductions, easily bridging any living cost deficits.
                </p>
              </div>
            </div>

            {/* Right Column: Output Card */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369] block mb-1">
                  Estimated Monthly Budget in {city.name}
                </span>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#16161a] tracking-tight">
                    &euro;{breakdown.total}
                  </span>
                  <span className="text-[12px] font-bold text-[#787369]">/ Month</span>
                </div>

                {/* Blocked Account Balance Indicator */}
                <div className={`p-3.5 rounded-xl border text-[12px] font-bold mb-6 flex items-center justify-between ${
                  breakdown.difference >= 0
                    ? 'bg-white border-[#dcd7cb] text-[#16161a]'
                    : 'bg-white border-[#e5e0d3] text-[#9e2a2b]'
                }`}>
                  <div className="flex items-center gap-2">
                    {breakdown.difference >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-[#16161a]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#9e2a2b]" />
                    )}
                    <span>
                      {breakdown.difference >= 0 
                        ? `Surplus: +€${breakdown.difference}/mo saved`
                        : `Deficit: -€${Math.abs(breakdown.difference)}/mo gap`}
                    </span>
                  </div>
                  <span className="text-[10.5px] font-medium text-[#787369]">vs &euro;992 Sperrkonto</span>
                </div>

                {/* Category Breakdown Table */}
                <div className="p-4 rounded-xl bg-white border border-[#ece7dd] space-y-2.5 mb-6 text-[12px] font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#16161a]" />
                      Warm Rent &amp; Utilities:
                    </span>
                    <span className="font-bold text-[#16161a]">&euro;{breakdown.rent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54] flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5 text-[#9e2a2b]" />
                      Statutory Health Insurance:
                    </span>
                    <span className="font-bold text-[#16161a]">&euro;{breakdown.healthInsurance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54] flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#16161a]" />
                      Groceries &amp; Food:
                    </span>
                    <span className="font-bold text-[#16161a]">&euro;{breakdown.food}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54] flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-[#16161a]" />
                      Public Transit (Student Pass):
                    </span>
                    <span className="font-bold text-[#16161a]">&euro;{breakdown.transport}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54] flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-[#16161a]" />
                      Phone, Wifi &amp; GEZ Tax:
                    </span>
                    <span className="font-bold text-[#16161a]">&euro;{breakdown.telecom}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#ece7dd] font-bold">
                    <span className="text-[#5e5b54]">Leisure &amp; Contingencies:</span>
                    <span className="text-[#16161a]">&euro;{breakdown.misc}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    href="/tools/blocked-account-calculator"
                    className="w-full rounded-xl bg-[#16161a] py-3 px-4 text-[13px] font-semibold flex items-center justify-center gap-2 text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Calculate Required Sperrkonto Deposit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/study/scholarships"
                    className="w-full rounded-xl border border-[#dcd7cb] bg-white py-2.5 px-4 text-[12.5px] font-semibold text-center block text-[#16161a] hover:bg-[#f7f5f0] transition-colors"
                  >
                    Explore German Scholarships (DAAD &amp; Deutschlandstipendium) &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <StudyFAQ
          id="faq"
          badge="German Living Costs FAQs"
          title="Frequently Asked Questions"
          subtitle="Understanding Warmmiete vs Kaltmiete, Deutschlandticket student transit discounts, and affordable German cities."
          faqs={[
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
          ]}
        />

        {/* Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
