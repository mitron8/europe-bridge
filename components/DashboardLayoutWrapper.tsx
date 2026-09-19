"use client";

import React, { useEffect } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  Sidebar: React.ComponentType<{ isOpen: boolean; onClose: () => void }>;
}

export default function DashboardLayoutWrapper({ children, Sidebar }: DashboardLayoutWrapperProps) {
  const sidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setIsSidebarOpen);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

  // Sync document root class with dark mode preference while in dashboard
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('dark');
      }
    };
  }, [isDarkMode]);

  return (
    <div className="dashboard-container flex h-screen w-full bg-dashboard-bg overflow-hidden relative">
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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-xl bg-gray-50 border border-gray-200/80 hover:bg-gray-100 transition-colors cursor-pointer text-germany-black"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-germany-gold" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-white shadow-xs border border-gray-200/80 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 text-germany-black" />
            </button>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
