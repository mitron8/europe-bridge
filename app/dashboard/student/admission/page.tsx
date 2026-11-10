"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { StudentDocumentItemRow } from '@/components/StudentDocumentItemRow';
import {
  FileText,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Loader2,
  Building2,
  FileCheck,
  Upload,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Info,
  Calendar,
  KeyRound,
  FileCheck2,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface DocumentItem {
  type: string;
  category: string;
  title: string;
  description: string;
  required: boolean;
  isAiGenerated: boolean;
  status: 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_GENERATED' | 'GENERATING' | 'FAILED';
  uploadedAt: string | null;
  url: string | null;
  originalFilename: string | null;
  rejectionNote: string | null;
}

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

interface ApplicationItem {
  id: string;
  recommendationId: string;
  programmeId: number | null;
  universityName: string;
  programmeName: string;
  degree: string;
  location: string;
  portalUrl: string;
  applicationId: string;
  applicationStatus: string;
  submissionDate: string | null;
  deadline: string | null;
  counsellorNotes: string;
  hasCredentials: boolean;
  updatedAt: string;
}

const STATUS_BADGES: Record<string, { label: string; style: string }> = {
  VERIFIED: { label: 'Verified & Certified', style: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' },
  PENDING: { label: 'Pending Review', style: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800' },
  REJECTED: { label: 'Action Required', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
  MISSING: { label: 'Not Uploaded', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700' },
  NOT_GENERATED: { label: 'Not Generated', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700' },
  GENERATING: { label: 'Generating AI Draft...', style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800' },
  FAILED: { label: 'Generation Failed', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
};

const APP_STATUS_STYLES: Record<string, { label: string; style: string }> = {
  NOT_STARTED: { label: 'Not Started', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700' },
  IN_PROGRESS: { label: 'In Progress', style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800' },
  SUBMITTED: { label: 'Submitted', style: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800' },
  ACCEPTED: { label: 'Offer Received', style: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' },
  REJECTED: { label: 'Unsuccessful', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
  WAITLISTED: { label: 'Waitlisted', style: 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800' },
};

export default function StudentAdmissionPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'applications' ? 'applications' : 'documents';
  const [activeTab, setActiveTab] = useState<'documents' | 'applications'>(initialTab);

  // Document Hub State
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [sopRecords, setSopRecords] = useState<ProgrammeSopItem[]>([]);
  const [docProgress, setDocProgress] = useState({ completed: 0, total: 0, percentage: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const [deletingType, setDeletingType] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadDocType, setSelectedUploadDocType] = useState<string | null>(null);

  const openFileDialog = (docType: string) => {
    setSelectedUploadDocType(docType);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedUploadDocType) {
      handleUpload(selectedUploadDocType, file);
    }
  };

  const handleDelete = async (documentType: string, docTitle?: string) => {
    if (!window.confirm(`Are you sure you want to delete your uploaded ${docTitle || documentType}?`)) {
      return;
    }
    setDeletingType(documentType);
    try {
      const res = await fetch(`${API_URL}/student/documents/${documentType}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete document');
      }
      setActionSuccess('Document deleted successfully.');
      setTimeout(() => setActionSuccess(''), 5000);
      await loadDocuments();
    } catch (e: any) {
      setActionError(e.message || 'Delete failed. Please try again.');
    } finally {
      setDeletingType(null);
    }
  };

  // Applications State
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  // Credential Reveal State
  const [revealingId, setRevealingId] = useState<string | null>(null);
  const [revealedCreds, setRevealedCreds] = useState<Record<string, { username: string; password: string }>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Load Document Hub
  const loadDocuments = useCallback(async () => {
    try {
      setDocLoading(true);
      setDocError('');
      const res = await fetch(`${API_URL}/admission/documents`, { credentials: 'include' });
      if (!res.ok) {
        throw new Error('Failed to load admission documents');
      }
      const data = await res.json();
      setDocuments(data.items || []);
      setSopRecords(data.sopRecords || []);
      setDocProgress(data.progress || { completed: 0, total: 0, percentage: 0 });
    } catch (err: any) {
      setDocError(err.message || 'Error loading admission documents');
    } finally {
      setDocLoading(false);
    }
  }, []);

  // Load Applications
  const loadApplications = useCallback(async () => {
    try {
      setAppsLoading(true);
      setAppsError('');
      const res = await fetch(`${API_URL}/admission/applications`, { credentials: 'include' });
      if (!res.ok) {
        throw new Error('Failed to load applications');
      }
      const data = await res.json();
      setIsLocked(Boolean(data.isLocked));
      setApplications(data.applications || []);
    } catch (err: any) {
      setAppsError(err.message || 'Error loading university applications');
    } finally {
      setAppsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
    loadApplications();
  }, [loadDocuments, loadApplications]);

  // Handle Standard Document Upload (Synchronized with centralized storage)
  const handleUpload = async (documentType: string, file: File) => {
    setUploadingType(documentType);
    setActionError('');
    setActionSuccess('');

    try {
      // 1. Get ImageKit auth
      const authRes = await fetch(`${API_URL}/student/documents/upload-auth`, { credentials: 'include' });
      if (!authRes.ok) throw new Error('Failed to obtain secure upload credentials');
      const auth = await authRes.json();

      // 2. Direct upload to ImageKit
      const extension = file.name.split('.').pop() || 'pdf';
      const newFileName = `${documentType}+${auth.userId}.${extension}`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', newFileName);
      formData.append('publicKey', auth.publicKey);
      formData.append('signature', auth.signature);
      formData.append('expire', String(auth.expire));
      formData.append('token', auth.token);
      formData.append('folder', auth.folder);
      formData.append('isPrivateFile', 'true');

      const ikResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (!ikResponse.ok) {
        throw new Error('ImageKit upload failed. Please try again.');
      }
      const ikResult = await ikResponse.json();

      // 3. Confirm with centralized document endpoint
      const confirmRes = await fetch(`${API_URL}/student/documents/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType,
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
        throw new Error(body.message || 'Failed to confirm document upload with server');
      }

      setActionSuccess(`"${file.name}" uploaded successfully! It is now pending counsellor verification.`);
      setTimeout(() => setActionSuccess(''), 5000);
      await loadDocuments();
    } catch (err: any) {
      setActionError(err.message || 'Upload failed');
    } finally {
      setUploadingType(null);
    }
  };

  // Explicit Credential Reveal Action
  const handleRevealCredentials = async (appId: string) => {
    if (revealedCreds[appId]) {
      setShowPassword((prev) => ({ ...prev, [appId]: !prev[appId] }));
      return;
    }

    try {
      setRevealingId(appId);
      const res = await fetch(`${API_URL}/admission/applications/${appId}/reveal-credentials`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to retrieve portal credentials');
      }
      const data = await res.json();
      setRevealedCreds((prev) => ({
        ...prev,
        [appId]: {
          username: data.portalUsername || 'Not provided',
          password: data.portalPassword || 'Not provided',
        },
      }));
      setShowPassword((prev) => ({ ...prev, [appId]: true }));
    } catch (err: any) {
      alert(err.message || 'Error revealing credentials');
    } finally {
      setRevealingId(null);
    }
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Group categories for filtering
  const categories = ['ALL', ...Array.from(new Set(documents.map((d) => d.category)))];
  const filteredDocuments =
    selectedCategory === 'ALL'
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151B27] rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 bg-germany-red/10 text-germany-red text-xs font-black uppercase tracking-wider rounded-full border border-germany-red/20">
                Phase 3 · University Admission Hub
              </span>
              {isLocked ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-300 dark:border-emerald-800">
                  <Lock className="w-3.5 h-3.5" /> Shortlist Locked
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-300 dark:border-amber-800">
                  <Clock className="w-3.5 h-3.5" /> Shortlist Pending Lock
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Admission Management
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
              Track admission documents, monitor generated dossier materials, and manage university application portals with encrypted credentials.
            </p>
          </div>

          {/* Quick Progress Indicator */}
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1A2234] px-5 py-3.5 rounded-2xl border border-gray-200/60 dark:border-gray-800 shrink-0">
            <div className="text-right">
              <div className="text-xs font-extrabold text-gray-500 dark:text-gray-400">Required Documents</div>
              <div className="text-xl font-black text-gray-900 dark:text-white">
                {docProgress.completed} / {docProgress.total}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-black text-xs text-emerald-600 dark:text-emerald-400">
              {docProgress.percentage}%
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-gray-100 dark:border-gray-800/80">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-germany-red text-white shadow-md shadow-germany-red/20'
                : 'bg-white dark:bg-[#1A2234] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document Hub</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white">
              {documents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-germany-red text-white shadow-md shadow-germany-red/20'
                : 'bg-white dark:bg-[#1A2234] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>My Applications</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white">
              {applications.length}
            </span>
          </button>
        </div>
      </div>

      {/* Alerts */}
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

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: DOCUMENT HUB
      ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Synchronized Notice Banner */}
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-2xl flex items-start gap-3.5 text-xs text-blue-900 dark:text-blue-300">
            <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
            <div>
              <span className="font-extrabold">Unified Central Storage: </span>
              All documents uploaded here are automatically synced across your EuroBridge account. If you already uploaded your passport or transcripts in the APS Checklist, they appear here without needing a second upload.
            </div>
          </div>

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
                {cat === 'ALL' ? 'All Documents' : cat}
              </button>
            ))}
          </div>

          {/* Documents Grid / List */}
          {docLoading ? (
            <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-gray-200 dark:border-gray-800">
              <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-500">Loading admission checklist &amp; dossier records...</p>
            </div>
          ) : docError ? (
            <div className="p-8 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-red-200 dark:border-red-900/40">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-red-600">{docError}</p>
              <button
                onClick={loadDocuments}
                className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-bold rounded-xl hover:bg-gray-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="hidden"
              />
              {filteredDocuments.map((doc) => (
                <StudentDocumentItemRow
                  key={doc.type}
                  item={doc}
                  onUpload={openFileDialog}
                  onDelete={handleDelete}
                  isUploading={uploadingType === doc.type}
                  isDeleting={deletingType === doc.type}
                />
              ))}
            </div>
          )}

          {/* Programme-Specific SOPs Section */}
          <div className="bg-white dark:bg-[#151B27] rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-germany-gold" />
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
                  const badge = STATUS_BADGES[sop.status] || STATUS_BADGES.NOT_GENERATED;
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
                            <FileCheck className="w-3 h-3" />
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
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: MY APPLICATIONS (BASED ON LOCKED SHORTLIST)
      ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {/* Status Alert if Shortlist is not locked */}
          {!isLocked && (
            <div className="p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-3xl flex items-start gap-3.5 text-xs text-amber-900 dark:text-amber-300">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-sm text-amber-900 dark:text-amber-200">
                  Shortlist Finalization in Progress
                </h4>
                <p className="mt-1 font-medium leading-relaxed">
                  Your university shortlist is currently being reviewed by your assigned Germany education counsellor. Once your counsellor finalizes and locks the shortlist, official application tracking and university portal credentials will be actively updated here.
                </p>
              </div>
            </div>
          )}

          {/* Applications Cards Grid */}
          {appsLoading ? (
            <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-gray-200 dark:border-gray-800">
              <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-500">Loading university application portals...</p>
            </div>
          ) : appsError ? (
            <div className="p-8 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-red-200 dark:border-red-900/40">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-red-600">{appsError}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 space-y-3">
              <Building2 className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
              <h3 className="text-sm font-black text-gray-900 dark:text-white">
                No Locked Applications Yet
              </h3>
              <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
                Applications are populated directly from your locked university shortlist. Visit the shortlist page to review your recommendations with your counsellor.
              </p>
              <Link
                href="/dashboard/student/shortlist"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 shadow-sm"
              >
                <span>View Shortlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {applications.map((app) => {
                const statusInfo = APP_STATUS_STYLES[app.applicationStatus] || APP_STATUS_STYLES.NOT_STARTED;
                const isRevealing = revealingId === app.id;
                const creds = revealedCreds[app.id];
                const isPasswordShown = Boolean(showPassword[app.id]);

                return (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-[#151B27] rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all flex flex-col justify-between space-y-5"
                  >
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                          {app.degree || 'Master of Science'} · {app.location || 'Germany'}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusInfo.style}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                          {app.programmeName}
                        </h3>
                        <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          <span>{app.universityName}</span>
                        </div>
                      </div>

                      {/* Application Metadata Badges */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2.5 bg-gray-50 dark:bg-[#1A2234] rounded-xl border border-gray-100 dark:border-gray-800">
                          <div className="text-gray-400 text-[10px] font-bold">Application ID / Ref</div>
                          <div className="font-extrabold text-gray-800 dark:text-gray-200 truncate">
                            {app.applicationId || 'Not assigned yet'}
                          </div>
                        </div>

                        <div className="p-2.5 bg-gray-50 dark:bg-[#1A2234] rounded-xl border border-gray-100 dark:border-gray-800">
                          <div className="text-gray-400 text-[10px] font-bold">Deadline</div>
                          <div className="font-extrabold text-gray-800 dark:text-gray-200">
                            {app.deadline || 'July 15, 2026'}
                          </div>
                        </div>
                      </div>

                      {/* Portal Link */}
                      {app.portalUrl && (
                        <div className="flex items-center justify-between p-2.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300">
                          <span className="truncate pr-2">{app.portalUrl}</span>
                          <a
                            href={app.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-md shrink-0 cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                          </a>
                        </div>
                      )}

                      {/* Counsellor Notes */}
                      {app.counsellorNotes && (
                        <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 rounded-xl text-xs text-amber-900 dark:text-amber-300">
                          <div className="font-extrabold flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-400 mb-1">
                            <Info className="w-3.5 h-3.5" />
                            <span>Counsellor Instructions</span>
                          </div>
                          <p className="font-medium whitespace-pre-wrap">{app.counsellorNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Portal Credentials Section (Encrypted at Rest with AES-256-GCM) */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-gray-400 flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-germany-gold" />
                          <span>Portal Credentials</span>
                        </span>
                        {app.hasCredentials ? (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Encrypted Vault
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400">
                            Awaiting counsellor setup
                          </span>
                        )}
                      </div>

                      {app.hasCredentials ? (
                        <div className="space-y-2">
                          {creds ? (
                            <div className="p-3.5 bg-gray-50 dark:bg-[#1A2234] rounded-2xl border border-gray-200/70 dark:border-gray-800 space-y-2.5">
                              {/* Username */}
                              <div className="flex items-center justify-between text-xs">
                                <div>
                                  <div className="text-[10px] font-bold text-gray-400">Portal Username / Email</div>
                                  <div className="font-extrabold text-gray-900 dark:text-white select-all">
                                    {creds.username}
                                  </div>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(creds.username, `user-${app.id}`)}
                                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                                  title="Copy username"
                                >
                                  {copiedField === `user-${app.id}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              {/* Password */}
                              <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/50 dark:border-gray-800">
                                <div>
                                  <div className="text-[10px] font-bold text-gray-400">Portal Password</div>
                                  <div className="font-extrabold text-gray-900 dark:text-white font-mono select-all">
                                    {isPasswordShown ? creds.password : '••••••••••••'}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => setShowPassword((prev) => ({ ...prev, [app.id]: !prev[app.id] }))}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                                    title={isPasswordShown ? 'Hide Password' : 'Show Password'}
                                  >
                                    {isPasswordShown ? (
                                      <EyeOff className="w-3.5 h-3.5" />
                                    ) : (
                                      <Eye className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => copyToClipboard(creds.password, `pass-${app.id}`)}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                                    title="Copy password"
                                  >
                                    {copiedField === `pass-${app.id}` ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleRevealCredentials(app.id)}
                              disabled={isRevealing}
                              className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {isRevealing ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-germany-red" />
                                  <span>Authorizing &amp; Decrypting...</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Reveal Credentials</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 dark:bg-[#1A2234] rounded-xl text-center text-xs text-gray-400 font-medium">
                          Portal credentials have not been configured by your counsellor yet.
                        </div>
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
  );
}

