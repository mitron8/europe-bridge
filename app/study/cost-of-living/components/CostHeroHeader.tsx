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
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Cost of Living</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Wallet className="w-4 h-4" />
              <span>Student Budget Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Cost of Living in Germany <span className="text-germany-red">for Students</span>
              </h1>
              <motion.img 
                src="/doodles/travel.png" 
                alt="Travel & Living Doodle"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              A realistic, detailed breakdown of what you will actually spend each month as an international student in Germany. No sugarcoating—just real numbers, rent insights, food budgets, and money-saving strategies.
            </p>

            {/* At a Glance Box */}
            <div className="neu-card p-6 border-l-4 border-l-germany-red relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-germany-red flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Key Takeaway At a Glance
                </span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated May 2026
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Most international students in Germany spend <strong className="text-germany-black">€900 to €1,300 per month</strong> covering rent, food, health insurance, public transit (€63/mo Deutschlandticket), and personal expenses. The German student visa requires a mandatory blocked account of <strong className="text-germany-red">€11,904/year (€992/month)</strong>.
              </p>
            </div>
          </div>

          {/* Quick Interactive Budget Estimator Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-5 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">Instant Monthly Budget Calculator</h3>
                  <p className="text-xs text-gray-500 font-medium">Select your city tier and housing preference</p>
                </div>
              </div>

              {/* City Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block">City Cost Level</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setSelectedCityTier('budget')}
                    className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                      selectedCityTier === 'budget' 
                        ? 'bg-germany-black text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Budget<br/><span className="text-[10px] opacity-80 font-normal">e.g. Leipzig</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCityTier('mid')}
                    className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                      selectedCityTier === 'mid' 
                        ? 'bg-germany-black text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Mid-Range<br/><span className="text-[10px] opacity-80 font-normal">e.g. Berlin</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCityTier('expensive')}
                    className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                      selectedCityTier === 'expensive' 
                        ? 'bg-germany-black text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    High-Cost<br/><span className="text-[10px] opacity-80 font-normal">e.g. Munich</span>
                  </button>
                </div>
              </div>

              {/* Housing Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block">Accommodation Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setAccommodationType('dorm')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      accommodationType === 'dorm' 
                        ? 'bg-germany-red text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Student Dorm
                  </button>
                  <button 
                    onClick={() => setAccommodationType('wg')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      accommodationType === 'wg' 
                        ? 'bg-germany-red text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Shared WG
                  </button>
                  <button 
                    onClick={() => setAccommodationType('studio')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      accommodationType === 'studio' 
                        ? 'bg-germany-red text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Private Studio
                  </button>
                </div>
              </div>

              {/* Output Cost Box */}
              <div className="bg-red-50/80 rounded-2xl p-4 border border-red-100">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Estimated Monthly Living Cost</span>
                  <span className="text-2xl font-black text-germany-black font-display">
                    €{costs.total}<span className="text-xs font-semibold text-gray-500">/mo</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-gray-600 pt-2 border-t border-red-200/60">
                  <div>• Rent: <strong className="text-germany-black">€{costs.rent}</strong></div>
                  <div>• Groceries: <strong className="text-germany-black">€{costs.food}</strong></div>
                  <div>• Insurance: <strong className="text-germany-black">€{costs.insurance}</strong></div>
                  <div>• Transport & Misc: <strong className="text-germany-black">€{costs.transport + costs.misc}</strong></div>
                </div>
              </div>

              <a 
                href="#section-breakdown"
                className="w-full neu-btn py-3 text-xs font-bold text-germany-black flex items-center justify-center gap-2 hover:text-germany-red"
              >
                <span>View Full Itemized Category Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
