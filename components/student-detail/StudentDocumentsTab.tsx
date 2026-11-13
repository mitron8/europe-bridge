'use client';

import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { StudentSopWorkspace } from './StudentSopWorkspace';
import { StudentCvLorWorkspace } from './StudentCvLorWorkspace';
import { StudentDocumentsCatalogue } from './StudentDocumentsCatalogue';

export interface StudentDocumentsTabProps {
  docActionFeedback: { type: 'success' | 'error'; message: string } | null;
  setDocActionFeedback: (val: { type: 'success' | 'error'; message: string } | null) => void;
  docCategory: 'all' | 'aps' | 'admission' | 'visa' | 'general' | 'cv' | 'sop' | 'lor';
  setDocCategory: (val: 'all' | 'aps' | 'admission' | 'visa' | 'general' | 'cv' | 'sop' | 'lor') => void;
  docFilter: string;
  setDocFilter: (val: string) => void;
  apsUploadedCount: number;
  admissionUploadedCount: number;
  visaUploadedCount: number;
  generalUploadedCount: number;
  cvUploadedCount: number;
  sopUploadedCount: number;
  sopPendingCount: number;
  lorUploadedCount: number;
  fetchStudentSops: () => void;

  // SOP Workspace props
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
  onRegenerateSops: (recIds?: string[]) => void;
  onGrantAttempts: (type: 'sop' | 'cv' | 'lor') => void;
  onVerifyDoc: (docId: string, status?: 'approved' | 'rejected') => void;
  onDownloadWord: (type: 'sop' | 'lor' | 'cv', recId: string | undefined, filename: string) => void;
  onUploadCorrected: (type: 'sop' | 'lor' | 'cv', file: File, recId?: string) => void;

  // CV/LOR Workspace props
  regeneratingCv: boolean;
  onRegenerateCv: () => void;
  dossierLimits: any;
  onRefreshLimits: () => void;

  // Catalogue props
  statsUploaded: number;
  statsTotalExpected: number;
  statsNotUploaded: number;
  statsPending: number;
  statsVerified: number;
  statsRejected: number;
  docsLoading: boolean;
  docsError: string | null;
  visaLoading: boolean;
  notUploadedCatalogueItems: any[];
  filteredDocs: any[];
  isCustomAiCategory: boolean;
  effectiveStudentId: string;
  student: any;
  visaGeneralNotes: string;
  setVisaGeneralNotes: (val: string) => void;
  visaGeneralNotesSaving: boolean;
  displayedChecklist: any[];
  onRefreshCatalogue: () => void;
  onSetPreviewDoc: (doc: any) => void;
  onSaveVisaGeneralNotes: () => void;
  onOpenRejectModal: (doc: any) => void;
}

