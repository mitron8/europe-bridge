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
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            End-to-End Roadmap
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            How It Works: From Application to <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Arrival</em>
          </h2>
          <p className="text-[15px] text-[var(--lp-text-muted)] font-medium">
            A seamless journey designed to eliminate delays and ensure your funds are ready ahead of your visa appointment.
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

