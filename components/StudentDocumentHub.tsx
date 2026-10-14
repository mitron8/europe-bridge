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

  useEffect(() => {
    loadDocuments();
    loadNotifications();
  }, [loadDocuments, loadNotifications]);

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
      setActionError(e.message || 'Upload failed. Please try again.');
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
      setActionError(e.message || 'Failed to delete document');
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

  if (!checklist) return null;

  const { items, progress } = checklist;

  return (
    <div className="space-y-6">
      {/* Header Banner - Matching APS Checklist Style */}
      <div className="neu-card p-6 md:p-8 bg-white relative shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* Notification Bell */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
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
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200/80 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
            <FolderOpen className="w-3.5 h-3.5 text-germany-gold" />
            <span>Document Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-germany-black">General Application Documents</h1>
          <p className="text-xs md:text-sm font-bold text-gray-500 max-w-2xl">
            Upload your university transcripts, degree certificates, financial proofs, and health insurance for university evaluation and counsellor verification.
          </p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="neu-card p-6 bg-white space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Mandatory General Documents</p>
            <p className="text-2xl font-display font-extrabold text-germany-black mt-0.5">
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
        <div className="w-full h-2.5 bg-[#EBE7E0] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Action Notifications Banner */}
      {actionError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={() => setActionError('')} className="ml-auto cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-200">
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
      <div className="neu-card p-6 bg-white space-y-4">
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
                    <p className="text-xs font-extrabold text-germany-black">{item.title}</p>

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
                  {isUploaded || isRejected ? (
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
          SECTION 2: LOR, SOP & CV (COMING SOON PLACEHOLDER)
      ======================================================== */}
      <div className="neu-card p-6 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-600">
                Section 2 • LOR, SOP &amp; Academic CV
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Specialized German application dossiers and motivation profile tailoring.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-900 border border-amber-300/40 self-start sm:self-auto">
            Coming Soon
          </span>
        </div>

        {/* Informative placeholder rows matching the checklist aesthetic */}
        <div className="space-y-3">
          {[
            {
              title: 'Academic Curriculum Vitae (CV)',
              description: 'Tabular format tailored to German academia standards (Europass format without rating bars).',
              badge: 'Coming Soon',
            },
            {
              title: 'Statement of Purpose (SOP)',
              description: 'Course-specific motivation essay demonstrating credit module alignment and academic intent.',
              badge: 'Coming Soon',
            },
            {
              title: 'Letters of Recommendation (LOR)',
              description: 'Official recommendations from university professors or research mentors.',
              badge: 'Coming Soon',
            },
          ].map((placeholder) => (
            <div
              key={placeholder.title}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-gray-100 text-gray-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-gray-700">{placeholder.title}</p>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-gray-200/80 text-gray-600">
                      {placeholder.badge}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">{placeholder.description}</p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-extrabold text-gray-400 italic">
                  Guided during 1-on-1 consultations
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
