"use client";
import React from 'react';
import { Tag, RefreshCw, FileText } from 'lucide-react';

export const RemittancePricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> 100% Free EuropeBridge Counseling
            </span>
            <h3 className="lp-serif text-2xl sm:text-3xl font-semibold text-[var(--lp-text)]">
              Zero Agency Markup. Institutional Wholesale Forex.
            </h3>
          </div>
          <span className="px-4 py-2 bg-[#16161a] text-white font-bold text-xs rounded-xl w-fit shadow-sm">
            EuropeBridge Consultation: €0 / ₹0
          </span>
        </div>

        <p className="text-[15px] text-[var(--lp-muted)] font-medium leading-relaxed max-w-3xl">
          Exchange rates vary hourly based on live international currency markets. EuropeBridge adds zero agency markups or hidden fees. All quotes are delivered directly by our RBI-licensed Authorized Dealer Category-II partner with full fee transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">EuropeBridge Charge</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">₹0 <span className="text-xs font-normal text-[var(--lp-muted)]">(100% Free Guidance)</span></div>
            <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
              Complete Form A2 assistance, KYC validation, rate locking, and confirmation tracking at no extra cost.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-muted)] uppercase">Fixed Wire Fee</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">₹750 <span className="text-xs font-normal text-[var(--lp-muted)]">(Per Outward Transfer)</span></div>
            <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
              Covers official SWIFT MT103 transmission, regulatory reporting, and official stamped confirmation issuance.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-red)] uppercase flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> RBI TCS Guidelines
            </span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">0.5% or 5%</div>
            <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
              0.5% on education loan remittances (5% on self-funded) only on amounts exceeding ₹7 Lakhs. 100% refundable on ITR.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--lp-muted)] font-medium">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
            <span>
              <strong>Rate Lock Guarantee:</strong> Once your transfer quote is confirmed during the 60-minute callback, your exchange rate is locked to protect you against sudden currency market spikes.
            </span>
          </div>
          <a href="#booking" className="font-bold text-[var(--lp-red)] hover:underline shrink-0">
            Lock Today&apos;s Rate →
          </a>
        </div>
      </div>
    </section>
  );
};
