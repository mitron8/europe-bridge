'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface SopConfirmModalProps {
  showConfirmModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalMode: 'initial-batch' | 'selective-regen';
  programmes: any[];
  selectedRegenCount: number;
  remainingAttempts: number;
  maxGenerations: number;
}

export function SopConfirmModal({
  showConfirmModal,
  onClose,
  onConfirm,
  modalMode,
  programmes,
  selectedRegenCount,
  remainingAttempts,
  maxGenerations,
}: SopConfirmModalProps) {
  if (!showConfirmModal) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#111622] rounded-3xl border border-gray-300 dark:border-gray-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Confirm SOP Generation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {modalMode === 'initial-batch'
                    ? `Synthesizing SOPs for all ${programmes.length} shortlisted programmes`
                    : `Re-generating ${selectedRegenCount} selected programme SOP(s)`}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
              <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                Are you sure you want to proceed?
              </p>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                You have <span className="font-black text-amber-950 dark:text-white underline decoration-amber-500">{remainingAttempts} remaining generation chance{remainingAttempts === 1 ? '' : 's'}</span> (out of {maxGenerations} total).
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                This will enqueue background jobs for each programme. Once generated, each document will be submitted to your counsellor for review.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Proceed &amp; Generate ({remainingAttempts} left)
              </button>
            </div>
          </div>
        </div>
  );
}
