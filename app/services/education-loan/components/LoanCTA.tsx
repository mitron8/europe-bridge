"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const LoanCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Fast Track Financial Assistance"
      title="Finance Your Master's Degree in Germany"
      highlightText="With Ease"
      description="Get up to 100% funding covering tuition fees, living expenses, and blocked account setup. Apply today for free doorstep evaluation."
      primaryButtonText="Apply for Loan"
      primaryButtonHref="#booking"
      secondaryButtonText="Blocked Account Calculator"
      secondaryButtonHref="/tools/blocked-account-calculator"
      trustPoints={[
        "Pre-Visa Sanction Letters",
        "100% Free Doorstep Support",
        "Direct NBFC Partnerships"
      ]}
    />
  );
};

