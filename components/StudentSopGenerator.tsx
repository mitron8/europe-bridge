"use client";

import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Save,
  ArrowLeft,
  ArrowRight,
  Copy,
  Download,
  BookOpen,
  Send,
  Layers,
  GraduationCap,
  Briefcase,
  Target,
  Info,
  Check,
  RefreshCw,
  Edit3,
  ExternalLink,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface SopGeneratorProps {
  onBack?: () => void;
}

interface SopDataState {
  targetUniversity: string;
  targetProgram: string;
  intakeSemester: string;
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
  additionalNotes: string;
  generatedSop: string;
  readinessScore: {
    overallScore: number;
    moduleAlignmentScore: number;
    moduleAlignmentFeedback: string;
    academicRigorScore: number;
    academicRigorFeedback: string;
    germanToneScore: number;
    germanToneFeedback: string;
    fluffWarnings: string[];
    strengths: string[];
    improvementTips: string[];
  } | null;
}

type IntakeSection = 'target' | 'academic' | 'career';

export function StudentSopGenerator({ onBack }: SopGeneratorProps) {
  // Screen mode: 'intake' (Screen 1 & 2) vs 'result' (Screen 3: Content & Export)
  const [screenMode, setScreenMode] = useState<'intake' | 'result'>('intake');
  const [selectedSection, setSelectedSection] = useState<IntakeSection>('target');

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newModule, setNewModule] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [maxGenerations, setMaxGenerations] = useState(3);
  const [extraAttemptsGranted, setExtraAttemptsGranted] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState<SopDataState>({
    targetUniversity: 'Technical University of Munich (TUM)',
    targetProgram: 'M.Sc. in Informatics',
    intakeSemester: 'Winter Semester 2026/27',
    targetModules: ['Advanced Distributed Systems', 'Applied Machine Learning', 'Cloud Computing Architecture'],
    bachelorDegree: 'B.Tech in Computer Science & Engineering',
    bachelorInstitution: 'Undergraduate University',
    bachelorGpa: 'German Scale ~1.6 / 8.8 CGPA',
    bachelorThesis: {
      title: 'Algorithmic Optimization in Distributed Query Processing',
      methodology: 'Experimental prototyping and benchmark evaluation under high concurrency',
      outcome: 'Achieved a 34% reduction in query latency and validated reproducibility',
    },
    relevantCourses: ['Data Structures & Algorithms', 'Linear Algebra & Statistics', 'Operating Systems', 'Database Systems'],
    practicalExperience: 'Software engineering internship focused on microservice deployment and API performance optimization.',
    careerGoals: 'To work in German R&D engineering, contributing to cutting-edge industrial IoT and distributed systems.',
    additionalNotes: '',
    generatedSop: '',
    readinessScore: null,
  });

  const [documentStatus, setDocumentStatus] = useState<any>(null);

  useEffect(() => {
    fetchSopData();
  }, []);

  const fetchSopData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/student/sop`, { credentials: 'include' });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Failed to load SOP dossier data (${res.status})`);
      }
      const data = await res.json();
      if (data.document) setDocumentStatus(data.document);
      if (data.sopData) {
        if (typeof data.sopData.generationCount === 'number') {
          setGenerationCount(data.sopData.generationCount);
          setMaxGenerations(data.sopData.maxGenerations || 3);
          setExtraAttemptsGranted(Boolean(data.sopData.extraAttemptsGranted));
          setRemainingAttempts(data.sopData.remainingAttempts ?? Math.max(0, (data.sopData.maxGenerations || 3) - data.sopData.generationCount));
        }
        setFormData((prev) => ({
          targetUniversity: data.sopData.targetUniversity ?? prev.targetUniversity ?? '',
          targetProgram: data.sopData.targetProgram ?? prev.targetProgram ?? '',
          intakeSemester: data.sopData.intakeSemester ?? prev.intakeSemester ?? '',
          targetModules: Array.isArray(data.sopData.targetModules) && data.sopData.targetModules.length > 0
            ? data.sopData.targetModules
            : prev.targetModules,
          bachelorDegree: data.sopData.bachelorDegree ?? prev.bachelorDegree ?? '',
          bachelorInstitution: data.sopData.bachelorInstitution ?? prev.bachelorInstitution ?? '',
          bachelorGpa: data.sopData.bachelorGpa ?? prev.bachelorGpa ?? '',
          bachelorThesis: {
            title: data.sopData.bachelorThesis?.title ?? prev.bachelorThesis?.title ?? '',
            methodology: data.sopData.bachelorThesis?.methodology ?? prev.bachelorThesis?.methodology ?? '',
            outcome: data.sopData.bachelorThesis?.outcome ?? prev.bachelorThesis?.outcome ?? '',
          },
          relevantCourses: Array.isArray(data.sopData.relevantCourses) && data.sopData.relevantCourses.length > 0
            ? data.sopData.relevantCourses
            : prev.relevantCourses,
          practicalExperience: data.sopData.practicalExperience ?? prev.practicalExperience ?? '',
          careerGoals: data.sopData.careerGoals ?? prev.careerGoals ?? '',
          additionalNotes: data.sopData.additionalNotes ?? prev.additionalNotes ?? '',
          generatedSop: data.sopData.generatedSop ?? prev.generatedSop ?? '',
          readinessScore: data.sopData.readinessScore ?? prev.readinessScore,
        }));

        // If user already had a generated SOP draft, start on the result screen
        if (data.sopData.generatedSop && data.sopData.generatedSop.trim().length > 50) {
          setScreenMode('result');
        }
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`${API_URL}/student/sop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          draftContent: formData.generatedSop,
        }),
      });
      if (!res.ok) throw new Error('Failed to save draft');
      setStatusMessage({ text: 'Draft saved successfully.', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const onInitiateGenerate = () => {
    if (remainingAttempts <= 0) {
      setStatusMessage({
        text: `You have reached your limit of ${maxGenerations} generations. `,
        type: 'error',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setStatusMessage({ text: 'Synthesizing German academic alignment & Modulhandbuch mapping...', type: 'info' });

      const res = await fetch(`${API_URL}/student/sop/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Generation failed');
      }

      const result = await res.json();
      setFormData((prev) => ({
        ...prev,
        generatedSop: result.sopContent,
        readinessScore: result.readinessScore,
      }));
      if (typeof result.remainingAttempts === 'number') {
        setRemainingAttempts(result.remainingAttempts);
        setGenerationCount(result.generationCount);
        setMaxGenerations(result.maxGenerations);
      }

      // Switch to the Result screen!
      setScreenMode('result');
      setStatusMessage({ text: 'German Statement of Purpose generated successfully!', type: 'success' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!formData.generatedSop.trim()) {
      setStatusMessage({ text: 'Please generate or write your SOP before submitting.', type: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/student/sop/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          documentContent: formData.generatedSop,
          filename: `SOP_${formData.targetProgram.replace(/[^a-zA-Z0-9]/g, '_')}.txt`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      setDocumentStatus(data.document);
      setStatusMessage({ text: 'SOP successfully submitted to counsellor verification queue!', type: 'success' });
      setSubmissionFeedback('Successfully submitted to counsellor verification queue!');
      setTimeout(() => setSubmissionFeedback(null), 8000);
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!formData.generatedSop) return;
    navigator.clipboard.writeText(formData.generatedSop);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!formData.generatedSop) return;
    const blob = new Blob([formData.generatedSop], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOP_${formData.targetUniversity.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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

  const wordCount = formData.generatedSop ? formData.generatedSop.trim().split(/\s+/).length : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
        <p className="text-xs font-bold text-gray-500">Loading German SOP Dossier Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              title="Return to Document Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100">
                Statement of Purpose (SOP / Motivationsschreiben)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                German University Standard
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Course-specific motivation essay demonstrating credit module alignment, research methodology, and Prüfungsordnung intent.
            </p>
          </div>
        </div>

        {/* Remaining Quota Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
          <Layers className="w-3.5 h-3.5 text-germany-red" />
          <span>{remainingAttempts} of {maxGenerations} generations remaining</span>
        </div>

        {/* Mode Switcher Pills (If draft already exists) */}
        <div className="flex items-center gap-2">
          {formData.generatedSop ? (
            <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setScreenMode('intake')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  screenMode === 'intake'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Form Inputs</span>
              </button>
              <button
                onClick={() => setScreenMode('result')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  screenMode === 'result'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-germany-red" />
                <span>Generated Draft &amp; Export</span>
              </button>
            </div>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              Draft Preparation
            </span>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
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
      {/* SCREEN 1 & 2: INTAKE WIZARD (Target Uni, Academics, Career) */}
      {/* ========================================================================= */}
      {screenMode === 'intake' && (
        <div className="space-y-6">
          {/* 3 Step Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1: Target Uni */}
            <div
              onClick={() => setSelectedSection('target')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'target'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'target'
                    ? 'bg-red-50 text-germany-red dark:bg-red-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 1</span>
                  {formData.targetUniversity && formData.targetProgram && (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Target Uni &amp; Modules</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.targetUniversity || 'University and course'}
                </p>
              </div>
            </div>

            {/* Card 2: Academics */}
            <div
              onClick={() => setSelectedSection('academic')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'academic'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'academic'
                    ? 'bg-amber-50 text-germany-gold dark:bg-amber-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 2</span>
                  {formData.bachelorDegree && formData.bachelorThesis?.title && (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Academics &amp; Thesis</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.bachelorDegree || 'Undergraduate profile'}
                </p>
              </div>
            </div>

            {/* Card 3: Career */}
            <div
              onClick={() => setSelectedSection('career')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'career'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'career'
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
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Career &amp; Roadmap</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  German industry and research goals
                </p>
              </div>
            </div>
          </div>

          {/* Form Container for the Selected Option */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
            {/* OPTION 1: TARGET UNI & MODULES */}
            {selectedSection === 'target' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 1: Target University &amp; Modulhandbuch Alignment
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    German admission boards require you to prove alignment with their specific curriculum.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Target German University
                    </label>
                    <input
                      type="text"
                      value={formData.targetUniversity || ''}
                      onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                      placeholder="e.g. Technical University of Munich (TUM)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Target Master&apos;s Degree Program
                    </label>
                    <input
                      type="text"
                      value={formData.targetProgram || ''}
                      onChange={(e) => setFormData({ ...formData, targetProgram: e.target.value })}
                      placeholder="e.g. M.Sc. Data Engineering and Analytics"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Target Intake Semester
                  </label>
                  <input
                    type="text"
                    value={formData.intakeSemester || ''}
                    onChange={(e) => setFormData({ ...formData, intakeSemester: e.target.value })}
                    placeholder="e.g. Winter Semester 2026/27"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Modulhandbuch Elective Subjects */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                        Modulhandbuch Elective Courses (German Syllabus Alignment)
                      </label>
                      <span className="text-[11px] text-gray-500">
                        Cite 2–4 advanced elective modules from the target university&apos;s course handbook.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-300">
                    💡 <strong>Why this matters:</strong> German professors evaluate your SOP to see if you have read their official Modulhandbuch. Listing exact course names proves serious intent.
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
                          onClick={() => removeTargetModule(mod)}
                          className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation for Target Uni */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setSelectedSection('academic')}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Academics</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* OPTION 2: ACADEMIC FOUNDATIONS & THESIS */}
            {selectedSection === 'academic' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 2: Academic Foundations &amp; Research Rigor
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Demonstrate prerequisite credit compliance and undergraduate thesis methodology.
                  </p>
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      GPA / Class Standing / German Grade
                    </label>
                    <input
                      type="text"
                      value={formData.bachelorGpa || ''}
                      onChange={(e) => setFormData({ ...formData, bachelorGpa: e.target.value })}
                      placeholder="e.g. 8.8 CGPA / 1.6 German scale"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
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
                          onClick={() => removeRelevantCourse(c)}
                          className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation for Academics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setSelectedSection('target')}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
                  >
                    Back to Target Uni
                  </button>
                  <button
                    onClick={() => setSelectedSection('career')}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Career</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* OPTION 3: CAREER & INDUSTRY ROADMAP */}
            {selectedSection === 'career' && (
              <div className="space-y-5">
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
                    Special Focus or Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.additionalNotes || ''}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="e.g. Emphasize mathematics background and thesis alignment"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Bottom Trigger: Big Generate AI Button */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedSection('academic')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer text-center"
                  >
                    Back to Academics
                  </button>

                  <button
                    onClick={onInitiateGenerate}
                    disabled={isGenerating || remainingAttempts <= 0}
                    className="w-full sm:w-auto px-8 py-3.5 neu-btn-primary flex items-center justify-center gap-2.5 text-xs font-black rounded-xl cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                        <span>Synthesizing German Academic SOP...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-germany-gold" />
                        <span>
                          {remainingAttempts <= 0
                            ? 'Limit Reached (0 left)'
                            : `Generate German SOP (${remainingAttempts} left)`}
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
      {/* SCREEN 3: GENERATED CONTENT, READINESS AUDIT, DOWNLOAD & COUNSELLOR SUBMIT */}
      {/* ========================================================================= */}
      {screenMode === 'result' && (
        <div className="space-y-6">
          {/* Top Bar on Result Screen: Status, Edit Button, and Actions */}
          <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Statement of Purpose Ready
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {wordCount} words • Aligned with {formData.targetUniversity}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                onClick={() => setScreenMode('intake')}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Form Inputs</span>
              </button>

              <button
                onClick={onInitiateGenerate}
                disabled={isGenerating || remainingAttempts <= 0}
                className="px-3.5 py-2 rounded-xl bg-germany-red hover:bg-[#D62839] disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                title={remainingAttempts <= 0 ? 'All generations used.' : `${remainingAttempts} generation attempts remaining`}
              >
                {isGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>
                  {remainingAttempts <= 0 ? 'Quota Reached (0 left)' : `Re-draft with AI (${remainingAttempts} left)`}
                </span>
              </button>

              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download (.txt)</span>
              </button>

              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
              </button>
            </div>
          </div>

          {/* German University Readiness Scorecard */}
          {formData.readinessScore && (
            <div className="neu-card p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-base shadow-xs">
                    {formData.readinessScore.overallScore}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                      German University Admission Readiness Score
                    </h3>
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      Evaluated against German Faculty Prüfungsordnung &amp; Modulhandbuch Criteria
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                  Admission Ready (Tier 1)
                </span>
              </div>

              {/* 3 Pillar Score Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-center">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="text-[11px] text-gray-400 block font-bold">Modulhandbuch Alignment</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {formData.readinessScore.moduleAlignmentScore}%
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="text-[11px] text-gray-400 block font-bold">Academic Rigor &amp; Thesis</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {formData.readinessScore.academicRigorScore}%
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="text-[11px] text-gray-400 block font-bold">Anti-Fluff Academic Tone</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {formData.readinessScore.germanToneScore}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Full-Width Document Draft View & Live Editor */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-germany-red" />
                <span>Motivationsschreiben Text</span>
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                You can fine-tune or edit any sentence below before submission
              </span>
            </div>

            <textarea
              rows={22}
              value={formData.generatedSop || ''}
              onChange={(e) => setFormData({ ...formData, generatedSop: e.target.value })}
              className="w-full p-5 rounded-2xl font-mono text-xs leading-relaxed bg-gray-50/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 resize-y focus:outline-none focus:ring-1 focus:ring-germany-red"
            />

            {/* Bottom Actions: Submit for Counsellor Verification */}
            <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-black">
                  {documentStatus?.status === 'VERIFIED' ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Approved &amp; Verified by EuropeBridge Counsellor
                    </span>
                  ) : documentStatus?.status === 'PENDING' ? (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Submitted &amp; Pending Counsellor Verification
                    </span>
                  ) : documentStatus?.status === 'REJECTED' ? (
                    <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Revision Requested: {documentStatus.rejectionNote || 'Update and re-submit'}
                    </span>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300">
                      Submit this draft to your assigned EuropeBridge counsellor for faculty review and verification.
                    </span>
                  )}
                </div>
                {documentStatus?.uploadedAt && (
                  <p className="text-[11px] font-bold text-gray-400">
                    Last submitted: {new Date(documentStatus.uploadedAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                {submissionFeedback && (
                  <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{submissionFeedback}</span>
                  </div>
                )}

                <button
                  onClick={handleSubmitForReview}
                  disabled={isSubmitting || !formData.generatedSop}
                  className={`px-6 py-3 text-white text-xs font-black rounded-none flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-colors ${
                    documentStatus?.status === 'PENDING'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : documentStatus?.status === 'PENDING' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {documentStatus?.status === 'PENDING'
                      ? 'Re-submit / Update Draft'
                      : 'Submit to Counsellor for Verification'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Counsellor 1-on-1 Consultation Upsell Banner */}
          <div className="p-5 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xs font-black text-amber-900 dark:text-amber-200">
                Want a 1-on-1 expert review before submitting to German universities?
              </h3>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 max-w-xl">
                Our counsellors review your official transcript ECTS credit breakdown against your target university&apos;s Prüfungsordnung to maximize your admission chances.
              </p>
            </div>
            <a
              href="/services/sop-writing"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shrink-0 transition-colors cursor-pointer"
            >
              Book 1-on-1 Review
            </a>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#111622] rounded-none border border-gray-300 dark:border-gray-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-none bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Confirm SOP Generation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Are you sure you want to proceed?
                </p>
              </div>
            </div>

            <div className="p-4 rounded-none bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
              <p className="text-xs font-black text-amber-900 dark:text-amber-200">
                Are you sure you want to proceed?
              </p>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                You have <span className="font-black text-amber-950 dark:text-white underline decoration-amber-500">{remainingAttempts} remaining generation{remainingAttempts === 1 ? '' : 's'}</span> (out of {maxGenerations} total).
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Each generation or re-draft consumes 1 attempt from your remaining attempts.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-none border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleGenerate();
                }}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-none cursor-pointer shadow-xs transition-colors"
              >
                Proceed &amp; Generate ({remainingAttempts} left)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
