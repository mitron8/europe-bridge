"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';
import { Layers } from 'lucide-react';

export const BundleCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Complete 4-Document Application Trifecta"
      title="Submit a Synchronized Application to"
      highlightText="German Universities"
      description="Get your 2-page SOP, two customized LORs, and Europass Tabellarischer Lebenslauf written together by German admissions specialists. Save ₹3,997 instantly."
      primaryButtonText="Order Your Document Bundle"
      primaryButtonHref="#booking"
      secondaryButtonText="Explore Packages"
      secondaryButtonHref="/pricing"
      secondaryButtonIcon={<Layers className="w-4 h-4" />}
      trustPoints={[
        "₹13,999 (Save ₹3,997)",
        "2 Full Review Rounds",
        "Express 48h Available"
      ]}
    />
  );
};
