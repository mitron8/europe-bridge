"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Briefcase, 
  Globe2, 
  ShieldCheck, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface CountryData {
  id: string;
  name: string;
  flag: string;
  typicalTotalInr: number; // in Lakhs
  rangeMinInr: number;
  rangeMaxInr: number;
  currencyLabel: string;
  tuitionPerYear: string;
  livingPerYear: string;
  durationYears: number;
  notes: string;
}

const COMPARISON_COUNTRIES: CountryData[] = [
  {
    id: 'usa',
    name: 'USA',
    flag: '🇺🇸',
    typicalTotalInr: 109,
    rangeMinInr: 70.8,
    rangeMaxInr: 187.5,
    currencyLabel: '$45,000 – $75,000 / yr',
    tuitionPerYear: '₹28L – ₹55L / yr',
    livingPerYear: '₹14L – ₹22L / yr',
    durationYears: 2,
    notes: 'Exorbitant tuition fees at public and private research universities. F-1 visa OPT restrictions.'
  },
  {
    id: 'uk',
    name: 'UK',
    flag: '🇬🇧',
    typicalTotalInr: 82,
    rangeMinInr: 55.0,
    rangeMaxInr: 110.0,
    currencyLabel: '£22,000 – £38,000 / yr',
    tuitionPerYear: '₹24L – ₹42L / yr',
    livingPerYear: '₹15L – ₹20L / yr',
    durationYears: 1,
    notes: '1-year accelerated degree with high international student tuition rates and tight post-study work regulations.'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    typicalTotalInr: 74,
    rangeMinInr: 48.0,
    rangeMaxInr: 95.0,
    currencyLabel: 'CAD $28,000 – $48,000 / yr',
    tuitionPerYear: '₹18L – ₹34L / yr',
    livingPerYear: '₹14L – ₹18L / yr',
    durationYears: 2,
    notes: 'Escalating international tuition caps, high housing costs in major metropolitan areas like Toronto and Vancouver.'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    typicalTotalInr: 88,
    rangeMinInr: 60.0,
    rangeMaxInr: 120.0,
    currencyLabel: 'AUD $35,000 – $52,000 / yr',
    tuitionPerYear: '₹22L – ₹38L / yr',
    livingPerYear: '₹16L – ₹22L / yr',
    durationYears: 2,
    notes: 'High cost of living and tuition fees with recent tightened student visa caps and migration hurdles.'
  }
];

