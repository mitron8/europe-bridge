"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Coins,
  Compass,
  FileText,
  GraduationCap,
  Layers,
  Loader2,
  Lock,
  Search,
  Star,
} from 'lucide-react';

export interface JourneyStep {
  label: string;
  desc: string;
  status: string;
  icon: any;
  href: string;
  isPurple?: boolean;
  isReview?: boolean;
}

export interface MatchedProgramItem {
  id: string | number;
  programmeId?: string | number;
  universityName: string;
  programName: string;
  universityType?: string;
  country?: string;
  tuition: string;
  deadline: string;
  status: string;
  logo: string;
}

interface StudentWelcomeBannerProps {
  studentFirstName?: string;
}

export function StudentWelcomeBanner({ studentFirstName }: StudentWelcomeBannerProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between min-h-[130px] sm:min-h-[140px] gap-4">
      <div className="space-y-1.5 z-10 max-w-sm">
        <h1 className="text-lg sm:text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">
          Welcome back{studentFirstName ? `, ${studentFirstName}` : ''}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          Continue your Germany journey. You're making great progress!
        </p>
      </div>
      <div className="shrink-0 h-28 sm:h-36 w-full sm:w-72 relative rounded-xl sm:rounded-none sm:rounded-r-2xl overflow-hidden sm:overflow-visible sm:-mr-6 sm:-my-6">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-[#111622] to-transparent z-10 hidden sm:block pointer-events-none" />
        <Image
          src="/images/germany-header.jpg"
          alt="Germany Reichstag"
          fill
          className="object-cover object-center sm:object-right rounded-xl sm:rounded-r-2xl"
          priority
        />
      </div>
    </div>
  );
}

interface StudentJourneyRoadmapCardProps {
  completionPercentage: number;
  journeySteps: JourneyStep[];
}

export function StudentJourneyRoadmapCard({
  completionPercentage,
  journeySteps,
}: StudentJourneyRoadmapCardProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Your Germany Journey Roadmap</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Track and complete each step to reach your study goal.</p>
        </div>
        <span className="text-xs font-bold text-[#EF2D48] bg-[#FDE2E4] dark:bg-[#34161E] border border-[#F9C9CE] dark:border-[#4A1D26] px-3 py-1 rounded-full">
          {completionPercentage}% Completed
        </span>
      </div>

      {/* Stepper horizontal track: swipeable on mobile */}
      <div className="relative pb-2 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[340px] sm:min-w-0 relative">
          {/* Connecting line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200 dark:bg-gray-800 z-0">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(10, completionPercentage))}%` }}
            />
          </div>

          <div className="grid grid-cols-5 relative z-10 gap-1">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isPurple = step.isPurple;
              const isReview = step.isReview;

              return (
                <Link
                  key={step.label}
                  href={step.href}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isPurple
                        ? 'bg-purple-600 text-white shadow-xs'
                        : isReview
                        ? 'bg-white dark:bg-[#111622] border-2 border-[#EF2D48] text-[#EF2D48]'
                        : 'bg-white dark:bg-[#111622] border-2 border-gray-300 dark:border-gray-700 text-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>

                  <span className="text-xs font-bold text-gray-900 dark:text-white mt-2 group-hover:text-[#EF2D48] transition-colors">
                    {step.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[70px] sm:max-w-[90px]">
                    {step.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StudentStatMetricsGridProps {
  gpaNum: number | null;
  gpaTier: string;
  hasNotRun: boolean;
  matchedUnisCount: number;
  hasDocumentSummary: boolean;
  approvedCount: number;
  totalChecklistCount: number;
  targetIntakeDisplay: string;
  targetDegreeCourseDisplay: string;
}

export function StudentStatMetricsGrid({
  gpaNum,
  gpaTier,
  hasNotRun,
  matchedUnisCount,
  hasDocumentSummary,
  approvedCount,
  totalChecklistCount,
  targetIntakeDisplay,
  targetDegreeCourseDisplay,
}: StudentStatMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {/* German GPA */}
      <div className="bg-white dark:bg-[#111622] rounded-xl sm:rounded-2xl border border-gray-200/90 dark:border-gray-800 p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
        <div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">German GPA</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
            {gpaNum !== null ? gpaNum.toFixed(2) : 'NA'}
          </div>
        </div>
        <div className="mt-2.5">
          <span
            className={`inline-block px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold ${
              gpaNum !== null
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
            }`}
          >
            {gpaTier}
          </span>
        </div>
      </div>

      {/* Matched Programs */}
      <div className="bg-white dark:bg-[#111622] rounded-xl sm:rounded-2xl border border-gray-200/90 dark:border-gray-800 p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
        <div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Matched Programs</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
            {hasNotRun ? 'NA' : matchedUnisCount}
          </div>
        </div>
        <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5 truncate">
          {hasNotRun ? 'Algorithm not yet run' : 'Public Universities'}
        </p>
      </div>

      {/* Approved Documents */}
      <div className="bg-white dark:bg-[#111622] rounded-xl sm:rounded-2xl border border-gray-200/90 dark:border-gray-800 p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
        <div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Approved Documents</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
            {hasDocumentSummary ? `${approvedCount} / ${totalChecklistCount}` : 'NA'}
          </div>
        </div>
        <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5 truncate">
          Unique APS & Degree
        </p>
      </div>

      {/* Target Intake */}
      <div className="bg-white dark:bg-[#111622] rounded-xl sm:rounded-2xl border border-gray-200/90 dark:border-gray-800 p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
        <div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Target Intake</div>
          <div className="text-lg sm:text-xl font-bold font-display text-gray-900 dark:text-white mt-1 truncate">
            {targetIntakeDisplay}
          </div>
        </div>
        <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5 truncate" title={targetDegreeCourseDisplay}>
          {targetDegreeCourseDisplay}
        </p>
      </div>
    </div>
  );
}

