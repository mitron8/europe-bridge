"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  Calendar,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  ExternalLink,
  AlertCircle,
  Loader2,
  RefreshCw,
  Video
} from 'lucide-react';

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
  scheduledEnd: string;
  timezone: string;
  status: string;
  topic: string;
  meetingLink: string | null;
  studentNotes: string | null;
  counsellorNotes: string | null;
  createdAt: string;
  studentUserId: string;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  counsellorUserId: string;
  counsellorFirstName: string;
  counsellorLastName: string;
  counsellorEmail: string;
};

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
  switch (status?.toUpperCase()) {
    case 'CONFIRMED':
      return {
        label: 'Confirmed',
        classes: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-500/30',
      };
    case 'COMPLETED':
      return {
        label: 'Completed',
        classes: 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30',
      };
    case 'PENDING_STUDENT':
    case 'PENDING_RESCHEDULE':
    case 'AWAITING_COMPLETION':
      return {
        label: status.replace('_', ' '),
        classes: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/30',
      };
    case 'CANCELLED':
      return {
        label: 'Cancelled',
        classes: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-500/30',
      };
    case 'EXPIRED':
      return {
        label: 'Expired',
        classes: 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-gray-700',
      };
    default:
      return {
        label: status || 'Scheduled',
        classes: 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300',
      };
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<RecentMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setRecentMeetings(data.recentMeetings || []);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to admin dashboard service');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-red/10 text-germany-red rounded-full font-bold text-[11px] border border-germany-red/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Operations Center</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black dark:text-white">
              Admin Platform Overview
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              Live operational metrics across student enrollments, active counsellor caseloads, paid subscriptions, and platform consultations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchOverview}
              disabled={isLoading}
              className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white rounded-xl border border-gray-200/80 dark:border-gray-700 transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/dashboard/admin/students"
              className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Manage Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center justify-between gap-2 border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchOverview}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Registered Students */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Registered Students</span>
            <div className="p-2 bg-germany-gold/20 rounded-xl text-germany-black">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : (stats?.totalStudents ?? 0)}
          </div>
          <p className="text-[11px] font-bold text-emerald-600">Active student accounts</p>
        </div>

        {/* Metric 2: Active Counsellors */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Counsellors</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : (stats?.activeCounsellors ?? 0)}
          </div>
          <p className="text-[11px] font-medium text-gray-500">Advising & student supervisors</p>
        </div>

        {/* Metric 3: Active Paid Subscriptions */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Paid Subscriptions</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-700 dark:text-blue-300">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : (stats?.activeSubscriptions ?? 0)}
          </div>
          <p className="text-[11px] font-medium text-gray-500">Enrolled tier memberships</p>
        </div>

        {/* Metric 4: Consultations / Meetings */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Platform Consultations</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-700 dark:text-amber-300">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : (stats?.totalMeetings ?? 0)}
          </div>
          <p className="text-[11px] font-medium text-amber-700">1-on-1 strategy sessions logged</p>
        </div>
      </div>

      {/* Option A: Recent Platform Meetings & Consultation Logs */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-germany-black dark:text-white">
              Recent Platform Meetings & Consultation Logs
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Live consultation activity between students and their assigned counsellors
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin/counsellors" className="text-xs font-bold text-germany-red hover:underline">
              Counsellor Caseloads &rarr;
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-bold">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading consultation logs...</span>
          </div>
        ) : recentMeetings.length === 0 ? (
          <div className="py-12 border border-dashed border-gray-200/80 dark:border-gray-800 rounded-xl text-center space-y-2">
            <Video className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto" />
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">No platform consultations logged yet.</p>
            <p className="text-[11px] text-gray-400">Scheduled 1-on-1 meetings will automatically appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200/80 dark:border-gray-800 text-gray-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Assigned Counsellor</th>
                  <th className="pb-3">Scheduled Time</th>
                  <th className="pb-3">Topic / Agenda</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Meeting Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-bold text-germany-black dark:text-white">
                {recentMeetings.map((m) => {
                  const badge = getMeetingStatusBadge(m.status);
                  return (
                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5">
                        <div className="font-bold text-germany-black dark:text-white">
                          {m.studentFirstName} {m.studentLastName}
                        </div>
                        <div className="text-[11px] text-gray-400 font-normal">
                          {m.studentEmail}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-gray-700 dark:text-gray-300">
                          {m.counsellorFirstName} {m.counsellorLastName}
                        </div>
                        <div className="text-[11px] text-gray-400 font-normal">
                          {m.counsellorEmail}
                        </div>
                      </td>
                      <td className="py-3.5 text-gray-600 dark:text-gray-300 font-medium">
                        {formatMeetingDateTime(m.scheduledStart)}
                      </td>
                      <td className="py-3.5 max-w-xs truncate text-gray-600 dark:text-gray-400 font-normal">
                        {m.topic || 'Strategy Consultation'}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badge.classes}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {m.meetingLink ? (
                          <a
                            href={m.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-bold text-germany-red hover:bg-germany-red/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Join</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-gray-400 font-normal text-[11px]">—</span>
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
