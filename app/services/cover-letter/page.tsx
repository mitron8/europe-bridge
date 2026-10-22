import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { CoverLetterHero } from './components/CoverLetterHero';
import { CoverLetterBlueprint } from './components/CoverLetterBlueprint';
import { CoverLetterFeatures } from './components/CoverLetterFeatures';
import { CoverLetterPricing } from './components/CoverLetterPricing';
import { CoverLetterProcess } from './components/CoverLetterProcess';
import { CoverLetterBooking } from './components/CoverLetterBooking';
import { CoverLetterFAQ } from './components/CoverLetterFAQ';
import { CoverLetterCTA } from './components/CoverLetterCTA';

export const metadata: Metadata = {
  title: 'German Visa Cover Letter Writing Service 2026 | EuropeBridge',
  description: 'Professional Cover Letter (Begleitschreiben) writing for German student visa dossiers, Ausbildung, and universities. DIN 5008 format, document index, Standard 3-day or 24h Express delivery.',
  keywords: [
    'cover letter germany',
    'german student visa cover letter',
    'begleitschreiben visum deutschland',
    'vfs germany cover letter',
    'ausbildung cover letter',
    'german visa document index',
    'anschreiben working student'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/cover-letter'
  },
  openGraph: {
    title: 'Professional Cover Letter Writing Service | EuropeBridge',
    description: 'Get an authoritative Cover Letter tailored for your German student visa dossier or Ausbildung application. Standard ₹999 (3 days), Express ₹1,499 (24h).',
    url: 'https://europebridge.in/services/cover-letter',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Visa Cover Letter Writing Service | EuropeBridge',
    description: 'Customized German Visa Cover Letter with full appended document checklist. From ₹999.'
  }
};

export default function CoverLetterPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cover Letter Writing Service",
    "description": "Professional Cover Letter writing for German student visa dossiers, university applications, or Ausbildung. DIN 5008 standard, itemized document checklist, two review rounds, Standard 3-day or Express 24h delivery.",
    "serviceType": "Visa Document Preparation",
    "category": "Documents & Applications",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "EuropeBridge",
      "url": "https://europebridge.in"
    },
    "areaServed": [
      { "@type": "Place", "name": "Germany" },
      { "@type": "Place", "name": "India" },
      { "@type": "Place", "name": "Worldwide" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "name": "Cover Letter Writing",
      "lowPrice": 999,
      "highPrice": 1499,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/cover-letter"
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
        "name": "Cover Letter Writing",
        "item": "https://europebridge.in/services/cover-letter"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between a Cover Letter and a Letter of Motivation (LOM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Cover Letter (Begleitschreiben) is strictly a 1-page formal executive summary and itemized document index for the VFS counter and consular officer. A Letter of Motivation (LOM) is an in-depth 2-page personal narrative exploring your academic history, specific curriculum modules, § 16b AufenthG compliance, and long-term career aspirations."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the whole process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard Order: First draft delivered in 3 working days. Express Order: First draft delivered within 1 working day (24 hours)."
        }
      },
      {
        "@type": "Question",
        "name": "Will the Cover Letter be plagiarism-free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our content is 100% original, written for specific student profiles and completely plagiarism-free."
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
          <CoverLetterHero />
          <CoverLetterBlueprint />
          <CoverLetterFeatures />
          <CoverLetterProcess />
          <CoverLetterPricing />
          <CoverLetterBooking />
          <CoverLetterFAQ />
          <CoverLetterCTA />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
