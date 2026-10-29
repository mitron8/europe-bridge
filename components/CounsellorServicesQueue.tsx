"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Clock,
  CheckCircle2,
  Upload,
  MessageSquare,
  FileText,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Search,
  User,
  Zap,
  SlidersHorizontal,
  AlertTriangle,
  Timer,
  ArrowDownUp,
  Flame,
  Calendar,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface CounsellorServiceOrder {
  id: string;
  student_user_id: string;
  student_name: string;
  student_email: string;
  service_type: string;
  plan_tier: string;
  amount_inr: number;
  status: string;
  payment_status?: string;
  target_deadline: string | null;
  student_inputs: Record<string, any>;
  deliverables: Array<{ title: string; url: string }>;
  revisions_used: number;
  max_revisions: number;
  counsellor_notes: string | null;
  created_at: string;
  updated_at?: string;
}

type TabType = 'unattended' | 'attended' | 'completed' | 'all';
type SortOption = 'oldest' | 'urgent' | 'newest';

export function CounsellorServicesQueue() {
  const [orders, setOrders] = useState<CounsellorServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('unattended');
  const [sortOption, setSortOption] = useState<SortOption>('oldest');
  const [onlyUrgentFilter, setOnlyUrgentFilter] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Draft delivery modal
  const [selectedOrder, setSelectedOrder] = useState<CounsellorServiceOrder | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [counsellorNotes, setCounsellorNotes] = useState('');
  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);

  // Status update modal state
  const [orderForStatusUpdate, setOrderForStatusUpdate] = useState<CounsellorServiceOrder | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('BOOKED');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('UNPAID');
  const [statusUpdateNotes, setStatusUpdateNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Quick 1-click status update (e.g. Mark as Attended / In Progress)
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const fetchAssignedOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/counsellor/assigned`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError('Unable to load assigned service queue.');
      }
    } catch {
      setError('Connection error loading services queue.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  // Time & Deadline Helpers
  const getTimeWaiting = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const diff = Math.max(0, Date.now() - createdTime);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(hours / 24);

    let text = '';
    if (days > 0) {
      text = `${days}d ${hours % 24}h waiting`;
    } else if (hours > 0) {
      text = `${hours}h ${minutes}m waiting`;
    } else {
      text = `${Math.max(1, minutes)}m waiting`;
    }

    return {
      text,
      totalHours: hours,
      isVeryOld: hours >= 24,
      isOld: hours >= 12,
      createdDateFormatted: new Date(createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const getDeadlineStatus = (targetDeadline: string | null) => {
    if (!targetDeadline) {
      return {
        isOverdue: false,
        isUrgent: false,
        isCritical: false,
        text: 'Standard Timeline',
        hoursLeft: 9999,
      };
    }

    const diff = new Date(targetDeadline).getTime() - Date.now();
    if (diff < 0) {
      const overdueHours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
      const overdueDays = Math.floor(overdueHours / 24);
      return {
        isOverdue: true,
        isUrgent: true,
        isCritical: true,
        text: overdueDays > 0 ? `Overdue by ${overdueDays}d ${overdueHours % 24}h` : `Overdue by ${overdueHours}h`,
        hoursLeft: diff / (1000 * 60 * 60),
      };
    }

    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursLeft < 12) {
      return {
        isOverdue: false,
        isUrgent: true,
        isCritical: true,
        text: `Due in ${hoursLeft}h ${minutesLeft}m`,
        hoursLeft,
      };
    }
    if (hoursLeft < 24) {
      return {
        isOverdue: false,
        isUrgent: true,
        isCritical: false,
        text: `Due in ${hoursLeft}h`,
        hoursLeft,
      };
    }
    const daysLeft = Math.floor(hoursLeft / 24);
    return {
      isOverdue: false,
      isUrgent: false,
      isCritical: false,
      text: `Due in ${daysLeft}d ${hoursLeft % 24}h`,
      hoursLeft,
    };
  };

  // Helper to determine if an order is urgent
  const isOrderUrgent = (order: CounsellorServiceOrder) => {
    if (order.status === 'COMPLETED' || order.status === 'CANCELLED') return false;
    const dl = getDeadlineStatus(order.target_deadline);
    const waiting = getTimeWaiting(order.created_at);
    const isExpress = order.plan_tier === 'EXPRESS';
    return (
      dl.isOverdue ||
      dl.isUrgent ||
      isExpress ||
      (order.status !== 'IN_PROGRESS' && order.status !== 'DRAFT_READY' && waiting.isOld)
    );
  };

  // Status Categorization
  const isUnattended = (status: string) => ['BOOKED', 'ASSIGNED', 'REVISION_REQUESTED'].includes(status);
  const isAttended = (status: string) => ['IN_PROGRESS', 'DRAFT_READY'].includes(status);
  const isCompleted = (status: string) => ['COMPLETED'].includes(status);

  // Aggregate Counts
  const counts = useMemo(() => {
    let unattended = 0;
    let attended = 0;
    let completed = 0;
    let urgent = 0;
    let overdue = 0;
    let express = 0;

    orders.forEach((o) => {
      if (isUnattended(o.status)) unattended++;
      if (isAttended(o.status)) attended++;
      if (isCompleted(o.status)) completed++;

      if (isOrderUrgent(o)) urgent++;
      const dl = getDeadlineStatus(o.target_deadline);
      if (dl.isOverdue && o.status !== 'COMPLETED') overdue++;
      if (o.plan_tier === 'EXPRESS' && o.status !== 'COMPLETED') express++;
    });

    return {
      unattended,
      attended,
      completed,
      all: orders.length,
      urgent,
      overdue,
      express,
    };
  }, [orders]);

  // Tab Filtering & Sorting
  const processedOrders = useMemo(() => {
    let result = orders.filter((o) => {
      // 1. Search filter
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        o.student_name?.toLowerCase().includes(q) ||
        o.student_email?.toLowerCase().includes(q) ||
        o.service_type?.toLowerCase().includes(q) ||
        o.id?.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // 2. Urgent filter toggle
      if (onlyUrgentFilter && !isOrderUrgent(o)) return false;

      // 3. Tab filter
      if (activeTab === 'unattended') return isUnattended(o.status);
      if (activeTab === 'attended') return isAttended(o.status);
      if (activeTab === 'completed') return isCompleted(o.status);
      return true; // 'all'
    });

    // 4. Sorting
    result.sort((a, b) => {
      if (sortOption === 'oldest') {
        // Oldest order first (First-In, First-Out)
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortOption === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortOption === 'urgent') {
        // Overdue first, then soonest deadline, then express, then oldest
        const dlA = getDeadlineStatus(a.target_deadline);
        const dlB = getDeadlineStatus(b.target_deadline);
        if (dlA.isOverdue && !dlB.isOverdue) return -1;
        if (!dlA.isOverdue && dlB.isOverdue) return 1;

        if (dlA.hoursLeft !== dlB.hoursLeft) {
          return dlA.hoursLeft - dlB.hoursLeft;
        }

        if (a.plan_tier === 'EXPRESS' && b.plan_tier !== 'EXPRESS') return -1;
        if (a.plan_tier !== 'EXPRESS' && b.plan_tier === 'EXPRESS') return 1;

        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });

    return result;
  }, [orders, searchTerm, activeTab, sortOption, onlyUrgentFilter]);

  // Quick 1-click action: Mark as Attended / In Progress
  const handleQuickMarkAttended = async (orderId: string) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/counsellor/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: 'IN_PROGRESS',
          notes: 'Counselor started actively drafting this document.',
        }),
      });

      if (res.ok) {
        setActionSuccessMsg('Order marked as Attended & In Progress! Moved to the Attended tab.');
        setTimeout(() => setActionSuccessMsg(null), 4000);
        await fetchAssignedOrders();
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(errJson.message || 'Failed to update order status');
      }
    } catch {
      alert('Network error updating order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleOpenStatusModal = (order: CounsellorServiceOrder) => {
    setOrderForStatusUpdate(order);
    setSelectedStatus(order.status || 'BOOKED');
    setSelectedPaymentStatus(order.payment_status || 'UNPAID');
    setStatusUpdateNotes(order.counsellor_notes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForStatusUpdate) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/service-orders/counsellor/${orderForStatusUpdate.id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            status: selectedStatus,
            paymentStatus: selectedPaymentStatus,
            notes: statusUpdateNotes.trim() || undefined,
          }),
        },
      );

      if (res.ok) {
        setOrderForStatusUpdate(null);
        setActionSuccessMsg(`Status updated to ${selectedStatus}`);
        setTimeout(() => setActionSuccessMsg(null), 3000);
        await fetchAssignedOrders();
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(errJson.message || 'Failed to update order status');
      }
    } catch {
      alert('Network error updating status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeliverDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !draftUrl.trim()) return;

    setIsSubmittingDraft(true);
    try {
      const deliverables = [
        ...(selectedOrder.deliverables || []),
        {
          title: draftTitle.trim() || `${selectedOrder.service_type} - Draft Deliverable`,
          url: draftUrl.trim(),
        },
      ];

      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/service-orders/counsellor/${selectedOrder.id}/deliver`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            deliverables,
            notes: counsellorNotes.trim() || undefined,
          }),
        },
      );

      if (res.ok) {
        setSelectedOrder(null);
        setDraftTitle('');
        setDraftUrl('');
        setCounsellorNotes('');
        setActionSuccessMsg('Draft delivered successfully to student dashboard!');
        setTimeout(() => setActionSuccessMsg(null), 3500);
        await fetchAssignedOrders();
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(errJson.message || 'Failed to deliver draft');
      }
    } catch {
      alert('Network error submitting deliverable');
    } finally {
      setIsSubmittingDraft(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="p-3.5 px-4 bg-emerald-500 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button
            onClick={() => setActionSuccessMsg(null)}
            className="text-white/80 hover:text-white text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-black text-[#16161a] dark:text-white font-display">
              Assigned Services Queue
            </h2>
            {counts.urgent > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                <AlertTriangle className="w-3 h-3 text-red-600 dark:text-red-400" />
                <span>{counts.urgent} Urgent</span>
              </span>
            )}
          </div>
          <p className="text-xs text-[#5e5b54] dark:text-gray-400 mt-1">
            FIFO Priority: Older student orders must be served before newer requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#787369] dark:text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or service..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
            />
          </div>

          <button
            onClick={fetchAssignedOrders}
            className="p-2 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#111622] text-[#16161a] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
            title="Refresh queue"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* URGENT NOTIFICATION BANNER BASED ON TIME */}
      {counts.urgent > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40 relative overflow-hidden shadow-xs transition-all">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-germany-red" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-1">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-germany-red dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-900/40 shadow-xs mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-extrabold text-[#16161a] dark:text-white font-display tracking-tight">
                    Time-Sensitive Orders Awaiting Action
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-germany-red text-white shadow-xs">
                    {counts.urgent} {counts.urgent === 1 ? 'Order' : 'Orders'}
                  </span>
                  {counts.overdue > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                      {counts.overdue} Overdue
                    </span>
                  )}
                  {counts.express > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 fill-current text-amber-600" />
                      <span>{counts.express} Express 24h</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5e5b54] dark:text-gray-400 font-medium">
                  Oldest unserved orders are prioritized first (FIFO). Attend to pending student deliverables before target deadlines expire.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <button
                onClick={() => {
                  setActiveTab('unattended');
                  setOnlyUrgentFilter(!onlyUrgentFilter);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  onlyUrgentFilter
                    ? 'bg-germany-red text-white shadow-sm ring-2 ring-red-400/40'
                    : 'bg-white dark:bg-[#151B27] text-gray-700 dark:text-gray-200 border border-gray-200/90 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 hover:text-germany-red dark:hover:text-red-400'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{onlyUrgentFilter ? 'Showing Urgent Only' : 'Filter Urgent Orders'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABS & SORT CONTROLS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d3] dark:border-gray-800 pb-3">
        {/* Specific Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tab 1: Unattended / Pending Attention */}
          <button
            onClick={() => setActiveTab('unattended')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'unattended'
                ? 'bg-[#16161a] dark:bg-white text-white dark:text-[#16161a]'
                : 'bg-white dark:bg-[#111622] text-[#5e5b54] dark:text-gray-300 border border-[#dcd7cb] dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Attention</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                counts.unattended > 0
                  ? activeTab === 'unattended'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {counts.unattended}
            </span>
          </button>

          {/* Tab 2: ATTENDED (Specific Tab Requested by User) */}
          <button
            onClick={() => setActiveTab('attended')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'attended'
                ? 'bg-[#16161a] dark:bg-white text-white dark:text-[#16161a]'
                : 'bg-white dark:bg-[#111622] text-[#5e5b54] dark:text-gray-300 border border-[#dcd7cb] dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Attended / In Progress</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                activeTab === 'attended'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
              }`}
            >
              {counts.attended}
            </span>
          </button>

          {/* Tab 3: Completed */}
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'completed'
                ? 'bg-[#16161a] dark:bg-white text-white dark:text-[#16161a]'
                : 'bg-white dark:bg-[#111622] text-[#5e5b54] dark:text-gray-300 border border-[#dcd7cb] dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Completed</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                activeTab === 'completed'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {counts.completed}
            </span>
          </button>

          {/* Tab 4: All Orders */}
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'all'
                ? 'bg-[#16161a] dark:bg-white text-white dark:text-[#16161a]'
                : 'bg-white dark:bg-[#111622] text-[#5e5b54] dark:text-gray-300 border border-[#dcd7cb] dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All ({counts.all})</span>
          </button>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowDownUp className="w-3.5 h-3.5 text-[#787369] dark:text-gray-400" />
          <span className="text-xs font-bold text-[#5e5b54] dark:text-gray-400">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="p-1.5 px-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-bold text-[#16161a] dark:text-white focus:outline-hidden focus:ring-1 focus:ring-germany-red cursor-pointer"
          >
            <option value="oldest">Oldest First (Serve First • FIFO)</option>
            <option value="urgent">Urgent / Soonest Deadline</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Main Order Cards Content */}
      {isLoading ? (
        <div className="p-12 text-center bg-[#faf8f3] dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#16161a] dark:text-white" />
          <p className="text-xs font-bold text-[#5e5b54] dark:text-gray-400">Loading assigned queue...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-800/50 text-xs font-bold">
          {error}
        </div>
      ) : processedOrders.length === 0 ? (
        <div className="p-12 text-center bg-[#faf8f3] dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-[#16161a] dark:text-white">
            {activeTab === 'unattended'
              ? 'No Unattended Orders!'
              : activeTab === 'attended'
              ? 'No Orders Currently In Attended Status'
              : 'No orders match this filter'}
          </h3>
          <p className="text-xs text-[#5e5b54] dark:text-gray-400 max-w-sm mx-auto">
            {activeTab === 'unattended'
              ? 'All incoming student requests have been attended to or completed.'
              : 'Switch tabs or clear filters to view other orders in your queue.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {processedOrders.map((order, index) => {
            const isExpress = order.plan_tier === 'EXPRESS';
            const waiting = getTimeWaiting(order.created_at);
            const dl = getDeadlineStatus(order.target_deadline);
            const urgent = isOrderUrgent(order);
            const orderIsUnattended = isUnattended(order.status);
            const isFirstToServe = activeTab === 'unattended' && sortOption === 'oldest' && index === 0;

            return (
              <div
                key={order.id}
                className={`p-5 rounded-2xl bg-white dark:bg-[#111622] border transition-all space-y-4 shadow-xs ${
                  isFirstToServe
                    ? 'border-red-500/80 dark:border-red-500/60 ring-2 ring-red-500/20'
                    : urgent
                    ? 'border-amber-400/80 dark:border-amber-500/40'
                    : 'border-[#e5e0d3] dark:border-gray-800'
                }`}
              >
                {/* Top Status & Priority Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e0d3] dark:border-gray-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Priority queue tag */}
                      {isFirstToServe ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-germany-red text-white flex items-center gap-1.5 shadow-xs">
                          <Clock className="w-3 h-3 text-white" />
                          <span>Priority #1 • Waiting Longest</span>
                        </span>
                      ) : orderIsUnattended && sortOption === 'oldest' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-[#16161a] dark:text-gray-300">
                          Queue #{index + 1}
                        </span>
                      ) : null}

                      {/* Service Title */}
                      <span className="font-extrabold text-sm text-[#16161a] dark:text-white">
                        {order.service_type.replace(/_/g, ' ')}
                      </span>

                      {/* Tier Badge */}
                      {isExpress ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16161a] dark:bg-amber-950/60 text-white dark:text-amber-300 border border-transparent dark:border-amber-800/50 flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current text-[#c9a35b]" />
                          <span>Express 24h</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ece7dd] dark:bg-[#1A2130] text-[#16161a] dark:text-gray-200 border border-[#dcd7cb] dark:border-gray-700">
                          Standard
                        </span>
                      )}
                    </div>

                    {/* Student Info & Order Timestamp */}
                    <div className="text-xs text-[#5e5b54] dark:text-gray-400 font-medium flex flex-wrap items-center gap-2">
                      <span>Order #{order.id.slice(0, 8)}</span>
                      <span>•</span>
                      <span className="font-bold text-[#16161a] dark:text-white flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#787369]" />
                        <span>{order.student_name}</span>
                      </span>
                      <span>({order.student_email})</span>
                      <span>•</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        Booked: {waiting.createdDateFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Badges and Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Time Waiting Pill */}
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border ${
                        waiting.isVeryOld
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900'
                          : waiting.isOld
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                          : 'bg-[#faf8f3] dark:bg-[#151B27] text-[#5e5b54] dark:text-gray-300 border-[#e5e0d3] dark:border-gray-800'
                      }`}
                    >
                      <Timer className="w-3 h-3" />
                      <span>{waiting.text}</span>
                    </span>

                    {/* Deadline Pill */}
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border ${
                        dl.isOverdue
                          ? 'bg-red-600 text-white border-red-700 animate-pulse'
                          : dl.isCritical
                          ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 font-black'
                          : dl.isUrgent
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                          : 'bg-[#faf8f3] dark:bg-[#151B27] text-[#5e5b54] dark:text-gray-300 border-[#e5e0d3] dark:border-gray-800'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{dl.text}</span>
                    </span>

                    {/* Status badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        order.status === 'COMPLETED'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : order.status === 'IN_PROGRESS' || order.status === 'DRAFT_READY'
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      Status: {order.status}
                    </span>

                    {/* Payment status badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        order.payment_status === 'PAID'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-[#c9a35b] dark:text-[#e0bb6b] border-[#e5e0d3] dark:border-amber-800/50'
                      }`}
                    >
                      {order.payment_status === 'PAID' ? 'Paid & Verified' : 'Payment Pending'}
                    </span>
                  </div>
                </div>

                {/* Questionnaire / Student Inputs Preview */}
                {order.student_inputs && Object.keys(order.student_inputs).length > 0 && (
                  <div className="p-3.5 bg-[#faf8f3] dark:bg-[#151B27] border border-[#e5e0d3] dark:border-gray-800 rounded-xl text-xs space-y-1.5">
                    <span className="font-bold text-[#5e5b54] dark:text-gray-400 block">
                      Student Questionnaire Inputs:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#16161a] dark:text-gray-200">
                      {Object.entries(order.student_inputs).map(([key, val]) => {
                        if (typeof val === 'object') return null;
                        return (
                          <div key={key}>
                            <span className="text-[#6b6760] dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}:{' '}
                            </span>
                            <span className="font-bold text-[#16161a] dark:text-white">
                              {String(val)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Deliverables Delivered */}
                {order.deliverables && order.deliverables.length > 0 && (
                  <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs space-y-1.5">
                    <span className="font-bold text-blue-800 dark:text-blue-300 block">
                      Delivered Drafts &amp; Files:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {order.deliverables.map((d, dIdx) => (
                        <a
                          key={dIdx}
                          href={d.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#111622] rounded-lg border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{d.title || `Draft #${dIdx + 1}`}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes & Revisions */}
                {order.counsellor_notes && (
                  <div className="p-3 bg-[#ece7dd] dark:bg-amber-950/20 border border-[#dcd7cb] dark:border-amber-800/40 rounded-xl text-xs text-[#16161a] dark:text-amber-200 space-y-1">
                    <span className="font-bold block text-[#16161a] dark:text-amber-300">
                      Revision History &amp; Notes:
                    </span>
                    <p className="whitespace-pre-line text-[#16161a] dark:text-gray-200">
                      {order.counsellor_notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-[#5e5b54] dark:text-gray-400 font-medium">
                    {orderIsUnattended ? (
                      <span className="text-red-600 dark:text-red-400 font-bold inline-flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Action Required: Mark as attended or deliver draft for this student.</span>
                      </span>
                    ) : (
                      <span className="text-blue-600 dark:text-blue-400 font-bold inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                        <span>Currently in Attended state.</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* 1-Click "Mark as Attended (In Progress)" */}
                    {orderIsUnattended && (
                      <button
                        onClick={() => handleQuickMarkAttended(order.id)}
                        disabled={updatingOrderId === order.id}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>
                          {updatingOrderId === order.id ? 'Attending...' : 'Mark as Attended (Start)'}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenStatusModal(order)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-white border border-[#dcd7cb] dark:border-gray-700 hover:bg-[#ece7dd] dark:hover:bg-[#1A2130] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#c9a35b]" />
                      <span>Update Status</span>
                    </button>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Deliver Draft</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Deliver Draft Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 bg-white dark:bg-[#111622] rounded-3xl border border-[#e5e0d3] dark:border-gray-800 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#16161a] dark:text-white font-display">
                Deliver Draft to Student
              </h3>
              <p className="text-xs text-[#5e5b54] dark:text-gray-400">
                Student: <strong className="text-[#16161a] dark:text-white">{selectedOrder.student_name}</strong> •{' '}
                {selectedOrder.service_type}
              </p>
            </div>

            <form onSubmit={handleDeliverDraft} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Deliverable Document Title
                </label>
                <input
                  type="text"
                  required
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. RWTH Aachen Robotics SOP - First Draft v1"
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Document Download URL (Google Docs / Google Drive / ImageKit link) *
                </label>
                <input
                  type="url"
                  required
                  value={draftUrl}
                  onChange={(e) => setDraftUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Notes / Instructions for Student
                </label>
                <textarea
                  rows={3}
                  value={counsellorNotes}
                  onChange={(e) => setCounsellorNotes(e.target.value)}
                  placeholder="e.g. Please review the highlighted sections on page 2 regarding your final semester thesis..."
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-xs font-bold text-[#5e5b54] dark:text-gray-400 hover:text-[#16161a] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDraft || !draftUrl.trim()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSubmittingDraft ? 'Delivering...' : 'Send Draft to Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Order & Payment Status Modal */}
      {orderForStatusUpdate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 bg-white dark:bg-[#111622] rounded-3xl border border-[#e5e0d3] dark:border-gray-800 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#16161a] dark:text-white font-display">
                Update Service Order Status
              </h3>
              <p className="text-xs text-[#5e5b54] dark:text-gray-400">
                Student: <strong className="text-[#16161a] dark:text-white">{orderForStatusUpdate.student_name}</strong> •{' '}
                {orderForStatusUpdate.service_type}
              </p>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Service Delivery Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-bold text-[#16161a] dark:text-white focus:outline-hidden focus:ring-1 focus:ring-germany-red cursor-pointer"
                >
                  <optgroup label="Unattended / In Queue">
                    <option value="BOOKED">BOOKED (Order Received / In Queue)</option>
                    <option value="ASSIGNED">ASSIGNED (Assigned to Counselor)</option>
                    <option value="REVISION_REQUESTED">REVISION_REQUESTED (Revision in Queue)</option>
                  </optgroup>
                  <optgroup label="Attended">
                    <option value="IN_PROGRESS">IN_PROGRESS (Drafting in Progress)</option>
                    <option value="DRAFT_READY">DRAFT_READY (Draft Delivered to Student)</option>
                  </optgroup>
                  <optgroup label="Finalized">
                    <option value="COMPLETED">COMPLETED (Order Completed & Finalized)</option>
                    <option value="CANCELLED">CANCELLED (Order Cancelled)</option>
                  </optgroup>
                </select>
                <p className="text-[11px] text-[#5e5b54] dark:text-gray-400 mt-1">
                  Choosing IN_PROGRESS or DRAFT_READY will move this order to the <strong>Attended</strong> tab.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Payment Status
                </label>
                <select
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-bold text-[#16161a] dark:text-white focus:outline-hidden focus:ring-1 focus:ring-germany-red cursor-pointer"
                >
                  <option value="UNPAID">UNPAID (Payment Pending / Milestone)</option>
                  <option value="PAYMENT_PENDING">PAYMENT_PENDING (Invoice Sent to Student)</option>
                  <option value="PAID">PAID (Payment Cleared & Verified)</option>
                  <option value="WAIVED">WAIVED (Free / Package Included)</option>
                </select>
                <p className="text-[11px] text-[#5e5b54] dark:text-gray-400 mt-1">
                  EuropeBridge does not charge students upfront at form submission. You can update payment status here once verified.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
                  Counselor Notes / Internal Remarks
                </label>
                <textarea
                  rows={3}
                  value={statusUpdateNotes}
                  onChange={(e) => setStatusUpdateNotes(e.target.value)}
                  placeholder="e.g. Student contacted via WhatsApp. Discussion scheduled for Friday."
                  className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderForStatusUpdate(null)}
                  className="px-4 py-2 text-xs font-bold text-[#5e5b54] dark:text-gray-400 hover:text-[#16161a] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingStatus}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isUpdatingStatus ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
