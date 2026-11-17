"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Bell,
  ChevronDown,
  User,
  FileText,
  ExternalLink,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { AdminHeroBanner } from './components/AdminHeroBanner';
import { AdminStatCards } from './components/AdminStatCards';
import { AdminPlatformActivityChart } from './components/AdminPlatformActivityChart';
import { AdminConsultationStatusDonut } from './components/AdminConsultationStatusDonut';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

type DashboardStats = {
  totalStudents: number;
  activeCounsellors: number;
  activeSubscriptions: number;
  totalMeetings: number;
};

type RecentMeeting = {
  id: string;
  scheduledStart: string;
  scheduledEnd?: string;
  timezone?: string;
  status: string;
  topic?: string;
  meetingLink?: string | null;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  counsellorFirstName: string;
  counsellorLastName: string;
  counsellorEmail: string;
};

// Fallback baseline meetings matching the design reference when database is fresh
const BASELINE_MEETINGS: RecentMeeting[] = [
  {
    id: 'm-1',
    scheduledStart: '2026-11-17T14:00:00Z',
    status: 'CANCELLED',
    topic: 'Consultation Session',
    meetingLink: null,
    studentFirstName: 'Ecom',
    studentLastName: 'Khandar',
    studentEmail: 'ecommers.web1@gmail.com',
    counsellorFirstName: 'Counsellor',
    counsellorLastName: 'User',
    counsellorEmail: 'counsellor@test.com',
  },
  {
    id: 'm-2',
    scheduledStart: '2026-11-16T11:00:00Z',
    status: 'AWAITING_COMPLETION',
    topic: 'University Shortlisting & Profile Review',
    meetingLink: 'https://meet.google.com/eb-demo',
    studentFirstName: 'Anshul',
    studentLastName: 'Khandar',
    studentEmail: 'anshulkhandar@gmail.com',
    counsellorFirstName: 'Counsellor',
    counsellorLastName: 'User',
    counsellorEmail: 'counsellor@test.com',
  },
  {
    id: 'm-3',
    scheduledStart: '2026-11-16T10:00:00Z',
    status: 'AWAITING_COMPLETION',
    topic: 'University Shortlisting & Profile Review',
    meetingLink: 'https://meet.google.com/eb-demo',
    studentFirstName: 'Ankur',
    studentLastName: 'Sah',
    studentEmail: 'ankurbca2023@gmail.com',
    counsellorFirstName: 'Counsellor',
    counsellorLastName: 'User',
    counsellorEmail: 'counsellor@test.com',
  },
  {
    id: 'm-4',
    scheduledStart: '2026-11-10T16:00:00Z',
    status: 'CANCELLED',
    topic: 'Study in Germany Strategy Session',
    meetingLink: null,
    studentFirstName: 'Anshul',
    studentLastName: 'Khandar',
    studentEmail: 'anshulkhandar@gmail.com',
    counsellorFirstName: 'Counsellor',
    counsellorLastName: 'User',
    counsellorEmail: 'counsellor@test.com',
  },
  {
    id: 'm-5',
    scheduledStart: '2026-11-02T15:00:00Z',
    status: 'COMPLETED',
    topic: 'Visa Consultation & Document Review',
    meetingLink: null,
    studentFirstName: 'Ankur',
    studentLastName: 'Sah',
    studentEmail: 'ankurbca2023@gmail.com',
    counsellorFirstName: 'Counsellor',
    counsellorLastName: 'User',
    counsellorEmail: 'counsellor@test.com',
  },
];

function formatMeetingDateTime(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}

function getMeetingStatusBadge(status: string) {
  const s = (status || '').toUpperCase();
  if (s === 'CANCELLED') {
    return {
      label: 'Cancelled',
      classes: 'bg-[#FDE2E4] text-[#EF2D48] border border-[#F9C9CE] dark:bg-[#34161E] dark:text-rose-300 dark:border-[#4A1D26]',
    };
  }
  if (s === 'COMPLETED') {
    return {
      label: 'Completed',
      classes: 'bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] dark:bg-[#064E3B]/40 dark:text-emerald-300 dark:border-emerald-800/40',
    };
  }
  return {
    label: 'Awaiting Completion',
    classes: 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] dark:bg-[#78350F]/40 dark:text-amber-300 dark:border-amber-800/40',
  };
}

