"use client";

import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Plus, 
  Search, 
  ChevronRight, 
  RotateCcw
} from 'lucide-react';
import AiAgentChat from '@/components/help/AiAgentChat';
import CreateQueryModal from '@/components/help/CreateQueryModal';
import QueryDetailModal from '@/components/help/QueryDetailModal';
import { ClaySelect } from '@/components/ClaySelect';
import { useHelpStore, SupportQuery } from '@/store/useHelpStore';

export default function StudentHelpPage() {
  const queries = useHelpStore((s) => s.queries);
  const resetDemoData = useHelpStore((s) => s.resetDemoData);

  const [activeTab, setActiveTab] = useState<'ai_agent' | 'my_queries'>('ai_agent');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialSubject, setInitialSubject] = useState('');
  const [initialDetail, setInitialDetail] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<SupportQuery | null>(null);

  const studentQueries = queries.filter((q) => q.raisedBy.role === 'student');

  const filteredQueries = studentQueries.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openDropQuery = (subj = '', detail = '') => {
    setInitialSubject(subj);
    setInitialDetail(detail);
    setIsCreateModalOpen(true);
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      case 'in_review_counsellor':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-germany-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-gold" />
            In Review
          </span>
        );
      case 'escalated_to_admin':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-germany-red">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red animate-pulse" />
            Escalated to Admin
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Resolved
          </span>
        );
      default:
        return <span className="text-xs text-gray-500 font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner in EuropeBridge Theme */}
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
              Help & Support Hub
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-gold/15 border border-germany-gold/40 rounded-full font-bold text-germany-black text-[10px]">
              <Bot className="w-3 h-3 text-germany-red" />
              <span>Student Support</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Get instant guidance from your <span className="text-germany-red font-bold">AI Advisor</span> or drop a query directly to your assigned counsellor.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openDropQuery()}
            className="bg-germany-red hover:bg-[#D62839] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Drop Query</span>
          </button>
          <button
            onClick={() => resetDemoData()}
            title="Reset Sample Data"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Segmented Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-xl w-fit border border-gray-200/60">
        <button
          onClick={() => setActiveTab('ai_agent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ai_agent'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-white" />
          <span>EuropeBridge AI Advisor</span>
        </button>

        <button
          onClick={() => setActiveTab('my_queries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'my_queries'
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:text-germany-black'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-white" />
          <span>My Queries</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'my_queries' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            {studentQueries.length}
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'ai_agent' ? (
        <AiAgentChat onAskCounsellor={(ctx) => openDropQuery('Question from AI Chat', ctx)} />
      ) : (
        <div className="space-y-4">
          {/* Clean Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search queries..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs text-germany-black placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all"
              />
            </div>

            <ClaySelect
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'Admissions', label: 'Admissions' },
                { value: 'APS Certificate', label: 'APS Certificate' },
                { value: 'Visa & Blocked Account', label: 'Visa & Blocked Account' },
                { value: 'University Shortlist', label: 'University Shortlist' },
                { value: 'Documents & Translation', label: 'Documents & Translation' },
              ]}
              className="w-full sm:w-56"
            />
          </div>

          {/* Queries List */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] divide-y divide-gray-100 overflow-hidden">
            {filteredQueries.length === 0 ? (
              <div className="p-10 text-center text-xs font-medium text-gray-400">
                No queries found. Click &quot;Drop Query&quot; to ask your counsellor.
              </div>
            ) : (
              filteredQueries.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuery(q)}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-gray-400">{q.id}</span>
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                      {getStatusDot(q.status)}
                    </div>
                    <h3 className="text-xs font-bold text-germany-black group-hover:text-germany-red transition-colors truncate">
                      {q.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium truncate">
                      Assigned to <strong className="text-germany-black">{q.assignedCounsellor?.name || 'Counsellor'}</strong> · {q.messages.length} messages · {q.createdAt}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-germany-red transition-colors shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateQueryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userRole="student"
        initialSubject={initialSubject}
        initialDetail={initialDetail}
      />

      {selectedQuery && (
        <QueryDetailModal
          isOpen={!!selectedQuery}
          onClose={() => setSelectedQuery(null)}
          query={queries.find((q) => q.id === selectedQuery.id) || selectedQuery}
          viewerRole="student"
          viewerName="Rohan Sharma"
          viewerEmail="rohan.sharma@example.com"
        />
      )}
    </div>
  );
}
