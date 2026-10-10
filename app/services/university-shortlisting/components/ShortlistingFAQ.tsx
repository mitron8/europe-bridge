"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShortlistingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "I have placed the order, what happens next?",
      answer: "Immediately upon placing your order, you will receive a confirmation email with a link to our secure Student Intake Form. Here, you'll upload your undergraduate marksheets, provisional degree certificate, and any IELTS, TOEFL, or GRE scorecards, along with your preferred German cities and specialization goals."
    },
    {
      question: "How many universities/courses are shortlisted?",
      answer: "Up to 10 courses. We shortlist ONLY university programs where you genuinely satisfy the stated academic prerequisites and language requirements. We maintain a healthy, balanced split across 3 Ambitious (TU9/Excellence), 4 Moderate (Top Research & Public universities), and 3 Safe (Direct-match Applied Sciences) options."
    },
    {
      question: "How long does the whole process take?",
      answer: "Standard Order: First draft delivered to your email in 3 working days. Final draft finalized following your review rounds.\nExpress Order: First draft delivered within 1 working day (24 hours). Ideal for students with urgent Uni-Assist or VPD deadlines."
    },
    {
      question: "What if I don't like some of the shortlisted universities?",
      answer: "Every order includes 2 full rounds of Student Review. If a specific city doesn't suit your preferences or you wish to explore alternative curriculum modules, simply let our counselors know. We will swap out courses and re-audit options until you have 10 programs you are 100% confident in applying to."
    },
    {
      question: "Do you shortlist tuition-free public universities or private ones?",
      answer: "We focus 100% on accredited German public universities with zero tuition fees (where you only pay the standard semester contribution of €150 to €350/semester). We never push private paid universities unless you explicitly request a private business school."
    },
    {
      question: "What is an ECTS credit audit and why is it so important?",
      answer: "In Germany, Master's admissions are consecutive (konsekutiv). If a program requires 18 ECTS in Theoretical Computer Science or 12 ECTS in Thermodynamics and your Bachelor's transcript only shows 8 ECTS, your application will be automatically rejected regardless of having a 9.9 CGPA. We calculate your exact ECTS credit conversion to protect you from wasted application fees."
    },
    {
      question: "Does this shortlisting service include SOP or LOR writing?",
      answer: "This service specializes in comprehensive university research, ECTS auditing, and direct portal linking. Document preparation (such as SOP drafting, CV formatting, and LOR editing) is available as an add-on or through our 'Done With You' end-to-end admission counseling packages."
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
                  <span>{faq.question}</span>
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
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 bg-red-50/20 whitespace-pre-line">
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
