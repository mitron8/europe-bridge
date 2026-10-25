"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';
import { ShieldCheck } from 'lucide-react';

export const LomCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Embassy § 16b AufenthG Compliant"
      title="Don't Let a Weak LOM Delay Your"
      highlightText="German Student Visa"
      description="Ensure your Letter of Motivation addresses every consular requirement — from curriculum progression and blocked account verification to definitive post-study career plans."
      primaryButtonText="Order Your Visa LOM Now"
      primaryButtonHref="#booking"
      secondaryButtonText="Book Visa Guidance"
      secondaryButtonHref="/signup"
      secondaryButtonIcon={<ShieldCheck className="w-4 h-4" />}
      trustPoints={[
        "From ₹3,999",
        "2 Review Rounds",
        "Express 24h Delivery Available"
      ]}
    />
  );
};
