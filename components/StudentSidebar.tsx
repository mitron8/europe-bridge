"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  UserCheck,
  Compass,
  Bookmark,
  FileText,
  CheckCircle2,
  Send,
  Plane,
  LogOut,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard, step: 'Overview' },
  { name: 'Complete Profile', path: '/dashboard/student/complete-profile', icon: UserCheck, step: 'Step 1' },
  { name: 'Matching Engine', path: '/dashboard/student/matching', icon: Compass, step: 'Step 2' },
  { name: 'My Shortlist', path: '/dashboard/student/shortlist', icon: Bookmark, step: 'Step 3' },
];

const admissionNavItems = [
  { name: 'Document Hub', path: '/dashboard/student/documents', icon: FileText, step: 'Step 4' },
  { name: 'APS Checklist', path: '/dashboard/student/aps', icon: CheckCircle2, step: 'Step 5' },
  { name: 'Applications', path: '/dashboard/student/applications', icon: Send, step: 'Step 6' },
  { name: 'Visa Assistance', path: '/dashboard/student/visa', icon: Plane, step: 'Step 7' },
];

interface StudentSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function StudentSidebar({ isOpen = false, onClose }: StudentSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };
    fetchUser();
  }, []);

  const initials = user 
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() 
    : 'SN';
    
  const fullName = user 
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Student'
    : 'Loading...';

  const displayRole = user?.role === 'superadmin' 
    ? 'Super Admin' 
    : (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Loading...');

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 lg:relative lg:z-20
      w-72 h-full lg:h-[calc(100vh-1.5rem)] m-0 lg:m-3 lg:mr-0 flex flex-col bg-[#FDFBF7] shrink-0 overflow-hidden
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      neu-card lg:shadow-[12px_12px_30px_rgba(210,205,195,0.6)] shadow-2xl border-r lg:border-none border-[#EBE7E0]/50
    `}>
      {/* German Flag Tricolor Header Accent */}
      <div className="w-full h-2 flex shrink-0">
        <div className="flex-1 bg-germany-black"></div>
        <div className="flex-1 bg-germany-red"></div>
        <div className="flex-1 bg-germany-gold"></div>
      </div>


      {/* Brand Header */}
      <div className="p-5 pb-3 border-b border-[#EBE7E0]/80 flex items-center justify-between">
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Student Portal</span>
            </div>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#EBE7E0] text-gray-400 hover:text-germany-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar custom-scrollbar">
        {/* Discovery Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
            Discovery & Matching
          </div>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-extrabold transition-all group ${
                  isActive
                    ? 'bg-germany-red text-white shadow-[6px_6px_16px_rgba(230,57,70,0.35),inset_2px_2px_4px_rgba(255,150,150,0.6)] translate-x-1'
                    : 'text-germany-black hover:bg-[#EBE7E0]/70 hover:text-germany-red'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#EBE7E0] text-gray-700 group-hover:text-germany-red group-hover:bg-white'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>
                
                {isActive ? (
                  <ChevronRight className="w-3.5 h-3.5 text-white/90 shrink-0" />
                ) : (
                  <span className="text-[9px] font-extrabold text-gray-400 group-hover:text-germany-red/70 shrink-0">
                    {item.step}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Admissions Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
            Application Pipeline
          </div>
          {admissionNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-extrabold transition-all group ${
                  isActive
                    ? 'bg-germany-red text-white shadow-[6px_6px_16px_rgba(230,57,70,0.35),inset_2px_2px_4px_rgba(255,150,150,0.6)] translate-x-1'
                    : 'text-germany-black hover:bg-[#EBE7E0]/70 hover:text-germany-red'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#EBE7E0] text-gray-700 group-hover:text-germany-red group-hover:bg-white'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>
                
                {isActive ? (
                  <ChevronRight className="w-3.5 h-3.5 text-white/90 shrink-0" />
                ) : (
                  <span className="text-[9px] font-extrabold text-gray-400 group-hover:text-germany-red/70 shrink-0">
                    {item.step}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Mini Journey Progress Box */}
        <div className="p-3 bg-[#EBE7E0]/60 rounded-2xl border border-[#E2DDD3]/50 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-extrabold">
            <span className="text-germany-black flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-germany-red" />
              <span>Admission Progress</span>
            </span>
            <span className="text-germany-red font-black">35%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full w-[35%]"></div>
          </div>
          <div className="text-[10px] font-bold text-gray-500">
            Target: <strong className="text-germany-black">Winter 2026</strong>
          </div>
        </div>
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-[#EBE7E0] bg-[#FDFBF7]">
        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#EBE7E0]/50 border border-[#E2DDD3]/40 mb-2">
          <div className="w-8 h-8 rounded-full bg-germany-gold/30 border border-germany-gold/60 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0 shadow-sm">
            {initials ? <span>{initials}</span> : <GraduationCap className="w-4 h-4 text-germany-black" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-xs text-germany-black truncate">{fullName}</p>
            <p className="text-[10px] font-bold text-gray-500 truncate">{displayRole}</p>
            <Link href="/dashboard/student/account" className="text-[10px] font-bold text-germany-red hover:underline block truncate mt-0.5">
              Manage Profile →
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
