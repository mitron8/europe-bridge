"use client";

import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Users,
  AlertCircle,
  X,
  ChevronDown,
  Loader2,
  Eye,
  UserCheck,
} from 'lucide-react';
import { usePaginatedList } from '../../../../hooks/usePaginatedList';
import { StudentDetailModal } from '@/components/StudentDetailModal';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  status: string | null;
  planId?: string | null;
  planName?: string | null;
  planAmount?: number | null;
  createdAt?: string | null;
  counsellorId: string | null;
  counsellorFirstName: string | null;
  counsellorLastName: string | null;
};

type Counsellor = {
  id: string;
  firstName: string;
  lastName: string;
  assignedStudentCount: number;
};

function AssignCounsellorModal({
  student,
  onClose,
  onSuccess,
}: {
  student: Student;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const {
    data: counsellors,
    isLoading: isCounsellorsLoading,
    searchQuery: counsellorSearch,
    setSearchQuery: setCounsellorSearch,
    bottomSentinelRef: counsellorSentinelRef,
    hasMore: hasMoreCounsellors,
  } = usePaginatedList<Counsellor>('/admin/counsellors', 20);

  const [selectedCounsellorId, setSelectedCounsellorId] = useState(student.counsellorId || '');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleAssign = async () => {
    if (!selectedCounsellorId) return;
    setIsAssigning(true);
    setAssignError('');

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/assign-counsellor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          studentId: student.userId,
          counsellorId: selectedCounsellorId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to assign counsellor');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setAssignError(err.message || 'Failed to assign counsellor');
    } finally {
      setIsAssigning(false);
    }
  };

  const selectedCounsellor = counsellors.find((c) => c.id === selectedCounsellorId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] dark:bg-[#111622] neu-card w-full max-w-md p-6 relative border border-transparent dark:border-gray-800 animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-display font-extrabold text-germany-black dark:text-white mb-5">
          Assign Counsellor
        </h2>

        <div className="space-y-4">
          <div className="p-3 bg-white dark:bg-[#151B27] rounded-xl border border-gray-200/80 dark:border-gray-800">
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Student</p>
            <p className="text-sm font-extrabold text-germany-black dark:text-white">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-xs text-gray-500 font-medium">{student.email}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Select Counsellor
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0] dark:bg-gray-800 text-germany-black dark:text-white text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-germany-red/30 min-h-[42px]"
              >
                <span className="whitespace-normal break-words leading-snug pr-2">
                  {selectedCounsellor
                    ? `${selectedCounsellor.firstName} ${selectedCounsellor.lastName} (${selectedCounsellor.assignedStudentCount} students)`
                    : '— Choose a counsellor —'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                    isSelectOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isSelectOpen && (
                <div className="absolute left-0 right-0 mt-2 max-h-60 flex flex-col neu-dropdown z-50 p-2 overflow-hidden bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
                  <div className="p-1 mb-1 relative shrink-0">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search counsellors..."
                      value={counsellorSearch}
                      onChange={(e) => setCounsellorSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs font-bold neu-input bg-white dark:bg-[#0A0D14] focus:outline-none"
                    />
                  </div>

                  <div className="overflow-y-auto flex-1 space-y-1 custom-scrollbar max-h-44 pr-0.5">
                    {isCounsellorsLoading && (
                      <div className="p-4 text-center text-xs text-gray-400 font-bold">Loading...</div>
                    )}
                    {!isCounsellorsLoading && counsellors.length === 0 && (
                      <div className="p-4 text-center text-xs text-gray-400 font-bold">
                        No counsellors found.
                      </div>
                    )}
                    {counsellors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedCounsellorId(c.id);
                          setIsSelectOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold neu-dropdown-item transition-all flex items-center justify-between cursor-pointer rounded-lg ${
                          selectedCounsellorId === c.id
                            ? 'bg-germany-red text-white'
                            : 'text-germany-black dark:text-gray-200 hover:bg-[#EBE7E0] dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>
                          {c.firstName} {c.lastName}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            selectedCounsellorId === c.id
                              ? 'text-white/80'
                              : 'text-gray-400'
                          }`}
                        >
                          {c.assignedStudentCount} students
                        </span>
                      </button>
                    ))}
                    {hasMoreCounsellors && (
                      <div ref={counsellorSentinelRef} className="py-3 flex justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {assignError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{assignError}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isAssigning}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 rounded-xl text-xs font-extrabold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAssign}
              disabled={isAssigning || !selectedCounsellorId}
              className="px-5 py-2 bg-germany-red hover:bg-germany-red/90 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {isAssigning && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{student.counsellorId ? 'Reassign Counsellor' : 'Assign Counsellor'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminStudentsPage() {
  const {
    data: students,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
    refetch,
  } = usePaginatedList<Student>('/admin/students', 25);

  const [assignModal, setAssignModal] = useState<{ student: Student } | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

  const formatStatus = (status: string | null) => {
    if (!status) return 'Signed Up';
    if (status === 'shortlist_locked') return 'Shortlist Locked';
    if (status === 'plan_purchased') return 'Plan Purchased';
    if (status === 'matching_completed') return 'Matching Engine Run';
    if (status === 'profile_completed') return 'Profile Completed';
    if (status === 'logged_in') return 'Logged In';
    if (status === 'signed_up') return 'Signed Up';
    return status.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-germany-red border border-red-200/60 dark:border-red-900/40">
              Super Admin Executive View
            </span>
            <span className="text-xs text-gray-400 font-bold">Platform Student Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-germany-black dark:text-white">
            Student Leads &amp; Caseload
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Real-time directory of all enrolled students, active subscription packages, journey stages, and assigned counsellors.
          </p>
        </div>

        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search students, emails, plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 rounded-xl text-xs font-bold text-germany-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-germany-red focus:ring-1 focus:ring-germany-red/20 shadow-xs"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-12 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-3xl text-center text-gray-400 text-xs font-bold space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-germany-red" />
            <p>Loading students directory...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-[#EBE7E0] dark:border-gray-800 rounded-3xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-gray-300" />
            <span>No students found matching your criteria.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#EBE7E0] dark:border-gray-800">
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Phone / WhatsApp
                  </th>
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Journey Status &amp; Plan
                  </th>
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned Counsellor
                  </th>
                  <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-bold">
                {students.map((student) => {
                  const counsellorName = student.counsellorFirstName
                    ? `${student.counsellorFirstName} ${student.counsellorLastName}`
                    : null;

                  return (
                    <tr
                      key={student.userId}
                      className="border-b border-[#EBE7E0] dark:border-gray-800/80 hover:bg-[#FDFBF7] dark:hover:bg-white/5 transition-colors"
                    >
                      {/* Name */}
                      <td className="px-4 py-3.5 text-sm font-bold text-germany-black dark:text-white">
                        <div>
                          <span>
                            {student.firstName} {student.lastName}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
                        {student.email}
                      </td>

                      {/* Phone / WhatsApp */}
                      <td className="px-4 py-3.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
                        <div>{student.phone || '—'}</div>
                        {student.whatsapp && student.whatsapp !== student.phone && (
                          <div className="text-[10px] text-gray-400">WA: {student.whatsapp}</div>
                        )}
                      </td>

                      {/* Status & Subscription Plan */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                              student.status === 'shortlist_locked'
                                ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                                : student.status === 'plan_purchased'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                                : student.status === 'matching_completed'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300'
                                : student.status === 'profile_completed'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
                                : 'bg-germany-gold/15 text-germany-black dark:text-white'
                            }`}
                          >
                            {formatStatus(student.status)}
                          </span>

                          {student.planName ? (
                            <span className="text-[10px] font-extrabold text-germany-red bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-2 py-0.5 rounded-md">
                              {student.planName}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                              No Plan
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Counsellor */}
                      <td className="px-4 py-3.5">
                        {counsellorName ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-germany-black dark:text-white">
                              {counsellorName}
                            </span>
                            <button
                              onClick={() => setAssignModal({ student })}
                              title="Reassign counsellor"
                              className="text-[10px] text-germany-red hover:underline font-extrabold cursor-pointer"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAssignModal({ student })}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 cursor-pointer transition-colors"
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>+ Assign</span>
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* 360 View Profile Button */}
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="py-1.5 px-3 text-xs font-extrabold text-germany-black dark:text-white hover:text-germany-red dark:hover:text-germany-red hover:border-germany-red/40 dark:hover:border-germany-red/50 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                            title={`View 360° Profile for ${student.firstName} ${student.lastName}`}
                          >
                            <Eye className="w-3.5 h-3.5 text-germany-red" />
                            <span>View</span>
                          </button>

                          {/* Quick Assign Dropdown Action */}
                          <button
                            onClick={() => setAssignModal({ student })}
                            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-germany-black dark:hover:text-white transition-colors cursor-pointer"
                            title="Assign or reassign counsellor"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

      {/* 1-Click Reassign Counsellor Modal */}
      {assignModal && (
        <AssignCounsellorModal
          student={assignModal.student}
          onClose={() => setAssignModal(null)}
          onSuccess={() => refetch()}
        />
      )}

      {/* Student 360° Profile & Supervisor Hub Modal */}
      {selectedStudentForDetail && (
        <StudentDetailModal
          student={{
            userId: selectedStudentForDetail.userId,
            firstName: selectedStudentForDetail.firstName,
            lastName: selectedStudentForDetail.lastName,
            email: selectedStudentForDetail.email,
            phone: selectedStudentForDetail.phone,
            whatsapp: selectedStudentForDetail.whatsapp,
            status: selectedStudentForDetail.status,
            planId: selectedStudentForDetail.planId,
            planName: selectedStudentForDetail.planName,
          }}
          studentId={selectedStudentForDetail.userId}
          readOnly={true}
          onClose={() => setSelectedStudentForDetail(null)}
        />
      )}
    </div>
  );
}
