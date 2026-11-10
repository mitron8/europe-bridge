"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  ArrowRight,
  Compass,
  Layers,
  ShieldCheck,
  ArrowLeft,
  ListFilter,
  Headphones,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export type StageGateType =
  | 'shortlist_matching_needed'
  | 'shortlist_plan_needed'
  | 'documents_plan_needed'
  | 'documents_lock_needed'
  | 'aps_plan_needed'
  | 'aps_lock_needed';

interface StudentStageGateProps {
  type: StageGateType;
  userName?: string;
}

export default function StudentStageGate({ type, userName }: StudentStageGateProps) {
  const storeUser = useAppStore((state) => state.user);
  const resolvedUserName =
    userName ||
    storeUser?.firstName ||
    storeUser?.first_name ||
    'Ankur';

  const configs: Record<
    StageGateType,
    {
      badge: string;
      titlePrefix: string;
      highlight: string;
      titleSuffix: string;
      description: string;
      primaryButtonText: string;
      primaryButtonHref: string;
      primaryIcon: React.ElementType;
      secondaryButtonText: string;
      secondaryButtonHref: string;
      secondaryIcon: React.ElementType;
    }
  > = {
    documents_lock_needed: {
      badge: 'Shortlist Finalization Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'Document Hub',
      titleSuffix: ' unlocks once your shortlist is finalized!',
      description:
        'Your assigned counsellor is currently reviewing and curating your target German universities. Once your university shortlist is finalized and locked, Document Hub unlocks with the exact requirements for your selected programmes.',
      primaryButtonText: 'View Your Shortlist (Step 3)',
      primaryButtonHref: '/dashboard/student/shortlist',
      primaryIcon: ListFilter,
      secondaryButtonText: 'Contact Advisor / Help',
      secondaryButtonHref: '/dashboard/student/help',
      secondaryIcon: Headphones,
    },
    documents_plan_needed: {
      badge: 'Admission Plan Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'Document Hub',
      titleSuffix: ' unlocks once you activate a plan!',
      description:
        'An active admission plan is required to upload, verify, and format your application documents for German university submissions.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/pricing',
      primaryIcon: Layers,
      secondaryButtonText: 'Contact Advisor / Help',
      secondaryButtonHref: '/dashboard/student/help',
      secondaryIcon: Headphones,
    },
    aps_lock_needed: {
      badge: 'Shortlist Finalization Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'APS Checklist',
      titleSuffix: ' unlocks once your shortlist is finalized!',
      description:
        'The mandatory APS India Verification Checklist unlocks once your counsellor reviews and finalizes your university shortlist, ensuring all your degree certificates and transcripts align with your target universities.',
      primaryButtonText: 'View Your Shortlist (Step 3)',
      primaryButtonHref: '/dashboard/student/shortlist',
      primaryIcon: ListFilter,
      secondaryButtonText: 'Contact Advisor / Help',
      secondaryButtonHref: '/dashboard/student/help',
      secondaryIcon: Headphones,
    },
    aps_plan_needed: {
      badge: 'Admission Plan Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'APS Checklist',
      titleSuffix: ' unlocks once you activate a plan!',
      description:
        'An active admission plan is required to access the step-by-step APS India document verification checklist.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/pricing',
      primaryIcon: Layers,
      secondaryButtonText: 'Contact Advisor / Help',
      secondaryButtonHref: '/dashboard/student/help',
      secondaryIcon: Headphones,
    },
    shortlist_matching_needed: {
      badge: 'Step 2: Matching Engine Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'University Shortlist',
      titleSuffix: ' unlocks after running matching!',
      description:
        'Your personalized university shortlist is curated from your matching results. Run the AI Matching Engine to evaluate your academic profile across German universities before shortlisting.',
      primaryButtonText: 'Go to Matching Engine (Step 2)',
      primaryButtonHref: '/dashboard/student/matching',
      primaryIcon: Compass,
      secondaryButtonText: 'Back to Dashboard',
      secondaryButtonHref: '/dashboard/student',
      secondaryIcon: ArrowLeft,
    },
    shortlist_plan_needed: {
      badge: 'Admission Plan Required',
      titlePrefix: `Hi ${resolvedUserName}, `,
      highlight: 'University Shortlist',
      titleSuffix: ' unlocks once you activate a plan!',
      description:
        'To curate, save, and confirm your university applications with your assigned Germany advisor, please select and activate an admission plan.',
      primaryButtonText: 'View Admission Plans',
      primaryButtonHref: '/pricing',
      primaryIcon: Layers,
      secondaryButtonText: 'Review Matching Results',
      secondaryButtonHref: '/dashboard/student/matching',
      secondaryIcon: ArrowLeft,
    },
  };

  const config = configs[type] || configs.documents_lock_needed;
  const PrimaryIcon = config.primaryIcon;
  const SecondaryIcon = config.secondaryIcon;

  return (
    <div className="w-full max-w-[1040px] mx-auto my-4 sm:my-8 px-2 sm:px-4">
      <div className="relative bg-white dark:bg-[#111622] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-none overflow-hidden p-6 sm:p-10 lg:p-12">
        {/* German Flag Accent Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex overflow-hidden">
          <div className="w-[30%] bg-[#1A1A1A]" />
          <div className="w-[35%] bg-germany-red" />
          <div className="w-[35%] bg-germany-gold" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 pt-2">
          {/* Left Column */}
          <div className="flex-1 space-y-5 text-left w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF1F2] dark:bg-rose-950/40 text-[#BE123C] dark:text-rose-300 border border-[#FFE4E6] dark:border-rose-900/40 rounded-full text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-[#BE123C] dark:text-rose-300 shrink-0" />
              <span>{config.badge}</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-gray-900 dark:text-white leading-[1.25] tracking-tight">
              {config.titlePrefix}
              <span className="text-germany-red">{config.highlight}</span>
              {config.titleSuffix}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal sm:font-medium leading-relaxed max-w-xl">
              {config.description}
            </p>

            {/* Guidance / Protection Box */}
            <div className="bg-[#FFF5F5] dark:bg-rose-950/20 border border-[#FFE4E6] dark:border-rose-900/30 rounded-2xl p-4 flex items-start gap-3.5 max-w-xl">
              <div className="w-9 h-9 rounded-full bg-[#FFE4E6] dark:bg-rose-900/40 text-[#BE123C] dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white">
                  Progress Step Order &amp; Quality Protection
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  EuropeBridge gates each step to ensure your German admission documents and application fees are never wasted on unverified or mismatched university programmes.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={config.primaryButtonHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-germany-red hover:bg-[#A91D1D] active:scale-[0.99] shadow-sm hover:shadow transition-all"
              >
                <PrimaryIcon className="w-4 h-4" />
                <span>{config.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href={config.secondaryButtonHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60 active:scale-[0.99] transition-all"
              >
                <SecondaryIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>{config.secondaryButtonText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column Illustration */}
          <div className="w-full lg:w-[420px] shrink-0 flex items-center justify-center relative select-none">
            <Image
              src="/images/document-hub-locked.png"
              alt="Document Hub Locked"
              width={420}
              height={420}
              className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-auto object-contain drop-shadow-sm pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
