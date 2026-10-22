"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const LikelihoodFAQ = () => {
  const faqs = [
    {
      q: "How accurate is this admission chance fit score?",
      a: "Our model normalizes your CGPA onto the modified Bavarian 1.0–4.0 scale and benchmarks your language scores, work experience, and GRE credentials against historical cutoffs from 300+ public German Master's programs."
    },
    {
      q: "Why don't German universities publish official acceptance rates?",
      a: "German public universities do not use holistic admission committees or US-style overall acceptance percentages. Instead, admission is strictly rule-based: if you meet the prerequisite ECTS credits and GPA cutoff for Non-NC courses, you are automatically accepted."
    },
    {
      q: "What is the difference between NC and Non-NC programs?",
      a: "Restricted (NC) programs have fixed seat quotas and rank applicants strictly by GPA. Non-NC programs have no seat limit—anyone meeting the minimum entry prerequisites is admitted."
    },
    {
      q: "Can work experience compensate for a lower undergraduate CGPA?",
      a: "Yes! 2+ years of relevant industry experience or published research papers can add bonus points in the ranking formula at top universities like TU Munich and RWTH Aachen."
    }
  ];

  return (
    <StudyFAQ 
      badge="Admission Insights"
      title="Understanding German Admission Rules"
      subtitle="Clear answers about German university entry criteria, Bavarian formulas, and profile evaluation."
      faqs={faqs}
    />
  );
};

