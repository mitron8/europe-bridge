"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Calendar,
  Send, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  Clock,
  RotateCw,
  User,
  ShieldAlert,
  Lock
} from 'lucide-react';
import { MeetingBookingModal } from '@/components/MeetingBookingModal';
import { ClaySelect } from '@/components/ClaySelect';
import { StudentAskForm } from '@/components/help/StudentAskForm';
import { getChatSocket } from '@/lib/socket';
import { formatChatTimestamp, formatFullTimestamp, formatDateDivider, isDifferentDay } from '@/lib/chatUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

const CATEGORIES = [
  'Admissions',
  'APS Certificate',
  'Visa & Blocked Account',
  'University Shortlist',
  'Documents & Translation',
  'Technical Issue',
  'General Inquiry',
];

interface TicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  counsellor: { name: string; email: string } | null;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  isMe: boolean;
  createdAt: string;
}

interface TicketDetail extends TicketSummary {
  resolutionSummary?: string | null;
  isTextable: boolean;
  messages: ChatMessage[];
}

export default function StudentHelpPage() {
  const [activeTab, setActiveTab] = useState<'my_queries' | 'ask_counsellor'>('my_queries');

  // Queries list state
  const [tickets, setTickets] = useState<TicketSummary[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // Search & filter
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Ask Counsellor form state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<string>('APS Certificate');
  const [priority, setPriority] = useState<string>('medium');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch tickets list from backend
  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const res = await fetch(`${API_URL}/help/student/queries`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();

    const socket = getChatSocket();
    const handleTicketListUpdated = () => {
      fetchTickets();
    };
    socket.on('ticket_list_updated', handleTicketListUpdated);
    return () => {
      socket.off('ticket_list_updated', handleTicketListUpdated);
    };
  }, []);

  // Fetch ticket details & messages when selected
  const fetchTicketDetails = async (id: string) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(`${API_URL}/help/student/queries/${id}`, {
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

    const handleNewMessage = (msg: any) => {
      if (msg && msg.ticketId === selectedTicketId) {
        setTicketDetail((prev) => {
          if (!prev) return prev;
          if (prev.messages.some((m) => m.id === msg.id)) return prev;
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: msg.id,
                senderId: msg.senderUserId || 'other',
                senderName: msg.senderRole === 'student' ? 'You' : msg.senderName || 'Counsellor',
                senderRole: msg.senderRole,
                content: msg.content,
                isMe: msg.senderRole === 'student',
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
        fetchTickets();
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('ticket_status_updated', handleStatusUpdated);

    // Silent background poll to guarantee zero dropped messages
    const pollInterval = setInterval(() => {
      if (selectedTicketId) {
        fetch(`${API_URL}/help/student/queries/${selectedTicketId}`, { credentials: 'include' })
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
      socket.off('new_message', handleNewMessage);
      socket.off('ticket_status_updated', handleStatusUpdated);
    };
  }, [selectedTicketId]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (ticketDetail) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ticketDetail?.messages]);

  // Submit new ticket
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch(`${API_URL}/help/student/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: subject.trim(),
          category,
          priority,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to submit ticket');
      }

      const created = await res.json();
      setSubmitSuccess(true);
      setSubject('');
      setMessage('');

      // Refresh list & switch to conversation view
      await fetchTickets();
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedTicketId(created.id);
        setActiveTab('my_queries');
      }, 700);
    } catch (err: any) {
      setFormError(err.message || 'Error connecting to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send message reply in thread
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;

    const content = replyText.trim();
    setIsSendingReply(true);
    try {
      const res = await fetch(`${API_URL}/help/student/queries/${selectedTicketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setReplyText('');
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
                senderName: 'You',
                senderRole: 'student',
                content: newMsg.content,
                isMe: true,
                createdAt: newMsg.createdAt,
              },
            ],
          };
        });
        fetchTickets(); // Update message count in list
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setIsSendingReply(false);
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

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black dark:text-white">
              Help & Support Desk
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Submit inquiries to your assigned counsellor and track real-time resolution updates.
            </p>
          </div>

          <button
              type="button"
              onClick={() => setIsMeetingModalOpen(true)}
              className="neu-btn-primary py-2 px-3.5 text-xs font-black inline-flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Strategy Meeting</span>
            </button>
            <button
              onClick={() => fetchTickets()}
              title="Refresh Queries"
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gray-100 dark:bg-[#0E121A] rounded-xl border border-gray-200 dark:border-gray-800 w-fit">
        <button
          onClick={() => {
            setActiveTab('my_queries');
            setSelectedTicketId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'my_queries'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-700 hover:text-germany-black hover:bg-gray-200/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>My Queries</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'my_queries' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tickets.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('ask_counsellor');
            setSelectedTicketId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'ask_counsellor'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-700 hover:text-germany-black hover:bg-gray-200/60'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Ask Counsellor</span>
        </button>
      </div>

      {/* TAB 1: ASK COUNSELLOR FORM */}
      {activeTab === 'ask_counsellor' && (
        <StudentAskForm
          submitSuccess={submitSuccess}
          formError={formError}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          subject={subject}
          setSubject={setSubject}
          message={message}
          setMessage={setMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateTicket}
        />
      )}

      {/* TAB 2: MY QUERIES (INSTAGRAM-STYLE CHAT & LIST) */}
      {activeTab === 'my_queries' && (
        <div className="space-y-4">
          {selectedTicketId && ticketDetail ? (
            /* Instagram-Style Conversation View */
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 shadow-xs overflow-hidden flex flex-col">
              {/* Back Bar */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedTicketId(null)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-germany-black cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Queries List</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {ticketDetail.ticketNumber}
                  </span>
                  {getStatusBadge(ticketDetail.status)}
                </div>
              </div>

              {/* Title & Advisor Details */}
              <div className="p-5 border-b border-gray-100 bg-white">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {ticketDetail.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-germany-black mt-0.5">
                  {ticketDetail.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium mt-1">
                  <span>
                    Assigned Advisor: <strong className="text-germany-black">{ticketDetail.counsellor?.name || 'Assigned Counsellor'}</strong>
                    {ticketDetail.counsellor?.email && ` (${ticketDetail.counsellor.email})`}
                  </span>
                  {ticketDetail.createdAt && (
                    <>
                      <span>•</span>
                      <span title={formatFullTimestamp(ticketDetail.createdAt)}>
                        Opened: <strong className="text-gray-700">{formatChatTimestamp(ticketDetail.createdAt)}</strong>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Resolution Summary Banner if resolved */}
              {ticketDetail.resolutionSummary && (
                <div className="p-4 bg-emerald-50/80 border-b border-emerald-100 text-xs sm:text-sm text-emerald-900 font-medium">
                  <strong>Resolution:</strong> {ticketDetail.resolutionSummary}
                </div>
              )}

              {/* Instagram-Style Direct Message Thread */}
              <div className="p-5 sm:p-6 space-y-3.5 bg-[#FAF9F6] dark:bg-[#0A0D14] min-h-[300px] max-h-[500px] overflow-y-auto flex flex-col">
                {ticketDetail.messages.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    No messages in this inquiry thread yet.
                  </div>
                ) : (
                  ticketDetail.messages.map((m, idx) => {
                    const isMe = m.isMe;
                    const prevMsg = idx > 0 ? ticketDetail.messages[idx - 1] : null;
                    const showDateDivider = isDifferentDay(prevMsg?.createdAt, m.createdAt);

                    return (
                      <React.Fragment key={m.id ? `${m.id}-${idx}` : `msg-${idx}`}>
                        {showDateDivider && (
                          <div className="flex items-center justify-center my-2">
                            <span className="px-3 py-1 bg-gray-200/80 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-[10px] font-bold tracking-wide shadow-2xs">
                              {formatDateDivider(m.createdAt)}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                            isMe ? 'self-end' : 'self-start'
                          }`}
                        >
                          {/* Sender Label */}
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium px-1 mb-1">
                            <span className="font-semibold text-gray-700">
                              {isMe ? 'You' : m.senderName || 'Counsellor'}
                            </span>
                            <span>•</span>
                            <span
                              title={formatFullTimestamp(m.createdAt)}
                              className="cursor-default"
                            >
                              {formatChatTimestamp(m.createdAt)}
                            </span>
                          </div>

                        {/* Message Bubble (Instagram DM styling) */}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                            isMe
                              ? 'bg-germany-red text-white font-medium rounded-tr-xs'
                              : 'bg-white border border-gray-200 text-gray-900 font-medium rounded-tl-xs'
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                      </React.Fragment>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Area or Resolved Read-only Banner */}
              {ticketDetail.isTextable ? (
                <form
                  onSubmit={handleSendReply}
                  className="p-3 sm:p-4 border-t border-gray-200 bg-white flex items-center gap-2.5"
                >
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to counsellor..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-germany-black placeholder-gray-400 focus:bg-white focus:outline-none focus:border-germany-red transition-all font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSendingReply}
                    className="p-2.5 bg-germany-red hover:bg-[#D62839] disabled:bg-gray-300 text-white rounded-full transition-colors cursor-pointer shrink-0 shadow-xs flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-gray-500">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>This inquiry is resolved and closed for new replies.</span>
                </div>
              )}
            </div>
          ) : (
            /* Queries List View */
            <>
              {/* Filter bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search query title or ticket..."
                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm text-germany-black dark:text-white font-medium focus:outline-none focus:border-germany-red shadow-2xs"
                  />
                </div>

                <div className="w-full sm:w-56">
                  <ClaySelect
                    value={filterCategory}
                    onChange={(val) => setFilterCategory(val)}
                    options={[
                      { value: 'all', label: 'All Categories' },
                      ...CATEGORIES.map((c) => ({ value: c, label: c })),
                    ]}
                  />
                </div>
              </div>

              {/* Tickets List */}
              {loadingTickets ? (
                <div className="p-12 text-center text-sm font-medium text-gray-400">
                  Loading your inquiries...
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200/90 p-12 text-center space-y-3">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto" />
                  <h3 className="text-base font-bold text-germany-black">No queries found</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-sm mx-auto">
                    {search || filterCategory !== 'all'
                      ? 'No queries match your search or filter.'
                      : 'You have not submitted any questions yet. Click "Ask Counsellor" to get personalized guidance.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTickets.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTicketId(t.id)}
                      className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-germany-red/40 hover:shadow-xs transition-all text-left flex items-start justify-between gap-4 group cursor-pointer"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                            {t.ticketNumber}
                          </span>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {t.category}
                          </span>
                          {getStatusBadge(t.status)}
                        </div>

                        <h3 className="text-base font-bold text-germany-black dark:text-white group-hover:text-germany-red transition-colors truncate">
                          {t.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(t.updatedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{t.messageCount} messages</span>
                          {t.counsellor && (
                            <>
                              <span>•</span>
                              <span>Assigned: {t.counsellor.name}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 p-2 text-gray-300 group-hover:text-germany-red transition-colors">
                        <Send className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
