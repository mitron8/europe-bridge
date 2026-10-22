"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Who should enroll in an EuropeBridge admission package?",
    answer: "Our admission packages are engineered for prospective Master's and Bachelor's applicants targeting public German universities. Whether you are a final-year undergraduate, a working professional transitioning to European tech/engineering, or a 12th-standard high school student targeting Studienkolleg, our packages provide strategic university shortlisting, ECTS alignment, professional documentation, and student visa concierge guidance."
  },
  {
    question: "What are the exact details of the Basic Package (₹29,999)?",
    answer: "The Basic Package supports up to 3 university applications and includes complete professional document crafting: 1 course-specific Statement of Purpose (SOP), 2 Letters of Recommendation (LORs), and 1 German Europass Tabellarischer CV. You also receive comprehensive visa guidelines, blocked account setup, and live dashboard tracking for 1 academic intake."
  },
  {
    question: "Why is the Standard Package (₹49,999) our most popular choice?",
    answer: "The Standard Package covers up to 10 university applications across TU9 and leading public research institutions. You are assigned a dedicated 1-on-1 personal counsellor who conducts in-depth ECTS prerequisite mapping, guides your APS verification paperwork, assists with dMAT exam prep, and conducts a 1-on-1 mock visa interview before your VFS biometrics. Validity: 1 intake."
  },
  {
    question: "How does the Admission Guarantee* in the Premium Package work?",
    answer: "The Premium Package (₹1,19,999) comes with a contractual Admission Guarantee covering 2 consecutive academic intakes (e.g. Winter 2026 and Summer 2027) with unlimited university applications. You receive VIP Concierge handling, complete Consular Services Portal (CSP) visa filing, and dedicated VFS visa slot booking. *If you receive no admission offer from any recommended university after applying across two consecutive intakes, a ₹40,000 refund is provided per the guarantee agreement terms."
  },
  {
    question: "What is included in the Bachelor's Package (₹29,999)?",
    answer: "The Bachelor's package is custom-designed for 12th-standard students from CBSE, ICSE, State Boards, or IB. It includes HZB recognition analysis, VPD verification, up to 5 university or Studienkolleg applications, Aufnahmeprüfung entrance exam guidance, full SOP/LOR/CV documentation, and student visa filing."
  },
  {
    question: "Do your packages include custom SOP, LOR, and CV writing from scratch?",
    answer: "Yes, absolutely! We do not use generic AI templates. Our senior admissions editors conduct a detailed intake questionnaire and 1-on-1 interview with you to draft your SOP, 2 LORs, and Europass CV tailored specifically to the research focus, faculty profiles, and ECTS requirements of your target German departments."
  },
  {
    question: "Are there any additional or hidden fees involved?",
    answer: "Our packages cover EuropeBridge's complete counselling and documentation services with zero commissions taken from universities. Third-party statutory fees are paid directly by the student to the respective German authorities: the APS verification fee (₹18,000), uni-assist processing (€75 for the first university, €30 for each subsequent), courier charges, and the German national visa consular fee (€75)."
  },
  {
    question: "Can I pay the package fee in installments?",
    answer: "Yes! We offer flexible milestone payments (50% upfront at onboarding and 50% upon delivery of your document drafts and shortlisting completion), as well as no-cost EMI options through major Indian credit/debit cards."
  },
  {
    question: "When is the best time to enroll for Winter 2026 or Summer 2027?",
    answer: "Because German APS verification currently takes between 4 to 8 weeks, and public university deadlines typically close between May 15 and July 15 for Winter intakes (and Nov 15 to Jan 15 for Summer intakes), students should ideally enroll 5 to 7 months in advance of their target semester start."
  }
];

export const PricingFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  return (
    <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9e2a2b] bg-[#9e2a2b]/10 px-3.5 py-1 rounded-full border border-[#9e2a2b]/20 inline-block">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#5e5b54]">
          Everything you need to know about our admission packages, guarantee terms, and payment plans.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className="rounded-2xl border border-[#e5e0d3] bg-white overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#faf8f3] transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-[#16161a]">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-[#787369] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#9e2a2b]' : ''
                  }`} 
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5e5b54] leading-relaxed border-t border-[#ece7dd]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