export const CostComparisonCalculator: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('usa');

  const germanyTypicalInr = 27.8; // ~23.9L to 33.1L, typical 27.8L
  const selectedCountry = COMPARISON_COUNTRIES.find(c => c.id === selectedCountryId) || COMPARISON_COUNTRIES[0];
  const savingsInr = Math.round((selectedCountry.typicalTotalInr - germanyTypicalInr) * 10) / 10;
  const packageCost = 49999;
  const packagePercentage = ((packageCost / (selectedCountry.typicalTotalInr * 100000)) * 100).toFixed(2);

  // Width percentages for the visual bars (scale max 190 Lakhs)
  const maxScale = 190;
  const germanyBarWidth = Math.min(100, Math.round((germanyTypicalInr / maxScale) * 100));
  const countryBarWidth = Math.min(100, Math.round((selectedCountry.typicalTotalInr / maxScale) * 100));

  return (
    <section id="cost-comparison" className="relative bg-[#1c2f4c] text-white py-16 sm:py-24 overflow-hidden scroll-mt-14">
      {/* Background ambient lighting */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2c4a73]/40 blur-[140px] select-none"
      />

      <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d4af37] bg-[#d4af37]/15 px-3.5 py-1 rounded-full border border-[#d4af37]/30 inline-block">
            Cost &amp; ROI Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-[1.15]">
            What Germany Costs <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#d4af37]">Compared to Other Study Destinations.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d9cdb4] leading-relaxed">
            Tuition plus living costs for the entire degree. In Germany, almost all public universities charge <strong className="text-white">€0 tuition</strong>. Compare your financial outlay:
          </p>
        </div>

        {/* Comparison Console Card */}
        <div className="mt-12 rounded-3xl border border-[#3b5278] bg-[#f7f0de] text-[#16161a] p-6 sm:p-10 shadow-[0_24px_50px_rgba(10,20,38,0.4)]">
          {/* Country Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#ded3be]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c4f3e]">
              Compare Germany with:
            </span>
            <div className="flex flex-wrap gap-2">
              {COMPARISON_COUNTRIES.map((country) => {
                const isActive = selectedCountryId === country.id;
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => setSelectedCountryId(country.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#1c2f4c] text-white shadow-sm'
                        : 'bg-[#ede3ce] text-[#4a3e31] hover:bg-[#e2d5bd]'
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Visual Comparison Bars */}
          <div className="py-8 space-y-7 border-b border-[#ded3be]">
            {/* Germany Bar */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold">
                <span className="flex items-center gap-2 text-base text-[#1c2f4c]">
                  <span>🇩🇪</span> <strong>Germany (Public University)</strong>
                </span>
                <span className="text-[#5c4f3e]">
                  ₹23.9L – ₹33.1L · <strong className="text-[#1c2f4c]">Typical ₹27.8 Lakhs</strong>
                </span>
              </div>
              <div className="h-6 w-full bg-[#e8deca] rounded-full overflow-hidden p-0.5 border border-[#d5c7ad]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2e7d46] to-[#3aa85d] rounded-full flex items-center justify-end pr-2 text-[10px] font-black text-white"
                  initial={{ width: '0%' }}
                  animate={{ width: `${germanyBarWidth}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  ₹27.8L
                </motion.div>
              </div>
              <p className="text-[11px] text-[#786c59]">
                Covers statutory blocked account (€992/mo), health insurance, semester contribution, and living expenses. <strong>€0 tuition fee.</strong>
              </p>
            </div>

            {/* Target Country Bar */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold">
                <span className="flex items-center gap-2 text-base text-[#8f5747]">
                  <span>{selectedCountry.flag}</span> <strong>{selectedCountry.name} (Typical Master&apos;s)</strong>
                </span>
                <span className="text-[#5c4f3e]">
                  ₹{selectedCountry.rangeMinInr}L – ₹{selectedCountry.rangeMaxInr}L · <strong className="text-[#8f5747]">Typical ₹{selectedCountry.typicalTotalInr} Lakhs</strong>
                </span>
              </div>
              <div className="h-6 w-full bg-[#e8deca] rounded-full overflow-hidden p-0.5 border border-[#d5c7ad]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8f5747] to-[#ba6852] rounded-full flex items-center justify-end pr-2 text-[10px] font-black text-white"
                  key={selectedCountry.id}
                  initial={{ width: '0%' }}
                  animate={{ width: `${countryBarWidth}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  ₹{selectedCountry.typicalTotalInr}L
                </motion.div>
              </div>
              <p className="text-[11px] text-[#786c59]">
                {selectedCountry.notes}
              </p>
            </div>
          </div>

          {/* Savings Highlight Box */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-[#ede3ce] border border-[#d9cdb4] text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7c4a3c] block">
                Estimated Degree Savings
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8f5747] block mt-1">
                Save ~₹{savingsInr} Lakhs
              </span>
              <span className="text-[11px] text-[#5c4f3e] block mt-0.5">
                by choosing German public universities
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#ede3ce] border border-[#d9cdb4] text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244b7a] block">
                Post-Master Starting Salary
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1c2f4c] block mt-1">
                €43,000 – €52,000
              </span>
              <span className="text-[11px] text-[#5c4f3e] block mt-0.5">
                Typical first-year gross salary in Germany
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#ede3ce] border border-[#d9cdb4] text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e7d46] block">
                Counseling Package Investment
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2e7d46] block mt-1">
                &lt; {packagePercentage}%
              </span>
              <span className="text-[11px] text-[#5c4f3e] block mt-0.5">
                Standard Package (₹49,999) vs. total degree cost
              </span>
            </div>
          </div>
        </div>

        {/* Regulatory Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
          <span className="px-3.5 py-1.5 rounded-full bg-[#243e61] border border-[#3e5f8f] text-[#d9cdb4] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            18-Month Job-Seeker Permit After Graduation
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#243e61] border border-[#3e5f8f] text-[#d9cdb4] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            140 Full Days / 280 Half Days Legal Work Per Year
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#243e61] border border-[#3e5f8f] text-[#d9cdb4] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            €13.90/hour Minimum Wage (from Jan 2026)
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#243e61] border border-[#3e5f8f] text-[#d9cdb4] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            EU Blue Card PR Fast-Track in 21 Months
          </span>
        </div>
      </div>
    </section>
  );
};
