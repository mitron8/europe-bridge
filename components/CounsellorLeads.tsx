"use client";

import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { usePaginatedList } from '../hooks/usePaginatedList';

export interface StudentLead {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function CounsellorLeads() {
  const {
    data: leads,
    isLoading,
    isFetchingNextPage,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
  } = usePaginatedList<StudentLead>('/counsellor/leads', 20);

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
          Loading student leads...
        </div>
      ) : error ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-red-500 text-xs font-bold bg-red-50">
          {error}
        </div>
      ) : leads.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
          No student leads available.
        </div>
      ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#EBE7E0]">
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Student Name</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.userId} className="border-b border-[#EBE7E0] hover:bg-[#FDFBF7] transition-colors">
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {lead.email}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                <span className="px-2 py-1 bg-germany-gold/10 text-germany-gold rounded-full text-xs">
                  {formatStatus(lead.status)}
                </span>
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
