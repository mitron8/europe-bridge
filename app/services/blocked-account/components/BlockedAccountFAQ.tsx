"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlockedAccountFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a German blocked account (Sperrkonto)?",
      answer: "A German blocked account (Sperrkonto) is a legally required proof of financial resources (Finanzierungsnachweis) under Section 16b of the German Residence Act (AufenthG). It demonstrates to the German Embassy, VFS Global, and German Foreigners' Registration Office (Ausländerbehörde) that you have adequate funds to support your living costs in Germany for one full academic year without relying on state benefits."
    },
    {
      question: "What is the official statutory blocked amount for 2026/2027?",
      answer: "The statutory minimum required by the German Federal Foreign Office (Auswärtiges Amt) for university students is €11,904 per year (€992 per month). For Opportunity Card (Chancenkarte) applicants, the monthly baseline is €1,027 per month."
    },
    {
      question: "Can I use the blocked account directly to pay monthly rent or buy groceries?",
      answer: "No. The blocked account is a specialized fiduciary escrow account that does not support direct debit, card swipes, or merchant transfers. Once you arrive in Germany and register your city residence (Anmeldung), your blocked account automatically transfers your €992 monthly allowance into your local personal German checking account (Girokonto, such as N26, DKB, or Aion Bank), which comes with a standard debit card for rent and daily expenses."
    },
    {
      question: "What happens to my deposited funds if my visa application is declined?",
      answer: "Your money is 100% safe and protected under German banking regulations. In the unfortunate event of a visa rejection or university admission withdrawal, you simply upload the official rejection letter from the German Embassy or VFS. The provider will promptly refund the entire deposited capital back to the originating bank account in India."
    },
    {
      question: "Which provider is best: Expatrio, Coracle, or Fintiba?",
      answer: "Expatrio is currently the most popular choice for Indian students due to its Value Package (which waives the €49 setup fee and offers up to €247 cashback with Techniker Krankenkasse health insurance). Coracle is ideal for students who want zero monthly fees (€0/month). Fintiba is backed by traditional German private bank Sutor Bank in Hamburg. EuropeBridge counselors help you choose the best provider based on your specific intake timeline and financial setup."
    },
    {
      question: "What is the €100 buffer amount (Sicherheitspolster) and is it refunded?",
      answer: "When transferring money internationally via SWIFT, intermediary correspondent banks frequently deduct processing wire fees ($15-$30). To prevent your transferred balance from falling even €1 short of the mandatory €11,904 threshold (which would prevent the issuance of your Sperrbestätigung), German banks mandate a €100 safety buffer. Any remaining buffer is either disbursed in your final monthly payment or refunded upon closing the account."
    },
    {
      question: "How does the health insurance bundle cashback work?",
      answer: "Both Expatrio and Coracle partner with top German statutory public health insurance funds like Techniker Krankenkasse (TK) and Barmer. By bundling your blocked account with free incoming travel insurance and statutory student health insurance, the provider refunds your setup fee and issues up to €247 in welcome bonuses once your health coverage begins in Germany."
    },
    {
      question: "How long does international wire transfer take to reach Germany?",
      answer: "Using domestic INR transfer options or optimized student remittance gateways (like Flywire or partner bank wires), funds typically reach Germany within 1 to 3 business days. Once the funds reflect in your German IBAN, your official blocking confirmation (Sperrbestätigung) PDF is issued automatically within 24 hours."
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
              Blocked Account FAQs
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
