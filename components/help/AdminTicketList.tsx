"use client";

import React from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { AdminTicketSummary } from './types';
import { useLazySlice } from '@/hooks/useLazySlice';

interface AdminTicketListProps {
  search: string;
  setSearch: (val: string) => void;
  counsellorFilter: string;
  setCounsellorFilter: (val: string) => void;
  studentFilter: string;
  setStudentFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  uniqueCounsellors: string[];
  uniqueStudents: string[];
  filteredList: AdminTicketSummary[];
  isLoadingList: boolean;
  activeTab: 'escalated' | 'all' | 'resolved';
  selectedTicketId: string | null;
  onSelectTicket: (id: string) => void;
  getPriorityBadge: (priority: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function AdminTicketList({
  search,
  setSearch,
  counsellorFilter,
  setCounsellorFilter,
  studentFilter,
  setStudentFilter,
  priorityFilter,
  setPriorityFilter,
  uniqueCounsellors,
  uniqueStudents,
  filteredList,
  isLoadingList,
  activeTab,
  selectedTicketId,
  onSelectTicket,
  getPriorityBadge,
  getStatusBadge,
}: AdminTicketListProps) {
  const { visibleItems, hasMore, bottomSentinelRef } = useLazySlice(
    filteredList,
    25,
    15,
    [activeTab, search, counsellorFilter, studentFilter, priorityFilter],
  );

  return (
    <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col h-[760px] overflow-hidden">
      {/* Search, Counsellor, Student & Priority Controls */}
      <div className="p-4 border-b border-gray-100 space-y-2.5 bg-gray-50/50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ticket # (e.g. EB-...), Student, or Title..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-germany-red transition-colors"
          />
        </div>

        {/* Counsellor-wise & Student-wise Dropdowns */}
        <div className="grid grid-cols-2 gap-2">
          <ClaySelect
            value={counsellorFilter}
            onChange={(val) => setCounsellorFilter(val)}
            options={[
              { value: 'all', label: 'All Counsellors' },
              { value: 'unassigned', label: 'Unassigned' },
              ...uniqueCounsellors.map((c) => ({ value: c, label: c })),
            ]}
          />

          <ClaySelect
            value={studentFilter}
            onChange={(val) => setStudentFilter(val)}
            options={[
              { value: 'all', label: 'All Students' },
              ...uniqueStudents.map((s) => ({ value: s, label: s })),
            ]}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>Priority:</span>
          </div>
          <div className="w-36">
            <ClaySelect
              value={priorityFilter}
              onChange={(val) => setPriorityFilter(val)}
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'urgent', label: 'Urgent' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Inquiry List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {isLoadingList ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading inquiries...</div>
        ) : filteredList.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400 space-y-2">
            <p className="font-bold text-gray-600">No inquiries found</p>
            <p className="text-[11px]">
              {search
                ? `No query matches "${search}". Check ticket number format.`
                : activeTab === 'escalated'
                ? 'No queries currently escalated to admin. All operational queries are handled by counsellors.'
                : 'No queries in this category.'}
            </p>
          </div>
        ) : (
          <>
            {visibleItems.map((ticket) => {
              const isSelected = ticket.id === selectedTicketId;
              return (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket.id)}
                  className={`p-4 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#FDFBF7] border-l-4 border-l-germany-red'
                      : 'hover:bg-gray-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
                      {ticket.ticketNumber}
                    </span>
                    {getPriorityBadge(ticket.priority)}
                  </div>

                  <div className="font-bold text-xs text-germany-black line-clamp-1 mb-1">
                    {ticket.title}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <span>Student: <strong className="text-gray-700">{ticket.student.name}</strong></span>
                    {getStatusBadge(ticket.status)}
                  </div>

                  {ticket.counsellor && (
                    <div className="text-[10px] text-gray-400 mt-1">
                      Counsellor: <span className="font-bold text-gray-600">{ticket.counsellor.name}</span>
                    </div>
                  )}

                  {ticket.escalationReason && ticket.status === 'escalated' && (
                    <div className="mt-2 p-1.5 bg-red-50/80 border border-red-200/80 rounded-lg text-[10px] text-germany-red font-medium line-clamp-1">
                      ⚡ {ticket.escalationReason}
                    </div>
                  )}
                </div>
              );
            })}
            {hasMore && (
              <div ref={bottomSentinelRef} className="py-4 flex justify-center items-center">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
