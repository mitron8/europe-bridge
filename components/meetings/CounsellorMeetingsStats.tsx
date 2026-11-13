"use client";

import React from 'react';

interface CounsellorMeetingsStatsProps {
  meetingsData: any;
}

export function CounsellorMeetingsStats({ meetingsData }: CounsellorMeetingsStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-gray-400">Scheduled Today</span>
        <div className="text-xl font-display font-extrabold text-germany-black dark:text-white">
          {meetingsData?.summary?.todayCount || 0} Sessions
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-gray-400">Upcoming Confirmed</span>
        <div className="text-xl font-display font-extrabold text-emerald-600 dark:text-emerald-400">
          {meetingsData?.summary?.upcomingCount || 0} Meetings
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-gray-400">Pending Actions</span>
        <div className="text-xl font-display font-extrabold text-amber-600 dark:text-amber-400">
          {meetingsData?.summary?.pendingActionsCount || 0} Actionable
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-gray-400">Standard Working Hours</span>
        <div className="text-xs font-extrabold text-germany-black dark:text-white mt-1">
          9 AM–12 PM & 2 PM–5 PM
        </div>
      </div>
    </div>
  );
}
