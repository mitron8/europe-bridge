import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from '@/app/components/landing/LandingNavbar';
import Footer from '@/app/components/Footer';
import { BlockedAccountHero } from './components/BlockedAccountHero';
import { BlockedAccountCalculator } from './components/BlockedAccountCalculator';
import { BlockedAccountProviders } from './components/BlockedAccountProviders';
import { BlockedAccountFeatures } from './components/BlockedAccountFeatures';
import { BlockedAccountPricing } from './components/BlockedAccountPricing';
import { BlockedAccountProcess } from './components/BlockedAccountProcess';
import { BlockedAccountForm } from './components/BlockedAccountForm';
import { BlockedAccountFAQ } from './components/BlockedAccountFAQ';
import { BlockedAccountCTA } from './components/BlockedAccountCTA';

export const metadata: Metadata = {
  title: 'Blocked Account for Germany 2026/2027 | EuropeBridge',
  description: 'Open your official German Sperrkonto for your student visa interview. Compare BaFin-approved providers (Expatrio, Coracle, Fintiba), calculate INR cost, and get your 24-hour blocking confirmation.',
  keywords: [
    'blocked account germany',
    'sperrkonto germany',
    'german student visa blocked account',
    'expatrio vs coracle vs fintiba',
    'blocked account confirmation',
    'sperrbestätigung 2026',
    'germany student visa financial proof'
  ]
};

export default function BlockedAccountPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <BlockedAccountHero />
        
        <div className="space-y-12 sm:space-y-16 pb-16">
          <BlockedAccountCalculator />
          <BlockedAccountProviders />
          <BlockedAccountFeatures />
          <BlockedAccountPricing />
          <BlockedAccountProcess />
          <BlockedAccountForm />
          <BlockedAccountFAQ />
          <BlockedAccountCTA />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}

