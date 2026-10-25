"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const CvCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="German Tabellarischer Lebenslauf"
      title="Get a Lebenslauf That"
      highlightText="Gets You Noticed in Germany"
      description="Don't let an unstructured resume trigger gap inquiries or uni-assist rejections. Order your custom Tabellarischer Lebenslauf with ECTS credit alignment and full ATS optimization."
      primaryButtonText="Order My CV — From ₹4,999"
      primaryButtonHref="#booking"
      secondaryButtonText="Explore Lebenslauf Rules"
      secondaryButtonHref="#features"
      trustPoints={[
        "German Academic Standard",
        "2-3 Days Delivery (24h Express)",
        "PDF + Editable DOCX"
      ]}
    />
  );
};

