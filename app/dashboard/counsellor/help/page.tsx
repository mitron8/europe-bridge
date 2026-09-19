"use client";

import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  RotateCcw,
  UserCheck,
  Building,
  Headphones,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Lock,
  AlertTriangle,
  X,
  Lightbulb,
  Check,
  Clock,
  MessageSquare,
  FileText,
  User
} from 'lucide-react';
import CreateQueryModal from '@/components/help/CreateQueryModal';
import { ClaySelect } from '@/components/ClaySelect';
import { 
  useHelpStore, 
  SupportQuery, 
  QueryStatus, 
  QuerySender 
} from '@/store/useHelpStore';

const ESCALATION_REASONS = [
  'APS Certificate & Name Mismatch clearance with liaison',
  'University eligibility waiver / special partnership case',
  'Urgent Embassy Visa slot escalation',
  'Fee waiver or blocked account funding exception',
  'Technical portal bug / profile verification hold',
  'Official Institutional verification letter needed from Admin',
  'Other Administrative Intervention Required'
];

const QUICK_GUIDANCE_TEMPLATES = [
  {
    label: '📑 APS Certificate',
    snippet: 'Please verify that your name on all DigiLocker marksheets matches your passport character-by-character. APS verification currently takes 3–4 weeks for Indian bachelor degree holders.'
  },
  {
    label: '💶 Blocked Account (€11,904)',
    snippet: 'The German Federal Foreign Office currently requires €11,904 in a certified blocked account (Sperrkonto via Expatrio, Coracle, or Fintiba). We advise initiating the transfer 3 weeks before your visa appointment.'
  },
  {
    label: '🏛️ Uni-Assist VPD',
    snippet: 'Please upload certified English or German translations of all academic transcripts. Uni-Assist requires 4–6 weeks for evaluation, so submit well ahead of university deadlines.'
  },
  {
    label: '🛂 Visa Appointment Slot',
    snippet: 'Keep your APS certificate, admission letter, and blocked account confirmation ready. VFS appointment wait times can exceed 6 weeks in peak summer months, so register on the waitlist now.'
  },
  {
    label: '🎓 ECTS Credits Check',
    snippet: 'For German public university master degrees, German admissions strictly verify that you have covered sufficient math/theoretical ECTS credits in your undergrad degree according to the Prüfungsordnung.'
  }
];

