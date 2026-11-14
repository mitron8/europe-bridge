"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Calendar, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { logout } from '@/lib/auth';

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
  initials = 'CU',
  fullName = 'Counsellor User',
}: CounsellorTopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students, queries, services..."
          className="w-full pl-9 pr-4 py-2 text-xs font-semibold bg-white dark:bg-[#111622] text-[#2A080F] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200/90 dark:border-gray-800 rounded-2xl shadow-2xs focus:outline-none focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/10 transition-all"
        />
      </div>

      {/* Action Icons & Avatar */}
      <div className="flex items-center justify-end gap-2.5 shrink-0">
        {/* Notices & Alerts Bell */}
        <Link
          href="/dashboard/counsellor/notices"
          className="p-2 rounded-2xl bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:border-[#B91C1C]/30 transition-all relative shadow-2xs"
          title="Notices & Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B91C1C] ring-2 ring-white dark:ring-[#111622]" />
          )}
        </Link>

        {/* Deadlines & Consults Calendar */}
        <Link
          href="/dashboard/counsellor/deadlines"
          className="p-2 rounded-2xl bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:border-[#B91C1C]/30 transition-all shadow-2xs"
          title="Deadlines & Calendar"
        >
          <Calendar className="w-4 h-4" />
        </Link>

        {/* Counsellor User Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-full bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 hover:border-[#B91C1C]/30 transition-all shadow-2xs cursor-pointer"
            title={fullName}
          >
            <div className="w-7 h-7 rounded-full bg-[#7C2D37] text-white flex items-center justify-center font-extrabold text-[11px] shadow-2xs shrink-0">
              {initials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 rounded-2xl shadow-xl p-1.5 z-50 text-xs font-semibold"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="font-extrabold text-[#2A080F] dark:text-white truncate">{fullName}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Counsellor Hub</p>
              </div>
              <Link
                href="/dashboard/counsellor/account"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-[#B91C1C] transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </Link>
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

