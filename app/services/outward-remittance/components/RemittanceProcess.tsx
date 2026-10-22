"use client";
import React from 'react';
import { Headphones, FileText, ArrowRightLeft, Stamp, FileCheck, CheckCircle2 } from 'lucide-react';

export const RemittanceProcess = () => {
  const steps = [
    {
      stepNum: "01",
      icon: Headphones,
      title: "60-Minute Callback & Quote",
      desc: "Submit your request. A senior forex executive calls you within 60 minutes to quote live interbank rates and lock in your transfer amount."
    },
    {
      stepNum: "02",
      icon: FileText,
      title: "Quick Digital KYC & Form A2",
      desc: "Upload a clean copy of your Passport, PAN Card, and German university admission / blocked account payment slip. Form A2 is pre-filled for you."
    },
    {
      stepNum: "03",
      icon: ArrowRightLeft,
      title: "Domestic INR Transfer",
      desc: "Transfer the calculated INR amount using standard domestic NEFT or RTGS to our partner's designated Indian bank account—no branch visit needed."
    },
    {
      stepNum: "04",
      icon: Stamp,
      title: "German IBAN Credit (< 48h)",
      desc: "Your funds are converted and wired directly to your German recipient IBAN (Expatrio, Coracle, Fintiba, or university) with zero middleman deductions."
    },
    {
      stepNum: "05",
      icon: FileCheck,
      title: "Official Confirmation Letter",
      desc: "Receive an official stamped outward remittance confirmation letter and SWIFT MT103 copy, ready for your VFS student visa file."
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Seamless Execution
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            How It Works: 5 Simple Steps to <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Transfer</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-muted)] font-medium">
            From initial callback to official embassy confirmation in less than 48 working hours.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/70 border border-[#e5e0d3] shadow-sm relative flex flex-col justify-between space-y-4 hover:border-[var(--lp-red)]/30 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--lp-red)] uppercase tracking-wider bg-[var(--lp-red)]/10 px-2.5 py-0.5 rounded-full">
                      Step {s.stepNum}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#e5e0d3] text-[var(--lp-text)] flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="lp-serif font-semibold text-[var(--lp-text)] text-base leading-snug">{s.title}</h3>
                  <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f0ede6] flex items-center gap-1.5 text-[11px] font-bold text-[var(--lp-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" />
                  <span>Full Assistance</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
