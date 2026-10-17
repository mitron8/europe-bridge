"use client";

import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const LifeAfterOfferFAQ = () => {
  const faqs = [
    {
      q: 'How long can I legally stay in Germany after graduation?',
      a: 'After completing your degree, you receive an 18-month job seeker residence permit (§20 AufenthG). During this period, you can work ANY job (full-time, part-time, retail, freelancing, or hospitality) without hourly restrictions to support yourself while seeking a position corresponding to your qualification. Once you sign a qualifying contract, you can immediately transition to an EU Blue Card or work permit.'
    },
    {
      q: 'What is the exact 2026 salary threshold for the EU Blue Card?',
      a: 'For recent university graduates (degree completed within the last 3 years) and for shortage occupations (IT, engineering, mathematics, natural sciences, medicine), the 2026 threshold is €45,934.20 gross per year (approx. €3,827.85/month). For experienced professionals in non-shortage fields with degrees older than 3 years, the regular threshold is €50,700 gross per year.'
    },
    {
      q: 'Can I get Permanent Residence (Niederlassungserlaubnis) faster through the Blue Card?',
      a: 'Yes, it is the fastest permanent residency pathway in Europe! With B1-level German language skills, you can apply for permanent residence after just 21 months of Blue Card employment and pension contributions. With A1 German, it takes 27 months. Furthermore, graduates of German universities on standard work permits can apply after 24 months under §18c AufenthG.'
    },
    {
      q: 'Can my spouse work in Germany if I get an EU Blue Card?',
      a: 'Yes! Blue Card holders enjoy exceptional family reunification rights. Your spouse is granted an immediate residence permit with 100% unrestricted right to work in Germany (full-time, part-time, or self-employed). Unlike other visa categories, your spouse does NOT need to pass a German language exam (A1) prior to arrival.'
    },
    {
      q: 'Is German language proficiency mandatory to land a job in Germany?',
      a: 'In software development, data science, AI, and international tech startups in cities like Berlin, Munich, and Frankfurt, many teams operate exclusively in English. However, having B1 or B2 German unlocks roughly 80% more total job openings (especially at German Mittelstand leaders and automotive giants) and accelerates your permanent residency and citizenship.'
    },
    {
      q: 'Do years spent studying in Germany count towards German citizenship?',
      a: 'Yes! Under the modernized German Nationality Act (StAG), legal residence while studying on a §16b student permit counts toward the 5-year total residency required for naturalization. Furthermore, Germany now fully permits dual citizenship for all nationalities, meaning you do not have to renounce your birth citizenship.'
    },
    {
      q: 'What happens if I cannot find a qualified job within 18 months?',
      a: 'If your 18-month job seeker permit expires without a qualifying offer, you must either explore other visa categories (such as a freelance/self-employed visa §21, a vocational training visa, or PhD enrollment) or depart Germany. To prevent this, our students begin networking and applying for Werkstudent positions at least 6 months before thesis completion.'
    },
    {
      q: 'What happens to my German pension contributions if I decide to leave Germany?',
      a: 'Non-EU citizens who leave Germany permanently and have contributed to the German Statutory Pension Insurance (Deutsche Rentenversicherung) for less than 60 months can apply for a full refund of their employee contributions after a 24-month waiting period outside the EU.'
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Section 07 · Common Queries"
      title="Frequently Asked Questions About Post-Study Life"
      subtitle="Everything you need to know about post-study work rights, the EU Blue Card, permanent settlement, and citizenship."
      faqs={faqs}
    />
  );
};
