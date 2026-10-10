"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const LifeAfterOfferFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="section-faq" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <HelpCircle className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 07</span>
              <span>•</span>
              <span>Common Queries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              Frequently Asked Questions About Post-Study Life
            </h2>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-[#EBE7E0] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-[#FDFBF7] hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-black text-germany-black font-display">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-germany-red shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 bg-[#FDFBF7] text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-[#EBE7E0]/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
