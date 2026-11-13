'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  User,
  ShieldCheck,
  Ban,
  ArrowRight,
  Info,
  CalendarDays,
  Plus,
  Trash2,
  Check,
  RotateCw,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { MeetingBookingModal } from './MeetingBookingModal';
import {
  CounsellorCancelModal,
  CounsellorDeclineRescheduleModal,
  CounsellorBlockSlotModal,
} from './meetings/CounsellorMeetingModals';
import { CounsellorMeetingsAvailabilityTab } from './meetings/CounsellorMeetingsAvailabilityTab';
import { CounsellorMeetingsHistoryTab } from './meetings/CounsellorMeetingsHistoryTab';
import { CounsellorMeetingsStats } from './meetings/CounsellorMeetingsStats';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export function CounsellorMeetingsView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [meetingsData, setMeetingsData] = useState<any>(null);
  const [availability, setAvailability] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'availability' | 'history'>('upcoming');
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals state
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);
  const [rescheduleMode, setRescheduleMode] = useState<'reschedule' | 'counterproposal'>('reschedule');

  // Cancellation state
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [cancelMeetingId, setCancelMeetingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [isSubmittingCancel, setIsSubmittingCancel] = useState<boolean>(false);

  // Delete Reschedule Modal state
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    isOpen: boolean;
    meetingId: string | null;
    title: string;
    message: string;
    reason: string;
    isSubmitting: boolean;
  }>({
    isOpen: false,
    meetingId: null,
    title: '',
    message: '',
    reason: '',
    isSubmitting: false,
  });

  // Block slot state
  const [isBlockOpen, setIsBlockOpen] = useState<boolean>(false);
  const [blockDate, setBlockDate] = useState<string>('');
  const [blockStartHour, setBlockStartHour] = useState<number>(9);
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>('');
  const [isSubmittingBlock, setIsSubmittingBlock] = useState<boolean>(false);

  const fetchMeetingsAndAvailability = async () => {
    setLoading(true);
    setActionFeedback(null);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const [overviewRes, availRes] = await Promise.all([
        fetch(`${API_BASE}/meetings/counsellor/overview`, {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/meetings/availability`, {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (overviewRes.ok) {
        const oData = await overviewRes.json();
        setMeetingsData(oData);
      }
      if (availRes.ok) {
        const aData = await availRes.json();
        setAvailability(aData);
        if (aData.days && aData.days[0]) {
          setBlockDate(aData.days[0].dateString);
        }
      }
    } catch (err: any) {
      console.error('Failed to load meetings data', err);
      setActionFeedback({ type: 'error', message: err.message || 'Failed to load meetings data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetingsAndAvailability();
  }, []);

  // Accept Reschedule
  const handleAcceptReschedule = async (meetingId: string) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${meetingId}/counsellor/accept-reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to accept reschedule');
      }
      setActionFeedback({ type: 'success', message: 'Rescheduled meeting accepted and confirmed!' });
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    }
  };

  // Open Decline Reschedule Modal
  const handleOpenDeclineRescheduleModal = (meetingId: string, isProposalByCounsellor: boolean) => {
    setConfirmDeleteModal({
      isOpen: true,
      meetingId,
      title: isProposalByCounsellor ? 'Withdraw Reschedule Proposal?' : 'Decline Reschedule Proposal?',
      message: 'Declining or withdrawing this reschedule proposal will completely delete this meeting schedule from the calendar. The student can book a fresh slot anytime later.',
      reason: '',
      isSubmitting: false,
    });
  };

  const executeDeclineReschedule = async () => {
    if (!confirmDeleteModal.meetingId) return;
    setConfirmDeleteModal((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${confirmDeleteModal.meetingId}/counsellor/decline-reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason: confirmDeleteModal.reason.trim() || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to decline reschedule');
      }
      setActionFeedback({
        type: 'success',
        message: 'Reschedule declined and meeting schedule completely deleted. A new slot can be booked anytime.',
      });
      setConfirmDeleteModal((prev) => ({ ...prev, isOpen: false }));
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
      setConfirmDeleteModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Submit Cancellation
  const handleSubmitCancel = async () => {
    if (!cancelMeetingId || !cancelReason.trim()) {
      setActionFeedback({ type: 'error', message: 'Please provide a reason for cancelling this meeting.' });
      return;
    }
    setIsSubmittingCancel(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${cancelMeetingId}/counsellor/cancel`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          reason: cancelReason.trim(),
          cancellationReason: cancelReason.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to cancel meeting');
      }
      setActionFeedback({ type: 'success', message: 'Meeting cancelled. Slot has been freed.' });
      setIsCancelOpen(false);
      setCancelReason('');
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    } finally {
      setIsSubmittingCancel(false);
    }
  };

  // Submit Availability Block
  const handleSubmitBlock = async () => {
    if (!blockDate) {
      alert('Please select a date to block.');
      return;
    }
    setIsSubmittingBlock(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/counsellor/blocks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          dateString: blockDate,
          startHour: isAllDay ? undefined : blockStartHour,
          isAllDay,
          reason: blockReason.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to create availability block');
      }
      setActionFeedback({ type: 'success', message: 'Availability block created successfully.' });
      setIsBlockOpen(false);
      setBlockReason('');
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    } finally {
      setIsSubmittingBlock(false);
    }
  };

  // Delete Block
  const handleDeleteBlock = async (blockId: string) => {
    if (!confirm('Are you sure you want to restore availability for this slot?')) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/counsellor/blocks/${blockId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to remove block');
      }
      setActionFeedback({ type: 'success', message: 'Slot availability restored.' });
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-germany-red/10 dark:bg-red-950/40 rounded-xl text-germany-red">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-extrabold text-germany-black dark:text-white">
              Counsellor Meeting Hub & Consultations
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
            Manage your 1-hour student strategy meetings, availability blocks, and reschedule proposals. Timezone: <strong>Asia/Kolkata (IST)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setIsBlockOpen(true)}
            className="neu-btn-secondary px-4 py-2 text-xs font-black inline-flex items-center gap-1.5"
          >
            <Ban className="w-3.5 h-3.5 text-germany-red" />
            <span>Block Availability</span>
          </button>

          <button
            onClick={fetchMeetingsAndAvailability}
            title="Refresh Meetings"
            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inline Feedback Banner */}
      {actionFeedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold animate-in fade-in duration-150 ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/60'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-germany-red" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Stats Metric Pills */}
      <CounsellorMeetingsStats meetingsData={meetingsData} />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gray-100 dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800 w-fit flex-wrap">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Upcoming Meetings</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 dark:bg-black/10">
            {meetingsData?.upcoming?.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Actions</span>
          {(meetingsData?.pendingReschedules?.length > 0 || meetingsData?.pendingInvitations?.length > 0) && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-extrabold">
              {(meetingsData?.pendingReschedules?.length || 0) + (meetingsData?.pendingInvitations?.length || 0)}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('availability')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'availability'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Calendar & Blocks</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>History & Logs</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 dark:bg-black/10">
            {meetingsData?.history?.length || 0}
          </span>
        </button>
      </div>

      {/* Main Tab Content */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading meeting hub...</p>
        </div>
      ) : activeTab === 'upcoming' ? (
        /* Upcoming Tab */
        <div className="space-y-4">
          {(!meetingsData?.upcoming || meetingsData.upcoming.length === 0) ? (
            <div className="p-12 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
              <Calendar className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
              <h4 className="font-display font-extrabold text-sm text-germany-black dark:text-white">
                No Upcoming Meetings Scheduled
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Students can book available slots within the 3-day window, or you can invite students directly from their detail modal.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {meetingsData.upcoming.map((m: any) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all bg-white dark:bg-[#111622] border-gray-200/80 dark:border-gray-800"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-extrabold text-sm text-germany-black dark:text-white">
                        {m.studentName || 'Student'}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Confirmed
                      </span>
                    </div>

                    <div className="text-xs font-bold text-germany-red flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{m.humanTime}</span>
                    </div>

                    {m.agenda && (
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Topic: <strong>{m.agenda}</strong>
                      </div>
                    )}
                    {m.notes && (
                      <div className="text-[11px] text-gray-500 italic max-w-xl">
                        Notes: "{m.notes}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    {m.meeting_link && (
                      <a
                        href={m.meeting_link}
                        target="_blank"
                        rel="noreferrer"
                        className="neu-btn-primary py-2 px-3.5 text-xs font-black inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Meet</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setSelectedMeeting(m);
                        setRescheduleMode('reschedule');
                        setIsRescheduleOpen(true);
                      }}
                      className="neu-btn-secondary py-2 px-3 text-xs font-black inline-flex items-center gap-1"
                    >
                      <span>Reschedule</span>
                    </button>

                    <button
                      onClick={() => {
                        setCancelMeetingId(m.id);
                        setIsCancelOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-germany-red hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                      title="Cancel Meeting"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'pending' ? (
        /* Pending Actions Tab */
        <div className="space-y-6">
          {/* Pending Reschedules requested by student */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Reschedule Proposals Awaiting Your Response
            </h3>

            {(!meetingsData?.pendingReschedules || meetingsData.pendingReschedules.filter((m: any) => m.isAwaitingMyAcceptance || m.rescheduleProposedBy === 'student').length === 0) ? (
              <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-xs font-medium text-gray-500 text-center">
                No active student reschedule proposals.
              </div>
            ) : (
              meetingsData.pendingReschedules
                .filter((m: any) => m.isAwaitingMyAcceptance || m.rescheduleProposedBy === 'student')
                .map((m: any) => (
                  <div
                    key={m.id}
                    className="p-5 bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-300 dark:border-amber-800/60 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-sm text-germany-black dark:text-white">
                          {m.studentName} requested to reschedule
                        </span>
                        {m.originalTime && (
                          <div className="text-xs font-bold text-gray-500 mt-0.5">
                            Original Slot: <span className="line-through">{m.originalTime}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-400 w-fit">
                        Pending Acceptance
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#111622] rounded-xl border border-amber-300 dark:border-amber-800 text-xs space-y-1">
                      <div className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>New Proposed Slot: {m.humanTime}</span>
                      </div>
                      {m.reschedule_note && (
                        <div className="text-gray-600 dark:text-gray-300 italic">
                          Reason: "{m.reschedule_note}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleAcceptReschedule(m.id)}
                        className="neu-btn-primary py-1.5 px-4 text-xs font-black inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Proposed Time</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMeeting(m);
                          setRescheduleMode('counterproposal');
                          setIsRescheduleOpen(true);
                        }}
                        className="neu-btn-secondary py-1.5 px-3.5 text-xs font-black inline-flex items-center gap-1.5"
                      >
                        <span>Propose Counter-Slot</span>
                      </button>

                      <button
                        onClick={() => handleOpenDeclineRescheduleModal(m.id, false)}
                        className="neu-btn py-1.5 px-3.5 text-xs font-black text-gray-600 hover:text-germany-red rounded-xl cursor-pointer"
                      >
                        <span>Decline & Delete Schedule</span>
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Reschedules Proposed by Counsellor (Waiting for student) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Reschedules Proposed by You (Waiting for Student Acceptance)
            </h3>

            {(!meetingsData?.pendingReschedules || meetingsData.pendingReschedules.filter((m: any) => m.isAwaitingOtherAcceptance || m.rescheduleProposedBy === 'counsellor').length === 0) ? (
              <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-xs font-medium text-gray-500 text-center">
                No proposals waiting for student acceptance.
              </div>
            ) : (
              meetingsData.pendingReschedules
                .filter((m: any) => m.isAwaitingOtherAcceptance || m.rescheduleProposedBy === 'counsellor')
                .map((m: any) => (
                  <div
                    key={m.id}
                    className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-sm text-germany-black dark:text-white">
                          With {m.studentName}
                        </span>
                        {m.originalTime && (
                          <div className="text-xs font-medium text-gray-500 mt-0.5">
                            Original Slot: <span className="line-through">{m.originalTime}</span>
                          </div>
                        )}
                        <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                          Proposed New Slot: {m.humanTime}
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                        Waiting for Student
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setSelectedMeeting(m);
                          setRescheduleMode('reschedule');
                          setIsRescheduleOpen(true);
                        }}
                        className="neu-btn-secondary py-1.5 px-3 text-xs font-black inline-flex items-center gap-1"
                      >
                        <span>Change Slot</span>
                      </button>

                      <button
                        onClick={() => handleOpenDeclineRescheduleModal(m.id, true)}
                        className="neu-btn py-1.5 px-3 text-xs font-black text-gray-500 hover:text-germany-red rounded-xl cursor-pointer"
                      >
                        <span>Withdraw & Delete Schedule</span>
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Pending Invitations Sent to Students */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Invitations Sent to Students
            </h3>

            {(!meetingsData?.pendingInvitations || meetingsData.pendingInvitations.length === 0) ? (
              <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-xs font-medium text-gray-500 text-center">
                No pending invitations awaiting student acceptance.
              </div>
            ) : (
              meetingsData.pendingInvitations.map((m: any) => (
                <div
                  key={m.id}
                  className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-germany-black dark:text-white">
                        {m.studentName}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                        Pending Student Acceptance
                      </span>
                    </div>
                    <div className="text-xs font-bold text-germany-red">{m.humanTime}</div>
                    {m.agenda && <div className="text-xs text-gray-500">Topic: {m.agenda}</div>}
                  </div>

                  <button
                    onClick={() => {
                      setCancelMeetingId(m.id);
                      setIsCancelOpen(true);
                    }}
                    className="neu-btn-secondary py-1.5 px-3 text-xs font-black text-gray-500 hover:text-germany-red"
                  >
                    Withdraw Invitation
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeTab === 'availability' ? (
        <CounsellorMeetingsAvailabilityTab
          availability={availability}
          onOpenBlockModal={() => setIsBlockOpen(true)}
        />
      ) : (
        <CounsellorMeetingsHistoryTab
          meetingsData={meetingsData}
        />
      )}


      {/* Cancellation Modal */}
      <CounsellorCancelModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        isSubmittingCancel={isSubmittingCancel}
        onSubmit={handleSubmitCancel}
      />

      {/* Delete / Decline Reschedule Modal */}
      <CounsellorDeclineRescheduleModal
        modalState={confirmDeleteModal}
        setModalState={setConfirmDeleteModal}
        onConfirm={executeDeclineReschedule}
      />

      {/* Block Availability Modal */}
      <CounsellorBlockSlotModal
        isOpen={isBlockOpen}
        onClose={() => setIsBlockOpen(false)}
        availability={availability}
        blockDate={blockDate}
        setBlockDate={setBlockDate}
        isAllDay={isAllDay}
        setIsAllDay={setIsAllDay}
        blockStartHour={blockStartHour}
        setBlockStartHour={setBlockStartHour}
        blockReason={blockReason}
        setBlockReason={setBlockReason}
        isSubmittingBlock={isSubmittingBlock}
        onSubmit={handleSubmitBlock}
      />

      {/* Reschedule Modal */}
      {isRescheduleOpen && selectedMeeting && (
        <MeetingBookingModal
          isOpen={isRescheduleOpen}
          onClose={() => {
            setIsRescheduleOpen(false);
            setSelectedMeeting(null);
          }}
          onSuccess={() => {
            setIsRescheduleOpen(false);
            setSelectedMeeting(null);
            fetchMeetingsAndAvailability();
          }}
          mode={rescheduleMode}
          userRole="counsellor"
          existingMeetingId={selectedMeeting.id}
          currentMeetingHumanTime={selectedMeeting.displayTime || selectedMeeting.humanTime}
          counsellorId={selectedMeeting.counsellor_user_id}
          studentUserId={selectedMeeting.student_user_id}
          studentName={selectedMeeting.studentName}
        />
      )}
    </div>
  );
}

