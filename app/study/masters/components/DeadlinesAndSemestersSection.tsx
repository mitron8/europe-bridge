"use client";

import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, ArrowRight, Compass, ShieldAlert, Send } from 'lucide-react';
import Link from 'next/link';

export const DeadlinesAndSemestersSection = () => {
  const roadmapMonths = [
    { month: "12 - 10 Months Before", title: "Profile Audit & APS Application", desc: "Convert your grades with the Bavarian formula, audit undergraduate ECTS credits, and initiate the APS verification immediately." },
    { month: "9 - 7 Months Before", title: "Language Tests & University Shortlisting", desc: "Take IELTS (target 6.5-7.0) / TOEFL. Shortlist 8-12 German public universities (mix of Ambitious, Target, and Safe)." },
    { month: "6 - 4 Months Before", title: "Document Curation & VPD Requests", desc: "Draft university-specific Motivation Letters, format your Europass/tabular CV, obtain recommendation letters, and submit Uni-Assist VPD requests." },
    { month: "3 - 2 Months Before", title: "Portal Submission & Offer Letters", desc: "Upload dossiers to direct portals (TUMonline, RWTHonline) or uni-assist before deadlines (May 31 / July 15). Track admission rounds." },
    { month: "1 - 2 Months Before", title: "Blocked Account & Visa Filing", desc: "Deposit €11,904 into your official Sperrkonto, secure German student health insurance, and attend your VFS consular appointment." },
    { month: "Arrival Week", title: "Landing & City Registration", desc: "Touchdown in Germany, register your address (Anmeldung) at the local Bürgeramt, open your current bank account, and complete university matriculation." },
  ];

  return (
    <section id="deadlines" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-xs font-black uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Intakes &amp; Schedules</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          German Semester Cycles &amp; <span className="text-germany-red">Application Deadlines</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany operates on two distinct academic cycles. Missing an application deadline by even one hour results in automatic system disqualification with zero exceptions.
        </p>
      </div>

      {/* Two Semesters Compared */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Winter Semester Card */}
        <div className="neu-card p-6 sm:p-7 bg-white space-y-4 relative overflow-hidden border-t-4 border-germany-red">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-red-50 text-germany-red border border-red-200 text-xs font-black uppercase tracking-wider">
              Primary Intake (~90% of Programs)
            </span>
            <span className="text-xs font-extrabold text-gray-500">Starts Oct 1</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-germany-black">
            Winter Semester (Wintersemester)
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            The flagship German university intake. Nearly all English-taught Master of Science and Engineering disciplines accept cohorts for winter.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-gray-700">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Application Window</div>
              <div className="font-extrabold text-germany-black text-sm mt-0.5">March 15 to July 15</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Early TU9 Deadlines (TUM, RWTH)</div>
              <div className="font-extrabold text-germany-red text-sm mt-0.5">May 31 / June 15</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Lecture Period</div>
              <div className="font-extrabold text-germany-black text-sm mt-0.5">Mid-October to Mid-February</div>
            </div>
          </div>
        </div>

        {/* Summer Semester Card */}
        <div className="neu-card p-6 sm:p-7 bg-white space-y-4 relative overflow-hidden border-t-4 border-germany-gold">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider">
              Secondary Intake (~25% of Programs)
            </span>
            <span className="text-xs font-extrabold text-gray-500">Starts Apr 1</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-germany-black">
            Summer Semester (Sommersemester)
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            A selective secondary intake. Ideal for students who missed winter timelines or graduated undergraduate degrees in autumn.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-gray-700">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Application Window</div>
              <div className="font-extrabold text-germany-black text-sm mt-0.5">October 15 to January 15</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Early TU9 Deadlines</div>
              <div className="font-extrabold text-amber-700 text-sm mt-0.5">November 30 / December 15</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE7E0]">
              <div className="text-gray-500 font-bold text-[11px] uppercase">Lecture Period</div>
              <div className="font-extrabold text-germany-black text-sm mt-0.5">Mid-April to End of July</div>
            </div>
          </div>
        </div>
      </div>

      {/* Uni-Assist vs Direct Portals */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-6">
        <div className="border-b border-[#EBE7E0] pb-4">
          <h3 className="font-display text-xl font-bold text-germany-black">
            How Applications Are Submitted: Uni-Assist vs. Direct Portals
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Understanding the channel through which each specific university processes international applications is critical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
            <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
              <Send className="w-5 h-5 text-germany-red" />
              <span>Uni-Assist (Central Clearing Agency)</span>
            </h4>
            <p className="text-gray-600 font-medium leading-relaxed">
              Uni-assist verifies foreign credentials on behalf of approximately 180 German universities.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Direct Uni-Assist Application:</strong> You upload files and pay fees directly via their portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>VPD (Vorprüfungsdokumentation):</strong> Uni-assist evaluates your credentials and issues a preliminary certificate which you then upload into the university&apos;s own portal (e.g., TUM, LMU).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fee:</strong> €75 for the first university, €30 for each additional university in the same semester.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-3">
            <h4 className="font-display text-base font-bold text-germany-black flex items-center gap-2">
              <Compass className="w-5 h-5 text-germany-gold" />
              <span>Direct University Portals</span>
            </h4>
            <p className="text-gray-600 font-medium leading-relaxed">
              Major institutions bypass uni-assist and maintain proprietary digital admission portals.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Key Examples:</strong> RWTHonline (RWTH Aachen), TUMonline (TU Munich), AlmaWeb (Leipzig), CampusPortal (Stuttgart).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fee:</strong> Usually 100% free of charge! You upload your PDF transcripts, CV, and motivation letter directly to the university&apos;s server.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Turnaround:</strong> Results typically released within 4 to 8 weeks following deadline closure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 12-Month Preparation Roadmap */}
      <div className="neu-card p-6 sm:p-8 bg-white space-y-6">
        <h3 className="font-display text-xl sm:text-2xl font-black text-germany-black border-b border-[#EBE7E0] pb-4">
          The 12-Month Master&apos;s Roadmap
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapMonths.map((item, idx) => (
            <div key={item.month} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-2 relative">
              <div className="text-[10px] font-black uppercase tracking-wider text-germany-red px-2 py-0.5 bg-red-100/70 rounded-full w-fit">
                {item.month}
              </div>
              <h4 className="font-display text-sm font-bold text-germany-black">{item.title}</h4>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
