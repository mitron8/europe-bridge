import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
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

export const metadata: Metadata = {
  title: 'APS Verification Guide 2026 | India, China, Vietnam | EuropeBridge',
  description: 'Complete guide on the APS (Akademische Prüfstelle) verification process for Indian, Chinese, and Vietnamese students applying to German universities. Fees, documents, interview prep, and digital PDF issuance.',
};

export default function APSPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <APSHeroHeader />
        <APSSectionNav />

        <div className="space-y-6">
          <WhatIsAPS />
          <APSDocumentsChecklist />

          <StudyContentGate guideTitle="APS Verification Guide">
            <div className="space-y-6">
              <APSProcessSteps />
              <APSInterviewPrep />
              <APSFailureHandling />
              <PostAPSSteps />
              <APSFAQ />
              <APSCTA />
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
