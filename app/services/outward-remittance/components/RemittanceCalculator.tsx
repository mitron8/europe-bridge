"use client";
import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, CheckCircle2, TrendingDown, Landmark } from 'lucide-react';
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
    <section id="calculator" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8 bg-gradient-to-br from-white via-amber-50/20 to-white border border-amber-200/80">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-700" />
            <span>Forex &amp; TCS Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Outward Remittance &amp; TCS Calculator
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Calculate your exact INR cost, RBI Tax Collected at Source (TCS), and see how much you save over traditional retail banks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Preset Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 block">
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
                    className={`p-3 rounded-xl border text-left transition-all ${
                      eurAmount === item.amt
                        ? 'border-germany-red bg-red-50/70 ring-2 ring-germany-red/30'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-black text-germany-black">{item.label}</div>
                    <div className="text-[11px] font-extrabold text-germany-red">€{item.amt.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Slider / Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                  Transfer Amount in Euros (EUR)
                </label>
                <span className="text-sm font-black text-germany-red px-2.5 py-0.5 rounded-lg bg-red-50 border border-red-200">
                  €{eurAmount.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">€</span>
                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="50"
                  value={eurAmount}
                  onChange={(e) => setEurAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 font-bold text-base bg-white focus:border-germany-red outline-none"
                />
              </div>
            </div>

            {/* Funding Source Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 block">
                Funding Source (Affects RBI TCS Rate)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFundingSource('loan')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fundingSource === 'loan'
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs font-bold text-gray-500 uppercase">Education Loan (Tax Concession)</div>
                  <div className="text-sm font-black text-emerald-900 mt-0.5">Bank Education Loan</div>
                  <div className="text-xs font-black text-emerald-700 mt-1">0.5% TCS above ₹7L</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFundingSource('savings')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fundingSource === 'savings'
                      ? 'border-germany-red bg-red-50/60 ring-2 ring-germany-red/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs font-bold text-gray-500 uppercase">Personal Funds</div>
                  <div className="text-sm font-black text-germany-black mt-0.5">Self / Parent Savings</div>
                  <div className="text-xs font-black text-germany-red mt-1">5% TCS above ₹7L</div>
                </button>
              </div>
            </div>

            {/* Live Exchange Rate Box */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-gray-700">
                  Forex Rate (INR per 1 EUR)
                </label>
                <span className="text-xs font-bold text-gray-500">Live Interbank Benchmark</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    step="0.1"
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
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6">
            <motion.div 
              className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-md space-y-6"
              layout
            >
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    Total Estimated INR Payable
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    Institutional Rate
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="text-3xl sm:text-4xl font-black text-germany-black font-display">
                    ₹{totalInr.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    Save ₹{studentSavings.toLocaleString('en-IN')}
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Equivalent to exactly €{eurAmount.toLocaleString()} credited to your German IBAN.
                </p>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Base Currency Conversion (€{eurAmount.toLocaleString()} × ₹{exchangeRate})</span>
                  <span className="font-bold text-germany-black">₹{Math.round(rawInr).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-gray-600">TCS under RBI LRS ({fundingSource === 'loan' ? '0.5%' : '5%'} on amount &gt; ₹7L)</span>
                    <span className="text-[11px] text-gray-400 block">100% adjustable against income tax returns (ITR)</span>
                  </div>
                  <span className="font-bold text-germany-black">₹{tcsAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="font-semibold text-gray-600">Forex Processing &amp; SWIFT Network Fee</span>
                  <span className="font-bold text-germany-black">₹{partnerFixedFee} <span className="text-[11px] font-normal text-gray-400">(Fixed)</span></span>
                </div>

                <div className="flex justify-between items-center py-1.5 bg-emerald-50/80 px-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Intermediary German Bank Deduction
                  </span>
                  <span className="font-black text-emerald-700">€0 Guaranteed</span>
                </div>
              </div>

              {/* Bank Comparison Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
                <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-amber-700" />
                  <span>Why You Save ₹{studentSavings.toLocaleString('en-IN')} With EuropeBridge</span>
                </div>
                <p className="text-amber-800 leading-relaxed font-medium">
                  Traditional retail banks add a 2.5%–3.5% hidden currency spread plus international correspondent bank fees. Our authorized forex partner locks in live wholesale interbank rates, ensuring your exact Euro amount arrives safely.
                </p>
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
                  <ShieldCheck className="w-3.5 h-3.5" /> RBI Compliant
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
