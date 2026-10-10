"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is the AI better than a traditional agency?",
    answer: "Traditional agencies often use copy-paste templates and partner with specific universities. Our AI analyzes your unique profile to generate custom SOPs and unbiased university matches. But we don't stop there—our human experts review every document before submission to ensure perfection."
  },
  {
    question: "How much does EuropeBridge cost?",
    answer: "You can create an account, use all 35+ calculators, and get your initial university matches completely for free. If you want our experts to handle your applications and visa processing, we offer transparent, flat-fee premium tiers with no hidden charges."
  },
  {
    question: "Do you help with the APS certificate and Visa?",
    answer: "Yes! Our platform features an automated document tracker for both APS and VFS. It tells you exactly what documents you need based on your specific case, and our team double-checks them before you apply to prevent any rejections."
  },
  {
    question: "Which universities do you partner with?",
    answer: "Unlike traditional agencies that push you toward 'partnered' universities to collect a commission, EuropeBridge is completely unbiased. We match you with all public and private German universities based entirely on your academic profile and career goals."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-germany-red/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-germany-gold/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Title & Doodle */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[inset_2px_2px_5px_rgba(71,85,105,0.5),inset_-2px_-2px_5px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Got Questions?
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-6">
            Frequently <br className="hidden md:block" />
            Asked <br className="hidden md:block" />
            Questions
          </h2>
        </div>

        {/* Right Side: Accordion */}
        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="neu-card bg-white rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-display text-lg text-germany-black pr-4">{faq.question}</span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-germany-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-500 font-bold text-sm leading-relaxed border-t border-gray-100 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
