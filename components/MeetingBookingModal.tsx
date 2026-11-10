'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  User,
  ArrowRight,
  Check,
  FileText,
  ChevronDown,
  Ban,
} from 'lucide-react';

export interface MeetingSlot {
  slotId: string;
  startHour: number;
  endHour: number;
  session: 'morning' | 'afternoon';
  label: string;
  startUtc: string;
  endUtc: string;
  isAvailable: boolean;
  unavailableReason?: string;
}

export interface BookingDay {
  dateString: string;
  displayLabel: string;
  dayName: string;
  isSunday: boolean;
  isToday: boolean;
  morningSlots: MeetingSlot[];
  afternoonSlots: MeetingSlot[];
  allSlots: MeetingSlot[];
}

export interface AvailabilityData {
  counsellor: {
    id: string;
    name: string;
    email: string;
  };
  timezone: string;
  windowDates: {
    dateString: string;
    displayLabel: string;
    dayName: string;
    isSunday: boolean;
    isToday: boolean;
  }[];
  days: BookingDay[];
}

interface MeetingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (meeting: any) => void;
  counsellorId?: string;
  counsellorName?: string;
  studentUserId?: string;
  studentName?: string;
  mode?: 'student_book' | 'counsellor_invite' | 'reschedule' | 'counterproposal';
  userRole?: 'student' | 'counsellor';
  existingMeetingId?: string;
  currentMeetingHumanTime?: string;
}

