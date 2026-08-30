"use client";
import React from 'react';
import { Headphones, FileText, Stamp, CheckCircle2, ArrowRight } from 'lucide-react';

export const BlockedAccountProcess = () => {
  const steps = [
    {
      stepNum: "Step 01",
      icon: Headphones,
      title: "Talk to Senior Executive",
      desc: "Fill out the service request form below. You will receive an immediate call back from a dedicated EuropeBridge finance advisor within 60 minutes (during working hours)."
    },
    {
      stepNum: "Step 02",
      icon: FileText,
      title: "Submit Documents Online",
      desc: "Submit your passport scan and university admission letter through our secure digital onboarding portal. We verify your details for instant bank approval."
    },
    {
      stepNum: "Step 03",
      icon: Stamp,
      title: "Receive Blocking Confirmation",
      desc: "Once your funds are transferred, your official Sperrbescheinigung (blocking confirmation document) is generated within 24 hours—ready for your visa interview!"
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Simple 3-Step Process</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            From initial application to receiving your official embassy confirmation in 24 hours.
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
                  <span>Fast Onboarding</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
