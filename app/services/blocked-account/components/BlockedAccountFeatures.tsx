"use client";
import React from 'react';
import { Briefcase, Banknote, CreditCard, Stamp, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';

export const BlockedAccountFeatures = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Mandatory Visa Requirement",
      desc: "A blocked account serves as official proof of financial resources accepted by German embassies, consulates, and local Ausländerbehörde immigration offices worldwide."
    },
    {
      icon: Banknote,
      title: "Required Annual Amount",
      desc: "The German government mandates €11,904 for 12 months (€992 per month) to demonstrate your capability to self-support during your studies."
    },
    {
      icon: CreditCard,
      title: "Automated Monthly Disbursements",
      desc: "Your deposited funds are held securely and disbursed to your personal German bank account in automatic monthly installments of €992 once you arrive."
    },
    {
      icon: Stamp,
      title: "24-Hour Blocking Confirmation",
      desc: "Receive your official Sperrbescheinigung PDF document within 24 hours of funding to present at your embassy visa appointment."
    },
    {
      icon: ShieldCheck,
      title: "Bank-Grade German Security",
      desc: "Your money is held in a licensed German bank backed by the statutory German Deposit Protection Scheme (Einlagensicherung) up to €100,000 per student."
    },
    {
      icon: Building2,
      title: "Local Girokonto Setup",
      desc: "Get full support opening your local German current account (e.g. N26, DKB, Sparkasse) to receive your monthly payouts upon arrival."
    }
  ];

  return (
    <section id="features" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Included Benefits</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge Blocked Account
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need for a fast, compliant, and stress-free visa approval process.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Embassy &amp; VFS Compliant</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
