"use client";
import React from 'react';
import { Tag, ShieldCheck, CheckCircle2, RefreshCw, HeartHandshake, Plane } from 'lucide-react';

export const HealthInsurancePricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="p-6 sm:p-10 bg-[#faf8f3] rounded-3xl border border-[#e5e0d3] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16161a] flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> 100% Free EuropeBridge Assistance
            </span>
            <h3 className="text-2xl font-black text-[#16161a] font-display">
              Zero Agency Charges. Direct Statutory Premiums.
            </h3>
          </div>
          <span className="px-4 py-2 bg-[#16161a] text-white font-bold text-xs rounded-xl w-fit shadow-xs">
            EuropeBridge Setup: €0 / ₹0
          </span>
        </div>

        <p className="text-sm text-[#5e5b54] font-medium leading-relaxed max-w-3xl">
          Insurance premiums are legally determined by German healthcare statutes, not by intermediaries. EuropeBridge charges students zero fees for provider comparisons, document filing, and university M10 notifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-xs">
            <span className="text-[11px] font-bold text-[#5e5b54] uppercase">EuropeBridge Service</span>
            <div className="text-lg font-black text-[#16161a]">€0 <span className="text-xs font-normal text-[#787369]">(100% Free)</span></div>
            <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
              Complete consultation, provider selection, and digital university M10 dispatch with no hidden agent fees.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-xs">
            <span className="text-[11px] font-bold text-[#5e5b54] uppercase">Statutory Student Rate</span>
            <div className="text-lg font-black text-[#16161a]">~€140 – €150 <span className="text-xs font-normal text-[#787369]">/mo</span></div>
            <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
              Legally fixed flat monthly contribution (health + long-term care insurance), deducted automatically only after you land.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-xs">
            <span className="text-[11px] font-bold text-[#16161a] uppercase flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-[#16161a]" /> Incoming Travel Insurance
            </span>
            <div className="text-lg font-black text-[#16161a]">FREE <span className="text-xs font-normal text-[#787369]">(Up to 180 Days)</span></div>
            <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
              Complimentary travel health coverage bridging your arrival flight until your official university semester start date.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5e0d3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5e5b54] font-medium">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#16161a] shrink-0" />
            <span>
              <strong>Blocked Account Perk:</strong> Setting up your health insurance alongside your German blocked account earns you up to <strong>€247 in welcome cashback</strong>!
            </span>
          </div>
          <a href="/services/blocked-account" className="font-bold text-[#b4232f] hover:underline shrink-0">
            View Blocked Account Bundle →
          </a>
        </div>
      </div>
    </section>
  );
};
