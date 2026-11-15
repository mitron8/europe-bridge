import { useState, useEffect, useRef, useCallback, useDeferredValue } from 'react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function usePaginatedList<T>(
  endpoint: string,
  initialLimit: number = 25,
  nextLimit: number = 15
) {
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

      const currentLimit = targetPage === 1 ? initialLimit : nextLimit;
      const currentOffset = targetPage === 1 ? 0 : initialLimit + (targetPage - 2) * nextLimit;

      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://europebridge.onrender.com';
      const url = new URL(`${NEXT_PUBLIC_API_URL}${endpoint}`, baseUrl);
      url.searchParams.append('page', targetPage.toString());
      url.searchParams.append('limit', currentLimit.toString());
      url.searchParams.append('offset', currentOffset.toString());
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

      const rawResult = await response.json();
      const isRawArray = Array.isArray(rawResult);
      const newItems: T[] = isRawArray ? rawResult : (rawResult.data || []);
      const total = isRawArray ? newItems.length : (rawResult.pagination?.total ?? (targetPage * currentLimit));
      
      if (append) {
        setData(prev => {
          // simple deduplication by checking IDs to prevent dupes in strict mode or rapid firing
          const existingIds = new Set(prev.map((item: any) => item.id || item.userId));
          const filtered = newItems.filter((item: any) => !existingIds.has(item.id || item.userId));
          return [...prev, ...filtered];
        });
      } else {
        setData(newItems);
      }

      if (isRawArray) {
        setHasMore(false);
      } else if (rawResult.pagination?.total !== undefined) {
        setHasMore(currentOffset + newItems.length < total);
      } else {
        setHasMore(newItems.length === currentLimit);
      }
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
  }, [endpoint, initialLimit, nextLimit]);

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
