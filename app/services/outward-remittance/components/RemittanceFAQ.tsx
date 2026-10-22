"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const RemittanceFAQ = () => {
  const faqs = [
    {
      q: "How does outward remittance to Germany work under the RBI LRS scheme?",
      a: "Under the Reserve Bank of India (RBI) Liberalised Remittance Scheme (LRS), Indian resident students can legally remit up to USD 250,000 (or equivalent in Euros) per financial year for overseas education expenses. You do not need to visit a physical bank branch: you submit your student documents digitally, complete Form A2, and transfer the INR amount via domestic NEFT/RTGS to our RBI-licensed Authorized Dealer Category-II partner account."
    },
    {
      q: "What documents are required to initiate an outward remittance?",
      a: "You only need basic student documentation: (1) Student's valid Indian Passport, (2) Student & Sponsor's PAN Card, (3) German university admission letter or language contract, (4) German blocked account opening confirmation/deposit invoice (from Expatrio, Coracle, or Fintiba showing the recipient IBAN), and (5) A pre-filled Form A2 declaration."
    },
    {
      q: "What is TCS (Tax Collected at Source) and can I claim it back in India?",
      a: "Under Indian tax regulations, outward remittances for education above ₹7 Lakhs in a financial year attract TCS. If funded by a bank education loan, the TCS rate is only 0.5% on the amount exceeding ₹7 Lakhs. If funded from personal/parent savings, the TCS rate is 5% on the amount exceeding ₹7 Lakhs. Crucially, TCS is NOT an expense or permanent tax—it is an advance tax credit that you or your parents can claim as a 100% refund or offset against your income tax returns (ITR)."
    },
    {
      q: "How long does it take for funds to reflect in my German blocked account?",
      a: "Once your domestic INR transfer is received by our forex partner, the Euro conversion and international SWIFT transfer take between 24 to 48 working hours to credit your German IBAN. As soon as the funds reflect in Germany, your blocked account provider generates your official 0-balance Sperrbestätigung."
    },
    {
      q: "Why is a domestic deposit safer and cheaper than a traditional Indian bank wire?",
      a: "Traditional retail bank branches in India often lack dedicated forex desks. They typically impose high retail exchange rate margins (2.5% to 4%), charge steep SWIFT handling fees, and require manual paperwork that can get rejected days later. Furthermore, correspondent banks along the SWIFT chain frequently deduct $25–$35 en route, causing your blocked account to be short and delaying your visa. Our network provides wholesale interbank rates, €0 middleman deductions, and 100% digital Form A2 processing."
    },
    {
      q: "Will my German transfer suffer intermediary bank deductions?",
      a: "No. Our partner network wires your funds with OUR/guaranteed full-value routing. This guarantees that exactly €11,904 (or your exact specified Euro amount) credits to your German IBAN, completely eliminating the risk of visa rejection due to underfunded blocked accounts."
    },
    {
      q: "Can I remit funds directly from an Indian education loan?",
      a: "Yes, absolutely! We coordinate directly with your lending bank (SBI, HDFC Credila, Avanse, ICICI, etc.) to disburse the sanctioned education loan into the authorized remittance gateway, ensuring you qualify for the concessional 0.5% TCS rate."
    },
    {
      q: "Will I receive an official payment confirmation letter for my VFS visa appointment?",
      a: "Yes. Within 24 to 48 working hours of your transfer, you receive an official outward remittance confirmation letter and SWIFT MT103 transaction receipt stamped by the authorized dealer bank, which you can attach to your German student visa file."
    }
  ];

  return (
    <StudyFAQ
      id="remittance-faq"
      badge="Financial Settlement"
      title="Outward Remittance FAQs"
      subtitle="Clear answers on RBI LRS regulations, TCS rates, and money transfer timelines to Germany."
      faqs={faqs}
    />
  );
};
