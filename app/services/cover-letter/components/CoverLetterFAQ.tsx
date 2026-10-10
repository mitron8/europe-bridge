"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "I have placed the order, now what?",
    a: "Please check your inbox. You will immediately receive an email with a link to our structured profile intake questionnaire where you can enter your admitted German university, course modules, consular post, and list of physical documents to be indexed."
  },
  {
    q: "How long does the whole process take?",
    a: "Standard Order: First draft delivered in 3 working days, with final delivery upon completion of your review rounds. Express Order: First draft delivered within 1 working day (24 hours), with fast-track revision turnaround within 12 hours."
  },
  {
    q: "What is the difference between a Cover Letter and a Letter of Motivation (LOM)?",
    a: "A Cover Letter (Begleitschreiben) is strictly a 1-page formal executive summary and itemized document index for the VFS counter and consular officer. A Letter of Motivation (LOM) is an in-depth 2-page narrative exploring your academic history, specific curriculum modules, § 16b AufenthG compliance, and long-term career aspirations."
  },
  {
    q: "Will the Cover Letter be 100% original and plagiarism-free?",
    a: "Yes. Every Cover Letter is drafted from scratch by our German visa specialists tailored specifically to your admitted program, academic transcripts, and regional consular jurisdiction. We never use generic one-size-fits-all templates."
  },
  {
    q: "Does the Cover Letter match my regional German Consulate's document checklist?",
    a: "Absolutely. The German missions in India (New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and Hyderabad) have subtle differences in their physical dossier requirements. Our document index organizes your certificates in the exact sequence expected by your local VFS biometrics counter."
  },
  {
    q: "In what formats will my Cover Letter be delivered?",
    a: "You will receive both an official, printable PDF (formatted with DIN 5008 German business letter margins and designated blue-ink signature line) and an editable Microsoft Word (.docx) file so you can make future tweaks if your dates change."
  },
  {
    q: "How many rounds of revisions are included?",
    a: "Every order includes up to two complete rounds of student review. Your first draft is shared via Google Docs, allowing you to highlight phrases, add comments, or request adjustments directly with your assigned editor."
  }
];

export const CoverLetterFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 px-6 lg:px-12 max-w-5xl mx-auto scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need to know about preparing your Cover Letter for the German Student Visa application.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="neu-card border border-gray-200 overflow-hidden bg-white transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-germany-black hover:text-germany-red transition-colors cursor-pointer"
                >
                  <span className="font-extrabold pr-2">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-germany-red' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="p-6 bg-red-50/50 rounded-2xl border border-red-200 text-center max-w-xl mx-auto space-y-2">
          <h4 className="text-sm font-black text-germany-black">
            Need both a Cover Letter and a Letter of Motivation (LOM)?
          </h4>
          <p className="text-xs text-gray-600 font-medium">
            Check our dedicated Letter of Motivation service or Complete Visa Application package for bundled end-to-end documentation assistance.
          </p>
        </div>
      </div>
    </section>
  );
};
