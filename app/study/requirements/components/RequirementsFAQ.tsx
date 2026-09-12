"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const RequirementsFAQ = () => {
  const faqs = [
    {
      q: "What is the minimum German equivalent GPA required for public universities?",
      a: "Most German public universities require an equivalent grade of 2.5 or better on the German grading scale (where 1.0 is best and 4.0 is passing), which roughly translates to 65%–70%+ or a 7.0+ CGPA in the Indian university grading system."
    },
    {
      q: "Can I study in Germany in English without knowing German?",
      a: "Yes! There are over 2,000+ English-taught Master's and International Bachelor's degree programs across German public universities that require only an IELTS (typically 6.5+) or TOEFL iBT (80–90+) score with no mandatory German language prerequisite."
    },
    {
      q: "What is the Bavarian Formula for grade conversion?",
      a: "German admission committees convert foreign grades using the modified Bavarian Formula: [(Nmax - Nd) / (Nmax - Nmin)] * 3 + 1, where Nmax is the maximum possible score, Nmin is the minimum passing score, and Nd is your obtained grade."
    },
    {
      q: "Is GRE or GMAT mandatory for German university applications?",
      a: "Only select elite programs (e.g. TU Munich M.Sc. Informatics/Management, RWTH Aachen Computer Science, or top business schools) require or strongly recommend GRE or GMAT. Most standard engineering and science degrees rely strictly on undergraduate module credits (ECTS)."
    },
    {
      q: "What are ECTS credits and why are subject prerequisites critical?",
      a: "German universities are strictly consecutive: they require you to demonstrate specific minimum European Credit Transfer System (ECTS) credit thresholds in core math, theoretical computer science, or engineering disciplines matching their bachelor's syllabus."
    },
    {
      q: "How does EuropeBridge evaluate my admission eligibility?",
      a: "We conduct an extensive prerequisite credit mapping comparing your university transcript modules with target German university curricula to ensure you meet all strict faculty admission thresholds."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Admission Requirements FAQs"
      title="Frequently Asked Questions about Admission Requirements"
      subtitle="Detailed guidance on Bavarian GPA conversion, IELTS cutoffs, GRE requirements, and credit prerequisites."
      faqs={faqs}
    />
  );
};
