"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const BlockedAccountCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Official German Visa Financial Clearance"
      title="Get Your Official Blocking Confirmation"
      highlightText="In Under 24 Hours"
      description="Don't let financial documentation delay your German student visa. Submit your application today for 1-on-1 counselor assistance, choose the best BaFin-licensed provider, and unlock up to €247 in health insurance cashback."
      primaryButtonText="Open Blocked Account"
      primaryButtonHref="#booking"
      secondaryButtonText="Calculate INR Conversion"
      secondaryButtonHref="#calculator"
      trustPoints={[
        "Foreign Office Approved",
        "60-Minute Advisor Callback",
        "100% Refund on Visa Rejection"
      ]}
    />
  );
};


