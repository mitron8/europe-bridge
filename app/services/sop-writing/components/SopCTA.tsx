"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';
import { UserCheck } from 'lucide-react';

export const SopCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Academic Statement of Purpose"
      title="Get an SOP That Actually Gets You"
      highlightText="Admitted in Germany"
      description="Don't get rejected over generic storytelling or AI phrasing. Order your custom, academic-aligned Statement of Purpose with 2 full rounds of edits included."
      primaryButtonText="Order My SOP Now"
      primaryButtonHref="#booking"
      secondaryButtonText="Target Programs"
      secondaryButtonHref="/tools/admission-chance"
      secondaryButtonIcon={<UserCheck className="w-4 h-4" />}
      trustPoints={[
        "From ₹4,999",
        "2 Review Rounds",
        "100% Original & Plagiarism Free"
      ]}
    />
  );
};
