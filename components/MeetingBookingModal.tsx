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
  const [agenda, setAgenda] = useState<string>('University Shortlisting & Profile Review');
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

  const handleSubmit = async () => {
    if (!currentDay || !selectedSlot) {
      setErrorMessage('Please select a date and an available 1-hour time slot.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

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
          agenda,
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
          agenda,
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
          reason: notes.trim() || agenda,
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
          reason: notes.trim() || agenda,
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
        // Concurrency conflict: slot already booked
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
    availability?.counsellor?.name || counsellorName || 'EuroBridge Senior Advisor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-[#0E121A] dark:via-[#111622] dark:to-[#0E121A] border-b border-gray-200/80 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-germany-red/10 dark:bg-red-950/40 text-germany-red flex items-center justify-center font-black shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-germany-black dark:text-white">
                  {mode === 'counsellor_invite'
                    ? `Invite Student to Meeting`
                    : mode === 'reschedule' || mode === 'counterproposal'
                    ? 'Reschedule Strategy Session'
                    : 'Book 1-on-1 Counselling Session'}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-germany-gold/20 text-germany-black dark:text-amber-300">
                  IST (Asia/Kolkata)
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                {mode === 'counsellor_invite'
                  ? `Inviting student: ${studentName || 'Assigned Student'}`
                  : `With ${effectiveCounsellorName} • Exactly 60-Minute Focused Session`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
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
                <h4 className="text-lg font-display font-extrabold text-germany-black dark:text-white">
                  {mode === 'student_book'
                    ? 'Meeting Confirmed Instantly!'
                    : mode === 'counsellor_invite'
                    ? 'Invitation Sent to Student!'
                    : 'Reschedule Proposal Sent!'}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  {mode === 'student_book'
                    ? `Your 1-hour session with ${effectiveCounsellorName} is confirmed for ${successData.humanTime || 'the selected slot'}. A notification has been sent to your counsellor.`
                    : mode === 'counsellor_invite'
                    ? `Your student has 30 minutes to accept the proposed slot. The slot is held until accepted or expired.`
                    : `The proposed new time is held for 30 minutes awaiting acceptance. Your existing meeting remains confirmed until accepted.`}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">Meeting Time:</span>
                  <span className="font-extrabold text-germany-black dark:text-white">
                    {successData.humanTime || `${currentDay?.dateString} at ${selectedSlot?.label}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">Platform:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" /> EuroBridge Video Meet
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">Status:</span>
                  <span className="font-extrabold uppercase px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {successData.status || 'CONFIRMED'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="neu-btn-primary px-8 py-2.5 text-xs font-black"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl flex items-start gap-2.5 text-xs font-bold text-germany-red animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              {/* Step 1: BookMyShow Date Selection Strip (Rolling 3 Days) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-germany-red" />
                    <span>Select Date (Rolling 3-Day Window)</span>
                  </label>
                  <span className="text-[11px] font-bold text-gray-400">
                    Midnight IST Refresh
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
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
                        className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                          isSunday
                            ? 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-germany-red text-white border-germany-red shadow-[0_4px_14px_rgba(230,57,70,0.3)] ring-2 ring-germany-red/40'
                            : 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800 hover:border-germany-red/50 text-germany-black dark:text-white cursor-pointer hover:scale-[1.01]'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${
                            isSelected
                              ? 'text-white/80'
                              : isSunday
                              ? 'text-gray-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {day.dayName.slice(0, 3)}
                        </span>
                        <span className="text-sm font-display font-extrabold leading-tight">
                          {day.displayLabel.split('(')[1]?.replace(')', '') || day.dateString.slice(5)}
                        </span>
                        {day.isToday && (
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full mt-0.5 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-germany-gold/20 text-germany-black dark:text-amber-300'
                            }`}
                          >
                            Today
                          </span>
                        )}
                        {isSunday && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-0.5">
                            <Ban className="w-2.5 h-2.5" /> Sunday Closed
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
                  <h4 className="font-display font-bold text-sm text-germany-black dark:text-white">
                    No Counselling Meetings on Sundays
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    EuroBridge counselling sessions operate Monday through Saturday. Please select Monday or Tuesday above to book your slot.
                  </p>
                </div>
              ) : (
                /* BookMyShow Slot Grid */
                <div className="space-y-4">
                  {/* Morning Slots (9 AM - 12 PM) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-germany-gold" />
                        <span>Morning Sessions (9:00 AM – 12:00 PM IST)</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentDay?.morningSlots.map((slot) => {
                        const isSelected = selectedSlot?.slotId === slot.slotId;
                        const isAvail = slot.isAvailable;

                        return (
                          <button
                            key={slot.slotId}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            disabled={!isAvail}
                            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400/40 shadow-xs'
                                : isAvail
                                ? 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800 hover:border-emerald-400/70 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 text-germany-black dark:text-white cursor-pointer hover:scale-[1.01]'
                                : 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs">{slot.label.split('–')[0]}</span>
                              {isSelected ? (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-0.5">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Selected
                                </span>
                              ) : isAvail ? (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                  Available
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 truncate max-w-[90px]">
                                  {slot.unavailableReason || 'Unavailable'}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                              60 min • 1-on-1
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon Slots (2 PM - 5 PM) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-germany-red" />
                        <span>Afternoon Sessions (2:00 PM – 5:00 PM IST)</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentDay?.afternoonSlots.map((slot) => {
                        const isSelected = selectedSlot?.slotId === slot.slotId;
                        const isAvail = slot.isAvailable;

                        return (
                          <button
                            key={slot.slotId}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            disabled={!isAvail}
                            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400/40 shadow-xs'
                                : isAvail
                                ? 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800 hover:border-emerald-400/70 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 text-germany-black dark:text-white cursor-pointer hover:scale-[1.01]'
                                : 'bg-gray-100/70 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs">{slot.label.split('–')[0]}</span>
                              {isSelected ? (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-0.5">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Selected
                                </span>
                              ) : isAvail ? (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                  Available
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 truncate max-w-[90px]">
                                  {slot.unavailableReason || 'Unavailable'}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                              60 min • 1-on-1
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Meeting Agenda & Notes */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-germany-gold" />
                      <span>Session Agenda / Topic</span>
                    </label>

                    {/* Quick Agenda Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {COMMON_AGENDAS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setAgenda(item)}
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${
                            agenda === item
                              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black border-transparent shadow-xs'
                              : 'bg-white dark:bg-[#0E121A] text-gray-600 dark:text-gray-300 border-gray-200/80 dark:border-gray-800 hover:border-gray-400'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional notes: specific universities, questions, or document concerns you want to discuss..."
                      rows={2}
                      className="w-full text-xs font-medium p-3 rounded-2xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 focus:outline-hidden focus:ring-2 focus:ring-germany-red text-germany-black dark:text-white"
                    />
                  </div>

                  {/* Booking Summary Box */}
                  {selectedSlot && currentDay && (
                    <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3 animate-in fade-in duration-150">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300">
                          Booking Summary
                        </span>
                        <div className="text-xs font-extrabold text-germany-black dark:text-white">
                          {currentDay.dayName}, {currentDay.dateString} • {selectedSlot.label}
                        </div>
                        <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                          With {effectiveCounsellorName} • Duration: 60 minutes
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 rounded-full border border-emerald-300 dark:border-emerald-700">
                        {mode === 'student_book' ? 'Instant Confirmation' : 'Requires Acceptance'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!successData && !loading && (
          <div className="p-5 sm:p-6 bg-gray-50 dark:bg-[#0E121A] border-t border-gray-200/80 dark:border-gray-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="neu-btn-secondary px-5 py-2.5 text-xs font-black"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !selectedSlot || currentDay?.isSunday}
              className="neu-btn-primary px-7 py-2.5 text-xs font-black flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <>
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
