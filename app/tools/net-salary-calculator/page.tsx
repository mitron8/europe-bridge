"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { 
  Briefcase, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Info, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ChevronDown 
} from 'lucide-react';

export default function NetSalaryCalculatorPage() {
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number>(55000);
  const [taxClass, setTaxClass] = useState<number>(1);
  const [isShortageOccupation, setIsShortageOccupation] = useState<boolean>(true); // STEM, IT, Doctors
  const [churchTax, setChurchTax] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 2026 Official Blue Card Thresholds
  const BLUE_CARD_REGULAR_EUR = 45300;
  const BLUE_CARD_SHORTAGE_EUR = 41041;

  const calculation = useMemo(() => {
    const gross = Math.max(0, grossAnnualSalary);
    const grossMonthly = gross / 12;

    // Social Security (Employee Share ~20.5% - 21.5% with contribution caps)
    // 1. Health Insurance (GKV: 7.3% base + ~0.85% supplementary)
    const healthCap = 62100; // BBG Krankenversicherung
    const healthTaxable = Math.min(gross, healthCap);
    const healthAnnual = healthTaxable * 0.0815;

    // 2. Pension Insurance (RV: 9.3%)
    const pensionCap = 90600; // BBG Rentenversicherung
    const pensionTaxable = Math.min(gross, pensionCap);
    const pensionAnnual = pensionTaxable * 0.093;

    // 3. Unemployment Insurance (AV: 1.3%)
    const unemploymentAnnual = pensionTaxable * 0.013;

    // 4. Care Insurance (PV: 2.2% base + 0.6% childless surcharge for 23+)
    const careAnnual = healthTaxable * 0.028;

    const totalSocialSecurityAnnual = healthAnnual + pensionAnnual + unemploymentAnnual + careAnnual;

    // Income Tax Estimate (Einkommensteuer) - Progressive tariff
    // Grundfreibetrag ~11,784 EUR
    const taxableIncome = Math.max(0, gross - totalSocialSecurityAnnual - 1230); // 1230 Arbeitnehmer-Pauschbetrag
    
    let incomeTaxAnnual = 0;
    if (taxableIncome > 11784) {
      const excess = taxableIncome - 11784;
      if (taxableIncome <= 17005) {
        incomeTaxAnnual = excess * 0.14;
      } else if (taxableIncome <= 66760) {
        incomeTaxAnnual = 730 + (taxableIncome - 17005) * 0.28;
      } else {
        incomeTaxAnnual = 14660 + (taxableIncome - 66760) * 0.42;
      }
    }

    // Church tax if opted in (~8% to 9% of income tax)
    const churchTaxAnnual = churchTax ? incomeTaxAnnual * 0.085 : 0;

    const totalTaxAnnual = incomeTaxAnnual + churchTaxAnnual;
    const netAnnual = Math.max(0, gross - totalSocialSecurityAnnual - totalTaxAnnual);
    const netMonthly = netAnnual / 12;

    // Blue Card Eligibility
    const requiredThreshold = isShortageOccupation ? BLUE_CARD_SHORTAGE_EUR : BLUE_CARD_REGULAR_EUR;
    const qualifiesForBlueCard = gross >= requiredThreshold;
    const blueCardSurplus = gross - requiredThreshold;

    return {
      grossMonthly: Math.round(grossMonthly),
      netMonthly: Math.round(netMonthly),
      netAnnual: Math.round(netAnnual),
      incomeTaxMonthly: Math.round(incomeTaxAnnual / 12),
      socialSecurityMonthly: Math.round(totalSocialSecurityAnnual / 12),
      healthMonthly: Math.round(healthAnnual / 12),
      pensionMonthly: Math.round(pensionAnnual / 12),
      unemploymentMonthly: Math.round(unemploymentAnnual / 12),
      careMonthly: Math.round(careAnnual / 12),
      qualifiesForBlueCard,
      requiredThreshold,
      blueCardSurplus
    };
  }, [grossAnnualSalary, isShortageOccupation, churchTax]);

  return (
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            2026 German Tax &amp; Blue Card Thresholds
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            German Net Salary &amp; Blue Card Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Calculate your actual take-home pay after German income tax (<em>Lohnsteuer</em>) and social security. Verify whether your job offer qualifies for the <strong>EU Blue Card</strong> and fast-track permanent residency.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md space-y-6">
              
              {/* Gross Annual Salary */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Gross Annual Salary (Brutto) *
                  </label>
                  <span className="text-xs font-bold text-gray-400">
                    €{(grossAnnualSalary / 12).toFixed(0)} / mo
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-base font-bold text-gray-400">€</span>
                  <input
                    type="number"
                    value={grossAnnualSalary}
                    onChange={(e) => setGrossAnnualSalary(parseFloat(e.target.value) || 0)}
                    step={1000}
                    className="w-full pl-9 pr-4 py-3 neu-input text-lg font-black rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 focus:border-germany-red transition-all"
                    placeholder="e.g. 55000"
                  />
                </div>
              </div>

              {/* Quick Slider / Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[45000, 52000, 58000, 65000, 75000].map((sal) => (
                  <button
                    key={sal}
                    type="button"
                    onClick={() => setGrossAnnualSalary(sal)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      grossAnnualSalary === sal
                        ? 'bg-germany-red text-white border-germany-red'
                        : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    €{(sal / 1000)}k
                  </button>
                ))}
              </div>

              {/* Occupation Field / Blue Card Track */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Profession / Degree Field
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsShortageOccupation(true)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isShortageOccupation
                        ? 'bg-germany-red/10 border-germany-red text-germany-black dark:text-white font-bold ring-1 ring-germany-red/30'
                        : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <p className="text-xs font-bold">MINT / STEM / IT / Medical</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Shortage Occupation Track</p>
                    <span className="text-[11px] font-black text-germany-red dark:text-[#FF6B7A] block mt-1.5">
                      Min. €41,041 / year
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsShortageOccupation(false)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      !isShortageOccupation
                        ? 'bg-germany-red/10 border-germany-red text-germany-black dark:text-white font-bold ring-1 ring-germany-red/30'
                        : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <p className="text-xs font-bold">General Business / Other</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Standard Profession Track</p>
                    <span className="text-[11px] font-black text-germany-red dark:text-[#FF6B7A] block mt-1.5">
                      Min. €45,300 / year
                    </span>
                  </button>
                </div>
              </div>

              {/* Tax Class & Church Tax */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    German Tax Class (Steuerklasse)
                  </label>
                  <select
                    value={taxClass}
                    onChange={(e) => setTaxClass(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                  >
                    <option value={1}>Tax Class 1 (Single / Unmarried Graduate)</option>
                    <option value={3}>Tax Class 3 (Married - Primary Higher Earner)</option>
                    <option value={4}>Tax Class 4 (Married - Equal Earners)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                    Church Tax (Kirchensteuer)
                  </label>
                  <select
                    value={churchTax ? 'yes' : 'no'}
                    onChange={(e) => setChurchTax(e.target.value === 'yes')}
                    className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                  >
                    <option value="no">No (Not Registered with German Church)</option>
                    <option value="yes">Yes (Registered Catholic / Protestant)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Fast-Track Permanent Residency Info */}
            <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-germany-gold" />
                Permanent Residency Timeline for Blue Card Holders
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Holders of the EU Blue Card in Germany receive the fastest route to indefinite permanent settlement (<em>Niederlassungserlaubnis</em>):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <p className="font-extrabold">21 Months (with B1 German)</p>
                  <p className="text-[11px] mt-0.5">Pay pension contributions for just 21 months with certified B1 language skills.</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300">
                  <p className="font-extrabold">27 Months (with A1 German)</p>
                  <p className="text-[11px] mt-0.5">Achieve PR in 27 months even with only elementary A1 German knowledge.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Overview */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border-2 border-germany-red/30 dark:border-germany-red/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold" />

              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                Estimated Net Take-Home Pay
              </span>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black font-display text-germany-black dark:text-white tracking-tight">
                  €{calculation.netMonthly.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-400">/ Month</span>
              </div>

              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-6">
                Net Annual: ~€{calculation.netAnnual.toLocaleString()} / year (from €{grossAnnualSalary.toLocaleString()} gross)
              </p>

              {/* Blue Card Qualification Badge */}
              <div className={`p-4 rounded-xl border text-xs mb-6 space-y-1 ${
                calculation.qualifiesForBlueCard
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-center gap-2 font-black">
                  {calculation.qualifiesForBlueCard ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    {calculation.qualifiesForBlueCard
                      ? '✓ Qualifies for EU Blue Card!'
                      : 'Salary Below EU Blue Card Minimum'}
                  </span>
                </div>
                <p className="text-[11px] font-medium leading-relaxed">
                  {calculation.qualifiesForBlueCard
                    ? `Your offer is €${calculation.blueCardSurplus.toLocaleString()} above the statutory threshold of €${calculation.requiredThreshold.toLocaleString()}.`
                    : `Threshold for this category is €${calculation.requiredThreshold.toLocaleString()}. You can still apply for a standard German Skilled Worker Visa (Section 18a/18b).`}
                </p>
              </div>

              {/* Deductions Breakdown */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 space-y-2 mb-6 text-xs">
                <div className="flex justify-between items-center text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 pb-2">
                  <span>Monthly Breakdown</span>
                  <span>Amount (€)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Gross Monthly:</span>
                  <span className="font-bold text-germany-black dark:text-white">€{calculation.grossMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>- Wage Tax (Lohnsteuer):</span>
                  <span className="font-bold">-€{calculation.incomeTaxMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>- Health Insurance (GKV):</span>
                  <span className="font-bold">-€{calculation.healthMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>- Pension (Rente):</span>
                  <span className="font-bold">-€{calculation.pensionMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>- Unemployment (AV):</span>
                  <span className="font-bold">-€{calculation.unemploymentMonthly}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>- Nursing Care (PV):</span>
                  <span className="font-bold">-€{calculation.careMonthly}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-800 font-black text-emerald-600 dark:text-emerald-400">
                  <span>Net Payout to Bank:</span>
                  <span>€{calculation.netMonthly}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href="/study/life-after-offer"
                  className="w-full neu-btn-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md text-white"
                >
                  <Award className="w-3.5 h-3.5 text-germany-gold" />
                  Explore Career &amp; Post-Study Work Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/tools/cost-of-living-estimator"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Check Student Cost of Living →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto pb-20">
        <h2 className="text-2xl font-black font-display text-germany-black dark:text-white mb-6 text-center">
          Salary &amp; Blue Card FAQ
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "What is the 18-month post-study work visa (Jobseeker Visa) in Germany?",
              a: "Upon completing your Master's or Bachelor's degree at a state-recognized German university, you are entitled to an 18-month residence permit (Section 20 (3) AufenthG) to seek employment matching your qualification. During these 18 months, you have full work authorization."
            },
            {
              q: "Does Germany charge social security on the employer too?",
              a: "Yes. German social security is split roughly 50/50 between employer and employee. The deductions shown above are your employee share. Your employer pays an identical matching share directly to the social security offices."
            },
            {
              q: "Can I bring my spouse and children on an EU Blue Card?",
              a: "Yes. Spouses of EU Blue Card holders can move immediately to Germany without prior German language certification (A1 exemption), and receive full unrestricted working rights in Germany."
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
