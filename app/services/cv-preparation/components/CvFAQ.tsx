"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CvFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a German Tabellarischer Lebenslauf and how does it differ from a standard US/Indian resume?",
      answer: "A German Tabellarischer Lebenslauf (tabular CV) is a structured, factual document designed for German admissions committees and employers. Unlike US resumes that emphasize narrative storytelling and creative graphics, a German CV uses a strict two-column layout with dates (MM/YYYY - MM/YYYY) aligned on the left and achievements on the right. It requires a gapless timeline (lückenlos), converted German grades (Bavarian Formula), CEFR language levels (A1-C2), and formal signature blocks."
    },
    {
      question: "Do I need to include a photograph on my CV for German university applications?",
      answer: "For pure university admissions (via uni-assist or direct university portals like TUMonline), a photograph is generally optional under modern anti-discrimination guidelines. However, if you are applying for an Ausbildung, corporate scholarships (DAAD), or Werkstudent (working student) / internship roles in Germany, a professional German application photo (Bewerbungsfoto) is still widely expected. We can format your CV with or without a photo slot based on your goal."
    },
    {
      question: "How are gaps in my education or career handled in a 'lückenloser' CV?",
      answer: "German reviewers scrutinize unexplained gaps of more than 1 to 2 months. In our questionnaire, we will ask you about any gap periods between schooling, college, or jobs. We strategically frame these intervals constructively—such as 'Preparation for Master’s entrance exams & German A1/A2 certification', 'Self-directed research and open-source project development', or 'Sabbatical & career reorientation'—so admission boards and visa officers have no grounds for inquiry."
    },
    {
      question: "In what file formats will I receive my finalized CV?",
      answer: "You will receive both:\n1. A high-resolution, vector-formatted PDF formatted to modern ATS and German typography standards, ready for immediate upload to uni-assist and university portals.\n2. An editable Microsoft Word (.docx) source file so you can easily update projects, grades, or contact details in future semesters."
    },
    {
      question: "Can this CV be used for both university applications and Werkstudent / student jobs in Germany?",
      answer: "Yes! The core structure of your Tabellarischer Lebenslauf remains consistent across both academic and employment contexts. We focus heavily on practical laboratory tools, software proficiencies, and industry projects, making the document immediately appealing to German tech recruiters seeking student interns or research assistants (HiWi)."
    },
    {
      question: "Do I need German language skills on my CV if applying for an English-taught program?",
      answer: "Even for 100% English-taught Master's degrees, German faculty and visa consulates love seeing that you have started learning German. Listing 'German: A1 / A2 (In Progress)' on your CV shows cultural adaptability, initiative, and long-term commitment to studying and working in Germany."
    },
    {
      question: "What is the turnaround time and how do revisions work?",
      answer: "Standard Plan: First draft delivered in 2 to 3 working days.\nExpress Plan: First draft delivered within 1 working day (24 hours).\n\nAfter delivery, you can review the document, leave comments or request wording adjustments, and our editors will refine it promptly."
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
              Frequently Asked Questions About German CVs
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
