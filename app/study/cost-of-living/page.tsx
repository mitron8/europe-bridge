import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { CostHeroHeader } from './components/CostHeroHeader';
import { CostSectionNav } from './components/CostSectionNav';
import { MonthlyBudgetBreakdown } from './components/MonthlyBudgetBreakdown';
import { HousingAndRentSection } from './components/HousingAndRentSection';
import { FoodAndGroceriesSection } from './components/FoodAndGroceriesSection';
import { TransportSection } from './components/TransportSection';
import { CityCostComparison } from './components/CityCostComparison';
import { EarningAndBudgetingTips } from './components/EarningAndBudgetingTips';
import { CostOfLivingFAQ } from './components/CostOfLivingFAQ';
import { CostCTA } from './components/CostCTA';
import { StudyContentGate } from '@/components/StudyContentGate';

export const metadata: Metadata = {
  title: 'Cost of Living in Germany for Students 2026 | EuropeBridge',
  description: 'Detailed monthly cost breakdown for international students in Germany: rent, food, public health insurance, €63/mo Deutschlandticket, city comparison (Munich, Berlin, Frankfurt, Leipzig), and budgeting tips.',
};

export default function CostOfLivingPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <CostHeroHeader />
        <CostSectionNav />

        <div className="space-y-6">
          <MonthlyBudgetBreakdown />
          <HousingAndRentSection />

          <StudyContentGate guideTitle="Cost of Living Guide">
            <div className="space-y-6">
              <FoodAndGroceriesSection />
              <TransportSection />
              <CityCostComparison />
              <EarningAndBudgetingTips />
              <CostOfLivingFAQ />
              <CostCTA />
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
