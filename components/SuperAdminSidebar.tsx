"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  ShieldAlert,
  Users,
  UserCheck,
  Building,
  TrendingUp,
  CreditCard,
  FileEdit,
  BarChart3,
  GraduationCap,
  Bell,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/super-admin', icon: ShieldAlert },
  { name: 'Students', path: '/dashboard/super-admin/students', icon: Users },
  { name: 'Counsellors', path: '/dashboard/super-admin/counsellors', icon: UserCheck },
  { name: 'Admins', path: '/dashboard/super-admin/admins', icon: Building },
  { name: 'Marketing', path: '/dashboard/super-admin/marketing', icon: TrendingUp },
  { name: 'Finance', path: '/dashboard/super-admin/finance', icon: CreditCard },
  { name: 'Content', path: '/dashboard/super-admin/content', icon: FileEdit },
  { name: 'Reports & Analytics', path: '/dashboard/super-admin/reports', icon: BarChart3 },
  { name: 'Universities', path: '/dashboard/super-admin/universities', icon: GraduationCap },
  { name: 'Notices', path: '/dashboard/super-admin/notices', icon: Bell },
];

interface SuperAdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SuperAdminSidebar({ isOpen = false, onClose }: SuperAdminSidebarProps) {
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
    : '';
    
  const fullName = user 
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Super Admin'
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
              <span className="w-1.5 h-1.5 rounded-full bg-germany-red animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-germany-red">Super Admin</span>
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
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        <div className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
          Executive Controls
        </div>
        {navItems.map((item) => {
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
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-[#EBE7E0] bg-[#FDFBF7]">
        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#EBE7E0]/50 border border-[#E2DDD3]/40 mb-2">
          <div className="w-8 h-8 rounded-full bg-germany-black text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
            {initials ? <span>{initials}</span> : <ShieldAlert className="w-4 h-4 text-germany-gold" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-xs text-germany-black truncate">{fullName}</p>
            <p className="text-[10px] font-bold text-gray-500 truncate">{displayRole}</p>
            <Link href="/dashboard/super-admin/account" className="text-[10px] font-bold text-germany-red hover:underline block truncate mt-0.5">
              Security & Setup →
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
