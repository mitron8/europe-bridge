"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Languages, 
  Bookmark, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { Course } from "../types/course";

interface CourseListItemProps {
  course: Course;
  onOpenDetails: (course: Course) => void;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string) => void;
}

export function CourseListItem({
  course,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark,
}: CourseListItemProps) {
  const isFree = course.tuitionFeePerSemester === 0;

  return (
    <article className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 rounded-2xl border border-[#e5e0d3] bg-white p-4 sm:p-5 shadow-[0_2px_6px_rgba(22,22,26,0.02)] transition-all duration-200 hover:border-[#16161a] hover:shadow-[0_8px_24px_rgba(22,22,26,0.06)]">
      {/* Main Info Block */}
      <div className="flex-1 min-w-0 w-full">
        {/* University Header Row */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* University Acronym Emblem */}
          <div className="flex h-8 min-w-[38px] px-2 shrink-0 items-center justify-center rounded-lg border border-[#e5e0d3] bg-[#f7f5f0] text-[11px] font-bold text-[#16161a] select-none">
            {course.universityShort}
          </div>

          <span className="text-[13px] sm:text-[13.5px] font-bold text-[#16161a]">
            {course.university}
          </span>

          <span
            className={`inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
              course.universityTier === "TU9"
                ? "bg-[#16161a] text-white"
                : "bg-[#f4f1ea] text-[#4a4740] border border-[#e5e0d3]"
            }`}
          >
            {course.universityTier}
          </span>

          <span className="text-[#9a958c] hidden sm:inline">•</span>

          <div className="flex items-center gap-1 text-[11px] sm:text-[11.5px] text-[#787369]">
            <MapPin className="h-3 w-3 shrink-0 text-[#9a958c]" />
            <span>{course.city}, {course.state}</span>
          </div>
        </div>

        {/* Degree & Program Title */}
        <div className="mt-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-[#f4f1ea] px-2 py-0.5 text-[10px] sm:text-[10.5px] font-semibold text-[#5e5b54]">
              {course.degreeTitle}
            </span>
            <span className="text-[11px] text-[#787369]">
              {course.durationSemesters} Semesters · {course.ectsCredits} ECTS
            </span>
          </div>

          <h3
            onClick={() => onOpenDetails(course)}
            className="text-[16px] sm:text-[17.5px] font-bold text-[#16161a] hover:text-[#9e2a2b] transition-colors cursor-pointer leading-snug"
          >
            {course.title}
          </h3>
          <p className="text-[11.5px] sm:text-[12px] text-[#787369] mt-0.5">
            Focus: <span className="text-[#4a4740] font-medium">{course.subdiscipline}</span>
          </p>
        </div>

        {/* Requirements Tag Strip */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10.5px] sm:text-[11px]">
          <span className="rounded-md border border-[#e5e0d3] bg-[#faf8f3] px-2 py-0.5 text-[#4a4740]">
            GPA ≤ {course.minGermanGpa.toFixed(1)} German
          </span>
          <span className="rounded-md border border-[#e5e0d3] bg-[#faf8f3] px-2 py-0.5 text-[#4a4740]">
            IELTS {course.ieltsRequirement}+
          </span>
          <span className="rounded-md border border-[#e5e0d3] bg-[#faf8f3] px-2 py-0.5 text-[#4a4740]">
            {course.language}
          </span>
          <span className="rounded-md border border-[#e5e0d3] bg-[#faf8f3] px-2 py-0.5 font-medium text-[#4a4740]">
            {course.admissionMode}
          </span>
        </div>
      </div>

      {/* Right / Bottom Action Block */}
      <div className="w-full md:w-auto shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#ece7dd]">
        {/* Tuition & Deadline */}
        <div className="text-left md:text-right">
          <div className="text-[9.5px] uppercase font-semibold text-[#9a958c] tracking-wider">Tuition Fee</div>
          <div className="text-[15px] sm:text-[16px] font-bold text-[#16161a]">
            {isFree ? (
              <span>0 € / sem</span>
            ) : (
              <span>€{course.tuitionFeePerSemester.toLocaleString()} / sem</span>
            )}
          </div>
          <div className="text-[11px] text-[#787369] flex items-center md:justify-end gap-1 mt-0.5">
            <Calendar className="h-3 w-3 text-[#9a958c]" />
            <span>{course.winterDeadline}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(course.id)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              isBookmarked
                ? "border-[#16161a] bg-[#16161a] text-white"
                : "border-[#e5e0d3] bg-[#fcfbf7] text-[#9a958c] hover:border-[#16161a] hover:text-[#16161a]"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Save program"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={() => onOpenDetails(course)}
            className="rounded-xl bg-[#16161a] px-3.5 py-2 text-[12px] sm:text-[12.5px] font-semibold text-white transition-all hover:bg-[#2e2e34]"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
