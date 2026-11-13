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
  Calculator,
  X,
  ShieldCheck,
  CheckSquare,
  Square,
} from 'lucide-react';
import { DEGREE_TYPE_OPTIONS, FIELD_OF_STUDY_OPTIONS } from '@/lib/education-constants';
import { SopIntakeForm } from './sop/SopIntakeForm';
import { SopDocumentsHub } from './sop/SopDocumentsHub';
import { SopConfirmModal } from './sop/SopConfirmModal';
import { SopGpaModal } from './sop/SopGpaModal';
import { SopHeaderBanner } from './sop/SopHeaderBanner';

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
      <SopHeaderBanner
        onBack={onBack}
        remainingAttempts={remainingAttempts}
        maxGenerations={maxGenerations}
        isSaving={isSaving}
        isGenerating={isGenerating}
        handleSaveDraft={handleSaveDraft}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        programmesCount={programmes.length}
        statusMessage={statusMessage}
      />


      {/* ========================================================================= */}
      {/* TAB 1: 3-STEP WIZARD FORM */}
      {/* ========================================================================= */}
      {/* TAB 1: 3-STEP WIZARD FORM */}
      {activeTab === 'form' && (
        <SopIntakeForm
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
          programmes={programmes}
          studentProfile={studentProfile}
          educationProfile={educationProfile}
          formData={formData}
          setFormData={setFormData}
          handleIntakeChange={handleIntakeChange}
          newModule={newModule}
          setNewModule={setNewModule}
          addTargetModule={addTargetModule}
          removeTargetModule={removeTargetModule}
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          addRelevantCourse={addRelevantCourse}
          removeRelevantCourse={removeRelevantCourse}
          isGenerating={isGenerating}
          isSaving={isSaving}
          remainingAttempts={remainingAttempts}
          hasGeneratedAny={hasGeneratedAny}
          handleInstitutionBlur={handleInstitutionBlur}
          onInitiateInitialBatch={onInitiateInitialBatch}
          onSaveDraft={handleSaveDraft}
          onOpenGpaModal={() => setShowGpaModal(true)}
        />
      )}

      {/* TAB 2: GENERATED SOP DOCUMENTS & RE-GENERATION */}
      {activeTab === 'documents' && (
        <SopDocumentsHub
          programmes={programmes}
          selectedForRegen={selectedForRegen}
          toggleRegenSelect={toggleRegenSelect}
          selectedRegenCount={selectedRegenCount}
          remainingAttempts={remainingAttempts}
          isGenerating={isGenerating}
          hasGeneratedAny={hasGeneratedAny}
          setActiveTab={setActiveTab}
          onInitiateSelectiveRegen={onInitiateSelectiveRegen}
        />
      )}

      {/* Confirmation Modal */}
      <SopConfirmModal
        showConfirmModal={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeGeneration}
        modalMode={modalMode}
        programmes={programmes}
        selectedRegenCount={selectedRegenCount}
        remainingAttempts={remainingAttempts}
        maxGenerations={maxGenerations}
      />

      {/* Bavarian GPA Recalculate Modal */}
      <SopGpaModal
        showGpaModal={showGpaModal}
        onClose={() => setShowGpaModal(false)}
        gpaGradingSystem={gpaGradingSystem}
        setGpaGradingSystem={setGpaGradingSystem}
        gpaScore={gpaScore}
        setGpaScore={setGpaScore}
        gpaScale={gpaScale}
        setGpaScale={setGpaScale}
        gpaMinPass={gpaMinPass}
        setGpaMinPass={setGpaMinPass}
        liveBavarianGrade={liveBavarianGrade}
        isSavingGpa={isSavingGpa}
        onSaveGpa={handleSaveGpa}
      />
    </div>
  );
}