export default function CounsellorHelpPage() {
  const queries = useHelpStore((s) => s.queries);
  const resetDemoData = useHelpStore((s) => s.resetDemoData);
  const resolveQuery = useHelpStore((s) => s.resolveQuery);
  const escalateToAdmin = useHelpStore((s) => s.escalateToAdmin);
  const updateQueryStatus = useHelpStore((s) => s.updateQueryStatus);
  const addMessageToQuery = useHelpStore((s) => s.addMessageToQuery);

  // Tabs: 'student_queries' | 'escalated' | 'my_admin_queries' | 'resolved'
  const [activeTab, setActiveTab] = useState<'student_queries' | 'escalated' | 'my_admin_queries' | 'resolved'>('student_queries');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Selected ticket for side-by-side active view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>('TICK-102');

  // Checkbox multi-selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals & form states
  const [isCreateAdminQueryOpen, setIsCreateAdminQueryOpen] = useState(false);
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolutionText, setResolutionText] = useState('');
  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [escalationReason, setEscalationReason] = useState(ESCALATION_REASONS[0]);
  const [escalationNotes, setEscalationNotes] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  // Ref for quick focus on reply box
  const replyInputRef = useRef<HTMLTextAreaElement>(null);

  // Categorize queries
  const studentQueries = queries.filter((q) => q.raisedBy.role === 'student' && q.status !== 'resolved');
  const escalatedQueries = queries.filter((q) => q.status === 'escalated_to_admin');
  const counsellorToAdminQueries = queries.filter((q) => q.raisedBy.role === 'counsellor');
  const resolvedQueries = queries.filter((q) => q.status === 'resolved');

  let baseList: SupportQuery[] = [];
  if (activeTab === 'student_queries') baseList = studentQueries;
  else if (activeTab === 'escalated') baseList = escalatedQueries;
  else if (activeTab === 'my_admin_queries') baseList = counsellorToAdminQueries;
  else baseList = resolvedQueries;

  const filteredList = baseList.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.raisedBy.name.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === 'all' || q.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  // Active ticket: find in current filteredList first so tab switching picks a relevant ticket
  const activeTicket = filteredList.find((q) => q.id === selectedTicketId) 
    || queries.find((q) => q.id === selectedTicketId) 
    || (filteredList.length > 0 ? filteredList[0] : null);

  // Handle selecting row
  const handleSelectRow = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowResolveForm(false);
    setShowEscalateForm(false);
    setResolutionText('');
  };

  // Checkbox selection
  const toggleCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredList.length && filteredList.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map((q) => q.id));
    }
  };

  // Bulk actions
  const handleBulkResolve = () => {
    if (selectedIds.length === 0) return;
    const defaultSummary = 'Guidance provided and verified by Counsellor Priya Mehra.';
    selectedIds.forEach((id) => {
      resolveQuery(id, 'Priya Mehra (Counsellor)', 'counsellor', defaultSummary);
    });
    setSelectedIds([]);
  };

  const handleBulkInReview = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach((id) => {
      updateQueryStatus(id, 'in_review_counsellor', 'Priya Mehra (Counsellor)', 'counsellor');
    });
    setSelectedIds([]);
  };

  // Single resolve from detail panel
  const handleSingleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !resolutionText.trim()) return;

    resolveQuery(activeTicket.id, 'Priya Mehra (Counsellor)', 'counsellor', resolutionText.trim());
    setResolutionText('');
    setShowResolveForm(false);
  };

  // Single escalate to admin from detail panel
  const handleSingleEscalate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    escalateToAdmin(
      activeTicket.id,
      'Priya Mehra (Counsellor)',
      escalationReason,
      escalationNotes.trim() || undefined
    );
    setShowEscalateForm(false);
    setEscalationNotes('');
  };

  // Quick action from ticket card
  const handleCardEscalate = (q: SupportQuery, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTicketId(q.id);
    setShowEscalateForm(true);
    setShowResolveForm(false);
  };

  const handleCardResolve = (q: SupportQuery, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTicketId(q.id);
    setShowResolveForm(true);
    setShowEscalateForm(false);
    setResolutionText('Consultation guidance provided and verified with student.');
  };

  const handleCardGuide = (q: SupportQuery, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTicketId(q.id);
    setShowResolveForm(false);
    setShowEscalateForm(false);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 100);
  };

  // Status changer
  const handleStatusChange = (newStatus: QueryStatus) => {
    if (!activeTicket) return;
    updateQueryStatus(activeTicket.id, newStatus, 'Priya Mehra (Counsellor)', 'counsellor');
  };

  // Send reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    const sender: QuerySender = {
      id: 'coun-1',
      name: 'Priya Mehra (Counsellor)',
      email: 'priya.mehra@europebridge.de',
      role: 'counsellor',
    };

    addMessageToQuery(activeTicket.id, replyText.trim(), sender, isInternalNote);
    setReplyText('');
    setIsInternalNote(false);
  };

  // Insert quick template into reply
  const handleInsertTemplate = (snippet: string) => {
    setReplyText((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
    replyInputRef.current?.focus();
  };

  const getStatusBadge = (status: QueryStatus) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Needs Review
          </span>
        );
      case 'in_review_counsellor':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-germany-gold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-gold" />
            In Review
          </span>
        );
      case 'escalated_to_admin':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-germany-red bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
            <ArrowUpRight className="w-3 h-3 text-germany-red" />
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
      default:
        return <span className="text-xs text-gray-500 font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner in EuropeBridge Theme */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        {/* German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black">
              Counsellor Queries & Guidance Hub
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-gold/15 border border-germany-gold/40 rounded-full font-bold text-germany-black text-[10px]">
              <Headphones className="w-3 h-3 text-germany-red" />
              <span>Advisor Console</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Review assigned student questions, reply with admission advice, escalate edge-cases to <span className="text-germany-red font-bold">Admin</span>, or ask administrative queries.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCreateAdminQueryOpen(true)}
            className="bg-germany-red hover:bg-[#C53743] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Ask Admin</span>
          </button>
          <button
            onClick={() => resetDemoData()}
            title="Reset Sample Data"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 border border-gray-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Student Inquiries */}
        <div
          onClick={() => setActiveTab('student_queries')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'student_queries'
              ? 'bg-[#FDFBF7] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.12)] ring-1 ring-germany-red/30'
              : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-500">Student Inquiries</span>
            <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">
            {studentQueries.length}
          </div>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">
            Awaiting counsellor review
          </p>
          {activeTab === 'student_queries' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-germany-red" />
          )}
        </div>

        {/* Escalated to Admin */}
        <div
          onClick={() => setActiveTab('escalated')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'escalated'
              ? 'bg-[#FDFBF7] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.12)] ring-1 ring-germany-red/30'
              : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-500">Escalated to Admin</span>
            <div className="w-7 h-7 rounded-xl bg-red-50 text-germany-red flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-red">
            {escalatedQueries.length}
          </div>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">
            Pending Admin clearance
          </p>
          {activeTab === 'escalated' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-germany-red" />
          )}
        </div>

        {/* My Queries to Admin */}
        <div
          onClick={() => setActiveTab('my_admin_queries')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'my_admin_queries'
              ? 'bg-[#FDFBF7] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.12)] ring-1 ring-germany-red/30'
              : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-500">My Asks to Admin</span>
            <div className="w-7 h-7 rounded-xl bg-amber-50 text-germany-gold flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">
            {counsellorToAdminQueries.length}
          </div>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">
            Operational inquiries
          </p>
          {activeTab === 'my_admin_queries' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-germany-red" />
          )}
        </div>

        {/* Resolved Guidance */}
        <div
          onClick={() => setActiveTab('resolved')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'resolved'
              ? 'bg-[#FDFBF7] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.12)] ring-1 ring-germany-red/30'
              : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-500">Resolved Guidance</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-emerald-700">
            {resolvedQueries.length}
          </div>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">
            Completed solutions
          </p>
          {activeTab === 'resolved' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-germany-red" />
          )}
        </div>
      </div>

      {/* Bulk Action Floating Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 dark:bg-[#151B27] text-white p-3.5 rounded-xl flex items-center justify-between shadow-md animate-in fade-in duration-150 border border-slate-700 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-germany-gold animate-pulse" />
            <span>{selectedIds.length} {selectedIds.length === 1 ? 'inquiry' : 'inquiries'} selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkInReview}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Mark In Review
            </button>
            <button
              onClick={handleBulkResolve}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Resolved</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-gray-400 hover:text-white text-xs font-medium px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Two-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Inquiries (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Priority Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, ID, subject..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs text-germany-black placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all"
              />
            </div>

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
              className="w-36 shrink-0"
            />
          </div>

          {/* Select All Checkbox Row */}
          <div className="flex items-center justify-between px-2 text-[11px] font-bold text-gray-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.length > 0 && selectedIds.length === filteredList.length}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-germany-red focus:ring-germany-red"
              />
              <span>Select All Visible ({filteredList.length})</span>
            </label>
            <span>Showing {filteredList.length} inquiries</span>
          </div>

          {/* Query Cards */}
          <div className="space-y-2.5 max-h-[740px] overflow-y-auto custom-scrollbar pr-1">
            {filteredList.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center text-xs font-medium text-gray-400">
                No inquiries in this view.
              </div>
            ) : (
              filteredList.map((q) => {
                const isSelected = activeTicket?.id === q.id;
                const isChecked = selectedIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => handleSelectRow(q.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      isSelected
                        ? 'bg-[#FDFBF7] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.15)] ring-1 ring-germany-red/30'
                        : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={(e) => toggleCheckbox(q.id, e)}
                        onChange={() => {}}
                        className="mt-1 rounded border-gray-300 text-germany-red focus:ring-germany-red cursor-pointer"
                      />

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                              {q.id}
                            </span>
                            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                              {q.category}
                            </span>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                              q.priority === 'urgent' ? 'bg-red-100 text-red-700 font-bold' :
                              q.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {q.priority}
                            </span>
                          </div>

                          {getStatusBadge(q.status)}
                        </div>

                        <h3 className={`text-xs font-bold leading-snug line-clamp-1 ${
                          isSelected ? 'text-germany-red' : 'text-germany-black'
                        }`}>
                          {q.title}
                        </h3>

                        {q.escalationInfo && (
                          <div className="text-[10px] text-germany-red bg-red-50/80 border border-red-100 px-2 py-1 rounded-lg line-clamp-1 font-medium">
                            <strong>Escalated to Admin:</strong> {q.escalationInfo.reason}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px] text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-400" />
                            <strong className="text-gray-700">{q.raisedBy.name}</strong>
                          </span>
                          
                          {/* Quick Actions Directly on Card */}
                          <div className="flex items-center gap-1.5">
                            {q.status !== 'escalated_to_admin' && q.status !== 'resolved' && (
                              <button
                                onClick={(e) => handleCardEscalate(q, e)}
                                title="Escalate to Admin"
                                className="px-1.5 py-0.5 text-[10px] font-bold text-germany-red hover:bg-red-50 rounded transition-colors"
                              >
                                Escalate
                              </button>
                            )}
                            {q.status !== 'resolved' && (
                              <button
                                onClick={(e) => handleCardResolve(q, e)}
                                title="Mark as Resolved"
                                className="px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={(e) => handleCardGuide(q, e)}
                              className="px-2 py-0.5 text-[10px] font-bold text-germany-black hover:bg-gray-100 rounded transition-colors flex items-center gap-0.5"
                            >
                              Guide →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Inquiry Detail & Action Console (7 cols on lg) */}
        <div className="lg:col-span-7">
          {activeTicket ? (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] overflow-hidden relative">
              {/* German Tricolor Top Accent */}
              <div className="w-full h-[3px] flex shrink-0">
                <div className="flex-1 bg-germany-black"></div>
                <div className="flex-1 bg-germany-red"></div>
                <div className="flex-1 bg-germany-gold"></div>
              </div>

              {/* Action Bar */}
              <div className="p-5 border-b border-gray-200/80 space-y-3 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {activeTicket.id}
                    </span>
                    <span className="text-xs font-bold text-germany-black bg-gray-100 px-2 py-0.5 rounded">
                      {activeTicket.category}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      activeTicket.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      activeTicket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activeTicket.priority}
                    </span>
                    {getStatusBadge(activeTicket.status)}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Changer */}
                    <div className="w-38">
                      <ClaySelect
                        value={activeTicket.status}
                        onChange={(val) => handleStatusChange(val as QueryStatus)}
                        options={[
                          { value: 'open', label: 'Status: Open' },
                          { value: 'in_review_counsellor', label: 'Status: In Review' },
                          { value: 'escalated_to_admin', label: 'Status: Escalated' },
                          { value: 'resolved', label: 'Status: Resolved' },
                        ]}
                      />
                    </div>

                    {/* Escalate to Admin Button */}
                    {activeTicket.status !== 'escalated_to_admin' && activeTicket.status !== 'resolved' && (
                      <button
                        onClick={() => {
                          setShowEscalateForm(true);
                          setShowResolveForm(false);
                        }}
                        className="bg-germany-gold/20 hover:bg-germany-gold/30 text-germany-black border border-germany-gold/40 text-xs font-bold px-3 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-germany-red" />
                        <span>Escalate to Admin</span>
                      </button>
                    )}

                    {/* Mark Resolved Button */}
                    {activeTicket.status !== 'resolved' && (
                      <button
                        onClick={() => {
                          setShowResolveForm(true);
                          setShowEscalateForm(false);
                          setResolutionText('Consultation guidance provided and verified with student.');
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-display font-bold text-germany-black leading-snug">
                    {activeTicket.title}
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">
                    Student: <strong className="text-germany-black">{activeTicket.raisedBy.name}</strong> ({activeTicket.raisedBy.email}) · Created: {activeTicket.createdAt}
                  </p>
                </div>
              </div>

              {/* Stepper */}
              <div className="px-5 py-2.5 bg-gray-50/80 border-b border-gray-200/70 flex items-center gap-2 text-[11px] text-gray-500 overflow-x-auto">
                <span className="font-bold text-germany-black flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  1. Raised by Student
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status !== 'open' ? 'font-bold text-germany-black' : 'text-gray-400'}>
                  2. Counsellor Review
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status === 'escalated_to_admin' || (activeTicket.status === 'resolved' && activeTicket.escalationInfo) ? 'font-bold text-germany-red' : 'text-gray-400'}>
                  3. Admin Escalation
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status === 'resolved' ? 'font-bold text-emerald-600' : 'text-gray-400'}>
                  4. Solved
                </span>
              </div>

              {/* Escalation Handover Form (if triggered) */}
              {showEscalateForm && (
                <div className="m-5 p-4 bg-amber-50/70 border border-amber-300 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span className="flex items-center gap-1.5 text-germany-red">
                      <ArrowUpRight className="w-4 h-4" />
                      Escalate Ticket #{activeTicket.id} to Admin Operations
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEscalateForm(false)}
                      className="text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Escalation Reason</label>
                    <ClaySelect
                      value={escalationReason}
                      onChange={(val) => setEscalationReason(val)}
                      options={ESCALATION_REASONS.map((r) => ({ value: r, label: r }))}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Handover Note for Admin</label>
                    <textarea
                      rows={2}
                      value={escalationNotes}
                      onChange={(e) => setEscalationNotes(e.target.value)}
                      placeholder="Explain to Admin what verification, clearance, or letter is required..."
                      className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs focus:outline-none focus:border-amber-600 font-medium resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEscalateForm(false)}
                      className="px-3 py-1.5 text-xs text-gray-500 font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSingleEscalate}
                      className="bg-germany-red hover:bg-[#D62839] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Confirm Escalation to Admin</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Resolution Form (if triggered) */}
              {showResolveForm && (
                <div className="m-5 p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Enter Counsellor Resolution Summary
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowResolveForm(false)}
                      className="text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    placeholder="Explain what guidance or steps were provided to the student..."
                    className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-medium resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowResolveForm(false)}
                      className="px-3 py-1.5 text-xs text-gray-500 font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSingleResolve}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Confirm Resolution
                    </button>
                  </div>
                </div>
              )}

              {/* Escalation Callout if already escalated */}
              {activeTicket.escalationInfo && (
                <div className="mx-5 mt-4 p-3.5 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-500/40 rounded-xl text-xs text-red-900 dark:text-red-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-germany-red dark:text-[#FF6B7A]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Currently Escalated to Admin Operations Desk</span>
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    <strong>Reason:</strong> {activeTicket.escalationInfo.reason}
                  </p>
                  {activeTicket.escalationInfo.adminNotes && (
                    <div className="text-[11px] text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-red-100 dark:border-red-500/20">
                      <strong>Handover Note:</strong> {activeTicket.escalationInfo.adminNotes}
                    </div>
                  )}
                </div>
              )}

              {/* Resolution Summary if already resolved */}
              {activeTicket.resolutionInfo && (
                <div className="mx-5 mt-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/40 rounded-xl text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolution Provided by {activeTicket.resolutionInfo.resolvedBy}</span>
                  </div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-200 bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                    {activeTicket.resolutionInfo.summary}
                  </p>
                </div>
              )}

              {/* Conversation History */}
              <div className="p-5 space-y-3 max-h-80 overflow-y-auto custom-scrollbar bg-[#FDFBF7]/30 dark:bg-transparent">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Conversation & Guidance History ({activeTicket.messages.length})</span>
                  <span className="text-[10px] font-normal lowercase text-gray-400">chronological order</span>
                </div>

                {activeTicket.messages.map((m) => {
                  const isCounsellor = m.sender.role === 'counsellor';
                  const isAdmin = m.sender.role === 'admin' || m.sender.role === 'superadmin';
                  const isStudent = m.sender.role === 'student';

                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        m.isInternalNote
                          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/40 text-amber-950 dark:text-amber-200'
                          : isCounsellor
                          ? 'bg-white dark:bg-[#111622] border-germany-gold/40 dark:border-germany-gold/40 shadow-2xs text-gray-800 dark:text-gray-100'
                          : isAdmin
                          ? 'bg-red-50/70 dark:bg-[#1A1218] border-red-200 dark:border-germany-red/40 text-gray-900 dark:text-white'
                          : 'bg-white dark:bg-[#111622] border-gray-200 dark:border-gray-800/80 shadow-2xs text-gray-800 dark:text-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-germany-black dark:text-white">
                            {isCounsellor ? `${m.sender.name} (You)` : m.sender.name}
                          </span>
                          <span className={`text-[10px] font-bold capitalize ${
                            isAdmin 
                              ? 'text-germany-red dark:text-[#FF6B7A]' 
                              : isCounsellor 
                              ? 'text-amber-700 dark:text-germany-gold' 
                              : 'text-gray-400 dark:text-gray-400'
                          }`}>
                            ({m.sender.role})
                          </span>
                          {m.isInternalNote && (
                            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Staff Only
                            </span>
                          )}
                        </div>
                        <span className="text-gray-400 dark:text-gray-400 font-medium">{m.timestamp}</span>
                      </div>

                      <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 pt-0.5 leading-relaxed font-medium">
                        {m.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form & Quick Guidance Templates */}
              <div className="p-4 bg-white border-t border-gray-200/80 space-y-3">
                {/* Quick Guidance Templates Chips */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                    <Lightbulb className="w-3.5 h-3.5 text-germany-gold" />
                    <span>Quick Guidance Snippets (click to insert):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_GUIDANCE_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleInsertTemplate(tmpl.snippet)}
                        className="text-[10px] font-semibold bg-gray-50 dark:bg-white/5 hover:bg-germany-gold/15 dark:hover:bg-germany-gold/20 text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white border border-gray-200/80 dark:border-gray-800/80 hover:border-germany-gold/40 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                        className="rounded border-gray-300 text-germany-red focus:ring-germany-red"
                      />
                      <span>Internal staff note (hidden from student)</span>
                    </label>

                    <span className="text-[11px] text-gray-400">Replying as Assigned Counsellor</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <textarea
                      ref={replyInputRef}
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isInternalNote ? 'Type an internal handover note for staff...' : 'Type guidance reply to the student...'}
                      className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-germany-red bg-gray-50 focus:bg-white text-germany-black font-medium transition-all resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 h-[42px] shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-xs font-medium">
              Select an inquiry from the left list to review and guide the student or escalate to Admin.
            </div>
          )}
        </div>
      </div>

      {/* Ask Admin Query Modal */}
      <CreateQueryModal
        isOpen={isCreateAdminQueryOpen}
        onClose={() => setIsCreateAdminQueryOpen(false)}
        userRole="counsellor"
      />
    </div>
  );
}
