"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const RemittanceCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Wholesale Institutional Rates"
      title="Transfer to Germany at Wholesale Rates"
      highlightText="And Save Up to ₹35,000"
      description="Don't let retail bank markups and paperwork delays hold up your German student visa appointment. Submit your request today for transparent interbank pricing, zero agency fees, and an official confirmation letter within 48 hours."
      primaryButtonText="Apply for Remittance"
      primaryButtonHref="#booking"
      secondaryButtonText="Calculate Exact INR & TCS"
      secondaryButtonHref="#calculator"
      trustPoints={[
        "100% Free Advisory (€0)",
        "60-Minute Advisor Callback",
        "RBI LRS Compliant"
      ]}
    />
  );
};

