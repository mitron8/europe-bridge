import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { HeroHeader } from './components/HeroHeader';
import { SectionNav } from './components/SectionNav';
import { ProcessContent } from './components/ProcessContent';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Step-by-Step German University Application Process 2026 | EuropeBridge',
  description: 'Complete walkthrough on applying to German public universities: course shortlisting, uni-assist vs direct portals, required documents, blocked accounts, and visa timelines.',
};

export default function ApplicationProcessPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <HeroHeader />
      <SectionNav />
      
      <div className="space-y-4">
        <ProcessContent />
        <FAQSection />
        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
