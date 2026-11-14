"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { DocumentPreviewModal } from './student-detail/DocumentPreviewModal';
import { DocumentRejectionModal } from './student-detail/DocumentRejectionModal';
import { StudentOverviewTab } from './student-detail/StudentOverviewTab';
import { StudentDocumentsTab } from './student-detail/StudentDocumentsTab';
import { StudentUniversitiesTab } from './student-detail/StudentUniversitiesTab';
import { StudentNotesTasksTab } from './student-detail/StudentNotesTasksTab';
import { StudentAdmissionTab } from './student-detail/StudentAdmissionTab';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Copy,
  Check,
  Calendar,
  GraduationCap,
  FileText,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  EyeOff,
  Send,
  Clock,
  User,
  Compass,
  FileCheck2,
  Plane,
  Save,
  Building2,
  AlertTriangle,
  Eye,
  CheckSquare,
  Square,
  Plus,
  Filter,
  ExternalLink,
  Award,
  Target,
  Download,
  AlertCircle,
  Loader2,
  Circle,
  RefreshCw,
  Search,
  Ban,
  Trash2,
  Lock,
  Unlock,
  Bookmark,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Info,
  Upload,
} from 'lucide-react';
import { AssignedStudent } from './CounsellorStudents';
import { StudentFullProfileView } from './StudentFullProfileView';
import { ProgrammeCard } from './cards/ProgrammeCard';
import { MeetingBookingModal } from './MeetingBookingModal';

export interface StudentDocument {
  id: string;
  name: string;
  category: string;
  section: 'aps' | 'admission' | 'visa' | 'general' | 'cv' | 'sop' | 'lor' | 'lor_sop_cv';
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: string;
  previewSnippet?: string;
  previewContent?: string;
  url?: string;
  mimeType?: string;
  originalFilename?: string;
  documentType?: string;
}

import {
  APS_DOCUMENT_CATALOGUE,
  ADMISSION_DOCUMENT_CATALOGUE,
  VISA_DOCUMENT_CATALOGUE,
  GENERAL_DOCUMENT_CATALOGUE,
  CatalogueDocument,
  DOCUMENT_CATALOGUE,
  DOCUMENT_TYPE_LABELS,
  formatBytes,
} from '@/lib/documentCatalogue';

function findMatchingDoc(catItem: CatalogueDocument, docs: StudentDocument[]): StudentDocument | undefined {
  const matches = docs.filter((d) => {
    if (d.documentType === catItem.type) return true;
    if (catItem.matchedDocumentTypes && catItem.matchedDocumentTypes.includes(d.documentType || '')) {
      return true;
    }
    return false;
  });
  if (matches.length === 0) return undefined;
  const verifiedMatch = matches.find((m) => m.status === 'verified');
  if (verifiedMatch) return verifiedMatch;
  const pendingMatch = matches.find((m) => m.status === 'pending');
  if (pendingMatch) return pendingMatch;
  return matches[0];
}

