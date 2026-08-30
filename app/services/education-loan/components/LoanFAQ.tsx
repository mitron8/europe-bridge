"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoanFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why should I get a loan sanction before university admission?",
      answer: "Getting a pre-admission conditional sanction letter eliminates last-minute financial stress. You know your exact loan eligibility in advance, allowing you to apply to top German universities with total financial confidence. Additionally, sanction letters are widely preferred by German embassies over basic solvency letters."
    },
    {
      question: "Can I avail the education loan for both tuition fees and living expenses?",
      answer: "Yes! Education loans for Germany cover up to 100% of your total cost of education—including tuition fees, mandatory blocked account deposits (€11,904/yr), living expenses, books, and flight travel tickets."
    },
    {
      question: "Do I need to be admitted to a university before applying for a loan?",
      answer: "No. You can apply for an education loan before receiving your formal admission letter. If approved, you receive a conditional loan sanction letter, which helps you plan your finances early."
    },
    {
      question: "How much loan amount can I get for studying in Germany?",
      answer: "Lenders finance up to 100% of your education costs, including unsecured and secured loans extending over ₹20 Lakhs to ₹60 Lakhs depending on your academic background, target program, and co-applicant profile."
    },
    {
      question: "What is the processing timeframe for loan sanction and disbursement?",
      answer: "The in-principle sanction letter is typically issued within 7 to 10 working days after submitting a complete application. Final loan disbursement completes within 7 days after post-sanction document verification."
    },
    {
      question: "What documents are required for the education loan application?",
      answer: "Completed application form, passport photos, photo ID & address proof, academic marksheets & degree certificates, entrance test scores (GRE/IELTS if applicable), university admission letter (or draft), bank statements, and co-applicant income proof (ITR / salary slips)."
    },
    {
      question: "What factors are evaluated during loan approval?",
      answer: "Approval is evaluated based on: 1) Student's academic history, 2) Recognized German university & course type, 3) Co-borrower credit profile & income proof, 4) Collateral assets (if applicable)."
    },
    {
      question: "Does prior work experience help in loan approval?",
      answer: "Yes! Relevant professional work experience strengthens your academic profile, increases your credit score rating, and often qualifies you for preferential interest rates."
    }
  ];

  return (
    <section className="py-10 px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-black shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Education Loan FAQs
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition-all shadow-sm"
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
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 bg-red-50/20">
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
