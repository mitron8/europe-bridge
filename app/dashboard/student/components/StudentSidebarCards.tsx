"use client";

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  AlertCircle,
  LayoutGrid,
  Lightbulb,
  Mail,
  UploadCloud,
  User,
  UserCheck,
  Video,
  X,
  Zap,
} from 'lucide-react';

interface AssignedCounsellorInfo {
  id?: string | number;
  name?: string;
  role?: string;
  email?: string;
}

interface UpcomingMeetingItem {
  id?: string | number;
  status: string;
  humanTime?: string;
  displayTime?: string;
  meeting_link?: string;
}

interface CounsellorExpertCardProps {
  assignedCounsellor: AssignedCounsellorInfo | null;
  upcomingMeeting?: UpcomingMeetingItem | null;
  pendingReschedule?: any | null;
  pendingInvitation?: any | null;
  meetingFeedback?: { type: 'success' | 'error'; message: string } | null;
  onDismissFeedback?: () => void;
  onBookMeeting: () => void;
  onAcceptReschedule?: (id: string) => void;
  onDeclineReschedule?: (id: string, isProposalByCounsellor: boolean) => void;
  onCounterReschedule?: (meeting: any) => void;
  onAcceptInvitation?: (id: string) => void;
  onDeclineInvitation?: (id: string) => void;
  onCancelMeeting?: (id: string) => void;
  onRescheduleMeeting?: (meeting: any) => void;
}

