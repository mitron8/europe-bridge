"use client";

import React from 'react';
import Link from 'next/link';
import { Layers, Calendar, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CounsellorMetricCardsProps {
  unattendedCount: number;
  attendedCount: number;
  todayConsultsCount: number;
  upcomingConsultsCount: number;
  pendingInquiriesCount: number;
  completedCount: number;
  urgentCount?: number;
}

export function CounsellorMetricCards({
  unattendedCount,
  attendedCount,
  todayConsultsCount,
  upcomingConsultsCount,
  pendingInquiriesCount,
  completedCount,
  urgentCount = 0,
}: CounsellorMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Services Queue (FIFO) */}
      <Link
        href="/dashboard/counsellor/services"
        className="bg-[#FDE2E4] hover:bg-[#FCD8DB] dark:bg-[#2A1218] dark:hover:bg-[#34161E] border border-[#F9C9CE] dark:border-[#4A1D26] rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-black/30 text-[#8C2434] dark:text-rose-300 flex items-center justify-center shrink-0 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Services Queue (FIFO)
            </span>
          </div>

          <div className="text-2xl font-display font-extrabold text-[#2A080F] dark:text-white mt-4 flex items-center gap-2">
            <span>{unattendedCount} In Queue</span>
            {urgentCount > 0 && (
              <span className="text-xs font-black text-[#B91C1C] dark:text-rose-400 animate-pulse">
                ({urgentCount} Urgent)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium mt-4 pt-2 border-t border-rose-200/50 dark:border-rose-900/30">
          <span>{attendedCount} Attended / Drafting</span>
          <span className="w-6 h-6 rounded-full bg-white/70 dark:bg-black/30 text-[#8C2434] dark:text-rose-300 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* 2. Scheduled Today */}
      <Link
        href="/dashboard/counsellor/deadlines"
        className="bg-[#FEF7E6] hover:bg-[#FDF0D0] dark:bg-[#241F15] dark:hover:bg-[#2F281B] border border-[#FDE7BA] dark:border-[#463A22] rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-black/30 text-[#B45309] dark:text-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Scheduled Today
            </span>
          </div>

          <div className="text-2xl font-display font-extrabold text-[#2A080F] dark:text-white mt-4">
            {todayConsultsCount} Consults
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium mt-4 pt-2 border-t border-amber-200/50 dark:border-amber-900/30">
          <span>{upcomingConsultsCount} upcoming sessions</span>
          <span className="w-6 h-6 rounded-full bg-white/70 dark:bg-black/30 text-[#B45309] dark:text-amber-300 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* 3. Student Help Inquiries */}
      <Link
        href="/dashboard/counsellor/help"
        className="bg-[#FDE2E4] hover:bg-[#FCD8DB] dark:bg-[#2A1218] dark:hover:bg-[#34161E] border border-[#F9C9CE] dark:border-[#4A1D26] rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-black/30 text-[#B91C1C] dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Student Help Inquiries
            </span>
          </div>

          <div className="text-2xl font-display font-extrabold text-[#B91C1C] dark:text-rose-400 mt-4">
            {pendingInquiriesCount} Open
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium mt-4 pt-2 border-t border-rose-200/50 dark:border-rose-900/30">
          <span>Awaiting your guidance</span>
          <span className="w-6 h-6 rounded-full bg-white/70 dark:bg-black/30 text-[#B91C1C] dark:text-rose-400 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* 4. Completed Deliverables */}
      <Link
        href="/dashboard/counsellor/services"
        className="bg-[#E7F8EE] hover:bg-[#DBF3E4] dark:bg-[#12241A] dark:hover:bg-[#183123] border border-[#BCECD0] dark:border-[#1E442F] rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-all group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-black/30 text-[#15803D] dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Completed Deliverables
            </span>
          </div>

          <div className="text-2xl font-display font-extrabold text-[#2A080F] dark:text-white mt-4">
            {completedCount} Done
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium mt-4 pt-2 border-t border-emerald-200/50 dark:border-emerald-900/30">
          <span>SOPs, CVs &amp; LORs delivered</span>
          <span className="w-6 h-6 rounded-full bg-white/70 dark:bg-black/30 text-[#15803D] dark:text-emerald-300 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
