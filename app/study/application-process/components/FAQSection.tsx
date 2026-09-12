"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const FAQSection = () => {
  const faqs = [
    {
      q: "How many universities should I apply to?",
      a: "We recommend applying to 6–10 programs spread across dream, target, and safe tiers. Since each additional uni-assist application costs only €30 (after the first €75), applying to multiple universities is very affordable and significantly increases your odds of securing admission."
    },
    {
      q: "Can I apply for both winter and summer semesters?",
      a: "Yes, but most public programs only offer winter semester intake (starting October). Only about 30% of programs accept summer semester applications (starting April). Always check each target program's specific admission portal individually."
    },
    {
      q: "What is the difference between uni-assist and direct application?",
      a: "uni-assist is a centralized service that evaluates foreign academic records for equivalence and converts grades before forwarding dossiers to the university. Direct application means submitting your portfolio directly via the university's internal portal (such as campus.tum.de) for their internal faculty committee to review."
    },
    {
      q: "How long does it take to receive an admission decision?",
      a: "Universities usually take 4 to 8 weeks after their application deadline to issue decisions. For winter applications submitted by the standard July 15 deadline, decisions typically arrive between mid-August and late September."
    },
    {
      q: "Can I defer my admission to the next semester?",
      a: "Most German public universities do not support deferrals. If you are unable to enroll, you must reapply in the next intake cycle. A few private universities and select specialized English programs allow deferrals on a case-by-case basis."
    },
    {
      q: "What if I get rejected from all universities?",
      a: "Review each rejection letter carefully: was the bottleneck subject-specific credit prerequisites (ECTS), GPA cutoffs, or language scores? Strengthen your profile with targeted coursework, internships, improved test scores, or re-apply to NC-free programs in the following cycle."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Application FAQs"
      title="Frequently Asked Questions about University Applications"
      subtitle="Strategic guidance on uni-assist, direct portal deadlines, admission odds, and acceptance offers."
      faqs={faqs}
    />
  );
};
