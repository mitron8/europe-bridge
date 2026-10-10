"use client";

import React from 'react';
import { ProfileSection, ProfileData } from '../types';
import { 
  User, 
  GraduationCap, 
  FileText, 
  Briefcase, 
  Compass, 
  Wallet, 
  Check 
} from 'lucide-react';

interface Props {
  activeSection: ProfileSection;
  setActiveSection: (section: ProfileSection) => void;
  completionPercentage: number;
  data: ProfileData;
}

const SECTIONS: {
  id: ProfileSection;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  stepNumber: string;
}[] = [
  { id: 'personal', title: 'Personal', subtitle: 'Identity & Info', icon: User, stepNumber: '1' },
  { id: 'education', title: 'Education', subtitle: 'Academics & Degrees', icon: GraduationCap, stepNumber: '2' },
  { id: 'tests', title: 'Tests', subtitle: 'Language & Scores', icon: FileText, stepNumber: '3' },
  { id: 'experience', title: 'Experience', subtitle: 'Work & Internships', icon: Briefcase, stepNumber: '4' },
  { id: 'preferences', title: 'Preferences', subtitle: 'Fields & Universities', icon: Compass, stepNumber: '5' },
  { id: 'finance', title: 'Finance', subtitle: 'Funding & Support', icon: Wallet, stepNumber: '6' },
];

export default function ProfileNavigation({ 
  activeSection, 
  setActiveSection, 
  completionPercentage, 
  data 
}: Props) {
  const isSectionComplete = (section: ProfileSection) => {
    return !!data.sectionCompletion?.[section];
  };

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <div className="mb-8 select-none">
      {/* Top Header Row: Title, Step Indicator & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-gray-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-extrabold text-germany-black dark:text-white font-display tracking-tight">
              Profile Setup
            </h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-germany-red/10 text-germany-red dark:bg-germany-red/20 dark:text-[#FF6B7A] border border-germany-red/20">
              Step {currentIndex + 1} of {SECTIONS.length}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
            Complete all sections to unlock automated university shortlisting & matching.
          </p>
        </div>

        {/* Completion Progress Metric */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
              Overall Progress
            </span>
            <span className="text-lg font-black text-germany-red dark:text-[#FF6B7A] font-display">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 flex items-center justify-center relative shrink-0">
            <svg className="w-8 h-8 -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="12"
                className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                strokeWidth="2.5"
              />
              <circle
                cx="16"
                cy="16"
                r="12"
                className="stroke-germany-red dark:stroke-[#FF6B7A] fill-none transition-all duration-500"
                strokeWidth="2.5"
                strokeDasharray={2 * Math.PI * 12}
                strokeDashoffset={2 * Math.PI * 12 * (1 - completionPercentage / 100)}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Segmented Stepper Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const isComplete = isSectionComplete(section.id);
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`group relative p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer min-h-[92px] ${
                isActive
                  ? 'bg-white dark:bg-[#151B27] border-germany-red shadow-[0_4px_16px_rgba(216,67,79,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-2 ring-germany-red/20 dark:ring-germany-red/30'
                  : isComplete
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-500/25 hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:bg-emerald-50/70'
                  : 'bg-gray-50/70 dark:bg-[#0A0D14]/80 border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-white dark:hover:bg-[#0E121A]'
              }`}
            >
              {/* Top row: Icon + Status Badge */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-germany-red text-white shadow-xs'
                      : isComplete
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-gray-200/60 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {isComplete ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md border border-emerald-300/50 dark:border-emerald-500/30">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    Done
                  </span>
                ) : isActive ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-germany-red dark:text-[#FF6B7A] bg-germany-red/10 dark:bg-germany-red/20 px-1.5 py-0.5 rounded-md border border-germany-red/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-germany-red dark:bg-[#FF6B7A] animate-pulse" />
                    Active
                  </span>
                ) : (
                  <span className="text-[11px] font-extrabold text-gray-400 dark:text-gray-600">
                    0{section.stepNumber}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h4
                  className={`text-xs font-bold leading-snug truncate transition-colors ${
                    isActive
                      ? 'text-germany-black dark:text-white font-extrabold'
                      : isComplete
                      ? 'text-emerald-950 dark:text-emerald-200'
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-germany-black dark:group-hover:text-white'
                  }`}
                >
                  {section.title}
                </h4>
                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 truncate mt-0.5">
                  {section.subtitle}
                </p>
              </div>

              {/* Active Bottom Accent Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-germany-red dark:bg-[#FF6B7A] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
