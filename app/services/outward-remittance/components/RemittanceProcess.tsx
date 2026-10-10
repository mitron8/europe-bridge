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
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Seamless Execution</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works: 5 Simple Steps to Transfer
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From initial callback to official embassy confirmation in less than 48 working hours.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border-2 border-gray-200 shadow-sm relative flex flex-col justify-between space-y-4 hover:border-germany-red/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-germany-red uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                      Step {s.stepNum}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-germany-black text-base leading-snug">{s.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center gap-1 text-[11px] font-bold text-gray-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span>Full Tracking</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
