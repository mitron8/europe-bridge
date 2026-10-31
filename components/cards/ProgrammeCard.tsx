import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';

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
  universityType = 'University',
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
  programUrlLabel = 'Programme Website',
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
    ? 'bg-blue-50/20 dark:bg-[#0E121A] border-blue-400 dark:border-blue-700 ring-1 ring-blue-400/20'
    : isCurated
    ? 'bg-white dark:bg-[#0E121A] border-emerald-500/60 dark:border-emerald-500/40 ring-1 ring-emerald-500/20'
    : 'bg-white dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800/80 hover:border-germany-red/30';

  const badgeStyle =
    eligibilityStyle ||
    (eligibilityStatus && MATCH_ELIGIBILITY_STYLES[eligibilityStatus]) ||
    'bg-gray-100 text-gray-600 border-gray-200';

  const badgeLabel =
    eligibilityLabel ||
    (eligibilityStatus && MATCH_ELIGIBILITY_LABELS[eligibilityStatus]) ||
    eligibilityStatus;

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 shadow-xs ${cardBorderClass} ${className}`}>
      {/* Top: University, Program & Status Badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5 min-w-0 flex-1">
          {rank !== undefined && (
            <span className="text-[10px] font-black uppercase tracking-wider text-germany-red">
              #{rank} • {universityType}
            </span>
          )}
          <h4 className="font-display text-sm sm:text-base text-germany-black dark:text-white leading-tight truncate" title={universityName}>
            {universityName}
          </h4>
          <p className="text-xs font-extrabold text-gray-600 dark:text-gray-300 leading-snug" title={programName}>
            {programName}
          </p>
          {degree && <p className="text-[10px] text-gray-400 font-medium">{degree}</p>}
        </div>

        <div className="text-right shrink-0 flex flex-col items-end gap-1">
          {badgeLabel && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
              {badgeLabel}
            </span>
          )}
          {isShortlisted && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
              ★ Shortlisted
            </span>
          )}
          {score !== undefined && (
            <span className="text-[10px] font-black text-gray-400">
              {scoreLabel ? `${scoreLabel}: ${score}` : `Score: ${score}`}
            </span>
          )}
        </div>
      </div>

      {/* Location, Tuition, Language & Deadline 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-[#F4F1EA]/70 dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800/80">
        <div>
          <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Location</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">📍 {location || 'NA'}</span>
        </div>
        <div>
          <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Tuition</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">{tuition || 'NA'}</span>
        </div>
        <div>
          <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Language</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">🌐 {language || 'NA'}</span>
        </div>
        <div>
          <span className="text-gray-400 font-extrabold block text-[10px] uppercase">Deadline</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">⏰ {deadline || 'NA'}</span>
        </div>
      </div>

      {/* Why it matched */}
      {matchedReasons && matchedReasons.length > 0 && (
        <div className="pt-2 border-t border-[#EBE7E0] dark:border-gray-800/80">
          <p className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 mb-0.5">✓ Why it matched</p>
          <ul className="space-y-0.5">
            {matchedReasons.slice(0, 2).map((reason, i) => (
              <li key={i} className="text-[10px] text-gray-600 dark:text-gray-300 truncate">• {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirement gaps */}
      {requirementGaps && requirementGaps.length > 0 && (
        <div>
          <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 mb-0.5">⚠ Requirement Gaps</p>
          <ul className="space-y-0.5">
            {requirementGaps.slice(0, 2).map((gap, i) => (
              <li key={i} className="text-[10px] text-gray-500 dark:text-gray-400 truncate">• {gap}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Advisor notes */}
      {notes && (
        <div className="p-2 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 font-medium italic">
          &quot;{notes}&quot;
        </div>
      )}

      {/* GPA Fallback notice */}
      {gpaFallbackUsed && (
        <p className="text-[10px] text-gray-400 italic">GPA: platform fallback (≤ 3.0) applied</p>
      )}

      {/* Action Footer */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {programUrl ? (
            <a
              href={programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-germany-red hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> {programUrlLabel}
            </a>
          ) : (
            <span />
          )}

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleteDisabled ?? isLocked}
              title={deleteTitle}
              className={`p-1.5 rounded-lg transition-colors ${
                (deleteDisabled ?? isLocked)
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {actionSlot && <div className="flex items-center gap-2">{actionSlot}</div>}
      </div>
    </div>
  );
}

