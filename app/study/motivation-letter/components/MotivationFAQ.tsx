"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const MotivationFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order, now what?",
      a: "Please check your inbox immediately after checkout. You will receive an automated confirmation email with a link to our quick profile intake form. There, you can upload your German admission letter, latest CV, academic transcripts, and tell us about your target consulate."
    },
    {
      q: "How long does the whole process take?",
      a: "• Standard Order: First draft delivered in 3 working days via Google Docs. Final delivery upon completing student review rounds.\n• Express Order: First draft delivered in 1 working day (within 24 hours). Ideal for students with approaching VFS appointment slots."
    },
    {
      q: "Will the LOM be 100% plagiarism-free?",
      a: "Yes, absolutely. We enforce a zero-tolerance plagiarism policy. Every Letter of Motivation is created from scratch based on your individual academic background, university syllabus, and career goals. We do not use generic templates or robotic AI generators."
    },
    {
      q: "How does the Student Review process work?",
      a: "You receive two collaborative review rounds after the first draft is delivered as an editable Google Doc. In the first round, you can request structural additions or adjustments via inline comments. In the second round, minor polish, formatting, and final refinements are implemented before we hand over your final consular-ready files."
    },
    {
      q: "Why can't I just submit my university SOP to the embassy?",
      a: "A university SOP is written for admissions professors evaluating your academic curiosity. A Consular Visa LOM is written for German visa officers enforcing Section 16b of the Residence Act (AufenthG). Visa officers look for specific curriculum justification, €11,904 blocked funding confirmation, and tangible post-graduation ties to your home country. Submitting an academic SOP is one of the most common causes of consular delay or rejection."
    },
    {
      q: "Should the Motivation Letter be in English or German?",
      a: "For English-taught international degree programs, the Letter of Motivation is submitted in English. However, if your program is partially or fully taught in German, or if you have German language proficiency (B1/B2), we incorporate appropriate German bilingual formatting or draft directly in formal German upon request."
    },
    {
      q: "What if the German consulate requests additional clarification after submission?",
      a: "If the embassy or Ausländerbehörde issues a preliminary inquiry or requests supplementary statements regarding your study motivation, our team assists you in drafting the necessary addendum or consular response without extra charges."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="section-faq" className="scroll-mt-36 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Frequently Asked <span className="text-germany-red">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Everything you need to know about our German student visa motivation letter service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-5xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`neu-card p-5 bg-white space-y-3 cursor-pointer select-none transition-all shadow-xs border ${
                  isOpen ? 'border-germany-red/40 ring-1 ring-germany-red/10' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-extrabold text-xs sm:text-sm text-germany-black leading-snug">
                    {faq.q}
                  </h3>
                  <div className="text-gray-400 shrink-0 mt-0.5">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-germany-red" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-3 whitespace-pre-line">
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
