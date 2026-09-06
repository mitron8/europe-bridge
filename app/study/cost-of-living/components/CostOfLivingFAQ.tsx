"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CostOfLivingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much money do I need per month as a student in Germany?",
      answer: "The German government sets the mandatory blocked account baseline at €992/month (€11,904/year), which is realistic for basic living. In affordable cities like Leipzig, Chemnitz, or Magdeburg, you can live comfortably on €750–€950/month. In Munich or Frankfurt, expect €1,200–€1,500/month. The nationwide average across all international students is €900–€1,300/month."
    },
    {
      question: "Is Munich really that expensive compared to other university cities?",
      answer: "Yes, Munich is Germany's most expensive student city. A room in a shared apartment costs €550–€750/month compared to €280–€380 in Leipzig. However, Munich also offers higher working student hourly wages (€15–€20/hr) at global corporate headquarters (BMW, Siemens, Allianz, TUM/LMU spin-offs)."
    },
    {
      question: "What is the Deutschlandticket and is it worth it for students?",
      answer: "The Deutschlandticket costs €63/month and provides unlimited access to all local buses, trams, subways, commuter rail, and regional trains across the ENTIRE country of Germany. For students, it is an incredible deal because standard single-city monthly passes often cost over €80. Most public universities include this ticket directly in the mandatory student semester contribution."
    },
    {
      question: "Can I survive strictly on the blocked account monthly payout (€992/mo)?",
      answer: "Yes, €992/month is sufficient to cover rent, groceries, health insurance, and public transport in budget and mid-range cities (like Leipzig, Dresden, Aachen, Bremen, or Magdeburg). In expensive cities like Munich or Frankfurt, you will likely need supplementary income from a part-time student job (working student role or mini-job)."
    },
    {
      question: "How much does public health insurance cost for students in 2026?",
      answer: "Statutory public health insurance (e.g., TK, Barmer, AOK) for students under 30 costs approximately €141–€146 per month (inclusive of long-term nursing care insurance). It covers all doctor visits, hospital treatments, emergency care, and prescription medication with no hidden deductibles."
    },
    {
      question: "What are the cheapest university cities in Germany?",
      answer: "The most affordable university cities are primarily located in eastern and central Germany: Chemnitz, Leipzig, Magdeburg, Greifswald, Jena, Ilmenau, and Siegen. Monthly living costs in these cities range from €700 to €950, with shared flat room rents under €350/mo."
    }
  ];

  return (
    <section id="section-faq" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            07
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Common Questions</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Frequently Asked Questions
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
