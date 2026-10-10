"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RemittanceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does outward remittance to Germany work under the RBI LRS scheme?",
      answer: "Under the Reserve Bank of India (RBI) Liberalised Remittance Scheme (LRS), Indian resident students can legally remit up to USD 250,000 (or equivalent in Euros) per financial year for overseas education expenses. You do not need to visit a physical bank branch: you submit your student documents digitally, complete Form A2, and transfer the INR amount via domestic NEFT/RTGS to our RBI-licensed Authorized Dealer Category-II partner account."
    },
    {
      question: "What documents are required to initiate an outward remittance?",
      answer: "You only need basic student documentation: (1) Student's valid Indian Passport, (2) Student & Sponsor's PAN Card, (3) German university admission letter or language contract, (4) German blocked account opening confirmation/deposit invoice (from Expatrio, Coracle, or Fintiba showing the recipient IBAN), and (5) A pre-filled Form A2 declaration."
    },
    {
      question: "What is TCS (Tax Collected at Source) and can I claim it back in India?",
      answer: "Under Indian tax regulations, outward remittances for education above ₹7 Lakhs in a financial year attract TCS. If funded by a bank education loan, the TCS rate is only 0.5% on the amount exceeding ₹7 Lakhs. If funded from personal/parent savings, the TCS rate is 5% on the amount exceeding ₹7 Lakhs. Crucially, TCS is NOT an expense or permanent tax—it is an advance tax credit that you or your parents can claim as a 100% refund or offset against your income tax returns (ITR)."
    },
    {
      question: "How long does it take for funds to reflect in my German blocked account?",
      answer: "Once your domestic INR transfer is received by our forex partner, the Euro conversion and international SWIFT transfer take between 24 to 48 working hours to credit your German IBAN. As soon as the funds reflect in Germany, your blocked account provider generates your official 0-balance Sperrbestätigung."
    },
    {
      question: "Why is a domestic deposit safer and cheaper than a traditional Indian bank wire?",
      answer: "Traditional retail bank branches in India often lack dedicated forex desks. They typically impose high retail exchange rate margins (2.5% to 4%), charge steep SWIFT handling fees, and require manual paper paperwork that can get rejected days later. Furthermore, correspondent banks along the SWIFT chain frequently deduct $25–$35 en route, causing your blocked account to be €20 short and delaying your visa. Our network provides wholesale interbank rates, €0 middleman deductions, and 100% digital Form A2 processing."
    },
    {
      question: "Will my German transfer suffer intermediary bank deductions?",
      answer: "No. Our partner network wires your funds with OUR/guaranteed full-value routing. This guarantees that exactly €11,904 (or your exact specified Euro amount) credits to your German IBAN, completely eliminating the risk of visa rejection due to underfunded blocked accounts."
    },
    {
      question: "Can I remit funds directly from an Indian education loan?",
      answer: "Yes, absolutely! We coordinate directly with your lending bank (SBI, HDFC Credila, Avanse, ICICI, etc.) to disburse the sanctioned education loan into the authorized remittance gateway, ensuring you qualify for the concessional 0.5% TCS rate."
    },
    {
      question: "Will I receive an official payment confirmation letter for my VFS visa appointment?",
      answer: "Yes. Within 24 to 48 working hours of your transfer, you receive an official outward remittance confirmation letter and SWIFT MT103 transaction receipt stamped by the authorized dealer bank, which you can attach to your German student visa file."
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
              Outward Remittance FAQs
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
