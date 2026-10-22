"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const ShortlistingFAQ = () => {
  const faqs = [
    {
      q: "I have placed the order, what happens next?",
      a: "Immediately upon placing your order, you will receive a confirmation email with a link to our secure Student Intake Form. Here, you'll upload your undergraduate marksheets, provisional degree certificate, and any IELTS, TOEFL, or GRE scorecards, along with your preferred German cities and specialization goals."
    },
    {
      q: "How many universities/courses are shortlisted?",
      a: "Up to 10 courses. We shortlist ONLY university programs where you genuinely satisfy the stated academic prerequisites and language requirements. We maintain a healthy, balanced split across 3 Ambitious (TU9/Excellence), 4 Moderate (Top Research & Public universities), and 3 Safe (Direct-match Applied Sciences) options."
    },
    {
      q: "How long does the whole process take?",
      a: "Standard Order: First draft delivered to your email in 3 working days. Final draft finalized following your review rounds.\nExpress Order: First draft delivered within 1 working day (24 hours). Ideal for students with urgent Uni-Assist or VPD deadlines."
    },
    {
      q: "What if I don't like some of the shortlisted universities?",
      a: "Every order includes 2 full rounds of Student Review. If a specific city doesn't suit your preferences or you wish to explore alternative curriculum modules, simply let our counselors know. We will swap out courses and re-audit options until you have 10 programs you are 100% confident in applying to."
    },
    {
      q: "Do you shortlist tuition-free public universities or private ones?",
      a: "We focus 100% on accredited German public universities with zero tuition fees (where you only pay the standard semester contribution of €150 to €350/semester). We never push private paid universities unless you explicitly request a private business school."
    },
    {
      q: "What is an ECTS credit audit and why is it so important?",
      a: "In Germany, Master's admissions are consecutive (konsekutiv). If a program requires 18 ECTS in Theoretical Computer Science or 12 ECTS in Thermodynamics and your Bachelor's transcript only shows 8 ECTS, your application will be automatically rejected regardless of having a 9.9 CGPA. We calculate your exact ECTS credit conversion to protect you from wasted application fees."
    },
    {
      q: "Does this shortlisting service include SOP or LOR writing?",
      a: "This service specializes in comprehensive university research, ECTS auditing, and direct portal linking. Document preparation (such as SOP drafting, CV formatting, and LOR editing) is available as an add-on or through our 'Done With You' end-to-end admission counseling packages."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="University Shortlisting FAQs"
      title="Frequently Asked Questions"
      subtitle="Clear answers about ECTS credit evaluation, university tiers, review iterations, and turnaround timelines."
      faqs={faqs}
    />
  );
};
