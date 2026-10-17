"use client";

import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import Link from 'next/link';

export const VisaInterviewPrep = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const interviewQuestions = [
    {
      q: "Why did you select this specific university and program in Germany?",
      tip: "Mention 2–3 core modules or lab facilities from the curriculum that directly align with your bachelor thesis or previous work experience. Never say 'because Germany is cheap' or 'tuition-free'."
    },
    {
      q: "How will you finance your living and education costs in Germany?",
      tip: "Confidently state: 'I have deposited the mandatory €11,904 in an approved Blocked Account with Expatrio/Fintiba, which unlocks €992 per month to comfortably cover all my living expenses.'"
    },
    {
      q: "Why study in Germany instead of your home country or the US/UK?",
      tip: "Focus on Germany's industrial strength, cutting-edge research infrastructure, hands-on university modules, and the international perspective offered by their faculty."
    },
    {
      q: "What are your plans after completing your Master's degree?",
      tip: "Highlight your intention to leverage the 18-month post-study job seeker visa (Aufenthaltserlaubnis) to gain international industry experience before advancing your long-term career."
    },
    {
      q: "Do you know any German? What is your language proficiency?",
      tip: "State your IELTS/TOEFL score for your English program, and mention any German basics learned (A1/A2) to demonstrate proactive cultural integration."
    }
  ];

  return (
    <section id="section-interview" className="scroll-mt-32 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Interview Readiness
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          German Student Visa <em className="italic text-[var(--lp-red)] font-serif">Interview Preparation</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Consular officers evaluate academic authenticity, curriculum awareness, and financial solvency. Practice the key questions before your appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Top Questions Accordion */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-2">
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">
              Top Consular Interview Questions
            </h3>
            <span className="text-[11px] font-mono text-[var(--lp-muted)]">Click to reveal strategy</span>
          </div>

          <div className="space-y-2.5">
            {interviewQuestions.map((item, idx) => {
              const isOpen = openQuestion === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#faf8f3] rounded-2xl p-4 sm:p-5 border border-[#e5e0d3] space-y-2 cursor-pointer transition-all hover:border-[var(--lp-red)]/30"
                  onClick={() => setOpenQuestion(isOpen ? null : idx)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[var(--lp-text)] leading-snug">
                        {item.q}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--lp-muted)] shrink-0" />
                    )}
                  </div>

                  {isOpen && (
                    <div className="pt-2 border-t border-[#e5e0d3] mt-2">
                      <p className="text-xs text-[var(--lp-muted)] leading-relaxed bg-[#eae5db]/50 p-3 rounded-xl border border-[#e5e0d3]">
                        <strong className="text-[var(--lp-text)]">Recommended response angle: </strong>
                        {item.tip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dos & Don'ts */}
        <div className="lg:col-span-5 bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4">
          <h3 className="font-serif text-base font-normal text-[var(--lp-ink)] border-b border-[#e5e0d3] pb-2">
            Interview Dos &amp; Don&apos;ts
          </h3>

          <div className="space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-gold)] block">
                Dos: What Officers Value
              </span>
              <div className="space-y-1.5 text-xs text-[var(--lp-muted)]">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Know your syllabus modules and professor names</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Explain exact funding via €11,904 blocked account</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                  <span>Present loose documents neatly in order without staples</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#e5e0d3]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-red)] block">
                Don&apos;ts: Common Pitfalls
              </span>
              <div className="space-y-1.5 text-xs text-[var(--lp-muted)]">
                <div className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-[var(--lp-red)] shrink-0 mt-0.5" />
                  <span>Do not claim you chose Germany simply because it is tuition-free</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-[var(--lp-red)] shrink-0 mt-0.5" />
                  <span>Do not state that you plan to finance studies purely via part-time work</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-[var(--lp-red)] shrink-0 mt-0.5" />
                  <span>Do not submit documents with handwritten ink corrections on printed VIDEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
