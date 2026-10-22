import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { DHLExpressHero } from './components/DHLExpressHero';
import { DHLFeatures } from './components/DHLFeatures';
import { DHLProcess } from './components/DHLProcess';
import { DHLPricingComparison } from './components/DHLPricingComparison';
import { DHLBookingForm } from './components/DHLBookingForm';
import { DHLFAQ } from './components/DHLFAQ';
import { DHLCTA } from './components/DHLCTA';

export const metadata: Metadata = {
  title: 'DHL Express University Courier Booking | Flat ₹2,033 | EuropeBridge',
  description: 'Send university applications and transcripts via DHL Express at flat ₹2,033 per application. 3-4 working day door-to-door delivery to German universities and uni-assist Berlin with full AWB tracking.',
  keywords: [
    'dhl express germany university courier',
    'send documents to uni-assist',
    'uni assist courier dhl',
    'send transcripts to germany',
    'student courier discount dhl',
    'dhl express booking india germany',
    'germany university application courier',
    'europebridge dhl courier'
  ],
  openGraph: {
    title: 'DHL Express University Courier Booking | Flat ₹2,033 | EuropeBridge',
    description: 'Send university applications and transcripts via DHL Express at flat ₹2,033 per application. 3-4 working day door-to-door delivery to German universities and uni-assist Berlin with full AWB tracking.',
    url: 'https://europebridge.in/services/dhl-express',
    type: 'website'
  }
};

export default function DHLExpressPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DHL Express University Courier Booking',
    description: 'Discounted express courier service for international students sending university application documents, transcripts, and APS dossiers to Germany in 3-4 working days.',
    serviceType: 'Document Courier & Air Express',
    category: 'Logistics',
    priceRange: 'INR 2033',
    url: 'https://europebridge.in/services/dhl-express',
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
      '@type': 'Offer',
      name: 'DHL Express Student Application Courier',
      price: 2033,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: 'https://europebridge.in/services/dhl-express'
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
        name: 'Services',
        item: 'https://europebridge.in/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'DHL Express Booking',
        item: 'https://europebridge.in/services/dhl-express'
      }
    ]
  };

  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
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
          <DHLExpressHero />
          <div className="space-y-8 sm:space-y-12">
            <DHLFeatures />
            <DHLProcess />
            <DHLPricingComparison />
            <DHLBookingForm />
            <DHLFAQ />
            <DHLCTA />
          </div>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
