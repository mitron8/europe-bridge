import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BundleHero } from './components/BundleHero';
import { BundleMatrix } from './components/BundleMatrix';
import { BundleFeatures } from './components/BundleFeatures';
import { BundleProcess } from './components/BundleProcess';
import { BundlePricing } from './components/BundlePricing';
import { BundleBooking } from './components/BundleBooking';
import { BundleFAQ } from './components/BundleFAQ';
import { BundleCTA } from './components/BundleCTA';

export const metadata: Metadata = {
  title: 'German University Document Preparation Bundle (SOP + 2 LORs + CV) | EuropeBridge',
  description: 'Complete German university application document suite: 1 course-specific 2-page SOP, two LORs, and one Europass CV crafted together. Standard 3–5 days (₹13,999) or 48h Express (₹18,999).',
  keywords: [
    'document preparation bundle germany',
    'sop lor cv bundle germany',
    'german university documents package',
    'europass cv and sop germany',
    'masters application documents germany',
    'uni assist document preparation',
    'tu9 application bundle'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/document-preparation-bundle'
  },
  openGraph: {
    title: 'Document Preparation Bundle (SOP + 2 LORs + Europass CV) | EuropeBridge',
    description: 'Get your course-specific SOP, two LORs, and Europass CV prepared together by German admissions specialists. Standard ₹13,999 (save ₹3,997).',
    url: 'https://europebridge.in/services/document-preparation-bundle',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Document Preparation Bundle for German Universities | EuropeBridge',
    description: 'Standard 2-page SOP, two LORs, and Europass CV in a single bundle for German university applications. From ₹13,999.'
  }
};

export default function DocumentPreparationBundlePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Document Preparation Bundle",
    "description": "Comprehensive document preparation suite for German university applications, including one 2-page SOP, two tailored LORs, and one Europass CV, drafted together for complete narrative synchronization.",
    "serviceType": "Application Document Bundle",
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
      "name": "Document Preparation Bundle",
      "lowPrice": 13999,
      "highPrice": 18999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/document-preparation-bundle"
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
        "item": "https://europebridge.in/#our-process"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Document Preparation Bundle",
        "item": "https://europebridge.in/services/document-preparation-bundle"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does the Document Preparation Bundle include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The bundle includes: (1) Standard 2-page course-specific SOP tailored to your target German university; (2) Two distinct Letters of Recommendation (Academic, Professional, or mixed); (3) Europass Tabellarischer Lebenslauf (German-standard CV, max 2 pages)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is ordering the bundle better than ordering documents separately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You save ₹3,997 (over 22% discount) compared to individual pricing, and all 4 documents are drafted in sync by our admissions team to guarantee complete consistency in timelines, projects, and skills."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the whole process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard Order: First drafts for all 4 documents delivered within 3 to 5 working days. Express Order: First drafts delivered within 1 to 2 working days (48 hours)."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen neu-bg text-germany-black selection:bg-germany-red selection:text-white font-sans scroll-smooth">
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

      <Navbar />

      <main className="pt-20 sm:pt-24 pb-16 space-y-4">
        <BundleHero />
        <BundleMatrix />
        <BundleFeatures />
        <BundleProcess />
        <BundlePricing />
        <BundleBooking />
        <BundleFAQ />
        <BundleCTA />
      </main>

      <Footer />
    </div>
  );
}
