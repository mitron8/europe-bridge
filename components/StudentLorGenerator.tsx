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
  UserCheck,
  Award,
  ShieldCheck,
  Building,
  Info,
  Check,
  Edit3,
  RefreshCw,
  Printer,
  Phone,
  MapPin,
  GraduationCap,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface LorGeneratorProps {
  onBack?: () => void;
}

export type LorRoleType = 'academic_professor' | 'head_of_department' | 'thesis_advisor';

interface LorDataState {
  recommenderName: string;
  recommenderTitle: string;
  recommenderInstitution: string;
  recommenderDepartment: string;
  recommenderEmail: string;
  recommenderPhone: string;
  recommenderAddress: string;
  lorType: LorRoleType;
  relationshipDuration: string;
  capacityKnown: string;
  courseTaught: string;
  studentRank: string;
  thesisTitle: string;
  keyAchievements: string;
  softSkills: string[];
  targetProgram: string;
  generatedLor: string;
}

type LorSection = 'recommender' | 'relationship' | 'research';

const LOR_ROLE_PRESETS: Record<LorRoleType, {
  label: string;
  badge: string;
  defaultTitle: string;
  defaultCapacity: string;
  defaultDuration: string;
  defaultAchievements: string;
}> = {
  academic_professor: {
    label: 'Course Instructor / Professor',
    badge: 'Coursework & Theory Focus',
    defaultTitle: 'Associate Professor & Senior Lecturer',
    defaultCapacity: 'Course Instructor & Undergraduate Seminar Mentor',
    defaultDuration: 'over 2 years (4 academic semesters)',
    defaultAchievements: 'Excelled in advanced theory exams, grasped complex theoretical proofs with finesse, and was an active, respectful participant in classroom seminars.',
  },
  head_of_department: {
    label: 'Head of Department (HOD) / Dean',
    badge: 'Institutional & Leadership Endorsement',
    defaultTitle: 'Professor & Head of Department',
    defaultCapacity: 'Professor and Department Head',
    defaultDuration: 'four years',
    defaultAchievements: 'Maintained excellent marks across all academic terms, demonstrated immense working efficiency, and served as leader of the student technical forum organizing hackathons and volunteer arrangements.',
  },
  thesis_advisor: {
    label: 'Bachelor Thesis & Project Supervisor',
    badge: 'Research & Lab Independence Focus',
    defaultTitle: 'Professor & Capstone Project Director',
    defaultCapacity: 'Supervising Professor & Capstone Laboratory Mentor',
    defaultDuration: 'over 2 years (Capstone Research & Thesis)',
    defaultAchievements: 'Conducted rigorous independent scientific research (Selbstständigkeit), consulted peer-reviewed literature, designed experimental test benches, and authored an extraordinary thesis paper.',
  },
};

const COHORT_PERCENTILE_PRESETS = [
  { label: 'Truly Outstanding (Top 5%)', value: 'Top 5% of 140 undergraduate students in the cohort' },
  { label: 'Exceptional (Top 10%)', value: 'Top 10% of 140 undergraduate students in the cohort' },
  { label: 'Very Good (Top 25%)', value: 'Top 25% of 140 undergraduate students in the cohort' },
  { label: 'Above Average (Top 50%)', value: 'Top 50% of the cohort with consistent upward trajectory' },
];

