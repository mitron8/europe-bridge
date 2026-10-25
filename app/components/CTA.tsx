"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

const CTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Start Your Free Evaluation"
      title="Ready to Start Your"
      highlightText="German Journey?"
      description="Create your free account. Let our AI evaluate your profile, audit prerequisite course credits, and connect you with a dedicated TU9 alumni guide."
      primaryButtonText="Start for Free"
      primaryButtonHref="/login"
      secondaryButtonText="Check Chances"
      secondaryButtonHref="/tools/admission-chance"
      trustPoints={[
        "100% Free Initial Assessment",
        "Direct Mentorship",
        "400+ Public Universities"
      ]}
    />
  );
};

export default CTA;

