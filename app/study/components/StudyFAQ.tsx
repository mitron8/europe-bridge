"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface StudyFAQProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export const StudyFAQ: React.FC<StudyFAQProps> = ({
  id = "section-faq",
  badge = "Got Questions?",
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about requirements, timelines, and next steps.",
  faqs
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="scroll-mt-32 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full font-bold text-germany-red shadow-[2px_2px_8px_rgba(71,85,105,0.08)] text-xs mb-3 cursor-default">
          <HelpCircle className="w-3.5 h-3.5 text-germany-red" />
          <span>{badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-germany-black tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl mx-auto mt-2.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Accordion List */}
      <div className="space-y-3 max-w-3xl mx-auto w-full">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200 hover:border-gray-300"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between text-left focus:outline-none gap-4"
              >
                <span className="font-display font-bold text-sm sm:text-base text-germany-black leading-snug">
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-germany-red text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed border-t border-gray-100 mt-1 whitespace-pre-line">
                      {faq.a}
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
