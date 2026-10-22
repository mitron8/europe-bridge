import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { ShortlistingHero } from './components/ShortlistingHero';
import { ShortlistingReadinessWidget } from './components/ShortlistingReadinessWidget';
import { ShortlistingFeatures } from './components/ShortlistingFeatures';
import { ShortlistingPricing } from './components/ShortlistingPricing';
import { ShortlistingProcess } from './components/ShortlistingProcess';
import { ShortlistingBooking } from './components/ShortlistingBooking';
import { ShortlistingFAQ } from './components/ShortlistingFAQ';
import { ShortlistingCTA } from './components/ShortlistingCTA';

export const metadata: Metadata = {
  title: 'German University Shortlisting Service 2026 | EuropeBridge',
  description: 'Get a curated, eligibility-audited list of up to 10 German public university programs matching your GPA and ECTS credits. Standard 3-day or 24-hour Express delivery.',
  keywords: [
    'university shortlisting germany',
    'german university shortlist',
    'masters in germany shortlisting',
    'tu9 universities shortlisting',
    'ects credit calculator germany',
    'uni assist course search',
    'study in germany counseling'
  ],
  alternates: {
    canonical: 'https://europebridge.in/services/university-shortlisting'
  },
  openGraph: {
    title: 'German University Shortlisting Service 2026 | EuropeBridge',
    description: 'Get a curated list of up to 10 German university programs that match your academic profile. First draft in 3 working days (or 24h Express).',
    url: 'https://europebridge.in/services/university-shortlisting',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German University Shortlisting Service | EuropeBridge',
    description: 'Curated list of up to 10 German university programs matched to your degree and ECTS credits. From ₹4,999.'
  }
};

export default function UniversityShortlistingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "University Shortlisting Service for Germany",
    "description": "Get a curated list of up to 10 German university programs that match your academic profile, ECTS credits, and career goals. Standard draft in 3 days, Express in 1 day.",
    "serviceType": "Academic Admissions & University Placement",
    "category": "Admissions & Visa",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "EuropeBridge",
      "url": "https://europebridge.in"
    },
    "areaServed": [
      { "@type": "Country", "name": "Germany" },
      { "@type": "Country", "name": "India" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "name": "University Shortlisting",
      "lowPrice": 4999,
      "highPrice": 5999,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://europebridge.in/services/university-shortlisting"
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
        "name": "University Shortlisting",
        "item": "https://europebridge.in/services/university-shortlisting"
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
          <ShortlistingHero />

          <div className="space-y-8 sm:space-y-12">
            <ShortlistingReadinessWidget />
            <ShortlistingFeatures />
            <ShortlistingPricing />
            <ShortlistingProcess />
            <ShortlistingBooking />
            <ShortlistingFAQ />
            <ShortlistingCTA />
          </div>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
