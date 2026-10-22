import React from 'react';
import { Metadata } from 'next';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { LoanHero } from './components/LoanHero';
import { LoanFeatures } from './components/LoanFeatures';
import { LoanPricing } from './components/LoanPricing';
import { LoanProcess } from './components/LoanProcess';
import { LoanForm } from './components/LoanForm';
import { LoanFAQ } from './components/LoanFAQ';
import { LoanCTA } from './components/LoanCTA';

export const metadata: Metadata = {
  title: 'Education Loan for Germany 2026 | EuropeBridge',
  description: 'Apply for an education loan for Germany before your visa appointment. Up to 100% financing, loans over ₹20 Lakhs, covers tuition fees, living expenses, blocked account deposits, and travel costs.',
};

export default function EducationLoanPage() {
  return (
    <main className="bg-[#f4f1ea] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <LoanHero />

        <div className="space-y-8 sm:space-y-12 pb-16">
          <LoanFeatures />
          <LoanPricing />
          <LoanProcess />
          <LoanForm />
          <LoanFAQ />
          <LoanCTA />
        </div>

        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
