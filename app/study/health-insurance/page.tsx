import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import { StudyContentGate } from '@/components/StudyContentGate';

import { InsuranceHero } from './components/InsuranceHero';
import { InsuranceNav } from './components/InsuranceNav';
import { InsuranceFeatures } from './components/InsuranceFeatures';
import { PublicVsPrivateSection } from './components/PublicVsPrivateSection';
import { InsuranceProviders } from './components/InsuranceProviders';
import { InsuranceProcess } from './components/InsuranceProcess';
import { InsuranceBookingForm } from './components/InsuranceBookingForm';
import { InsuranceFAQ } from './components/InsuranceFAQ';
import { InsuranceCTA } from './components/InsuranceCTA';

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
      'Expert assistance with public or private German health insurance setup. Provider comparison, application support, and digital M10 university notification.',
    url: 'https://europebridge.in/study/health-insurance',
    type: 'website'
  }
};

export default function HealthInsurancePage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <InsuranceHero />
        <InsuranceNav />

        <div className="space-y-6 sm:space-y-10 pb-16">
          <InsuranceFeatures />
          <PublicVsPrivateSection />

          <StudyContentGate guideTitle="Health Insurance Guide">
            <div className="space-y-6 sm:space-y-10">
              <InsuranceProviders />
              <InsuranceProcess />
              <InsuranceBookingForm />
              <InsuranceFAQ />
              <InsuranceCTA />
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
