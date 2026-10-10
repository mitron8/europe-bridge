import React from 'react';
import Navbar from '@/app/components/Navbar';
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
import { Metadata } from 'next';

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
    <main className="min-h-screen neu-bg pt-20 sm:pt-24 pb-16 space-y-4">
      <Navbar />
      <BlockedAccountHero />
      
      <div className="space-y-4">
        <BlockedAccountCalculator />
        <BlockedAccountProviders />
        <BlockedAccountFeatures />
        <BlockedAccountPricing />
        <BlockedAccountProcess />
        <BlockedAccountForm />
        <BlockedAccountFAQ />
        <BlockedAccountCTA />
      </div>

      <Footer />
    </main>
  );
}
