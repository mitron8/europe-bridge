import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { DmatHero } from './components/DmatHero';
import { DmatEligibilityChecker } from './components/DmatEligibilityChecker';
import { DmatFeatures } from './components/DmatFeatures';
import { DmatGuides } from './components/DmatGuides';
import { DmatPricing } from './components/DmatPricing';
import { DmatFAQ } from './components/DmatFAQ';
import { DmatCTA } from './components/DmatCTA';

export const metadata: Metadata = {
  title: 'dMAT + APS Fast-Track Registration 2026-2027 | EuropeBridge',
  description: 'Official dMAT registration, Indian test centre booking, mock exam preparation, and APS India timeline guidance. Registered before the deadline, or full refund.',
  keywords: [
    'dmat registration india',
    'dmat aps fast track',
    'gast dmat test centres',
    'dmat exam fee gast',
    'aps certificate with dmat',
    'dmat sample questions',
    'masters in germany dmat'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/dmat-aps-fast-track'
  },
  openGraph: {
    title: 'dMAT + APS Fast-Track Registration 2026-2027 | EuropeBridge',
    description: 'Get registered for the dMAT before the deadline with full test centre booking and mock tests, or your money back.',
    url: 'https://europebridge.in/services/dmat-aps-fast-track',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dMAT + APS Fast-Track | EuropeBridge',
    description: 'Official dMAT registration and APS India guidance for Indian Master\'s students. Service fee ₹1,999 with 100% refund guarantee.'
  }
};

export default function DmatApsFastTrackPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "dMAT + APS Fast-Track Registration",
    "description": "dMAT registration, test centre booking, mock-test preparation, and APS guidance for Indian Master's applicants. Registered before the deadline or a full refund.",
    "serviceType": "Admissions & Test Registration Counseling",
    "category": "Admissions & Visa",
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
      "@type": "Offer",
      "name": "dMAT + APS Fast-Track",
      "price": 1999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/dmat-aps-fast-track"
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
        "name": "dMAT + APS Fast-Track",
        "item": "https://europebridge.in/services/dmat-aps-fast-track"
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
        <DmatHero />

        <div className="space-y-4">
          <DmatEligibilityChecker />
          <DmatFeatures />
          <DmatGuides />
          <DmatPricing />
          <DmatFAQ />
          <DmatCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
