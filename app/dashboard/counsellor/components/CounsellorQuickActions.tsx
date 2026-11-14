"use client";

import React from 'react';
import Link from 'next/link';
import { Zap, UserPlus, Layers, Calendar, Bell } from 'lucide-react';

export function CounsellorQuickActions() {
  return (
    <div className="space-y-3 pt-1">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-[#B91C1C]" />
        <h3 className="font-display font-extrabold text-sm text-[#2A080F] dark:text-white">
          Quick Actions
        </h3>
      </div>

      {/* 4 Cards Grid - 2 cols on mobile/tablet, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* 1. Add Student Lead */}
        <Link
          href="/dashboard/counsellor/leads"
          className="bg-[#FDE2E4] hover:bg-[#FCD8DB] text-[#5A0F1B] dark:bg-[#2A1218] dark:hover:bg-[#34161E] dark:text-rose-200 border border-[#F9C9CE] dark:border-[#4A1D26] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-center"
        >
          <UserPlus className="w-4 h-4 text-[#8C2434] dark:text-rose-300 group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate">Add Student Lead</span>
        </Link>

        {/* 2. Create Service Request */}
        <Link
          href="/dashboard/counsellor/services"
          className="bg-[#EEE9FF] hover:bg-[#E3DCFF] text-[#4C1D95] dark:bg-[#1E1833] dark:hover:bg-[#282142] dark:text-purple-200 border border-[#DDD6FE] dark:border-[#3B2C66] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-center"
        >
          <Layers className="w-4 h-4 text-[#6D28D9] dark:text-purple-300 group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate">Create Service Request</span>
        </Link>

        {/* 3. Schedule Consult */}
        <Link
          href="/dashboard/counsellor/deadlines"
          className="bg-[#E7F8EE] hover:bg-[#DBF3E4] text-[#14532D] dark:bg-[#12241A] dark:hover:bg-[#183123] dark:text-emerald-200 border border-[#BCECD0] dark:border-[#1E442F] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-center"
        >
          <Calendar className="w-4 h-4 text-[#15803D] dark:text-emerald-300 group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate">Schedule Consult</span>
        </Link>

        {/* 4. Send Notice / Alert */}
        <Link
          href="/dashboard/counsellor/notices"
          className="bg-[#FEF7E6] hover:bg-[#FDF0D0] text-[#78350F] dark:bg-[#241F15] dark:hover:bg-[#2F281B] dark:text-amber-200 border border-[#FDE7BA] dark:border-[#463A22] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-center"
        >
          <Bell className="w-4 h-4 text-[#B45309] dark:text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
          <span className="truncate">Send Notice / Alert</span>
        </Link>
      </div>
    </div>
  );
}

