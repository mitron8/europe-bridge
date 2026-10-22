"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const LomFAQ = () => {
  const faqs = [
    {
      q: "Why can't I just submit my university SOP for my German student visa?",
      a: "A university SOP is written for admissions committees and professors, focusing on ECTS course prerequisites, academic theory, and lab research. In contrast, the German Embassy/Consulate evaluates legal compliance under § 16b AufenthG: genuine student intent, financial stability (€11,904 blocked account or loan), why Germany over your home country, and a clear post-graduation career plan. Submitting an academic SOP to the visa officer often leads to clarification queries or delays because it fails to address consular criteria."
    },
    {
      q: "What is the standard length and formatting required by the German Embassy?",
      a: "The German missions strictly prefer a concise, well-structured letter of 1.5 to 2 pages (typically 750 to 950 words). Consular officers review hundreds of applications weekly; excessively long essays are counterproductive, while letters under 1 page fail to demonstrate depth. We format your LOM with official recipient addresses, date conventions, legible typography, and clear paragraph headings."
    },
    {
      q: "What is the difference between the Standard Plan (₹3,999) and Express Plan (₹4,999)?",
      a: "Both plans provide the exact same high-caliber, bespoke writing and two review rounds. The difference is delivery speed: Standard is delivered within 3 working days, whereas Express is placed in our expedited queue and delivered within 24 hours (1 working day). Express is ideal for students who have secured an unexpected early VFS appointment or urgent CSP document submission deadline."
    },
    {
      q: "How many rounds of revisions are included, and how do we collaborate?",
      a: "Every order includes up to two complete rounds of student review. Your first draft is shared via Google Docs, allowing you to add comments, highlight specific phrases, or clarify family/financial details directly. Our editors address each comment and refine the draft until you are completely satisfied, after which we deliver the final PDF and Word document."
    },
    {
      q: "Do I need to write my Motivation Letter in German or English?",
      a: "If your admitted study program is taught in English (which is the case for most international Master's programs), the Embassy expects the Letter of Motivation to be in English. If you are enrolled in a German-taught degree (or Studienkolleg/DSH preparation), the letter should be in German. Our team supports English LOMs and German-language translations upon request."
    },
    {
      q: "How do you address profile complexities like study gaps, backlog history, or a field change?",
      a: "Consular officers pay extra attention to gaps and career shifts. Rather than hiding or glossing over them, our specialists frame gaps positively as professional exploration, upskilling, or project experience that logically led to this master's specialization. For field switchers, we emphasize transferable skills and the specific bridge modules in your German curriculum."
    },
    {
      q: "Should I physically sign the Letter of Motivation before my VFS appointment?",
      a: "Yes. German consulates require an original, physically signed document (in blue ink) submitted with your visa application dossier. We provide a clean printable PDF with the designated signature block (Place, Date, and Signature line) formatted to German bureaucratic standards."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Visa Motivation Letter FAQs"
      title="Frequently Asked Questions"
      subtitle="Clear answers on visa LOM vs academic SOP, § 16b AufenthG consular criteria, word counts, and study gaps."
      faqs={faqs}
    />
  );
};
