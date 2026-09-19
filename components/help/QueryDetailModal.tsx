"use client";

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ArrowUpRight, 
  Lock, 
  ChevronRight
} from 'lucide-react';
import { 
  useHelpStore, 
  SupportQuery, 
  QuerySender, 
  QueryStatus 
} from '@/store/useHelpStore';
import EscalateQueryModal from './EscalateQueryModal';

interface QueryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: SupportQuery | null;
  viewerRole: 'student' | 'counsellor' | 'admin' | 'superadmin';
  viewerName?: string;
  viewerEmail?: string;
}

export default function QueryDetailModal({
  isOpen,
  onClose,
  query,
  viewerRole,
  viewerName = 'User',
  viewerEmail = 'user@europebridge.de',
}: QueryDetailModalProps) {
  const addMessageToQuery = useHelpStore((s) => s.addMessageToQuery);
  const resolveQuery = useHelpStore((s) => s.resolveQuery);

  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showResolvePrompt, setShowResolvePrompt] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState('');

  if (!isOpen || !query) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const sender: QuerySender = {
      id: `usr-${Date.now()}`,
      name: viewerName,
      email: viewerEmail,
      role: viewerRole,
    };

    addMessageToQuery(query.id, replyText.trim(), sender, isInternalNote);
    setReplyText('');
    setIsInternalNote(false);
  };

  const handleMarkResolved = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionSummary.trim()) return;

    resolveQuery(query.id, viewerName, viewerRole, resolutionSummary.trim());
    setShowResolvePrompt(false);
    setResolutionSummary('');
  };

  const getStatusDot = (status: QueryStatus) => {
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
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red" />
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
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <div 
          className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* German Tricolor Top Accent */}
          <div className="w-full h-[3px] flex shrink-0">
            <div className="flex-1 bg-germany-black"></div>
            <div className="flex-1 bg-germany-red"></div>
            <div className="flex-1 bg-germany-gold"></div>
          </div>

          {/* Header */}
          <div className="p-5 border-b border-gray-200/80 flex items-start justify-between gap-4 bg-white">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-400">{query.id}</span>
                <span className="text-xs font-bold text-germany-black bg-gray-100 px-2 py-0.5 rounded">
                  {query.category}
                </span>
                {getStatusDot(query.status)}
              </div>
              <h2 className="text-base font-display font-bold text-germany-black leading-snug">
                {query.title}
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                From <strong className="text-germany-black">{query.raisedBy.name}</strong> ({query.raisedBy.role}) · {query.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {viewerRole === 'counsellor' && query.status !== 'escalated_to_admin' && query.status !== 'resolved' && (
                <button
                  onClick={() => setShowEscalateModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-germany-gold/20 hover:bg-germany-gold/30 text-germany-black text-xs font-bold border border-germany-gold/40 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-germany-red" />
                  <span>Escalate to Admin</span>
                </button>
              )}

              {(viewerRole === 'counsellor' || viewerRole === 'admin' || viewerRole === 'superadmin') && query.status !== 'resolved' && (
                <button
                  onClick={() => setShowResolvePrompt(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Simple Lifecycle Stepper */}
          <div className="px-5 py-2.5 bg-gray-50/80 border-b border-gray-200/70 flex items-center gap-2 text-[11px] text-gray-500 overflow-x-auto">
            <span className="font-bold text-germany-black">1. Raised</span>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className={query.status !== 'open' ? 'font-bold text-germany-black' : 'text-gray-400'}>
              2. Counsellor Review
            </span>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className={query.status === 'escalated_to_admin' || (query.status === 'resolved' && query.escalationInfo) ? 'font-bold text-germany-red' : 'text-gray-400'}>
              3. Admin Escalation
            </span>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className={query.status === 'resolved' ? 'font-bold text-emerald-600' : 'text-gray-400'}>
              4. Solved
            </span>
          </div>

          {/* Escalation Info Note */}
          {query.escalationInfo && (
            <div className="mx-5 mt-3 p-3 bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-500/40 rounded-xl text-xs text-red-900 dark:text-red-200">
              <span className="font-bold text-germany-red dark:text-[#FF6B7A]">Escalated to Admin by {query.escalationInfo.escalatedBy}:</span>{' '}
              {query.escalationInfo.reason}
              {query.escalationInfo.adminNotes && (
                <div className="text-[11px] text-red-700 dark:text-red-300 mt-1 font-medium bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-red-100 dark:border-red-500/20">
                  Note: {query.escalationInfo.adminNotes}
                </div>
              )}
            </div>
          )}

          {/* Resolution Info Note */}
          {query.resolutionInfo && (
            <div className="mx-5 mt-3 p-3 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/40 rounded-xl text-xs text-emerald-950 dark:text-emerald-200">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Resolved by {query.resolutionInfo.resolvedBy} ({query.resolutionInfo.role}):</span>{' '}
              <p className="mt-1 bg-white/70 dark:bg-black/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                {query.resolutionInfo.summary}
              </p>
            </div>
          )}

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar bg-[#FDFBF7]/30">
            {query.messages.map((m) => {
              const isStaff = m.sender.role === 'counsellor' || m.sender.role === 'admin' || m.sender.role === 'superadmin';

              return (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    m.isInternalNote
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/40 text-amber-950 dark:text-amber-200'
                      : isStaff
                      ? 'bg-white dark:bg-[#111622] border-gray-200 dark:border-gray-800/80 shadow-2xs text-gray-800 dark:text-gray-100'
                      : 'bg-white dark:bg-[#111622] border-gray-200 dark:border-gray-800/80 shadow-2xs text-gray-800 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-germany-black dark:text-white">{m.sender.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 capitalize">({m.sender.role})</span>
                      {m.isInternalNote && (
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Staff Only
                        </span>
                      )}
                    </div>
                    <span className="text-gray-400 dark:text-gray-400 font-medium">{m.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 pt-0.5 leading-relaxed">
                    {m.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Resolve Box */}
          {showResolvePrompt && (
            <div className="p-4 bg-emerald-50/60 border-t border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>Enter resolution summary</span>
                <button
                  type="button"
                  onClick={() => setShowResolvePrompt(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
              <textarea
                rows={2}
                value={resolutionSummary}
                onChange={(e) => setResolutionSummary(e.target.value)}
                placeholder="Explain the resolution or advice provided..."
                className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 resize-none font-medium"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleMarkResolved}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Confirm Resolution
                </button>
              </div>
            </div>
          )}

          {/* Reply Form */}
          {query.status !== 'resolved' && query.status !== 'closed' && (
            <div className="p-3.5 bg-white border-t border-gray-200/80">
              <form onSubmit={handleSendReply} className="space-y-2">
                {(viewerRole === 'admin' || viewerRole === 'superadmin' || viewerRole === 'counsellor') && (
                  <label className="flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={isInternalNote}
                      onChange={(e) => setIsInternalNote(e.target.checked)}
                      className="rounded border-gray-300 text-germany-red focus:ring-germany-red"
                    />
                    <span>Internal staff note (hidden from student)</span>
                  </label>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      isInternalNote
                        ? 'Type internal note...'
                        : 'Type your reply...'
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-germany-red bg-gray-50 focus:bg-white text-germany-black font-medium transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {showEscalateModal && (
        <EscalateQueryModal
          isOpen={showEscalateModal}
          onClose={() => setShowEscalateModal(false)}
          query={query}
          counsellorName={viewerName}
        />
      )}
    </>
  );
}
