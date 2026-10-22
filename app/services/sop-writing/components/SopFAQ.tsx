"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const SopFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order, now what happens next?",
      a: "Please check your inbox immediately. You will receive an automated welcome email with a link to our comprehensive Student Intake Questionnaire. Here, you'll share your resume, academic transcripts, technical projects, and target university program link so our editor can begin drafting."
    },
    {
      q: "How long does the whole drafting process take?",
      a: "Standard Order: First draft delivered in 3 working days; final draft finalized after your student review rounds.\nExpress Order: First draft delivered within 1 working day (24 hours); ideal for impending Uni-Assist, VPD, or scholarship application deadlines."
    },
    {
      q: "Will the SOP be completely original, plagiarism-free, and AI-free?",
      a: "Yes, 100%. We enforce a zero-tolerance policy for plagiarism and generic AI templates. Every SOP is custom-written by a human academic editor who researches your target program's specific module handbook. We run every draft through Turnitin before delivery."
    },
    {
      q: "How do the two student review rounds work?",
      a: "Your draft is delivered as a live Google Doc. You can highlight specific sentences, ask questions, request stronger emphasis on particular research projects, or suggest changes using inline Google Doc comments. Our editor incorporates your feedback within 24 hours (or 12 hours on Express orders)."
    },
    {
      q: "Do you write for technical Master's programs at TU9 universities?",
      a: "Yes. In fact, technical Master's programs (Computer Science, Robotics, Mechanical, Automotive, Electrical, and Biomedical Engineering) represent over 80% of our work. Our editors understand German examination rules (Prüfungsordnung) and know how to showcase prerequisite ECTS alignment."
    },
    {
      q: "What if my target university specifies a strict word count or specific prompt?",
      a: "We strictly adhere to whatever rules your university mandates. Whether TUM asks for an essay on a specific prompt, RWTH Aachen imposes a strict 2-page limit, or FAU Erlangen asks for 500 words, we tailor the structure and word count to match their exact instructions."
    },
    {
      q: "Can I get multiple SOPs for different universities?",
      a: "Yes. German universities dislike generic, one-size-fits-all statements. While your background and core projects remain consistent, each SOP must cite the distinct faculty, modules, and labs of each university. You can submit another order for additional university variants at a returning student discount."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="SOP Writing FAQs"
      title="Frequently Asked Questions"
      subtitle="Detailed guidance on drafting timelines, plagiarism screening, German university prompts, and review rounds."
      faqs={faqs}
    />
  );
};
