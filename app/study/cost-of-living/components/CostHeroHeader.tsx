"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, Calendar, ShieldCheck, ArrowRight, Building2, MapPin, Calculator } from 'lucide-react';

export const CostHeroHeader = () => {
  const [selectedCityTier, setSelectedCityTier] = useState<'budget' | 'mid' | 'expensive'>('mid');
  const [accommodationType, setAccommodationType] = useState<'dorm' | 'wg' | 'studio'>('wg');

  // Interactive budget estimate calculator values
  const getEstimatedCost = () => {
    let rent = 450;
    let food = 250;
    const insurance = 145;
    const transport = 63;
    const misc = 100;

    if (selectedCityTier === 'budget') {
      rent = accommodationType === 'dorm' ? 250 : accommodationType === 'wg' ? 330 : 520;
      food = 200;
    } else if (selectedCityTier === 'mid') {
      rent = accommodationType === 'dorm' ? 320 : accommodationType === 'wg' ? 480 : 700;
      food = 250;
    } else {
      rent = accommodationType === 'dorm' ? 420 : accommodationType === 'wg' ? 650 : 920;
      food = 290;
    }

    const total = rent + food + insurance + transport + misc;
    return { rent, food, insurance, transport, misc, total };
  };

  const costs = getEstimatedCost();

  return (
    <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Subtle Ambient Accents */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.3), rgba(201,163,91,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/#our-process" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Cost of Living</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content */}
          <div data-reveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Student Budget Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[52px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              Cost of Living in Germany <em className="lp-script text-[var(--lp-red)]">for Students</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.65] font-normal">
              A realistic, detailed breakdown of what you will actually spend each month as an international student in Germany. No sugarcoating—just real numbers, rent insights, food budgets, and money-saving strategies.
            </p>

            {/* At a Glance Box */}
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(22,22,26,0.03)] border-l-4 border-l-[var(--lp-red)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--lp-red)] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Key Takeaway At a Glance
                </span>
                <span className="text-[11.5px] font-medium text-[var(--lp-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--lp-faint)]" /> Updated May 2026
                </span>
              </div>
              <p className="text-[14px] text-[var(--lp-text)] leading-[1.7] font-normal">
                Most international students in Germany spend <strong className="font-semibold text-[var(--lp-text)]">€900 to €1,300 per month</strong> covering rent, food, health insurance, public transit (€63/mo Deutschlandticket), and personal expenses. The German student visa requires a mandatory blocked account of <strong className="text-[var(--lp-red)] font-semibold">€11,904/year (€992/month)</strong>.
              </p>
            </div>
          </div>

          {/* Quick Interactive Budget Estimator Widget */}
          <div data-reveal className="lg:col-span-5">
            <motion.div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.05)] relative"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3]">
                  <Calculator className="w-5 h-5 text-[var(--lp-text)]" />
                </div>
                <div>
                  <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Instant Monthly Budget Calculator</h3>
                  <p className="text-xs text-[var(--lp-muted)] mt-0.5">Select your city tier and housing preference</p>
                </div>
              </div>

              {/* City Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--lp-text)] block">City Cost Level</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setSelectedCityTier('budget')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      selectedCityTier === 'budget' 
                        ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    Budget<br/><span className="text-[10px] opacity-75 font-normal">e.g. Leipzig</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCityTier('mid')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      selectedCityTier === 'mid' 
                        ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    Mid-Range<br/><span className="text-[10px] opacity-75 font-normal">e.g. Berlin</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCityTier('expensive')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      selectedCityTier === 'expensive' 
                        ? 'bg-[var(--lp-ink)] text-white border-[var(--lp-ink)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    High-Cost<br/><span className="text-[10px] opacity-75 font-normal">e.g. Munich</span>
                  </button>
                </div>
              </div>

              {/* Housing Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--lp-text)] block">Accommodation Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setAccommodationType('dorm')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      accommodationType === 'dorm' 
                        ? 'bg-[var(--lp-red)] text-white border-[var(--lp-red)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    Student Dorm
                  </button>
                  <button 
                    onClick={() => setAccommodationType('wg')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      accommodationType === 'wg' 
                        ? 'bg-[var(--lp-red)] text-white border-[var(--lp-red)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    Shared WG
                  </button>
                  <button 
                    onClick={() => setAccommodationType('studio')}
                    className={`py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      accommodationType === 'studio' 
                        ? 'bg-[var(--lp-red)] text-white border-[var(--lp-red)] shadow-xs' 
                        : 'bg-[#ece7dd]/50 text-[var(--lp-muted)] border-[#e2ddd3] hover:text-[var(--lp-text)]'
                    }`}
                  >
                    Private Studio
                  </button>
                </div>
              </div>

              {/* Output Cost Box */}
              <div className="bg-[#ece7dd]/60 rounded-2xl p-4 border border-[#e2ddd3]">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[11px] font-semibold text-[var(--lp-muted)] uppercase tracking-wide">Estimated Monthly Living Cost</span>
                  <span className="lp-serif text-3xl font-bold text-[var(--lp-text)]">
                    €{costs.total}<span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11.5px] text-[var(--lp-muted)] pt-2 border-t border-[#e2ddd3]">
                  <div>• Rent: <strong className="font-semibold text-[var(--lp-text)]">€{costs.rent}</strong></div>
                  <div>• Groceries: <strong className="font-semibold text-[var(--lp-text)]">€{costs.food}</strong></div>
                  <div>• Insurance: <strong className="font-semibold text-[var(--lp-text)]">€{costs.insurance}</strong></div>
                  <div>• Transport &amp; Misc: <strong className="font-semibold text-[var(--lp-text)]">€{costs.transport + costs.misc}</strong></div>
                </div>
              </div>

              <a 
                href="#section-breakdown"
                className="lp-btn lp-btn--dark w-full justify-center text-xs"
              >
                <span>View Full Itemized Category Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
