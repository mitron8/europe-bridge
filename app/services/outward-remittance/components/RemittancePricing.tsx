"use client";
import React from 'react';
import { Tag, ShieldCheck, CheckCircle2, TrendingDown, RefreshCw, FileText } from 'lucide-react';

export const RemittancePricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 bg-amber-50/70 border border-amber-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> 100% Free EuropeBridge Counseling
            </span>
            <h3 className="text-2xl font-black text-germany-black font-display">
              Zero Agency Markup. Institutional Wholesale Forex.
            </h3>
          </div>
          <span className="px-4 py-2 bg-germany-black text-white font-extrabold text-xs rounded-xl w-fit shadow-sm">
            EuropeBridge Consultation: €0 / ₹0
          </span>
        </div>

        <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-3xl">
          Exchange rates vary hourly based on live international currency markets. EuropeBridge adds zero agency markups or hidden fees. All quotes are delivered directly by our RBI-licensed Authorized Dealer Category-II partner with full fee transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500 uppercase">EuropeBridge Charge</span>
            <div className="text-lg font-black text-germany-black">₹0 <span className="text-xs font-normal text-gray-500">(100% Free Guidance)</span></div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Complete Form A2 assistance, KYC validation, rate locking, and confirmation tracking at no extra cost.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Fixed Wire Fee</span>
            <div className="text-lg font-black text-germany-black">₹750 <span className="text-xs font-normal text-gray-500">(Per Outward Transfer)</span></div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Covers official SWIFT MT103 transmission, regulatory reporting, and official stamped confirmation issuance.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> RBI TCS Guidelines
            </span>
            <div className="text-lg font-black text-emerald-800">0.5% or 5%</div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              0.5% on education loan remittances (5% on self-funded) only on amounts exceeding ₹7 Lakhs. 100% refundable on ITR.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Rate Lock Guarantee:</strong> Once your transfer quote is confirmed during the 60-minute callback, your exchange rate is locked to protect you against sudden currency market spikes.
            </span>
          </div>
          <a href="#booking" className="font-extrabold text-germany-red hover:underline shrink-0">
            Request Locked Rate Quote →
          </a>
        </div>
      </div>
    </section>
  );
};
