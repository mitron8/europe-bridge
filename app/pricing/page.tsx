"use client";

import React, { useState } from 'react';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { PricingHero } from './components/PricingHero';
import { PricingCards } from './components/PricingCards';
import { CostComparisonCalculator } from './components/CostComparisonCalculator';
import { PricingComparisonTable } from './components/PricingComparisonTable';
import { PricingAdmitsShowcase } from './components/PricingAdmitsShowcase';
import { PricingFAQ } from './components/PricingFAQ';
import { PricingCTA } from './components/PricingCTA';
import { PricingModal } from './components/PricingModal';

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard Package (Master\'s)');
  const [selectedPrice, setSelectedPrice] = useState('₹49,999');

  const handleSelectPlan = (plan: string, price: string) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setModalOpen(true);
  };

  const handleOpenConsultation = () => {
    setSelectedPlan('Complimentary 1:1 Profile Consultation');
    setSelectedPrice('₹0 (Free)');
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        {/* Navigation Bar */}
        <LandingNavbar />

        {/* 1. Hero Section */}
        <PricingHero />

        {/* 2. Packages Grid (Basic, Standard, Premium, Bachelor's) */}
        <PricingCards onSelectPlan={handleSelectPlan} />

        {/* 3. Interactive ROI & Country Cost Comparison Calculator (Germany vs USA, UK, Canada, Australia) */}
        <CostComparisonCalculator />

        {/* 4. Complete Feature-by-Feature Comparison Matrix */}
        <PricingComparisonTable onSelectPlan={handleSelectPlan} />

        {/* 5. Student Proof & Verified Admits Showcase */}
        <PricingAdmitsShowcase />

        {/* 6. Comprehensive FAQs Accordion */}
        <PricingFAQ />

        {/* 7. Closing Call To Action */}
        <PricingCTA onOpenConsultation={handleOpenConsultation} />

        {/* Footer */}
        <Footer />

        {/* Onboarding / Enrollment Modal */}
        <PricingModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)}
          selectedPlan={selectedPlan}
          selectedPrice={selectedPrice}
        />
      </div>
    </main>
  );
}
