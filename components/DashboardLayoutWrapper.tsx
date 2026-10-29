"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Menu, Sun, Moon, AlertTriangle, MessageSquare, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useChatNotificationStore } from '@/store/useChatNotificationStore';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  Sidebar: React.ComponentType<{ isOpen: boolean; onClose: () => void }>;
}

export default function DashboardLayoutWrapper({ children, Sidebar }: DashboardLayoutWrapperProps) {
  const sidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setIsSidebarOpen);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

  const activeNotification = useChatNotificationStore((state) => state.activeNotification);
  const clearNotification = useChatNotificationStore((state) => state.clearNotification);

  // Initialize socket notification listener
  useEffect(() => {
    useChatNotificationStore.getState().init();
  }, []);

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
        {/* Real-time Floating Notification Toast */}
        {activeNotification && (
          <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-3 fade-in duration-300">
            <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
              activeNotification.isEscalation || activeNotification.type === 'escalation_alert'
                ? 'bg-red-50/95 dark:bg-[#1A0C0E]/95 border-red-300 dark:border-red-900 text-red-900 dark:text-red-200'
                : 'bg-white/95 dark:bg-[#111622]/95 border-gray-200 dark:border-gray-800 text-germany-black dark:text-white'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    activeNotification.isEscalation || activeNotification.type === 'escalation_alert'
                      ? 'bg-red-100 dark:bg-red-900/60 text-germany-red'
                      : 'bg-germany-gold/20 dark:bg-amber-950/40 text-germany-black dark:text-amber-300'
                  }`}>
                    {activeNotification.isEscalation || activeNotification.type === 'escalation_alert' ? (
                      <AlertTriangle className="w-4 h-4 text-germany-red animate-pulse" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-extrabold font-display">
                        {activeNotification.isEscalation || activeNotification.type === 'escalation_alert'
                          ? 'Escalated to Admin'
                          : 'New Chat Message'}
                      </span>
                      {activeNotification.ticketNumber && (
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10">
                          {activeNotification.ticketNumber}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold mt-0.5 truncate">
                      {activeNotification.title}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {activeNotification.senderName ? `${activeNotification.senderName}: ` : ''}
                      {activeNotification.preview || activeNotification.reason}
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearNotification}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Topbar */}
        <header className="flex lg:hidden items-center justify-between px-5 py-3.5 bg-white dark:bg-[#111622] border-b border-gray-200/80 dark:border-gray-800/80 shrink-0 shadow-xs">
          <div className="font-display text-lg leading-none text-germany-black dark:text-white">
            Europe<span className="text-germany-red">Bridge</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-xl bg-gray-50 dark:bg-[#0E121A] border border-gray-200/80 dark:border-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors cursor-pointer text-germany-black dark:text-white"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-germany-gold" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-white dark:bg-[#0E121A] shadow-xs border border-gray-200/80 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 text-germany-black dark:text-white" />
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
