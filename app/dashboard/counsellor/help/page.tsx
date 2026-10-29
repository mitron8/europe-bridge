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
  ShieldAlert
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { getChatSocket } from '@/lib/socket';

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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black">
              Student Inquiries & Helpdesk
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Live queries assigned exclusively to your student portfolio. Chats are encrypted and tamper-checked in the database.
            </p>
          </div>

          <button
            onClick={() => fetchCounsellorTickets()}
            className="flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200/70 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-germany-black font-medium focus:outline-none focus:border-germany-red shadow-2xs"
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
              filteredTickets.map((t) => (
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
                    <span>{new Date(t.updatedAt).toLocaleDateString()}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation (Instagram DM style) (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col min-h-[580px]">
          {ticketDetail ? (
            <>
              {/* Conversation Header */}
              <div className="p-5 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {ticketDetail.ticketNumber}
                    </span>
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {ticketDetail.category}
                    </span>
                    {getStatusBadge(ticketDetail.status)}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-germany-black truncate mt-1">
                    {ticketDetail.title}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Student: <strong className="text-germany-black">{ticketDetail.student.name}</strong> ({ticketDetail.student.email})
                  </p>
                </div>

                {/* Status action buttons & Close */}
                <div className="flex items-center gap-2 shrink-0">
                  {ticketDetail.status !== 'resolved' && (
                    <>
                      <button
                        onClick={() => setShowEscalateForm(true)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-germany-red font-bold text-xs rounded-xl border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Escalate</span>
                      </button>

                      <button
                        onClick={() => setShowResolveForm(true)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    </>
                  )}

                  {/* Close Chat Window button */}
                  <button
                    onClick={() => {
                      setSelectedTicketId(null);
                      setTicketDetail(null);
                    }}
                    title="Close Chat Window"
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-xl transition-colors cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Resolution or Escalation Info Banner */}
              {ticketDetail.status === 'escalated' && (
                <div className="p-3.5 bg-red-50 border-b border-red-100 text-xs text-red-900 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-germany-red shrink-0" />
                  <span>
                    <strong>Escalated to Central Admin:</strong> {ticketDetail.escalationReason || 'Under administrative review'}
                  </span>
                </div>
              )}

              {ticketDetail.resolutionSummary && (
                <div className="p-3.5 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Resolution:</strong> {ticketDetail.resolutionSummary}
                  </span>
                </div>
              )}

              {/* Instagram-style Conversation Thread */}
              <div className="p-5 space-y-3.5 bg-[#FAF9F6] flex-1 overflow-y-auto max-h-[420px] flex flex-col">
                {ticketDetail.messages.map((m, idx) => {
                  const isMe = m.isMe; // sent by counsellor
                  const isInternal = m.isInternalNote;
                  const itemKey = m.id ? `${m.id}-${idx}` : `msg-${idx}`;

                  if (isInternal) {
                    // Internal Staff Note: Styled in amber box with lock icon
                    return (
                      <div
                        key={itemKey}
                        className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs leading-relaxed max-w-[90%] self-center my-1.5"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Confidential Staff Note (Not visible to student)</span>
                          <span className="text-amber-500 font-normal">
                            • {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="whitespace-pre-line font-medium">{m.content}</p>
                      </div>
                    );
                  }

                  // Normal chat messages (Instagram layout)
                  return (
                    <div
                      key={itemKey}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                        isMe ? 'self-end' : 'self-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium px-1 mb-1">
                        <span className="font-semibold text-gray-700">
                          {isMe ? 'You (Counsellor)' : ticketDetail.student.name}
                        </span>
                        <span>•</span>
                        <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                          isMe
                            ? 'bg-blue-600 text-white font-medium rounded-tr-xs'
                            : 'bg-white border border-gray-200 text-gray-900 font-medium rounded-tl-xs'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Section with Separate Staff Note Box */}
              {ticketDetail.isTextable ? (
                <div className="border-t border-gray-200 bg-white p-4 space-y-3">
                  {/* Toggle between Reply to Student vs Internal Note */}
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveInputTab('reply')}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeInputTab === 'reply'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply to Student</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveInputTab('internal_note')}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeInputTab === 'internal_note'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Separate Internal Staff Note</span>
                    </button>
                  </div>

                  {activeInputTab === 'reply' ? (
                    <form onSubmit={handleSendReply} className="flex items-center gap-2.5">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${ticketDetail.student.name}...`}
                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-germany-black placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-all font-medium"
                      />
                      <button
                        type="submit"
                        disabled={!replyText.trim() || isSendingReply}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors cursor-pointer shrink-0 shadow-xs flex items-center justify-center"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    /* Dedicated Internal Staff Note Text Box */
                    <form onSubmit={handleSendInternalNote} className="space-y-2.5">
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4 shrink-0 text-amber-700" />
                        <span>This note will ONLY be visible to staff and central admins. The student will NEVER see this.</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="text"
                          value={internalNoteText}
                          onChange={(e) => setInternalNoteText(e.target.value)}
                          placeholder="Type internal staff note (e.g. checked marksheet with CBSE board, approved)..."
                          className="flex-1 px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-full text-sm text-amber-950 placeholder-amber-700/60 focus:bg-white focus:outline-none focus:border-amber-500 transition-all font-medium"
                        />
                        <button
                          type="submit"
                          disabled={!internalNoteText.trim() || isSendingNote}
                          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white text-xs font-bold rounded-full transition-colors cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-gray-500">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>This inquiry is resolved and closed for new replies.</span>
                </div>
              )}
            </>
          ) : (
            <div className="p-16 text-center text-sm font-medium text-gray-400 m-auto flex flex-col items-center gap-2">
              <MessageSquare className="w-10 h-10 text-gray-300 mb-1" />
              <p className="font-bold text-gray-700">No Inquiry Selected</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Select a student query from the list on the left to view the conversation and reply.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RESOLUTION MODAL */}
      {showResolveForm && selectedTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-germany-black">Mark Query as Resolved</h3>
              <button
                onClick={() => setShowResolveForm(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Closing this query will notify the student and mark the chat as resolved and read-only.
            </p>

            <form onSubmit={handleResolve} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Resolution Summary for Student
                </label>
                <textarea
                  rows={3}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="e.g. Verified marksheet with APS guidelines; affidavit issued."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResolveForm(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Confirm Resolution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ESCALATION MODAL */}
      {showEscalateForm && selectedTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-germany-red font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Escalate Query to Admin</span>
              </div>
              <button
                onClick={() => setShowEscalateForm(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              This ticket will be flagged for central operations administration review.
            </p>

            <form onSubmit={handleEscalate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Escalation Reason
                </label>
                <ClaySelect
                  value={escalationReason}
                  onChange={(val) => setEscalationReason(val)}
                  options={ESCALATION_REASONS.map((r) => ({ value: r, label: r }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Confidential Staff Note for Admin (Optional)
                </label>
                <textarea
                  rows={3}
                  value={escalationNotes}
                  onChange={(e) => setEscalationNotes(e.target.value)}
                  placeholder="Explain why admin action is needed..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEscalateForm(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-germany-red hover:bg-[#D62839] rounded-xl cursor-pointer"
                >
                  {actionLoading ? 'Escalating...' : 'Submit Escalation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
