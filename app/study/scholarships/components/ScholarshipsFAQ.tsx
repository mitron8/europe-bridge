"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const ScholarshipsFAQ = () => {
  const faqs = [
    {
      q: "Can international students get fully funded scholarships in Germany?",
      a: "Yes. Premier merit fellowships like DAAD, Erasmus+, and political foundation grants (Friedrich Ebert, Heinrich Böll, Konrad Adenauer) provide €934–€1,200/month stipends, full health insurance coverage, and travel grants."
    },
    {
      q: "Does the Deutschlandstipendium require German language proficiency?",
      a: "Not necessarily. While German proficiency (B1+) is beneficial, many universities award the Deutschlandstipendium (€300/month) to students in English-taught Master's programs based on academic excellence, leadership, and personal background."
    },
    {
      q: "When should I start applying for scholarships in Germany?",
      a: "Most major scholarship applications (especially DAAD and foundation grants) have deadlines 6 to 12 months before your intended course start date. For a Winter intake, start preparing applications between October and February of the preceding year."
    },
    {
      q: "Can I work a part-time student job while holding a scholarship?",
      a: "For the Deutschlandstipendium (€300/mo), you can work without any deduction. For major DAAD scholarships, you must obtain permission from DAAD, and part-time earnings exceeding the mini-job limit (€538/month) may be deducted from your stipend."
    },
    {
      q: "What GPA or academic score is required to be competitive?",
      a: "For the Deutschlandstipendium and foundation grants, a German GPA of 1.5 or better (equivalent to 80%+ or top 10% in Indian grading) makes you a strong contender. However, community engagement, extracurricular leadership, and social commitment are heavily weighted alongside grades."
    },
    {
      q: "Are tuition fees charged if I do not win a scholarship?",
      a: "Public universities in 15 of Germany's 16 federal states do not charge tuition fees regardless of whether you receive a scholarship. You only pay a modest semester contribution (€150–€350) which typically includes public transit."
    }
  ];

  return (
    <StudyFAQ
      id="scholarships-faq"
      badge="Scholarship FAQs"
      title="Frequently Asked Questions about Scholarships"
      subtitle="Insights on DAAD awards, Deutschlandstipendium eligibility, foundation grants, and application timelines."
      faqs={faqs}
    />
  );
};
