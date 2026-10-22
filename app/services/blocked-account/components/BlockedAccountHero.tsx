"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, ArrowRight, Wallet, Landmark, RefreshCw } from 'lucide-react';

export const BlockedAccountHero = () => {
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
          <span className="text-[var(--lp-text)] font-bold">Blocked Account for Germany</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Official § 16b AufenthG Requirement
            </div>

            <h1 className="lp-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[var(--lp-text)] tracking-[-0.02em] leading-[1.08]">
              German Blocked Account <br />
              <em className="lp-script text-[var(--lp-red)]">Fast &amp; 100% Compliant</em>
            </h1>

            <p className="text-base sm:text-lg text-[var(--lp-muted)] leading-[1.7] font-normal max-w-2xl">
              Open your mandatory German Sperrkonto for your VFS student visa appointment. Speak to a dedicated finance advisor within <strong className="text-[var(--lp-text)] font-bold">60 minutes</strong>, compare BaFin-approved providers (Expatrio, Coracle, Fintiba), and receive your official blocking confirmation document within <strong className="text-[var(--lp-text)] font-bold">24 hours</strong>.
            </p>

            {/* Micro Value Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-text)]">€11,904</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Annual Requirement</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-red)]">€992 /mo</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Monthly Allowance</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-text)]">24 Hours</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Confirmation Time</div>
              </div>
              <div className="p-3.5 bg-[var(--lp-card)] rounded-2xl border border-[var(--lp-rule)] text-center shadow-2xs">
                <div className="lp-serif text-lg font-bold text-[var(--lp-red)]">100%</div>
                <div className="text-[10px] font-semibold text-[var(--lp-muted)] uppercase tracking-wider mt-0.5">Refund Guarantee</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href="#booking" 
                className="lp-btn lp-btn--red justify-center text-sm shadow-[0_12px_28px_-8px_rgba(230,57,70,0.4)]"
              >
                <span>Apply for Blocked Account</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a 
                href="#calculator" 
                className="lp-btn lp-btn--dark justify-center text-sm"
              >
                <span>Calculate Cost in INR</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-[var(--lp-faint)]">
              BaFin-regulated German deposit · Zero hidden fees · Direct blocking certificate.
            </p>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-5 shadow-[0_12px_40px_rgba(22,22,26,0.04)]">
              <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4">
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
                  <span>2026/2027 Official Rates</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ece7dd] text-[var(--lp-text)] border border-[#e2ddd3] text-[10.5px] font-semibold uppercase tracking-wider shrink-0">
                  Federal Foreign Office
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Annual Blocked Amount</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-text)]">€11,904</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider">Monthly Payout Rate</span>
                  <span className="lp-serif text-lg font-bold text-[var(--lp-red)]">€992 /mo</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-muted)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[var(--lp-red)]" /> Confirmation Delivery
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">Within 24 Hours</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3]">
                  <span className="text-[var(--lp-text)] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-[var(--lp-red)]" /> Insurance Cashback
                  </span>
                  <span className="font-bold text-[var(--lp-text)]">Up to €247 Benefit</span>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-[var(--lp-rule)]">
                <a 
                  href="#providers" 
                  className="text-xs font-semibold text-[var(--lp-red)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Compare Expatrio, Coracle &amp; Fintiba</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
