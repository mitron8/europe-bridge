"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, Calendar, ShieldCheck, ArrowRight, Building2, MapPin, Calculator, Coins } from 'lucide-react';

export const CostHeroHeader = () => {
  return (
    <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Subtle Ambient Accents */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.3), rgba(201,163,91,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
          <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <Link href="/study/masters" className="hover:text-[var(--lp-red)] transition-colors">Study</Link>
          <span className="text-[var(--lp-faint)]">/</span>
          <span className="text-[var(--lp-text)] font-bold">Cost of Living</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] animate-pulse" />
              <span>Student Budget Guide 2026</span>
            </div>

            <h1 className="lp-serif text-3xl sm:text-4xl lg:text-[52px] font-semibold text-[var(--lp-text)] leading-[1.12] tracking-[-0.015em]">
              Cost of Living in Germany <em className="lp-script text-[var(--lp-red)]">for Students</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.65] font-normal">
              A realistic, detailed breakdown of what you will actually spend each month as an international student in Germany. No sugarcoating—just real numbers, rent insights, food budgets, and money-saving strategies.
            </p>

            {/* At a Glance Box */}
            <div className="bg-[#ece7dd]/70 border border-[#ded8cb] rounded-2xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(22,22,26,0.03)]">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[var(--lp-red)] bg-[var(--lp-red)]/10">
                  <ShieldCheck className="w-3.5 h-3.5" /> Key Takeaway At a Glance
                </span>
                <span className="text-[11.5px] font-medium text-[var(--lp-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--lp-faint)]" /> Updated May 2026
                </span>
              </div>
              <p className="text-[14px] text-[var(--lp-text)] leading-[1.7] font-normal">
                Most international students in Germany spend <strong className="font-semibold text-[var(--lp-text)]">€900 to €1,300 per month</strong> covering rent, food, health insurance, public transit (€63/mo Deutschlandticket), and personal expenses. The German student visa requires a mandatory blocked account of <strong className="text-[var(--lp-red)] font-semibold">€11,904/year (€992/month)</strong>.
              </p>
            </div>
          </div>

          {/* Dedicated Tool Navigation Card */}
          <div data-reveal className="lg:col-span-5">
            <motion.div 
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.05)] relative"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#ded8cb] shadow-xs">
                    <Wallet className="w-5 h-5 text-[var(--lp-red)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] block">Dedicated Estimation Tool</span>
                    <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Cost of Living Estimator</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                Estimate your exact monthly expenses by selecting your destination city, preferred flatshare or dorm room type, food habits, and monthly transit pass.
              </p>

              {/* City Tier Overview */}
              <div className="space-y-2.5">
                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[var(--lp-text)]">Tier 1: High Cost (Munich, Frankfurt)</div>
                    <div className="text-[11px] text-[var(--lp-muted)]">Private WG: €650 &ndash; €900/mo</div>
                  </div>
                  <span className="font-bold text-[var(--lp-text)] text-sm">~€1,350/mo</span>
                </div>

                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[var(--lp-text)]">Tier 2: Mid Range (Berlin, Aachen, Hamburg)</div>
                    <div className="text-[11px] text-[var(--lp-muted)]">Private WG: €450 &ndash; €600/mo</div>
                  </div>
                  <span className="font-bold text-[var(--lp-text)] text-sm">~€1,100/mo</span>
                </div>

                <div className="p-3.5 bg-[#ece7dd]/60 rounded-xl border border-[#ded8cb] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[var(--lp-text)]">Tier 3: Budget-Friendly (Leipzig, Dresden)</div>
                    <div className="text-[11px] text-[var(--lp-muted)]">Private WG: €300 &ndash; €400/mo</div>
                  </div>
                  <span className="font-bold text-[var(--lp-text)] text-sm">~€900/mo</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link 
                  href="/tools/cost-of-living-estimator"
                  className="lp-btn lp-btn--dark w-full justify-center text-xs group"
                >
                  <span>Launch Cost of Living Estimator</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link 
                  href="/tools/blocked-account-calculator"
                  className="text-xs text-[var(--lp-muted)] hover:text-[var(--lp-red)] transition-colors inline-flex items-center gap-1.5 justify-center w-full font-medium"
                >
                  <Coins className="w-3.5 h-3.5 text-[var(--lp-red)]" />
                  <span>Check Blocked Account Deposit Requirements (€11,904/yr) &rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
