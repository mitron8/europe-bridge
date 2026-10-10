"use client";
import React from 'react';
import { Check, X, ShieldCheck, Award, Zap, ArrowRight } from 'lucide-react';

export const RemittanceComparison = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Bank Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            EuropeBridge vs. Traditional Retail Banks
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            See why thousands of Indian students choose our dedicated student forex channel over physical bank branches.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 text-xs font-black uppercase text-gray-500">Feature</th>
                <th className="py-4 px-4 text-xs font-black uppercase text-germany-red bg-red-50/60 rounded-t-2xl">
                  EuropeBridge Forex Network
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase text-gray-500">Traditional Retail Banks</th>
                <th className="py-4 px-4 text-xs font-black uppercase text-gray-500">General Online Gateways</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Exchange Rate Margin</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">Near-Interbank (0.2%–0.5%)</td>
                <td className="py-4 px-4 font-medium text-gray-600">High Markup (2.5%–4.0%)</td>
                <td className="py-4 px-4 font-medium text-gray-600">Moderate Markup (1.5%–2.5%)</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Intermediary Bank Deduction</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">€0 Guaranteed Full Credit</td>
                <td className="py-4 px-4 font-medium text-gray-600">Unpredictable ($20–$35 Cut)</td>
                <td className="py-4 px-4 font-medium text-gray-600">Often Deducted</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Transfer Confirmation Speed</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">&lt; 48 Working Hours</td>
                <td className="py-4 px-4 font-medium text-gray-600">3 to 7 Working Days</td>
                <td className="py-4 px-4 font-medium text-gray-600">2 to 4 Working Days</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Deposit Method</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">Domestic NEFT/RTGS in INR</td>
                <td className="py-4 px-4 font-medium text-gray-600">Physical Branch Visit Required</td>
                <td className="py-4 px-4 font-medium text-gray-600">Debit Card / Netbanking</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Form A2 &amp; TCS Paperwork</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">100% Assisted &amp; Verified</td>
                <td className="py-4 px-4 font-medium text-gray-600">Self-Filing &amp; Prone to Rejection</td>
                <td className="py-4 px-4 font-medium text-gray-600">Automated Bot Validation</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-gray-800">Dedicated Counselor Support</td>
                <td className="py-4 px-4 font-black text-emerald-700 bg-red-50/30">60-Min Callback &amp; WhatsApp</td>
                <td className="py-4 px-4 font-medium text-gray-600">Call Center Queues</td>
                <td className="py-4 px-4 font-medium text-gray-600">Automated AI Chat Only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900 font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              On an €11,904 blocked account transfer, students typically save between <strong>₹25,000 and ₹35,000</strong> compared to leading private banks in India!
            </span>
          </div>
          <a href="#booking" className="neu-btn-primary px-4 py-2 text-xs font-black shrink-0 whitespace-nowrap">
            Claim Wholesale Rate →
          </a>
        </div>
      </div>
    </section>
  );
};
