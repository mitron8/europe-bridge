"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "Can international students really get fully-funded scholarships in Germany?",
    answer: "Yes, absolutely. Prestigious programs like DAAD EPOS, DAAD Helmut-Schmidt, and Erasmus Mundus offer complete funding. This includes a monthly living stipend of ~€992 to €1,400, statutory health insurance coverage, international flight subsidies, and research allowances. However, these are highly merit-based and competitive, typically requiring an academic score in the top 10–20% and early preparation.",
    category: "Funding"
  },
  {
    question: "Do I need university admission before applying for a scholarship?",
    answer: "It depends on the scholarship. For the Deutschlandstipendium and university-specific grants (such as STIBET), you must either have received an offer of admission or be already enrolled. However, for central DAAD scholarships (like EPOS or Helmut-Schmidt), you apply 10 to 12 months in advance directly through the scholarship channel or to the designated Master's program, which coordinates both your admission and scholarship simultaneously.",
    category: "Applications"
  },
  {
    question: "How does the Deutschlandstipendium work and what are the chances?",
    answer: "The Deutschlandstipendium grants €300/month for at least 1 year (2 semesters). Half is paid by the German federal government and half by private corporate sponsors (such as BMW, Siemens, SAP). It has no nationality quotas. Selection committees evaluate academic excellence (GPA), social or community engagement (volunteering, student clubs), and personal challenges overcome (such as first-generation university students). Over 30,000 students in Germany hold this grant.",
    category: "Deutschlandstipendium"
  },
  {
    question: "When should I begin applying for German scholarships?",
    answer: "The ideal timeline is 12 to 18 months before your target semester begins. Many major DAAD programs and political foundation grants close their application portals between July and October of the previous year for an autumn (Winter semester) start. If you wait until you receive university admission in June/July, most major national scholarship deadlines will have already passed for that intake.",
    category: "Deadlines"
  },
  {
    question: "Can I work a part-time student job while receiving a scholarship?",
    answer: "For most scholarships like the Deutschlandstipendium, you are completely allowed to work as a working student or student assistant without any reduction in your grant. For fully-funded DAAD scholarships, you are permitted to work only if your supervisor/host institution approves and if your monthly earnings do not exceed the German mini-job threshold (currently €538 to €603/month). Any earnings above that limit may be deducted from your DAAD stipend.",
    category: "Working"
  },
  {
    question: "Are scholarship stipends taxed in Germany?",
    answer: "In almost all cases, pure academic scholarships and research stipends (like DAAD and Deutschlandstipendium) are exempt from German income tax under the German Income Tax Act, provided they do not require you to provide a counter-service (like mandatory commercial labor) and are intended to cover your cost of living and scientific advancement.",
    category: "Tax"
  },
  {
    question: "What minimum GPA is needed to win a German scholarship?",
    answer: "For fully-funded DAAD or Erasmus grants, a German equivalent grade of 1.0 to 1.9 (typically > 78% or 8.0+ CGPA) is strongly recommended. For the Deutschlandstipendium and foundation grants, candidates with German GPAs between 2.0 and 2.5 can still succeed if they possess compelling social commitment, leadership roles, or strong research and publications.",
    category: "Eligibility"
  },
  {
    question: "What if I don't win any scholarship? Can I still afford to study in Germany?",
    answer: "Yes, definitely! Unlike the US or UK, German public universities do not charge tuition fees (except for a nominal semester contribution of €150–€350). You only need to fund your living expenses (€900–€1,100/month). International students can legally work up to 140 full days per year. A part-time working student role paying €15–€20/hr enables you to earn €1,100–€1,600/month, making you completely financially self-sufficient.",
    category: "General"
  }
];

export const ScholarshipsFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="scholarships-faq" className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Everything you need to know about scholarship rules, eligibility thresholds, and funding life in Germany.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="neu-card p-5 sm:p-6 transition-all duration-200 cursor-pointer"
                onClick={() => toggleAccordion(idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-black text-germany-black flex items-center gap-2">
                    <span className="text-germany-red text-xs font-extrabold px-2 py-0.5 rounded bg-red-100/60 shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-gray-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-germany-red" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 mt-4">
                        {faq.answer}
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
