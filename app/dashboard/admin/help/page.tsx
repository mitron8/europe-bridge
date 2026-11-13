"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  ArrowUpRight, 
  ShieldCheck,
  CheckCircle2,
  Layers,
  Clock
} from 'lucide-react';
import { getChatSocket } from '@/lib/socket';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

import {
  ESCALATION_REASONS,
  AdminTicketSummary,
  MessageItem,
  AdminTicketDetails,
} from '@/components/help/types';
import { AdminEscalateModal } from '@/components/help/AdminEscalateModal';
import { AdminResolveModal } from '@/components/help/AdminResolveModal';
import { AdminTicketList } from '@/components/help/AdminTicketList';
import { AdminTicketThread } from '@/components/help/AdminTicketThread';

export default function AdminHelpPage() {
  const [tickets, setTickets] = useState<AdminTicketSummary[]>([]);
  const [activeTab, setActiveTab] = useState<'escalated' | 'all' | 'resolved'>('escalated');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [counsellorFilter, setCounsellorFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState<AdminTicketDetails | null>(null);

  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Message compose form state
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  // Modals state
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalateReason, setEscalateReason] = useState(ESCALATION_REASONS[0]);
  const [escalateAdminNotes, setEscalateAdminNotes] = useState('');
  const [isEscalating, setIsEscalating] = useState(false);

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState('');
  const [isResolving, setIsResolving] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Fetch tickets list
  const fetchTickets = async () => {
    try {
      setIsLoadingList(true);
      setErrorMessage(null);

      const res = await fetch(`${API_URL}/help/admin/queries`, {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to load inquiries (${res.status})`);
      }

      const data: AdminTicketSummary[] = await res.json();
      setTickets(data);

      // Auto-select first ticket if none currently selected
      if (!selectedTicketId && data.length > 0) {
        const defaultTicket = activeTab === 'escalated'
          ? data.find(t => t.status === 'escalated') || data[0]
          : data[0];
        setSelectedTicketId(defaultTicket.id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error fetching inquiries');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTickets();

    const socket = getChatSocket();
    const handleEscalationNotice = (data: any) => {
      if (data?.isEscalation || data?.type === 'escalation_alert') {
        fetchTickets();
      }
    };
    socket.on('new_notification', handleEscalationNotice);
    socket.on('admin_escalations_updated', fetchTickets);
    socket.on('ticket_list_updated', fetchTickets);

    return () => {
      socket.off('new_notification', handleEscalationNotice);
      socket.off('admin_escalations_updated', fetchTickets);
      socket.off('ticket_list_updated', fetchTickets);
    };
  }, []);

  // 2. Fetch ticket details when selectedTicketId changes
  useEffect(() => {
    if (!selectedTicketId) {
      setTicketDetails(null);
      return;
    }

    let isMounted = true;
    async function loadDetails() {
      try {
        setIsLoadingDetails(true);
        const res = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data: AdminTicketDetails = await res.json();
          if (isMounted) {
            setTicketDetails(data);
          }
        }
      } catch (err) {
        // Silently handle error
      } finally {
        if (isMounted) setIsLoadingDetails(false);
      }
    }

    loadDetails();

    const socket = getChatSocket();
    socket.emit('join_ticket', { ticketId: selectedTicketId });

    const handleIncomingMessage = (msg: any) => {
      if (msg && msg.ticketId === selectedTicketId) {
        setTicketDetails((prev) => {
          if (!prev) return prev;
          if (prev.messages.some((m) => m.id === msg.id)) return prev;
          const isAdmin = ['admin', 'superadmin'].includes(msg.senderRole);
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: msg.id,
                senderId: msg.senderUserId || 'other',
                senderName: isAdmin
                  ? 'You (Admin)'
                  : msg.senderRole === 'counsellor'
                  ? 'Counsellor'
                  : prev.student.name || 'Student',
                senderRole: msg.senderRole,
                isInternalNote: Boolean(msg.isInternalNote || msg.isInternal),
                content: msg.content,
                isMe: isAdmin,
                createdAt: msg.createdAt,
              },
            ],
          };
        });
        socket.emit('mark_ticket_read', { ticketId: selectedTicketId });
      }
    };

    const handleStatusUpdated = (data: any) => {
      if (data && data.ticketId === selectedTicketId) {
        setTicketDetails((prev) =>
          prev
            ? {
                ...prev,
                status: data.status,
                canChat: data.status === 'escalated',
              }
            : prev,
        );
        fetchTickets();
      }
    };

    socket.on('new_message', handleIncomingMessage);
    socket.on('new_internal_note', handleIncomingMessage);
    socket.on('ticket_status_updated', handleStatusUpdated);

    // Silent background poll to guarantee zero dropped messages
    const pollInterval = setInterval(() => {
      if (selectedTicketId) {
        fetch(`${API_URL}/help/admin/queries/${selectedTicketId}`, { credentials: 'include' })
          .then((r) => (r.ok ? r.json() : null))
          .then((data: AdminTicketDetails) => {
            if (data && data.messages) {
              setTicketDetails((prev) => {
                if (!prev || prev.id !== data.id) return prev;
                if (prev.messages.length !== data.messages.length) {
                  const seen = new Set<string>();
                  const deduped = data.messages.filter((m: any) => {
                    if (seen.has(m.id)) return false;
                    seen.add(m.id);
                    return true;
                  });
                  return { ...prev, ...data, messages: deduped };
                }
                return prev;
              });
            }
          })
          .catch(() => {});
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      socket.emit('leave_ticket', { ticketId: selectedTicketId });
      socket.off('new_message', handleIncomingMessage);
      socket.off('new_internal_note', handleIncomingMessage);
      socket.off('ticket_status_updated', handleStatusUpdated);
    };
  }, [selectedTicketId]);

  useEffect(() => {
    scrollToBottom();
  }, [ticketDetails?.messages]);

  // Tab counts
  const escalatedList = tickets.filter((t) => t.status === 'escalated');
  const resolvedList = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed');
  const allStudentList = tickets;

  // Filter based on active tab
  let currentTabList: AdminTicketSummary[] = [];
  if (activeTab === 'escalated') currentTabList = escalatedList;
  else if (activeTab === 'resolved') currentTabList = resolvedList;
  else currentTabList = allStudentList;

  const uniqueCounsellors = Array.from(
    new Set(tickets.map((t) => t.counsellor?.name).filter(Boolean) as string[])
  ).sort();

  const uniqueStudents = Array.from(
    new Set(tickets.map((t) => t.student.name))
  ).sort();

  // Search & priority, counsellor, student filtering
  const filteredList = currentTabList.filter((q) => {
    const qSearch = search.trim().toLowerCase();
    const matchesSearch = 
      !qSearch ||
      q.ticketNumber.toLowerCase().includes(qSearch) ||
      q.title.toLowerCase().includes(qSearch) ||
      q.student.name.toLowerCase().includes(qSearch) ||
      q.student.email.toLowerCase().includes(qSearch) ||
      (q.counsellor?.name.toLowerCase().includes(qSearch) ?? false);

    const matchesPriority = priorityFilter === 'all' || q.priority === priorityFilter;

    const matchesCounsellor =
      counsellorFilter === 'all' ||
      (counsellorFilter === 'unassigned'
        ? !q.counsellor
        : q.counsellor?.name === counsellorFilter);

    const matchesStudent =
      studentFilter === 'all' || q.student.name === studentFilter;

    return matchesSearch && matchesPriority && matchesCounsellor && matchesStudent;
  });

  // Switch tab and auto-select top ticket
  const handleTabChange = (tab: 'escalated' | 'all' | 'resolved') => {
    setActiveTab(tab);
    let listForTab = allStudentList;
    if (tab === 'escalated') listForTab = escalatedList;
    else if (tab === 'resolved') listForTab = resolvedList;

    if (listForTab.length > 0) {
      setSelectedTicketId(listForTab[0].id);
    }
  };

  // 3. Send message action (only allowed if status === 'escalated')
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyText.trim() || !ticketDetails?.canChat) return;

    try {
      setIsSending(true);
      const res = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: replyText.trim(),
          isInternalNote,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to post message');
      }

      const newMsg = await res.json();
      setTicketDetails((prev) => {
        if (!prev) return null;
        if (prev.messages.some((m) => m.id === newMsg.id)) return prev;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: newMsg.id,
              senderId: 'me',
              senderName: 'You (Admin)',
              senderRole: 'admin',
              isInternalNote,
              content: newMsg.content || replyText.trim(),
              isMe: true,
              createdAt: newMsg.createdAt || new Date().toISOString(),
            },
          ],
        };
      });

      setReplyText('');
      setIsInternalNote(false);
    } catch (err: any) {
      alert(err.message || 'Error sending message');
    } finally {
      setIsSending(false);
    }
  };

  // 4. Escalate to Admin action
  const handleEscalateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !escalateReason.trim()) return;

    try {
      setIsEscalating(true);
      const res = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          reason: escalateReason,
          adminNotes: escalateAdminNotes.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to escalate inquiry');
      }

      setShowEscalateModal(false);
      setEscalateAdminNotes('');
      await fetchTickets();

      // Refresh current details
      const detailRes = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}`, {
        credentials: 'include',
      });
      if (detailRes.ok) {
        const updated = await detailRes.json();
        setTicketDetails(updated);
      }
    } catch (err: any) {
      alert(err.message || 'Error escalating inquiry');
    } finally {
      setIsEscalating(false);
    }
  };

  // 5. Resolve query action
  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !resolutionSummary.trim()) return;

    try {
      setIsResolving(true);
      const res = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: 'resolved',
          resolutionSummary: resolutionSummary.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to resolve inquiry');
      }

      setShowResolveModal(false);
      setResolutionSummary('');
      await fetchTickets();

      // Refresh current details
      const detailRes = await fetch(`${API_URL}/help/admin/queries/${selectedTicketId}`, {
        credentials: 'include',
      });
      if (detailRes.ok) {
        const updated = await detailRes.json();
        setTicketDetails(updated);
      }
    } catch (err: any) {
      alert(err.message || 'Error resolving inquiry');
    } finally {
      setIsResolving(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-800 uppercase">Urgent</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 uppercase">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 uppercase">Low</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-germany-red bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red" />
            Escalated to Admin
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        );
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      default:
        return <span className="text-xs text-gray-500 font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black">
              Admin Help & Support Command
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-red/10 border border-germany-red/30 rounded-full font-bold text-germany-red text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>Operations Desk</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Review escalated inquiries requiring admin intervention, inspect all student queries across counsellors, and track resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchTickets}
            title="Refresh Inquiries"
            className="px-3 py-2 text-gray-600 hover:text-germany-black rounded-xl hover:bg-gray-100 border border-gray-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-gray-100/80 rounded-xl w-fit border border-gray-200/60">
        <button
          onClick={() => handleTabChange('escalated')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'escalated'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Escalated to Admin</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
            activeTab === 'escalated' ? 'bg-white/20 text-white' : 'bg-red-100 text-germany-red'
          }`}>
            {escalatedList.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Student Inquiries</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {allStudentList.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('resolved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'resolved'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Resolved / Closed</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            activeTab === 'resolved' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {resolvedList.length}
          </span>
        </button>
      </div>

      {/* Split Pane: List on Left (5 cols), Details on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <AdminTicketList
          search={search}
          setSearch={setSearch}
          counsellorFilter={counsellorFilter}
          setCounsellorFilter={setCounsellorFilter}
          studentFilter={studentFilter}
          setStudentFilter={setStudentFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          uniqueCounsellors={uniqueCounsellors}
          uniqueStudents={uniqueStudents}
          filteredList={filteredList}
          isLoadingList={isLoadingList}
          activeTab={activeTab}
          selectedTicketId={selectedTicketId}
          onSelectTicket={(id) => setSelectedTicketId(id)}
          getPriorityBadge={getPriorityBadge}
          getStatusBadge={getStatusBadge}
        />

        <AdminTicketThread
          isLoadingDetails={isLoadingDetails}
          ticketDetails={ticketDetails}
          onCloseChat={() => {
            setSelectedTicketId(null);
            setTicketDetails(null);
          }}
          onOpenResolveModal={() => setShowResolveModal(true)}
          onOpenEscalateModal={() => setShowEscalateModal(true)}
          getPriorityBadge={getPriorityBadge}
          getStatusBadge={getStatusBadge}
          replyText={replyText}
          setReplyText={setReplyText}
          isInternalNote={isInternalNote}
          setIsInternalNote={setIsInternalNote}
          isSending={isSending}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
        />
      </div>

      <AdminEscalateModal
        isOpen={showEscalateModal}
        onClose={() => setShowEscalateModal(false)}
        escalateReason={escalateReason}
        setEscalateReason={setEscalateReason}
        escalateAdminNotes={escalateAdminNotes}
        setEscalateAdminNotes={setEscalateAdminNotes}
        isEscalating={isEscalating}
        onSubmit={handleEscalateSubmit}
      />

      <AdminResolveModal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        resolutionSummary={resolutionSummary}
        setResolutionSummary={setResolutionSummary}
        isResolving={isResolving}
        onSubmit={handleResolveSubmit}
      />
    </div>
  );
}
