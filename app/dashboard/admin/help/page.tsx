"use client";

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  ArrowUpRight, 
  Building, 
  ShieldCheck,
  CheckCircle2,
  Check,
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
  X
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { useHelpStore, SupportQuery, QueryStatus, QueryPriority, QuerySender } from '@/store/useHelpStore';

export default function AdminHelpPage() {
  const queries = useHelpStore((s) => s.queries);
  const resetDemoData = useHelpStore((s) => s.resetDemoData);
  const resolveQuery = useHelpStore((s) => s.resolveQuery);
  const updateQueryStatus = useHelpStore((s) => s.updateQueryStatus);
  const addMessageToQuery = useHelpStore((s) => s.addMessageToQuery);

  // Tabs: 'escalated' | 'all' | 'counsellor' | 'resolved'
  const [activeTab, setActiveTab] = useState<'escalated' | 'all' | 'counsellor' | 'resolved'>('escalated');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  // Selected ticket for side-by-side details view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>('TICK-101');
  
  // Checkbox multi-selection for bulk/quick actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Form states in detail pane
  const [resolutionText, setResolutionText] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  // Categorize queries
  const escalatedQueries = queries.filter((q) => q.status === 'escalated_to_admin' || (q.escalationInfo && q.status !== 'resolved'));
  const counsellorQueries = queries.filter((q) => q.raisedBy.role === 'counsellor');
  const resolvedQueries = queries.filter((q) => q.status === 'resolved');
  const allQueries = queries;

  let baseList: SupportQuery[] = [];
  if (activeTab === 'escalated') baseList = escalatedQueries;
  else if (activeTab === 'counsellor') baseList = counsellorQueries;
  else if (activeTab === 'resolved') baseList = resolvedQueries;
  else baseList = allQueries;

  const filteredList = baseList.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.raisedBy.name.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === 'all' || q.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  // Current active ticket details
  const activeTicket = queries.find((q) => q.id === selectedTicketId) || (filteredList.length > 0 ? filteredList[0] : null);

  // Handle row selection
  const handleSelectRow = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowResolveForm(false);
    setResolutionText('');
  };

  // Checkbox toggle
  const toggleCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all visible
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredList.length && filteredList.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map((q) => q.id));
    }
  };

  // Mark selected as resolved
  const handleBulkResolve = () => {
    if (selectedIds.length === 0) return;
    const defaultNote = 'Resolved and verified by Central Operations Admin Desk.';
    selectedIds.forEach((id) => {
      resolveQuery(id, 'Vikram Singh (Admin Operations)', 'admin', defaultNote);
    });
    setSelectedIds([]);
  };

  // Single resolve from detail panel
  const handleSingleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !resolutionText.trim()) return;

    resolveQuery(activeTicket.id, 'Vikram Singh (Admin Operations)', 'admin', resolutionText.trim());
    setResolutionText('');
    setShowResolveForm(false);
  };

  // Quick 1-click resolve button on a card
  const handleQuickResolveCard = (q: SupportQuery, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTicketId(q.id);
    setShowResolveForm(true);
    setResolutionText(`Approved and resolved by Admin. Verification document / action completed.`);
  };

  // Status changer from detail panel
  const handleStatusChange = (newStatus: QueryStatus) => {
    if (!activeTicket) return;
    updateQueryStatus(activeTicket.id, newStatus, 'Vikram Singh (Admin Operations)', 'admin');
  };

  // Send admin reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    const sender: QuerySender = {
      id: 'adm-ops',
      name: 'Vikram Singh (Admin Operations)',
      email: 'vikram.admin@europebridge.de',
      role: 'admin',
    };

    addMessageToQuery(activeTicket.id, replyText.trim(), sender, isInternalNote);
    setReplyText('');
    setIsInternalNote(false);
  };

  const getStatusBadge = (status: QueryStatus) => {
    switch (status) {
      case 'escalated_to_admin':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-germany-red bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red" />
            Action Required
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Resolved
          </span>
        );
      case 'in_review_counsellor':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-germany-gold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-gold" />
            In Review
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
              Admin Help & Resolution Command
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-red/10 border border-germany-red/30 rounded-full font-bold text-germany-red text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>Operations Desk</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Select any escalated or student query below to review details, reply, and mark as resolved.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => resetDemoData()}
            title="Reset Sample Data"
            className="px-3 py-2 text-gray-600 hover:text-germany-black rounded-xl hover:bg-gray-100 border border-gray-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100/80 rounded-xl w-fit border border-gray-200/60">
        <button
          onClick={() => setActiveTab('escalated')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'escalated'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          <span>Escalated to Admin</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'escalated' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {escalatedQueries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-white" />
          <span>All Queries</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'all' ? 'bg-germany-red text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
          }`}>
            {allQueries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('counsellor')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'counsellor'
              ? 'bg-germany-black text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-germany-gold" />
          <span>Counsellor Inquiries</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'counsellor' ? 'bg-germany-red text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
          }`}>
            {counsellorQueries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('resolved')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'resolved'
              ? 'bg-germany-black text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Resolved</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
          }`}>
            {resolvedQueries.length}
          </span>
        </button>
      </div>

      {/* Bulk Action Bar (if items selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-germany-black text-white p-3.5 rounded-xl flex items-center justify-between shadow-md animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-germany-gold animate-pulse" />
            <span>{selectedIds.length} {selectedIds.length === 1 ? 'ticket' : 'tickets'} selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkResolve}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Selected as Resolved</span>
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
        {/* Left Column: List of Queries (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket ID, title, student..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs text-germany-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all"
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

          {/* Select All Row */}
          <div className="flex items-center justify-between px-2 text-[11px] font-bold text-gray-500 dark:text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.length > 0 && selectedIds.length === filteredList.length}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-germany-red focus:ring-germany-red"
              />
              <span>Select All Visible ({filteredList.length})</span>
            </label>
            <span>Showing {filteredList.length} results</span>
          </div>

          {/* Query Cards */}
          <div className="space-y-2.5 max-h-[720px] overflow-y-auto custom-scrollbar pr-1">
            {filteredList.length === 0 ? (
              <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 p-8 text-center text-xs font-medium text-gray-400">
                No tickets match your filters.
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
                        ? 'bg-[#FDFBF7] dark:bg-[#161C28] border-germany-red shadow-[0_2px_12px_rgba(230,57,70,0.15)] ring-1 ring-germany-red/30'
                        : 'bg-white dark:bg-[#111622] border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={(e) => toggleCheckbox(q.id, e)}
                        onChange={() => {}}
                        className="mt-1 rounded border-gray-300 text-germany-red focus:ring-germany-red cursor-pointer"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[10px] font-bold text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">
                              {q.id}
                            </span>
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">
                              {q.category}
                            </span>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                              q.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-[#FF6B7A] font-bold' :
                              q.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' :
                              'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                            }`}>
                              {q.priority}
                            </span>
                          </div>

                          {getStatusBadge(q.status)}
                        </div>

                        <h3 className={`text-xs font-bold leading-snug line-clamp-1 ${
                          isSelected ? 'text-germany-red' : 'text-germany-black dark:text-white'
                        }`}>
                          {q.title}
                        </h3>

                        {q.escalationInfo && (
                          <div className="text-[10px] text-germany-red dark:text-[#FF6B7A] bg-red-50/80 dark:bg-red-950/40 border border-red-100 dark:border-red-500/30 px-2 py-1 rounded-lg line-clamp-1 font-medium">
                            <strong>Escalated:</strong> {q.escalationInfo.reason}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400 font-medium">
                          <span>By: <strong className="text-gray-700 dark:text-gray-200">{q.raisedBy.name}</strong></span>
                          
                          <div className="flex items-center gap-2">
                            {q.status !== 'resolved' && (
                              <button
                                type="button"
                                onClick={(e) => handleQuickResolveCard(q, e)}
                                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 font-bold hover:underline bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 cursor-pointer"
                              >
                                Quick Resolve
                              </button>
                            )}
                            <span className="text-germany-red font-bold flex items-center">
                              View →
                            </span>
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

        {/* Right Column: Active Query Detail & Resolution Workspace (7 cols on lg) */}
        <div className="lg:col-span-7">
          {activeTicket ? (
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] overflow-hidden relative">
              {/* German Tricolor Top Accent */}
              <div className="w-full h-[3px] flex shrink-0">
                <div className="flex-1 bg-germany-black"></div>
                <div className="flex-1 bg-germany-red"></div>
                <div className="flex-1 bg-germany-gold"></div>
              </div>

              {/* Ticket Top Action Bar */}
              <div className="p-5 border-b border-gray-200/80 dark:border-gray-800/80 space-y-3 bg-white dark:bg-[#111622]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
                      {activeTicket.id}
                    </span>
                    <span className="text-xs font-bold text-germany-black dark:text-white bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
                      {activeTicket.category}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      activeTicket.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-[#FF6B7A]' :
                      activeTicket.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' :
                      'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300'
                    }`}>
                      {activeTicket.priority}
                    </span>
                    {getStatusBadge(activeTicket.status)}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Changer */}
                    <div className="w-44">
                      <ClaySelect
                        value={activeTicket.status}
                        onChange={(val) => handleStatusChange(val as QueryStatus)}
                        options={[
                          { value: 'open', label: 'Set: Open' },
                          { value: 'in_review_counsellor', label: 'Set: In Review' },
                          { value: 'escalated_to_admin', label: 'Set: Escalated' },
                          { value: 'resolved', label: 'Set: Resolved' },
                          { value: 'closed', label: 'Set: Closed' },
                        ]}
                      />
                    </div>

                    {activeTicket.status !== 'resolved' && (
                      <button
                        onClick={() => {
                          setShowResolveForm(true);
                          setResolutionText('Approved and resolved by Admin desk.');
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-display font-bold text-germany-black dark:text-white leading-snug">
                    {activeTicket.title}
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1">
                    Raised by <strong className="text-germany-black dark:text-white">{activeTicket.raisedBy.name}</strong> ({activeTicket.raisedBy.role}) · Assigned Counsellor: <strong className="text-germany-black dark:text-white">{activeTicket.assignedCounsellor?.name || 'General Desk'}</strong> · Created: {activeTicket.createdAt}
                  </p>
                </div>
              </div>

              {/* Stepper */}
              <div className="px-5 py-2.5 bg-gray-50/80 dark:bg-[#0E121A] border-b border-gray-200/70 dark:border-gray-800/80 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 overflow-x-auto">
                <span className="font-bold text-germany-black dark:text-white">1. Raised</span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status !== 'open' ? 'font-bold text-germany-black dark:text-white' : 'text-gray-400'}>
                  2. Counsellor Review
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status === 'escalated_to_admin' || (activeTicket.status === 'resolved' && activeTicket.escalationInfo) ? 'font-bold text-germany-red dark:text-[#FF6B7A]' : 'text-gray-400'}>
                  3. Admin Escalation
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className={activeTicket.status === 'resolved' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}>
                  4. Solved
                </span>
              </div>

              {/* Escalation Alert Callout */}
              {activeTicket.escalationInfo && (
                <div className="mx-5 mt-4 p-3.5 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-500/40 rounded-xl text-xs text-red-900 dark:text-red-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-germany-red dark:text-[#FF6B7A]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Escalated to Admin Desk by {activeTicket.escalationInfo.escalatedBy}</span>
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    <strong>Reason:</strong> {activeTicket.escalationInfo.reason}
                  </p>
                  {activeTicket.escalationInfo.adminNotes && (
                    <div className="text-[11px] text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-red-100 dark:border-red-500/20">
                      <strong>Counsellor Handover Note:</strong> {activeTicket.escalationInfo.adminNotes}
                    </div>
                  )}
                </div>
              )}

              {/* Resolution Summary Callout if resolved */}
              {activeTicket.resolutionInfo && (
                <div className="mx-5 mt-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/40 rounded-xl text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolution Confirmed by {activeTicket.resolutionInfo.resolvedBy}</span>
                  </div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-200 bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                    {activeTicket.resolutionInfo.summary}
                  </p>
                </div>
              )}

              {/* Inline Resolve Form Popup */}
              {showResolveForm && (
                <div className="m-5 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Enter Admin Resolution Summary
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowResolveForm(false)}
                      className="text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    placeholder="Write official resolution notes (e.g. Affidavit issued, embassy slot confirmed, documents approved)..."
                    className="w-full p-2.5 bg-white dark:bg-[#0E121A] border border-emerald-300 dark:border-emerald-500/40 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-medium resize-none text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowResolveForm(false)}
                      className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white font-bold cursor-pointer"
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

              {/* Conversation Messages */}
              <div className="p-5 space-y-3 max-h-80 overflow-y-auto custom-scrollbar bg-[#FDFBF7]/30 dark:bg-transparent">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Conversation & Guidance History ({activeTicket.messages.length})
                </div>

                {activeTicket.messages.map((m) => {
                  const isAdmin = m.sender.role === 'admin' || m.sender.role === 'superadmin';
                  const isCounsellor = m.sender.role === 'counsellor';

                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        m.isInternalNote
                          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/40 text-amber-950 dark:text-amber-200'
                          : isAdmin
                          ? 'bg-red-50/70 dark:bg-[#1A1218] border-red-200 dark:border-germany-red/40 text-gray-900 dark:text-white'
                          : isCounsellor
                          ? 'bg-white dark:bg-[#111622] border-germany-gold/40 dark:border-germany-gold/40 shadow-2xs text-gray-800 dark:text-gray-100'
                          : 'bg-white dark:bg-[#111622] border-gray-200 dark:border-gray-800/80 shadow-2xs text-gray-800 dark:text-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-germany-black dark:text-white">
                            {isAdmin ? `${m.sender.name} (You)` : m.sender.name}
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
                              <Lock className="w-2.5 h-2.5" /> Staff Internal Note
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

              {/* Reply Form */}
              <div className="p-4 bg-white dark:bg-[#111622] border-t border-gray-200/80 dark:border-gray-800/80">
                <form onSubmit={handleSendReply} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-300 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                        className="rounded border-gray-300 text-germany-red focus:ring-germany-red"
                      />
                      <span>Internal staff note (hidden from student)</span>
                    </label>

                    <span className="text-[11px] text-gray-400 dark:text-gray-400">Replying as Central Admin</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isInternalNote ? 'Type an internal staff note...' : 'Type response or guidance to student/counsellor...'}
                      className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-gray-800/80 focus:outline-none focus:border-germany-red bg-gray-50 dark:bg-[#0E121A] focus:bg-white dark:focus:bg-[#0E121A] text-germany-black dark:text-white font-medium transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-400 text-xs font-medium">
              Select a query from the left list to view details and mark as resolved.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
