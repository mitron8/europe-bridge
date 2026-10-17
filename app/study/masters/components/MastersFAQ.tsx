"use client";

import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const MastersFAQ = () => {
  const faqs = [
    {
      q: "Are Master's degrees in Germany truly tuition-free for international students?",
      a: "Yes, at almost all public universities across 15 of Germany's 16 federal states, tuition is completely 0€ regardless of your nationality. You only pay a mandatory semester contribution (Semesterbeitrag) of €150 to €350 per semester, which includes a regional public transportation ticket and administrative student union services. The state of Baden-Württemberg charges €1,500/semester for non-EU students, and TUM introduced international fees for select new enrollees; all other states remain 100% free."
    },
    {
      q: "Is my 3-year Bachelor's degree (B.Sc, BCA, B.Com, BBA) accepted for German Master's programs?",
      a: "Yes, many German universities and Universities of Applied Sciences (UAS) accept 3-year undergraduate degrees from H+ rated universities on anabin if you have accumulated 180 ECTS credits. However, research universities (TU9) requiring 210 or 240 ECTS may ask you to complete bridging modules (Auflagen) or suggest 1-year postgraduate diplomas (e.g., M.Sc Part 1) to bridge the 30-credit gap."
    },
    {
      q: "Can I change my field of study for a Master's in Germany (e.g., Mechanical to Computer Science)?",
      a: "German public master's degrees are consecutive ('konsekutiv'), meaning your undergraduate degree must be directly related to the master's curriculum. Admission committees calculate exact ECTS prerequisites (e.g., 25 ECTS in Higher Mathematics, 30 ECTS in Algorithms and Data Structures). If your transcript lacks required foundational credits, admission is legally restricted. Interdisciplinary conversion programs (like Computational Mechanics or Data Engineering) offer the best pathway if switching."
    },
    {
      q: "What German GPA do I need for top universities like TUM, RWTH Aachen, or KIT?",
      a: "Using the modified Bavarian formula, a German GPA between 1.0 (very best) and 2.5 is competitive for public master's programs. For highly selective programs at TU9 universities, a GPA of 2.0 or better (approximately 75%+ or 8.0/10 CGPA depending on your university's grading scale) is typically recommended."
    },
    {
      q: "Do I need to learn German if my master's degree is taught 100% in English?",
      a: "For admission to 100% English-taught master's degrees, German proficiency is officially optional (or only basic A1 is requested by some universities for enrollment). However, learning German to at least B1/B2 level is essential for daily living, securing high-paying Werkstudent internships in industry, and qualifying for the 21-month fast-track Permanent Residency after graduation."
    },
    {
      q: "What is the APS Certificate and why is it mandatory?",
      a: "The Akademische Prüfstelle (APS) certificate is an authenticity verification issued by the German Embassy's science department (mandatory for applicants from India, China, and Vietnam). It verifies your educational documents directly with your university before you apply for university admission or submit your student visa application. It takes 4 to 8 weeks to process, so apply early."
    },
    {
      q: "How much money must be deposited into the Blocked Account for 2026?",
      a: "The statutory German student visa requirement is €992 per month, amounting to €11,904 per year deposited into an authorized blocked account (Sperrkonto). Upon arriving in Germany and registering your residential address, you will receive €992 disbursed automatically every month into your German current account for living expenses."
    },
    {
      q: "How many hours can I work part-time while studying in Germany?",
      a: "Under Germany's updated immigration laws, international non-EU students can work up to 140 full days (shifts longer than 4 hours) or 280 half days (up to 4 hours) per calendar year. Alternatively, students can work up to 20 hours per week during semester periods under a 'Werkstudent' contract, earning an average of €15 to €24 per hour with significant tax and social contribution exemptions."
    }
  ];

  return (
    <StudyFAQ
      id="faqs"
      badge="Master's FAQs"
      title="Frequently Asked Questions about Master's in Germany"
      subtitle="Everything international students need to know about 0€ tuition, credit evaluation, blocked accounts, and post-study EU Blue Card settlement."
      faqs={faqs}
    />
  );
};