export function StudentDocumentsTab({
  docActionFeedback,
  setDocActionFeedback,
  docCategory,
  setDocCategory,
  docFilter,
  setDocFilter,
  apsUploadedCount,
  admissionUploadedCount,
  visaUploadedCount,
  generalUploadedCount,
  cvUploadedCount,
  sopUploadedCount,
  sopPendingCount,
  lorUploadedCount,
  fetchStudentSops,
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
  onRegenerateSops,
  onGrantAttempts,
  onVerifyDoc,
  onDownloadWord,
  onUploadCorrected,
  regeneratingCv,
  onRegenerateCv,
  dossierLimits,
  onRefreshLimits,
  statsUploaded,
  statsTotalExpected,
  statsNotUploaded,
  statsPending,
  statsVerified,
  statsRejected,
  docsLoading,
  docsError,
  visaLoading,
  notUploadedCatalogueItems,
  filteredDocs,
  isCustomAiCategory,
  effectiveStudentId,
  student,
  visaGeneralNotes,
  setVisaGeneralNotes,
  visaGeneralNotesSaving,
  displayedChecklist,
  onRefreshCatalogue,
  onSetPreviewDoc,
  onSaveVisaGeneralNotes,
  onOpenRejectModal,
}: StudentDocumentsTabProps) {
  return (
    <div className="space-y-4">
      {/* Inline Action Feedback Banner */}
      {docActionFeedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between border shadow-xs ${docActionFeedback.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/60'
            : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800/60'
            }`}
        >
          <div className="flex items-center gap-2.5">
            {docActionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            )}
            <span>{docActionFeedback.message}</span>
          </div>
          <button
            onClick={() => setDocActionFeedback(null)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hub Header & Sub-Category Selector */}
      <div className="bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base text-germany-black dark:text-white">Uploaded Documents Verification Hub</h3>
            <p className="text-xs font-bold text-gray-500">
              Review, verify, accept, or request revisions on student documents with real-time feedback.
            </p>
          </div>
        </div>

        {/* 4 Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-100 dark:border-gray-800/70">
          <button
            onClick={() => {
              setDocCategory('aps');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${docCategory === 'aps'
              ? 'bg-germany-red text-white shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            APS Documents ({apsUploadedCount})
          </button>

          <button
            onClick={() => {
              setDocCategory('admission');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${docCategory === 'admission'
              ? 'bg-germany-red text-white shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            Application Documents ({admissionUploadedCount})
          </button>

          <button
            onClick={() => {
              setDocCategory('visa');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${docCategory === 'visa'
              ? 'bg-germany-red text-white shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            Visa Documents ({visaUploadedCount})
          </button>

          <button
            onClick={() => {
              setDocCategory('general');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${docCategory === 'general'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            General Documents ({generalUploadedCount})
          </button>

          <button
            onClick={() => {
              setDocCategory('cv');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all inline-flex items-center gap-1.5 ${docCategory === 'cv'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            <span>Academic CV ({cvUploadedCount})</span>
            {cvUploadedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                {cvUploadedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setDocCategory('sop');
              fetchStudentSops();
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all inline-flex items-center gap-1.5 ${docCategory === 'sop'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            <span>SOP Documents ({sopUploadedCount})</span>
            {sopPendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-900">
                {sopPendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setDocCategory('lor');
              if (docFilter === 'not_uploaded') setDocFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all inline-flex items-center gap-1.5 ${docCategory === 'lor'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'bg-[#EBE7E0]/70 dark:bg-[#151B27] text-gray-700 dark:text-gray-300 hover:bg-[#DDD8CF] dark:hover:bg-[#1E2638]'
              }`}
          >
            <span>LOR Documents ({lorUploadedCount})</span>
            {lorUploadedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                {lorUploadedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {docCategory === 'sop' ? (
        <StudentSopWorkspace
          readOnly={readOnly}
          studentSops={studentSops}
          selectedSopRecIds={selectedSopRecIds}
          setSelectedSopRecIds={setSelectedSopRecIds}
          sopsLoading={sopsLoading}
          sopsError={sopsError}
          grantingDocType={grantingDocType}
          grantStatusMessage={grantStatusMessage}
          regeneratingSops={regeneratingSops}
          docActionLoading={docActionLoading}
          downloadingWordId={downloadingWordId}
          uploadingCorrectedId={uploadingCorrectedId}
          onFetchStudentSops={fetchStudentSops}
          onRegenerateSops={onRegenerateSops}
          onGrantAttempts={onGrantAttempts}
          onVerifyDoc={onVerifyDoc}
          onDownloadWord={onDownloadWord}
          onUploadCorrected={onUploadCorrected}
        />
      ) : (
        <>
          <StudentCvLorWorkspace
            docCategory={docCategory}
            readOnly={readOnly}
            regeneratingCv={regeneratingCv}
            onRegenerateCv={onRegenerateCv}
            grantingDocType={grantingDocType}
            dossierLimits={dossierLimits}
            onGrantAttempts={onGrantAttempts}
            onRefreshLimits={onRefreshLimits}
          />

          <StudentDocumentsCatalogue
            docCategory={docCategory}
            statsUploaded={statsUploaded}
            statsTotalExpected={statsTotalExpected}
            statsNotUploaded={statsNotUploaded}
            statsPending={statsPending}
            statsVerified={statsVerified}
            statsRejected={statsRejected}
            docsLoading={docsLoading}
            docsError={docsError}
            visaLoading={visaLoading}
            docFilter={docFilter}
            setDocFilter={setDocFilter}
            notUploadedCatalogueItems={notUploadedCatalogueItems}
            filteredDocs={filteredDocs}
            isCustomAiCategory={isCustomAiCategory}
            readOnly={readOnly}
            effectiveStudentId={effectiveStudentId}
            student={student}
            docActionLoading={docActionLoading}
            downloadingWordId={downloadingWordId}
            uploadingCorrectedId={uploadingCorrectedId}
            regeneratingCv={regeneratingCv}
            grantingDocType={grantingDocType}
            dossierLimits={dossierLimits}
            visaGeneralNotes={visaGeneralNotes}
            setVisaGeneralNotes={setVisaGeneralNotes}
            visaGeneralNotesSaving={visaGeneralNotesSaving}
            displayedChecklist={displayedChecklist}
            onRefresh={onRefreshCatalogue}
            onSetPreviewDoc={onSetPreviewDoc}
            onVerifyDoc={onVerifyDoc}
            onDownloadWord={onDownloadWord}
            onUploadCorrected={onUploadCorrected}
            onRegenerateCv={onRegenerateCv}
            onGrantAttempts={onGrantAttempts}
            onSaveVisaGeneralNotes={onSaveVisaGeneralNotes}
            onOpenRejectModal={onOpenRejectModal}
          />
        </>
      )}
    </div>
  );
}

