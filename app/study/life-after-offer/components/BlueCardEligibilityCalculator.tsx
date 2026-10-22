"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp,
  ArrowRight,
  Check,
  ShieldCheck,
  Coins,
  Compass,
  FileCheck2
} from 'lucide-react';

export const BlueCardEligibilityCalculator = () => {
  return (
    <section id="section-calculator" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ece7dd] border border-[#ded8cb] shrink-0 shadow-xs">
            <Calculator className="w-6 h-6 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-red)] mb-1">
              <span>Section 06</span>
              <span>•</span>
              <span>Dedicated Interactive Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
              EU Blue Card &amp; German Net Salary Tool
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              Understand the 2026 federal minimum wage thresholds, tax deductions, and permanent residency acceleration before calculating your exact in-hand salary.
            </p>
          </div>
        </div>

        {/* Navigation & Overview Card */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 lg:p-8 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 2026 Threshold Rules */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Federal Immigration Thresholds</span>
                <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">2026 Blue Card Minimums (§18g AufenthG)</h3>
                <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                  Germany revised its skilled worker immigration laws, lowering salary requirements to facilitate seamless transition for international STEM and Master&apos;s graduates.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#ece7dd]/60 border border-[#ded8cb] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs sm:text-sm text-[var(--lp-text)] block">STEM &amp; Shortage Occupations</span>
                    <p className="text-xs text-[var(--lp-muted)]">IT, Computer Science, Engineering, Mathematics, and Healthcare professionals.</p>
                  </div>
                  <span className="font-mono font-bold text-xs sm:text-sm text-[var(--lp-ink)] bg-white/80 px-2.5 py-1 rounded-xl border border-[#ded8cb] shrink-0">
                    €45,934 / yr
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#ece7dd]/60 border border-[#ded8cb] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs sm:text-sm text-[var(--lp-text)] block">Recent University Graduates (&lt; 3 Years)</span>
                    <p className="text-xs text-[var(--lp-muted)]">Graduated with a Bachelor&apos;s or Master&apos;s within the preceding 36 months.</p>
                  </div>
                  <span className="font-mono font-bold text-xs sm:text-sm text-[var(--lp-ink)] bg-white/80 px-2.5 py-1 rounded-xl border border-[#ded8cb] shrink-0">
                    €45,934 / yr
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#ece7dd]/60 border border-[#ded8cb] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs sm:text-sm text-[var(--lp-text)] block">Standard Non-STEM Occupations</span>
                    <p className="text-xs text-[var(--lp-muted)]">General business, finance, marketing, legal, and non-shortage roles.</p>
                  </div>
                  <span className="font-mono font-bold text-xs sm:text-sm text-[var(--lp-ink)] bg-white/80 px-2.5 py-1 rounded-xl border border-[#ded8cb] shrink-0">
                    €50,700 / yr
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-[#ded8cb] flex items-center gap-3 text-xs text-[var(--lp-muted)]">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  <strong className="text-[var(--lp-text)] font-semibold">Fastest PR Settlement:</strong> Blue Card holders achieve Permanent Residency in just <strong className="text-[var(--lp-red)] font-semibold">21 months</strong> with B1 German proficiency (or 27 months with A1).
                </span>
              </div>
            </div>

            {/* Right Column: Dedicated Tool Navigation Card */}
            <div className="lg:col-span-5 bg-[#ece7dd]/50 border border-[#ded8cb] rounded-3xl p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#ded8cb] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-[#ded8cb]">
                    <Coins className="w-4 h-4 text-[var(--lp-red)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Dedicated Calculator</span>
                    <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">German Net Salary Calculator</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                Calculate your precise monthly take-home salary after statutory health insurance (GKV), pension (Rente), unemployment (AV), nursing care (PV), and income tax (Lohnsteuer).
              </p>

              {/* Sample Calculation Preview */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#ded8cb] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[var(--lp-muted)]">
                  <span>Sample Offer:</span>
                  <span className="font-bold text-[var(--lp-text)]">€55,000 / year</span>
                </div>
                <div className="flex justify-between items-center text-[var(--lp-muted)]">
                  <span>Gross Monthly:</span>
                  <span className="font-semibold text-[var(--lp-text)]">€4,583 / month</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#ded8cb]">
                  <span className="font-semibold text-[var(--lp-text)]">Estimated Net (Tax Class 1):</span>
                  <span className="font-bold text-sm text-[var(--lp-red)]">~€2,950 / month</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <Link
                  href="/tools/net-salary-calculator"
                  className="lp-btn lp-btn--dark w-full justify-center text-xs group"
                >
                  <span>Launch Net Salary Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/tools/admission-chance"
                  className="text-xs text-[var(--lp-muted)] hover:text-[var(--lp-red)] transition-colors inline-flex items-center gap-1.5 justify-center w-full font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                  <span>Evaluate your admission chances on free predictor &rarr;</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

