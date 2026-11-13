"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { StudentDocument } from '../StudentDetailModal';

interface DocumentRejectionModalProps {
  rejectingDoc: StudentDocument | null;
  rejectionReasonInput: string;
  docActionLoading?: string | null;
  onReasonChange: (reason: string) => void;
  onClose: () => void;
  onConfirmReject: () => void;
}

export function DocumentRejectionModal({
  rejectingDoc,
  rejectionReasonInput,
  docActionLoading,
  onReasonChange,
  onClose,
  onConfirmReject,
}: DocumentRejectionModalProps) {
  return (
    <AnimatePresence>
      {rejectingDoc && (
        <div key="reject-doc-wrapper" className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            key="reject-doc-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#111622] rounded-2xl max-w-md w-full p-6 space-y-4 relative border border-gray-200/80 dark:border-gray-800/80 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-display text-base">
              <AlertTriangle className="w-5 h-5" />
              <h3>
                {rejectingDoc.status === 'rejected'
                  ? 'Update Feedback & Request Re-upload'
                  : 'Request Document Revision & Re-upload'}
              </h3>
            </div>

            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {rejectingDoc.status === 'rejected'
                ? 'Update revision instructions for '
                : 'Provide specific feedback for '}
              <span className="text-germany-black dark:text-white font-extrabold">{rejectingDoc.name}</span>{' '}
              so the student knows what to correct and re-upload.
            </p>

            <textarea
              value={rejectionReasonInput}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="e.g. Official semester marksheet lacks college registrar stamp. Please re-scan in high resolution (300 DPI)."
              rows={3}
              className="w-full p-3 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white resize-none focus:outline-none focus:border-red-500 shadow-xs"
              autoFocus
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-1.5 px-3 text-xs font-extrabold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1A2130] shadow-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={docActionLoading === rejectingDoc.id}
                onClick={onConfirmReject}
                className="py-1.5 px-4 text-xs font-extrabold bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                {docActionLoading === rejectingDoc.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {rejectingDoc.status === 'rejected'
                    ? 'Update & Request Re-upload'
                    : 'Confirm Rejection & Notify Student'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
