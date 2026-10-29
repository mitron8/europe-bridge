"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  RotateCw, 
  ArrowUpRight, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Send,
  Lock,
  ChevronRight,
  User,
  Headphones,
  FileText,
  Filter,
  Layers,
  X,
  AlertCircle,
  Clock,
  Check
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

interface AdminTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  escalatedTo: string | null;
  escalationReason: string | null;
  escalatedAt: string | null;
  resolvedAt: string | null;
  resolutionSummary: string | null;
  student: {
    id: string;
    name: string;
    email: string;
  };
  counsellor: {
    id: string;
    name: string;
    email: string;
  } | null;
  totalMessages: number;
  internalNotesCount: number;
  createdAt: string;
  updatedAt: string;
}

interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  isInternalNote: boolean;
  content: string;
  isMe: boolean;
  createdAt: string;
}

interface AdminTicketDetails extends AdminTicketSummary {
  isEscalated: boolean;
  canChat: boolean;
  isTextable: boolean;
  messages: MessageItem[];
}

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
        {/* Left Side: Filterable Inquiry List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col h-[760px] overflow-hidden">
          {/* Search, Counsellor, Student & Priority Controls */}
          <div className="p-4 border-b border-gray-100 space-y-2.5 bg-gray-50/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Ticket # (e.g. EB-...), Student, or Title..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red transition-colors"
              />
            </div>

            {/* Counsellor-wise & Student-wise Dropdowns */}
            <div className="grid grid-cols-2 gap-2">
              <ClaySelect
                value={counsellorFilter}
                onChange={(val) => setCounsellorFilter(val)}
                options={[
                  { value: 'all', label: 'All Counsellors' },
                  { value: 'unassigned', label: 'Unassigned' },
                  ...uniqueCounsellors.map((c) => ({ value: c, label: c })),
                ]}
              />

              <ClaySelect
                value={studentFilter}
                onChange={(val) => setStudentFilter(val)}
                options={[
                  { value: 'all', label: 'All Students' },
                  ...uniqueStudents.map((s) => ({ value: s, label: s })),
                ]}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                <Filter className="w-3.5 h-3.5" />
                <span>Priority:</span>
              </div>
              <div className="w-36">
                <ClaySelect
                  value={priorityFilter}
                  onChange={(val) => setPriorityFilter(val)}
                  options={[
                    { value: 'all', label: 'All Priorities' },
                    { value: 'urgent', label: 'Urgent' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Inquiry List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {isLoadingList ? (
              <div className="p-8 text-center text-xs text-gray-400">Loading inquiries...</div>
            ) : filteredList.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400 space-y-2">
                <p className="font-bold text-gray-600">No inquiries found</p>
                <p className="text-[11px]">
                  {search
                    ? `No query matches "${search}". Check ticket number format.`
                    : activeTab === 'escalated'
                    ? 'No queries currently escalated to admin. All operational queries are handled by counsellors.'
                    : 'No queries in this category.'}
                </p>
              </div>
            ) : (
              filteredList.map((ticket) => {
                const isSelected = ticket.id === selectedTicketId;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-4 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#FDFBF7] border-l-4 border-l-germany-red'
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
                        {ticket.ticketNumber}
                      </span>
                      {getPriorityBadge(ticket.priority)}
                    </div>

                    <div className="font-bold text-xs text-germany-black line-clamp-1 mb-1">
                      {ticket.title}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                      <span>Student: <strong className="text-gray-700">{ticket.student.name}</strong></span>
                      {getStatusBadge(ticket.status)}
                    </div>

                    {ticket.counsellor && (
                      <div className="text-[10px] text-gray-400 mt-1">
                        Counsellor: <span className="font-bold text-gray-600">{ticket.counsellor.name}</span>
                      </div>
                    )}

                    {ticket.escalationReason && ticket.status === 'escalated' && (
                      <div className="mt-2 p-1.5 bg-red-50/80 border border-red-200/80 rounded-lg text-[10px] text-germany-red font-medium line-clamp-1">
                        ⚡ {ticket.escalationReason}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Conversation Thread & Actions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col h-[760px] overflow-hidden">
          {isLoadingDetails ? (
            <div className="flex-1 flex items-center justify-center text-xs text-gray-400">
              Loading inquiry thread...
            </div>
          ) : !ticketDetails ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <MessageSquare className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-xs font-bold text-gray-600">No Inquiry Selected</p>
              <p className="text-[11px] text-gray-400 mt-1 max-w-xs">
                Select a support ticket from the list on the left to inspect conversation history and take administrative action.
              </p>
            </div>
          ) : (
            <>
              {/* Ticket Top Info Bar */}
              <div className="p-4 border-b border-gray-100 bg-[#FDFBF7] space-y-2 shrink-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-white px-2.5 py-1 rounded-md border border-gray-300 text-gray-900 shadow-2xs">
                      {ticketDetails.ticketNumber}
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {ticketDetails.category}
                    </span>
                    {getPriorityBadge(ticketDetails.priority)}
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(ticketDetails.status)}
                    
                    {/* If ticket is escalated, show Resolve button */}
                    {ticketDetails.status === 'escalated' && (
                      <button
                        onClick={() => setShowResolveModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    )}

                    {/* If ticket is in all queries and not yet escalated, admin can escalate it */}
                    {ticketDetails.status !== 'escalated' && ticketDetails.status !== 'resolved' && ticketDetails.status !== 'closed' && (
                      <button
                        onClick={() => setShowEscalateModal(true)}
                        className="bg-germany-red hover:bg-[#D62839] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Escalate to Admin</span>
                      </button>
                    )}

                    {/* Close Chat Window Button */}
                    <button
                      onClick={() => {
                        setSelectedTicketId(null);
                        setTicketDetails(null);
                      }}
                      title="Close Chat Window"
                      className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-lg transition-colors cursor-pointer ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-bold text-germany-black">{ticketDetails.title}</h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 font-medium">
                  <span>Student: <strong className="text-gray-800">{ticketDetails.student.name}</strong> ({ticketDetails.student.email})</span>
                  <span>Counsellor: <strong className="text-gray-800">{ticketDetails.counsellor?.name || 'Unassigned'}</strong></span>
                </div>

                {/* Escalation alert banner */}
                {ticketDetails.status === 'escalated' && ticketDetails.escalationReason && (
                  <div className="bg-red-50 border border-red-200 text-germany-red p-2.5 rounded-xl text-xs space-y-1 mt-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-germany-red" />
                      <span>Escalated to Central Admin</span>
                    </div>
                    <p className="text-[11px] text-red-900 font-medium pl-5.5">
                      <strong>Reason:</strong> {ticketDetails.escalationReason}
                    </p>
                  </div>
                )}

                {/* Resolution Summary banner */}
                {(ticketDetails.status === 'resolved' || ticketDetails.status === 'closed') && ticketDetails.resolutionSummary && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2.5 rounded-xl text-xs space-y-1 mt-2">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Resolution Summary</span>
                    </div>
                    <p className="text-[11px] font-medium pl-5.5">
                      {ticketDetails.resolutionSummary}
                    </p>
                  </div>
                )}
              </div>

              {/* Instagram-Style Conversation Messages Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
                {ticketDetails.messages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-400">
                    No messages recorded in this inquiry yet.
                  </div>
                ) : (
                  ticketDetails.messages.map((msg, idx) => {
                    const itemKey = msg.id ? `${msg.id}-${idx}` : `msg-${idx}`;

                    // Confidential Staff Note
                    if (msg.isInternalNote) {
                      return (
                        <div
                          key={itemKey}
                          className="mx-auto max-w-md bg-amber-50/90 border border-amber-300 text-amber-900 rounded-xl p-3 shadow-2xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                            <span className="flex items-center gap-1">
                              <Lock className="w-3 h-3 text-amber-700" />
                              <span>CONFIDENTIAL STAFF NOTE</span>
                            </span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-xs font-medium text-amber-950 whitespace-pre-wrap">{msg.content}</p>
                          <div className="text-[10px] text-amber-700 font-medium">By: {msg.senderName} ({msg.senderRole})</div>
                        </div>
                      );
                    }

                    // Instagram DM chat layout: Admin on right, Student/Counsellor on left
                    const isAdmin = msg.senderRole === 'admin' || msg.senderRole === 'superadmin';

                    return (
                      <div
                        key={itemKey}
                        className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] font-bold text-gray-400 mb-0.5 px-1">
                          {isAdmin ? 'You (Admin)' : `${msg.senderName} (${msg.senderRole})`}
                        </span>

                        <div
                          className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-2xs whitespace-pre-wrap ${
                            isAdmin
                              ? 'bg-slate-900 text-white rounded-br-xs'
                              : msg.senderRole === 'counsellor'
                              ? 'bg-red-50 text-germany-black border border-red-100 rounded-bl-xs'
                              : 'bg-white text-gray-900 border border-gray-200/80 rounded-bl-xs'
                          }`}
                        >
                          {msg.content}
                        </div>

                        <span className="text-[9px] text-gray-400 mt-0.5 px-1 font-mono">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input or Scope Lock Notice */}
              <div className="p-4 border-t border-gray-200/80 bg-white shrink-0">
                {ticketDetails.status === 'resolved' || ticketDetails.status === 'closed' ? (
                  <div className="p-3 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl text-xs text-center font-medium">
                    🔒 This ticket is resolved and closed for new messages (read-only).
                  </div>
                ) : !ticketDetails.canChat ? (
                  // Requirement 1: In All Student Inquiries, admin can open/view, but CANNOT chat until escalated to admin!
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <div className="text-xs font-bold text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Counsellor Desk Scope (View-Only Mode)</span>
                      </div>
                      <p className="text-[11px] text-amber-800 font-medium">
                        Admins can observe inquiry progress. Chat messaging is locked until this ticket is escalated to Admin.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowEscalateModal(true)}
                      className="bg-germany-red hover:bg-[#D62839] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Escalate to Admin</span>
                    </button>
                  </div>
                ) : (
                  // Requirement 2: Once escalated, Admin CAN chat!
                  <form onSubmit={handleSendMessage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isInternalNote}
                          onChange={(e) => setIsInternalNote(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>Internal Staff Note (Never visible to student)</span>
                        </span>
                      </label>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {isInternalNote ? 'Confidential Staff Audit' : 'Message to Student & Counsellor'}
                      </span>
                    </div>

                    <div className="flex items-end gap-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={
                          isInternalNote
                            ? "Add confidential administrative note..."
                            : "Write official admin response..."
                        }
                        rows={2}
                        className={`flex-1 p-2.5 border rounded-xl text-xs font-medium focus:outline-none transition-colors resize-none ${
                          isInternalNote
                            ? 'bg-amber-50/50 border-amber-300 focus:border-amber-500'
                            : 'bg-white border-gray-200 focus:border-germany-red'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={!replyText.trim() || isSending}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          isInternalNote ? 'bg-amber-700 hover:bg-amber-800' : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 text-germany-red rounded-xl">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-germany-black">Escalate Query to Admin</h3>
                  <p className="text-[11px] text-gray-500">Enable admin intervention and open direct admin chat</p>
                </div>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEscalateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Escalation Reason *
                </label>
                <select
                  value={escalateReason}
                  onChange={(e) => setEscalateReason(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red"
                >
                  {ESCALATION_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Administrative Note (Optional)
                </label>
                <textarea
                  value={escalateAdminNotes}
                  onChange={(e) => setEscalateAdminNotes(e.target.value)}
                  placeholder="Provide context or instructions for administrative handling..."
                  rows={3}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEscalateModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEscalating}
                  className="px-4 py-2 bg-germany-red hover:bg-[#D62839] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isEscalating ? 'Escalating...' : 'Confirm Escalation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resolve Query Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-germany-black">Mark Query as Resolved</h3>
                  <p className="text-[11px] text-gray-500">Provide official closure summary for the audit trail</p>
                </div>
              </div>
              <button
                onClick={() => setShowResolveModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Resolution Summary *
                </label>
                <textarea
                  value={resolutionSummary}
                  onChange={(e) => setResolutionSummary(e.target.value)}
                  placeholder="Detail the actions taken, approvals granted, or guidance provided to resolve this inquiry..."
                  rows={4}
                  required
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!resolutionSummary.trim() || isResolving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResolving ? 'Resolving...' : 'Confirm Resolution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
