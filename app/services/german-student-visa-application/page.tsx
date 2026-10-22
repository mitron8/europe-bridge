import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
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
        "item": "https://europebridge.in/services"
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
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        {/* Structured Data Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <LandingNavbar />

        <div className="pt-24 sm:pt-28 pb-16 space-y-8 sm:space-y-12">
          <VisaHero />

          <div className="space-y-8 sm:space-y-12">
            <VisaRoadmap />
            <VisaFeatures />
            <VisaPricing />
            <VisaProcess />
            <VisaBooking />
            <VisaFAQ />
            <VisaCTA />
          </div>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
