"use client";

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface AdminResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolutionSummary: string;
  setResolutionSummary: (val: string) => void;
  isResolving: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AdminResolveModal({
  isOpen,
  onClose,
  resolutionSummary,
  setResolutionSummary,
  isResolving,
  onSubmit,
}: AdminResolveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xl max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-germany-black">Mark Query as Resolved</h3>
              <p className="text-[11px] text-gray-500">Provide official closure summary for the audit trail</p>
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
              Resolution Summary *
            </label>
            <textarea
              value={resolutionSummary}
              onChange={(e) => setResolutionSummary(e.target.value)}
              placeholder="Detail the actions taken, approvals granted, or guidance provided to resolve this inquiry..."
              rows={4}
              required
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
              disabled={!resolutionSummary.trim() || isResolving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isResolving ? 'Resolving...' : 'Confirm Resolution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
