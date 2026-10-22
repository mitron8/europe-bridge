"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const LorFAQ = () => {
  const faqs = [
    {
      q: "How many LORs are included in this service?",
      a: "This service includes two complete, distinct Letters of Recommendation. You can choose 2 Academic LORs (professors/HoD), 1 Academic + 1 Professional LOR (professor + work/internship manager), or 2 Professional LORs, depending on your application profile and target program requirements."
    },
    {
      q: "What information do you need from me to write my recommendation letters?",
      a: "After ordering, you will receive our structured questionnaire to provide:\n• Recommender details: Name, designation, department, and university/company name.\n• Relationship timeline: How long they've known you and in what capacity (course professor, lab guide, thesis advisor, or direct manager).\n• Specific evidence: Modules/subjects taken, grades/rank achieved, final-year thesis topic, laboratory experiments, or workplace technical deliverables.\n• Target universities and degree programs."
    },
    {
      q: "Can I get one academic and one professional LOR?",
      a: "Yes, absolutely! Mixing 1 Academic LOR and 1 Professional LOR is very common and highly recommended for applicants with 6+ months of work or internship experience. The academic letter proves your theoretical research competence, while the professional letter confirms your applied engineering problem-solving."
    },
    {
      q: "How do I get my recommender to sign the letter?",
      a: "We provide your finalized LORs in both editable Word (.docx) and formatted PDF formats. In India and many countries, professors and busy managers routinely ask students to provide a well-drafted letter for them to review, approve, print on official letterhead, and sign. Because our drafts are objective, evidence-based, and professionally written, recommenders are almost always happy to sign without friction."
    },
    {
      q: "What if my target German university has specific prompts or an evaluation form?",
      a: "Some universities (such as TUM, RWTH Aachen, or certain Erasmus Mundus consortia) provide specific prompt questions or a faculty evaluation rating grid. Simply share the prompt or grid in the questionnaire or via email, and our writers will calibrate the letters and provide the requested ratings format."
    },
    {
      q: "Does the LOR need an official stamp, seal, and institutional email?",
      a: "Yes! German university admissions committees (Prüfungsausschuss) and Uni-Assist are strict about verification. Recommendations must be printed on official college or corporate letterhead with the institutional logo, physically stamped/signed (or verified digitally), and must display the recommender's official institutional domain email address (.edu, .ac.in, or corporate domain)."
    },
    {
      q: "What is the turnaround time and how do the revisions work?",
      a: "Standard Bundle: First drafts of both letters delivered in 3 working days.\nExpress Bundle: First drafts of both letters delivered in 1 working day (24 hours).\n\nBoth plans include 2 full rounds of review via Google Docs. You can add comments, ask for wording tweaks, or highlight additional accomplishments, and our writers will refine the drafts promptly."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="LOR Writing FAQs"
      title="Frequently Asked Questions"
      subtitle="Insights on academic vs professional recommenders, official letterhead formats, German faculty evaluation grids, and timelines."
      faqs={faqs}
    />
  );
};
