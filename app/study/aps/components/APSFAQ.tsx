"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const APSFAQ = () => {
  const faqs = [
    {
      q: "What is an APS certificate and is it mandatory for Indian students?",
      a: "Yes, the APS (Akademische Prüfstelle) certificate is a legally mandatory prerequisite for all Indian students applying for a German student visa and admission to German universities. It officially verifies the authenticity of your Indian educational credentials."
    },
    {
      q: "How long does it take to receive the digital APS certificate?",
      a: "Typically, the verification process takes between 3 to 6 weeks from the date your physical application documents reach the APS India office in New Delhi, provided all university professor verification emails are promptly answered."
    },
    {
      q: "How much is the official APS India verification fee?",
      a: "The standard verification fee is INR 18,000, payable directly via bank transfer/CC Avenue on the official APS India portal. Ensure you save the payment transaction receipt as it must be submitted with your physical document dossier."
    },
    {
      q: "Do I have to take an in-person interview for APS?",
      a: "Most bachelor's and master's degree holders with recognized Indian university degrees undergo purely document-based verification. In-person or online interviews are generally reserved for specific cases where course equivalence requires additional clarification."
    },
    {
      q: "Can I apply for APS while still in my final year of bachelor's?",
      a: "Yes. Final-year students can apply with their transcripts up to the penultimate semester (e.g., semesters 1 through 6 or 7) along with a bonafide student certificate from their institution."
    },
    {
      q: "How does EuropeBridge assist with the APS process?",
      a: "EuropeBridge conducts a comprehensive pre-submission document audit, arranges professor verification contact protocols to avoid delays, tracks dossier delivery, and resolves any verification inquiries directly."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="APS FAQs"
      title="Frequently Asked Questions about APS Verification"
      subtitle="Critical information on timelines, required mark sheets, professor verification emails, and fees."
      faqs={faqs}
    />
  );
};
