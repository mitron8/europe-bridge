import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { VisaHero } from './components/VisaHero';
import { VisaSectionNav } from './components/VisaSectionNav';
import { CSPAndVidexSection } from './components/CSPAndVidexSection';
import { VisaDocumentsChecklist } from './components/VisaDocumentsChecklist';
import { VisaProcessTimeline } from './components/VisaProcessTimeline';
import { VisaInterviewPrep } from './components/VisaInterviewPrep';
import { VisaSupportPlans } from './components/VisaSupportPlans';
import { VisaFAQ } from './components/VisaFAQ';
import { VisaCTA } from './components/VisaCTA';
import { StudyContentGate } from '@/components/StudyContentGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'German Student Visa (National Visa D) Application Guide 2026 | EuropeBridge',
  description: 'End-to-end German Student Visa assistance via the Consular Services Portal (CSP) and VFS Global. VIDEX forms, €11,904 blocked account, document checklists, VFS slot booking, and 1:1 interview prep.',
};

export default function StudentVisaPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <VisaHero />
      <VisaSectionNav />

      <div className="space-y-4">
        <CSPAndVidexSection />
        <VisaDocumentsChecklist />

        <StudyContentGate guideTitle="German Student Visa Guide">
          <div className="space-y-4">
            <VisaProcessTimeline />
            <VisaInterviewPrep />
            <VisaSupportPlans />
            <VisaFAQ />
            <VisaCTA />
          </div>
        </StudyContentGate>
      </div>

      <Footer />
    </main>
  );
}
