"use client";
import React from 'react';
import { Tag, ShieldCheck, CheckCircle2, RefreshCw, HeartHandshake, Plane } from 'lucide-react';

export const HealthInsurancePricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 bg-amber-50/70 border border-amber-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> 100% Free EuropeBridge Assistance
            </span>
            <h3 className="text-2xl font-black text-germany-black font-display">
              Zero Agency Charges. Direct Statutory Premiums.
            </h3>
          </div>
          <span className="px-4 py-2 bg-germany-black text-white font-extrabold text-xs rounded-xl w-fit shadow-sm">
            EuropeBridge Setup: €0 / ₹0
          </span>
        </div>

        <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-3xl">
          Insurance premiums are legally determined by German healthcare statutes, not by intermediaries. EuropeBridge charges students zero fees for provider comparisons, document filing, and university M10 notifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500 uppercase">EuropeBridge Service</span>
            <div className="text-lg font-black text-germany-black">€0 <span className="text-xs font-normal text-gray-500">(100% Free)</span></div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Complete consultation, provider selection, and digital university M10 dispatch with no hidden agent fees.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Statutory Student Rate</span>
            <div className="text-lg font-black text-germany-black">~€140 – €150 <span className="text-xs font-normal text-gray-500">/mo</span></div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Legally fixed flat monthly contribution (health + long-term care insurance), deducted automatically only after you land.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-amber-200 space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-emerald-700" /> Incoming Travel Insurance
            </span>
            <div className="text-lg font-black text-emerald-800">FREE <span className="text-xs font-normal text-gray-500">(Up to 180 Days)</span></div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Complimentary travel health coverage bridging your arrival flight until your official university semester start date.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Blocked Account Perk:</strong> Setting up your health insurance alongside your German blocked account earns you up to <strong>€247 in welcome cashback</strong>!
            </span>
          </div>
          <a href="/services/blocked-account" className="font-extrabold text-germany-red hover:underline shrink-0">
            View Blocked Account Bundle →
          </a>
        </div>
      </div>
    </section>
  );
};
