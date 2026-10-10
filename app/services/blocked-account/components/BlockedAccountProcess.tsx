"use client";
import React from 'react';
import { Headphones, FileText, ArrowRightLeft, Stamp, PlaneLanding, CheckCircle2 } from 'lucide-react';

export const BlockedAccountProcess = () => {
  const steps = [
    {
      stepNum: "01",
      icon: Headphones,
      title: "60-Minute Advisor Callback",
      desc: "Submit your request below. A senior EuropeBridge finance counselor calls you within 60 minutes (working hours) to explain provider differences and optimal setup options."
    },
    {
      stepNum: "02",
      icon: FileText,
      title: "10-Minute Digital Registration",
      desc: "Upload a clean scan of your valid passport and university admission letter (or conditional offer/language course contract). Account is opened digitally within minutes."
    },
    {
      stepNum: "03",
      icon: ArrowRightLeft,
      title: "Best-Forex Fund Transfer",
      desc: "Transfer funds from India using domestic INR bank transfers or international SWIFT wire with verified zero-markup exchange rate guidance to save up to ₹25,000 on forex."
    },
    {
      stepNum: "04",
      icon: Stamp,
      title: "24-Hour Blocking Confirmation",
      desc: "Once your funds hit your German blocked IBAN, your official Sperrbestätigung PDF is generated within 24 hours—stamped and ready for your VFS visa interview!"
    },
    {
      stepNum: "05",
      icon: PlaneLanding,
      title: "Landing in Germany & Payouts",
      desc: "After arrival, complete your city address registration (Anmeldung). Your blocked account automatically unlocks, transferring €992/month directly to your German debit card."
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">End-to-End Roadmap</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works: From Application to Arrival
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A seamless journey designed to eliminate delays and ensure your funds are ready ahead of your visa appointment.
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
