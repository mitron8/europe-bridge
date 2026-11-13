"use client";

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { ESCALATION_REASONS } from './types';

interface CounsellorResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolutionText: string;
  setResolutionText: (val: string) => void;
  actionLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function CounsellorResolveModal({
  isOpen,
  onClose,
  resolutionText,
  setResolutionText,
  actionLoading,
  onSubmit,
}: CounsellorResolveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-germany-black">Mark Query as Resolved</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          Closing this query will notify the student and mark the chat as resolved and read-only.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Resolution Summary for Student
            </label>
            <textarea
              rows={3}
              value={resolutionText}
              onChange={(e) => setResolutionText(e.target.value)}
              placeholder="e.g. Verified marksheet with APS guidelines; affidavit issued."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer"
            >
              {actionLoading ? 'Saving...' : 'Confirm Resolution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface CounsellorEscalateModalProps {
  isOpen: boolean;
  onClose: () => void;
  escalationReason: string;
  setEscalationReason: (val: string) => void;
  escalationNotes: string;
  setEscalationNotes: (val: string) => void;
  actionLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function CounsellorEscalateModal({
  isOpen,
  onClose,
  escalationReason,
  setEscalationReason,
  escalationNotes,
  setEscalationNotes,
  actionLoading,
  onSubmit,
}: CounsellorEscalateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-germany-red font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <span>Escalate Query to Admin</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          This ticket will be flagged for central operations administration review.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Escalation Reason
            </label>
            <ClaySelect
              value={escalationReason}
              onChange={(val) => setEscalationReason(val)}
              options={ESCALATION_REASONS.map((r) => ({ value: r, label: r }))}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Confidential Staff Note for Admin (Optional)
            </label>
            <textarea
              rows={3}
              value={escalationNotes}
              onChange={(e) => setEscalationNotes(e.target.value)}
              placeholder="Explain why admin action is needed..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-germany-red"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-germany-red hover:bg-[#D62839] rounded-xl cursor-pointer"
            >
              {actionLoading ? 'Escalating...' : 'Submit Escalation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
