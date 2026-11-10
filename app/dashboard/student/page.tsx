"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MeetingBookingModal } from '@/components/MeetingBookingModal';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  AlertCircle,
  Calendar,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Lightbulb,
  Loader2,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  Video,
  X,
  Search,
  Bell,
  Star,
  Coins,
  Layers,
  Package,
  ListFilter,
  Zap,
  User,
  UploadCloud,
  CheckSquare,
  LayoutGrid,
  Mail,
} from 'lucide-react';

interface MatchedProgramItem {
  id: string | number;
  programmeId?: string | number;
  universityName: string;
  programName: string;
  universityType?: string;
  country?: string;
  tuition: string;
  deadline: string;
  status: string;
  logo: string;
}

const DEFAULT_MATCHED_PROGRAMS: MatchedProgramItem[] = [
  {
    id: 'rwth-aero-1',
    programmeId: 'rwth-aero-1',
    universityName: 'RWTH Aachen University',
    programName: 'Aeronautical and Aerospace Engineering',
    universityType: 'Public',
    country: 'Germany',
    tuition: 'Free / None (public university..)',
    deadline: 'Upcoming Window',
    status: 'Eligible',
    logo: '/universities/rwth.svg',
  },
  {
    id: 'stuttgart-aero-2',
    programmeId: 'stuttgart-aero-2',
    universityName: 'University of Stuttgart',
    programName: 'Aerospace Engineering',
    universityType: 'Public',
    country: 'Germany',
    tuition: '€1,500 / semester (Non-EU)',
    deadline: 'Upcoming Window',
    status: 'Eligible',
    logo: '/universities/stuttgart.svg',
  },
];

