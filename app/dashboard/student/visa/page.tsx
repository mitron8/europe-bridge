"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plane,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Eye,
  Check,
  Loader2,
  Building2,
  Upload,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Info,
  Calendar,
  AlertTriangle,
  FileCheck2,
  HelpCircle,
  Trash2,
  BadgeAlert,
  FileQuestion,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface VisaChecklistItem {
  key: string;
  category: string;
  title: string;
  description: string;
  isMandatory: boolean;
  isConditional: boolean;
  conditionNotes: string | null;
  officialSourceUrl: string;
  lastVerifiedDate: string;
  preparationGuidance: string;
  uploadDocumentType: string;
  status: 'MISSING' | 'UPLOADED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECT_REUPLOAD' | 'NOT_APPLICABLE';
  isApplicable: boolean;
  notApplicableReason: string | null;
  notApplicableSetAt: string | null;
  counsellorNotes: string | null;
  counsellorNotesUpdatedAt: string | null;
  documentId: string | null;
  documentUrl: string | null;
  originalFilename: string | null;
  uploadedAt: string | null;
  verifiedAt: string | null;
  rejectionNote: string | null;
}

interface VisaReadinessProgress {
  totalRequirements: number;
  totalApplicable: number;
  verifiedCount: number;
  underReviewCount: number;
  reuploadCount: number;
  missingCount: number;
  notApplicableCount: number;
  readinessPercentage: number;
}

const STATUS_BADGES: Record<string, { label: string; style: string }> = {
  VERIFIED: {
    label: 'Verified by Counsellor',
    style: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
  },
  UNDER_REVIEW: {
    label: 'Under Counsellor Review',
    style: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
  },
  UPLOADED: {
    label: 'Uploaded · Pending Review',
    style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
  },
  REJECT_REUPLOAD: {
    label: 'Correction Required',
    style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
  },
  MISSING: {
    label: 'Missing · Upload Required',
    style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700',
  },
  NOT_APPLICABLE: {
    label: 'Not Applicable · Exempted',
    style: 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800',
  },
};

