import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { LoanHero } from './components/LoanHero';
import { LoanFeatures } from './components/LoanFeatures';
import { LoanPricing } from './components/LoanPricing';
import { LoanProcess } from './components/LoanProcess';
import { LoanForm } from './components/LoanForm';
import { LoanFAQ } from './components/LoanFAQ';
import { LoanCTA } from './components/LoanCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education Loan for Germany 2026 | EuropeBridge',
  description: 'Apply for an education loan for Germany before your visa appointment. Up to 100% financing, loans over ₹20 Lakhs, covers tuition fees, living expenses, blocked account deposits, and travel costs.',
};

export default function EducationLoanPage() {
  return (
    <main className="min-h-screen neu-bg">
      <Navbar />
      <LoanHero />

      <div className="space-y-4">
        <LoanFeatures />
        <LoanPricing />
        <LoanProcess />
        <LoanForm />
        <LoanFAQ />
        <LoanCTA />
      </div>

      <Footer />
    </main>
  );
}
