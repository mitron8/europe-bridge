"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Bookmark, 
  Frown, 
  RotateCcw,
  ChevronDown,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Course, CourseFilterState } from "../types/course";
import { COURSES_DATA } from "../data/coursesData";
import { CoursesHero } from "./CoursesHero";
import { CourseFiltersSidebar } from "./CourseFiltersSidebar";
import { CourseCard } from "./CourseCard";
import { CourseListItem } from "./CourseListItem";
import { CourseDetailModal } from "./CourseDetailModal";
import { CoursesDatabaseBanner } from "./CoursesDatabaseBanner";

const INITIAL_FILTERS: CourseFilterState = {
  searchQuery: "",
  degreeLevels: [],
  fields: [],
  tuitionFilter: "all",
  languages: [],
  admissionModes: [],
  universityTiers: [],
  intakes: [],
  selectedCities: [],
  maxGpa: undefined,
  sortBy: "recommended",
};

export function CoursesExplorer() {
  const [filters, setFilters] = useState<CourseFilterState>(INITIAL_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Server data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Debounce search query input by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.searchQuery);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  // Reset page to 1 whenever any filter changes (except page itself)
  const prevFiltersRef = useRef(filters);
  useEffect(() => {
    const prev = prevFiltersRef.current;
    if (
      prev.degreeLevels !== filters.degreeLevels ||
      prev.fields !== filters.fields ||
      prev.tuitionFilter !== filters.tuitionFilter ||
      prev.languages !== filters.languages ||
      prev.universityTiers !== filters.universityTiers ||
      prev.admissionModes !== filters.admissionModes ||
      prev.intakes !== filters.intakes ||
      prev.selectedCities !== filters.selectedCities ||
      prev.maxGpa !== filters.maxGpa ||
      prev.sortBy !== filters.sortBy
    ) {
      setCurrentPage(1);
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("eb_bookmarked_courses");
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("eb_bookmarked_courses", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleFilterChange = <K extends keyof CourseFilterState>(
    key: K,
    value: CourseFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setShowOnlyBookmarks(false);
    setCurrentPage(1);
  };

  // Quick filter helper
  const handleQuickFilter = (key: string, value: any) => {
    setCurrentPage(1);
    if (key === "tuition") {
      setFilters((prev) => ({ ...prev, tuitionFilter: value }));
    } else if (key === "tier") {
      setFilters((prev) => ({
        ...prev,
        universityTiers: prev.universityTiers.includes(value) ? [] : [value],
      }));
    } else if (key === "field") {
      setFilters((prev) => ({
        ...prev,
        fields: prev.fields.includes(value) ? [] : [value],
      }));
    } else if (key === "admission") {
      setFilters((prev) => ({
        ...prev,
        admissionModes: prev.admissionModes.includes(value) ? [] : [value],
      }));
    }
  };

  // Fetch courses from backend API
  useEffect(() => {
    let isCancelled = false;

    async function fetchCourses() {
      setIsLoading(true);
      setFetchError(null);

      try {
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
        if (filters.degreeLevels.length > 0) params.set("degree", filters.degreeLevels.join(","));
        if (filters.fields.length > 0) params.set("field", filters.fields.join(","));
        if (filters.tuitionFilter !== "all") params.set("tuition", filters.tuitionFilter);
        if (filters.languages.length > 0) params.set("language", filters.languages.join(","));
        if (filters.universityTiers.length > 0) params.set("tier", filters.universityTiers.join(","));
        if (filters.admissionModes.length > 0) params.set("admissionMode", filters.admissionModes.join(","));
        if (filters.intakes.length > 0) params.set("intake", filters.intakes.join(","));
        if (filters.selectedCities.length > 0) params.set("city", filters.selectedCities.join(","));
        if (filters.maxGpa !== undefined) params.set("maxGpa", String(filters.maxGpa));
        if (filters.sortBy) params.set("sortBy", filters.sortBy);
        params.set("page", String(currentPage));
        params.set("limit", "24");

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/backend";
        const res = await fetch(`${API_BASE}/courses?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`Failed to load courses (${res.status})`);
        }

        const data = await res.json();
        if (!isCancelled) {
          if (Array.isArray(data.courses)) {
            setCourses(data.courses);
            setTotalCourses(data.total || 0);
            setTotalPages(data.totalPages || 1);
          } else {
            // Fallback to static data if structure unexpected
            setCourses(COURSES_DATA);
            setTotalCourses(COURSES_DATA.length);
            setTotalPages(1);
          }
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.warn("Backend courses query failed, falling back to static catalogue:", err.message);
          setFetchError(err.message);
          // Graceful fallback to static data
          setCourses(COURSES_DATA);
          setTotalCourses(COURSES_DATA.length);
          setTotalPages(1);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      isCancelled = true;
    };
  }, [
    debouncedSearch,
    filters.degreeLevels,
    filters.fields,
    filters.tuitionFilter,
    filters.languages,
    filters.universityTiers,
    filters.admissionModes,
    filters.intakes,
    filters.selectedCities,
    filters.maxGpa,
    filters.sortBy,
    currentPage,
  ]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.degreeLevels.length > 0) count += filters.degreeLevels.length;
    if (filters.fields.length > 0) count += filters.fields.length;
    if (filters.tuitionFilter !== "all") count++;
    if (filters.languages.length > 0) count += filters.languages.length;
    if (filters.admissionModes.length > 0) count += filters.admissionModes.length;
    if (filters.universityTiers.length > 0) count += filters.universityTiers.length;
    if (filters.intakes.length > 0) count += filters.intakes.length;
    if (filters.selectedCities.length > 0) count += filters.selectedCities.length;
    if (filters.maxGpa !== undefined) count++;
    if (showOnlyBookmarks) count++;
    return count;
  }, [filters, showOnlyBookmarks]);

  // Client-side bookmark filtering
  const displayedCourses = useMemo(() => {
    if (!showOnlyBookmarks) return courses;
    return courses.filter((c) => bookmarkedIds.includes(c.id));
  }, [courses, showOnlyBookmarks, bookmarkedIds]);

  return (
    <div className="w-full">
      {/* 1. Hero with search and quick shortcuts */}
      <CoursesHero
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange("searchQuery", q)}
        totalCount={totalCourses || 24557}
        filteredCount={displayedCourses.length}
        onQuickFilter={handleQuickFilter}
        activeFilterCount={activeFilterCount}
        onResetFilters={handleResetFilters}
      />

      {/* 2. Main Exploration Section */}
      <div className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Controls Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[#e5e0d3] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Results counter & Mobile Filter Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-[#16161a] bg-[#16161a] px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm cursor-pointer"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10.5px] font-bold text-[#16161a]">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="text-[14px] text-[#5e5b54]">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2 text-[#787369]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#e63946]" />
                    Searching accredited German database...
                  </span>
                ) : (
                  <span>
                    Showing{" "}
                    <span className="font-bold text-[#16161a]">{displayedCourses.length}</span> of{" "}
                    <span className="font-bold text-[#16161a]">{totalCourses.toLocaleString()}</span> accredited programs
                  </span>
                )}
              </div>
            </div>

            {/* Right: Bookmarked toggle, Sort, View mode switcher */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Bookmark Filter Toggle */}
              <button
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-all cursor-pointer ${
                  showOnlyBookmarks
                    ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]"
                    : "border-[#dcd7cb] bg-white text-[#4a4740] hover:border-[#16161a]"
                }`}
                title="Filter by saved programs"
              >
                <Bookmark className={`h-3.5 w-3.5 ${showOnlyBookmarks ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">Saved</span>
                {bookmarkedIds.length > 0 && (
                  <span className="text-[11px] font-bold">({bookmarkedIds.length})</span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value as any)}
                  className="appearance-none rounded-xl border border-[#dcd7cb] bg-white py-2 pl-3 pr-8 text-[12.5px] font-semibold text-[#16161a] hover:border-[#16161a] focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended &amp; TU9</option>
                  <option value="title-asc">Degree Name (A–Z)</option>
                  <option value="university-asc">University (A–Z)</option>
                  <option value="gpa-asc">Min German GPA Cutoff</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[#787369]" />
              </div>

              {/* View Mode Switcher (Grid vs List) */}
              <div className="hidden sm:flex items-center rounded-xl border border-[#dcd7cb] bg-[#f7f5f0] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-[#16161a] shadow-xs"
                      : "text-[#787369] hover:text-[#16161a]"
                  }`}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-[#16161a] shadow-xs"
                      : "text-[#787369] hover:text-[#16161a]"
                  }`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[12px]">
              <span className="font-semibold text-[#787369] mr-1">Active filters:</span>

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  Search: &quot;{filters.searchQuery}&quot;
                  <button onClick={() => handleFilterChange("searchQuery", "")} className="hover:text-[#e63946] cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.tuitionFilter !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {filters.tuitionFilter === "free" ? "0€ Tuition Free" : "Nominal / Private"}
                  <button onClick={() => handleFilterChange("tuitionFilter", "all")} className="hover:text-[#e63946] cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.degreeLevels.map((deg) => (
                <span key={deg} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {deg}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "degreeLevels",
                        filters.degreeLevels.filter((d) => d !== deg)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {filters.fields.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {f}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "fields",
                        filters.fields.filter((item) => item !== f)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {filters.universityTiers.map((tier) => (
                <span key={tier} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {tier}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "universityTiers",
                        filters.universityTiers.filter((t) => t !== tier)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {filters.admissionModes.map((adm) => (
                <span key={adm} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {adm}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "admissionModes",
                        filters.admissionModes.filter((a) => a !== adm)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {filters.languages.map((l) => (
                <span key={l} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {l}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "languages",
                        filters.languages.filter((item) => item !== l)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {filters.maxGpa && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  GPA ≤ {filters.maxGpa}
                  <button onClick={() => handleFilterChange("maxGpa", undefined)} className="hover:text-[#e63946] cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.selectedCities.map((city) => (
                <span key={city} className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 font-medium text-[#16161a]">
                  {city}
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "selectedCities",
                        filters.selectedCities.filter((c) => c !== city)
                      )
                    }
                    className="hover:text-[#e63946] cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {showOnlyBookmarks && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#dcd7cb] bg-[#f4f1ea] px-2.5 py-1 font-medium text-[#16161a]">
                  Saved Only
                  <button onClick={() => setShowOnlyBookmarks(false)} className="hover:text-[#b4232f] cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 font-bold text-[#b4232f] hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* 3. Main Body: Sidebar Filters + Program Results */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24 max-h-[calc(100vh-7.5rem)]">
            <CourseFiltersSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
              totalResults={totalCourses || displayedCourses.length}
            />
          </div>

          {/* Results Column */}
          <div className="flex-1 min-w-0 w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#e5e0d3] bg-white p-6 shadow-xs animate-pulse space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-12 rounded-xl bg-gray-200" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-4 w-3/4 rounded bg-gray-200" />
                        <div className="h-3 w-1/2 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-1/4 rounded bg-gray-200" />
                      <div className="h-5 w-5/6 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-100" />
                    </div>
                    <div className="h-16 rounded-xl bg-gray-50" />
                    <div className="flex justify-between pt-2">
                      <div className="h-4 w-20 rounded bg-gray-200" />
                      <div className="h-8 w-24 rounded-xl bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedCourses.length === 0 ? (
              <div className="rounded-3xl border border-[#e5e0d3] bg-white p-12 text-center shadow-xs">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f1ea] text-[#787369] mb-4">
                  <Frown className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#16161a]">
                  No degree programs matched your filters
                </h3>
                <p className="mt-2 text-[14px] text-[#5e5b54] max-w-md mx-auto">
                  Try clearing some filter criteria, broadening your search term, or selecting a different study field.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16161a] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#2e2e34] cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset all filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {displayedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onOpenDetails={(c) => setSelectedCourse(c)}
                    isBookmarked={bookmarkedIds.includes(course.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {displayedCourses.map((course) => (
                  <CourseListItem
                    key={course.id}
                    course={course}
                    onOpenDetails={(c) => setSelectedCourse(c)}
                    isBookmarked={bookmarkedIds.includes(course.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e0d3] bg-white p-4 shadow-xs">
                <div className="text-[13px] text-[#5e5b54]">
                  Page <span className="font-bold text-[#16161a]">{currentPage}</span> of{" "}
                  <span className="font-bold text-[#16161a]">{totalPages}</span> (
                  {(totalCourses).toLocaleString()} programs)
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={currentPage <= 1}
                    className="inline-flex items-center gap-1 rounded-xl border border-[#dcd7cb] bg-white px-3 py-1.5 text-[12.5px] font-bold text-[#16161a] hover:bg-[#f7f5f0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  {/* Quick Page Jump indicators */}
                  <div className="hidden sm:flex items-center gap-1 px-1">
                    {[currentPage - 1, currentPage, currentPage + 1]
                      .filter((p) => p >= 1 && p <= totalPages)
                      .map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setCurrentPage(p);
                            window.scrollTo({ top: 380, behavior: "smooth" });
                          }}
                          className={`h-8 w-8 rounded-lg text-[12px] font-bold transition-colors cursor-pointer ${
                            p === currentPage
                              ? "bg-[#16161a] text-white"
                              : "border border-[#dcd7cb] bg-white text-[#4a4740] hover:bg-[#f7f5f0]"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={currentPage >= totalPages}
                    className="inline-flex items-center gap-1 rounded-xl border border-[#dcd7cb] bg-white px-3 py-1.5 text-[12.5px] font-bold text-[#16161a] hover:bg-[#f7f5f0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Database Engine sync reassurance banner */}
            <CoursesDatabaseBanner />
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-in Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden flex justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#0d0d0f]/60 backdrop-blur-xs"
          />
          <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#fdfcf9] shadow-2xl overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e5e0d3] bg-[#fdfcf9] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14.5px] text-[#16161a]">
                  Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[12px] font-semibold text-[#b4232f] hover:underline ml-2 cursor-pointer"
                  >
                    Reset all
                  </button>
                )}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e5e0d3] text-[#787369] hover:text-[#16161a] cursor-pointer"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3 pb-24">
              <CourseFiltersSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
                totalResults={totalCourses || displayedCourses.length}
                hideHeader
              />
            </div>
            <div className="sticky bottom-0 z-20 border-t border-[#e5e0d3] bg-[#fdfcf9] p-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-[#16161a] py-3 text-center text-[13.5px] font-semibold text-white cursor-pointer"
              >
                Show Programs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        isBookmarked={selectedCourse ? bookmarkedIds.includes(selectedCourse.id) : false}
        onToggleBookmark={toggleBookmark}
      />
    </div>
  );
}
