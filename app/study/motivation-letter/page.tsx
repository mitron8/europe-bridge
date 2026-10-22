import React from 'react';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { MotivationHero } from './components/MotivationHero';
import { MotivationNav } from './components/MotivationNav';
import { MotivationFeatures } from './components/MotivationFeatures';
import { LOMStructureSection } from './components/LOMStructureSection';
import { MotivationProcess } from './components/MotivationProcess';
import { MotivationPricing } from './components/MotivationPricing';
import { MotivationFAQ } from './components/MotivationFAQ';
import { MotivationCTA } from './components/MotivationCTA';
import { StudyContentGate } from '@/components/StudyContentGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Letter of Motivation for German Student Visa (LOM) | EuropeBridge',
  description:
    'Mandatory Letter of Motivation drafted for your German Student Visa application (§ 16b AufenthG). Standard ₹3,999 (3 days), Express ₹4,999 (1 day). Two rounds of student review included.',
  keywords: [
    'letter of motivation germany',
    'lom german student visa',
    'visa motivation letter germany',
    'german consulate motivation letter',
    'sop for german visa',
    'section 16b AufenthG motivation letter'
  ],
  openGraph: {
    title: 'Letter of Motivation for German Student Visa (LOM) | EuropeBridge',
    description:
      'Mandatory Letter of Motivation drafted for your German Student Visa application (§ 16b AufenthG). Standard ₹3,999 (3 days), Express ₹4,999 (1 day). Two rounds of student review included.',
    url: 'https://europebridge.in/study/motivation-letter',
    type: 'website'
  }
};

export default function MotivationLetterPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Letter of Motivation for German Student Visa',
    description:
      'Mandatory Letter of Motivation drafted for your German Student Visa application (§ 16b AufenthG). Standard ₹3,999 (3 days), Express ₹4,999 (1 day). Two rounds of student review included.',
    serviceType: 'Application Document Service',
    category: 'Admissions & Visa',
    priceRange: 'INR 3999 - INR 4999',
    provider: {
      '@type': 'Organization',
      name: 'EuropeBridge',
      url: 'https://europebridge.in'
    },
    areaServed: [
      { '@type': 'Place', name: 'Germany' },
      { '@type': 'Place', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' }
    ],
    offers: {
      '@type': 'AggregateOffer',
      name: 'Letter of Motivation for German Student Visa',
      lowPrice: 3999,
      highPrice: 4999,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://europebridge.in'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Study',
        item: 'https://europebridge.in/study/application-process'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Letter of Motivation for German Student Visa',
        item: 'https://europebridge.in/study/motivation-letter'
      }
    ]
  };

  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <MotivationHero />
        <MotivationNav />

        <div className="space-y-4">
          <MotivationFeatures />
          <LOMStructureSection />

          <StudyContentGate guideTitle="Motivation Letter (LOM) Guide">
            <div className="space-y-4">
              <MotivationProcess />
              <MotivationPricing />
              <MotivationFAQ />
              <MotivationCTA />
            </div>
          </StudyContentGate>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
