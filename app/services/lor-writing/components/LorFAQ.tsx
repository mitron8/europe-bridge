"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LorFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How many LORs are included in this service?",
      answer: "This service includes two complete, distinct Letters of Recommendation. You can choose 2 Academic LORs (professors/HoD), 1 Academic + 1 Professional LOR (professor + work/internship manager), or 2 Professional LORs, depending on your application profile and target program requirements."
    },
    {
      question: "What information do you need from me to write my recommendation letters?",
      answer: "After ordering, you will receive our structured questionnaire to provide:\n• Recommender details: Name, designation, department, and university/company name.\n• Relationship timeline: How long they've known you and in what capacity (course professor, lab guide, thesis advisor, or direct manager).\n• Specific evidence: Modules/subjects taken, grades/rank achieved, final-year thesis topic, laboratory experiments, or workplace technical deliverables.\n• Target universities and degree programs."
    },
    {
      question: "Can I get one academic and one professional LOR?",
      answer: "Yes, absolutely! Mixing 1 Academic LOR and 1 Professional LOR is very common and highly recommended for applicants with 6+ months of work or internship experience. The academic letter proves your theoretical research competence, while the professional letter confirms your applied engineering problem-solving."
    },
    {
      question: "How do I get my recommender to sign the letter?",
      answer: "We provide your finalized LORs in both editable Word (.docx) and formatted PDF formats. In India and many countries, professors and busy managers routinely ask students to provide a well-drafted letter for them to review, approve, print on official letterhead, and sign. Because our drafts are objective, evidence-based, and professionally written, recommenders are almost always happy to sign without friction."
    },
    {
      question: "What if my target German university has specific prompts or an evaluation form?",
      answer: "Some universities (such as TUM, RWTH Aachen, or certain Erasmus Mundus consortia) provide specific prompt questions or a faculty evaluation rating grid. Simply share the prompt or grid in the questionnaire or via email, and our writers will calibrate the letters and provide the requested ratings format."
    },
    {
      question: "Does the LOR need an official stamp, seal, and institutional email?",
      answer: "Yes! German university admissions committees (Prüfungsausschuss) and Uni-Assist are strict about verification. Recommendations must be printed on official college or corporate letterhead with the institutional logo, physically stamped/signed (or verified digitally), and must display the recommender's official institutional domain email address (.edu, .ac.in, or corporate domain)."
    },
    {
      question: "What is the turnaround time and how do the revisions work?",
      answer: "Standard Bundle: First drafts of both letters delivered in 3 working days.\nExpress Bundle: First drafts of both letters delivered in 1 working day (24 hours).\n\nBoth plans include 2 full rounds of review via Google Docs. You can add comments, ask for wording tweaks, or highlight additional accomplishments, and our writers will refine the drafts promptly."
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28" id="faq">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-black shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Frequently Asked Questions About LORs
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
                  className="w-full p-5 text-left font-extrabold text-germany-black text-base flex justify-between items-center gap-4 hover:text-germany-red transition-colors cursor-pointer"
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
