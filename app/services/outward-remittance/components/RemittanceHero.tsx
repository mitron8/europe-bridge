"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Clock, Landmark, CheckCircle2, TrendingDown } from 'lucide-react';

export const RemittanceHero = () => {
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
          <span className="text-[var(--lp-text)] font-bold">Outward Remittance</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lp-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lp-red)]"></span>
              </span>
              <span>RBI LRS Compliant • Wholesale Forex</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.02em]">
              Outward Remittance for Germany <br className="hidden sm:inline" />
              <em className="lp-script text-[var(--lp-red)]">At Wholesale Forex Rates</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Send funds to Germany for your blocked account, university tuition, and rent deposit. Enjoy domestic INR transfers, a callback within 60 minutes, and official transfer confirmation within 48 hours.
            </p>

            {/* Clean CTA Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <a 
                href="#booking" 
                className="lp-btn lp-btn--red w-full sm:w-auto justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.45)]"
              >
                <span>Apply for Outward Remittance</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a 
                href="#calculator" 
                className="lp-btn lp-btn--ghost-dark w-full sm:w-auto justify-center"
              >
                <span>Calculate Rate &amp; TCS</span>
              </a>
            </div>

            {/* Clean Trust Indicators Line */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-[var(--lp-muted)] pt-3 border-t border-[#e5e0d3]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>60-Min Callback</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Credit in &lt; 48 Hours</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>€0 Intermediary Deduction</span>
              </span>
            </div>
          </div>

          {/* Clean Right-Side Live Snapshot Card */}
          <div className="lg:col-span-5">
            <motion.div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_16px_40px_rgba(22,22,26,0.06)] hover:shadow-[0_20px_50px_rgba(22,22,26,0.08)] transition-all duration-300 relative"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* Snapshot Header */}
              <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold border border-[#e2ddd3]">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">Verified Transfer Route</h3>
                    <p className="text-xs text-[var(--lp-muted)] font-medium">RBI Authorized Dealer Network</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#e5e0d3] text-[var(--lp-text)] text-[11px] font-bold">
                  <span>Live Rates</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white/60 border border-[#e5e0d3]">
                  <span className="text-[var(--lp-muted)] font-semibold">Blocked Account Transfer</span>
                  <span className="font-bold text-[var(--lp-text)]">€11,904 – €12,053</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white/60 border border-[#e5e0d3]">
                  <span className="text-[var(--lp-muted)] font-semibold">Intermediary Wire Cut</span>
                  <span className="font-bold text-[var(--lp-red)]">€0 Guaranteed</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white/60 border border-[#e5e0d3]">
                  <span className="text-[var(--lp-muted)] font-semibold">Deposit Method</span>
                  <span className="font-bold text-[var(--lp-text)]">Domestic INR (NEFT / RTGS)</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white/60 border border-[#e5e0d3]">
                  <span className="text-[var(--lp-text)] font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-[var(--lp-red)]" /> Avg. Savings vs Retail Banks
                  </span>
                  <span className="font-bold text-[var(--lp-red)] text-sm">₹25,000–₹35,000</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 text-xs text-[var(--lp-muted)] font-medium leading-relaxed flex items-center gap-2 border-t border-[#e5e0d3]">
                <ShieldCheck className="w-4 h-4 text-[var(--lp-gold)] shrink-0" />
                <span>Includes official stamped confirmation letter for your VFS visa file.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
