"use client";
import React from 'react';
import { GermanLandmarkCTA } from '@/app/components/common/GermanLandmarkCTA';

export const VisaCTA = () => {
  return (
    <GermanLandmarkCTA
      badge="German Student Visa Clearance"
      title="Get Your German Student Visa"
      highlightText="Approved Without Delay"
      description="Don't let missed VFS slots, VIDEX errors, or incomplete financial proof delay your semester commencement. Get dedicated, expert guidance from initial CSP filing to passport stamping."
      primaryButtonText="Start Visa Process — From ₹14,999"
      primaryButtonHref="#booking"
      secondaryButtonText="View Visa Checklist"
      secondaryButtonHref="#checklist"
      trustPoints={[
        "CSP & VIDEX Setup",
        "VFS Slot Booking",
        "99.4% Approval Rate"
      ]}
    />
  );
};

