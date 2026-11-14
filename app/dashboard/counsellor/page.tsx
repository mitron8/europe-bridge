"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { CounsellorTopBar } from './components/CounsellorTopBar';
import { CounsellorHeroBanner } from './components/CounsellorHeroBanner';
import { CounsellorMetricCards } from './components/CounsellorMetricCards';
import { TodaySessionsCard } from './components/TodaySessionsCard';
import { RecentQueriesCard, DashboardTicketSummary } from './components/RecentQueriesCard';
import { CounsellorQuickActions } from './components/CounsellorQuickActions';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export default function CounsellorDashboard() {
  const [tickets, setTickets] = useState<DashboardTicketSummary[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [serviceOrders, setServiceOrders] = useState<any[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [meetingsOverview, setMeetingsOverview] = useState<any>(null);
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Current Counsellor User
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to load user', err);
      }
    }
    fetchUser();
  }, []);

  // Fetch Counsellor Inquiries
  useEffect(() => {
    let isMounted = true;
    async function fetchQueries() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/help/counsellor/queries`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setTickets(data);
        }
      } catch (err) {
        // Silently handle error
      } finally {
        if (isMounted) setIsLoadingTickets(false);
      }
    }
    fetchQueries();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Service Orders
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/counsellor/assigned`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setServiceOrders(data);
        }
      } catch (err) {
        console.error('Failed to load services queue', err);
      } finally {
        setIsLoadingServices(false);
      }
    }
    fetchServices();
  }, []);

  // Fetch Meetings Overview
  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/counsellor/overview`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setMeetingsOverview(data);
        }
      } catch (err) {
        console.error('Failed to load meetings overview', err);
      }
    }
    fetchMeetings();
  }, []);

  // Compute Active Tickets & Filter by Search Query
  const pendingInquiries = useMemo(() => {
    return tickets.filter((q) => q.status !== 'resolved' && q.status !== 'closed');
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    if (!searchQuery.trim()) return pendingInquiries;
    const q = searchQuery.toLowerCase();
    return pendingInquiries.filter(
      (t) =>
        t.title?.toLowerCase().includes(q) ||
        t.ticketNumber?.toLowerCase().includes(q) ||
        t.student?.name?.toLowerCase().includes(q)
    );
  }, [pendingInquiries, searchQuery]);

  // Urgent Orders & Status Breakdown
  const { unattendedOrders, attendedOrders, completedOrders, urgentOrders, oldestOrder, waitingText } = useMemo(() => {
    const unattended = serviceOrders.filter((o) =>
      ['BOOKED', 'ASSIGNED', 'REVISION_REQUESTED'].includes(o.status)
    );
    const attended = serviceOrders.filter((o) =>
      ['IN_PROGRESS', 'DRAFT_READY'].includes(o.status)
    );
    const completed = serviceOrders.filter((o) => o.status === 'COMPLETED');

    unattended.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const urgent = unattended.filter((o) => {
      if (o.plan_tier === 'EXPRESS') return true;
      if (o.target_deadline) {
        const diff = new Date(o.target_deadline).getTime() - Date.now();
        if (diff < 24 * 60 * 60 * 1000) return true;
      }
      const waitingMs = Date.now() - new Date(o.created_at).getTime();
      return waitingMs > 12 * 60 * 60 * 1000;
    });

    const oldest = unattended[0] || null;
    let text = '';
    if (oldest) {
      const diff = Math.max(0, Date.now() - new Date(oldest.created_at).getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const days = Math.floor(hours / 24);
      if (days > 0) text = `${days}d ${hours % 24}h`;
      else if (hours > 0) text = `${hours}h ${minutes}m`;
      else text = `${Math.max(1, minutes)}m`;
    }

    return {
      unattendedOrders: unattended,
      attendedOrders: attended,
      completedOrders: completed,
      urgentOrders: urgent,
      oldestOrder: oldest,
      waitingText: text,
    };
  }, [serviceOrders]);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'CU'
    : 'CU';

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Counsellor User'
    : 'Counsellor User';

  return (
    <div className="space-y-6 pb-6">
      {/* 1. Top Search & Controls Bar */}
      <CounsellorTopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadCount={pendingInquiries.length}
        initials={initials}
        fullName={fullName}
      />

      {/* 2. Strategy Hub Hero Banner */}
      <CounsellorHeroBanner />

      {/* 3. Urgent Order Alert Banner (Only when urgent orders exist) */}
      {urgentOrders.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 relative overflow-hidden shadow-2xs">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B91C1C]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-1">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/50 text-[#B91C1C] flex items-center justify-center shrink-0 border border-red-200 dark:border-red-800 shadow-2xs mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-extrabold text-[#2A080F] dark:text-white">
                    Time-Sensitive Orders Awaiting Attention
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#B91C1C] text-white">
                    {urgentOrders.length} {urgentOrders.length === 1 ? 'Order' : 'Orders'}
                  </span>
                </div>
                {oldestOrder && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Highest Priority (Serve First):{' '}
                    <strong className="text-[#2A080F] dark:text-white">{oldestOrder.student_name}</strong> —{' '}
                    {oldestOrder.service_type?.replace(/_/g, ' ')} ({oldestOrder.plan_tier} tier). Waiting{' '}
                    <span className="text-[#B91C1C] font-bold">{waitingText}</span>.
                  </p>
                )}
              </div>
            </div>

            <Link
              href="/dashboard/counsellor/services"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B91C1C] hover:bg-[#991B1B] text-white transition-all flex items-center justify-center gap-2 shadow-2xs shrink-0 cursor-pointer"
            >
              <span>Serve Oldest First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. 4 Metric Cards */}
      <CounsellorMetricCards
        unattendedCount={unattendedOrders.length}
        attendedCount={attendedOrders.length}
        todayConsultsCount={meetingsOverview?.summary?.todayCount ?? 0}
        upcomingConsultsCount={meetingsOverview?.summary?.upcomingCount ?? 0}
        pendingInquiriesCount={pendingInquiries.length}
        completedCount={completedOrders.length}
        urgentCount={urgentOrders.length}
      />

      {/* 5. Two Columns: Today's Strategy Sessions (7 cols) + Recent Queries (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TodaySessionsCard meetings={meetingsOverview?.todaysMeetings || []} />
        </div>

        <div className="lg:col-span-5">
          <RecentQueriesCard tickets={filteredTickets} isLoading={isLoadingTickets} />
        </div>
      </div>

      {/* 6. Quick Actions */}
      <CounsellorQuickActions />
    </div>
  );
}
