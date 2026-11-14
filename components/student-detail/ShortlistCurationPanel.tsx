'use client';

import React from 'react';
import {
  Award,
  Lock,
  Bookmark,
  Loader2,
  Trash2,
  Check
} from 'lucide-react';

export interface ShortlistCurationPanelProps {
  showCurationPanel: boolean;
  curatedProgrammeIds: string[];
  studentSubscription: any;
  studentShortlistCount: number;
  readOnly?: boolean;
  isMatchingLocked: boolean;
  savingCuration: boolean;
  matchingResults: any[];
  curatedProgrammes: any[];
  shortlistedProgIds: Set<string>;
  togglingShortlist: string | null;
  onAutoFillTopMatches: () => void;
  onToggleShortlist: (prog: any) => void;
  onToggleCuratedProgramme: (progId: string) => void;
}

export function ShortlistCurationPanel({
  showCurationPanel,
  curatedProgrammeIds,
  studentSubscription,
  studentShortlistCount,
  readOnly,
  isMatchingLocked,
  savingCuration,
  matchingResults,
  curatedProgrammes,
  shortlistedProgIds,
  togglingShortlist,
  onAutoFillTopMatches,
  onToggleShortlist,
  onToggleCuratedProgramme,
}: ShortlistCurationPanelProps) {
  if (!showCurationPanel) return null;

  return (
    <div className="w-full xl:w-80 shrink-0 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 p-4 shadow-xs space-y-4 xl:sticky xl:top-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-1.5">
            <span>Student Display Curation</span>
          </h4>
          <p className="text-[10px] font-bold text-gray-400">
            Programmes visible to student
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-germany-black text-white dark:bg-white dark:text-germany-black">
            {curatedProgrammeIds.length} / {studentSubscription?.maxDisplayCount || 5}
          </span>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
            ★ {studentShortlistCount} / {studentSubscription?.maxShortlistCount || 3} shortlisted
          </span>
        </div>
      </div>

      {/* Auto-fill Button */}
      {!readOnly && (
        <button
          type="button"
          onClick={onAutoFillTopMatches}
          disabled={savingCuration || isMatchingLocked || !studentSubscription || matchingResults.length === 0}
          className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-extrabold rounded-xl transition-colors ${isMatchingLocked
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
            : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          title={
            isMatchingLocked
              ? 'Shortlist and curation are locked. Unlock to modify.'
              : 'Fill student display with the highest ranked eligible programmes up to plan limit'
          }
        >
          {isMatchingLocked ? (
            <Lock className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <Award className="w-3.5 h-3.5 text-germany-gold" />
          )}
          <span>{isMatchingLocked ? 'Auto-fill Locked' : 'Auto-fill Top Matches'}</span>
        </button>
      )}

      {/* Curated Items List */}
      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
        {curatedProgrammeIds.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-400 space-y-1 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="font-bold text-gray-500 dark:text-gray-400">No programmes curated</p>
            <p className="text-[11px]">Click &quot;Add to Display&quot; on any match or use auto-fill above.</p>
          </div>
        ) : (
          curatedProgrammeIds.map((progId, idx) => {
            const progIdStr = String(progId);
            const matchItem = matchingResults.find(
              (r) => String(r.programmeId || (r as any).programmeid || r.id) === progIdStr
            );
            const curatedItem = curatedProgrammes.find(
              (cp) => String(cp.programmeId || (cp as any).programmeid) === progIdStr
            );
            const isShortlisted = shortlistedProgIds.has(progIdStr);
            const uniName = matchItem?.universityName || curatedItem?.universityName || 'University';
            const progName = matchItem?.programName || curatedItem?.programName || `Programme ID: ${progId}`;
            const maxShortlist = studentSubscription?.maxShortlistCount || 3;
            const isShortlistFull = studentShortlistCount >= maxShortlist;

            return (
              <div
                key={progId}
                className="p-2.5 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-gray-200/60 dark:border-gray-800/60 flex items-start justify-between gap-2 text-xs"
              >
                <div className="min-w-0 space-y-0.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-germany-red shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="font-extrabold text-germany-black dark:text-white whitespace-normal break-words leading-tight block">
                      {uniName}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 whitespace-normal break-words leading-snug">
                    {progName}
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {isShortlisted && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                        ★ Shortlisted
                      </span>
                    )}
                    {matchItem?.relevanceScore && (
                      <span className="text-[9px] font-bold text-gray-400">
                        Score: {matchItem.relevanceScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                  {/* Shortlist Toggle Button on the Student Display Curation card */}
                  {readOnly ? (
                    isShortlisted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                        <Bookmark className="w-2.5 h-2.5 fill-current text-blue-600" />
                        <span>Shortlisted</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold py-1 px-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700">
                        <span>Not Shortlisted</span>
                      </span>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onToggleShortlist({
                          programmeId: Number(progId),
                          universityName: uniName,
                          programName: progName,
                          degree: matchItem?.degree || curatedItem?.degree || 'Master',
                          city: matchItem?.city || curatedItem?.city || 'Germany',
                          country: matchItem?.country || curatedItem?.country || 'Germany',
                          tuitionPerSemester: matchItem?.tuitionPerSemester || curatedItem?.tuitionPerSemester || 'Free / None',
                          nonEuDeadline: matchItem?.nonEuDeadline || curatedItem?.nonEuDeadline || 'NA',
                          universityType: matchItem?.universityType || curatedItem?.universityType || 'Public University',
                          relevanceScore: matchItem?.relevanceScore || 90,
                        })
                      }
                      disabled={togglingShortlist === String(progId) || isMatchingLocked || (!isShortlisted && isShortlistFull)}
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold py-1 px-2 rounded-lg transition-colors border ${isMatchingLocked
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                        : isShortlisted
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 cursor-pointer'
                          : isShortlistFull
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50'
                            : 'bg-white dark:bg-[#151B27] text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-800 hover:border-blue-400 hover:text-blue-600 cursor-pointer'
                        }`}
                      title={
                        isMatchingLocked
                          ? 'Shortlist is locked. Unlock to modify.'
                          : isShortlisted
                            ? 'Click to remove from student shortlist'
                            : isShortlistFull
                              ? `Student shortlist limit reached (${studentShortlistCount}/${maxShortlist} max for ${studentSubscription?.planId || 'Plan'}). Remove an existing shortlisted programme first.`
                              : 'Add to student shortlist'
                      }
                    >
                      {togglingShortlist === String(progId) ? (
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                      ) : isMatchingLocked ? (
                        <Lock className="w-2.5 h-2.5 text-gray-400" />
                      ) : (
                        <Bookmark className={`w-2.5 h-2.5 ${isShortlisted ? 'fill-current text-blue-600' : ''}`} />
                      )}
                      <span>
                        {isMatchingLocked && isShortlisted
                          ? 'Shortlisted (Locked)'
                          : isMatchingLocked
                            ? 'Locked'
                            : isShortlisted
                              ? 'Shortlisted'
                              : isShortlistFull
                                ? 'Limit Reached'
                                : 'Shortlist'}
                      </span>
                    </button>
                  )}

                  {/* Remove from Curation / Display Button */}
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => onToggleCuratedProgramme(progId)}
                      disabled={isMatchingLocked}
                      title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Remove from student display (frees up a display slot)'}
                      className={`p-1 rounded-lg transition-colors shrink-0 ${isMatchingLocked
                        ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer'
                        }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer status */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-bold">
        {savingCuration ? (
          <span className="flex items-center gap-1 text-amber-600">
            <Loader2 className="w-3 h-3 animate-spin" /> Saving changes…
          </span>
        ) : (
          <span className="flex items-center gap-1 text-emerald-600">
            <Check className="w-3 h-3" /> Synced to student
          </span>
        )}
        <span>Max {studentSubscription?.maxDisplayCount || 5}</span>
      </div>
    </div>
  );
}
