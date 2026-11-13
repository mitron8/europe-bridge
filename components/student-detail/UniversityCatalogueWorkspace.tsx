'use client';

import React from 'react';
import {
  Building2,
  X,
  Search,
  Loader2,
  CheckCircle2,
  Ban,
  AlertCircle,
  Bookmark,
  Check,
  Lock,
  Plus
} from 'lucide-react';
import { ProgrammeCard } from '../cards/ProgrammeCard';

export interface UniversityCatalogueWorkspaceProps {
  isManualUniEntry: boolean;
  setIsManualUniEntry: (val: boolean) => void;
  recommendSuccessMsg: string | null;
  setRecommendSuccessMsg: (val: string | null) => void;
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
  matchingResults: any[];
  curatedProgrammeIds: string[];
  shortlistedProgIds: Set<string>;
  studentSubscription: any;
  isMatchingLocked: boolean;
  readOnly?: boolean;
  savingCuration: boolean;
  onToggleCuratedProgramme: (progIdStr: string) => void;
  notepadProgrammes: any[];
  onSaveProgrammeToNotepad: (p: any) => void;
  savingRecommendation: boolean;
  onDeleteRecommendation: (id: string) => void;
  newUniName: string;
  setNewUniName: (val: string) => void;
  newUniProgram: string;
  setNewUniProgram: (val: string) => void;
  newUniLocation: string;
  setNewUniLocation: (val: string) => void;
  recommendNote: string;
  setRecommendNote: (val: string) => void;
  onSaveRecommendation: (e: React.FormEvent) => void;
}

