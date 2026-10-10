"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DmatFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I even need to take the dMAT?",
      answer: "Maybe not! Run our free dMAT eligibility check above first. If you hold a 4-year B.Tech/B.E. degree from a recognized Indian university, standard APS document verification generally applies without dMAT. If you hold a 3-year Bachelor's degree (B.Sc, BCA, B.Com, BBA) applying for Master's programs starting Summer Semester 2027, dMAT is mandatory. If you don't need it, we'll tell you honestly and save your money."
    },
    {
      question: "What exactly do you do for the ₹1,999 service fee?",
      answer: "We handle your complete candidate profile setup on the official g.a.s.t. portal, secure a seat at your preferred test centre in India before city slots fill up, track all countdown deadlines, provide official preparation materials with worked mock test solutions, guide you through linking the dMAT result to your APS application, and offer a 1:1 call with a counselor."
    },
    {
      question: "Is the 150 EUR exam fee included in the ₹1,999 fee?",
      answer: "No. The 150 EUR dMAT examination fee is charged directly by the exam authority (g.a.s.t. / TestDaF Institute in Germany). You pay this official test fee directly to g.a.s.t. during registration using a credit card/forex card. We do not collect or markup this fee."
    },
    {
      question: "What is your refund policy?",
      answer: "If we do not get you officially registered for the dMAT before the deadline, you get an immediate 100% full refund of our ₹1,999 service fee. Our guarantee covers our work securing your registration on time. Please note that test scores, university admission, and visa decisions depend on your academic performance."
    },
    {
      question: "Is the dMAT a pass or fail examination?",
      answer: "No. The dMAT is not a pass-or-fail test. It provides a standardized percentile and score report reflecting your general academic problem-solving, cognitive reasoning, and quantitative abilities. German universities and APS evaluate your score alongside your undergraduate academic marksheet."
    },
    {
      question: "Which module do Indian Master's applicants sit for?",
      answer: "Indian applicants sit for the General Academic Module (administered entirely in English on computer terminals at designated test centres). It tests quantitative problem solving, formal relationships, and cognitive text analysis."
    },
    {
      question: "Where are the test centres located in India?",
      answer: "The dMAT is conducted across 10 major test hubs in India: Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad, Chandigarh, and Kochi. Because test dates are synchronized, high-demand centres fill up quickly."
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
              Straight Answers Before You Decide
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