interface StudentMatchedUniversitiesCardProps {
  hasNotRun: boolean;
  isMatchingRunning: boolean;
  matchedUnisCount: number;
  displayMatches: MatchedProgramItem[];
  shortlistedIds: Set<string>;
  shortlistingProgId: string | null;
  matchingStatus?: string;
  totalMatchedCount?: number;
  onToggleShortlist: (prog: MatchedProgramItem) => void;
}

export function StudentMatchedUniversitiesCard({
  hasNotRun,
  isMatchingRunning,
  matchedUnisCount,
  displayMatches,
  shortlistedIds,
  shortlistingProgId,
  matchingStatus,
  totalMatchedCount,
  onToggleShortlist,
}: StudentMatchedUniversitiesCardProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">AI-Matched Universities</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Universities tailored to your profile and language proficiency.</p>
        </div>
        <Link
          href="/dashboard/student/matching"
          className="text-xs font-bold text-[#EF2D48] hover:text-[#DC2626] flex items-center gap-1 transition-colors"
        >
          <span>{hasNotRun ? 'Go to Matching Engine' : `View All (${matchedUnisCount})`}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {hasNotRun ? (
        <div className="p-8 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 text-center flex flex-col items-center justify-center space-y-3 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-[#E63946] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div className="max-w-md space-y-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Matching Engine Yet to Be Run</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              You haven't run the AI Matching Engine yet. Run the matching algorithm based on your GPA and target degree to discover eligible public German university programs.
            </p>
          </div>
          <Link
            href="/dashboard/student/matching"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E63946] hover:bg-[#D62839] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Run AI Matching Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : isMatchingRunning ? (
        <div className="p-8 rounded-xl border border-dashed border-blue-200 dark:border-blue-800/40 text-center flex flex-col items-center justify-center space-y-3 bg-blue-50/40 dark:bg-blue-950/20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
          <div className="max-w-md space-y-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Matching Engine Running</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              The matching engine is currently evaluating your profile against German university admissions requirements. This page will update automatically.
            </p>
          </div>
        </div>
      ) : displayMatches.length > 0 ? (
        <div className="space-y-3">
          {displayMatches.map((prog) => {
            const progId = String(prog.programmeId || prog.id);
            const isShortlisted = shortlistedIds.has(progId);
            const isProcessing = shortlistingProgId === progId;

            return (
              <div
                key={prog.id}
                className="p-4 rounded-xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#131B2E] hover:border-gray-300 dark:hover:border-gray-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* University Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-gray-700 flex items-center justify-center p-2 shrink-0">
                    <Image
                      src={prog.logo}
                      alt={prog.universityName}
                      width={48}
                      height={48}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white whitespace-normal break-words leading-snug">
                        {prog.universityName}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 shrink-0">
                        {prog.universityType || 'Public'} · {prog.country || 'Germany'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 whitespace-normal break-words leading-snug">
                      {prog.programName}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500 dark:text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-gray-400" />
                        Tuition: <strong className="text-gray-700 dark:text-gray-200 font-semibold">{prog.tuition}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Deadline: <strong className="text-gray-700 dark:text-gray-200 font-semibold">{prog.deadline}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center md:flex-col items-end gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                    Eligible
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleShortlist(prog)}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Star className={`w-3.5 h-3.5 ${isShortlisted ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                    )}
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : matchingStatus === 'SUBSCRIPTION_REQUIRED' ? (
        <div className="p-8 rounded-xl border border-dashed border-amber-200 dark:border-amber-800/60 text-center flex flex-col items-center justify-center space-y-3 bg-amber-50/40 dark:bg-amber-950/20">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div className="max-w-md space-y-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Plan Activation Required</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Matching completed with {totalMatchedCount || 'multiple'} eligible programs found! Activate an admission plan to unlock your matched university results and shortlist.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E63946] hover:bg-[#D62839] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>View Plans & Unlock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 text-center flex flex-col items-center justify-center space-y-3 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div className="max-w-md space-y-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">No Matched Programs Found</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              No programs matched your exact profile criteria. Try updating your target course, degree level, or language scores.
            </p>
          </div>
          <Link
            href="/dashboard/student/complete-profile"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span>Update Academic Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
}
