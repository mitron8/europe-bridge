"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Calendar } from 'lucide-react';

interface CounsellorTopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadCount?: number;
  initials?: string;
  fullName?: string;
}

export function CounsellorTopBar({
  searchQuery,
  onSearchChange,
  unreadCount = 0,
}: CounsellorTopBarProps) {
  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-4 pt-1">
      {/* Search Input Bar */}
      <div className="relative flex-1 min-w-0 max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students, queries..."
          className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 text-xs font-semibold bg-white dark:bg-[#111622] text-[#2A080F] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200/90 dark:border-gray-800 rounded-2xl shadow-2xs focus:outline-none focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/10 transition-all truncate"
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
        {/* Notices & Alerts Bell */}
        <Link
          href="/dashboard/counsellor/notices"
          className="p-2 rounded-2xl bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:border-[#B91C1C]/30 transition-all relative shadow-2xs shrink-0"
          title="Notices & Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B91C1C] ring-2 ring-white dark:ring-[#111622]" />
          )}
        </Link>

        {/* Deadlines & Consults Calendar */}
        <Link
          href="/dashboard/counsellor/deadlines"
          className="p-2 rounded-2xl bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:border-[#B91C1C]/30 transition-all shadow-2xs shrink-0"
          title="Deadlines & Calendar"
        >
          <Calendar className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

