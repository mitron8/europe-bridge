"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const CoverLetterFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order, now what?",
      a: "Please check your inbox. You will immediately receive an email with a link to our structured profile intake questionnaire where you can enter your admitted German university, course modules, consular post, and list of physical documents to be indexed."
    },
    {
      q: "How long does the whole process take?",
      a: "Standard Order: First draft delivered in 3 working days, with final delivery upon completion of your review rounds. Express Order: First draft delivered within 1 working day (24 hours), with fast-track revision turnaround within 12 hours."
    },
    {
      q: "What is the difference between a Cover Letter and a Letter of Motivation (LOM)?",
      a: "A Cover Letter (Begleitschreiben) is strictly a 1-page formal executive summary and itemized document index for the VFS counter and consular officer. A Letter of Motivation (LOM) is an in-depth 2-page narrative exploring your academic history, specific curriculum modules, § 16b AufenthG compliance, and long-term career aspirations."
    },
    {
      q: "Will the Cover Letter be 100% original and plagiarism-free?",
      a: "Yes. Every Cover Letter is drafted from scratch by our German visa specialists tailored specifically to your admitted program, academic transcripts, and regional consular jurisdiction. We never use generic one-size-fits-all templates."
    },
    {
      q: "Does the Cover Letter match my regional German Consulate's document checklist?",
      a: "Absolutely. The German missions in India (New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and Hyderabad) have subtle differences in their physical dossier requirements. Our document index organizes your certificates in the exact sequence expected by your local VFS biometrics counter."
    },
    {
      q: "In what formats will my Cover Letter be delivered?",
      a: "You will receive both an official, printable PDF (formatted with DIN 5008 German business letter margins and designated blue-ink signature line) and an editable Microsoft Word (.docx) file so you can make future tweaks if your dates change."
    },
    {
      q: "How many rounds of revisions are included?",
      a: "Every order includes up to two complete rounds of student review. Your first draft is shared via Google Docs, allowing you to highlight phrases, add comments, or request adjustments directly with your assigned editor."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Cover Letter FAQs"
      title="Frequently Asked Questions"
      subtitle="Details on Begleitschreiben format, DIN 5008 standards, regional VFS checklist order, and delivery formats."
      faqs={faqs}
    />
  );
};
