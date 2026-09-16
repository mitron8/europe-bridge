"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  BarChart3,
  Bell,
  LogOut,
  ChevronRight,
  ShieldAlert,
  X,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Students', path: '/dashboard/admin/students', icon: Users },
  { name: 'Counsellors', path: '/dashboard/admin/counsellors', icon: UserCheck },
  { name: 'Universities', path: '/dashboard/admin/universities', icon: GraduationCap },
  { name: 'Reports & Analytics', path: '/dashboard/admin/reports', icon: BarChart3 },
  { name: 'Notices', path: '/dashboard/admin/notices', icon: Bell },
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
    : '';
    
  const fullName = user 
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin'
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
        <Link href="/" className="flex items-center gap-3 group" title="EuropeBridge Admin">
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center shadow-xs group-hover:border-germany-red/40 transition-colors shrink-0">
            <img 
              src="/doodles/happy.png" 
              alt="Logo" 
              className="w-6 h-6 object-contain" 
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="font-display text-lg leading-none text-germany-black tracking-tight">
                Europe<span className="text-germany-red">Bridge</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-germany-red"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Admin Portal</span>
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
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {!isCollapsed && (
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Management Controls
          </div>
        )}
        {navItems.map((item) => {
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
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                <div className={`p-1 rounded-lg transition-colors shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-germany-red'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && isActive ? (
                <ChevronRight className="w-4 h-4 text-white/90 shrink-0" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-gray-200/80 bg-white">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 mb-2">
            <div className="w-8 h-8 rounded-full bg-germany-red/10 border border-germany-red/30 flex items-center justify-center text-germany-red font-extrabold text-xs shrink-0">
              {initials ? <span>{initials}</span> : <ShieldAlert className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-germany-black truncate">{fullName}</p>
              <p className="text-[10px] font-medium text-gray-500 truncate">{displayRole}</p>
              <Link href="/dashboard/admin/account" className="text-[10px] font-bold text-germany-red hover:underline block truncate mt-0.5">
                Account Settings →
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2" title={`${fullName} (${displayRole})`}>
            <div className="w-8 h-8 rounded-full bg-germany-red/10 border border-germany-red/30 flex items-center justify-center text-germany-red font-extrabold text-xs shrink-0">
              {initials ? <span>{initials}</span> : <ShieldAlert className="w-4 h-4" />}
            </div>
          </div>
        )}

        <button
          onClick={() => logout()}
          title="Sign Out"
          className={`w-full py-2 px-3 text-xs font-bold text-gray-600 hover:text-germany-red hover:bg-red-50 border border-gray-200/80 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs`}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

