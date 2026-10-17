"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Send, Compass } from 'lucide-react';

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
    <section id="deadlines" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 scroll-mt-28">
      {/* Header */}
      <div data-reveal className="space-y-3 max-w-3xl">
        <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Intakes &amp; Schedules
        </div>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
          German Semester Cycles &amp; <em className="lp-script text-[var(--lp-red)]">Application Deadlines</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Germany operates on two distinct academic cycles. Missing an application deadline by even one hour results in automatic system disqualification.
        </p>
      </div>

      {/* Two Semesters Compared */}
      <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Winter Semester Card */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_8px_30px_rgba(22,22,26,0.03)] border-t-4 border-t-[var(--lp-red)]"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] border border-[var(--lp-red)]/20 text-[10.5px] font-semibold uppercase tracking-wider">
              Primary Intake (~90% of Programs)
            </span>
            <span className="text-xs font-semibold text-[var(--lp-muted)]">Starts Oct 1</span>
          </div>

          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
            Winter Semester (Wintersemester)
          </h3>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
            The flagship German university intake. Nearly all English-taught Master of Science and Engineering disciplines accept cohorts for winter.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Application Window</div>
              <div className="font-semibold text-[var(--lp-text)] text-xs sm:text-sm mt-0.5">March 15 to July 15</div>
            </div>
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Early TU9 Deadlines (TUM, RWTH)</div>
              <div className="font-semibold text-[var(--lp-red)] text-xs sm:text-sm mt-0.5">May 31 / June 15</div>
            </div>
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Lecture Period</div>
              <div className="font-semibold text-[var(--lp-text)] text-xs sm:text-sm mt-0.5">Mid-October to Mid-February</div>
            </div>
          </div>
        </motion.div>

        {/* Summer Semester Card */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_8px_30px_rgba(22,22,26,0.03)] border-t-4 border-t-[var(--lp-gold)]"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[var(--lp-gold-soft)]/50 text-[var(--lp-text)] border border-[var(--lp-gold)]/30 text-[10.5px] font-semibold uppercase tracking-wider">
              Secondary Intake (~25% of Programs)
            </span>
            <span className="text-xs font-semibold text-[var(--lp-muted)]">Starts Apr 1</span>
          </div>

          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
            Summer Semester (Sommersemester)
          </h3>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
            A selective secondary intake. Ideal for students who missed winter timelines or graduated undergraduate degrees in autumn.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Application Window</div>
              <div className="font-semibold text-[var(--lp-text)] text-xs sm:text-sm mt-0.5">October 15 to January 15</div>
            </div>
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Early Deadlines</div>
              <div className="font-semibold text-[var(--lp-gold)] text-xs sm:text-sm mt-0.5">November 30 / December 15</div>
            </div>
            <div className="p-3.5 bg-[#ece7dd]/40 rounded-xl border border-[#e2ddd3]">
              <div className="text-[var(--lp-muted)] font-semibold text-[10px] uppercase tracking-wider">Lecture Period</div>
              <div className="font-semibold text-[var(--lp-text)] text-xs sm:text-sm mt-0.5">Mid-April to End of July</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Uni-Assist vs Direct Portals */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <div className="border-b border-[var(--lp-rule)] pb-4">
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
            How Applications Are Submitted: Uni-Assist vs. Direct Portals
          </h3>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
            Understanding the channel through which each specific university processes international applications is critical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <Send className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
              <span>Uni-Assist (Central Clearing Agency)</span>
            </h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Uni-assist verifies foreign credentials on behalf of approximately 180 German universities.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-text)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>Direct Uni-Assist Application:</strong> You upload files and pay evaluation fees directly via their portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>VPD (Vorprüfungsdokumentation):</strong> Uni-assist evaluates your credentials and issues a preliminary certificate for university portals (e.g., TUM, LMU).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>Fee:</strong> €75 for the first university, €30 for each additional university in the same cycle.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3.5">
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[var(--lp-gold)] shrink-0" />
              <span>Direct University Portals</span>
            </h4>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Major institutions bypass uni-assist and maintain proprietary digital admission portals.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-text)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>Key Examples:</strong> RWTHonline (RWTH Aachen), TUMonline (TU Munich), AlmaWeb (Leipzig), CampusPortal (Stuttgart).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>Fee:</strong> Usually 100% free of charge! You upload your PDF transcripts, CV, and motivation letter directly to the university&apos;s server.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong>Turnaround:</strong> Results typically released within 4 to 8 weeks following deadline closure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 12-Month Preparation Roadmap */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-4">
          The 12-Month Master&apos;s Roadmap
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapMonths.map((item) => (
            <motion.div 
              key={item.month} 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-red)] px-2.5 py-0.5 bg-[var(--lp-red)]/10 rounded-full w-fit border border-[var(--lp-red)]/20">
                {item.month}
              </div>
              <h4 className="lp-serif text-sm font-semibold text-[var(--lp-text)]">{item.title}</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
