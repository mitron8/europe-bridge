"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlockedAccountFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a German blocked account?",
      answer: "A blocked account is a mandatory financial proof required by German immigration law for international student visas. It proves that you have sufficient funds to cover your living expenses in Germany for one academic year (€11,904 total / €992 per month)."
    },
    {
      question: "Can I use the blocked account directly to pay monthly rent or buy groceries?",
      answer: "No. You cannot pay expenses directly from the blocked account itself. Once you arrive in Germany and complete your city address registration, your blocked account automatically transfers your €992 monthly allowance into your local personal German checking account, from which you pay rent and daily bills."
    },
    {
      question: "Do I have to pay administration banking fees separately?",
      answer: "No. All official account setup and administrative service fees are transparently included in the total upfront transfer calculation. There are no additional or hidden transfers required."
    },
    {
      question: "What happens to my money if my visa application is delayed or rejected?",
      answer: "Your money is 100% safe. In the unlikely event of a visa rejection or enrollment cancellation, submitting an official embassy rejection letter or university withdrawal notice triggers a full 100% refund of your deposited funds back to your original bank account."
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
              Blocked Account FAQs
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
