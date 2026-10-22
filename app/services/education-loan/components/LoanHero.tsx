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
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Warm ambient landing lights */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[80vh] w-[65vw] rounded-full blur-[140px] opacity-40 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(231,211,168,0.55), rgba(244,241,234,0))" }}
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-[20%] left-[20%] h-[60vh] w-[45vw] rounded-full blur-[120px] opacity-30 select-none"
        style={{ background: "radial-gradient(closest-side, rgba(230,57,70,0.15), rgba(244,241,234,0))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/services" className="hover:text-[var(--lp-red)] transition-colors">Services</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Education Loan for Germany</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lp-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lp-red)]"></span>
              </span>
              <span>100% Financing Support 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.02em]">
              Education Loan for <em className="lp-script text-[var(--lp-red)]">Germany</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Finance your complete Master&apos;s or Bachelor&apos;s degree in Germany prior to your visa appointment. Get up to 100% funding covering tuition fees, living expenses, blocked account deposits (€11,904/yr), and travel costs with fast pre-admission sanction letters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <a 
                href="#booking" 
                className="lp-btn lp-btn--red w-full sm:w-auto justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.45)]"
              >
                <span>Apply for Education Loan</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a 
                href="#features" 
                className="lp-btn lp-btn--ghost-dark w-full sm:w-auto justify-center"
              >
                <span>See Loan Benefits</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-[var(--lp-muted)] pt-3 border-t border-[#e5e0d3]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Pre-Visa Sanction Letters</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Percent className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Sec 80E 100% Tax Deductible</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Banknote className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Zero Hidden Advisory Fees</span>
              </span>
            </div>
          </div>

          {/* Interactive Loan EMI Calculator Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3.5 border-b border-[#e5e0d3] pb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold border border-[#e2ddd3]">
                  <Calculator className="w-5 h-5 text-[var(--lp-text)]" />
                </div>
                <div>
                  <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Instant Loan EMI Calculator</h3>
                  <p className="text-xs text-[var(--lp-muted)] mt-0.5">Estimate your monthly repayment schedule</p>
                </div>
              </div>

              {/* Loan Amount Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-semibold text-[var(--lp-text)]">
                  <span>Required Loan Amount</span>
                  <span className="text-[var(--lp-red)] font-bold text-sm bg-[var(--lp-red)]/10 px-2.5 py-0.5 rounded-full">₹{loanAmountLakhs} Lakhs</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="1"
                  value={loanAmountLakhs} 
                  onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#ece7dd] rounded-lg appearance-none cursor-pointer accent-[var(--lp-red)] transition-all"
                />
                <div className="flex justify-between text-[11px] text-[var(--lp-muted)] font-medium">
                  <span>₹5 L</span>
                  <span>₹30 L</span>
                  <span>₹60 L</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-semibold text-[var(--lp-text)]">
                  <span>Repayment Tenure</span>
                  <span className="text-[var(--lp-text)] font-bold text-sm bg-[#ece7dd] px-2.5 py-0.5 rounded-full">{tenureYears} Years</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="15" 
                  step="1"
                  value={tenureYears} 
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#ece7dd] rounded-lg appearance-none cursor-pointer accent-[var(--lp-ink)] transition-all"
                />
                <div className="flex justify-between text-[11px] text-[var(--lp-muted)] font-medium">
                  <span>3 Yrs</span>
                  <span>10 Yrs</span>
                  <span>15 Yrs</span>
                </div>
              </div>

              {/* EMI Output */}
              <div className="bg-[#ece7dd]/60 rounded-2xl p-4 sm:p-5 border border-[#e2ddd3]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-semibold text-[var(--lp-muted)] uppercase tracking-wide">Estimated Monthly EMI</span>
                  <span className="lp-serif text-2xl sm:text-3xl font-bold text-[var(--lp-text)]">
                    ₹{emi.toLocaleString('en-IN')}<span className="text-xs font-normal text-[var(--lp-muted)]">/mo</span>
                  </span>
                </div>
                <div className="text-[11px] text-[var(--lp-muted)] leading-relaxed mt-1">
                  * Based on benchmark interest rate of ~10.5% p.a. (Collateral / Non-collateral options available).
                </div>
              </div>

              <a 
                href="#booking"
                className="lp-btn lp-btn--dark w-full justify-center group text-xs"
              >
                <span>Request Free Doorstep Eligibility Check</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
