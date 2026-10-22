import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
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
        item: 'https://europebridge.in/services'
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
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <LandingNavbar />
        <RemittanceHero />
        
        <div className="space-y-12 sm:space-y-16 pb-16">
          <RemittanceCalculator />
          <RemittanceFeatures />
          <RemittanceComparison />
          <RemittancePricing />
          <RemittanceProcess />
          <RemittanceBooking />
          <RemittanceFAQ />
          <RemittanceCTA />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
