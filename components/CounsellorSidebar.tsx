"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  Bell,
  LogOut,
  HelpCircle,
  X,
  ChevronsLeft,
  ChevronsRight,
  Sun,
  Moon,
  Layers,
  Settings,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useChatNotificationStore } from '@/store/useChatNotificationStore';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/counsellor', icon: LayoutDashboard },
  { name: 'Services Queue', path: '/dashboard/counsellor/services', icon: Layers },
  { name: 'Student Leads', path: '/dashboard/counsellor/leads', icon: UserPlus },
  { name: 'Assigned Students', path: '/dashboard/counsellor/students', icon: Users },
  { name: 'Deadlines & Consults', path: '/dashboard/counsellor/deadlines', icon: Calendar },
  { name: 'Help & Student Queries', path: '/dashboard/counsellor/help', icon: HelpCircle },
  { name: 'Notices & Alerts', path: '/dashboard/counsellor/notices', icon: Bell },
];

interface CounsellorSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CounsellorSidebar({ isOpen = false, onClose }: CounsellorSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);
  const [servicesCount, setServicesCount] = useState<number>(0);
  const [inquiriesCount, setInquiriesCount] = useState<number>(3);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const unreadCount = useChatNotificationStore((state) => state.unreadCount);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const [userRes, servicesRes, helpRes] = await Promise.all([
          fetch(`${API_URL}/auth/me`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/service-orders/counsellor/assigned`, { credentials: 'include' }).catch(() => null),
          fetch(`${API_URL}/help/counsellor/queries`, { credentials: 'include' }).catch(() => null),
        ]);

        if (userRes && userRes.ok) {
          const data = await userRes.json();
          setUser(data.user);
        }

        if (servicesRes && servicesRes.ok) {
          const sData = await servicesRes.json();
          const unattended = (sData || []).filter((o: any) =>
            ['BOOKED', 'ASSIGNED', 'REVISION_REQUESTED'].includes(o.status)
          );
          setServicesCount(unattended.length);
        }

        if (helpRes && helpRes.ok) {
          const hData = await helpRes.json();
          const pending = (hData || []).filter((q: any) => q.status !== 'resolved' && q.status !== 'closed');
          setInquiriesCount(pending.length);
        }
      } catch (err) {
        console.error('Failed to load counsellor sidebar metrics', err);
      }
    };
    fetchSidebarData();
  }, []);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'CU'
    : 'CU';

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Counsellor User'
    : 'Counsellor User';

  const displayRole = user?.role === 'superadmin'
    ? 'Super Admin'
    : (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Counsellor');

  return (
    <aside
      data-sidebar="counsellor"
      className={`
      fixed inset-y-0 left-0 z-50 lg:static lg:z-20
      ${isCollapsed ? 'w-[72px]' : 'w-64'} h-screen h-[100dvh] flex flex-col bg-[#4A0C16] text-white shrink-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      border-r border-[#6B1523]/70 shadow-xl lg:shadow-none
    `}
    >
      {/* Background Forest Silhouette Illustration spanning the bottom area */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/images/counsellor/sidebar-forest-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom opacity-85"
        />
        {/* Soft top gradient to blend seamlessly into #4A0C16 */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#4A0C16]" />
      </div>

      {/* Brand Header */}
      <div
        className={`p-4 pb-3.5 border-b border-white/10 flex items-center relative z-20 ${
          isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'
        }`}
      >
        <Link
          href="/"
          onClick={() => onClose?.()}
          className="inline-flex items-center group py-1"
          title="EuropeBridge"
        >
          {!isCollapsed ? (
            <Image
              src="/logo-white.png"
              alt="EuropeBridge"
              width={155}
              height={30}
              priority
              className="h-6 w-auto object-contain"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center font-extrabold text-xs tracking-wider">
              EB
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Expand Button */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-rose-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-rose-200/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 relative z-20 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {!isCollapsed && (
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-rose-200/60 mb-2">
            Student Counselling
          </div>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          // Badges matching Image 2
          const badgeCount =
            item.path === '/dashboard/counsellor/services'
              ? servicesCount
              : item.path === '/dashboard/counsellor/help'
              ? unreadCount > 0 ? unreadCount : inquiriesCount
              : null;

          const isRedBadge = item.path === '/dashboard/counsellor/help';

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => onClose?.()}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3.5 py-2.5'
              } rounded-2xl text-xs font-bold transition-all group ${
                isActive
                  ? 'bg-[#FDE2E4] text-[#5A0F1B] shadow-2xs'
                  : 'text-rose-100/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                <div
                  className={`p-0.5 rounded-lg transition-colors shrink-0 ${
                    isActive ? 'text-[#5A0F1B]' : 'text-rose-200/80 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!isCollapsed && badgeCount !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                    isRedBadge
                      ? 'bg-[#B91C1C] text-white shadow-2xs'
                      : isActive
                      ? 'bg-[#5A0F1B]/15 text-[#5A0F1B]'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Area: User Profile Card & Controls */}
      <div className="p-3.5 pb-5 lg:pb-3.5 pt-2 relative z-20 mt-auto">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-[#360810]/75 border border-white/10 backdrop-blur-xs mb-2.5 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#8C3A42] border border-white/20 flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-2xs">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-white truncate">{fullName}</p>
                <p className="text-[10px] font-medium text-rose-200/70 truncate">{displayRole}</p>
              </div>
            </div>
            <Link
              href="/dashboard/counsellor/account"
              onClick={() => onClose?.()}
              className="p-1.5 rounded-xl text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Account Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center mb-2" title={`${fullName} (${displayRole})`}>
            <div className="w-8 h-8 rounded-full bg-[#8C3A42] border border-white/20 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
              {initials}
            </div>
          </div>
        )}

        {/* Theme Mode Switch */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-full mb-1.5 py-1.5 px-3 text-xs font-bold text-rose-100 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <Moon className="w-3.5 h-3.5 text-rose-200" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-rose-200" />
            )}
            {!isCollapsed && <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>}
          </div>
          {!isCollapsed && (
            <div
              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                isDarkMode ? 'bg-[#B91C1C]' : 'bg-white/90'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-transform ${
                  isDarkMode ? 'translate-x-4 bg-white' : 'translate-x-0 bg-[#5A0F1B]'
                }`}
              />
            </div>
          )}
        </button>

        {/* Sign Out Button */}
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="w-full py-1.5 px-3 text-xs font-bold text-rose-200 hover:text-white hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
