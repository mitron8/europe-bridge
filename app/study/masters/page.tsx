import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { MastersHeroHeader } from './components/MastersHeroHeader';
import { MastersSectionNav } from './components/MastersSectionNav';
import { MastersOverviewSection } from './components/MastersOverviewSection';
import { UniversityTypesSection } from './components/UniversityTypesSection';
import { EligibilityAndRequirementsSection } from './components/EligibilityAndRequirementsSection';
import { DeadlinesAndSemestersSection } from './components/DeadlinesAndSemestersSection';
import { CostsAndFundingSection } from './components/CostsAndFundingSection';
import { WorkingWhileStudyingSection } from './components/WorkingWhileStudyingSection';
import { CareerAndBlueCardSection } from './components/CareerAndBlueCardSection';
import { ToolsAndResourcesSection } from './components/ToolsAndResourcesSection';
import { MastersFAQ } from './components/MastersFAQ';
import { MastersCTA } from './components/MastersCTA';

export const metadata: Metadata = {
  title: "Complete Master's in Germany Guide 2026 | 0€ Tuition & English Taught | EuropeBridge",
  description: "Ultimate guide to studying a Master's degree in Germany: 0€ tuition fees at top public universities (TU9 & UAS), 120 ECTS credit rules, Bavarian GPA, APS certificate, deadlines, part-time work rights, and EU Blue Card PR settlement.",
  keywords: [
    "Masters in Germany",
    "Study in Germany",
    "Tuition free masters Germany",
    "TU9 universities",
    "English taught masters in Germany",
    "Bavarian formula GPA",
    "APS Certificate Germany",
    "EU Blue Card Germany 2026",
    "Uni-Assist Masters",
    "EuropeBridge"
  ],
  openGraph: {
    title: "Complete Master's in Germany Guide 2026 | EuropeBridge",
    description: "Step-by-step master's guide for international students: free tuition, admission requirements, APS verification, 140 work days, and EU Blue Card career pathways.",
    url: "https://europebridge.in/study/masters",
    siteName: "EuropeBridge",
    locale: "en_US",
    type: "website",
  }
};

export default function MastersGuidePage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <MastersHeroHeader />
      <MastersSectionNav />

      <div className="space-y-6 sm:space-y-10 pb-12">
        <MastersOverviewSection />
        <UniversityTypesSection />
        <EligibilityAndRequirementsSection />
        <DeadlinesAndSemestersSection />
        <CostsAndFundingSection />
        <WorkingWhileStudyingSection />
        <CareerAndBlueCardSection />
        <ToolsAndResourcesSection />
        <MastersFAQ />
        <MastersCTA />
      </div>

      <Footer />
    </main>
  );
}
