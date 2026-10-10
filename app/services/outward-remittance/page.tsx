import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { RemittanceHero } from './components/RemittanceHero';
import { RemittanceCalculator } from './components/RemittanceCalculator';
import { RemittanceFeatures } from './components/RemittanceFeatures';
import { RemittanceComparison } from './components/RemittanceComparison';
import { RemittancePricing } from './components/RemittancePricing';
import { RemittanceProcess } from './components/RemittanceProcess';
import { RemittanceBooking } from './components/RemittanceBooking';
import { RemittanceFAQ } from './components/RemittanceFAQ';
import { RemittanceCTA } from './components/RemittanceCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outward Remittance for Germany (Money Transfer) 2026/2027 | EuropeBridge',
  description: 'Send funds to Germany for your blocked account, university tuition, and rent deposit at wholesale interbank rates. 60-minute callback, domestic INR deposit, and transfer confirmation within 48 hours.',
  keywords: [
    'outward remittance germany',
    'money transfer germany',
    'blocked account remittance',
    'forex transfer germany',
    'rbi lrs education transfer',
    'tcs on foreign remittance germany',
    'student forex card germany',
    'expatrio remittance inr',
    'coracle money transfer'
  ],
  openGraph: {
    title: 'Outward Remittance for Germany (Money Transfer) 2026/2027 | EuropeBridge',
    description: 'Send funds to Germany for your blocked account, university tuition, and rent deposit at wholesale interbank rates. 60-minute callback, domestic INR deposit, and transfer confirmation within 48 hours.',
    url: 'https://europebridge.in/services/outward-remittance',
    type: 'website'
  }
};

export default function OutwardRemittancePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Outward Remittance for Germany',
    description:
      'Fast, compliant, and cost-effective outward remittance service for Indian students transferring funds to German blocked accounts, universities, and accommodation.',
    serviceType: 'Financial & Forex Service',
    category: 'Settlement',
    url: 'https://europebridge.in/services/outward-remittance',
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
        name: 'Outward Remittance for Germany',
        item: 'https://europebridge.in/services/outward-remittance'
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
      <RemittanceHero />
      
      <div className="space-y-4">
        <RemittanceCalculator />
        <RemittanceFeatures />
        <RemittanceComparison />
        <RemittancePricing />
        <RemittanceProcess />
        <RemittanceBooking />
        <RemittanceFAQ />
        <RemittanceCTA />
      </div>

      <Footer />
    </main>
  );
}
