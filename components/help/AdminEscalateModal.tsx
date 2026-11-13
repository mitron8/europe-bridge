"use client";

import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ESCALATION_REASONS } from './types';

interface AdminEscalateModalProps {
  isOpen: boolean;
  onClose: () => void;
  escalateReason: string;
  setEscalateReason: (val: string) => void;
  escalateAdminNotes: string;
  setEscalateAdminNotes: (val: string) => void;
  isEscalating: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminEscalateModal({
  isOpen,
  onClose,
  escalateReason,
  setEscalateReason,
  escalateAdminNotes,
  setEscalateAdminNotes,
  isEscalating,
  onSubmit,
}: AdminEscalateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xl max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 text-germany-red rounded-xl">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-germany-black">Escalate Query to Admin</h3>
              <p className="text-[11px] text-gray-500">Enable admin intervention and open direct admin chat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Escalation Reason *
            </label>
            <select
              value={escalateReason}
              onChange={(e) => setEscalateReason(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-700 text-germany-black dark:text-white rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red whitespace-normal break-words cursor-pointer"
            >
              {ESCALATION_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Administrative Note (Optional)
            </label>
            <textarea
              value={escalateAdminNotes}
              onChange={(e) => setEscalateAdminNotes(e.target.value)}
              placeholder="Provide context or instructions for administrative handling..."
              rows={3}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isEscalating}
              className="px-4 py-2 bg-germany-red hover:bg-[#D62839] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isEscalating ? 'Escalating...' : 'Confirm Escalation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
