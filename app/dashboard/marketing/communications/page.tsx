"use client";

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function MarketingCommunicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-display text-germany-black">Communications</h1>
        <p className="text-sm font-bold text-gray-500">
          Manage outgoing communications and newsletters.
        </p>
      </div>
      
      <div className="neu-card p-12 bg-white shadow-sm border border-[#EBE7E0] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-display text-lg text-germany-black">No Communications Available</h3>
        <p className="text-sm font-bold text-gray-500 max-w-md">
          The communications module is currently under development. Real backend data will be displayed here once the API is connected.
        </p>
      </div>
    </div>
  );
}
