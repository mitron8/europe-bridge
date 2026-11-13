"use client";

import React from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import type { LorFormData } from '../StudentLorGenerator';
import { LOR_ROLE_PRESETS } from '../StudentLorGenerator';

interface LorConfirmModalProps {
  isOpen: boolean;
  remainingAttempts: number;
  isGenerating: boolean;
  formData: LorFormData;
  onClose: () => void;
  onConfirm: () => void;
}

export function LorConfirmModal({
  isOpen,
  remainingAttempts,
  isGenerating,
  formData,
  onClose,
  onConfirm,
}: LorConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
      <div className="neu-card p-6 max-w-md w-full bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-germany-red dark:bg-red-950/50 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
              Generate Academic LOR
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This will consume 1 generation attempt ({remainingAttempts} remaining).
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
          <p>
            <strong>Referee:</strong> {formData.recommenderName} ({formData.recommenderInstitution})
          </p>
          <p>
            <strong>Role:</strong> {LOR_ROLE_PRESETS[formData.lorType]?.label}
          </p>
          <p>
            <strong>Standing:</strong> {formData.studentRank}
          </p>
          {formData.thesisTitle && (
            <p>
              <strong>Thesis:</strong> {formData.thesisTitle}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Confirm &amp; Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
