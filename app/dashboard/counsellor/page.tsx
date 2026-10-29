"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Headphones,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  ArrowUpRight,
  Layers,
  Flame,
  AlertTriangle,
  Zap,
  Timer,
} from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface DashboardTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  priority: string;
  status: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
}

export default function CounsellorDashboard() {
  const [tickets, setTickets] = useState<DashboardTicketSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchQueries() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/help/counsellor/queries`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setTickets(data);
          }
        }
      } catch (err) {
        // Silently handle error for overview card
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchQueries();
    return () => {
      isMounted = false;
    };
  }, []);

  const pendingInquiries = tickets.filter((q) => q.status !== 'resolved' && q.status !== 'closed');

  // Service Orders Queue Data
  const [serviceOrders, setServiceOrders] = useState<any[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/counsellor/assigned`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setServiceOrders(data);
        }
      } catch (err) {
        console.error('Failed to load counsellor services queue', err);
      } finally {
        setIsLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // Time & Urgency Calculations
  const { unattendedOrders, attendedOrders, urgentOrders, oldestOrder, waitingText } = useMemo(() => {
    const unattended = serviceOrders.filter((o) =>
      ['BOOKED', 'ASSIGNED', 'REVISION_REQUESTED'].includes(o.status)
    );
    const attended = serviceOrders.filter((o) =>
      ['IN_PROGRESS', 'DRAFT_READY'].includes(o.status)
    );

    // Sort unattended strictly by oldest first (FIFO)
    unattended.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const urgent = unattended.filter((o) => {
      if (o.plan_tier === 'EXPRESS') return true;
      if (o.target_deadline) {
        const diff = new Date(o.target_deadline).getTime() - Date.now();
        if (diff < 24 * 60 * 60 * 1000) return true; // overdue or due in <24h
      }
      const waitingMs = Date.now() - new Date(o.created_at).getTime();
      return waitingMs > 12 * 60 * 60 * 1000; // waiting unattended > 12h
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
      urgentOrders: urgent,
      oldestOrder: oldest,
      waitingText: text,
    };
  }, [serviceOrders]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-gold/20 dark:bg-amber-950/40 text-germany-black dark:text-amber-300 rounded-full font-bold text-[11px] border border-germany-gold/30 dark:border-amber-800/40">
              <Headphones className="w-3.5 h-3.5" />
              <span>Counsellor Strategy Hub</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black dark:text-white">
              Welcome, Advisor!
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 max-w-xl">
              You have <span className="text-germany-red font-bold">{unattendedOrders.length} service requests</span> awaiting attention and <span className="text-germany-red font-bold">{pendingInquiries.length} inquiries</span> in your help desk.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link
              href="/dashboard/counsellor/services"
              className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Services Delivery Queue</span>
              {urgentOrders.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-germany-red font-black text-[10px]">
                  {urgentOrders.length} Urgent
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/counsellor/help"
              className="bg-slate-800 hover:bg-slate-900 dark:bg-[#151B27] dark:hover:bg-[#1B2333] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-germany-gold" />
              <span>Guidance & Queries Desk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* URGENT TIME NOTIFICATION BANNER */}
      {urgentOrders.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40 relative overflow-hidden shadow-xs transition-all animate-in fade-in">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-germany-red" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-1">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-germany-red dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-900/40 shadow-xs mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-extrabold text-[#16161a] dark:text-white font-display tracking-tight">
                    Time-Sensitive Orders Awaiting Attention
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-germany-red text-white shadow-xs">
                    {urgentOrders.length} {urgentOrders.length === 1 ? 'Order' : 'Orders'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                    Priority Queue
                  </span>
                </div>
                <p className="text-xs text-[#5e5b54] dark:text-gray-400 font-medium">
                  {oldestOrder && (
                    <>
                      Highest Priority (Serve First):{' '}
                      <strong className="text-[#16161a] dark:text-white">
                        {oldestOrder.student_name}
                      </strong>{' '}
                      — {oldestOrder.service_type?.replace(/_/g, ' ')} ({oldestOrder.plan_tier} tier). Waiting{' '}
                      <span className="text-germany-red dark:text-red-400 font-bold">{waitingText}</span>.
                    </>
                  )}
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/counsellor/services"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-germany-red hover:bg-[#D62839] text-white transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <span>Serve Oldest First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Services Queue (Time-Based FIFO) */}
        <Link
          href="/dashboard/counsellor/services"
          className="bg-white dark:bg-[#111622] hover:bg-gray-50/80 dark:hover:bg-[#151B27] rounded-xl border border-gray-200/80 dark:border-gray-800 hover:border-germany-red/40 shadow-xs p-5 space-y-2 transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 group-hover:text-germany-red transition-colors">
              Services Queue (FIFO)
            </span>
            <div className={`p-2 rounded-xl ${urgentOrders.length > 0 ? 'bg-red-500/15 text-red-600' : 'bg-germany-gold/20 text-germany-black dark:text-amber-300'}`}>
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white flex items-center gap-2">
            <span>{unattendedOrders.length} In Queue</span>
            {urgentOrders.length > 0 && (
              <span className="text-xs font-black text-red-600 dark:text-red-400 animate-pulse">
                ({urgentOrders.length} Urgent)
              </span>
            )}
          </div>
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>{attendedOrders.length} Attended / Drafting</span>
            <span className="font-bold text-germany-red">Serve Oldest →</span>
          </p>
        </Link>

        {/* Metric 2: Scheduled Today */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Scheduled Today</span>
            <div className="p-2 bg-germany-red/10 dark:bg-red-950/40 rounded-xl text-germany-red">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">4 Consults</div>
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Next at 2:00 PM</p>
        </div>

        {/* Metric 3: Student Help Inquiries */}
        <Link
          href="/dashboard/counsellor/help"
          className="bg-white dark:bg-[#111622] hover:bg-gray-50/80 dark:hover:bg-[#151B27] rounded-xl border border-gray-200/80 dark:border-gray-800 hover:border-germany-red/40 shadow-xs p-5 space-y-2 transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400 group-hover:text-germany-red transition-colors">
              Student Help Inquiries
            </span>
            <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-xl text-germany-red">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-red">
            {pendingInquiries.length} Open
          </div>
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>Awaiting your guidance</span>
            <span className="font-bold text-germany-red">Open Desk →</span>
          </p>
        </Link>

        {/* Metric 4: Admissions Secured */}
        <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Admissions Secured</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-700 dark:text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black dark:text-white">19 Offers</div>
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">TUM, RWTH, Heidelberg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-germany-black dark:text-white">Today's Strategy Sessions</h3>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-400">3 Sessions Pending</span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[
              { student: 'Aarav Sharma', time: '2:00 PM - 2:45 PM', topic: 'TUM Statement of Purpose Finalization', status: 'Upcoming' },
              { student: 'Simran Kaur', time: '3:30 PM - 4:15 PM', topic: 'APS Document Verification & Notary Check', status: 'Upcoming' },
              { student: 'Vikram Joshi', time: '5:00 PM - 5:30 PM', topic: 'Blocked Account (Expatrio) & Visa Prep', status: 'Upcoming' },
            ].map((s) => (
              <div key={s.student} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-germany-black dark:text-white">{s.student}</div>
                  <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{s.topic} • <strong className="text-germany-red">{s.time}</strong></div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-germany-red hover:bg-[#D62839] text-white py-1.5 px-3 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer">
                    Launch Meet
                  </button>
                  <button className="p-1.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-germany-red rounded-xl shadow-xs transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Inquiries Attention Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-germany-black dark:text-white">Recent Queries</h3>
              <span className="bg-red-50 dark:bg-red-950/40 text-germany-red border border-red-200 dark:border-red-900 font-bold text-[10px] px-2 py-0.5 rounded-full">
                {pendingInquiries.length} Active
              </span>
            </div>
            <Link 
              href="/dashboard/counsellor/help"
              className="text-xs font-bold text-germany-red hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {isLoading ? (
              <div className="p-4 text-center text-xs text-gray-400">Loading inquiries...</div>
            ) : pendingInquiries.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">No active student inquiries</div>
            ) : (
              pendingInquiries.slice(0, 3).map((q) => (
                <Link
                  key={q.id}
                  href="/dashboard/counsellor/help"
                  className="block p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-germany-red/30 bg-gray-50/50 dark:bg-[#151B27]/50 hover:bg-[#FDFBF7] dark:hover:bg-[#1A2130] transition-all group"
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium mb-1">
                    <span className="font-mono font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#0A0D14] px-1.5 py-0.2 rounded border border-gray-200 dark:border-gray-700">
                      {q.ticketNumber}
                    </span>
                    <span className={`font-extrabold uppercase px-1.5 py-0.2 rounded ${
                      q.priority === 'urgent' ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}>
                      {q.priority}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-germany-black dark:text-white group-hover:text-germany-red transition-colors line-clamp-1">
                    {q.title}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1">
                    From: <strong className="text-gray-700 dark:text-gray-300">{q.student?.name || 'Student'}</strong>
                  </div>
                </Link>
              ))
            )}
          </div>

          <Link
            href="/dashboard/counsellor/help"
            className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-[#151B27] dark:hover:bg-[#1B2333] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span>Open Counsellor Help Desk</span>
            <ArrowRight className="w-3.5 h-3.5 text-germany-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
