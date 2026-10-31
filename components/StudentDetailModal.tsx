"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AssignedStudent } from './CounsellorStudents';
import { StudentFullProfileView } from './StudentFullProfileView';

export interface StudentDocument {
  id: string;
  name: string;
  category: string;
  section: 'aps' | 'general' | 'lor_sop_cv';
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
  CatalogueDocument,
  DOCUMENT_CATALOGUE,
  DOCUMENT_TYPE_LABELS,
  formatBytes,
} from '@/lib/documentCatalogue';

function mapDbDocToStudentDocument(row: any): StudentDocument {
  const catItem = DOCUMENT_CATALOGUE.find((c) => c.type === row.document_type);
  const meta = catItem
    ? { name: catItem.name, category: catItem.category }
    : DOCUMENT_TYPE_LABELS[row.document_type] || {
        name: row.original_filename || (row.document_type ? row.document_type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : 'Document'),
        category: 'General',
      };

  let section: 'aps' | 'general' | 'lor_sop_cv' = 'general';
  if (row.section) {
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
  } else if (['cv', 'sop', 'lor'].includes(row.document_type)) {
    section = 'lor_sop_cv';
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
}

export function StudentDetailModal({
  student: propStudent,
  studentId,
  onClose,
  isPage = false,
}: StudentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'universities' | 'notes'>('overview');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const [fetchedStudent, setFetchedStudent] = useState<AssignedStudent | null>(null);
  const student = propStudent || fetchedStudent;
  const effectiveStudentId = student?.userId || propStudent?.userId || studentId || '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

  const handleGrantAttempts = async (documentType: 'sop' | 'lor') => {
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
      setGrantStatusMessage({
        text: `Success: Allotted +2 attempts for ${documentType.toUpperCase()}! Student now has ${data.newMaxGenerations - (dossierLimits?.[documentType]?.generationCount || 0)} attempts remaining.`,
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
  const [docCategory, setDocCategory] = useState<'all' | 'aps' | 'general' | 'lor_sop_cv'>('all');
  const [docFilter, setDocFilter] = useState<'all' | 'pending' | 'verified' | 'rejected' | 'not_uploaded'>('all');
  const [docActionFeedback, setDocActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);
  const [rejectingDoc, setRejectingDoc] = useState<StudentDocument | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // AI Academic Dossier Quotas & Counsellor Allotments
  const [dossierLimits, setDossierLimits] = useState<{
    sop: { generationCount: number; maxGenerations: number; remainingAttempts: number; extraAttemptsGranted: boolean; canGrantExtra: boolean };
    lor: { generationCount: number; maxGenerations: number; remainingAttempts: number; extraAttemptsGranted: boolean; canGrantExtra: boolean };
  } | null>(null);
  const [grantingDocType, setGrantingDocType] = useState<'sop' | 'lor' | null>(null);
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
        const payload = {
          programmeId: r.programmeId ? Number(r.programmeId) : undefined,
          universityId: r.universityId ? Number(r.universityId) : undefined,
          name: r.universityName,
          program: r.programName,
          degree: r.degree || 'Master',
          location: [r.city, r.country].filter(Boolean).join(', ') || 'Germany',
          tuition: r.tuitionPerSemester || 'Free / None (public university)',
          deadline: r.nonEuDeadline || 'NA',
          type: r.universityType || 'Public University',
          matchScore: r.relevanceScore || 90,
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
  }, [universities, matchingResults]);


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
    const fetchDocuments = async () => {
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
    };
    fetchDocuments();

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

    // Load counsellor notes
    const savedNote = localStorage.getItem(`eb_counsellor_notes_${effectiveStudentId}`);
    setNote(savedNote || '');

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

    // Load tasks
    const savedTasks = localStorage.getItem(`eb_student_tasks_${effectiveStudentId}`);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        setTasks(getDefaultTasks());
      }
    } else {
      const defTasks = getDefaultTasks();
      setTasks(defTasks);
      localStorage.setItem(`eb_student_tasks_${effectiveStudentId}`, JSON.stringify(defTasks));
    }
  }, [propStudent, studentId]);

  function getDefaultTasks(): ConsultationTask[] {
    return [
      { id: 't-1', text: 'Verify notarized transcripts for APS New Delhi submission', completed: true, dueDate: 'Aug 25' },
      { id: 't-2', text: 'Review revised Europass CV draft without graphical skills bars', completed: false, dueDate: 'Sept 08' },
      { id: 't-3', text: 'Check TUM course credit module alignment in computer architecture', completed: false, dueDate: 'Sept 12' },
      { id: 't-4', text: 'Schedule 1-on-1 strategy session for Expatrio Blocked Account', completed: false, dueDate: 'Sept 15' },
    ];
  }

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

      if (previewDoc?.id === docId) {
        setPreviewDoc(mapped);
      }
      setDocActionFeedback({
        type: 'success',
        message: `"${mapped.name}" has been verified and marked as accepted.`,
      });
      setTimeout(() => setDocActionFeedback(null), 3500);
    } catch (err: any) {
      setDocActionFeedback({
        type: 'error',
        message: err.message || 'Failed to verify document',
      });
    } finally {
      setDocActionLoading(null);
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
      const url = `${API_URL}/counsellor/universities/programmes?university=${encodeURIComponent(uni.name)}${
        effectiveStudentId ? `&studentId=${encodeURIComponent(effectiveStudentId)}` : ''
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

  // Notes & Tasks Handlers
  const handleSaveNote = () => {
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (effectiveId) {
      localStorage.setItem(`eb_counsellor_notes_${effectiveId}`, note);
    }
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (effectiveId) {
      localStorage.setItem(`eb_student_tasks_${effectiveId}`, JSON.stringify(updated));
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: ConsultationTask = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      completed: false,
      dueDate: 'Upcoming',
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    const effectiveId = student?.userId || propStudent?.userId || studentId;
    if (effectiveId) {
      localStorage.setItem(`eb_student_tasks_${effectiveId}`, JSON.stringify(updated));
    }
    setNewTaskText('');
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
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const initials = `${student?.firstName?.[0] || ''}${student?.lastName?.[0] || ''}`.toUpperCase() || 'ST';

  // Deduplicate documents by documentType so historical replacements or multiple records never inflate counts
  const distinctUploadedDocs = React.useMemo(() => {
    const map = new Map<string, StudentDocument>();
    documents.forEach((doc) => {
      const key = doc.documentType || doc.id;
      if (!map.has(key) || doc.status === 'verified') {
        map.set(key, doc);
      }
    });
    return Array.from(map.values());
  }, [documents]);

  const allCatalogueDocs = DOCUMENT_CATALOGUE;
  const apsCatalogueDocs = DOCUMENT_CATALOGUE.filter((d) => d.section === 'aps');
  const generalCatalogueDocs = DOCUMENT_CATALOGUE.filter((d) => d.section === 'general');
  const lorSopCvCatalogueDocs = DOCUMENT_CATALOGUE.filter((d) => d.section === 'lor_sop_cv');

  // Filtered by current category
  const currentCategoryCatalogue = React.useMemo(() => {
    if (docCategory === 'aps') return apsCatalogueDocs;
    if (docCategory === 'general') return generalCatalogueDocs;
    if (docCategory === 'lor_sop_cv') return lorSopCvCatalogueDocs;
    return allCatalogueDocs;
  }, [docCategory, allCatalogueDocs, apsCatalogueDocs, generalCatalogueDocs, lorSopCvCatalogueDocs]);

  const currentCategoryUploadedDocs = React.useMemo(() => {
    if (docCategory === 'aps') return distinctUploadedDocs.filter((d) => d.section === 'aps');
    if (docCategory === 'general') return distinctUploadedDocs.filter((d) => d.section === 'general');
    if (docCategory === 'lor_sop_cv') return distinctUploadedDocs.filter((d) => d.section === 'lor_sop_cv');
    return distinctUploadedDocs;
  }, [docCategory, distinctUploadedDocs]);

  // Missing / Not-yet-uploaded catalogue items
  const notUploadedCatalogueItems = React.useMemo(() => {
    const uploadedTypes = new Set(currentCategoryUploadedDocs.map((d) => d.documentType).filter(Boolean));
    return currentCategoryCatalogue.filter((item) => !uploadedTypes.has(item.type));
  }, [currentCategoryCatalogue, currentCategoryUploadedDocs]);

  // Metric counts for current category
  const statsTotalExpected = Math.max(currentCategoryCatalogue.length, currentCategoryUploadedDocs.length);
  const statsUploaded = currentCategoryUploadedDocs.length;
  const statsNotUploaded = notUploadedCatalogueItems.length;
  const statsPending = currentCategoryUploadedDocs.filter((d) => d.status === 'pending').length;
  const statsVerified = currentCategoryUploadedDocs.filter((d) => d.status === 'verified').length;
  const statsRejected = currentCategoryUploadedDocs.filter((d) => d.status === 'rejected').length;

  // Global counts for sub-tabs and top navigation
  const allUploadedCount = distinctUploadedDocs.length;
  const apsUploadedCount = distinctUploadedDocs.filter((d) => d.section === 'aps').length;
  const generalUploadedCount = distinctUploadedDocs.filter((d) => d.section === 'general').length;
  const lorSopCvUploadedCount = distinctUploadedDocs.filter((d) => d.section === 'lor_sop_cv').length;
  const pendingDocsCount = distinctUploadedDocs.filter((d) => d.status === 'pending').length;

  // Documents to render based on docFilter
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
                    <span className="px-2.5 py-0.5 bg-germany-gold/20 dark:bg-amber-950/40 text-germany-black dark:text-amber-300 font-extrabold rounded-full text-[11px] border border-germany-gold/40 dark:border-amber-800/40">
                      {formatStatus(student.status)}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded-full text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Assigned to You</span>
                    </span>
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
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-germany-red text-white shadow-md'
                    : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Overview &amp; Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'documents'
                    ? 'bg-germany-red text-white shadow-md'
                    : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Uploaded Documents</span>
                {pendingDocsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-900">
                    {pendingDocsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('universities')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'universities'
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

              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'notes'
                    ? 'bg-germany-red text-white shadow-md'
                    : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-[#1A2130] hover:text-germany-black dark:hover:text-white border border-gray-200/60 dark:border-gray-800/80'
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>Strategy Notes &amp; Tasks</span>
              </button>
            </div>
          </div>

          {/* Scrollable Tab Content Body */}
          <div className={isPage ? "pt-5 pb-2 pr-1 space-y-5" : "flex-1 overflow-y-auto pt-5 pb-2 pr-1 space-y-5"}>
            {/* ========================================================
                TAB 1: OVERVIEW & PROFILE
            ======================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {summaryLoading ? (
                  <div className="p-8 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
                  </div>
                ) : summaryError ? (
                  <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-red-500 text-xs font-bold bg-red-50">
                    {summaryError}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setShowFullProfile(true)}
                        className="py-2 px-4 text-xs font-extrabold flex items-center gap-1.5 bg-white dark:bg-[#151B27] text-germany-black dark:text-white hover:text-germany-red border border-gray-200/80 dark:border-gray-800/80 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        <span>View Student Profile</span>
                      </button>
                    </div>

                    {/* Profile Snapshot Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">German Bavarian GPA</span>
                        <div className="text-sm font-display text-germany-black dark:text-white flex items-center gap-1.5">
                          <span className="text-germany-black dark:text-white font-black">{summaryData?.summary?.gpa || 'NA'}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Language Scores</span>
                        <div className="text-sm font-display text-germany-black dark:text-white">
                          {summaryData?.summary?.languageScore || 'NA'}
                        </div>
                      </div>

                      <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Target Intake</span>
                        <div className="text-sm font-display text-germany-black dark:text-white">{summaryData?.summary?.targetIntake || 'NA'}</div>
                      </div>

                      <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Readiness Score</span>
                        <div className="text-sm font-display text-germany-red font-black flex items-center gap-1.5">
                          <span>{summaryData?.summary?.readinessScore || 'NA'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Advising Roadmap */}
                    <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-germany-red" />
                          <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
                            Study in Germany Admission Milestone Track
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {summaryData?.plan?.planName && (
                            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-germany-red/10 text-germany-red border border-germany-red/20">
                              Plan: {summaryData.plan.planName}
                            </span>
                          )}
                          <span className="text-[11px] font-bold text-gray-400">Status Overview</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {[
                          { title: 'Profile Registration', stage: 'logged_in' },
                          { title: 'Profile Complete', stage: 'profile_completed' },
                          { title: 'Matching Engine', stage: 'matching_completed' },
                          { title: 'Plan / Subscription', stage: 'plan_purchased' },
                          { title: 'Document Verification', stage: 'documents' },
                          { title: 'APS India Certificate', stage: 'aps' },
                          { title: 'Applications & Uni-Assist', stage: 'applications' },
                          { title: 'Visa & Blocked Account', stage: 'visa' },
                        ].map((step, idx) => {
                          const statusOrder = ['signed_up', 'logged_in', 'profile_completed', 'matching_completed', 'plan_purchased', 'documents', 'aps', 'applications', 'visa'];
                          const currentIdx = statusOrder.indexOf(summaryData?.status);
                          const stepIdx = statusOrder.indexOf(step.stage);
                          
                          let status = 'Pending';
                          // For future stages not yet supported by backend, always show as Pending
                          if (stepIdx > 3) {
                            status = 'Pending';
                          } else {
                            if (currentIdx > stepIdx) status = 'Completed';
                            else if (currentIdx === stepIdx) status = 'Current';
                          }

                          return (
                          <div
                            key={step.title}
                            className={`p-3 rounded-xl border flex flex-col justify-between gap-1 text-xs ${
                              status === 'Completed'
                                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                                : status === 'Current'
                                ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                                : 'bg-[#F4F1EA]/60 dark:bg-[#151B27] border-[#EBE7E0] dark:border-white/5'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase text-gray-400">Step 0{idx + 1}</span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  status === 'Completed'
                                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                                    : status === 'Current'
                                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                                    : 'bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                            <div className="font-extrabold text-germany-black dark:text-white text-xs leading-tight">{step.title}</div>
                          </div>
                        )})}
                      </div>
                    </div>
                  </>
                )}

                {/* Quick Consultation Jumpstart */}
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                      Action Required: {pendingDocsCount} Student Documents Pending Verification
                    </h4>
                    <p className="text-xs font-bold text-gray-500">
                      Verify uploaded transcripts, degree certificates, and statements of purpose to accelerate university submissions.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className="neu-btn-primary py-2 px-4 text-xs font-extrabold whitespace-nowrap cursor-pointer shadow-xs"
                  >
                    Go to Document Hub
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 2: UPLOADED DOCUMENTS & VERIFICATION
            ======================================================== */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                {/* Inline Action Feedback Banner */}
                {docActionFeedback && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between border shadow-xs ${
                      docActionFeedback.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {docActionFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                      <span>{docActionFeedback.message}</span>
                    </div>
                    <button
                      onClick={() => setDocActionFeedback(null)}
                      className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                      aria-label="Dismiss notification"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Hub Header & Sub-Category Selector */}
                <div className="bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-4 sm:p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base text-germany-black dark:text-white">Uploaded Documents Verification Hub</h3>
                      <p className="text-xs font-bold text-gray-500">
                        Review, verify, accept, or request revisions on student documents with real-time feedback.
                      </p>
                    </div>
                  </div>

                  {/* 4 Category Navigation Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-100 dark:border-gray-800/70">
                    <button
                      onClick={() => {
                        setDocCategory('all');
                        if (docFilter === 'not_uploaded') setDocFilter('all');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        docCategory === 'all'
                          ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                          : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                      }`}
                    >
                      All Documents ({allUploadedCount})
                    </button>

                    <button
                      onClick={() => {
                        setDocCategory('aps');
                        if (docFilter === 'not_uploaded') setDocFilter('all');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        docCategory === 'aps'
                          ? 'bg-germany-red text-white shadow-xs'
                          : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                      }`}
                    >
                      APS Documents ({apsUploadedCount})
                    </button>

                    <button
                      onClick={() => {
                        setDocCategory('general');
                        if (docFilter === 'not_uploaded') setDocFilter('all');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        docCategory === 'general'
                          ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                          : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                      }`}
                    >
                      General Documents ({generalUploadedCount})
                    </button>

                    <button
                      onClick={() => {
                        setDocCategory('lor_sop_cv');
                        if (docFilter === 'not_uploaded') setDocFilter('all');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all inline-flex items-center gap-2 ${
                        docCategory === 'lor_sop_cv'
                          ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                          : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                      }`}
                    >
                      <span>LOR, SOP &amp; CV ({lorSopCvUploadedCount})</span>
                      {lorSopCvUploadedCount > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                          {lorSopCvUploadedCount} Uploaded
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400/30 text-amber-900 dark:text-amber-200">
                          Pending
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* If LOR, SOP & CV is selected, show informative banner */}
                {/* AI Academic Dossier Quotas & Clearance Hub */}
                {docCategory === 'lor_sop_cv' && (
                  <div className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
                    {/* German Tricolor Accent Line */}
                    <div className="flex h-1 w-20 rounded-full overflow-hidden">
                      <div className="w-1/3 bg-[#000000]" />
                      <div className="w-1/3 bg-[#DD0000]" />
                      <div className="w-1/3 bg-[#FFCC00]" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-germany-red" />
                          <span>AI Academic Dossier Quota &amp; Regeneration Management</span>
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Standard student allowance is strictly 3 generations. Counsellors can allot exactly 2 bonus attempts only after the student has crossed the initial 3 attempts.
                        </p>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch(`${API_URL}/counsellor/students/${effectiveStudentId}/dossier-limits`, { credentials: 'include' });
                            if (res.ok) setDossierLimits(await res.json());
                          } catch {}
                        }}
                        className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                        title="Refresh Quota Status"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh Quotas</span>
                      </button>
                    </div>

                    {/* Feedback Toast */}
                    {grantStatusMessage && (
                      <div className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                        grantStatusMessage.type === 'success'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        {grantStatusMessage.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        )}
                        <span>{grantStatusMessage.text}</span>
                      </div>
                    )}

                    {/* SOP & LOR Quota Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Statement of Purpose (SOP) */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-germany-red" />
                            <span className="text-xs font-black text-gray-900 dark:text-white">
                              Statement of Purpose (SOP)
                            </span>
                          </div>
                          {dossierLimits?.sop?.canGrantExtra ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                              Initial 3 Limit Reached
                            </span>
                          ) : dossierLimits?.sop?.extraAttemptsGranted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              +2 Bonus Allotted
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Active Quota
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline justify-between pt-1">
                          <div>
                            <span className="text-2xl font-black text-gray-900 dark:text-white">
                              {dossierLimits?.sop?.generationCount ?? 0}
                            </span>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                              {' '}/ {dossierLimits?.sop?.maxGenerations ?? 3} used
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                              {dossierLimits?.sop?.remainingAttempts ?? 3} remaining
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-germany-red h-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                100,
                                (((dossierLimits?.sop?.generationCount ?? 0) / (dossierLimits?.sop?.maxGenerations ?? 3)) * 100)
                              )}%`,
                            }}
                          />
                        </div>

                        {/* Allot Button / Helper Info */}
                        <div className="pt-2">
                          {dossierLimits?.sop?.canGrantExtra ? (
                            <button
                              onClick={() => handleGrantAttempts('sop')}
                              disabled={grantingDocType === 'sop'}
                              className="w-full py-2 px-3 rounded-xl bg-germany-red hover:bg-[#D62839] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                            >
                              {grantingDocType === 'sop' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                              <span>Allot +2 SOP Attempts</span>
                            </button>
                          ) : dossierLimits?.sop?.extraAttemptsGranted ? (
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 text-center py-1">
                              Max 2 extra attempts already allotted (Total quota: {dossierLimits?.sop?.maxGenerations}).
                            </p>
                          ) : (
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 py-1 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>Student has {dossierLimits?.sop?.remainingAttempts ?? 3} initial attempts left. +2 extra attempts can be allotted once initial 3 are crossed.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Letter of Recommendation (LOR) */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-black text-gray-900 dark:text-white">
                              Letter of Recommendation (LOR)
                            </span>
                          </div>
                          {dossierLimits?.lor?.canGrantExtra ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                              Initial 3 Limit Reached
                            </span>
                          ) : dossierLimits?.lor?.extraAttemptsGranted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              +2 Bonus Allotted
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Active Quota
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline justify-between pt-1">
                          <div>
                            <span className="text-2xl font-black text-gray-900 dark:text-white">
                              {dossierLimits?.lor?.generationCount ?? 0}
                            </span>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                              {' '}/ {dossierLimits?.lor?.maxGenerations ?? 3} used
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                              {dossierLimits?.lor?.remainingAttempts ?? 3} remaining
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                100,
                                (((dossierLimits?.lor?.generationCount ?? 0) / (dossierLimits?.lor?.maxGenerations ?? 3)) * 100)
                              )}%`,
                            }}
                          />
                        </div>

                        {/* Allot Button / Helper Info */}
                        <div className="pt-2">
                          {dossierLimits?.lor?.canGrantExtra ? (
                            <button
                              onClick={() => handleGrantAttempts('lor')}
                              disabled={grantingDocType === 'lor'}
                              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                            >
                              {grantingDocType === 'lor' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                              <span>Allot +2 LOR Attempts</span>
                            </button>
                          ) : dossierLimits?.lor?.extraAttemptsGranted ? (
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 text-center py-1">
                              Max 2 extra attempts already allotted (Total quota: {dossierLimits?.lor?.maxGenerations}).
                            </p>
                          ) : (
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 py-1 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>Student has {dossierLimits?.lor?.remainingAttempts ?? 3} initial attempts left. +2 extra attempts can be allotted once initial 3 are crossed.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                    {/* Completeness & Progress Overview Card */}
                    <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-germany-red" />
                          <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">
                            Document Completeness &amp; Progress (
                            {docCategory === 'all'
                              ? 'All Categories'
                              : docCategory === 'aps'
                              ? 'APS Checklist'
                              : docCategory === 'lor_sop_cv'
                              ? 'LOR, SOP & CV'
                              : 'General Documents'}
                            )
                          </h4>
                        </div>
                        <span className="text-[11px] font-extrabold text-gray-400">
                          {statsUploaded} of {statsTotalExpected} Expected Uploaded
                        </span>
                      </div>

                      {/* 6 Metric Overview Tiles */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setDocFilter('all')}
                          className="p-3 rounded-xl bg-gray-50 dark:bg-[#151B27] border border-gray-200/70 dark:border-gray-800/70 text-left hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer"
                        >
                          <span className="text-[10px] font-extrabold uppercase text-gray-400 block">Total Expected</span>
                          <span className="text-lg font-black text-germany-black dark:text-white mt-0.5 block">{statsTotalExpected}</span>
                          <span className="text-[10px] font-bold text-gray-400">Catalogue items</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocFilter('all')}
                          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            docFilter === 'all'
                              ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
                              : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-blue-200'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">Uploaded</span>
                          <span className="text-lg font-black text-blue-700 dark:text-blue-300 mt-0.5 block">{statsUploaded}</span>
                          <span className="text-[10px] font-bold text-gray-400">Files received</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocFilter('not_uploaded')}
                          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            docFilter === 'not_uploaded'
                              ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800'
                              : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-purple-200'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-400 block">Not Uploaded</span>
                          <span className="text-lg font-black text-purple-700 dark:text-purple-300 mt-0.5 block">{statsNotUploaded}</span>
                          <span className="text-[10px] font-bold text-gray-400">Awaiting student</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocFilter('pending')}
                          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            docFilter === 'pending'
                              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                              : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-amber-200'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400 block">Pending Review</span>
                          <span className="text-lg font-black text-amber-700 dark:text-amber-300 mt-0.5 block">{statsPending}</span>
                          <span className="text-[10px] font-bold text-gray-400">Action required</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocFilter('verified')}
                          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            docFilter === 'verified'
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                              : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-emerald-200'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block">Verified</span>
                          <span className="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-0.5 block">{statsVerified}</span>
                          <span className="text-[10px] font-bold text-gray-400">Accepted &amp; ready</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocFilter('rejected')}
                          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                            docFilter === 'rejected'
                              ? 'bg-red-50/70 dark:bg-red-950/30 border-red-300 dark:border-red-800'
                              : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-red-200'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase text-red-600 dark:text-red-400 block">Needs Revision</span>
                          <span className="text-lg font-black text-red-700 dark:text-red-300 mt-0.5 block">{statsRejected}</span>
                          <span className="text-[10px] font-bold text-gray-400">Rejected / feedback</span>
                        </button>
                      </div>
                    </div>

                    {/* Filter Pills Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-4">
                      <div className="text-xs font-bold text-gray-500">
                        Showing{' '}
                        <span className="text-germany-black dark:text-white font-extrabold">
                          {docFilter === 'not_uploaded'
                            ? `${notUploadedCatalogueItems.length} Not Uploaded Documents`
                            : `${filteredDocs.length} Uploaded Documents`}
                        </span>{' '}
                        in{' '}
                        <span className="text-germany-black dark:text-white font-extrabold">
                          {docCategory === 'all'
                            ? 'All Categories'
                            : docCategory === 'aps'
                            ? 'APS Checklist'
                            : docCategory === 'lor_sop_cv'
                            ? 'LOR, SOP & CV'
                            : 'General Documents'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-extrabold text-gray-400 mr-1">Filter by status:</span>
                        {(
                          [
                            { id: 'all', label: 'All', count: statsUploaded },
                            { id: 'pending', label: 'Pending', count: statsPending },
                            { id: 'verified', label: 'Verified', count: statsVerified },
                            { id: 'rejected', label: 'Rejected', count: statsRejected },
                            { id: 'not_uploaded', label: 'Not Uploaded', count: statsNotUploaded },
                          ] as const
                        ).map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setDocFilter(filter.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold capitalize cursor-pointer transition-colors ${
                              docFilter === filter.id
                                ? 'bg-germany-red text-white shadow-xs'
                                : 'bg-[#EBE7E0] dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                            }`}
                          >
                            {filter.label} ({filter.count})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Documents List Container */}
                    <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                      {docsLoading ? (
                        <div className="p-12 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-bold">
                          <Loader2 className="w-6 h-6 animate-spin text-germany-red" />
                          <span>Loading uploaded documents from student records...</span>
                        </div>
                      ) : docsError ? (
                        <div className="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-2xl text-center text-red-500 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-950/20">
                          {docsError}
                        </div>
                      ) : docFilter === 'not_uploaded' ? (
                        /* Not Uploaded Catalogue Items View */
                        notUploadedCatalogueItems.length === 0 ? (
                          <div className="p-8 border-2 border-dashed border-emerald-200 dark:border-emerald-900/40 rounded-2xl text-center text-emerald-700 dark:text-emerald-400 text-xs font-bold bg-emerald-50/50 dark:bg-emerald-950/20">
                            Great news! All expected documents for this category have been uploaded by the student.
                          </div>
                        ) : (
                          <div className="divide-y divide-[#EBE7E0] dark:divide-gray-800/80">
                            {notUploadedCatalogueItems.map((item) => (
                              <div key={item.type} className="py-3.5 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="flex items-start gap-3">
                                    <div className="p-2.5 rounded-xl shrink-0 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700">
                                      <Clock className="w-4 h-4" />
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                                          {item.name}
                                        </h4>
                                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                          Not Uploaded
                                        </span>
                                        <span
                                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                            item.section === 'aps'
                                              ? 'bg-germany-red/10 text-germany-red border border-germany-red/20'
                                              : item.section === 'lor_sop_cv'
                                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                                              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                          }`}
                                        >
                                          {item.section === 'aps' ? 'APS Checklist' : item.section === 'lor_sop_cv' ? 'Academic Dossier' : 'General Document'}
                                        </span>
                                      </div>

                                      <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                        {item.category} • {item.description}
                                        {item.required && (
                                          <span className="text-amber-600 dark:text-amber-400 font-extrabold ml-1.5">
                                            • Mandatory Requirement
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="shrink-0 self-start sm:self-center">
                                    <span className="text-xs font-bold text-gray-400 italic">
                                      Awaiting student submission
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      ) : filteredDocs.length === 0 ? (
                        /* Empty state when 0 uploaded docs match filter */
                        <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center space-y-2 text-xs font-bold text-gray-400">
                          <p>
                            {currentCategoryUploadedDocs.length === 0
                              ? `No uploaded documents in this category yet (${statsNotUploaded} expected documents pending submission).`
                              : `No documents found matching the "${docFilter}" status filter.`}
                          </p>
                          {statsNotUploaded > 0 && docFilter !== 'all' && (
                            <button
                              onClick={() => setDocFilter('not_uploaded')}
                              className="text-germany-red font-extrabold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>View {statsNotUploaded} pending documents not uploaded yet &rarr;</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        /* Uploaded Documents List */
                        <div className="divide-y divide-[#EBE7E0] dark:divide-gray-800/80">
                          {filteredDocs.map((doc) => {
                            const isVerified = doc.status === 'verified';
                            const isPending = doc.status === 'pending';
                            const isRejected = doc.status === 'rejected';

                            return (
                              <div key={doc.id} className="py-3.5 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  {/* Left: Document details */}
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`p-2.5 rounded-xl shrink-0 ${
                                        isVerified
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : isPending
                                          ? 'bg-amber-100 text-amber-700'
                                          : 'bg-red-100 text-red-700'
                                      }`}
                                    >
                                      <FileText className="w-4 h-4" />
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                                          {doc.name}
                                        </h4>

                                        {/* Status Badge with both text and color */}
                                        <span
                                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                                            isVerified
                                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                              : isPending
                                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                              : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                                          }`}
                                        >
                                          {isVerified ? (
                                            <>
                                              <CheckCircle2 className="w-3 h-3" />
                                              <span>Verified</span>
                                            </>
                                          ) : isPending ? (
                                            <>
                                              <Clock className="w-3 h-3" />
                                              <span>Pending Verification</span>
                                            </>
                                          ) : (
                                            <>
                                              <AlertTriangle className="w-3 h-3" />
                                              <span>Revision Needed</span>
                                            </>
                                          )}
                                        </span>

                                        {/* Category Label Badge */}
                                        <span
                                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                            doc.section === 'aps'
                                              ? 'bg-germany-red/10 text-germany-red border border-germany-red/20'
                                              : doc.section === 'lor_sop_cv'
                                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                                              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                          }`}
                                        >
                                          {doc.section === 'aps' ? 'APS Checklist' : doc.section === 'lor_sop_cv' ? 'Academic Dossier' : 'General Document'}
                                        </span>
                                      </div>

                                      <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                        {doc.category} • Uploaded {doc.uploadDate} • {doc.size}
                                        {doc.originalFilename && (
                                          <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 ml-1">
                                            ({doc.originalFilename})
                                          </span>
                                        )}
                                        {doc.verifiedAt && (
                                          <span className="text-emerald-700 dark:text-emerald-400 font-extrabold ml-1.5">
                                            • Verified {doc.verifiedAt}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Right: Actions */}
                                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
                                    {/* Preview Button */}
                                    <button
                                      onClick={() => setPreviewDoc(doc)}
                                      className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                      title="Preview document contents"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Preview</span>
                                    </button>

                                    {/* Direct File Link */}
                                    {doc.url && (
                                      <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                        title="Open original file in new tab"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Open</span>
                                      </a>
                                    )}

                                    {/* Accept / Verify Button */}
                                    {isVerified ? (
                                      <div
                                        className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                                        title="Document already verified"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Verified</span>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleVerifyDoc(doc.id)}
                                        disabled={docActionLoading === doc.id}
                                        className="py-1.5 px-3.5 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                                        title="Accept and verify document"
                                      >
                                        {docActionLoading === doc.id ? (
                                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                        )}
                                        <span>Accept</span>
                                      </button>
                                    )}

                                    {/* Reject / Edit Reason / Request Re-upload Actions */}
                                    {isRejected ? (
                                      <>
                                        <button
                                          onClick={() => handleOpenRejectModal(doc)}
                                          disabled={docActionLoading === doc.id}
                                          className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-white dark:bg-[#151B27] border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-xs"
                                          title="Update rejection feedback"
                                        >
                                          <AlertTriangle className="w-3.5 h-3.5" />
                                          <span>Edit Reason</span>
                                        </button>
                                        <button
                                          onClick={() => handleOpenRejectModal(doc)}
                                          disabled={docActionLoading === doc.id}
                                          className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-red-600 hover:bg-red-700 text-white shadow-xs"
                                          title="Re-request student re-upload"
                                        >
                                          <AlertCircle className="w-3.5 h-3.5" />
                                          <span>Request Re-upload</span>
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        onClick={() => handleOpenRejectModal(doc)}
                                        disabled={docActionLoading === doc.id}
                                        className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-xs"
                                        title="Reject document and request revision"
                                      >
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span>Reject</span>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Rejection Note Display - Prominent & Distinguished */}
                                {doc.rejectionReason && (
                                  <div className="ml-10 p-3 rounded-xl bg-red-50/90 dark:bg-red-950/40 border-l-4 border-l-red-600 border-y border-r border-red-200/80 dark:border-red-900/40 text-xs text-red-900 dark:text-red-200 flex items-start gap-2.5 shadow-2xs">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                                    <div className="space-y-0.5 flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-black uppercase tracking-wider text-[10px] text-red-700 dark:text-red-300">
                                          Counsellor Feedback &amp; Revision Required:
                                        </span>
                                        <button
                                          onClick={() => handleOpenRejectModal(doc)}
                                          className="text-[10px] font-extrabold text-red-700 dark:text-red-300 hover:underline cursor-pointer"
                                        >
                                          Edit Feedback
                                        </button>
                                      </div>
                                      <p className="font-medium text-gray-800 dark:text-gray-200">{doc.rejectionReason}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
              </div>
            )}

            {/* ========================================================
                TAB 3: UNIVERSITY ELIGIBILITY & RECOMMENDATIONS
            ======================================================== */}
            {activeTab === 'universities' && (
              <div className="space-y-4">
                {/* Header with Run Matching & Add Recommendation */}
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base text-germany-black dark:text-white">University Eligibility &amp; Recommendations</h3>
                    <p className="text-xs font-bold text-gray-500">
                      {matchingRun?.status === 'completed'
                        ? `Last run: ${new Date(matchingRun.completed_at || matchingRun.created_at).toLocaleDateString()} — ${matchingRun.candidates_evaluated ?? 0} programmes evaluated (${matchingRun.results_generated ?? matchingResults.length} matches found)`
                        : matchingRun?.status === 'running' || matchingRun?.status === 'pending' || runningMatching
                        ? 'Matching in progress…'
                        : 'Run the matching engine to evaluate eligible programmes for this student.'}
                    </p>
                    {matchingRun?.status === 'failed' && (
                      <p className="text-[11px] text-red-600 font-medium mt-0.5">Last run failed. You can re-run below.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      id="counsellor-run-matching-btn"
                      onClick={handleRunMatching}
                      disabled={runningMatching || isMatchingLocked}
                      title={isMatchingLocked ? 'Shortlist and matching are locked. Unlock before re-running matching.' : undefined}
                      className={`flex items-center gap-1.5 py-2 px-3.5 text-xs font-extrabold rounded-xl shadow-xs transition-colors ${
                        isMatchingLocked
                          ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 cursor-not-allowed opacity-75'
                          : 'bg-germany-red hover:bg-[#D62839] disabled:opacity-60 text-white cursor-pointer'
                      }`}
                    >
                      {isMatchingLocked ? (
                        <><Lock className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" /> Shortlist Locked</>
                      ) : runningMatching ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…</>
                      ) : matchingRun?.status === 'running' || matchingRun?.status === 'pending' ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Re-start Matching</>
                      ) : matchingRun?.status === 'completed' ? (
                        <><RefreshCw className="w-3.5 h-3.5" /> Re-run Matching</>
                      ) : (
                        <><Compass className="w-3.5 h-3.5" /> Run Matching Engine</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Lock Status Alert Banner */}
                {isMatchingLocked && (
                  <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-2xl flex items-center justify-between gap-3 text-purple-900 dark:text-purple-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-200 dark:bg-purple-900/60 flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-purple-800 dark:text-purple-200" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
                          Shortlist &amp; Display Curation Locked
                        </p>
                        <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                          Programmes are finalized for university application submission. Re-running matching, curation modifications, and shortlist changes are locked. Click &quot;Shortlist Locked&quot; to unlock.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscription & Shortlist Lock Control Bar */}
                <div className="p-4 bg-gradient-to-r from-amber-500/10 via-transparent to-red-500/10 dark:from-amber-500/5 dark:to-red-500/5 rounded-2xl border border-amber-500/20 dark:border-amber-500/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    {studentSubscription ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-germany-gold/20 text-germany-black dark:text-germany-gold border border-germany-gold/40">
                          {studentSubscription.planName || studentSubscription.planId}
                        </span>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          Display: <strong className="text-germany-red">{curatedProgrammeIds.length}</strong> / {studentSubscription.maxDisplayCount} max
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          Shortlist: <strong className="text-blue-600">{studentShortlistCount}</strong> / {studentSubscription.maxShortlistCount} max
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          No Active Plan
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          Student has not purchased a plan. Results withheld from student until plan purchase.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      id="counsellor-toggle-lock-btn"
                      onClick={handleToggleLock}
                      disabled={togglingLock}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-extrabold transition-colors cursor-pointer border ${
                        isMatchingLocked
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-100'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                      }`}
                      title={isMatchingLocked ? 'Shortlist and matching are locked for this student. Click to unlock.' : 'Student can modify shortlist and re-run matching. Click to lock.'}
                    >
                      {togglingLock ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isMatchingLocked ? (
                        <Lock className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>{isMatchingLocked ? 'Shortlist Locked' : 'Shortlist Unlocked'}</span>
                    </button>

                    <button
                      onClick={() => setShowCurationPanel(!showCurationPanel)}
                      className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1C2436] transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{showCurationPanel ? 'Hide Curation Panel' : 'Show Curation Panel'}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.2 bg-germany-red text-white rounded-full">
                        {curatedProgrammeIds.length}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {matchingError && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-xs font-bold text-red-700 dark:text-red-300">{matchingError}</p>
                    </div>
                    <button onClick={fetchMatchingResults} className="text-xs font-extrabold text-red-700 dark:text-red-300 underline cursor-pointer">
                      Retry
                    </button>
                  </div>
                )}

                {/* Sub-navigation Tabs: Matched Programmes vs Other Universities / Catalogue */}
                <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-gray-800/80 pb-3 gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setMatchingSubTab('matches')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        matchingSubTab === 'matches'
                          ? 'bg-germany-red text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Matched Programmes</span>
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                          matchingSubTab === 'matches'
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMatchingSubTab('catalogue')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        matchingSubTab === 'catalogue'
                          ? 'bg-germany-red text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Other Universities / Catalogue</span>
                      {notepadProgrammes.length > 0 && (
                        <span
                          className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                            matchingSubTab === 'catalogue'
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          }`}
                        >
                          {notepadProgrammes.length} in Notepad
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] font-bold text-gray-400">
                    {matchingSubTab === 'matches'
                      ? `${filteredMatchingResults.length} matches • Page ${matchPage} of ${totalMatchPages}`
                      : `Search German universities above • ${notepadProgrammes.length} saved in notepad below`}
                  </p>
                </div>

                {/* Main Content Area: Left (Matches / Catalogue) + Right (Student Display Curation) */}
                <div className="flex flex-col xl:flex-row items-start gap-4">
                  {/* Left Column */}
                  <div className="flex-1 min-w-0 w-full">
                    {matchingSubTab === 'matches' ? (
                      <div className="space-y-4">
                        {/* Loading State */}
                        {(loadingMatching || runningMatching || matchingRun?.status === 'running' || matchingRun?.status === 'pending') && (
                          <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-3 animate-pulse">
                            <Loader2 className="w-7 h-7 text-germany-red mx-auto animate-spin" />
                            <p className="text-xs font-bold text-gray-400">
                              {runningMatching || matchingRun?.status === 'running' || matchingRun?.status === 'pending'
                                ? 'Running matching engine across all German university programmes for this student…'
                                : 'Loading matching results…'}
                            </p>
                          </div>
                        )}

                        {/* No Run Yet */}
                        {!loadingMatching && !runningMatching && matchingRun?.status !== 'running' && matchingRun?.status !== 'pending' && !matchingRun && (
                          <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-2">
                            <Compass className="w-8 h-8 text-gray-300 mx-auto" />
                            <h4 className="font-display text-sm text-germany-black dark:text-white">No Matching Run Yet</h4>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                              Click &quot;Run Matching Engine&quot; above to evaluate this student&apos;s qualifications against German university programmes.
                            </p>
                          </div>
                        )}

                        {/* Completed with 0 Results */}
                        {!loadingMatching && !runningMatching && matchingRun?.status === 'completed' && matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length === 0 && (
                          <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-3">
                            <Compass className="w-8 h-8 text-germany-red mx-auto" />
                            <h4 className="font-display text-sm text-germany-black dark:text-white">Profile Under Manual Advising Review</h4>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                              No direct automated matches passed the strict criteria. Switch to &quot;Other Universities / Catalogue&quot; to handpick specialized universities or pathway programs.
                            </p>
                            <button
                              type="button"
                              onClick={() => setMatchingSubTab('catalogue')}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 cursor-pointer"
                            >
                              <Building2 className="w-3.5 h-3.5" />
                              <span>Explore University Catalogue</span>
                            </button>
                          </div>
                        )}

                        {/* Matching Results Present */}
                        {!loadingMatching && !runningMatching && matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length > 0 && (
                          <div className="space-y-4">
                            {/* Search & Filter Toolbar */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs">
                              {/* Search input */}
                              <div className="relative flex-1 min-w-[200px]">
                                <input
                                  type="text"
                                  value={matchSearchQuery}
                                  onChange={(e) => {
                                    setMatchSearchQuery(e.target.value);
                                    setMatchPage(1);
                                  }}
                                  placeholder="Search by programme, university, city, language..."
                                  className="w-full pl-8 pr-8 py-2 bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-germany-red"
                                />
                                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                                {matchSearchQuery && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMatchSearchQuery('');
                                      setMatchPage(1);
                                    }}
                                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              {/* University Filter Dropdown */}
                              <div className="flex items-center gap-2">
                                <select
                                  value={matchUniFilter}
                                  onChange={(e) => {
                                    setMatchUniFilter(e.target.value);
                                    setMatchPage(1);
                                  }}
                                  className="text-xs font-extrabold bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-germany-red max-w-[220px] truncate cursor-pointer"
                                >
                                  <option value="ALL">
                                    All Universities ({matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length})
                                  </option>
                                  {matchedUniversities.map((u) => (
                                    <option key={u.name} value={u.name}>
                                      {u.name} ({u.count})
                                    </option>
                                  ))}
                                </select>

                                {(matchSearchQuery || matchUniFilter !== 'ALL') && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMatchSearchQuery('');
                                      setMatchUniFilter('ALL');
                                      setMatchPage(1);
                                    }}
                                    className="text-xs font-bold text-germany-red hover:underline whitespace-nowrap cursor-pointer px-1"
                                  >
                                    Reset
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Empty Filter State */}
                            {filteredMatchingResults.length === 0 ? (
                              <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-2">
                                <Filter className="w-8 h-8 text-gray-300 mx-auto" />
                                <h4 className="font-display text-sm text-germany-black dark:text-white">No Matching Programmes Found</h4>
                                <p className="text-xs text-gray-500">
                                  No programmes match your current filter criteria.
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMatchSearchQuery('');
                                    setMatchUniFilter('ALL');
                                    setMatchPage(1);
                                  }}
                                  className="inline-flex items-center gap-1 text-xs font-extrabold text-germany-red hover:underline pt-2 cursor-pointer"
                                >
                                  Clear All Filters
                                </button>
                              </div>
                            ) : (
                              <>
                                {/* Paginated Grid (12 items) */}
                                <div className={`grid grid-cols-1 ${showCurationPanel ? 'md:grid-cols-1 xl:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
                                  {paginatedMatchingResults.map((r: any) => {
                                    const progIdStr = String(r.programmeId || r.id);
                                    const isCurated = curatedProgrammeIds.includes(progIdStr);
                                    const isShortlisted = shortlistedProgIds.has(progIdStr);
                                    const maxDisplay = studentSubscription?.maxDisplayCount || 5;
                                    const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

                                    return (
                                      <div
                                        key={r.id}
                                        className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 shadow-xs ${
                                          isMatchingLocked
                                            ? 'bg-gray-50/70 dark:bg-[#0E121A]/60 border-gray-200/50 dark:border-gray-800/50 opacity-80'
                                            : isShortlisted
                                            ? 'bg-blue-50/20 dark:bg-[#0E121A] border-blue-400 dark:border-blue-700 ring-1 ring-blue-400/20'
                                            : isCurated
                                            ? 'bg-white dark:bg-[#0E121A] border-emerald-500/60 dark:border-emerald-500/40 ring-1 ring-emerald-500/20'
                                            : 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800/80 hover:border-germany-red/30'
                                        }`}
                                      >
                                        {/* Top: University, Program & Eligibility Status */}
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="space-y-0.5 min-w-0">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-germany-red">
                                              #{r.rank} • {r.universityType ?? 'University'}
                                            </span>
                                            <h4 className="font-display text-sm sm:text-base text-germany-black dark:text-white leading-tight truncate">
                                              {r.universityName}
                                            </h4>
                                            <p className="text-xs font-extrabold text-gray-600 dark:text-gray-300 leading-snug">{r.programName}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{r.degree}</p>
                                          </div>

                                          <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                            <span
                                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                                MATCH_ELIGIBILITY_STYLES[r.eligibilityStatus] ?? 'bg-gray-100 text-gray-600 border-gray-200'
                                              }`}
                                            >
                                              {MATCH_ELIGIBILITY_LABELS[r.eligibilityStatus] ?? r.eligibilityStatus}
                                            </span>
                                            {isShortlisted && (
                                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                                                ★ Shortlisted
                                              </span>
                                            )}
                                            {typeof r.relevanceScore === 'number' && (
                                              <span className="text-[10px] font-black text-gray-400">
                                                Score: {r.relevanceScore}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Location, Tuition, Language & Deadline */}
                                        <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-[#F4F1EA]/70 dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800/80">
                                          <div>
                                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Location</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                              📍 {[r.city, r.country].filter(Boolean).join(', ') || 'NA'}
                                            </span>
                                          </div>
                                          <div>
                                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Tuition</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">{r.tuitionPerSemester ?? 'NA'}</span>
                                          </div>
                                          <div>
                                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Language</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">🌐 {r.language ?? 'NA'}</span>
                                          </div>
                                          <div>
                                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Deadline</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">⏰ {r.nonEuDeadline ?? 'NA'}</span>
                                          </div>
                                        </div>

                                        {/* Why it matched */}
                                        {r.matchedReasons?.length > 0 && (
                                          <div className="pt-2 border-t border-[#EBE7E0] dark:border-gray-800/80">
                                            <p className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 mb-0.5">✓ Why it matched</p>
                                            <ul className="space-y-0.5">
                                              {r.matchedReasons.slice(0, 2).map((reason: string, i: number) => (
                                                <li key={i} className="text-[10px] text-gray-600 dark:text-gray-300 truncate">• {reason}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {/* Requirement gaps */}
                                        {r.requirementGaps?.length > 0 && (
                                          <div>
                                            <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 mb-0.5">⚠ Requirement Gaps</p>
                                            <ul className="space-y-0.5">
                                              {r.requirementGaps.slice(0, 2).map((gap: string, i: number) => (
                                                <li key={i} className="text-[10px] text-gray-500 dark:text-gray-400 truncate">• {gap}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {r.gpaFallbackUsed && (
                                          <p className="text-[10px] text-gray-400 italic">GPA: platform fallback (≤ 3.0) applied</p>
                                        )}

                                        {/* Action Footer */}
                                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2 flex-wrap">
                                          <div>
                                            {r.programUrl ? (
                                              <a
                                                href={r.programUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-germany-red hover:underline"
                                              >
                                                <ExternalLink className="w-3 h-3" /> Programme Website
                                              </a>
                                            ) : (
                                              <span />
                                            )}
                                          </div>

                                          <div className="flex items-center gap-2">
                                            <button
                                              type="button"
                                              onClick={() => handleDeleteMatchedProgramme(progIdStr)}
                                              disabled={isMatchingLocked}
                                              className={`p-1.5 rounded-lg transition-colors ${
                                                isMatchingLocked
                                                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40'
                                                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer'
                                              }`}
                                              title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Dismiss / remove programme from matches'}
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() => handleToggleCuratedProgramme(progIdStr)}
                                              disabled={savingCuration || isMatchingLocked || (!isCurated && (!studentSubscription || isDisplayFull))}
                                              className={`inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl transition-colors border ${
                                                isMatchingLocked
                                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                                                  : isCurated
                                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 cursor-pointer'
                                                  : 'bg-germany-black dark:bg-white text-white dark:text-germany-black border-transparent hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                                              }`}
                                              title={
                                                isMatchingLocked
                                                  ? 'Shortlist and curation are locked. Unlock to modify.'
                                                  : !studentSubscription
                                                  ? 'Student must have an active subscription'
                                                  : !isCurated && isDisplayFull
                                                  ? `Plan display limit reached (${maxDisplay})`
                                                  : isCurated
                                                  ? 'Remove from student display'
                                                  : 'Add to student display'
                                              }
                                            >
                                              {isMatchingLocked ? (
                                                <>
                                                  <Lock className="w-3 h-3 text-gray-400" />
                                                  <span>Locked</span>
                                                </>
                                              ) : isCurated ? (
                                                <>
                                                  <Check className="w-3 h-3 text-emerald-600" />
                                                  <span>On Student Display</span>
                                                </>
                                              ) : (
                                                <>
                                                  <Plus className="w-3 h-3" />
                                                  <span>Add to Display</span>
                                                </>
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Pagination Controls */}
                                {totalMatchPages > 1 && (
                                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/80 dark:border-gray-800/80">
                                    <button
                                      type="button"
                                      onClick={() => setMatchPage((p) => Math.max(1, p - 1))}
                                      disabled={matchPage <= 1}
                                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151B27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                      <span>Previous</span>
                                    </button>

                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                      <span>
                                        Page <strong className="text-germany-black dark:text-white">{matchPage}</strong> of{' '}
                                        <strong className="text-germany-black dark:text-white">{totalMatchPages}</strong>
                                      </span>
                                      <span className="text-gray-300 dark:text-gray-700">•</span>
                                      <span>({filteredMatchingResults.length} total)</span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => setMatchPage((p) => Math.min(totalMatchPages, p + 1))}
                                      disabled={matchPage >= totalMatchPages}
                                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151B27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                    >
                                      <span>Next</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Other Universities / Catalogue Explorer & Notepad Below */
                      <div className="space-y-6">
                        {/* Catalogue Explorer Box */}
                      <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-germany-red" />
                              <span>University Programme Catalogue Explorer</span>
                            </h4>
                            <p className="text-[11px] font-bold text-gray-400">
                              Search any German university to evaluate all its programmes with student background alignment
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsManualUniEntry(!isManualUniEntry)}
                            className="text-xs font-bold text-germany-red hover:underline cursor-pointer"
                          >
                            {isManualUniEntry ? '← Back to Catalogue Search' : '+ Manual Entry Fallback'}
                          </button>
                        </div>

                        {recommendSuccessMsg && (
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
                            <span>{recommendSuccessMsg}</span>
                            <button type="button" onClick={() => setRecommendSuccessMsg(null)}>
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {!isManualUniEntry ? (
                          <div className="space-y-4">
                            {/* Popular University Chips */}
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                                Popular Universities:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  'Munich University of Technology',
                                  'RWTH Aachen University',
                                  'Technical University of Berlin',
                                  'Heidelberg University',
                                  'Karlsruhe Institute of Technology',
                                  'University of Stuttgart',
                                ].map((quickUni) => (
                                  <button
                                    key={quickUni}
                                    type="button"
                                    onClick={() => handleSelectUniversity({ name: quickUni })}
                                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                      selectedUniversity?.name === quickUni
                                        ? 'bg-germany-red text-white border-germany-red shadow-xs'
                                        : 'bg-[#F8F9FA] dark:bg-[#151B27] text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-800/80 hover:border-germany-red/50'
                                    }`}
                                  >
                                    {quickUni}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">
                                Search University (Live Database)
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={uniSearchQuery}
                                  onChange={(e) => {
                                    setUniSearchQuery(e.target.value);
                                    if (selectedUniversity && e.target.value !== selectedUniversity.name) {
                                      setSelectedUniversity(null);
                                      setUniProgrammes([]);
                                      setSelectedProg(null);
                                    }
                                  }}
                                  onFocus={() => {
                                    if (uniSearchResults.length > 0) setShowUniDropdown(true);
                                  }}
                                  placeholder="Type university name (e.g. Technical University of Munich, RWTH Aachen)..."
                                  className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                                {loadingUniSearch && (
                                  <Loader2 className="w-4 h-4 text-germany-red animate-spin absolute right-3 top-3" />
                                )}
                                {!loadingUniSearch && uniSearchQuery && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setUniSearchQuery('');
                                      setSelectedUniversity(null);
                                      setUniSearchResults([]);
                                      setUniProgrammes([]);
                                      setSelectedProg(null);
                                    }}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              {/* Autocomplete Dropdown */}
                              {showUniDropdown && uniSearchResults.length > 0 && (
                                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-20 max-h-56 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
                                  {uniSearchResults.map((uni, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => handleSelectUniversity(uni)}
                                      className="w-full text-left px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-[#1E2638] transition-colors flex items-center justify-between gap-2"
                                    >
                                      <div>
                                        <div className="text-xs font-extrabold text-germany-black dark:text-white">
                                          {uni.name}
                                        </div>
                                        {(uni.city || uni.country) && (
                                          <div className="text-[10px] text-gray-400">
                                            📍 {[uni.city, uni.country].filter(Boolean).join(', ')}
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-400">Select →</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Selected University Details & Programmes List */}
                            {selectedUniversity && (
                              <div className="space-y-3 pt-2">
                                <div className="p-3 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between flex-wrap gap-2">
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-germany-red block">Selected University</span>
                                    <h5 className="font-display text-sm text-germany-black dark:text-white">{selectedUniversity.name}</h5>
                                    {selectedUniversity.city && (
                                      <span className="text-[11px] text-gray-400">📍 {selectedUniversity.city}</span>
                                    )}
                                  </div>

                                  {uniMeta && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>{uniMeta.relevantCount} Relevant ({uniMeta.studentField || 'Field'})</span>
                                      </span>
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60 flex items-center gap-1">
                                        <Ban className="w-3 h-3 text-red-600" />
                                        <span>{uniMeta.disqualifiedCount} Disqualified</span>
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {loadingProgrammes && (
                                  <div className="p-8 text-center space-y-2">
                                    <Loader2 className="w-6 h-6 text-germany-red animate-spin mx-auto" />
                                    <p className="text-xs font-bold text-gray-400">Loading university programmes & evaluating academic field...</p>
                                  </div>
                                )}

                                {programmesError && (
                                  <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900/40">
                                    {programmesError}
                                  </div>
                                )}

                                {!loadingProgrammes && !programmesError && uniProgrammes.length > 0 && (
                                  <div className="space-y-2.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                      <input
                                        type="text"
                                        value={progFilterText}
                                        onChange={(e) => setProgFilterText(e.target.value)}
                                        placeholder="Filter by keyword (e.g. Data, AI, Systems)..."
                                        className="px-3 py-1.5 bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-germany-red flex-1"
                                      />

                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => setProgFilterOnlyRelevant(false)}
                                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer ${
                                            !progFilterOnlyRelevant
                                              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black'
                                              : 'bg-gray-100 dark:bg-[#1E2638] text-gray-600 dark:text-gray-300'
                                          }`}
                                        >
                                          All ({uniProgrammes.length})
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setProgFilterOnlyRelevant(true)}
                                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer ${
                                            progFilterOnlyRelevant
                                              ? 'bg-emerald-600 text-white'
                                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                          }`}
                                        >
                                          Relevant Only ({uniProgrammes.filter((p) => p.isRelevant).length})
                                        </button>
                                      </div>
                                    </div>

                                    {/* Scrollable list of programmes */}
                                    <div className="max-h-[500px] overflow-y-auto space-y-2.5 pr-1">
                                      {uniProgrammes
                                        .filter((p) => {
                                          if (progFilterOnlyRelevant && !p.isRelevant) return false;
                                          if (progFilterText) {
                                            const q = progFilterText.toLowerCase();
                                            return (
                                              p.programName?.toLowerCase().includes(q) ||
                                              (p.subject && p.subject.toLowerCase().includes(q))
                                            );
                                          }
                                          return true;
                                        })
                                        .map((p) => {
                                          const progIdStr = String(p.id);
                                          const isCurated = curatedProgrammeIds.includes(progIdStr);
                                          const maxDisplay = studentSubscription?.maxDisplayCount || 5;
                                          const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

                                          // Check if this programme is already in the matchingResults
                                          const isAlreadyMatched = matchingResults.some((m: any) => {
                                            if (m.eligibilityStatus === 'NOT_ELIGIBLE') return false;
                                            const matchProgId = String(m.programmeId || m.id);
                                            if (matchProgId === progIdStr) return true;
                                            const matchProgName = (m.programName || '').toLowerCase().trim();
                                            const pProgName = (p.programName || '').toLowerCase().trim();
                                            const matchUniName = (m.universityName || '').toLowerCase().trim();
                                            const selectedUniName = (selectedUniversity?.name || '').toLowerCase().trim();
                                            return (
                                              matchProgName === pProgName &&
                                              (matchUniName.includes(selectedUniName) || selectedUniName.includes(matchUniName))
                                            );
                                          });

                                          // Check if already saved in Counsellor Notepad
                                          const isAlreadyInNotepad = notepadProgrammes.some((u: any) => {
                                            if (String(u.programmeId) === progIdStr) return true;
                                            const uProg = (u.program || '').toLowerCase().trim();
                                            const pProg = (p.programName || '').toLowerCase().trim();
                                            const uUni = (u.name || '').toLowerCase().trim();
                                            const sUni = (selectedUniversity?.name || '').toLowerCase().trim();
                                            return uProg === pProg && (uUni.includes(sUni) || sUni.includes(uUni));
                                          });

                                          return (
                                            <div
                                              key={p.id}
                                              className={`p-3.5 rounded-xl transition-all border ${
                                                isMatchingLocked
                                                  ? 'bg-gray-50/50 dark:bg-[#0B0E14] border-gray-200/50 dark:border-gray-800/50 opacity-70'
                                                  : isAlreadyMatched
                                                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/80 ring-1 ring-amber-400/20'
                                                  : isAlreadyInNotepad
                                                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700/80 ring-1 ring-emerald-500/20'
                                                  : p.isRelevant
                                                  ? 'bg-white dark:bg-[#151B27] border-gray-200/80 dark:border-gray-800/80 hover:border-emerald-400/80'
                                                  : 'bg-gray-50/50 dark:bg-[#0B0E14] border-red-200/40 dark:border-red-950/40 opacity-60'
                                              }`}
                                            >
                                              <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0 space-y-1 flex-1">
                                                  <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs font-extrabold text-germany-black dark:text-white leading-tight">
                                                      {p.programName}
                                                    </span>
                                                    {isAlreadyMatched ? (
                                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                                                        <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                                        <span>Already in Matching List</span>
                                                      </span>
                                                    ) : isAlreadyInNotepad ? (
                                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                                        <Bookmark className="w-2.5 h-2.5 text-emerald-600" />
                                                        <span>Saved in Notepad</span>
                                                      </span>
                                                    ) : p.isRelevant ? (
                                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                                        <span>Relevant to {uniMeta?.studentField || 'Field'}</span>
                                                      </span>
                                                    ) : (
                                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                                                        <Ban className="w-2.5 h-2.5 text-red-500" />
                                                        <span>Disqualified (Non-matching field)</span>
                                                      </span>
                                                    )}
                                                  </div>

                                                  <div className="text-[11px] font-bold text-gray-500 flex items-center gap-2 pt-0.5 flex-wrap">
                                                    <span>{p.degree}</span>
                                                    <span>•</span>
                                                    <span>🌐 {p.language}</span>
                                                    <span>•</span>
                                                    <span>💶 {p.tuition || 'Public tuition free'}</span>
                                                    {p.deadline && (
                                                      <>
                                                        <span>•</span>
                                                        <span>⏰ {p.deadline}</span>
                                                      </>
                                                    )}
                                                  </div>
                                                  {p.subject && (
                                                    <p className="text-[10px] text-gray-400">Subject: {p.subject}</p>
                                                  )}
                                                </div>

                                                {/* Action Buttons for Catalogue Programmes */}
                                                <div className="shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
                                                  {isAlreadyMatched ? (
                                                    <button
                                                      disabled
                                                      type="button"
                                                      className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/60 cursor-not-allowed opacity-85"
                                                      title="This programme was already evaluated by the matching engine and is in your Matched Programmes list"
                                                    >
                                                      <Check className="w-3 h-3 text-amber-600" />
                                                      <span>Already in Matches</span>
                                                    </button>
                                                  ) : isAlreadyInNotepad ? (
                                                    <button
                                                      type="button"
                                                      onClick={() => { const el = document.getElementById('counsellor-notepad-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                                                      className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
                                                      title="Saved in your notepad. Click to view notepad."
                                                    >
                                                      <Check className="w-3 h-3 text-emerald-600" />
                                                      <span>Saved in Notepad</span>
                                                    </button>
                                                  ) : p.isRelevant ? (
                                                    <button
                                                      type="button"
                                                      onClick={() => handleSaveProgrammeToNotepad(p)}
                                                      disabled={savingRecommendation || isMatchingLocked}
                                                      className={`inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl border border-transparent transition-colors ${
                                                        isMatchingLocked
                                                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                                          : 'bg-germany-black dark:bg-white text-white dark:text-germany-black hover:opacity-90 cursor-pointer disabled:opacity-40'
                                                      }`}
                                                      title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Save this programme to your Counsellor Notepad'}
                                                    >
                                                      {savingRecommendation ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                      ) : isMatchingLocked ? (
                                                        <Lock className="w-3 h-3 text-gray-400" />
                                                      ) : (
                                                        <Plus className="w-3 h-3" />
                                                      )}
                                                      <span>{isMatchingLocked ? 'Locked' : 'Add to Notepad'}</span>
                                                    </button>
                                                  ) : null}
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  </div>
                                )}

                                {!loadingProgrammes && !programmesError && uniProgrammes.length === 0 && (
                                  <div className="p-6 bg-gray-50 dark:bg-[#151B27] rounded-xl text-center text-xs font-bold text-gray-400">
                                    No programmes found in database for {selectedUniversity.name}. You can use manual entry fallback above.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Manual Entry Form */
                          <form onSubmit={handleSaveRecommendation} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                placeholder="University (e.g. TU Darmstadt)"
                                value={newUniName}
                                onChange={(e) => setNewUniName(e.target.value)}
                                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                                required
                              />
                              <input
                                type="text"
                                placeholder="Program (e.g. M.Sc. Distributed Systems)"
                                value={newUniProgram}
                                onChange={(e) => setNewUniProgram(e.target.value)}
                                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                                required
                              />
                              <input
                                type="text"
                                placeholder="City / State (e.g. Darmstadt, Hesse)"
                                value={newUniLocation}
                                onChange={(e) => setNewUniLocation(e.target.value)}
                                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                              />
                            </div>

                            <input
                              type="text"
                              placeholder="Advisor fit note or rationale (optional)"
                              value={recommendNote}
                              onChange={(e) => setRecommendNote(e.target.value)}
                              className="w-full p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                type="submit"
                                disabled={savingRecommendation || !newUniName.trim() || !newUniProgram.trim()}
                                className="flex items-center gap-1.5 px-4 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 cursor-pointer disabled:opacity-40"
                              >
                                {savingRecommendation ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                                <span>Add Programme to Recommendations</span>
                              </button>
                            </div>
                          </form>
                        )}
                      </div>

                        {/* Counsellor Saved Programmes / Notepad View (Below Catalogue) */}
                        <div id="counsellor-notepad-section" className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-4">
                          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                            <div>
                              <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-1.5">
                                <Bookmark className="w-4 h-4 text-germany-red" />
                                <span>Counsellor Saved Programmes &amp; Notepad</span>
                              </h4>
                              <p className="text-[11px] font-bold text-gray-400">
                                Your candidate scratchpad. Click &quot;+ Add to Display&quot; on any card below to curate it into the student display.
                              </p>
                            </div>
                            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-germany-black text-white dark:bg-white dark:text-germany-black">
                              {notepadProgrammes.length} saved
                            </span>
                          </div>

                          {notepadProgrammes.length === 0 ? (
                            <div className="p-8 text-center space-y-2 bg-gray-50/60 dark:bg-[#151B27]/40 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                              <Bookmark className="w-7 h-7 text-gray-400 mx-auto" />
                              <h5 className="font-display text-xs text-gray-600 dark:text-gray-300">Your Notepad is Empty</h5>
                              <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                                Search any university in the box above and click &quot;+ Add to Notepad&quot; to save candidate programmes here.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {notepadProgrammes.map((uni, idx) => {
                                const progIdStr = String(uni.programmeId || uni.id);
                                const isCurated = curatedProgrammeIds.includes(progIdStr);
                                const isShortlisted = shortlistedProgIds.has(progIdStr);
                                const maxDisplay = studentSubscription?.maxDisplayCount || 5;
                                const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

                                return (
                                  <div
                                    key={uni.id}
                                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                                      isShortlisted
                                        ? 'bg-blue-50/30 dark:bg-blue-950/20 border-blue-400 dark:border-blue-700 ring-1 ring-blue-400/20'
                                        : isCurated
                                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500 ring-1 ring-emerald-500/20'
                                        : 'bg-[#FCFBF8] dark:bg-[#151B27] border-gray-200/80 dark:border-gray-800/80 hover:border-germany-red/30'
                                    }`}
                                  >
                                    {/* Header: Type, Rank & Status */}
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="space-y-0.5 min-w-0 flex-1">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-germany-red">
                                          #{idx + 1} • {uni.type || 'Public University'}
                                        </span>
                                        <h4 className="font-display text-sm sm:text-base text-germany-black dark:text-white leading-tight truncate">
                                          {uni.name}
                                        </h4>
                                        <p className="text-xs font-extrabold text-gray-600 dark:text-gray-300 leading-snug">
                                          {uni.program}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-medium">{uni.degree}</p>
                                      </div>

                                      <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                        {isShortlisted ? (
                                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                                            ★ Shortlisted
                                          </span>
                                        ) : (
                                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border bg-germany-gold/20 text-germany-black dark:text-[#FDE68A] border-germany-gold/40">
                                            {uni.status ? uni.status.toUpperCase() : 'SAVED'}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Location, Tuition, Language & Deadline */}
                                    <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-[#F4F1EA]/70 dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800/80">
                                      <div>
                                        <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Location</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">📍 {uni.location || 'Germany'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Tuition</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">{uni.tuition || '€0 / semester'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Language</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">🌐 {uni.language || 'English'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Deadline</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">⏰ {uni.deadline || 'July 15'}</span>
                                      </div>
                                    </div>

                                    {uni.notes && (
                                      <div className="p-2 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 font-medium italic">
                                        &quot;{uni.notes}&quot;
                                      </div>
                                    )}

                                    {/* Action Footer */}
                                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2 flex-wrap">
                                      <div className="flex items-center gap-2">
                                        {uni.programUrl ? (
                                          <a
                                            href={uni.programUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-germany-red hover:underline"
                                          >
                                            <ExternalLink className="w-3 h-3" /> Website
                                          </a>
                                        ) : (
                                          <span />
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteRecommendation(uni.id)}
                                          disabled={isMatchingLocked}
                                          title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Remove programme from notepad'}
                                          className={`p-1.5 rounded-lg transition-colors ${
                                            isMatchingLocked
                                              ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40'
                                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer'
                                          }`}
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => handleToggleCuratedProgramme(progIdStr)}
                                          disabled={savingCuration || isMatchingLocked || (!isCurated && (!studentSubscription || isDisplayFull))}
                                          className={`inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl transition-colors border ${
                                            isMatchingLocked
                                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                                              : isCurated
                                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 cursor-pointer'
                                              : 'bg-germany-black dark:bg-white text-white dark:text-germany-black border-transparent hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                                          }`}
                                          title={
                                            isMatchingLocked
                                              ? 'Shortlist and curation are locked. Unlock to modify.'
                                              : !studentSubscription
                                              ? 'Student must have an active subscription'
                                              : !isCurated && isDisplayFull
                                              ? `Plan display limit reached (${maxDisplay}). Remove an item from Student Display Curation to make space.`
                                              : isCurated
                                              ? 'Remove from student display (frees up a display slot)'
                                              : 'Add to student display'
                                          }
                                        >
                                          {isMatchingLocked ? (
                                            <>
                                              <Lock className="w-3 h-3 text-gray-400" />
                                              <span>Locked</span>
                                            </>
                                          ) : isCurated ? (
                                            <>
                                              <Check className="w-3 h-3 text-emerald-600" />
                                              <span>On Display</span>
                                            </>
                                          ) : (
                                            <>
                                              <Plus className="w-3 h-3" />
                                              <span>Add to Display</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Dedicated Programme Curation Panel */}
                  {showCurationPanel && (
                    <div className="w-full xl:w-80 shrink-0 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 p-4 shadow-xs space-y-4 xl:sticky xl:top-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                        <div>
                          <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-1.5">
                            <span>Student Display Curation</span>
                          </h4>
                          <p className="text-[10px] font-bold text-gray-400">
                            Programmes visible to student
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-germany-black text-white dark:bg-white dark:text-germany-black">
                            {curatedProgrammeIds.length} / {studentSubscription?.maxDisplayCount || 5}
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                            ★ {studentShortlistCount} / {studentSubscription?.maxShortlistCount || 3} shortlisted
                          </span>
                        </div>
                      </div>

                      {/* Auto-fill Button */}
                      <button
                        type="button"
                        onClick={handleAutoFillTopMatches}
                        disabled={savingCuration || isMatchingLocked || !studentSubscription || matchingResults.length === 0}
                        className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-extrabold rounded-xl transition-colors ${
                          isMatchingLocked
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                            : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                        title={
                          isMatchingLocked
                            ? 'Shortlist and curation are locked. Unlock to modify.'
                            : 'Fill student display with the highest ranked eligible programmes up to plan limit'
                        }
                      >
                        {isMatchingLocked ? (
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-germany-gold" />
                        )}
                        <span>{isMatchingLocked ? 'Auto-fill Locked' : 'Auto-fill Top Matches'}</span>
                      </button>

                      {/* Curated Items List */}
                      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                        {curatedProgrammeIds.length === 0 ? (
                          <div className="p-6 text-center text-xs text-gray-400 space-y-1 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                            <p className="font-bold text-gray-500 dark:text-gray-400">No programmes curated</p>
                            <p className="text-[11px]">Click &quot;Add to Display&quot; on any match or use auto-fill above.</p>
                          </div>
                        ) : (
                          curatedProgrammeIds.map((progId, idx) => {
                            const matchItem = matchingResults.find(
                              (r) => String(r.programmeId || r.id) === String(progId)
                            );
                            const curatedItem = curatedProgrammes.find(
                              (cp) => String(cp.programmeId) === String(progId)
                            );
                            const isShortlisted = shortlistedProgIds.has(String(progId));
                            const uniName = matchItem?.universityName || curatedItem?.universityName || 'University';
                            const progName = matchItem?.programName || curatedItem?.programName || `Programme ID: ${progId}`;

                            return (
                              <div
                                key={progId}
                                className="p-2.5 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-gray-200/60 dark:border-gray-800/60 flex items-start justify-between gap-2 text-xs"
                              >
                                <div className="min-w-0 space-y-0.5 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-black text-germany-red shrink-0">
                                      #{idx + 1}
                                    </span>
                                    <span className="font-extrabold text-germany-black dark:text-white truncate block">
                                      {uniName}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-gray-600 dark:text-gray-300 truncate">
                                    {progName}
                                  </p>
                                  <div className="flex items-center gap-1.5 pt-0.5">
                                    {isShortlisted && (
                                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                                        ★ Shortlisted
                                      </span>
                                    )}
                                    {matchItem?.relevanceScore && (
                                      <span className="text-[9px] font-bold text-gray-400">
                                        Score: {matchItem.relevanceScore}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                  {/* Shortlist Toggle Button on the Student Display Curation card */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggleShortlist({
                                        programmeId: Number(progId),
                                        universityName: uniName,
                                        programName: progName,
                                        degree: matchItem?.degree || curatedItem?.degree || 'Master',
                                        city: matchItem?.city || curatedItem?.city || 'Germany',
                                        country: matchItem?.country || curatedItem?.country || 'Germany',
                                        tuitionPerSemester: matchItem?.tuitionPerSemester || curatedItem?.tuitionPerSemester || 'Free / None',
                                        nonEuDeadline: matchItem?.nonEuDeadline || curatedItem?.nonEuDeadline || 'NA',
                                        universityType: matchItem?.universityType || curatedItem?.universityType || 'Public University',
                                        relevanceScore: matchItem?.relevanceScore || 90,
                                      })
                                    }
                                    disabled={togglingShortlist === String(progId) || isMatchingLocked}
                                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold py-1 px-2 rounded-lg transition-colors border ${
                                      isMatchingLocked
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                                        : isShortlisted
                                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 cursor-pointer'
                                        : 'bg-white dark:bg-[#151B27] text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-800 hover:border-blue-400 hover:text-blue-600 cursor-pointer'
                                    }`}
                                    title={
                                      isMatchingLocked
                                        ? 'Shortlist is locked. Unlock to modify.'
                                        : isShortlisted
                                        ? 'Click to remove from student shortlist'
                                        : 'Add to student shortlist'
                                    }
                                  >
                                    {togglingShortlist === String(progId) ? (
                                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                    ) : isMatchingLocked ? (
                                      <Lock className="w-2.5 h-2.5 text-gray-400" />
                                    ) : (
                                      <Bookmark className={`w-2.5 h-2.5 ${isShortlisted ? 'fill-current text-blue-600' : ''}`} />
                                    )}
                                    <span>{isMatchingLocked && isShortlisted ? 'Shortlisted (Locked)' : isMatchingLocked ? 'Locked' : isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                                  </button>

                                  {/* Remove from Curation / Display Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCuratedProgramme(progId)}
                                    disabled={isMatchingLocked}
                                    title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Remove from student display (frees up a display slot)'}
                                    className={`p-1 rounded-lg transition-colors shrink-0 ${
                                      isMatchingLocked
                                        ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40'
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer'
                                    }`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Footer status */}
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-bold">
                        {savingCuration ? (
                          <span className="flex items-center gap-1 text-amber-600">
                            <Loader2 className="w-3 h-3 animate-spin" /> Saving changes…
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <Check className="w-3 h-3" /> Synced to student
                          </span>
                        )}
                        <span>Max {studentSubscription?.maxDisplayCount || 5}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 4: STRATEGY NOTES & TASKS
            ======================================================== */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                {/* Notes Editor */}
                <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-germany-black dark:text-white" />
                      <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
                        Private Counsellor Remarks &amp; Strategy
                      </h3>
                    </div>
                    {noteSaved && (
                      <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" />
                        Saved to browser!
                      </span>
                    )}
                  </div>

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Document consultation takeaways (e.g. Target TUM Data Engineering, advised to re-take German A2 Goethe exam in October, notarization complete for APS Delhi)..."
                    rows={4}
                    className="w-full p-3 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal resize-none focus:outline-none focus:border-germany-red shadow-xs"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[10px] font-bold text-gray-400">
                      Notes are kept private to counsellors and automatically saved.
                    </p>
                    <button
                      type="button"
                      onClick={handleSaveNote}
                      className="py-1.5 px-3.5 text-xs font-extrabold flex items-center gap-1.5 text-germany-black dark:text-white hover:text-germany-red dark:hover:text-germany-red bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl cursor-pointer shadow-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Notes</span>
                    </button>
                  </div>
                </div>

                {/* Consultation Follow-Up Checklist */}
                <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                  <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
                    Advising Checklist &amp; Action Items
                  </h3>

                  <div className="space-y-2">
                    {tasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleToggleTask(t.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold cursor-pointer transition-colors ${
                          t.completed 
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-gray-500 dark:text-gray-400 line-through' 
                            : 'bg-[#FDFBF7] dark:bg-[#151B27] border-[#EBE7E0] dark:border-gray-800/80 text-germany-black dark:text-white hover:bg-white dark:hover:bg-[#1A2130]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {t.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                          <span>{t.text}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-extrabold shrink-0">Due {t.dueDate}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddTask} className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add an advising follow-up item..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-germany-red shadow-xs"
                    />
                    <button
                      type="submit"
                      className="py-2 px-3 text-xs font-extrabold flex items-center gap-1 shrink-0 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-germany-black dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-[#1A2130] shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Task</span>
                    </button>
                  </form>
                </div>
              </div>
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

      {/* ========================================================
          SUB-MODAL: DOCUMENT PREVIEW MODAL
      ======================================================== */}
      <AnimatePresence>
        {previewDoc && (
          <div key="preview-doc-wrapper" className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              key="preview-doc-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#111622] rounded-2xl max-w-xl w-full p-6 space-y-4 relative border border-gray-200/80 dark:border-gray-800/80 shadow-2xl"
            >
              <button
                onClick={() => setPreviewDoc(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-germany-gold/20 text-germany-black dark:text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base text-germany-black dark:text-white">{previewDoc.name}</h3>
                  <p className="text-xs font-bold text-gray-400">
                    {previewDoc.category} • {previewDoc.size} • Uploaded {previewDoc.uploadDate}
                  </p>
                </div>
              </div>

              {/* Real Document Preview Viewer */}
              <div className="rounded-xl overflow-hidden border border-gray-200/70 dark:border-gray-800/80 bg-[#FAF8F5] dark:bg-[#0A0D14]">
                {previewDoc.previewContent ? (
                  <div className="p-4 max-h-[50vh] overflow-y-auto space-y-3 bg-white dark:bg-[#0E121A]">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800 text-xs">
                      <span className="font-bold text-gray-500">
                        {previewDoc.previewContent.trim().split(/\s+/).length} words • Academic Text Document
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(previewDoc.previewContent || '');
                          alert('Copied document text to clipboard!');
                        }}
                        className="text-xs font-bold text-germany-red hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </button>
                    </div>
                    <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                      {previewDoc.previewContent}
                    </pre>
                  </div>
                ) : previewDoc.url ? (
                  previewDoc.mimeType?.startsWith('image/') || /\.(jpe?g|png|webp)$/i.test(previewDoc.url) ? (
                    <div className="p-3 max-h-[50vh] flex items-center justify-center overflow-auto bg-black/5 dark:bg-black/30">
                      <img src={previewDoc.url} alt={previewDoc.name} className="max-h-[46vh] w-auto object-contain rounded-lg" />
                    </div>
                  ) : (
                    <div className="w-full h-80 bg-white dark:bg-[#0E121A]">
                      <iframe src={previewDoc.url} title={previewDoc.name} className="w-full h-full border-none" />
                    </div>
                  )
                ) : (
                  <div className="p-8 text-center text-xs font-bold text-gray-400">
                    No preview URL available for this file.
                  </div>
                )}
                {previewDoc.url && (
                  <div className="p-3 bg-white dark:bg-[#111622] border-t border-gray-200/60 dark:border-gray-800/80 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold truncate max-w-xs">{previewDoc.originalFilename || previewDoc.name}</span>
                    <a
                      href={previewDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-germany-red font-extrabold hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open full file in new tab</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Status & Quick Verification from Preview */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                  Current Status:{' '}
                  <span
                    className={`capitalize ${
                      previewDoc.status === 'verified'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : previewDoc.status === 'pending'
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-red-700 dark:text-red-400'
                    }`}
                  >
                    {previewDoc.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerifyDoc(previewDoc.id)}
                    disabled={docActionLoading === previewDoc.id}
                    className="neu-btn-primary py-1.5 px-3 text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    {docActionLoading === previewDoc.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    <span>Verify / Accept</span>
                  </button>
                  <button
                    onClick={() => {
                      handleOpenRejectModal(previewDoc);
                    }}
                    disabled={docActionLoading === previewDoc.id}
                    className="py-1.5 px-3 text-xs font-extrabold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
    </>
  );
}

export { StudentDetailModal as StudentDetailView };
