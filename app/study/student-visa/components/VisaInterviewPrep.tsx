"use client";

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
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
      tip: "Confidently state: 'I have deposited the mandatory €11,904 in an approved Blocked Account with Expatrio/Fintiba, which provides €992 per month to comfortably cover all my living expenses.'"
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
    <section id="section-interview" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Interview Readiness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display leading-tight">
            German Student Visa <span className="text-germany-red">Interview Preparation</span>
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Consular officers evaluate academic authenticity, curriculum awareness, and financial solvency. Practice the key questions before your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Top Questions Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-display text-lg text-germany-black font-bold border-b border-[#EBE7E0] pb-2 flex items-center justify-between">
              <span>Top Consular Interview Questions</span>
              <span className="text-xs text-gray-400 font-semibold">Click to reveal strategy</span>
            </h3>

            {interviewQuestions.map((item, idx) => {
              const isOpen = openQuestion === idx;
              return (
                <div 
                  key={idx}
                  className="neu-card p-4 sm:p-5 bg-white space-y-2 cursor-pointer transition-all border border-[#EBE7E0]/70 hover:border-germany-red/30 shadow-xs"
                  onClick={() => setOpenQuestion(isOpen ? null : idx)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-black text-germany-red bg-red-100/70 px-2 py-0.5 rounded shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-germany-black leading-snug">
                        {item.q}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-germany-red shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </div>

                  {isOpen && (
                    <div className="pt-2 border-t border-[#EBE7E0]/60 mt-2">
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                        <strong className="text-germany-black">How to answer: </strong>
                        {item.tip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dos & Don'ts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="neu-card p-6 bg-white space-y-4 shadow-[12px_12px_30px_rgba(210,205,195,0.5)] border border-[#EBE7E0]/80">
              <h3 className="font-display text-base text-germany-black font-bold border-b border-[#EBE7E0] pb-2">
                Interview Dos &amp; Don'ts
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-1.5 text-xs text-emerald-950 font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Always Do:</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 pl-5 list-disc text-xs">
                    <li>Memorize course modules and university city name.</li>
                    <li>Know your exact living costs and blocked account amounts.</li>
                    <li>Arrive at VFS 15 minutes before scheduled slot.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200/60 space-y-1.5 text-xs text-red-950 font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-germany-red">
                    <XCircle className="w-4 h-4 text-germany-red shrink-0" />
                    <span>Never Do:</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 pl-5 list-disc text-xs">
                    <li>Never say you are going to Germany for permanent settlement.</li>
                    <li>Never guess answers — if unsure, politely clarify.</li>
                    <li>Never present wrinkled, uncertified, or stapled papers.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/signup"
                  className="w-full neu-btn-primary py-3 text-xs font-black uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Book 1:1 Mock Interview Session</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
