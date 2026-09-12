"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const CostOfLivingFAQ = () => {
  const faqs = [
    {
      q: "How much money do I need per month as a student in Germany?",
      a: "The German government sets the mandatory blocked account baseline at €992/month (€11,904/year), which is realistic for basic living. In affordable cities like Leipzig, Chemnitz, or Magdeburg, you can live comfortably on €750–€950/month. In Munich or Frankfurt, expect €1,200–€1,500/month. The nationwide average across all international students is €900–€1,300/month."
    },
    {
      q: "Is Munich really that expensive compared to other university cities?",
      a: "Yes, Munich is Germany's most expensive student city. A room in a shared apartment costs €550–€750/month compared to €280–€380 in Leipzig. However, Munich also offers higher working student hourly wages (€15–€20/hr) at global corporate headquarters (BMW, Siemens, Allianz, TUM/LMU spin-offs)."
    },
    {
      q: "What is the Deutschlandticket and is it worth it for students?",
      a: "The Deutschlandticket costs €63/month and provides unlimited access to all local buses, trams, subways, commuter rail, and regional trains across the ENTIRE country of Germany. For students, it is an incredible deal because standard single-city monthly passes often cost over €80. Most public universities include this ticket directly in the mandatory student semester contribution."
    },
    {
      q: "Can I survive strictly on the blocked account monthly payout (€992/mo)?",
      a: "Yes, €992/month is sufficient to cover rent, groceries, health insurance, and public transport in budget and mid-range cities (like Leipzig, Dresden, Aachen, Bremen, or Magdeburg). In expensive cities like Munich or Frankfurt, you will likely need supplementary income from a part-time student job (working student role or mini-job)."
    },
    {
      q: "How much does public health insurance cost for students in 2026?",
      a: "Statutory public health insurance (e.g., TK, Barmer, AOK) for students under 30 costs approximately €141–€146 per month (inclusive of long-term nursing care insurance). It covers all doctor visits, hospital treatments, emergency care, and prescription medication with no hidden deductibles."
    },
    {
      q: "What are the cheapest university cities in Germany?",
      a: "The most affordable university cities are primarily located in eastern and central Germany: Chemnitz, Leipzig, Magdeburg, Greifswald, Jena, Ilmenau, and Siegen. Monthly living costs in these cities range from €700 to €950, with shared flat room rents under €350/mo."
    }
  ];

  return (
    <StudyFAQ
      id="section-faq"
      badge="Living Cost FAQs"
      title="Frequently Asked Questions about Student Living Costs"
      subtitle="Detailed breakdown on city rent comparisons, grocery budgets, working student wages, and student discounts."
      faqs={faqs}
    />
  );
};
