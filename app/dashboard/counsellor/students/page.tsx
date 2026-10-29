"use client";

import React from 'react';
import { CounsellorStudents } from '@/components/CounsellorStudents';

export default function CounsellorStudentsListPage() {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-5 sm:p-6 space-y-4">
      <CounsellorStudents />
    </div>
  );
}
