"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const InsuranceFAQ = () => {
  const faqs = [
    {
      q: "Is health insurance mandatory for studying in Germany?",
      a: "Yes. Proof of valid health insurance is an absolute statutory legal requirement for both university matriculation (enrollment) and German student visa approval under §193 VVG."
    },
    {
      q: "What is the difference between public (statutory) and private health insurance?",
      a: "Public health insurance (TK, Barmer, AOK, DAK) covers 100% of doctor visits, prescription medicine, and hospital stays with zero deductibles for ~€141–€146/month. Private insurance is only for students aged 30+, preparatory language course students, or PhD scholars."
    },
    {
      q: "What is the M10 digital notification and why do I need it?",
      a: "The M10 is an electronic notification sent directly by your statutory health insurance provider (e.g. Techniker Krankenkasse) to your German university certifying your coverage. Without this digital transmission, German universities cannot finalize your enrollment."
    },
    {
      q: "When should I activate my health insurance?",
      a: "You should register your health insurance 3–4 weeks prior to your VFS visa appointment. Coverage officially commences on the first day of the academic semester (October 1 for winter or April 1 for summer), or on the day you land in Germany."
    },
    {
      q: "Does statutory insurance cover pre-existing conditions?",
      a: "Yes. German public health insurance providers (TK, Barmer, etc.) are legally prohibited from rejecting applicants based on pre-existing medical conditions and do not charge higher premiums or exclude coverage."
    },
    {
      q: "How does EuropeBridge help with health insurance?",
      a: "EuropeBridge partners with certified German statutory providers (TK/Barmer) and package providers (Expatrio/Fintiba) to set up your digital M10 notification and incoming travel insurance in 24 hours at €0 extra agency cost."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Health Insurance FAQs"
      title="Frequently Asked Questions about Health Insurance"
      subtitle="Clear answers on public vs. private coverage, M10 university notifications, and monthly costs."
      faqs={faqs}
    />
  );
};
