"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const LikelihoodFAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How accurate is this admission chance fit score?",
      a: "Our model normalizes your CGPA onto the modified Bavarian 1.0–4.0 scale and benchmarks your language scores, work experience, and GRE credentials against historical cutoffs from 300+ public German Master's programs."
    },
    {
      q: "Why don't German universities publish official acceptance rates?",
      a: "German public universities do not use holistic admission committees or US-style overall acceptance percentages. Instead, admission is strictly rule-based: if you meet the prerequisite ECTS credits and GPA cutoff for Non-NC courses, you are automatically accepted."
    },
    {
      q: "What is the difference between NC and Non-NC programs?",
      a: "NC (Numerus Clausus) programs have fixed seat quotas and rank applicants strictly by GPA. Non-NC programs have no seat limit—anyone meeting the minimum entry prerequisites is admitted."
    },
    {
      q: "Can work experience compensate for a lower undergraduate CGPA?",
      a: "Yes! 2+ years of relevant industry experience or published research papers can add bonus points in the ranking formula at top universities like TU Munich and RWTH Aachen."
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold shrink-0 shadow-sm">
              <HelpCircle className="w-6 h-6 text-germany-black" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Frequently Asked Questions</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Understanding German Admission Rules</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Common questions about German university entry criteria and profile evaluation.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/match.png" 
            alt="Match Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="neu-card p-5 cursor-pointer transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-extrabold text-germany-black">{faq.q}</h3>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIdx === idx ? 'rotate-180 text-germany-red' : ''}`} />
              </div>
              {openIdx === idx && (
                <p className="text-xs text-gray-600 font-medium mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
