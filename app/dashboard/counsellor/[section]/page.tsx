"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { Bell } from 'lucide-react';
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
      ) : section === 'account' ? (
        <AccountSettingsView />
      ) : section === 'notices' ? (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EBE7E0] dark:border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-germany-black dark:text-white">
                  Notices &amp; Announcements
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Official intake advisories, embassy alerts, and administrative updates
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              0 Active Broadcasts
            </span>
          </div>

          <div className="p-12 text-center rounded-2xl bg-[#FAF9F6] dark:bg-[#0A0D14] border border-[#EBE7E0] dark:border-gray-800 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-2xs border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-germany-black dark:text-white">
              No Active Announcements
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              There are currently no active administrative notices. Embassy visa slot notifications, APS updates, and intake alerts from administration will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="neu-card p-8 bg-white dark:bg-[#111622] border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold">
          Counsellor {title} management workspace loaded here.
        </div>
      )}
    </div>
  );
}
