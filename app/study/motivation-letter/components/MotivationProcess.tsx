"use client";

import React from 'react';
import { FileText, Send, MessageSquare, Check, ArrowRight } from 'lucide-react';

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
      icon: Check,
      title: "Consular Handover",
      description: "Once you approve the draft, receive your final print-ready PDF and editable Word document—formatted for your CSP online upload and VFS in-person submission."
    }
  ];

  return (
    <section id="section-process" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div data-reveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20 text-[var(--lp-red)] text-xs font-mono uppercase tracking-wider">
            <Check className="w-3.5 h-3.5" />
            <span>Smooth 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
            How It <span className="text-[var(--lp-red)] italic">Works</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal leading-relaxed">
            From initial intake to the final consulate-ready dossier in 4 clear, transparent steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Step pill */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center text-[var(--lp-red)] group-hover:bg-[var(--lp-ink)] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[var(--lp-muted)] font-semibold">
                      STEP {item.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[var(--lp-ink)] group-hover:text-[var(--lp-red)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Progress dot indicator */}
                <div className="mt-6 pt-3 border-t border-[var(--lp-rule)] flex items-center justify-between text-[11px] font-mono text-[var(--lp-muted)]">
                  <span>Phase {idx + 1} of 4</span>
                  {idx < 3 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--lp-muted)] hidden lg:block" />
                  ) : (
                    <span className="text-[var(--lp-gold)] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Complete
                    </span>
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
