"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Loader2, Eye } from 'lucide-react';
import { usePaginatedList } from '../hooks/usePaginatedList';

export interface AssignedStudent {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
}

export function CounsellorStudents() {
  const {
    data: students,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
  } = usePaginatedList<AssignedStudent>('/counsellor/students', 20);

  const formatStatus = (status: string | null) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200/80 rounded-xl text-xs font-bold text-germany-black placeholder:text-gray-400 focus:outline-none focus:border-germany-red focus:ring-1 focus:ring-germany-red/20 shadow-xs"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
          Loading assigned students...
        </div>
      ) : error ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-red-500 text-xs font-bold bg-red-50">
          {error}
        </div>
      ) : students.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
          No students assigned yet.
        </div>
      ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#EBE7E0]">
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Student Name</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.userId} className="border-b border-[#EBE7E0] hover:bg-[#FDFBF7] transition-colors">
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.email}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                <span className="px-2 py-1 bg-germany-gold/10 text-germany-gold rounded-full text-xs">
                  {formatStatus(student.status)}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-right">
                <Link
                  href={`/dashboard/counsellor/students/${student.userId}`}
                  className="py-1.5 px-3.5 text-xs font-extrabold text-germany-black hover:text-germany-red hover:border-germany-red/40 bg-white border border-gray-200/80 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  title={`View details for ${student.firstName} ${student.lastName}`}
                >
                  <Eye className="w-3.5 h-3.5 text-germany-red" />
                  <span>View</span>
                </Link>
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
  );
}
