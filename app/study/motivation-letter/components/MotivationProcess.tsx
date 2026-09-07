"use client";

import React from 'react';
import { FileText, Send, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const MotivationProcess = () => {
  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Place the Order & Intake",
      description: "Select your speed (Standard or Express), complete secure payment, and fill out our quick intake form with your German admission letter, CV, and target consulate."
    },
    {
      step: "02",
      icon: Send,
      title: "First Draft Delivery",
      description: "Our German visa drafting team crafts your bespoke LOM from scratch. You receive a private Google Doc link within 3 working days (Standard) or 1 working day (Express)."
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Two Review Rounds",
      description: "Collaborate via inline Google Doc comments. Round 1 incorporates any structural adjustments; Round 2 provides fine linguistic polish and tone perfection."
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Consular Handover",
      description: "Once you approve the draft, receive your final print-ready PDF and editable Word document—formatted for your CSP online upload and VFS in-person submission."
    }
  ];

  return (
    <section id="section-process" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Smooth 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It <span className="text-germany-red">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            From initial intake to the final consulate-ready dossier in 4 clear, transparent steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="neu-card p-6 bg-white border border-gray-200/80 flex flex-col justify-between relative group hover:shadow-md transition-all"
              >
                {/* Step pill */}
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

                {/* Progress dot indicator */}
                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span>Phase {idx + 1} of 4</span>
                  {idx < 3 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 hidden lg:block" />
                  ) : (
                    <span className="text-emerald-600 font-black">Complete ✓</span>
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
