import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { ToolHeroHeader } from './components/ToolHeroHeader';
import { AdmissionEvaluatorForm } from './components/AdmissionEvaluatorForm';
import { LikelihoodFAQ } from './components/LikelihoodFAQ';
import { RelatedToolsSection } from './components/RelatedToolsSection';

export const metadata: Metadata = {
  title: "German Master's Admission Chance Calculator 2026 | EuropeBridge",
  description: "Free interactive Master's admission chance estimator for German universities. Evaluate your CGPA, target university tier, language scores, and work experience on a 100-point fit scale.",
};

export default function AdmissionChancePage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <ToolHeroHeader />

        <div className="space-y-8 sm:space-y-12 pb-16">
          <AdmissionEvaluatorForm />
          <LikelihoodFAQ />
          <RelatedToolsSection />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
