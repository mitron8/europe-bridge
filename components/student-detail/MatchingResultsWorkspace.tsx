'use client';

import React from 'react';
import {
  Compass,
  Building2,
  Search,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Lock,
  Loader2
} from 'lucide-react';
import { ProgrammeCard } from '../cards/ProgrammeCard';

export interface MatchingResultsWorkspaceProps {
  loadingMatching: boolean;
  runningMatching: boolean;
  matchingRun: any;
  matchingResults: any[];
  matchSearchQuery: string;
  setMatchSearchQuery: (val: string) => void;
  matchUniFilter: string;
  setMatchUniFilter: (val: string) => void;
  matchPage: number;
  setMatchPage: React.Dispatch<React.SetStateAction<number>>;
  totalMatchPages: number;
  filteredMatchingResults: any[];
  paginatedMatchingResults: any[];
  matchedUniversities: Array<{ name: string; count: number }>;
  curatedProgrammeIds: string[];
  shortlistedProgIds: Set<string>;
  studentSubscription: any;
  showCurationPanel: boolean;
  readOnly?: boolean;
  isMatchingLocked: boolean;
  savingCuration: boolean;
  onDeleteMatchedProgramme: (progIdStr: string) => void;
  onToggleCuratedProgramme: (progIdStr: string) => void;
  onSwitchToCatalogue: () => void;
}

