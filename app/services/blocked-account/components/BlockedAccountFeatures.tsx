"use client";
import React from 'react';
import { Briefcase, Banknote, CreditCard, Stamp, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';

export const BlockedAccountFeatures = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Mandatory § 16b Visa Proof",
      desc: "A German blocked account serves as official statutory proof of subsistence funds (*Finanzierungsnachweis*) accepted by German embassies, consulates, and Ausländerbehörde immigration offices worldwide."
    },
    {
      icon: Banknote,
      title: "2026/2027 Statutory Amount (€11,904)",
      desc: "Federal Foreign Office mandates €11,904 for 12 months (€992 per month) to demonstrate independent self-sufficiency during your Master's or Bachelor's studies."
    },
    {
      icon: Stamp,
      title: "24-Hour Digital Confirmation PDF",
      desc: "Receive your official blocking confirmation (*Sperrbestätigung*) document with cryptographic digital verification within 24 hours of funding to present at your VFS visa appointment."
    },
    {
      icon: CreditCard,
      title: "Automated Monthly Disbursements",
      desc: "Your deposited funds are held securely under your own name and disbursed automatically in installments of €992/month to your local German checking account upon arrival."
    },
    {
      icon: ShieldCheck,
      title: "German Deposit Protection (€100,000)",
      desc: "Your funds are held in licensed German banks backed by the statutory German Deposit Protection Scheme (*Gesetzliche Einlagensicherung*) safeguarding up to €100,000 per student."
    },
    {
      icon: Building2,
      title: "Free German Girokonto & Visa Debit",
      desc: "Get automated assistance opening your local German checking account (e.g. N26, DKB, Sparkasse) with a contactless Visa/Mastercard debit card for daily living and rent payments."
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
            What You Get With EuropeBridge <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Blocked Account</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-text-muted)] font-medium">
            Everything you need for a fast, compliant, and stress-free visa approval and German arrival process.
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

