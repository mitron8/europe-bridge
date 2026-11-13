"use client";

import React from 'react';
import { AlertCircle, Loader2, X } from 'lucide-react';

export interface ConfirmDeleteModalState {
  isOpen: boolean;
  meetingId: string | number | null;
  proposalId?: string | number | null;
  title?: string;
  message?: string;
  reason?: string;
  isSubmitting?: boolean;
}

export interface CancelMeetingModalState {
  isOpen: boolean;
  meetingId: string | number | null;
  reason: string;
  error: string | null;
  isSubmitting: boolean;
}

interface ConfirmDeleteScheduleModalProps {
  modalState: ConfirmDeleteModalState;
  onClose: () => void;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export function ConfirmDeleteScheduleModal({
  modalState,
  onClose,
  onReasonChange,
  onConfirm,
}: ConfirmDeleteScheduleModalProps) {
  if (!modalState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
              {modalState.title || 'Delete Meeting Schedule?'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {modalState.message}
        </p>

        <div>
          <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
            Reason (Optional)
          </label>
          <input
            type="text"
            value={modalState.reason || ''}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="e.g. Schedule conflict, will rebook next week..."
            className="w-full text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-[#E63946] text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            disabled={modalState.isSubmitting}
          >
            Keep Proposal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={modalState.isSubmitting}
            className="bg-[#E63946] hover:bg-[#D62839] text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            {modalState.isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Delete Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface CancelMeetingModalProps {
  modalState: CancelMeetingModalState;
  onClose: () => void;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export function CancelMeetingModal({
  modalState,
  onClose,
  onReasonChange,
  onConfirm,
}: CancelMeetingModalProps) {
  if (!modalState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#E63946]">
            <AlertCircle className="w-5 h-5 text-[#E63946]" />
            <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
              Cancel Meeting
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Cancelling will release the slot and notify your advisor. Please provide a clear cancellation reason.
        </p>

        {modalState.error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 rounded-xl">
            {modalState.error}
          </div>
        )}

        <div>
          <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
            Cancellation Reason <span className="text-[#E63946]">*</span>
          </label>
          <textarea
            value={modalState.reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="e.g. Unforeseen academic exam commitment, will rebook later..."
            rows={3}
            maxLength={500}
            className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-[#E63946] text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            disabled={modalState.isSubmitting}
          >
            Keep Meeting
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={modalState.isSubmitting || !modalState.reason.trim()}
            className="bg-[#E63946] hover:bg-[#D62839] text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            {modalState.isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Confirm Cancellation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
