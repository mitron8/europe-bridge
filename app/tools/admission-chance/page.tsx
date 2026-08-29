import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ToolHeroHeader } from './components/ToolHeroHeader';
import { AdmissionEvaluatorForm } from './components/AdmissionEvaluatorForm';
import { LikelihoodFAQ } from './components/LikelihoodFAQ';
import { RelatedToolsSection } from './components/RelatedToolsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "German Master's Admission Chance Calculator 2026 | EuropeBridge",
  description: "Free interactive Master's admission chance estimator for German universities. Evaluate your CGPA, target university tier, language scores, and work experience on a 100-point fit scale.",
};

export default function AdmissionChancePage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <ToolHeroHeader />
      <AdmissionEvaluatorForm />
      <LikelihoodFAQ />
      <RelatedToolsSection />
      <Footer />
    </main>
  );
}