export function MatchingResultsWorkspace({
  loadingMatching,
  runningMatching,
  matchingRun,
  matchingResults,
  matchSearchQuery,
  setMatchSearchQuery,
  matchUniFilter,
  setMatchUniFilter,
  matchPage,
  setMatchPage,
  totalMatchPages,
  filteredMatchingResults,
  paginatedMatchingResults,
  matchedUniversities,
  curatedProgrammeIds,
  shortlistedProgIds,
  studentSubscription,
  showCurationPanel,
  readOnly,
  isMatchingLocked,
  savingCuration,
  onDeleteMatchedProgramme,
  onToggleCuratedProgramme,
  onSwitchToCatalogue,
}: MatchingResultsWorkspaceProps) {
  return (
    <div className="space-y-4">
      {/* Loading State */}
      {(loadingMatching || runningMatching || matchingRun?.status === 'running' || matchingRun?.status === 'pending') && (
        <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-3 animate-pulse">
          <Loader2 className="w-7 h-7 text-germany-red mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">
            {runningMatching || matchingRun?.status === 'running' || matchingRun?.status === 'pending'
              ? 'Running matching engine across all German university programmes for this student…'
              : 'Loading matching results…'}
          </p>
        </div>
      )}

      {/* No Run Yet */}
      {!loadingMatching && !runningMatching && matchingRun?.status !== 'running' && matchingRun?.status !== 'pending' && !matchingRun && (
        <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-2">
          <Compass className="w-8 h-8 text-gray-300 mx-auto" />
          <h4 className="font-display text-sm text-germany-black dark:text-white">No Matching Run Yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click &quot;Run Matching Engine&quot; above to evaluate this student&apos;s qualifications against German university programmes.
          </p>
        </div>
      )}

      {/* Completed with 0 Results */}
      {!loadingMatching && !runningMatching && matchingRun?.status === 'completed' && matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length === 0 && (
        <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-3">
          <Compass className="w-8 h-8 text-germany-red mx-auto" />
          <h4 className="font-display text-sm text-germany-black dark:text-white">Profile Under Manual Advising Review</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            No direct automated matches passed the strict criteria. Switch to &quot;Other Universities / Catalogue&quot; to handpick specialized universities or pathway programs.
          </p>
          <button
            type="button"
            onClick={onSwitchToCatalogue}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Explore University Catalogue</span>
          </button>
        </div>
      )}

      {/* Matching Results Present */}
      {!loadingMatching && !runningMatching && matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length > 0 && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs">
            {/* Search input */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                value={matchSearchQuery}
                onChange={(e) => {
                  setMatchSearchQuery(e.target.value);
                  setMatchPage(1);
                }}
                placeholder="Search by programme, university, city, language..."
                className="w-full pl-8 pr-8 py-2 bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-germany-red"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
              {matchSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setMatchSearchQuery('');
                    setMatchPage(1);
                  }}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* University Filter Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={matchUniFilter}
                onChange={(e) => {
                  setMatchUniFilter(e.target.value);
                  setMatchPage(1);
                }}
                className="text-xs font-extrabold bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-germany-red max-w-[340px] sm:max-w-md cursor-pointer whitespace-normal break-words leading-snug"
              >
                <option value="ALL">
                  All Universities ({matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length})
                </option>
                {matchedUniversities.map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name} ({u.count})
                  </option>
                ))}
              </select>

              {(matchSearchQuery || matchUniFilter !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setMatchSearchQuery('');
                    setMatchUniFilter('ALL');
                    setMatchPage(1);
                  }}
                  className="text-xs font-bold text-germany-red hover:underline whitespace-nowrap cursor-pointer px-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Empty Filter State */}
          {filteredMatchingResults.length === 0 ? (
            <div className="p-8 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 text-center space-y-2">
              <Filter className="w-8 h-8 text-gray-300 mx-auto" />
              <h4 className="font-display text-sm text-germany-black dark:text-white">No Matching Programmes Found</h4>
              <p className="text-xs text-gray-500">
                No programmes match your current filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMatchSearchQuery('');
                  setMatchUniFilter('ALL');
                  setMatchPage(1);
                }}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-germany-red hover:underline pt-2 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Paginated Grid */}
              <div className={`grid grid-cols-1 ${showCurationPanel ? 'md:grid-cols-1 xl:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
                {paginatedMatchingResults.map((r: any) => {
                  const progIdStr = String(r.programmeId || r.programmeid || r.id);
                  const isCurated = curatedProgrammeIds.includes(progIdStr);
                  const isShortlisted = shortlistedProgIds.has(progIdStr);
                  const maxDisplay = studentSubscription?.maxDisplayCount || 5;
                  const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

                  return (
                    <ProgrammeCard
                      key={r.id}
                      rank={r.rank}
                      universityType={r.universityType ?? 'University'}
                      universityName={r.universityName}
                      programName={r.programName}
                      degree={r.degree}
                      eligibilityStatus={r.eligibilityStatus}
                      isShortlisted={isShortlisted}
                      score={r.relevanceScore}
                      location={[r.city, r.country].filter(Boolean).join(', ') || 'NA'}
                      tuition={r.tuitionPerSemester ?? 'NA'}
                      language={r.language ?? 'NA'}
                      deadline={r.nonEuDeadline ?? 'NA'}
                      matchedReasons={r.matchedReasons}
                      requirementGaps={r.requirementGaps}
                      gpaFallbackUsed={r.gpaFallbackUsed}
                      programUrl={r.programUrl}
                      isLocked={readOnly || isMatchingLocked}
                      isCurated={isCurated}
                      onDelete={readOnly ? undefined : () => onDeleteMatchedProgramme(progIdStr)}
                      deleteTitle={readOnly ? 'Supervisor View (Read-Only)' : isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Dismiss / remove programme from matches'}
                      deleteDisabled={readOnly || isMatchingLocked}
                      actionSlot={
                        readOnly ? (
                          isCurated ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>On Student Display</span>
                            </span>
                          ) : null
                        ) : (
                          <button
                            type="button"
                            onClick={() => onToggleCuratedProgramme(progIdStr)}
                            disabled={savingCuration || isMatchingLocked || (!isCurated && (!studentSubscription || isDisplayFull))}
                            className={`inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl transition-colors border ${isMatchingLocked
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                              : isCurated
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 cursor-pointer'
                                : 'bg-germany-black dark:bg-white text-white dark:text-germany-black border-transparent hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
                              }`}
                            title={
                              isMatchingLocked
                                ? 'Shortlist and curation are locked. Unlock to modify.'
                                : !studentSubscription
                                  ? 'Student must have an active subscription'
                                  : !isCurated && isDisplayFull
                                    ? `Plan display limit reached (${maxDisplay})`
                                    : isCurated
                                      ? 'Remove from student display'
                                      : 'Add to student display'
                            }
                          >
                            {isMatchingLocked ? (
                              <>
                                <Lock className="w-3 h-3 text-gray-400" />
                                <span>Locked</span>
                              </>
                            ) : isCurated ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>On Student Display</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add to Display</span>
                              </>
                            )}
                          </button>
                        )
                      }
                    />
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalMatchPages > 1 && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/80 dark:border-gray-800/80">
                  <button
                    type="button"
                    onClick={() => setMatchPage((p) => Math.max(1, p - 1))}
                    disabled={matchPage <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151B27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <span>
                      Page <strong className="text-germany-black dark:text-white">{matchPage}</strong> of{' '}
                      <strong className="text-germany-black dark:text-white">{totalMatchPages}</strong>
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span>({filteredMatchingResults.length} total)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMatchPage((p) => Math.min(totalMatchPages, p + 1))}
                    disabled={matchPage >= totalMatchPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-gray-800/80 text-xs font-extrabold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151B27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
