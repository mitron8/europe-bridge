import React from 'react';
import { ExternalLink, Trash2, MapPin, GraduationCap, Calendar, Globe } from 'lucide-react';

export interface ProgrammeCardProps {
  rank?: number | string;
  universityType?: string;
  universityName: string;
  programName: string;
  degree?: string;
  eligibilityStatus?: string;
  eligibilityLabel?: string;
  eligibilityStyle?: string;
  isShortlisted?: boolean;
  score?: number | string;
  scoreLabel?: string;
  location: string;
  tuition: string;
  language: string;
  deadline: string;
  matchedReasons?: string[];
  requirementGaps?: string[];
  notes?: string;
  gpaFallbackUsed?: boolean;
  programUrl?: string | null;
  programUrlLabel?: string;
  isLocked?: boolean;
  isCurated?: boolean;
  onDelete?: () => void;
  deleteTitle?: string;
  deleteDisabled?: boolean;
  actionSlot?: React.ReactNode;
  className?: string;
}

export const MATCH_ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
  CONDITIONAL: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
  NEEDS_REVIEW: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
  NOT_ELIGIBLE: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60',
};

export const MATCH_ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

export function ProgrammeCard({
  rank,
  universityType = 'Public',
  universityName,
  programName,
  degree = 'Master',
  eligibilityStatus,
  eligibilityLabel,
  eligibilityStyle,
  isShortlisted,
  score,
  scoreLabel,
  location,
  tuition,
  language,
  deadline,
  matchedReasons,
  requirementGaps,
  notes,
  gpaFallbackUsed,
  programUrl,
  programUrlLabel = 'Website',
  isLocked,
  isCurated,
  onDelete,
  deleteTitle = 'Dismiss / remove programme',
  deleteDisabled,
  actionSlot,
  className = '',
}: ProgrammeCardProps) {
  const cardBorderClass = isLocked
    ? 'bg-gray-50/70 dark:bg-[#0E121A]/60 border-gray-200/50 dark:border-gray-800/50 opacity-80'
    : isShortlisted
    ? 'bg-blue-50/15 dark:bg-[#0E121A] border-blue-300 dark:border-blue-700'
    : isCurated
    ? 'bg-white dark:bg-[#0E121A] border-emerald-500/50 dark:border-emerald-500/40'
    : 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700';

  const badgeStyle =
    eligibilityStyle ||
    (eligibilityStatus && MATCH_ELIGIBILITY_STYLES[eligibilityStatus]) ||
    'bg-gray-100 text-gray-600 border-gray-200';

  const badgeLabel =
    eligibilityLabel ||
    (eligibilityStatus && MATCH_ELIGIBILITY_LABELS[eligibilityStatus]) ||
    eligibilityStatus;

  return (
    <div className={`p-4 sm:p-4.5 rounded-2xl border transition-all space-y-2 shadow-xs ${cardBorderClass} ${className}`}>
      {/* Top Rank & Type */}
      <div className="flex items-center justify-between text-xs">
        <div className="text-[11px] font-extrabold text-germany-red flex items-center gap-1.5">
          {rank !== undefined && <span>#{rank}</span>}
          {rank !== undefined && universityType && <span className="text-gray-300 dark:text-gray-600">•</span>}
          {universityType && <span className="text-gray-500 font-semibold">{universityType}</span>}
        </div>
      </div>

      {/* University Name + Status Badges Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h4 className="font-display text-sm sm:text-base font-bold text-germany-black dark:text-white leading-tight whitespace-normal break-words" title={universityName}>
          {universityName}
        </h4>
        <div className="flex items-center gap-2 shrink-0">
          {badgeLabel && (
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
              {badgeLabel}
            </span>
          )}
          {isShortlisted && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              ★ Shortlisted
            </span>
          )}
          {score !== undefined && (
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {scoreLabel ? `${scoreLabel}: ${score}` : `Score: ${score}`}
            </span>
          )}
        </div>
      </div>

      {/* Program Name & Degree */}
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {programName} {degree ? `• ${degree}` : ''}
      </p>

      {/* Horizontal Metadata Row: Location, Tuition, Deadline, Language */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80 gap-3 flex-wrap text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{location || 'NA'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{tuition || 'Free / None (public university)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{deadline || 'NA'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{language || 'NA'}</span>
          </div>
        </div>

        {/* Action buttons (Website, Dismiss, Action slot like Curation) */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {programUrl && (
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-germany-red hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> {programUrlLabel}
            </a>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleteDisabled ?? isLocked}
              title={deleteTitle}
              className={`p-1 rounded-lg transition-colors ${(deleteDisabled ?? isLocked) ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer'}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {actionSlot}
        </div>
      </div>

      {/* Why it matched / Requirement gaps (if present) */}
      {matchedReasons && matchedReasons.length > 0 && (
        <div className="pt-1.5 text-[10px] text-gray-500 dark:text-gray-400">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Why it matched: </span>
          <span>{matchedReasons.slice(0, 2).join(' • ')}</span>
        </div>
      )}
      {requirementGaps && requirementGaps.length > 0 && (
        <div className="pt-0.5 text-[10px] text-amber-700 dark:text-amber-400">
          <span className="font-bold">⚠ Requirement gaps: </span>
          <span>{requirementGaps.slice(0, 2).join(' • ')}</span>
        </div>
      )}
      {notes && (
        <div className="p-2 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 font-medium italic">
          &quot;{notes}&quot;
        </div>
      )}
      {gpaFallbackUsed && (
        <p className="text-[10px] text-gray-400 italic">GPA: platform fallback applied</p>
      )}
    </div>
  );
}

