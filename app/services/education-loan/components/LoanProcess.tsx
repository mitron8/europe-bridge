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
    <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Application Workflow</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            3 simple steps from initial phone assessment to loan sanction letter.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border-2 border-gray-200 shadow-sm relative flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-germany-red uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
                      {s.stepNum}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-germany-black text-xl">{s.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span>Guaranteed Guidance</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
