"use client";

import React from 'react';
import { Briefcase, Clock, Euro, CheckCircle2, TrendingUp, Building2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const WorkingWhileStudyingSection = () => {
  const workStreams = [
    {
      title: "Werkstudent (Working Student)",
      badge: "Highest Paying & Career Focused",
      hourlyPay: "€16 – €24 / hour",
      monthlyGross: "€1,200 – €1,900 / month",
      desc: "Direct employment at tech, automotive, and consulting companies (e.g., SAP, Siemens, BMW, Bosch). You work in your field of study as a junior software engineer, data analyst, or mechanical CAD specialist.",
      perks: [
        "Up to 20 hours/week during semester, 40 hours/week during breaks",
        "Exempt from healthcare, unemployment & nursing care social contributions",
        "Over 65% of Werkstudent contracts convert directly to full-time permanent jobs upon graduation"
      ]
    },
    {
      title: "HiWi (Research / Teaching Assistant)",
      badge: "Academic & On-Campus",
      hourlyPay: "€14.50 – €18.00 / hour",
      monthlyGross: "€580 – €950 / month",
      desc: "Employed directly by your university institute (Lehrstuhl) to assist professors with laboratory experiments, coding grading scripts, or tutorial recitation sessions.",
      perks: [
        "Does NOT count towards your 140-day statutory off-campus visa limit (§16b AufenthG)",
        "Zero travel time — work directly inside your university department",
        "Direct connection with supervising professors for thesis topics & PhD recommendations"
      ]
    },
    {
      title: "Minijob (Commercial / Service)",
      badge: "Tax-Free Basic Income",
      hourlyPay: "€13.90 – €16.00 / hour",
      monthlyGross: "Up to €538 / month",
      desc: "Flexible part-time work in student cafes, retail stores, university event setups, logistics, and library support.",
      perks: [
        "100% tax-free income (under the statutory €538 Minijob threshold)",
        "Requires zero previous technical German experience",
        "Ideal for first-semester students transitioning into life in Germany"
      ]
    }
  ];

  return (
    <section id="work" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-xs font-black uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Earn While You Learn</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          Part-Time Work Regulations <span className="text-germany-red">&amp; Werkstudent Jobs</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany grants international students generous work rights. Most master&apos;s students easily self-finance their entire living costs through student employment.
        </p>
      </div>

      {/* 140-Day Rule Highlight Banner */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#EBE7E0] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Modernized German Immigration Act 2026</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-germany-black">
              The 140 Full Days / 280 Half Days Rule
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-2xl">
              Non-EU international master&apos;s students holding a student visa (§16b AufenthG) are legally permitted to work up to <strong>140 full days</strong> (shifts exceeding 4 hours) or <strong>280 half days</strong> (shifts up to 4 hours) per calendar year without requiring any separate work permit from the Ausländerbehörde.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE7E0] text-center">
              <span className="block text-[10px] font-black uppercase text-gray-500">2026 Min Wage</span>
              <span className="font-display text-2xl font-black text-germany-red">€13.90</span>
              <span className="block text-[10px] text-gray-500">Per hour (statutory)</span>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE7E0] text-center">
              <span className="block text-[10px] font-black uppercase text-gray-500">Werkstudent Cap</span>
              <span className="font-display text-2xl font-black text-germany-black">20 Hrs</span>
              <span className="block text-[10px] text-gray-500">Per week in semester</span>
            </div>
          </div>
        </div>

        {/* 3 Work Stream Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workStreams.map((stream) => (
            <div key={stream.title} className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-gray-200 text-germany-black inline-block">
                  {stream.badge}
                </span>

                <h4 className="font-display text-lg font-bold text-germany-black">{stream.title}</h4>

                <div className="p-3 bg-white rounded-xl border border-gray-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Typical Hourly:</span>
                    <span className="font-extrabold text-germany-red">{stream.hourlyPay}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Monthly Gross:</span>
                    <span className="font-black text-germany-black">{stream.monthlyGross}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 font-medium leading-relaxed">{stream.desc}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-200 text-xs">
                {stream.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 font-medium flex items-start gap-3">
          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Career Accelerator:</strong> Werkstudent positions in Germany are not just student jobs — they function as extended recruitment trials. Leading employers (such as Mercedes, SAP, and BMW) preferentially hire their own former working students for entry-level engineering roles without open public job postings.
          </p>
        </div>
      </div>
    </section>
  );
};
