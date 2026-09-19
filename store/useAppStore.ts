import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Global UI State
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;

  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;

  // Dark Mode State
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;

  // Session State
  user: null | { name: string; email: string; role?: string };
  setUser: (user: { name: string; email: string; role?: string } | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isMobileMenuOpen: false,
      isSidebarOpen: false,
      isSidebarCollapsed: false,
      isDarkMode: false,
      user: null,

      // Actions
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setIsSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
      toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

      setIsDarkMode: (isDark) => {
        if (typeof document !== 'undefined' && window.location.pathname.startsWith('/dashboard')) {
          document.documentElement.classList.toggle('dark', isDark);
        }
        set({ isDarkMode: isDark });
      },

      toggleDarkMode: () => {
        const nextMode = !get().isDarkMode;
        if (typeof document !== 'undefined' && window.location.pathname.startsWith('/dashboard')) {
          document.documentElement.classList.toggle('dark', nextMode);
        }
        set({ isDarkMode: nextMode });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'europebridge-app-store',
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        isDarkMode: state.isDarkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (typeof document !== 'undefined') {
          if (window.location.pathname.startsWith('/dashboard')) {
            document.documentElement.classList.toggle('dark', !!state?.isDarkMode);
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }
  )
);
