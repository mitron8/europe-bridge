"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const DHLCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="Guaranteed Express Courier"
      title="Dispatch Your Applications to Germany"
      highlightText="For Only ₹2,033 / Application"
      description="Doorstep home pickup, 3–4 working days guaranteed transit, and continuous live tracking to uni-assist e.V. and all public German university admission desks."
      primaryButtonText="Book Courier Pickup"
      primaryButtonHref="#booking"
      secondaryButtonText="Transit Calculator"
      secondaryButtonHref="#calculator"
      trustPoints={[
        "Free Doorstep Home Pickup",
        "3–4 Working Days Delivery",
        "Sealed Transcripts Protected"
      ]}
    />
  );
};

