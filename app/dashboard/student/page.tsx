"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  AlertCircle,
  Calendar,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  Loader2,
  Sparkles,
  UserCheck,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [matchingData, setMatchingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

        const [profRes, matchRes] = await Promise.all([
          fetch(`${API_URL}/student/profile`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/matching/results`, { credentials: 'include' }).catch(() => null),
        ]);

        if (profRes && profRes.ok) {
          const profData = await profRes.json();
          if (mounted) setProfile(profData);
        }
        if (matchRes && matchRes.ok) {
          const matchData = await matchRes.json();
          if (mounted) setMatchingData(matchData);
        }
      } catch (err: any) {
        if (mounted) setError(err.message || 'Failed to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDashboardData();
    return () => {
      mounted = false;
    };
  }, []);

  // ── Calculated Real States ──────────────────────────────────────────────────
  const leadStatus = profile?.leadStatus || 'signed_up';
  const isProfileComplete = profile?.completionPercentage === 100;
  const isMatchingRun = Boolean(matchingData?.run && matchingData.run.status === 'completed');
  const matchedUnisCount = matchingData?.totalMatchedCount || matchingData?.results?.length || 0;

  // Plan detection (covers profile.subscription, matchingData.subscription, or lead status)
  const subData = profile?.subscription;
  const matchSub = matchingData?.subscription;
  const isPlanPurchased = Boolean(
    subData?.status === 'ACTIVE' ||
    (subData?.planId && subData?.planId !== 'FREE') ||
    matchSub?.status === 'ACTIVE' ||
    matchSub?.planId ||
    profile?.leadStatus === 'plan_purchased' ||
    profile?.planId
  );

  const planName =
    subData?.planName ||
    matchSub?.plan?.name ||
    matchSub?.planId ||
    profile?.planName ||
    (isPlanPurchased ? 'Active Plan' : null);

  const isShortlistLocked = Boolean(profile?.isMatchingLocked || leadStatus === 'shortlist_locked');
  const shortlistedCount = matchingData?.recommendations?.length || 0;

  // Assigned counsellor (from profile joined with users or recommendations fallback)
  const assignedCounsellor = profile?.assignedCounsellor;

  // Unique checklist document statistics (APS + Admission + Visa unique canonical documents)
  const totalChecklistCount = profile?.documentSummary?.totalChecklistRequired || 14;
  const approvedCount = profile?.documentSummary?.verifiedUnique !== undefined
    ? profile.documentSummary.verifiedUnique
    : (profile?.documentSummary?.verified || 0);
  const pendingCount = profile?.documentSummary?.pendingUnique !== undefined
    ? profile.documentSummary.pendingUnique
    : (profile?.documentSummary?.pending || 0);
  const isAllDocsApproved = approvedCount >= totalChecklistCount;
  const hasSomeDocsApproved = approvedCount > 0;

  // Bavarian GPA extraction
  const bestEdu = profile?.educationRecords?.find((e: any) => e.germanGrade !== null && e.germanGrade !== undefined);
  const gpa = bestEdu?.germanGrade;
  const gpaNum = gpa ? Number(gpa) : null;
  const gpaTier = gpaNum !== null
    ? gpaNum <= 1.5
      ? 'Very Good (Sehr gut)'
      : gpaNum <= 2.5
      ? 'Good (Gut)'
      : gpaNum <= 3.5
      ? 'Satisfactory (Befriedigend)'
      : 'Sufficient'
    : null;

  // Overall journey completion points (5 equal stages of 20 points each)
  let progressPoints = 0;
  if (isProfileComplete) progressPoints += 20;
  if (isMatchingRun) progressPoints += 20;
  if (isPlanPurchased) progressPoints += 20;
  if (isShortlistLocked) progressPoints += 20;
  if (totalChecklistCount > 0) {
    progressPoints += Math.min(20, Math.round((approvedCount / totalChecklistCount) * 20));
  }
  const completionPercentage = Math.min(100, Math.max(10, progressPoints));

  // 5 Canonical Journey Steps (removed separate 'Visa & Arrival'; unified under 'Approved Documents')
  const journeySteps = [
    {
      label: 'Profile',
      status: isProfileComplete ? 'completed' : 'current',
      desc: isProfileComplete ? '100% Completed' : `${profile?.completionPercentage || 0}% Filled`,
      badge: isProfileComplete ? 'Done' : 'Active',
      href: '/dashboard/student/complete-profile',
    },
    {
      label: 'Matching Engine',
      status: isMatchingRun ? 'completed' : isProfileComplete ? 'current' : 'upcoming',
      desc: isMatchingRun
        ? `${matchedUnisCount} Programs`
        : isProfileComplete
        ? 'Ready to Run'
        : 'Pending Profile',
      badge: isMatchingRun ? 'Done' : isProfileComplete ? 'Active' : 'Pending',
      href: '/dashboard/student/matching',
    },
    {
      label: isPlanPurchased && planName ? planName : 'Plan / Package',
      status: isPlanPurchased ? 'completed' : isMatchingRun ? 'current' : 'upcoming',
      isPurple: isPlanPurchased,
      desc: isPlanPurchased ? 'Purchased & Active' : isMatchingRun ? 'Select Plan' : 'Pending Matching',
      badge: isPlanPurchased ? 'Purchased' : isMatchingRun ? 'Active' : 'Pending',
      href: '/pricing',
    },
    {
      label: 'Shortlist',
      status: isShortlistLocked ? 'completed' : isPlanPurchased ? 'current' : 'upcoming',
      desc: isShortlistLocked
        ? 'Finalized & Locked'
        : shortlistedCount > 0
        ? `${shortlistedCount} Selected`
        : 'In Review',
      badge: isShortlistLocked ? 'Done' : isPlanPurchased ? 'Active' : 'Pending',
      href: '/dashboard/student/shortlist',
    },
    {
      label: 'Approved Documents',
      status: isAllDocsApproved
        ? 'completed'
        : isShortlistLocked || hasSomeDocsApproved || pendingCount > 0
        ? 'current'
        : 'upcoming',
      desc: `${approvedCount}/${totalChecklistCount} Approved`,
      badge: isAllDocsApproved
        ? 'Done'
        : hasSomeDocsApproved
        ? `${approvedCount}/${totalChecklistCount}`
        : isShortlistLocked
        ? 'Active'
        : 'Pending',
      href: '/dashboard/student/documents',
    },
  ];

  // Top 3 real matched universities
  const displayMatches = (matchingData?.results && Array.isArray(matchingData.results) && matchingData.results.length > 0)
    ? matchingData.results.slice(0, 3)
    : [];

  // Recent real documents
  const recentDocs = profile?.recentDocuments || [];

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading your Germany admission dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sleek Compact Welcome Banner */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] dark:shadow-none px-5 py-4 sm:px-6 sm:py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-display font-bold text-germany-black dark:text-white">
              Welcome back{profile?.firstName ? `, ${profile.firstName}` : ''}!
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-germany-gold/15 dark:bg-amber-950/40 border border-germany-gold/40 dark:border-amber-700/50 rounded-full font-bold text-germany-black dark:text-amber-300 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-germany-gold animate-pulse"></span>
              {profile?.intakeSeason || 'Winter'} {profile?.intakeYear || 2026} Intake
            </span>
            {isPlanPurchased && planName && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-800 rounded-full font-black text-purple-800 dark:text-purple-300 text-[10px] uppercase">
                {planName}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-xl">
            {isAllDocsApproved ? (
              <span>All your admission and visa documents are <strong className="text-emerald-600 dark:text-emerald-400">verified & approved ({approvedCount}/{totalChecklistCount})</strong>. You are ready for consular visa submission and German campus arrival!</span>
            ) : isShortlistLocked ? (
              <span>Your university shortlist is <strong className="text-emerald-600 dark:text-emerald-400">locked & finalized</strong>. Currently <strong className="text-germany-red">{approvedCount}/{totalChecklistCount} unique documents approved</strong>. Complete your APS, university, and visa checklist in the Document Hub.</span>
            ) : isMatchingRun ? (
              <span>You have <strong className="text-germany-red">{matchedUnisCount} matched programmes</strong>. Review and curate your shortlist with your Germany counsellor.</span>
            ) : isProfileComplete ? (
              <span>Your academic profile is complete. Run the <strong className="text-germany-red">AI Matching Engine</strong> to discover tuition-free German universities.</span>
            ) : (
              <span>Complete your academic background and test scores to unlock personalized German university matching.</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isProfileComplete ? (
            <Link
              href="/dashboard/student/complete-profile"
              className="neu-btn-primary py-2 px-4 sm:py-2.5 sm:px-5 text-xs font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <span>Complete Profile ({profile?.completionPercentage || 0}%)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : !isMatchingRun ? (
            <Link
              href="/dashboard/student/matching"
              className="neu-btn-primary py-2 px-4 sm:py-2.5 sm:px-5 text-xs font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Matching Engine</span>
            </Link>
          ) : isShortlistLocked ? (
            <Link
              href="/dashboard/student/documents"
              className="neu-btn-primary py-2 px-4 sm:py-2.5 sm:px-5 text-xs font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Approved Documents ({approvedCount}/{totalChecklistCount})</span>
            </Link>
          ) : (
            <Link
              href="/dashboard/student/matching"
              className="neu-btn-primary py-2 px-4 sm:py-2.5 sm:px-5 text-xs font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore AI Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Germany Application Journey Stepper (5 Clean Stages) */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h2 className="font-display text-lg text-germany-black dark:text-white">Your Germany Journey Roadmap</h2>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-400">Track your milestones from profile registration to German campus arrival</p>
          </div>
          <span className="text-xs font-extrabold text-germany-red bg-germany-red/10 px-3 py-1 rounded-full border border-germany-red/20">
            {completionPercentage}% Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {journeySteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPurple = step.isPurple;

            let cardClass = 'bg-[#EBE7E0]/40 dark:bg-[#0E121A]/50 border-transparent opacity-80';
            if (isPurple) {
              cardClass = 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 shadow-xs ring-1 ring-purple-400/30';
            } else if (isCurrent) {
              cardClass = 'bg-[#FDFBF7] dark:bg-[#0E121A] border-germany-red shadow-[4px_4px_12px_rgba(230,57,70,0.15)]';
            } else if (isCompleted) {
              cardClass = 'bg-emerald-50/70 dark:bg-[#0E121A] border-emerald-300 dark:border-emerald-500/50 shadow-sm';
            }

            return (
              <Link
                key={step.label}
                href={step.href || '/dashboard/student'}
                className={`p-3.5 rounded-2xl border transition-all block hover:scale-[1.01] ${cardClass}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                    isPurple
                      ? 'bg-purple-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-germany-red text-white'
                      : 'bg-gray-300 dark:bg-[#1A2130] text-gray-700 dark:text-gray-200'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                  {isPurple ? (
                    <span className="text-[9px] font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-300 dark:border-purple-700">
                      Purchased
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[9px] font-extrabold text-germany-red uppercase tracking-wider bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded-full border border-red-300 dark:border-red-800">
                      {step.badge || 'Active'}
                    </span>
                  ) : isCompleted ? (
                    <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Done
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider bg-gray-200/60 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                <div className="font-extrabold text-xs text-germany-black dark:text-white line-clamp-1" title={step.label}>
                  {step.label}
                </div>
                <div className={`text-[10px] font-bold mt-0.5 truncate ${
                  isPurple
                    ? 'text-purple-700 dark:text-purple-300 font-extrabold'
                    : isCompleted 
                    ? 'text-emerald-700 dark:text-emerald-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.desc}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Key Metric Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GPA Metric */}
        <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">German GPA</span>
            <div className="p-2 bg-germany-gold/20 dark:bg-amber-950/40 rounded-xl text-germany-black dark:text-amber-300">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black dark:text-white">
            {gpaNum !== null ? `${gpaNum.toFixed(2)}` : 'Not Calculated'}
          </div>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            {gpaTier || 'Add graduation marks in profile'}
          </p>
        </div>

        {/* Matched Unis Metric */}
        <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Matched Unis</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black dark:text-white">
            {matchedUnisCount > 0 ? `${matchedUnisCount} Programs` : '0 Programs'}
          </div>
          <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
            {matchedUnisCount > 0 ? 'Across Public Universities' : 'Run AI matching engine'}
          </p>
        </div>

        {/* Approved Documents Metric */}
        <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Approved Documents</span>
            <div className="p-2 bg-amber-100 dark:bg-amber-950/40 rounded-xl text-amber-700 dark:text-amber-300">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black dark:text-white">
            {`${approvedCount} / ${totalChecklistCount} Approved`}
          </div>
          <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
            {pendingCount > 0
              ? `${pendingCount} Under Counsellor Review`
              : approvedCount >= totalChecklistCount
              ? 'All Checklist Requirements Verified'
              : 'Unique APS, Degree & Visa Checklist'}
          </p>
        </div>

        {/* Target Intake / Window Metric */}
        <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Target Intake</span>
            <div className="p-2 bg-blue-100 dark:bg-blue-950/40 rounded-xl text-blue-700 dark:text-blue-300">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black dark:text-white">
            {profile?.intakeSeason || 'Winter'} {profile?.intakeYear || 2026}
          </div>
          <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 truncate">
            {profile?.intendedDegreeLevel || 'Master'} • {profile?.preferredFieldOfStudy || 'Informatics'}
          </p>
        </div>
      </div>

      {/* Two-Column Actionable Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matched Universities & Quick Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real AI-Matched Universities */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-germany-black dark:text-white">AI-Matched Universities</h3>
                <p className="text-xs font-bold text-gray-400">Tailored to your background and language proficiencies</p>
              </div>
              <Link
                href="/dashboard/student/matching"
                className="text-xs font-extrabold text-germany-red hover:underline inline-flex items-center gap-1"
              >
                <span>View All ({matchedUnisCount})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {displayMatches.length > 0 ? (
              <div className="space-y-3">
                {displayMatches.map((item: any, idx: number) => {
                  const uniName = item.universityName || item.university_name || 'German Public University';
                  const progName = item.name || item.program || item.programName || item.program_name || 'Degree Program';
                  const tuition = item.tuition || item.tuitionPerSemester ? `€${item.tuition || item.tuitionPerSemester}/sem` : '€0 / semester (Tuition-Free)';
                  const deadline = item.nonEuDeadline || item.deadline || 'Upcoming Window';
                  const matchScore = item.matchScore ? `${item.matchScore}% Match` : 'Eligible';
                  const badge = `${item.universityType || 'Public'} • ${item.language || 'English'}`;

                  return (
                    <div
                      key={item.programmeId || item.id || idx}
                      className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#0E121A] border border-[#EBE7E0] dark:border-gray-800/80 hover:border-germany-gold transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-xs text-germany-black dark:text-white group-hover:text-germany-red transition-colors">
                            {uniName}
                          </span>
                          <span className="text-[10px] font-extrabold bg-[#EBE7E0] dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/10 px-2 py-0.5 rounded-md">
                            {badge}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{progName}</p>
                        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 flex-wrap">
                          <span>Tuition: <strong className="text-germany-black dark:text-white">{tuition}</strong></span>
                          <span>•</span>
                          <span>Deadline: <strong className="text-germany-black dark:text-white">{deadline}</strong></span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <span className="text-xs font-black text-emerald-700 bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                          {matchScore}
                        </span>
                        <Link
                          href="/dashboard/student/shortlist"
                          className="neu-btn px-3 py-1.5 text-xs font-extrabold text-germany-black dark:text-white hover:text-germany-red"
                        >
                          Shortlist
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#FDFBF7] dark:bg-[#0E121A] border border-dashed border-[#EBE7E0] dark:border-gray-800 text-center space-y-3">
                <GraduationCap className="w-8 h-8 mx-auto text-gray-400" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-germany-black dark:text-white">No Matching Runs Completed Yet</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Evaluate your ECTS credits and bachelor curriculum against hundreds of German university programs.
                  </p>
                </div>
                <Link
                  href="/dashboard/student/matching"
                  className="neu-btn-primary py-2 px-4 text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Matching Evaluation</span>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Document Status from Real Uploads */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-germany-black dark:text-white">Document Hub & Approved Checklist</h3>
                <p className="text-xs font-bold text-gray-400">Status of your unique APS, Degree, and Visa checklist records</p>
              </div>
              <Link href="/dashboard/student/documents" className="text-xs font-extrabold text-germany-red hover:underline">
                Manage Documents
              </Link>
            </div>
            
            {recentDocs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recentDocs.slice(0, 3).map((doc: any) => {
                  const isVer = doc.status === 'verified';
                  const isRej = doc.status === 'rejected';

                  return (
                    <div
                      key={doc.id}
                      className={`p-3.5 rounded-2xl border space-y-1 ${
                        isVer
                          ? 'bg-emerald-50/70 dark:bg-[#0E121A] border-emerald-200 dark:border-emerald-500/30'
                          : isRej
                          ? 'bg-red-50/70 dark:bg-[#0E121A] border-red-200 dark:border-red-500/30'
                          : 'bg-amber-50/70 dark:bg-[#0E121A] border-amber-200 dark:border-amber-500/30'
                      }`}
                    >
                      <div className={`flex items-center justify-between font-extrabold text-xs ${
                        isVer
                          ? 'text-emerald-800 dark:text-emerald-400'
                          : isRej
                          ? 'text-red-800 dark:text-red-400'
                          : 'text-amber-900 dark:text-amber-400'
                      }`}>
                        <span className="truncate max-w-[130px]">{doc.name}</span>
                        {isVer ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : isRej ? (
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className={`text-[10px] font-bold ${
                        isVer
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : isRej
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-amber-700 dark:text-amber-300'
                      }`}>
                        {isVer ? 'Verified & Approved' : isRej ? 'Action Required (Rejected)' : 'Under Counsellor Review'}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FDFBF7] dark:bg-[#0E121A] border border-dashed border-[#EBE7E0] dark:border-gray-800 text-center space-y-2">
                <FileText className="w-6 h-6 mx-auto text-gray-400" />
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  No documents uploaded yet. Upload your Degree, Transcripts, and Passport to begin verification.
                </p>
                <Link
                  href="/dashboard/student/documents"
                  className="neu-btn py-1.5 px-3 text-xs font-extrabold inline-block"
                >
                  Go to Document Hub
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Assigned Counsellor & Real Admissions Tip */}
        <div className="space-y-6">
          {/* Assigned Counsellor Card */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <h4 className="font-display text-base text-germany-black dark:text-white">Assigned Germany Expert</h4>
            
            {assignedCounsellor ? (
              // Scenario 1: Actual assigned counsellor is available
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-germany-red/10 border-2 border-germany-red/40 flex items-center justify-center font-extrabold text-germany-red text-sm shrink-0">
                    {assignedCounsellor.name
                      .split(' ')
                      .map((w: string) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() || 'CN'}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-germany-black dark:text-white">
                      {assignedCounsellor.name}
                    </div>
                    <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      EuroBridge Senior Counsellor
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#EBE7E0]/50 dark:bg-white/5 rounded-2xl text-[11px] font-bold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Status: <strong className="text-emerald-700 dark:text-emerald-400">Directly Connected</strong></span>
                  </div>
                  {assignedCounsellor.email && (
                    <div>Direct Email: <strong className="text-germany-black dark:text-white truncate block">{assignedCounsellor.email}</strong></div>
                  )}
                </div>

                <Link
                  href="/dashboard/student/help"
                  className="w-full neu-btn py-2.5 text-xs font-extrabold text-germany-black dark:text-white hover:text-germany-red cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  Open Counsellor Helpdesk
                </Link>
              </>
            ) : isPlanPurchased ? (
              // Scenario 2: Plan is purchased, but counsellor assignment is pending / loading
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/50 border-2 border-purple-300 dark:border-purple-800 flex items-center justify-center font-extrabold text-purple-700 dark:text-purple-300 text-sm shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-germany-black dark:text-white">
                      Counsellor Allocation Pending
                    </div>
                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                      {planName || 'Plan Active'}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl text-[11px] font-bold text-gray-600 dark:text-gray-300 border border-purple-200/60 dark:border-purple-800/40 space-y-1">
                  <div>Status: <strong className="text-purple-700 dark:text-purple-300">Assigning Senior Advisor</strong></div>
                  <div className="text-gray-500 dark:text-gray-400 leading-normal">
                    Your dedicated Germany advisor will be assigned shortly to review your shortlist and verify your academic documents.
                  </div>
                </div>

                <Link
                  href="/dashboard/student/help"
                  className="w-full neu-btn py-2.5 text-xs font-extrabold text-germany-black dark:text-white hover:text-germany-red cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  Contact Student Support
                </Link>
              </>
            ) : (
              // Scenario 3: Plan is not purchased (free tier / data not available)
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-germany-gold/20 border-2 border-germany-gold/40 flex items-center justify-center font-extrabold text-germany-black dark:text-white text-sm shrink-0">
                    <GraduationCap className="w-5 h-5 text-germany-gold" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-germany-black dark:text-white">
                      1-on-1 Germany Expert
                    </div>
                    <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      Included with Admission Plan
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#EBE7E0]/50 dark:bg-white/5 rounded-2xl text-[11px] font-bold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/5 space-y-1">
                  <div>Guidance: <strong className="text-germany-black dark:text-white">Available on Plan Selection</strong></div>
                  <div className="text-gray-500 dark:text-gray-400 leading-normal">
                    Get paired 1-on-1 with an expert for shortlist curation, ECTS audit, and document verification.
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="w-full neu-btn-primary py-2.5 text-xs font-extrabold cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose Admission Plan</span>
                </Link>
              </>
            )}
          </div>

          {/* Germany Admissions Insight Card */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-germany-gold/20 border border-germany-gold/40 flex items-center justify-center text-germany-gold shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-germany-black dark:text-white">Admissions Guidance</h4>
                <p className="text-[10px] font-bold text-germany-red">DAAD & Uni-Assist Best Practice</p>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-600 dark:text-gray-300 leading-relaxed bg-[#FDFBF7] dark:bg-[#0E121A] p-3 rounded-2xl border border-[#EBE7E0] dark:border-gray-800/80">
              {isShortlistLocked
                ? '"Ensure your module course descriptions match at least 80% of the target German university curriculum. Admissions committees evaluate ECTS alignment meticulously!"'
                : gpaNum === null
                ? '"Add your university grading scale and undergraduate marks in your profile. German universities filter candidates using the strict Bavarian formula."'
                : '"Public German universities are virtually tuition-free! Focus on matching course prerequisites (minimum math/programming credits) to ensure admission eligibility."'}
            </p>
          </div>

          {/* Interactive Tools Links */}
          <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Interactive Tools
            </h4>
            <div className="space-y-2">
              <Link
                href="/tools/german-grade-calculator"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBE7E0]/40 dark:bg-white/5 hover:bg-[#EBE7E0] dark:hover:bg-white/10 text-xs font-extrabold text-germany-black dark:text-white border border-transparent dark:border-white/5 transition-colors"
              >
                <span>German GPA Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link
                href="/dashboard/student/matching"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBE7E0]/40 dark:bg-white/5 hover:bg-[#EBE7E0] dark:hover:bg-white/10 text-xs font-extrabold text-germany-black dark:text-white border border-transparent dark:border-white/5 transition-colors"
              >
                <span>ECTS Credit Evaluator</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
