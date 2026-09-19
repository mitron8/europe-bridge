"use client";

import React from 'react';
import Link from 'next/link';
import { useHelpStore } from '@/store/useHelpStore';
import {
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Headphones,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

export default function CounsellorDashboard() {
  const queries = useHelpStore((s) => s.queries);
  const pendingInquiries = queries.filter((q) => q.raisedBy.role === 'student' && q.status !== 'resolved');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-bold text-[11px] border border-germany-gold/30">
              <Headphones className="w-3.5 h-3.5" />
              <span>Counsellor Strategy Hub</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black">
              Welcome, Advisor!
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              You have <span className="text-germany-red font-bold">4 student consultations</span> scheduled today and <span className="text-germany-red font-bold">{pendingInquiries.length} inquiries</span> awaiting your guidance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/counsellor/help"
              className="bg-slate-800 hover:bg-slate-900 dark:bg-[#151B27] dark:hover:bg-[#1B2333] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-germany-gold" />
              <span>Guidance & Queries Desk</span>
            </Link>
            <Link
              href="/dashboard/counsellor/students"
              className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Assigned Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Assigned Students</span>
            <div className="p-2 bg-germany-gold/20 rounded-xl text-germany-black">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">36 Active</div>
          <p className="text-[11px] font-bold text-emerald-600">Winter 2026 Cohort</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Scheduled Today</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">4 Consults</div>
          <p className="text-[11px] font-medium text-gray-500">Next at 2:00 PM</p>
        </div>

        <Link
          href="/dashboard/counsellor/help"
          className="bg-white hover:bg-gray-50/80 rounded-xl border border-gray-200/80 hover:border-germany-red/40 shadow-xs p-5 space-y-2 transition-all block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 group-hover:text-germany-red transition-colors">
              Student Help Inquiries
            </span>
            <div className="p-2 bg-red-50 rounded-xl text-germany-red">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-red">
            {pendingInquiries.length} Open
          </div>
          <p className="text-[11px] font-medium text-gray-500 flex items-center justify-between">
            <span>Awaiting your guidance</span>
            <span className="font-bold text-germany-red">Open Desk →</span>
          </p>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Admissions Secured</span>
            <div className="p-2 bg-blue-50 rounded-xl text-blue-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">19 Offers</div>
          <p className="text-[11px] font-medium text-gray-500">TUM, RWTH, Heidelberg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-germany-black">Today's Strategy Sessions</h3>
            <span className="text-xs font-bold text-gray-400">3 Sessions Pending</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { student: 'Aarav Sharma', time: '2:00 PM - 2:45 PM', topic: 'TUM Statement of Purpose Finalization', status: 'Upcoming' },
              { student: 'Simran Kaur', time: '3:30 PM - 4:15 PM', topic: 'APS Document Verification & Notary Check', status: 'Upcoming' },
              { student: 'Vikram Joshi', time: '5:00 PM - 5:30 PM', topic: 'Blocked Account (Expatrio) & Visa Prep', status: 'Upcoming' },
            ].map((s) => (
              <div key={s.student} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-germany-black">{s.student}</div>
                  <div className="text-[11px] font-medium text-gray-500">{s.topic} • <strong className="text-germany-red">{s.time}</strong></div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-germany-red hover:bg-[#D62839] text-white py-1.5 px-3 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer">
                    Launch Meet
                  </button>
                  <button className="p-1.5 bg-white border border-gray-200/80 hover:bg-gray-50 text-gray-600 hover:text-germany-red rounded-xl shadow-xs transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Inquiries Attention Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-germany-black">Recent Queries</h3>
              <span className="bg-red-50 text-germany-red border border-red-200 font-bold text-[10px] px-2 py-0.5 rounded-full">
                {pendingInquiries.length} Active
              </span>
            </div>
            <Link 
              href="/dashboard/counsellor/help"
              className="text-xs font-bold text-germany-red hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {pendingInquiries.slice(0, 3).map((q) => (
              <Link
                key={q.id}
                href="/dashboard/counsellor/help"
                className="block p-3 rounded-xl border border-gray-100 hover:border-germany-red/30 bg-gray-50/50 hover:bg-[#FDFBF7] transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium mb-1">
                  <span className="font-mono font-bold text-gray-600 bg-white px-1.5 py-0.2 rounded border border-gray-200">
                    {q.id}
                  </span>
                  <span className={`font-extrabold uppercase px-1.5 py-0.2 rounded ${
                    q.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {q.priority}
                  </span>
                </div>
                <div className="text-xs font-bold text-germany-black group-hover:text-germany-red transition-colors line-clamp-1">
                  {q.title}
                </div>
                <div className="text-[11px] text-gray-500 font-medium mt-1">
                  From: <strong className="text-gray-700">{q.raisedBy.name}</strong>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/dashboard/counsellor/help"
            className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-[#151B27] dark:hover:bg-[#1B2333] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span>Open Counsellor Help Desk</span>
            <ArrowRight className="w-3.5 h-3.5 text-germany-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
