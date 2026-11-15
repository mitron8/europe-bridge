'use client';

import React, { useState, useMemo } from 'react';
import {
  Compass,
  Lock,
  Unlock,
  RefreshCw,
  Loader2,
  AlertCircle,
  Building2,
  Laptop,
  Star,
} from 'lucide-react';
import { MatchingResultsWorkspace } from './MatchingResultsWorkspace';
import { UniversityCatalogueWorkspace } from './UniversityCatalogueWorkspace';
import { ShortlistCurationPanel } from './ShortlistCurationPanel';
import type { UniversityMatch } from '../StudentDetailModal';

const MATCH_PAGE_SIZE = 12;

export interface StudentUniversitiesTabProps {
  student: any;
  effectiveStudentId: string;
  readOnly?: boolean;
  matchingRun: any;
  matchingResults: any[];
  studentSubscription: any;
  isMatchingLocked: boolean;
  curatedProgrammeIds: string[];
  curatedProgrammes: any[];
  studentShortlistCount: number;
  loadingMatching: boolean;
  runningMatching: boolean;
  matchingError: string | null;
  savingCuration: boolean;
  togglingLock: boolean;
  togglingShortlist: string | null;
  showCurationPanel: boolean;
  setShowCurationPanel: (val: boolean) => void;
  onRunMatching: () => void;
  onToggleLock: () => void;
  onFetchMatchingResults: () => void;
  onToggleCuratedProgramme: (programmeIdStr: string) => void;
  onToggleShortlist: (programme: any) => void;
  onAutoFillTopMatches: () => void;
  onDeleteMatchedProgramme: (progId: string) => void;
  onSaveProgrammeToNotepad: (prog: any) => void;

  // Catalogue & manual
  isManualUniEntry: boolean;
  setIsManualUniEntry: (val: boolean) => void;
  newUniName: string;
  setNewUniName: (val: string) => void;
  newUniProgram: string;
  setNewUniProgram: (val: string) => void;
  newUniLocation: string;
  setNewUniLocation: (val: string) => void;
  recommendNote: string;
  setRecommendNote: (val: string) => void;
  recommendSuccessMsg: string | null;
  setRecommendSuccessMsg: (val: string | null) => void;
  savingRecommendation: boolean;
  onSaveRecommendation: (e: React.FormEvent) => void;
  onDeleteRecommendation: (id: string) => void;
  universities: UniversityMatch[];
  selectedUniversity: { name: string; city?: string; country?: string } | null;
  setSelectedUniversity: (u: any) => void;
  uniSearchQuery: string;
  setUniSearchQuery: (val: string) => void;
  uniSearchResults: Array<{ name: string; city?: string; country?: string }>;
  setUniSearchResults: (val: any[]) => void;
  loadingUniSearch: boolean;
  showUniDropdown: boolean;
  setShowUniDropdown: (val: boolean) => void;
  uniProgrammes: any[];
  setUniProgrammes: (val: any[]) => void;
  loadingProgrammes: boolean;
  programmesError: string | null;
  progFilterText: string;
  setProgFilterText: (val: string) => void;
  progFilterOnlyRelevant: boolean;
  setProgFilterOnlyRelevant: (val: boolean) => void;
  setSelectedProg: (val: any) => void;
  uniMeta: any;
  onSelectUniversity: (u: any) => void;
}

