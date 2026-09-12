"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const MotivationFAQ = () => {
  const faqs = [
    {
      q: "How long should a German university motivation letter be?",
      a: "The standard length is 1 to 2 pages (500–1,000 words), unless the program specifies an exact character or page limit. German academic committees appreciate concise, well-structured, and factual writing over long-winded personal narratives."
    },
    {
      q: "Can I use ChatGPT or AI to write my motivation letter?",
      a: "German university admissions committees increasingly use automated AI detection software. Generic, formulaic AI writing often leads to immediate rejection. EuropeBridge crafts 100% original, human-written drafts tailored to specific module curricula that bypass AI flags and impress professors."
    },
    {
      q: "Should I mention specific professors or modules in my letter?",
      a: "Yes! Referencing 2–3 specific research labs, professors, or specialized electives in the target department demonstrates thorough research and genuine alignment with the degree curriculum."
    },
    {
      q: "How is a motivation letter different for German universities vs US/UK?",
      a: "US and UK personal statements focus heavily on personal stories and extracurricular passion. German motivation letters are strictly academic: they evaluate course prerequisites, technical methodology, academic achievements, and concrete career thesis topics."
    },
    {
      q: "How do I explain backlogs or academic gaps?",
      a: "Address backlogs directly, honestly, and positively in 1–2 sentences. Focus on what skills or projects you pursued during any gap period, how you resolved the challenge, and why you are now fully prepared for rigorous graduate study."
    },
    {
      q: "Does EuropeBridge review and edit existing drafts?",
      a: "Yes. Our alumni reviewers provide comprehensive line-by-line structural editing, prerequisite alignment, and tone calibration to ensure your statement meets TU9 standards."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Motivation Letter FAQs"
      title="Frequently Asked Questions about Motivation Letters"
      subtitle="Expert tips on formatting, word limits, academic tone, and avoiding common rejection pitfalls."
      faqs={faqs}
    />
  );
};
