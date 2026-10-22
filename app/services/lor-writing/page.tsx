import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { LorHero } from './components/LorHero';
import { LorRecommenderGuide } from './components/LorRecommenderGuide';
import { LorFeatures } from './components/LorFeatures';
import { LorPricing } from './components/LorPricing';
import { LorProcess } from './components/LorProcess';
import { LorBooking } from './components/LorBooking';
import { LorFAQ } from './components/LorFAQ';
import { LorCTA } from './components/LorCTA';

export const metadata: Metadata = {
  title: 'German University LOR Writing Service (2 Letters) | EuropeBridge',
  description: 'Two professionally written Letters of Recommendation (Academic, Professional, or one of each) tailored specifically for German university admissions. 2 review rounds, Standard 3-day or 24h Express delivery.',
  keywords: [
    'lor writing germany',
    'letter of recommendation germany',
    'academic lor german university',
    'professional lor masters germany',
    'tum recommendation letter',
    'rwth aachen lor format',
    'uni assist recommendation letter'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/lor-writing'
  },
  openGraph: {
    title: 'Letter of Recommendation (LOR) Writing Service for Germany | EuropeBridge',
    description: 'Get two tailored LORs calibrated to German university faculty standards. Standard 3-day or Express 24-hour turnaround.',
    url: 'https://europebridge.in/services/lor-writing',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two LORs Bundle for German Admissions | EuropeBridge',
    description: 'Two custom recommendation letters formatted for official letterhead and signed by your professor or manager. From ₹4,999.'
  }
};

export default function LorWritingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "LOR Writing Service for Germany (2 Letters Bundle)",
    "description": "Two professionally written Letters of Recommendation tailored for German university admissions. Profile-specific, plagiarism-free, two review rounds, Standard 3-day or Express 1-day delivery.",
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
      "name": "LOR Writing Service (2 Letters Bundle)",
      "lowPrice": 4999,
      "highPrice": 5999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/lor-writing"
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
        "name": "LOR Writing Service",
        "item": "https://europebridge.in/services/lor-writing"
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
          <LorHero />

          <div className="space-y-8 sm:space-y-12">
            <LorRecommenderGuide />
            <LorFeatures />
            <LorPricing />
            <LorProcess />
            <LorBooking />
            <LorFAQ />
            <LorCTA />
          </div>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