function mapDbDocToStudentDocument(row: any): StudentDocument {
  const catItem = DOCUMENT_CATALOGUE.find((c) => c.type === row.document_type);
  const meta = catItem
    ? { name: catItem.name, category: catItem.category }
    : DOCUMENT_TYPE_LABELS[row.document_type] || {
      name: row.original_filename || (row.document_type ? row.document_type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : 'Document'),
      category: 'General',
    };

  let section: 'aps' | 'admission' | 'visa' | 'general' | 'cv' | 'sop' | 'lor' = 'general';
  if (row.document_type === 'cv' || row.section === 'cv') {
    section = 'cv';
  } else if (row.document_type === 'sop' || row.section === 'sop') {
    section = 'sop';
  } else if (row.document_type === 'lor' || row.section === 'lor') {
    section = 'lor';
  } else if (row.section && row.section !== 'lor_sop_cv') {
    section = row.section;
  } else if ([
    'passport',
    'aadhaar',
    'class10_marksheet',
    'class10_certificate',
    'class12_marksheet',
    'class12_certificate',
    'bachelors_marksheets',
    'testas_result',
    'english_certificate',
    'german_certificate',
    'aps_application',
    'aps_fee_receipt',
    'student_authorization_letter',
  ].includes(row.document_type)) {
    section = 'aps';
  }

  const statusLower = (row.status || '').toLowerCase();
  let status: 'verified' | 'pending' | 'rejected' = 'pending';
  if (statusLower === 'verified') status = 'verified';
  else if (statusLower === 'rejected') status = 'rejected';

  const uploadDate = row.uploaded_at
    ? new Date(row.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Unknown';

  const verifiedAt = row.verified_at
    ? new Date(row.verified_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : undefined;

  return {
    id: row.id,
    documentType: row.document_type,
    name: meta.name,
    category: meta.category,
    section,
    size: formatBytes(row.file_size_bytes),
    uploadDate,
    status,
    rejectionReason: row.rejection_note || undefined,
    verifiedAt,
    url: row.imagekit_url || (row.preview_content ? `data:text/plain;charset=utf-8,${encodeURIComponent(row.preview_content)}` : undefined),
    previewContent: row.preview_content || undefined,
    mimeType: row.mime_type || undefined,
    originalFilename: row.original_filename || undefined,
    previewSnippet: row.original_filename ? `File: ${row.original_filename}` : undefined,
  };
}

export interface UniversityMatch {
  id: string;
  programmeId?: number | string;
  name: string;
  program: string;
  degree: string;
  location: string;
  matchScore: number;
  bavarianGpaReq: string;
  ieltsReq: string;
  tuition: string;
  language?: string;
  programUrl?: string;
  subject?: string;
  status: 'recommended' | 'shortlisted' | 'applied' | 'offer_received' | 'waitlisted';
  deadline: string;
  type: string;
  notes?: string;
  counsellorName?: string;
}

export interface ConsultationTask {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
}

const MATCH_ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
  CONDITIONAL: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
  NEEDS_REVIEW: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
  NOT_ELIGIBLE: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60',
};

const MATCH_ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

export interface StudentDetailModalProps {
  student?: AssignedStudent | null;
  studentId?: string;
  onClose?: () => void;
  isPage?: boolean;
  readOnly?: boolean;
}

export function StudentDetailModal({
  student: propStudent,
  studentId,
  onClose,
  isPage = false,
  readOnly = false,
}: StudentDetailModalProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'universities' | 'notes' | 'admission'>('overview');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [lastNoteUpdated, setLastNoteUpdated] = useState<string | null>(null);
  const [isNoteDirty, setIsNoteDirty] = useState(false);
  const isNoteFocusedRef = useRef(false);
  const noteDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const [fetchedStudent, setFetchedStudent] = useState<AssignedStudent | null>(null);
  const student = propStudent || fetchedStudent;
  const effectiveStudentId = student?.userId || propStudent?.userId || studentId || '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

  // Admission Applications Management State
  const [admissionApplications, setAdmissionApplications] = useState<any[]>([]);
  const [admissionLoading, setAdmissionLoading] = useState(false);
  const [admissionError, setAdmissionError] = useState<string | null>(null);
  const [admissionSavingId, setAdmissionSavingId] = useState<string | null>(null);
  const [admissionSuccessMsg, setAdmissionSuccessMsg] = useState<Record<string, string>>({});
  const [admissionFormState, setAdmissionFormState] = useState<Record<string, any>>({});
  const [admissionRevealedCreds, setAdmissionRevealedCreds] = useState<Record<string, { username: string; password: string }>>({});
  const [admissionRevealingId, setAdmissionRevealingId] = useState<string | null>(null);
  const [admissionShowPassword, setAdmissionShowPassword] = useState<Record<string, boolean>>({});

  const loadAdmissionApplications = useCallback(async (stId: string) => {
    if (!stId) return;
    try {
      setAdmissionLoading(true);
      setAdmissionError(null);
      const res = await fetch(`${API_URL}/admission/counsellor/students/${stId}/applications`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to load admission applications for student');
      }
      const data = await res.json();
      const apps = data.applications || [];
      setAdmissionApplications(apps);

      const initialForms: Record<string, any> = {};
      for (const app of apps) {
        initialForms[app.id] = {
          portalUrl: app.portalUrl || '',
          portalUsername: '',
          portalPassword: '',
          applicationId: app.applicationId || '',
          applicationStatus: app.applicationStatus || 'NOT_STARTED',
          submissionDate: app.submissionDate ? app.submissionDate.split('T')[0] : '',
          deadline: app.deadline ? app.deadline.split('T')[0] : '',
          counsellorNotes: app.counsellorNotes || '',
        };
      }
      setAdmissionFormState(initialForms);
    } catch (err: any) {
      setAdmissionError(err.message || 'Error loading applications');
    } finally {
      setAdmissionLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (activeTab === 'admission' && effectiveStudentId) {
      loadAdmissionApplications(effectiveStudentId);
    }
  }, [activeTab, effectiveStudentId, loadAdmissionApplications]);

  const handleUpdateAdmissionForm = (appId: string, field: string, value: string) => {
    setAdmissionFormState((prev) => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || {
          portalUrl: '',
          portalUsername: '',
          portalPassword: '',
          applicationId: '',
          applicationStatus: 'NOT_STARTED',
          submissionDate: '',
          deadline: '',
          counsellorNotes: '',
        }),
        [field]: value,
      },
    }));
  };

  const handleSaveAdmissionApp = async (appId: string) => {
    const formData = admissionFormState[appId];
    if (!formData || !effectiveStudentId) return;

    try {
      setAdmissionSavingId(appId);
      setAdmissionSuccessMsg((prev) => ({ ...prev, [appId]: '' }));

      const payload: any = {
        portalUrl: formData.portalUrl,
        applicationId: formData.applicationId,
        applicationStatus: formData.applicationStatus,
        submissionDate: formData.submissionDate || undefined,
        deadline: formData.deadline || undefined,
        counsellorNotes: formData.counsellorNotes,
      };

      if (formData.portalUsername) {
        payload.portalUsername = formData.portalUsername;
      }
      if (formData.portalPassword) {
        payload.portalPassword = formData.portalPassword;
      }

      const res = await fetch(`${API_URL}/admission/counsellor/students/${effectiveStudentId}/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to save application');
      }

      setAdmissionSuccessMsg((prev) => ({ ...prev, [appId]: 'Saved successfully! Encrypted in vault.' }));
      setTimeout(() => {
        setAdmissionSuccessMsg((prev) => ({ ...prev, [appId]: '' }));
      }, 4000);

      await loadAdmissionApplications(effectiveStudentId);
    } catch (err: any) {
      alert(err.message || 'Error saving application details');
    } finally {
      setAdmissionSavingId(null);
    }
  };

  const handleRevealCounsellorCreds = async (appId: string) => {
    if (admissionRevealedCreds[appId]) {
      setAdmissionShowPassword((prev) => ({ ...prev, [appId]: !prev[appId] }));
      return;
    }

    try {
      setAdmissionRevealingId(appId);
      const res = await fetch(`${API_URL}/admission/counsellor/students/${effectiveStudentId}/applications/${appId}/reveal-credentials`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to reveal credentials');
      }
      const data = await res.json();
      setAdmissionRevealedCreds((prev) => ({
        ...prev,
        [appId]: {
          username: data.portalUsername || '',
          password: data.portalPassword || '',
        },
      }));
      setAdmissionShowPassword((prev) => ({ ...prev, [appId]: true }));
      setAdmissionFormState((prev) => ({
        ...prev,
        [appId]: {
          ...(prev[appId] || {}),
          portalUsername: prev[appId]?.portalUsername || data.portalUsername || '',
        },
      }));
    } catch (err: any) {
      alert(err.message || 'Error revealing credentials');
    } finally {
      setAdmissionRevealingId(null);
    }
  };

  // ── Visa Assistance Management State ────────────────────────────────────────
  const [visaChecklist, setVisaChecklist] = useState<any[]>([]);
  const [visaProgress, setVisaProgress] = useState<any>(null);
  const [visaGeneralNotes, setVisaGeneralNotes] = useState<string>('');
  const [visaLoading, setVisaLoading] = useState(false);
  const [visaError, setVisaError] = useState<string | null>(null);
  const [visaActionLoading, setVisaActionLoading] = useState<string | null>(null);
  const [visaNotesEditing, setVisaNotesEditing] = useState<Record<string, string>>({});
  const [visaNotesSavingId, setVisaNotesSavingId] = useState<string | null>(null);
  const [visaSuccessMsg, setVisaSuccessMsg] = useState<Record<string, string>>({});
  const [visaGeneralNotesSaving, setVisaGeneralNotesSaving] = useState(false);

  // Exemption Modal State
  const [visaExemptItem, setVisaExemptItem] = useState<any | null>(null);
  const [visaExemptReason, setVisaExemptReason] = useState('');

  // Rejection Modal State
  const [visaRejectItem, setVisaRejectItem] = useState<any | null>(null);
  const [visaRejectReason, setVisaRejectReason] = useState('');

  const loadVisaChecklist = useCallback(async (stId: string) => {
    if (!stId) return;
    try {
      setVisaLoading(true);
      setVisaError(null);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${stId}/checklist`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to load student visa checklist');
      }
      const data = await res.json();
      setVisaChecklist(data.items || []);
      setVisaProgress(data.progress || null);
      setVisaGeneralNotes(data.generalCounsellorNotes || '');

      const initialNotes: Record<string, string> = {};
      for (const item of (data.items || [])) {
        initialNotes[item.key] = item.counsellorNotes || '';
      }
      setVisaNotesEditing(initialNotes);
    } catch (err: any) {
      setVisaError(err.message || 'Error loading visa checklist');
    } finally {
      setVisaLoading(false);
    }
  }, [API_URL]);



  const handleVerifyVisaDoc = async (documentId: string) => {
    if (!effectiveStudentId || !documentId) return;
    try {
      setVisaActionLoading(documentId);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/documents/${documentId}/verify`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to verify document');
      await loadVisaChecklist(effectiveStudentId);
      fetchDocuments();
    } catch (err: any) {
      alert(err.message || 'Failed to verify document');
    } finally {
      setVisaActionLoading(null);
    }
  };

  const handleConfirmVisaReject = async () => {
    if (!effectiveStudentId || !visaRejectItem || !visaRejectItem.documentId) return;
    const reason = visaRejectReason.trim();
    if (!reason) {
      alert('Please provide feedback explaining why this document must be corrected.');
      return;
    }

    try {
      setVisaActionLoading(visaRejectItem.documentId);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/documents/${visaRejectItem.documentId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rejectionNote: reason }),
      });
      if (!res.ok) throw new Error('Failed to request document re-upload');
      setVisaRejectItem(null);
      setVisaRejectReason('');
      await loadVisaChecklist(effectiveStudentId);
      fetchDocuments();
    } catch (err: any) {
      alert(err.message || 'Error requesting correction');
    } finally {
      setVisaActionLoading(null);
    }
  };

  const handleToggleVisaApplicability = async (item: any) => {
    if (!effectiveStudentId) return;
    if (item.isApplicable) {
      // Open modal to capture reason for exemption
      setVisaExemptItem(item);
      setVisaExemptReason('');
    } else {
      // Re-enable applicability
      try {
        setVisaActionLoading(item.key);
        const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/requirements/${item.key}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ isApplicable: true }),
        });
        if (!res.ok) throw new Error('Failed to update requirement');
        await loadVisaChecklist(effectiveStudentId);
        fetchDocuments();
      } catch (err: any) {
        alert(err.message || 'Error updating requirement');
      } finally {
        setVisaActionLoading(null);
      }
    }
  };

  const handleConfirmVisaExemption = async () => {
    if (!effectiveStudentId || !visaExemptItem) return;
    const reason = visaExemptReason.trim();
    if (!reason) {
      alert('Please state the exemption reason (e.g. DAAD scholarship holder, English waiver).');
      return;
    }

    try {
      setVisaActionLoading(visaExemptItem.key);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/requirements/${visaExemptItem.key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isApplicable: false, notApplicableReason: reason }),
      });
      if (!res.ok) throw new Error('Failed to mark requirement as not applicable');
      setVisaExemptItem(null);
      setVisaExemptReason('');
      await loadVisaChecklist(effectiveStudentId);
      fetchDocuments();
    } catch (err: any) {
      alert(err.message || 'Error saving exemption');
    } finally {
      setVisaActionLoading(null);
    }
  };

  const handleSaveVisaItemNote = async (key: string) => {
    if (!effectiveStudentId) return;
    const noteText = visaNotesEditing[key] || '';
    try {
      setVisaNotesSavingId(key);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/requirements/${key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ counsellorNotes: noteText }),
      });
      if (!res.ok) throw new Error('Failed to save advice');
      setVisaSuccessMsg((prev) => ({ ...prev, [key]: 'Note saved!' }));
      setTimeout(() => setVisaSuccessMsg((prev) => ({ ...prev, [key]: '' })), 3000);
      await loadVisaChecklist(effectiveStudentId);
    } catch (err: any) {
      alert(err.message || 'Failed to save note');
    } finally {
      setVisaNotesSavingId(null);
    }
  };

  const handleSaveVisaGeneralNotes = async () => {
    if (!effectiveStudentId) return;
    try {
      setVisaGeneralNotesSaving(true);
      const res = await fetch(`${API_URL}/visa/counsellor/students/${effectiveStudentId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ counsellorNotes: visaGeneralNotes }),
      });
      if (!res.ok) throw new Error('Failed to save general visa notes');
      alert('General visa strategy notes updated for student!');
      await loadVisaChecklist(effectiveStudentId);
    } catch (err: any) {
      alert(err.message || 'Failed to save notes');
    } finally {
      setVisaGeneralNotesSaving(false);
    }
  };

  const handleGrantAttempts = async (documentType: 'sop' | 'lor' | 'cv') => {
    if (!effectiveStudentId) return;
    try {
      setGrantingDocType(documentType);
      setGrantStatusMessage(null);
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/grant-dossier-attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ documentType }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Failed to allot extra attempts for ${documentType.toUpperCase()}`);
      }
      const addedCount = documentType === 'cv' ? 1 : 2;
      setGrantStatusMessage({
        text: `Success: Allotted +${addedCount} attempt${addedCount > 1 ? 's' : ''} for ${documentType.toUpperCase()}! Student now has ${data.newMaxGenerations - (dossierLimits?.[documentType]?.generationCount || 0)} attempts remaining.`,
        type: 'success',
      });
      // Refresh limits
      const refreshRes = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/dossier-limits`, {
        credentials: 'include',
      });
      if (refreshRes.ok) {
        const freshData = await refreshRes.json();
        setDossierLimits(freshData);
      }
      setTimeout(() => setGrantStatusMessage(null), 6000);
    } catch (err: any) {
      setGrantStatusMessage({ text: err.message || 'Network error occurred while allotting attempts', type: 'error' });
    } finally {
      setGrantingDocType(null);
    }
  };

  const [summaryData, setSummaryData] = useState<any>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Document state & sub-modals
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState<string | null>(null);
  const [docActionLoading, setDocActionLoading] = useState<string | null>(null);
  const [docCategory, setDocCategory] = useState<'all' | 'aps' | 'admission' | 'visa' | 'general' | 'cv' | 'sop' | 'lor'>('aps');

  useEffect(() => {
    if (docCategory === 'visa' && effectiveStudentId) {
      loadVisaChecklist(effectiveStudentId);
    }
  }, [docCategory, effectiveStudentId, loadVisaChecklist]);
  const [docFilter, setDocFilter] = useState<'all' | 'pending' | 'verified' | 'rejected' | 'not_uploaded'>('all');
  const [docActionFeedback, setDocActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);
  const [rejectingDoc, setRejectingDoc] = useState<StudentDocument | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [studentSops, setStudentSops] = useState<any[]>([]);
  const [sopsLoading, setSopsLoading] = useState(false);
  const [sopsError, setSopsError] = useState<string | null>(null);
  const sopPendingCount = studentSops.filter((s) => s.documentId && s.status === 'PENDING').length;

  const [selectedSopRecIds, setSelectedSopRecIds] = useState<string[]>([]);
  const [regeneratingSops, setRegeneratingSops] = useState(false);
  const [regeneratingCv, setRegeneratingCv] = useState(false);
  const [uploadingCorrectedId, setUploadingCorrectedId] = useState<string | null>(null);
  const [downloadingWordId, setDownloadingWordId] = useState<string | null>(null);

  const fetchStudentSops = useCallback(async () => {
    if (!effectiveStudentId) return;
    try {
      setSopsLoading(true);
      setSopsError(null);
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/sops`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch SOP documents');
      const data = await res.json();
      setStudentSops(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setSopsError(err.message || 'Error loading SOP documents');
      setStudentSops([]);
    } finally {
      setSopsLoading(false);
    }
  }, [API_URL, effectiveStudentId]);

  const fetchDocuments = useCallback(async () => {
    if (!effectiveStudentId) return;
    try {
      setDocsLoading(true);
      setDocsError(null);
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/documents`, { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 403) throw new Error("Access Denied");
        throw new Error("Failed to fetch documents");
      }
      const data = await res.json();
      const rows = Array.isArray(data) ? data : (data.items || []);
      setDocuments(rows.map(mapDbDocToStudentDocument));
    } catch (err: any) {
      setDocsError(err.message || 'Error loading student documents');
      setDocuments([]);
    } finally {
      setDocsLoading(false);
    }
  }, [API_URL, effectiveStudentId]);

  // Real-time synchronization when switching to Documents tab
  useEffect(() => {
    if (activeTab === 'documents' && effectiveStudentId) {
      fetchDocuments();
      fetchStudentSops();
      if (docCategory === 'visa') {
        loadVisaChecklist(effectiveStudentId);
      }
    }
  }, [activeTab, docCategory, effectiveStudentId, fetchDocuments, fetchStudentSops, loadVisaChecklist]);

  // Window focus & tab visibility synchronization (native lightweight real-time sync)
  useEffect(() => {
    if (!effectiveStudentId) return;
    const handleSyncOnFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchDocuments();
        fetchStudentSops();
        if (docCategory === 'visa') {
          loadVisaChecklist(effectiveStudentId);
        }
      }
    };
    window.addEventListener('focus', handleSyncOnFocus);
    document.addEventListener('visibilitychange', handleSyncOnFocus);
    return () => {
      window.removeEventListener('focus', handleSyncOnFocus);
      document.removeEventListener('visibilitychange', handleSyncOnFocus);
    };
  }, [effectiveStudentId, docCategory, fetchDocuments, fetchStudentSops, loadVisaChecklist]);

  // AI Academic Dossier Quotas & Counsellor Allotments
  const [dossierLimits, setDossierLimits] = useState<{
    sop: { generationCount: number; maxGenerations: number; remainingAttempts: number; extraAttemptsGranted: boolean; canGrantExtra: boolean };
    lor: { generationCount: number; maxGenerations: number; remainingAttempts: number; extraAttemptsGranted: boolean; canGrantExtra: boolean };
    cv?: { generationCount: number; maxGenerations: number; remainingAttempts: number; extraAttemptsGranted: boolean; canGrantExtra: boolean };
  } | null>(null);
  const [grantingDocType, setGrantingDocType] = useState<'sop' | 'lor' | 'cv' | null>(null);
  const [grantStatusMessage, setGrantStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // University shortlist state & adding
  const [universities, setUniversities] = useState<UniversityMatch[]>([]);
  const [showAddUni, setShowAddUni] = useState(false);
  const [isManualUniEntry, setIsManualUniEntry] = useState(false);
  const [newUniName, setNewUniName] = useState('');
  const [newUniProgram, setNewUniProgram] = useState('');
  const [newUniLocation, setNewUniLocation] = useState('');

  // University Autocomplete & Program Relevance Assist
  const [selectedUniversity, setSelectedUniversity] = useState<{ name: string; city?: string; country?: string } | null>(null);
  const [uniSearchQuery, setUniSearchQuery] = useState('');
  const [uniSearchResults, setUniSearchResults] = useState<Array<{ name: string; city?: string; country?: string }>>([]);
  const [loadingUniSearch, setLoadingUniSearch] = useState(false);
  const [showUniDropdown, setShowUniDropdown] = useState(false);
  const [uniProgrammes, setUniProgrammes] = useState<any[]>([]);
  const [loadingProgrammes, setLoadingProgrammes] = useState(false);
  const [programmesError, setProgrammesError] = useState<string | null>(null);
  const [progFilterText, setProgFilterText] = useState('');
  const [progFilterOnlyRelevant, setProgFilterOnlyRelevant] = useState(false);
  const [selectedProg, setSelectedProg] = useState<any | null>(null);
  const [recommendSuccessMsg, setRecommendSuccessMsg] = useState<string | null>(null);
  const [recommendNote, setRecommendNote] = useState('');
  const [savingRecommendation, setSavingRecommendation] = useState(false);
  const [uniMeta, setUniMeta] = useState<{ studentField?: string; totalCount?: number; relevantCount?: number; disqualifiedCount?: number } | null>(null);

  // Matching Engine & Subscription Curation state
  const [matchingRun, setMatchingRun] = useState<any>(null);
  const [matchingResults, setMatchingResults] = useState<any[]>([]);
  const [studentSubscription, setStudentSubscription] = useState<any>(null);
  const [curatedProgrammeIds, setCuratedProgrammeIds] = useState<string[]>([]);
  const [curatedProgrammes, setCuratedProgrammes] = useState<any[]>([]);
  const [isMatchingLocked, setIsMatchingLocked] = useState(false);
  const [studentShortlistCount, setStudentShortlistCount] = useState(0);
  const [loadingMatching, setLoadingMatching] = useState(false);
  const [runningMatching, setRunningMatching] = useState(false);
  const [matchingError, setMatchingError] = useState<string | null>(null);
  const [savingCuration, setSavingCuration] = useState(false);
  const [togglingLock, setTogglingLock] = useState(false);
  const [togglingShortlist, setTogglingShortlist] = useState<string | null>(null);
  const [showCurationPanel, setShowCurationPanel] = useState(true);

  const fetchMatchingResults = async () => {
    const effectiveStudentId = propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    setLoadingMatching(true);
    setMatchingError(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/matching/students/${effectiveStudentId}/results`, {
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Server error ${res.status}`);
      }
      const data = await res.json();
      setMatchingRun(data.run ?? null);
      setMatchingResults(data.results ?? []);
      setStudentSubscription(data.subscription ?? null);
      setCuratedProgrammes(data.curatedProgrammes ?? []);
      setCuratedProgrammeIds(data.curatedProgrammeIds ?? []);
      setIsMatchingLocked(Boolean(data.isLocked));
      setStudentShortlistCount(data.shortlistCount ?? 0);
      if (data.recommendations && Array.isArray(data.recommendations)) {
        setUniversities(data.recommendations);
      }
    } catch (err: any) {
      setMatchingError(err.message ?? 'Failed to load matching results');
    } finally {
      setLoadingMatching(false);
    }
  };

  const handleRunMatching = async () => {
    const effectiveStudentId = propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    if (isMatchingLocked) {
      alert('Shortlist and matching are locked for this student. Please unlock the shortlist first before re-running matching.');
      return;
    }
    setRunningMatching(true);
    setMatchingError(null);
    setUniversities([]);
    setCuratedProgrammeIds([]);
    setCuratedProgrammes([]);
    setStudentShortlistCount(0);
    setIsMatchingLocked(false);
    localStorage.removeItem(`eb_student_unis_${effectiveStudentId}`);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/matching/students/${effectiveStudentId}/run`, {
        method: 'POST',
        credentials: 'include',
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message ?? `Server error ${res.status}`);
      fetchMatchingResults();
    } catch (err: any) {
      setMatchingError(err.message ?? 'Failed to start matching');
      setRunningMatching(false);
    } finally {
      setRunningMatching(false);
    }
  };

  const handleToggleLock = async () => {
    const effectiveStudentId = propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    setTogglingLock(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isLocked: !isMatchingLocked }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update lock state');
      setIsMatchingLocked(data.isLocked);
      const newStatus = data.isLocked ? 'shortlist_locked' : 'matching_completed';
      if (student) {
        student.status = newStatus;
      }
      setSummaryData((prev: any) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err: any) {
      alert(err.message || 'Failed to toggle lock');
    } finally {
      setTogglingLock(false);
    }
  };

  const handleToggleCuratedProgramme = async (programmeId: string | number) => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked for this student. Please unlock first to make modifications.');
      return;
    }
    const idStr = String(programmeId);
    let nextIds: string[];
    const maxDisplay = studentSubscription?.maxDisplayCount || 10;

    if (curatedProgrammeIds.includes(idStr)) {
      nextIds = curatedProgrammeIds.filter((id) => id !== idStr);
    } else {
      if (curatedProgrammeIds.length >= maxDisplay) {
        alert(`Display curation limit reached (${curatedProgrammeIds.length}/${maxDisplay}). Please remove an existing programme from the Student Display Curation panel on the right (or click "On Student Display" on any card) to make space.`);
        return;
      }
      nextIds = [...curatedProgrammeIds, idStr];
    }

    setCuratedProgrammeIds(nextIds);
    await saveCuratedProgrammes(nextIds);
  };

  const handleAutoFillTopMatches = async () => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked for this student. Please unlock first before auto-filling matches.');
      return;
    }
    const maxDisplay = studentSubscription?.maxDisplayCount || 5;
    const topEligible = matchingResults
      .filter((r) => r.eligibilityStatus !== 'NOT_ELIGIBLE')
      .slice(0, maxDisplay)
      .map((r) => String(r.programmeId || r.id));

    if (topEligible.length === 0) {
      alert('No eligible matching programmes found to auto-fill.');
      return;
    }

    setCuratedProgrammeIds(topEligible);
    await saveCuratedProgrammes(topEligible);
  };

  const saveCuratedProgrammes = async (programmeIds: string[]) => {
    const effectiveStudentId = propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    setSavingCuration(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/curation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ programmeIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save curated programmes');
      if (data.curatedProgrammes) {
        setCuratedProgrammes(data.curatedProgrammes);
        setCuratedProgrammeIds(data.curatedProgrammes.map((c: any) => String(c.programmeId)));
      }
      const idSet = new Set(programmeIds.map(String));
      setMatchingResults((prev: any[]) =>
        prev.map((r) => ({
          ...r,
          isDisplayed: idSet.has(String(r.programmeId || r.id)),
        }))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to save curation');
    } finally {
      setSavingCuration(false);
    }
  };

  const handleToggleShortlist = async (r: any) => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked for this student. Unlock first before modifying the shortlist.');
      return;
    }
    const progIdStr = String(r.programmeId || r.id);
    const effectiveId = propStudent?.userId || studentId;
    if (!effectiveId) return;

    const existing = universities.find(
      (u) =>
        String(u.programmeId) === progIdStr ||
        String(u.id) === progIdStr ||
        (u.name === r.universityName && u.program === r.programName)
    );

    const isAddingNewShortlist = !existing || existing.status === 'recommended';
    const maxShortlist = studentSubscription?.maxShortlistCount || 3;
    if (isAddingNewShortlist && studentShortlistCount >= maxShortlist) {
      alert(`Shortlist limit reached (${studentShortlistCount}/${maxShortlist} max for this plan). Please unshortlist an existing programme before adding another.`);
      return;
    }

    setTogglingShortlist(progIdStr);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      if (existing && (existing.status === 'shortlisted' || (existing.status && existing.status !== 'recommended'))) {
        const isMatched = matchingResults.some((m: any) => String(m.programmeId || m.id) === progIdStr);
        if (isMatched) {
          await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations/${existing.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          setUniversities((prev) => prev.filter((u) => u.id !== existing.id));
        } else {
          await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations/${existing.id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status: 'recommended' }),
          });
          setUniversities((prev) =>
            prev.map((u) => (u.id === existing.id ? { ...u, status: 'recommended' } : u))
          );
        }
        setStudentShortlistCount((prev) => Math.max(0, prev - 1));
      } else if (existing) {
        await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations/${existing.id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: 'shortlisted' }),
        });
        setUniversities((prev) =>
          prev.map((u) => (u.id === existing.id ? { ...u, status: 'shortlisted' } : u))
        );
        setStudentShortlistCount((prev) => prev + 1);
      } else {
        const parsedScore = Math.round(Number(r.relevanceScore ?? 90));
        const payload = {
          programmeId: r.programmeId && !isNaN(Number(r.programmeId)) ? Number(r.programmeId) : undefined,
          universityId: r.universityId && !isNaN(Number(r.universityId)) ? Number(r.universityId) : undefined,
          name: r.universityName,
          program: r.programName,
          degree: r.degree || 'Master',
          location: [r.city, r.country].filter(Boolean).join(', ') || 'Germany',
          tuition: r.tuitionPerSemester || 'Free / None (public university)',
          deadline: r.nonEuDeadline || 'NA',
          type: r.universityType || 'Public University',
          matchScore: Number.isFinite(parsedScore) ? parsedScore : 90,
          status: 'shortlisted',
        };
        const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to shortlist programme');
        setUniversities((prev) => [data, ...prev]);
        setStudentShortlistCount((prev) => prev + 1);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update shortlist');
    } finally {
      setTogglingShortlist(null);
    }
  };

  const shortlistedProgIds = useMemo(() => {
    const set = new Set<string>();
    universities.forEach((u: any) => {
      if (u.status === 'shortlisted' || (u.status && u.status !== 'recommended')) {
        if (u.programmeId) set.add(String(u.programmeId));
        if (u.id) set.add(String(u.id));
      }
    });
    return set;
  }, [universities]);

  const notepadProgrammes = useMemo(() => {
    const matchedProgIds = new Set(
      matchingResults.map((m: any) => String(m.programmeId || m.id))
    );
    return universities.filter((u: any) => {
      const uProgId = String(u.programmeId || u.id);
      // Exclude programmes that are already shortlisted or on student display
      if (
        shortlistedProgIds.has(uProgId) ||
        (u.programmeId && shortlistedProgIds.has(String(u.programmeId))) ||
        (u.status && u.status !== 'recommended')
      ) {
        return false;
      }
      if (
        curatedProgrammeIds.includes(uProgId) ||
        (u.programmeId && curatedProgrammeIds.includes(String(u.programmeId)))
      ) {
        return false;
      }
      if (u.programmeId && matchedProgIds.has(String(u.programmeId))) {
        return false;
      }
      if (matchedProgIds.has(uProgId)) {
        return false;
      }
      const uProg = (u.program || '').toLowerCase().trim();
      const uUni = (u.name || '').toLowerCase().trim();
      const isMatchingResult = matchingResults.some((m: any) => {
        const mProg = (m.programName || '').toLowerCase().trim();
        const mUni = (m.universityName || '').toLowerCase().trim();
        return mProg === uProg && (mUni.includes(uUni) || uUni.includes(mUni));
      });
      return !isMatchingResult;
    });
  }, [universities, matchingResults, shortlistedProgIds, curatedProgrammeIds]);


  const handleDeleteMatchedProgramme = async (programmeId: string | number) => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked. Unlock first before removing matched programmes.');
      return;
    }
    const effectiveId = propStudent?.userId || studentId;
    if (!effectiveId) return;
    const idStr = String(programmeId);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      await fetch(`${API_URL}/counsellor/students/${effectiveId}/matches/${idStr}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setMatchingResults((prev) => prev.filter((r) => String(r.programmeId || r.id) !== idStr));
      if (curatedProgrammeIds.includes(idStr)) {
        const nextIds = curatedProgrammeIds.filter((id) => id !== idStr);
        setCuratedProgrammeIds(nextIds);
        setCuratedProgrammes((prev) => prev.filter((c) => String(c.programmeId) !== idStr));
      }
    } catch (err: any) {
      alert(err.message || 'Failed to remove matched programme');
    }
  };

  const handleSaveProgrammeToNotepad = async (p: any) => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked. Unlock first before adding programmes to notepad.');
      return;
    }
    const effectiveId = propStudent?.userId || studentId;
    if (!effectiveId) return;
    setSavingRecommendation(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const uniCity = selectedUniversity?.city || p.city || 'Germany';
      const payload = {
        programmeId: p.id,
        universityId: p.universityId || (selectedUniversity as any)?.id || null,
        name: p.universityName || selectedUniversity?.name || 'German University',
        program: p.programName,
        degree: p.degree || 'Master',
        location: [p.city, p.country].filter(Boolean).join(', ') || uniCity,
        tuition: p.tuition || '€0 / semester fee only',
        deadline: p.deadline || 'July 15',
        language: p.language || 'English',
        programUrl: p.programUrl || null,
        subject: p.subject || null,
        type: p.universityType || (selectedUniversity as any)?.type || 'Public University',
        matchScore: 90,
        status: 'recommended',
        notes: p.relevanceLabel || '',
      };
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save programme to notepad');
      setUniversities((prev) => [data, ...prev.filter((u) => u.id !== data.id && String(u.programmeId) !== String(p.id))]);
      setRecommendSuccessMsg(`Saved "${p.programName}" to Counsellor Notepad!`);
      setTimeout(() => setRecommendSuccessMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Failed to save programme to notepad');
    } finally {
      setSavingRecommendation(false);
    }
  };

  // Sub-navigation & Lazy Pagination for Matching Results
  const [matchingSubTab, setMatchingSubTab] = useState<'matches' | 'catalogue'>('matches');
  const [matchSearchQuery, setMatchSearchQuery] = useState('');
  const [matchUniFilter, setMatchUniFilter] = useState('ALL');
  const [matchPage, setMatchPage] = useState(1);
  const MATCH_PAGE_SIZE = 12;

  // Unique universities in the matched set with counts
  const matchedUniversities = useMemo(() => {
    const counts = new Map<string, number>();
    matchingResults
      .filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE')
      .forEach((r: any) => {
        const uName = r.universityName || 'Other';
        counts.set(uName, (counts.get(uName) || 0) + 1);
      });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [matchingResults]);

  // Filtered matching results
  const filteredMatchingResults = useMemo(() => {
    return matchingResults
      .filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE')
      .filter((r: any) => {
        if (matchUniFilter !== 'ALL' && r.universityName !== matchUniFilter) {
          return false;
        }
        if (matchSearchQuery.trim()) {
          const q = matchSearchQuery.toLowerCase().trim();
          const matchesProg = r.programName?.toLowerCase().includes(q);
          const matchesUni = r.universityName?.toLowerCase().includes(q);
          const matchesCity = r.city?.toLowerCase().includes(q);
          const matchesDeg = r.degree?.toLowerCase().includes(q);
          const matchesLang = r.language?.toLowerCase().includes(q);
          return matchesProg || matchesUni || matchesCity || matchesDeg || matchesLang;
        }
        return true;
      });
  }, [matchingResults, matchUniFilter, matchSearchQuery]);

  const totalMatchPages = Math.max(1, Math.ceil(filteredMatchingResults.length / MATCH_PAGE_SIZE));
  const paginatedMatchingResults = useMemo(() => {
    const start = (matchPage - 1) * MATCH_PAGE_SIZE;
    return filteredMatchingResults.slice(start, start + MATCH_PAGE_SIZE);
  }, [filteredMatchingResults, matchPage]);

  // Poll matching results while in progress
  useEffect(() => {
    if (!matchingRun || matchingRun.status === 'completed' || matchingRun.status === 'failed') return;
    const timer = setInterval(fetchMatchingResults, 3000);
    return () => clearInterval(timer);
  }, [matchingRun?.status]);

  // Consultation tasks
  const [tasks, setTasks] = useState<ConsultationTask[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Close on Escape key press (only in modal mode)
  useEffect(() => {
    if (isPage || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !previewDoc && !rejectingDoc) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPage, onClose, previewDoc, rejectingDoc]);

  // Initialize data for this student
  useEffect(() => {
    const effectiveStudentId = propStudent?.userId || studentId;
    if (!effectiveStudentId) return;

    // Reset summary state
    setSummaryData(null);
    setSummaryLoading(true);
    setSummaryError(null);
    setShowFullProfile(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    // Fetch summary
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/summary`, { credentials: 'include' });
        if (!res.ok) {
          if (res.status === 403) throw new Error("Access Denied");
          throw new Error("Failed to fetch summary");
        }
        const data = await res.json();
        setSummaryData(data);
        if (data?.status === 'shortlist_locked') {
          setIsMatchingLocked(true);
        }
        if (!propStudent && data.student) {
          setFetchedStudent({
            userId: data.student.id,
            firstName: data.student.firstName,
            lastName: data.student.lastName,
            email: data.student.email,
            phone: data.student.phone || null,
            whatsapp: data.student.whatsapp || null,
            status: data.status,
          });
        }
      } catch (err: any) {
        setSummaryError(err.message || 'Error loading student data');
      } finally {
        setSummaryLoading(false);
      }
    };
    fetchSummary();

    // Fetch real documents from student_documents table via backend API
    fetchDocuments();
    fetchStudentSops();

    // Fetch matching engine results
    fetchMatchingResults();

    // Load university recommendations from backend (with localStorage fallback)
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/recommendations`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUniversities(data);
            localStorage.setItem(`eb_student_unis_${effectiveStudentId}`, JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load recommendations from server', err);
      }
      const savedUnis = localStorage.getItem(`eb_student_unis_${effectiveStudentId}`);
      if (savedUnis) {
        try {
          setUniversities(JSON.parse(savedUnis));
        } catch {
          setUniversities([]);
        }
      } else {
        setUniversities([]);
      }
    };
    fetchRecommendations();

    // Load Academic Dossier AI limits
    const fetchDossierLimits = async () => {
      try {
        const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/dossier-limits`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setDossierLimits(data);
        }
      } catch (err) {
        console.error('Failed to load dossier limits', err);
      }
    };
    fetchDossierLimits();
  }, [propStudent, studentId]);

  // Document Handlers (connected to real backend API)
  const handleVerifyDoc = async (docId: string) => {
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
    setDocActionLoading(docId);
    setDocActionFeedback(null);
    try {
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/documents/${docId}/verify`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to verify document');
      }
      const updatedRow = await res.json();
      const mapped = mapDbDocToStudentDocument(updatedRow);
      setDocuments((prev) => prev.map((d) => (d.id === docId ? mapped : d)));
      setStudentSops((prev) => prev.map((s) => s.documentId === docId ? { ...s, status: 'VERIFIED', verifiedAt: new Date().toISOString() } : s));

      if (previewDoc?.id === docId) {
        setPreviewDoc(mapped);
      }
      setDocActionFeedback({
        type: 'success',
        message: `"${mapped.name}" has been verified and marked as accepted.`,
      });
      setTimeout(() => setDocActionFeedback(null), 3500);

      // Re-sync documents & checklist counts in background
      fetchDocuments();
      fetchStudentSops();
      if (effectiveStudentId) {
        loadVisaChecklist(effectiveStudentId);
      }
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to verify document',
      });
    } finally {
      setDocActionLoading(null);
    }
  };

  // Download Word document helper
  const handleDownloadWord = async (type: 'sop' | 'cv', recId?: string, filename?: string) => {
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    const targetId = type === 'sop' ? recId || 'sop' : 'cv';
    setDownloadingWordId(targetId);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const url = type === 'sop'
        ? `${API_URL}/counsellor/students/${effectiveStudentId}/sop/${recId}/download-docx`
        : `${API_URL}/counsellor/students/${effectiveStudentId}/cv/download-docx`;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to download Word document');
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || (type === 'sop' ? 'Statement_of_Purpose.docx' : 'Curriculum_Vitae.docx');
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      setDocActionFeedback({
        type: 'success',
        message: 'Word (.docx) document downloaded successfully.',
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to download Word document',
      });
    } finally {
      setDownloadingWordId(null);
    }
  };

  // Upload corrected document helper (PDF or Word)
  const handleUploadCorrected = async (type: 'sop' | 'cv', file: File, recId?: string) => {
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId || !file) return;
    const targetId = type === 'sop' ? recId || 'sop' : 'cv';
    setUploadingCorrectedId(targetId);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const formData = new FormData();
      formData.append('file', file);
      const url = type === 'sop'
        ? `${API_URL}/counsellor/students/${effectiveStudentId}/sop/${recId}/upload-corrected`
        : `${API_URL}/counsellor/students/${effectiveStudentId}/cv/upload-corrected`;
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to upload corrected file');
      }
      setDocActionFeedback({
        type: 'success',
        message: `Corrected ${type.toUpperCase()} uploaded and marked as approved & verified!`,
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
      if (type === 'sop') {
        fetchStudentSops();
      }
      fetchDocuments();
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to upload corrected file',
      });
    } finally {
      setUploadingCorrectedId(null);
    }
  };

  // Re-generate CV helper
  const handleRegenerateCv = async () => {
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    setRegeneratingCv(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/cv/regenerate`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to re-generate CV');
      }
      setDocActionFeedback({
        type: 'success',
        message: 'CV regeneration queued from scratch.',
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
      fetchDocuments();
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to re-generate CV',
      });
    } finally {
      setRegeneratingCv(false);
    }
  };

  // Re-generate SOP helper (selective or all)
  const handleRegenerateSops = async (recIds?: string[]) => {
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId) return;
    setRegeneratingSops(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/sop/regenerate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ recommendationIds: recIds && recIds.length > 0 ? recIds : undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to re-generate SOPs');
      }
      const data = await res.json();
      setDocActionFeedback({
        type: 'success',
        message: data.message || `Re-generation started for ${data.count || 0} SOP(s).`,
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
      setSelectedSopRecIds([]);
      fetchStudentSops();
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to re-generate SOPs',
      });
    } finally {
      setRegeneratingSops(false);
    }
  };

  const handleOpenRejectModal = (doc: StudentDocument) => {
    setRejectingDoc(doc);
    setRejectionReasonInput(doc.rejectionReason || '');
  };

  const handleConfirmRejectDoc = async () => {
    if (!rejectingDoc) return;
    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveStudentId) return;

    const reason = rejectionReasonInput.trim();
    if (!reason) {
      setDocActionFeedback({
        type: 'error',
        message: 'Please provide specific feedback explaining what the student needs to correct.',
      });
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
    setDocActionLoading(rejectingDoc.id);
    setDocActionFeedback(null);
    try {
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/documents/${rejectingDoc.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rejectionNote: reason }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to reject document');
      }
      const updatedRow = await res.json();
      const mapped = mapDbDocToStudentDocument(updatedRow);
      setDocuments((prev) => prev.map((d) => (d.id === mapped.id ? mapped : d)));
      setStudentSops((prev) => prev.map((s) => s.documentId === rejectingDoc.id ? { ...s, status: 'REJECTED', rejectionNote: reason } : s));

      if (previewDoc?.id === mapped.id) {
        setPreviewDoc(mapped);
      }

      setDocActionFeedback({
        type: 'success',
        message: `Feedback recorded for "${mapped.name}". The student has been notified to re-upload.`,
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
      setRejectingDoc(null);
      setRejectionReasonInput('');

      // Re-sync documents & checklist counts in background
      fetchDocuments();
      fetchStudentSops();
      if (effectiveStudentId) {
        loadVisaChecklist(effectiveStudentId);
      }
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to reject document',
      });
    } finally {
      setDocActionLoading(null);
    }
  };

  // University Shortlist Status Update Handler
  const handleUpdateUniStatus = async (uniId: string, newStatus: UniversityMatch['status']) => {
    const updated = universities.map((u) => {
      if (u.id === uniId) {
        return { ...u, status: newStatus };
      }
      return u;
    });
    setUniversities(updated);
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (effectiveId) {
      localStorage.setItem(`eb_student_unis_${effectiveId}`, JSON.stringify(updated));
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations/${uniId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.error('Failed to sync recommendation status to backend', err);
      }
    }
  };

  const handleDeleteRecommendation = async (uniId: string) => {
    if (isMatchingLocked) {
      alert('Shortlist and curation are locked for this student. Unlock first before deleting programmes.');
      return;
    }
    const toDelete = universities.find((u) => u.id === uniId);
    const updated = universities.filter((u) => u.id !== uniId);
    setUniversities(updated);

    if (toDelete && toDelete.programmeId && curatedProgrammeIds.includes(String(toDelete.programmeId))) {
      const nextIds = curatedProgrammeIds.filter((id) => id !== String(toDelete.programmeId));
      setCuratedProgrammeIds(nextIds);
      setCuratedProgrammes((prev) => prev.filter((c) => String(c.programmeId) !== String(toDelete.programmeId)));
    }
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (effectiveId) {
      localStorage.setItem(`eb_student_unis_${effectiveId}`, JSON.stringify(updated));
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations/${uniId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
      } catch (err) {
        console.error('Failed to delete recommendation from backend', err);
      }
    }
  };

  // Debounced University Search via /student/universities/search
  useEffect(() => {
    if (!uniSearchQuery || uniSearchQuery.trim().length < 2 || selectedUniversity?.name === uniSearchQuery) {
      setUniSearchResults([]);
      setLoadingUniSearch(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoadingUniSearch(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const res = await fetch(`${API_URL}/student/universities/search?q=${encodeURIComponent(uniSearchQuery.trim())}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUniSearchResults(Array.isArray(data) ? data : []);
          setShowUniDropdown(true);
        }
      } catch (err) {
        setUniSearchResults([]);
      } finally {
        setLoadingUniSearch(false);
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [uniSearchQuery, selectedUniversity]);

  const handleSelectUniversity = async (uni: { name: string; city?: string; country?: string }) => {
    setSelectedUniversity(uni);
    setUniSearchQuery(uni.name);
    setShowUniDropdown(false);
    setSelectedProg(null);
    setProgFilterText('');
    setProgrammesError(null);
    setLoadingProgrammes(true);

    const effectiveStudentId = student?.userId || propStudent?.userId || studentId;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    try {
      const url = `${API_URL}/counsellor/universities/programmes?university=${encodeURIComponent(uni.name)}${effectiveStudentId ? `&studentId=${encodeURIComponent(effectiveStudentId)}` : ''
        }`;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Failed to load programmes (${res.status})`);
      }
      const data = await res.json();
      setUniProgrammes(data.programmes || []);
      setUniMeta({
        studentField: data.studentField,
        totalCount: data.totalCount,
        relevantCount: data.relevantCount,
        disqualifiedCount: data.disqualifiedCount,
      });
    } catch (err: any) {
      setProgrammesError(err.message || 'Error loading university programmes');
      setUniProgrammes([]);
      setUniMeta(null);
    } finally {
      setLoadingProgrammes(false);
    }
  };

  const handleSaveRecommendation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    setSavingRecommendation(true);
    try {
      if (isManualUniEntry) {
        if (!newUniName.trim() || !newUniProgram.trim()) return;
        let newUni: UniversityMatch = {
          id: `uni-${Date.now()}`,
          name: newUniName.trim(),
          program: newUniProgram.trim(),
          degree: 'Master of Science',
          location: newUniLocation.trim() || 'Germany',
          matchScore: 90,
          bavarianGpaReq: '<= 2.2 (Student: 1.3)',
          ieltsReq: '>= 6.5 (Student: 7.5)',
          tuition: '€0 / semester fee only',
          status: 'recommended',
          deadline: 'July 15, 2026',
          type: 'Public University',
          notes: recommendNote.trim() || undefined,
        };

        if (effectiveId) {
          try {
            const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(newUni),
            });
            if (res.ok) {
              const saved = await res.json();
              newUni = saved;
            }
          } catch (err) {
            console.error('Failed to save manual recommendation to backend', err);
          }
        }

        const updated = [newUni, ...universities];
        setUniversities(updated);
        if (effectiveId) {
          localStorage.setItem(`eb_student_unis_${effectiveId}`, JSON.stringify(updated));
        }

        setRecommendSuccessMsg(`✓ Recommended "${newUni.program}" to ${student?.firstName || 'student'}!`);
        setTimeout(() => setRecommendSuccessMsg(null), 3500);

        setNewUniName('');
        setNewUniProgram('');
        setNewUniLocation('');
        setRecommendNote('');
        setShowAddUni(false);
        return;
      }

      if (!selectedUniversity || !selectedProg) return;
      if (!selectedProg.isRelevant) return; // Strict safeguard: cannot save disqualified programmes

      let newUni: UniversityMatch = {
        id: `uni-${selectedProg.id || Date.now()}`,
        programmeId: selectedProg.id,
        name: selectedUniversity.name,
        program: selectedProg.programName,
        degree: selectedProg.degree || 'Master of Science',
        location: `${selectedProg.city || selectedUniversity.city || 'Germany'}, ${selectedProg.country || 'Germany'}`,
        matchScore: 94,
        bavarianGpaReq: selectedProg.gpaRequirement ? `<= ${selectedProg.gpaRequirement}` : '<= 2.5',
        ieltsReq: selectedProg.ieltsRequirement ? `>= ${selectedProg.ieltsRequirement}` : '>= 6.5',
        tuition: selectedProg.tuition || '€0 / semester fee only',
        status: 'recommended',
        deadline: selectedProg.deadline || 'July 15, 2026',
        type: 'Public University',
        notes: recommendNote.trim() || undefined,
      };

      if (effectiveId) {
        try {
          const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/recommendations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newUni),
          });
          if (res.ok) {
            const saved = await res.json();
            newUni = saved;
          }
        } catch (err) {
          console.error('Failed to save catalogue recommendation to backend', err);
        }
      }

      const updated = [newUni, ...universities];
      setUniversities(updated);
      if (effectiveId) {
        localStorage.setItem(`eb_student_unis_${effectiveId}`, JSON.stringify(updated));
      }

      setRecommendSuccessMsg(`✓ Recommended "${selectedProg.programName}" to ${student?.firstName || 'student'}!`);
      setTimeout(() => setRecommendSuccessMsg(null), 3500);

      setSelectedProg(null);
      setRecommendNote('');
    } finally {
      setSavingRecommendation(false);
    }
  };

  const handleAddUniversity = handleSaveRecommendation;

  // Strategy Notes & Tasks Real-Time API Handlers (Counsellor Specific)
  const fetchStrategyNotes = useCallback(async (silent = false) => {
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId || readOnly) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    if (!silent) setNoteLoading(true);
    try {
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/strategy-notes`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        // Update note only if counsellor is not actively editing in textarea
        if (!isNoteFocusedRef.current && !isNoteDirty) {
          setNote(data.notes || '');
          setLastNoteUpdated(data.updatedAt || null);
        }
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        }
      }
    } catch (err) {
      if (!silent) console.error('Failed to load strategy notes', err);
    } finally {
      if (!silent) setNoteLoading(false);
    }
  }, [student?.userId, propStudent?.userId, studentId, readOnly, isNoteDirty]);

  // Real-time polling without websocket (polls every 3.5s when active tab is notes and window is visible)
  useEffect(() => {
    if (activeTab !== 'notes' || readOnly) return;
    fetchStrategyNotes(false);

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      fetchStrategyNotes(true);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeTab, readOnly, fetchStrategyNotes]);

  const saveNotesToServer = async (textToSave: string) => {
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId || readOnly) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    setIsSavingNote(true);
    try {
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/strategy-notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ notes: textToSave }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsNoteDirty(false);
        setNoteSaved(true);
        setLastNoteUpdated(data.updatedAt || new Date().toISOString());
        setTimeout(() => setNoteSaved(false), 2500);
      }
    } catch (err) {
      console.error('Failed to save strategy notes', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setNote(newVal);
    setIsNoteDirty(true);

    if (noteDebounceTimerRef.current) {
      clearTimeout(noteDebounceTimerRef.current);
    }
    // Auto-save debounced in real time after 800ms of typing pause
    noteDebounceTimerRef.current = setTimeout(() => {
      saveNotesToServer(newVal);
    }, 800);
  };

  const handleNoteBlur = () => {
    isNoteFocusedRef.current = false;
    if (isNoteDirty) {
      if (noteDebounceTimerRef.current) clearTimeout(noteDebounceTimerRef.current);
      saveNotesToServer(note);
    }
  };

  const handleSaveNote = () => {
    if (noteDebounceTimerRef.current) clearTimeout(noteDebounceTimerRef.current);
    saveNotesToServer(note);
  };

  const handleToggleTask = async (taskId: string) => {
    if (readOnly) return;
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;
    const nextCompleted = !target.completed;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: nextCompleted } : t)),
    );

    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    try {
      const res = await fetch(
        `${API_URL}/counsellor/students/${effectiveId}/strategy-tasks/${taskId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ completed: nextCompleted }),
        },
      );
      if (!res.ok) {
        // Rollback on failure
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, completed: target.completed } : t)),
        );
      }
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: target.completed } : t)),
      );
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim() || readOnly) return;

    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    const text = newTaskText.trim();
    const dueDate = newTaskDueDate.trim() || undefined;
    setIsAddingTask(true);
    setNewTaskText('');
    setNewTaskDueDate('');

    try {
      const res = await fetch(`${API_URL}/counsellor/students/${effectiveId}/strategy-tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text, dueDate }),
      });
      if (res.ok) {
        const createdTask = await res.json();
        setTasks((prev) => [...prev, createdTask]);
      }
    } catch (err) {
      console.error('Failed to add advising task', err);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (readOnly) return;
    const prevTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

    try {
      const res = await fetch(
        `${API_URL}/counsellor/students/${effectiveId}/strategy-tasks/${taskId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (!res.ok) {
        setTasks(prevTasks);
      }
    } catch {
      setTasks(prevTasks);
    }
  };

  const handleCopyEmail = () => {
    if (!student?.email) return;
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyId = () => {
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (!effectiveId) return;
    navigator.clipboard.writeText(effectiveId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatStatus = (status: string | null) => {
    if (!status) return 'Enrolled';
    if (status === 'shortlist_locked') return 'Shortlist Locked';
    if (status === 'plan_purchased') return 'Plan Purchased';
    if (status === 'matching_completed') return 'Matching Engine Run';
    if (status === 'profile_completed') return 'Profile Completed';
    if (status === 'logged_in') return 'Logged In';
    if (status === 'signed_up') return 'Signed Up';
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const initials = `${student?.firstName?.[0] || ''}${student?.lastName?.[0] || ''}`.toUpperCase() || 'ST';

  // Deduplicate documents by documentType so historical replacements or multiple records never inflate counts
  const distinctUploadedDocs = React.useMemo(() => {
    const map = new Map<string, StudentDocument>();
    const nonSopDocs = documents.filter((doc) => doc.documentType !== 'sop' && doc.section !== 'sop');
    // Sort so verified takes top priority, then pending, then newest uploaded
    const sorted = [...nonSopDocs].sort((a, b) => {
      if (a.status === 'verified' && b.status !== 'verified') return -1;
      if (b.status === 'verified' && a.status !== 'verified') return 1;
      if (a.status === 'pending' && b.status === 'rejected') return -1;
      if (b.status === 'pending' && a.status === 'rejected') return 1;
      return new Date(b.uploadDate || 0).getTime() - new Date(a.uploadDate || 0).getTime();
    });
    sorted.forEach((doc) => {
      const key = doc.documentType || doc.id;
      if (!map.has(key)) {
        map.set(key, doc);
      }
    });
    return Array.from(map.values());
  }, [documents]);

  const allCatalogueDocs = DOCUMENT_CATALOGUE;
  const apsCatalogueDocs = APS_DOCUMENT_CATALOGUE;
  const admissionCatalogueDocs = ADMISSION_DOCUMENT_CATALOGUE;
  const visaCatalogueDocs = VISA_DOCUMENT_CATALOGUE;
  const generalCatalogueDocs = GENERAL_DOCUMENT_CATALOGUE;
  const cvCatalogueDocs = DOCUMENT_CATALOGUE.filter((d) => d.type === 'cv');
  const lorCatalogueDocs = DOCUMENT_CATALOGUE.filter((d) => d.type === 'lor');

  // Filtered by current category
  const currentCategoryCatalogue = React.useMemo(() => {
    if (docCategory === 'aps') return apsCatalogueDocs;
    if (docCategory === 'admission') return admissionCatalogueDocs;
    if (docCategory === 'visa') return visaCatalogueDocs;
    if (docCategory === 'general') return generalCatalogueDocs;
    if (docCategory === 'cv') return cvCatalogueDocs;
    if (docCategory === 'lor') return lorCatalogueDocs;
    if (docCategory === 'sop') return [];
    return apsCatalogueDocs;
  }, [docCategory, apsCatalogueDocs, admissionCatalogueDocs, visaCatalogueDocs, generalCatalogueDocs, cvCatalogueDocs, lorCatalogueDocs]);

  const currentCategoryUploadedDocs = React.useMemo(() => {
    if (docCategory === 'aps') return distinctUploadedDocs.filter((d) => d.section === 'aps');
    if (docCategory === 'admission') return distinctUploadedDocs.filter((d) => d.section === 'admission');
    if (docCategory === 'visa') return distinctUploadedDocs.filter((d) => d.section === 'visa');
    if (docCategory === 'general') return distinctUploadedDocs.filter((d) => d.section === 'general');
    if (docCategory === 'cv') return distinctUploadedDocs.filter((d) => d.section === 'cv' || d.documentType === 'cv');
    if (docCategory === 'lor') return distinctUploadedDocs.filter((d) => d.section === 'lor' || d.documentType === 'lor');
    if (docCategory === 'sop') return [];
    return distinctUploadedDocs;
  }, [docCategory, distinctUploadedDocs]);

  // Unified Category Checklist (contains all expected items in this category)
  const categoryChecklist = React.useMemo(() => {
    if (docCategory === 'cv' || docCategory === 'sop' || docCategory === 'lor') {
      return [];
    }

    const matchedDocIds = new Set<string>();

    const items = currentCategoryCatalogue.map((catItem) => {
      const uploadedDoc = findMatchingDoc(catItem, distinctUploadedDocs);
      if (uploadedDoc) {
        matchedDocIds.add(uploadedDoc.id);
      }

      const itemStatus: 'not_uploaded' | 'pending' | 'verified' | 'rejected' = !uploadedDoc
        ? 'not_uploaded'
        : (uploadedDoc.status as any);

      return {
        key: catItem.type,
        type: catItem.type,
        name: catItem.name,
        category: catItem.category,
        description: catItem.description,
        required: catItem.required,
        section: catItem.section,
        uploadedDoc,
        status: itemStatus,
      };
    });

    // Also include any documents uploaded under this category section that didn't match a catalogue type
    const unmappedDocs = currentCategoryUploadedDocs.filter((d) => !matchedDocIds.has(d.id));
    unmappedDocs.forEach((d) => {
      items.push({
        key: d.id,
        type: d.documentType || d.id,
        name: d.name,
        category: d.category || 'Additional',
        description: 'Uploaded student document',
        required: false,
        section: (d.section || docCategory) as any,
        uploadedDoc: d,
        status: d.status as any,
      });
    });

    return items;
  }, [docCategory, currentCategoryCatalogue, distinctUploadedDocs, currentCategoryUploadedDocs]);

  // Items to render based on docFilter
  const displayedChecklist = React.useMemo(() => {
    if (docFilter === 'all') return categoryChecklist;
    return categoryChecklist.filter((item) => item.status === docFilter);
  }, [docFilter, categoryChecklist]);

  // Missing / Not-yet-uploaded catalogue items
  const notUploadedCatalogueItems = React.useMemo(() => {
    return categoryChecklist.filter((item) => item.status === 'not_uploaded');
  }, [categoryChecklist]);

  // Metric counts for current category
  const isCustomAiCategory = docCategory === 'cv' || docCategory === 'lor';
  const statsTotalExpected = isCustomAiCategory ? currentCategoryUploadedDocs.length : categoryChecklist.length;
  const statsUploaded = isCustomAiCategory ? currentCategoryUploadedDocs.length : categoryChecklist.filter((i) => i.uploadedDoc).length;
  const statsNotUploaded = isCustomAiCategory ? 0 : categoryChecklist.filter((i) => i.status === 'not_uploaded').length;
  const statsPending = isCustomAiCategory
    ? currentCategoryUploadedDocs.filter((d) => d.status === 'pending').length
    : categoryChecklist.filter((i) => i.status === 'pending').length;
  const statsVerified = isCustomAiCategory
    ? currentCategoryUploadedDocs.filter((d) => d.status === 'verified').length
    : categoryChecklist.filter((i) => i.status === 'verified').length;
  const statsRejected = isCustomAiCategory
    ? currentCategoryUploadedDocs.filter((d) => d.status === 'rejected').length
    : categoryChecklist.filter((i) => i.status === 'rejected').length;

  // Uploaded counts for sub-tabs and top navigation (resolved dynamically)
  const allUploadedCount = distinctUploadedDocs.length;
  const apsUploadedCount = APS_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
  const admissionUploadedCount = ADMISSION_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
  const visaUploadedCount = VISA_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
  const generalUploadedCount = GENERAL_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
  const cvUploadedCount = distinctUploadedDocs.filter((d) => d.section === 'cv' || d.documentType === 'cv').length;
  const sopUploadedCount = studentSops.filter((s) => s.documentId).length;
  const lorUploadedCount = distinctUploadedDocs.filter((d) => d.section === 'lor' || d.documentType === 'lor').length;
  const pendingDocsCount = distinctUploadedDocs.filter((d) => d.status === 'pending').length;

  // Documents to render based on docFilter (for CV and LOR fallback)
  const filteredDocs = React.useMemo(() => {
    if (docFilter === 'not_uploaded') return [];
    if (docFilter === 'all') return currentCategoryUploadedDocs;
    return currentCategoryUploadedDocs.filter((d) => d.status === docFilter);
  }, [docFilter, currentCategoryUploadedDocs]);

  if (!student) {
    if (summaryLoading) {
      return (
        <div className="relative w-full neu-card bg-[#FDFBF7] dark:bg-[#111622] p-12 overflow-hidden shadow-[4px_4px_16px_rgba(210,205,195,0.4)] dark:shadow-none border border-gray-200/80 dark:border-gray-800/80 rounded-3xl flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading student details...</p>
        </div>
      );
    }
    if (summaryError) {
      return (
        <div className="relative w-full neu-card bg-[#FDFBF7] dark:bg-[#111622] p-8 overflow-hidden shadow-[4px_4px_16px_rgba(210,205,195,0.4)] dark:shadow-none border border-gray-200/80 dark:border-gray-800/80 rounded-3xl text-center space-y-4">
          <div className="p-6 border-2 border-dashed border-[#EBE7E0] dark:border-red-900/40 rounded-2xl text-red-500 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-950/20">
            {summaryError}
          </div>
          {isPage && (
            <Link
              href="/dashboard/counsellor/students"
              className="neu-btn py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <span>Back to Assigned Students</span>
            </Link>
          )}
        </div>
      );
    }
    return null;
  }

  const bodyContent = (
    <>
      {/* Student Profile Header */}
      <div className="pt-2 pb-4 border-b border-[#EBE7E0] shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-germany-red via-germany-gold to-amber-500 text-white font-display text-lg font-black flex items-center justify-center shadow-md shrink-0">
              {initials}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-display text-germany-black dark:text-white leading-tight">
                  {student.firstName} {student.lastName}
                </h2>
                <span className={`px-2.5 py-0.5 font-extrabold rounded-full text-[11px] border ${(isMatchingLocked || student?.status === 'shortlist_locked' || summaryData?.status === 'shortlist_locked')
                  ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800'
                  : (student?.status === 'plan_purchased' || summaryData?.status === 'plan_purchased')
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-germany-gold/20 text-germany-black font-extrabold rounded-full text-[11px] border border-germany-gold/40'
                  }`}>
                  {isMatchingLocked || student?.status === 'shortlist_locked' || summaryData?.status === 'shortlist_locked'
                    ? 'Shortlist Locked'
                    : formatStatus(summaryData?.status || student?.status)}
                </span>
                {readOnly ? (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 font-extrabold rounded-full text-[10px] flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Supervisor View (Read-Only)</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded-full text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Assigned to You</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-gray-500 flex-wrap">
                <span className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-3.5 h-3.5 text-germany-red" />
                  {student.email}
                </span>
                <span>•</span>
                <span className="text-[11px] text-gray-400 font-mono">
                  ID: {student.userId.substring(0, 8)}...
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {!readOnly && (
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="neu-btn-primary py-2 px-3.5 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Meeting</span>
              </button>
            )}
            <a
              href={`mailto:${student.email}`}
              className="neu-btn-primary py-2 px-3.5 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-2 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-gray-600 dark:text-gray-300 hover:text-germany-red hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors shadow-xs"
              title="Copy email address"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 -mb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeTab === 'overview'
              ? 'bg-germany-red text-white shadow-md'
              : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
              }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview &amp; Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeTab === 'documents'
              ? 'bg-germany-red text-white shadow-md'
              : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
              }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Uploaded Documents</span>
            {(pendingDocsCount > 0 || sopPendingCount > 0) && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-900">
                {pendingDocsCount + sopPendingCount}
              </span>
            )}
          </button>


          <button
            onClick={() => setActiveTab('universities')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeTab === 'universities'
              ? 'bg-germany-red text-white shadow-md'
              : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
              }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>University Eligibility</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
              {curatedProgrammeIds.length > 0
                ? curatedProgrammeIds.length
                : matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length || 0}
            </span>
          </button>

          {!readOnly && (
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeTab === 'notes'
                ? 'bg-germany-red text-white shadow-md'
                : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
                }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Strategy Notes &amp; Tasks</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('admission')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${activeTab === 'admission'
              ? 'bg-germany-red text-white shadow-md'
              : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
              }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Admission &amp; Portals</span>
            {admissionApplications.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                {admissionApplications.length}
              </span>
            )}
          </button>


        </div>
      </div>

      {/* Scrollable Tab Content Body */}
      <div className={isPage ? "pt-5 pb-2 pr-1 space-y-5" : "flex-1 overflow-y-auto pt-5 pb-2 pr-1 space-y-5"}>
        {/* ========================================================
                TAB 1: OVERVIEW & PROFILE
            ======================================================== */}
        {activeTab === 'overview' && (
          <StudentOverviewTab
            summaryLoading={summaryLoading}
            summaryError={summaryError}
            summaryData={summaryData}
            student={student}
            studentSubscription={studentSubscription}
            isMatchingLocked={isMatchingLocked}
            matchingRun={matchingRun}
            pendingDocsCount={pendingDocsCount}
            distinctUploadedDocs={distinctUploadedDocs}
            onOpenFullProfile={() => setShowFullProfile(true)}
            onNavigateTab={(tab, cat) => {
              setActiveTab(tab);
              if (cat) setDocCategory(cat as any);
            }}
          />
        )}
        {/* ========================================================
                TAB 2: UPLOADED DOCUMENTS & VERIFICATION
            ======================================================== */}
        {activeTab === 'universities' && (
          <StudentUniversitiesTab
            student={student}
            effectiveStudentId={effectiveStudentId}
            readOnly={readOnly}
            matchingRun={matchingRun}
            matchingResults={matchingResults}
            studentSubscription={studentSubscription}
            isMatchingLocked={isMatchingLocked}
            curatedProgrammeIds={curatedProgrammeIds}
            curatedProgrammes={curatedProgrammes}
            studentShortlistCount={studentShortlistCount}
            loadingMatching={loadingMatching}
            runningMatching={runningMatching}
            matchingError={matchingError}
            savingCuration={savingCuration}
            togglingLock={togglingLock}
            togglingShortlist={togglingShortlist}
            showCurationPanel={showCurationPanel}
            setShowCurationPanel={setShowCurationPanel}
            onRunMatching={handleRunMatching}
            onToggleLock={handleToggleLock}
            onFetchMatchingResults={fetchMatchingResults}
            onToggleCuratedProgramme={handleToggleCuratedProgramme}
            onToggleShortlist={handleToggleShortlist}
            onAutoFillTopMatches={handleAutoFillTopMatches}
            onDeleteMatchedProgramme={handleDeleteMatchedProgramme}
            onSaveProgrammeToNotepad={handleSaveProgrammeToNotepad}
            isManualUniEntry={isManualUniEntry}
            setIsManualUniEntry={setIsManualUniEntry}
            newUniName={newUniName}
            setNewUniName={setNewUniName}
            newUniProgram={newUniProgram}
            setNewUniProgram={setNewUniProgram}
            newUniLocation={newUniLocation}
            setNewUniLocation={setNewUniLocation}
            recommendNote={recommendNote}
            setRecommendNote={setRecommendNote}
            recommendSuccessMsg={recommendSuccessMsg}
            setRecommendSuccessMsg={setRecommendSuccessMsg}
            savingRecommendation={savingRecommendation}
            onSaveRecommendation={handleSaveRecommendation}
            onDeleteRecommendation={handleDeleteRecommendation}
            universities={universities}
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            uniSearchQuery={uniSearchQuery}
            setUniSearchQuery={setUniSearchQuery}
            uniSearchResults={uniSearchResults}
            setUniSearchResults={setUniSearchResults}
            loadingUniSearch={loadingUniSearch}
            showUniDropdown={showUniDropdown}
            setShowUniDropdown={setShowUniDropdown}
            uniProgrammes={uniProgrammes}
            setUniProgrammes={setUniProgrammes}
            loadingProgrammes={loadingProgrammes}
            programmesError={programmesError}
            progFilterText={progFilterText}
            setProgFilterText={setProgFilterText}
            progFilterOnlyRelevant={progFilterOnlyRelevant}
            setProgFilterOnlyRelevant={setProgFilterOnlyRelevant}
            setSelectedProg={setSelectedProg}
            uniMeta={uniMeta}
            onSelectUniversity={handleSelectUniversity}
          />
        )}
        {/* ========================================================
                TAB 4: STRATEGY NOTES & TASKS
            ======================================================== */}
        {activeTab === 'notes' && !readOnly && (
          <StudentNotesTasksTab
            note={note}
            readOnly={readOnly}
            isSavingNote={isSavingNote}
            noteSaved={noteSaved}
            lastNoteUpdated={lastNoteUpdated}
            tasks={tasks}
            newTaskText={newTaskText}
            newTaskDueDate={newTaskDueDate}
            isAddingTask={isAddingTask}
            onNoteChange={handleNoteChange}
            onNoteFocus={() => {
              isNoteFocusedRef.current = true;
            }}
            onNoteBlur={handleNoteBlur}
            onSaveNote={handleSaveNote}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onNewTaskTextChange={setNewTaskText}
            onNewTaskDueDateChange={setNewTaskDueDate}
            onAddTask={handleAddTask}
          />
        )}
        {/* ========================================================
                TAB 5: ADMISSION MANAGEMENT & PORTAL CREDENTIALS
            ======================================================== */}
        {activeTab === 'admission' && (
          <StudentAdmissionTab
            effectiveStudentId={effectiveStudentId}
            admissionLoading={admissionLoading}
            admissionError={admissionError}
            admissionApplications={admissionApplications}
            admissionFormState={admissionFormState}
            admissionSavingId={admissionSavingId}
            admissionSuccessMsg={admissionSuccessMsg}
            admissionRevealedCreds={admissionRevealedCreds}
            admissionRevealingId={admissionRevealingId}
            admissionShowPassword={admissionShowPassword}
            readOnly={readOnly}
            onRefresh={() => effectiveStudentId && loadAdmissionApplications(effectiveStudentId)}
            onUpdateForm={handleUpdateAdmissionForm}
            onSaveApp={handleSaveAdmissionApp}
            onRevealCreds={handleRevealCounsellorCreds}
          />
        )}

      </div>

      {/* Footer Bar (Strictly no delete student button) */}
      <div className="pt-3 border-t border-[#EBE7E0] dark:border-gray-800/80 flex items-center justify-between shrink-0">
        <div className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5">
          <span>EuropeBridge Counsellor CRM</span>
          <span>•</span>
          <span>Student ID: {student.userId.substring(0, 10)}</span>
        </div>

        {!isPage && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-6 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl cursor-pointer shadow-xs"
          >
            Close
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {isPage ? (
        <div className="relative w-full bg-white dark:bg-[#111622] p-5 sm:p-7 overflow-hidden border border-gray-200/80 dark:border-gray-800/80 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col">
          {/* German Tricolor Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-[3px] flex">
            <div className="flex-1 bg-germany-black"></div>
            <div className="flex-1 bg-germany-red"></div>
            <div className="flex-1 bg-germany-gold"></div>
          </div>

          {bodyContent}
        </div>
      ) : (
        <div key="student-detail-modal-main" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            key="student-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#111622] p-5 sm:p-7 overflow-hidden shadow-2xl border border-gray-200/80 dark:border-gray-800/80 rounded-2xl sm:rounded-3xl z-10 my-auto max-h-[92vh] flex flex-col"
          >
            {/* German Tricolor Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-2 flex">
              <div className="flex-1 bg-germany-black"></div>
              <div className="flex-1 bg-germany-red"></div>
              <div className="flex-1 bg-germany-gold"></div>
            </div>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 p-2 rounded-full text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {bodyContent}
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showFullProfile && (
          <StudentFullProfileView
            studentId={student.userId}
            onClose={() => setShowFullProfile(false)}
          />
        )}
      </AnimatePresence>

      <DocumentPreviewModal
        previewDoc={previewDoc}
        readOnly={readOnly}
        docActionLoading={docActionLoading}
        onClose={() => setPreviewDoc(null)}
        onVerify={handleVerifyDoc}
        onOpenReject={handleOpenRejectModal}
      />

      <DocumentRejectionModal
        rejectingDoc={rejectingDoc}
        rejectionReasonInput={rejectionReasonInput}
        docActionLoading={docActionLoading}
        onReasonChange={setRejectionReasonInput}
        onClose={() => setRejectingDoc(null)}
        onConfirmReject={handleConfirmRejectDoc}
      />

      {/* ========================================================
          SUB-MODAL: DOCUMENT REJECTION REASON MODAL
      ======================================================== */}
      <AnimatePresence>
        {rejectingDoc && (
          <div key="reject-doc-wrapper" className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              key="reject-doc-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#111622] rounded-2xl max-w-md w-full p-6 space-y-4 relative border border-gray-200/80 dark:border-gray-800/80 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-display text-base">
                <AlertTriangle className="w-5 h-5" />
                <h3>
                  {rejectingDoc.status === 'rejected'
                    ? 'Update Feedback & Request Re-upload'
                    : 'Request Document Revision & Re-upload'}
                </h3>
              </div>

              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                {rejectingDoc.status === 'rejected'
                  ? 'Update revision instructions for '
                  : 'Provide specific feedback for '}
                <span className="text-germany-black dark:text-white font-extrabold">{rejectingDoc.name}</span>{' '}
                so the student knows what to correct and re-upload.
              </p>

              <textarea
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
                placeholder="e.g. Official semester marksheet lacks college registrar stamp. Please re-scan in high resolution (300 DPI)."
                rows={3}
                className="w-full p-3 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white resize-none focus:outline-none focus:border-red-500 shadow-xs"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingDoc(null)}
                  className="py-1.5 px-3 text-xs font-extrabold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1A2130] shadow-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={docActionLoading === rejectingDoc.id}
                  onClick={handleConfirmRejectDoc}
                  className="py-1.5 px-4 text-xs font-extrabold bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  {docActionLoading === rejectingDoc.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    {rejectingDoc.status === 'rejected'
                      ? 'Update & Request Re-upload'
                      : 'Confirm Rejection & Notify Student'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Counsellor Schedule / Invite Meeting Modal */}
      {isScheduleModalOpen && Boolean(effectiveStudentId) && (
        <MeetingBookingModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSuccess={() => {
            setIsScheduleModalOpen(false);
          }}
          mode="counsellor_invite"
          userRole="counsellor"
          studentUserId={effectiveStudentId}
          studentName={`${student?.firstName || ''} ${student?.lastName || ''}`.trim() || 'Student'}
        />
      )}
    </>
  );
}

export { StudentDetailModal as StudentDetailView };
