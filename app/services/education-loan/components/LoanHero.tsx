"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Landmark, ArrowRight, Calculator, ShieldCheck, Banknote, Percent } from 'lucide-react';

export const LoanHero = () => {
  const [loanAmountLakhs, setLoanAmountLakhs] = useState<number>(25);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const interestRate = 10.5; // Standard education loan rate

  // Calculate monthly EMI
  const calculateEMI = () => {
    const P = loanAmountLakhs * 100000;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();

  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Education Loan for Germany</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Landmark className="w-4 h-4" />
              <span>100% Financing Support 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Education Loan for <span className="text-germany-red">Germany</span>
              </h1>
              <motion.img 
                src="/doodles/university.png" 
                alt="University Doodle Mascot"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Finance your complete Master's or Bachelor's degree in Germany prior to your visa appointment. Get up to 100% funding covering tuition fees, living expenses, blocked account deposits (€11,904/yr), and travel costs with fast pre-admission sanction letters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#booking" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Apply for Education Loan</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#features" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>See Loan Benefits</span>
              </a>
            </div>
          </div>

          {/* Interactive Loan EMI Calculator Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-5 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">Instant Education Loan EMI Checker</h3>
                  <p className="text-xs text-gray-500 font-medium">Estimate monthly repayment amounts</p>
                </div>
              </div>

              {/* Loan Amount Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                  <span>Required Loan Amount</span>
                  <span className="text-germany-red font-black text-sm">₹{loanAmountLakhs} Lakhs</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="1"
                  value={loanAmountLakhs} 
                  onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-germany-red"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>₹5 L</span>
                  <span>₹30 L</span>
                  <span>₹60 L</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                  <span>Repayment Tenure</span>
                  <span className="text-germany-black font-black text-sm">{tenureYears} Years</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="15" 
                  step="1"
                  value={tenureYears} 
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-germany-black"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>3 Yrs</span>
                  <span>10 Yrs</span>
                  <span>15 Yrs</span>
                </div>
              </div>

              {/* EMI Output */}
              <div className="bg-red-50/80 rounded-2xl p-4 border border-red-100">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Estimated Monthly EMI</span>
                  <span className="text-2xl font-black text-germany-black font-display">
                    ₹{emi.toLocaleString('en-IN')}<span className="text-xs font-semibold text-gray-500">/mo</span>
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  * Based on benchmark interest rate of ~10.5% p.a. (Collateral / Non-collateral options available).
                </div>
              </div>

              <a 
                href="#booking"
                className="w-full neu-btn py-3 text-xs font-bold text-germany-black flex items-center justify-center gap-2 hover:text-germany-red"
              >
                <span>Request Free Doorstep Eligibility Check</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
