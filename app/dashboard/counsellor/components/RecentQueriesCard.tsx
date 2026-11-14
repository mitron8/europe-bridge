"use client";

import React from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';

export interface DashboardTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  priority: string;
  status: string;
  createdAt?: string;
  student?: {
    id: string;
    name: string;
    email: string;
  };
}

interface RecentQueriesCardProps {
  tickets?: DashboardTicketSummary[];
  isLoading?: boolean;
}

function getRelativeTime(dateString?: string): string {
  if (!dateString) return 'recently';
  const diff = Date.now() - new Date(dateString).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    const mins = Math.max(1, Math.floor(diff / (1000 * 60)));
    return `${mins}m ago`;
  }
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentQueriesCard({ tickets = [], isLoading = false }: RecentQueriesCardProps) {
  const activeCount = tickets.length;

  return (
    <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/90 dark:border-gray-800 p-6 shadow-2xs flex flex-col justify-between min-h-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#5A0F1B] dark:text-rose-400" />
          <h3 className="font-display font-extrabold text-base text-[#2A080F] dark:text-white">
            Recent Queries
          </h3>
          <span className="text-[11px] font-bold text-[#8C2434] dark:text-rose-300 bg-[#FDE2E4]/80 dark:bg-[#2A1218] border border-[#F9C9CE] dark:border-[#4A1D26] px-2 py-0.5 rounded-full ml-1">
            {activeCount} Active
          </span>
        </div>

        <Link
          href="/dashboard/counsellor/help"
          className="text-xs font-bold text-[#8C2434] dark:text-rose-300 hover:text-[#5A0F1B] dark:hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Query List */}
      <div className="flex-1 py-3 space-y-2.5">
        {isLoading ? (
          <div className="py-12 text-center text-xs font-semibold text-gray-400">
            Loading recent queries...
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-12 text-center text-xs font-semibold text-gray-400">
            No active student inquiries.
          </div>
        ) : (
          tickets.slice(0, 3).map((q) => {
            const isUrgent = q.priority?.toLowerCase() === 'urgent';
            return (
              <Link
                key={q.id}
                href="/dashboard/counsellor/help"
                className="block p-3.5 rounded-2xl bg-[#FFFBF8] dark:bg-[#151B27]/60 border border-gray-150 dark:border-gray-800 hover:border-rose-300 dark:hover:border-rose-900 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-black/30 text-[#8C2434] dark:text-rose-300 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-950 shadow-2xs mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                        {q.ticketNumber}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isUrgent
                              ? 'bg-[#FDE2E4] text-[#B91C1C] border border-[#F9C9CE]'
                              : 'bg-[#FEF7E6] text-[#B45309] border border-[#FDE7BA]'
                          }`}
                        >
                          {q.priority || 'NORMAL'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {getRelativeTime(q.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#2A080F] dark:text-white group-hover:text-[#B91C1C] dark:group-hover:text-rose-400 transition-colors truncate">
                      {q.title}
                    </div>

                    <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium truncate mt-0.5">
                      From: <span className="text-gray-700 dark:text-gray-300 font-bold">{q.student?.name || 'Student'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
