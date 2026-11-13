'use client';

import React from 'react';
import {
  Loader2,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  ExternalLink,
  Download,
  Upload,
  PlusCircle,
  FileCheck2,
  Save,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { DocumentProgressMetrics } from './DocumentProgressMetrics';

export interface StudentDocumentsCatalogueProps {
  docCategory: string;
  statsUploaded: number;
  statsTotalExpected: number;
  statsNotUploaded: number;
  statsPending: number;
  statsVerified: number;
  statsRejected: number;
  docsLoading: boolean;
  docsError: string | null;
  visaLoading: boolean;
  docFilter: string;
  setDocFilter: (val: string) => void;
  notUploadedCatalogueItems: any[];
  filteredDocs: any[];
  isCustomAiCategory: boolean;
  readOnly?: boolean;
  effectiveStudentId: string;
  student: any;
  docActionLoading: string | null;
  downloadingWordId: string | null;
  uploadingCorrectedId: string | null;
  regeneratingCv: boolean;
  grantingDocType: 'sop' | 'lor' | 'cv' | null;
  dossierLimits: any;
  visaGeneralNotes: string;
  setVisaGeneralNotes: (val: string) => void;
  visaGeneralNotesSaving: boolean;
  displayedChecklist: any[];
  onRefresh: () => void;
  onSetPreviewDoc: (doc: any) => void;
  onVerifyDoc: (docId: string) => void;
  onDownloadWord: (type: 'sop' | 'lor' | 'cv', recId: string | undefined, filename: string) => void;
  onUploadCorrected: (type: 'sop' | 'lor' | 'cv', file: File) => void;
  onRegenerateCv: () => void;
  onGrantAttempts: (type: 'cv' | 'lor') => void;
  onSaveVisaGeneralNotes: () => void;
  onOpenRejectModal: (doc: any) => void;
}

export function StudentDocumentsCatalogue({
  docCategory,
  statsUploaded,
  statsTotalExpected,
  statsNotUploaded,
  statsPending,
  statsVerified,
  statsRejected,
  docsLoading,
  docsError,
  visaLoading,
  docFilter,
  setDocFilter,
  notUploadedCatalogueItems,
  filteredDocs,
  isCustomAiCategory,
  readOnly,
  effectiveStudentId,
  student,
  docActionLoading,
  downloadingWordId,
  uploadingCorrectedId,
  regeneratingCv,
  grantingDocType,
  dossierLimits,
  visaGeneralNotes,
  setVisaGeneralNotes,
  visaGeneralNotesSaving,
  displayedChecklist,
  onRefresh,
  onSetPreviewDoc,
  onVerifyDoc,
  onDownloadWord,
  onUploadCorrected,
  onRegenerateCv,
  onGrantAttempts,
  onSaveVisaGeneralNotes,
  onOpenRejectModal,
}: StudentDocumentsCatalogueProps) {
  return (
    <>
      {/* Completeness & Progress Overview Card */}
      <DocumentProgressMetrics
        docCategory={docCategory}
        statsUploaded={statsUploaded}
        statsTotalExpected={statsTotalExpected}
        statsNotUploaded={statsNotUploaded}
        statsPending={statsPending}
        statsVerified={statsVerified}
        statsRejected={statsRejected}
        docsLoading={docsLoading}
        visaLoading={visaLoading}
        docFilter={docFilter}
        setDocFilter={setDocFilter}
        onRefresh={onRefresh}
      />

      {/* Filter Pills Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-4">
        <div className="text-xs font-bold text-gray-500">
          Showing{' '}
          <span className="text-germany-black dark:text-white font-extrabold">
            {docFilter === 'not_uploaded'
              ? `${notUploadedCatalogueItems.length} Not Uploaded Documents`
              : `${filteredDocs.length} Uploaded Documents`}
          </span>{' '}
          in{' '}
          <span className="text-germany-black dark:text-white font-extrabold">
            {docCategory === 'all'
              ? 'All Categories'
              : docCategory === 'aps'
                ? 'APS Checklist'
                : docCategory === 'cv'
                  ? 'Academic CV'
                  : docCategory === 'lor'
                    ? 'LOR Documents'
                    : 'General Documents'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-extrabold text-gray-400 mr-1">Filter by status:</span>
          {(
            [
              { id: 'all', label: 'All', count: statsTotalExpected },
              { id: 'pending', label: 'Pending Review', count: statsPending },
              { id: 'verified', label: 'Approved', count: statsVerified },
              { id: 'rejected', label: 'Needs Revision', count: statsRejected },
              { id: 'not_uploaded', label: 'Not Uploaded', count: statsNotUploaded },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setDocFilter(filter.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold capitalize cursor-pointer transition-colors ${docFilter === filter.id
                ? 'bg-germany-red text-white shadow-xs'
                : 'bg-[#EBE7E0] dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
                }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Documents List Container */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
        {docsLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-bold">
            <Loader2 className="w-6 h-6 animate-spin text-germany-red" />
            <span>Loading uploaded documents from student records...</span>
          </div>
        ) : docsError ? (
          <div className="p-6 border-2 border-dashed border-red-200 dark:border-red-900/40 rounded-2xl text-center text-red-500 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-950/20">
            {docsError}
          </div>
        ) : isCustomAiCategory ? (
          /* Uploaded Documents List for CV and LOR */
          filteredDocs.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center space-y-2 text-xs font-bold text-gray-400">
              <p>No documents found matching the &quot;{docFilter}&quot; status filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#EBE7E0] dark:divide-gray-800/80">
              {filteredDocs.map((doc) => {
                const isVerified = doc.status === 'verified';
                const isPending = doc.status === 'pending';
                const isRejected = doc.status === 'rejected';

                return (
                  <div key={doc.id} className="py-3.5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${isVerified
                            ? 'bg-emerald-100 text-emerald-700'
                            : isPending
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                            }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                              {doc.name}
                            </h4>
                            <span
                              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${isVerified
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : isPending
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                                }`}
                            >
                              {isVerified ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Approved</span>
                                </>
                              ) : isPending ? (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>Pending Verification</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Revision Needed</span>
                                </>
                              )}
                            </span>
                          </div>

                          <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                            {doc.category} • Uploaded {doc.uploadDate} • {doc.size}
                            {doc.originalFilename && (
                              <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 ml-1">
                                ({doc.originalFilename})
                              </span>
                            )}
                            {doc.verifiedAt && (
                              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold ml-1.5">
                                • Verified {doc.verifiedAt}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
                        <button
                          onClick={() => onSetPreviewDoc(doc)}
                          className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                        {!readOnly && (
                          <>
                            {doc.url && (
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open</span>
                              </a>
                            )}

                            {isVerified ? (
                              <div className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approved</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => onVerifyDoc(doc.id)}
                                disabled={docActionLoading === doc.id}
                                className="py-1.5 px-3.5 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                              >
                                {docActionLoading === doc.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                )}
                                <span>Accept</span>
                              </button>
                            )}

                            {doc.documentType === 'cv' && (
                              <>
                                <button
                                  onClick={() => {
                                    const studentName = student
                                      ? [student.firstName, student.lastName].filter(Boolean).join('_')
                                      : 'Applicant';
                                    onDownloadWord(
                                      'cv',
                                      undefined,
                                      `CV_${studentName || 'Applicant'}.docx`,
                                    );
                                  }}
                                  disabled={downloadingWordId === 'cv'}
                                  className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer shadow-xs"
                                >
                                  {downloadingWordId === 'cv' ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Download className="w-3.5 h-3.5 text-blue-600" />
                                  )}
                                  <span>Word (.docx)</span>
                                </button>

                                <label
                                  className={`py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer shadow-xs ${uploadingCorrectedId === 'cv' ? 'opacity-60 pointer-events-none' : ''
                                    }`}
                                >
                                  {uploadingCorrectedId === 'cv' ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Upload className="w-3.5 h-3.5 text-purple-600" />
                                  )}
                                  <span>Upload Corrected</span>
                                  <input
                                    type="file"
                                    accept=".pdf,.docx,.doc"
                                    className="hidden"
                                    disabled={uploadingCorrectedId === 'cv'}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        onUploadCorrected('cv', file);
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </label>

                                <button
                                  onClick={onRegenerateCv}
                                  disabled={regeneratingCv}
                                  className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer shadow-xs"
                                >
                                  {regeneratingCv ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <RefreshCw className="w-3.5 h-3.5" />
                                  )}
                                  <span>Re-generate</span>
                                </button>

                                <button
                                  onClick={() => onGrantAttempts('cv')}
                                  disabled={grantingDocType === 'cv' || Boolean(dossierLimits?.cv?.extraAttemptsGranted)}
                                  className={`py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl border transition-colors shadow-xs ${dossierLimits?.cv?.extraAttemptsGranted
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed'
                                    : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 cursor-pointer'
                                    }`}
                                >
                                  {grantingDocType === 'cv' ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                                  )}
                                  <span>+ Allot Extra</span>
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Unified Category Checklist for APS, Admission, Visa, and General */
          <div className="space-y-4">
            {/* Scope & Notes Banner for Visa */}
            {docCategory === 'visa' && (
              <div className="space-y-3 pb-2">
                <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 rounded-xl text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Preparation Scope Only:</strong> EuroBridge provides German student visa document preparation and counsellor verification assistance only. EuroBridge does NOT submit visa applications, book consular appointments, or pay official fees on behalf of students.
                  </p>
                </div>

                {!readOnly && (
                  <div className="bg-white dark:bg-[#151B27] rounded-xl p-4 border border-gray-200/80 dark:border-gray-800 space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-germany-red" />
                        <span>Overall Visa Strategy Instructions for Student</span>
                      </label>
                      <button
                        type="button"
                        onClick={onSaveVisaGeneralNotes}
                        disabled={visaGeneralNotesSaving}
                        className="px-3 py-1.5 bg-germany-red hover:bg-germany-red/90 text-white text-xs font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {visaGeneralNotesSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        <span>Save Strategy Notes</span>
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="e.g. Schedule VFS appointment under Mumbai jurisdiction as soon as admission arrives. Ensure blocked account is funded 15 days before appointment."
                      value={visaGeneralNotes}
                      onChange={(e) => setVisaGeneralNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111622] text-xs text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {displayedChecklist.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center space-y-2 text-xs font-bold text-gray-400">
                <p>No documents found matching the &quot;{docFilter}&quot; status filter in this category.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#EBE7E0] dark:divide-gray-800/80">
                {displayedChecklist.map((item) => {
                  const isUploaded = Boolean(item.uploadedDoc);
                  const doc = item.uploadedDoc;
                  const isVerified = item.status === 'verified';
                  const isPending = item.status === 'pending';
                  const isRejected = item.status === 'rejected';

                  return (
                    <div key={item.key} className="py-3.5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Left: Document Info & Status */}
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2.5 rounded-xl shrink-0 ${isVerified
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : isPending
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                : isRejected
                                  ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border border-dashed border-gray-300 dark:border-gray-700'
                              }`}
                          >
                            {isVerified ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : isPending ? (
                              <Clock className="w-4 h-4" />
                            ) : isRejected ? (
                              <AlertTriangle className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                                {item.name}
                              </h4>

                              {/* Status Badge */}
                              <span
                                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${isVerified
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                  : isPending
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                                    : isRejected
                                      ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300 dark:border-red-700'
                                      : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                  }`}
                              >
                                {isVerified ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Approved</span>
                                  </>
                                ) : isPending ? (
                                  <>
                                    <Clock className="w-3 h-3" />
                                    <span>Pending Verification</span>
                                  </>
                                ) : isRejected ? (
                                  <>
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Revision Needed</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Not Uploaded</span>
                                  </>
                                )}
                              </span>

                              {/* Section Badge */}
                              <span
                                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${docCategory === 'aps'
                                  ? 'bg-germany-red/10 text-germany-red border border-germany-red/20'
                                  : docCategory === 'visa'
                                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                                    : docCategory === 'admission'
                                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                  }`}
                              >
                                {docCategory === 'aps'
                                  ? 'APS Checklist'
                                  : docCategory === 'visa'
                                    ? 'Visa Documents'
                                    : docCategory === 'admission'
                                      ? 'Application Document'
                                      : 'General Document'}
                              </span>
                            </div>

                            {/* Details */}
                            {isUploaded && doc ? (
                              <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                {doc.category || item.category} • Uploaded {doc.uploadDate} • {doc.size}
                                {doc.originalFilename && (
                                  <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 ml-1">
                                    ({doc.originalFilename})
                                  </span>
                                )}
                                {doc.verifiedAt && (
                                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold ml-1.5">
                                    • Verified {doc.verifiedAt}
                                  </span>
                                )}
                              </p>
                            ) : (
                              <p className="text-[11px] font-bold text-gray-400 mt-0.5">
                                {item.category} • {item.description}
                                {item.required ? (
                                  <span className="text-amber-600 dark:text-amber-400 font-extrabold ml-1.5">
                                    • Mandatory Requirement
                                  </span>
                                ) : (
                                  <span className="text-gray-400 dark:text-gray-500 font-medium ml-1.5">
                                    • Optional / Conditional
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="shrink-0 self-start sm:self-center">
                          {isUploaded && doc ? (
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Preview */}
                              <button
                                type="button"
                                onClick={() => onSetPreviewDoc(doc)}
                                className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                title="Preview document"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview</span>
                              </button>

                              {!readOnly && (
                                <>
                                  {/* Open in new tab */}
                                  {doc.url && (
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="py-1.5 px-3 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:text-germany-black dark:hover:text-white bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                      title="Open original file in new tab"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                      <span>Open</span>
                                    </a>
                                  )}

                                  {/* Accept / Verify */}
                                  {isVerified ? (
                                    <div className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Approved</span>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => onVerifyDoc(doc.id)}
                                      disabled={docActionLoading === doc.id}
                                      className="py-1.5 px-3.5 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                                      title="Accept and verify document"
                                    >
                                      {docActionLoading === doc.id ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                      )}
                                      <span>Accept</span>
                                    </button>
                                  )}

                                  {/* Reject / Edit Reason */}
                                  {isRejected ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => onOpenRejectModal(doc)}
                                        disabled={docActionLoading === doc.id}
                                        className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-white dark:bg-[#151B27] border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-xs"
                                        title="Update rejection feedback"
                                      >
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span>Edit Reason</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => onOpenRejectModal(doc)}
                                        disabled={docActionLoading === doc.id}
                                        className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-red-600 hover:bg-red-700 text-white shadow-xs"
                                        title="Re-request student re-upload"
                                      >
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        <span>Request Re-upload</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => onOpenRejectModal(doc)}
                                      disabled={docActionLoading === doc.id}
                                      className="py-1.5 px-3 text-xs font-extrabold inline-flex items-center gap-1.5 rounded-xl transition-all cursor-pointer bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-xs"
                                      title="Reject document and request revision"
                                    >
                                      <AlertTriangle className="w-3.5 h-3.5" />
                                      <span>Reject</span>
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-gray-400 italic">
                              Awaiting student submission
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Rejection Note Display */}
                      {isRejected && doc?.rejectionReason && (
                        <div className="ml-10 p-3 rounded-xl bg-red-50/90 dark:bg-red-950/40 border-l-4 border-l-red-600 border-y border-r border-red-200/80 dark:border-red-900/40 text-xs text-red-900 dark:text-red-200 flex items-start gap-2.5 shadow-2xs">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-black uppercase tracking-wider text-[10px] text-red-700 dark:text-red-300">
                                Counsellor Feedback &amp; Revision Required:
                              </span>
                              {!readOnly && (
                                <button
                                  type="button"
                                  onClick={() => onOpenRejectModal(doc)}
                                  className="text-[10px] font-extrabold text-red-700 dark:text-red-300 hover:underline cursor-pointer"
                                >
                                  Edit Feedback
                                </button>
                              )}
                            </div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{doc.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
