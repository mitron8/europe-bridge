"use client";

import React from 'react';
import {
  MessageSquare,
  Check,
  ArrowUpRight,
  X,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Send,
} from 'lucide-react';
import { formatChatTimestamp, formatFullTimestamp, formatDateDivider, isDifferentDay } from '@/lib/chatUtils';
import { AdminTicketDetails } from './types';

interface AdminTicketThreadProps {
  isLoadingDetails: boolean;
  ticketDetails: AdminTicketDetails | null;
  onCloseChat: () => void;
  onOpenResolveModal: () => void;
  onOpenEscalateModal: () => void;
  getPriorityBadge: (priority: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
  replyText: string;
  setReplyText: (val: string) => void;
  isInternalNote: boolean;
  setIsInternalNote: (val: boolean) => void;
  isSending: boolean;
  handleSendMessage: (e: React.FormEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function AdminTicketThread({
  isLoadingDetails,
  ticketDetails,
  onCloseChat,
  onOpenResolveModal,
  onOpenEscalateModal,
  getPriorityBadge,
  getStatusBadge,
  replyText,
  setReplyText,
  isInternalNote,
  setIsInternalNote,
  isSending,
  handleSendMessage,
  messagesEndRef,
}: AdminTicketThreadProps) {
  return (
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
                    onClick={onOpenResolveModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}

                {/* If ticket is in all queries and not yet escalated, admin can escalate it */}
                {ticketDetails.status !== 'escalated' && ticketDetails.status !== 'resolved' && ticketDetails.status !== 'closed' && (
                  <button
                    onClick={onOpenEscalateModal}
                    className="bg-germany-red hover:bg-[#D62839] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Escalate to Admin</span>
                  </button>
                )}

                {/* Close Chat Window Button */}
                <button
                  onClick={onCloseChat}
                  title="Close Chat Window"
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-lg transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h2 className="text-sm font-bold text-germany-black dark:text-white">{ticketDetails.title}</h2>

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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5] dark:bg-[#0B0E14]">
            {ticketDetails.messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">
                No messages recorded in this inquiry yet.
              </div>
            ) : (
              ticketDetails.messages.map((msg, idx) => {
                const itemKey = msg.id ? `${msg.id}-${idx}` : `msg-${idx}`;
                const prevMsg = idx > 0 ? ticketDetails.messages[idx - 1] : null;
                const showDateDivider = isDifferentDay(prevMsg?.createdAt, msg.createdAt);

                return (
                  <React.Fragment key={itemKey}>
                    {showDateDivider && (
                      <div className="flex items-center justify-center my-2">
                        <span className="px-3 py-1 bg-gray-200/80 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-[10px] font-bold tracking-wide shadow-2xs">
                          {formatDateDivider(msg.createdAt)}
                        </span>
                      </div>
                    )}
                    {msg.isInternalNote ? (
                      <div
                        className="mx-auto max-w-md bg-amber-50/90 border border-amber-300 text-amber-900 rounded-xl p-3 shadow-2xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-700" />
                            <span>CONFIDENTIAL STAFF NOTE</span>
                          </span>
                          <span
                            className="cursor-default text-amber-600"
                            title={formatFullTimestamp(msg.createdAt)}
                          >
                            {formatChatTimestamp(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-amber-950 whitespace-pre-wrap">{msg.content}</p>
                        <div className="text-[10px] text-amber-700 font-medium">By: {msg.senderName} ({msg.senderRole})</div>
                      </div>
                    ) : (
                      <div
                        className={`flex flex-col ${
                          msg.senderRole === 'admin' || msg.senderRole === 'superadmin' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-gray-400 mb-0.5 px-1">
                          {msg.senderRole === 'admin' || msg.senderRole === 'superadmin' ? 'You (Admin)' : `${msg.senderName} (${msg.senderRole})`}
                        </span>

                        <div
                          className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-2xs whitespace-pre-wrap ${
                            msg.senderRole === 'admin' || msg.senderRole === 'superadmin'
                              ? 'bg-slate-900 text-white rounded-br-xs'
                              : msg.senderRole === 'counsellor'
                              ? 'bg-red-50 text-germany-black border border-red-100 rounded-bl-xs'
                              : 'bg-white text-gray-900 border border-gray-200/80 rounded-bl-xs'
                          }`}
                        >
                          {msg.content}
                        </div>

                        <span
                          className="text-[9px] text-gray-400 mt-0.5 px-1 font-mono cursor-default"
                          title={formatFullTimestamp(msg.createdAt)}
                        >
                          {formatChatTimestamp(msg.createdAt)}
                        </span>
                      </div>
                    )}
                  </React.Fragment>
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
                  onClick={onOpenEscalateModal}
                  className="bg-germany-red hover:bg-[#D62839] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Escalate to Admin</span>
                </button>
              </div>
            ) : (
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
  );
}
