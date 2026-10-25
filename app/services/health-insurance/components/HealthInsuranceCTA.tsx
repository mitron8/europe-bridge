"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const HealthInsuranceCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="German Student Health Coverage"
      title="Clear Your Matriculation Hold"
      highlightText="With Electronic M10 Within 24h"
      description="Don't let health insurance paperwork delay your German student visa or university matriculation. Submit your application today for 100% free advisor assistance, instant provider matching, and complimentary incoming travel cover."
      primaryButtonText="Apply for Free Setup"
      primaryButtonHref="#booking"
      secondaryButtonText="Compare Public vs Private"
      secondaryButtonHref="#decider"
      trustPoints={[
        "100% Free Advisory (€0)",
        "Direct M10 University e-Sent",
        "Free Incoming Travel Cover"
      ]}
    />
  );
};

