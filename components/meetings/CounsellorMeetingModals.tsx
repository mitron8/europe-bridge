"use client";

import React from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';

interface CounsellorCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  cancelReason: string;
  setCancelReason: (val: string) => void;
  isSubmittingCancel: boolean;
  onSubmit: () => void;
}

export function CounsellorCancelModal({
  isOpen,
  onClose,
  cancelReason,
  setCancelReason,
  isSubmittingCancel,
  onSubmit,
}: CounsellorCancelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white text-germany-red">
            Cancel Meeting
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
            onClick={onClose}
            className="neu-btn-secondary px-4 py-2 text-xs font-black"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmittingCancel || !cancelReason.trim()}
            className="neu-btn-primary bg-germany-red px-5 py-2 text-xs font-black flex items-center gap-1.5"
          >
            {isSubmittingCancel && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Confirm Cancellation</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface CounsellorDeclineRescheduleModalProps {
  modalState: {
    isOpen: boolean;
    meetingId: string | null;
    title: string;
    message: string;
    reason: string;
    isSubmitting: boolean;
  };
  setModalState: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    meetingId: string | null;
    title: string;
    message: string;
    reason: string;
    isSubmitting: boolean;
  }>>;
  onConfirm: () => void;
}

export function CounsellorDeclineRescheduleModal({
  modalState,
  setModalState,
  onConfirm,
}: CounsellorDeclineRescheduleModalProps) {
  if (!modalState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
              {modalState.title || 'Delete Meeting Schedule?'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {modalState.message}
        </p>

        <div>
          <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">
            Reason (Optional)
          </label>
          <input
            type="text"
            value={modalState.reason}
            onChange={(e) => setModalState((prev) => ({ ...prev, reason: e.target.value }))}
            placeholder="e.g. Reschedule proposal declined, will offer other slots..."
            className="w-full text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-germany-red text-germany-black dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
            className="neu-btn-secondary px-4 py-2 text-xs font-black cursor-pointer"
            disabled={modalState.isSubmitting}
          >
            Keep Proposal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={modalState.isSubmitting}
            className="neu-btn-primary bg-germany-red hover:bg-[#D62839] text-white px-5 py-2 text-xs font-black flex items-center gap-1.5 cursor-pointer"
          >
            {modalState.isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Delete Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface CounsellorBlockSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  availability: any;
  blockDate: string;
  setBlockDate: (val: string) => void;
  isAllDay: boolean;
  setIsAllDay: (val: boolean) => void;
  blockStartHour: number;
  setBlockStartHour: (val: number) => void;
  blockReason: string;
  setBlockReason: (val: string) => void;
  isSubmittingBlock: boolean;
  onSubmit: () => void;
}

export function CounsellorBlockSlotModal({
  isOpen,
  onClose,
  availability,
  blockDate,
  setBlockDate,
  isAllDay,
  setIsAllDay,
  blockStartHour,
  setBlockStartHour,
  blockReason,
  setBlockReason,
  isSubmittingBlock,
  onSubmit,
}: CounsellorBlockSlotModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
            Block Counsellor Availability
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-black uppercase text-gray-500">Date (Rolling 3 Days)</label>
            <select
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] mt-1 text-germany-black dark:text-white whitespace-normal break-words cursor-pointer"
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
                className="w-full p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] mt-1 text-germany-black dark:text-white whitespace-normal break-words cursor-pointer"
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
            onClick={onClose}
            className="neu-btn-secondary px-4 py-2 text-xs font-black"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmittingBlock}
            className="neu-btn-primary px-5 py-2 text-xs font-black flex items-center gap-1.5"
          >
            {isSubmittingBlock && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Confirm Block</span>
          </button>
        </div>
      </div>
    </div>
  );
}
