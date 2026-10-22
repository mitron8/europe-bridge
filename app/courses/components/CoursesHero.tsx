"use client";

import React from "react";
import Link from "next/link";
import { Search, GraduationCap, Coins, Globe2, Briefcase, X, ChevronRight, SlidersHorizontal } from "lucide-react";

interface CoursesHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
  onQuickFilter: (key: string, value: any) => void;
  activeFilterCount: number;
  onResetFilters: () => void;
}

export function CoursesHero({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
  onQuickFilter,
  activeFilterCount,
  onResetFilters,
}: CoursesHeroProps) {
  const quickFilters = [
    { label: "0€ Tuition Only", action: () => onQuickFilter("tuition", "free") },
    { label: "TU9 Universities", action: () => onQuickFilter("tier", "TU9") },
    { label: "Computer Science & AI", action: () => onQuickFilter("field", "Computer Science & AI") },
    { label: "Non-NC (Open Admission)", action: () => onQuickFilter("admission", "Non-NC (Open)") },
    { label: "Data Science & Analytics", action: () => onQuickFilter("field", "Data Science & Analytics") },
    { label: "Mechanical & Automotive", action: () => onQuickFilter("field", "Mechanical & Automotive") },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14 border-b border-[#e5e0d3] bg-[#fbf9f4]">
      {/* Decorative ambient elements */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.025] to-transparent blur-3xl" 
      />

      <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
          <Link href="/" className="transition-colors hover:text-[#16161a]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="font-semibold text-[#16161a]">Courses & Programs</span>
        </nav>

        {/* Hero Title & Badge */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
            <span className="font-semibold text-[#16161a]">Winter 2026 & Summer 2027</span>
            <span className="text-[#9a958c]">|</span>
            <span>DAAD & Uni-Assist Verified Database</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
            Find Your Degree in Germany. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#9e2a2b]">Top Universities, Zero Tuition.</span>
          </h1>

          <p className="mt-3.5 max-w-2xl text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
            Filter through verified English-taught Master&apos;s and Bachelor&apos;s programs at TU9 and top public German research universities. Check minimum German GPAs, IELTS bands, application deadlines, and career salary outcomes.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="mt-7 max-w-3xl">
          <div className="relative flex items-center rounded-2xl border border-[#dcd7cb] bg-white p-2 shadow-[0_4px_20px_rgba(22,22,26,0.04)] transition-all focus-within:border-[#16161a] focus-within:shadow-[0_8px_30px_rgba(22,22,26,0.08)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1ea] text-[#16161a]">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by degree, field, or university (e.g. TUM, Data Science)..."
              className="w-full bg-transparent px-2.5 sm:px-3 py-2 text-[13.5px] sm:text-[14px] text-[#16161a] placeholder:text-[#9a958c] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#787369] hover:bg-[#f4f1ea] hover:text-[#16161a]"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="hidden sm:flex shrink-0 items-center gap-2 border-l border-[#e5e0d3] pl-3 pr-2 text-[12px] text-[#787369] font-medium">
              <span>{filteredCount} {filteredCount === 1 ? 'Program' : 'Programs'}</span>
            </div>
          </div>

          {/* Quick Filter Suggestion Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
            <span className="font-medium text-[#787369] flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#16161a]" /> Quick filters:
            </span>
            {quickFilters.map((qf, i) => (
              <button
                key={i}
                onClick={qf.action}
                className="rounded-full border border-[#dcd7cb] bg-[#f7f5f0] px-3 py-1 text-[#4a4740] transition-colors hover:border-[#16161a] hover:bg-white hover:text-[#16161a]"
              >
                {qf.label}
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button
                onClick={onResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-[12px] font-semibold text-[#b4232f] hover:underline"
              >
                Reset filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Key Metrics Banner */}
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-[#e5e0d3] pt-6">
          <div className="flex items-center gap-3 rounded-xl border border-[#e5e0d3] bg-[#fcfbf7] p-3 sm:p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5e0d3] bg-[#f4f1ea] text-[#16161a]">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[16px] sm:text-[18px] font-bold text-[#16161a]">400+</div>
              <div className="text-[11px] sm:text-[11.5px] text-[#787369]">Degree Programs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#e5e0d3] bg-[#fcfbf7] p-3 sm:p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5e0d3] bg-[#f4f1ea] text-[#16161a]">
              <Coins className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[16px] sm:text-[18px] font-bold text-[#16161a]">0 € / Sem</div>
              <div className="text-[11px] sm:text-[11.5px] text-[#787369]">Public Uni Tuition</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#e5e0d3] bg-[#fcfbf7] p-3 sm:p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5e0d3] bg-[#f4f1ea] text-[#16161a]">
              <Globe2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[16px] sm:text-[18px] font-bold text-[#16161a]">100% English</div>
              <div className="text-[11px] sm:text-[11.5px] text-[#787369]">No German Needed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#e5e0d3] bg-[#fcfbf7] p-3 sm:p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e5e0d3] bg-[#f4f1ea] text-[#16161a]">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[16px] sm:text-[18px] font-bold text-[#16161a]">18-Month Visa</div>
              <div className="text-[11px] sm:text-[11.5px] text-[#787369]">Post-Study Blue Card</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
