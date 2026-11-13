'use client';

import React from 'react';
import {
  FileText,
  ArrowLeft,
  Layers,
  Save,
  Loader2,
  BookOpen,
  Info,
} from 'lucide-react';

export interface SopHeaderBannerProps {
  onBack?: () => void;
  remainingAttempts: number;
  maxGenerations: number;
  isSaving: boolean;
  isGenerating: boolean;
  handleSaveDraft: () => void;
  activeTab: 'form' | 'documents';
  setActiveTab: (tab: 'form' | 'documents') => void;
  programmesCount: number;
  statusMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
}

export function SopHeaderBanner({
  onBack,
  remainingAttempts,
  maxGenerations,
  isSaving,
  isGenerating,
  handleSaveDraft,
  activeTab,
  setActiveTab,
  programmesCount,
  statusMessage,
}: SopHeaderBannerProps) {
  return (
    <>
      {/* Top Header & Navigation Banner */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative shadow-sm">
        {/* German Tricolor Header Line */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                  title="Back to Document Hub"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
                <FileText className="w-3.5 h-3.5 text-germany-gold" />
                <span>AI SOP Generator</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                German University Standard
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black dark:text-white">
              Statement of Purpose (SOP / Motivationsschreiben)
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 max-w-2xl">
              Course-specific motivation essays demonstrating Modulhandbuch curriculum alignment. Profile data is automatically synchronized, and every generated SOP is reviewed and verified by your assigned EuroBridge counsellor.
            </p>
          </div>

          {/* Top Quota & Actions */}
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              <Layers className="w-3.5 h-3.5 text-germany-red" />
              <span>{remainingAttempts} of {maxGenerations} generation chances left</span>
            </div>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving || isGenerating}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-extrabold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-germany-red" /> : <Save className="w-4 h-4 text-gray-500" />}
              <span>Save &amp; Sync Draft</span>
            </button>
          </div>
        </div>

        {/* Primary Tabs: Form vs Generated Documents */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'form'
                ? 'bg-germany-black text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>SOP Questionnaire (3-Step Wizard)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'documents'
                ? 'bg-germany-black text-white dark:bg-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-germany-red" />
            <span>Generated SOP Documents ({programmesCount})</span>
            {isGenerating && (
              <span className="w-2 h-2 rounded-full bg-germany-red animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
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

    </>
  );
}
