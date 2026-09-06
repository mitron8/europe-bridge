"use client";

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
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
      <div className="neu-card p-6 sm:p-10 bg-white relative overflow-hidden shadow-[12px_12px_32px_rgba(210,205,195,0.6)] border border-[#EBE7E0]/80 space-y-6">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        {/* Top Badge & Mascot Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/15 border border-germany-gold/40 rounded-full font-extrabold text-germany-black text-xs">
              <Sparkles className="w-3.5 h-3.5 text-germany-red animate-pulse" />
              <span>Personalization Required</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display text-germany-black leading-tight">
              {userName ? `Hi ${userName}, let's unlock your ${sectionTitle}!` : `Let's unlock your ${sectionTitle}!`}
            </h2>

            <p className="text-xs sm:text-sm font-bold text-gray-500 leading-relaxed max-w-xl">
              To give you accurate, tailored recommendations for German universities, APS verification, and visa checklists, EuropeBridge requires your academic background and degree preferences first.
            </p>
          </div>

          <div className="shrink-0">
            <img
              src="/doodles/curious (2).png"
              alt="EuropeBridge Mascot"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Live Progress Bar Container */}
        <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-germany-black">
            <span>Current Profile Completion</span>
            <span className="text-germany-red font-black">
              {completionPercentage}% ({remaining}% remaining)
            </span>
          </div>

          <div className="w-full h-3 bg-[#EBE7E0] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-germany-red via-germany-gold to-amber-500 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(completionPercentage, 5)}%` }}
            ></div>
          </div>
          <p className="text-[11px] font-bold text-gray-400">
            Once your profile reaches 100%, this page will automatically display your live personalized data.
          </p>
        </div>

        {/* 3 Sweet Key Assurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 border border-[#EBE7E0]/70">
            <Clock className="w-4 h-4 text-germany-red shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black">Takes ~3 Minutes</p>
              <p className="text-[10px] font-bold text-gray-500">Quick 6-step guided form with auto-save.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 border border-[#EBE7E0]/70">
            <GraduationCap className="w-4 h-4 text-germany-gold shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black">German GPA Conversion</p>
              <p className="text-[10px] font-bold text-gray-500">Calculates official Bavarian formula scores.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F1EA]/60 border border-[#EBE7E0]/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-extrabold text-germany-black">100% Confidential</p>
              <p className="text-[10px] font-bold text-gray-500">Only used for your study abroad advisory.</p>
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
            className="w-full sm:w-auto neu-btn py-3 px-5 text-xs font-extrabold text-gray-600 hover:text-germany-black flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
