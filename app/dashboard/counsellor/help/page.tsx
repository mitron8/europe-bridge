"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight, 
  Send, 
  Lock, 
  AlertTriangle, 
  X, 
  Clock, 
  MessageSquare, 
  User,
  RotateCw,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { useLazySlice } from '@/hooks/useLazySlice';
import { getChatSocket } from '@/lib/socket';
import { formatChatTimestamp, formatFullTimestamp, formatDateDivider, isDifferentDay } from '@/lib/chatUtils';

import { CounsellorResolveModal, CounsellorEscalateModal } from '@/components/help/CounsellorModals';
import { CounsellorTicketThread } from '@/components/help/CounsellorTicketThread';
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

const ESCALATION_REASONS = [
  'APS Certificate & Name Mismatch clearance with liaison',
  'University eligibility waiver / special partnership case',
  'Urgent Embassy Visa slot escalation',
  'Fee waiver or blocked account funding exception',
  'Technical portal bug / profile verification hold',
  'Official Institutional verification letter needed from Admin',
  'Other Administrative Intervention Required'
];

interface CounsellorTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  totalMessages: number;
  internalNotesCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  isInternalNote: boolean;
  content: string;
  isMe: boolean;
  createdAt: string;
}

interface CounsellorTicketDetail {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  escalatedTo?: string | null;
  escalationReason?: string | null;
  resolutionSummary?: string | null;
  isTextable: boolean;
  student: {
    id: string;
    name: string;
    email: string;
  };
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export default function CounsellorHelpPage() {
  const [tickets, setTickets] = useState<CounsellorTicketSummary[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketDetail, setTicketDetail] = useState<CounsellorTicketDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_progress' | 'escalated' | 'resolved'>('all');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState<'mine' | 'all'>('mine');

  // Reply state (Instagram DM style)
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);

  // Separate Internal Staff Note text box
  const [internalNoteText, setInternalNoteText] = useState('');
  const [isSendingNote, setIsSendingNote] = useState<boolean>(false);
  const [activeInputTab, setActiveInputTab] = useState<'reply' | 'internal_note'>('reply');

