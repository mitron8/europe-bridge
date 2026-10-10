import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { HealthInsuranceHero } from './components/HealthInsuranceHero';
import { HealthInsuranceDecider } from './components/HealthInsuranceDecider';
import { HealthInsuranceProviders } from './components/HealthInsuranceProviders';
import { HealthInsuranceFeatures } from './components/HealthInsuranceFeatures';
import { HealthInsurancePricing } from './components/HealthInsurancePricing';
import { HealthInsuranceProcess } from './components/HealthInsuranceProcess';
import { HealthInsuranceBooking } from './components/HealthInsuranceBooking';
import { HealthInsuranceFAQ } from './components/HealthInsuranceFAQ';
import { HealthInsuranceCTA } from './components/HealthInsuranceCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'German Health Insurance Setup for Students 2026/2027 | EuropeBridge',
  description: 'Expert assistance with public (TK, Barmer, AOK) and private German health insurance setup. Provider comparison, digital M10 university notification, and free incoming travel insurance.',
  keywords: [
    'health insurance germany',
    'german health insurance setup',
    'public health insurance germany',
    'private health insurance germany',
    'TK AOK international students',
    'techniker krankenkasse student visa',
    'm10 electronic notification germany',
    'barmer student insurance',
    'ottonova student health insurance'
  ],
  openGraph: {
    title: 'German Health Insurance Setup for Students 2026/2027 | EuropeBridge',
    description: 'Expert assistance with public (TK, Barmer, AOK) and private German health insurance setup. Provider comparison, digital M10 university notification, and free incoming travel insurance.',
    url: 'https://europebridge.in/services/health-insurance',
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
    url: 'https://europebridge.in/services/health-insurance',
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
        name: 'Services',
        item: 'https://europebridge.in/#our-process'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'German Health Insurance Setup',
        item: 'https://europebridge.in/services/health-insurance'
      }
    ]
  };

  return (
    <main className="min-h-screen neu-bg pt-20 sm:pt-24 pb-16 space-y-4">
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
      <HealthInsuranceHero />
      
      <div className="space-y-4">
        <HealthInsuranceDecider />
        <HealthInsuranceProviders />
        <HealthInsuranceFeatures />
        <HealthInsurancePricing />
        <HealthInsuranceProcess />
        <HealthInsuranceBooking />
        <HealthInsuranceFAQ />
        <HealthInsuranceCTA />
      </div>

      <Footer />
    </main>
  );
}
