"use client";
import React from 'react';
import { Headphones, FileCheck, Banknote, ArrowRight } from 'lucide-react';

export const LoanProcess = () => {
  const steps = [
    {
      stepNum: "Step 01",
      icon: Headphones,
      title: "Talk to Executive",
      desc: "Submit your request below. A senior education loan specialist will call you back within 60 minutes (during working hours) to assess your profile and loan eligibility."
    },
    {
      stepNum: "Step 02",
      icon: FileCheck,
      title: "Doorstep Document Pickup",
      desc: "After eligibility verification, a representative visits your home to collect application forms, academic marksheets, admission letters, and co-applicant income proofs."
    },
    {
      stepNum: "Step 03",
      icon: Banknote,
      title: "Fast Sanction & Disbursement",
      desc: "Receive your official in-principle sanction letter in 7 to 10 working days. Funds are disbursed to your account or blocked account provider right before your visa appointment."
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">Application Workflow</span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          How the Loan Process <em className="lp-script text-[var(--lp-red)]">Works</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          3 simple steps from initial phone assessment to official loan sanction letter.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={idx}
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-[0_4px_24px_rgba(22,22,26,0.03)] hover:shadow-[0_8px_30px_rgba(22,22,26,0.06)] hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[var(--lp-red)] uppercase tracking-wider bg-[var(--lp-red)]/10 px-3 py-1 rounded-full border border-[var(--lp-red)]/20">
                    {s.stepNum}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold border border-[#e2ddd3]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">{s.title}</h3>
                <p className="text-xs sm:text-[13px] text-[var(--lp-muted)] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center gap-1.5 text-xs font-semibold text-[var(--lp-gold)]">
                <span>Guaranteed Counselor Guidance</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
