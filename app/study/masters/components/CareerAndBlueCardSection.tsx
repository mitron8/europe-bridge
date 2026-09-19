"use client";

import React from 'react';
import { Award, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Briefcase, FileCheck, Globe, Clock, Landmark } from 'lucide-react';
import Link from 'next/link';

export const CareerAndBlueCardSection = () => {
  const roadmapStages = [
    {
      stage: "Stage 1",
      title: "18-Month Job Search Visa (§20 AufenthG)",
      duration: "Months 0 to 18 Post-Graduation",
      desc: "Granted immediately upon defending your master's thesis. You have 18 months of completely unrestricted work rights across Germany to search for a career matching your degree."
    },
    {
      stage: "Stage 2",
      title: "EU Blue Card (§18g AufenthG)",
      duration: "From First Full-Time Contract",
      desc: "Awarded upon securing employment meeting statutory salary thresholds. Grants European-wide work authorization, family reunification rights, and visa mobility."
    },
    {
      stage: "Stage 3",
      title: "Permanent Residency (Niederlassungserlaubnis)",
      duration: "21 to 27 Months on Blue Card",
      desc: "German university graduates qualify for permanent settlement in just 21 months with B1 German certificate (or 27 months with basic German), paying pension contributions."
    },
    {
      stage: "Stage 4",
      title: "German Citizenship (Einbürgerung)",
      duration: "5 Years Total Legal Stay",
      desc: "Under the modernized German Citizenship Act, your student visa years count towards naturalization. Dual citizenship is now fully permitted under federal law."
    }
  ];

  return (
    <section id="career" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-xs font-black uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Post-Study Settlement</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          From Master&apos;s Graduate to <span className="text-germany-red">EU Blue Card &amp; PR</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany faces acute STEM labor shortages. Immigration policies actively incentivize foreign university graduates to stay and settle permanently.
        </p>
      </div>

      {/* 2026 EU Blue Card Thresholds Card */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider">
              Updated Federal Thresholds 2026
            </span>
            <h3 className="font-display text-2xl font-bold text-germany-black mt-1">
              EU Blue Card Salary Requirements
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500">§18g German Residence Act</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-2">
            <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider">STEM &amp; Recent Graduates Category</div>
            <div className="font-display text-3xl font-black text-germany-red">€45,934 / Year</div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Applies to all Computer Science, AI, Data, Mechanical, Electrical, Chemical engineering, and STEM alumni within 3 years of master&apos;s graduation.
            </p>
            <div className="pt-2 text-xs font-extrabold text-emerald-700">
              Average starting salary for TU9 master&apos;s graduates: <strong>€54,000 – €66,000</strong>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-2">
            <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider">General Industry Benchmark</div>
            <div className="font-display text-3xl font-black text-germany-black">€50,700 / Year</div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Standard statutory salary minimum for non-shortage professional occupations and managerial roles across all German states.
            </p>
            <div className="pt-2 text-xs font-extrabold text-gray-700">
              Guarantees expedited residence processing with direct family work authorization
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Pathway to Permanent Residence & Citizenship */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-6">
        <h3 className="font-display text-xl sm:text-2xl font-black text-germany-black border-b border-[#EBE7E0] pb-4">
          The 4-Stage Permanent Residency Pathway
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmapStages.map((stage, idx) => (
            <div key={stage.stage} className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-germany-red">
                  {stage.stage}
                </span>
                <span className="text-[11px] font-bold text-gray-400">Step {idx + 1}</span>
              </div>
              <h4 className="font-display text-sm font-bold text-germany-black leading-snug">{stage.title}</h4>
              <div className="text-[10px] font-extrabold text-germany-gold">{stage.duration}</div>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>

        {/* Citizenship Modernization Highlight */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 font-medium flex items-start gap-3">
          <Landmark className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Dual Citizenship Reform:</strong> Under the new German Nationality Act (Staatsangehörigkeitsgesetz), students no longer need to renounce their original citizenship upon becoming German citizens. Your time enrolled as a full-time university student fully counts toward the mandatory 5-year naturalization timeline.
          </p>
        </div>
      </div>
    </section>
  );
};
