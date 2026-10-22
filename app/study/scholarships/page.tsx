import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyContentGate } from '@/components/StudyContentGate';

import { ScholarshipsHero } from './components/ScholarshipsHero';
import { ScholarshipsNav } from './components/ScholarshipsNav';
import { MajorScholarshipsSection } from './components/MajorScholarshipsSection';
import { DeutschlandstipendiumDeepDive } from './components/DeutschlandstipendiumDeepDive';
import { FoundationsAndUniversityGrants } from './components/FoundationsAndUniversityGrants';
import { ScholarshipApplicationRoadmap } from './components/ScholarshipApplicationRoadmap';
import { AlternativeFundingSection } from './components/AlternativeFundingSection';
import { ScholarshipsFAQ } from './components/ScholarshipsFAQ';
import { ScholarshipsCTA } from './components/ScholarshipsCTA';

export const metadata: Metadata = {
  title: 'Scholarships & Funding for Germany 2026 | EuropeBridge',
  description: 'Complete guide to German scholarships for international students: DAAD EPOS, Helmut-Schmidt, Deutschlandstipendium (€300/mo), Erasmus+, 13 Begabtenförderungswerke, HiWi assistantships, eligibility, deadlines, and application strategies.',
  keywords: [
    'Germany scholarships',
    'DAAD scholarships 2026',
    'Deutschlandstipendium international students',
    'Erasmus Mundus Germany',
    'fully funded scholarships in Germany',
    'study in Germany free tuition',
    'HiWi jobs Germany',
    'Heinrich Böll scholarship'
  ],
  openGraph: {
    title: 'Scholarships & Funding for Germany 2026 | EuropeBridge',
    description: 'Germany already has low or zero tuition fees. Add a national or foundation scholarship, and your degree becomes completely self-funded.',
    type: 'website',
  }
};

export default function ScholarshipsPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <ScholarshipsHero />
        <ScholarshipsNav />

        <div className="space-y-6 sm:space-y-10 pb-16">
          <MajorScholarshipsSection />
          <DeutschlandstipendiumDeepDive />

          <StudyContentGate guideTitle="Scholarships & Funding Guide">
            <div className="space-y-6 sm:space-y-10">
              <FoundationsAndUniversityGrants />
              <ScholarshipApplicationRoadmap />
              <AlternativeFundingSection />
              <ScholarshipsFAQ />
              <ScholarshipsCTA />
            </div>
          </StudyContentGate>
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
