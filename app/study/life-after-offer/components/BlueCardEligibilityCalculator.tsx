"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Coins, 
  Calendar, 
  Award, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const BlueCardEligibilityCalculator = () => {
  const [annualSalary, setAnnualSalary] = useState<number>(55000);
  const [isRecentGrad, setIsRecentGrad] = useState<boolean>(true);
  const [isStem, setIsStem] = useState<boolean>(true);
  const [germanLevel, setGermanLevel] = useState<'none' | 'a1' | 'b1'>('b1');

  // 2026 Thresholds
  const standardThreshold = 50700;
  const reducedThreshold = 45934.20;

  // Recent grads (<3 yrs) or STEM shortage occupations get the reduced threshold
  const applicableThreshold = (isRecentGrad || isStem) ? reducedThreshold : standardThreshold;
  const isEligible = annualSalary >= applicableThreshold;
  const salaryDiff = applicableThreshold - annualSalary;

  // Approximate Monthly Gross & Estimated Net (Tax Class 1 single, non-church tax)
  const monthlyGross = Math.round(annualSalary / 12);
  // Net in Germany is roughly 60-63% after health insurance, pension, taxes
  const estimatedMonthlyNet = Math.round(monthlyGross * 0.61);

  // PR timeline
  const getPrTimeline = () => {
    if (!isEligible) return '24 Months (Standard Graduate §18c AufenthG)';
    if (germanLevel === 'b1') return '21 Months (Blue Card + B1 German)';
    if (germanLevel === 'a1') return '27 Months (Blue Card + A1 German)';
    return '27 Months (after passing A1) or 24 Months via German degree';
  };

  return (
    <section id="section-calculator" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <Calculator className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 06</span>
              <span>•</span>
              <span>Interactive Decision Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              EU Blue Card &amp; PR Eligibility Calculator
            </h2>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Annual Salary Slider & Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-black text-germany-black">
                    Expected / Offered Gross Annual Salary
                  </label>
                  <span className="text-lg font-black text-germany-red font-display">
                    €{annualSalary.toLocaleString('en-US')} / year
                  </span>
                </div>

                <input 
                  type="range" 
                  min={35000} 
                  max={95000} 
                  step={1000}
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full accent-germany-red cursor-pointer h-2 bg-gray-200 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-bold text-gray-400">
                  <span>€35,000</span>
                  <span className="text-germany-red font-extrabold">€45,934 (2026 Threshold)</span>
                  <span>€95,000</span>
                </div>
              </div>

              {/* Graduation Status Toggle */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2">
                <span className="text-xs font-black text-germany-black block">Graduation Timeline</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRecentGrad(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isRecentGrad 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Degree &lt; 3 Years Old (Recent Grad)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRecentGrad(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      !isRecentGrad 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Degree &gt; 3 Years Old
                  </button>
                </div>
              </div>

              {/* Field Category */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2">
                <span className="text-xs font-black text-germany-black block">Occupational Field</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsStem(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isStem 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    STEM / IT / Engineering / Healthcare
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsStem(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      !isStem 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Business / Humanities / Other
                  </button>
                </div>
              </div>

              {/* German Language Proficiency */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2">
                <span className="text-xs font-black text-germany-black block">Your German Language Level</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGermanLevel('b1')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      germanLevel === 'b1' 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    B1 / B2 Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setGermanLevel('a1')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      germanLevel === 'a1' 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    A1 / A2 Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setGermanLevel('none')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      germanLevel === 'none' 
                        ? 'bg-germany-black text-white shadow-xs' 
                        : 'bg-white border border-[#EBE7E0] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    English Only
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Results Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className={`p-6 rounded-3xl border space-y-4 shadow-sm ${
                isEligible 
                  ? 'bg-emerald-50/70 border-emerald-200' 
                  : 'bg-amber-50/70 border-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    isEligible 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {isEligible ? 'Eligible for EU Blue Card 🎉' : 'Below Blue Card Threshold'}
                  </span>
                  <span className="text-xs font-bold text-gray-500">2026 Rules</span>
                </div>

                {isEligible ? (
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    Congratulations! Your proposed salary of <strong>€{annualSalary.toLocaleString()}</strong> exceeds the 2026 requirement of <strong>€{applicableThreshold.toLocaleString()}</strong>. You are qualified to transition directly into an <strong>EU Blue Card (§18g AufenthG)</strong>.
                  </p>
                ) : (
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    You are currently <strong>€{Math.round(salaryDiff).toLocaleString()}</strong> below the Blue Card threshold of €{applicableThreshold.toLocaleString()}. However, as a German university graduate, you can still obtain a <strong>Skilled Worker Permit (§18b)</strong> with no minimum salary cap as long as the job matches your degree!
                  </p>
                )}

                {/* Key Metrics Breakdown */}
                <div className="space-y-2 pt-2 border-t border-black/10 text-xs font-bold text-gray-800">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Applicable Threshold:</span>
                    <span className="font-black text-germany-black">€{applicableThreshold.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Estimated Monthly Gross:</span>
                    <span className="font-black text-germany-black">approx. €{monthlyGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Estimated Monthly In-Hand:</span>
                    <span className="font-black text-emerald-700">approx. €{estimatedMonthlyNet.toLocaleString()} net</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-black/10 pt-2">
                    <span className="text-gray-600">Fastest PR Settlement:</span>
                    <span className="font-black text-germany-red">{getPrTimeline()}</span>
                  </div>
                </div>
              </div>

              {/* EuropeBridge Help CTA */}
              <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2">
                <span className="text-xs font-black text-germany-black flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-germany-red" />
                  Need Help Planning Your German Career?
                </span>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  EuropeBridge counsellors guide you from shortlisting programs with high Werkstudent conversion rates to tailoring your German CV and reviewing job offers.
                </p>
                <Link
                  href="/profile-evaluation"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-germany-red hover:underline pt-1"
                >
                  <span>Book Free 1:1 Career Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
