"use client";

import React from 'react';
import { Clock, Calendar, ArrowRight, Building, Plane } from 'lucide-react';
import Link from 'next/link';

export const VisaProcessTimeline = () => {
  const steps = [
    {
      step: 1,
      duration: "1–2 Days",
      title: "Profile Audit & Setup",
      desc: "Audit university admission letter, verify APS certificate authenticity, and review blocked account readiness.",
      status: "Start"
    },
    {
      step: 2,
      duration: "3–5 Days",
      title: "CSP Portal & VIDEX",
      desc: "Complete CSP entry form, generate machine-readable VIDEX barcode document, format PDFs, and perform digital upload.",
      status: "Digital Filing"
    },
    {
      step: 3,
      duration: "1–2 Weeks",
      title: "VFS Slot & Biometrics",
      desc: "Slot booking at VFS Global, document submission, biometric scan, and physical passport handover at the visa centre.",
      status: "In-Person"
    },
    {
      step: 4,
      duration: "4–6 Weeks",
      title: "Embassy Processing",
      desc: "German Consulate evaluates dossier and transmits data electronically to the local Ausländerbehörde in your city.",
      status: "Consular Review"
    },
    {
      step: 5,
      duration: "2–4 Days",
      title: "Passport Stamping",
      desc: "Receive your National Visa (Type D) sticker valid for 3 to 6 months, allowing official entry into Germany.",
      status: "Final Approval"
    }
  ];

  return (
    <section id="section-timeline" className="scroll-mt-32 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Process Roadmap
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          How the Visa Timeline <em className="italic text-[var(--lp-red)] font-serif">Really Works</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Understanding embassy turnaround times prevents missed university orientation dates. Here is the realistic schedule.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((item, idx) => (
          <div 
            key={idx}
            className="bg-[#faf8f3] rounded-2xl p-5 border border-[#e5e0d3] space-y-3 relative flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-[var(--lp-ink)] text-white font-mono text-xs flex items-center justify-center">
                  {item.step}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20">
                  {item.duration}
                </span>
              </div>
              <h3 className="font-serif text-base font-normal text-[var(--lp-ink)] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-[#e5e0d3] flex items-center justify-between text-[10px] font-mono uppercase text-[var(--lp-muted)]">
              <span>Phase {idx + 1}</span>
              <span className="text-[var(--lp-gold)]">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Banner */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h4 className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--lp-red)]" />
            <span>When Should You Apply?</span>
          </h4>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
            Apply as soon as you have your university admission letter and APS certificate. You can submit your visa application up to 3 months prior to your planned travel date.
          </p>
        </div>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] transition-colors text-xs font-semibold shrink-0"
        >
          <span>Plan Visa Filing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
