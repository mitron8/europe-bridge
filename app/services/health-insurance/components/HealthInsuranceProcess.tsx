"use client";
import React from 'react';
import { Headphones, Scale, FileCheck, Landmark, CreditCard, CheckCircle2 } from 'lucide-react';

export const HealthInsuranceProcess = () => {
  const steps = [
    {
      stepNum: "01",
      icon: Headphones,
      title: "60-Minute Advisor Callback",
      desc: "Submit your request. A senior EuropeBridge healthcare advisor calls you within 60 minutes to review your age, admission status, and campus city."
    },
    {
      stepNum: "02",
      icon: Scale,
      title: "Provider & Plan Selection",
      desc: "We recommend the optimal Krankenkasse (TK, Barmer, AOK) or private expat policy, ensuring your monthly rate is minimized."
    },
    {
      stepNum: "03",
      icon: FileCheck,
      title: "Digital Form & Travel Cover",
      desc: "Complete your online application in under 10 minutes. Receive your official visa insurance certificate plus complimentary incoming travel cover immediately."
    },
    {
      stepNum: "04",
      icon: Landmark,
      title: "Electronic M10 to University",
      desc: "The insurer sends the official electronic M10 notification directly to your university's admissions department to clear your matriculation hold."
    },
    {
      stepNum: "05",
      icon: CreditCard,
      title: "Smart Health Card in Germany",
      desc: "After landing in Germany and completing city registration (Anmeldung), your electronic German health smart card (eGK) arrives at your postal address."
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Step-by-Step Roadmap</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works: From Application to Doctor Visit
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A fast, completely digital onboarding workflow designed to meet university enrollment deadlines without paperwork delays.
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
                  <span>Free Setup</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
