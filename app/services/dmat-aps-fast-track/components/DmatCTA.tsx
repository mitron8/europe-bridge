"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const DmatCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="dMAT Fast-Track Registration"
      title="Get Registered Before The"
      highlightText="Window Closes"
      description="Don't let test centre sell-outs or portal confusion stall your German student visa. Lock in your dMAT registration with EuropeBridge advisors today."
      primaryButtonText="Start My Registration for ₹1,999"
      primaryButtonHref="#pricing"
      secondaryButtonText="Syllabus & Test Dates"
      secondaryButtonHref="#syllabus"
      trustPoints={[
        "Full Refund Guarantee",
        "Official Test Centre Guidance",
        "Practice Mocks Included"
      ]}
    />
  );
};

