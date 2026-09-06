import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BlockedAccountHero } from './components/BlockedAccountHero';
import { BlockedAccountFeatures } from './components/BlockedAccountFeatures';
import { BlockedAccountPricing } from './components/BlockedAccountPricing';
import { BlockedAccountProcess } from './components/BlockedAccountProcess';
import { BlockedAccountForm } from './components/BlockedAccountForm';
import { BlockedAccountFAQ } from './components/BlockedAccountFAQ';
import { BlockedAccountCTA } from './components/BlockedAccountCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blocked Account for Germany 2026 | EuropeBridge',
  description: 'Open your official German blocked account for student visa interviews. Get 24-hour blocking confirmation, 60-minute counselor response, and full visa compliance.',
};

export default function BlockedAccountPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <BlockedAccountHero />
      
      <div className="space-y-4">
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
