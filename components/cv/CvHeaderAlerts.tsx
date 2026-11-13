'use client';

import React from 'react';
import {
  FileText,
  ArrowLeft,
  Layers,
  Save,
  Loader2,
  ShieldCheck,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { CvFormData } from './cv-types';

export interface CvHeaderAlertsProps {
  formData: CvFormData;
  onBack?: () => void;
  remainingAttempts: number;
  maxGenerations: number;
  isGenerating: boolean;
  isSaving: boolean;
  isPendingVerification: boolean;
  isVerified: boolean;
  isRejected: boolean;
  isFailed: boolean;
  statusMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  handleSave: (isManualDraft?: boolean) => void;
  handleGenerate: () => void;
}

export function CvHeaderAlerts({
  formData,
  onBack,
  remainingAttempts,
  maxGenerations,
  isGenerating,
  isSaving,
  isPendingVerification,
  isVerified,
  isRejected,
  isFailed,
  statusMessage,
  handleSave,
  handleGenerate,
}: CvHeaderAlertsProps) {
  return (
    <>
      {/* Header Banner */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative shadow-[12px_12px_30px_rgba(210,205,195,0.6)] dark:shadow-none">
        {/* German Tricolor Header Line */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                  title="Back to Document Hub"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
                <FileText className="w-3.5 h-3.5 text-germany-gold" />
                <span>AI CV Generator</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-germany-red" />
                <span>{remainingAttempts} of {maxGenerations} generation chances left</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black dark:text-white">
              Academic Curriculum Vitae (CV)
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 max-w-2xl">
              German university format (Europass two-column standard). Profile data is automatically synchronized, and your final generated PDF is reviewed and verified by your assigned EuroBridge counsellor.
            </p>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving || isGenerating}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-extrabold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-germany-red" /> : <Save className="w-4 h-4 text-gray-500" />}
              <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isSaving || isGenerating || remainingAttempts <= 0}
              className="flex items-center gap-2 px-5 py-2.5 neu-btn-primary text-xs font-extrabold shadow-md disabled:opacity-60 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-germany-gold" />
                  <span>{remainingAttempts <= 0 ? 'Limit Reached (0 left)' : 'Generate CV'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generation Status & Verification Alerts */}
      {isGenerating && (
        <div className="neu-card p-5 bg-blue-50/90 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">Your CV is being generated</h3>
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300/80 mt-1">
              Our durable background engine is formulating your summary, structuring experience bullets, and compiling the registered HTML template.
            </p>
            <p className="text-[11px] font-extrabold text-blue-600/90 dark:text-blue-400 mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>You can close your browser or navigate away. Your document generation will safely persist and complete on our servers.</span>
            </p>
          </div>
        </div>
      )}

      {isPendingVerification && !isGenerating && (
        <div className="neu-card p-5 bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">CV Generated • Pending Counsellor Review</h3>
                <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 rounded-full text-[10px] font-extrabold">In Review</span>
              </div>
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300/80 mt-1">
                Your academic CV has been generated and queued for counsellor verification. To maintain strict German application quality standards, official downloads are released upon counsellor sign-off.
              </p>
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mt-1">
                Generated: {formData.document?.uploadedAt ? new Date(formData.document.uploadedAt).toLocaleString() : 'Recently'}
              </p>
            </div>
            {formData.document?.url && (
              <a
                href={formData.document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Draft PDF</span>
              </a>
            )}
          </div>
        </div>
      )}

      {isVerified && !isGenerating && (
        <div className="neu-card p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">Verified &amp; Approved</h3>
                <span className="px-2 py-0.5 bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 rounded-full text-[10px] font-extrabold">Ready for Submission</span>
              </div>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300/80 mt-0.5">
                Your counsellor has verified your academic CV. It is officially certified for uni-assist and university portal uploads.
              </p>
            </div>
            {formData.document?.url && (
              <a
                href={formData.document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View &amp; Download PDF</span>
              </a>
            )}
          </div>
        </div>
      )}

      {isRejected && !isGenerating && (
        <div className="neu-card p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-800 dark:text-red-300">Revision Requested by Counsellor</h3>
            <p className="text-xs font-bold text-red-700 dark:text-red-300/80 mt-1">
              Note: {formData.document?.rejectionNote || 'Please update your details and re-generate your CV.'}
            </p>
          </div>
        </div>
      )}

      {isFailed && !isGenerating && (
        <div className="neu-card p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-red-800 dark:text-red-300">Generation Issue</h3>
              <p className="text-xs font-bold text-red-700 dark:text-red-300/80 mt-0.5">
                {formData.latestJob?.error_message || 'An error occurred during CV compilation. Please try again.'}
              </p>
            </div>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Generation</span>
            </button>
          </div>
        </div>
      )}

      {/* Temporary Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </>
  );
}