export default function StudentVisaAssistancePage() {
  const [checklist, setChecklist] = useState<VisaChecklistItem[]>([]);
  const [progress, setProgress] = useState<VisaReadinessProgress | null>(null);
  const [generalNotes, setGeneralNotes] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Upload & Action State
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [activeGuidanceKey, setActiveGuidanceKey] = useState<string | null>(null);

  const loadVisaChecklist = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_URL}/visa/checklist`, { credentials: 'include' });
      if (!res.ok) {
        throw new Error('Failed to load German student visa checklist');
      }
      const data = await res.json();
      setChecklist(data.items || []);
      setProgress(data.progress || null);
      setGeneralNotes(data.generalCounsellorNotes || null);
      setDisclaimer(data.disclaimer || '');
    } catch (err: any) {
      setError(err.message || 'Error loading visa checklist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisaChecklist();
  }, [loadVisaChecklist]);

  // Upload / Replace handler using centralized ImageKit pipeline
  const handleUpload = async (item: VisaChecklistItem, file: File) => {
    setUploadingKey(item.key);
    setActionError('');
    setActionSuccess('');

    try {
      // 1. Get signed ImageKit upload authorization
      const authRes = await fetch(`${API_URL}/visa/upload-auth`, { credentials: 'include' });
      if (!authRes.ok) throw new Error('Failed to obtain secure upload credentials');
      const auth = await authRes.json();

      // 2. Direct upload to ImageKit
      const extension = file.name.split('.').pop() || 'pdf';
      const newFileName = `${item.uploadDocumentType}+${auth.userId}.${extension}`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', newFileName);
      formData.append('publicKey', auth.publicKey);
      formData.append('signature', auth.signature);
      formData.append('expire', String(auth.expire));
      formData.append('token', auth.token);
      formData.append('folder', auth.folder);

      const ikResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (!ikResponse.ok) {
        throw new Error('ImageKit file upload failed. Please try again.');
      }
      const ikResult = await ikResponse.json();

      // 3. Confirm with centralized document endpoint
      const confirmRes = await fetch(`${API_URL}/visa/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: item.uploadDocumentType,
          imagekitFileId: ikResult.fileId,
          imagekitUrl: ikResult.url,
          imagekitFilePath: ikResult.filePath,
          originalFilename: file.name,
          mimeType: file.type || 'application/pdf',
          fileSizeBytes: file.size,
        }),
      });

      if (!confirmRes.ok) {
        const body = await confirmRes.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to save document in centralized storage');
      }

      setActionSuccess(`"${file.name}" uploaded successfully! It is now pending counsellor review.`);
      setTimeout(() => setActionSuccess(''), 5000);
      await loadVisaChecklist();
    } catch (err: any) {
      setActionError(err.message || 'Upload failed');
    } finally {
      setUploadingKey(null);
    }
  };

  // Group categories for filtering
  const categories = ['ALL', ...Array.from(new Set(checklist.map((c) => c.category)))];
  const filteredChecklist =
    selectedCategory === 'ALL'
      ? checklist
      : checklist.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151B27] rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 bg-germany-red/10 text-germany-red text-xs font-black uppercase tracking-wider rounded-full border border-germany-red/20 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" />
                <span>Phase 4 · German Student Visa Assistance</span>
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                Consular Checklist 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              German Visa Document Checklist
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
              Centralized preparation checklist adhering to official German Missions in India requirements. All documents uploaded elsewhere in EuroBridge are automatically synchronized.
            </p>
          </div>

          {/* Visa Readiness Score Card */}
          {progress && (
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1A2234] px-5 py-4 rounded-2xl border border-gray-200/60 dark:border-gray-800 shrink-0">
              <div className="text-right space-y-0.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  Visa Readiness
                </div>
                <div className="text-xl font-black text-gray-900 dark:text-white">
                  {progress.verifiedCount} / {progress.totalApplicable}
                </div>
                <div className="text-[10px] font-bold text-gray-500">Verified Requirements</div>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-black text-sm text-emerald-600 dark:text-emerald-400 shadow-xs">
                {progress.readinessPercentage}%
              </div>
            </div>
          )}
        </div>

        {/* Quick Readiness Breakdown Bar */}
        {progress && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80">
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Verified Ready</div>
              <div className="text-lg font-black text-emerald-900 dark:text-emerald-200">{progress.verifiedCount}</div>
            </div>
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
              <div className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">Under Review</div>
              <div className="text-lg font-black text-amber-900 dark:text-amber-200">{progress.underReviewCount}</div>
            </div>
            <div className="p-3 bg-red-50/70 dark:bg-red-950/20 rounded-xl border border-red-200/60 dark:border-red-900/40">
              <div className="text-[10px] font-bold uppercase text-red-700 dark:text-red-400">Action Required</div>
              <div className="text-lg font-black text-red-900 dark:text-red-200">{progress.reuploadCount}</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#1A2234] rounded-xl border border-gray-200/60 dark:border-gray-800">
              <div className="text-[10px] font-bold uppercase text-gray-500">Missing Uploads</div>
              <div className="text-lg font-black text-gray-700 dark:text-gray-300">{progress.missingCount}</div>
            </div>
          </div>
        )}
      </div>

      {/* Scope Limitation Disclaimer Banner */}
      <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-800/80 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 dark:text-amber-300">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold uppercase tracking-wide">Important Consular Notice: </span>
          {disclaimer ||
            'EuroBridge provides German student visa document preparation assistance and counsellor review only. EuroBridge does NOT submit visa applications, book consular appointments, pay visa fees, or operate official German consular portals on behalf of students. Students are independently responsible for their official application submission at VFS Global / German Missions in India.'}
        </div>
      </div>

      {/* General Counsellor Guidance Banner (if provided) */}
      {generalNotes && (
        <div className="p-4 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl flex items-start gap-3.5 text-xs text-blue-900 dark:text-blue-300">
          <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          <div>
            <div className="font-extrabold text-blue-950 dark:text-blue-200 mb-0.5">
              General Instructions from your Assigned Counsellor:
            </div>
            <p className="whitespace-pre-wrap font-medium">{generalNotes}</p>
          </div>
        </div>
      )}

      {/* Feedback Alerts */}
      {actionSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-center gap-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}
      {actionError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 rounded-2xl flex items-center gap-3 text-xs font-bold animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A2234] border border-gray-200 dark:border-gray-800'
            }`}
          >
            {cat === 'ALL' ? 'All Requirements' : cat}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-gray-200 dark:border-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-3" />
          <p className="text-xs font-bold text-gray-500">Loading visa checklist &amp; central records...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-xs font-bold text-red-600">{error}</p>
          <button
            onClick={loadVisaChecklist}
            className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-bold rounded-xl hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredChecklist.map((item) => {
            const badge = STATUS_BADGES[item.status] || STATUS_BADGES.MISSING;
            const isUploading = uploadingKey === item.key;
            const isGuidanceOpen = activeGuidanceKey === item.key;

            return (
              <div
                key={item.key}
                className={`bg-white dark:bg-[#151B27] rounded-2xl p-5 border shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  item.status === 'NOT_APPLICABLE'
                    ? 'opacity-70 border-gray-200 dark:border-gray-800/60 bg-gray-50/50 dark:bg-[#111622]'
                    : 'border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {/* Details Column */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                      {item.category}
                    </span>

                    {item.isMandatory ? (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-md border border-red-200 dark:border-red-900">
                        Mandatory
                      </span>
                    ) : item.isConditional ? (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-900">
                        Conditional
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md">
                        Optional
                      </span>
                    )}

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.style}`}>
                      {badge.label}
                    </span>

                    {item.officialSourceUrl && (
                      <a
                        href={item.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-gray-400 hover:text-germany-red flex items-center gap-0.5"
                        title="View Official German Mission Guidance"
                      >
                        <span>Official Source</span>
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

                  {/* Condition notes */}
                  {item.conditionNotes && (
                    <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 shrink-0" />
                      <span>{item.conditionNotes}</span>
                    </div>
                  )}

                  {/* Not Applicable explanation */}
                  {item.status === 'NOT_APPLICABLE' && item.notApplicableReason && (
                    <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-semibold">
                      <span className="font-black">Counsellor Exemption: </span>
                      {item.notApplicableReason}
                    </div>
                  )}

                  {/* Counsellor Guidance Notes on this item */}
                  {item.counsellorNotes && (
                    <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900 text-amber-900 dark:text-amber-300 rounded-xl text-xs font-semibold">
                      <span className="font-black">Counsellor Advice: </span>
                      {item.counsellorNotes}
                    </div>
                  )}

                  {/* Rejection / Correction feedback note */}
                  {item.rejectionNote && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold">
                      <span className="font-black">Correction Needed: </span>
                      {item.rejectionNote}
                    </div>
                  )}

                  {/* Associated File details */}
                  {item.originalFilename && (
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.originalFilename}</span>
                      {item.uploadedAt && (
                        <span className="text-gray-400 font-normal">
                          · Uploaded {new Date(item.uploadedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Preparation Guidance Drawer Toggle */}
                  <div className="pt-1">
                    <button
                      onClick={() => setActiveGuidanceKey(isGuidanceOpen ? null : item.key)}
                      className="text-[11px] font-extrabold text-germany-red hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>{isGuidanceOpen ? 'Hide Preparation Rules' : 'View Preparation Rules & Consular Specs'}</span>
                    </button>
                    {isGuidanceOpen && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-600 dark:text-gray-300 leading-relaxed space-y-1 animate-fadeIn">
                        <div className="font-bold text-gray-900 dark:text-white">Official Consular Guidance:</div>
                        <p>{item.preparationGuidance}</p>
                        <div className="text-[10px] text-gray-400 pt-1">
                          Last verified with German diplomatic missions: {item.lastVerifiedDate}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Column */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                  {/* Preview Document */}
                  {item.documentUrl && (
                    <a
                      href={item.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </a>
                  )}

                  {/* Upload / Replace Button */}
                  {item.status !== 'NOT_APPLICABLE' && (
                    <label className="relative cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.webp"
                        className="sr-only"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(item, file);
                        }}
                      />
                      <span className="px-4 py-2 bg-germany-red text-white hover:bg-germany-red/90 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                        {isUploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{item.documentUrl ? 'Replace' : 'Upload'}</span>
                          </>
                        )}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

