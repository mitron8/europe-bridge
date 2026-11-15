"use client";

import React from 'react';
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  X,
  Lock,
  Send,
} from 'lucide-react';
import { formatChatTimestamp, formatFullTimestamp, formatDateDivider, isDifferentDay } from '@/lib/chatUtils';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  isInternalNote: boolean;
  content: string;
  isMe: boolean;
  createdAt: string;
}

export interface CounsellorTicketDetail {
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

interface CounsellorTicketThreadProps {
  ticketDetail: CounsellorTicketDetail | null;
  onCloseChat: () => void;
  onOpenEscalate: () => void;
  onOpenResolve: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
  activeInputTab: 'reply' | 'internal_note';
  setActiveInputTab: (val: 'reply' | 'internal_note') => void;
  replyText: string;
  setReplyText: (val: string) => void;
  isSendingReply: boolean;
  handleSendReply: (e: React.FormEvent) => void;
  internalNoteText: string;
  setInternalNoteText: (val: string) => void;
  isSendingNote: boolean;
  handleSendInternalNote: (e: React.FormEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function CounsellorTicketThread({
  ticketDetail,
  onCloseChat,
  onOpenEscalate,
  onOpenResolve,
  getStatusBadge,
  activeInputTab,
  setActiveInputTab,
  replyText,
  setReplyText,
  isSendingReply,
  handleSendReply,
  internalNoteText,
  setInternalNoteText,
  isSendingNote,
  handleSendInternalNote,
  messagesEndRef,
}: CounsellorTicketThreadProps) {
  if (!ticketDetail) {
    return (
      <div className="p-16 text-center text-sm font-medium text-gray-400 m-auto flex flex-col items-center gap-2">
        <MessageSquare className="w-10 h-10 text-gray-300 mb-1" />
        <p className="font-bold text-gray-700">No Inquiry Selected</p>
        <p className="text-xs text-gray-400 max-w-xs">
          Select a student query from the list on the left to view the conversation and reply.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Top action bar */}
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
              {ticketDetail.ticketNumber}
            </span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {ticketDetail.category}
            </span>
            {getStatusBadge(ticketDetail.status)}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-germany-black truncate">
            {ticketDetail.title}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Student: <strong className="text-gray-800">{ticketDetail.student.name}</strong> ({ticketDetail.student.email})
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {ticketDetail.status !== 'resolved' && (
            <>
              <button
                onClick={onOpenEscalate}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-germany-red font-bold text-xs rounded-xl border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Escalate</span>
              </button>

              <button
                onClick={onOpenResolve}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resolve</span>
              </button>
            </>
          )}

          {/* Close Chat Window button */}
          <button
            onClick={onCloseChat}
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
      <div className="p-5 space-y-3.5 bg-[#FAF9F6] dark:bg-[#0A0D14] flex-1 overflow-y-auto max-h-[420px] flex flex-col">
        {ticketDetail.messages.map((m, idx) => {
          const isMe = m.isMe; // sent by counsellor
          const isInternal = m.isInternalNote;
          const itemKey = m.id ? `${m.id}-${idx}` : `msg-${idx}`;
          const prevMsg = idx > 0 ? ticketDetail.messages[idx - 1] : null;
          const showDateDivider = isDifferentDay(prevMsg?.createdAt, m.createdAt);

          return (
            <React.Fragment key={itemKey}>
              {showDateDivider && (
                <div className="flex items-center justify-center my-2">
                  <span className="px-3 py-1 bg-gray-200/80 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-[10px] font-bold tracking-wide shadow-2xs">
                    {formatDateDivider(m.createdAt)}
                  </span>
                </div>
              )}
              {isInternal ? (
                <div
                  className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs leading-relaxed max-w-[90%] self-center my-1.5"
                >
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confidential Staff Note (Not visible to student)</span>
                    <span
                      className="text-amber-600 font-medium cursor-default"
                      title={formatFullTimestamp(m.createdAt)}
                    >
                      • {formatChatTimestamp(m.createdAt)}
                    </span>
                  </div>
                  <p className="whitespace-pre-line font-medium">
                    {m.content?.startsWith('[Encrypted message') ? (
                      <span className="italic opacity-80 text-xs flex items-center gap-1.5 py-0.5">
                        <Lock className="w-3.5 h-3.5 inline shrink-0" />
                        Encrypted legacy note
                      </span>
                    ) : (
                      m.content
                    )}
                  </p>
                </div>
              ) : (
                <div
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                    isMe ? 'self-end' : 'self-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium px-1 mb-1">
                    <span className="font-semibold text-gray-700">
                      {isMe ? 'You (Counsellor)' : ticketDetail.student.name}
                    </span>
                    <span>•</span>
                    <span
                      title={formatFullTimestamp(m.createdAt)}
                      className="cursor-default"
                    >
                      {formatChatTimestamp(m.createdAt)}
                    </span>
                  </div>

                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                      isMe
                        ? 'bg-blue-600 text-white font-medium rounded-tr-xs'
                        : 'bg-white border border-gray-200 text-gray-900 font-medium rounded-tl-xs'
                    }`}
                  >
                    {m.content?.startsWith('[Encrypted message') ? (
                      <span className="italic opacity-80 text-xs flex items-center gap-1.5 py-0.5">
                        <Lock className="w-3.5 h-3.5 inline shrink-0" />
                        Encrypted legacy message
                      </span>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
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
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 rounded-full text-sm text-germany-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-[#0E121A] focus:outline-none focus:border-blue-600 transition-all font-medium"
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
  );
}
