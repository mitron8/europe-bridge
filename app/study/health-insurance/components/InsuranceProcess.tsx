"use client";

import React from 'react';
import { Headphones, Scale, FileCheck, ArrowRight, Check } from 'lucide-react';

export const InsuranceProcess = () => {
  const steps = [
    {
      step: "01",
      icon: Headphones,
      title: "Profile Assessment",
      description: "We assess your degree level, age, family dependents, and university city to identify the legally optimal insurance structure."
    },
    {
      step: "02",
      icon: Scale,
      title: "Provider Comparison",
      description: "We compare statutory Krankenkassen (TK, Barmer, AOK) and private alternatives, explaining dental subsidies and English digital tools."
    },
    {
      step: "03",
      icon: FileCheck,
      title: "M10 & Embassy Certificate",
      description: "We finalize your application, provide your visa certificate, and transmit the electronic M10 notification directly to your university."
    }
  ];

  return (
    <section id="section-process" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Effortless Activation
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          How Setup <em className="lp-script text-[var(--lp-red)]">Works</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Three simple steps from initial evaluation to full consular and university compliance.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-[var(--lp-gold)]">
                    STEP {item.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center justify-between text-[11px] font-mono text-[var(--lp-muted)]">
                <span>Phase {idx + 1} of 3</span>
                {idx < 2 ? (
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--lp-muted)]" />
                ) : (
                  <span className="text-[var(--lp-gold)]">Visa Ready ✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
