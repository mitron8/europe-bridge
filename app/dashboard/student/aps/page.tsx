"use client";

import { StudentDocumentItemRow } from '@/components/StudentDocumentItemRow';

import React, { useState, useCallback } from 'react';
import StudentStageGate from '@/components/StudentStageGate';
import {
  CheckCircle2,
  Circle,
  Upload,
  Trash2,
  AlertCircle,
  Loader2,
  FileText,
  X,
  Eye,
  Bell,
  BellRing,
  Check,
  Clock,
} from 'lucide-react';

type StudentNotification = {
  id: string;
  message: string;
  created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

// shape we get from checklist api, basically what backend spits out
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

// Shape returned by GET /aps/upload-auth
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

export default function ApsChecklist() {
  const [checklist, setChecklist] = useState<ChecklistResponse | null>(null);
  const [gates, setGates] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null); // documentType being uploaded
  const [deleting, setDeleting] = useState<string | null>(null);   // documentType being deleted
  const [actionError, setActionError] = useState('');
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // fetching the checklist. backend does all the math, we just render it cause we're lazy
  const loadChecklist = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const [data, gatesData] = await Promise.all([
        apiFetch<ChecklistResponse>('/aps/checklist'),
        apiFetch<any>('/student/gates').catch(() => null),
      ]);
      setChecklist(data);
      if (gatesData) setGates(gatesData);
    } catch (e: any) {
      setError(e.message || 'Failed to load APS checklist');
      // If error occurred, attempt to fetch gates to know why
      try {
        const g = await apiFetch<any>('/student/gates');
        setGates(g);
      } catch {}
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

  React.useEffect(() => { 
    loadChecklist(); 
    loadNotifications();
  }, [loadChecklist, loadNotifications]);

  const markNotificationDone = async (id: string) => {
    try {
      await apiFetch(`/student/notifications/${id}/done`, { method: 'POST' });
      await loadNotifications();
    } catch (e) {
      console.error('Failed to mark notification done', e);
    }
  };

  // upload flow:
  // 1. grab auth token from backend
  // 2. yeet the file directly to imagekit so our server doesn't crash
  // 3. tell backend we did it so they save it
  const handleUpload = async (documentType: string, file: File) => {
    setUploading(documentType);
    setActionError('');

    try {
      // Step 1: Get signed upload auth from backend
      const auth = await apiFetch<UploadAuth>('/aps/upload-auth');

      // Step 2: Upload directly to ImageKit using their Upload API v1
      // change filename to match exactly what the user wants: pasport+id (retaining extension)
      const extension = file.name.split('.').pop();
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
        throw new Error(ikError.message || 'ImageKit upload failed');
      }

      const ikResult = await ikResponse.json();

      // Step 3: Confirm the upload with backend — backend validates and saves
      await apiFetch('/aps/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType,
          imagekitFileId: ikResult.fileId,
          imagekitUrl: ikResult.url,
          imagekitFilePath: ikResult.filePath,
          originalFilename: file.name,
          mimeType: file.type,
          fileSizeBytes: file.size,
        }),
      });

      // fetch again so it actually shows up
      await loadChecklist();
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

  const handleDelete = async (documentType: string) => {
    setDeleting(documentType);
    setActionError('');
    try {
      await apiFetch(`/aps/document/${documentType}`, { method: 'DELETE' });
      await loadChecklist();
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
    // just a suggestion, users can bypass this so backend still checks it
    input.accept = '.pdf,.jpg,.jpeg,.png,.webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleUpload(documentType, file);
    };
    input.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-400">Loading APS checklist...</p>
        </div>
      </div>
    );
  }

  if (gates && !gates.apsUnlocked) {
    if (!gates.hasActivePlan) {
      return <StudentStageGate type="aps_plan_needed" />;
    }
    return <StudentStageGate type="aps_lock_needed" />;
  }

  if (error) {
    const errLower = error.toLowerCase();
    if (errLower.includes('plan')) {
      return <StudentStageGate type="aps_plan_needed" />;
    }
    if (errLower.includes('locked') || errLower.includes('finalizes') || errLower.includes('shortlist')) {
      return <StudentStageGate type="aps_lock_needed" />;
    }
    return (
      <div className="p-8 bg-red-50 rounded-2xl flex items-start gap-3 text-red-600">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm">Failed to load APS checklist</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={loadChecklist} className="mt-3 text-xs font-extrabold underline">
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
      {/* Header */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative shadow-[12px_12px_30px_rgba(210,205,195,0.6)] dark:shadow-none">
        
        {/* Notification Bell */}
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1E2638] transition-colors shadow-xs"
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
                <h3 className="text-xs font-extrabold text-germany-black dark:text-white">Notifications</h3>
                <span className="text-[10px] font-bold text-gray-400">{notifications.length} Unread</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs font-bold text-gray-400">
                    You're all caught up!
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3.5 hover:bg-[#FDFBF7] transition-colors flex items-start gap-3">
                        <div className="p-1.5 bg-red-100 text-red-600 rounded-lg shrink-0 mt-0.5">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-700 leading-tight">
                            {n.message}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1">
                            {new Date(n.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button 
                          onClick={() => markNotificationDone(n.id)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
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

        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>
        <div className="mt-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-red text-white rounded-full font-extrabold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Step 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-germany-black dark:text-white">APS Checklist</h1>
          <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400">
            Upload the required documents for your APS (Akademische Prüfstelle) application.
          </p>
        </div>
      </div>

      {/* progress bar. don't touch the math, it comes from backend */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Required Documents</p>
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
        <div className="w-full h-2.5 bg-[#EBE7E0] dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Action error banner */}
      {actionError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={() => setActionError('')} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* render the list. simple loop, nothing crazy */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">Documents</h2>
        <div className="space-y-3">
          {items.filter((item) => !['cv', 'sop', 'lor'].includes(item.type)).map((item) => (
            <StudentDocumentItemRow
              key={item.type}
              item={item}
              onUpload={openFileDialog}
              onDelete={(type) => handleDelete(type)}
              isUploading={uploading === item.type}
              isDeleting={deleting === item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
