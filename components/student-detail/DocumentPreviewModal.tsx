"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  X,
} from 'lucide-react';
import type { StudentDocument } from '../StudentDetailModal';

interface DocumentPreviewModalProps {
  previewDoc: StudentDocument | null;
  readOnly?: boolean;
  docActionLoading?: string | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  onOpenReject: (doc: StudentDocument) => void;
}

export function DocumentPreviewModal({
  previewDoc,
  readOnly,
  docActionLoading,
  onClose,
  onVerify,
  onOpenReject,
}: DocumentPreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {previewDoc && (
        <div key="preview-doc-wrapper" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            key="preview-doc-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#111622] rounded-2xl max-w-4xl w-full p-6 space-y-4 relative border border-gray-200/80 dark:border-gray-800/80 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-germany-gold/20 text-germany-black dark:text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base text-germany-black dark:text-white">{previewDoc.name}</h3>
                <p className="text-xs font-bold text-gray-400">
                  {previewDoc.category} • {previewDoc.size} • Uploaded {previewDoc.uploadDate}
                </p>
              </div>
            </div>

            {/* Real Document Preview Viewer */}
            <div className="rounded-xl overflow-hidden border border-gray-200/70 dark:border-gray-800/80 bg-[#FAF8F5] dark:bg-[#0A0D14]">
              {previewDoc.url ? (
                previewDoc.mimeType?.startsWith('image/') || /\.(jpe?g|png|webp)$/i.test(previewDoc.url) ? (
                  <div className="p-3 max-h-[50vh] flex items-center justify-center overflow-auto bg-black/5 dark:bg-black/30">
                    <img src={previewDoc.url} alt={previewDoc.name} className="max-h-[46vh] w-auto object-contain rounded-lg" />
                  </div>
                ) : (
                  <div className="w-full h-[60vh] bg-white dark:bg-[#0E121A]">
                    <iframe src={previewDoc.url} title={previewDoc.name} className="w-full h-full border-none" />
                  </div>
                )
              ) : previewDoc.previewContent ? (
                <div className="p-4 max-h-[50vh] overflow-y-auto space-y-3 bg-white dark:bg-[#0E121A]">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800 text-xs">
                    <span className="font-bold text-gray-500">
                      {previewDoc.previewContent.trim().split(/\s+/).length} words • Academic Text Document
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(previewDoc.previewContent || '');
                        alert('Copied document text to clipboard!');
                      }}
                      className="text-xs font-bold text-germany-red hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                    {previewDoc.previewContent}
                  </pre>
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-bold text-gray-400">
                  No preview URL available for this file.
                </div>
              )}
              {previewDoc.url && (
                <div className="p-3 bg-white dark:bg-[#111622] border-t border-gray-200/60 dark:border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-bold truncate max-w-xs">{previewDoc.originalFilename || previewDoc.name}</span>
                  <a
                    href={previewDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-germany-red font-extrabold hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open full file in new tab</span>
                  </a>
                </div>
              )}
            </div>

            {/* Status & Quick Verification from Preview */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                Current Status:{' '}
                <span
                  className={`capitalize ${
                    previewDoc.status === 'verified'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : previewDoc.status === 'pending'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-red-700 dark:text-red-400'
                  }`}
                >
                  {previewDoc.status}
                </span>
              </div>

              {!readOnly && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onVerify(previewDoc.id)}
                    disabled={docActionLoading === previewDoc.id}
                    className="neu-btn-primary py-1.5 px-3 text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    {docActionLoading === previewDoc.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    <span>Verify / Accept</span>
                  </button>
                  {previewDoc.documentType !== 'cv' && previewDoc.documentType !== 'sop' && (
                    <button
                      onClick={() => onOpenReject(previewDoc)}
                      disabled={docActionLoading === previewDoc.id}
                      className="py-1.5 px-3 text-xs font-extrabold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