  // Modals
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolutionText, setResolutionText] = useState('');
  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [escalationReason, setEscalationReason] = useState(ESCALATION_REASONS[0]);
  const [escalationNotes, setEscalationNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch tickets for counsellor portal (optionally all team queries)
  const fetchCounsellorTickets = async (scope = scopeFilter) => {
    try {
      setLoadingTickets(true);
      const url = scope === 'all'
        ? `${API_URL}/help/counsellor/queries?scope=all`
        : `${API_URL}/help/counsellor/queries`;

      const res = await fetch(url, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load counsellor tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchCounsellorTickets(scopeFilter);

    const socket = getChatSocket();
    const handleTicketListUpdated = () => {
      fetchCounsellorTickets(scopeFilter);
    };
    socket.on('ticket_list_updated', handleTicketListUpdated);
    return () => {
      socket.off('ticket_list_updated', handleTicketListUpdated);
    };
  }, [scopeFilter]);

  // Fetch ticket details & messages
  const fetchTicketDetails = async (id: string) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(`${API_URL}/help/counsellor/queries/${id}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setTicketDetail(data);
      }
    } catch (err) {
      console.error('Failed to load ticket details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (!selectedTicketId) {
      setTicketDetail(null);
      return;
    }

    fetchTicketDetails(selectedTicketId);

    const socket = getChatSocket();
    socket.emit('join_ticket', { ticketId: selectedTicketId });

    const handleIncomingMessage = (msg: any) => {
      if (msg && msg.ticketId === selectedTicketId) {
        setTicketDetail((prev) => {
          if (!prev) return prev;
          if (prev.messages.some((m) => m.id === msg.id)) return prev;
          const isMe = msg.senderRole === 'counsellor';
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: msg.id,
                senderId: msg.senderUserId || (isMe ? 'me' : 'student'),
                senderName: isMe ? 'You (Counsellor)' : msg.senderName || prev.student?.name || 'Student',
                senderRole: msg.senderRole,
                isInternalNote: Boolean(msg.isInternalNote || msg.isInternal),
                content: msg.content,
                isMe,
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
        setTicketDetail((prev) =>
          prev
            ? {
                ...prev,
                status: data.status,
                isTextable: data.isTextable,
              }
            : prev,
        );
        fetchCounsellorTickets(scopeFilter);
      }
    };

    socket.on('new_message', handleIncomingMessage);
    socket.on('new_internal_note', handleIncomingMessage);
    socket.on('ticket_status_updated', handleStatusUpdated);

    // Silent background poll to guarantee zero dropped messages
    const pollInterval = setInterval(() => {
      if (selectedTicketId) {
        fetch(`${API_URL}/help/counsellor/queries/${selectedTicketId}`, { credentials: 'include' })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data && data.messages) {
              setTicketDetail((prev) => {
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
      clearInterval(pollInterval);
      socket.emit('leave_ticket', { ticketId: selectedTicketId });
      socket.off('new_message', handleIncomingMessage);
      socket.off('new_internal_note', handleIncomingMessage);
      socket.off('ticket_status_updated', handleStatusUpdated);
    };
  }, [selectedTicketId]);

  useEffect(() => {
    if (ticketDetail) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ticketDetail?.messages]);

  // Send regular reply to student
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;

    setIsSendingReply(true);
    try {
      const res = await fetch(`${API_URL}/help/counsellor/queries/${selectedTicketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: replyText.trim(),
          isInternalNote: false,
        }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setReplyText('');
        setTicketDetail((prev) => {
          if (!prev) return null;
          if (prev.messages.some((m) => m.id === newMsg.id)) return prev;
          return {
            ...prev,
            status: prev.status === 'open' ? 'in_progress' : prev.status,
            messages: [
              ...prev.messages,
              {
                id: newMsg.id,
                senderId: 'me',
                senderName: 'You (Counsellor)',
                senderRole: 'counsellor',
                isInternalNote: false,
                content: newMsg.content || replyText.trim(),
                isMe: true,
                createdAt: newMsg.createdAt || new Date().toISOString(),
              },
            ],
          };
        });
        fetchCounsellorTickets();
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setIsSendingReply(false);
    }
  };

  // Send separate internal staff note
  const handleSendInternalNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteText.trim() || !selectedTicketId) return;

    setIsSendingNote(true);
    try {
      const res = await fetch(`${API_URL}/help/counsellor/queries/${selectedTicketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: internalNoteText.trim(),
          isInternalNote: true,
        }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setInternalNoteText('');
        setTicketDetail((prev) => {
          if (!prev) return null;
          if (prev.messages.some((m) => m.id === newMsg.id)) return prev;
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: newMsg.id,
                senderId: 'me',
                senderName: 'You (Staff Note)',
                senderRole: 'counsellor',
                isInternalNote: true,
                content: newMsg.content || internalNoteText.trim(),
                isMe: true,
                createdAt: newMsg.createdAt || new Date().toISOString(),
              },
            ],
          };
        });
        fetchCounsellorTickets();
      }
    } catch (err) {
      console.error('Failed to send internal note:', err);
    } finally {
      setIsSendingNote(false);
    }
  };

  // Resolve query
  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/help/counsellor/queries/${selectedTicketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: 'resolved',
          resolutionSummary: resolutionText.trim() || 'Resolved by assigned counsellor',
        }),
      });

      if (res.ok) {
        setShowResolveForm(false);
        setResolutionText('');
        fetchTicketDetails(selectedTicketId);
        fetchCounsellorTickets();
      }
    } catch (err) {
      console.error('Failed to resolve ticket:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Escalate to admin
  const handleEscalate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/help/counsellor/queries/${selectedTicketId}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          reason: escalationReason,
          adminNotes: escalationNotes.trim() || undefined,
        }),
      });

      if (res.ok) {
        setShowEscalateForm(false);
        setEscalationNotes('');
        fetchTicketDetails(selectedTicketId);
        fetchCounsellorTickets();
      }
    } catch (err) {
      console.error('Failed to escalate ticket:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            In Review
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-germany-red border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red animate-pulse" />
            Escalated
          </span>
        );
      case 'resolved':
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Resolved
          </span>
        );
      default:
        return <span className="text-xs text-gray-500 font-semibold uppercase">{status}</span>;
    }
  };

  const uniqueStudents = Array.from(new Set(tickets.map((t) => t.student.name))).sort();

  const filteredTickets = tickets.filter((t) => {
    const matchesTab = activeTab === 'all' || t.status === activeTab;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.student.name.toLowerCase().includes(search.toLowerCase()) ||
      t.student.email.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesStudent = studentFilter === 'all' || t.student.name === studentFilter;
    return matchesTab && matchesSearch && matchesPriority && matchesStudent;
  });

  const { visibleItems: visibleTickets, hasMore: hasMoreTickets, bottomSentinelRef: ticketSentinelRef } = useLazySlice(
    filteredTickets,
    25,
    15,
    [activeTab, search, priorityFilter, studentFilter],
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black dark:text-white">
              Student Inquiries & Helpdesk
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
              Live queries assigned exclusively to your student portfolio. Chats are encrypted and tamper-checked in the database.
            </p>
          </div>

          <button
            onClick={() => fetchCounsellorTickets()}
            className="flex items-center gap-2 px-3.5 py-2 bg-gray-100 dark:bg-[#151B27] hover:bg-gray-200/70 dark:hover:bg-[#1E2638] text-gray-700 dark:text-gray-300 dark:border dark:border-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Interface (Side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assigned Tickets List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200 overflow-x-auto text-xs font-bold">
            {(['all', 'open', 'in_progress', 'escalated', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-germany-black shadow-2xs'
                    : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search bar & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, ticket #, or topic..."
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm text-germany-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium focus:outline-none focus:border-germany-red shadow-2xs"
              />
            </div>

            {/* Counsellor Scope & Student Dropdowns */}
            <div className="grid grid-cols-2 gap-2">
              <ClaySelect
                value={scopeFilter}
                onChange={(val) => setScopeFilter(val as 'mine' | 'all')}
                options={[
                  { value: 'mine', label: 'My Inquiries' },
                  { value: 'all', label: 'All Inquiries' },
                ]}
              />

              <ClaySelect
                value={studentFilter}
                onChange={(val) => setStudentFilter(val)}
                options={[
                  { value: 'all', label: 'All Students' },
                  ...uniqueStudents.map((name) => ({
                    value: name,
                    label: name,
                  })),
                ]}
              />
            </div>
          </div>

          {/* Ticket list */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto">
            {loadingTickets ? (
              <div className="p-8 text-center text-sm font-medium text-gray-400 bg-white rounded-2xl border border-gray-100">
                Loading assigned student queries...
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-sm font-medium text-gray-400 bg-white rounded-2xl border border-gray-100">
                No tickets matching this filter.
              </div>
            ) : (
              <>
                {visibleTickets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedTicketId === t.id
                        ? 'bg-white border-germany-red shadow-xs ring-1 ring-germany-red/30'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        {t.ticketNumber}
                      </span>
                      {getStatusBadge(t.status)}
                    </div>

                    <h3 className="text-sm font-bold text-germany-black truncate mb-1">
                      {t.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span className="text-germany-black font-bold truncate">
                        {t.student.name}
                      </span>
                      <span>{formatChatTimestamp(t.updatedAt)}</span>
                    </div>
                  </button>
                ))}
                {hasMoreTickets && (
                  <div ref={ticketSentinelRef} className="py-4 flex justify-center items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation (Instagram DM style) (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col min-h-[580px]">
          <CounsellorTicketThread
            ticketDetail={ticketDetail}
            onCloseChat={() => {
              setSelectedTicketId(null);
              setTicketDetail(null);
            }}
            onOpenEscalate={() => setShowEscalateForm(true)}
            onOpenResolve={() => setShowResolveForm(true)}
            getStatusBadge={getStatusBadge}
            activeInputTab={activeInputTab}
            setActiveInputTab={setActiveInputTab}
            replyText={replyText}
            setReplyText={setReplyText}
            isSendingReply={isSendingReply}
            handleSendReply={handleSendReply}
            internalNoteText={internalNoteText}
            setInternalNoteText={setInternalNoteText}
            isSendingNote={isSendingNote}
            handleSendInternalNote={handleSendInternalNote}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>

      {/* RESOLUTION MODAL */}
      <CounsellorResolveModal
        isOpen={Boolean(showResolveForm && selectedTicketId)}
        onClose={() => setShowResolveForm(false)}
        resolutionText={resolutionText}
        setResolutionText={setResolutionText}
        actionLoading={actionLoading}
        onSubmit={handleResolve}
      />

      {/* ESCALATION MODAL */}
      <CounsellorEscalateModal
        isOpen={Boolean(showEscalateForm && selectedTicketId)}
        onClose={() => setShowEscalateForm(false)}
        escalationReason={escalationReason}
        setEscalationReason={setEscalationReason}
        escalationNotes={escalationNotes}
        setEscalationNotes={setEscalationNotes}
        actionLoading={actionLoading}
        onSubmit={handleEscalate}
      />
    </div>
  );
}
