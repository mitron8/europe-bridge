"use client";

import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  FileCheck,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Building,
  Clock,
  UserCheck
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-red/10 text-germany-red rounded-full font-bold text-[11px] border border-germany-red/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Operations Center</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black">
              Admin Platform Overview
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              Monitor active student admissions, counsellor allocations, and university database updates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/admin/students"
              className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Manage Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Registered Students</span>
            <div className="p-2 bg-germany-gold/20 rounded-xl text-germany-black">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">1,482</div>
          <p className="text-[11px] font-bold text-emerald-600">+18% this month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Counsellors</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">28</div>
          <p className="text-[11px] font-medium text-gray-500">100% capacity filled</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">German Universities</span>
            <div className="p-2 bg-blue-50 rounded-xl text-blue-700">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">180+</div>
          <p className="text-[11px] font-medium text-gray-500">Public & TU9 listed</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">APS Verifications</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">342</div>
          <p className="text-[11px] font-medium text-amber-700">92% approval rate</p>
        </div>
      </div>

      {/* Recent Student Applications Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-germany-black">Recent Student Applications</h3>
          <Link href="/dashboard/admin/students" className="text-xs font-bold text-germany-red hover:underline">
            View All Students
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/80 text-gray-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Student</th>
                <th className="pb-3">Target Intake</th>
                <th className="pb-3">Target Uni / Program</th>
                <th className="pb-3">GPA</th>
                <th className="pb-3">APS Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-germany-black">
              {[
                { name: 'Aarav Sharma', intake: 'Winter 2026', uni: 'TU Munich • Informatics', gpa: '1.4', aps: 'Verified' },
                { name: 'Priya Patel', intake: 'Winter 2026', uni: 'RWTH Aachen • Mechanical', gpa: '1.8', aps: 'In Review' },
                { name: 'Rohan Gupta', intake: 'Summer 2027', uni: 'TU Berlin • Data Science', gpa: '2.0', aps: 'Pending' },
                { name: 'Ananya Deshmukh', intake: 'Winter 2026', uni: 'Uni Stuttgart • Automotive', gpa: '1.5', aps: 'Verified' },
              ].map((s) => (
                <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 font-bold">{s.name}</td>
                  <td className="py-3.5 text-gray-500 font-medium">{s.intake}</td>
                  <td className="py-3.5">{s.uni}</td>
                  <td className="py-3.5 font-black">{s.gpa}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.aps === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      s.aps === 'In Review' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {s.aps}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <button className="py-1 px-3 text-xs font-bold text-gray-700 hover:text-germany-red hover:bg-gray-50 bg-white border border-gray-200/80 rounded-lg shadow-xs transition-colors cursor-pointer">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
