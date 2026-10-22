"use client";

import React, { useState } from "react";
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  Info,
  Euro,
  GraduationCap,
  Building2,
  Calendar,
  Languages,
  MapPin,
  Award
} from "lucide-react";
import { DegreeLevel, FieldOfStudy, UniversityTier, AdmissionMode, LanguageOfInstruction, CourseFilterState } from "../types/course";
import { ALL_FIELDS, POPULAR_CITIES } from "../data/coursesData";

interface CourseFiltersSidebarProps {
  filters: CourseFilterState;
  onFilterChange: <K extends keyof CourseFilterState>(key: K, value: CourseFilterState[K]) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  totalResults: number;
  hideHeader?: boolean;
}

export function CourseFiltersSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
  totalResults,
  hideHeader = false,
}: CourseFiltersSidebarProps) {
  // Collapsible section state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    degree: true,
    field: true,
    tuition: true,
    tier: true,
    admission: true,
    language: true,
    gpa: true,
    intake: false,
    city: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper for toggling array values
  const toggleArrayItem = <T,>(currentList: T[], item: T): T[] => {
    return currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
  };

  return (
    <aside className="w-full flex flex-col rounded-2xl border border-[#e5e0d3] bg-[#fdfcf9] shadow-sm overflow-hidden">
      {/* Top Header - Fixed at top of sidebar */}
      {!hideHeader && (
        <div className="flex shrink-0 items-center justify-between border-b border-[#e5e0d3] bg-[#fdfcf9] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#16161a]" />
            <h2 className="text-[14.5px] font-bold tracking-tight text-[#16161a]">Filter Programs</h2>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#16161a] text-[10px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#b4232f] hover:text-[#e63946] transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset all
            </button>
          )}
        </div>
      )}

      {/* Independently Scrollable Filters Body */}
      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#ece7dd] text-[13px] max-h-[72vh] lg:max-h-[calc(100vh-11rem)] scrollbar-thin"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#dcd7cb transparent",
        }}
      >
        {/* 1. Tuition Fee Filter */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection("tuition")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-[#16161a]" />
              Tuition Fee
            </span>
            {openSections.tuition ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.tuition && (
            <div className="mt-3 space-y-2">
              {[
                { id: "all", label: "All Programs", desc: "Free & nominal" },
                { id: "free", label: "100% Free (0 € Tuition)", desc: "German public university standard", badge: "Popular" },
                { id: "nominal", label: "Nominal / Private (< €1,500)", desc: "Specialized or private programs" }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 transition-all ${
                    filters.tuitionFilter === opt.id
                      ? "border-[#16161a] bg-[#f4f1ea] text-[#16161a]"
                      : "border-[#e5e0d3] bg-white text-[#4a4740] hover:border-[#16161a]"
                  }`}
                >
                  <input
                    type="radio"
                    name="tuition"
                    value={opt.id}
                    checked={filters.tuitionFilter === opt.id}
                    onChange={() => onFilterChange("tuitionFilter", opt.id as any)}
                    className="mt-0.5 text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[12.5px]">{opt.label}</span>
                      {opt.badge && (
                        <span className="rounded bg-[#16161a] px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#787369]">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 2. Degree Level */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("degree")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#16161a]" />
              Degree Level
              {filters.degreeLevels.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.degreeLevels.length}
                </span>
              )}
            </span>
            {openSections.degree ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.degree && (
            <div className="mt-3 space-y-2">
              {(["Masters", "Bachelors", "MBA", "PhD"] as DegreeLevel[]).map((deg) => {
                const checked = filters.degreeLevels.includes(deg);
                return (
                  <label
                    key={deg}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onFilterChange("degreeLevels", toggleArrayItem(filters.degreeLevels, deg))}
                        className="rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                      />
                      <span className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {deg === "Masters" ? "Master's (M.Sc. / M.A.)" : deg === "Bachelors" ? "Bachelor's (B.Sc.)" : deg}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#9a958c]">
                      {deg === "Masters" ? "12" : deg === "Bachelors" ? "2" : deg === "MBA" ? "1" : "1"}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Field of Study */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("field")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#16161a]" />
              Field of Study
              {filters.fields.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.fields.length}
                </span>
              )}
            </span>
            {openSections.field ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.field && (
            <div className="mt-3 space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {ALL_FIELDS.map((f) => {
                const checked = filters.fields.includes(f.label as FieldOfStudy);
                return (
                  <label
                    key={f.label}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          onFilterChange("fields", toggleArrayItem(filters.fields, f.label as FieldOfStudy))
                        }
                        className="rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                      />
                      <span className={`text-[12.5px] truncate max-w-[190px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {f.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#9a958c] font-medium">{f.count}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. University Tier */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("tier")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#16161a]" />
              University Tier
              {filters.universityTiers.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.universityTiers.length}
                </span>
              )}
            </span>
            {openSections.tier ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.tier && (
            <div className="mt-3 space-y-2">
              {[
                { tier: "TU9" as UniversityTier, label: "TU9 Excellence", desc: "Top 9 Technical Universities (TUM, RWTH, KIT...)" },
                { tier: "Public Research" as UniversityTier, label: "Public Research Uni", desc: "Comprehensive top universities (LMU, FAU, Heidelberg)" },
                { tier: "UAS (HAW)" as UniversityTier, label: "UAS / HAW (Applied)", desc: "Industry-linked practical universities" },
                { tier: "Private" as UniversityTier, label: "Top Private / Business", desc: "Accredited specialist institutions" },
              ].map((t) => {
                const checked = filters.universityTiers.includes(t.tier);
                return (
                  <label
                    key={t.tier}
                    className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onFilterChange("universityTiers", toggleArrayItem(filters.universityTiers, t.tier))
                      }
                      className="mt-0.5 rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                    />
                    <div>
                      <div className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {t.label}
                      </div>
                      <p className="text-[11px] text-[#787369]">{t.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Admission Mode */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("admission")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#16161a]" />
              Admission Mode
              {filters.admissionModes.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.admissionModes.length}
                </span>
              )}
            </span>
            {openSections.admission ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.admission && (
            <div className="mt-3 space-y-2">
              {[
                { mode: "Non-NC (Open)" as AdmissionMode, label: "Non-NC (Open Admission)", desc: "Guaranteed admit if requirements are met" },
                { mode: "Aptitude Assessment" as AdmissionMode, label: "Aptitude Assessment", desc: "Points-based profile / interview assessment" },
                { mode: "NC (Restricted)" as AdmissionMode, label: "NC (Restricted Quota)", desc: "Fixed seats ranked by German GPA" },
              ].map((adm) => {
                const checked = filters.admissionModes.includes(adm.mode);
                return (
                  <label
                    key={adm.mode}
                    className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onFilterChange("admissionModes", toggleArrayItem(filters.admissionModes, adm.mode))
                      }
                      className="mt-0.5 rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                    />
                    <div>
                      <div className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {adm.label}
                      </div>
                      <p className="text-[11px] text-[#787369]">{adm.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Language of Instruction */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("language")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-[#16161a]" />
              Language
              {filters.languages.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.languages.length}
                </span>
              )}
            </span>
            {openSections.language ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.language && (
            <div className="mt-3 space-y-2">
              {(["English (100%)", "Bilingual (EN + DE)", "German (100%)"] as LanguageOfInstruction[]).map((lang) => {
                const checked = filters.languages.includes(lang);
                return (
                  <label
                    key={lang}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          onFilterChange("languages", toggleArrayItem(filters.languages, lang))
                        }
                        className="rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                      />
                      <span className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {lang}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 7. Maximum German GPA (Bavarian Scale) */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("gpa")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#16161a]" />
              Minimum German GPA
              {filters.maxGpa && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  ≤ {filters.maxGpa}
                </span>
              )}
            </span>
            {openSections.gpa ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.gpa && (
            <div className="mt-3 space-y-2">
              <p className="text-[11px] text-[#787369] leading-tight">
                In Germany, 1.0 is the best score, 4.0 is passing.
              </p>
              {[
                { val: undefined, label: "Any GPA Requirement" },
                { val: 2.5, label: "German GPA ≤ 2.5 (Good)" },
                { val: 2.2, label: "German GPA ≤ 2.2 (Selective)" },
                { val: 2.0, label: "German GPA ≤ 2.0 (Top Tier)" },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                >
                  <input
                    type="radio"
                    name="maxGpa"
                    checked={filters.maxGpa === item.val}
                    onChange={() => onFilterChange("maxGpa", item.val)}
                    className="text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                  />
                  <span className={`text-[12.5px] ${filters.maxGpa === item.val ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 8. Intake Semester */}
        <div className="py-4">
          <button
            onClick={() => toggleSection("intake")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#16161a]" />
              Intake Semester
            </span>
            {openSections.intake ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.intake && (
            <div className="mt-3 space-y-2">
              {(["Winter", "Summer"] as ("Winter" | "Summer")[]).map((intake) => {
                const checked = filters.intakes.includes(intake);
                return (
                  <label
                    key={intake}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          onFilterChange("intakes", toggleArrayItem(filters.intakes, intake))
                        }
                        className="rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                      />
                      <span className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                        {intake === "Winter" ? "Winter Intake (Oct Start)" : "Summer Intake (Apr Start)"}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 9. Popular Cities */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("city")}
            className="flex w-full items-center justify-between font-semibold text-[#16161a] hover:text-[#9e2a2b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#16161a]" />
              City & Location
              {filters.selectedCities.length > 0 && (
                <span className="rounded-full bg-[#f4f1ea] px-1.5 py-0.5 text-[10px] font-bold text-[#16161a]">
                  {filters.selectedCities.length}
                </span>
              )}
            </span>
            {openSections.city ? <ChevronUp className="h-4 w-4 text-[#9a958c]" /> : <ChevronDown className="h-4 w-4 text-[#9a958c]" />}
          </button>

          {openSections.city && (
            <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {POPULAR_CITIES.map((city) => {
                const checked = filters.selectedCities.includes(city);
                return (
                  <label
                    key={city}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#f4f1ea] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onFilterChange("selectedCities", toggleArrayItem(filters.selectedCities, city))
                      }
                      className="rounded border-[#c9c4b8] text-[#16161a] accent-[#16161a] focus:ring-[#16161a]"
                    />
                    <span className={`text-[12.5px] ${checked ? "font-semibold text-[#16161a]" : "text-[#4a4740]"}`}>
                      {city}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
