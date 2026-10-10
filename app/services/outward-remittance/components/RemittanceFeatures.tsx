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
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Included Benefits</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge Remittance
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A secure, stress-free money transfer experience tailored specifically for students moving to Germany.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Embassy &amp; Bank Approved</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
