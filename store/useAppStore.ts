import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

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
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isLoadingAuth: boolean;
  checkAuth: () => Promise<UserProfile | null>;
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
      isLoadingAuth: false,

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

      checkAuth: async () => {
        try {
          set({ isLoadingAuth: true });
          const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
          const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
          if (res.ok) {
            const data = await res.json();
            const fetchedUser = data.user || null;
            set({ user: fetchedUser, isLoadingAuth: false });
            return fetchedUser;
          } else {
            set({ user: null, isLoadingAuth: false });
            return null;
          }
        } catch {
          set({ isLoadingAuth: false });
          return null;
        }
      },
    }),
    {
      name: 'europebridge-app-store',
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        isDarkMode: state.isDarkMode,
        user: state.user,
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
