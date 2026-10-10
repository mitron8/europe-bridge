"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SopFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "I have placed the order, now what happens next?",
      answer: "Please check your inbox immediately. You will receive an automated welcome email with a link to our comprehensive Student Intake Questionnaire. Here, you'll share your resume, academic transcripts, technical projects, and target university program link so our editor can begin drafting."
    },
    {
      question: "How long does the whole drafting process take?",
      answer: "Standard Order: First draft delivered in 3 working days; final draft finalized after your student review rounds.\nExpress Order: First draft delivered within 1 working day (24 hours); ideal for impending Uni-Assist, VPD, or scholarship application deadlines."
    },
    {
      question: "Will the SOP be completely original, plagiarism-free, and AI-free?",
      answer: "Yes, 100%. We enforce a zero-tolerance policy for plagiarism and generic AI templates. Every SOP is custom-written by a human academic editor who researches your target program's specific module handbook. We run every draft through Turnitin before delivery."
    },
    {
      question: "How do the two student review rounds work?",
      answer: "Your draft is delivered as a live Google Doc. You can highlight specific sentences, ask questions, request stronger emphasis on particular research projects, or suggest changes using inline Google Doc comments. Our editor incorporates your feedback within 24 hours (or 12 hours on Express orders)."
    },
    {
      question: "Do you write for technical Master's programs at TU9 universities?",
      answer: "Yes. In fact, technical Master's programs (Computer Science, Robotics, Mechanical, Automotive, Electrical, and Biomedical Engineering) represent over 80% of our work. Our editors understand German examination rules (Prüfungsordnung) and know how to showcase prerequisite ECTS alignment."
    },
    {
      question: "What if my target university specifies a strict word count or specific prompt?",
      answer: "We strictly adhere to whatever rules your university mandates. Whether TUM asks for an essay on a specific prompt, RWTH Aachen imposes a strict 2-page limit, or FAU Erlangen asks for 500 words, we tailor the structure and word count to match their exact instructions."
    },
    {
      question: "Can I get multiple SOPs for different universities?",
      answer: "Yes. German universities dislike generic, one-size-fits-all statements. While your background and core projects remain consistent, each SOP must cite the distinct faculty, modules, and labs of each university. You can submit another order for additional university variants at a returning student discount."
    }
  ];

  return (
    <section className="py-10 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28" id="faq">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-black shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-germany-black text-base flex justify-between items-center gap-4 hover:text-germany-red transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-germany-red shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-germany-red' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 bg-red-50/20 whitespace-pre-line pl-11">
                        {faq.answer}
                      </div>
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
