"use client";

import React from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Edit3,
  FileText,
  Loader2,
  Printer,
  RefreshCw,
  Save,
  Send,
  ShieldCheck,
} from 'lucide-react';
import type { LorFormData } from '../StudentLorGenerator';

interface LorResultViewProps {
  formData: LorFormData;
  wordCount: number;
  remainingAttempts: number;
  isGenerating: boolean;
  copied: boolean;
  isSaving: boolean;
  isSubmitting: boolean;
  submissionFeedback: string | null;
  documentStatus: any;
  onEditInputs: () => void;
  onInitiateGenerate: () => void;
  onDownloadWord: () => void;
  onPrint: () => void;
  onCopy: () => void;
  onSaveDraft: () => void;
  onGeneratedLorChange: (val: string) => void;
  onSubmitForReview: () => void;
}

export function LorResultView({
  formData,
  wordCount,
  remainingAttempts,
  isGenerating,
  copied,
  isSaving,
  isSubmitting,
  submissionFeedback,
  documentStatus,
  onEditInputs,
  onInitiateGenerate,
  onDownloadWord,
  onPrint,
  onCopy,
  onSaveDraft,
  onGeneratedLorChange,
  onSubmitForReview,
}: LorResultViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Bar on Result Screen: Status & Export Actions */}
      <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
              Letter of Recommendation Ready
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {wordCount} words • From {formData.recommenderName} ({formData.recommenderInstitution})
            </p>
          </div>
        </div>

        {/* Quick Action Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
          <button
            onClick={onEditInputs}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Inputs</span>
          </button>

          <button
            onClick={onInitiateGenerate}
            disabled={isGenerating || remainingAttempts <= 0}
            className="px-3.5 py-2 rounded-xl bg-germany-red hover:bg-[#D62839] disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            title={remainingAttempts <= 0 ? 'All generations used.' : `${remainingAttempts} generation attempts remaining`}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>
              {remainingAttempts <= 0 ? 'Quota Reached (0 left)' : `Re-draft (${remainingAttempts} left)`}
            </span>
          </button>

          <button
            onClick={onDownloadWord}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
            title="Download Microsoft Word .doc ready to print on college letterhead"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Word (.doc)</span>
          </button>

          <button
            onClick={onPrint}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={onCopy}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={onSaveDraft}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Official Physical Submission Checklist */}
      <div className="neu-card p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-3xl space-y-3 print:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-black text-blue-900 dark:text-blue-200">
            German University Submission Guidelines (Physical Ink &amp; Seal)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-blue-800 dark:text-blue-300">
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Official Letterhead (Briefkopf)</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Institutional Email (.edu/.ac)</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Phone Number for Verification</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Physical Ink Signature &amp; Stamp</span>
          </div>
        </div>
      </div>

      {/* Letterhead Paper Representation & Live Editor */}
      <div className="neu-card p-8 md:p-12 bg-[#FCFBFA] dark:bg-[#111622] border border-gray-300/80 dark:border-gray-800 rounded-3xl shadow-md space-y-5 print:p-0 print:border-none print:shadow-none print:bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 print:hidden">
          <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-germany-red" />
            <span>Empfehlungsschreiben Draft Text</span>
          </span>
          <span className="text-[11px] font-bold text-gray-400">
            Directly editable below before printing for professor&apos;s physical signature
          </span>
        </div>

        <textarea
          rows={24}
          value={formData.generatedLor || ''}
          onChange={(e) => onGeneratedLorChange(e.target.value)}
          className="w-full p-6 sm:p-8 rounded-2xl font-serif text-sm leading-relaxed bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 resize-y focus:outline-none focus:ring-1 focus:ring-germany-red shadow-inner print:border-none print:p-0 print:text-black print:bg-transparent"
        />

        {/* Bottom Actions: Submit for Counsellor Verification */}
        <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <div className="text-xs font-black">
              {documentStatus?.status === 'VERIFIED' ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Approved &amp; Verified by EuropeBridge Counsellor
                </span>
              ) : documentStatus?.status === 'PENDING' ? (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Submitted &amp; Pending Counsellor Verification
                </span>
              ) : documentStatus?.status === 'REJECTED' ? (
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Revision Requested: {documentStatus.rejectionNote || 'Update and re-submit'}
                </span>
              ) : (
                <span className="text-gray-700 dark:text-gray-300">
                  Submit this draft to your EuropeBridge counsellor for verification before printing for your professor.
                </span>
              )}
            </div>
            {documentStatus?.uploadedAt && (
              <p className="text-[11px] font-bold text-gray-400">
                Last submitted: {new Date(documentStatus.uploadedAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            {submissionFeedback && (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{submissionFeedback}</span>
              </div>
            )}

            <button
              onClick={onSubmitForReview}
              disabled={isSubmitting || !formData.generatedLor}
              className={`px-6 py-3 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-colors ${
                documentStatus?.status === 'PENDING'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : documentStatus?.status === 'PENDING' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>
                {documentStatus?.status === 'PENDING'
                  ? 'Update Submission'
                  : 'Submit to Counsellor Review'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
