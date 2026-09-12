"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

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

  return (
    <StudyFAQ
      id="section-faq"
      badge="German Visa FAQs"
      title="Frequently Asked Questions about Student Visas"
      subtitle="Key answers on VFS appointments, processing timelines, blocked accounts, and interview tips."
      faqs={faqs}
    />
  );
};
