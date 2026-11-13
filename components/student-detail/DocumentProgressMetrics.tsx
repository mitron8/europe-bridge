'use client';

import React from 'react';
import { Target, RefreshCw } from 'lucide-react';

export interface DocumentProgressMetricsProps {
  docCategory: string;
  statsUploaded: number;
  statsTotalExpected: number;
  statsNotUploaded: number;
  statsPending: number;
  statsVerified: number;
  statsRejected: number;
  docsLoading: boolean;
  visaLoading: boolean;
  docFilter: string;
  setDocFilter: (filter: string) => void;
  onRefresh: () => void;
}

export function DocumentProgressMetrics({
  docCategory,
  statsUploaded,
  statsTotalExpected,
  statsNotUploaded,
  statsPending,
  statsVerified,
  statsRejected,
  docsLoading,
  visaLoading,
  docFilter,
  setDocFilter,
  onRefresh,
}: DocumentProgressMetricsProps) {
  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-germany-red" />
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Document Completeness &amp; Progress (
            {docCategory === 'all'
              ? 'All Categories'
              : docCategory === 'aps'
                ? 'APS Checklist'
                : docCategory === 'cv'
                  ? 'Academic CV'
                  : docCategory === 'lor'
                    ? 'LOR Documents'
                    : 'General Documents'}
            )
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-extrabold text-gray-400">
            {statsUploaded} of {statsTotalExpected} Expected Uploaded
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={docsLoading || visaLoading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-germany-red dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            title="Sync latest document status and checklist"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${docsLoading || visaLoading ? 'animate-spin text-germany-red' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* 6 Metric Overview Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <button
          type="button"
          onClick={() => setDocFilter('all')}
          className="p-3 rounded-xl bg-gray-50 dark:bg-[#151B27] border border-gray-200/70 dark:border-gray-800/70 text-left hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-extrabold uppercase text-gray-400 block">Total Expected</span>
          <span className="text-lg font-black text-germany-black dark:text-white mt-0.5 block">{statsTotalExpected}</span>
          <span className="text-[10px] font-bold text-gray-400">Catalogue items</span>
        </button>

        <button
          type="button"
          onClick={() => setDocFilter('all')}
          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${docFilter === 'all'
            ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
            : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-blue-200'
            }`}
        >
          <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">Uploaded</span>
          <span className="text-lg font-black text-blue-700 dark:text-blue-300 mt-0.5 block">{statsUploaded}</span>
          <span className="text-[10px] font-bold text-gray-400">Files received</span>
        </button>

        <button
          type="button"
          onClick={() => setDocFilter('not_uploaded')}
          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${docFilter === 'not_uploaded'
            ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800'
            : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-purple-200'
            }`}
        >
          <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-400 block">Not Uploaded</span>
          <span className="text-lg font-black text-purple-700 dark:text-purple-300 mt-0.5 block">{statsNotUploaded}</span>
          <span className="text-[10px] font-bold text-gray-400">Awaiting student</span>
        </button>

        <button
          type="button"
          onClick={() => setDocFilter('pending')}
          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${docFilter === 'pending'
            ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
            : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-amber-200'
            }`}
        >
          <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400 block">Pending Review</span>
          <span className="text-lg font-black text-amber-700 dark:text-amber-300 mt-0.5 block">{statsPending}</span>
          <span className="text-[10px] font-bold text-gray-400">Action required</span>
        </button>

        <button
          type="button"
          onClick={() => setDocFilter('verified')}
          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${docFilter === 'verified'
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
            : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-emerald-200'
            }`}
        >
          <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block">Verified</span>
          <span className="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-0.5 block">{statsVerified}</span>
          <span className="text-[10px] font-bold text-gray-400">Accepted &amp; ready</span>
        </button>

        <button
          type="button"
          onClick={() => setDocFilter('rejected')}
          className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${docFilter === 'rejected'
            ? 'bg-red-50/70 dark:bg-red-950/30 border-red-300 dark:border-red-800'
            : 'bg-gray-50 dark:bg-[#151B27] border-gray-200/70 dark:border-gray-800/70 hover:border-red-200'
            }`}
        >
          <span className="text-[10px] font-extrabold uppercase text-red-600 dark:text-red-400 block">Needs Revision</span>
          <span className="text-lg font-black text-red-700 dark:text-red-300 mt-0.5 block">{statsRejected}</span>
          <span className="text-[10px] font-bold text-gray-400">Rejected / feedback</span>
        </button>
      </div>
    </div>
  );
}

