"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProfileCompletionGate from '@/components/ProfileCompletionGate';
import { StudentDocumentHub } from '@/components/StudentDocumentHub';
import {
  Compass,
  Bookmark,
  FileText,
  CheckCircle2,
  Send,
  Plane,
  Settings,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const VALID_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa', 'account', 'help'
];

const RESTRICTED_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa'
];

interface SectionConfig {
  title: string;
  subtitle: string;
  icon: any;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  matching: {
    title: 'AI Matching Engine',
    subtitle: 'Find German universities matching your exact academic profile and career goals.',
    icon: Compass,
  },
  documents: {
    title: 'Document Hub',
    subtitle: 'Upload, manage, and verify all essential admission and visa documents.',
    icon: FileText,
  },
  aps: {
    title: 'APS India Checklist',
    subtitle: 'Step-by-step verification checklist for the mandatory APS Certificate.',
    icon: CheckCircle2,
  },
  shortlist: {
    title: 'My Shortlist',
    subtitle: 'Your selected universities and programs ready for application.',
    icon: Bookmark,
  },
  applications: {
    title: 'College Applications',
    subtitle: 'Track your Uni-Assist and direct university submissions in real-time.',
    icon: Send,
  },
  visa: {
    title: 'Visa & Relocation Support',
    subtitle: 'Blocked account setup, health insurance, and embassy appointment assistance.',
    icon: Plane,
  },
  account: {
    title: 'Account Settings',
    subtitle: 'Manage your credentials, notification preferences, and assigned counsellor.',
    icon: Settings,
  },
};

// ── Eligibility badge helper ─────────────────────────────────────────────────
const ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CONDITIONAL: 'bg-amber-100 text-amber-700 border-amber-200',
  NEEDS_REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
  NOT_ELIGIBLE: 'bg-red-100 text-red-700 border-red-200',
};
const ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

function EligibilityBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${ELIGIBILITY_STYLES[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {ELIGIBILITY_LABELS[status] ?? status}
    </span>
  );
}

