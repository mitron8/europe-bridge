"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MeetingBookingModal } from '@/components/MeetingBookingModal';
import {
  ConfirmDeleteScheduleModal,
  CancelMeetingModal,
  type ConfirmDeleteModalState,
  type CancelMeetingModalState,
} from './components/StudentMeetingModals';
import {
  CounsellorExpertCard,
  QuickActionsCard,
  TipForYouCard,
} from './components/StudentSidebarCards';
import {
  StudentWelcomeBanner,
  StudentJourneyRoadmapCard,
  StudentStatMetricsGrid,
  StudentMatchedUniversitiesCard,
  type MatchedProgramItem,
  type JourneyStep,
} from './components/StudentOverviewCards';
import {
  Check,
  Package,
  ListFilter,
  FileText,
  Loader2,
  Search,
  Bell,
  User,
  Compass,
  Clock,
} from 'lucide-react';

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
  const [notifications, setNotifications] = useState<any[]>([]);

  // Shortlisting state
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [shortlistingProgId, setShortlistingProgId] = useState<string | null>(null);

  // Meetings State
  const [meetingsData, setMeetingsData] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<'student_book' | 'reschedule' | 'counterproposal'>('student_book');
  const [selectedMeetingForReschedule, setSelectedMeetingForReschedule] = useState<any | null>(null);

  const getAuthHeaders = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchStudentMeetings = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/meetings/student/my-meetings`, {
        credentials: 'include',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setMeetingsData(data);
      }
    } catch (err) {
      console.error('Failed to fetch student meetings', err);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/matching/results`, {
        credentials: 'include',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setMatchingData(data);
        if (data.recommendations && Array.isArray(data.recommendations)) {
          const ids = new Set<string>(data.recommendations.map((r: any) => String(r.programmeId || r.id)));
          setShortlistedIds(ids);
        }
      }
    } catch (err) {
      console.error('Failed to fetch matching results', err);
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const authHeaders = getAuthHeaders();

        const [profRes, matchRes, meetRes, notifRes] = await Promise.all([
          fetch(`${API_URL}/student/profile`, { credentials: 'include', headers: authHeaders }).catch(() => null),
          fetch(`${API_URL}/matching/results`, { credentials: 'include', headers: authHeaders }).catch(() => null),
          fetch(`${API_URL}/meetings/student/my-meetings`, { credentials: 'include', headers: authHeaders }).catch(() => null),
          fetch(`${API_URL}/student/notifications`, { credentials: 'include', headers: authHeaders }).catch(() => null),
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
        if (notifRes && notifRes.ok) {
          const notifData = await notifRes.json();
          if (mounted && Array.isArray(notifData)) setNotifications(notifData);
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

  // Poll while matching engine is actively calculating
  useEffect(() => {
    if (!matchingData?.run || (matchingData.run.status !== 'running' && matchingData.run.status !== 'pending')) return;
    const timer = setInterval(() => {
      fetchMatchingResults();
    }, 3000);
    return () => clearInterval(timer);
  }, [matchingData?.run?.status]);

  // ── Calculated Real States ──────────────────────────────────────────────────
  const leadStatus = profile?.leadStatus || 'signed_up';
  const isProfileComplete = profile?.completionPercentage === 100 || Boolean(profile?.gates?.isProfileComplete);

  // Real Matching status
  const isMatchingRun = Boolean(matchingData?.run && matchingData.run.status === 'completed');
  const isMatchingRunning = Boolean(matchingData?.run && (matchingData.run.status === 'running' || matchingData.run.status === 'pending'));
  const hasNotRun = !matchingData || matchingData.status === 'NOT_RUN' || !matchingData.run;
  const matchedUnisCount = hasNotRun ? 0 : (matchingData?.totalMatchedCount ?? matchingData?.results?.length ?? 0);
  const isMatchingDone = Boolean(isMatchingRun || matchedUnisCount > 0 || profile?.gates?.hasMatchingRun);

  // Plan detection (covers profile.subscription, matchingData.subscription, or lead status)
  const subData = profile?.subscription;
  const matchSub = matchingData?.subscription;
  const isPlanPurchased = Boolean(
    subData?.status === 'ACTIVE' ||
    (subData?.planId && subData?.planId !== 'FREE') ||
    matchSub?.status === 'ACTIVE' ||
    matchSub?.planId ||
    profile?.leadStatus === 'plan_purchased' ||
    profile?.planId ||
    profile?.gates?.hasActivePlan
  );

  const planName =
    subData?.planName ||
    matchSub?.plan?.name ||
    matchSub?.planId ||
    profile?.planName ||
    (isPlanPurchased ? 'Active Plan' : null);

  const isShortlistLocked = Boolean(profile?.isMatchingLocked || profile?.gates?.isShortlistLocked || leadStatus === 'shortlist_locked');
  const shortlistedCount = matchingData?.recommendations?.length || shortlistedIds.size || 0;

  // Assigned counsellor (from profile joined with users or null)
  const assignedCounsellor = profile?.assignedCounsellor || null;

  // Unique checklist document statistics (APS + Admission + Visa unique canonical documents)
  const totalChecklistCount = profile?.documentSummary?.totalChecklistRequired || 14;
  const approvedCount = profile?.documentSummary?.verifiedUnique !== undefined
    ? profile.documentSummary.verifiedUnique
    : (profile?.documentSummary?.verified || 0);
  const pendingCount = profile?.documentSummary?.pendingUnique !== undefined
    ? profile.documentSummary.pendingUnique
    : (profile?.documentSummary?.pending || 0);
  const rejectedCount = profile?.documentSummary?.rejectedUnique !== undefined
    ? profile.documentSummary.rejectedUnique
    : (profile?.documentSummary?.rejected || 0);

  // Any document record present in DB (verified, pending, or rejected) counts as uploaded
  const uploadedDocsCount = approvedCount + pendingCount + rejectedCount;
  const isAllDocsVerified = totalChecklistCount > 0 && approvedCount >= totalChecklistCount;
  const isAllDocsUploaded = totalChecklistCount > 0 && uploadedDocsCount >= totalChecklistCount;

  // Bavarian GPA extraction (Real calculation fallback to NA)
  const bestEdu = profile?.educationRecords?.find((e: any) => e.germanGrade !== null && e.germanGrade !== undefined && !isNaN(Number(e.germanGrade)));
  const gpa = bestEdu?.germanGrade ?? profile?.germanGpa ?? null;
  const gpaNum = (gpa !== null && gpa !== undefined && gpa !== '' && !isNaN(Number(gpa))) ? Number(gpa) : null;
  const gpaTier = gpaNum !== null
    ? gpaNum <= 1.5
      ? 'Very Good (Sehr gut)'
      : gpaNum <= 2.5
        ? 'Good (Gut)'
        : gpaNum <= 3.5
          ? 'Satisfactory (Befriedigend)'
          : 'Sufficient'
    : 'NA';

  // Target Intake & Course extraction
  const intakeSeason = (profile?.intakeSeason || '').trim();
  const intakeYear = profile?.intakeYear ? String(profile.intakeYear).trim() : '';
  const targetIntakeDisplay = (intakeSeason && intakeYear)
    ? `${intakeSeason.toUpperCase()} ${intakeYear}`
    : (intakeSeason ? intakeSeason.toUpperCase() : (intakeYear || 'NA'));

  const degree = (profile?.intendedDegreeLevel || profile?.targetDegree || '').trim();
  const course = (profile?.preferredFieldOfStudy || profile?.fieldOfStudy || profile?.preferredSpecialization || profile?.targetCourse || '').trim();
  const targetDegreeCourseDisplay = (degree && course)
    ? `${degree} · ${course}`
    : (degree || course || 'NA');

  // Student name
  const studentFirstName = profile?.firstName?.trim() || '';

  // Overall journey completion points (5 equal stages of 20 points each)
  let progressPoints = 0;
  if (isProfileComplete) progressPoints += 20;
  if (isMatchingDone) progressPoints += 20;
  if (isPlanPurchased) progressPoints += 20;
  if (isShortlistLocked) progressPoints += 20;
  if (isAllDocsVerified) {
    progressPoints += 20;
  } else if (totalChecklistCount > 0 && approvedCount > 0) {
    progressPoints += Math.min(19, Math.round((approvedCount / totalChecklistCount) * 20));
  }
  const completionPercentage = Math.min(100, Math.max(0, progressPoints));

  // 5 Canonical Journey Steps
  const journeySteps: JourneyStep[] = [
    {
      label: 'Profile',
      status: isProfileComplete ? 'completed' : 'upcoming',
      desc: isProfileComplete ? 'Completed' : `${profile?.completionPercentage || 0}% Done`,
      href: '/dashboard/student/complete-profile',
      icon: isProfileComplete ? Check : User,
    },
    {
      label: 'Matching',
      status: isMatchingDone ? 'completed' : 'upcoming',
      desc: isMatchingDone ? `${matchedUnisCount} Programs` : 'Not Run',
      href: '/dashboard/student/matching',
      icon: isMatchingDone ? Check : Compass,
    },
    {
      label: 'Subscription',
      status: isPlanPurchased ? 'completed' : 'upcoming',
      isPurple: isPlanPurchased,
      desc: isPlanPurchased ? (planName || 'Active') : 'Explore Plans',
      href: '/pricing',
      icon: Package,
    },
    {
      label: 'Shortlist',
      status: isShortlistLocked ? 'completed' : (shortlistedCount > 0 ? 'review' : 'upcoming'),
      isReview: !isShortlistLocked && shortlistedCount > 0,
      desc: isShortlistLocked ? 'Locked' : (shortlistedCount > 0 ? `${shortlistedCount} Selected` : 'In Review'),
      href: '/dashboard/student/shortlist',
      icon: isShortlistLocked ? Check : ListFilter,
    },
    {
      label: 'Documents',
      status: isAllDocsVerified ? 'completed' : (isAllDocsUploaded ? 'review' : 'upcoming'),
      isReview: !isAllDocsVerified && isAllDocsUploaded,
      desc: isAllDocsVerified
        ? 'Verified'
        : isAllDocsUploaded
        ? 'Pending Review'
        : `${uploadedDocsCount}/${totalChecklistCount} Uploaded`,
      href: '/dashboard/student/documents',
      icon: isAllDocsVerified ? Check : (isAllDocsUploaded ? Clock : FileText),
    },
  ];

  // Matched Universities to display (uses real matching results if available, else empty)
  const displayMatches: MatchedProgramItem[] = (matchingData?.results && Array.isArray(matchingData.results) && matchingData.results.length > 0)
    ? matchingData.results.slice(0, 3).map((item: any, idx: number) => ({
      id: item.programmeId || item.id || `prog-${idx}`,
      programmeId: item.programmeId || item.id,
      universityName: item.universityName || item.university_name || 'NA',
      programName: item.name || item.program || item.programName || item.program_name || 'NA',
      universityType: item.universityType || 'Public',
      country: item.country || 'Germany',
      tuition: item.tuition || item.tuitionPerSemester
        ? (String(item.tuition || item.tuitionPerSemester).includes('€') ? String(item.tuition || item.tuitionPerSemester) : `€${item.tuition || item.tuitionPerSemester}/semester`)
        : 'Free / None (public university..)',
      deadline: item.nonEuDeadline || item.deadline || 'Upcoming Window',
      status: 'Eligible',
      logo: getUniversityLogo(item.universityName || item.university_name),
    }))
    : [];

  const handleToggleShortlist = async (prog: MatchedProgramItem) => {
    const progId = String(prog.programmeId || prog.id);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
    setShortlistingProgId(progId);
    try {
      const isAlready = shortlistedIds.has(progId);
      if (isAlready) {
        const res = await fetch(`${API_URL}/student/recommendations/${progId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Failed to remove program from shortlist');
        }
        setShortlistedIds((prev) => {
          const next = new Set(prev);
          next.delete(progId);
          return next;
        });
      } else {
        const res = await fetch(`${API_URL}/student/recommendations/shortlist-programme`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          credentials: 'include',
          body: JSON.stringify({ programmeId: progId }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Failed to shortlist program');
        }
        setShortlistedIds((prev) => {
          const next = new Set(prev);
          next.add(progId);
          return next;
        });
      }
    } catch (err: any) {
      alert(err.message || 'Could not update shortlist');
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
    type?: 'reschedule' | 'invitation';
  }>({
    isOpen: false,
    meetingId: null,
    title: '',
    message: '',
    reason: '',
    isSubmitting: false,
    type: 'reschedule',
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

  useEffect(() => {
    if (meetingFeedback) {
      const timer = setTimeout(() => setMeetingFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [meetingFeedback]);

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
      type: 'invitation',
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
      type: 'reschedule',
    });
  };

  const executeDeclineReschedule = async () => {
    if (!confirmDeleteModal.meetingId) return;
    setConfirmDeleteModal((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const actionEndpoint = confirmDeleteModal.type === 'invitation'
        ? `${API_URL}/meetings/${confirmDeleteModal.meetingId}/student/decline-invitation`
        : `${API_URL}/meetings/${confirmDeleteModal.meetingId}/student/decline-reschedule`;

      const res = await fetch(actionEndpoint, {
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
        throw new Error(err.message || 'Failed to process request');
      }
      setMeetingFeedback({
        type: 'success',
        message: confirmDeleteModal.type === 'invitation'
          ? 'Meeting invitation declined.'
          : 'Meeting schedule has been deleted. You can re-book a fresh meeting slot anytime.',
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

  return (
    <div className="space-y-6">
      {/* Top Search & Actions Bar */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search universities, services, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                window.location.href = `/dashboard/student/matching?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="w-full bg-white dark:bg-[#111622] border border-gray-200/90 dark:border-gray-800 rounded-xl pl-9 pr-3 sm:pr-20 py-2.5 text-xs text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF2D48]/20 focus:border-[#EF2D48] transition-all shadow-xs"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded">
            ↵ Enter
          </kbd>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/dashboard/student/help"
            className="relative p-2 sm:p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 rounded-full bg-[#EF2D48] ring-2 ring-white dark:ring-[#111622]" />
            )}
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <StudentWelcomeBanner studentFirstName={studentFirstName} />

          <StudentJourneyRoadmapCard
            completionPercentage={completionPercentage}
            journeySteps={journeySteps}
          />

          <StudentStatMetricsGrid
            gpaNum={gpaNum}
            gpaTier={gpaTier}
            hasNotRun={hasNotRun}
            matchedUnisCount={matchedUnisCount}
            hasDocumentSummary={Boolean(profile?.documentSummary)}
            approvedCount={approvedCount}
            totalChecklistCount={totalChecklistCount}
            targetIntakeDisplay={targetIntakeDisplay}
            targetDegreeCourseDisplay={targetDegreeCourseDisplay}
          />

          <StudentMatchedUniversitiesCard
            hasNotRun={hasNotRun}
            isMatchingRunning={isMatchingRunning}
            matchedUnisCount={matchedUnisCount}
            displayMatches={displayMatches}
            shortlistedIds={shortlistedIds}
            shortlistingProgId={shortlistingProgId}
            matchingStatus={matchingData?.status}
            totalMatchedCount={matchingData?.totalMatchedCount}
            onToggleShortlist={handleToggleShortlist}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <CounsellorExpertCard
            assignedCounsellor={assignedCounsellor}
            upcomingMeeting={meetingsData?.upcoming?.[0]}
            pendingReschedule={meetingsData?.pendingReschedules?.[0]}
            pendingInvitation={meetingsData?.pendingInvitations?.[0]}
            meetingFeedback={meetingFeedback}
            onDismissFeedback={() => setMeetingFeedback(null)}
            onBookMeeting={() => {
              setBookingMode('student_book');
              setSelectedMeetingForReschedule(null);
              setIsBookingModalOpen(true);
            }}
            onAcceptReschedule={(id) => handleAcceptReschedule(id)}
            onDeclineReschedule={(id, isProposalByCounsellor) => handleOpenDeclineRescheduleModal(id, isProposalByCounsellor)}
            onCounterReschedule={(m) => {
              setSelectedMeetingForReschedule(m);
              setBookingMode('counterproposal');
              setIsBookingModalOpen(true);
            }}
            onAcceptInvitation={(id) => handleAcceptInvitation(id)}
            onDeclineInvitation={(id) => handleDeclineInvitation(id)}
            onCancelMeeting={(id) => handleOpenCancelMeetingModal(id)}
            onRescheduleMeeting={(m) => {
              setSelectedMeetingForReschedule(m);
              setBookingMode('reschedule');
              setIsBookingModalOpen(true);
            }}
          />

          <QuickActionsCard />

          <TipForYouCard />
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
      <ConfirmDeleteScheduleModal
        modalState={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onReasonChange={(reason) => setConfirmDeleteModal((prev) => ({ ...prev, reason }))}
        onConfirm={executeDeclineReschedule}
      />

      {/* Cancel Meeting Modal */}
      <CancelMeetingModal
        modalState={cancelMeetingModal}
        onClose={() => setCancelMeetingModal((prev) => ({ ...prev, isOpen: false, error: null }))}
        onReasonChange={(reason) => setCancelMeetingModal((prev) => ({ ...prev, reason, error: null }))}
        onConfirm={executeCancelMeeting}
      />
    </div>
  );
}
