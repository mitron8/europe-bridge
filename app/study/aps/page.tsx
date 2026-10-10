import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { APSHeroHeader } from './components/APSHeroHeader';
import { APSSectionNav } from './components/APSSectionNav';
import { WhatIsAPS } from './components/WhatIsAPS';
import { APSDocumentsChecklist } from './components/APSDocumentsChecklist';
import { APSProcessSteps } from './components/APSProcessSteps';
import { APSInterviewPrep } from './components/APSInterviewPrep';
import { APSFailureHandling } from './components/APSFailureHandling';
import { PostAPSSteps } from './components/PostAPSSteps';
import { APSFAQ } from './components/APSFAQ';
import { APSCTA } from './components/APSCTA';
import { StudyContentGate } from '@/components/StudyContentGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'APS Verification Guide 2026 | India, China, Vietnam | EuropeBridge',
  description: 'Complete guide on the APS (Akademische Prüfstelle) verification process for Indian, Chinese, and Vietnamese students applying to German universities. Fees, documents, interview prep, and digital PDF issuance.',
};

export default function APSPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <APSHeroHeader />
      <APSSectionNav />

      <div className="space-y-4">
        <WhatIsAPS />
        <APSDocumentsChecklist />

        <StudyContentGate guideTitle="APS Verification Guide">
          <div className="space-y-4">
            <APSProcessSteps />
            <APSInterviewPrep />
            <APSFailureHandling />
            <PostAPSSteps />
            <APSFAQ />
            <APSCTA />
          </div>
        </StudyContentGate>
      </div>

      <Footer />
    </main>
  );
}
