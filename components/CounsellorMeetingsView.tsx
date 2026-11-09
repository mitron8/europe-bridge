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
  Sparkles,
  Plus,
  Trash2,
  Check,
  RotateCw,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { MeetingBookingModal } from './MeetingBookingModal';

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

  // Outcome recording state
  const [isOutcomeOpen, setIsOutcomeOpen] = useState<boolean>(false);
  const [outcomeMeetingId, setOutcomeMeetingId] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<'attended' | 'no_show'>('attended');
  const [outcomeNotes, setOutcomeNotes] = useState<string>('');
  const [isSubmittingOutcome, setIsSubmittingOutcome] = useState<boolean>(false);

  // Cancellation state
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [cancelMeetingId, setCancelMeetingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [isSubmittingCancel, setIsSubmittingCancel] = useState<boolean>(false);

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

  // Decline Reschedule
  const handleDeclineReschedule = async (meetingId: string) => {
    const reason = prompt('Please enter a brief reason for declining the reschedule request:');
    if (reason === null) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${meetingId}/counsellor/decline-reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to decline reschedule');
      }
      setActionFeedback({ type: 'success', message: 'Reschedule declined. Existing meeting remains confirmed.' });
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    }
  };

  // Submit Outcome
  const handleSubmitOutcome = async () => {
    if (!outcomeMeetingId) return;
    setIsSubmittingOutcome(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${outcomeMeetingId}/counsellor/outcome`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          attendance,
          outcomeNotes: outcomeNotes.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to record meeting outcome');
      }
      setActionFeedback({ type: 'success', message: 'Meeting outcome recorded successfully.' });
      setIsOutcomeOpen(false);
      setOutcomeNotes('');
      fetchMeetingsAndAvailability();
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message });
    } finally {
      setIsSubmittingOutcome(false);
    }
  };

  // Submit Cancellation
  const handleSubmitCancel = async () => {
    if (!cancelMeetingId || !cancelReason.trim()) {
      alert('Please provide a reason for cancelling this meeting.');
      return;
    }
    setIsSubmittingCancel(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/meetings/${cancelMeetingId}/counsellor/cancel`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cancellationReason: cancelReason.trim() }),
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase text-gray-400">Scheduled Today</span>
          <div className="text-xl font-display font-extrabold text-germany-black dark:text-white">
            {meetingsData?.summary?.todayCount || 0} Sessions
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase text-gray-400">Upcoming Confirmed</span>
          <div className="text-xl font-display font-extrabold text-emerald-600 dark:text-emerald-400">
            {meetingsData?.summary?.upcomingCount || 0} Meetings
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase text-gray-400">Pending Actions</span>
          <div className="text-xl font-display font-extrabold text-amber-600 dark:text-amber-400">
            {meetingsData?.summary?.pendingActionsCount || 0} Actionable
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase text-gray-400">Standard Working Hours</span>
          <div className="text-xs font-extrabold text-germany-black dark:text-white mt-1">
            9 AM–12 PM & 2 PM–5 PM
          </div>
        </div>
      </div>

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
                  className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-extrabold text-sm text-germany-black dark:text-white">
                        {m.studentName || 'Student'}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {m.status}
                      </span>
                      {m.hasPendingReschedule && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          Reschedule Pending
                        </span>
                      )}
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
                        setOutcomeMeetingId(m.id);
                        setIsOutcomeOpen(true);
                      }}
                      className="neu-btn py-2 px-3 text-xs font-black text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl"
                    >
                      Record Outcome
                    </button>

                    <button
                      onClick={() => {
                        setCancelMeetingId(m.id);
                        setIsCancelOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-germany-red hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
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

            {(!meetingsData?.pendingReschedules || meetingsData.pendingReschedules.filter((m: any) => m.reschedule_proposed_by === 'student').length === 0) ? (
              <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-xs font-medium text-gray-500 text-center">
                No active student reschedule proposals.
              </div>
            ) : (
              meetingsData.pendingReschedules
                .filter((m: any) => m.reschedule_proposed_by === 'student')
                .map((m: any) => (
                  <div
                    key={m.id}
                    className="p-5 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-sm text-germany-black dark:text-white">
                          {m.studentName} requested to reschedule
                        </span>
                        <div className="text-xs font-bold text-gray-500 mt-0.5">
                          Current: {m.humanTime}
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                        30-Min Expiry
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#111622] rounded-xl border border-amber-300 dark:border-amber-800 text-xs space-y-1">
                      <div className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        Proposed Alternative: {m.pendingRescheduleHumanTime}
                      </div>
                      {m.reschedule_reason && (
                        <div className="text-gray-600 dark:text-gray-300 italic">
                          Reason: "{m.reschedule_reason}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleAcceptReschedule(m.id)}
                        className="neu-btn-primary py-1.5 px-4 text-xs font-black inline-flex items-center gap-1.5"
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
                        onClick={() => handleDeclineReschedule(m.id)}
                        className="neu-btn py-1.5 px-3.5 text-xs font-black text-gray-600 hover:text-germany-red rounded-xl"
                      >
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Pending Invitations Sent to Students */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Invitations Sent to Students (Waiting for Student Acceptance)
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
        /* Calendar & Availability Blocking Tab */
        <div className="space-y-6">
          <div className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
                  Rolling 3-Day Window Slots (Live Preview)
                </h3>
                <p className="text-xs text-gray-500">
                  Green slots are bookable by students. Blocked slots or meetings are marked unavailable.
                </p>
              </div>
              <button
                onClick={() => setIsBlockOpen(true)}
                className="neu-btn-primary px-3.5 py-2 text-xs font-black inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Availability Block</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availability?.days?.map((day: any) => (
                <div
                  key={day.dateString}
                  className="p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0E121A] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-gray-800 pb-2">
                    <span className="font-display font-extrabold text-xs text-germany-black dark:text-white">
                      {day.displayLabel}
                    </span>
                    {day.isSunday ? (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                        Sunday Closed
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Bookable
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {day.allSlots?.map((slot: any) => (
                      <div
                        key={slot.slotId}
                        className={`p-2 rounded-xl border text-xs flex items-center justify-between ${
                          slot.isAvailable
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                            : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400'
                        }`}
                      >
                        <span className="font-bold text-[11px]">{slot.label.split('–')[0]}</span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-black/30">
                          {slot.isAvailable ? 'Available' : slot.unavailableReason || 'Unavailable'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* History & Audit Logs Tab */
        <div className="space-y-3">
          {(!meetingsData?.history || meetingsData.history.length === 0) ? (
            <div className="p-12 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
              <h4 className="font-display font-extrabold text-sm text-germany-black dark:text-white">
                No Completed or Historical Meetings
              </h4>
              <p className="text-xs text-gray-500">Historical records from the past 90 days appear here.</p>
            </div>
          ) : (
            meetingsData.history.map((m: any) => (
              <div
                key={m.id}
                className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-germany-black dark:text-white">{m.studentName}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        m.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-800'
                          : m.status === 'NO_SHOW'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <div className="text-gray-500 font-bold">{m.humanTime}</div>
                  {m.outcome_notes && (
                    <div className="text-gray-600 dark:text-gray-300 italic">Notes: "{m.outcome_notes}"</div>
                  )}
                  {m.cancellation_reason && (
                    <div className="text-red-500 italic">Cancellation Reason: "{m.cancellation_reason}"</div>
                  )}
                </div>

                <div className="text-[10px] text-gray-400 font-bold">
                  ID: {m.id.slice(0, 8)}...
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Outcome Recording Modal */}
      {isOutcomeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
                Record Meeting Outcome
              </h3>
              <button onClick={() => setIsOutcomeOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500">Attendance</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setAttendance('attended')}
                    className={`py-2 px-3 rounded-xl border text-xs font-black transition-all ${
                      attendance === 'attended'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Student Attended
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('no_show')}
                    className={`py-2 px-3 rounded-xl border text-xs font-black transition-all ${
                      attendance === 'no_show'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    No Show
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-500">
                  Consultation Notes / Action Items
                </label>
                <textarea
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  placeholder="Summary of decisions, recommended university choices, or required documents..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-germany-red text-germany-black dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsOutcomeOpen(false)}
                className="neu-btn-secondary px-4 py-2 text-xs font-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOutcome}
                disabled={isSubmittingOutcome}
                className="neu-btn-primary px-5 py-2 text-xs font-black flex items-center gap-1.5"
              >
                {isSubmittingOutcome && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Outcome</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white text-germany-red">
                Cancel Meeting
              </h3>
              <button onClick={() => setIsCancelOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Cancelling will release the slot and notify the student. Please provide a clear cancellation reason.
            </p>

            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="e.g. Unforeseen academic committee commitment, please rebook via the dashboard..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 focus:ring-2 focus:ring-germany-red text-germany-black dark:text-white"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsCancelOpen(false)}
                className="neu-btn-secondary px-4 py-2 text-xs font-black"
              >
                Close
              </button>
              <button
                onClick={handleSubmitCancel}
                disabled={isSubmittingCancel || !cancelReason.trim()}
                className="neu-btn-primary bg-germany-red px-5 py-2 text-xs font-black flex items-center gap-1.5"
              >
                {isSubmittingCancel && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Availability Modal */}
      {isBlockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
                Block Counsellor Availability
              </h3>
              <button onClick={() => setIsBlockOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-black uppercase text-gray-500">Date (Rolling 3 Days)</label>
                <select
                  value={blockDate}
                  onChange={(e) => setBlockDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] mt-1 text-germany-black dark:text-white"
                >
                  {availability?.days?.filter((d: any) => !d.isSunday).map((d: any) => (
                    <option key={d.dateString} value={d.dateString}>
                      {d.displayLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allDayCheck"
                  checked={isAllDay}
                  onChange={(e) => setIsAllDay(e.target.checked)}
                  className="rounded text-germany-red focus:ring-germany-red"
                />
                <label htmlFor="allDayCheck" className="font-bold text-gray-700 dark:text-gray-300">
                  Block entire day (All morning & afternoon slots)
                </label>
              </div>

              {!isAllDay && (
                <div>
                  <label className="font-black uppercase text-gray-500">Select 1-Hour Slot</label>
                  <select
                    value={blockStartHour}
                    onChange={(e) => setBlockStartHour(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] mt-1 text-germany-black dark:text-white"
                  >
                    <option value={9}>9:00 AM – 10:00 AM</option>
                    <option value={10}>10:00 AM – 11:00 AM</option>
                    <option value={11}>11:00 AM – 12:00 PM</option>
                    <option value={14}>2:00 PM – 3:00 PM</option>
                    <option value={15}>3:00 PM – 4:00 PM</option>
                    <option value={16}>4:00 PM – 5:00 PM</option>
                  </select>
                </div>
              )}

              <div>
                <label className="font-black uppercase text-gray-500">Reason (Optional)</label>
                <input
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="e.g. Internal Training, Personal Break, Leave"
                  className="w-full p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] mt-1 text-germany-black dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBlockOpen(false)}
                className="neu-btn-secondary px-4 py-2 text-xs font-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBlock}
                disabled={isSubmittingBlock}
                className="neu-btn-primary px-5 py-2 text-xs font-black flex items-center gap-1.5"
              >
                {isSubmittingBlock && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Block</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
          currentMeetingHumanTime={selectedMeeting.humanTime}
          studentUserId={selectedMeeting.student_user_id}
          studentName={selectedMeeting.studentName}
        />
      )}
    </div>
  );
}

