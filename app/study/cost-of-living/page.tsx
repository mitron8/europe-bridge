import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cost of Living in Germany for Students 2026 | EuropeBridge',
  description: 'Detailed monthly cost breakdown for international students in Germany: rent, food, public health insurance, €63/mo Deutschlandticket, city comparison (Munich, Berlin, Frankfurt, Leipzig), and budgeting tips.',
};

export default function CostOfLivingPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <CostHeroHeader />
      <CostSectionNav />

      <div className="space-y-4">
        <MonthlyBudgetBreakdown />
        <HousingAndRentSection />

        <StudyContentGate guideTitle="Cost of Living Guide">
          <div className="space-y-4">
            <FoodAndGroceriesSection />
            <TransportSection />
            <CityCostComparison />
            <EarningAndBudgetingTips />
            <CostOfLivingFAQ />
            <CostCTA />
          </div>
        </StudyContentGate>
      </div>

      <Footer />
    </main>
  );
}
