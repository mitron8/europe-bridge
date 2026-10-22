"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const BundleFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order, now what?",
      a: "Please check your inbox. You will receive three separate emails with links to our structured intake questionnaires (one for the SOP, one for your 2 LORs, and one for your CV) where you can enter your degree background, recommenders' designations, and target university modules."
    },
    {
      q: "How long does the whole process take?",
      a: "Standard Order: First drafts for all 4 documents delivered within 3 to 5 working days. Express Order: Priority queue delivery within 1 to 2 working days (48 hours), with expedited 12-hour turnarounds on revision requests."
    },
    {
      q: "What exactly does the Document Preparation Bundle include?",
      a: "The bundle includes: (1) Standard 2-page course-specific SOP tailored to your target German university; (2) Two distinct Letters of Recommendation (Academic, Professional, or mixed) highlighting your individual achievements; (3) Europass Tabellarischer Lebenslauf (German-standard CV, max 2 pages)."
    },
    {
      q: "Why is ordering the bundle better than ordering documents separately?",
      a: "Two major advantages: First, you save ₹3,997 (over 22% discount) compared to individual pricing. Second, and most importantly, our team writes all documents in sync so that your capstone projects, internship timelines, technical toolsets, and academic goals are 100% harmonized without contradictory dates or claims."
    },
    {
      q: "Can the two LORs be from different professors or employers?",
      a: "Yes. You can configure your two LORs however you prefer: two academic recommendations (e.g. from your Thesis Advisor and HOD), or one academic plus one professional recommendation (e.g. from your university professor and your company manager)."
    },
    {
      q: "Will the documents be 100% plagiarism-free?",
      a: "Absolutely. We enforce a zero-tolerance plagiarism policy. Every document is crafted from scratch based on your individual academic trajectory and verified with Turnitin before delivery."
    },
    {
      q: "How do the student review rounds work?",
      a: "Every document in the bundle includes two full rounds of review. We share the drafts via Google Docs, allowing you to highlight specific phrases, add comments, or request tone adjustments. Our editors incorporate your feedback thoroughly before final export."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Application Bundle FAQs"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about the Document Preparation Bundle (SOP + 2 LORs + CV) for German university admissions."
      faqs={faqs}
    />
  );
};
