"use client";

import React from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Building2,
  ArrowRight,
  Eye,
  Info,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { StudentDocumentItemRow } from '@/components/StudentDocumentItemRow';
import { DocumentItem, ProgrammeSopItem, STATUS_BADGES } from './types';

interface StudentAdmissionDocumentsTabProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  docLoading: boolean;
  docError: string;
  loadDocuments: () => void;
  filteredDocuments: DocumentItem[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: (docType: string) => void;
  handleDelete: (documentType: string, docTitle?: string) => void;
  uploadingType: string | null;
  deletingType: string | null;
  sopRecords: ProgrammeSopItem[];
}

export function StudentAdmissionDocumentsTab({
  categories,
  selectedCategory,
  setSelectedCategory,
  docLoading,
  docError,
  loadDocuments,
  filteredDocuments,
  fileInputRef,
  handleFileChange,
  openFileDialog,
  handleDelete,
  uploadingType,
  deletingType,
  sopRecords,
}: StudentAdmissionDocumentsTabProps) {
  return (
    <div className="space-y-6">
      {/* Synchronized Notice Banner */}
      <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-2xl flex items-start gap-3.5 text-xs text-blue-900 dark:text-blue-300">
        <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
        <div>
          <span className="font-extrabold">Unified Central Storage: </span>
          All documents uploaded here are automatically synced across your EuroBridge account. If you already uploaded your passport or transcripts in the APS Checklist, they appear here without needing a second upload.
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-white dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A2234] border border-gray-200 dark:border-gray-800'
            }`}
          >
            {cat === 'ALL' ? 'All Documents' : cat}
          </button>
        ))}
      </div>

      {/* Documents Grid / List */}
      {docLoading ? (
        <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-gray-200 dark:border-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-3" />
          <p className="text-xs font-bold text-gray-500">Loading admission checklist &amp; dossier records...</p>
        </div>
      ) : docError ? (
        <div className="p-8 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-xs font-bold text-red-600">{docError}</p>
          <button
            onClick={loadDocuments}
            className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-bold rounded-xl hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          {filteredDocuments.map((doc) => (
            <StudentDocumentItemRow
              key={doc.type}
              item={doc}
              onUpload={openFileDialog}
              onDelete={handleDelete}
              isUploading={uploadingType === doc.type}
              isDeleting={deletingType === doc.type}
            />
          ))}
        </div>
      )}

      {/* Programme-Specific SOPs Section */}
      <div className="bg-white dark:bg-[#151B27] rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-germany-gold" />
              <span>Statements of Purpose (SOP) by Programme</span>
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              Individual SOPs tailored to each shortlisted university and programme. Each document undergoes dedicated counsellor review.
            </p>
          </div>
          <Link
            href="/dashboard/student/documents"
            className="text-xs font-extrabold text-germany-red hover:underline flex items-center gap-1"
          >
            <span>Open SOP Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {sopRecords.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 dark:bg-[#111622] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-500">
            No shortlisted programmes found. Once your counsellor shortlists programmes, individual SOP records will appear here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sopRecords.map((sop) => {
              const badge = STATUS_BADGES[sop.status] || STATUS_BADGES.NOT_GENERATED;
              return (
                <div
                  key={sop.recommendationId}
                  className="p-4 bg-gray-50 dark:bg-[#1A2234] rounded-2xl border border-gray-200/60 dark:border-gray-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                      {sop.degree || 'Master of Science'}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badge.style}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 dark:text-white leading-tight">
                      {sop.programName}
                    </h4>
                    <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span>{sop.universityName}</span>
                    </div>
                  </div>

                  {sop.originalFilename && (
                    <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate">
                      {sop.originalFilename}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-gray-200/60 dark:border-gray-800">
                    <div className="text-[10px] text-gray-400">
                      {sop.deadline ? `Deadline: ${sop.deadline}` : 'Intake: Winter Semester'}
                    </div>
                    {sop.url ? (
                      <a
                        href={sop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 text-xs font-extrabold rounded-lg hover:bg-gray-100 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </a>
                    ) : (
                      <Link
                        href="/dashboard/student/documents"
                        className="px-3 py-1.5 bg-germany-red text-white text-xs font-extrabold rounded-lg hover:bg-germany-red/90 flex items-center gap-1"
                      >
                        <FileCheck className="w-3 h-3" />
                        <span>Generate</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
