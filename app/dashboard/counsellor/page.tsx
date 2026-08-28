"use client";

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Headphones,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function CounsellorDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-extrabold text-[11px]">
              <Headphones className="w-3.5 h-3.5" />
              <span>Counsellor Strategy Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black">
              Welcome, Advisor!
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
              You have <span className="text-germany-red font-extrabold">4 student consultations</span> scheduled today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/counsellor/students"
              className="neu-btn-primary py-3 px-5 text-xs font-extrabold flex items-center gap-2"
            >
              <span>View Assigned Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Assigned Students</span>
            <div className="p-2 bg-germany-gold/20 rounded-xl text-germany-black">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">36 Active</div>
          <p className="text-[11px] font-bold text-emerald-600">Winter 2026 Cohort</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Scheduled Today</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">4 Consults</div>
          <p className="text-[11px] font-bold text-gray-500">Next at 2:00 PM</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">APS Approvals</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">28 Verified</div>
          <p className="text-[11px] font-bold text-emerald-700">8 pending review</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Admissions Secured</span>
            <div className="p-2 bg-blue-100 rounded-xl text-blue-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">19 Offers</div>
          <p className="text-[11px] font-bold text-gray-500">TUM, RWTH, Heidelberg</p>
        </div>
      </div>

      {/* Today's Schedule & Quick Action */}
      <div className="neu-card p-6 bg-white space-y-4">
        <h3 className="font-display text-lg text-germany-black">Today's Strategy Sessions</h3>
        <div className="divide-y divide-[#EBE7E0]">
          {[
            { student: 'Aarav Sharma', time: '2:00 PM - 2:45 PM', topic: 'TUM Statement of Purpose Finalization', status: 'Upcoming' },
            { student: 'Simran Kaur', time: '3:30 PM - 4:15 PM', topic: 'APS Document Verification & Notary Check', status: 'Upcoming' },
            { student: 'Vikram Joshi', time: '5:00 PM - 5:30 PM', topic: 'Blocked Account (Expatrio) & Visa Prep', status: 'Upcoming' },
          ].map((s) => (
            <div key={s.student} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-germany-black">{s.student}</div>
                <div className="text-[11px] font-bold text-gray-500">{s.topic} • <strong className="text-germany-red">{s.time}</strong></div>
              </div>
              <div className="flex items-center gap-2">
                <button className="neu-btn-primary py-1.5 px-3 text-xs font-extrabold">
                  Launch Google Meet
                </button>
                <button className="neu-btn p-1.5 text-gray-600 hover:text-germany-red">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
