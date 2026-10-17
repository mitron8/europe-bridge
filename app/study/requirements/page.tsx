import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import { HeroHeader } from './components/HeroHeader';
import { SectionNav } from './components/SectionNav';
import { AcademicRequirements } from './components/AcademicRequirements';
import { LanguageRequirements } from './components/LanguageRequirements';
import { RequiredDocuments } from './components/RequiredDocuments';
import { DeadlinesTimeline } from './components/DeadlinesTimeline';
import { GradeConversionSection } from './components/GradeConversionSection';
import { CountrySpecificInfo } from './components/CountrySpecificInfo';
import { RequirementsFAQ } from './components/RequirementsFAQ';
import { RequirementsCTA } from './components/RequirementsCTA';
import { StudyContentGate } from '@/components/StudyContentGate';

export const metadata: Metadata = {
  title: 'Admission Requirements for German Universities 2026 | EuropeBridge',
  description: 'Complete guide on GPA requirements, language scores (IELTS, TOEFL, TestDaF), APS certificate, document checklists, and application deadlines for studying in Germany.',
};

export default function RequirementsPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <HeroHeader />
        <SectionNav />
        
        <div className="space-y-6">
          <AcademicRequirements />
          <LanguageRequirements />

          <StudyContentGate guideTitle="Admission Requirements Guide">
            <div className="space-y-6">
              <RequiredDocuments />
              <DeadlinesTimeline />
              <GradeConversionSection />
              <CountrySpecificInfo />
              <RequirementsFAQ />
              <RequirementsCTA />
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
