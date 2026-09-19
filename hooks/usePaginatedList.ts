import { useState, useEffect, useRef, useCallback, useDeferredValue } from 'react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://europebridge.onrender.com';

interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function usePaginatedList<T>(endpoint: string, limit: number = 25) {
  const [data, setData] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDeferredValue(searchQuery);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [error, setError] = useState('');
  
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  
  // AbortController ref to cancel stale search requests
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(async (targetPage: number, searchArg: string, append: boolean = false) => {
    try {
      if (targetPage === 1) setIsLoading(true);
      else setIsFetchingNextPage(true);
      setError('');

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const url = new URL(`${NEXT_PUBLIC_API_URL}${endpoint}`);
      url.searchParams.append('page', targetPage.toString());
      url.searchParams.append('limit', limit.toString());
      if (searchArg) {
        url.searchParams.append('search', searchArg);
      }

      const response = await fetch(url.toString(), {
        credentials: 'include',
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error('Failed to load data.');
      }

      const result: PaginationResult<T> = await response.json();
      
      if (append) {
        setData(prev => {
          // simple deduplication by checking IDs to prevent dupes in strict mode or rapid firing
          const existingIds = new Set(prev.map((item: any) => item.id || item.userId));
          const newItems = result.data.filter((item: any) => !existingIds.has(item.id || item.userId));
          return [...prev, ...newItems];
        });
      } else {
        setData(result.data);
      }

      setHasMore(targetPage < result.pagination.totalPages);
      setPage(targetPage);

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to load data.');
        setHasMore(false);
      }
    } finally {
      if (targetPage === 1) setIsLoading(false);
      else setIsFetchingNextPage(false);
    }
  }, [endpoint, limit]);

  useEffect(() => {
    fetchPage(1, debouncedSearch, false);
    // Cleanup abort controller on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearch, fetchPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingNextPage) {
        fetchPage(page + 1, debouncedSearch, true);
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, isFetchingNextPage, page, debouncedSearch, fetchPage]);

  // Expose a refetch function useful for when assignment actions happen
  const refetch = useCallback(() => {
    fetchPage(1, debouncedSearch, false);
  }, [debouncedSearch, fetchPage]);

  return {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
    refetch
  };
}
