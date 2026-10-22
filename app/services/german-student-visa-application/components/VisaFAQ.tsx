"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const VisaFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order. Now what happens next?",
      a: "You will receive an automated welcome email with a link to our secure Visa Intake Questionnaire. Here you can upload your university admission letter, APS certificate, and passport copy. Your assigned senior visa counselor will review your documents and contact you within 24 hours to begin your CSP portal registration."
    },
    {
      q: "Do I still need to go to VFS in person if applying through the CSP portal?",
      a: "Yes. While the Consular Services Portal (CSP) handles the initial digital application, document upload, and preliminary consular verification, German law requires all applicants to attend an in-person appointment at VFS Global for biometric data collection (fingerprints and digital photo) and original document verification."
    },
    {
      q: "How long does the entire German student visa process take?",
      a: "• Initial setup & dossier prep: 1–2 working days post consultation.\n• Total digital process (CSP filing + VFS booking): 3–5 working days (once documents are ready).\n• Embassy/Consulate processing: 4 to 8 weeks on average (depending on peak intake rush and Ausländerbehörde clearance).\n• Post-appointment passport dispatch: Typically 2 to 4 weeks after your VFS appointment."
    },
    {
      q: "What is the difference between the Premium Plan (₹14,999) and the Complete Plan (₹19,999)?",
      a: "The Premium Plan covers end-to-end procedural support: CSP portal registration, VIDEX form filing, document checklist audit, VFS appointment booking, and 1:1 visa interview coaching.\n\nThe Complete Plan includes EVERYTHING in Premium PLUS professional custom drafting of your Letter of Motivation (LOM) and Visa Cover Letter tailored to your specific university curriculum and regional consulate, along with priority consultant access."
    },
    {
      q: "Can I use this service if I've already started the CSP process?",
      a: "Absolutely! If you've already created an account on the CSP portal, received correction emails from the embassy, or got stuck on the VIDEX form, we can audit your existing application, resolve all queries, and take over the appointment booking and interview preparation."
    },
    {
      q: "Which VFS center or German Consulate should I apply to (Jurisdiction rule)?",
      a: "Under German consular rules, your application must be submitted to the German mission corresponding to where you have had your habitual residence for the past 6 months (supported by your Aadhaar card or registered rent agreement). We determine your exact jurisdiction (Delhi, Mumbai, Bengaluru, Chennai, or Kolkata) and book the corresponding VFS center."
    },
    {
      q: "What happens if the German Embassy requests additional documents?",
      a: "If the embassy or local German foreigners' registration office (Ausländerbehörde) issues an email request for additional documents (Zusatzdokumente) or clarification regarding your funds or study timeline, our visa experts directly draft the response and prepare the supplemental documentation to ensure seamless clearance."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Visa Guidance FAQs"
      title="Frequently Asked Questions"
      subtitle="Complete clarity on Consular Services Portal (CSP) filing, biometric VFS appointments, embassy timelines, and mock interviews."
      faqs={faqs}
    />
  );
};
