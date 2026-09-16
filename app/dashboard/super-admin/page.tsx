"use client";

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Users,
  Building,
  TrendingUp,
  CreditCard,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';

export default function SuperAdminDashboard() {
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-black text-white rounded-full font-bold text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-germany-gold" />
              <span>Super Administrator Portal</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black">
              Executive System Command
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              Cross-portal analytics, financial settlement, counsellor assignments, and system health.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/super-admin/reports"
              className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Platform Reports</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Users</span>
            <div className="p-2 bg-germany-black text-white rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">1,540</div>
          <p className="text-[11px] font-bold text-emerald-600">Students, Staff & Admins</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Revenue</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">₹48.2L</div>
          <p className="text-[11px] font-bold text-emerald-600">+24% vs last quarter</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Admissions Success</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-germany-black">98.4%</div>
          <p className="text-[11px] font-medium text-gray-500">Public German Universities</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">System Status</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display font-bold text-emerald-600">Operational</div>
          <p className="text-[11px] font-medium text-gray-500">NestJS API & Postgres OK</p>
        </div>
      </div>
    </div>
  );
}
