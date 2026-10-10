import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { SopHero } from './components/SopHero';
import { SopStructurePreview } from './components/SopStructurePreview';
import { SopFeatures } from './components/SopFeatures';
import { SopPricing } from './components/SopPricing';
import { SopProcess } from './components/SopProcess';
import { SopBooking } from './components/SopBooking';
import { SopFAQ } from './components/SopFAQ';
import { SopCTA } from './components/SopCTA';

export const metadata: Metadata = {
  title: 'German University SOP Writing Service 2026 | EuropeBridge',
  description: 'Professional Statement of Purpose (SOP) writing tailored for German university admissions. 100% original, plagiarism-free, 2 review rounds, Standard 3-day or 24h Express delivery.',
  keywords: [
    'sop writing germany',
    'statement of purpose germany',
    'german university sop',
    'masters sop germany',
    'tum sop writing',
    'rwth aachen sop',
    'uni assist sop format'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/sop-writing'
  },
  openGraph: {
    title: 'Statement of Purpose Writing Service for Germany | EuropeBridge',
    description: 'Professional SOP writing service tailored for German university applications. Standard 3-day or Express 24-hour delivery.',
    url: 'https://europebridge.in/services/sop-writing',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German University SOP Writing Service | EuropeBridge',
    description: 'Profile-specific, plagiarism-free Statement of Purpose for German university admissions. From ₹4,999.'
  }
};

export default function SopWritingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SOP Writing Service for Germany",
    "description": "Professional Statement of Purpose writing service tailored for German university applications. Profile-specific, plagiarism-free, two review rounds, Standard 3-day or Express 1-day delivery.",
    "serviceType": "Application Document Service",
    "category": "Documents & Applications",
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
      "name": "SOP Writing Service",
      "lowPrice": 4999,
      "highPrice": 5999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/sop-writing"
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
        "name": "SOP Writing Service",
        "item": "https://europebridge.in/services/sop-writing"
      }
    ]
  };

  return (
    <div className="min-h-screen neu-bg text-germany-black selection:bg-germany-red selection:text-white font-sans scroll-smooth">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="pt-20 sm:pt-24 pb-16 space-y-4">
        <SopHero />

        <div className="space-y-4">
          <SopStructurePreview />
          <SopFeatures />
          <SopPricing />
          <SopProcess />
          <SopBooking />
          <SopFAQ />
          <SopCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
