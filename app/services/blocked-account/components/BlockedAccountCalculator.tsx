"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, RefreshCw } from 'lucide-react';
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
    <section id="calculator" className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Interactive Cost Estimator
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Blocked Amount &amp; <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Currency Calculator</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-text-muted)] font-medium">
            Calculate your exact statutory blocked requirement for 2026/2027 in EUR and Indian Rupees (INR).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visa Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] block">
                Select Visa Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVisaType('student')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    visaType === 'student'
                      ? 'border-[var(--lp-red)] bg-[var(--lp-red)]/5 ring-2 ring-[var(--lp-red)]/15 shadow-sm'
                      : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8]'
                  }`}
                >
                  <span className="text-[11px] font-bold text-[var(--lp-text-muted)] uppercase">Degree Study Visa</span>
                  <span className="text-base font-bold text-[var(--lp-text)] mt-1">Student (§ 16b)</span>
                  <span className="text-xs font-bold text-[var(--lp-red)] mt-2">€992 / month</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisaType('opportunity')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    visaType === 'opportunity'
                      ? 'border-[var(--lp-red)] bg-[var(--lp-red)]/5 ring-2 ring-[var(--lp-red)]/15 shadow-sm'
                      : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8]'
                  }`}
                >
                  <span className="text-[11px] font-bold text-[var(--lp-text-muted)] uppercase">Chancenkarte</span>
                  <span className="text-base font-bold text-[var(--lp-text)] mt-1">Opportunity Card</span>
                  <span className="text-xs font-bold text-[var(--lp-red)] mt-2">€1,027 / month</span>
                </button>
              </div>
            </div>

            {/* Months Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)]">
                  Required Duration (Months)
                </label>
                <span className="text-xs font-bold text-[var(--lp-red)] px-2.5 py-0.5 rounded-full bg-[var(--lp-red)]/10">
                  {months} Months
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[6, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      months === m
                        ? 'bg-[#16161a] text-white border-[#16161a] shadow-sm'
                        : 'bg-white/70 text-[var(--lp-text)] border-[#e5e0d3] hover:border-[#cfc8b8]'
                    }`}
                  >
                    {m} mo {m === 12 && '(Std)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Exchange Rate Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)]">
                  Estimated EUR/INR Exchange Rate
                </label>
                <span className="text-xs font-semibold text-[var(--lp-text-muted)]">Live Forex Baseline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--lp-text-muted)]">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    min="80"
                    max="110"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 92.5)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#e5e0d3] font-bold text-sm bg-white focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none text-[var(--lp-text)]"
                  />
                </div>
                <span className="text-xs text-[var(--lp-text-muted)] font-semibold shrink-0">INR per 1 EUR</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--lp-text)]">
                <Info className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>What is the €100 Buffer Deposit?</span>
              </div>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed font-medium">
                German banks require a €100 buffer (*Sicherheitspolster*) to safeguard against intermediary correspondent banking fees during international SWIFT wire transfers. Any remaining balance is automatically released to you or refunded upon account closing.
              </p>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6">
            <motion.div 
              className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#e5e0d3] shadow-sm space-y-6"
              layout
            >
              <div className="border-b border-[#e5e0d3] pb-4">
                <span className="text-xs font-bold text-[var(--lp-muted)] uppercase tracking-wider block">
                  Total Transfer Breakdown ({months} Months)
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="lp-serif text-3xl sm:text-4xl font-bold text-[var(--lp-text)]">
                    €{totalEur.toLocaleString()}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--lp-red)]">
                    ≈ ₹{totalInr.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <span className="font-medium text-[var(--lp-muted)]">Statutory Blocked Living Cost (€{monthlyAmount} × {months} mo)</span>
                  <span className="font-bold text-[var(--lp-text)]">€{totalBlocked.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <span className="font-medium text-[var(--lp-muted)]">Refundable Intermediary Buffer Deposit</span>
                  <span className="font-bold text-[var(--lp-text)]">€{bufferDeposit}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <span className="font-medium text-[var(--lp-muted)]">One-Time Partner Setup Fee</span>
                  <span className="font-bold text-[var(--lp-text)]">€{setupFee}</span>
                </div>

                <div className="flex justify-between items-center py-2 bg-[#ece7dd]/60 px-3.5 rounded-xl border border-[#e2ddd3]">
                  <span className="font-bold text-[var(--lp-text)] flex items-center gap-1.5 text-xs">
                    <RefreshCw className="w-4 h-4 text-[var(--lp-red)] shrink-0" /> TK / Barmer Health Insurance Bundle Cashback
                  </span>
                  <span className="font-bold text-[var(--lp-red)] text-xs">- €{setupFee} (Free Setup)</span>
                </div>
              </div>

              {/* Monthly Disbursement Pill */}
              <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#e5e0d3] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">Monthly Payout to Your German Account</div>
                  <div className="text-base font-bold text-[var(--lp-text)] mt-0.5">€{monthlyAmount} / month</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">Total Monthly Payouts</div>
                  <div className="text-xs font-bold text-[var(--lp-red)] mt-0.5">100% Retrievable</div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#booking"
                className="lp-btn lp-btn--red w-full py-3.5 text-xs font-bold inline-flex items-center justify-center gap-2"
              >
                <span>Lock In This Rate with Counselor Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--lp-muted)] font-semibold pt-1">
                <span className="flex items-center gap-1 text-[var(--lp-text)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--lp-gold)]" /> 100% Refund on Visa Decline
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

