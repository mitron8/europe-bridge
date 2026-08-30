"use client";
import React from 'react';
import { Tag, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

export const BlockedAccountPricing = () => {
  return (
    <section className="py-8 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 bg-amber-50/70 border border-amber-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> Transparent Pricing Structure
            </span>
            <h3 className="text-2xl font-black text-germany-black font-display">
              No Surprise Fees. Everything Upfront.
            </h3>
          </div>
          <span className="px-4 py-2 bg-germany-black text-white font-extrabold text-xs rounded-xl w-fit">
            Zero Hidden Agency Charges
          </span>
        </div>

        <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-3xl">
          Account set-up and mandatory administrative banking fees are bundled directly into the initial transfer. EuropeBridge provides free counselor assistance to guide you through bank selection, money transfer, and document verification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Standard Setup Fee</span>
            <div className="text-lg font-black text-germany-black">€49 – €89 <span className="text-xs font-normal text-gray-500">(one-time)</span></div>
            <p className="text-[11px] text-gray-500 font-medium">Covers account opening &amp; 24h Sperrbescheinigung issuing.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Monthly Maintenance</span>
            <div className="text-lg font-black text-germany-black">€4.90 <span className="text-xs font-normal text-gray-500">/mo</span></div>
            <p className="text-[11px] text-gray-500 font-medium">Official German banking service fee during active period.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1">
            <span className="text-[11px] font-bold text-green-800 uppercase">Visa Protection</span>
            <div className="text-lg font-black text-green-800">100% Refundable</div>
            <p className="text-[11px] text-gray-500 font-medium">Full refund of your blocked amount if visa is declined.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
