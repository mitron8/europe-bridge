"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import {
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Briefcase,
  X,
  ChevronsLeft,
  ChevronsRight,
  Sun,
  Moon
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface SidebarProps {
  role: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ role, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const roleName = role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const toggleCollapse = useAppStore((state) => state.toggleSidebarCollapsed);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

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
        <Link href="/" className="flex items-center gap-3 group" title={`EuropeBridge ${roleName}`}>
          <div className="w-9 h-9 rounded-xl bg-germany-red text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-all shrink-0 font-extrabold text-xs tracking-wider">
            EB
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="font-display text-lg leading-none text-germany-black tracking-tight">
                Europe<span className="text-germany-red">Bridge</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-germany-gold"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{roleName} Portal</span>
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
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {!isCollapsed && (
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Workspace Navigation
          </div>
        )}
        <Link
          href={`/dashboard/${role}`}
          title={isCollapsed ? "Overview" : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs font-bold transition-colors group ${
            pathname === `/dashboard/${role}`
              ? 'bg-germany-red text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100 hover:text-germany-black'
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
            <div className={`p-1 rounded-lg transition-colors shrink-0 ${
              pathname === `/dashboard/${role}` ? 'text-white' : 'text-gray-500 group-hover:text-germany-red'
            }`}>
              <LayoutDashboard className="w-4 h-4" />
            </div>
            {!isCollapsed && <span>Overview</span>}
          </div>
          {!isCollapsed && pathname === `/dashboard/${role}` && (
            <ChevronRight className="w-4 h-4 text-white/90" />
          )}
        </Link>
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-3 border-t border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-[#111622]">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800/80 mb-2">
            <div className="w-8 h-8 rounded-full bg-germany-gold/20 border border-germany-gold/40 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-germany-black truncate">{roleName} Specialist</p>
              <p className="text-[10px] font-medium text-gray-500 truncate">{role}@europebridge.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2" title={`${roleName} Specialist`}>
            <div className="w-8 h-8 rounded-full bg-germany-gold/20 border border-germany-gold/40 flex items-center justify-center text-germany-black font-extrabold text-xs shrink-0">
              <Briefcase className="w-4 h-4" />
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

