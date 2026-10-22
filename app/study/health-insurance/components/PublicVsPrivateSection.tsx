"use client";

import React, { useState } from 'react';
import { Scale, Check, AlertTriangle, Building2, User, HelpCircle, ArrowRight } from 'lucide-react';

export const PublicVsPrivateSection = () => {
  const [selectedStudentType, setSelectedStudentType] = useState<'under30' | 'over30' | 'language'>('under30');

  return (
    <section id="section-comparison" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Public vs. Private Comparison
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          Which System Fits Your <em className="lp-script text-[var(--lp-red)]">Profile?</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Germany has strict statutory eligibility rules. Selecting the wrong category can complicate university matriculation or visa approval.
        </p>
      </div>

      {/* Student Scenario Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-[#eae5db]/60 border border-[#e5e0d3] gap-1">
          {[
            { id: 'under30', label: 'Under 30 (Bachelor / Master)' },
            { id: 'over30', label: 'Age 30+ / PhD Researcher' },
            { id: 'language', label: 'Preparatory / Language Course' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedStudentType(type.id as any)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedStudentType === type.id
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'text-[var(--lp-muted)] hover:text-[var(--lp-text)]'
              }`}
            >
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Recommendation Card */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] max-w-3xl mx-auto space-y-3">
        {selectedStudentType === 'under30' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[var(--lp-text)] font-semibold text-sm">
              <Check className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>Recommended: Statutory Public Insurance (TK / Barmer / AOK)</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Enrolled university students under 30 qualify for the legally mandated student flat rate (~€140–€150/month). You receive unlimited medical treatment with zero out-of-pocket costs at German clinics, free coverage for non-working dependents, and an electronic M10 notification sent directly to your university.
            </p>
          </div>
        )}

        {selectedStudentType === 'over30' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[var(--lp-text)] font-semibold text-sm">
              <Check className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>Recommended: Accredited Private Student Insurance (Ottonova / Expat Partners)</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              At age 30, public statutory insurance shifts to voluntary contributor rates (~€230–€250+/month). Opting for accredited private student coverage reduces monthly premiums to ~€90–€160/month while maintaining 100% German visa compliance and full hospital coverage.
            </p>
          </div>
        )}

        {selectedStudentType === 'language' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[var(--lp-text)] font-semibold text-sm">
              <Check className="w-4 h-4 text-[var(--lp-gold)]" />
              <span>Requirement: Preparatory Expat Health Plan</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              Students attending language preparatory courses or Studienkolleg are not yet matriculated in degree programs and are ineligible for public statutory insurance. You must enroll in private preparatory coverage for your visa, and transition to public coverage once your degree studies officially begin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
