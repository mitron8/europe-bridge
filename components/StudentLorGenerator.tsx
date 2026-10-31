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
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface LorGeneratorProps {
  onBack?: () => void;
}

interface LorDataState {
  recommenderName: string;
  recommenderTitle: string;
  recommenderInstitution: string;
  recommenderDepartment: string;
  recommenderEmail: string;
  relationshipDuration: string;
  capacityKnown: string;
  courseTaught: string;
  studentRank: string;
  keyAchievements: string;
  softSkills: string[];
  targetProgram: string;
  generatedLor: string;
}

type LorSection = 'recommender' | 'relationship' | 'research';

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
    recommenderName: 'Prof. Dr. Rajesh Sharma',
    recommenderTitle: 'Professor & Dean of Academic Affairs',
    recommenderInstitution: 'National Institute of Technology',
    recommenderDepartment: 'Department of Computer Science & Engineering',
    recommenderEmail: 'r.sharma@university.edu',
    relationshipDuration: 'over 2 years (4 academic semesters)',
    capacityKnown: 'Course Instructor and Undergraduate Thesis Advisor',
    courseTaught: 'Design and Analysis of Algorithms, Advanced Operating Systems',
    studentRank: 'Top 5% of 120 undergraduate students in the cohort',
    keyAchievements: 'Demonstrated outstanding capability in algorithmic optimization, empirical benchmarking, and scientific literature synthesis during supervised capstone research.',
    softSkills: [
      'Independent Scientific Research (Selbstständigkeit)',
      'Analytical Rigor',
      'Systematic Problem Solving',
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
          relationshipDuration: data.lorData.relationshipDuration ?? prev.relationshipDuration ?? '',
          capacityKnown: data.lorData.capacityKnown ?? prev.capacityKnown ?? '',
          courseTaught: data.lorData.courseTaught ?? prev.courseTaught ?? '',
          studentRank: data.lorData.studentRank ?? prev.studentRank ?? '',
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
      setStatusMessage({ text: 'Structuring German institutional recommendation appraisal...', type: 'info' });

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
          filename: `LOR_${formData.recommenderName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`,
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

  const handleDownload = () => {
    if (!formData.generatedLor) return;
    const blob = new Blob([formData.generatedLor], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LOR_${formData.recommenderName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
                Letters of Recommendation (LOR)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Official Academic Reference
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Evidence-based recommendation from professors or research mentors validating your cohort rank and independent scientific research (Selbstständigkeit).
            </p>
          </div>
        </div>

        {/* Remaining Quota Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
          <Award className="w-3.5 h-3.5 text-germany-red" />
          <span>{remainingAttempts} of {maxGenerations} generations remaining</span>
        </div>

        {/* Mode Switcher Pills (If draft already exists) */}
        <div className="flex items-center gap-2">
          {formData.generatedLor ? (
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
                <span>Generated Letter &amp; Export</span>
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
      {/* SCREEN 1 & 2: INTAKE WIZARD (Referee, Standing, Evidence) */}
      {/* ========================================================================= */}
      {screenMode === 'intake' && (
        <div className="space-y-6">
          {/* 3 Step Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1: Referee Profile */}
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
                  {formData.recommenderName || 'Professor details'}
                </p>
              </div>
            </div>

            {/* Card 2: Academic Standing */}
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

            {/* Card 3: Research Evidence */}
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
                <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Research &amp; Skills</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  Supervised projects &amp; aptitude
                </p>
              </div>
            </div>
          </div>

          {/* Form Container for the Selected Option */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
            {/* OPTION 1: RECOMMENDER PROFILE */}
            {selectedSection === 'recommender' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 1: Professor &amp; Referee Academic Profile
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Official credentials of the university faculty member providing the recommendation.
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
                      placeholder="e.g. Prof. Dr. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                      Designation &amp; Academic Title
                    </label>
                    <input
                      type="text"
                      value={formData.recommenderTitle || ''}
                      onChange={(e) => setFormData({ ...formData, recommenderTitle: e.target.value })}
                      placeholder="e.g. Professor & Dean of Academic Affairs"
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

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Referee Official Institutional Email (.edu / .ac)
                  </label>
                  <input
                    type="email"
                    value={formData.recommenderEmail || ''}
                    onChange={(e) => setFormData({ ...formData, recommenderEmail: e.target.value })}
                    placeholder="e.g. r.sharma@nit.ac.in (German universities require institutional email)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    ⚠️ German universities discard letters using public Gmail or Yahoo accounts.
                  </p>
                </div>

                {/* Bottom Navigation */}
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

            {/* OPTION 2: RELATIONSHIP & COHORT STANDING */}
            {selectedSection === 'relationship' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 2: Academic Relationship &amp; Cohort Standing
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    German selection boards require an objective percentile benchmark rather than subjective praise.
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
                      placeholder="e.g. over 2 years (4 academic semesters)"
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
                      placeholder="e.g. Course Instructor & Undergraduate Thesis Advisor"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Advanced Courses Taught by This Professor
                  </label>
                  <input
                    type="text"
                    value={formData.courseTaught || ''}
                    onChange={(e) => setFormData({ ...formData, courseTaught: e.target.value })}
                    placeholder="e.g. Advanced Algorithms, Distributed Operating Systems"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Student Cohort Rank / Percentile Standing (Crucial for Germany)
                  </label>
                  <input
                    type="text"
                    value={formData.studentRank || ''}
                    onChange={(e) => setFormData({ ...formData, studentRank: e.target.value })}
                    placeholder="e.g. Top 5% of 120 undergraduate students in the cohort"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    German admission committees (e.g. TUM, RWTH) specifically evaluate class rank.
                  </p>
                </div>

                {/* Bottom Navigation */}
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
                    <span>Continue to Evidence</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* OPTION 3: RESEARCH EVIDENCE & APTITUDE */}
            {selectedSection === 'research' && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Step 3: Supervised Research &amp; Scientific Independence
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Evidence of independent research (Selbstständigkeit), capstone performance, and problem solving.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                    Supervised Project, Lab Work, or Capstone Investigation
                  </label>
                  <textarea
                    rows={4}
                    value={formData.keyAchievements || ''}
                    onChange={(e) => setFormData({ ...formData, keyAchievements: e.target.value })}
                    placeholder="Describe specific project work, laboratory experiments, or research challenges overcome under this professor's supervision..."
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
                    placeholder="e.g. Master of Science in Informatics"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Demonstrated Scientific Competencies */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                    Demonstrated Competencies (Selbstständigkeit)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="e.g. Empirical Benchmark Design or Scientific Literature Synthesis"
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

                {/* Bottom Trigger: Big Generate AI Button */}
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
      {/* SCREEN 3: GENERATED LETTER, CHECKLIST, DOWNLOAD & COUNSELLOR SUBMIT */}
      {/* ========================================================================= */}
      {screenMode === 'result' && (
        <div className="space-y-6">
          {/* Top Bar on Result Screen: Status, Edit Button, and Actions */}
          <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

          {/* Official German Validity Checklist */}
          <div className="neu-card p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-3xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-black text-blue-900 dark:text-blue-200">
                German University LOR Physical Submission Checklist
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-800 dark:text-blue-300">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Print on College Letterhead</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Must show .edu / .ac email</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-2xl border border-blue-200/60 dark:border-blue-900/40">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Physical Ink &amp; Stamp</span>
              </div>
            </div>
          </div>

          {/* Full-Width Recommendation Letter View & Live Editor */}
          <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-germany-red" />
                <span>Empfehlungsschreiben Draft Text</span>
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                Edit or customize any section below before bringing it to your professor for signature
              </span>
            </div>

            <textarea
              rows={22}
              value={formData.generatedLor || ''}
              onChange={(e) => setFormData({ ...formData, generatedLor: e.target.value })}
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
                  Confirm LOR Generation
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
