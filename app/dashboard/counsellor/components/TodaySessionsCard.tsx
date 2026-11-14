"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Plus, Video, ArrowUpRight } from 'lucide-react';
import { EmptyCalendarIllustration } from './EmptyCalendarIllustration';

interface TodayMeeting {
  id: string;
  studentName?: string;
  hasPendingReschedule?: boolean;
  status?: string;
  agenda?: string;
  displayTime?: string;
  humanTime?: string;
  meeting_link?: string;
}

interface TodaySessionsCardProps {
  meetings?: TodayMeeting[];
}

export function TodaySessionsCard({ meetings = [] }: TodaySessionsCardProps) {
  const sessionCount = meetings.length;

  return (
    <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/90 dark:border-gray-800 p-6 shadow-2xs flex flex-col justify-between min-h-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#5A0F1B] dark:text-rose-400" />
          <h3 className="font-display font-extrabold text-base text-[#2A080F] dark:text-white">
            Today&apos;s Strategy Sessions
          </h3>
        </div>
        <span className="text-[11px] font-bold text-[#8C2434] dark:text-rose-300 bg-[#FDE2E4]/80 dark:bg-[#2A1218] border border-[#F9C9CE] dark:border-[#4A1D26] px-2.5 py-0.5 rounded-full">
          {sessionCount} {sessionCount === 1 ? 'Session' : 'Sessions'} Today
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center py-4">
        {sessionCount === 0 ? (
          <div className="text-center space-y-3 flex flex-col items-center">
            <EmptyCalendarIllustration className="w-24 h-24 sm:w-28 sm:h-28" />

            <div className="space-y-1 max-w-sm">
              <h4 className="text-sm font-extrabold text-[#2A080F] dark:text-white">
                No strategy sessions scheduled for today.
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Plan new sessions or check upcoming availability.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <Link
                href="/dashboard/counsellor/deadlines"
                className="bg-[#5A0F1B] hover:bg-[#480C15] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule a Session</span>
              </Link>
              <Link
                href="/dashboard/counsellor/deadlines"
                className="bg-white dark:bg-[#111622] border border-[#5A0F1B]/40 hover:border-[#5A0F1B] text-[#5A0F1B] dark:text-rose-300 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>View Calendar</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-2">
            {meetings.map((s) => (
              <div key={s.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#2A080F] dark:text-white flex items-center gap-2">
                    <span>{s.studentName || 'Student'}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      s.hasPendingReschedule
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/50 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    }`}>
                      {s.hasPendingReschedule ? 'Needs Acceptance' : s.status || 'Confirmed'}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                    {s.agenda || '1-on-1 Germany Consultation'} •{' '}
                    <strong className="text-[#B91C1C] dark:text-rose-400">
                      {s.displayTime?.split('•')[1]?.trim() || s.displayTime || s.humanTime || 'Time Scheduled'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {s.meeting_link && (
                    <a
                      href={s.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#5A0F1B] hover:bg-[#480C15] text-white py-1.5 px-3 text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Launch Meet</span>
                    </a>
                  )}
                  <Link
                    href="/dashboard/counsellor/deadlines"
                    className="p-1.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-2xs transition-colors cursor-pointer"
                    title="Manage Meeting"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