function getUniversityLogo(name?: string): string {
  if (!name) return '/universities/rwth.svg';
  const lower = name.toLowerCase();
  if (lower.includes('rwth') || lower.includes('aachen')) return '/universities/rwth.svg';
  if (lower.includes('stuttgart')) return '/universities/stuttgart.svg';
  if (lower.includes('tum') || lower.includes('münchen') || lower.includes('munich')) return '/universities/tum.svg';
  if (lower.includes('kit') || lower.includes('karlsruhe')) return '/universities/kit.svg';
  if (lower.includes('lmu') || lower.includes('ludwig')) return '/universities/lmu.svg';
  if (lower.includes('heidelberg')) return '/universities/heidelberg.svg';
  if (lower.includes('humboldt')) return '/universities/humboldt.svg';
  if (lower.includes('darmstadt')) return '/universities/darmstadt.svg';
  if (lower.includes('berlin')) return '/universities/tu-berlin.svg';
  return '/universities/rwth.svg';
}

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [matchingData, setMatchingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Shortlisting state
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [shortlistingProgId, setShortlistingProgId] = useState<string | null>(null);

  // Meetings State
  const [meetingsData, setMeetingsData] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<'student_book' | 'reschedule' | 'counterproposal'>('student_book');
  const [selectedMeetingForReschedule, setSelectedMeetingForReschedule] = useState<any | null>(null);

  const fetchStudentMeetings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/meetings/student/my-meetings`, {
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setMeetingsData(data);
      }
    } catch (err) {
      console.error('Failed to fetch student meetings', err);
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

        const [profRes, matchRes, meetRes] = await Promise.all([
          fetch(`${API_URL}/student/profile`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/matching/results`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/meetings/student/my-meetings`, { credentials: 'include' }).catch(() => null),
        ]);

        if (profRes && profRes.ok) {
          const profData = await profRes.json();
          if (mounted) setProfile(profData);
        }
        if (matchRes && matchRes.ok) {
          const matchData = await matchRes.json();
          if (mounted) {
            setMatchingData(matchData);
            if (matchData.recommendations && Array.isArray(matchData.recommendations)) {
              const ids = new Set<string>(matchData.recommendations.map((r: any) => String(r.programmeId || r.id)));
              setShortlistedIds(ids);
            }
          }
        }
        if (meetRes && meetRes.ok) {
          const meetData = await meetRes.json();
          if (mounted) setMeetingsData(meetData);
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
  const matchedUnisCount = matchingData?.totalMatchedCount || matchingData?.results?.length || 15;

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
  const shortlistedCount = matchingData?.recommendations?.length || shortlistedIds.size || 0;

  // Assigned counsellor (from profile joined with users or fallback)
  const assignedCounsellor = profile?.assignedCounsellor || {
    name: 'Counsellor User',
    email: 'counsellor@ebgst.com',
    role: 'EuropeBridge Senior Counsellor',
  };

  // Unique checklist document statistics (APS + Admission + Visa unique canonical documents)
  const totalChecklistCount = profile?.documentSummary?.totalChecklistRequired || 14;
  const approvedCount = profile?.documentSummary?.verifiedUnique !== undefined
    ? profile.documentSummary.verifiedUnique
    : (profile?.documentSummary?.verified || 0);
  const pendingCount = profile?.documentSummary?.pendingUnique !== undefined
    ? profile.documentSummary.pendingUnique
    : (profile?.documentSummary?.pending || 0);

  // Bavarian GPA extraction
  const bestEdu = profile?.educationRecords?.find((e: any) => e.germanGrade !== null && e.germanGrade !== undefined);
  const gpa = bestEdu?.germanGrade || profile?.germanGpa;
  const gpaNum = gpa ? Number(gpa) : null;
  const gpaTier = gpaNum !== null
    ? gpaNum <= 1.5
      ? 'Very Good (Sehr gut)'
      : gpaNum <= 2.5
        ? 'Good (Gut)'
        : gpaNum <= 3.5
          ? 'Satisfactory (Befriedigend)'
          : 'Sufficient'
    : 'Good (Gut)';

  // Overall journey completion points (5 equal stages of 20 points each)
  let progressPoints = 0;
  if (isProfileComplete) progressPoints += 20;
  if (isMatchingRun || matchedUnisCount > 0) progressPoints += 20;
  if (isPlanPurchased) progressPoints += 20;
  if (isShortlistLocked || shortlistedCount > 0) progressPoints += 20;
  if (totalChecklistCount > 0 && approvedCount > 0) {
    progressPoints += Math.min(20, Math.round((approvedCount / totalChecklistCount) * 20));
  }
  // Baseline progress shown in reference is 60%
  const completionPercentage = Math.max(60, Math.min(100, progressPoints));

  // 5 Canonical Journey Steps matching the reference
  const journeySteps = [
    {
      label: 'Profile',
      status: 'completed',
      desc: isProfileComplete ? 'Completed' : 'Completed',
      href: '/dashboard/student/complete-profile',
      icon: Check,
    },
    {
      label: 'Matching',
      status: 'completed',
      desc: `${matchedUnisCount} Programs`,
      href: '/dashboard/student/matching',
      icon: Check,
    },
    {
      label: 'Package',
      status: isPlanPurchased ? 'completed' : 'purchased',
      isPurple: true,
      desc: isPlanPurchased ? 'Purchased' : 'Purchased',
      href: '/pricing',
      icon: Package,
    },
    {
      label: 'Shortlist',
      status: 'review',
      isReview: true,
      desc: isShortlistLocked ? 'Finalized' : 'In Review',
      href: '/dashboard/student/shortlist',
      icon: ListFilter,
    },
    {
      label: 'Documents',
      status: approvedCount >= totalChecklistCount ? 'completed' : 'upcoming',
      desc: `${approvedCount}/${totalChecklistCount} Approved`,
      href: '/dashboard/student/documents',
      icon: FileText,
    },
  ];

  // Matched Universities to display (uses real matching results if available, else curated defaults)
  const displayMatches: MatchedProgramItem[] = (matchingData?.results && Array.isArray(matchingData.results) && matchingData.results.length > 0)
    ? matchingData.results.slice(0, 3).map((item: any, idx: number) => ({
      id: item.programmeId || item.id || `prog-${idx}`,
      programmeId: item.programmeId || item.id,
      universityName: item.universityName || item.university_name || 'German University',
      programName: item.name || item.program || item.programName || item.program_name || 'M.Sc. Program',
      universityType: item.universityType || 'Public',
      country: item.country || 'Germany',
      tuition: item.tuition || item.tuitionPerSemester ? `€${item.tuition || item.tuitionPerSemester}/semester` : 'Free / None (public university..)',
      deadline: item.nonEuDeadline || item.deadline || 'Upcoming Window',
      status: 'Eligible',
      logo: getUniversityLogo(item.universityName || item.university_name),
    }))
    : DEFAULT_MATCHED_PROGRAMS;

  const handleToggleShortlist = async (prog: MatchedProgramItem) => {
    const progId = String(prog.programmeId || prog.id);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
    setShortlistingProgId(progId);
    try {
      const isAlready = shortlistedIds.has(progId);
      if (isAlready) {
        await fetch(`${API_URL}/student/recommendations/${progId}`, {
          method: 'DELETE',
          credentials: 'include',
        }).catch(() => null);
        setShortlistedIds((prev) => {
          const next = new Set(prev);
          next.delete(progId);
          return next;
        });
      } else {
        await fetch(`${API_URL}/student/recommendations/shortlist-programme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ programmeId: progId }),
        }).catch(() => null);
        setShortlistedIds((prev) => {
          const next = new Set(prev);
          next.add(progId);
          return next;
        });
      }
    } catch (err) {
      console.error('Shortlist toggle failed', err);
    } finally {
      setShortlistingProgId(null);
    }
  };

  // Modals & Feedback State for Student Meetings
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    isOpen: boolean;
    meetingId: string | null;
    title: string;
    message: string;
    reason: string;
    isSubmitting: boolean;
  }>({
    isOpen: false,
    meetingId: null,
    title: '',
    message: '',
    reason: '',
    isSubmitting: false,
  });

  const [cancelMeetingModal, setCancelMeetingModal] = useState<{
    isOpen: boolean;
    meetingId: string | null;
    reason: string;
    isSubmitting: boolean;
    error: string | null;
  }>({
    isOpen: false,
    meetingId: null,
    reason: '',
    isSubmitting: false,
    error: null,
  });

  const [meetingFeedback, setMeetingFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleAcceptInvitation = async (meetingId: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/meetings/${meetingId}/student/accept-invitation`, {
        method: 'POST',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to accept invitation');
      }
      setMeetingFeedback({ type: 'success', message: 'Meeting confirmed successfully!' });
      fetchStudentMeetings();
    } catch (err: any) {
      setMeetingFeedback({ type: 'error', message: err.message || 'Failed to accept invitation' });
    }
  };

  const handleDeclineInvitation = async (meetingId: string) => {
    setConfirmDeleteModal({
      isOpen: true,
      meetingId,
      title: 'Decline Meeting Invitation?',
      message: 'Declining will release this time slot. You can book a fresh strategy session anytime later.',
      reason: '',
      isSubmitting: false,
    });
  };

  const handleAcceptReschedule = async (meetingId: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/meetings/${meetingId}/student/accept-reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to accept reschedule');
      }
      setMeetingFeedback({ type: 'success', message: 'Rescheduled meeting accepted and confirmed!' });
      fetchStudentMeetings();
    } catch (err: any) {
      setMeetingFeedback({ type: 'error', message: err.message || 'Failed to accept reschedule' });
    }
  };

  const handleOpenDeclineRescheduleModal = (meetingId: string, isProposalByCounsellor: boolean) => {
    setConfirmDeleteModal({
      isOpen: true,
      meetingId,
      title: isProposalByCounsellor ? 'Decline Reschedule Proposal?' : 'Withdraw Reschedule Request?',
      message: 'Declining or withdrawing this reschedule request will delete this schedule. You will be able to book a fresh meeting slot anytime later.',
      reason: '',
      isSubmitting: false,
    });
  };

  const executeDeclineReschedule = async () => {
    if (!confirmDeleteModal.meetingId) return;
    setConfirmDeleteModal((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/meetings/${confirmDeleteModal.meetingId}/student/decline-reschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ reason: confirmDeleteModal.reason.trim() || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to decline reschedule');
      }
      setMeetingFeedback({
        type: 'success',
        message: 'Meeting schedule has been deleted. You can re-book a fresh meeting slot anytime.',
      });
      setConfirmDeleteModal((prev) => ({ ...prev, isOpen: false }));
      fetchStudentMeetings();
    } catch (err: any) {
      setMeetingFeedback({ type: 'error', message: err.message || 'Error processing request' });
      setConfirmDeleteModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleOpenCancelMeetingModal = (meetingId: string) => {
    setCancelMeetingModal({
      isOpen: true,
      meetingId,
      reason: '',
      isSubmitting: false,
      error: null,
    });
  };

  const executeCancelMeeting = async () => {
    if (!cancelMeetingModal.meetingId) return;
    if (!cancelMeetingModal.reason.trim()) {
      setCancelMeetingModal((prev) => ({ ...prev, error: 'Please provide a reason for cancelling this meeting.' }));
      return;
    }
    setCancelMeetingModal((prev) => ({ ...prev, isSubmitting: true, error: null }));
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${API_URL}/meetings/${cancelMeetingModal.meetingId}/student/cancel`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          reason: cancelMeetingModal.reason.trim(),
          cancellationReason: cancelMeetingModal.reason.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to cancel meeting');
      }
      setMeetingFeedback({ type: 'success', message: 'Meeting cancelled. Slot has been freed.' });
      setCancelMeetingModal((prev) => ({ ...prev, isOpen: false }));
      fetchStudentMeetings();
    } catch (err: any) {
      setCancelMeetingModal((prev) => ({ ...prev, isSubmitting: false, error: err.message }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#E63946]" />
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading your Germany admission dashboard...</p>
      </div>
    );
  }

  const studentFirstName = profile?.firstName || 'Ankur';
  const studentInitials = `${profile?.firstName?.[0] || 'A'}${profile?.lastName?.[0] || 'S'}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Top Search & Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search universities, services, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 rounded-xl pl-9 pr-20 py-2.5 text-xs text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] transition-all shadow-xs"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded">
            Ctrl + K
          </kbd>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/student/help"
            className="relative p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E63946] ring-2 ring-white dark:ring-[#111622]" />
          </Link>
          <Link
            href="/dashboard/student/account"
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title="Account Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center font-bold text-xs text-gray-700 dark:text-gray-200">
              {studentInitials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Banner Card (Reichstag illustration on right, NO hand emoji) */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-6 shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between min-h-[140px] gap-4">
            <div className="space-y-1.5 z-10 max-w-sm">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">
                Welcome back, {studentFirstName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Continue your Germany journey. You're making great progress!
              </p>
            </div>
            <div className="shrink-0 h-32 sm:h-36 w-full sm:w-72 relative -mr-6 -my-6 sm:my-0 sm:mr-0">
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-[#111622] to-transparent z-10 hidden sm:block pointer-events-none" />
              <Image
                src="/images/germany-header.jpg"
                alt="Germany Reichstag"
                fill
                className="object-cover object-right rounded-r-2xl"
                priority
              />
            </div>
          </div>

          {/* Your Germany Journey Roadmap Card */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Your Germany Journey Roadmap</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Track and complete each step to reach your study goal.</p>
              </div>
              <span className="text-xs font-bold text-[#E63946] bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/60 px-3 py-1 rounded-full">
                {completionPercentage}% Completed
              </span>
            </div>

            {/* Stepper horizontal track */}
            <div className="relative pb-2">
              {/* Connecting line */}
              <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-200 dark:bg-gray-800 z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: '45%' }}
                />
              </div>

              <div className="grid grid-cols-5 relative z-10">
                {journeySteps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = step.status === 'completed';
                  const isPurple = step.isPurple;
                  const isReview = step.isReview;

                  return (
                    <Link
                      key={step.label}
                      href={step.href}
                      className="flex flex-col items-center text-center group cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isPurple
                            ? 'bg-purple-600 text-white shadow-xs'
                            : isReview
                              ? 'bg-white dark:bg-[#111622] border-2 border-[#E63946] text-[#E63946]'
                              : 'bg-white dark:bg-[#111622] border-2 border-gray-300 dark:border-gray-700 text-gray-400'
                        }`}>
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>

                      <span className="text-xs font-bold text-gray-900 dark:text-white mt-2 group-hover:text-[#E63946] transition-colors">
                        {step.label}
                      </span>
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[90px]">
                        {step.desc}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4 Stat Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* German GPA */}
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">German GPA</div>
                <div className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
                  {gpaNum !== null ? gpaNum.toFixed(2) : '1.60'}
                </div>
              </div>
              <div className="mt-2.5">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                  {gpaTier}
                </span>
              </div>
            </div>

            {/* Matched Programs */}
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Matched Programs</div>
                <div className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
                  {matchedUnisCount}
                </div>
              </div>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5">
                Across Public Universities
              </p>
            </div>

            {/* Approved Documents */}
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Approved Documents</div>
                <div className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-1">
                  {`${approvedCount} / ${totalChecklistCount}`}
                </div>
              </div>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5">
                Unique APS, Degree & Visa
              </p>
            </div>

            {/* Target Intake */}
            <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Target Intake</div>
                <div className="text-xl font-bold font-display text-gray-900 dark:text-white mt-1 truncate">
                  {(profile?.intakeSeason || 'WINTER').toUpperCase()} {profile?.intakeYear || 2027}
                </div>
              </div>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-2.5 truncate" title="Master's · Aeronautical Engineering">
                {profile?.targetDegree || "Master's"} · {profile?.fieldOfStudy || profile?.targetCourse || 'Aeronautical Engineering'}
              </p>
            </div>
          </div>

          {/* AI-Matched Universities Card */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">AI-Matched Universities</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Universities tailored to your profile and language proficiency.</p>
              </div>
              <Link
                href="/dashboard/student/matching"
                className="text-xs font-bold text-[#E63946] hover:text-[#D62839] flex items-center gap-1 transition-colors"
              >
                <span>View All ({matchedUnisCount})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {displayMatches.map((prog) => {
                const progId = String(prog.programmeId || prog.id);
                const isShortlisted = shortlistedIds.has(progId);
                const isProcessing = shortlistingProgId === progId;

                return (
                  <div
                    key={prog.id}
                    className="p-4 rounded-xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-[#131B2E] hover:border-gray-300 dark:hover:border-gray-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      {/* University Logo */}
                      <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-gray-700 flex items-center justify-center p-2 shrink-0">
                        <Image
                          src={prog.logo}
                          alt={prog.universityName}
                          width={48}
                          height={48}
                          className="max-h-10 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white whitespace-normal break-words leading-snug">
                            {prog.universityName}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 shrink-0">
                            {prog.universityType || 'Public'} · {prog.country || 'Germany'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 whitespace-normal break-words leading-snug">
                          {prog.programName}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500 dark:text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Coins className="w-3.5 h-3.5 text-gray-400" />
                            Tuition: <strong className="text-gray-700 dark:text-gray-200 font-semibold">{prog.tuition}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            Deadline: <strong className="text-gray-700 dark:text-gray-200 font-semibold">{prog.deadline}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center md:flex-col items-end gap-2 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                        Eligible
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleShortlist(prog)}
                        disabled={isProcessing}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Star className={`w-3.5 h-3.5 ${isShortlisted ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                        )}
                        <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Your Germany Expert Card */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Your Germany Expert</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-100 text-[#E63946] dark:bg-red-950/50 dark:text-red-400 font-bold text-sm flex items-center justify-center shrink-0">
                {assignedCounsellor?.name
                  ? assignedCounsellor.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
                  : 'CU'}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                  {assignedCounsellor?.name || 'Counsellor User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {assignedCounsellor?.role || 'EuropeBridge Senior Counsellor'}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Directly Connected</span>
              </div>
              {assignedCounsellor?.email && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{assignedCounsellor.email}</span>
                </div>
              )}
            </div>

            {/* Upcoming / Active Meeting notification banner */}
            {meetingsData?.upcoming?.[0] && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200 font-bold text-[11px]">
                  <span>Confirmed Meeting</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    {meetingsData.upcoming[0].status}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  {meetingsData.upcoming[0].humanTime}
                </p>
                {meetingsData.upcoming[0].meeting_link && (
                  <a
                    href={meetingsData.upcoming[0].meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#E63946] font-bold text-xs hover:underline pt-0.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Meeting</span>
                  </a>
                )}
              </div>
            )}

            {/* Book Strategy Meeting Button */}
            <button
              type="button"
              onClick={() => {
                setBookingMode('student_book');
                setSelectedMeetingForReschedule(null);
                setIsBookingModalOpen(true);
              }}
              className="w-full bg-[#E63946] hover:bg-[#D62839] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Meeting</span>
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>

            <div className="space-y-2">
              <Link
                href="/dashboard/student/complete-profile"
                className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Update My Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
              </Link>

              <Link
                href="/dashboard/student/documents"
                className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Upload Documents</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
              </Link>

              <Link
                href="/dashboard/student/aps"
                className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Check APS Checklist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
              </Link>

              <Link
                href="/dashboard/student/services"
                className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <LayoutGrid className="w-4 h-4 text-gray-500 group-hover:text-[#E63946] transition-colors" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Explore Services</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Tip for You Card */}
          <div className="bg-[#FFF5F5] dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#E63946]">
              <Lightbulb className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Tip for You</h4>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              Complete your document approvals early to avoid last-minute delays.
            </p>
          </div>
        </div>
      </div>

      {/* BookMyShow-Style Meeting Booking Modal */}
      {isBookingModalOpen && (
        <MeetingBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedMeetingForReschedule(null);
          }}
          onSuccess={() => {
            fetchStudentMeetings();
          }}
          mode={bookingMode}
          userRole="student"
          counsellorId={assignedCounsellor?.id}
          counsellorName={assignedCounsellor?.name}
          existingMeetingId={selectedMeetingForReschedule?.id}
          currentMeetingHumanTime={selectedMeetingForReschedule?.displayTime || selectedMeetingForReschedule?.humanTime}
        />
      )}

      {/* Reschedule Decline / Withdraw Warning Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
                  {confirmDeleteModal.title || 'Delete Meeting Schedule?'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {confirmDeleteModal.message}
            </p>

            <div>
              <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                Reason (Optional)
              </label>
              <input
                type="text"
                value={confirmDeleteModal.reason}
                onChange={(e) => setConfirmDeleteModal((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g. Schedule conflict, will rebook next week..."
                className="w-full text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-[#E63946] text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                disabled={confirmDeleteModal.isSubmitting}
              >
                Keep Proposal
              </button>
              <button
                type="button"
                onClick={executeDeclineReschedule}
                disabled={confirmDeleteModal.isSubmitting}
                className="bg-[#E63946] hover:bg-[#D62839] text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                {confirmDeleteModal.isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Meeting Modal */}
      {cancelMeetingModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#E63946]">
                <AlertCircle className="w-5 h-5 text-[#E63946]" />
                <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
                  Cancel Meeting
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCancelMeetingModal((prev) => ({ ...prev, isOpen: false, error: null }))}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Cancelling will release the slot and notify your advisor. Please provide a clear cancellation reason.
            </p>

            {cancelMeetingModal.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 rounded-xl">
                {cancelMeetingModal.error}
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                Cancellation Reason <span className="text-[#E63946]">*</span>
              </label>
              <textarea
                value={cancelMeetingModal.reason}
                onChange={(e) => setCancelMeetingModal((prev) => ({ ...prev, reason: e.target.value, error: null }))}
                placeholder="e.g. Unforeseen academic exam commitment, will rebook later..."
                rows={3}
                maxLength={500}
                className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800 mt-1 focus:ring-2 focus:ring-[#E63946] text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelMeetingModal((prev) => ({ ...prev, isOpen: false, error: null }))}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                disabled={cancelMeetingModal.isSubmitting}
              >
                Keep Meeting
              </button>
              <button
                type="button"
                onClick={executeCancelMeeting}
                disabled={cancelMeetingModal.isSubmitting || !cancelMeetingModal.reason.trim()}
                className="bg-[#E63946] hover:bg-[#D62839] text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                {cancelMeetingModal.isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
