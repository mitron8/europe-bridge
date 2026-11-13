'use client';

import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Target,
  GraduationCap,
  Briefcase,
  Check,
  Building2,
  Clock,
  Plus,
  X,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export interface SopIntakeFormProps {
  handleInstitutionBlur: (inst?: string) => void;
  onInitiateInitialBatch: () => void;
  selectedStep: 'target' | 'academic' | 'career';
  setSelectedStep: (step: 'target' | 'academic' | 'career') => void;
  programmes: any[];
  studentProfile: any;
  educationProfile: any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleIntakeChange: (field: any, value: any) => void;
  newModule: string;
  setNewModule: (val: string) => void;
  addTargetModule: () => void;
  removeTargetModule: (mod: string) => void;
  newCourse: string;
  setNewCourse: (val: string) => void;
  addRelevantCourse: () => void;
  removeRelevantCourse: (crs: string) => void;
  isGenerating: boolean;
  isSaving: boolean;
  remainingAttempts: number;
  hasGeneratedAny: boolean;
  
  onSaveDraft: () => void;
  onOpenGpaModal: () => void;
}

export function SopIntakeForm({
  handleInstitutionBlur,
  onInitiateInitialBatch,
  selectedStep,
  setSelectedStep,
  programmes,
  studentProfile,
  educationProfile,
  formData,
  setFormData,
  handleIntakeChange,
  newModule,
  setNewModule,
  addTargetModule,
  removeTargetModule,
  newCourse,
  setNewCourse,
  addRelevantCourse,
  removeRelevantCourse,
  isGenerating,
  isSaving,
  remainingAttempts,
  hasGeneratedAny,
  
  onSaveDraft,
  onOpenGpaModal,
}: SopIntakeFormProps) {
  return (
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
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-1 focus:ring-germany-red whitespace-normal break-words"
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
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white cursor-pointer focus:ring-1 focus:ring-germany-red whitespace-normal break-words"
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
                    {formData.targetModules.map((mod: string) => (
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
                      <GraduationCap className="w-4 h-4 text-germany-red" />
                      <span>German Bavarian GPA: {formData.bachelorGpa || 'Pending Calculation'}</span>
                    </span>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                      Standardized German conversion used by uni-assist and faculty selection committees.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenGpaModal()}
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
                    {formData.relevantCourses.map((c: string) => (
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
  );
}
