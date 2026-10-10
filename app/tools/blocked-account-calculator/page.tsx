"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
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
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            2025/2026 Auswärtiges Amt Statutory Figures
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            German Blocked Account Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Calculate the exact proof of financial funds (<em>Sperrkonto</em>) required for your German student visa. Based on the statutory <strong>€992/month (€11,904/year)</strong> requirement.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md space-y-6">
              
              {/* Duration in Months */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Visa / Blocked Duration *
                  </label>
                  <span className="text-xs font-black text-germany-red dark:text-[#FF6B7A]">
                    {months} Months
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[3, 6, 9, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        months === m
                          ? 'bg-germany-red text-white border-germany-red shadow-xs'
                          : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {m} mo{m === 12 ? ' (1 yr)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dependants Section */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Accompanying Family (Family Reunion Visa)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-germany-black dark:text-white block">
                        Spouse Joining
                      </span>
                      <span className="text-[10px] text-gray-400">+€400 / month</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={spouseAccompanying} 
                        onChange={(e) => setSpouseAccompanying(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-germany-red"></div>
                    </label>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-germany-black dark:text-white block">
                        Children Joining
                      </span>
                      <span className="text-[10px] text-gray-400">+€300 / child / mo</span>
                    </div>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                      className="px-2 py-1 neu-input text-xs font-bold rounded-lg bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800"
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
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Monthly Scholarship / Grant Deduction (if any)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gray-400">€</span>
                  <input
                    type="number"
                    value={monthlyScholarship || ''}
                    onChange={(e) => setMonthlyScholarship(parseFloat(e.target.value) || 0)}
                    placeholder="0 (e.g. 500 if partial scholarship)"
                    className="w-full pl-8 pr-4 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  If you hold an official scholarship (e.g. DAAD, Erasmus+), you only need to block the deficit below €992/month.
                </p>
              </div>

              {/* Currency Display Selector */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Display Currency Conversion
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['INR', 'EUR', 'USD'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        currency === curr
                          ? 'bg-germany-red text-white border-germany-red shadow-xs'
                          : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {curr} ({FX_RATES[curr].symbol})
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Provider Comparison Mini Card */}
            <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-germany-red" />
                Approved Blocked Account Providers in Germany
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800">
                  <p className="font-extrabold text-germany-black dark:text-white">Coracle</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Fee: €99 (Prime bundle: free)</p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Fast 2-hr opening</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800">
                  <p className="font-extrabold text-germany-black dark:text-white">Expatrio</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Fee: €89 setup + €5/mo</p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Digital app</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800">
                  <p className="font-extrabold text-germany-black dark:text-white">Fintiba</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Fee: €89 setup + €4.90/mo</p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Sutor Bank partner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Output Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border-2 border-germany-red/30 dark:border-germany-red/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold" />

              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                Total Required Deposit
              </span>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-black font-display text-germany-black dark:text-white tracking-tight">
                  €{calculation.totalBlockedDeposit.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-gray-400">EUR</span>
              </div>

              {currency !== 'EUR' && (
                <p className="text-sm font-bold text-germany-red dark:text-[#FF6B7A] mb-4">
                  ≈ {calculation.currencySymbol}{calculation.totalLivingConverted.toLocaleString()} ({currency})
                </p>
              )}

              {/* Monthly Release Breakdown */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 space-y-2.5 mb-6 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Monthly Payout to You:</span>
                  <span className="font-extrabold text-germany-black dark:text-white text-sm">
                    €{calculation.totalMonthlyDeposit.toLocaleString()} / mo
                  </span>
                </div>
                {currency !== 'EUR' && (
                  <div className="flex justify-between items-center text-[11px] text-gray-400">
                    <span>Monthly in {currency}:</span>
                    <span className="font-bold">
                      {calculation.currencySymbol}{calculation.monthlyPayoutConverted.toLocaleString()} / mo
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-800 text-[11px]">
                  <span className="text-gray-500">Buffer Reserve (Refunded):</span>
                  <span className="font-bold text-gray-600 dark:text-gray-300">€{BUFFER_EUR}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500">Estimated Setup Fee:</span>
                  <span className="font-bold text-gray-600 dark:text-gray-300">€{SETUP_FEE_ESTIMATE_EUR}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href="/services/blocked-account"
                  className="w-full neu-btn-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md text-white"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-germany-gold" />
                  Open Blocked Account via EuropeBridge
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/tools/cost-of-living-estimator"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Compare City-by-City Cost of Living →
                </Link>
              </div>
            </div>

            {/* Practical Visa Tip */}
            <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-germany-red" />
                Visa Appointment Timing
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                You must have your official <strong>06-Confirmation Document</strong> from your blocked account provider before your VFS / German Embassy appointment. International bank transfers can take 2–5 business days to clear, so initiate transfer well in advance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto pb-20">
        <h2 className="text-2xl font-black font-display text-germany-black dark:text-white mb-6 text-center">
          Blocked Account FAQ
        </h2>
        <div className="space-y-3">
          {[
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
