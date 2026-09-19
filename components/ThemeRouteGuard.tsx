"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * ThemeRouteGuard guarantees that Dark Mode is strictly isolated to /dashboard routes.
 * When the user is anywhere on the public website (landing pages, study guides, login, etc.),
 * the 'dark' class is automatically and immediately removed from <html>.
 */
export function ThemeRouteGuard() {
  const pathname = usePathname();
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (pathname && pathname.startsWith('/dashboard')) {
      document.documentElement.classList.toggle('dark', isDarkMode);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [pathname, isDarkMode]);

  return null;
}
