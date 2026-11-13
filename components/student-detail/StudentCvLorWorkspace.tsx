'use client';

import React from 'react';
import {
  FileText,
  Loader2,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

export interface StudentCvLorWorkspaceProps {
  docCategory: string;
  readOnly?: boolean;
  regeneratingCv: boolean;
  onRegenerateCv: () => void;
  grantingDocType: 'sop' | 'lor' | 'cv' | null;
  dossierLimits: any;
  onGrantAttempts: (type: 'cv' | 'lor') => void;
  onRefreshLimits: () => void;
}

export function StudentCvLorWorkspace({
  docCategory,
  readOnly,
  regeneratingCv,
  onRegenerateCv,
  grantingDocType,
  dossierLimits,
  onGrantAttempts,
  onRefreshLimits,
}: StudentCvLorWorkspaceProps) {
  if (docCategory !== 'cv' && docCategory !== 'lor') return null;

  return (
    <>
      {/* Academic CV Verification Workspace Header */}
      {docCategory === 'cv' && (
        <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <h3 className="font-display text-base text-germany-black dark:text-white">
                Academic CV Verification Workspace
              </h3>
            </div>
            <p className="text-xs font-bold text-gray-500 mt-0.5">
              Review, verify, download Word (.docx), upload corrected version, re-generate, or allot extra attempt.
            </p>
          </div>

          {!readOnly && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onRegenerateCv}
                disabled={regeneratingCv}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                title="Re-generate CV from scratch"
              >
                {regeneratingCv ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Re-generate CV</span>
              </button>

              <button
                onClick={() => onGrantAttempts('cv')}
                disabled={grantingDocType === 'cv' || Boolean(dossierLimits?.cv?.extraAttemptsGranted)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs ${dossierLimits?.cv?.extraAttemptsGranted
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 cursor-pointer'
                  }`}
                title={
                  dossierLimits?.cv?.extraAttemptsGranted
                    ? 'Max 1 extra attempt already allotted'
                    : 'Allot +1 extra CV generation attempt to student'
                }
              >
                {grantingDocType === 'cv' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5 text-amber-600" />}
                <span>+ Allot Extra</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI Academic Dossier Quotas & Clearance Hub */}
      {!readOnly && (
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
              onClick={onRefreshLimits}
              className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 cursor-pointer shadow-xs transition-colors shrink-0"
              title="Refresh quota status"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LOR Quota Card */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0A0D14] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-germany-red" />
                  <span>Academic LOR Quota</span>
                </span>
                {dossierLimits?.lor?.extraAttemptsGranted ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    +2 Extra Allotted
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
                  className="bg-germany-red h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (((dossierLimits?.lor?.generationCount ?? 0) / (dossierLimits?.lor?.maxGenerations ?? 3)) * 100)
                    )}%`,
                  }}
                />
              </div>

              {/* Allot Button / Helper Info */}
              <div className="pt-2 space-y-1.5">
                {readOnly ? (
                  <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 text-center py-1">
                    Supervisor View • {dossierLimits?.lor?.extraAttemptsGranted ? 'Extra attempt allotted' : 'Standard quota active'}
                  </p>
                ) : (
                  <>
                    <button
                      onClick={() => onGrantAttempts('lor')}
                      disabled={grantingDocType === 'lor' || Boolean(dossierLimits?.lor?.extraAttemptsGranted)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors ${dossierLimits?.lor?.extraAttemptsGranted
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed'
                        : 'bg-germany-red hover:bg-[#D62839] text-white cursor-pointer disabled:opacity-50'
                        }`}
                      title={
                        dossierLimits?.lor?.extraAttemptsGranted
                          ? 'Max 2 extra attempts already allotted'
                          : 'Allot +2 extra LOR generation attempts to student'
                      }
                    >
                      {grantingDocType === 'lor' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <PlusCircle className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {dossierLimits?.lor?.extraAttemptsGranted
                          ? 'Max 2 Extra Allotted'
                          : 'Allot +2 LOR Attempts'}
                      </span>
                    </button>
                    {!dossierLimits?.lor?.extraAttemptsGranted && !dossierLimits?.lor?.canGrantExtra && (
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 py-0.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Student has {dossierLimits?.lor?.remainingAttempts ?? 3} initial attempts left. +2 extra can be allotted once initial 3 are crossed.</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Academic CV Quota Card */}
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0A0D14] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Academic CV Quota</span>
                </span>
                {dossierLimits?.cv?.extraAttemptsGranted ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    +1 Extra Allotted
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
                    {dossierLimits?.cv?.generationCount ?? 0}
                  </span>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {' '}/ {dossierLimits?.cv?.maxGenerations ?? 3} used
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {dossierLimits?.cv?.remainingAttempts ?? 3} remaining
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (((dossierLimits?.cv?.generationCount ?? 0) / (dossierLimits?.cv?.maxGenerations ?? 3)) * 100)
                    )}%`,
                  }}
                />
              </div>

              {/* Allot Button / Helper Info */}
              <div className="pt-2 space-y-1.5">
                {readOnly ? (
                  <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 text-center py-1">
                    Supervisor View • {dossierLimits?.cv?.extraAttemptsGranted ? 'Extra attempt allotted' : 'Standard quota active'}
                  </p>
                ) : (
                  <>
                    <button
                      onClick={() => onGrantAttempts('cv')}
                      disabled={grantingDocType === 'cv' || Boolean(dossierLimits?.cv?.extraAttemptsGranted)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors ${dossierLimits?.cv?.extraAttemptsGranted
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer disabled:opacity-50'
                        }`}
                      title={
                        dossierLimits?.cv?.extraAttemptsGranted
                          ? 'Max 1 extra attempt already allotted'
                          : 'Allot +1 extra CV generation attempt to student'
                      }
                    >
                      {grantingDocType === 'cv' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <PlusCircle className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {dossierLimits?.cv?.extraAttemptsGranted
                          ? 'Max 1 Extra Allotted'
                          : 'Allot +1 CV Attempt'}
                      </span>
                    </button>
                    {!dossierLimits?.cv?.extraAttemptsGranted && !dossierLimits?.cv?.canGrantExtra && (
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 py-0.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Student has {dossierLimits?.cv?.remainingAttempts ?? 3} initial attempts left. +1 extra can be allotted once initial 3 are crossed.</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

