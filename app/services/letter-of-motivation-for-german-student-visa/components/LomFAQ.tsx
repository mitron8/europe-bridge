"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Why can't I just submit my university SOP for my German student visa?",
    a: "A university SOP is written for admissions committees and professors, focusing on ECTS course prerequisites, academic theory, and lab research. In contrast, the German Embassy/Consulate evaluates legal compliance under § 16b AufenthG: genuine student intent, financial stability (€11,904 blocked account or loan), why Germany over your home country, and a clear post-graduation career plan. Submitting an academic SOP to the visa officer often leads to clarification queries or delays because it fails to address consular criteria."
  },
  {
    q: "What is the standard length and formatting required by the German Embassy?",
    a: "The German missions strictly prefer a concise, well-structured letter of 1.5 to 2 pages (typically 750 to 950 words). Consular officers review hundreds of applications weekly; excessively long essays are counterproductive, while letters under 1 page fail to demonstrate depth. We format your LOM with official recipient addresses, date conventions, legible typography, and clear paragraph headings."
  },
  {
    q: "What is the difference between the Standard Plan (₹3,999) and Express Plan (₹4,999)?",
    a: "Both plans provide the exact same high-caliber, bespoke writing and two review rounds. The difference is delivery speed: Standard is delivered within 3 working days, whereas Express is placed in our expedited queue and delivered within 24 hours (1 working day). Express is ideal for students who have secured an unexpected early VFS appointment or urgent CSP document submission deadline."
  },
  {
    q: "How many rounds of revisions are included, and how do we collaborate?",
    a: "Every order includes up to two complete rounds of student review. Your first draft is shared via Google Docs, allowing you to add comments, highlight specific phrases, or clarify family/financial details directly. Our editors address each comment and refine the draft until you are completely satisfied, after which we deliver the final PDF and Word document."
  },
  {
    q: "Do I need to write my Motivation Letter in German or English?",
    a: "If your admitted study program is taught in English (which is the case for most international Master's programs), the Embassy expects the Letter of Motivation to be in English. If you are enrolled in a German-taught degree (or Studienkolleg/DSH preparation), the letter should be in German. Our team supports English LOMs and German-language translations upon request."
  },
  {
    q: "How do you address profile complexities like study gaps, backlog history, or a field change?",
    a: "Consular officers pay extra attention to gaps and career shifts. Rather than hiding or glossing over them, our specialists frame gaps positively as professional exploration, upskilling, or project experience that logically led to this master's specialization. For field switchers, we emphasize transferable skills and the specific bridge modules in your German curriculum."
  },
  {
    q: "Should I physically sign the Letter of Motivation before my VFS appointment?",
    a: "Yes. German consulates require an original, physically signed document (in blue ink) submitted with your visa application dossier. We provide a clean printable PDF with the designated signature block (Place, Date, and Signature line) formatted to German bureaucratic standards."
  }
];

export const LomFAQ = () => {
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
            Everything you need to know about preparing your Letter of Motivation for the German Student Visa.
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
            Have a unique consular query or rejection appeal?
          </h4>
          <p className="text-xs text-gray-600 font-medium">
            Our visa writing team provides specialized remonstration / appeal motivation letters as well. Reach out via WhatsApp or email for dedicated guidance.
          </p>
        </div>
      </div>
    </section>
  );
};
