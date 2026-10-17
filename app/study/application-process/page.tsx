import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/landing/SmoothScroll";

import { HeroHeader } from './components/HeroHeader';
import { SectionNav } from './components/SectionNav';
import { ProcessContent } from './components/ProcessContent';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';

export const metadata: Metadata = {
  title: 'Step-by-Step German University Application Process 2026 | EuropeBridge',
  description: 'Complete walkthrough on applying to German public universities: course shortlisting, uni-assist vs direct portals, required documents, blocked accounts, and visa timelines.',
};

export default function ApplicationProcessPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <HeroHeader />
        <SectionNav />
        
        <div className="space-y-6 sm:space-y-10 pb-16">
          <ProcessContent />
          <FAQSection />
          <CTASection />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
      <SmoothScroll />
    </main>
  );
}
