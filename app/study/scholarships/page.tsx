import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ScholarshipsHero } from './components/ScholarshipsHero';
import { ScholarshipsNav } from './components/ScholarshipsNav';
import { MajorScholarshipsSection } from './components/MajorScholarshipsSection';
import { DeutschlandstipendiumDeepDive } from './components/DeutschlandstipendiumDeepDive';
import { FoundationsAndUniversityGrants } from './components/FoundationsAndUniversityGrants';
import { ScholarshipApplicationRoadmap } from './components/ScholarshipApplicationRoadmap';
import { AlternativeFundingSection } from './components/AlternativeFundingSection';
import { ScholarshipsFAQ } from './components/ScholarshipsFAQ';
import { ScholarshipsCTA } from './components/ScholarshipsCTA';
import { Metadata } from 'next';

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
    <main className="min-h-screen neu-bg">
      <Navbar />
      <ScholarshipsHero />
      <ScholarshipsNav />

      <div className="space-y-4">
        <MajorScholarshipsSection />
        <DeutschlandstipendiumDeepDive />
        <FoundationsAndUniversityGrants />
        <ScholarshipApplicationRoadmap />
        <AlternativeFundingSection />
        <ScholarshipsFAQ />
        <ScholarshipsCTA />
      </div>

      <Footer />
    </main>
  );
}
