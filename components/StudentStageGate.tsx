"use client";

import React from 'react';
import Link from 'next/link';
import {
  Lock,
  ArrowRight,
  Compass,
  Bookmark,
  Layers,
  FileText,
  CheckCircle2,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';

export type StageGateType = 'shortlist_matching_needed' | 'shortlist_plan_needed' | 'documents_plan_needed' | 'documents_lock_needed' | 'aps_plan_needed' | 'aps_lock_needed';

interface StudentStageGateProps {
  type: StageGateType;
  userName?: string;
}

export default function StudentStageGate({ type, userName }: StudentStageGateProps) {
  const configs: Record<StageGateType, {
    badge: string;
    icon: any;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  }> = {
    shortlist_matching_needed: {
      badge: 'Step 2: Matching Engine Required',
      icon: Compass,
      title: userName ? `Hi ${userName}, run matching to unlock your shortlist!` : 'Run Matching Engine to Unlock Your Shortlist',
      description: 'Your personalized university shortlist is curated from your matching results. Run the AI Matching Engine to evaluate your academic profile across German universities before shortlisting.',
      primaryButtonText: 'Go to Matching Engine (Step 2)',
      primaryButtonHref: '/dashboard/student/matching',
      secondaryButtonText: 'Back to Dashboard',
      secondaryButtonHref: '/dashboard/student',
    },
    shortlist_plan_needed: {
      badge: 'Admission Plan Required',
      icon: Layers,
      title: userName ? `Hi ${userName}, activate a plan to unlock your shortlist!` : 'Activate a Plan to Unlock Your Shortlist',
      description: 'To curate, save, and confirm your university applications with your assigned Germany advisor, please select and activate an admission plan.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/dashboard/student/services',
      secondaryButtonText: 'Review Matching Results',
      secondaryButtonHref: '/dashboard/student/matching',
    },
    documents_plan_needed: {
      badge: 'Admission Plan Required',
      icon: Layers,
      title: userName ? `Hi ${userName}, activate a plan to unlock Document Hub!` : 'Activate a Plan to Access Document Hub',
      description: 'An active admission plan is required to upload, verify, and format your application documents for German university submissions.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/dashboard/student/services',
      secondaryButtonText: 'Back to Dashboard',
      secondaryButtonHref: '/dashboard/student',
    },
    documents_lock_needed: {
      badge: 'Shortlist Selection Required',
      icon: Lock,
      title: userName ? `Hi ${userName}, select universities to unlock Document Hub!` : 'Select Universities to Unlock Document Hub',
      description: 'Document Hub unlocks once you add universities to your shortlist or your assigned counsellor finalizes your university shortlist. This ensures you only upload documents required for your target German universities.',
      primaryButtonText: 'Go to University Matching (Step 2)',
      primaryButtonHref: '/dashboard/student/matching',
      secondaryButtonText: 'View Your Shortlist (Step 3)',
      secondaryButtonHref: '/dashboard/student/shortlist',
    },
    aps_plan_needed: {
      badge: 'Admission Plan Required',
      icon: Layers,
      title: userName ? `Hi ${userName}, activate a plan to access APS Checklist!` : 'Activate a Plan to Access APS Checklist',
      description: 'An active admission plan is required to access the step-by-step APS India document verification checklist.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/dashboard/student/services',
      secondaryButtonText: 'Back to Dashboard',
      secondaryButtonHref: '/dashboard/student',
    },
    aps_lock_needed: {
      badge: 'Shortlist Selection Required',
      icon: Lock,
      title: userName ? `Hi ${userName}, select universities to unlock APS Checklist!` : 'Select Universities to Unlock APS Checklist',
      description: 'The mandatory APS India Verification Checklist unlocks once you select universities for your shortlist or your counsellor reviews and finalizes your university shortlist.',
      primaryButtonText: 'Go to University Matching (Step 2)',
      primaryButtonHref: '/dashboard/student/matching',
      secondaryButtonText: 'View Your Shortlist (Step 3)',
      secondaryButtonHref: '/dashboard/student/shortlist',
    },
  };

  const config = configs[type] || configs.shortlist_plan_needed;
  const IconComponent = config.icon;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8">
      <div className="neu-card p-6 sm:p-10 bg-white dark:bg-[#111622] relative overflow-hidden shadow-[12px_12px_32px_rgba(210,205,195,0.6)] dark:shadow-none border border-[#EBE7E0]/80 dark:border-gray-800 space-y-6">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        {/* Top Badge & Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full font-extrabold text-amber-900 dark:text-amber-300 text-xs">
              <Lock className="w-3.5 h-3.5 text-germany-red" />
              <span>{config.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display text-germany-black dark:text-white leading-tight">
              {config.title}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
              {config.description}
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-germany-red/10 border border-germany-red/30 flex items-center justify-center text-germany-red shadow-sm">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>

        {/* Gate Guidance Box */}
        <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#0E121A] border border-[#EBE7E0] dark:border-gray-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-germany-black dark:text-white">
            <ShieldAlert className="w-4 h-4 text-germany-red" />
            <span>Progress Step Order &amp; Quality Protection</span>
          </div>
          <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
            EuropeBridge gates each step to ensure your German admission documents and application fees are never wasted on unverified or mismatched university programmes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href={config.primaryButtonHref}
            className="w-full sm:w-auto neu-btn-primary py-3.5 px-6 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>{config.primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={config.secondaryButtonHref}
            className="w-full sm:w-auto neu-btn py-3 px-5 text-xs font-extrabold text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{config.secondaryButtonText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