const COMMON_AGENDAS = [
  'University Shortlisting & Profile Review',
  'APS India Certificate Verification',
  'Statement of Purpose (SOP) & LOR Review',
  'German Student Visa & Blocked Account',
  'General Admission Consultation',
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export function MeetingBookingModal({
  isOpen,
  onClose,
  onSuccess,
  counsellorId,
  counsellorName,
  studentUserId,
  studentName,
  mode = 'student_book',
  userRole = 'student',
  existingMeetingId,
  currentMeetingHumanTime,
}: MeetingBookingModalProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);
  const [selectedAgendas, setSelectedAgendas] = useState<string[]>([
    'University Shortlisting & Profile Review',
  ]);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  // Fetch dynamic availability
  const fetchAvailability = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const queryParam = counsellorId ? `?counsellorId=${encodeURIComponent(counsellorId)}` : '';
      const res = await fetch(`${API_BASE}/meetings/availability${queryParam}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to fetch counsellor schedule');
      }

      const data: AvailabilityData = await res.json();
      setAvailability(data);

      // Auto-select first bookable day
      const firstBookableIdx = data.days.findIndex((d) => !d.isSunday);
      setSelectedDateIdx(firstBookableIdx >= 0 ? firstBookableIdx : 0);
      setSelectedSlot(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to load schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSuccessData(null);
      setErrorMessage(null);
      setSelectedSlot(null);
      setNotes('');
      setSelectedAgendas(['University Shortlisting & Profile Review']);
      fetchAvailability();
    }
  }, [isOpen, counsellorId]);

  if (!isOpen) return null;

  const currentDay: BookingDay | undefined = availability?.days?.[selectedDateIdx];

  const handleSlotSelect = (slot: MeetingSlot) => {
    if (!slot.isAvailable) return;
    setSelectedSlot(slot);
    setErrorMessage(null);
  };

  const toggleAgenda = (item: string) => {
    setSelectedAgendas((prev) => {
      if (prev.includes(item)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((a) => a !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSubmit = async () => {
    if (!currentDay || !selectedSlot) {
      setErrorMessage('Please select a date and an available 1-hour time slot.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const agendaString = selectedAgendas.join(', ') || 'General Admission Consultation';

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      let endpoint = '';
      let method = 'POST';
      let payload: any = {};

      if (mode === 'student_book') {
        endpoint = `${API_BASE}/meetings/book`;
        payload = {
          counsellorUserId: availability?.counsellor?.id || counsellorId,
          dateString: currentDay.dateString,
          startHour: selectedSlot.startHour,
          agenda: agendaString,
          notes: notes.trim() || undefined,
        };
      } else if (mode === 'counsellor_invite') {
        if (!studentUserId) {
          throw new Error('Student user ID is required to send an invitation.');
        }
        endpoint = `${API_BASE}/meetings/counsellor/invite`;
        payload = {
          studentUserId,
          dateString: currentDay.dateString,
          startHour: selectedSlot.startHour,
          agenda: agendaString,
          notes: notes.trim() || undefined,
        };
      } else if (mode === 'reschedule') {
        if (!existingMeetingId) {
          throw new Error('Missing meeting ID for reschedule.');
        }
        endpoint =
          userRole === 'counsellor'
            ? `${API_BASE}/meetings/${existingMeetingId}/counsellor/reschedule`
            : `${API_BASE}/meetings/${existingMeetingId}/student/reschedule`;
        payload = {
          newDateString: currentDay.dateString,
          newStartHour: selectedSlot.startHour,
          reason: notes.trim() || agendaString,
        };
      } else if (mode === 'counterproposal') {
        if (!existingMeetingId) {
          throw new Error('Missing meeting ID for counterproposal.');
        }
        endpoint =
          userRole === 'counsellor'
            ? `${API_BASE}/meetings/${existingMeetingId}/counsellor/counterproposal`
            : `${API_BASE}/meetings/${existingMeetingId}/student/counterproposal`;
        payload = {
          newDateString: currentDay.dateString,
          newStartHour: selectedSlot.startHour,
          reason: notes.trim() || agendaString,
        };
      }

      const res = await fetch(endpoint, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409 || data.message?.includes('booked')) {
          setErrorMessage(
            data.message ||
              'This slot was just booked by another student. Availability has been refreshed. Please select another slot.',
          );
          await fetchAvailability();
          return;
        }
        throw new Error(data.message || 'Failed to submit meeting request');
      }

      setSuccessData(data);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to book slot. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const effectiveCounsellorName =
    availability?.counsellor?.name || counsellorName || 'Counsellor User';

  const formatDayDate = (day: BookingDay) => {
    try {
      const d = new Date(day.dateString);
      if (!isNaN(d.getTime())) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${d.getDate()} ${monthNames[d.getMonth()]}`;
      }
    } catch {}
    const raw = day.displayLabel.split('(')[1]?.replace(')', '');
    return raw || day.dateString.slice(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/90 dark:border-gray-800 shadow-2xl w-full max-w-4xl overflow-hidden my-4 sm:my-6 relative">
        {/* Top Header Card with Reichstag Building Graphic */}
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between relative overflow-hidden">
          {/* Header Left Info */}
          <div className="flex items-start gap-3.5 z-10 max-w-lg">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/60 text-[#E63946] flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                  {mode === 'counsellor_invite'
                    ? `Invite Student to Meeting`
                    : mode === 'reschedule' || mode === 'counterproposal'
                    ? 'Reschedule Strategy Session'
                    : 'Book 1-on-1 Counselling Session'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E63946] bg-red-50 dark:bg-red-950/50 border border-red-200/70 dark:border-red-900/60 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span>IST (Asia/Kolkata)</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                {mode === 'counsellor_invite'
                  ? `Inviting student: ${studentName || 'Assigned Student'}`
                  : `Meet with our counsellor for a personalised 60-minute session.`}
              </p>
            </div>
          </div>

          {/* Header Right Graphic (German Reichstag Building) */}
          <div className="hidden md:block relative h-24 w-64 shrink-0 -my-6 -mr-6 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-[#111622] to-transparent z-10" />
            <Image
              src="/images/germany-header.jpg"
              alt="Germany"
              fill
              className="object-cover object-right"
              priority
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Meeting Info Banner (for Rescheduling) */}
        {currentMeetingHumanTime && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 px-6 py-2.5 flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
            <Clock className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Current confirmed slot: <strong>{currentMeetingHumanTime}</strong></span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#E63946]" />
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Fetching real-time counsellor availability...
              </p>
            </div>
          ) : successData ? (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                  {mode === 'student_book'
                    ? 'Meeting Confirmed Instantly!'
                    : mode === 'counsellor_invite'
                    ? 'Invitation Sent to Student!'
                    : 'Reschedule Proposal Sent!'}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  {mode === 'student_book'
                    ? `Your 1-hour session with ${effectiveCounsellorName} is confirmed for ${successData.humanTime || 'the selected slot'}. A Google Meet link has been generated.`
                    : mode === 'counsellor_invite'
                    ? `Your student has 30 minutes to accept the proposed slot.`
                    : `The proposed new time is held for 30 minutes awaiting acceptance.`}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Meeting Time:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {successData.humanTime || `${currentDay?.dateString} at ${selectedSlot?.label}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Platform:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" /> Google Meet
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Counsellor:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {effectiveCounsellorName}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-[#E63946] hover:bg-[#D62839] text-white px-8 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl flex items-start gap-2.5 text-xs font-bold text-[#E63946] animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              {/* Top 3 Metadata Chips Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#E63946] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900 dark:text-white">60 Minutes</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">1-on-1 Session</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:border-l sm:border-gray-100 dark:sm:border-gray-800 sm:pl-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#E63946] flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900 dark:text-white">Google Meet</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Online (Link after booking)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:border-l sm:border-gray-100 dark:sm:border-gray-800 sm:pl-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#E63946] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {effectiveCounsellorName}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Your Germany Expert</div>
                  </div>
                </div>
              </div>

              {/* Step 1: Select a Date */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-[#E63946] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Select a Date</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Choose a convenient date (shows next 3 days).</p>
                    </div>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-1.5 bg-gray-50/50 dark:bg-gray-800/40">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>3-Day Window</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                {/* 3 Date Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {availability?.days.map((day, idx) => {
                    const isSelected = selectedDateIdx === idx;
                    const isSunday = day.isSunday;

                    return (
                      <button
                        key={day.dateString}
                        type="button"
                        onClick={() => {
                          setSelectedDateIdx(idx);
                          setSelectedSlot(null);
                          setErrorMessage(null);
                        }}
                        disabled={isSunday}
                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative cursor-pointer ${
                          isSunday
                            ? 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-[#E63946] text-white border-[#E63946] shadow-md'
                            : 'bg-white dark:bg-[#141B2D] border-gray-200/90 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white text-[#E63946] flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isSelected ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {day.dayName.slice(0, 3)}
                        </span>
                        <span className="text-xl sm:text-2xl font-display font-bold leading-tight">
                          {formatDayDate(day)}
                        </span>
                        {day.isToday && (
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-red-50 text-[#E63946] dark:bg-red-950/40'
                            }`}
                          >
                            Today
                          </span>
                        )}
                        {isSunday && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 mt-1 flex items-center gap-1">
                            <Ban className="w-2.5 h-2.5" /> Closed
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sunday Restricted Notice */}
              {currentDay?.isSunday ? (
                <div className="p-6 bg-gray-50 dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200/80 dark:bg-white/10 text-gray-500 mx-auto flex items-center justify-center">
                    <Ban className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
                    No Counselling Meetings on Sundays
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    EuroBridge counselling sessions operate Monday through Saturday. Please select an alternate day above.
                  </p>
                </div>
              ) : (
                /* Step 2: Select a Time Slot */
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-[#E63946] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Select a Time Slot</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pick an available 60-minute slot.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Morning Sessions */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-[#FFF0F2] dark:bg-red-950/20 text-gray-900 dark:text-white font-bold text-xs p-3.5 rounded-xl sm:w-80 shrink-0 flex items-center gap-2">
                        <span>☀️</span>
                        <span>Morning Sessions <span className="font-normal text-gray-600 dark:text-gray-300">(9:00 AM – 12:00 PM IST)</span></span>
                      </div>

                      <div className="flex-1 grid grid-cols-3 gap-2.5">
                        {currentDay?.morningSlots.map((slot) => {
                          const isSelected = selectedSlot?.slotId === slot.slotId;
                          const isAvail = slot.isAvailable;

                          return (
                            <button
                              key={slot.slotId}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              disabled={!isAvail}
                              className={`p-2.5 rounded-xl border text-center transition-all relative ${
                                isSelected
                                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-[#E63946]'
                                  : isAvail
                                  ? 'bg-white dark:bg-[#141B2D] border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-900 dark:text-white cursor-pointer'
                                  : 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                              )}
                              <div className={`font-bold text-xs ${isSelected ? 'text-[#E63946]' : ''}`}>
                                {slot.label.split('–')[0].trim()}
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                60 min
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon Sessions */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-[#FFF5ED] dark:bg-amber-950/20 text-gray-900 dark:text-white font-bold text-xs p-3.5 rounded-xl sm:w-80 shrink-0 flex items-center gap-2">
                        <span>🌤️</span>
                        <span>Afternoon Sessions <span className="font-normal text-gray-600 dark:text-gray-300">(2:00 PM – 5:00 PM IST)</span></span>
                      </div>

                      <div className="flex-1 grid grid-cols-3 gap-2.5">
                        {currentDay?.afternoonSlots.map((slot) => {
                          const isSelected = selectedSlot?.slotId === slot.slotId;
                          const isAvail = slot.isAvailable;

                          return (
                            <button
                              key={slot.slotId}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              disabled={!isAvail}
                              className={`p-2.5 rounded-xl border text-center transition-all relative ${
                                isSelected
                                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-[#E63946]'
                                  : isAvail
                                  ? 'bg-white dark:bg-[#141B2D] border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-900 dark:text-white cursor-pointer'
                                  : 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                              )}
                              <div className={`font-bold text-xs ${isSelected ? 'text-[#E63946]' : ''}`}>
                                {slot.label.split('–')[0].trim()}
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                60 min
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Session Agenda / Topic */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-[#E63946] font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Session Agenda / Topic</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Select what you'd like to discuss (you can choose multiple).</p>
                  </div>
                </div>

                {/* Agenda Pills (Multi-Select) */}
                <div className="flex flex-wrap gap-2">
                  {COMMON_AGENDAS.map((item) => {
                    const isSelected = selectedAgendas.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAgenda(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-700 text-[#E63946] font-bold'
                            : 'bg-white dark:bg-[#141B2D] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 font-medium'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-[#E63946]" />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Optional Notes with character counter */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141B2D] p-3 flex items-start gap-2.5 focus-within:ring-2 focus-within:ring-[#E63946]/20 focus-within:border-[#E63946] transition-all">
                  <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                    placeholder="Optional notes: specific universities, questions, or document concerns you want to discuss..."
                    rows={2}
                    className="w-full text-xs text-gray-800 dark:text-gray-100 placeholder:text-gray-400 bg-transparent border-none focus:outline-none resize-none font-medium pr-12 pb-3"
                  />
                  <div className="absolute right-3 bottom-2 text-[10px] text-gray-400 font-medium">
                    {notes.length} / 500
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Actions */}
        {!successData && !loading && (
          <div className="p-4 sm:p-5 bg-gray-50/70 dark:bg-[#0E121A] border-t border-gray-200/80 dark:border-gray-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !selectedSlot || currentDay?.isSunday}
              className="bg-[#E63946] hover:bg-[#D62839] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>
                    {mode === 'counsellor_invite'
                      ? 'Send Meeting Invitation'
                      : mode === 'reschedule' || mode === 'counterproposal'
                      ? 'Propose Reschedule'
                      : 'Confirm Strategy Meeting'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
