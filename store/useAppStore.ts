import { create } from 'zustand';

interface AppState {
  // Global UI State
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;

  // Session State (Placeholder for later use)
  user: null | { name: string; email: string; role?: string };
  setUser: (user: { name: string; email: string; role?: string } | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isMobileMenuOpen: false,
  isSidebarOpen: false,
  user: null,

  // Actions
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setUser: (user) => set({ user }),
}));
