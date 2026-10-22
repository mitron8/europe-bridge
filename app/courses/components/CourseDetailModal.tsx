"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Euro, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  Calculator, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  Briefcase,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { Course } from "../types/course";

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string) => void;
}

export function CourseDetailModal({
  course,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: CourseDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (course) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  const isFree = course.tuitionFeePerSemester === 0;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0d0d0f]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div 
        role="dialog" 
        aria-modal="true" 
        className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-[#fdfcf9] shadow-2xl border-l border-[#e5e0d3] overflow-y-auto"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e5e0d3] bg-[#fdfcf9]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider ${
                course.universityTier === "TU9"
                  ? "bg-[#16161a] text-white"
                  : "bg-[#f4f1ea] text-[#4a4740] border border-[#e5e0d3]"
              }`}
            >
              {course.universityTier}
            </span>
            <span className="text-[12px] font-medium text-[#787369]">
              {course.field}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(course.id)}
              className={`rounded-xl border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                isBookmarked
                  ? "border-[#16161a] bg-[#16161a] text-white"
                  : "border-[#e5e0d3] bg-white text-[#4a4740] hover:border-[#16161a]"
              }`}
            >
              {isBookmarked ? "Saved ★" : "Save Program"}
            </button>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e5e0d3] bg-white text-[#787369] transition-colors hover:border-[#16161a] hover:text-[#16161a]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Main Title & University */}
          <div>
            <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13px] font-semibold text-[#787369] flex-wrap">
              <div className="flex h-7 min-w-[34px] px-2 shrink-0 items-center justify-center rounded-md border border-[#e5e0d3] bg-[#f7f5f0] text-[11px] font-bold text-[#16161a] select-none">
                {course.universityShort}
              </div>
              <span className="text-[#16161a]">{course.university}</span>
              <span className="hidden sm:inline text-[#9a958c]">•</span>
              <span className="flex items-center gap-1 text-[#4a4740]">
                <MapPin className="h-3.5 w-3.5 text-[#9a958c]" />
                {course.city}, {course.state}
              </span>
            </div>

            <h2 className="mt-2.5 text-2xl sm:text-3xl font-serif font-bold text-[#16161a] leading-tight">
              {course.title}
            </h2>

            <p className="mt-1.5 text-[13.5px] sm:text-[14px] font-medium text-[#9e2a2b]">
              Specialization: {course.subdiscipline}
            </p>
          </div>

          {/* Quick Snapshot Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-[#e5e0d3] bg-[#f7f5f0] p-4 text-[13px]">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9a958c]">Tuition Fee</div>
              <div className="mt-1 font-bold text-[#16161a]">
                {isFree ? (
                  <span>0 € / sem</span>
                ) : (
                  <span>€{course.tuitionFeePerSemester.toLocaleString()} / sem</span>
                )}
              </div>
              <div className="text-[10px] text-[#787369] mt-0.5">+€{course.semesterTicketFee} transit fee</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9a958c]">Language</div>
              <div className="mt-1 font-bold text-[#16161a] truncate">{course.language}</div>
              <div className="text-[10px] text-[#787369] mt-0.5">100% English taught</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9a958c]">Credits & Time</div>
              <div className="mt-1 font-bold text-[#16161a]">{course.ectsCredits} ECTS</div>
              <div className="text-[10px] text-[#787369] mt-0.5">{course.durationSemesters} Semesters (2 yrs)</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9a958c]">Winter Deadline</div>
              <div className="mt-1 font-bold text-[#16161a] text-[12.5px]">{course.winterDeadline}</div>
              <div className="text-[10px] text-[#787369] mt-0.5">Oct 2026 intake</div>
            </div>
          </div>

          {/* Admission & Eligibility Criteria (2026 Regulations) */}
          <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#ece7dd] pb-3 mb-4">
              <h3 className="text-[15.5px] font-bold text-[#16161a] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#16161a]" />
                Admission & Eligibility Requirements (2026)
              </h3>
              <span className="text-[11.5px] font-medium text-[#4a4740] bg-[#f4f1ea] border border-[#e5e0d3] px-2.5 py-0.5 rounded-full">
                {course.admissionMode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="rounded-xl border border-[#ece7dd] bg-[#fbf9f4] p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">Minimum German GPA</div>
                <div className="text-[17px] font-bold text-[#16161a] mt-0.5">
                  ≤ {course.minGermanGpa.toFixed(1)} <span className="text-[12px] font-normal text-[#787369]">(Bavarian Scale)</span>
                </div>
                <p className="mt-1 text-[11px] text-[#5e5b54]">
                  Corresponds to approx ~70-75% in international percentage systems.
                </p>
                <Link
                  href="/tools/german-grade-calculator"
                  className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#b4232f] hover:underline"
                >
                  Convert your CGPA with Bavarian Calculator →
                </Link>
              </div>

              <div className="rounded-xl border border-[#ece7dd] bg-[#fbf9f4] p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">English Proficiency</div>
                <div className="text-[17px] font-bold text-[#16161a] mt-0.5">
                  IELTS {course.ieltsRequirement}+ / TOEFL {course.toeflRequirement}+
                </div>
                <p className="mt-1 text-[11px] text-[#5e5b54]">
                  Medium of Instruction (MOI) certificates are generally not accepted for direct admission.
                </p>
              </div>

              <div className="rounded-xl border border-[#ece7dd] bg-[#fbf9f4] p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">German Language</div>
                <div className="text-[14px] font-bold text-[#16161a] mt-0.5">
                  {course.germanRequirement || "No German proficiency required for admission"}
                </div>
                <p className="mt-1 text-[11px] text-[#5e5b54]">
                  Daily life & internships in Germany benefit from A2/B1 proficiency.
                </p>
              </div>

              <div className="rounded-xl border border-[#ece7dd] bg-[#fbf9f4] p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">APS & GRE Requirements</div>
                <div className="text-[14px] font-bold text-[#16161a] mt-0.5">
                  APS: {course.apsRequired ? "Mandatory for India/China" : "Not Required"}
                </div>
                <div className="text-[12px] font-semibold text-[#5e5b54] mt-0.5">
                  GRE: {course.greRequired === "Mandatory" ? "Mandatory (Q160+)" : course.greRequired === "Optional" ? "Optional / Recommended" : "Not Required"}
                </div>
              </div>
            </div>
          </div>

          {/* Program Description */}
          <div>
            <h3 className="text-[16px] font-bold text-[#16161a] mb-2.5">
              Program Overview
            </h3>
            <p className="text-[14px] text-[#4a4740] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Curriculum Highlights */}
          <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#16161a] mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#16161a]" />
              Core Curriculum & Module Highlights
            </h3>
            <ul className="space-y-2.5">
              {course.curriculumHighlights.map((mod, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#4a4740]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16161a] mt-0.5" />
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career & Salary Prospects */}
          <div className="rounded-2xl border border-[#e5e0d3] bg-[#f9f8f5] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[16px] font-bold text-[#16161a] mb-2">
              <TrendingUp className="h-5 w-5 text-[#16161a]" />
              Career Outcomes & German Blue Card Potential
            </div>
            <p className="text-[13px] text-[#5e5b54] mb-4">
              Graduates of this degree program qualify for the 18-month German post-study work visa and EU Blue Card fast-track permanent residency (after 21 months with B1 German).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="rounded-xl border border-[#e5e0d3] bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">Average Starting Salary</div>
                <div className="text-[20px] font-bold text-[#16161a] mt-1">{course.careerOutcomes.averageSalary}</div>
                <div className="text-[11px] text-[#787369] mt-1">Exceeds German Blue Card threshold (~€45,300)</div>
              </div>

              <div className="rounded-xl border border-[#e5e0d3] bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">Top Recruiting Companies</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {course.careerOutcomes.topCompanies.map((comp) => (
                    <span key={comp} className="rounded-md bg-[#f4f1ea] px-2 py-0.5 text-[11.5px] font-semibold text-[#16161a]">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#787369] mb-1.5">Common Job Roles</div>
              <div className="flex flex-wrap gap-1.5">
                {course.careerOutcomes.topRoles.map((role) => (
                  <span key={role} className="rounded-full border border-[#dcd7cb] bg-white px-2.5 py-1 text-[12px] font-medium text-[#4a4740]">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 border-t border-[#e5e0d3] bg-[#fdfcf9] p-4 sm:p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/tools/admission-chance?course=${encodeURIComponent(course.title)}&uni=${encodeURIComponent(course.universityShort)}`}
              onClick={onClose}
              className="w-full sm:flex-1 rounded-xl bg-[#16161a] px-4 py-3 text-center text-[13.5px] font-semibold text-white transition-all hover:bg-[#2e2e34] shadow-sm flex items-center justify-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Check Admission Likelihood
            </Link>

            <a
              href={course.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#dcd7cb] bg-white px-4 py-3 text-[13.5px] font-semibold text-[#16161a] transition-colors hover:border-[#16161a] hover:bg-[#f7f5f0]"
            >
              <span>Official University Page</span>
              <ExternalLink className="h-4 w-4 text-[#787369]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
