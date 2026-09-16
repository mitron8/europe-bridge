import { create } from 'zustand';

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

  // Session State (Placeholder for later use)
  user: null | { name: string; email: string; role?: string };
  setUser: (user: { name: string; email: string; role?: string } | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isMobileMenuOpen: false,
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  user: null,

  // Actions
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setIsSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setUser: (user) => set({ user }),
}));
