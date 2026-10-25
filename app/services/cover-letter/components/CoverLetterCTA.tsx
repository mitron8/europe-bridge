"use client";

import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';
import { FileText } from 'lucide-react';

export const CoverLetterCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="German DIN 5008 Consular Standard"
      title="Organize Your Visa Dossier With an"
      highlightText="Authoritative Cover Letter"
      description="Give the German consular officer an instant, clear overview of your admission, blocked account proof, health insurance, and indexed documents."
      primaryButtonText="Order Your Cover Letter Now"
      primaryButtonHref="#booking"
      secondaryButtonText="Check Requirements"
      secondaryButtonHref="/study/requirements"
      secondaryButtonIcon={<FileText className="w-4 h-4" />}
      trustPoints={[
        "From ₹999",
        "2 Review Rounds",
        "Express 24h Delivery Available"
      ]}
    />
  );
};
