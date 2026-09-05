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
    <div className="flex h-screen w-full neu-bg overflow-hidden relative">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-80 w-96 h-96 bg-germany-red/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-germany-gold/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Mobile Topbar */}
        <header className="flex lg:hidden items-center justify-between px-6 py-4 bg-[#FDFBF7] border-b border-[#EBE7E0]/80 shrink-0 shadow-sm">
          <div className="font-display text-lg leading-none text-germany-black">
            Europe<span className="text-germany-red">Bridge</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white shadow-sm border border-[#EBE7E0]/60 hover:bg-[#EBE7E0]/50 transition-colors cursor-pointer"
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
