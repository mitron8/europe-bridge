"use client";
import React, { useState } from 'react';
import { Check, X, ShieldCheck, Award, Zap, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlockedAccountProviders = () => {
  const [selectedProvider, setSelectedProvider] = useState<'expatrio' | 'coracle' | 'fintiba'>('expatrio');

  const providers = [
    {
      id: 'expatrio',
      name: 'Expatrio',
      badge: 'Most Popular for Indians',
      badgeColor: 'bg-red-100 text-germany-red border-red-200',
      setupFee: '€49 (Waived with Value Package)',
      monthlyFee: '€5.00 / month',
      buffer: '€100 (Refundable)',
      partnerBank: 'Aion Bank (European Banking License)',
      confirmationSpeed: 'Instant to 24 Hours',
      freeGirokonto: 'Free Aion Bank Checking Account + Debit Card',
      healthCashback: 'Up to €247 Cashback (Free TK Health Insurance + Free Travel Insurance)',
      visaRefund: '100% Guaranteed Refund with Embassy Letter',
      pros: ['Zero setup fee with Value Package', 'Highest cashback bonus', 'Super intuitive mobile app'],
      cons: ['€5/mo maintenance fee without bundle']
    },
    {
      id: 'coracle',
      name: 'Coracle',
      badge: 'Zero Monthly Maintenance',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      setupFee: '€59 (Prime Package)',
      monthlyFee: '€0 (No Monthly Fees!)',
      buffer: '€80 (Refundable)',
      partnerBank: 'BaFin-Supervised German Banks',
      confirmationSpeed: 'Within 2 to 24 Hours',
      freeGirokonto: 'Partner Girokonto Assistance',
      healthCashback: 'Free Incoming Travel Insurance + TK/Barmer Integration',
      visaRefund: '100% Refund (Excluding €40 admin fee)',
      pros: ['No monthly maintenance fee (€0/mo)', 'Simpler fee structure', 'Fast verification'],
      cons: ['Slightly lower cashback than Expatrio']
    },
    {
      id: 'fintiba',
      name: 'Fintiba',
      badge: 'Pioneer & Traditional',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      setupFee: '€89 (Fintiba Plus)',
      monthlyFee: '€4.90 / month',
      buffer: '€100 (Refundable)',
      partnerBank: 'Sutor Bank (Hamburg, Germany)',
      confirmationSpeed: '24 to 48 Hours',
      freeGirokonto: 'Fintiba Plus Partner Account',
      healthCashback: 'Free DAK-Gesundheit or Barmer Bundle',
      visaRefund: '100% Refund on Visa Rejection',
      pros: ['Oldest digital blocked account provider', 'Backed by traditional Sutor Bank in Hamburg'],
      cons: ['Higher initial setup fee (€89)', 'Slightly slower verification on peak intake']
    }
  ];

  return (
    <section id="providers" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Unbiased Provider Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Compare Official BaFin-Approved Providers
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            EuropeBridge does not charge students any consultation markup. We help you choose the best provider tailored to your intake timeline and university city.
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {providers.map((p) => {
            const isSelected = selectedProvider === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p.id as any)}
                className={`p-6 sm:p-7 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'border-germany-red bg-gradient-to-b from-white to-red-50/20 shadow-lg ring-2 ring-germany-red/20'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                      <h3 className="text-2xl font-black text-germany-black mt-2 font-display">{p.name}</h3>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Core Metrics Table */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Account Setup Fee:</span>
                      <span className="font-bold text-germany-black text-right">{p.setupFee}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Monthly Maintenance:</span>
                      <span className="font-bold text-germany-black text-right">{p.monthlyFee}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Confirmation Speed:</span>
                      <span className="font-extrabold text-emerald-700 text-right">{p.confirmationSpeed}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Partner Bank:</span>
                      <span className="font-medium text-gray-700 text-right text-[11px] max-w-[170px]">{p.partnerBank}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Health Bundle Cashback:</span>
                      <span className="font-black text-germany-red text-right text-[11px] max-w-[170px]">{p.healthCashback}</span>
                    </div>
                  </div>

                  {/* Pros Bullets */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Key Advantages:</span>
                    {p.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <a
                  href="#booking"
                  className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'neu-btn-primary shadow-sm'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span>Select {p.name} with EuropeBridge Assistance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* BaFin Regulatory Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              All listed providers comply with Section 16b of the German Residence Act (*Aufenthaltsgesetz*) and operate in compliance with BaFin (*Bundesanstalt für Finanzdienstleistungsaufsicht*) statutory rules.
            </span>
          </div>
          <a href="#booking" className="font-extrabold text-germany-red hover:underline shrink-0">
            Need help choosing? Ask an Advisor →
          </a>
        </div>
      </div>
    </section>
  );
};
