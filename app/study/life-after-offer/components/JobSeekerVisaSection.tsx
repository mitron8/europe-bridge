"use client";

import React from 'react';
import { Clock, Check, AlertCircle, FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const JobSeekerVisaSection = () => {
  const steps = [
    {
      month: 'Month -6',
      title: 'Shortlist & German CV Build',
      desc: 'Format your CV into the German tabellarischer Lebenslauf standard. Target Mittelstand and DAX employers matching your degree modules.'
    },
    {
      month: 'Month -3',
      title: 'Active Interviews & Thesis',
      desc: 'Leverage your Master’s thesis or Werkstudent project as a direct audition. Most German employers finalize hiring budgets 3–4 months ahead.'
    },
    {
      month: 'Month -1',
      title: 'Prüfungsamt & Visa Appointment',
      desc: 'Request provisional graduation confirmation (Vorläufige Bescheinigung) from your examination office. Schedule Ausländerbehörde appointment early.'
    },
    {
      month: 'Month 0',
      title: 'Transition to §20 or Blue Card',
      desc: 'Submit degree completion proof. If you already hold an offer, transition directly to the EU Blue Card (§18g); otherwise activate your 18-month search permit.'
    }
  ];

  const checklist = [
    { text: 'German University Degree Certificate or provisional graduation letter (Vorläufige Bescheinigung)', required: true },
    { text: 'Proof of secure livelihood (blocked account or income from part-time work)', required: true },
    { text: 'Continuous statutory (TK, Barmer) or expat health insurance coverage', required: true },
    { text: 'Valid passport with at least 12–18 months remaining validity', required: true },
    { text: 'Proof of registered residential address (Meldebescheinigung)', required: true },
    { text: 'Biometric passport photographs adhering to German consular norms', required: true },
  ];

  return (
    <section id="section-job-seeker" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          §20 Paragraph 3 AufenthG
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          The 18-Month <em className="lp-script text-[var(--lp-red)]">Post-Study Search Visa</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Unlike restrictive grace periods in the US or UK, Germany gives you 18 months of unrestricted work authorization to land a qualified career role.
        </p>
      </div>

      {/* Intro Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-red)] block">Duration</span>
          <div className="font-serif text-2xl font-normal text-[var(--lp-ink)]">18 Months</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Begins immediately upon receipt of your final exam or thesis results.</p>
        </div>

        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)] block">Work Rights</span>
          <div className="font-serif text-2xl font-normal text-[var(--lp-ink)]">100% Unrestricted</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Work full-time or part-time in any industry to fund your stay while interviewing.</p>
        </div>

        <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)] block">Immediate Transition</span>
          <div className="font-serif text-2xl font-normal text-[var(--lp-ink)]">EU Blue Card</div>
          <p className="text-xs text-[var(--lp-muted)] leading-relaxed">Convert to an EU Blue Card at any time without leaving Germany.</p>
        </div>
      </div>

      {/* 4-Step Timeline */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <h3 className="font-serif text-xl font-normal text-[var(--lp-ink)] border-b border-[#e5e0d3] pb-3">
          Recommended Search Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => (
            <div key={st.month} className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20">
                {st.month}
              </span>
              <h4 className="font-serif text-sm font-normal text-[var(--lp-ink)] leading-snug">{st.title}</h4>
              <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="pt-4 border-t border-[#e5e0d3] space-y-3">
          <h4 className="font-serif text-base font-normal text-[var(--lp-ink)]">
            Required Documents for §20 Permit
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[var(--lp-text)]">
                <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
