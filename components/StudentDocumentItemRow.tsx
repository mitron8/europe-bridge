"use client";

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Upload,
  Trash2,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { DOCUMENT_CATALOGUE } from '@/lib/documentCatalogue';

export interface UnifiedDocumentItem {
  type: string;
  title: string;
  description: string;
  required: boolean;
  status: string; // 'VERIFIED' | 'PENDING' | 'REJECTED' | 'MISSING' | 'NOT_APPLICABLE' | 'NOT_GENERATED' | 'UPLOADED' | 'UNDER_REVIEW' | 'REJECT_REUPLOAD'
  url?: string | null;
  uploadedAt?: string | null;
  verifiedAt?: string | null;
  rejectionNote?: string | null;
  originalFilename?: string | null;
  fileSizeBytes?: number | null;
  category?: string;
  isAiGenerated?: boolean;
  conditionNotes?: string | null;
  counsellorNotes?: string | null;
  preparationGuidance?: string | null;
  officialSourceUrl?: string | null;
}

export interface StudentDocumentItemRowProps {
  item: UnifiedDocumentItem;
  onUpload: (type: string) => void;
  onDelete?: (type: string, title: string) => void;
  isUploading?: boolean;
  isDeleting?: boolean;
}

export function StudentDocumentItemRow({
  item,
  onUpload,
  onDelete,
  isUploading = false,
  isDeleting = false,
}: StudentDocumentItemRowProps) {
  const [showGuidance, setShowGuidance] = useState(false);

  const normStatus = (item.status || 'MISSING').toUpperCase();
  const isVerified = normStatus === 'VERIFIED';
  const isPending = normStatus === 'PENDING' || normStatus === 'UNDER_REVIEW' || normStatus === 'UPLOADED';
  const isRejected = normStatus === 'REJECTED' || normStatus === 'REJECT_REUPLOAD';
  const isNotApplicable = normStatus === 'NOT_APPLICABLE';
  const isMissing = !isVerified && !isPending && !isRejected && !isNotApplicable;
  const isUploaded = isVerified || isPending || Boolean(item.url);

  const isBusy = isUploading || isDeleting;
  const category = item.category || DOCUMENT_CATALOGUE.find((d) => d.type === item.type)?.category;

  return (
    <div className="bg-white dark:bg-[#151B27] rounded-2xl p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Document details */}
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {category && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
              {category}
            </span>
          )}

          {item.required && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-md border border-red-200 dark:border-red-900">
              Required
            </span>
          )}

          {isVerified && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
              Verified &amp; Certified
            </span>
          )}

          {isPending && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800">
              Pending Review
            </span>
          )}

          {isRejected && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800">
              Action Required
            </span>
          )}

          {isNotApplicable && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800">
              Not Applicable
            </span>
          )}

          {isMissing && (
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700">
              Not Uploaded
            </span>
          )}

          {item.officialSourceUrl && (
            <a
              href={item.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-gray-400 hover:text-germany-red flex items-center gap-0.5 ml-1"
              title="Official Source"
            >
              <span>Source</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
          {item.title}
        </h3>

        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
          {item.description}
        </p>

        {/* Upload details / Filename */}
        {item.url && (
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{item.originalFilename || `${item.title}.pdf`}</span>
            {item.uploadedAt && (
              <span className="text-gray-400 font-normal">
                · Uploaded {new Date(item.uploadedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}

        {/* Counsellor Feedback / Rejection Note */}
        {isRejected && item.rejectionNote && (
          <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold mt-1">
            <span className="font-extrabold">Counsellor Feedback: </span>
            {item.rejectionNote}
          </div>
        )}

        {/* Counsellor Notes */}
        {item.counsellorNotes && (
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-semibold mt-1">
            <span className="font-extrabold">Counsellor Advice: </span>
            {item.counsellorNotes}
          </div>
        )}

        {/* Condition Notes */}
        {item.conditionNotes && (
          <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{item.conditionNotes}</span>
          </div>
        )}

        {/* Collapsible Consular Specs Guidance */}
        {item.preparationGuidance && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowGuidance(!showGuidance)}
              className="text-[11px] font-bold text-gray-500 hover:text-germany-red flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Info className="w-3 h-3 text-germany-red" />
              <span>{showGuidance ? 'Hide preparation rules & consular specs' : 'View Preparation Rules & Consular Specs'}</span>
              {showGuidance ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showGuidance && (
              <div className="mt-1.5 p-3 bg-gray-50 dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 rounded-xl text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.preparationGuidance}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
        {/* Preview Document if uploaded */}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="Preview document in new tab"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </a>
        )}

        {/* Delete button */}
        {onDelete && item.url && !isRejected && (
          <button
            type="button"
            disabled={isBusy}
            onClick={() => onDelete(item.type, item.title)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
            title="Delete document"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        )}

        {/* Upload or Replace button */}
        {!isNotApplicable && (
          <button
            type="button"
            disabled={isBusy}
            onClick={() => onUpload(item.type)}
            className="px-4 py-2 bg-germany-red text-white hover:bg-germany-red/90 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploaded || isRejected ? 'Replace' : 'Upload'}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
