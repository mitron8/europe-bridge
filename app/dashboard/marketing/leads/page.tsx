"use client";

import React from 'react';
import { CounsellorLeads } from '@/components/CounsellorLeads';

export default function MarketingLeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-display text-germany-black">Student Leads</h1>
        <p className="text-sm font-bold text-gray-500">
          View and manage student leads generated from marketing efforts.
        </p>
      </div>
      
      <div className="neu-card p-6 bg-white shadow-sm border border-[#EBE7E0]">
        <CounsellorLeads />
      </div>
    </div>
  );
}