export function UniversityCatalogueWorkspace({
  isManualUniEntry,
  setIsManualUniEntry,
  recommendSuccessMsg,
  setRecommendSuccessMsg,
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
  matchingResults,
  curatedProgrammeIds,
  shortlistedProgIds,
  studentSubscription,
  isMatchingLocked,
  readOnly,
  savingCuration,
  onToggleCuratedProgramme,
  notepadProgrammes,
  onSaveProgrammeToNotepad,
  savingRecommendation,
  onDeleteRecommendation,
  newUniName,
  setNewUniName,
  newUniProgram,
  setNewUniProgram,
  newUniLocation,
  setNewUniLocation,
  recommendNote,
  setRecommendNote,
  onSaveRecommendation,
}: UniversityCatalogueWorkspaceProps) {
  return (
    <div className="space-y-6">
      {/* Catalogue Explorer Box */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-germany-red" />
              <span>University Programme Catalogue Explorer</span>
            </h4>
            <p className="text-[11px] font-bold text-gray-400">
              Search any German university to evaluate all its programmes with student background alignment
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsManualUniEntry(!isManualUniEntry)}
            className="text-xs font-bold text-germany-red hover:underline cursor-pointer"
          >
            {isManualUniEntry ? '← Back to Catalogue Search' : '+ Manual Entry Fallback'}
          </button>
        </div>

        {recommendSuccessMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
            <span>{recommendSuccessMsg}</span>
            <button type="button" onClick={() => setRecommendSuccessMsg(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {!isManualUniEntry ? (
          <div className="space-y-4">
            {/* Popular University Chips */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                Popular Universities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Munich University of Technology',
                  'RWTH Aachen University',
                  'Technical University of Berlin',
                  'Heidelberg University',
                  'Karlsruhe Institute of Technology',
                  'University of Stuttgart',
                ].map((quickUni) => (
                  <button
                    key={quickUni}
                    type="button"
                    onClick={() => onSelectUniversity({ name: quickUni })}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${selectedUniversity?.name === quickUni
                      ? 'bg-germany-red text-white border-germany-red shadow-xs'
                      : 'bg-[#F8F9FA] dark:bg-[#151B27] text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-800/80 hover:border-germany-red/50'
                      }`}
                  >
                    {quickUni}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">
                Search University (Live Database)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={uniSearchQuery}
                  onChange={(e) => {
                    setUniSearchQuery(e.target.value);
                    if (selectedUniversity && e.target.value !== selectedUniversity.name) {
                      setSelectedUniversity(null);
                      setUniProgrammes([]);
                      setSelectedProg(null);
                    }
                  }}
                  onFocus={() => {
                    if (uniSearchResults.length > 0) setShowUniDropdown(true);
                  }}
                  placeholder="Type university name (e.g. Technical University of Munich, RWTH Aachen)..."
                  className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                {loadingUniSearch && (
                  <Loader2 className="w-4 h-4 text-germany-red animate-spin absolute right-3 top-3" />
                )}
                {!loadingUniSearch && uniSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setUniSearchQuery('');
                      setSelectedUniversity(null);
                      setUniSearchResults([]);
                      setUniProgrammes([]);
                      setSelectedProg(null);
                    }}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showUniDropdown && uniSearchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-20 max-h-56 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
                  {uniSearchResults.map((uni, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectUniversity(uni)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-[#1E2638] transition-colors flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-germany-black dark:text-white">
                          {uni.name}
                        </div>
                        {(uni.city || uni.country) && (
                          <div className="text-[10px] text-gray-400">
                            📍 {[uni.city, uni.country].filter(Boolean).join(', ')}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">Select →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected University Details & Programmes List */}
            {selectedUniversity && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-gray-50 dark:bg-[#151B27] rounded-xl border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-germany-red block">Selected University</span>
                    <h5 className="font-display text-sm text-germany-black dark:text-white">{selectedUniversity.name}</h5>
                    {selectedUniversity.city && (
                      <span className="text-[11px] text-gray-400">📍 {selectedUniversity.city}</span>
                    )}
                  </div>

                  {uniMeta && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{uniMeta.relevantCount} Relevant ({uniMeta.studentField || 'Field'})</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60 flex items-center gap-1">
                        <Ban className="w-3 h-3 text-red-600" />
                        <span>{uniMeta.disqualifiedCount} Disqualified</span>
                      </span>
                    </div>
                  )}
                </div>

                {loadingProgrammes && (
                  <div className="p-8 text-center space-y-2">
                    <Loader2 className="w-6 h-6 text-germany-red animate-spin mx-auto" />
                    <p className="text-xs font-bold text-gray-400">Loading university programmes & evaluating academic field...</p>
                  </div>
                )}

                {programmesError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900/40">
                    {programmesError}
                  </div>
                )}

                {!loadingProgrammes && !programmesError && uniProgrammes.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <input
                        type="text"
                        value={progFilterText}
                        onChange={(e) => setProgFilterText(e.target.value)}
                        placeholder="Filter by keyword (e.g. Data, AI, Systems)..."
                        className="px-3 py-1.5 bg-[#F8F9FA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-germany-red flex-1"
                      />

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setProgFilterOnlyRelevant(false)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer ${!progFilterOnlyRelevant
                            ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black'
                            : 'bg-gray-100 dark:bg-[#1E2638] text-gray-600 dark:text-gray-300'
                            }`}
                        >
                          All ({uniProgrammes.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setProgFilterOnlyRelevant(true)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer ${progFilterOnlyRelevant
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            }`}
                        >
                          Relevant Only ({uniProgrammes.filter((p) => p.isRelevant).length})
                        </button>
                      </div>
                    </div>

                    {/* Scrollable list of programmes */}
                    <div className="max-h-[500px] overflow-y-auto space-y-2.5 pr-1">
                      {uniProgrammes
                        .filter((p) => {
                          if (progFilterOnlyRelevant && !p.isRelevant) return false;
                          if (progFilterText) {
                            const q = progFilterText.toLowerCase();
                            return (
                              p.programName?.toLowerCase().includes(q) ||
                              (p.subject && p.subject.toLowerCase().includes(q))
                            );
                          }
                          return true;
                        })
                        .map((p) => {
                          const progIdStr = String(p.id);
                          const isCurated = curatedProgrammeIds.includes(progIdStr);
                          const maxDisplay = studentSubscription?.maxDisplayCount || 5;
                          const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

                          // Check if this programme is already in the matchingResults
                          const isAlreadyMatched = matchingResults.some((m: any) => {
                            if (m.eligibilityStatus === 'NOT_ELIGIBLE') return false;
                            const matchProgId = String(m.programmeId || m.id);
                            if (matchProgId === progIdStr) return true;
                            const matchProgName = (m.programName || '').toLowerCase().trim();
                            const pProgName = (p.programName || '').toLowerCase().trim();
                            const matchUniName = (m.universityName || '').toLowerCase().trim();
                            const selectedUniName = (selectedUniversity?.name || '').toLowerCase().trim();
                            return (
                              matchProgName === pProgName &&
                              (matchUniName.includes(selectedUniName) || selectedUniName.includes(matchUniName))
                            );
                          });

                          // Check if already saved in Counsellor Notepad
                          const isAlreadyInNotepad = notepadProgrammes.some((u: any) => {
                            if (String(u.programmeId) === progIdStr) return true;
                            const uProg = (u.program || '').toLowerCase().trim();
                            const pProg = (p.programName || '').toLowerCase().trim();
                            const uUni = (u.name || '').toLowerCase().trim();
                            const sUni = (selectedUniversity?.name || '').toLowerCase().trim();
                            return uProg === pProg && (uUni.includes(sUni) || sUni.includes(uUni));
                          });

                          return (
                            <div
                              key={p.id}
                              className={`p-3.5 rounded-xl transition-all border ${isMatchingLocked
                                ? 'bg-gray-50/50 dark:bg-[#0B0E14] border-gray-200/50 dark:border-gray-800/50 opacity-70'
                                : isAlreadyMatched
                                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/80 ring-1 ring-amber-400/20'
                                  : isAlreadyInNotepad
                                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700/80 ring-1 ring-emerald-500/20'
                                    : p.isRelevant
                                      ? 'bg-white dark:bg-[#151B27] border-gray-200/80 dark:border-gray-800/80 hover:border-emerald-400/80'
                                      : 'bg-gray-50/50 dark:bg-[#0B0E14] border-red-200/40 dark:border-red-950/40 opacity-60'
                                }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 space-y-1 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-extrabold text-germany-black dark:text-white leading-tight">
                                      {p.programName}
                                    </span>
                                    {isAlreadyMatched ? (
                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                                        <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                        <span>Already in Matching List</span>
                                      </span>
                                    ) : isAlreadyInNotepad ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                        <Bookmark className="w-2.5 h-2.5 text-emerald-600" />
                                        <span>Saved in Notepad</span>
                                      </span>
                                    ) : p.isRelevant ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                        <span>Relevant to {uniMeta?.studentField || 'Field'}</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                                        <Ban className="w-2.5 h-2.5 text-red-500" />
                                        <span>Disqualified (Non-matching field)</span>
                                      </span>
                                    )}
                                  </div>

                                  <div className="text-[11px] font-bold text-gray-500 flex items-center gap-2 pt-0.5 flex-wrap">
                                    <span>{p.degree}</span>
                                    <span>•</span>
                                    <span>🌐 {p.language}</span>
                                    <span>•</span>
                                    <span>💶 {p.tuition || 'Public tuition free'}</span>
                                    {p.deadline && (
                                      <>
                                        <span>•</span>
                                        <span>⏰ {p.deadline}</span>
                                      </>
                                    )}
                                  </div>
                                  {p.subject && (
                                    <p className="text-[10px] text-gray-400">Subject: {p.subject}</p>
                                  )}
                                </div>

                                {/* Action Buttons for Catalogue Programmes */}
                                <div className="shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
                                  {isAlreadyMatched ? (
                                    <button
                                      disabled
                                      type="button"
                                      className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/60 cursor-not-allowed opacity-85"
                                      title="This programme was already evaluated by the matching engine and is in your Matched Programmes list"
                                    >
                                      <Check className="w-3 h-3 text-amber-600" />
                                      <span>Already in Matches</span>
                                    </button>
                                  ) : isAlreadyInNotepad ? (
                                    <button
                                      type="button"
                                      onClick={() => { const el = document.getElementById('counsellor-notepad-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                                      className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
                                      title="Saved in your notepad. Click to view notepad."
                                    >
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span>Saved in Notepad</span>
                                    </button>
                                  ) : p.isRelevant ? (
                                    !readOnly ? (
                                      <button
                                        type="button"
                                        onClick={() => onSaveProgrammeToNotepad(p)}
                                        disabled={savingRecommendation || isMatchingLocked}
                                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl border border-transparent transition-colors ${isMatchingLocked
                                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                          : 'bg-germany-black dark:bg-white text-white dark:text-germany-black hover:opacity-90 cursor-pointer disabled:opacity-40'
                                          }`}
                                        title={isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Save this programme to your Counsellor Notepad'}
                                      >
                                        {savingRecommendation ? (
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : isMatchingLocked ? (
                                          <Lock className="w-3 h-3 text-gray-400" />
                                        ) : (
                                          <Plus className="w-3 h-3" />
                                        )}
                                        <span>{isMatchingLocked ? 'Locked' : 'Add to Notepad'}</span>
                                      </button>
                                    ) : null
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {!loadingProgrammes && !programmesError && uniProgrammes.length === 0 && (
                  <div className="p-6 bg-gray-50 dark:bg-[#151B27] rounded-xl text-center text-xs font-bold text-gray-400">
                    No programmes found in database for {selectedUniversity.name}. You can use manual entry fallback above.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Manual Entry Form */
          <form onSubmit={onSaveRecommendation} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="University (e.g. TU Darmstadt)"
                value={newUniName}
                onChange={(e) => setNewUniName(e.target.value)}
                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                required
              />
              <input
                type="text"
                placeholder="Program (e.g. M.Sc. Distributed Systems)"
                value={newUniProgram}
                onChange={(e) => setNewUniProgram(e.target.value)}
                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
                required
              />
              <input
                type="text"
                placeholder="City / State (e.g. Darmstadt, Hesse)"
                value={newUniLocation}
                onChange={(e) => setNewUniLocation(e.target.value)}
                className="p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
              />
            </div>

            <input
              type="text"
              placeholder="Advisor fit note or rationale (optional)"
              value={recommendNote}
              onChange={(e) => setRecommendNote(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red shadow-xs"
            />

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={savingRecommendation || !newUniName.trim() || !newUniProgram.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 cursor-pointer disabled:opacity-40"
              >
                {savingRecommendation ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Add Programme to Recommendations</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Counsellor Saved Programmes / Notepad View (Below Catalogue) */}
      <div id="counsellor-notepad-section" className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h4 className="font-display text-sm text-germany-black dark:text-white flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-germany-red" />
              <span>Counsellor Saved Programmes &amp; Notepad</span>
            </h4>
            <p className="text-[11px] font-bold text-gray-400">
              Your candidate scratchpad. Click &quot;+ Add to Display&quot; on any card below to curate it into the student display.
            </p>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-germany-black text-white dark:bg-white dark:text-germany-black">
            {notepadProgrammes.length} saved
          </span>
        </div>

        {notepadProgrammes.length === 0 ? (
          <div className="p-8 text-center space-y-2 bg-gray-50/60 dark:bg-[#151B27]/40 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
            <Bookmark className="w-7 h-7 text-gray-400 mx-auto" />
            <h5 className="font-display text-xs text-gray-600 dark:text-gray-300">Your Notepad is Empty</h5>
            <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
              Search any university in the box above and click &quot;+ Add to Notepad&quot; to save candidate programmes here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notepadProgrammes.map((uni, idx) => {
              const progIdStr = String(uni.programmeId || uni.id);
              const isCurated = curatedProgrammeIds.includes(progIdStr);
              const isShortlisted = shortlistedProgIds.has(progIdStr);
              const maxDisplay = studentSubscription?.maxDisplayCount || 5;
              const isDisplayFull = curatedProgrammeIds.length >= maxDisplay;

              const uAny = uni as any;
              const uniName = uAny.universityName || uAny.name || 'German University';
              const progName = uAny.programName || uAny.program || 'University Programme';
              const uniType = uAny.universityType || uAny.type || 'Public University';
              const uniLocation = uAny.location || [uAny.city, uAny.country].filter(Boolean).join(', ') || 'Germany';
              const uniTuition = uAny.tuitionPerSemester || uAny.tuition || '€0 / semester fee only';
              const uniDeadline = uAny.nonEuDeadline || uAny.deadline || 'July 15';
              const uniLanguage = uAny.language || 'German';
              const uniUrl = uAny.programUrl || uAny.url;

              return (
                <ProgrammeCard
                  key={uni.id}
                  rank={idx + 1}
                  universityType={uniType}
                  universityName={uniName}
                  programName={progName}
                  degree={uni.degree || 'Bachelor'}
                  eligibilityLabel={uni.status ? (uni.status === 'recommended' ? 'RECOMMENDED' : uni.status.toUpperCase()) : 'RECOMMENDED'}
                  eligibilityStyle="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700"
                  isShortlisted={isShortlisted}
                  score={`${uni.matchScore || 90}% Fit`}
                  scoreLabel="Score"
                  location={uniLocation}
                  tuition={uniTuition}
                  language={uniLanguage}
                  deadline={uniDeadline}
                  notes={uni.notes}
                  programUrl={uniUrl}
                  programUrlLabel="Website"
                  isLocked={readOnly || isMatchingLocked}
                  isCurated={isCurated}
                  onDelete={readOnly ? undefined : () => onDeleteRecommendation(uni.id)}
                  deleteTitle={readOnly ? 'Supervisor View (Read-Only)' : isMatchingLocked ? 'Shortlist and curation are locked. Unlock to modify.' : 'Remove programme from notepad'}
                  deleteDisabled={readOnly || isMatchingLocked}
                  actionSlot={
                    readOnly ? (
                      isCurated ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>On Display</span>
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
                                ? `Plan display limit reached (${maxDisplay}). Remove an item from Student Display Curation to make space.`
                                : isCurated
                                  ? 'Remove from student display (frees up a display slot)'
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
                            <span>On Display</span>
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
        )}
      </div>
    </div>
  );
}
