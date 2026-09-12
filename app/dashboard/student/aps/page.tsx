"use client";

import React, { useState, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  Upload,
  Trash2,
  AlertCircle,
  Loader2,
  FileText,
  X,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// shape we get from checklist api, basically what backend spits out
type ChecklistItem = {
  type: string;
  title: string;
  description: string;
  required: boolean;
  status: 'UPLOADED' | 'MISSING';
  uploadedAt: string | null;
  url: string | null;
  originalFilename: string | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null); // documentType being uploaded
  const [deleting, setDeleting] = useState<string | null>(null);   // documentType being deleted
  const [actionError, setActionError] = useState('');

  // fetching the checklist. backend does all the math, we just render it cause we're lazy
  const loadChecklist = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await apiFetch<ChecklistResponse>('/aps/checklist');
      setChecklist(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load APS checklist');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => { loadChecklist(); }, [loadChecklist]);

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
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
      setActionError(e.message || 'Upload failed. Please try again.');
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
      setActionError(e.message || 'Failed to delete document');
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

  if (error) {
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
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>
        <div className="mt-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-germany-gold" />
            <span>Step 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-germany-black">APS Checklist</h1>
          <p className="text-xs md:text-sm font-bold text-gray-500">
            Upload the required documents for your APS (Akademische Prüfstelle) application.
          </p>
        </div>
      </div>

      {/* progress bar. don't touch the math, it comes from backend */}
      <div className="neu-card p-6 bg-white space-y-3">
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
        <div className="w-full h-2.5 bg-[#EBE7E0] rounded-full overflow-hidden">
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
      <div className="neu-card p-6 bg-white space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">Documents</h2>
        <div className="space-y-3">
          {items.map((item) => {
            const isUploaded = item.status === 'UPLOADED';
            const isUploading = uploading === item.type;
            const isDeleting = deleting === item.type;
            const isBusy = isUploading || isDeleting;

            return (
              <div
                key={item.type}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  isUploaded
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-white border-[#EBE7E0] hover:border-germany-red/30'
                }`}
              >
                {/* Status icon */}
                <div className="shrink-0 mt-0.5">
                  {isUploaded ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className={`w-5 h-5 ${item.required ? 'text-germany-red/40' : 'text-gray-300'}`} />
                  )}
                </div>

                {/* Document info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-extrabold text-germany-black">{item.title}</p>
                    {item.required && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-germany-red/10 text-germany-red">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">{item.description}</p>
                  {isUploaded && item.originalFilename && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <FileText className="w-3 h-3 text-emerald-600" />
                      <a
                        href={item.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-emerald-600 hover:underline truncate max-w-xs"
                      >
                        {item.originalFilename}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2">
                  {isUploaded ? (
                    <>
                      {/* Replace */}
                      <button
                        disabled={isBusy}
                        onClick={() => openFileDialog(item.type)}
                        className="p-2 rounded-xl text-gray-400 hover:text-germany-red hover:bg-germany-red/10 transition-colors disabled:opacity-40"
                        title="Replace"
                      >
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </button>
                      {/* Delete */}
                      <button
                        disabled={isBusy}
                        onClick={() => handleDelete(item.type)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                        title="Delete"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      disabled={isBusy}
                      onClick={() => openFileDialog(item.type)}
                      className="flex items-center gap-1.5 px-3 py-2 neu-btn-primary text-[11px] font-extrabold disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
