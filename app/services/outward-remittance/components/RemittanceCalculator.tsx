"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const RemittanceCalculator = () => {
  const [eurAmount, setEurAmount] = useState<number>(12053); // Standard €11,904 + €100 buffer + €49 setup
  const [fundingSource, setFundingSource] = useState<'loan' | 'savings'>('loan');
  const [exchangeRate, setExchangeRate] = useState<number>(92.5);

  // Constants
  const tcsThreshold = 700000; // INR 7 Lakhs threshold under RBI LRS
  const rawInr = eurAmount * exchangeRate;
  
  // TCS calculation
  const taxableAmount = Math.max(0, rawInr - tcsThreshold);
  const tcsPercent = fundingSource === 'loan' ? 0.005 : 0.05; // 0.5% for loan, 5% for self
  const tcsAmount = Math.round(taxableAmount * tcsPercent);
  
  const partnerFixedFee = 750; // Transparent fixed transfer charge
  const totalInr = Math.round(rawInr + tcsAmount + partnerFixedFee);

  // Bank comparison: Retail banks typically have ~3% hidden spread + ₹2,500 wire fee
  const bankExchangeRate = exchangeRate * 1.03;
  const bankRawInr = eurAmount * bankExchangeRate;
  const bankTaxable = Math.max(0, bankRawInr - tcsThreshold);
  const bankTcs = Math.round(bankTaxable * tcsPercent);
  const bankTotal = Math.round(bankRawInr + bankTcs + 2500);
  const studentSavings = Math.max(0, bankTotal - totalInr);

  return (
    <section id="calculator" className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Forex &amp; TCS Estimator
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Outward Remittance &amp; <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">TCS Calculator</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-muted)] font-medium">
            Calculate your exact INR cost, RBI Tax Collected at Source (TCS), and see how much you save over traditional retail banks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Preset Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] block">
                Select Common Remittance Purpose
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Blocked Account", amt: 12053, desc: "€11,904 + buffer + fee" },
                  { label: "Tuition / Deposit", amt: 3500, desc: "Private uni or advance" },
                  { label: "Semester Contribution", amt: 350, desc: "Semesterbeitrag" },
                  { label: "Rent / Kaution", amt: 1800, desc: "Accommodation deposit" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEurAmount(item.amt)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      eurAmount === item.amt
                        ? 'border-[var(--lp-red)] bg-[var(--lp-red)]/5 ring-2 ring-[var(--lp-red)]/15 shadow-sm'
                        : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[var(--lp-text)]">{item.label}</div>
                    <div className="text-xs font-extrabold text-[var(--lp-red)]">€{item.amt.toLocaleString()}</div>
                    <div className="text-[10px] text-[var(--lp-muted)] font-medium">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Slider / Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)]">
                  Transfer Amount in Euros (EUR)
                </label>
                <span className="text-xs font-bold text-[var(--lp-red)] px-2.5 py-0.5 rounded-full bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20">
                  €{eurAmount.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--lp-muted)]">€</span>
                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="50"
                  value={eurAmount}
                  onChange={(e) => setEurAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#e5e0d3] font-bold text-sm bg-white focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none text-[var(--lp-text)]"
                />
              </div>
            </div>

            {/* Funding Source Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] block">
                Funding Source (Affects RBI TCS Rate)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFundingSource('loan')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fundingSource === 'loan'
                      ? 'border-[var(--lp-red)] bg-[var(--lp-red)]/5 ring-2 ring-[var(--lp-red)]/15 shadow-sm'
                      : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8]'
                  }`}
                >
                  <div className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">Education Loan</div>
                  <div className="text-sm font-bold text-[var(--lp-text)] mt-0.5">Bank Education Loan</div>
                  <div className="text-xs font-bold text-[var(--lp-red)] mt-1">0.5% TCS above ₹7L</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFundingSource('savings')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fundingSource === 'savings'
                      ? 'border-[var(--lp-red)] bg-[var(--lp-red)]/5 ring-2 ring-[var(--lp-red)]/15 shadow-sm'
                      : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8]'
                  }`}
                >
                  <div className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">Personal Funds</div>
                  <div className="text-sm font-bold text-[var(--lp-text)] mt-0.5">Self / Parent Savings</div>
                  <div className="text-xs font-bold text-[var(--lp-red)] mt-1">5% TCS above ₹7L</div>
                </button>
              </div>
            </div>

            {/* Live Exchange Rate Box */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--lp-text)]">
                  Forex Rate (INR per 1 EUR)
                </label>
                <span className="text-xs font-semibold text-[var(--lp-muted)]">Live Interbank Benchmark</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--lp-muted)]">₹</span>
                  <input
                    type="number"
                    step="0.1"
                    min="80"
                    max="110"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 92.5)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#e5e0d3] font-bold text-sm bg-white focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none text-[var(--lp-text)]"
                  />
                </div>
                <span className="text-xs text-[var(--lp-muted)] font-semibold shrink-0">INR per 1 EUR</span>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6">
            <motion.div 
              className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#e5e0d3] shadow-sm space-y-6"
              layout
            >
              <div className="border-b border-[#e5e0d3] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--lp-muted)] uppercase tracking-wider">
                    Total Estimated INR Payable
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ece7dd] text-[var(--lp-text)] text-[10px] font-bold uppercase border border-[#e2ddd3]">
                    Institutional Rate
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="lp-serif text-3xl sm:text-4xl font-bold text-[var(--lp-text)]">
                    ₹{totalInr.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-3 py-1 rounded-full border border-[var(--lp-red)]/20">
                    Save ₹{studentSavings.toLocaleString('en-IN')}
                  </div>
                </div>
                <p className="text-xs text-[var(--lp-muted)] font-medium mt-1">
                  Equivalent to exactly €{eurAmount.toLocaleString()} credited to your German IBAN.
                </p>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <span className="font-medium text-[var(--lp-muted)]">Base Currency Conversion (€{eurAmount.toLocaleString()} × ₹{exchangeRate})</span>
                  <span className="font-bold text-[var(--lp-text)]">₹{Math.round(rawInr).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <div className="space-y-0.5">
                    <span className="font-medium text-[var(--lp-muted)]">TCS under RBI LRS ({fundingSource === 'loan' ? '0.5%' : '5%'} on amount &gt; ₹7L)</span>
                    <span className="text-[11px] text-[var(--lp-faint)] block">100% adjustable against income tax returns (ITR)</span>
                  </div>
                  <span className="font-bold text-[var(--lp-text)]">₹{tcsAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#f0ede6]">
                  <span className="font-medium text-[var(--lp-muted)]">Forex Processing &amp; SWIFT Network Fee</span>
                  <span className="font-bold text-[var(--lp-text)]">₹{partnerFixedFee} <span className="text-[11px] font-normal text-[var(--lp-faint)]">(Fixed)</span></span>
                </div>

                <div className="flex justify-between items-center py-2 bg-[#ece7dd]/60 px-3.5 rounded-xl border border-[#e2ddd3]">
                  <span className="font-bold text-[var(--lp-text)] flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)]" /> Intermediary German Bank Deduction
                  </span>
                  <span className="font-bold text-[var(--lp-red)] text-xs">€0 Guaranteed</span>
                </div>
              </div>

              {/* Bank Comparison Callout */}
              <div className="p-4 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] text-xs space-y-1.5">
                <div className="font-bold text-[var(--lp-text)] flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[var(--lp-red)]" />
                  <span>Why You Save ₹{studentSavings.toLocaleString('en-IN')} With EuropeBridge</span>
                </div>
                <p className="text-[var(--lp-muted)] leading-relaxed font-medium">
                  Traditional retail banks add a 2.5%–3.5% hidden currency spread plus international correspondent bank fees. Our authorized forex partner locks in live wholesale interbank rates, ensuring your exact Euro amount arrives safely.
                </p>
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
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--lp-gold)]" /> RBI Compliant
                </span>
                <span>•</span>
                <span>Transfer Confirmation in &lt; 48 Hours</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
