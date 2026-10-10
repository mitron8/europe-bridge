import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { InsuranceHero } from './components/InsuranceHero';
import { InsuranceNav } from './components/InsuranceNav';
import { InsuranceFeatures } from './components/InsuranceFeatures';
import { PublicVsPrivateSection } from './components/PublicVsPrivateSection';
import { InsuranceProviders } from './components/InsuranceProviders';
import { InsuranceProcess } from './components/InsuranceProcess';
import { InsuranceBookingForm } from './components/InsuranceBookingForm';
import { InsuranceFAQ } from './components/InsuranceFAQ';
import { InsuranceCTA } from './components/InsuranceCTA';
import { StudyContentGate } from '@/components/StudyContentGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'German Health Insurance Setup for Students & Expats 2026 | EuropeBridge',
  description:
    'Expert assistance with public (TK, Barmer, AOK) or private German health insurance setup. Provider comparison, application support, and digital M10 university notification.',
  keywords: [
    'health insurance germany',
    'german health insurance setup',
    'public health insurance germany',
    'private health insurance germany',
    'TK AOK international students',
    'techniker krankenkasse student visa',
    'm10 electronic notification germany'
  ],
  openGraph: {
    title: 'German Health Insurance Setup for Students & Expats 2026 | EuropeBridge',
    description:
      'Expert assistance with public (TK, Barmer, AOK) or private German health insurance setup. Provider comparison, application support, and digital M10 university notification.',
    url: 'https://europebridge.in/study/health-insurance',
    type: 'website'
  }
};

export default function HealthInsurancePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'German Health Insurance Setup',
    description:
      'Expert assistance with public or private German health insurance setup. Provider comparison, application support, and digital M10 university notification for international students moving to Germany.',
    serviceType: 'Relocation & Visa Support Service',
    category: 'Settlement',
    url: 'https://europebridge.in/study/health-insurance',
    provider: {
      '@type': 'Organization',
      name: 'EuropeBridge',
      url: 'https://europebridge.in'
    },
    areaServed: [
      { '@type': 'Place', name: 'Germany' },
      { '@type': 'Place', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' }
    ]
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
        name: 'German Health Insurance Setup',
        item: 'https://europebridge.in/study/health-insurance'
      }
    ]
  };

  return (
    <main className="min-h-screen neu-bg">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <InsuranceHero />
      <InsuranceNav />

      <div className="space-y-4">
        <InsuranceFeatures />
        <PublicVsPrivateSection />

        <StudyContentGate guideTitle="Health Insurance Guide">
          <div className="space-y-4">
            <InsuranceProviders />
            <InsuranceProcess />
            <InsuranceBookingForm />
            <InsuranceFAQ />
            <InsuranceCTA />
          </div>
        </StudyContentGate>
      </div>

      <Footer />
    </main>
  );
}
