"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Save,
  ArrowLeft,
  ArrowRight,
  Download,
  BookOpen,
  Layers,
  GraduationCap,
  Briefcase,
  Target,
  Info,
  Check,
  RefreshCw,
  Sparkles,
  X,
  ShieldCheck,
  CheckSquare,
  Square,
} from 'lucide-react';
import { DEGREE_TYPE_OPTIONS, FIELD_OF_STUDY_OPTIONS } from '@/lib/education-constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface SopGeneratorProps {
  onBack?: () => void;
}

interface ShortlistedProgrammeItem {
  id: string; // recommendation id
  programmeId: number | null;
  universityName: string;
  programName: string;
  degree?: string;
  location?: string;
  deadline?: string;
  language?: string;
  programUrl?: string;
  document: {
    id: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    originalFilename: string;
    url: string | null;
    rejectionNote: string | null;
    uploadedAt: string;
    verifiedAt: string | null;
  } | null;
  job: {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    errorMessage: string | null;
    createdAt: string;
  } | null;
}

interface EducationProfile {
  id?: string;
  score: number | null;
  scale: number | null;
  minPassingScore: number | null;
  germanGrade: number | null;
  degreeType: string | null;
  fieldOfStudy: string | null;
  institutionName: string | null;
  gradingSystem?: string | null;
}

interface StudentProfileBasics {
  intakeSeason: string;
  intakeYear: number | null;
  intendedDegreeLevel?: string;
  preferredFieldOfStudy?: string;
}

interface SopFormState {
  targetUniversity: string;
  targetProgram: string;
  intakeSeason: string;
  intakeYear: number | string;
  targetModules: string[];
  bachelorDegree: string;
  bachelorInstitution: string;
  bachelorGpa: string;
  bachelorThesis: {
    title: string;
    methodology: string;
    outcome: string;
  };
  relevantCourses: string[];
  practicalExperience: string;
  careerGoals: string;
  whyGermany: string;
  additionalNotes: string;
}

