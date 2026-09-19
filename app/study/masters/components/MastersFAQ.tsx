"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircleQuestion, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  category: string;
  answer: string | React.ReactNode;
}

export const MastersFAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Admissions & Eligibility', 'APS & Visas', 'Tuition & Living', 'Post-Study Career'];

  const faqs: FAQItem[] = [
    {
      category: 'Tuition & Living',
      question: "Are Master's degrees in Germany truly tuition-free for international students?",
      answer: "Yes, at almost all public universities across 15 of Germany's 16 federal states, tuition is completely 0€ regardless of your nationality. You only pay a mandatory semester fee (Semesterbeitrag) of €150 to €350 per semester, which includes a regional public transportation ticket and administrative student union services. The state of Baden-Württemberg charges €1,500/semester for non-EU students, and TUM introduced international fees for select new enrollees; all other states remain 100% free."
    },
    {
      category: 'Admissions & Eligibility',
      question: "Is my 3-year Bachelor's degree (B.Sc, BCA, B.Com, BBA) accepted for German Master's programs?",
      answer: "Yes, many German universities and Universities of Applied Sciences (UAS) accept 3-year undergraduate degrees from H+ rated universities on anabin if you have accumulated 180 ECTS credits. However, research universities (TU9) requiring 210 or 240 ECTS may ask you to complete bridging modules (Auflagen) or suggest 1-year postgraduate diplomas (e.g., M.Sc Part 1) to bridge the 30-credit gap."
    },
    {
      category: 'Admissions & Eligibility',
      question: "Can I change my field of study for a Master's in Germany (e.g., Mechanical to Computer Science)?",
      answer: "German public master's degrees are consecutive ('konsekutiv'), meaning your undergraduate degree must be directly related to the master's curriculum. Admission committees calculate exact ECTS prerequisites (e.g., 25 ECTS in Higher Mathematics, 30 ECTS in Algorithms and Data Structures). If your transcript lacks required foundational credits, admission is legally restricted. Interdisciplinary conversion programs (like Computational Mechanics or Data Engineering) offer the best pathway if switching."
    },
    {
      category: 'Admissions & Eligibility',
      question: "What German GPA do I need for top universities like TUM, RWTH Aachen, or KIT?",
      answer: "Using the modified Bavarian formula, a German GPA between 1.0 (very best) and 2.5 is competitive for public master's programs. For highly selective programs at TU9 universities, a GPA of 2.0 or better (approximately 75%+ or 8.0/10 CGPA depending on your university's grading scale) is typically recommended."
    },
    {
      category: 'Admissions & Eligibility',
      question: "Do I need to learn German if my master's degree is taught 100% in English?",
      answer: "For admission to 100% English-taught master's degrees, German proficiency is officially optional (or only basic A1 is requested by some universities for enrollment). However, learning German to at least B1/B2 level is essential for daily living, securing high-paying Werkstudent internships in industry, and qualifying for the 21-month fast-track Permanent Residency after graduation."
    },
    {
      category: 'APS & Visas',
      question: "What is the APS Certificate and why is it mandatory?",
      answer: "The Akademische Prüfstelle (APS) certificate is an authenticity verification issued by the German Embassy's science department (mandatory for applicants from India, China, and Vietnam). It verifies your educational documents directly with your university before you apply for university admission or submit your student visa application. It takes 4 to 8 weeks to process, so apply early."
    },
    {
      category: 'Tuition & Living',
      question: "How much money must be deposited into the Blocked Account for 2026?",
      answer: "The statutory German student visa requirement is €992 per month, amounting to €11,904 per year deposited into an authorized blocked account (Sperrkonto). Upon arriving in Germany and registering your residential address, you will receive €992 disbursed automatically every month into your German current account for living expenses."
    },
    {
      category: 'Tuition & Living',
      question: "How many hours can I work part-time while studying in Germany?",
      answer: "Under Germany's updated immigration laws, international non-EU students can work up to 140 full days (shifts longer than 4 hours) or 280 half days (up to 4 hours) per calendar year. Alternatively, students can work up to 20 hours per week during semester periods under a 'Werkstudent' contract, earning an average of €15 to €24 per hour with significant tax and social contribution exemptions."
    },
    {
      category: 'Post-Study Career',
      question: "How long can I stay in Germany after graduating with a Master's degree?",
      answer: "Immediately upon finishing your thesis, you receive an 18-month Job Seeker Visa (§20 AufenthG) with completely unrestricted work rights. You can take any job or contract while searching for full-time employment corresponding to your academic qualification."
    },
    {
      category: 'Post-Study Career',
      question: "How quickly can I qualify for Permanent Residency (PR) and German Citizenship?",
      answer: "German university graduates holding an EU Blue Card can apply for Permanent Residency (Niederlassungserlaubnis) in just 21 months with B1 German proficiency (or 27 months with basic German). Furthermore, Germany's reformed naturalization law allows graduates to apply for German citizenship after 5 years of legal residence, and dual citizenship is now recognized."
    }
  ];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faqs" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2.5 sm:space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-[11px] sm:text-xs font-black uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Clear &amp; Transparent Guidance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          Frequently Asked Questions About <span className="text-germany-red">Master&apos;s in Germany</span>
        </h2>
        <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
          Answers backed by German federal legislation, Hochschulrahmengesetz, and EuropeBridge mentor insights.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar px-1 -mx-2 sm:mx-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIdx(0);
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-germany-black text-white shadow-sm'
                : 'bg-white border border-gray-200/80 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`neu-card bg-white transition-all duration-200 border ${
                isOpen ? 'border-germany-red/30 shadow-md ring-1 ring-germany-red/10' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-3.5 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-red-50 text-germany-red' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <MessageCircleQuestion className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-0.5 sm:mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-lg text-germany-black leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? 'bg-germany-red text-white rotate-180' : 'bg-gray-100 text-gray-600'
                }`}>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 mt-1 pl-4 sm:pl-14">
                  <div className="pt-3 sm:pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Have more questions? */}
      <div className="text-center pt-4">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Have a specific query about your degree or university eligibility?{" "}
          <Link href="/tools/admission-chance" className="text-germany-red font-bold hover:underline">
            Check your profile with our free AI tool &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
};
