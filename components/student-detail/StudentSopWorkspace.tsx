'use client';

import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Square,
  Loader2,
  RefreshCw,
  PlusCircle,
  RotateCcw,
  FileText,
  CheckCircle2,
  Download,
  Upload,
} from 'lucide-react';

export interface StudentSopWorkspaceProps {
  readOnly?: boolean;
  studentSops: any[];
  selectedSopRecIds: string[];
  setSelectedSopRecIds: React.Dispatch<React.SetStateAction<string[]>>;
  sopsLoading: boolean;
  sopsError: string | null;
  grantingDocType: 'sop' | 'lor' | 'cv' | null;
  grantStatusMessage: { text: string; type: 'success' | 'error' } | null;
  regeneratingSops: boolean;
  docActionLoading: string | null;
  downloadingWordId: string | null;
  uploadingCorrectedId: string | null;
  onFetchStudentSops: () => void;
  onRegenerateSops: (recIds?: string[]) => void;
  onGrantAttempts: (type: 'sop') => void;
  onVerifyDoc: (docId: string, status?: 'approved' | 'rejected') => void;
  onDownloadWord: (type: 'sop' | 'lor' | 'cv', recId: string, filename: string) => void;
  onUploadCorrected: (type: 'sop' | 'lor' | 'cv', file: File, recId?: string) => void;
}

