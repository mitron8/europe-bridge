import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { CvHero } from './components/CvHero';
import { CvGermanBlueprint } from './components/CvGermanBlueprint';
import { CvFeatures } from './components/CvFeatures';
import { CvPricing } from './components/CvPricing';
import { CvProcess } from './components/CvProcess';
import { CvBooking } from './components/CvBooking';
import { CvFAQ } from './components/CvFAQ';
import { CvCTA } from './components/CvCTA';

export const metadata: Metadata = {
  title: 'German CV & Lebenslauf Preparation Service | EuropeBridge',
  description: 'Professional German-standard CV (Tabellarischer Lebenslauf) tailored for uni-assist, TU9 German universities, Ausbildung, and Werkstudent jobs. Gapless timeline, Bavarian GPA conversion, PDF + editable Word.',
  keywords: [
    'cv preparation germany',
    'german cv',
    'tabellarischer lebenslauf',
    'europass cv germany',
    'uni assist cv format',
    'ausbildung cv',
    'werkstudent resume germany'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/cv-preparation'
  },
  openGraph: {
    title: 'German CV & Lebenslauf Preparation Service | EuropeBridge',
    description: 'Craft a compelling German-standard resume (Tabellarischer Lebenslauf) tailored for university admissions and employment in Germany.',
    url: 'https://europebridge.in/services/cv-preparation',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Standard CV Preparation | EuropeBridge',
    description: 'Get your German Tabellarischer Lebenslauf drafted by admissions experts. Dual PDF + editable Word formats.'
  }
};

export default function CvPreparationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "German CV & Lebenslauf Preparation Service",
    "description": "Professional CV creation service tailored for German university admissions, Ausbildung, and employment. German standard Tabellarischer Lebenslauf, gapless timeline, ECTS alignment, PDF and editable Word formats.",
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
      "name": "German CV Preparation Service",
      "lowPrice": 4999,
      "highPrice": 5999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/cv-preparation"
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
        "name": "CV Preparation",
        "item": "https://europebridge.in/services/cv-preparation"
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
          <CvHero />

          <div className="space-y-8 sm:space-y-12">
            <CvGermanBlueprint />
            <CvFeatures />
            <CvPricing />
            <CvProcess />
            <CvBooking />
            <CvFAQ />
            <CvCTA />
          </div>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
