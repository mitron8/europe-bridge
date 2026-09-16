"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  Sidebar: React.ComponentType<{ isOpen: boolean; onClose: () => void }>;
}

export default function DashboardLayoutWrapper({ children, Sidebar }: DashboardLayoutWrapperProps) {
  const sidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setIsSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden relative">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Mobile Topbar */}
        <header className="flex lg:hidden items-center justify-between px-5 py-3.5 bg-white border-b border-gray-200/80 shrink-0 shadow-xs">
          <div className="font-display text-lg leading-none text-germany-black">
            Europe<span className="text-germany-red">Bridge</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white shadow-xs border border-gray-200/80 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5 text-germany-black" />
          </button>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
