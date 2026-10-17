import React from 'react';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import { LifeAfterOfferHero } from './components/LifeAfterOfferHero';
import { LifeAfterOfferSectionNav } from './components/LifeAfterOfferSectionNav';
import { JobSeekerVisaSection } from './components/JobSeekerVisaSection';
import { EUBlueCardSection } from './components/EUBlueCardSection';
import { StartingSalariesSection } from './components/StartingSalariesSection';
import { CareerPlaybookSection } from './components/CareerPlaybookSection';
import { PRAndCitizenshipRoadmap } from './components/PRAndCitizenshipRoadmap';
import { BlueCardEligibilityCalculator } from './components/BlueCardEligibilityCalculator';
import { LifeAfterOfferFAQ } from './components/LifeAfterOfferFAQ';
import { LifeAfterOfferCTA } from './components/LifeAfterOfferCTA';
import { StudyContentGate } from '@/components/StudyContentGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life After Offer & Career Prospects in Germany 2026 | EuropeBridge',
  description: 'Post-study career guide: 18-month job seeker visa (§20 AufenthG), €45,934.20 EU Blue Card threshold for recent grads, starting salaries by field, and fast-track permanent residence in 21 months.',
  keywords: [
    'career after studying Germany',
    'life after offer Germany',
    '18 month job seeker visa Germany',
    'EU Blue Card salary 2026',
    'German permanent residence 21 months',
    'starting salary master Germany',
    'working student Werkstudent Germany',
    'dual citizenship Germany'
  ],
  openGraph: {
    title: 'Life After Offer & Career Prospects in Germany 2026 | EuropeBridge',
    description: 'Post-study career guide: 18-month job seeker visa, 2026 EU Blue Card thresholds, graduate salaries, and the roadmap to German permanent residency.',
    type: 'article',
    url: 'https://europebridge.in/study/life-after-offer',
  }
};

export default function LifeAfterOfferPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Life After Offer & Career Prospects After Studying in Germany 2026',
    description: 'Complete guide for international students: 18-month job seeker visa under §20 AufenthG, 2026 EU Blue Card thresholds (€45,934.20 for recent grads), starting salaries, and PR in 21 months.',
    author: {
      '@type': 'Organization',
      name: 'EuropeBridge'
    },
    publisher: {
      '@type': 'Organization',
      name: 'EuropeBridge'
    },
    datePublished: '2026-01-15',
    dateModified: '2026-05-15'
  };

  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <LifeAfterOfferHero />
        <LifeAfterOfferSectionNav />

        <div className="space-y-4">
          <JobSeekerVisaSection />
          <EUBlueCardSection />

          <StudyContentGate guideTitle="Career & Life in Germany Guide">
            <div className="space-y-4">
              <StartingSalariesSection />
              <CareerPlaybookSection />
              <PRAndCitizenshipRoadmap />
              <BlueCardEligibilityCalculator />
              <LifeAfterOfferFAQ />
              <LifeAfterOfferCTA />
            </div>
          </StudyContentGate>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
      <SmoothScroll />
    </main>
  );
}
