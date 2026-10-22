"use client";
import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const RemittanceComparison = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Bank Comparison
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            EuropeBridge vs. <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Traditional Retail Banks</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-muted)] font-medium">
            See why thousands of Indian students choose our dedicated student forex channel over physical bank branches.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#e5e0d3]">
                <th className="py-4 px-4 text-xs font-bold uppercase text-[var(--lp-muted)]">Feature</th>
                <th className="py-4 px-4 text-xs font-bold uppercase text-[var(--lp-red)] bg-[var(--lp-red)]/5 rounded-t-2xl">
                  EuropeBridge Forex Network
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase text-[var(--lp-muted)]">Traditional Retail Banks</th>
                <th className="py-4 px-4 text-xs font-bold uppercase text-[var(--lp-muted)]">General Online Gateways</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ede6] text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Exchange Rate Margin</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-text)] bg-[var(--lp-red)]/5">Near-Interbank (0.2%–0.5%)</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">High Markup (2.5%–4.0%)</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Moderate Markup (1.5%–2.5%)</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Intermediary Bank Deduction</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-red)] bg-[var(--lp-red)]/5">€0 Guaranteed Full Credit</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Unpredictable ($20–$35 Cut)</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Often Deducted</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Transfer Confirmation Speed</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-text)] bg-[var(--lp-red)]/5">&lt; 48 Working Hours</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">3 to 7 Working Days</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">2 to 4 Working Days</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Deposit Method</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-text)] bg-[var(--lp-red)]/5">Domestic NEFT/RTGS in INR</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Physical Branch Visit Required</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Debit Card / Netbanking</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Form A2 &amp; TCS Paperwork</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-text)] bg-[var(--lp-red)]/5">100% Assisted &amp; Verified</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Self-Filing &amp; Prone to Rejection</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Automated Bot Validation</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[var(--lp-text)]">Dedicated Counselor Support</td>
                <td className="py-4 px-4 font-bold text-[var(--lp-text)] bg-[var(--lp-red)]/5">60-Min Callback &amp; WhatsApp</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Call Center Queues</td>
                <td className="py-4 px-4 font-normal text-[var(--lp-muted)]">Automated AI Chat Only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--lp-muted)] font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--lp-gold)] shrink-0" />
            <span>
              All transactions are conducted through Reserve Bank of India (RBI) Authorized Dealer Category-II licensed banking entities in full compliance with Liberalised Remittance Scheme (LRS) regulations.
            </span>
          </div>
          <a href="#booking" className="font-bold text-[var(--lp-red)] hover:underline shrink-0">
            Compare With Your Bank Quote →
          </a>
        </div>
      </div>
    </section>
  );
};
