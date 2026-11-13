"use client";

import React, { useState, useEffect } from 'react';
import { LorIntakeWizard } from './lor/LorIntakeWizard';
import { LorResultView } from './lor/LorResultView';
import { LorConfirmModal } from './lor/LorConfirmModal';
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

export interface LorFormData {
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

export type LorDataState = LorFormData;

export type LorSection = 'recommender' | 'relationship' | 'research';

export const LOR_ROLE_PRESETS: Record<LorRoleType, {
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

export const COHORT_PERCENTILE_PRESETS = [
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
        <LorIntakeWizard
          formData={formData}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          onRolePresetSelect={handleRolePresetSelect}
          onFormDataChange={setFormData}
          newSkill={newSkill}
          onNewSkillChange={setNewSkill}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
          onInitiateGenerate={onInitiateGenerate}
          isGenerating={isGenerating}
          remainingAttempts={remainingAttempts}
        />
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: GENERATED LETTER, PRINT, WORD EXPORT & SUBMIT */}
      {/* ========================================================================= */}
      {screenMode === 'result' && (
        <LorResultView
          formData={formData}
          wordCount={wordCount}
          remainingAttempts={remainingAttempts}
          isGenerating={isGenerating}
          copied={copied}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          submissionFeedback={submissionFeedback}
          documentStatus={documentStatus}
          onEditInputs={() => setScreenMode('intake')}
          onInitiateGenerate={onInitiateGenerate}
          onDownloadWord={handleDownloadWord}
          onPrint={handlePrint}
          onCopy={handleCopy}
          onSaveDraft={handleSaveDraft}
          onGeneratedLorChange={(val) => setFormData({ ...formData, generatedLor: val })}
          onSubmitForReview={handleSubmitForReview}
        />
      )}

      {/* Confirmation Modal */}
      <LorConfirmModal
        isOpen={showConfirmModal}
        remainingAttempts={remainingAttempts}
        isGenerating={isGenerating}
        formData={formData}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleGenerate}
      />
    </div>
  );
}