export function StudentSopWorkspace({
  readOnly,
  studentSops,
  selectedSopRecIds,
  setSelectedSopRecIds,
  sopsLoading,
  sopsError,
  grantingDocType,
  grantStatusMessage,
  regeneratingSops,
  docActionLoading,
  downloadingWordId,
  uploadingCorrectedId,
  onFetchStudentSops,
  onRegenerateSops,
  onGrantAttempts,
  onVerifyDoc,
  onDownloadWord,
  onUploadCorrected,
}: StudentSopWorkspaceProps) {
  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-germany-red" />
            <h3 className="font-display text-base text-germany-black dark:text-white">
              SOP Documents Verification Workspace
            </h3>
          </div>
          <p className="text-xs font-bold text-gray-500 mt-0.5">
            Verify, preview, download Word (.docx), upload corrected versions, or re-generate programme SOPs.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!readOnly && (
            <>
              {studentSops.length > 0 && (
                <button
                  onClick={() => {
                    if (selectedSopRecIds.length === studentSops.length) {
                      setSelectedSopRecIds([]);
                    } else {
                      setSelectedSopRecIds(studentSops.map((s) => s.recommendationId));
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  title="Toggle select all SOPs"
                >
                  {selectedSopRecIds.length === studentSops.length && studentSops.length > 0 ? (
                    <CheckSquare className="w-3.5 h-3.5 text-germany-red" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span>Select All</span>
                </button>
              )}

              {selectedSopRecIds.length > 0 && (
                <button
                  onClick={() => onRegenerateSops(selectedSopRecIds)}
                  disabled={regeneratingSops}
                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-germany-red hover:bg-[#D62839] text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                  title="Re-generate selected SOPs from scratch"
                >
                  {regeneratingSops ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  <span>Re-generate Selected ({selectedSopRecIds.length})</span>
                </button>
              )}

              <button
                onClick={() => onRegenerateSops()}
                disabled={regeneratingSops || studentSops.length === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                title="Re-generate all shortlisted programme SOPs from scratch"
              >
                {regeneratingSops && selectedSopRecIds.length === 0 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Re-generate All SOPs</span>
              </button>

              <button
                onClick={() => onGrantAttempts('sop')}
                disabled={grantingDocType === 'sop'}
                className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Allot +2 extra SOP generation attempts to student"
              >
                {grantingDocType === 'sop' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5 text-amber-600" />}
                <span>+ Allot Extra (+2)</span>
              </button>
            </>
          )}

          <button
            onClick={onFetchStudentSops}
            disabled={sopsLoading}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 cursor-pointer shadow-xs transition-colors"
            title="Refresh SOP list"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${sopsLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {grantStatusMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-bold border ${grantStatusMessage.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
            }`}
        >
          {grantStatusMessage.text}
        </div>
      )}

      {/* SOP Cards Grid */}
      {sopsLoading && studentSops.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-400 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-germany-red mb-2" />
          <span>Loading student SOPs...</span>
        </div>
      ) : sopsError ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-800 flex items-center justify-between">
          <span>{sopsError}</span>
          <button
            onClick={onFetchStudentSops}
            className="underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : studentSops.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-400 bg-white dark:bg-[#0E121A] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 space-y-1">
          <BookOpen className="w-8 h-8 mx-auto text-gray-300" />
          <p className="font-bold text-gray-600 dark:text-gray-300">
            No programme SOPs generated yet
          </p>
          <p className="text-[11px]">
            Ensure the student has shortlisted universities, or click &quot;Re-generate All SOPs&quot; above to trigger generation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {studentSops.map((sop) => {
            const isSelected = selectedSopRecIds.includes(sop.recommendationId);
            const isGenerated = Boolean(sop.isGenerated);
            const isApproved = sop.verificationStatus === 'approved';

            return (
              <div
                key={sop.recommendationId}
                className={`p-4 rounded-2xl border transition-all ${isSelected
                  ? 'border-germany-red bg-red-50/30 dark:bg-red-950/10 shadow-xs'
                  : 'border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#0E121A] hover:border-gray-300'
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {!readOnly && (
                      <button
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSopRecIds(selectedSopRecIds.filter((id) => id !== sop.recommendationId));
                          } else {
                            setSelectedSopRecIds([...selectedSopRecIds, sop.recommendationId]);
                          }
                        }}
                        className="mt-1 text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-germany-red" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-gray-900 dark:text-white truncate">
                          {sop.universityName || 'University'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          • {sop.degree || 'Master'}
                        </span>

                        {isApproved ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                            Approved &amp; Released
                          </span>
                        ) : isGenerated ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                            Awaiting Review
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">
                            Not Generated
                          </span>
                        )}

                        {sop.version && (
                          <span className="text-[10px] font-bold text-gray-400">
                            v{sop.version}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate mt-0.5">
                        {sop.programName || 'Programme'}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold mt-1.5 flex-wrap">
                        <span>Attempts used: {sop.attemptsUsed ?? 1} / {sop.maxAttempts ?? 3}</span>
                        {sop.lastGeneratedAt && (
                          <span>Generated: {new Date(sop.lastGeneratedAt).toLocaleDateString()}</span>
                        )}
                        {sop.wordCount && (
                          <span>~{sop.wordCount} words</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions for this SOP */}
                  <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                    {/* View / Preview */}
                    {sop.documentUrl && (
                      <a
                        href={sop.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                        title="Open generated document preview in new tab"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </a>
                    )}

                    {!readOnly && (
                      <>
                        {/* Verify / Approve */}
                        {isApproved ? (
                          <div
                            className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                            title="This SOP is approved and available to student"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Approved</span>
                          </div>
                        ) : sop.documentId ? (
                          <button
                            onClick={() => onVerifyDoc(sop.documentId)}
                            disabled={docActionLoading === sop.documentId}
                            className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                            title="Approve SOP and release to student"
                          >
                            {docActionLoading === sop.documentId ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>Approve</span>
                          </button>
                        ) : null}

                        {/* Download Word (.docx) */}
                        <button
                          onClick={() =>
                            onDownloadWord(
                              'sop',
                              sop.recommendationId,
                              `SOP_${(sop.universityName || 'Uni').replace(/[^a-zA-Z0-9]/g, '_')}_${(sop.programName || 'Prog').replace(/[^a-zA-Z0-9]/g, '_')}.docx`,
                            )
                          }
                          disabled={downloadingWordId === sop.recommendationId}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                          title="Download editable Microsoft Word (.docx) document"
                        >
                          {downloadingWordId === sop.recommendationId ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5 text-blue-600" />
                          )}
                          <span>Word (.docx)</span>
                        </button>

                        {/* Upload Corrected */}
                        <label
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors flex items-center gap-1 cursor-pointer shadow-xs ${uploadingCorrectedId === sop.recommendationId ? 'opacity-60 pointer-events-none' : ''
                            }`}
                          title="Upload corrected SOP (marks as approved, replaces generated document)"
                        >
                          {uploadingCorrectedId === sop.recommendationId ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 text-purple-600" />
                          )}
                          <span>Upload Corrected</span>
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            className="hidden"
                            disabled={uploadingCorrectedId === sop.recommendationId}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onUploadCorrected('sop', file, sop.recommendationId);
                                e.target.value = '';
                              }
                            }}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