// ── Matching Section component ────────────────────────────────────────────────
function MatchingSection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

  const [run, setRun] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingRecId, setUpdatingRecId] = useState<string | null>(null);

  const fetchResults = async () => {
    setLoadingResults(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/matching/results`, { credentials: 'include' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Server error ${res.status}`);
      }
      const data = await res.json();
      setRun(data.run ?? null);
      setResults(data.results ?? []);
      setRecommendations(data.recommendations ?? []);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load results');
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => { fetchResults(); }, []);

  // Poll while a run is in progress
  useEffect(() => {
    if (!run || run.status === 'completed' || run.status === 'failed') return;
    const timer = setInterval(fetchResults, 3000);
    return () => clearInterval(timer);
  }, [run?.status]);

  const handleRunMatching = async () => {
    setRunning(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/matching/run`, {
        method: 'POST',
        credentials: 'include',
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message ?? `Server error ${res.status}`);
      // Start polling
      fetchResults();
    } catch (err: any) {
      setError(err.message ?? 'Failed to start matching');
      setRunning(false);
    } finally {
      setRunning(false);
    }
  };

  const handleUpdateRecStatus = async (recId: string, newStatus: string) => {
    setUpdatingRecId(recId);
    try {
      const res = await fetch(`${API_URL}/student/recommendations/${recId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRecommendations((prev) =>
          prev.map((r) => (r.id === recId ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error('Failed to update recommendation status', err);
    } finally {
      setUpdatingRecId(null);
    }
  };

  const isRunning = run?.status === 'running' || run?.status === 'pending' || running;
  const eligibleResults = results.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE');

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="neu-card p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-gray-700">
            {run?.status === 'completed'
              ? `Last automated scan: ${new Date(run.completed_at || run.created_at).toLocaleDateString()} — ${run.candidates_evaluated ?? 0} programmes evaluated (${run.results_generated ?? results.length} matches found)`
              : run?.status === 'running' || run?.status === 'pending'
              ? 'Matching in progress…'
              : 'Evaluate your academic profile across all accredited German university programmes.'}
          </p>
          {run?.status === 'failed' && (
            <p className="text-[11px] text-red-600 font-medium mt-0.5">Last automated run timed out. You can re-run below.</p>
          )}
        </div>
        <button
          id="run-matching-btn"
          onClick={handleRunMatching}
          disabled={running}
          className="flex items-center gap-2 bg-germany-red hover:bg-[#D62839] disabled:opacity-60 text-white py-2.5 px-5 text-xs font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          {running ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…</>
          ) : run?.status === 'running' || run?.status === 'pending' ? (
            <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Re-start Matching</>
          ) : run?.status === 'completed' ? (
            <><RefreshCw className="w-3.5 h-3.5" /> Re-run Matching</>
          ) : (
            <><Compass className="w-3.5 h-3.5" /> Run Matching Engine</>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="neu-card p-4 bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-700">{error}</p>
          <button onClick={fetchResults} className="ml-auto text-xs font-extrabold text-red-700 underline cursor-pointer">Retry</button>
        </div>
      )}

      {/* Loading state */}
      {(loadingResults || isRunning) && !error && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <Loader2 className="w-8 h-8 text-germany-red mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">
            {isRunning ? 'Running the matching engine across all German programmes…' : 'Loading matching recommendations…'}
          </p>
        </div>
      )}

      {/* ========================================================
          COUNSELLOR RECOMMENDATIONS SECTION (Primary Prominence)
      ======================================================== */}
      {!loadingResults && !isRunning && recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="neu-card p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-germany-black">
                    Handpicked by Your EuropeBridge Counsellor
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/30">
                    {recommendations.length} Recommended
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  These programmes have been personally reviewed and recommended for your academic background and intake goals.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/student/shortlist"
              className="text-xs font-extrabold text-germany-black hover:text-germany-red px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors shadow-xs inline-flex items-center gap-1 shrink-0"
            >
              <span>View Shortlist</span>
              <Bookmark className="w-3.5 h-3.5 text-germany-red" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {recommendations.map((rec: any) => {
              const statusColors: Record<string, string> = {
                recommended: 'bg-amber-100 text-amber-900 border-amber-300',
                shortlisted: 'bg-blue-100 text-blue-900 border-blue-300',
                applied: 'bg-purple-100 text-purple-900 border-purple-300',
                offer_received: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black',
                waitlisted: 'bg-amber-100 text-amber-900 border-amber-300',
              };

              return (
                <div
                  key={rec.id}
                  className="neu-card p-5 bg-white border-2 border-amber-300/80 space-y-4 hover:-translate-y-1 transition-transform relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-400 text-germany-black rounded-bl-xl shadow-xs">
                    Counsellor Choice
                  </div>

                  <div className="flex items-start justify-between gap-2 pr-16">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                        {rec.universityType || rec.type || 'Public University'}
                      </span>
                      <h3 className="font-display text-sm text-germany-black leading-tight truncate">
                        {rec.universityName || rec.name}
                      </h3>
                      <p className="text-xs font-bold text-gray-700 leading-snug">
                        {rec.programName || rec.program}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">{rec.degree || 'Master of Science'}</p>
                    </div>
                  </div>

                  {/* Facts */}
                  <div className="text-[11px] text-gray-500 space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EBE7E0]">
                    <div className="flex justify-between">
                      <span>📍 {rec.location || 'Germany'}</span>
                      <span className="font-extrabold text-germany-black">{rec.tuitionPerSemester || rec.tuition || '€0 / semester fee only'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>⏰ {rec.nonEuDeadline || rec.deadline || 'July 15, 2026'}</span>
                      {rec.matchScore && (
                        <span className="font-extrabold text-emerald-700">{rec.matchScore}% Fit</span>
                      )}
                    </div>
                  </div>

                  {/* Requirements if specified */}
                  {(rec.bavarianGpaReq || rec.ieltsReq) && (
                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      {rec.bavarianGpaReq && <p>• German GPA: <span className="font-bold text-gray-700">{rec.bavarianGpaReq}</span></p>}
                      {rec.ieltsReq && <p>• IELTS: <span className="font-bold text-gray-700">{rec.ieltsReq}</span></p>}
                    </div>
                  )}

                  {/* Counsellor Note */}
                  {rec.notes && (
                    <div className="p-2.5 bg-amber-50/90 border border-amber-200 rounded-xl space-y-0.5">
                      <p className="text-[10px] font-black uppercase text-amber-800">
                        Advisor Note {rec.counsellorName ? `(${rec.counsellorName})` : ''}:
                      </p>
                      <p className="text-[11px] text-amber-950 font-medium italic">&quot;{rec.notes}&quot;</p>
                    </div>
                  )}

                  {/* Status & Shortlist Button */}
                  <div className="pt-2 border-t border-[#EBE7E0] flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusColors[rec.status] || 'bg-gray-100 text-gray-700'}`}>
                      {rec.status.replace('_', ' ').toUpperCase()}
                    </span>

                    {rec.status === 'recommended' ? (
                      <button
                        onClick={() => handleUpdateRecStatus(rec.id, 'shortlisted')}
                        disabled={updatingRecId === rec.id}
                        className="flex items-center gap-1.5 text-[11px] font-extrabold text-white bg-germany-black hover:bg-gray-800 disabled:opacity-60 py-1.5 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        {updatingRecId === rec.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Bookmark className="w-3 h-3 text-germany-gold" />
                        )}
                        <span>Add to Shortlist</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-extrabold text-blue-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Shortlisted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No run yet & no recommendations yet */}
      {!loadingResults && !isRunning && !error && !run && recommendations.length === 0 && (
        <div className="neu-card p-10 bg-white text-center space-y-3">
          <Compass className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-display text-base text-germany-black">Run Matching to Discover Programmes</h3>
          <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
            The engine will evaluate your profile against thousands of German university programmes and rank eligible ones for you.
          </p>
        </div>
      )}

      {/* Completed with 0 automated results */}
      {!loadingResults && !isRunning && !error && run?.status === 'completed' && eligibleResults.length === 0 && (
        <div className="neu-card p-6 sm:p-8 bg-white border border-[#EBE7E0] rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-germany-red/10 text-germany-red border border-germany-red/20">
                  Admissions Team in Action
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg text-germany-black font-bold leading-tight">
                {recommendations.length > 0
                  ? 'Counsellor Curated Programmes Available'
                  : 'Our Germany Specialists are Handpicking Programmes for You'}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {recommendations.length > 0
                  ? `Automated matching evaluated ${run.candidates_evaluated ?? 0} programmes. To bypass strict automated filters, your advisor has handpicked the programmes highlighted above for you.`
                  : 'Because German universities have specific faculty criteria, our senior admissions counsellors are personally evaluating your profile to match you with specialized programs, pathway options, and strategic partner universities.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Automated results grid */}
      {!loadingResults && !isRunning && eligibleResults.length > 0 && (
        <div className="space-y-4 pt-2">
          {recommendations.length > 0 && (
            <div className="border-t border-[#EBE7E0] pt-4">
              <h3 className="font-display text-base text-germany-black font-bold">
                Automated AI-Matched Programmes ({eligibleResults.length})
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Evaluated algorithmic fit against accredited German public universities
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {eligibleResults.map((r: any) => (
              <div key={r.id} className="neu-card p-5 bg-white space-y-4 hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                      {r.universityType ?? 'University'}
                    </span>
                    <h3 className="font-display text-sm text-germany-black leading-tight truncate">{r.universityName}</h3>
                    <p className="text-xs font-bold text-gray-500 leading-snug">{r.programName}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{r.degree}</p>
                  </div>
                  <EligibilityBadge status={r.eligibilityStatus} />
                </div>

                {/* Key facts */}
                <div className="text-[11px] text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>📍 {[r.city, r.country].filter(Boolean).join(', ') || 'NA'}</span>
                    <span className="font-extrabold text-germany-black">{r.tuitionPerSemester ?? 'NA'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🌐 {r.language ?? 'NA'}</span>
                    <span>⏰ {r.nonEuDeadline ?? 'NA'}</span>
                  </div>
                </div>

                {/* Matched reasons */}
                {r.matchedReasons?.length > 0 && (
                  <div className="pt-2 border-t border-[#EBE7E0]">
                    <p className="text-[10px] font-extrabold text-emerald-700 mb-1">✓ Why it matched</p>
                    <ul className="space-y-0.5">
                      {r.matchedReasons.slice(0, 2).map((reason: string, i: number) => (
                        <li key={i} className="text-[10px] text-gray-600 truncate">• {reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gaps/missing */}
                {r.requirementGaps?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-extrabold text-amber-700 mb-1">⚠ Gaps</p>
                    <ul className="space-y-0.5">
                      {r.requirementGaps.slice(0, 2).map((gap: string, i: number) => (
                        <li key={i} className="text-[10px] text-gray-500 truncate">• {gap}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {r.gpaFallbackUsed && (
                  <p className="text-[10px] text-gray-400 italic">GPA: platform fallback (≤ 3.0) applied</p>
                )}

                {r.programUrl && (
                  <a
                    href={r.programUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-extrabold text-germany-red hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> Programme Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shortlist Section component ──────────────────────────────────────────────
function ShortlistSection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShortlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/student/recommendations`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load shortlist');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load shortlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchShortlist(); }, []);

  const shortlistedItems = items.filter((i) => i.status !== 'recommended');
  const allItems = items;

  return (
    <div className="space-y-5">
      <div className="neu-card p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base text-germany-black font-bold">Your University Shortlist</h3>
          <p className="text-xs font-medium text-gray-500">
            {shortlistedItems.length > 0
              ? `${shortlistedItems.length} programme${shortlistedItems.length > 1 ? 's' : ''} currently saved in your active application shortlist.`
              : 'Add programmes from your Matching Engine tab to build your application shortlist.'}
          </p>
        </div>
        <Link
          href="/dashboard/student/matching"
          className="neu-btn-primary py-2 px-4 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Matches &amp; Recommendations</span>
        </Link>
      </div>

      {loading && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <Loader2 className="w-8 h-8 text-germany-red mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">Loading shortlist…</p>
        </div>
      )}

      {error && (
        <div className="neu-card p-4 bg-red-50 border border-red-200 flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-red-700">{error}</p>
          <button onClick={fetchShortlist} className="text-xs font-extrabold text-red-700 underline cursor-pointer">Retry</button>
        </div>
      )}

      {!loading && !error && allItems.length === 0 && (
        <div className="neu-card p-10 bg-white text-center space-y-3">
          <Bookmark className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-display text-base text-germany-black">No Shortlisted Programmes Yet</h3>
          <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
            Browse through programmes recommended by your counsellor or discover options via the AI Matching Engine.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/student/matching"
              className="neu-btn-primary py-2.5 px-5 text-xs font-extrabold inline-flex items-center gap-2"
            >
              <span>Go to Matching Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && allItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {allItems.map((rec: any) => (
            <div
              key={rec.id}
              className="neu-card p-5 bg-white space-y-4 hover:-translate-y-1 transition-transform border border-[#EBE7E0]"
            >
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                  {rec.universityType || rec.type || 'Public University'}
                </span>
                <h3 className="font-display text-sm text-germany-black leading-tight truncate">
                  {rec.universityName || rec.name}
                </h3>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  {rec.programName || rec.program}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">{rec.degree || 'Master of Science'}</p>
              </div>

              <div className="text-[11px] text-gray-500 space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EBE7E0]">
                <div className="flex justify-between">
                  <span>📍 {rec.location || 'Germany'}</span>
                  <span className="font-extrabold text-germany-black">{rec.tuitionPerSemester || rec.tuition || '€0 / sem'}</span>
                </div>
                <div className="flex justify-between">
                  <span>⏰ Deadline: {rec.nonEuDeadline || rec.deadline || 'July 15, 2026'}</span>
                </div>
              </div>

              {rec.notes && (
                <div className="p-2.5 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 italic">
                  Advisor: &quot;{rec.notes}&quot;
                </div>
              )}

              <div className="pt-2 border-t border-[#EBE7E0] flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  {rec.status.replace('_', ' ')}
                </span>
                <span className="text-[11px] font-bold text-gray-400">
                  {rec.counsellorName ? `Recommended by ${rec.counsellorName}` : 'Counsellor Selected'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StudentSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const config = SECTION_CONFIGS[section] || {
    title: section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: `Manage your ${section}`,
    icon: Compass,
  };

  const Icon = config.icon;
  const isRestricted = RESTRICTED_SECTIONS.includes(section);
  const [completionPercentage, setCompletionPercentage] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(isRestricted);

  useEffect(() => {
    if (!isRestricted) return;

    const checkProfileStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const res = await fetch(`${API_URL}/student/profile`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const pct = typeof data.completionPercentage === 'number' ? data.completionPercentage : 0;
          setCompletionPercentage(pct);
          if (data.firstName) setUserName(data.firstName);
        } else {
          setCompletionPercentage(0);
        }
      } catch (err) {
        console.error('Failed to load profile for section check:', err);
        setCompletionPercentage(0);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileStatus();
  }, [isRestricted]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center shrink-0 border border-germany-red/20 shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-display font-bold text-germany-black tracking-tight leading-tight">
                {config.title}
              </h1>
              {isRestricted && completionPercentage !== null && completionPercentage >= 100 && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Unlocked
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-normal mt-0.5">
              {config.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
          <Link
            href="/dashboard/student"
            className="text-[11px] font-bold text-gray-600 hover:text-germany-black px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-1.5 border border-gray-200/70"
          >
            <span>Overview</span>
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isRestricted && isLoading && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <div className="w-10 h-10 bg-[#EBE7E0] rounded-full mx-auto" />
          <p className="text-xs font-bold text-gray-400">Loading your profile status...</p>
        </div>
      )}

      {/* Profile incomplete gate */}
      {isRestricted && !isLoading && completionPercentage !== null && completionPercentage < 100 && (
        <ProfileCompletionGate
          sectionTitle={config.title}
          completionPercentage={completionPercentage}
          userName={userName}
        />
      )}

      {/* Section content (only shown if unlocked) */}
      {(!isRestricted || (!isLoading && completionPercentage !== null && completionPercentage >= 100)) && (
        <>
          {section === 'matching' && <MatchingSection />}
          {section === 'shortlist' && <ShortlistSection />}
          {section === 'documents' && <StudentDocumentHub />}
          {!['matching', 'shortlist', 'documents', 'aps'].includes(section) && (
            <div className="neu-card p-8 bg-white text-center space-y-4">
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="font-display text-xl text-germany-black">{config.title} Module</h3>
                <p className="text-xs font-bold text-gray-500">
                  This module is actively synced with your student records. You can update your details or schedule a consultation with your assigned Germany advisor.
                </p>
                <div className="pt-2">
                  <button className="neu-btn-primary py-2.5 px-5 text-xs font-extrabold mx-auto">
                    Update {config.title}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
