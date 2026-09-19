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
  X,
  ChevronsLeft,
  ChevronsRight,
  Bot,
  Sun,
  Moon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

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
  { name: 'Help & AI Support', path: '/dashboard/student/help', icon: Bot, step: 'Help' },
];

interface StudentSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function StudentSidebar({ isOpen = false, onClose }: StudentSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

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
      fixed inset-y-0 left-0 z-50 lg:static lg:z-20
      ${isCollapsed ? 'w-[72px]' : 'w-64'} h-screen flex flex-col bg-white shrink-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      border-r border-gray-200/80 shadow-sm lg:shadow-none
    `}>
      {/* German Flag Tricolor Header Accent */}
      <div className="w-full h-[3px] flex shrink-0">
        <div className="flex-1 bg-germany-black"></div>
        <div className="flex-1 bg-germany-red"></div>
        <div className="flex-1 bg-germany-gold"></div>
      </div>

      {/* Brand Header */}
      <div className={`p-4 pb-3 border-b border-gray-200/80 flex items-center ${isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'}`}>
        <Link href="/" className="flex items-center gap-3 group" title="EuropeBridge Student Portal">
          <div className="w-9 h-9 rounded-xl bg-germany-red text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-all shrink-0 font-extrabold text-xs tracking-wider">
            EB
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="font-display text-lg leading-none text-germany-black tracking-tight">
                Europe<span className="text-germany-red">Bridge</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Student Portal</span>
              </div>
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Expand Button */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-germany-black hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-germany-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {/* Discovery Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Discovery & Matching
            </div>
          )}
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs font-bold transition-colors group ${
                  isActive
                    ? 'bg-germany-red text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-germany-black'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5 min-w-0'}`}>
                  <div className={`p-1 rounded-lg transition-colors shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-germany-red'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>
                
                {!isCollapsed && (
                  isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  ) : (
                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-germany-red/70 shrink-0">
                      {item.step}
                    </span>
                  )
                )}
              </Link>
            );
          })}
        </div>

        {/* Admissions Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Application Pipeline
            </div>
          )}
          {admissionNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs font-bold transition-colors group ${
                  isActive
                    ? 'bg-germany-red text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-germany-black'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5 min-w-0'}`}>
                  <div className={`p-1 rounded-lg transition-colors shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-germany-red'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>
                
                {!isCollapsed && (
                  isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  ) : (
                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-germany-red/70 shrink-0">
                      {item.step}
                    </span>
                  )
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Mini Journey Progress Box */}
        {!isCollapsed && (
          <div className="p-3 bg-gray-50 dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-germany-black flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-germany-red" />
                <span>Admission Progress</span>
              </span>
              <span className="text-germany-red font-bold">35%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full w-[35%]"></div>
            </div>
            <div className="text-[10px] font-medium text-gray-500">
              Target: <strong className="text-germany-black">Winter 2026</strong>
            </div>
          </div>
        )}
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#111622]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800/80 mb-2">
            <div className="w-8 h-8 rounded-full bg-germany-gold/20 border border-germany-gold/40 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0">
              {initials ? <span>{initials}</span> : <GraduationCap className="w-4 h-4 text-germany-black" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-germany-black truncate">{fullName}</p>
              <p className="text-[10px] font-medium text-gray-500 truncate">{displayRole}</p>
              <Link href="/dashboard/student/account" className="text-[10px] font-bold text-germany-red hover:underline block truncate mt-0.5">
                Manage Profile →
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2" title={`${fullName} (${displayRole})`}>
            <div className="w-8 h-8 rounded-full bg-germany-gold/20 border border-germany-gold/40 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0">
              {initials ? <span>{initials}</span> : <GraduationCap className="w-4 h-4 text-amber-800 dark:text-amber-300" />}
            </div>
          </div>
        )}

        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="w-full mb-2 py-1.5 px-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-germany-gold" /> : <Moon className="w-3.5 h-3.5 text-gray-500" />}
            {!isCollapsed && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
          </div>
          {!isCollapsed && (
            <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-germany-gold' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-3' : 'translate-x-0'}`} />
            </div>
          )}
        </button>

        <button
          onClick={() => logout()}
          title="Sign Out"
          className="w-full py-2 px-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-germany-red dark:hover:text-[#FF6B7A] hover:bg-red-50 dark:hover:bg-red-500/15 border border-gray-200/80 dark:border-gray-700/70 dark:hover:border-red-500/40 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

