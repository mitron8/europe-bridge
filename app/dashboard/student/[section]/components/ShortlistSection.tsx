'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  ExternalLink,
  Loader2,
  AlertCircle,
  GraduationCap,
  Trash2,
  Lock,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { EligibilityBadge } from './EligibilityBadge';

export function ShortlistSection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
  const [items, setItems] = useState<any[]>([]);
  const [subInfo, setSubInfo] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchShortlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const [recRes, matchRes] = await Promise.all([
        fetch(`${API_URL}/student/recommendations`, { credentials: 'include' }),
        fetch(`${API_URL}/matching/results`, { credentials: 'include' }),
      ]);
      if (!recRes.ok) throw new Error('Failed to load shortlist');
      const recData = await recRes.json();
      setItems(Array.isArray(recData) ? recData : []);

      if (matchRes.ok) {
        const matchData = await matchRes.json();
        setSubInfo(matchData.subscription || null);
        setIsLocked(Boolean(matchData.isLocked));
      }
    } catch (err: any) {
      setError(err.message ?? 'Failed to load shortlist');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShortlist = async (recId: string) => {
    if (isLocked) return;
    setDeletingId(recId);
    try {
      const res = await fetch(`${API_URL}/student/recommendations/${recId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 && data.message?.includes('locked')) {
          setIsLocked(true);
        }
        throw new Error(data.message ?? 'Failed to remove from shortlist');
      }

      await fetchShortlist();
    } catch (err: any) {
      alert(err.message ?? 'Could not remove from shortlist');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchShortlist();
  }, []);

  const shortlistedItems = items.filter((i) => i.status !== 'recommended');
  const maxShortlistCount = subInfo?.maxShortlistCount ?? 3;
  const allItems = items;

  return (
    <div className="space-y-5">
      {/* Shortlist Header & Limits */}
      <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-base text-germany-black dark:text-white font-bold">Your University Shortlist</h3>
            {subInfo?.status === 'ACTIVE' && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                Plan Capacity: {shortlistedItems.length} / {maxShortlistCount} Shortlisted
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                🔒 Locked by Counsellor
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-500 mt-1">
            {isLocked
              ? 'Your shortlist is finalized and locked for university applications.'
              : shortlistedItems.length > 0
              ? `${shortlistedItems.length} programme${shortlistedItems.length > 1 ? 's' : ''} currently saved in your active application shortlist (max ${maxShortlistCount}).`
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
              className="neu-card p-5 bg-white dark:bg-[#111622] space-y-4 hover:-translate-y-1 transition-transform border border-[#EBE7E0] dark:border-gray-800 relative"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0 pr-2">
                  <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                    {rec.universityType || rec.type || 'Public University'}
                  </span>
                  <h3 className="font-display text-sm text-germany-black leading-tight whitespace-normal break-words">
                    {rec.universityName || rec.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-700 leading-snug">
                    {rec.programName || rec.program}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">{rec.degree || 'Master of Science'}</p>
                </div>
                {isLocked ? (
                  <span
                    title="Shortlist is locked by your counsellor"
                    className="p-1.5 text-purple-600 bg-purple-50 rounded-lg border border-purple-200 cursor-not-allowed shrink-0"
                  >
                    <Lock className="w-3.5 h-3.5 text-purple-600" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDeleteShortlist(rec.id)}
                    disabled={deletingId === rec.id}
                    title="Remove from shortlist"
                    className="p-1.5 text-gray-400 hover:text-germany-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {deletingId === rec.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-germany-red" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                )}
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
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400">
                    {rec.counsellorName ? `Recommended by ${rec.counsellorName}` : 'Counsellor Selected'}
                  </span>
                  {isLocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-black text-purple-700 bg-purple-100/70 border border-purple-200 px-2 py-0.5 rounded-md">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteShortlist(rec.id)}
                      disabled={deletingId === rec.id}
                      title="Remove from shortlist"
                      className="flex items-center gap-1 text-[11px] font-extrabold text-red-600 hover:text-red-700 hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{deletingId === rec.id ? 'Removing…' : 'Remove'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
