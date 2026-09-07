"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = () => {
  const faqs = [
    {
      q: "How many universities should I apply to?",
      a: "We recommend applying to 6–10 programs spread across dream, target, and safe tiers. Since each additional uni-assist application costs only €30 (after the first €75), applying to multiple universities is very affordable and significantly increases your odds of securing admission."
    },
    {
      q: "Can I apply for both winter and summer semesters?",
      a: "Yes, but most public programs only offer winter semester intake (starting October). Only about 30% of programs accept summer semester applications (starting April). Always check each target program's specific admission portal individually."
    },
    {
      q: "What is the difference between uni-assist and direct application?",
      a: "uni-assist is a centralized service that evaluates foreign academic records for equivalence and converts grades before forwarding dossiers to the university. Direct application means submitting your portfolio directly via the university's internal portal (such as campus.tum.de) for their internal faculty committee to review."
    },
    {
      q: "How long does it take to receive an admission decision?",
      a: "Universities usually take 4 to 8 weeks after their application deadline to issue decisions. For winter applications submitted by the standard July 15 deadline, decisions typically arrive between mid-August and late September."
    },
    {
      q: "Can I defer my admission to the next semester?",
      a: "Most German public universities do not support deferrals. If you are unable to enroll, you must reapply in the next intake cycle. A few private universities and select specialized English programs allow deferrals on a case-by-case basis."
    },
    {
      q: "What if I get rejected from all universities?",
      a: "Review each rejection letter carefully: was the bottleneck subject-specific credit prerequisites (ECTS), GPA cutoffs, or language scores? Strengthen your profile with targeted coursework, internships, improved test scores, or re-apply to NC-free programs in the following cycle."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`neu-card p-5 bg-white space-y-3 cursor-pointer select-none transition-all shadow-xs border ${
                  isOpen ? 'border-germany-red/30 ring-1 ring-germany-red/10' : 'border-[#EBE7E0]/60 hover:border-gray-300'
                }`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100/70 text-germany-red shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-germany-black leading-snug">{faq.q}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-germany-red" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-[#EBE7E0]/60 pt-3 mt-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

