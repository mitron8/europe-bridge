"use client";

import React, { useState } from 'react';
import {
  Search,
  X,
  AlertCircle,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { usePaginatedList } from '../../hooks/usePaginatedList';
import { Counsellor, CounsellorPerformance, Student } from './types';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export function AssignStudentModal({
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