export function StudentUniversitiesTab({
  student,
  effectiveStudentId,
  readOnly,
  matchingRun,
  matchingResults,
  studentSubscription,
  isMatchingLocked,
  curatedProgrammeIds,
  curatedProgrammes,
  studentShortlistCount,
  loadingMatching,
  runningMatching,
  matchingError,
  savingCuration,
  togglingLock,
  togglingShortlist,
  showCurationPanel,
  setShowCurationPanel,
  onRunMatching,
  onToggleLock,
  onFetchMatchingResults,
  onToggleCuratedProgramme,
  onToggleShortlist,
  onAutoFillTopMatches,
  onDeleteMatchedProgramme,
  onSaveProgrammeToNotepad,
  isManualUniEntry,
  setIsManualUniEntry,
  newUniName,
  setNewUniName,
  newUniProgram,
  setNewUniProgram,
  newUniLocation,
  setNewUniLocation,
  recommendNote,
  setRecommendNote,
  recommendSuccessMsg,
  setRecommendSuccessMsg,
  savingRecommendation,
  onSaveRecommendation,
  onDeleteRecommendation,
  universities,
  selectedUniversity,
  setSelectedUniversity,
  uniSearchQuery,
  setUniSearchQuery,
  uniSearchResults,
  setUniSearchResults,
  loadingUniSearch,
  showUniDropdown,
  setShowUniDropdown,
  uniProgrammes,
  setUniProgrammes,
  loadingProgrammes,
  programmesError,
  progFilterText,
  setProgFilterText,
  progFilterOnlyRelevant,
  setProgFilterOnlyRelevant,
  setSelectedProg,
  uniMeta,
  onSelectUniversity,
}: StudentUniversitiesTabProps) {
  const [matchingSubTab, setMatchingSubTab] = useState<'matches' | 'catalogue'>(() => {
    if (typeof window !== 'undefined') {
      const sub = new URLSearchParams(window.location.search).get('subtab');
      if (sub === 'matches' || sub === 'catalogue') return sub;
    }
    return 'matches';
  });

  const handleSubTabChange = (tab: 'matches' | 'catalogue') => {
    setMatchingSubTab(tab);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('subtab', tab);
        window.history.replaceState(null, '', url.toString());
      } catch {
        // Safe fallback
      }
    }
  };
  const [matchSearchQuery, setMatchSearchQuery] = useState('');
  const [matchUniFilter, setMatchUniFilter] = useState('ALL');
  const [matchPage, setMatchPage] = useState(1);

  // Shortlisted Programme IDs set for fast lookup
  const shortlistedProgIds = useMemo(() => {
    return new Set(
      (universities || [])
        .filter((u: any) => u.isShortlisted || u.status === 'shortlisted')
        .map((u: any) => String(u.programmeId || u.id))
    );
  }, [universities]);

  // Notepad programmes
  const notepadProgrammes = useMemo(() => {
    return (universities || []).filter(
      (u: any) => !u.isShortlisted && u.status !== 'shortlisted'
    );
  }, [universities]);

  // Unique list of universities in matching results
  const matchedUniversities = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of matchingResults) {
      if (r.eligibilityStatus === 'NOT_ELIGIBLE') continue;
      const name = r.universityName || 'Unknown University';
      map.set(name, (map.get(name) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [matchingResults]);

  // Filtered matching results
  const filteredMatchingResults = useMemo(() => {
    return matchingResults.filter((r: any) => {
      if (r.eligibilityStatus === 'NOT_ELIGIBLE') return false;
      if (matchUniFilter !== 'ALL' && r.universityName !== matchUniFilter) {
        return false;
      }
      if (matchSearchQuery.trim()) {
        const q = matchSearchQuery.toLowerCase().trim();
        const progName = (r.programName || '').toLowerCase();
        const uniName = (r.universityName || '').toLowerCase();
        const city = (r.city || '').toLowerCase();
        const lang = (r.language || '').toLowerCase();
        return progName.includes(q) || uniName.includes(q) || city.includes(q) || lang.includes(q);
      }
      return true;
    });
  }, [matchingResults, matchUniFilter, matchSearchQuery]);

  const totalMatchPages = Math.max(1, Math.ceil(filteredMatchingResults.length / MATCH_PAGE_SIZE));

  const paginatedMatchingResults = useMemo(() => {
    const start = (matchPage - 1) * MATCH_PAGE_SIZE;
    return filteredMatchingResults.slice(start, start + MATCH_PAGE_SIZE);
  }, [filteredMatchingResults, matchPage]);

  return (
    <div className="space-y-4">
      {/* Header with Run Matching & Add Recommendation */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base text-germany-black dark:text-white">University Eligibility &amp; Recommendations</h3>
          <p className="text-xs font-bold text-gray-500">
            {matchingRun?.status === 'completed'
              ? `Last run: ${new Date(matchingRun.completed_at || matchingRun.created_at).toLocaleDateString()} — ${matchingRun.candidates_evaluated ?? 0} programmes evaluated (${matchingRun.results_generated ?? matchingResults.length} matches found)`
              : matchingRun?.status === 'running' || matchingRun?.status === 'pending' || runningMatching
                ? 'Matching in progress…'
                : 'Run the matching engine to evaluate eligible programmes for this student.'}
          </p>
          {matchingRun?.status === 'failed' && (
            <p className="text-[11px] text-red-600 font-medium mt-0.5">Last run failed. You can re-run below.</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {readOnly ? (
            <div className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-extrabold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">
              <Compass className="w-3.5 h-3.5 text-gray-400" />
              <span>Matching Engine (View Only)</span>
            </div>
          ) : (
            <button
              id="counsellor-run-matching-btn"
              onClick={onRunMatching}
              disabled={runningMatching || isMatchingLocked}
              title={isMatchingLocked ? 'Shortlist and matching are locked. Unlock before re-running matching.' : undefined}
              className={`flex items-center gap-1.5 py-1.5 px-3 text-xs font-extrabold rounded-xl shadow-xs transition-colors ${isMatchingLocked
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 cursor-not-allowed opacity-90'
                : 'bg-germany-red hover:bg-[#D62839] disabled:opacity-60 text-white cursor-pointer'
                }`}
            >
              {isMatchingLocked ? (
                <><Lock className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" /> Shortlist Locked</>
              ) : runningMatching ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…</>
              ) : matchingRun?.status === 'running' || matchingRun?.status === 'pending' ? (
                <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Re-start Matching</>
              ) : matchingRun?.status === 'completed' ? (
                <><RefreshCw className="w-3.5 h-3.5" /> Re-run Matching</>
              ) : (
                <><Compass className="w-3.5 h-3.5" /> Run Matching Engine</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Subscription & Shortlist Lock Control Bar */}
      <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {studentSubscription ? (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60">
                {studentSubscription.planName || studentSubscription.planId || 'PLAN_3'}
              </span>
              <span className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:inline-block" />
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                <Laptop className="w-3.5 h-3.5 text-gray-400" />
                <span>Display: <strong className="text-germany-red">{curatedProgrammeIds.length}</strong> / {studentSubscription.maxDisplayCount || 10}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Shortlist: <strong className="text-germany-red">{studentShortlistCount}</strong> / {studentSubscription.maxShortlistCount || 7}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                No Active Plan
              </span>
              <span className="text-xs font-medium text-gray-500">
                Student has not purchased a plan. Results withheld from student until plan purchase.
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {readOnly ? (
            <div
              id="counsellor-toggle-lock-status"
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-extrabold border ${isMatchingLocked
                ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                }`}
            >
              {isMatchingLocked ? (
                <Lock className="w-3.5 h-3.5 text-red-600" />
              ) : (
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>{isMatchingLocked ? 'Shortlist Locked' : 'Shortlist Unlocked'}</span>
            </div>
          ) : (
            <button
              id="counsellor-toggle-lock-btn"
              onClick={onToggleLock}
              disabled={togglingLock}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer border ${isMatchingLocked
                ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-100'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
              title={isMatchingLocked ? 'Shortlist and matching are locked for this student. Click to unlock.' : 'Student can modify shortlist and re-run matching. Click to lock.'}
            >
              {togglingLock ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isMatchingLocked ? (
                <Lock className="w-3.5 h-3.5 text-red-600" />
              ) : (
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>{isMatchingLocked ? 'Shortlist Locked' : 'Shortlist Unlocked'}</span>
            </button>
          )}

          <button
            onClick={() => setShowCurationPanel(!showCurationPanel)}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-bold bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1C2436] transition-colors cursor-pointer shadow-xs"
          >
            <span>{showCurationPanel ? 'Hide Curation Panel' : 'Show Curation Panel'}</span>
            <span className="text-[10px] font-black px-1.5 py-0.2 bg-germany-red text-white rounded-full">
              {curatedProgrammeIds.length}
            </span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {matchingError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs font-bold text-red-700 dark:text-red-300">{matchingError}</p>
          </div>
          <button onClick={onFetchMatchingResults} className="text-xs font-extrabold text-red-700 dark:text-red-300 underline cursor-pointer">
            Retry
          </button>
        </div>
      )}

      {/* Sub-navigation Tabs: Matched Programmes vs Other Universities / Catalogue */}
      <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-gray-800/80 pb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleSubTabChange('matches')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${matchingSubTab === 'matches'
              ? 'bg-germany-red text-white shadow-xs'
              : 'bg-gray-100 dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Matched Programmes</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${matchingSubTab === 'matches'
                ? 'bg-white/20 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
            >
              {matchingResults.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE').length}
            </span>
          </button>

          {!readOnly && (
            <button
              type="button"
              onClick={() => handleSubTabChange('catalogue')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${matchingSubTab === 'catalogue'
                ? 'bg-germany-red text-white shadow-xs'
                : 'bg-gray-100 dark:bg-[#151B27] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Other Universities / Catalogue</span>
              {notepadProgrammes.length > 0 && (
                <span
                  className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${matchingSubTab === 'catalogue'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    }`}
                >
                  {notepadProgrammes.length} in Notepad
                </span>
              )}
            </button>
          )}
        </div>

        <p className="text-[11px] font-bold text-gray-400">
          {matchingSubTab === 'matches'
            ? `${filteredMatchingResults.length} matches • Page ${matchPage} of ${totalMatchPages}`
            : `Search German universities above • ${notepadProgrammes.length} saved in notepad below`}
        </p>
      </div>

      {/* Main Content Area: Left (Matches / Catalogue) + Right (Student Display Curation) */}
      <div className="flex flex-col xl:flex-row items-start gap-4">
        {/* Left Column */}
        <div className="flex-1 min-w-0 w-full">
          {matchingSubTab === 'matches' ? (
            <MatchingResultsWorkspace
              loadingMatching={loadingMatching}
              runningMatching={runningMatching}
              matchingRun={matchingRun}
              matchingResults={matchingResults}
              matchSearchQuery={matchSearchQuery}
              setMatchSearchQuery={setMatchSearchQuery}
              matchUniFilter={matchUniFilter}
              setMatchUniFilter={setMatchUniFilter}
              matchPage={matchPage}
              setMatchPage={setMatchPage}
              totalMatchPages={totalMatchPages}
              filteredMatchingResults={filteredMatchingResults}
              paginatedMatchingResults={paginatedMatchingResults}
              matchedUniversities={matchedUniversities}
              curatedProgrammeIds={curatedProgrammeIds}
              shortlistedProgIds={shortlistedProgIds}
              studentSubscription={studentSubscription}
              showCurationPanel={showCurationPanel}
              readOnly={readOnly}
              isMatchingLocked={isMatchingLocked}
              savingCuration={savingCuration}
              onDeleteMatchedProgramme={onDeleteMatchedProgramme}
              onToggleCuratedProgramme={onToggleCuratedProgramme}
              onSwitchToCatalogue={() => setMatchingSubTab('catalogue')}
            />
          ) : (
            <UniversityCatalogueWorkspace
              isManualUniEntry={isManualUniEntry}
              setIsManualUniEntry={setIsManualUniEntry}
              recommendSuccessMsg={recommendSuccessMsg}
              setRecommendSuccessMsg={setRecommendSuccessMsg}
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              uniSearchQuery={uniSearchQuery}
              setUniSearchQuery={setUniSearchQuery}
              uniSearchResults={uniSearchResults}
              setUniSearchResults={setUniSearchResults}
              loadingUniSearch={loadingUniSearch}
              showUniDropdown={showUniDropdown}
              setShowUniDropdown={setShowUniDropdown}
              uniProgrammes={uniProgrammes}
              setUniProgrammes={setUniProgrammes}
              loadingProgrammes={loadingProgrammes}
              programmesError={programmesError}
              progFilterText={progFilterText}
              setProgFilterText={setProgFilterText}
              progFilterOnlyRelevant={progFilterOnlyRelevant}
              setProgFilterOnlyRelevant={setProgFilterOnlyRelevant}
              setSelectedProg={setSelectedProg}
              uniMeta={uniMeta}
              onSelectUniversity={onSelectUniversity}
              matchingResults={matchingResults}
              curatedProgrammeIds={curatedProgrammeIds}
              shortlistedProgIds={shortlistedProgIds}
              studentSubscription={studentSubscription}
              isMatchingLocked={isMatchingLocked}
              readOnly={readOnly}
              savingCuration={savingCuration}
              onToggleCuratedProgramme={onToggleCuratedProgramme}
              notepadProgrammes={notepadProgrammes}
              onSaveProgrammeToNotepad={onSaveProgrammeToNotepad}
              savingRecommendation={savingRecommendation}
              onDeleteRecommendation={onDeleteRecommendation}
              newUniName={newUniName}
              setNewUniName={setNewUniName}
              newUniProgram={newUniProgram}
              setNewUniProgram={setNewUniProgram}
              newUniLocation={newUniLocation}
              setNewUniLocation={setNewUniLocation}
              recommendNote={recommendNote}
              setRecommendNote={setRecommendNote}
              onSaveRecommendation={onSaveRecommendation}
            />
          )}
        </div>

        {/* Right: Dedicated Programme Curation Panel */}
        <ShortlistCurationPanel
          showCurationPanel={showCurationPanel}
          curatedProgrammeIds={curatedProgrammeIds}
          studentSubscription={studentSubscription}
          studentShortlistCount={studentShortlistCount}
          readOnly={readOnly}
          isMatchingLocked={isMatchingLocked}
          savingCuration={savingCuration}
          matchingResults={matchingResults}
          curatedProgrammes={curatedProgrammes}
          shortlistedProgIds={shortlistedProgIds}
          togglingShortlist={togglingShortlist}
          onAutoFillTopMatches={onAutoFillTopMatches}
          onToggleShortlist={onToggleShortlist}
          onToggleCuratedProgramme={onToggleCuratedProgramme}
        />
      </div>
    </div>
  );
}
