"use client";

import React from 'react';
import { Headphones, Scale, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const InsuranceProcess = () => {
  const steps = [
    {
      step: "01",
      icon: Headphones,
      title: "Personalized Consultation",
      description: "We assess your profile (enrolled student, preparatory language learner, or researcher), age, family dependents, and university city to identify the ideal insurance structure."
    },
    {
      step: "02",
      icon: Scale,
      title: "Provider Comparison",
      description: "We compare top statutory Krankenkassen (TK, Barmer, AOK) and private alternatives, explaining differences in dental perks, English digital tools, and local clinic access."
    },
    {
      step: "03",
      icon: FileCheck,
      title: "Application & M10 Handover",
      description: "We help finalize your digital application in minutes, issue your embassy certificate for your visa appointment, and transmit the electronic M10 notification directly to your university."
    }
  ];

  return (
    <section id="section-process" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Effortless Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It <span className="text-germany-red">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            3 simple steps from initial profile evaluation to full consular and university compliance.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="neu-card p-6 bg-white border border-gray-200/80 flex flex-col justify-between relative group hover:shadow-md transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-germany-black font-black group-hover:bg-germany-red group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-black text-gray-400">
                      STEP {item.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-germany-black group-hover:text-germany-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span>Phase {idx + 1} of 3</span>
                  {idx < 2 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 hidden md:block" />
                  ) : (
                    <span className="text-emerald-600 font-black">Visa Ready ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
