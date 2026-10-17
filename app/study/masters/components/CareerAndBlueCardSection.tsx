"use client";

import React from 'react';
import { Award, ShieldCheck, Check, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const CareerAndBlueCardSection = () => {
  const roadmapStages = [
    {
      stage: "Stage 01",
      title: "18-Month Job Search Visa (§20)",
      duration: "Months 0 – 18 Post-Graduation",
      desc: "Granted upon thesis submission. You have 18 months of unrestricted work authorization in Germany to secure a permanent role aligned with your degree."
    },
    {
      stage: "Stage 02",
      title: "EU Blue Card (§18g)",
      duration: "From First Full-Time Contract",
      desc: "Granted upon securing employment meeting federal salary thresholds. Provides European mobility, fast-track processing, and family accompaniment."
    },
    {
      stage: "Stage 03",
      title: "Permanent Residency (PR)",
      duration: "21 – 27 Months on Blue Card",
      desc: "German university graduates qualify for settlement in 21 months with B1 German certificate (or 27 months with basic A1/A2 German)."
    },
    {
      stage: "Stage 04",
      title: "German Citizenship",
      duration: "5 Years Total Legal Stay",
      desc: "Under the modernized nationality law, student visa years count toward citizenship, and dual citizenship is fully recognized."
    }
  ];

  return (
    <section id="career" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Post-Study Settlement
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          From Master&apos;s Graduate to <em className="italic text-[var(--lp-red)] font-serif">EU Blue Card &amp; PR</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Germany faces acute engineering and IT labor shortages. Immigration policies deliberately facilitate permanent settlement for foreign graduates.
        </p>
      </div>

      {/* 2026 EU Blue Card Thresholds Card */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e0d3] pb-4">
          <div>
            <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] border border-[var(--lp-gold)]/20">
              Updated Federal Thresholds
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] mt-1.5">
              EU Blue Card Salary Requirements
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--lp-muted)]">§18g German Residence Act</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">STEM &amp; Recent Graduates Category</div>
            <div className="font-serif text-3xl font-normal text-[var(--lp-red)]">€45,934 / Year</div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Applies to all Computer Science, AI, Data, Mechanical, Electrical, Chemical engineering, and STEM graduates within 3 years of completion.
            </p>
            <div className="pt-2 text-xs font-mono text-[var(--lp-gold)]">
              Average starting salary for TU9 graduates: €54,000 – €66,000
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">General Industry Benchmark</div>
            <div className="font-serif text-3xl font-normal text-[var(--lp-ink)]">€50,700 / Year</div>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Standard statutory salary minimum for non-STEM professional occupations and managerial roles across all German states.
            </p>
            <div className="pt-2 text-xs font-mono text-[var(--lp-muted)]">
              Direct family reunification and unrestricted spousal employment rights
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Pathway to Permanent Residence & Citizenship */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] border-b border-[#e5e0d3] pb-4">
          The 4-Stage Pathway to Permanent Residency
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmapStages.map((stage) => (
            <div
              key={stage.stage}
              className="p-5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20">
                  {stage.stage}
                </span>
              </div>
              <h4 className="font-serif text-base font-normal text-[var(--lp-ink)] leading-snug">{stage.title}</h4>
              <div className="text-[11px] font-mono text-[var(--lp-gold)]">{stage.duration}</div>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