function getInitialsColor(initials: string) {
  switch (initials) {
    case 'EK':
      return 'bg-[#FDE2E4] text-[#8C2434]';
    case 'AK':
      return 'bg-[#EDE9FE] text-[#6D28D9]';
    case 'AS':
      return 'bg-[#E0F2FE] text-[#0369A1]';
    default:
      return 'bg-[#F1F5F9] text-[#334155] dark:bg-gray-800 dark:text-gray-200';
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<RecentMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const fetchOverview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/dashboard/overview`, {
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to load admin overview metrics');
      }
      const data = await res.json();
      setStats(data.stats);
      if (data.recentMeetings && data.recentMeetings.length > 0) {
        setRecentMeetings(data.recentMeetings);
      } else {
        setRecentMeetings(BASELINE_MEETINGS);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to admin dashboard service');
      // Keep baseline meetings accessible during temporary connection hold
      setRecentMeetings(BASELINE_MEETINGS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const allMeetings = useMemo(() => {
    return recentMeetings.length > 0 ? recentMeetings : BASELINE_MEETINGS;
  }, [recentMeetings]);

  // Reference anchor timestamp: uses the latest meeting timestamp or current time, whichever is greater
  // Ensures sample / seeded 2026 data filters accurately regardless of local machine calendar year
  const referenceTime = useMemo(() => {
    const timestamps = allMeetings
      .map((m) => new Date(m.scheduledStart).getTime())
      .filter((t) => !isNaN(t));
    const maxMeeting = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();
    return Math.max(maxMeeting, Date.now());
  }, [allMeetings]);

  // Client-side date filter (Option A)
  const filteredMeetings = useMemo(() => {
    if (selectedRange === 'All Time') {
      return allMeetings;
    }

    const anchorDate = new Date(referenceTime);
    // End of anchor day (23:59:59.999)
    const endOfAnchor = new Date(
      anchorDate.getFullYear(),
      anchorDate.getMonth(),
      anchorDate.getDate(),
      23, 59, 59, 999
    ).getTime();

    let days = 30;
    if (selectedRange === 'Last 7 Days') days = 7;
    else if (selectedRange === 'Last 90 Days') days = 90;

    const cutoff = endOfAnchor - days * 24 * 60 * 60 * 1000;
    return allMeetings.filter((m) => {
      const t = new Date(m.scheduledStart).getTime();
      return !isNaN(t) && t >= cutoff && t <= endOfAnchor;
    });
  }, [allMeetings, selectedRange, referenceTime]);

  return (
    <div className="space-y-6">
      {/* Top Header Row with Title, Date Filter & Notification Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#64748B] dark:text-gray-400 mt-0.5">
            Monitor platform activity, students, counsellors, and consultations.
          </p>
        </div>

        {/* Right Controls: Date Filter & Notification Bell */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Refresh Action */}
          <button
            onClick={fetchOverview}
            disabled={isLoading}
            className="p-2.5 bg-white dark:bg-[#111622] text-[#64748B] dark:text-gray-300 hover:text-[#0F172A] dark:hover:text-white rounded-xl border border-[#E2E8F0] dark:border-gray-800 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Overview Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {/* Date Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRangeOpen(!isRangeOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-[#111622] border border-[#E2E8F0] dark:border-gray-800 rounded-xl text-xs font-bold text-[#0F172A] dark:text-white shadow-2xs hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#64748B] dark:text-gray-400" />
              <span>{selectedRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-gray-400 ml-0.5" />
            </button>

            {isRangeOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-[#111622] border border-[#E2E8F0] dark:border-gray-800 rounded-xl shadow-lg py-1 z-30">
                {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setIsRangeOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      selectedRange === range
                        ? 'bg-[#EF2D48]/10 text-[#EF2D48]'
                        : 'text-[#0F172A] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell with Red Badge Dot */}
          <button
            className="relative p-2.5 bg-white dark:bg-[#111622] border border-[#E2E8F0] dark:border-gray-800 rounded-xl text-[#64748B] dark:text-gray-300 hover:text-[#0F172A] dark:hover:text-white shadow-2xs transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF2D48] ring-2 ring-white dark:ring-[#111622]" />
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <AdminHeroBanner />

      {/* Error notification if any */}
      {error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 rounded-xl text-xs font-bold flex items-center justify-between gap-2 border border-red-200 dark:border-red-900/50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchOverview}
            className="px-3 py-1 bg-red-100 dark:bg-red-900/60 hover:bg-red-200 text-red-700 dark:text-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* 4 Stat Metric Cards */}
      <AdminStatCards stats={stats} isLoading={isLoading} />

      {/* 2-Column Charts Grid (Platform Activity 60% + Consultation Status 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AdminPlatformActivityChart range={selectedRange} />
        </div>
        <div className="lg:col-span-5">
          <AdminConsultationStatusDonut
            totalMeetings={filteredMeetings.length}
            recentMeetings={filteredMeetings}
          />
        </div>
      </div>

      {/* Bottom Table Card: Recent Platform Meetings & Consultation Logs */}
      <div
        id="consultations"
        className="bg-white dark:bg-[#111622] rounded-2xl border border-[#E2E8F0] dark:border-gray-800/80 p-5 sm:p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-[#64748B] dark:text-gray-300 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-[#0F172A] dark:text-white">
                  Recent Platform Meetings &amp; Consultation Logs
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 dark:bg-gray-800 text-[#64748B] dark:text-gray-400">
                  {filteredMeetings.length}
                </span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-gray-400 font-medium mt-0.5">
                Live consultation activity between students and their assigned counsellors.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/counsellors"
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold text-[#EF2D48] bg-[#FDE2E4] hover:bg-[#FCD8DB] dark:bg-[#34161E] dark:hover:bg-[#4A1D26] dark:text-rose-200 border border-[#F9C9CE] dark:border-[#4A1D26] transition-colors flex items-center gap-1.5"
          >
            <span>Counsellor Caseloads</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Table Content */}
        {isLoading && filteredMeetings.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-bold">
            <Loader2 className="w-6 h-6 animate-spin text-[#EF2D48]" />
            <span>Loading consultation logs...</span>
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-center text-[#64748B] dark:text-gray-400">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[#94A3B8] mb-1">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="font-bold text-sm text-[#0F172A] dark:text-white">
              No meetings found
            </p>
            <p className="text-xs max-w-sm">
              There are no consultation logs recorded for {selectedRange.toLowerCase()}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-gray-800/80 text-[#94A3B8] font-bold text-[11px]">
                  <th className="pb-3 px-2">Student</th>
                  <th className="pb-3 px-2">Assigned Counsellor</th>
                  <th className="pb-3 px-2">Scheduled Time</th>
                  <th className="pb-3 px-2">Topic / Agenda</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Meeting Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] dark:divide-gray-800/60 font-medium text-[#0F172A] dark:text-white">
                {filteredMeetings.map((m) => {
                  const badge = getMeetingStatusBadge(m.status);
                  const studentInitials = `${m.studentFirstName?.[0] || ''}${m.studentLastName?.[0] || ''}`.toUpperCase() || 'ST';
                  const initialsColorClass = getInitialsColor(studentInitials);

                  return (
                    <tr
                      key={m.id}
                      className="hover:bg-gray-50/70 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Student */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full ${initialsColorClass} font-bold text-[11px] flex items-center justify-center shrink-0`}
                          >
                            {studentInitials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-[#0F172A] dark:text-white truncate">
                              {m.studentFirstName} {m.studentLastName}
                            </div>
                            <div className="text-[11px] text-[#64748B] dark:text-gray-400 truncate font-normal">
                              {m.studentEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Assigned Counsellor */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-[#0F172A] dark:text-gray-200 truncate">
                              {m.counsellorFirstName} {m.counsellorLastName}
                            </div>
                            <div className="text-[11px] text-[#64748B] dark:text-gray-400 truncate font-normal">
                              {m.counsellorEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Scheduled Time */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5 text-xs text-[#0F172A] dark:text-gray-200">
                          <Calendar className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                          <span>{formatMeetingDateTime(m.scheduledStart)}</span>
                        </div>
                      </td>

                      {/* Topic / Agenda */}
                      <td className="py-3 px-2 max-w-xs">
                        <div className="flex items-center gap-1.5 text-xs text-[#0F172A] dark:text-gray-300">
                          <FileText className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                          <span className="truncate">{m.topic || 'Consultation Session'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-2">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${badge.classes}`}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Meeting Link */}
                      <td className="py-3 px-2 text-right">
                        {m.meetingLink ? (
                          <a
                            href={m.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 py-1 px-2 text-xs font-bold text-[#EF2D48] hover:underline transition-colors cursor-pointer"
                          >
                            <span>Join</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-gray-400 font-normal text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
