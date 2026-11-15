'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Hook for smooth "25 + 15" lazy loading:
 * Displays an initial batch of 25 items, and incrementally appends +15 items
 * whenever the user scrolls down to the bottom sentinel ref.
 */
export function useLazySlice<T>(
  items: T[],
  initialCount: number = 25,
  step: number = 15,
  deps: any[] = []
) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset to initial count whenever filtering, tab, or search dependencies change
  useEffect(() => {
    setVisibleCount(initialCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount, ...deps]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(items.length, prev + step));
        }
      },
      {
        rootMargin: '120px',
        threshold: 0.05,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, items.length, step]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(items.length, prev + step));
  };

  return {
    visibleItems,
    hasMore,
    bottomSentinelRef,
    totalCount: items.length,
    visibleCount: Math.min(visibleCount, items.length),
    loadMore,
  };
}

