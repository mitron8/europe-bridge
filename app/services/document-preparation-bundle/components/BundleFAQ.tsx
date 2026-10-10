"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "I have placed the order, now what?",
    a: "Please check your inbox. You will receive three separate emails with links to our structured intake questionnaires (one for the SOP, one for your 2 LORs, and one for your CV) where you can enter your degree background, recommenders' designations, and target university modules."
  },
  {
    q: "How long does the whole process take?",
    a: "Standard Order: First drafts for all 4 documents delivered within 3 to 5 working days. Express Order: Priority queue delivery within 1 to 2 working days (48 hours), with expedited 12-hour turnarounds on revision requests."
  },
  {
    q: "What exactly does the Document Preparation Bundle include?",
    a: "The bundle includes: (1) Standard 2-page course-specific SOP tailored to your target German university; (2) Two distinct Letters of Recommendation (Academic, Professional, or mixed) highlighting your individual achievements; (3) Europass Tabellarischer Lebenslauf (German-standard CV, max 2 pages)."
  },
  {
    q: "Why is ordering the bundle better than ordering documents separately?",
    a: "Two major advantages: First, you save ₹3,997 (over 22% discount) compared to individual pricing. Second, and most importantly, our team writes all documents in sync so that your capstone projects, internship timelines, technical toolsets, and academic goals are 100% harmonized without contradictory dates or claims."
  },
  {
    q: "Can the two LORs be from different professors or employers?",
    a: "Yes. You can configure your two LORs however you prefer: two academic recommendations (e.g. from your Thesis Advisor and HOD), or one academic plus one professional recommendation (e.g. from your university professor and your company manager)."
  },
  {
    q: "Will the documents be 100% plagiarism-free?",
    a: "Absolutely. We enforce a zero-tolerance plagiarism policy. Every document is crafted from scratch based on your individual academic trajectory and verified with Turnitin before delivery."
  },
  {
    q: "How do the student review rounds work?",
    a: "Every document in the bundle includes two full rounds of review. We share the drafts via Google Docs, allowing you to highlight specific phrases, add comments, or request tone adjustments. Our editors incorporate your feedback thoroughly before final export."
  }
];

export const BundleFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 px-6 lg:px-12 max-w-5xl mx-auto scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need to know about the Document Preparation Bundle for German university admissions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="neu-card border border-gray-200 overflow-hidden bg-white transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-germany-black hover:text-germany-red transition-colors cursor-pointer"
                >
                  <span className="font-extrabold pr-2">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-germany-red' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="p-6 bg-red-50/50 rounded-2xl border border-red-200 text-center max-w-xl mx-auto space-y-2">
          <h4 className="text-sm font-black text-germany-black">
            Applying to multiple German universities with different SOP requirements?
          </h4>
          <p className="text-xs text-gray-600 font-medium">
            We offer modular university add-ons so you can adapt your core SOP for secondary university submissions at heavily discounted rates.
          </p>
        </div>
      </div>
    </section>
  );
};
