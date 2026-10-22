"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyFAQ } from '@/app/study/components/StudyFAQ';
import { 
  Wallet, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Users, 
  HelpCircle, 
  ChevronDown,
  ChevronRight,
  Building2,
  Calendar
} from 'lucide-react';

export default function BlockedAccountCalculatorPage() {
  const [months, setMonths] = useState<number>(12);
  const [spouseAccompanying, setSpouseAccompanying] = useState<boolean>(false);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [monthlyScholarship, setMonthlyScholarship] = useState<number>(0);
  const [currency, setCurrency] = useState<'EUR' | 'INR' | 'USD'>('INR');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Official statutory baseline for 2025/2026
  const BASE_MONTHLY_EUR = 992;
  const SPOUSE_MONTHLY_EUR = 400;
  const CHILD_MONTHLY_EUR = 300;
  const BUFFER_EUR = 100; // Mandatory provider buffer (refunded at account closure)
  const SETUP_FEE_ESTIMATE_EUR = 89; // Average provider setup fee (Expatrio/Coracle/Fintiba)

  // Currency exchange approximations
  const FX_RATES: Record<string, { rate: number; symbol: string }> = {
    EUR: { rate: 1, symbol: '€' },
    INR: { rate: 91.5, symbol: '₹' },
    USD: { rate: 1.08, symbol: '$' },
  };

  const calculation = useMemo(() => {
    // Effective student monthly requirement after scholarship deduction
    const netStudentMonthly = Math.max(0, BASE_MONTHLY_EUR - monthlyScholarship);
    
    // Dependants addition
    const spouseMonthly = spouseAccompanying ? SPOUSE_MONTHLY_EUR : 0;
    const childrenMonthly = childrenCount * CHILD_MONTHLY_EUR;
    
    const totalMonthlyDeposit = netStudentMonthly + spouseMonthly + childrenMonthly;
    const totalLivingFunds = totalMonthlyDeposit * months;
    
    // Total deposit required
    const totalBlockedDeposit = totalLivingFunds + (totalLivingFunds > 0 ? BUFFER_EUR : 0);
    const totalEstimatedTransfer = totalBlockedDeposit + SETUP_FEE_ESTIMATE_EUR;

    const rate = FX_RATES[currency].rate;
    const symbol = FX_RATES[currency].symbol;

    return {
      netStudentMonthly,
      totalMonthlyDeposit,
      totalLivingFunds,
      totalBlockedDeposit,
      totalEstimatedTransfer,
      currencySymbol: symbol,
      totalTransferConverted: Math.round(totalEstimatedTransfer * rate),
      totalLivingConverted: Math.round(totalLivingFunds * rate),
      monthlyPayoutConverted: Math.round(totalMonthlyDeposit * rate),
    };
  }, [months, spouseAccompanying, childrenCount, monthlyScholarship, currency]);

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
              <span className="font-semibold text-[#16161a]">Blocked Account Calculator</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">2025/2026 Ausw&auml;rtiges Amt Statutory Figures</span>
              <span className="text-[#9a958c]">|</span>
              <span>Official Sperrkonto Baseline</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              German Blocked Account Calculator. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">Statutory Visa Funds &amp; Monthly Payouts.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Calculate the exact proof of financial funds (<em>Sperrkonto</em>) required for your German student visa. Based on the statutory <strong>&euro;992/month (&euro;11,904/year)</strong> requirement with family reunion add-ons and currency conversions.
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm space-y-6">
                
                {/* Duration in Months */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                      Visa / Blocked Duration *
                    </label>
                    <span className="text-[13px] font-bold text-[#9e2a2b]">
                      {months} Months
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[3, 6, 9, 12, 18, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMonths(m)}
                        className={`py-2 px-1 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer ${
                          months === m
                            ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                            : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        {m} mo{m === 12 ? ' (1 yr)' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dependants Section */}
                <div className="pt-5 border-t border-[#ece7dd] space-y-4">
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                    Accompanying Family (Family Reunion Visa)
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd] flex items-center justify-between">
                      <div>
                        <span className="text-[13px] font-bold text-[#16161a] block">
                          Spouse Joining
                        </span>
                        <span className="text-[11px] text-[#787369]">+&euro;400 / month</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={spouseAccompanying} 
                          onChange={(e) => setSpouseAccompanying(e.target.checked)} 
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-[#e5e0d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#dcd7cb] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#16161a]"></div>
                      </label>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd] flex items-center justify-between">
                      <div>
                        <span className="text-[13px] font-bold text-[#16161a] block">
                          Children Joining
                        </span>
                        <span className="text-[11px] text-[#787369]">+&euro;300 / child / mo</span>
                      </div>
                      <select
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                        className="px-2.5 py-1 text-[12px] font-bold rounded-lg bg-white border border-[#dcd7cb] text-[#16161a] focus:outline-none focus:border-[#16161a]"
                      >
                        <option value={0}>0 Children</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                        <option value={3}>3 Children</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Scholarship Deduction */}
                <div className="pt-5 border-t border-[#ece7dd] space-y-2">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740]">
                    Monthly Scholarship / Grant Deduction (if any)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-[14px] font-bold text-[#787369]">&euro;</span>
                    <input
                      type="number"
                      value={monthlyScholarship || ''}
                      onChange={(e) => setMonthlyScholarship(parseFloat(e.target.value) || 0)}
                      placeholder="0 (e.g. 500 if partial scholarship)"
                      className="w-full pl-8 pr-4 py-2.5 text-[13.5px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <p className="text-[11.5px] text-[#787369]">
                    If you hold an official scholarship (e.g. DAAD, Erasmus+), you only need to block the deficit below &euro;992/month.
                  </p>
                </div>

                {/* Currency Display Selector */}
                <div className="pt-5 border-t border-[#ece7dd]">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-2">
                    Display Currency Conversion
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['INR', 'EUR', 'USD'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`py-2 text-[12px] font-bold rounded-xl border transition-colors cursor-pointer ${
                          currency === curr
                            ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                            : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        {curr} ({FX_RATES[curr].symbol})
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Provider Comparison Mini Card */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm space-y-4">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#9e2a2b]" />
                  Approved Blocked Account Providers in Germany
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
                  <div className="p-3 rounded-xl bg-[#faf8f3] border border-[#ece7dd]">
                    <p className="font-bold text-[#16161a]">Coracle</p>
                    <p className="text-[11px] text-[#787369] mt-0.5">Fee: &euro;99 (Prime bundle: free)</p>
                    <p className="text-[11px] text-[#16161a] font-semibold mt-1">✓ Fast 2-hr opening</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#faf8f3] border border-[#ece7dd]">
                    <p className="font-bold text-[#16161a]">Expatrio</p>
                    <p className="text-[11px] text-[#787369] mt-0.5">Fee: &euro;89 setup + &euro;5/mo</p>
                    <p className="text-[11px] text-[#16161a] font-semibold mt-1">✓ Digital app</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#faf8f3] border border-[#ece7dd]">
                    <p className="font-bold text-[#16161a]">Fintiba</p>
                    <p className="text-[11px] text-[#787369] mt-0.5">Fee: &euro;89 setup + &euro;4.90/mo</p>
                    <p className="text-[11px] text-[#16161a] font-semibold mt-1">✓ Sutor Bank partner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Output Card */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369] block mb-1">
                  Total Required Deposit
                </span>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#16161a] tracking-tight">
                    &euro;{calculation.totalBlockedDeposit.toLocaleString()}
                  </span>
                  <span className="text-[12px] font-bold text-[#787369]">EUR</span>
                </div>

                {currency !== 'EUR' && (
                  <p className="text-[13.5px] font-bold text-[#9e2a2b] mb-4">
                    &asymp; {calculation.currencySymbol}{calculation.totalLivingConverted.toLocaleString()} ({currency})
                  </p>
                )}

                {/* Monthly Release Breakdown */}
                <div className="p-4 rounded-xl bg-white border border-[#ece7dd] space-y-2.5 mb-6 text-[12px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5e5b54]">Monthly Payout to You:</span>
                    <span className="font-bold text-[#16161a] text-[13.5px]">
                      &euro;{calculation.totalMonthlyDeposit.toLocaleString()} / mo
                    </span>
                  </div>
                  {currency !== 'EUR' && (
                    <div className="flex justify-between items-center text-[11px] text-[#787369]">
                      <span>Monthly in {currency}:</span>
                      <span className="font-bold text-[#16161a]">
                        {calculation.currencySymbol}{calculation.monthlyPayoutConverted.toLocaleString()} / mo
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-[#ece7dd] text-[11px]">
                    <span className="text-[#5e5b54]">Buffer Reserve (Refunded):</span>
                    <span className="font-bold text-[#16161a]">&euro;{BUFFER_EUR}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#5e5b54]">Estimated Setup Fee:</span>
                    <span className="font-bold text-[#16161a]">&euro;{SETUP_FEE_ESTIMATE_EUR}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    href="/services/blocked-account"
                    className="w-full rounded-xl bg-[#16161a] py-3 px-4 text-[13px] font-semibold flex items-center justify-center gap-2 text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#e5e0d3]" />
                    <span>Open Blocked Account via EuropeBridge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/tools/cost-of-living-estimator"
                    className="w-full rounded-xl border border-[#dcd7cb] bg-white py-2.5 px-4 text-[12.5px] font-semibold text-center block text-[#16161a] hover:bg-[#f7f5f0] transition-colors"
                  >
                    Compare City-by-City Cost of Living &rarr;
                  </Link>
                </div>
              </div>

              {/* Practical Visa Tip */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 shadow-sm space-y-2">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#9e2a2b]" />
                  Visa Appointment Timing
                </h4>
                <p className="text-[12.5px] text-[#5e5b54] leading-relaxed">
                  You must have your official <strong>06-Confirmation Document</strong> from your blocked account provider before your VFS / German Embassy appointment. International bank transfers can take 2–5 business days to clear, so initiate transfer well in advance.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <StudyFAQ
          id="faq"
          badge="Blocked Account Calculation FAQs"
          title="Frequently Asked Questions"
          subtitle="Statutory 2026 monthly requirements, Girokonto payouts in Germany, and safety buffer refunds."
          faqs={[
            {
              q: "What is the new statutory monthly amount for 2025/2026?",
              a: "The German Federal Ministry of Education and Foreign Office raised the student BAföG baseline to €992 per month. For a standard 12-month visa, you must block exactly €11,904 plus the provider buffer."
            },
            {
              q: "When and how do I receive this money in Germany?",
              a: "Once you arrive in Germany, open a local current bank account (Girokonto, e.g. N26, Sparkasse, Deutsche Bank) and complete your city registration (Anmeldung). Your blocked account will disburse €992 on the 1st of every month into your Girokonto."
            },
            {
              q: "What happens to the €100 buffer?",
              a: "The buffer is a statutory reserve required by banks to cover unexpected incoming wire intermediary deductions. If unused, it is fully returned to you upon closing your blocked account or with your final payout."
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
