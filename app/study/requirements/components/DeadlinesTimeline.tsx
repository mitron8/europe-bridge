"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

export const DeadlinesTimeline = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const timelineSteps = [
    { month: "12–14 Months Before", title: "Research & Language Prep", desc: "Select target courses, check prerequisite ECTS credits, register & begin preparation for IELTS/TOEFL or German B2/C1 exams." },
    { month: "10–12 Months Before", title: "Standardized Exams & APS", desc: "Appear for IELTS/TOEFL. Initiate APS document submission (India/China) immediately as APS verification takes 2–3 months." },
    { month: "8–10 Months Before", title: "Shortlisting & LORs", desc: "Finalize your shortlist of 8–10 German universities. Request recommendation letters from professors or workplace supervisors." },
    { month: "6–8 Months Before", title: "SOP & Document Legalization", desc: "Draft tailored Statement of Purpose (SOP) letters. Notarize, translate, and obtain MEA Apostille on degree certificates." },
    { month: "4–6 Months Before", title: "Application Submission", desc: "Submit applications via uni-assist or direct university portals before target deadlines (July 15 for Winter, Jan 15 for Summer)." },
    { month: "2–3 Months Before", title: "Offer Letter & Blocked Account", desc: "Receive admission offers. Deposit €11,904 into an official German Blocked Account (Expatrio, Fintiba, Coracle)." },
    { month: "6–8 Weeks Before", title: "Visa Application & Travel", desc: "Book appointment and submit national student visa application via the German embassy digital portal. Secure flight & housing." },
  ];

  return (
    <section id="section-deadlines" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <Calendar className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Requirement #4
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Application Deadlines &amp; <em className="lp-script text-[var(--lp-red)]">Timeline</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              German university admissions run on strict biannual intake cycles. Missing a deadline by 1 day means waiting 6 months.
            </p>
          </div>
        </div>

        {/* Standard Deadlines Box */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Standard Biannual Intake Cutoffs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">Major Intake</span>
                <span className="text-[11px] font-semibold text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2.5 py-0.5 rounded-full border border-[var(--lp-red)]/20">~85% Courses</span>
              </div>
              <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Winter Semester (Wintersemester)</h4>
              <div className="space-y-2 text-xs sm:text-sm text-[var(--lp-text)] pt-1">
                <div className="flex justify-between border-b border-[#e2ddd3]/60 pb-2">
                  <span className="text-[var(--lp-muted)]">Application Deadline:</span>
                  <span className="font-bold text-[var(--lp-red)]">July 15</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-[var(--lp-muted)]">Semester Start Date:</span>
                  <span className="font-semibold text-[var(--lp-text)]">October 1</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-gold)]">Secondary Intake</span>
                <span className="text-[11px] font-semibold text-[var(--lp-gold)] bg-[var(--lp-gold-soft)]/50 px-2.5 py-0.5 rounded-full border border-[var(--lp-gold)]/40">~15% Courses</span>
              </div>
              <h4 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">Summer Semester (Sommersemester)</h4>
              <div className="space-y-2 text-xs sm:text-sm text-[var(--lp-text)] pt-1">
                <div className="flex justify-between border-b border-[#e2ddd3]/60 pb-2">
                  <span className="text-[var(--lp-muted)]">Application Deadline:</span>
                  <span className="font-bold text-[var(--lp-red)]">January 15</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-[var(--lp-muted)]">Semester Start Date:</span>
                  <span className="font-semibold text-[var(--lp-text)]">April 1</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#ece7dd]/60 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed border border-[#e2ddd3]">
            <AlertCircle className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--lp-text)] font-semibold">Crucial Exception:</strong> Top research universities like TU Munich (TUM), RWTH Aachen, and Heidelberg often close winter applications earlier between <strong className="text-[var(--lp-red)] font-semibold">May 15 and May 31</strong>. Always verify exact portal dates!
            </span>
          </div>
        </div>

        {/* Interactive 12-Month Timeline */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-4 flex-wrap gap-2">
            <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Recommended 12-Month Preparation Roadmap</h3>
            <span className="text-xs text-[var(--lp-muted)] bg-[#ece7dd] px-3 py-1 rounded-full border border-[#e2ddd3]">
              Click step to view details
            </span>
          </div>

          <div className="space-y-3">
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === idx 
                    ? 'bg-white border-[var(--lp-ink)] shadow-md' 
                    : 'bg-[#ece7dd]/40 border-[#e2ddd3] hover:border-[#16161a]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      activeStep === idx ? 'bg-[var(--lp-ink)] text-white' : 'bg-[#ece7dd] text-[var(--lp-muted)]'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--lp-red)]">{step.month}</span>
                      <h4 className="text-sm sm:text-base font-semibold text-[var(--lp-text)]">{step.title}</h4>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[var(--lp-faint)] transition-transform duration-300 ${activeStep === idx ? 'rotate-180 text-[var(--lp-ink)]' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {activeStep === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-3 pl-11 leading-relaxed border-t border-[var(--lp-rule)] pt-3">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
