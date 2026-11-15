"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { StudentDocumentItemRow } from '@/components/StudentDocumentItemRow';
import StudentStageGate from '@/components/StudentStageGate';
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

import {
  DocumentItem,
  ProgrammeSopItem,
  ApplicationItem,
} from './components/types';
import { StudentAdmissionDocumentsTab } from './components/StudentAdmissionDocumentsTab';
import { StudentAdmissionApplicationsTab } from './components/StudentAdmissionApplicationsTab';

export default function StudentAdmissionPage({ defaultTab }: { defaultTab?: 'documents' | 'applications' } = {}) {
  const searchParams = useSearchParams();
  const initialTab = defaultTab || (searchParams.get('tab') === 'applications' ? 'applications' : 'documents');
  const [activeTab, setActiveTab] = useState<'documents' | 'applications'>(initialTab);

  const handleTabChange = (tab: 'documents' | 'applications') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.replaceState(null, '', url.toString());
      } catch {
        // Safe fallback
      }
    }
  };

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

  const [gates, setGates] = useState<any>(null);
  const [gatesLoading, setGatesLoading] = useState(true);

  // Group categories for filtering
  const categories = ['ALL', ...Array.from(new Set(documents.map((d) => d.category)))];
  const filteredDocuments =
    selectedCategory === 'ALL'
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  useEffect(() => {
    const fetchGates = async () => {
      try {
        const res = await fetch(`${API_URL}/student/gates`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setGates(data);
        }
      } catch (e) {
        console.error('Failed to load gates in admission', e);
      } finally {
        setGatesLoading(false);
      }
    };
    fetchGates();
  }, []);

  if (gatesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-400">Loading admission & applications...</p>
        </div>
      </div>
    );
  }

  if (gates && !gates.applicationsUnlocked) {
    if (!gates.hasActivePlan) {
      return <StudentStageGate type="applications_plan_needed" />;
    }
    return <StudentStageGate type="applications_lock_needed" />;
  }

  if (appsError && (appsError.toLowerCase().includes('plan') || docError.toLowerCase().includes('plan'))) {
    return <StudentStageGate type="applications_plan_needed" />;
  }
  if (appsError && (appsError.toLowerCase().includes('locked') || appsError.toLowerCase().includes('shortlist') || docError.toLowerCase().includes('locked') || docError.toLowerCase().includes('shortlist'))) {
    return <StudentStageGate type="applications_lock_needed" />;
  }

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
            onClick={() => handleTabChange('documents')}
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
            onClick={() => handleTabChange('applications')}
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
        <StudentAdmissionDocumentsTab
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          docLoading={docLoading}
          docError={docError}
          loadDocuments={loadDocuments}
          filteredDocuments={filteredDocuments}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          openFileDialog={openFileDialog}
          handleDelete={handleDelete}
          uploadingType={uploadingType}
          deletingType={deletingType}
          sopRecords={sopRecords}
        />
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: MY APPLICATIONS (BASED ON LOCKED SHORTLIST)
      ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'applications' && (
        <StudentAdmissionApplicationsTab
          isLocked={isLocked}
          appsLoading={appsLoading}
          appsError={appsError}
          applications={applications}
          revealingId={revealingId}
          revealedCreds={revealedCreds}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          copiedField={copiedField}
          copyToClipboard={copyToClipboard}
          handleRevealCredentials={handleRevealCredentials}
        />
      )}
    </div>
  );
}

