"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Headset,
  Settings,
  LogOut,
  Moon,
  Sun,
  X,
  ChevronsLeft,
  ChevronsRight,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useChatNotificationStore } from '@/store/useChatNotificationStore';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Students', path: '/dashboard/admin/students', icon: Users },
  { name: 'Counsellors', path: '/dashboard/admin/counsellors', icon: GraduationCap },
  { name: 'Consultations', path: '/dashboard/admin#consultations', icon: Calendar },
  { name: 'Help & Escalations', path: '/dashboard/admin/help', icon: Headset },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; role?: string } | null>(null);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const unreadCount = useChatNotificationStore((state) => state.unreadCount);
  const escalatedCount = useChatNotificationStore((state) => state.escalatedCount);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to load admin user profile', err);
      }
    };
    fetchUser();
  }, []);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'AU'
    : 'AU';

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin User'
    : 'Admin User';

  const displayRole = user?.role === 'superadmin'
    ? 'Super Admin'
    : (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Admin');

  return (
    <aside
      data-sidebar="admin"
      className={`
      fixed inset-y-0 left-0 z-50 lg:static lg:z-20
      ${isCollapsed ? 'w-[72px]' : 'w-64'} h-screen h-[100dvh] flex flex-col bg-[#0B1020] text-white shrink-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      border-r border-[#1E293B]/70 shadow-xl lg:shadow-none
    `}
    >
      {/* Background Forest Silhouette Illustration spanning the bottom area */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/images/counsellor/sidebar-forest-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom opacity-80"
        />
        {/* Soft top gradient to blend seamlessly into #0B1020 */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0B1020]" />
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
              width={160}
              height={32}
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
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 relative z-20 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {!isCollapsed && (
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400/80 mb-2 mt-1">
            MANAGEMENT
          </div>
        )}

        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path.includes('#') && pathname === '/dashboard/admin');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => onClose?.()}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3.5 py-2.5'
              } rounded-xl text-xs font-bold transition-all group ${
                isActive
                  ? 'bg-[#EF2D48] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center relative' : 'gap-3 min-w-0'}`}>
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white group-hover:scale-105'}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!isCollapsed && item.name === 'Help & Escalations' && (
                escalatedCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-[#EF2D48] shadow-xs shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-[#EF2D48] shrink-0" />
                    <span>{escalatedCount}</span>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#EF2D48] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    {unreadCount > 0 ? unreadCount : 1}
                  </span>
                )
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile, Settings, Dark Mode & Logout */}
      <div className="p-3 border-t border-white/10 relative z-20 space-y-2.5">
        {/* User Card */}
        {!isCollapsed ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FDE2E4] text-[#8C2434] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-white truncate">{fullName}</p>
                <p className="text-[10px] font-medium text-gray-400 truncate">{displayRole}</p>
              </div>
            </div>

            <Link
              href="/dashboard/admin/account"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Account Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center" title={`${fullName} (${displayRole})`}>
            <div className="w-8 h-8 rounded-full bg-[#FDE2E4] text-[#8C2434] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {initials}
            </div>
          </div>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-full py-1.5 px-3 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-4 h-4 text-rose-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
            {!isCollapsed && <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>}
          </div>
          {!isCollapsed && (
            <div
              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                isDarkMode ? 'bg-[#EF2D48]' : 'bg-gray-600'
              }`}
            >
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
          className="w-full py-2 px-3 text-xs font-bold text-[#EF2D48] hover:bg-[#EF2D48]/10 border border-[#EF2D48]/50 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
