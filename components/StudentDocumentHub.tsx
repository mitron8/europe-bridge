"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Upload,
  Trash2,
  AlertCircle,
  Loader2,
  FileText,
  X,
  Bell,
  BellRing,
  Check,
  Clock,
  ExternalLink,
  BookOpen,
  FileEdit,
  FolderOpen,
} from 'lucide-react';
import { GENERAL_DOCUMENT_CATALOGUE } from '@/lib/documentCatalogue';
import { StudentCvGenerator } from './StudentCvGenerator';
import { StudentSopGenerator } from './StudentSopGenerator';
import { StudentLorGenerator } from './StudentLorGenerator';
import StudentStageGate from './StudentStageGate';

type StudentNotification = {
  id: string;
  message: string;
  created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

type ChecklistItem = {
  type: string;
  title: string;
  description: string;
  required: boolean;
  status: 'UPLOADED' | 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  uploadedAt: string | null;
  url: string | null;
  originalFilename: string | null;
  rejectionNote: string | null;
};

type ChecklistResponse = {
  items: ChecklistItem[];
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
};

type UploadAuth = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  folder: string;
  userId: string;
};

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function StudentDocumentHub() {
  const [checklist, setChecklist] = useState<ChecklistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentView, setCurrentView] = useState<'documents' | 'cv' | 'sop' | 'lor'>('documents');
  const [sopStatus, setSopStatus] = useState<any>(null);
  const [lorStatus, setLorStatus] = useState<any>(null);
  const [cvStatus, setCvStatus] = useState<{
    status?: string;
    jobStatus?: string;
    isGenerating?: boolean;
    updatedAt?: string;
  } | null>(null);

  const loadDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await apiFetch<ChecklistResponse>('/student/documents');
      setChecklist(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await apiFetch<StudentNotification[]>('/student/notifications');
      setNotifications(data || []);
    } catch (e) {
      console.error('Failed to load notifications', e);
    }
  }, []);

  const loadDossierStatuses = useCallback(async () => {
    try {
      const [sopRes, lorRes] = await Promise.allSettled([
        apiFetch<any>('/student/sop'),
        apiFetch<any>('/student/lor'),
      ]);
      if (sopRes.status === 'fulfilled' && sopRes.value?.document) {
        setSopStatus(sopRes.value.document);
      }
      if (lorRes.status === 'fulfilled' && lorRes.value?.document) {
        setLorStatus(lorRes.value.document);
      }
    } catch {}
  }, []);

  const loadCvStatus = useCallback(async () => {
    try {
      const res = await apiFetch<any>('/student/cv/status');
      setCvStatus({
        status: res.document?.status,
        jobStatus: res.job?.status,
        isGenerating: res.job?.status === 'pending' || res.job?.status === 'processing',
        updatedAt: res.document?.uploadedAt,
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadDocuments();
    loadNotifications();
    loadCvStatus();
  }, [loadDocuments, loadNotifications, loadCvStatus]);

  const markNotificationDone = async (id: string) => {
    try {
      await apiFetch(`/student/notifications/${id}/done`, { method: 'POST' });
      await loadNotifications();
    } catch (e) {
      console.error('Failed to mark notification done', e);
    }
  };

  const handleUpload = async (documentType: string, file: File) => {
    setUploading(documentType);
    setActionError('');
    setActionSuccess('');

    try {
      // Step 1: Request signed upload auth from backend
      const auth = await apiFetch<UploadAuth>('/student/documents/upload-auth');

      // Step 2: Upload directly to ImageKit
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

      const ikResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!ikResponse.ok) {
        const ikError = await ikResponse.json().catch(() => ({}));
        throw new Error(ikError.message || 'File upload failed. Please try again.');
      }

      const ikResult = await ikResponse.json();

      // Step 3: Confirm upload with backend
      await apiFetch('/student/documents/upload', {
        method: 'POST',
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

      setActionSuccess(`"${file.name}" uploaded successfully! It is now pending verification by your counsellor.`);
      setTimeout(() => setActionSuccess(''), 5000);
      await loadDocuments();
      await loadNotifications();
    } catch (e: any) {
      const msg = e.message || 'Upload failed. Please try again.';
      setActionError(msg);
      if (msg.includes('locked') || msg.includes('finalizes') || msg.includes('shortlist') || msg.includes('plan')) {
        setError(msg);
      }
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (documentType: string, docTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete your uploaded ${docTitle}?`)) {
      return;
    }

    setDeleting(documentType);
    setActionError('');
    setActionSuccess('');
    try {
      await apiFetch(`/student/documents/${documentType}`, { method: 'DELETE' });
      setActionSuccess(`${docTitle} was deleted.`);
      setTimeout(() => setActionSuccess(''), 4000);
      await loadDocuments();
    } catch (e: any) {
      const msg = e.message || 'Failed to delete document';
      setActionError(msg);
      if (msg.includes('locked') || msg.includes('finalizes') || msg.includes('shortlist') || msg.includes('plan')) {
        setError(msg);
      }
    } finally {
      setDeleting(null);
    }
  };

  const openFileDialog = (documentType: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleUpload(documentType, file);
    };
    input.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-400">Loading your document repository...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errLower = error.toLowerCase();
    if (errLower.includes('plan')) {
      return <StudentStageGate type="documents_plan_needed" />;
    }
    if (errLower.includes('locked') || errLower.includes('finalizes') || errLower.includes('shortlist')) {
      return <StudentStageGate type="documents_lock_needed" />;
    }
    return (
      <div className="p-8 bg-red-50 rounded-2xl flex items-start gap-3 text-red-600 border border-red-200">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm">Failed to load documents</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={loadDocuments} className="mt-3 text-xs font-extrabold underline cursor-pointer">
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'cv') {
    return (
      <StudentCvGenerator
        onBack={() => {
          setCurrentView('documents');
          loadDocuments();
          loadCvStatus();
        }}
      />
    );
  }

  if (currentView === 'sop') {
    return (
      <StudentSopGenerator
        onBack={() => {
          setCurrentView('documents');
          loadDocuments();
        }}
      />
    );
  }

  if (currentView === 'lor') {
    return (
      <StudentLorGenerator
        onBack={() => {
          setCurrentView('documents');
          loadDocuments();
        }}
      />
    );
  }

  if (!checklist) return null;

  const { items, progress } = checklist;

  return (
    <div className="space-y-6">
      {/* Header Banner - Matching APS Checklist Style */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative shadow-[12px_12px_30px_rgba(210,205,195,0.6)] dark:shadow-none">
        {/* Notification Bell */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
            aria-label="View notifications"
          >
            {notifications.length > 0 ? (
              <>
                <BellRing className="w-5 h-5 text-germany-red animate-pulse" />
                <span className="absolute -top-1.5 -right-1.5 bg-germany-red text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </>
            ) : (
              <Bell className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0E121A] flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-germany-black">Counsellor Alerts &amp; Updates</h3>
                <span className="text-[10px] font-bold text-gray-400">{notifications.length} Unread</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs font-bold text-gray-400">
                    No active document revisions requested.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3.5 hover:bg-[#FDFBF7] transition-colors flex items-start gap-3">
                        <div className="p-1.5 bg-red-100 text-red-600 rounded-lg shrink-0 mt-0.5">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-700 leading-tight">{n.message}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1">
                            {new Date(n.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => markNotificationDone(n.id)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                          title="Mark as done"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* German Tricolor Header Line */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="mt-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
              <FolderOpen className="w-3.5 h-3.5 text-germany-gold" />
              <span>Document Hub</span>
            </div>
            {/* View Switcher Tabs */}
            <div className="inline-flex items-center p-1 bg-gray-100/90 dark:bg-gray-800/90 rounded-xl gap-1 border border-gray-200/60 dark:border-gray-700/60">
              <button
                type="button"
                onClick={() => setCurrentView('documents')}
                className="px-3 py-1 bg-white dark:bg-[#151B27] text-germany-black dark:text-white rounded-lg text-xs font-black shadow-xs cursor-pointer"
              >
                General Documents
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('cv')}
                className="flex items-center gap-1.5 px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white rounded-lg text-xs font-black transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-germany-gold" />
                <span>CV Generator</span>
                {cvStatus?.isGenerating && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                )}
                {cvStatus?.status === 'PENDING' && !cvStatus.isGenerating && (
                  <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded text-[9px] font-black">
                    In Review
                  </span>
                )}
                {cvStatus?.status === 'VERIFIED' && (
                  <span className="px-1.5 py-0.2 bg-emerald-200 text-emerald-900 rounded text-[9px] font-black">
                    Verified
                  </span>
                )}
              </button>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-germany-black dark:text-white">General Application Documents</h1>
          <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 max-w-2xl">
            Upload your university transcripts, degree certificates, financial proofs, and health insurance for university evaluation and counsellor verification.
          </p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Mandatory General Documents</p>
            <p className="text-2xl font-display font-extrabold text-germany-black dark:text-white mt-0.5">
              {progress.completed}
              <span className="text-lg font-bold text-gray-400">/{progress.total}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Completion</p>
            <p className="text-2xl font-display font-extrabold text-germany-red mt-0.5">
              {progress.percentage}%
            </p>
          </div>
        </div>
        <div className="w-full h-2.5 bg-[#EBE7E0] dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Action Notifications Banner */}
      {actionError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-200 dark:border-red-900/50">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={() => setActionError('')} className="ml-auto cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess('')} className="ml-auto cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          SECTION 1: GENERAL DOCUMENTS CHECKLIST
      ======================================================== */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">
            Section 1 • General Documents
          </h2>
          <p className="text-xs font-bold text-gray-500">
            Documents submitted here are directly accessible to your assigned counsellor for review and submission clearance.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {items.map((item) => {
            const isVerified = item.status === 'VERIFIED';
            const isPending = item.status === 'PENDING';
            const isRejected = item.status === 'REJECTED';
            const isMissing = item.status === 'MISSING';
            const isUploaded = isVerified || isPending;

            const isUploading = uploading === item.type;
            const isDeleting = deleting === item.type;
            const isBusy = isUploading || isDeleting;

            let bgColor = 'bg-white border-[#EBE7E0] hover:border-germany-red/30';
            if (isVerified) bgColor = 'bg-emerald-50/70 border-emerald-200';
            else if (isPending) bgColor = 'bg-amber-50/70 border-amber-200';
            else if (isRejected) bgColor = 'bg-red-50/80 border-red-200';

            return (
              <div
                key={item.type}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${bgColor}`}
              >
                {/* Status icon */}
                <div className="shrink-0 mt-0.5">
                  {isVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isPending ? (
                    <Clock className="w-5 h-5 text-amber-500" />
                  ) : isRejected ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <Circle className={`w-5 h-5 ${item.required ? 'text-germany-red/40' : 'text-gray-300'}`} />
                  )}
                </div>

                {/* Document details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-extrabold text-germany-black dark:text-white">{item.title}</p>

                    {item.required && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-germany-red/10 text-germany-red">
                        Required
                      </span>
                    )}

                    {isVerified && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        Verified &amp; Accepted
                      </span>
                    )}

                    {isPending && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                        Pending Verification
                      </span>
                    )}

                    {isRejected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700">
                        Revision Needed
                      </span>
                    )}

                    {isMissing && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-500">
                        Not Uploaded
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">{item.description}</p>

                  {/* Rejection Note Display */}
                  {isRejected && item.rejectionNote && (
                    <div className="mt-2.5 p-3 bg-white rounded-xl border border-red-200 text-xs text-red-800 flex items-start gap-2 shadow-2xs">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-red-900">Counsellor Feedback: </span>
                        <span>{item.rejectionNote}</span>
                      </div>
                    </div>
                  )}

                  {/* Uploaded File Reference */}
                  {item.url && item.originalFilename && (
                    <div className="flex items-center gap-2 mt-2">
                      <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-germany-black hover:text-germany-red hover:underline truncate max-w-xs inline-flex items-center gap-1"
                        title="Open document in new tab"
                      >
                        <span>{item.originalFilename}</span>
                        <ExternalLink className="w-3 h-3 inline-block shrink-0" />
                      </a>
                      {item.uploadedAt && (
                        <span className="text-[10px] font-bold text-gray-400">
                          • Uploaded {new Date(item.uploadedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2">
                  {['cv', 'sop', 'lor'].includes(item.type) ? (
                    <div className="flex items-center gap-2">
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Approved</span>
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Under Review</span>
                        </span>
                      ) : isRejected ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                          <span>Revision Needed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                          <Circle className="w-3.5 h-3.5 text-gray-400" />
                          <span>Not Generated</span>
                        </span>
                      )}
                    </div>
                  ) : isUploaded || isRejected ? (
                    <>
                      {/* Replace / Re-upload Button */}
                      <button
                        disabled={isBusy}
                        onClick={() => openFileDialog(item.type)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-extrabold transition-colors cursor-pointer disabled:opacity-50 ${
                          isRejected
                            ? 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
                            : 'text-gray-600 hover:text-germany-red hover:bg-germany-red/10 border border-gray-200/80 bg-white'
                        }`}
                        title="Upload a new replacement file"
                      >
                        {isUploading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isUploading ? 'Uploading...' : isRejected ? 'Replace File' : 'Replace'}</span>
                      </button>

                      {/* Delete Button */}
                      {!isRejected && (
                        <button
                          disabled={isBusy}
                          onClick={() => handleDelete(item.type, item.title)}
                          className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 cursor-pointer"
                          title="Delete file"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    /* Initial Upload Button */
                    <button
                      disabled={isBusy}
                      onClick={() => openFileDialog(item.type)}
                      className="flex items-center gap-1.5 px-3.5 py-2 neu-btn-primary text-[11px] font-extrabold disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {isUploading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          SECTION 2: LOR, SOP & ACADEMIC CV
      ======================================================== */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Section 2 • LOR, SOP &amp; Academic CV
              </h2>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Specialized German application dossiers and motivation profile tailoring.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
            Active Dossier
          </span>
        </div>

        {/* Active Academic Curriculum Vitae (CV) Generator Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/30 dark:from-amber-950/20 dark:via-[#151B27] dark:to-[#151B27] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/70 dark:border-amber-900/50 shrink-0 mt-0.5 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-black text-gray-900 dark:text-gray-100">
                  Academic Curriculum Vitae (CV)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/50">
                  German Format
                </span>

                {cvStatus?.isGenerating ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Generating...</span>
                  </span>
                ) : cvStatus?.status === 'VERIFIED' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified &amp; Approved</span>
                  </span>
                ) : cvStatus?.status === 'PENDING' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Pending Counsellor Verification</span>
                  </span>
                ) : cvStatus?.status === 'REJECTED' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Revision Requested</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    Ready to Generate
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
                Europass two-column tabular layout. Automatically synchronizes your student education and experience, polishes your summaries with AI, and renders a certified PDF for counsellor verification.
              </p>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setCurrentView('cv')}
              className="flex items-center gap-1.5 px-4 py-2 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {cvStatus?.isGenerating
                  ? 'View Progress'
                  : cvStatus?.status === 'VERIFIED'
                  ? 'View & Download CV'
                  : cvStatus?.status === 'PENDING'
                  ? 'View Status'
                  : 'Open CV Generator'}
              </span>
            </button>
          </div>
        </div>

        {/* SOP and LOR Interactive Dossier Builders */}
        <div className="space-y-4">
          {/* SOP Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151B27] shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-germany-red border border-red-100 dark:border-red-900/50 shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-black text-gray-900 dark:text-gray-100">
                    Statement of Purpose (SOP / Motivationsschreiben)
                  </h4>
                  {sopStatus?.status === 'VERIFIED' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified &amp; Approved</span>
                    </span>
                  ) : sopStatus?.status === 'PENDING' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Pending Counsellor Verification</span>
                    </span>
                  ) : sopStatus?.status === 'REJECTED' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Revision Requested</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      AI Guided
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
                  Course-specific motivation essay demonstrating credit module alignment, research methodology, and Prüfungsordnung intent.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 italic">
                    Guided during 1-on-1 consultations
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setCurrentView('sop')}
                className="flex items-center gap-1.5 px-4 py-2 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{sopStatus?.status ? 'View Status & Edit' : 'Open SOP Generator'}</span>
              </button>
            </div>
          </div>

          {/* LOR Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-[#151B27] shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-black text-gray-900 dark:text-gray-100">
                    Letters of Recommendation (LOR / Empfehlungsschreiben)
                  </h4>
                  {lorStatus?.status === 'VERIFIED' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified &amp; Approved</span>
                    </span>
                  ) : lorStatus?.status === 'PENDING' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Pending Counsellor Verification</span>
                    </span>
                  ) : lorStatus?.status === 'REJECTED' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Revision Requested</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Official Reference
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
                  Official recommendations from university professors or research mentors validating your cohort rank and independent scientific aptitude (Selbstständigkeit).
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 italic">
                    Guided during 1-on-1 consultations
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setCurrentView('lor')}
                className="flex items-center gap-1.5 px-4 py-2 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lorStatus?.status ? 'View Status & Edit' : 'Open LOR Generator'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}
