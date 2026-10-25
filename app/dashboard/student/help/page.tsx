"use client";

import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  Search, 
  ChevronRight, 
  RotateCcw,
  ArrowLeft,
  Paperclip,
  CheckCircle2,
  X,
  User,
  Clock
} from 'lucide-react';
import AiAgentChat from '@/components/help/AiAgentChat';
import { ClaySelect } from '@/components/ClaySelect';
import { 
  useHelpStore, 
  QueryCategory, 
  QueryPriority, 
  SupportQuery 
} from '@/store/useHelpStore';

const CATEGORIES: QueryCategory[] = [
  'Admissions',
  'APS Certificate',
  'Visa & Blocked Account',
  'University Shortlist',
  'Documents & Translation',
  'Technical Issue',
  'General Inquiry',
];

export default function StudentHelpPage() {
  const queries = useHelpStore((s) => s.queries);
  const resetDemoData = useHelpStore((s) => s.resetDemoData);
  const createStudentQuery = useHelpStore((s) => s.createStudentQuery);
  const addMessageToQuery = useHelpStore((s) => s.addMessageToQuery);

  const [activeTab, setActiveTab] = useState<'ai_agent' | 'ask_counsellor' | 'my_queries'>('ask_counsellor');
  
  // Ask Counsellor form state (NO POPUP)
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<QueryCategory>('APS Certificate');
  const [priority, setPriority] = useState<QueryPriority>('medium');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // My queries state (NO POPUP)
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [replyText, setReplyText] = useState('');

  const studentQueries = queries.filter((q) => q.raisedBy.role === 'student');
  const selectedQuery = queries.find((q) => q.id === selectedQueryId);

  const filteredQueries = studentQueries.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || q.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSendToCounsellor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newQuery = createStudentQuery({
        title: subject.trim(),
        description: attachedFile ? `${message.trim()}\n\n[Attachment: ${attachedFile}]` : message.trim(),
        category,
        priority,
        studentName: 'Rohan Sharma',
        studentEmail: 'rohan.sharma@example.com',
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubject('');
        setMessage('');
        setAttachedFile(null);
        setSubmitSuccess(false);
        setSelectedQueryId(newQuery.id);
        setActiveTab('my_queries');
      }, 700);
    }, 300);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedQuery) return;

    addMessageToQuery(
      selectedQuery.id,
      replyText.trim(),
      {
        id: 'stu-current',
        name: 'Rohan Sharma',
        email: 'rohan.sharma@example.com',
        role: 'student'
      },
      false
    );
    setReplyText('');
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
      case 'in_review_counsellor':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            In Review
          </span>
        );
      case 'escalated_to_admin':
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
        return <span className="text-xs text-gray-500 font-semibold">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 relative overflow-hidden">
        {/* German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black">
              Help & Support
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Ask your counsellor a question, view past answers, or chat with the AI assistant.
            </p>
          </div>

          <button
            onClick={() => resetDemoData()}
            title="Reset Sample Data"
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Simple Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-xl border border-gray-200 w-fit">
        <button
          onClick={() => {
            setActiveTab('ask_counsellor');
            setSelectedQueryId(null);
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

        <button
          onClick={() => {
            setActiveTab('my_queries');
            setSelectedQueryId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'my_queries'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-700 hover:text-germany-black hover:bg-gray-200/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>My Queries</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeTab === 'my_queries' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {studentQueries.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('ai_agent');
            setSelectedQueryId(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'ai_agent'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-700 hover:text-germany-black hover:bg-gray-200/60'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* TAB 1: ASK COUNSELLOR (INLINE FORM - NO POPUP) */}
      {activeTab === 'ask_counsellor' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-germany-black">
              Send a Query to Your Counsellor
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              Assigned Advisor: <strong className="text-germany-black">Priya Mehra</strong> · You will get a response here and by email.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-10 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-germany-black">Your question has been sent!</h3>
              <p className="text-sm text-gray-500 font-medium">Opening your queries list...</p>
            </div>
          ) : (
            <form onSubmit={handleSendToCounsellor} className="p-5 sm:p-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-germany-black mb-1.5">
                    Category
                  </label>
                  <ClaySelect
                    value={category}
                    onChange={(val) => setCategory(val as QueryCategory)}
                    options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-germany-black mb-1.5">
                    Priority
                  </label>
                  <ClaySelect
                    value={priority}
                    onChange={(val) => setPriority(val as QueryPriority)}
                    options={[
                      { value: 'low', label: 'Normal' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'urgent', label: 'Urgent' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-germany-black mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Name spelling mismatch on APS marksheet"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-germany-black font-medium focus:bg-white focus:outline-none focus:border-germany-red transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-germany-black mb-1.5">
                  Message / Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain what help or guidance you need in simple words..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-germany-black font-medium focus:bg-white focus:outline-none focus:border-germany-red transition-all resize-y"
                />
              </div>

              {/* Attachment */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-medium min-w-0">
                  <Paperclip className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">
                    {attachedFile ? (
                      <strong className="text-germany-black">{attachedFile}</strong>
                    ) : (
                      'Optional: attach a document or photo'
                    )}
                  </span>
                </div>

                {attachedFile ? (
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="text-germany-red hover:underline font-bold cursor-pointer shrink-0 ml-2"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAttachedFile('marksheet_document.pdf')}
                    className="text-germany-red hover:underline font-bold cursor-pointer shrink-0 ml-2"
                  >
                    + Add File
                  </button>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !subject.trim() || !message.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-germany-red hover:bg-[#D62839] disabled:bg-gray-300 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send to Counsellor'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: MY QUERIES (INLINE CONVERSATION - NO POPUP) */}
      {activeTab === 'my_queries' && (
        <div className="space-y-4">
          {selectedQuery ? (
            /* Inline Conversation Reader */
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
              {/* Top back bar */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedQueryId(null)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-germany-black cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all queries</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {selectedQuery.id}
                  </span>
                  {getStatusBadge(selectedQuery.status)}
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 sm:p-6 border-b border-gray-100 space-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {selectedQuery.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-germany-black">
                  {selectedQuery.title}
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Created on {selectedQuery.createdAt} · Assigned to {selectedQuery.assignedCounsellor?.name || 'Priya Mehra'}
                </p>
              </div>

              {/* Message Thread */}
              <div className="p-5 sm:p-6 space-y-4 bg-gray-50/40 min-h-[240px]">
                {selectedQuery.messages.map((m) => {
                  const isStudent = m.sender.role === 'student';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-500 px-1 font-medium">
                        <strong className="text-germany-black">{m.sender.name}</strong>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed whitespace-pre-line ${
                          isStudent
                            ? 'bg-germany-red text-white font-medium rounded-tr-xs shadow-xs'
                            : 'bg-white border border-gray-200 text-gray-900 rounded-tl-xs shadow-2xs'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-4 sm:p-5 border-t border-gray-100 bg-white flex items-center gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a reply..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-germany-black placeholder-gray-400 focus:bg-white focus:outline-none focus:border-germany-red transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] disabled:bg-gray-300 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  Reply
                </button>
              </form>
            </div>
          ) : (
            /* Queries List */
            <>
              {/* Filter bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search queries..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-germany-black placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all font-medium"
                  />
                </div>

                <ClaySelect
                  value={filterCategory}
                  onChange={(val) => setFilterCategory(val)}
                  options={[
                    { value: 'all', label: 'All Categories' },
                    ...CATEGORIES.map((c) => ({ value: c, label: c }))
                  ]}
                  className="w-full sm:w-56"
                />
              </div>

              {/* List */}
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs divide-y divide-gray-100 overflow-hidden">
                {filteredQueries.length === 0 ? (
                  <div className="p-10 text-center space-y-3">
                    <p className="text-sm font-medium text-gray-500">No queries found.</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ask_counsellor')}
                      className="text-xs font-bold text-germany-red hover:underline cursor-pointer"
                    >
                      Click here to write to your counsellor
                    </button>
                  </div>
                ) : (
                  filteredQueries.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQueryId(q.id)}
                      className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-400">{q.id}</span>
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                          {getStatusBadge(q.status)}
                        </div>
                        <h3 className="text-sm font-bold text-germany-black group-hover:text-germany-red transition-colors truncate">
                          {q.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium truncate">
                          Assigned to <strong className="text-germany-black">{q.assignedCounsellor?.name || 'Priya Mehra'}</strong> · {q.messages.length} messages · {q.createdAt}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-germany-red group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 3: AI ASSISTANT */}
      {activeTab === 'ai_agent' && (
        <AiAgentChat
          onAskCounsellor={(ctx) => {
            setSubject('Question from AI Chat');
            setMessage(ctx || '');
            setActiveTab('ask_counsellor');
          }}
        />
      )}
    </div>
  );
}
