"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { CounsellorLeads } from '@/components/CounsellorLeads';
import { CounsellorStudents } from '@/components/CounsellorStudents';
import { CounsellorServicesQueue } from '@/components/CounsellorServicesQueue';
import { CounsellorMeetingsView } from '@/components/CounsellorMeetingsView';
import AccountSettingsView from '@/components/AccountSettingsView';

const VALID_SECTIONS = [
  'leads', 'students', 'deadlines', 'notices', 'account', 'help', 'services'
];

export default function CounsellorSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const title = section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="space-y-6">
      {section === 'leads' ? (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] space-y-4">
          <CounsellorLeads />
        </div>
      ) : section === 'students' ? (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] space-y-4">
          <CounsellorStudents />
        </div>
      ) : section === 'services' ? (
        <CounsellorServicesQueue />
      ) : section === 'deadlines' ? (
        <CounsellorMeetingsView />
      ) : (
        <div className="neu-card p-8 bg-white dark:bg-[#111622] border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold">
          Counsellor {title} management workspace loaded here.
        </div>
      )}
    </div>
  );
}
