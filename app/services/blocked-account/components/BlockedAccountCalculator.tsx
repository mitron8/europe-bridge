"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlockedAccountCalculator = () => {
  const [months, setMonths] = useState<number>(12);
  const [visaType, setVisaType] = useState<'student' | 'opportunity'>('student');
  const [exchangeRate, setExchangeRate] = useState<number>(92.5);

  const monthlyAmount = visaType === 'student' ? 992 : 1027;
  const totalBlocked = monthlyAmount * months;
  const bufferDeposit = 100; // German banking safety buffer
  const setupFee = 49; // Average discounted partner fee
  const totalEur = totalBlocked + bufferDeposit + setupFee;
  const totalInr = Math.round(totalEur * exchangeRate);

  return (
    <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8 bg-gradient-to-br from-white via-amber-50/20 to-white border border-amber-200/80">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-700" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Blocked Amount &amp; Currency Calculator
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Calculate your exact statutory blocked requirement for 2026/2027 in EUR and Indian Rupees (INR).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visa Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 block">
                Select Visa Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVisaType('student')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    visaType === 'student'
                      ? 'border-germany-red bg-red-50/60 ring-2 ring-germany-red/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-bold text-gray-500 uppercase">Degree Study Visa</span>
                  <span className="text-base font-black text-germany-black">Student (§ 16b)</span>
                  <span className="text-xs font-extrabold text-germany-red mt-1">€992 / month</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisaType('opportunity')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    visaType === 'opportunity'
                      ? 'border-germany-red bg-red-50/60 ring-2 ring-germany-red/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-bold text-gray-500 uppercase">Chancenkarte</span>
                  <span className="text-base font-black text-germany-black">Opportunity Card</span>
                  <span className="text-xs font-extrabold text-germany-red mt-1">€1,027 / month</span>
                </button>
              </div>
            </div>

            {/* Months Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                  Required Duration (Months)
                </label>
                <span className="text-sm font-black text-germany-red px-2.5 py-0.5 rounded-lg bg-red-50 border border-red-200">
                  {months} Months
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[6, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-black transition-all ${
                      months === m
                        ? 'bg-germany-black text-white border-germany-black shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {m} mo {m === 12 && '(Standard)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Exchange Rate Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                  Estimated EUR/INR Exchange Rate
                </label>
                <span className="text-xs font-bold text-gray-500">Live Forex Baseline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    min="80"
                    max="110"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 92.5)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-300 font-bold text-sm bg-white focus:border-germany-red outline-none"
                  />
                </div>
                <span className="text-xs text-gray-500 font-semibold shrink-0">INR per 1 EUR</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>What is the €100 Buffer Deposit?</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                German banks require a €100 buffer (*Sicherheitspolster*) to safeguard against intermediary correspondent banking fees during international SWIFT wire transfers. Any remaining balance is automatically released to you or refunded upon account closing.
              </p>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6">
            <motion.div 
              className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-md space-y-6"
              layout
            >
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black text-gray-500 uppercase tracking-wider block">
                  Total Transfer Breakdown ({months} Months)
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="text-3xl sm:text-4xl font-black text-germany-black font-display">
                    €{totalEur.toLocaleString()}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-germany-red">
                    ≈ ₹{totalInr.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Statutory Blocked Living Cost (€{monthlyAmount} × {months} mo)</span>
                  <span className="font-bold text-germany-black">€{totalBlocked.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Refundable Intermediary Buffer Deposit</span>
                  <span className="font-bold text-germany-black">€{bufferDeposit}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">One-Time Partner Setup Fee</span>
                  <span className="font-bold text-germany-black">€{setupFee}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 bg-emerald-50/80 px-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-emerald-700" /> TK / Barmer Health Insurance Bundle Cashback
                  </span>
                  <span className="font-black text-emerald-700">- €{setupFee} (Free Setup)</span>
                </div>
              </div>

              {/* Monthly Disbursement Pill */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Monthly Payout to Your German Account</div>
                  <div className="text-lg font-black text-germany-black">€{monthlyAmount} / month</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-500 uppercase">Total Monthly Payouts</div>
                  <div className="text-xs font-extrabold text-green-700">100% Retrievable</div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#booking"
                className="neu-btn-primary w-full py-4 text-sm font-black flex items-center justify-center gap-2 shadow-md"
              >
                <span>Lock In This Rate with Counselor Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 font-semibold pt-1">
                <span className="flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Refund on Visa Decline
                </span>
                <span>•</span>
                <span>BaFin Regulated Partners</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
