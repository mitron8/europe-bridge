"use client";

import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { usePaginatedList } from '../hooks/usePaginatedList';

export interface StudentLead {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  status: string;
  planId?: string | null;
  planName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export function CounsellorLeads() {
  const {
    data: leads,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
  } = usePaginatedList<StudentLead>('/counsellor/leads', 20);

  const formatStatus = (status: string | null) => {
    if (!status) return 'Signed Up';
    if (status === 'shortlist_locked') return 'Shortlist Locked';
    if (status === 'plan_purchased') return 'Plan Purchased';
    if (status === 'matching_completed') return 'Matching Engine Run';
    if (status === 'profile_completed') return 'Profile Completed';
    if (status === 'logged_in') return 'Logged In';
    if (status === 'signed_up') return 'Signed Up';
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
            className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 text-germany-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
          <tr className="border-b-2 border-[#EBE7E0] dark:border-gray-800">
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Name</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">WhatsApp</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.userId} className="border-b border-[#EBE7E0] dark:border-gray-800/80 hover:bg-[#FDFBF7] dark:hover:bg-[#151B27]/60 transition-colors">
              <td className="px-4 py-3 text-sm font-bold text-germany-black dark:text-white">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                <a
                  href={`mailto:${lead.email}`}
                  className="hover:text-germany-red dark:hover:text-germany-red transition-colors"
                  title="Send email"
                >
                  {lead.email}
                </a>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="hover:text-germany-red dark:hover:text-germany-red font-mono text-xs transition-colors"
                    title="Call student"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {lead.whatsapp ? (
                  <a
                    href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.firstName}, I am your German Education Advisor from EuropeBridge.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono text-xs font-bold transition-colors"
                    title="Chat on WhatsApp"
                  >
                    {lead.whatsapp}
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-germany-black dark:text-white">
                <div className="flex flex-col gap-1 items-start">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                    lead.status === 'shortlist_locked'
                      ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                      : lead.status === 'plan_purchased'
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                      : lead.status === 'matching_completed'
                      ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300'
                      : lead.status === 'profile_completed'
                      ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300'
                      : 'bg-germany-gold/15 text-germany-black dark:text-white'
                  }`}>
                    {formatStatus(lead.status)}
                  </span>
                  {lead.planName ? (
                    <span className="text-[10px] font-bold text-germany-red dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-1.5 py-0.5 rounded-md">
                      {lead.planName}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded-md">
                      No Plan
                    </span>
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
  );
}
