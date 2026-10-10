import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { VisaHero } from './components/VisaHero';
import { VisaRoadmap } from './components/VisaRoadmap';
import { VisaFeatures } from './components/VisaFeatures';
import { VisaPricing } from './components/VisaPricing';
import { VisaProcess } from './components/VisaProcess';
import { VisaBooking } from './components/VisaBooking';
import { VisaFAQ } from './components/VisaFAQ';
import { VisaCTA } from './components/VisaCTA';

export const metadata: Metadata = {
  title: 'German Student Visa Application Service (CSP / VFS) | EuropeBridge',
  description: 'End-to-end German Student Visa support via the Consular Services Portal (CSP) and VFS Global. Premium plan ₹14,999, Complete plan ₹19,999. CSP registration, VIDEX form, document upload, VFS booking, interview prep.',
  keywords: [
    'german student visa',
    'csp portal germany',
    'vfs global germany visa',
    'national visa germany',
    'videx form',
    'germany study visa interview',
    'consular services portal'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/german-student-visa-application'
  },
  openGraph: {
    title: 'German Student Visa Application Service (CSP / VFS) | EuropeBridge',
    description: 'Full-scale support for your Germany National Visa application. CSP registration, VIDEX form, document audit, VFS appointment booking, and 1:1 interview prep.',
    url: 'https://europebridge.in/services/german-student-visa-application',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Student Visa Application Service | EuropeBridge',
    description: 'Expert guidance for your German Student Visa application via the Consular Services Portal (CSP) and VFS Global. From ₹14,999.'
  }
};

export default function GermanStudentVisaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "German Student Visa Application Service (CSP / VFS)",
    "description": "End-to-end German Student Visa support via the Consular Services Portal (CSP) and VFS Global. Premium plan ₹14,999, Complete plan ₹19,999. CSP registration, VIDEX form, document upload, VFS booking, interview prep.",
    "serviceType": "Application Document Service",
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
      "@type": "AggregateOffer",
      "name": "German Student Visa Application Service",
      "lowPrice": 14999,
      "highPrice": 19999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/german-student-visa-application"
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
        "name": "German Student Visa Application",
        "item": "https://europebridge.in/services/german-student-visa-application"
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
        <VisaHero />

        <div className="space-y-4">
          <VisaRoadmap />
          <VisaFeatures />
          <VisaPricing />
          <VisaProcess />
          <VisaBooking />
          <VisaFAQ />
          <VisaCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
