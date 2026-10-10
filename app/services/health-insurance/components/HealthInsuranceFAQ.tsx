"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HealthInsuranceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is health insurance legally mandatory in Germany?",
      answer: "Yes, 100% mandatory. Under German federal law (§ 5 SGB V), every person residing in Germany—including international students, researchers, and workers—must have comprehensive, compliant health insurance coverage. German universities will not finalize your matriculation without digital proof of insurance, and German embassies will not issue your student visa without it."
    },
    {
      question: "What is the difference between statutory public (GKV) and private (PKV) health insurance?",
      answer: "Public health insurance (Gesetzliche Krankenversicherung - GKV, like TK, Barmer, AOK) is a statutory social security system offering standard universal coverage. For degree students under 30, it features a government-fixed flat rate (~€140–€150/mo), covers pre-existing conditions without extra charge, provides free family insurance, and bills doctors directly with zero out-of-pocket costs. Private health insurance (PKV) calculates premiums based on age and health status; it is primarily beneficial for students aged 30+, PhD researchers, or preparatory language students who cannot enroll in public GKV."
    },
    {
      question: "How much does student health insurance cost in 2026/2027?",
      answer: "For degree students under 30 years old, statutory public insurance costs approximately €140 to €150 per month. This statutory contribution consists of basic health insurance, long-term care insurance (Pflegeversicherung), and the fund's specific supplementary contribution (Zusatzbeitrag). Premiums are only deducted once your semester begins and after you arrive in Germany."
    },
    {
      question: "What is the electronic M10 certificate and how is it sent to my university?",
      answer: "The M10 is an electronic reporting notification between German health insurance funds and German higher education institutions. German universities no longer accept paper insurance slips or PDF attachments. Once you enroll with TK, Barmer, or AOK through EuropeBridge, the insurer transmits the M10 notification digitally into the university's central registrar portal, automatically lifting your registration hold."
    },
    {
      question: "What if I am 30 years old or older when starting my studies?",
      answer: "Once a student turns 30, statutory public health insurance transitions to 'voluntary insurance' (Freiwillige Versicherung), with monthly contributions rising to ~€240–€260/month. At this stage, many international students choose to switch to accredited private student health insurance (such as Ottonova or specialized expat student policies), which cost approximately €95 to €160/month while fulfilling all visa requirements."
    },
    {
      question: "Can I use Indian travel insurance to enroll in a German university?",
      answer: "No. Standard travel insurance policies purchased in India (or elsewhere outside the EU) are strictly invalid for German university matriculation. While private travel insurance may be accepted for your initial 90-day entry visa, German universities legally require either proof of German statutory public coverage or an official German waiver certificate (Befreiung von der Versicherungspflicht)."
    },
    {
      question: "What is free incoming travel insurance?",
      answer: "When you set up your statutory health insurance through EuropeBridge, you receive free incoming travel health insurance (valid for up to 180 days). This protects you from the moment your flight takes off and covers your initial weeks in Germany before your official university semester start date begins."
    },
    {
      question: "Are doctor visits and prescriptions completely cashless in Germany?",
      answer: "Under statutory public health insurance (TK, Barmer, AOK), yes! You receive an electronic health card (eGK) with a microchip. Whenever you visit a doctor, clinic, or hospital, you simply swipe your card. The healthcare provider bills the insurance company directly—you pay €0 out-of-pocket for standard consultations, hospital care, and routine checkups."
    }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-black shrink-0 shadow-inner">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Health Insurance FAQs
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
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 bg-red-50/20">
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