export function CounsellorExpertCard({
  assignedCounsellor,
  upcomingMeeting,
  pendingReschedule,
  pendingInvitation,
  meetingFeedback,
  onDismissFeedback,
  onBookMeeting,
  onAcceptReschedule,
  onDeclineReschedule,
  onCounterReschedule,
  onAcceptInvitation,
  onDeclineInvitation,
  onCancelMeeting,
  onRescheduleMeeting,
}: CounsellorExpertCardProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Your Germany Expert</h3>
      </div>

      {assignedCounsellor ? (
        <>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-100 text-[#E63946] dark:bg-red-950/50 dark:text-red-400 font-bold text-sm flex items-center justify-center shrink-0">
              {assignedCounsellor.name
                ? assignedCounsellor.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
                : 'NA'}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                {assignedCounsellor.name || 'NA'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {assignedCounsellor.role || 'EuropeBridge Senior Counsellor'}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Directly Connected</span>
            </div>
            {assignedCounsellor.email ? (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{assignedCounsellor.email}</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">NA</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 font-bold text-sm flex items-center justify-center shrink-0">
              NA
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                NA
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Advisor Allocation Pending
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              <span>Assigned upon plan activation</span>
            </div>
          </div>
        </>
      )}

      {/* Inline Feedback Banner */}
      {meetingFeedback && (
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold animate-in fade-in ${
            meetingFeedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {meetingFeedback.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
            )}
            <span>{meetingFeedback.message}</span>
          </div>
          {onDismissFeedback && (
            <button
              type="button"
              onClick={onDismissFeedback}
              className="opacity-70 hover:opacity-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 1. Pending Reschedule Section */}
      {pendingReschedule && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-300 dark:border-amber-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-extrabold text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {pendingReschedule.isAwaitingMyAcceptance ||
                pendingReschedule.rescheduleProposedBy === 'counsellor'
                  ? 'Reschedule Request from Advisor'
                  : 'Your Reschedule Request Pending'}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300 dark:bg-amber-900/60 dark:text-amber-200">
              {pendingReschedule.isAwaitingMyAcceptance ||
              pendingReschedule.rescheduleProposedBy === 'counsellor'
                ? 'Action Required'
                : 'Pending Advisor'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-900 dark:text-white">
              Proposed Slot: <span className="text-[#E63946]">{pendingReschedule.humanTime || pendingReschedule.displayTime}</span>
            </div>
            {pendingReschedule.originalTime && (
              <div className="text-[11px] text-gray-500">
                Original Slot: <span className="line-through">{pendingReschedule.originalTime}</span>
              </div>
            )}
            {pendingReschedule.reschedule_note && (
              <div className="text-[11px] text-gray-600 dark:text-gray-300 italic">
                "{pendingReschedule.reschedule_note}"
              </div>
            )}
          </div>

          {pendingReschedule.isAwaitingMyAcceptance ||
          pendingReschedule.rescheduleProposedBy === 'counsellor' ? (
            <div className="flex items-center gap-1.5 pt-1 flex-wrap">
              {onAcceptReschedule && (
                <button
                  type="button"
                  onClick={() => onAcceptReschedule(pendingReschedule.id)}
                  className="flex-1 py-1.5 px-2.5 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-3 h-3" />
                  <span>Accept Time</span>
                </button>
              )}
              {onCounterReschedule && (
                <button
                  type="button"
                  onClick={() => onCounterReschedule(pendingReschedule)}
                  className="py-1.5 px-2 text-[11px] font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#151B27] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span>Counter-Slot</span>
                </button>
              )}
              {onDeclineReschedule && (
                <button
                  type="button"
                  onClick={() => onDeclineReschedule(pendingReschedule.id, true)}
                  className="py-1.5 px-2 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#E63946] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Decline and delete schedule"
                >
                  <span>Decline & Delete</span>
                </button>
              )}
            </div>
          ) : (
            <div className="pt-1">
              {onDeclineReschedule && (
                <button
                  type="button"
                  onClick={() => onDeclineReschedule(pendingReschedule.id, false)}
                  className="w-full py-1.5 px-2.5 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#E63946] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                  <span>Withdraw Request & Delete Schedule</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. Pending Counsellor Invitation Section */}
      {pendingInvitation && !pendingReschedule && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-200 font-extrabold text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Meeting Invitation</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 border border-blue-300 dark:bg-blue-900/60 dark:text-blue-200">
              Invited
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
              {pendingInvitation.humanTime || pendingInvitation.displayTime}
            </p>
            {(pendingInvitation.agenda || pendingInvitation.topic) && (
              <div className="text-[11px] text-gray-600 dark:text-gray-300">
                Topic: <strong>{pendingInvitation.agenda || pendingInvitation.topic}</strong>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            {onAcceptInvitation && (
              <button
                type="button"
                onClick={() => onAcceptInvitation(pendingInvitation.id)}
                className="flex-1 py-1.5 px-2.5 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>Accept Invitation</span>
              </button>
            )}
            {onDeclineInvitation && (
              <button
                type="button"
                onClick={() => onDeclineInvitation(pendingInvitation.id)}
                className="py-1.5 px-2.5 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#E63946] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <span>Decline</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Confirmed Meeting Section */}
      {upcomingMeeting && !pendingReschedule && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200 font-bold text-[11px]">
            <span>Confirmed Meeting</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
              {upcomingMeeting.status}
            </span>
          </div>
          <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
            {upcomingMeeting.humanTime || upcomingMeeting.displayTime}
          </p>
          {upcomingMeeting.meeting_link && (
            <a
              href={upcomingMeeting.meeting_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#E63946] font-bold text-xs hover:underline pt-0.5 block"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Video Meeting</span>
            </a>
          )}
          <div className="flex items-center gap-2 pt-1 border-t border-emerald-200/60 dark:border-emerald-800/40">
            {onRescheduleMeeting && (
              <button
                type="button"
                onClick={() => onRescheduleMeeting(upcomingMeeting)}
                className="flex-1 py-1 px-2 text-[11px] font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-center"
              >
                Reschedule
              </button>
            )}
            {onCancelMeeting && (
              <button
                type="button"
                onClick={() => onCancelMeeting(String(upcomingMeeting.id))}
                className="py-1 px-2 text-[11px] font-bold text-gray-500 hover:text-[#E63946] dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Book Strategy Meeting Button (when no meeting or proposal is currently active) */}
      {!upcomingMeeting && !pendingReschedule && !pendingInvitation && (
        <button
          type="button"
          onClick={onBookMeeting}
          className="w-full bg-[#E63946] hover:bg-[#D62839] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Strategy Meeting</span>
        </button>
      )}
    </div>
  );
}

export function QuickActionsCard() {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 shadow-xs space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Actions</h3>
      </div>

      <div className="space-y-2">
        <Link
          href="/dashboard/student/complete-profile"
          className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Update My Profile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
        </Link>

        <Link
          href="/dashboard/student/documents"
          className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Upload Documents</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
        </Link>

        <Link
          href="/dashboard/student/aps"
          className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <CheckSquare className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Check APS Checklist</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
        </Link>

        <Link
          href="/dashboard/student/services"
          className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Explore Services</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
        </Link>
      </div>
    </div>
  );
}

export function TipForYouCard() {
  return (
    <div className="bg-[#FFF5F5] dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-2xl p-5 space-y-2">
      <div className="flex items-center gap-2 text-[#E63946]">
        <Lightbulb className="w-4 h-4" />
        <h4 className="text-xs font-bold uppercase tracking-wider">Tip for You</h4>
      </div>
      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
        Complete your document approvals early to avoid last-minute delays.
      </p>
    </div>
  );
}
