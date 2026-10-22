"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const HealthInsuranceFAQ = () => {
  const faqs = [
    {
      q: "Is health insurance legally mandatory in Germany?",
      a: "Yes, 100% mandatory. Under German federal law (§ 5 SGB V), every person residing in Germany—including international students, researchers, and workers—must have comprehensive, compliant health insurance coverage. German universities will not finalize your matriculation without digital proof of insurance, and German embassies will not issue your student visa without it."
    },
    {
      q: "What is the difference between statutory public (GKV) and private (PKV) health insurance?",
      a: "Public health insurance (Gesetzliche Krankenversicherung - GKV, like TK, Barmer, AOK) is a statutory social security system offering standard universal coverage. For degree students under 30, it features a government-fixed flat rate (~€140–€150/mo), covers pre-existing conditions without extra charge, provides free family insurance, and bills doctors directly with zero out-of-pocket costs. Private health insurance (PKV) calculates premiums based on age and health status; it is primarily beneficial for students aged 30+, PhD researchers, or preparatory language students who cannot enroll in public GKV."
    },
    {
      q: "How much does student health insurance cost in 2026/2027?",
      a: "For degree students under 30 years old, statutory public insurance costs approximately €140 to €150 per month. This statutory contribution consists of basic health insurance, long-term care insurance (Pflegeversicherung), and the fund's specific supplementary contribution (Zusatzbeitrag). Premiums are only deducted once your semester begins and after you arrive in Germany."
    },
    {
      q: "What is the electronic M10 certificate and how is it sent to my university?",
      a: "The M10 is an electronic reporting notification between German health insurance funds and German higher education institutions. German universities no longer accept paper insurance slips or PDF attachments. Once you enroll with TK, Barmer, or AOK through EuropeBridge, the insurer transmits the M10 notification digitally into the university's central registrar portal, automatically lifting your registration hold."
    },
    {
      q: "What if I am 30 years old or older when starting my studies?",
      a: "Once a student turns 30, statutory public health insurance transitions to 'voluntary insurance' (Freiwillige Versicherung), with monthly contributions rising to ~€240–€260/month. At this stage, many international students choose to switch to accredited private student health insurance (such as Ottonova or specialized expat student policies), which cost approximately €95 to €160/month while fulfilling all visa requirements."
    },
    {
      q: "Can I use Indian travel insurance to enroll in a German university?",
      a: "No. Standard travel insurance policies purchased in India (or elsewhere outside the EU) are strictly invalid for German university matriculation. While private travel insurance may be accepted for your initial 90-day entry visa, German universities legally require either proof of German statutory public coverage or an official German waiver certificate (Befreiung von der Versicherungspflicht)."
    },
    {
      q: "What is free incoming travel insurance?",
      a: "When you set up your statutory health insurance through EuropeBridge, you receive free incoming travel health insurance (valid for up to 180 days). This protects you from the moment your flight takes off and covers your initial weeks in Germany before your official university semester start date begins."
    },
    {
      q: "Are doctor visits and prescriptions completely cashless in Germany?",
      a: "Under statutory public health insurance (TK, Barmer, AOK), yes! You receive an electronic health card (eGK) with a microchip. Whenever you visit a doctor, clinic, or hospital, you simply swipe your card. The healthcare provider bills the insurance company directly—you pay €0 out-of-pocket for standard consultations, hospital care, and routine checkups."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Health Insurance FAQs"
      title="Frequently Asked Questions"
      subtitle="Complete guide to German public GKV vs private PKV, statutory student rates, digital M10 certificates, and free incoming travel insurance."
      faqs={faqs}
    />
  );
};
