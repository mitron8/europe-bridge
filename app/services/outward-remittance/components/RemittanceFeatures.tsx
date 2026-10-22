"use client";
import React from 'react';
import { Clock, Banknote, ShieldCheck, Building2, FileCheck, Headphones, CheckCircle2 } from 'lucide-react';

export const RemittanceFeatures = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Transfer Speed (< 48h)",
      desc: "Funds transfer via our licensed forex network usually takes less than 48 hours, arriving comfortably ahead of your visa appointment and tuition deadlines."
    },
    {
      icon: Banknote,
      title: "Transparent Wholesale Rates",
      desc: "Exchange rates update with live interbank benchmarks. Our partners provide razor-thin spreads without hidden conversion markups or surprise deductions."
    },
    {
      icon: ShieldCheck,
      title: "Safer Than Traditional Bank Wire",
      desc: "You stay in direct touch with a dedicated senior forex executive who monitors your transfer until the funds credit your German IBAN, ensuring zero lost money."
    },
    {
      icon: Building2,
      title: "Convenient Domestic Bank Deposit",
      desc: "Transfer the requisite INR amount via standard domestic NEFT/RTGS to a designated Indian bank account, eliminating complex foreign exchange paperwork."
    },
    {
      icon: FileCheck,
      title: "Official Confirmation Letter",
      desc: "Receive an official outward remittance confirmation letter within 48 working hours, fully accepted by the German Embassy, VFS, and universities."
    },
    {
      icon: Headphones,
      title: "Quick 60-Minute Callback",
      desc: "A dedicated EuropeBridge counselor calls you within 60 minutes (working hours) with an upfront quote, Form A2 assistance, and direct account details."
    }
  ];

  return (
    <section id="features" className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Included Benefits
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            What You Get With EuropeBridge <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Remittance</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-muted)] font-medium">
            A secure, stress-free money transfer experience tailored specifically for students moving to Germany.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white/70 border border-[#e5e0d3] hover:border-[var(--lp-red)]/30 hover:shadow-[0_16px_36px_rgba(22,22,26,0.05)] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="lp-serif font-semibold text-[var(--lp-text)] text-lg">{feat.title}</h3>
                  <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0ede6] flex items-center gap-1.5 text-[11px] font-bold text-[var(--lp-gold)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-gold)]" />
                  <span>Embassy &amp; VFS Recognized</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
