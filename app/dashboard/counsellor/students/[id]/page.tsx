"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { StudentDetailView } from '@/components/StudentDetailModal';

export default function CounsellorStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/dashboard/counsellor/students"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-germany-red transition-colors px-3 py-1.5 rounded-xl bg-white border border-gray-200/70 shadow-xs hover:border-germany-red/30 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Students</span>
        </Link>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full font-extrabold text-[11px]">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Student Consultation Hub</span>
        </div>
      </div>

      {/* Main Student Detail View (Rendered directly as a Page) */}
      <StudentDetailView studentId={studentId} isPage={true} />
    </div>
  );
}
