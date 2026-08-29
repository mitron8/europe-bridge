import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { HeroHeader } from './components/HeroHeader';
import { SectionNav } from './components/SectionNav';
import { AcademicRequirements } from './components/AcademicRequirements';
import { LanguageRequirements } from './components/LanguageRequirements';
import { RequiredDocuments } from './components/RequiredDocuments';
import { DeadlinesTimeline } from './components/DeadlinesTimeline';
import { GradeConversionSection } from './components/GradeConversionSection';
import { CountrySpecificInfo } from './components/CountrySpecificInfo';
import { RequirementsCTA } from './components/RequirementsCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Requirements for German Universities 2026 | EuropeBridge',
  description: 'Complete guide on GPA requirements, language scores (IELTS, TOEFL, TestDaF), APS certificate, document checklists, and application deadlines for studying in Germany.',
};

export default function RequirementsPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <HeroHeader />
      <SectionNav />
      
      <div className="space-y-4">
        <AcademicRequirements />
        <LanguageRequirements />
        <RequiredDocuments />
        <DeadlinesTimeline />
        <GradeConversionSection />
        <CountrySpecificInfo />
        <RequirementsCTA />
      </div>

      <Footer />
    </main>
  );
}
