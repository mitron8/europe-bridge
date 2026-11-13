'use client';

import React from 'react';
import {
  AlertCircle,
  Loader2,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Download,
  CheckSquare,
  Square,
  RefreshCw,
} from 'lucide-react';

export interface SopDocumentsHubProps {
  setActiveTab: (tab: 'form' | 'documents') => void;
  programmes: any[];
  selectedForRegen: Record<string, boolean>;
  toggleRegenSelect: (id: string) => void;
  selectedRegenCount: number;
  remainingAttempts: number;
  isGenerating: boolean;
  hasGeneratedAny: boolean;
  onInitiateSelectiveRegen: () => void;
}

export function SopDocumentsHub({
  setActiveTab,
  programmes,
  selectedForRegen,
  toggleRegenSelect,
  selectedRegenCount,
  remainingAttempts,
  isGenerating,
  hasGeneratedAny,
  onInitiateSelectiveRegen,
}: SopDocumentsHubProps) {
  return (
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
  );
}
