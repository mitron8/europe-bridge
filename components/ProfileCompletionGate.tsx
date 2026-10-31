"use client";

import React from 'react';
import Link from 'next/link';
import {
  UserCheck,
  ArrowRight,
  Clock,
  ShieldCheck,
  GraduationCap,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface ProfileCompletionGateProps {
  sectionTitle: string;
  completionPercentage: number;
  userName?: string;
}

export default function ProfileCompletionGate({
  sectionTitle,
  completionPercentage,
  userName
}: ProfileCompletionGateProps) {
  const remaining = 100 - completionPercentage;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8">
      <div className="neu-card p-6 sm:p-10 bg-white dark:bg-[#111622] relative overflow-hidden shadow-[12px_12px_32px_rgba(210,205,195,0.6)] dark:shadow-none border border-[#EBE7E0]/80 dark:border-gray-800 space-y-6">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        {/* Top Badge & Mascot Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/15 dark:bg-amber-950/40 border border-germany-gold/40 dark:border-amber-800/60 rounded-full font-extrabold text-germany-black dark:text-white dark:text-amber-300 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-germany-red" />
              <span>Personalization Required</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display text-germany-black dark:text-white leading-tight">
              {userName ? `Hi ${userName}, let's unlock your ${sectionTitle}!` : `Let's unlock your ${sectionTitle}!`}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
              To give you accurate, tailored recommendations for German universities, APS verification, and visa checklists, EuropeBridge requires your academic background and degree preferences first.
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-germany-red/10 dark:bg-red-950/40 border border-germany-red/30 dark:border-red-900/50 flex items-center justify-center text-germany-red dark:text-red-400 shadow-sm">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>

        {/* Live Progress Bar Container */}
        <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-germany-black dark:text-white dark:text-gray-200">
            <span>Current Profile Completion</span>
            <span className="text-germany-red font-black">
              {completionPercentage}% ({remaining}% remaining)
            </span>
          </div>

          <div className="w-full h-3 bg-[#EBE7E0] dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-germany-red via-germany-gold to-amber-500 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(completionPercentage, 5)}%` }}
            ></div>
          </div>
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
            Once your profile reaches 100%, this page will automatically display your live personalized data.
          </p>
        </div>

        {/* 3 Sweet Key Assurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 dark:bg-[#151B27] border border-[#EBE7E0]/70 dark:border-gray-800">
            <Clock className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black dark:text-white">Takes ~3 Minutes</p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Quick 6-step guided form with auto-save.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 dark:bg-[#151B27] border border-[#EBE7E0]/70 dark:border-gray-800">
            <GraduationCap className="w-4 h-4 text-germany-gold shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black dark:text-white">German GPA Conversion</p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Calculates official Bavarian formula scores.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 dark:bg-[#151B27] border border-[#EBE7E0]/70 dark:border-gray-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black dark:text-white">100% Confidential</p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Only used for your study abroad advisory.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/dashboard/student/complete-profile"
            className="w-full sm:w-auto neu-btn-primary py-3.5 px-6 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Complete My Profile ({remaining}% Left)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard/student"
            className="w-full sm:w-auto neu-btn py-3 px-5 text-xs font-extrabold text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
