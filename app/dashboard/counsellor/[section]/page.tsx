"use client";

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { Headphones, Search } from 'lucide-react';
import { CounsellorLeads } from '@/components/CounsellorLeads';
import { CounsellorStudents } from '@/components/CounsellorStudents';

const VALID_SECTIONS = [
  'leads', 'students', 'deadlines', 'notices', 'account'
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
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-extrabold text-[11px]">
              <Headphones className="w-3.5 h-3.5" />
              <span>Counsellor Section</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black">
              {title}
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500">
              Manage your student {section} pipeline and consultations.
            </p>
          </div>
        </div>
      </div>

      <div className="neu-card p-6 bg-white space-y-4">
        {section === 'leads' ? (
          <CounsellorLeads />
        ) : section === 'students' ? (
          <CounsellorStudents />
        ) : (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
            Counsellor {title} management workspace loaded here.
          </div>
        )}
      </div>
    </div>
  );
}