type MainTab = 'form' | 'documents';
type IntakeStep = 'target' | 'academic' | 'career';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export function StudentSopGenerator({ onBack }: SopGeneratorProps) {
  // Main Navigation: 'form' (3-Step Questionnaire) vs 'documents' (Generated SOPs & Re-generation)
  const [activeTab, setActiveTab] = useState<MainTab>('form');
  const [selectedStep, setSelectedStep] = useState<IntakeStep>('target');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Shortlisted Programmes
  const [programmes, setProgrammes] = useState<ShortlistedProgrammeItem[]>([]);
  const [selectedForRegen, setSelectedForRegen] = useState<Record<string, boolean>>({});

  // Quota & Attempts
  const [maxGenerations, setMaxGenerations] = useState(3);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMode, setModalMode] = useState<'initial-batch' | 'selective-regen'>('initial-batch');

  // Education & GPA Sync State
  const [educationProfile, setEducationProfile] = useState<EducationProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfileBasics | null>(null);

  // GPA Recalculate Modal State (mirrors Student Profile Education section)
  const [showGpaModal, setShowGpaModal] = useState(false);
  const [gpaGradingSystem, setGpaGradingSystem] = useState<string>('CGPA/10');
  const [gpaScore, setGpaScore] = useState<string>('8.5');
  const [gpaScale, setGpaScale] = useState<string>('10');
  const [gpaMinPass, setGpaMinPass] = useState<string>('4');
  const [isSavingGpa, setIsSavingGpa] = useState(false);

  // Form Inputs
  const [newModule, setNewModule] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [formData, setFormData] = useState<SopFormState>({
    targetUniversity: 'German Public Universities',
    targetProgram: 'Master of Science Program',
    intakeSeason: 'WINTER',
    intakeYear: new Date().getFullYear() + 1,
    targetModules: ['Advanced Distributed Systems', 'Applied Machine Learning', 'Cloud Computing Architecture'],
    bachelorDegree: '',
    bachelorInstitution: '',
    bachelorGpa: '',
    bachelorThesis: {
      title: 'Algorithmic Optimization in Distributed Query Processing',
      methodology: 'Experimental prototyping and benchmark evaluation under high concurrency',
      outcome: 'Achieved a 34% reduction in query latency and validated reproducibility',
    },
    relevantCourses: ['Data Structures & Algorithms', 'Linear Algebra & Statistics', 'Operating Systems', 'Database Systems'],
    practicalExperience: 'Software engineering internship focused on microservice deployment and API performance optimization.',
    careerGoals: 'To work in German R&D engineering, contributing to cutting-edge industrial IoT and distributed systems.',
    whyGermany: 'Germany offers tuition-free, globally recognized research rigor with direct industry integration and cutting-edge laboratory infrastructure.',
    additionalNotes: '',
  });

  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // =========================================================================
  // DATA FETCHING & SYNCHRONIZATION
  // =========================================================================

  const loadData = useCallback(async (isPolling = false) => {
    try {
      if (!isPolling) setIsLoading(true);

      const data = await apiFetch<{
        isLocked: boolean;
        programmes: ShortlistedProgrammeItem[];
        education?: EducationProfile | null;
        gpaInfo?: EducationProfile | null;
        profile?: StudentProfileBasics;
        sopData?: any;
        questionnaire?: any;
        quota?: {
          generationCount: number;
          maxGenerations: number;
          remainingAttempts: number;
          extraAttemptsGranted: boolean;
        };
      }>('/student/sop/shortlisted-programmes');

      if (data.programmes) {
        setProgrammes(data.programmes);

        // Check if any job is currently in progress
        const hasActiveJobs = data.programmes.some(
          (p) => (p.job?.status === 'pending' || p.job?.status === 'processing') && !p.document
        );
        setIsGenerating(hasActiveJobs);
      }

      // Sync Profile Intake Season & Year
      if (data.profile) {
        setStudentProfile(data.profile);
        const season = data.profile.intakeSeason
          ? (data.profile.intakeSeason.toUpperCase().includes('SUMMER') ? 'SUMMER' : 'WINTER')
          : 'WINTER';
        const year = data.profile.intakeYear || new Date().getFullYear() + 1;

        setFormData((prev) => ({
          ...prev,
          intakeSeason: season,
          intakeYear: year,
        }));
      }

      // Sync Education & German GPA
      const edu = data.education || data.gpaInfo;
      if (edu) {
        setEducationProfile(edu);
        if (edu.score != null) setGpaScore(String(edu.score));
        if (edu.scale != null) setGpaScale(String(edu.scale));
        if (edu.minPassingScore != null) setGpaMinPass(String(edu.minPassingScore));
        if (edu.gradingSystem) setGpaGradingSystem(edu.gradingSystem);

        const degreeLabel = edu.degreeType
          ? (DEGREE_TYPE_OPTIONS.find((d) => d.id === edu.degreeType)?.label || edu.degreeType)
          : '';
        const fieldLabel = edu.fieldOfStudy
          ? (FIELD_OF_STUDY_OPTIONS.find((f) => f.id === edu.fieldOfStudy)?.label || edu.fieldOfStudy)
          : '';

        let syncdDegree = '';
        if (degreeLabel && fieldLabel) {
          syncdDegree = degreeLabel.toLowerCase().includes(fieldLabel.toLowerCase())
            ? degreeLabel
            : `${degreeLabel} in ${fieldLabel}`;
        } else {
          syncdDegree = degreeLabel || fieldLabel || '';
        }

        const formattedGpa = edu.germanGrade != null
          ? `German Scale ~${Number(edu.germanGrade).toFixed(2)}${edu.score ? ` (${edu.score}/${edu.scale || 10} CGPA)` : ''}`
          : (edu.score ? `Score: ${edu.score}/${edu.scale || 10}` : '');

        setFormData((prev) => ({
          ...prev,
          bachelorDegree: prev.bachelorDegree ? prev.bachelorDegree : syncdDegree,
          bachelorInstitution: prev.bachelorInstitution ? prev.bachelorInstitution : (edu.institutionName || ''),
          bachelorGpa: formattedGpa || prev.bachelorGpa,
        }));
      }

      // Sync SOP Questionnaire data & Quota
      const sd = data.sopData || data.questionnaire;
      if (sd) {
        setFormData((prev) => ({
          ...prev,
          targetModules: Array.isArray(sd.targetModules) && sd.targetModules.length > 0 ? sd.targetModules : prev.targetModules,
          relevantCourses: Array.isArray(sd.relevantCourses) && sd.relevantCourses.length > 0 ? sd.relevantCourses : prev.relevantCourses,
          practicalExperience: sd.practicalExperience ?? sd.practical_experience ?? prev.practicalExperience,
          careerGoals: sd.careerGoals ?? sd.career_goals ?? prev.careerGoals,
          whyGermany: sd.whyGermany ?? sd.why_germany ?? prev.whyGermany,
          bachelorThesis: {
            title: sd.bachelorThesis?.title ?? sd.key_projects ?? prev.bachelorThesis.title,
            methodology: sd.bachelorThesis?.methodology ?? prev.bachelorThesis.methodology,
            outcome: sd.bachelorThesis?.outcome ?? prev.bachelorThesis.outcome,
          },
        }));
      }

      if (data.quota) {
        setMaxGenerations(data.quota.maxGenerations || 3);
        setRemainingAttempts(data.quota.remainingAttempts);
      }
    } catch (err: any) {
      if (!isPolling) {
        setStatusMessage({ text: err.message || 'Failed to load SOP dossier data', type: 'error' });
      }
    } finally {
      if (!isPolling) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // =========================================================================
  // DURABLE BACKGROUND GENERATION POLLING (4s Interval)
  // =========================================================================

  useEffect(() => {
    if (isGenerating) {
      pollTimerRef.current = setInterval(async () => {
        try {
          const res = await apiFetch<any[]>('/student/sop/jobs-status');
          if (Array.isArray(res)) {
            const stillActive = res.some(
              (j) => (j.job_status === 'pending' || j.job_status === 'processing') && !j.document_id
            );

            if (!stillActive) {
              setIsGenerating(false);
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              loadData(true);
              setStatusMessage({
                text: 'All Statement of Purpose documents have been generated and are now pending counsellor verification.',
                type: 'success',
              });
            } else {
              loadData(true);
            }
          }
        } catch (pollErr) {
          console.error('SOP polling error:', pollErr);
        }
      }, 4000);
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isGenerating, loadData]);

  // =========================================================================
  // ACTIONS & SYNC HANDLERS
  // =========================================================================

  // Sync Step 1 Intake Season & Year to student_profiles
  const handleIntakeChange = async (season: string, year: number | string) => {
    setFormData((prev) => ({ ...prev, intakeSeason: season, intakeYear: year }));
    try {
      await apiFetch('/student/sop/sync-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intakeSeason: season,
          intakeYear: Number(year),
        }),
      });
      setStudentProfile((prev: any) => ({
        ...prev,
        intakeSeason: season,
        intakeYear: Number(year),
      }));
    } catch (err: any) {
      console.warn('Failed to auto-sync intake to profile:', err.message);
    }
  };

  // Sync Step 2 Undergraduate Institution to student_education
  const handleInstitutionBlur = async (institution?: string) => {
    const inst = institution !== undefined ? institution : formData.bachelorInstitution;
    try {
      await apiFetch('/student/sop/sync-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institutionName: inst,
        }),
      });
      setEducationProfile((prev) => ({
        id: prev?.id,
        degreeType: prev?.degreeType ?? null,
        fieldOfStudy: prev?.fieldOfStudy ?? null,
        institutionName: inst,
        score: prev?.score ?? null,
        scale: prev?.scale ?? null,
        minPassingScore: prev?.minPassingScore ?? null,
        germanGrade: prev?.germanGrade ?? null,
        gradingSystem: prev?.gradingSystem ?? 'CGPA/10',
      }));
    } catch (err: any) {
      console.warn('Failed to sync institution info:', err.message);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      // Save SOP questionnaire draft
      await apiFetch('/student/sop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          intakeSemester: `${formData.intakeSeason} ${formData.intakeYear}`,
        }),
      });

      // Synchronize profile and institution in student_profiles & student_education
      await apiFetch('/student/sop/sync-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intakeSeason: formData.intakeSeason,
          intakeYear: Number(formData.intakeYear),
          institutionName: formData.bachelorInstitution,
        }),
      });

      setStatusMessage({ text: 'SOP questionnaire & profile details saved and synchronized.', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to save draft', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  // Save GPA with full profile sync
  const handleSaveGpa = async () => {
    try {
      setIsSavingGpa(true);
      const res = await apiFetch<{
        success: boolean;
        germanGrade: number | null;
      }>('/student/sop/sync-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradingSystem: gpaGradingSystem,
          score: parseFloat(gpaScore),
          scale: parseFloat(gpaScale),
          minPassingScore: parseFloat(gpaMinPass),
          institutionName: formData.bachelorInstitution,
        }),
      });

      const gradeVal = res.germanGrade != null ? Number(res.germanGrade).toFixed(2) : (liveBavarianGrade != null ? liveBavarianGrade.toFixed(2) : '');
      const formattedGpa = gradeVal ? `German Scale ~${gradeVal} (${gpaScore}/${gpaScale} CGPA)` : `Score: ${gpaScore}/${gpaScale}`;
      setFormData((prev) => ({ ...prev, bachelorGpa: formattedGpa }));
      setEducationProfile((prev) => ({
        ...prev,
        score: parseFloat(gpaScore),
        scale: parseFloat(gpaScale),
        minPassingScore: parseFloat(gpaMinPass),
        germanGrade: gradeVal ? parseFloat(gradeVal) : null,
        gradingSystem: gpaGradingSystem,
        degreeType: prev?.degreeType || null,
        fieldOfStudy: prev?.fieldOfStudy || null,
        institutionName: formData.bachelorInstitution || prev?.institutionName || null,
      }));

      setShowGpaModal(false);
      setStatusMessage({ text: `German Bavarian GPA synchronized with student profile: ~${gradeVal}`, type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to update GPA', type: 'error' });
    } finally {
      setIsSavingGpa(false);
    }
  };

  // Trigger initial batch generate for ALL shortlisted programmes
  const onInitiateInitialBatch = () => {
    if (remainingAttempts <= 0) {
      setStatusMessage({
        text: `You have reached your limit of ${maxGenerations} generation chances. Please ask your counsellor for additional attempts.`,
        type: 'error',
      });
      return;
    }
    setModalMode('initial-batch');
    setShowConfirmModal(true);
  };

  // Trigger selective re-generation for selected verified/reviewed programmes
  const onInitiateSelectiveRegen = () => {
    const selectedIds = Object.keys(selectedForRegen).filter((id) => selectedForRegen[id]);
    if (selectedIds.length === 0) {
      setStatusMessage({ text: 'Please select at least one programme above to re-generate.', type: 'info' });
      return;
    }
    if (remainingAttempts <= 0) {
      setStatusMessage({
        text: `You have reached your limit of ${maxGenerations} generation chances. Please ask your counsellor for additional attempts.`,
        type: 'error',
      });
      return;
    }
    setModalMode('selective-regen');
    setShowConfirmModal(true);
  };

  const executeGeneration = async () => {
    try {
      setShowConfirmModal(false);
      setIsGenerating(true);
      setStatusMessage({
        text: 'Enqueued SOP generation in background queue. You can safely navigate away.',
        type: 'info',
      });

      // Sync profile & education fields to ensure latest inputs are saved to DB
      try {
        await apiFetch('/student/sop/sync-profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intakeSeason: formData.intakeSeason,
            intakeYear: Number(formData.intakeYear),
            institutionName: formData.bachelorInstitution,
          }),
        });
      } catch {}

      const selectedIds = modalMode === 'selective-regen'
        ? Object.keys(selectedForRegen).filter((id) => selectedForRegen[id])
        : undefined;

      const payload = {
        motivationReasons: formData.whyGermany,
        academicInterests: formData.targetModules.join(', '),
        keyProjects: formData.bachelorThesis.title,
        practicalExperience: formData.practicalExperience,
        whyGermany: formData.whyGermany,
        careerGoals: formData.careerGoals,
        personalContext: formData.additionalNotes,
        bachelorDegree: formData.bachelorDegree,
        bachelorInstitution: formData.bachelorInstitution,
        bachelorGpa: formData.bachelorGpa,
        bachelorThesis: formData.bachelorThesis,
        relevantCourses: formData.relevantCourses,
        targetModules: formData.targetModules,
        additionalNotes: formData.additionalNotes,
        intakeSemester: `${formData.intakeSeason} ${formData.intakeYear}`,
        recommendationIds: selectedIds,
      };

      const res = await apiFetch<{
        success: boolean;
        message: string;
        queuedJobsCount: number;
        remainingAttempts: number;
      }>('/student/sop/generate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setRemainingAttempts(res.remainingAttempts);
      setSelectedForRegen({});

      // Immediately switch to the Generated SOP Documents tab
      setActiveTab('documents');
      loadData(true);
    } catch (err: any) {
      setIsGenerating(false);
      setStatusMessage({ text: err.message || 'Failed to start SOP generation', type: 'error' });
    }
  };

  const toggleRegenSelect = (id: string) => {
    setSelectedForRegen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addTargetModule = () => {
    if (newModule.trim() && !formData.targetModules.includes(newModule.trim())) {
      setFormData((prev) => ({
        ...prev,
        targetModules: [...prev.targetModules, newModule.trim()],
      }));
      setNewModule('');
    }
  };

  const removeTargetModule = (mod: string) => {
    setFormData((prev) => ({
      ...prev,
      targetModules: prev.targetModules.filter((m) => m !== mod),
    }));
  };

  const addRelevantCourse = () => {
    if (newCourse.trim() && !formData.relevantCourses.includes(newCourse.trim())) {
      setFormData((prev) => ({
        ...prev,
        relevantCourses: [...prev.relevantCourses, newCourse.trim()],
      }));
      setNewCourse('');
    }
  };

  const removeRelevantCourse = (crs: string) => {
    setFormData((prev) => ({
      ...prev,
      relevantCourses: prev.relevantCourses.filter((c) => c !== crs),
    }));
  };

  // Live calculation helper for Bavarian formula in modal
  const liveBavarianGrade = React.useMemo(() => {
    const s = parseFloat(gpaScore);
    const m = parseFloat(gpaScale);
    const p = parseFloat(gpaMinPass);
    if (isNaN(s) || isNaN(m) || isNaN(p) || m <= p || s > m || s < p) {
      return null;
    }
    const grade = 1 + 3 * ((m - s) / (m - p));
    return Math.min(4.0, Math.max(1.0, parseFloat(grade.toFixed(2))));
  }, [gpaScore, gpaScale, gpaMinPass]);

  const selectedRegenCount = Object.values(selectedForRegen).filter(Boolean).length;
  const hasGeneratedAny = programmes.some((p) => p.document || p.job);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
        <p className="text-xs font-bold text-gray-500">Loading German SOP Dossier Engine &amp; Shortlist...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Navigation Banner */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative shadow-sm">
        {/* German Tricolor Header Line */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                  title="Back to Document Hub"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
                <FileText className="w-3.5 h-3.5 text-germany-gold" />
                <span>AI SOP Generator</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                German University Standard
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black dark:text-white">
              Statement of Purpose (SOP / Motivationsschreiben)
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 max-w-2xl">
              Course-specific motivation essays demonstrating Modulhandbuch curriculum alignment. Profile data is automatically synchronized, and every generated SOP is reviewed and verified by your assigned EuroBridge counsellor.
            </p>
          </div>

          {/* Top Quota & Actions */}
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              <Layers className="w-3.5 h-3.5 text-germany-red" />
              <span>{remainingAttempts} of {maxGenerations} generation chances left</span>
            </div>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving || isGenerating}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-extrabold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-germany-red" /> : <Save className="w-4 h-4 text-gray-500" />}
              <span>Save &amp; Sync Draft</span>
            </button>
          </div>
        </div>

        {/* Primary Tabs: Form vs Generated Documents */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'form'
                ? 'bg-germany-black text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>SOP Questionnaire (3-Step Wizard)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'documents'
                ? 'bg-germany-black text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-germany-red" />
            <span>Generated SOP Documents ({programmes.length})</span>
            {isGenerating && (
              <span className="w-2 h-2 rounded-full bg-germany-red animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : statusMessage.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
          }`}
        >
          <Info className="w-4 h-4 shrink-0" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: 3-STEP WIZARD FORM */}
      {/* ========================================================================= */}
      {activeTab === 'form' && (
        <div className="space-y-6">
          {/* 3 Step Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 Card */}
            <div
              onClick={() => setSelectedStep('target')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedStep === 'target'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedStep === 'target'
                    ? 'bg-red-50 text-germany-red dark:bg-red-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 1</span>
                  {programmes.length > 0 && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">
                  Target Universities &amp; Shortlist
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {programmes.length > 0
                    ? `${programmes.length} shortlisted programme${programmes.length === 1 ? '' : 's'}`
                    : 'Shortlist pending'}
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div
              onClick={() => setSelectedStep('academic')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedStep === 'academic'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedStep === 'academic'
                    ? 'bg-amber-50 text-germany-gold dark:bg-amber-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 2</span>
                  {formData.bachelorDegree && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">
                  Academics, GPA &amp; Thesis
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.bachelorGpa || 'German GPA and Thesis'}
                </p>
              </div>
            </div>

            {/* Step 3 Card */}
            <div
              onClick={() => setSelectedStep('career')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedStep === 'career'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedStep === 'career'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 3</span>
                  {formData.careerGoals && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">
                  Career, Roadmap &amp; Generate
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  German industry goals &amp; batch synthesis
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
            {/* STEP 1: TARGET UNIVERSITIES & SHORTLISTED PROGRAMMES */}
            {selectedStep === 'target' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                      Step 1: Shortlisted University Programmes (Batch SOP Generation)
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Your Statement of Purpose will be generated independently for each shortlisted university below. Each document is customized with official DAAD curriculum and Modulhandbuch citations.
                    </p>
                  </div>
                  {studentProfile && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                      Profile Synced
                    </span>
                  )}
                </div>

                {/* Shortlisted Programmes List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-germany-red" />
                      <span>Shortlisted Programmes in Your Application Dossier ({programmes.length})</span>
                    </label>
                    <span className="text-[11px] font-bold text-gray-400">
                      Synced from your locked shortlist
                    </span>
                  </div>

                  {programmes.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 text-center space-y-2">
                      <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
                      <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                        No Shortlisted Programmes Found
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 max-w-md mx-auto">
                        Please shortlist your target German universities from the Course Finder or ask your counsellor to lock your shortlist.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {programmes.map((prog, idx) => {
                        const isVerified = prog.document?.status === 'VERIFIED';
                        const isPending = prog.document?.status === 'PENDING';
                        const isRejected = prog.document?.status === 'REJECTED';
                        const isJobRunning = (prog.job?.status === 'pending' || prog.job?.status === 'processing') && !prog.document;
                        const isFailed = prog.job?.status === 'failed' && !prog.document;

                        return (
                          <div
                            key={prog.id}
                            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40 flex flex-col justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                                  Choice #{idx + 1} • {prog.degree || 'Master'}
                                </span>
                                {isJobRunning ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Synthesizing...
                                  </span>
                                ) : isVerified ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Approved
                                  </span>
                                ) : isPending ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Under Review
                                  </span>
                                ) : isRejected ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                                    Revision Needed
                                  </span>
                                ) : isFailed ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                                    Failed
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    Ready to Generate
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-black text-gray-900 dark:text-gray-100 line-clamp-1">
                                {prog.universityName}
                              </h4>
                              <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-1 mt-0.5">
                                {prog.programName}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                              <span>{prog.location || 'Germany'}</span>
                              {prog.deadline && <span>Deadline: {prog.deadline}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Target Intake: 2 Synchronized Dropdowns (Season & Year) exactly matching Student Profile */}
                <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-[#0E121A] border border-gray-200 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-800 dark:text-gray-200">
                      Target Intake &amp; Timeline (Synced with Student Profile)
                    </label>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Two-Way Sync with Database
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                        Target Intake Season *
                      </label>
                      <select
                        value={formData.intakeSeason}
                        onChange={(e) => handleIntakeChange(e.target.value, formData.intakeYear)}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-1 focus:ring-germany-red"
                      >
                        <option value="WINTER">WINTER (Oct/Nov)</option>
                        <option value="SUMMER">SUMMER (Mar/Apr)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                        Target Year *
                      </label>
                      <select
                        value={formData.intakeYear}
                        onChange={(e) => handleIntakeChange(formData.intakeSeason, Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-1 focus:ring-germany-red"
                      >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modulhandbuch Elective Subjects */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                        Modulhandbuch Elective Focus Areas
                      </label>
                      <span className="text-[11px] text-gray-500">
                        Optional: Highlight 2–4 advanced elective modules or research specializations you want emphasized.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newModule}
                      onChange={(e) => setNewModule(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTargetModule())}
                      placeholder="e.g. High-Performance Distributed Computing"
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addTargetModule}
                      className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-extrabold rounded-xl cursor-pointer"
                    >
                      Add Module
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.targetModules.map((mod) => (
                      <span
                        key={mod}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      >
                        {mod}
                        <button
                          type="button"
                          onClick={() => removeTargetModule(mod)}
                          className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setSelectedStep('academic')}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Academics &amp; GPA</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ACADEMIC FOUNDATIONS & GPA SYNC */}
            {selectedStep === 'academic' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                      Step 2: Academic Foundations &amp; Research Rigor
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Your undergraduate degree and German Bavarian GPA are automatically synchronized with your student profile. Any changes made here are saved directly to your profile.
                    </p>
                  </div>
                  {educationProfile && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                      Profile Synced
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Bachelor Degree &amp; Major
                    </label>
                    <input
                      type="text"
                      value={formData.bachelorDegree || ''}
                      onChange={(e) => setFormData({ ...formData, bachelorDegree: e.target.value })}
                      placeholder="e.g. B.Tech in Computer Science & Engineering"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      College / Undergraduate Institution (Synced with Profile)
                    </label>
                    <input
                      type="text"
                      value={formData.bachelorInstitution || ''}
                      onChange={(e) => setFormData({ ...formData, bachelorInstitution: e.target.value })}
                      onBlur={() => handleInstitutionBlur()}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* German GPA Sync Card */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-germany-red" />
                      <span>German Bavarian GPA: {formData.bachelorGpa || 'Pending Calculation'}</span>
                    </span>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                      Standardized German conversion used by uni-assist and faculty selection committees.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGpaModal(true)}
                    className="px-3.5 py-2 bg-white dark:bg-[#111622] border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-xl text-xs font-black hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                  >
                    Edit / Recalculate GPA
                  </button>
                </div>

                {/* Bachelor Thesis Card */}
                <div className="p-4 bg-gray-50/80 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
                  <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-germany-red" />
                    <span>Bachelor Thesis / Capstone Project</span>
                  </span>

                  <div>
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                      Thesis Title
                    </label>
                    <input
                      type="text"
                      value={formData.bachelorThesis?.title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bachelorThesis: { ...formData.bachelorThesis, title: e.target.value },
                        })
                      }
                      placeholder="Title of your undergraduate capstone/thesis"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                        Methodology &amp; Empirical Frameworks
                      </label>
                      <input
                        type="text"
                        value={formData.bachelorThesis?.methodology || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bachelorThesis: { ...formData.bachelorThesis, methodology: e.target.value },
                          })
                        }
                        placeholder="e.g. Prototyping, mathematical modeling, micro-benchmarks"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                        Quantitative Outcome / Results
                      </label>
                      <input
                        type="text"
                        value={formData.bachelorThesis?.outcome || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bachelorThesis: { ...formData.bachelorThesis, outcome: e.target.value },
                          })
                        }
                        placeholder="e.g. 34% reduction in query latency under load"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Foundational Coursework */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                    Core Coursework (Prüfungsordnung Prerequisite Proof)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRelevantCourse())}
                      placeholder="e.g. Theoretical Computer Science or Advanced Calculus"
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addRelevantCourse}
                      className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-extrabold rounded-xl cursor-pointer"
                    >
                      Add Course
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.relevantCourses.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() => removeRelevantCourse(c)}
                          className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setSelectedStep('target')}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
                  >
                    Back to Target Uni
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleInstitutionBlur();
                      setSelectedStep('career');
                    }}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Career &amp; Generate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CAREER, ROADMAP & BATCH GENERATION */}
            {selectedStep === 'career' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 3: Industry Experience &amp; German Career Roadmap
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Connect your Master&apos;s studies to realistic R&amp;D engineering or academic research in Germany.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Practical Experience / Internships / Labs
                  </label>
                  <textarea
                    rows={3}
                    value={formData.practicalExperience || ''}
                    onChange={(e) => setFormData({ ...formData, practicalExperience: e.target.value })}
                    placeholder="Describe relevant technical internships, projects, or lab assistantships..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Post-Study Career Roadmap in Germany
                  </label>
                  <textarea
                    rows={3}
                    value={formData.careerGoals || ''}
                    onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                    placeholder="e.g. Lead R&D Systems Engineer in the German industrial IoT or automotive sector..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Why Germany &amp; Academic Intent
                  </label>
                  <textarea
                    rows={2}
                    value={formData.whyGermany || ''}
                    onChange={(e) => setFormData({ ...formData, whyGermany: e.target.value })}
                    placeholder="Why you chose Germany for higher education..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Bottom Trigger: Big Batch Generate Button */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStep('academic')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer text-center"
                  >
                    Back to Academics
                  </button>

                  <button
                    type="button"
                    onClick={onInitiateInitialBatch}
                    disabled={isGenerating || remainingAttempts <= 0 || programmes.length === 0}
                    className="w-full sm:w-auto px-8 py-3.5 neu-btn-primary flex items-center justify-center gap-2.5 text-xs font-black rounded-xl cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                        <span>Synthesizing SOPs in Background...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-germany-gold" />
                        <span>
                          {remainingAttempts <= 0
                            ? 'Limit Reached (0 left)'
                            : `Generate SOPs for All Shortlisted Programmes (${programmes.length})`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GENERATED SOP DOCUMENTS & RE-GENERATION */}
      {/* ========================================================================= */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Active Generation Alert (Identical to CV Generator) */}
          {isGenerating && (
            <div className="neu-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 rounded-2xl flex items-start gap-3.5 shadow-sm">
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  Your SOPs are being generated in the background
                </h3>
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mt-1">
                  Our durable background engine is formulating your motivation essays, researching official DAAD Modulhandbuch curricula, and compiling university-standard PDFs.
                </p>
                <p className="text-[11px] font-extrabold text-blue-600/90 dark:text-blue-400/90 mt-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>You can safely close your browser or navigate away. Your documents are queued and will persist to completion on our servers.</span>
                </p>
              </div>
            </div>
          )}

          {/* Documents Header & Quota Notice */}
          <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-germany-red" />
                <span>Shortlisted Programme SOPs ({programmes.length})</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Every generated SOP is submitted to your assigned counsellor. Official sealed PDFs are unlocked upon counsellor approval.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Edit Questionnaire Inputs</span>
              </button>
            </div>
          </div>

          {/* Programmes & SOP Cards List */}
          {programmes.length === 0 ? (
            <div className="neu-card p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">No Shortlisted Programmes</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No shortlisted programmes found in your dossier. Add programmes to your shortlist first to generate tailored SOPs.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {programmes.map((prog, idx) => {
                const doc = prog.document;
                const job = prog.job;
                const isVerified = doc?.status === 'VERIFIED';
                const isPending = doc?.status === 'PENDING';
                const isRejected = doc?.status === 'REJECTED';
                const isJobRunning = (job?.status === 'pending' || job?.status === 'processing') && !doc;
                const isFailed = job?.status === 'failed' && !doc;
                const isSelected = Boolean(selectedForRegen[prog.id]);

                // Re-generation is allowed once initial document or job exists, and counsellor has reviewed or generated
                const canSelectForRegen = Boolean(doc || (job && job.status === 'completed')) && !isJobRunning;

                return (
                  <div
                    key={prog.id}
                    className={`neu-card p-5 md:p-6 bg-white dark:bg-[#111622] border rounded-3xl transition-all space-y-4 ${
                      isSelected
                        ? 'border-germany-red ring-2 ring-germany-red/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            Choice #{idx + 1} • {prog.degree || 'Master'}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {prog.location || 'Germany'}
                          </span>
                        </div>
                        <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-gray-100">
                          {prog.universityName}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-bold mt-0.5">
                          {prog.programName}
                        </p>
                      </div>

                      {/* Selectable Checkbox for Re-generation */}
                      {canSelectForRegen && (
                        <button
                          type="button"
                          onClick={() => toggleRegenSelect(prog.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-red-50 dark:bg-red-950/40 border-germany-red text-germany-red'
                              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-germany-red" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                          <span>{isSelected ? 'Selected for Re-gen' : 'Select to Re-generate'}</span>
                        </button>
                      )}
                    </div>

                    {/* Document Status Banner */}
                    {isJobRunning ? (
                      <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                        <div>
                          <h4 className="text-xs font-black text-blue-900 dark:text-blue-200">
                            Synthesizing Tailored SOP...
                          </h4>
                          <p className="text-[11px] text-blue-700 dark:text-blue-400">
                            Researching DAAD curriculum and compiling university-standard A4 PDF.
                          </p>
                        </div>
                      </div>
                    ) : isVerified ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                                Verified &amp; Approved by Counsellor
                              </h4>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                                Ready for Submission
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                              Officially sealed and certified for uni-assist and university admissions.
                            </p>
                          </div>
                        </div>

                        {doc?.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>View &amp; Download PDF</span>
                          </a>
                        )}
                      </div>
                    ) : isPending ? (
                      <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-amber-900 dark:text-amber-200">
                              SOP Generated • Pending Counsellor Review
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                              In Review
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                            Your SOP has been generated and queued for counsellor verification. To maintain strict German quality standards, official downloads are released upon counsellor sign-off.
                          </p>
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                            Generated: {doc?.uploadedAt ? new Date(doc.uploadedAt).toLocaleString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    ) : isRejected ? (
                      <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black text-red-900 dark:text-red-200">
                            Revision Requested by Counsellor
                          </h4>
                          <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">
                            Feedback: {doc?.rejectionNote || 'Please review your inputs and re-generate this SOP.'}
                          </p>
                        </div>
                      </div>
                    ) : isFailed ? (
                      <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-xs font-black text-red-900 dark:text-red-200">
                            Generation Failed
                          </h4>
                          <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">
                            {job?.errorMessage || 'An error occurred during background generation. Please re-generate.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 text-gray-500 text-xs flex items-center justify-between">
                        <span>Not yet generated for this programme.</span>
                        <span className="text-[11px] font-bold text-gray-400">Click &quot;Generate for All&quot; in the form tab</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sticky Selective Re-generation Bar (Chances 2 & 3) */}
          {hasGeneratedAny && (
            <div className="neu-card p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-germany-gold" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Selective Re-Generation (Chances 2 &amp; 3)
                  </h4>
                </div>
                <p className="text-xs text-gray-300">
                  {selectedRegenCount > 0
                    ? `${selectedRegenCount} programme(s) selected for re-generation. Re-generating will clear previous documents and synthesize fresh ones.`
                    : 'Check the boxes next to verified or reviewed SOPs above to selectively re-generate them.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onInitiateSelectiveRegen}
                disabled={isGenerating || remainingAttempts <= 0 || selectedRegenCount === 0}
                className="w-full sm:w-auto px-6 py-3 bg-germany-red hover:bg-[#D62839] disabled:opacity-50 text-white text-xs font-black rounded-xl cursor-pointer shadow-md transition-colors shrink-0 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-white" />
                )}
                <span>
                  {selectedRegenCount === 0
                    ? 'Select Programmes to Re-generate'
                    : `Re-generate Selected (${selectedRegenCount}) (${remainingAttempts} left)`}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#111622] rounded-3xl border border-gray-300 dark:border-gray-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Confirm SOP Generation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {modalMode === 'initial-batch'
                    ? `Synthesizing SOPs for all ${programmes.length} shortlisted programmes`
                    : `Re-generating ${selectedRegenCount} selected programme SOP(s)`}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
              <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                Are you sure you want to proceed?
              </p>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                You have <span className="font-black text-amber-950 dark:text-white underline decoration-amber-500">{remainingAttempts} remaining generation chance{remainingAttempts === 1 ? '' : 's'}</span> (out of {maxGenerations} total).
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                This will enqueue background jobs for each programme. Once generated, each document will be submitted to your counsellor for review.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeGeneration}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Proceed &amp; Generate ({remainingAttempts} left)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bavarian GPA Recalculate Modal (Matches Student Profile Education Section) */}
      {showGpaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#111622] rounded-3xl border border-gray-300 dark:border-gray-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-germany-red" />
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Update &amp; Recalculate German GPA
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGpaModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Synchronises your official German Bavarian grade [1 + 3 &times; (Nmax - Nd) / (Nmax - Nmin)] with your student profile and SOP dossier in the database.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Grading System *
                </label>
                <select
                  value={gpaGradingSystem}
                  onChange={(e) => setGpaGradingSystem(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold"
                >
                  <option value="CGPA/10">CGPA / 10</option>
                  <option value="CGPA/4">CGPA / 4</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Grade">Grade</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Your Obtained Score / CGPA *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={gpaScore}
                  onChange={(e) => setGpaScore(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Scale Max (Nmax) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value)}
                    placeholder="e.g. 10 or 100"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Min Passing Grade (Nmin) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpaMinPass}
                    onChange={(e) => setGpaMinPass(e.target.value)}
                    placeholder="e.g. 4 or 40"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Live Bavarian Grade Preview */}
              {liveBavarianGrade !== null && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Calculated German Bavarian Grade:
                  </span>
                  <span className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                    ~{liveBavarianGrade}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowGpaModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGpa}
                disabled={isSavingGpa || liveBavarianGrade === null}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSavingGpa ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save &amp; Sync to Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
