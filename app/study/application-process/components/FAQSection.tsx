"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const faqs = [
    {
      q: "How many universities should I apply to?",
      a: "We recommend applying to 6–10 programs spread across dream, target, and safe tiers. Since each additional uni-assist application costs only €30 (after the first €75), applying to multiple universities is very affordable and increases your odds."
    },
    {
      q: "Can I apply for both winter and summer semester?",
      a: "Yes, but most public programs only offer winter semester intake (starting October). Only about 30% of programs accept summer semester applications (starting April). Check each program's website individually."
    },
    {
      q: "What is the difference between uni-assist and direct application?",
      a: "uni-assist is a centralized service that evaluates your foreign academic records for equivalence and converts your grades before forwarding them to the university. Direct application means you submit files directly via the university's portal (like campus.tum.de) and their internal admissions office does the assessment."
    },
    {
      q: "How long does it take to get an admission decision?",
      a: "Universities usually take 4 to 8 weeks after the application deadline to send admission letters. For winter applications submitted by July 15, decisions arrive between mid-August and late September."
    },
    {
      q: "Can I defer my admission to the next semester?",
      a: "Most German public universities do not support deferrals. If you are unable to enroll, you must reapply in the next intake cycle. A few private universities allow deferrals on a case-by-case basis."
    },
    {
      q: "What if I get rejected from all universities?",
      a: "Analyze the rejection letter: was it credit prerequisites (ECTS), GPA cutoffs, or language scores? Focus on improving your academic CV, gain relevant internships/jobs, and retake tests if needed to build a stronger profile for the next cycle."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="section-faq" className="scroll-mt-36 py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-display text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
          <HelpCircle className="w-6 h-6 text-germany-red" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="neu-card p-5 bg-white space-y-3 cursor-pointer select-none transition-all"
              onClick={() => toggleFAQ(idx)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-germany-black leading-snug">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openIndex === idx ? 'rotate-180 text-germany-red' : ''}`} />
              </div>
              
              {openIndex === idx && (
                <p className="text-xs text-gray-500 font-semibold leading-relaxed border-t border-[#EBE7E0]/50 pt-2.5">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
