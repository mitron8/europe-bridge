"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyFAQ } from '@/app/study/components/StudyFAQ';
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
  ChevronDown,
  ChevronRight
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
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Header */}
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
              <span className="font-semibold text-[#16161a]">Net Salary &amp; Blue Card Calculator</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <Briefcase className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">2026 German Tax &amp; Blue Card Thresholds</span>
              <span className="text-[#9a958c]">|</span>
              <span>Ausl&auml;nderbeh&ouml;rde Standard</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              German Net Salary &amp; Blue Card Calculator. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">Take-Home Pay &amp; Fast-Track PR Eligibility.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Calculate your actual take-home pay after German income tax (<em>Lohnsteuer</em>) and social security. Verify whether your job offer qualifies for the <strong>EU Blue Card</strong> and fast-track permanent residency.
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm space-y-6">
                
                {/* Gross Annual Salary */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                      Gross Annual Salary (Brutto) *
                    </label>
                    <span className="text-[12.5px] font-bold text-[#787369]">
                      &euro;{(grossAnnualSalary / 12).toFixed(0)} / mo
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-[16px] font-bold text-[#787369]">&euro;</span>
                    <input
                      type="number"
                      value={grossAnnualSalary}
                      onChange={(e) => setGrossAnnualSalary(parseFloat(e.target.value) || 0)}
                      step={1000}
                      className="w-full pl-9 pr-4 py-3 text-[16px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none transition-all"
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
                      className={`py-1.5 px-2 rounded-lg text-[12px] font-bold border transition-colors cursor-pointer ${
                        grossAnnualSalary === sal
                          ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                          : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                      }`}
                    >
                      &euro;{(sal / 1000)}k
                    </button>
                  ))}
                </div>

                {/* Occupation Field / Blue Card Track */}
                <div className="pt-5 border-t border-[#ece7dd] space-y-3">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                    Profession / Degree Field
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsShortageOccupation(true)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isShortageOccupation
                          ? 'bg-[#f4f1ea] border-[#16161a] text-[#16161a] font-bold shadow-2xs'
                          : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                      }`}
                    >
                      <p className="text-[12.5px] font-bold">MINT / STEM / IT / Medical</p>
                      <p className="text-[10.5px] text-[#787369] mt-0.5">Shortage Occupation Track</p>
                      <span className="text-[11.5px] font-bold text-[#9e2a2b] block mt-1.5">
                        Min. &euro;41,041 / year
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsShortageOccupation(false)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        !isShortageOccupation
                          ? 'bg-[#f4f1ea] border-[#16161a] text-[#16161a] font-bold shadow-2xs'
                          : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                      }`}
                    >
                      <p className="text-[12.5px] font-bold">General Business / Other</p>
                      <p className="text-[10.5px] text-[#787369] mt-0.5">Standard Profession Track</p>
                      <span className="text-[11.5px] font-bold text-[#9e2a2b] block mt-1.5">
                        Min. &euro;45,300 / year
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tax Class & Church Tax */}
                <div className="pt-5 border-t border-[#ece7dd] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                      German Tax Class (Steuerklasse)
                    </label>
                    <select
                      value={taxClass}
                      onChange={(e) => setTaxClass(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-[12.5px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    >
                      <option value={1}>Tax Class 1 (Single / Unmarried Graduate)</option>
                      <option value={3}>Tax Class 3 (Married - Primary Higher Earner)</option>
                      <option value={4}>Tax Class 4 (Married - Equal Earners)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                      Church Tax (Kirchensteuer)
                    </label>
                    <select
                      value={churchTax ? 'yes' : 'no'}
                      onChange={(e) => setChurchTax(e.target.value === 'yes')}
                      className="w-full px-3.5 py-2.5 text-[12.5px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    >
                      <option value="no">No (Not Registered with German Church)</option>
                      <option value="yes">Yes (Registered Catholic / Protestant)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Fast-Track Permanent Residency Info */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm space-y-3">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#9e2a2b]" />
                  Permanent Residency Timeline for Blue Card Holders
                </h3>
                <p className="text-[12.5px] text-[#5e5b54] leading-relaxed">
                  Holders of the EU Blue Card in Germany receive the fastest route to indefinite permanent settlement (<em>Niederlassungserlaubnis</em>):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] pt-1">
                  <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd]">
                    <p className="font-bold text-[#16161a]">21 Months (with B1 German)</p>
                    <p className="text-[11px] text-[#5e5b54] mt-0.5">Pay pension contributions for just 21 months with certified B1 language skills.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd]">
                    <p className="font-bold text-[#16161a]">27 Months (with A1 German)</p>
                    <p className="text-[11px] text-[#5e5b54] mt-0.5">Achieve PR in 27 months even with only elementary A1 German knowledge.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Results Overview */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369] block mb-1">
                  Estimated Net Take-Home Pay
                </span>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#16161a] tracking-tight">
                    &euro;{calculation.netMonthly.toLocaleString()}
                  </span>
                  <span className="text-[12px] font-bold text-[#787369]">/ Month</span>
                </div>

                <p className="text-[12px] font-medium text-[#787369] mb-6">
                  Net Annual: ~&euro;{calculation.netAnnual.toLocaleString()} / year (from &euro;{grossAnnualSalary.toLocaleString()} gross)
                </p>

                {/* Blue Card Qualification Badge */}
                <div className={`p-4 rounded-xl border text-[12px] mb-6 space-y-1.5 ${
                  calculation.qualifiesForBlueCard
                    ? 'bg-white border-[#dcd7cb] text-[#16161a]'
                    : 'bg-white border-[#e5e0d3] text-[#9e2a2b]'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {calculation.qualifiesForBlueCard ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#9e2a2b] shrink-0" />
                    )}
                    <span>
                      {calculation.qualifiesForBlueCard
                        ? '✓ Qualifies for EU Blue Card!'
                        : 'Salary Below EU Blue Card Minimum'}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#5e5b54] leading-relaxed">
                    {calculation.qualifiesForBlueCard
                      ? `Your offer is €${calculation.blueCardSurplus.toLocaleString()} above the statutory threshold of €${calculation.requiredThreshold.toLocaleString()}.`
                      : `Threshold for this category is €${calculation.requiredThreshold.toLocaleString()}. You can still apply for a standard German Skilled Worker Visa (Section 18a/18b).`}
                  </p>
                </div>

                {/* Deductions Breakdown */}
                <div className="p-4 rounded-xl bg-white border border-[#ece7dd] space-y-2 mb-6 text-[12px]">
                  <div className="flex justify-between items-center text-[#787369] font-bold border-b border-[#ece7dd] pb-2 text-[11px] uppercase tracking-wider">
                    <span>Monthly Breakdown</span>
                    <span>Amount (&euro;)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54]">Gross Monthly:</span>
                    <span className="font-bold text-[#16161a]">&euro;{calculation.grossMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9e2a2b]">
                    <span>- Wage Tax (Lohnsteuer):</span>
                    <span className="font-bold">-&euro;{calculation.incomeTaxMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9e2a2b]">
                    <span>- Health Insurance (GKV):</span>
                    <span className="font-bold">-&euro;{calculation.healthMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9e2a2b]">
                    <span>- Pension (Rente):</span>
                    <span className="font-bold">-&euro;{calculation.pensionMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9e2a2b]">
                    <span>- Unemployment (AV):</span>
                    <span className="font-bold">-&euro;{calculation.unemploymentMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#9e2a2b]">
                    <span>- Nursing Care (PV):</span>
                    <span className="font-bold">-&euro;{calculation.careMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#ece7dd] font-bold text-[#16161a] text-[13px]">
                    <span>Net Payout to Bank:</span>
                    <span>&euro;{calculation.netMonthly}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    href="/study/life-after-offer"
                    className="w-full rounded-xl bg-[#16161a] py-3 px-4 text-[13px] font-semibold flex items-center justify-center gap-2 text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Explore Career &amp; Post-Study Work Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/tools/cost-of-living-estimator"
                    className="w-full rounded-xl border border-[#dcd7cb] bg-white py-2.5 px-4 text-[12.5px] font-semibold text-center block text-[#16161a] hover:bg-[#f7f5f0] transition-colors"
                  >
                    Check Student Cost of Living &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <StudyFAQ
          id="faq"
          badge="German Payroll & Blue Card FAQs"
          title="Frequently Asked Questions"
          subtitle="Clear answers about post-study work authorization, employer social security splits, and spouse visa exemptions."
          faqs={[
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
