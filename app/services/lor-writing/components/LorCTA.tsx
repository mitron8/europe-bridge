"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const LorCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Academic & Professional Recommendation Letters"
      title="Get Recommendation Letters That"
      highlightText="Faculty Actually Value"
      description="Don't risk your German Master’s admission with vague, template recommendation letters. Receive two tailored letters with concrete project evidence, ready for your professor or manager to sign."
      primaryButtonText="Order 2 LORs — From ₹4,999"
      primaryButtonHref="#booking"
      secondaryButtonText="Recommender Guide"
      secondaryButtonHref="#guide"
      trustPoints={[
        "2 Tailored LORs Included",
        "3 Days Turnaround (24h Express)",
        "2 Thorough Review Rounds"
      ]}
    />
  );
};

