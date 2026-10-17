import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import { StudyContentGate } from '@/components/StudyContentGate';

import { VisaHero } from './components/VisaHero';
import { VisaSectionNav } from './components/VisaSectionNav';
import { CSPAndVidexSection } from './components/CSPAndVidexSection';
import { VisaDocumentsChecklist } from './components/VisaDocumentsChecklist';
import { VisaProcessTimeline } from './components/VisaProcessTimeline';
import { VisaInterviewPrep } from './components/VisaInterviewPrep';
import { VisaSupportPlans } from './components/VisaSupportPlans';
import { VisaFAQ } from './components/VisaFAQ';
import { VisaCTA } from './components/VisaCTA';

export const metadata: Metadata = {
  title: 'German Student Visa (National Visa D) Application Guide 2026 | EuropeBridge',
  description: 'End-to-end German Student Visa assistance via the Consular Services Portal (CSP) and VFS Global. VIDEX forms, €11,904 blocked account, document checklists, VFS slot booking, and 1:1 interview prep.',
};

export default function StudentVisaPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <VisaHero />
        <VisaSectionNav />

        <div className="space-y-6 sm:space-y-10 pb-16">
          <CSPAndVidexSection />
          <VisaDocumentsChecklist />

          <StudyContentGate guideTitle="German Student Visa Guide">
            <div className="space-y-6 sm:space-y-10">
              <VisaProcessTimeline />
              <VisaInterviewPrep />
              <VisaSupportPlans />
              <VisaFAQ />
              <VisaCTA />
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
