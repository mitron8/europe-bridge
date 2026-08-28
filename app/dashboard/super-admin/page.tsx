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
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-germany-gold" />
              <span>Super Administrator Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black">
              Executive System Command
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
              Cross-portal analytics, financial settlement, counsellor assignments, and system health.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/super-admin/reports"
              className="neu-btn-primary py-3 px-5 text-xs font-extrabold flex items-center gap-2"
            >
              <span>Platform Reports</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Users</span>
            <div className="p-2 bg-germany-black text-white rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">1,540</div>
          <p className="text-[11px] font-bold text-emerald-600">Students, Staff & Admins</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Revenue</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">₹48.2L</div>
          <p className="text-[11px] font-bold text-emerald-600">+24% vs last quarter</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Admissions Success</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">98.4%</div>
          <p className="text-[11px] font-bold text-gray-500">Public German Universities</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">System Status</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-emerald-600">Operational</div>
          <p className="text-[11px] font-bold text-gray-500">NestJS API & Postgres OK</p>
        </div>
      </div>
    </div>
  );
}
