"use client";

import React from 'react';
import { Headphones } from 'lucide-react';
import { CounsellorStudents } from '@/components/CounsellorStudents';

export default function CounsellorStudentsListPage() {
  return (
    <div className="space-y-6">
      {/* Sleek Compact Header */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
        {/* Subtle German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-germany-gold/20 text-germany-black flex items-center justify-center shrink-0 border border-germany-gold/30 shadow-xs">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-display font-bold text-germany-black tracking-tight leading-tight">
              Assigned Students
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-normal mt-0.5">
              Manage student consultations, document verification, university shortlists, and strategy notes.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        <CounsellorStudents />
      </div>
    </div>
  );
}
