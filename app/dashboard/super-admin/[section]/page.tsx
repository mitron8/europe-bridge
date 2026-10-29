"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { Search } from 'lucide-react';

const VALID_SECTIONS = [
  'students', 'counsellors', 'admins', 'marketing', 'finance', 
  'content', 'reports', 'universities', 'notices', 'account', 'help'
];

export default function SuperAdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const title = section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="space-y-6">
      <div className="neu-card p-6 bg-white dark:bg-[#111622] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${section}...`}
              className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
            />
          </div>
        </div>

        <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold">
          Super Admin {title} module loaded here.
        </div>
      </div>
    </div>
  );
}
