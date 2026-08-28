"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  Headphones
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/counsellor', icon: LayoutDashboard },
  { name: 'Student Leads', path: '/dashboard/counsellor/leads', icon: UserPlus },
  { name: 'Assigned Students', path: '/dashboard/counsellor/students', icon: Users },
  { name: 'Deadlines & Consults', path: '/dashboard/counsellor/deadlines', icon: Calendar },
  { name: 'Notices & Alerts', path: '/dashboard/counsellor/notices', icon: Bell },
];

export function CounsellorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-[calc(100vh-1.5rem)] m-3 mr-0 flex flex-col bg-[#FDFBF7] neu-card relative z-20 shrink-0 overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
      {/* German Flag Tricolor Header Accent */}
      <div className="w-full h-2 flex shrink-0">
        <div className="flex-1 bg-germany-black"></div>
        <div className="flex-1 bg-germany-red"></div>
        <div className="flex-1 bg-germany-gold"></div>
      </div>

      {/* Brand Header */}
      <div className="p-5 pb-3 border-b border-[#EBE7E0]/80">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-[4px_4px_10px_rgba(71,85,105,0.2),inset_-2px_-2px_4px_rgba(71,85,105,0.1),inset_2px_2px_4px_rgba(255,255,255,1)] group-hover:scale-105 transition-transform shrink-0">
            <img 
              src="/doodles/happy.png" 
              alt="Logo" 
              className="w-7 h-7 object-contain drop-shadow" 
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="font-display text-xl leading-none text-germany-black tracking-tight">
              Europe<span className="text-germany-red">Bridge</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-germany-gold animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Counsellor Hub</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        <div className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
          Student Counselling
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all group ${
                isActive
                  ? 'bg-germany-red text-white shadow-[6px_6px_16px_rgba(230,57,70,0.35),inset_2px_2px_4px_rgba(255,150,150,0.6)] translate-x-1'
                  : 'text-germany-black hover:bg-[#EBE7E0]/70 hover:text-germany-red'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                  isActive ? 'bg-white/25 text-white' : 'bg-[#EBE7E0] text-gray-700 group-hover:text-germany-red group-hover:bg-white'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.name}</span>
              </div>
              {isActive ? (
                <ChevronRight className="w-4 h-4 text-white/90 shrink-0" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-[#EBE7E0] bg-[#FDFBF7]">
        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#EBE7E0]/50 border border-[#E2DDD3]/40 mb-2">
          <div className="w-8 h-8 rounded-full bg-germany-gold/20 border border-germany-gold/50 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0 shadow-sm">
            <Headphones className="w-4 h-4 text-germany-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-xs text-germany-black truncate">Counsellor Profile</p>
            <Link href="/dashboard/counsellor/account" className="text-[10px] font-bold text-germany-red hover:underline block truncate">
              Account Settings →
            </Link>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="w-full neu-btn py-2 px-3 text-xs font-extrabold text-gray-700 hover:text-germany-red flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