export function StudentLorGenerator({ onBack }: LorGeneratorProps) {
  // Screen mode: 'intake' vs 'result'
  const [screenMode, setScreenMode] = useState<'intake' | 'result'>('intake');
  const [selectedSection, setSelectedSection] = useState<LorSection>('recommender');

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [maxGenerations, setMaxGenerations] = useState(3);
  const [extraAttemptsGranted, setExtraAttemptsGranted] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState<LorDataState>({
    recommenderName: 'Associate Professor Peter Johnson',
    recommenderTitle: 'Associate Professor & Chair of Applied Informatics',
    recommenderInstitution: 'National Institute of Technology',
    recommenderDepartment: 'Department of Computer Science & Engineering',
    recommenderEmail: 'p.johnson@nit.ac.in',
    recommenderPhone: '+91 98765 43210',
    recommenderAddress: 'Campus Directorate, Academic Block III, Tech City',
    lorType: 'academic_professor',
    relationshipDuration: 'four years',
    capacityKnown: 'Course Instructor and Undergraduate Thesis Advisor',
    courseTaught: 'Design & Analysis of Algorithms, Distributed Operating Systems',
    studentRank: 'Top 5% of 140 undergraduate students in the cohort',
    thesisTitle: 'Autonomous Edge Computing for Real-Time Sensor Networks',
    keyAchievements: 'Achieved outstanding marks in advanced coursework, produced an extraordinary thesis paper for seminar presentation, and led the student technical forum conducting hackathons and technical quizzes.',
    softSkills: [
      'Independent Scientific Research (Selbstständigkeit)',
      'Algorithmic & Mathematical Rigor',
      'Systematic Problem Solving',
      'Peer Collaboration & Technical Forum Leadership',
      'High Academic Integrity',
    ],
    targetProgram: 'Master of Science in Germany',
    generatedLor: '',
  });

  const [documentStatus, setDocumentStatus] = useState<any>(null);

  useEffect(() => {
    fetchLorData();
  }, []);

  const fetchLorData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/student/lor`, { credentials: 'include' });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Failed to load LOR dossier data (${res.status})`);
      }
      const data = await res.json();
      if (data.document) setDocumentStatus(data.document);
      if (data.lorData) {
        if (typeof data.lorData.generationCount === 'number') {
          setGenerationCount(data.lorData.generationCount);
          setMaxGenerations(data.lorData.maxGenerations || 3);
          setExtraAttemptsGranted(Boolean(data.lorData.extraAttemptsGranted));
          setRemainingAttempts(data.lorData.remainingAttempts ?? Math.max(0, (data.lorData.maxGenerations || 3) - data.lorData.generationCount));
        }
        setFormData((prev) => ({
          recommenderName: data.lorData.recommenderName ?? prev.recommenderName ?? '',
          recommenderTitle: data.lorData.recommenderTitle ?? prev.recommenderTitle ?? '',
          recommenderInstitution: data.lorData.recommenderInstitution ?? prev.recommenderInstitution ?? '',
          recommenderDepartment: data.lorData.recommenderDepartment ?? prev.recommenderDepartment ?? '',
          recommenderEmail: data.lorData.recommenderEmail ?? prev.recommenderEmail ?? '',
          recommenderPhone: data.lorData.recommenderPhone ?? prev.recommenderPhone ?? '',
          recommenderAddress: data.lorData.recommenderAddress ?? prev.recommenderAddress ?? '',
          lorType: (data.lorData.lorType as LorRoleType) || prev.lorType || 'academic_professor',
          relationshipDuration: data.lorData.relationshipDuration ?? prev.relationshipDuration ?? '',
          capacityKnown: data.lorData.capacityKnown ?? prev.capacityKnown ?? '',
          courseTaught: data.lorData.courseTaught ?? prev.courseTaught ?? '',
          studentRank: data.lorData.studentRank ?? prev.studentRank ?? '',
          thesisTitle: data.lorData.thesisTitle ?? prev.thesisTitle ?? '',
          keyAchievements: data.lorData.keyAchievements ?? prev.keyAchievements ?? '',
          softSkills: Array.isArray(data.lorData.softSkills) && data.lorData.softSkills.length > 0
            ? data.lorData.softSkills
            : prev.softSkills,
          targetProgram: data.lorData.targetProgram ?? prev.targetProgram ?? '',
          generatedLor: data.lorData.generatedLor ?? prev.generatedLor ?? '',
        }));

        // If user already had a generated LOR draft, start on the result screen
        if (data.lorData.generatedLor && data.lorData.generatedLor.trim().length > 50) {
          setScreenMode('result');
        }
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRolePresetSelect = (role: LorRoleType) => {
    const preset = LOR_ROLE_PRESETS[role];
    setFormData((prev) => ({
      ...prev,
      lorType: role,
      recommenderTitle: prev.recommenderTitle || preset.defaultTitle,
      capacityKnown: prev.capacityKnown || preset.defaultCapacity,
      relationshipDuration: prev.relationshipDuration || preset.defaultDuration,
    }));
  };

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`${API_URL}/student/lor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          draftContent: formData.generatedLor,
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
        text: `You have reached your limit of ${maxGenerations} generations. Please contact your counsellor for additional attempts.`,
        type: 'error',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setShowConfirmModal(false);
      setStatusMessage({ text: 'Generating formal German academic Letter of Recommendation...', type: 'info' });

      const res = await fetch(`${API_URL}/student/lor/generate`, {
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
        generatedLor: result.lorContent,
      }));
      if (typeof result.remainingAttempts === 'number') {
        setRemainingAttempts(result.remainingAttempts);
        setGenerationCount(result.generationCount);
        setMaxGenerations(result.maxGenerations);
      }

      // Switch to the Result screen!
      setScreenMode('result');
      setStatusMessage({ text: 'Letter of Recommendation generated successfully!', type: 'success' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!formData.generatedLor.trim()) {
      setStatusMessage({ text: 'Please generate or write your LOR before submitting.', type: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/student/lor/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          documentContent: formData.generatedLor,
          filename: `LOR_${(formData.recommenderName || 'Professor').replace(/[^a-zA-Z0-9]/g, '_')}.txt`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      setDocumentStatus(data.document);
      setStatusMessage({ text: 'LOR submitted to counsellor verification queue!', type: 'success' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!formData.generatedLor) return;
    navigator.clipboard.writeText(formData.generatedLor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export 1: Plain Text (.txt)
  const handleDownloadTxt = () => {
    if (!formData.generatedLor) return;
    const blob = new Blob([formData.generatedLor], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LOR_${(formData.recommenderName || 'Recommendation').replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export 2: Microsoft Word (.doc) with complete academic styling
  const handleDownloadWord = () => {
    if (!formData.generatedLor) return;
    const content = formData.generatedLor;
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Letter of Recommendation - ${formData.recommenderName}</title>
        <style>
          @page {
            size: A4;
            margin: 1in;
          }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 11.5pt;
            line-height: 1.45;
            color: #111111;
          }
          p { margin-bottom: 11pt; text-align: justify; }
          .header-box { margin-bottom: 20pt; font-size: 10pt; color: #444444; border-bottom: 1.5pt solid #222222; padding-bottom: 8pt; }
          .subject-line { font-weight: bold; margin-top: 14pt; margin-bottom: 14pt; font-size: 12pt; }
          .section-heading { font-weight: bold; font-size: 11.5pt; margin-top: 12pt; margin-bottom: 4pt; color: #111111; }
          .signature-box { margin-top: 32pt; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <strong>${formData.recommenderInstitution.toUpperCase()}</strong><br/>
          ${formData.recommenderDepartment}<br/>
          Address: ${formData.recommenderAddress || 'Institutional Campus, University Directorate'}<br/>
          Official Contact: ${formData.recommenderEmail} ${formData.recommenderPhone ? `| Phone: ${formData.recommenderPhone}` : ''}
        </div>
    `;

    const paragraphs = content.split(/\n\n+/).map((p) => {
      const formatted = p.trim().replace(/\n/g, '<br/>');
      if (formatted.startsWith('### ')) {
        return `<p class="section-heading">${formatted.replace(/^###\s*/, '')}</p>`;
      }
      if (formatted.startsWith('SUBJECT:')) {
        return `<p class="subject-line">${formatted}</p>`;
      }
      if (formatted.startsWith('[OFFICIAL INSTITUTION LETTERHEAD]') || formatted.startsWith('[UNIVERSITY LETTERHEAD]')) {
        return '';
      }
      return `<p>${formatted}</p>`;
    }).filter(Boolean).join('');

    const footerHtml = `</body></html>`;
    const fullDoc = headerHtml + paragraphs + footerHtml;

    const blob = new Blob(['\ufeff', fullDoc], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LOR_${(formData.recommenderName || 'Professor').replace(/\s+/g, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export 3: Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.softSkills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        softSkills: [...prev.softSkills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (sk: string) => {
    setFormData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((s) => s !== sk),
    }));
  };

  const wordCount = formData.generatedLor ? formData.generatedLor.trim().split(/\s+/).length : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
        <p className="text-xs font-bold text-gray-500">Loading German LOR Dossier Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 print:hidden">
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
                Letters of Recommendation (LOR)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Official Academic Reference
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Production-ready recommendation engine aligned with DIW Berlin and German admissions standards.
            </p>
          </div>
        </div>

        {/* Quota & Mode Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            <Award className="w-3.5 h-3.5 text-germany-red" />
            <span>{remainingAttempts} of {maxGenerations} generations left</span>
          </div>

          {formData.generatedLor && (
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
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Letter &amp; Export</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all print:hidden ${
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
      {/* SCREEN 1: INTAKE WIZARD */}
      {/* ========================================================================= */}
      {screenMode === 'intake' && (
        <div className="space-y-6 print:hidden">
          {/* LOR Recommendation Style Preset Buttons */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-germany-red" />
                <span>Select Recommendation Profile Type</span>
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                Tailors academic tone to your professor&apos;s role
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(LOR_ROLE_PRESETS) as LorRoleType[]).map((roleKey) => {
                const preset = LOR_ROLE_PRESETS[roleKey];
                const isSelected = formData.lorType === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleRolePresetSelect(roleKey)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-gray-900 dark:border-white bg-white dark:bg-[#151B27] shadow-xs ring-1 ring-gray-900 dark:ring-white'
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900 dark:text-gray-100">
                        {preset.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-germany-red" />}
                    </div>
                    <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 block mt-0.5">
                      {preset.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Step Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1: Referee Profile */}
            <div
              onClick={() => setSelectedSection('recommender')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'recommender'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'recommender'
                    ? 'bg-red-50 text-germany-red dark:bg-red-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 1</span>
                  {formData.recommenderName && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Referee Profile</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.recommenderName || 'Professor credentials'}
                </p>
              </div>
            </div>

            {/* Step 2: Cohort Standing */}
            <div
              onClick={() => setSelectedSection('relationship')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'relationship'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'relationship'
                    ? 'bg-amber-50 text-germany-gold dark:bg-amber-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 2</span>
                  {formData.studentRank && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Cohort Standing</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.studentRank || 'Percentile & courses'}
                </p>
              </div>
            </div>

            {/* Step 3: Research & Evidence */}
            <div
              onClick={() => setSelectedSection('research')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                selectedSection === 'research'
                  ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  selectedSection === 'research'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 3</span>
                  {formData.keyAchievements && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Thesis &amp; Leadership</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {formData.thesisTitle || 'Research paper & forum work'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Step Details */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
            {/* STEP 1: RECOMMENDER PROFILE */}
            {selectedSection === 'recommender' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 1: Professor &amp; Referee Academic Credentials
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Official contact information to be printed on your university letterhead.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Professor / Referee Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderName || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderName: e.target.value })}
                      placeholder="e.g. Associate Professor Peter Johnson"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Designation &amp; Academic Chair
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderTitle || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderTitle: e.target.value })}
                      placeholder="e.g. Associate Professor & Chair of Applied Informatics"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      University / Institution Name
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderInstitution || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderInstitution: e.target.value })}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Academic Department
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderDepartment || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderDepartment: e.target.value })}
                      placeholder="e.g. Department of Computer Science & Engineering"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Official Institutional Email (.edu / .ac)
                    </label>
                    <input
                      type="email"
                      value={formData.recommenderEmail || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderEmail: e.target.value })}
                      placeholder="e.g. p.johnson@nit.ac.in"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Official Contact Phone / Mobile
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderPhone || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderPhone: e.target.value })}
                      placeholder="e.g. +91 98765 43210 (German universities verify via phone)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Campus / Directorate Address
                  </label>
                  <input
                    type="text"
                    value={formData.recommenderAddress || ''}
                    onChange={(e) => setFormData({ ...formData, recommenderAddress: e.target.value })}
                    placeholder="e.g. Campus Directorate, Academic Block III, Tech City"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setSelectedSection('relationship')}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Cohort Standing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: RELATIONSHIP & COHORT STANDING */}
            {selectedSection === 'relationship' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 2: Academic Standing &amp; Cohort Benchmark (DIW Berlin Matrix)
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    German admission boards require quantifiable percentile rankings over general subjective compliments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Duration of Academic Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.relationshipDuration || ''}
                      onChange={(e) => setFormData({ ...formData, relationshipDuration: e.target.value })}
                      placeholder="e.g. four years / over 2 years (4 academic semesters)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Capacity Known
                    </label>
                    <input
                      type="text"
                      value={formData.capacityKnown || ''}
                      onChange={(e) => setFormData({ ...formData, capacityKnown: e.target.value })}
                      placeholder="e.g. Professor and Head of Department / Thesis Advisor"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Advanced Courses / Seminars Taught by This Referee
                  </label>
                  <input
                    type="text"
                    value={formData.courseTaught || ''}
                    onChange={(e) => setFormData({ ...formData, courseTaught: e.target.value })}
                    placeholder="e.g. Design & Analysis of Algorithms, Distributed Operating Systems"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block">
                    Cohort Rank / Relative Academic Standing (Crucial for Germany)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {COHORT_PERCENTILE_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, studentRank: p.value })}
                        className={`p-2.5 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          formData.studentRank === p.value
                            ? 'border-germany-red bg-red-50/50 dark:bg-red-950/30 text-germany-red font-black'
                            : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.studentRank || ''}
                    onChange={(e) => setFormData({ ...formData, studentRank: e.target.value })}
                    placeholder="e.g. Top 5% in a cohort of 140 undergraduate students"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white mt-1"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setSelectedSection('recommender')}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
                  >
                    Back to Referee
                  </button>
                  <button
                    onClick={() => setSelectedSection('research')}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Thesis &amp; Evidence</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: THESIS & LEADERSHIP */}
            {selectedSection === 'research' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 3: Thesis Presentation, Technical Forum &amp; Scientific Independence
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Concrete achievements including seminar thesis paper, circuitry/coding projects, and leadership in student technical forums.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Bachelor Thesis / Seminar Paper Title &amp; Topic
                  </label>
                  <input
                    type="text"
                    value={formData.thesisTitle || ''}
                    onChange={(e) => setFormData({ ...formData, thesisTitle: e.target.value })}
                    placeholder="e.g. Autonomous Edge Computing for Real-Time Sensor Networks"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Highlights your seminar thesis presentation directly to the German examination board.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Key Academic &amp; Technical Achievements (Projects, Circuitry, Coding, Forum Leadership)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.keyAchievements || ''}
                    onChange={(e) => setFormData({ ...formData, keyAchievements: e.target.value })}
                    placeholder="Describe laboratory achievements, handling complex concepts with finesse, coding, and role in student technical forum or volunteer work..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Target Master&apos;s Program in Germany
                  </label>
                  <input
                    type="text"
                    value={formData.targetProgram || ''}
                    onChange={(e) => setFormData({ ...formData, targetProgram: e.target.value })}
                    placeholder="e.g. Master of Science in Computer Science (Public University, Germany)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Demonstrated Scientific Competencies */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                    Evaluated Competency Dimensions (DIW Berlin Matrix)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="e.g. Empirical Benchmark Design or Peer Forum Leadership"
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-extrabold rounded-xl cursor-pointer"
                    >
                      Add Skill
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.softSkills.map((sk) => (
                      <span
                        key={sk}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      >
                        {sk}
                        <button
                          onClick={() => removeSkill(sk)}
                          className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Trigger: Generate AI Button */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedSection('relationship')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer text-center"
                  >
                    Back to Standing
                  </button>

                  <button
                    onClick={onInitiateGenerate}
                    disabled={isGenerating || remainingAttempts <= 0}
                    className="w-full sm:w-auto px-8 py-3.5 neu-btn-primary flex items-center justify-center gap-2.5 text-xs font-black rounded-xl cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                        <span>Drafting Academic LOR...</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 text-germany-gold" />
                        <span>
                          {remainingAttempts <= 0
                            ? 'Limit Reached (0 left)'
                            : `Generate Academic LOR (${remainingAttempts} left)`}
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
      {/* SCREEN 2: GENERATED LETTER, PRINT, WORD EXPORT & SUBMIT */}
      {/* ========================================================================= */}
      {screenMode === 'result' && (
        <div className="space-y-6">
          {/* Top Bar on Result Screen: Status & Export Actions */}
          <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Letter of Recommendation Ready
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {wordCount} words • From {formData.recommenderName} ({formData.recommenderInstitution})
                </p>
              </div>
            </div>

            {/* Quick Action Export Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
              <button
                onClick={() => setScreenMode('intake')}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Inputs</span>
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
                  {remainingAttempts <= 0 ? 'Quota Reached (0 left)' : `Re-draft (${remainingAttempts} left)`}
                </span>
              </button>

              <button
                onClick={handleDownloadWord}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                title="Download Microsoft Word .doc ready to print on college letterhead"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Word (.doc)</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Official Physical Submission Checklist */}
          <div className="neu-card p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-3xl space-y-3 print:hidden">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-black text-blue-900 dark:text-blue-200">
                German University Submission Guidelines (Physical Ink &amp; Seal)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-blue-800 dark:text-blue-300">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Official Letterhead (Briefkopf)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Institutional Email (.edu/.ac)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Phone Number for Verification</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Physical Ink Signature &amp; Stamp</span>
              </div>
            </div>
          </div>

          {/* Letterhead Paper Representation & Live Editor */}
          <div className="neu-card p-8 md:p-12 bg-[#FCFBFA] dark:bg-[#111622] border border-gray-300/80 dark:border-gray-800 rounded-3xl shadow-md space-y-5 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 print:hidden">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-germany-red" />
                <span>Empfehlungsschreiben Draft Text</span>
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                Directly editable below before printing for professor&apos;s physical signature
              </span>
            </div>

            <textarea
              rows={24}
              value={formData.generatedLor || ''}
              onChange={(e) => setFormData({ ...formData, generatedLor: e.target.value })}
              className="w-full p-6 sm:p-8 rounded-2xl font-serif text-sm leading-relaxed bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 resize-y focus:outline-none focus:ring-1 focus:ring-germany-red shadow-inner print:border-none print:p-0 print:text-black print:bg-transparent"
            />

            {/* Bottom Actions: Submit for Counsellor Verification */}
            <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
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
                      Submit this draft to your EuropeBridge counsellor for verification before printing for your professor.
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
                  disabled={isSubmitting || !formData.generatedLor}
                  className={`px-6 py-3 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-colors ${
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
                      ? 'Update Submission'
                      : 'Submit to Counsellor Review'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 print:hidden">
          <div className="neu-card p-6 max-w-md w-full bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 text-germany-red dark:bg-red-950/50 rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Generate Academic LOR
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This will consume 1 generation attempt ({remainingAttempts} remaining).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
              <p>
                <strong>Referee:</strong> {formData.recommenderName} ({formData.recommenderInstitution})
              </p>
              <p>
                <strong>Role:</strong> {LOR_ROLE_PRESETS[formData.lorType]?.label}
              </p>
              <p>
                <strong>Standing:</strong> {formData.studentRank}
              </p>
              {formData.thesisTitle && (
                <p>
                  <strong>Thesis:</strong> {formData.thesisTitle}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs flex items-center gap-2"
              >
                {isGenerating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm &amp; Generate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
