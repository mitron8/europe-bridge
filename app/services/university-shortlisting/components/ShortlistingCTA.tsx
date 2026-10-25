"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';
import { UserCheck } from 'lucide-react';

export const ShortlistingCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Target Winter 2026 / Summer 2027 Intakes"
      title="Start Your Master's Journey With"
      highlightText="10 Validated Admits"
      description="Don't risk rejections over hidden ECTS module prerequisites. Get your personalized, verified university shortlist delivered to your inbox in 3 working days or 24 hours."
      primaryButtonText="Order My Shortlist Now"
      primaryButtonHref="#booking"
      secondaryButtonText="Check Admission Chances"
      secondaryButtonHref="/tools/admission-chance"
      secondaryButtonIcon={<UserCheck className="w-4 h-4" />}
      trustPoints={[
        "From ₹4,999",
        "2 Review Rounds",
        "100% Public German Universities"
      ]}
    />
  );
};
