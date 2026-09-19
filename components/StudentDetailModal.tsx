"use client";

import React, { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';
import { AssignedStudent } from './CounsellorStudents';
import { StudentFullProfileView } from './StudentFullProfileView';

export interface StudentDocument {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: string;
  previewSnippet?: string;
}

export interface UniversityMatch {
  id: string;
  name: string;
  program: string;
  degree: string;
  location: string;
  matchScore: number;
  bavarianGpaReq: string;
  ieltsReq: string;
  tuition: string;
  status: 'recommended' | 'shortlisted' | 'applied' | 'offer_received' | 'waitlisted';
  deadline: string;
  type: string;
}

export interface ConsultationTask {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
}

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

  const [summaryData, setSummaryData] = useState<any>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Document state & sub-modals
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [docFilter, setDocFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);
  const [rejectingDoc, setRejectingDoc] = useState<StudentDocument | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // University shortlist state & adding
  const [universities, setUniversities] = useState<UniversityMatch[]>([]);
  const [showAddUni, setShowAddUni] = useState(false);
  const [newUniName, setNewUniName] = useState('');
  const [newUniProgram, setNewUniProgram] = useState('');
  const [newUniLocation, setNewUniLocation] = useState('');

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

    // Load or generate documents
    const savedDocs = localStorage.getItem(`eb_student_docs_${effectiveStudentId}`);
    if (savedDocs) {
      try {
        setDocuments(JSON.parse(savedDocs));
      } catch {
        setDocuments(getDefaultDocuments());
      }
    } else {
      const defDocs = getDefaultDocuments();
      setDocuments(defDocs);
      localStorage.setItem(`eb_student_docs_${effectiveStudentId}`, JSON.stringify(defDocs));
    }

    // Load or generate universities
    const savedUnis = localStorage.getItem(`eb_student_unis_${effectiveStudentId}`);
    if (savedUnis) {
      try {
        setUniversities(JSON.parse(savedUnis));
      } catch {
        setUniversities(getDefaultUniversities());
      }
    } else {
      const defUnis = getDefaultUniversities();
      setUniversities(defUnis);
      localStorage.setItem(`eb_student_unis_${effectiveStudentId}`, JSON.stringify(defUnis));
    }

    // Load counsellor notes
    const savedNote = localStorage.getItem(`eb_counsellor_notes_${effectiveStudentId}`);
    setNote(savedNote || '');

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

  // Default Document generator
  function getDefaultDocuments(): StudentDocument[] {
    return [
      {
        id: 'doc-1',
        name: 'Official Bachelor Transcripts (Sem 1-8)',
        category: 'Academic Records',
        size: '4.2 MB',
        uploadDate: 'Aug 24, 2026',
        status: 'pending',
        previewSnippet: 'Official academic transcript issued by University Examination Board. Cumulative CGPA: 8.85 / 10.0. German Bavarian Formula Conversion: 1.33 (Very Good). Total Credits: 184 ECTS equivalent.'
      },
      {
        id: 'doc-2',
        name: 'Bachelor of Technology Degree Certificate',
        category: 'Degree Certificate',
        size: '2.1 MB',
        uploadDate: 'Aug 24, 2026',
        status: 'verified',
        verifiedAt: 'Aug 25, 2026',
        previewSnippet: 'Provisional Degree Certificate conferring Bachelor of Technology in Computer Science & Engineering with First Class with Distinction.'
      },
      {
        id: 'doc-3',
        name: 'IELTS Academic Test Report Form',
        category: 'Language Proficiency',
        size: '1.4 MB',
        uploadDate: 'Aug 20, 2026',
        status: 'verified',
        verifiedAt: 'Aug 21, 2026',
        previewSnippet: 'Overall Band Score: 7.5. Listening: 8.0, Reading: 7.5, Writing: 7.0, Speaking: 7.5. CEFR Level: C1. Test Report Form Number: 26IN004812SHNA.'
      },
      {
        id: 'doc-4',
        name: 'Statement of Purpose (TUM / M.Sc. Data Engineering)',
        category: 'Motivation Letter',
        size: '0.8 MB',
        uploadDate: 'Aug 28, 2026',
        status: 'pending',
        previewSnippet: 'Motivation statement structured for TU Munich Data Engineering & Analytics. Outlines academic research in distributed databases, machine learning, and undergraduate thesis.'
      },
      {
        id: 'doc-5',
        name: 'Academic Curriculum Vitae (Europass Standard)',
        category: 'Curriculum Vitae',
        size: '0.5 MB',
        uploadDate: 'Aug 26, 2026',
        status: 'rejected',
        rejectionReason: 'Format must follow strict reverse chronological order without graphical bars. Please link your project portfolio and clarify course credit equivalencies.',
        previewSnippet: 'Tabular Curriculum Vitae according to Europass guidelines. Lists internships, technical skills (Python, Go, Docker), and leadership activities.'
      },
      {
        id: 'doc-6',
        name: 'APS India Verification Token & Fee Slip',
        category: 'APS Compliance',
        size: '1.8 MB',
        uploadDate: 'Aug 27, 2026',
        status: 'pending',
        previewSnippet: 'APS India verification paper receipt (₹18,000 paid via HDFC). Tracking ID: APS-ND-2026-8812. Status awaiting university registrar email confirmation.'
      },
      {
        id: 'doc-7',
        name: 'Valid International Passport (Bio Pages)',
        category: 'Identity & Travel',
        size: '3.2 MB',
        uploadDate: 'Aug 18, 2026',
        status: 'verified',
        verifiedAt: 'Aug 19, 2026',
        previewSnippet: 'Passport of the Republic of India. Valid until November 2034. Clean biometric pages, clear photograph, and signature verified.'
      },
      {
        id: 'doc-8',
        name: 'Academic Letters of Recommendation (2x Professors)',
        category: 'References',
        size: '1.2 MB',
        uploadDate: 'Aug 25, 2026',
        status: 'pending',
        previewSnippet: 'Two confidential letters of recommendation from Head of Department and Associate Professor endorsing analytical aptitude and research potential.'
      },
    ];
  }

  // Default University matches generator
  function getDefaultUniversities(): UniversityMatch[] {
    return [
      {
        id: 'uni-1',
        name: 'Technical University of Munich (TUM)',
        program: 'M.Sc. Data Engineering and Analytics',
        degree: 'Master of Science',
        location: 'Munich, Bavaria',
        matchScore: 98,
        bavarianGpaReq: '<= 2.0 (Student: 1.3)',
        ieltsReq: '>= 6.5 (Student: 7.5)',
        tuition: '€0 / semester fee only',
        status: 'recommended',
        deadline: 'May 31, 2026',
        type: 'Public / TU9 Excellence',
      },
      {
        id: 'uni-2',
        name: 'RWTH Aachen University',
        program: 'M.Sc. Computer Science',
        degree: 'Master of Science',
        location: 'Aachen, NRW',
        matchScore: 95,
        bavarianGpaReq: '<= 2.2 (Student: 1.3)',
        ieltsReq: '>= 6.5 (Student: 7.5)',
        tuition: '€0 / semester fee only',
        status: 'shortlisted',
        deadline: 'July 15, 2026',
        type: 'Public / TU9 Excellence',
      },
      {
        id: 'uni-3',
        name: 'Heidelberg University',
        program: 'M.Sc. Scientific Computing',
        degree: 'Master of Science',
        location: 'Heidelberg, BW',
        matchScore: 92,
        bavarianGpaReq: '<= 2.0 (Student: 1.3)',
        ieltsReq: '>= 7.0 (Student: 7.5)',
        tuition: '€1,500 / semester',
        status: 'shortlisted',
        deadline: 'June 15, 2026',
        type: 'Excellence University',
      },
      {
        id: 'uni-4',
        name: 'Karlsruhe Institute of Technology (KIT)',
        program: 'M.Sc. Information Technology',
        degree: 'Master of Science',
        location: 'Karlsruhe, BW',
        matchScore: 91,
        bavarianGpaReq: '<= 2.1 (Student: 1.3)',
        ieltsReq: '>= 6.5 (Student: 7.5)',
        tuition: '€1,500 / semester',
        status: 'recommended',
        deadline: 'July 15, 2026',
        type: 'Public / TU9 Excellence',
      },
      {
        id: 'uni-5',
        name: 'TU Berlin',
        program: 'M.Sc. Global Production Engineering',
        degree: 'Master of Science',
        location: 'Berlin',
        matchScore: 89,
        bavarianGpaReq: '<= 2.3 (Student: 1.3)',
        ieltsReq: '>= 6.5 (Student: 7.5)',
        tuition: '€0 / semester fee only',
        status: 'applied',
        deadline: 'June 30, 2026',
        type: 'Public / TU9',
      },
      {
        id: 'uni-6',
        name: 'University of Stuttgart',
        program: 'M.Sc. Information Technology (INFOTECH)',
        degree: 'Master of Science',
        location: 'Stuttgart, BW',
        matchScore: 87,
        bavarianGpaReq: '<= 2.5 (Student: 1.3)',
        ieltsReq: '>= 6.5 (Student: 7.5)',
        tuition: '€1,500 / semester',
        status: 'offer_received',
        deadline: 'July 15, 2026',
        type: 'Public / TU9',
      },
    ];
  }

  function getDefaultTasks(): ConsultationTask[] {
    return [
      { id: 't-1', text: 'Verify notarized transcripts for APS New Delhi submission', completed: true, dueDate: 'Aug 25' },
      { id: 't-2', text: 'Review revised Europass CV draft without graphical skills bars', completed: false, dueDate: 'Sept 08' },
      { id: 't-3', text: 'Check TUM course credit module alignment in computer architecture', completed: false, dueDate: 'Sept 12' },
      { id: 't-4', text: 'Schedule 1-on-1 strategy session for Expatrio Blocked Account', completed: false, dueDate: 'Sept 15' },
    ];
  }

  // Document Handlers
  const handleVerifyDoc = (docId: string) => {
    const updated = documents.map((d) => {
      if (d.id === docId) {
        return {
          ...d,
          status: 'verified' as const,
          verifiedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          rejectionReason: undefined,
        };
      }
      return d;
    });
    setDocuments(updated);
    localStorage.setItem(`eb_student_docs_${student.userId}`, JSON.stringify(updated));

    if (previewDoc?.id === docId) {
      setPreviewDoc((prev) => (prev ? { ...prev, status: 'verified', verifiedAt: 'Just now' } : null));
    }
  };

  const handleOpenRejectModal = (doc: StudentDocument) => {
    setRejectingDoc(doc);
    setRejectionReasonInput(doc.rejectionReason || '');
  };

  const handleConfirmRejectDoc = () => {
    if (!rejectingDoc) return;
    const updated = documents.map((d) => {
      if (d.id === rejectingDoc.id) {
        return {
          ...d,
          status: 'rejected' as const,
          rejectionReason: rejectionReasonInput.trim() || 'Document requires re-upload or clarification per counsellor review.',
        };
      }
      return d;
    });
    setDocuments(updated);
    localStorage.setItem(`eb_student_docs_${student.userId}`, JSON.stringify(updated));

    if (previewDoc?.id === rejectingDoc.id) {
      setPreviewDoc((prev) => (prev ? { ...prev, status: 'rejected', rejectionReason: rejectionReasonInput } : null));
    }

    setRejectingDoc(null);
    setRejectionReasonInput('');
  };

  // University Shortlist Status Update Handler
  const handleUpdateUniStatus = (uniId: string, newStatus: UniversityMatch['status']) => {
    const updated = universities.map((u) => {
      if (u.id === uniId) {
        return { ...u, status: newStatus };
      }
      return u;
    });
    setUniversities(updated);
    localStorage.setItem(`eb_student_unis_${student.userId}`, JSON.stringify(updated));
  };

  const handleAddUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUniName.trim() || !newUniProgram.trim()) return;

    const newUni: UniversityMatch = {
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
    };

    const updated = [newUni, ...universities];
    setUniversities(updated);
    localStorage.setItem(`eb_student_unis_${student.userId}`, JSON.stringify(updated));
    setNewUniName('');
    setNewUniProgram('');
    setNewUniLocation('');
    setShowAddUni(false);
  };

  // Notes & Tasks Handlers
  const handleSaveNote = () => {
    localStorage.setItem(`eb_counsellor_notes_${student.userId}`, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem(`eb_student_tasks_${student.userId}`, JSON.stringify(updated));
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
    localStorage.setItem(`eb_student_tasks_${student.userId}`, JSON.stringify(updated));
    setNewTaskText('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(student.userId);
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

  const initials = `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase() || 'ST';

  // Metrics
  const pendingDocsCount = documents.filter((d) => d.status === 'pending').length;
  const verifiedDocsCount = documents.filter((d) => d.status === 'verified').length;
  const filteredDocs = documents.filter((d) => {
    if (docFilter === 'all') return true;
    return d.status === docFilter;
  });

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
                    <h2 className="text-xl sm:text-2xl font-display text-germany-black leading-tight">
                      {student.firstName} {student.lastName}
                    </h2>
                    <span className="px-2.5 py-0.5 bg-germany-gold/20 text-germany-black font-extrabold rounded-full text-[11px] border border-germany-gold/40">
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
                  className="p-2 bg-white border border-gray-200/80 rounded-xl text-gray-600 hover:text-germany-red hover:bg-gray-50 cursor-pointer transition-colors shadow-xs"
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
                  {universities.length}
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
                        <span className="text-[11px] font-bold text-gray-400">Status Overview</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {[
                          { title: 'Profile / Registration', stage: 'signed_up' },
                          { title: 'Matching', stage: 'profile_completed' },
                          { title: 'Plan / Subscription', stage: 'plan_purchased' },
                          { title: 'Document Verification', stage: 'documents' },
                          { title: 'APS India Certificate', stage: 'aps' },
                          { title: 'Applications & Uni-Assist', stage: 'applications' },
                          { title: 'Visa & Blocked Account', stage: 'visa' },
                        ].map((step, idx) => {
                          const statusOrder = ['signed_up', 'profile_completed', 'plan_purchased', 'documents', 'aps', 'applications', 'visa'];
                          const currentIdx = statusOrder.indexOf(summaryData?.status);
                          const stepIdx = statusOrder.indexOf(step.stage);
                          
                          let status = 'Pending';
                          // For future stages not yet supported by backend, always show as Pending
                          if (stepIdx > 2) {
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
                {/* Header & Filter Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-4">
                  <div>
                    <h3 className="font-display text-base text-germany-black dark:text-white">Uploaded Documents Verification Hub</h3>
                    <p className="text-xs font-bold text-gray-500">
                      Review, verify, accept, or reject each document with custom feedback.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-extrabold text-gray-400 mr-1">Filter:</span>
                    {(['all', 'pending', 'verified', 'rejected'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setDocFilter(filter)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold capitalize cursor-pointer transition-colors ${
                          docFilter === filter
                            ? 'bg-germany-red text-white shadow-xs'
                            : 'bg-[#EBE7E0] dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                        }`}
                      >
                        {filter} {filter === 'all' ? `(${documents.length})` : `(${documents.filter((d) => d.status === filter).length})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Documents List */}
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                  {filteredDocs.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold">
                      No documents found for this filter.
                    </div>
                  ) : (
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
                                    <span
                                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                                        isVerified
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : isPending
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {isVerified ? 'Verified & Accepted' : isPending ? 'Pending Verification' : 'Revision Needed'}
                                    </span>
                                  </div>

                                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                    {doc.category} • Uploaded {doc.uploadDate} • {doc.size}
                                    {doc.verifiedAt && <span className="text-emerald-700 font-extrabold ml-1.5">• Verified {doc.verifiedAt}</span>}
                                  </p>
                                </div>
                              </div>

                              {/* Right: Actions */}
                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                {/* Preview Button */}
                                <button
                                  onClick={() => setPreviewDoc(doc)}
                                  className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                  title="Preview document contents"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Preview</span>
                                </button>

                                {/* Accept / Verify Button */}
                                <button
                                  onClick={() => handleVerifyDoc(doc.id)}
                                  className={`py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                                    isVerified
                                      ? 'bg-emerald-700 text-white shadow-xs'
                                      : 'bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 shadow-xs'
                                  }`}
                                  title="Accept and verify document"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{isVerified ? 'Verified' : 'Accept'}</span>
                                </button>

                                {/* Reject / Revision Button */}
                                <button
                                  onClick={() => handleOpenRejectModal(doc)}
                                  className={`py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                                    isRejected
                                      ? 'bg-red-700 text-white shadow-xs'
                                      : 'bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-xs'
                                  }`}
                                  title="Reject document and request revision"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>{isRejected ? 'Edit Reason' : 'Reject'}</span>
                                </button>
                              </div>
                            </div>

                            {/* Rejection Note Display */}
                            {doc.rejectionReason && (
                              <div className="ml-10 p-2.5 rounded-xl bg-red-50/80 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-600" />
                                <div>
                                  <span className="font-extrabold">Counsellor Feedback to Student: </span>
                                  <span>{doc.rejectionReason}</span>
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
                TAB 3: UNIVERSITY ELIGIBILITY & SHORTLIST
            ======================================================== */}
            {activeTab === 'universities' && (
              <div className="space-y-4">
                {/* Header with Add University Recommendation */}
                <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base text-germany-black dark:text-white">University Eligibility &amp; Recommendations</h3>
                    <p className="text-xs font-bold text-gray-500">
                      Top programs matched against student's Bavarian GPA (1.33) and language scores.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddUni(!showAddUni)}
                    className="neu-btn-primary py-2 px-3.5 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Recommend Program</span>
                  </button>
                </div>

                {/* Add University Form Drawer */}
                {showAddUni && (
                  <form onSubmit={handleAddUniversity} className="p-4 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                    <h4 className="text-xs font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
                      Add New University Recommendation
                    </h4>
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
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddUni(false)}
                        className="py-1.5 px-3 text-xs font-extrabold bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1E2638] shadow-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="neu-btn-primary py-1.5 px-4 text-xs font-extrabold"
                      >
                        Add to Student Shortlist
                      </button>
                    </div>
                  </form>
                )}

                {/* University Match Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {universities.map((uni) => {
                    const statusColors = {
                      recommended: 'bg-germany-gold/20 text-germany-black dark:text-[#FDE68A] border-germany-gold/40',
                      shortlisted: 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
                      applied: 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
                      offer_received: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 font-black',
                      waitlisted: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
                    };

                    return (
                      <div key={uni.id} className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs hover:border-germany-red/30 space-y-3.5 transition-colors">
                        {/* Top: University, Type & Match Score */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-germany-red">
                              {uni.type}
                            </span>
                            <h4 className="font-display text-sm sm:text-base text-germany-black dark:text-white leading-tight">
                              {uni.name}
                            </h4>
                            <p className="text-xs font-extrabold text-gray-600 dark:text-gray-300">{uni.program}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                              <Target className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              {uni.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        {/* Middle: Eligibility Details */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-[#F4F1EA]/70 dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800/80">
                          <div>
                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">GPA Eligibility</span>
                            <span className="font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Passed (Req {uni.bavarianGpaReq})
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-extrabold block text-[10px] uppercase">English Score</span>
                            <span className="font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Passed ({uni.ieltsReq})
                            </span>
                          </div>
                        </div>

                        {/* Location, Tuition & Deadline */}
                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 pt-1">
                          <span>📍 {uni.location}</span>
                          <span className="text-germany-black dark:text-white font-extrabold">{uni.tuition}</span>
                        </div>

                        {/* Bottom: Counsellor Status Management */}
                        <div className="pt-2 border-t border-[#EBE7E0] dark:border-gray-800/80 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Status:</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusColors[uni.status]}`}>
                              {uni.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>

                          {/* Quick Status Toggle Dropdown */}
                          <select
                            value={uni.status}
                            onChange={(e) => handleUpdateUniStatus(uni.id, e.target.value as UniversityMatch['status'])}
                            className="text-[11px] font-extrabold py-1 px-2.5 text-germany-black dark:text-white cursor-pointer bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl shadow-xs"
                          >
                            <option value="recommended">Recommended</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="applied">Applied</option>
                            <option value="offer_received">Offer Letter Received 🎓</option>
                            <option value="waitlisted">Waitlisted</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================
                TAB 4: STRATEGY NOTES & TASKS
            ======================================================== */}
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

              {/* Simulated Document Preview Viewer */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0D14] border border-gray-200/70 dark:border-gray-800/80 space-y-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800/80 pb-2 text-[11px] font-sans font-extrabold text-gray-400">
                  <span>SIMULATED DOCUMENT PREVIEW</span>
                  <span className="text-emerald-700 dark:text-emerald-400">AUTHENTICATED PDF SCAN</span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs text-gray-700 dark:text-gray-300">
                  {previewDoc.previewSnippet || 'Document content certified for German Higher Education and APS verification.'}
                </p>
                <div className="pt-2 text-[10px] text-gray-400 font-sans flex items-center justify-between border-t border-gray-200/60 dark:border-gray-800/80">
                  <span>Verification Hash: SHA256-EB981247</span>
                  <span>Page 1 of 2</span>
                </div>
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
                    className="neu-btn-primary py-1.5 px-3 text-xs font-extrabold flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify / Accept</span>
                  </button>
                  <button
                    onClick={() => {
                      handleOpenRejectModal(previewDoc);
                    }}
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
                <h3>Request Document Revision</h3>
              </div>

              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Provide specific feedback for <span className="text-germany-black dark:text-white font-extrabold">{rejectingDoc.name}</span> so the student knows what to re-upload.
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
                  onClick={handleConfirmRejectDoc}
                  className="py-1.5 px-4 text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirm Rejection
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
