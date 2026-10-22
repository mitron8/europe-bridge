"use client";
import React, { useState } from 'react';
import { Check, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export const BlockedAccountProviders = () => {
  const [selectedProvider, setSelectedProvider] = useState<'expatrio' | 'coracle' | 'fintiba'>('expatrio');

  const providers = [
    {
      id: 'expatrio',
      name: 'Expatrio',
      badge: 'Most Popular for Indians',
      badgeColor: 'bg-[var(--lp-red)]/10 text-[var(--lp-red)] border-[var(--lp-red)]/20',
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
      badgeColor: 'bg-[#ece7dd] text-[var(--lp-text)] border-[#e2ddd3]',
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
      badgeColor: 'bg-white text-[var(--lp-muted)] border-[#e5e0d3]',
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
    <section id="providers" className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Unbiased Provider Comparison
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Compare Official <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">BaFin-Approved Providers</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-muted)] font-medium">
            EuropeBridge does not charge students any consultation markup. We help you choose the best provider tailored to your intake timeline and university city.
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {providers.map((p) => {
            const isSelected = selectedProvider === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p.id as any)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'border-[var(--lp-red)] bg-white shadow-[0_16px_40px_rgba(22,22,26,0.08)] ring-2 ring-[var(--lp-red)]/15'
                    : 'border-[#e5e0d3] bg-white/70 hover:border-[#cfc8b8] shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                      <h3 className="lp-serif text-2xl font-semibold text-[var(--lp-text)] mt-2">{p.name}</h3>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[var(--lp-red)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Core Metrics Table */}
                  <div className="space-y-2.5 pt-2 border-t border-[#f0ede6] text-xs">
                    <div className="flex justify-between py-1 border-b border-[#f0ede6]">
                      <span className="text-[var(--lp-muted)] font-medium">Account Setup Fee:</span>
                      <span className="font-bold text-[var(--lp-text)] text-right">{p.setupFee}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#f0ede6]">
                      <span className="text-[var(--lp-muted)] font-medium">Monthly Maintenance:</span>
                      <span className="font-bold text-[var(--lp-text)] text-right">{p.monthlyFee}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#f0ede6]">
                      <span className="text-[var(--lp-muted)] font-medium">Confirmation Speed:</span>
                      <span className="font-bold text-[var(--lp-text)] text-right">{p.confirmationSpeed}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#f0ede6]">
                      <span className="text-[var(--lp-muted)] font-medium">Partner Bank:</span>
                      <span className="font-medium text-[var(--lp-text)] text-right text-[11px] max-w-[170px]">{p.partnerBank}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#f0ede6]">
                      <span className="text-[var(--lp-muted)] font-medium">Health Bundle Cashback:</span>
                      <span className="font-bold text-[var(--lp-red)] text-right text-[11px] max-w-[170px]">{p.healthCashback}</span>
                    </div>
                  </div>

                  {/* Pros Bullets */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-[var(--lp-muted)] tracking-wider">Key Advantages:</span>
                    {p.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-[var(--lp-text)]">
                        <Check className="w-3.5 h-3.5 text-[var(--lp-red)] shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <a
                  href="#booking"
                  className={`w-full py-3 rounded-2xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'lp-btn lp-btn--red'
                      : 'lp-btn lp-btn--ghost-dark'
                  }`}
                >
                  <span>Select {p.name} with EuropeBridge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* BaFin Regulatory Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--lp-muted)] font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--lp-gold)] shrink-0" />
            <span>
              All listed providers comply with Section 16b of the German Residence Act (*Aufenthaltsgesetz*) and operate in compliance with BaFin statutory rules.
            </span>
          </div>
          <a href="#booking" className="font-bold text-[var(--lp-red)] hover:underline shrink-0">
            Need help choosing? Ask an Advisor →
          </a>
        </div>
      </div>
    </section>
  );
};

