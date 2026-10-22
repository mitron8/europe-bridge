import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { LomHero } from './components/LomHero';
import { LomVsSopGuide } from './components/LomVsSopGuide';
import { LomFeatures } from './components/LomFeatures';
import { LomProcess } from './components/LomProcess';
import { LomPricing } from './components/LomPricing';
import { LomBooking } from './components/LomBooking';
import { LomFAQ } from './components/LomFAQ';
import { LomCTA } from './components/LomCTA';

export const metadata: Metadata = {
  title: 'Letter of Motivation for German Student Visa 2026 | EuropeBridge',
  description: 'Consulate-compliant Letter of Motivation (LOM) writing for German student visa applicants. Built on § 16b AufenthG standards, 2 review rounds, Standard 3-day or 24h Express delivery.',
  keywords: [
    'letter of motivation german student visa',
    'visa motivation letter germany',
    'german embassy lom format',
    'vfs germany motivation letter',
    'germany student visa sop',
    'section 16b aufenthg motivation letter',
    'german student visa rejection appeal'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/letter-of-motivation-for-german-student-visa'
  },
  openGraph: {
    title: 'Letter of Motivation for German Student Visa | EuropeBridge',
    description: 'Consulate-ready Visa Motivation Letter crafted by German visa experts. 2 review cycles, Standard 3-day or Express 24-hour turnaround.',
    url: 'https://europebridge.in/services/letter-of-motivation-for-german-student-visa',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letter of Motivation for German Student Visa | EuropeBridge',
    description: 'Tailored German Student Visa Letter of Motivation compliant with German consular criteria. From ₹3,999.'
  }
};

export default function LetterOfMotivationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Letter of Motivation for German Student Visa",
    "description": "Professional German Student Visa Letter of Motivation writing service. Formatted for the German Embassy & Consulates under § 16b AufenthG, two review rounds, Standard 3-day or Express 24h turnaround.",
    "serviceType": "Visa Documentation Service",
    "category": "Visa & Immigration Support",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "EuropeBridge",
      "url": "https://europebridge.in"
    },
    "areaServed": [
      { "@type": "Place", "name": "Germany" },
      { "@type": "Place", "name": "India" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "name": "Visa Motivation Letter Service",
      "lowPrice": 3999,
      "highPrice": 4999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/letter-of-motivation-for-german-student-visa"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://europebridge.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://europebridge.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Letter of Motivation for German Visa",
        "item": "https://europebridge.in/services/letter-of-motivation-for-german-student-visa"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why can't I just submit my university SOP for my German student visa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A university SOP is written for professors and admissions committees, focusing on coursework theory and lab research. In contrast, the German Consulate evaluates legal compliance under § 16b AufenthG: genuine student intent, financial stability (€11,904 blocked account), why Germany over your home country, and a clear post-graduation career plan."
        }
      },
      {
        "@type": "Question",
        "name": "What is the standard length and formatting required by the German Embassy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "German consular missions strictly prefer a concise, well-structured letter of 1.5 to 2 pages (typically 750 to 950 words) with proper recipient embassy address, official date conventions, and clear paragraph headings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between the Standard Plan (₹3,999) and Express Plan (₹4,999)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both plans provide the exact same high-caliber writing and two review rounds. Standard is delivered in 3 working days, while Express is prioritized and delivered within 24 hours (1 working day)."
        }
      },
      {
        "@type": "Question",
        "name": "How many rounds of revisions are included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every order includes up to two complete rounds of student review via Google Docs comments to ensure all academic, financial, and personal nuances are captured accurately."
        }
      }
    ]
  };

  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <LandingNavbar />

        <div className="pt-24 sm:pt-28 pb-16 space-y-8 sm:space-y-12">
          <LomHero />
          <LomVsSopGuide />
          <LomFeatures />
          <LomProcess />
          <LomPricing />
          <LomBooking />
          <LomFAQ />
          <LomCTA />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
