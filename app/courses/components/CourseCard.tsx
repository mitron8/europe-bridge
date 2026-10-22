"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Languages, 
  GraduationCap, 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  FileCheck2
} from "lucide-react";
import { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
  onOpenDetails: (course: Course) => void;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string) => void;
}

export function CourseCard({
  course,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark,
}: CourseCardProps) {
  const isFree = course.tuitionFeePerSemester === 0;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#e5e0d3] bg-white p-4 sm:p-6 shadow-[0_2px_8px_rgba(22,22,26,0.03)] transition-all duration-300 hover:border-[#16161a] hover:shadow-[0_8px_24px_rgba(22,22,26,0.07)]">
      <div>
        {/* Top Header: University & Tier */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            {/* University Acronym Emblem */}
            <div className="flex h-10 min-w-[42px] px-2 shrink-0 items-center justify-center rounded-xl border border-[#e5e0d3] bg-[#f7f5f0] text-[11.5px] font-bold tracking-tight text-[#16161a] text-center select-none">
              {course.universityShort}
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#16161a] leading-tight">
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
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-[11.5px] text-[#787369] mt-1">
                <MapPin className="h-3 w-3 shrink-0 text-[#9a958c]" />
                <span className="truncate">{course.city}, {course.state}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(course.id)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              isBookmarked
                ? "border-[#16161a] bg-[#16161a] text-white"
                : "border-[#e5e0d3] bg-[#fcfbf7] text-[#9a958c] hover:border-[#16161a] hover:text-[#16161a]"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Save program"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Degree & Program Title */}
        <div className="mt-3.5 sm:mt-4">
          <div className="inline-block rounded bg-[#f4f1ea] px-2 py-0.5 text-[10.5px] font-semibold text-[#5e5b54] mb-1.5">
            {course.degreeTitle}
          </div>
          <h3 
            onClick={() => onOpenDetails(course)}
            className="text-[16px] sm:text-[18px] font-bold text-[#16161a] hover:text-[#9e2a2b] transition-colors cursor-pointer leading-snug"
          >
            {course.title}
          </h3>
          <p className="mt-1 text-[11.5px] sm:text-[12px] text-[#787369] line-clamp-1">
            Focus: <span className="text-[#4a4740] font-medium">{course.subdiscipline}</span>
          </p>
        </div>

        {/* Key Metrics 4-Grid */}
        <div className="mt-3.5 sm:mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[#ece7dd] bg-[#faf8f3] p-2.5 sm:p-3 text-[11.5px] sm:text-[12px]">
          <div>
            <div className="text-[9.5px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#9a958c]">Tuition</div>
            <div className="mt-0.5 font-bold text-[#16161a]">
              {isFree ? (
                <span>
                  0 € <span className="text-[10px] font-normal text-[#5e5b54]">(Free)</span>
                </span>
              ) : (
                <span>€{course.tuitionFeePerSemester.toLocaleString()} / sem</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-[9.5px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#9a958c]">Language</div>
            <div className="mt-0.5 font-semibold text-[#16161a] truncate" title={course.language}>
              {course.language}
            </div>
          </div>

          <div>
            <div className="text-[9.5px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#9a958c]">Duration</div>
            <div className="mt-0.5 font-semibold text-[#16161a]">
              {course.ectsCredits} ECTS · {course.durationSemesters} Sem
            </div>
          </div>

          <div>
            <div className="text-[9.5px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#9a958c]">Next Deadline</div>
            <div className="mt-0.5 font-semibold text-[#16161a] truncate" title={course.winterDeadline}>
              {course.winterDeadline}
            </div>
          </div>
        </div>

        {/* Requirements Tag Strip */}
        <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center gap-1.5 text-[10.5px] sm:text-[11px]">
          <span className="rounded-md border border-[#e5e0d3] bg-[#fcfbf7] px-2 py-0.5 font-medium text-[#4a4740]">
            GPA ≤ {course.minGermanGpa.toFixed(1)} German
          </span>
          <span className="rounded-md border border-[#e5e0d3] bg-[#fcfbf7] px-2 py-0.5 font-medium text-[#4a4740]">
            IELTS {course.ieltsRequirement}+
          </span>
          <span className="rounded-md border border-[#e5e0d3] bg-[#fcfbf7] px-2 py-0.5 font-medium text-[#4a4740]">
            {course.admissionMode}
          </span>
          {course.greRequired === "No" && (
            <span className="rounded-md bg-[#ece7dd] px-2 py-0.5 text-[#5e5b54]">
              No GRE
            </span>
          )}
        </div>

        {/* Curriculum Highlights Preview */}
        <div className="mt-3 sm:mt-3.5 space-y-1">
          {course.curriculumHighlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11.5px] sm:text-[12px] text-[#5e5b54]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#16161a] mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Career Outcome Preview */}
        <div className="mt-3 sm:mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg border border-[#e5e0d3] bg-white px-2.5 py-2 text-[11px] sm:text-[11.5px]">
          <div className="flex items-center gap-1.5 text-[#16161a] font-semibold shrink-0">
            <TrendingUp className="h-3.5 w-3.5 text-[#16161a]" />
            <span>Avg {course.careerOutcomes.averageSalary}</span>
          </div>
          <span className="text-[#787369] text-left sm:text-right text-[11px] truncate">
            {course.careerOutcomes.topCompanies.slice(0, 2).join(", ")}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#ece7dd] flex items-center gap-2">
        <button
          onClick={() => onOpenDetails(course)}
          className="flex-1 rounded-xl bg-[#16161a] px-3 py-2 text-center text-[12px] sm:text-[12.5px] font-semibold text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
        >
          View Details
        </button>
        <Link
          href={`/tools/admission-chance?course=${encodeURIComponent(course.title)}&uni=${encodeURIComponent(course.universityShort)}`}
          className="flex items-center justify-center rounded-xl border border-[#dcd7cb] bg-[#f7f5f0] px-3 py-2 text-[12px] sm:text-[12.5px] font-semibold text-[#16161a] transition-colors hover:border-[#16161a] hover:bg-white"
          title="Predict your admission likelihood"
        >
          Calculate Fit
        </Link>
      </div>
    </article>
  );
}
