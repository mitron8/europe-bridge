"use client";

import React from 'react';
import { CounsellorServiceOrder } from './types';

interface DeliverDraftModalProps {
  order: CounsellorServiceOrder | null;
  onClose: () => void;
  draftTitle: string;
  setDraftTitle: (val: string) => void;
  draftUrl: string;
  setDraftUrl: (val: string) => void;
  counsellorNotes: string;
  setCounsellorNotes: (val: string) => void;
  isSubmittingDraft: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function DeliverDraftModal({
  order,
  onClose,
  draftTitle,
  setDraftTitle,
  draftUrl,
  setDraftUrl,
  counsellorNotes,
  setCounsellorNotes,
  isSubmittingDraft,
  onSubmit,
}: DeliverDraftModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="p-6 bg-white dark:bg-[#111622] rounded-3xl border border-[#e5e0d3] dark:border-gray-800 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#16161a] dark:text-white font-display">
            Deliver Draft to Student
          </h3>
          <p className="text-xs text-[#5e5b54] dark:text-gray-400">
            Student: <strong className="text-[#16161a] dark:text-white">{order.student_name}</strong> •{' '}
            {order.service_type}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Deliverable Document Title
            </label>
            <input
              type="text"
              required
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="e.g. RWTH Aachen Robotics SOP - First Draft v1"
              className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Document Download URL (Google Docs / Google Drive / ImageKit link) *
            </label>
            <input
              type="url"
              required
              value={draftUrl}
              onChange={(e) => setDraftUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/..."
              className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Notes / Instructions for Student
            </label>
            <textarea
              rows={3}
              value={counsellorNotes}
              onChange={(e) => setCounsellorNotes(e.target.value)}
              placeholder="e.g. Please review the highlighted sections on page 2 regarding your final semester thesis..."
              className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#5e5b54] dark:text-gray-400 hover:text-[#16161a] dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmittingDraft || !draftUrl.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isSubmittingDraft ? 'Delivering...' : 'Send Draft to Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
