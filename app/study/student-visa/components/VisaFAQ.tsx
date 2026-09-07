"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const VisaFAQ = () => {
  const faqs = [
    {
      q: "I have booked visa support with EuropeBridge. What happens next?",
      a: "Within 24 hours, you will receive an intake form from your assigned EuropeBridge visa counsellor to collect your university admission letter, academic transcripts, and passport details. We will then schedule an onboarding call to initiate your Consular Services Portal (CSP) profile and draft your documents."
    },
    {
      q: "Do I still need to attend a physical appointment at VFS if I apply through CSP?",
      a: "Yes. While the Consular Services Portal (CSP) handles the initial digital document audit and preliminary verification remotely, you must attend an in-person appointment at your designated VFS Global Visa Application Centre for biometric fingerprinting, iris scanning, and physical passport handover."
    },
    {
      q: "How long does the entire German student visa process take in 2026?",
      a: "• Initial setup & document audit: 1–2 working days post consultation.\n• Digital CSP filing & VIDEX generation: 3–5 working days.\n• VFS appointment slot availability: Typically 1–3 weeks depending on jurisdiction.\n• German Embassy decision & passport delivery: 4–6 weeks via CSP (or 6–8 weeks during peak July/August intake)."
    },
    {
      q: "Can I use EuropeBridge's visa service if I have already started filing?",
      a: "Yes. Whether you only need a second-pair-of-eyes document audit, help resolving a CSP preliminary correction email, urgent VFS slot monitoring, or mock interview preparation, we tailor our assistance to your current stage."
    },
    {
      q: "Is the €11,904 Blocked Account mandatory before my VFS appointment?",
      a: "Yes, absolutely. The German Federal Foreign Office mandates the official '06 Confirmation' (financial confirmation letter) proving €11,904 (€992/month for 12 months) before your application can be processed by the embassy. EuropeBridge assists in opening your account within 24 hours with partner providers like Expatrio or Fintiba."
    },
    {
      q: "Can I work in Germany while on a Student Visa?",
      a: "Yes. Under Germany's updated Skilled Immigration Act, international students on a National Visa D are legally permitted to work up to 140 full days or 280 half days per calendar year, enabling you to earn between €1,000 and €1,600 per month."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="section-faq" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-display text-germany-black flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
          <HelpCircle className="w-6 h-6 text-germany-red" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`neu-card p-5 bg-white space-y-3 cursor-pointer select-none transition-all shadow-xs border ${
                  isOpen ? 'border-germany-red/30 ring-1 ring-germany-red/10' : 'border-[#EBE7E0]/60 hover:border-gray-300'
                }`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100/70 text-germany-red shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-germany-black leading-snug">{faq.q}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-germany-red" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-[#EBE7E0]/60 pt-3 mt-1 whitespace-pre-line">
                        {faq.a}
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
