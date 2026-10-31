"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  RotateCw, 
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface SuperAdminTicket {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  escalatedTo: string | null;
  escalationReason: string | null;
  escalatedAt: string | null;
  resolvedAt: string | null;
  resolutionSummary: string | null;
  student: {
    id: string;
    name: string;
    email: string;
  };
  counsellor: {
    id: string;
    name: string;
    email: string;
  } | null;
  totalMessages: number;
  internalNotesCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function SuperAdminHelpPage() {
  const [tickets, setTickets] = useState<SuperAdminTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/help/admin/queries`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      // Silently handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredQueries = tickets.filter((q) => {
    const qSearch = search.trim().toLowerCase();
    const matchesSearch = 
      !qSearch ||
      q.ticketNumber.toLowerCase().includes(qSearch) ||
      q.title.toLowerCase().includes(qSearch) ||
      q.student.name.toLowerCase().includes(qSearch) ||
      q.student.email.toLowerCase().includes(qSearch) ||
      (q.counsellor?.name.toLowerCase().includes(qSearch) ?? false);

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRaised = tickets.length;
  const totalResolved = tickets.filter((q) => q.status === 'resolved' || q.status === 'closed').length;
  const totalEscalated = tickets.filter((q) => q.status === 'escalated').length;

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            In Progress
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-germany-red animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-germany-red" />
            Escalated to Admin
          </span>
        );
      case 'resolved':
      case 'closed':
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
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-germany-red text-white rounded-full font-bold text-[10px]">
              <ShieldAlert className="w-3 h-3 text-white" />
              <span>Super Admin</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Full platform governance across all student inquiries, real ticket numbers, counsellor allocations, and administrative escalations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats Inline */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-gray-500 border-r border-gray-200 pr-4">
            <span>Total: <strong className="text-germany-black">{totalRaised}</strong></span>
            <span>Escalated: <strong className="text-germany-red">{totalEscalated}</strong></span>
            <span>Resolved: <strong className="text-emerald-600">{totalResolved}</strong></span>
          </div>

          <button
            onClick={fetchTickets}
            title="Refresh Inquiries"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ticket # (e.g. EB-...), student, or subject..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs text-germany-black placeholder-gray-400 focus:outline-none focus:border-germany-red transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <ClaySelect
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'escalated', label: 'Escalated to Admin' },
              { value: 'resolved', label: 'Resolved' },
            ]}
            className="w-full sm:w-48"
          />

          <Link
            href="/dashboard/admin/help"
            className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Open Help Desk Console</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-germany-gold" />
          </Link>
        </div>
      </div>

      {/* Clean Table */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200/70 text-[11px] font-bold text-gray-400 bg-gray-50/60">
                <th className="py-3 px-4">Ticket Number</th>
                <th className="py-3 px-4">Subject & Category</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Assigned Counsellor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-400 font-medium">
                    Loading inquiries from database...
                  </td>
                </tr>
              ) : filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-400 font-medium">
                    No tickets found matching the governance criteria.
                  </td>
                </tr>
              ) : (
                filteredQueries.map((q) => (
                  <tr 
                    key={q.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        {q.ticketNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.2 rounded mb-1 inline-block">
                        {q.category}
                      </span>
                      <p className="font-bold text-germany-black group-hover:text-germany-red transition-colors truncate">
                        {q.title}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">{q.student.name}</span>
                      <span className="block text-[10px] text-gray-400">{q.student.email}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-gray-600">
                      {q.counsellor ? (
                        <div>
                          <span className="font-medium text-gray-800">{q.counsellor.name}</span>
                          {q.status === 'escalated' && (
                            <span className="block text-[10px] text-germany-red font-bold">
                              ↳ Escalated to Admin
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusDot(q.status)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-gray-400 font-medium font-mono">
                      {new Date(q.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <Link
                        href="/dashboard/admin/help"
                        className="text-gray-500 hover:text-germany-red font-bold inline-flex items-center gap-0.5"
                      >
                        <span>Inspect Desk</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
