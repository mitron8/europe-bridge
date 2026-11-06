"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { StudentDocumentItemRow, UnifiedDocumentItem } from '@/components/StudentDocumentItemRow';
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
  Sparkles,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface ProgrammeSopItem {
  recommendationId: string;
  programmeId: number | null;
  universityName: string;
  programName: string;
  degree?: string;
  deadline?: string;
  documentId: string | null;
  status: 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_GENERATED' | 'GENERATING' | 'FAILED';
  url: string | null;
  originalFilename: string | null;
  rejectionNote: string | null;
  uploadedAt: string | null;
}

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
  PENDING: {
    label: 'Pending Review',
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
  REJECTED: {
    label: 'Action Required',
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
  NOT_GENERATED: {
    label: 'Not Generated',
    style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700',
  },
  GENERATING: {
    label: 'Generating AI Draft...',
    style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
  },
  FAILED: {
    label: 'Generation Failed',
    style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
  },
};

export default function StudentVisaAssistancePage() {
  const [checklist, setChecklist] = useState<VisaChecklistItem[]>([]);
  const [sopRecords, setSopRecords] = useState<ProgrammeSopItem[]>([]);
  const [progress, setProgress] = useState<VisaReadinessProgress | null>(null);
  const [generalNotes, setGeneralNotes] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Upload & Action State
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [activeGuidanceKey, setActiveGuidanceKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadItem, setSelectedUploadItem] = useState<VisaChecklistItem | null>(null);

  const openFileDialog = (itemKeyOrDocType: string) => {
    const targetItem = checklist.find(
      (c) => c.key === itemKeyOrDocType || c.uploadDocumentType === itemKeyOrDocType
    );
    if (!targetItem) return;
    setSelectedUploadItem(targetItem);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedUploadItem) {
      handleUpload(selectedUploadItem, file);
    }
  };

  const handleDelete = async (docType: string, docTitle?: string) => {
    if (!window.confirm(`Are you sure you want to delete your uploaded ${docTitle || docType}?`)) {
      return;
    }
    setDeletingKey(docType);
    try {
      const res = await fetch(`${API_URL}/student/documents/${docType}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete document');
      }
      setActionSuccess('Document deleted successfully.');
      setTimeout(() => setActionSuccess(''), 5000);
      await loadVisaChecklist();
    } catch (e: any) {
      setActionError(e.message || 'Delete failed. Please try again.');
    } finally {
      setDeletingKey(null);
    }
  };

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
      setSopRecords(data.sopRecords || []);
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
  const uploadableChecklist = filteredChecklist.filter(
    (item) => item.key !== 'motivation_letter_visa' && item.uploadDocumentType !== 'motivation_letter_visa'
  );

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
        <div className="space-y-6">
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploadableChecklist.map((item) => {
              const unifiedItem: UnifiedDocumentItem = {
                type: item.uploadDocumentType,
                title: item.title,
                description: item.description,
                required: item.isMandatory,
                status: item.status,
                url: item.documentUrl,
                uploadedAt: item.uploadedAt,
                verifiedAt: item.verifiedAt,
                rejectionNote: item.rejectionNote,
                originalFilename: item.originalFilename,
                category: item.category,
                conditionNotes: item.conditionNotes,
                counsellorNotes: item.counsellorNotes,
                preparationGuidance: item.preparationGuidance,
                officialSourceUrl: item.officialSourceUrl,
              };

              return (
                <StudentDocumentItemRow
                  key={item.key}
                  item={unifiedItem}
                  onUpload={() => openFileDialog(item.key)}
                  onDelete={() => handleDelete(item.uploadDocumentType, item.title)}
                  isUploading={uploadingKey === item.key}
                  isDeleting={deletingKey === item.uploadDocumentType}
                />
              );
            })}
          </div>

          {/* Programme-Specific Statements of Purpose (SOP) Section */}
          {(selectedCategory === 'ALL' || selectedCategory === 'Additional Supporting') && (
            <div className="bg-white dark:bg-[#151B27] rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-germany-gold" />
                    <span>Statements of Purpose (SOP) by Programme</span>
                  </h3>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                    Individual SOPs tailored to each shortlisted university and programme. Each document undergoes dedicated counsellor review.
                  </p>
                </div>
                <Link
                  href="/dashboard/student/documents"
                  className="text-xs font-extrabold text-germany-red hover:underline flex items-center gap-1"
                >
                  <span>Open SOP Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {sopRecords.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-[#111622] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-500">
                  No shortlisted programmes found. Once your counsellor shortlists programmes, individual SOP records will appear here.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sopRecords.map((sop) => {
                    const badge = STATUS_BADGES[sop.status] || STATUS_BADGES.NOT_GENERATED || {
                      label: 'Not Generated',
                      style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700',
                    };
                    return (
                      <div
                        key={sop.recommendationId}
                        className="p-4 bg-gray-50 dark:bg-[#1A2234] rounded-2xl border border-gray-200/60 dark:border-gray-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                            {sop.degree || 'Master of Science'}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badge.style}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-gray-900 dark:text-white leading-tight">
                            {sop.programName}
                          </h4>
                          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            <span>{sop.universityName}</span>
                          </div>
                        </div>

                        {sop.originalFilename && (
                          <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate">
                            {sop.originalFilename}
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between border-t border-gray-200/60 dark:border-gray-800">
                          <div className="text-[10px] text-gray-400">
                            {sop.deadline ? `Deadline: ${sop.deadline}` : 'Intake: Winter Semester'}
                          </div>
                          {sop.url ? (
                            <a
                              href={sop.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 text-xs font-extrabold rounded-lg hover:bg-gray-100 flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Preview</span>
                            </a>
                          ) : (
                            <Link
                              href="/dashboard/student/documents"
                              className="px-3 py-1.5 bg-germany-red text-white text-xs font-extrabold rounded-lg hover:bg-germany-red/90 flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Generate</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

