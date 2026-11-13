'use client';

import React from 'react';
import { Calculator, X, Loader2, Save } from 'lucide-react';

export interface SopGpaModalProps {
  showGpaModal: boolean;
  onClose: () => void;
  gpaGradingSystem: string;
  setGpaGradingSystem: (val: string) => void;
  gpaScore: string;
  setGpaScore: (val: string) => void;
  gpaScale: string;
  setGpaScale: (val: string) => void;
  gpaMinPass: string;
  setGpaMinPass: (val: string) => void;
  liveBavarianGrade: number | null;
  isSavingGpa: boolean;
  onSaveGpa: () => void;
}

export function SopGpaModal({
  showGpaModal,
  onClose,
  gpaGradingSystem,
  setGpaGradingSystem,
  gpaScore,
  setGpaScore,
  gpaScale,
  setGpaScale,
  gpaMinPass,
  setGpaMinPass,
  liveBavarianGrade,
  isSavingGpa,
  onSaveGpa,
}: SopGpaModalProps) {
  if (!showGpaModal) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#111622] rounded-3xl border border-gray-300 dark:border-gray-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-germany-red" />
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Update &amp; Recalculate German GPA
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Synchronises your official German Bavarian grade [1 + 3 &times; (Nmax - Nd) / (Nmax - Nmin)] with your student profile and SOP dossier in the database.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Grading System *
                </label>
                <select
                  value={gpaGradingSystem}
                  onChange={(e) => setGpaGradingSystem(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold cursor-pointer whitespace-normal break-words"
                >
                  <option value="CGPA/10">CGPA / 10</option>
                  <option value="CGPA/4">CGPA / 4</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Grade">Grade</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                  Your Obtained Score / CGPA *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={gpaScore}
                  onChange={(e) => setGpaScore(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Scale Max (Nmax) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value)}
                    placeholder="e.g. 10 or 100"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 block mb-1">
                    Min Passing Grade (Nmin) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gpaMinPass}
                    onChange={(e) => setGpaMinPass(e.target.value)}
                    placeholder="e.g. 4 or 40"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Live Bavarian Grade Preview */}
              {liveBavarianGrade !== null && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Calculated German Bavarian Grade:
                  </span>
                  <span className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                    ~{liveBavarianGrade}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSaveGpa}
                disabled={isSavingGpa || liveBavarianGrade === null}
                className="px-5 py-2.5 bg-germany-red hover:bg-[#D62839] text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSavingGpa ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save &amp; Sync to Profile</span>
              </button>
            </div>
          </div>
        </div>
  );
}
