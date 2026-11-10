"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Moon,
  Layers,
  Lock,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useChatNotificationStore } from '@/store/useChatNotificationStore';

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard, step: 'Overview' },
  { name: 'Complete Profile', path: '/dashboard/student/complete-profile', icon: UserCheck, step: '1/3' },
  { name: 'Matching Engine', path: '/dashboard/student/matching', icon: Compass, step: 'Step 2' },
  { name: 'My Shortlist', path: '/dashboard/student/shortlist', icon: Bookmark, step: 'Step 3' },
];

const admissionNavItems = [
  { name: 'My Services', path: '/dashboard/student/services', icon: Layers, step: 'Services' },
  { name: 'Document Hub', path: '/dashboard/student/documents', icon: FileText, step: 'Step 4' },
  { name: 'APS Checklist', path: '/dashboard/student/aps', icon: CheckCircle2, step: 'Step 5' },
  { name: 'Applications', path: '/dashboard/student/applications', icon: Send, step: 'Step 6' },
  { name: 'Visa Assistance', path: '/dashboard/student/visa', icon: Plane, step: 'Step 7' },
  { name: 'Help & Support', path: '/dashboard/student/help', icon: Bot, step: 'Help' },
];

interface StudentSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function StudentSidebar({ isOpen = false, onClose }: StudentSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);
  const [gates, setGates] = useState<{
    hasActivePlan?: boolean;
    planName?: string | null;
    matchingUnlocked?: boolean;
    shortlistUnlocked?: boolean;
    documentsUnlocked?: boolean;
    apsUnlocked?: boolean;
  } | null>(null);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const unreadCount = useChatNotificationStore((state) => state.unreadCount);

  useEffect(() => {
    const fetchUserAndGates = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const [meRes, gatesRes] = await Promise.all([
          fetch(`${API_URL}/auth/me`, { credentials: 'include' }),
          fetch(`${API_URL}/student/gates`, { credentials: 'include' }).catch(() => null),
        ]);
        if (meRes.ok) {
          const data = await meRes.json();
          setUser(data.user);
        }
        if (gatesRes && gatesRes.ok) {
          const gData = await gatesRes.json();
          setGates(gData);
        }
      } catch (err) {
        console.error('Failed to load user or gates', err);
      }
    };
    fetchUserAndGates();
  }, []);

  const isItemLocked = (itemName: string): boolean => {
    if (!gates) return false;
    if (itemName === 'Matching Engine') return !gates.matchingUnlocked;
    if (itemName === 'My Shortlist') return !gates.shortlistUnlocked;
    if (itemName === 'Document Hub') return !gates.documentsUnlocked;
    if (itemName === 'APS Checklist') return !gates.apsUnlocked;
    return false;
  };

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'AS';

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Student'
    : 'Ankur Sah';

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 lg:static lg:z-20
      ${isCollapsed ? 'w-[72px]' : 'w-64'} h-screen flex flex-col bg-[#0B1327] text-white shrink-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      border-r border-[#1E293B]/70 shadow-xl lg:shadow-none
    `}>
      {/* Brand Header */}
      <div className={`p-4 pb-3.5 border-b border-[#1E293B]/70 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/" className="inline-flex items-center group py-1" title="EuropeBridge">
          {!isCollapsed ? (
            <Image
              src="/logo-white.png"
              alt="EuropeBridge"
              width={165}
              height={32}
              priority
              className="h-7 w-auto object-contain"
            />
          ) : (
            <Image
              src="/logo-white.png"
              alt="EuropeBridge"
              width={48}
              height={24}
              priority
              className="h-5 w-auto object-contain"
            />
          )}
        </Link>

        {/* Desktop Collapse / Expand Button */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Discovery Section */}
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            const isLocked = isItemLocked(item.name);
            return (
              <Link
                key={item.path}
                href={item.path}
                title={isCollapsed ? (isLocked ? `${item.name} (Locked)` : item.name) : undefined}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-colors group ${
                  isActive
                    ? 'bg-[#E63946] text-white shadow-sm font-bold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                  <div className={`shrink-0 relative ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    <Icon className="w-4 h-4" />
                    {isCollapsed && isLocked && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-[#0B1327]" />
                    )}
                    {isCollapsed && item.path === '/dashboard/student/help' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E63946] border-2 border-[#0B1327] animate-pulse" />
                    )}
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && (
                  item.path === '/dashboard/student/help' && unreadCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#E63946] text-white shadow-xs animate-pulse shrink-0">
                      {unreadCount}
                    </span>
                  ) : item.name === 'Complete Profile' ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-300 shrink-0">
                      1/3
                    </span>
                  ) : isLocked ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 shrink-0" title="Locked">
                      <Lock className="w-2.5 h-2.5 text-amber-400" />
                    </span>
                  ) : null
                )}
              </Link>
            );
          })}
        </div>

        {/* Admissions Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-4 mb-2">
              Application Pipeline
            </div>
          )}
          {admissionNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            const isLocked = isItemLocked(item.name);
            return (
              <Link
                key={item.path}
                href={item.path}
                title={isCollapsed ? (isLocked ? `${item.name} (Locked)` : item.name) : undefined}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-colors group ${
                  isActive
                    ? 'bg-[#E63946] text-white shadow-sm font-bold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                  <div className={`shrink-0 relative ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    <Icon className="w-4 h-4" />
                    {isCollapsed && isLocked && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-[#0B1327]" />
                    )}
                    {isCollapsed && item.path === '/dashboard/student/help' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E63946] border-2 border-[#0B1327] animate-pulse" />
                    )}
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && (
                  item.path === '/dashboard/student/help' && unreadCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#E63946] text-white shadow-xs animate-pulse shrink-0">
                      {unreadCount}
                    </span>
                  ) : isLocked ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 shrink-0" title="Locked">
                      <Lock className="w-2.5 h-2.5 text-amber-400" />
                    </span>
                  ) : null
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Card & Mode Toggle */}
      <div className="p-3 border-t border-[#1E293B]/70 bg-[#0B1327]">
        {!isCollapsed ? (
          <Link
            href="/dashboard/student/account"
            className="flex items-center justify-between p-2 rounded-xl bg-[#131E35] border border-[#1E293B] hover:bg-[#192744] transition-colors mb-2.5 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-white truncate">{fullName}</p>
                <p className="text-[10px] font-medium text-gray-400 truncate">Master's Aspirant</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors shrink-0" />
          </Link>
        ) : (
          <Link
            href="/dashboard/student/account"
            className="flex justify-center mb-2.5"
            title={`${fullName} (Master's Aspirant)`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
              {initials}
            </div>
          </Link>
        )}

        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="w-full mb-2 py-1.5 px-3 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-gray-300" />
            {!isCollapsed && <span>Light Mode</span>}
          </div>
          {!isCollapsed && (
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${!isDarkMode ? 'bg-[#E63946]' : 'bg-gray-700'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${!isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          )}
        </button>

        <button
          onClick={() => logout()}
          title="Sign Out"
          className="w-full py-1.5 px-3 text-xs font-semibold text-gray-400 hover:text-[#E63946] hover:bg-white/5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

