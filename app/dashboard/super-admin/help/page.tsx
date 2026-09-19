"use client";

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  ArrowUpRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import QueryDetailModal from '@/components/help/QueryDetailModal';
import { ClaySelect } from '@/components/ClaySelect';
import { useHelpStore, SupportQuery } from '@/store/useHelpStore';

export default function SuperAdminHelpPage() {
  const queries = useHelpStore((s) => s.queries);
  const resetDemoData = useHelpStore((s) => s.resetDemoData);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuery, setSelectedQuery] = useState<SupportQuery | null>(null);

  const filteredQueries = queries.filter((q) => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.raisedBy.name.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'all' || q.raisedBy.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalRaised = queries.length;
  const totalResolved = queries.filter((q) => q.status === 'resolved').length;
  const totalEscalated = queries.filter((q) => q.status === 'escalated_to_admin' || q.escalationInfo).length;

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      case 'in_review_counsellor':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-germany-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-gold" />
            In Review
          </span>
        );
      case 'escalated_to_admin':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-germany-red">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red" />
            Escalated
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Resolved
          </span>
        );
      default:
        return <span className="text-xs text-gray-500 font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* EuropeBridge Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        {/* German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-germany-black">
              Issue Governance & Audit Central
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-black text-white rounded-full font-bold text-[10px]">
              <ShieldAlert className="w-3 h-3 text-germany-gold" />
              <span>Super Admin</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Full platform governance across all student and counsellor queries, lifecycle status, and resolution speed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Stats Inline */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-gray-500 border-r border-gray-200 pr-4">
            <span>Total: <strong className="text-germany-black">{totalRaised}</strong></span>
            <span>Escalated: <strong className="text-germany-red">{totalEscalated}</strong></span>
            <span>Resolved: <strong className="text-emerald-600">{totalResolved}</strong></span>
          </div>

          <button
            onClick={() => resetDemoData()}
            title="Reset Sample Data"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all issues, students, staff..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs text-germany-black placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <ClaySelect
            value={roleFilter}
            onChange={(val) => setRoleFilter(val)}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'student', label: 'Student Raised' },
              { value: 'counsellor', label: 'Counsellor Raised' },
            ]}
            className="w-full sm:w-44"
          />

          <ClaySelect
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'open', label: 'Open' },
              { value: 'in_review_counsellor', label: 'In Review' },
              { value: 'escalated_to_admin', label: 'Escalated' },
              { value: 'resolved', label: 'Resolved' },
            ]}
            className="w-full sm:w-44"
          />
        </div>
      </div>

      {/* Clean Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200/70 text-[11px] font-bold text-gray-400 bg-gray-50/60">
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Raised By</th>
                <th className="py-3 px-4">Handling / Escalated</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400 font-medium">
                    No tickets found matching the governance criteria.
                  </td>
                </tr>
              ) : (
                filteredQueries.map((q) => (
                  <tr 
                    key={q.id}
                    onClick={() => setSelectedQuery(q)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-mono text-[11px] font-bold text-gray-400">{q.id}</span>
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.2 rounded">
                          {q.category}
                        </span>
                      </div>
                      <p className="font-bold text-germany-black group-hover:text-germany-red transition-colors truncate">
                        {q.title}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">{q.raisedBy.name}</span>
                      <span className="block text-[10px] font-semibold text-gray-400 capitalize">{q.raisedBy.role}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-gray-600">
                      {q.assignedCounsellor ? (
                        <div>
                          <span className="font-medium text-gray-800">{q.assignedCounsellor.name}</span>
                          {q.escalationInfo && (
                            <span className="block text-[10px] text-germany-red font-bold">
                              ↳ Escalated to Admin
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Direct to Admin</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusDot(q.status)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-gray-400 font-medium">
                      {q.updatedAt}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <span className="text-gray-400 group-hover:text-germany-red font-bold inline-flex items-center gap-0.5">
                        Audit <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedQuery && (
        <QueryDetailModal
          isOpen={!!selectedQuery}
          onClose={() => setSelectedQuery(null)}
          query={queries.find((q) => q.id === selectedQuery.id) || selectedQuery}
          viewerRole="superadmin"
          viewerName="Super Admin"
          viewerEmail="superadmin@europebridge.de"
        />
      )}
    </div>
  );
}
