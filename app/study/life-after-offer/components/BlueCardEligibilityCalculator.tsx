"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp,
  ArrowRight,
  Check
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
        <div data-reveal className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] shrink-0">
            <Calculator className="w-5 h-5 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-red)] mb-1">
              <span>Section 06</span>
              <span>•</span>
              <span>Interactive Decision Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
              EU Blue Card & PR Eligibility Calculator
            </h2>
          </div>
        </div>

        {/* Calculator Card */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Annual Salary Slider & Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[var(--lp-ink)]">
                    Expected / Offered Gross Annual Salary
                  </label>
                  <span className="text-lg font-mono font-bold text-[var(--lp-red)]">
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
                  className="w-full accent-[var(--lp-red)] cursor-pointer h-2 bg-[var(--lp-paper-2)] rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-[var(--lp-muted)]">
                  <span>€35,000</span>
                  <span className="text-[var(--lp-red)] font-semibold">€45,934 (2026 Threshold)</span>
                  <span>€95,000</span>
                </div>
              </div>

              {/* Graduation Status Toggle */}
              <div className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-2">
                <span className="text-xs font-semibold text-[var(--lp-ink)] block">Graduation Timeline</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRecentGrad(true)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isRecentGrad 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    Degree &lt; 3 Years Old (Recent Grad)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRecentGrad(false)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      !isRecentGrad 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    Degree &gt; 3 Years Old
                  </button>
                </div>
              </div>

              {/* Field Category */}
              <div className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-2">
                <span className="text-xs font-semibold text-[var(--lp-ink)] block">Occupational Field</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsStem(true)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isStem 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    STEM / IT / Engineering / Healthcare
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsStem(false)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      !isStem 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    Business / Humanities / Other
                  </button>
                </div>
              </div>

              {/* German Language Proficiency */}
              <div className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-2">
                <span className="text-xs font-semibold text-[var(--lp-ink)] block">Your German Language Level</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGermanLevel('b1')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      germanLevel === 'b1' 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    B1 / B2 Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setGermanLevel('a1')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      germanLevel === 'a1' 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    A1 / A2 Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setGermanLevel('none')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      germanLevel === 'none' 
                        ? 'bg-[var(--lp-ink)] text-white shadow-xs' 
                        : 'bg-[var(--lp-card)] border border-[var(--lp-rule)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                    }`}
                  >
                    English Only
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Results Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-2xl border border-[var(--lp-rule)] bg-[var(--lp-paper-2)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    isEligible 
                      ? 'bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] border-[var(--lp-gold)]/25' 
                      : 'bg-[var(--lp-paper)] text-[var(--lp-muted)] border-[var(--lp-rule)]'
                  }`}>
                    {isEligible ? 'Eligible for EU Blue Card' : 'Below Blue Card Threshold'}
                  </span>
                  <span className="text-xs font-mono text-[var(--lp-muted)]">2026 Rules</span>
                </div>

                {isEligible ? (
                  <p className="text-xs text-[var(--lp-text)] leading-relaxed">
                    Congratulations! Your proposed salary of <strong className="text-[var(--lp-ink)]">€{annualSalary.toLocaleString()}</strong> exceeds the 2026 requirement of <strong className="text-[var(--lp-ink)]">€{applicableThreshold.toLocaleString()}</strong>. You are qualified to transition directly into an <strong className="text-[var(--lp-red)]">EU Blue Card (§18g AufenthG)</strong>.
                  </p>
                ) : (
                  <p className="text-xs text-[var(--lp-text)] leading-relaxed">
                    You are currently <strong className="text-[var(--lp-ink)]">€{Math.round(salaryDiff).toLocaleString()}</strong> below the Blue Card threshold of €{applicableThreshold.toLocaleString()}. However, as a German university graduate, you can still obtain a <strong className="text-[var(--lp-ink)]">Skilled Worker Permit (§18b)</strong> with no minimum salary cap as long as the job matches your degree.
                  </p>
                )}

                {/* Key Metrics Breakdown */}
                <div className="space-y-2 pt-2 border-t border-[var(--lp-rule)] text-xs text-[var(--lp-text)]">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[var(--lp-muted)]">Applicable Threshold:</span>
                    <span className="font-mono font-semibold text-[var(--lp-ink)]">€{applicableThreshold.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[var(--lp-muted)]">Estimated Monthly Gross:</span>
                    <span className="font-mono font-semibold text-[var(--lp-ink)]">approx. €{monthlyGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[var(--lp-muted)]">Estimated Monthly In-Hand:</span>
                    <span className="font-mono font-bold text-[var(--lp-gold)]">approx. €{estimatedMonthlyNet.toLocaleString()} net</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-[var(--lp-rule)] pt-2">
                    <span className="text-[var(--lp-muted)]">Fastest PR Settlement:</span>
                    <span className="font-semibold text-[var(--lp-red)]">{getPrTimeline()}</span>
                  </div>
                </div>
              </div>

              {/* EuropeBridge Help CTA */}
              <div className="p-5 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-2">
                <span className="text-xs font-semibold text-[var(--lp-ink)] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[var(--lp-red)]" />
                  Need Help Planning Your German Career?
                </span>
                <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                  EuropeBridge counsellors guide you from shortlisting programs with high Werkstudent conversion rates to tailoring your German CV and reviewing job offers.
                </p>
                <Link
                  href="/profile-evaluation"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--lp-red)] hover:underline pt-1"
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
