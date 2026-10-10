"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VisaFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "I have placed the order. Now what happens next?",
      answer: "You will receive an automated welcome email with a link to our secure Visa Intake Questionnaire. Here you can upload your university admission letter, APS certificate, and passport copy. Your assigned senior visa counselor will review your documents and contact you within 24 hours to begin your CSP portal registration."
    },
    {
      question: "Do I still need to go to VFS in person if applying through the CSP portal?",
      answer: "Yes. While the Consular Services Portal (CSP) handles the initial digital application, document upload, and preliminary consular verification, German law requires all applicants to attend an in-person appointment at VFS Global for biometric data collection (fingerprints and digital photo) and original document verification."
    },
    {
      question: "How long does the entire German student visa process take?",
      answer: "• Initial setup & dossier prep: 1–2 working days post consultation.\n• Total digital process (CSP filing + VFS booking): 3–5 working days (once documents are ready).\n• Embassy/Consulate processing: 4 to 8 weeks on average (depending on peak intake rush and Ausländerbehörde clearance).\n• Post-appointment passport dispatch: Typically 2 to 4 weeks after your VFS appointment."
    },
    {
      question: "What is the difference between the Premium Plan (₹14,999) and the Complete Plan (₹19,999)?",
      answer: "The Premium Plan covers end-to-end procedural support: CSP portal registration, VIDEX form filing, document checklist audit, VFS appointment booking, and 1:1 visa interview coaching.\n\nThe Complete Plan includes EVERYTHING in Premium PLUS professional custom drafting of your Letter of Motivation (LOM) and Visa Cover Letter tailored to your specific university curriculum and regional consulate, along with priority consultant access."
    },
    {
      question: "Can I use this service if I've already started the CSP process?",
      answer: "Absolutely! If you've already created an account on the CSP portal, received correction emails from the embassy, or got stuck on the VIDEX form, we can audit your existing application, resolve all queries, and take over the appointment booking and interview preparation."
    },
    {
      question: "Which VFS center or German Consulate should I apply to (Jurisdiction rule)?",
      answer: "Under German consular rules, your application must be submitted to the German mission corresponding to where you have had your habitual residence for the past 6 months (supported by your Aadhaar card or registered rent agreement). We determine your exact jurisdiction (Delhi, Mumbai, Bengaluru, Chennai, or Kolkata) and book the corresponding VFS center."
    },
    {
      question: "What happens if the German Embassy requests additional documents?",
      answer: "If the embassy or local German foreigners' registration office (Ausländerbehörde) issues an email request for additional documents (Zusatzdokumente) or clarification regarding your funds or study timeline, our visa experts directly draft the response and prepare the supplemental documentation to ensure seamless clearance."
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28" id="faq">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-germany-red flex items-center justify-center font-black shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Got Questions?</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Frequently Asked Questions About German Visas
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
                  className="w-full p-5 text-left font-extrabold text-germany-black text-base flex justify-between items-center gap-4 hover:text-germany-red transition-colors cursor-pointer"
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
