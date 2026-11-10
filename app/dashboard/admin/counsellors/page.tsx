"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Plus,
  X,
  UserCheck,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  Loader2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  List,
  RefreshCw,
  Users
} from 'lucide-react';
import { usePaginatedList } from '../../../../hooks/usePaginatedList';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

type Counsellor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  assignedStudentCount: number;
};

type CounsellorPerformance = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  assignedStudentCount: number;
  totalMeetingsCount: number;
  completedMeetingsCount: number;
  upcomingMeetingsCount: number;
  cancelledMeetingsCount: number;
  totalTicketsCount: number;
  resolvedTicketsCount: number;
  openTicketsCount: number;
};

type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
  counsellorId: string | null;
  counsellorFirstName: string | null;
  counsellorLastName: string | null;
};

function AssignStudentModal({
  counsellor,
  onClose,
  onSuccess,
}: {
  counsellor: Counsellor | CounsellorPerformance;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const {
    data: unassignedStudents,
    isLoading: isUnassignedLoading,
    searchQuery: unassignedSearch,
    setSearchQuery: setUnassignedSearch,
    bottomSentinelRef: unassignedSentinelRef,
    hasMore: hasMoreUnassigned,
  } = usePaginatedList<Student>(`/admin/students?excludeCounsellorId=${counsellor.id}`, 20);

  const {
    data: assignedStudents,
    isLoading: isAssignedLoading,
    bottomSentinelRef: assignedSentinelRef,
    hasMore: hasMoreAssigned,
  } = usePaginatedList<Student>(`/admin/students?counsellorId=${counsellor.id}`, 20);

  const handleAssignStudent = async () => {
    if (!selectedStudentId) return;
    setIsAssigning(true);
    setAssignError('');

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/assign-counsellor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          studentId: selectedStudentId,
          counsellorId: counsellor.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to assign student');
      }

      setIsAddingStudent(false);
      setSelectedStudentId('');
      onSuccess();
      onClose();
    } catch (err: any) {
      setAssignError(err.message || 'Failed to assign student');
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
      <div className="bg-[#FDFBF7] dark:bg-[#111622] neu-card w-full max-w-md p-6 relative border border-transparent dark:border-gray-800 animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-display font-extrabold text-germany-black dark:text-white mb-5">
          Assign Student
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Counsellor</p>
              <p className="text-sm font-extrabold text-germany-black dark:text-white">
                {counsellor.firstName} {counsellor.lastName}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Assigned Students</p>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                {counsellor.assignedStudentCount}
              </p>
            </div>
          </div>

          {!isAddingStudent ? (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Assigned Students
                </label>
                <div className="max-h-48 overflow-y-auto border border-[#EBE7E0] dark:border-gray-800 rounded-xl bg-white dark:bg-[#0A0D14]">
                  {isAssignedLoading ? (
                    <div className="p-4 text-center text-xs text-gray-400 font-bold">Loading...</div>
                  ) : (() => {
                    if (assignedStudents.length === 0) {
                      return (
                        <div className="p-4 text-center text-xs text-gray-400 font-bold">
                          No students assigned yet.
                        </div>
                      );
                    }
                    return (
                      <div className="divide-y divide-[#EBE7E0] dark:divide-gray-800">
                        {assignedStudents.map((s) => (
                          <div key={s.userId} className="p-3">
                            <p className="text-xs font-bold text-germany-black dark:text-white">
                              {s.firstName} {s.lastName}
                            </p>
                            <p className="text-[10px] font-bold text-gray-500">{s.email}</p>
                          </div>
                        ))}
                        {hasMoreAssigned && (
                          <div ref={assignedSentinelRef} className="p-3 flex justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAddingStudent(true)}
                  className="w-full neu-btn-primary py-3 text-sm font-extrabold"
                >
                  + Add Student
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Select Student
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0] dark:bg-gray-800 text-germany-black dark:text-white text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-germany-red/30 min-h-[42px]"
                  >
                    <span className="whitespace-normal break-words leading-snug pr-2">
                      {selectedStudentId
                        ? (() => {
                            const s = unassignedStudents.find((x) => x.userId === selectedStudentId);
                            const currentCounsellorName = s?.counsellorFirstName
                              ? `${s.counsellorFirstName} ${s.counsellorLastName}`
                              : 'Unassigned';
                            return s
                              ? `${s.firstName} ${s.lastName} — ${currentCounsellorName}`
                              : '— Student Selected —';
                          })()
                        : '— Choose a student —'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                        isSelectOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isSelectOpen && (
                    <div className="absolute left-0 right-0 mt-2 max-h-64 flex flex-col neu-dropdown z-50 p-2 overflow-hidden bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
                      <div className="p-1 mb-1 relative shrink-0">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search students..."
                          value={unassignedSearch}
                          onChange={(e) => setUnassignedSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs font-bold neu-input bg-white dark:bg-[#0A0D14] focus:outline-none"
                        />
                      </div>
                      <div className="overflow-y-auto flex-1 space-y-1 custom-scrollbar max-h-48 pr-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudentId('');
                            setIsSelectOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-gray-400 neu-dropdown-item hover:bg-[#EBE7E0] dark:hover:bg-gray-800 transition-colors"
                        >
                          — Choose a student —
                        </button>
                        {isUnassignedLoading && (
                          <div className="p-4 text-center text-xs text-gray-400 font-bold">Loading...</div>
                        )}
                        {!isUnassignedLoading && unassignedStudents.length === 0 && (
                          <div className="p-4 text-center text-xs text-gray-400 font-bold">No students found.</div>
                        )}
                        {unassignedStudents.map((s) => {
                          const currentCounsellorName = s.counsellorFirstName
                            ? `${s.counsellorFirstName} ${s.counsellorLastName}`
                            : 'Unassigned';
                          return (
                            <button
                              key={s.userId}
                              type="button"
                              onClick={() => {
                                setSelectedStudentId(s.userId);
                                setIsSelectOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs font-bold neu-dropdown-item transition-all whitespace-normal break-words leading-snug ${
                                selectedStudentId === s.userId
                                  ? 'neu-dropdown-item-active'
                                  : 'text-germany-black dark:text-gray-200 hover:bg-[#EBE7E0] dark:hover:bg-gray-800'
                              }`}
                            >
                              {s.firstName} {s.lastName} — {currentCounsellorName}
                            </button>
                          );
                        })}
                        {hasMoreUnassigned && (
                          <div ref={unassignedSentinelRef} className="py-3 flex justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {assignError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{assignError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setIsAddingStudent(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-extrabold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignStudent}
                  disabled={!selectedStudentId || isAssigning}
                  className="flex-1 neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50 flex items-center justify-center"
                >
                  {isAssigning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {isAssigning ? 'Assigning...' : 'Confirm'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminCounsellorPage() {
  const [activeTab, setActiveTab] = useState<'directory' | 'performance'>('performance');

  // Directory paginated list
  const {
    data: counsellors,
    isLoading: isDirectoryLoading,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
    refetch: refetchDirectory,
  } = usePaginatedList<Counsellor>('/admin/counsellors', 25);

  // Performance metrics state
  const [performanceData, setPerformanceData] = useState<CounsellorPerformance[]>([]);
  const [isPerfLoading, setIsPerfLoading] = useState(false);
  const [perfError, setPerfError] = useState<string | null>(null);
  const [perfSearch, setPerfSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [assignModal, setAssignModal] = useState<{ counsellor: Counsellor | CounsellorPerformance } | null>(null);

  const fetchPerformance = async () => {
    setIsPerfLoading(true);
    setPerfError(null);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors/performance`, {
        credentials: 'include',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to load counsellor performance metrics');
      }
      const data = await res.json();
      setPerformanceData(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setPerfError(err.message || 'Unable to connect to counsellor metrics service');
    } finally {
      setIsPerfLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAssignModal = (counsellor: Counsellor | CounsellorPerformance) => {
    setActiveMenu(null);
    setAssignModal({ counsellor });
  };

  const handleCreateCounsellor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.message;
        if (Array.isArray(data.message)) {
          errorMsg = data.message.join(', ');
        }
        throw new Error(errorMsg || 'Failed to create counsellor');
      }

      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      refetchDirectory();
      fetchPerformance();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered performance list
  const filteredPerformance = performanceData.filter((c) => {
    if (!perfSearch.trim()) return true;
    const q = perfSearch.toLowerCase();
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    return fullName.includes(q) || c.email.toLowerCase().includes(q);
  });

  // Fleet performance summary totals
  const totalCaseload = performanceData.reduce((acc, c) => acc + (c.assignedStudentCount || 0), 0);
  const totalPlatformMeetings = performanceData.reduce((acc, c) => acc + (c.totalMeetingsCount || 0), 0);
  const totalCompletedMeetings = performanceData.reduce((acc, c) => acc + (c.completedMeetingsCount || 0), 0);
  const totalFleetQueries = performanceData.reduce((acc, c) => acc + (c.totalTicketsCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-red/10 text-germany-red rounded-full font-bold text-[11px] border border-germany-red/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Counsellor Operations & Oversight</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black dark:text-white">
              Counsellor Management & Performance
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              Inspect advising workloads, consultation completions, support query resolution, and student assignments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (activeTab === 'performance') fetchPerformance();
                else refetchDirectory();
              }}
              className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white rounded-xl border border-gray-200/80 dark:border-gray-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isPerfLoading || isDirectoryLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="neu-btn-primary py-2.5 px-4 text-xs font-extrabold flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Counsellor</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'performance'
                ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Performance Scorecards</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'performance'
                  ? 'bg-germany-gold text-germany-black'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {performanceData.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Directory & Assignments</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PERFORMANCE SCORECARD */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Fleet Performance Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400">Total Advising Team</span>
              <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
                {isPerfLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : performanceData.length}
              </div>
              <p className="text-[11px] font-medium text-gray-500">Active platform counsellors</p>
            </div>

            <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400">Managed Student Caseload</span>
              <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
                {isPerfLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : totalCaseload}
              </div>
              <p className="text-[11px] font-medium text-emerald-600">Assigned active students</p>
            </div>

            <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400">Consultations Held</span>
              <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
                {isPerfLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : totalPlatformMeetings}
              </div>
              <p className="text-[11px] font-medium text-blue-600">
                {totalCompletedMeetings} completed sessions
              </p>
            </div>

            <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-5 space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400">Student Help Queries</span>
              <div className="text-2xl font-display font-bold text-germany-black dark:text-white">
                {isPerfLoading ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : totalFleetQueries}
              </div>
              <p className="text-[11px] font-medium text-amber-600">Assigned support queries</p>
            </div>
          </div>

          {/* Search Bar for Scorecards */}
          <div className="bg-white dark:bg-[#111622] rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-xs p-4 flex items-center justify-between gap-4">
            <div className="w-full md:w-96 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search counsellor scorecard..."
                value={perfSearch}
                onChange={(e) => setPerfSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14] text-germany-black dark:text-white border border-gray-200/80 dark:border-gray-800 rounded-xl"
              />
            </div>
            <div className="text-xs font-bold text-gray-400">
              Showing {filteredPerformance.length} of {performanceData.length} counsellors
            </div>
          </div>

          {perfError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{perfError}</span>
            </div>
          )}

          {/* Counsellor Scorecard Grid */}
          {isPerfLoading ? (
            <div className="py-16 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-bold">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading counsellor performance scorecards...</span>
            </div>
          ) : filteredPerformance.length === 0 ? (
            <div className="py-16 bg-white dark:bg-[#111622] rounded-2xl border border-dashed border-gray-200/80 dark:border-gray-800 text-center space-y-2">
              <UserCheck className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto" />
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">No counsellors found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPerformance.map((c) => {
                const completionRate =
                  c.totalMeetingsCount > 0
                    ? Math.round((c.completedMeetingsCount / c.totalMeetingsCount) * 100)
                    : null;

                return (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between space-y-5"
                  >
                    {/* Card Header */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-bold text-base text-germany-black dark:text-white">
                            {c.firstName} {c.lastName}
                          </h3>
                          <p className="text-xs text-gray-400 font-medium">{c.email}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30">
                          Active
                        </span>
                      </div>

                      {/* Main Caseload Badge */}
                      <div className="bg-[#FDFBF7] dark:bg-[#0A0D14] border border-gray-200/70 dark:border-gray-800/80 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-germany-red/10 text-germany-red rounded-lg">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Active Caseload
                            </div>
                            <div className="text-sm font-display font-bold text-germany-black dark:text-white">
                              {c.assignedStudentCount} {c.assignedStudentCount === 1 ? 'Student' : 'Students'}
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/dashboard/admin/students?search=${encodeURIComponent(c.firstName)}`}
                          className="text-[11px] font-bold text-germany-red hover:underline inline-flex items-center gap-1"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Consultation Meetings Metric Block */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span>1-on-1 Consultations</span>
                          </span>
                          {completionRate !== null ? (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              {completionRate}% Completed
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-400 font-medium">No sessions yet</span>
                          )}
                        </div>

                        <div className="grid grid-cols-4 gap-2 bg-gray-50 dark:bg-white/5 p-2.5 rounded-xl border border-gray-200/60 dark:border-gray-800/60 text-center">
                          <div>
                            <div className="text-xs font-bold text-germany-black dark:text-white">
                              {c.totalMeetingsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Total</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {c.completedMeetingsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Done</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                              {c.upcomingMeetingsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Upcoming</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                              {c.cancelledMeetingsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Cancelled</div>
                          </div>
                        </div>
                      </div>

                      {/* Queries / Help Tickets Metric Block */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                            <span>Student Queries</span>
                          </span>
                          <span className="text-[10px] font-bold text-gray-400">
                            {c.totalTicketsCount} total
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-white/5 p-2.5 rounded-xl border border-gray-200/60 dark:border-gray-800/60 text-center">
                          <div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {c.resolvedTicketsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Resolved</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                              {c.openTicketsCount}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Open / Active</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-2">
                      <button
                        onClick={() => openAssignModal(c)}
                        className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-germany-black dark:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Assign Student
                      </button>
                      <Link
                        href={`/dashboard/admin/students?search=${encodeURIComponent(c.firstName)}`}
                        className="py-2 px-3 bg-germany-red hover:bg-[#D62839] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Caseload</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DIRECTORY & ASSIGNMENTS TABLE */}
      {activeTab === 'directory' && (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-96 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search counsellors by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14] text-germany-black dark:text-white border border-gray-200/80 dark:border-gray-800"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="neu-btn-primary py-2 px-4 text-xs font-extrabold flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Counsellor</span>
            </button>
          </div>

          {isDirectoryLoading ? (
            <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold">
              Loading counsellors...
            </div>
          ) : counsellors.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-2xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
              <UserCheck className="w-8 h-8 text-gray-300" />
              <span>No counsellors found.</span>
            </div>
          ) : (
            <div className="overflow-x-auto pt-2 pb-4" ref={menuRef}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBE7E0] dark:border-gray-800 text-gray-400 font-extrabold uppercase text-[10px]">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Assigned Students</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7E0] dark:divide-gray-800 font-bold text-germany-black dark:text-white">
                  {counsellors.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FDFBF7] dark:hover:bg-white/5 relative">
                      <td className="py-3.5 font-bold">
                        {c.firstName} {c.lastName}
                      </td>
                      <td className="py-3.5 text-gray-500 dark:text-gray-400">{c.email}</td>
                      <td className="py-3.5 text-gray-700 dark:text-gray-300">{c.assignedStudentCount} students</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 capitalize">
                          {c.role}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}
                            className="p-1.5 rounded-lg hover:bg-[#EBE7E0] dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-germany-black dark:hover:text-white cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {activeMenu === c.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-48 neu-dropdown z-30 p-1.5 overflow-hidden bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
                              <button
                                onClick={() => openAssignModal(c)}
                                className="w-full text-left px-3.5 py-2 text-xs font-bold text-germany-black dark:text-white neu-dropdown-item hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                              >
                                Assign Student
                              </button>
                              <Link
                                href={`/dashboard/admin/students?search=${encodeURIComponent(c.firstName)}`}
                                className="w-full block text-left px-3.5 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                View Student Caseload
                              </Link>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hasMore && (
                <div ref={bottomSentinelRef} className="py-6 flex justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal: Create Counsellor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] dark:bg-[#111622] neu-card w-full max-w-md p-6 relative border border-transparent dark:border-gray-800 animate-in fade-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-display font-extrabold text-germany-black dark:text-white mb-6">
              Create Counsellor
            </h2>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCounsellor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Counsellor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Student */}
      {assignModal && (
        <AssignStudentModal
          counsellor={assignModal.counsellor}
          onClose={() => setAssignModal(null)}
          onSuccess={() => {
            refetchDirectory();
            fetchPerformance();
          }}
        />
      )}
    </div>
  );
}
