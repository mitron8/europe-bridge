"use client";

import React, { useState, useEffect } from 'react';
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
  X,
  ChevronsLeft,
  ChevronsRight,
  Headset,
  Sun,
  Moon,
  Layers,
  Lock,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useChatNotificationStore } from '@/store/useChatNotificationStore';

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
  { name: 'Complete Profile', path: '/dashboard/student/complete-profile', icon: UserCheck, step: '1/3' },
  { name: 'Matching Engine', path: '/dashboard/student/matching', icon: Compass },
  { name: 'My Shortlist', path: '/dashboard/student/shortlist', icon: Bookmark },
];

const admissionNavItems = [
  { name: 'My Services', path: '/dashboard/student/services', icon: Layers },
  { name: 'Document Hub', path: '/dashboard/student/documents', icon: FileText },
  { name: 'APS Checklist', path: '/dashboard/student/aps', icon: CheckCircle2 },
  { name: 'Applications', path: '/dashboard/student/applications', icon: Send },
  { name: 'Visa Assistance', path: '/dashboard/student/visa', icon: Plane },
  { name: 'Help & Support', path: '/dashboard/student/help', icon: Headset },
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
    applicationsUnlocked?: boolean;
    visaUnlocked?: boolean;
  } | null>(null);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const unreadCount = useChatNotificationStore((state) => state.unreadCount);

  useEffect(() => {
    // Suppress local Next.js dev indicator portal from obstructing sidebar controls
    const hideDevPortal = () => {
      document.querySelectorAll('nextjs-portal').forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      });
    };
    hideDevPortal();
    const timer = setTimeout(hideDevPortal, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUserAndGates = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const [meRes, gatesRes] = await Promise.all([
          fetch(`${API_URL}/auth/me`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/student/gates`, { credentials: 'include' }).catch(() => null),
        ]);
        if (meRes && meRes.ok) {
          const data = await meRes.json();
          setUser(data.user);
        }
        if (gatesRes && gatesRes.ok) {
          const gData = await gatesRes.json();
          setGates(gData);
        }
      } catch (err) {
        console.error('Failed to load student user or gates', err);
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
    if (itemName === 'Applications' || itemName === 'Admission') return !gates.applicationsUnlocked;
    if (itemName === 'Visa Assistance' || itemName === 'Visa') return !gates.visaUnlocked;
    return false;
  };

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'TU'
    : 'TU';

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Test User'
    : 'Test User';

  return (
    <aside
      data-sidebar="student"
      className={`
      fixed inset-y-0 left-0 z-50 lg:static lg:z-20
      ${isCollapsed ? 'w-[72px]' : 'w-64'} h-screen h-[100dvh] flex flex-col bg-[#0B1120] text-white shrink-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      border-r border-[#1E293B]/70 shadow-2xl lg:shadow-none
    `}
    >
      {/* Top Background Graphic: Airplane, Looping Flight Trail & Dusky Clouds */}
      <div className={`absolute top-0 left-0 right-0 h-36 pointer-events-none select-none overflow-hidden z-0 ${isCollapsed ? 'hidden' : 'block'}`}>
        <Image
          src="/assets/top-bg.png"
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-top opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1120]/20 to-[#0B1120]" />
      </div>

      {/* Bottom Background Graphic: Berlin Skyline (Brandenburg Gate, TV Tower, Cathedral) */}
      <div className={`absolute bottom-[148px] left-0 right-0 h-32 pointer-events-none select-none overflow-hidden z-0 ${isCollapsed ? 'hidden' : 'block'}`}>
        <Image
          src="/assets/berlin-skyline.png"
          alt=""
          fill
          unoptimized
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Brand Header */}
      <div
        className={`relative z-10 p-4 pb-3 border-b border-[#1E293B]/60 flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <Link href="/dashboard/student" className="inline-flex items-center group py-0.5" title="EuropeBridge">
          {!isCollapsed ? (
            <Image
              src="/logo-white.png"
              alt="EuropeBridge"
              width={160}
              height={32}
              priority
              className="h-6 w-auto object-contain transition-transform group-hover:scale-[1.02]"
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
          className="hidden lg:flex p-1.5 rounded-lg text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight className="w-3.5 h-3.5" /> : <ChevronsLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="relative z-10 flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Main Section */}
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            const isLocked = isItemLocked(item.name);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => onClose && onClose()}
                title={isCollapsed ? (isLocked ? `${item.name} (Locked)` : item.name) : undefined}
                className={`flex items-center ${
                  isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'
                } rounded-xl text-xs font-bold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#EF2D48] text-white shadow-xs'
                    : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                  <div
                    className={`shrink-0 relative ${
                      isActive ? 'text-white' : 'text-[#94A3B8] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {isCollapsed && isLocked && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FACC15] ring-1 ring-[#0B1120]" />
                    )}
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && (
                  item.name === 'Complete Profile' ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#EF2D48]/20 text-[#FF6B7D] border border-[#EF2D48]/30 shrink-0">
                      1/3
                    </span>
                  ) : isLocked ? (
                    <span className="inline-flex items-center shrink-0" title="Locked">
                      <Lock className="w-3.5 h-3.5 text-[#FACC15]" />
                    </span>
                  ) : null
                )}
              </Link>
            );
          })}
        </div>

        {/* Application Pipeline Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]/90">
                Application Pipeline
              </span>
              <div className="flex-1 h-px bg-[#1E293B]/70" />
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
                onClick={() => onClose && onClose()}
                title={isCollapsed ? (isLocked ? `${item.name} (Locked)` : item.name) : undefined}
                className={`flex items-center ${
                  isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'
                } rounded-xl text-xs font-bold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#EF2D48] text-white shadow-xs'
                    : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                  <div
                    className={`shrink-0 relative ${
                      isActive ? 'text-white' : 'text-[#94A3B8] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {isCollapsed && isLocked && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FACC15] ring-1 ring-[#0B1120]" />
                    )}
                    {isCollapsed && item.path === '/dashboard/student/help' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#EF2D48] ring-2 ring-[#0B1120] animate-pulse" />
                    )}
                  </div>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && (
                  item.path === '/dashboard/student/help' && unreadCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#EF2D48] text-white shadow-xs animate-pulse shrink-0">
                      {unreadCount}
                    </span>
                  ) : isLocked ? (
                    <span className="inline-flex items-center shrink-0" title="Locked">
                      <Lock className="w-3.5 h-3.5 text-[#FACC15]" />
                    </span>
                  ) : null
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer / User Profile Card & Mode Toggle */}
      <div className="relative z-10 p-3 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/95 to-[#0B1120]/60 backdrop-blur-xs space-y-2">
        {!isCollapsed ? (
          <Link
            href="/dashboard/student/account"
            onClick={() => onClose && onClose()}
            className="flex items-center justify-between p-2 rounded-xl bg-[#131B2E]/90 border border-[#1E293B] hover:bg-[#19243C] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#EF2D48]/20 border border-[#EF2D48]/40 flex items-center justify-center text-[#FF6B7D] font-extrabold text-xs shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-white truncate">{fullName}</p>
                <p className="text-[10px] font-medium text-[#94A3B8] truncate">Master's Aspirant</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors shrink-0" />
          </Link>
        ) : (
          <Link
            href="/dashboard/student/account"
            onClick={() => onClose && onClose()}
            className="flex justify-center py-1"
            title={`${fullName} (Master's Aspirant)`}
          >
            <div className="w-8 h-8 rounded-full bg-[#EF2D48]/20 border border-[#EF2D48]/40 flex items-center justify-center text-[#FF6B7D] font-extrabold text-xs shrink-0">
              {initials}
            </div>
          </Link>
        )}

        {/* Theme Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-full py-1.5 px-3 text-xs font-bold text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-3.5 h-3.5 text-[#94A3B8]" /> : <Sun className="w-3.5 h-3.5 text-[#94A3B8]" />}
            {!isCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </div>
          {!isCollapsed && (
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-[#EF2D48]' : 'bg-gray-700'}`}>
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          )}
        </button>

        {/* Sign Out Button */}
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="w-full py-2 px-3 text-xs font-bold text-[#EF2D48] border border-[#EF2D48]/40 hover:border-[#EF2D48] hover:bg-[#EF2D48]/10 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
