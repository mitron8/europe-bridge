"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const InsuranceFAQ = () => {
  const faqs = [
    {
      q: "Is health insurance mandatory in Germany?",
      a: "Yes, health insurance is legally mandatory for everyone residing in Germany, including international students, researchers, workers, and their dependents. You cannot obtain a German Student Visa or complete your university enrollment (Immatrikulation) without verified proof of statutory or recognized private coverage."
    },
    {
      q: "What's the difference between public and private health insurance in Germany?",
      a: "Public health insurance (Gesetzliche Krankenversicherung - GKV) is a statutory system with standardized comprehensive coverage. Student rates are legally capped at ~€140 to €150/month (2026), and claims are billed directly via an electronic health card without cash out-of-pocket.\n\nPrivate health insurance (Private Krankenversicherung - PKV) bases premiums on individual age, health history, and selected deductible. It is typically utilized by students over 30, PhD candidates, or preparatory language learners ineligible for statutory student status."
    },
    {
      q: "Which public insurance providers are recommended for international students?",
      a: "TK (Techniker Krankenkasse), Barmer, and AOK are the most popular choices. TK is especially renowned among international students for its fully English digital mobile app, 24/7 English telephone support, and dental prophylaxis subsidies. All statutory Krankenkassen provide the same core statutory medical benefits by federal law."
    },
    {
      q: "Can I switch between public and private health insurance?",
      a: "Switching from private to public insurance is strictly regulated and virtually impossible during your degree if you opted out at enrollment. If you begin in the statutory public system as a student under 30, you can transition into public employee health insurance or private insurance upon graduation once your annual salary exceeds the statutory threshold (€73,800 in 2026)."
    },
    {
      q: "How much does health insurance cost for students in Germany?",
      a: "For statutory public insurance (TK, Barmer, AOK), enrolled students under 30 pay approximately €140 to €150 per month in 2026 (including statutory long-term care insurance / Pflegeversicherung). For students aged 30 and older, rates transition to voluntary public contributions (~€230–€250/mo) or specialized private student plans starting from €85–€140/mo."
    },
    {
      q: "What is the M10 notification and how is it sent to my German university?",
      a: "The M10 (Meldegrund 10) is a digital electronic certificate transmitted directly between statutory health insurers and German university registrar databases. German universities no longer accept paper insurance slips. When you register with EuropeBridge, your insurer transmits this electronic verification automatically to your university."
    },
    {
      q: "Am I covered between my flight landing in Germany and semester start?",
      a: "Regular statutory student insurance only activates on the official first day of the semester (usually October 1 for Winter Semester or April 1 for Summer Semester). When you sign up for statutory public insurance via EuropeBridge, you receive complimentary incoming travel health insurance (up to 92 days) covering your transit and early arrival."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="section-faq" className="scroll-mt-36 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Frequently Asked <span className="text-germany-red">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Clear answers regarding German healthcare regulations, premiums, and university registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-5xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`neu-card p-5 bg-white space-y-3 cursor-pointer select-none transition-all shadow-xs border ${
                  isOpen ? 'border-germany-red/40 ring-1 ring-germany-red/10' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-extrabold text-xs sm:text-sm text-germany-black leading-snug">
                    {faq.q}
                  </h3>
                  <div className="text-gray-400 shrink-0 mt-0.5">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-germany-red" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-3 whitespace-pre-line">
                        {faq.a}
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
