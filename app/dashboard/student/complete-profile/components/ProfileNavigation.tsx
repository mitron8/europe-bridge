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
  Check,
  ChevronRight
} from 'lucide-react';

interface Props {
  activeSection: ProfileSection;
  setActiveSection: (section: ProfileSection) => void;
  completionPercentage: number;
  data: ProfileData;
}

export const SECTIONS: {
  id: ProfileSection;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  stepNumber: string;
}[] = [
  { id: 'personal', title: 'Personal Details', shortTitle: 'Personal', subtitle: 'Identity & Legal Information', icon: User, stepNumber: '01' },
  { id: 'education', title: 'Academic History', shortTitle: 'Education', subtitle: 'Degrees & Bavarian GPA', icon: GraduationCap, stepNumber: '02' },
  { id: 'tests', title: 'Language & Tests', shortTitle: 'Tests', subtitle: 'English & German Proficiency', icon: FileText, stepNumber: '03' },
  { id: 'experience', title: 'Experience', shortTitle: 'Experience', subtitle: 'Internships & Employment', icon: Briefcase, stepNumber: '04' },
  { id: 'preferences', title: 'Preferences', shortTitle: 'Preferences', subtitle: 'Target Degree & Universities', icon: Compass, stepNumber: '05' },
  { id: 'finance', title: 'Financial Plan', shortTitle: 'Finance', subtitle: 'Funding & Blocked Account', icon: Wallet, stepNumber: '06' },
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
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];

  return (
    <div className="mb-8 select-none space-y-6">
      {/* Top Header Row: Current Step Context & Overall Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200/80 dark:border-gray-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-germany-red/10 text-germany-red dark:bg-germany-red/20 dark:text-[#ff7885] border border-germany-red/20">
              STEP {currentSection.stepNumber} OF 06
            </span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <h2 className="text-lg font-display font-bold text-germany-black dark:text-white">
              {currentSection.title}
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {currentSection.subtitle}
          </p>
        </div>

        {/* Crisp Progress Pill */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto bg-[#F4F1EA]/80 dark:bg-[#151B27] px-3.5 py-2 rounded-xl border border-gray-200/60 dark:border-gray-800">
          <div className="space-y-0.5 text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              Profile Completion
            </span>
            <span className="text-sm font-display font-extrabold text-germany-black dark:text-white">
              {completionPercentage}% Complete
            </span>
          </div>
          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shrink-0">
            <div 
              className="h-full bg-germany-red rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(completionPercentage, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modern Segmented Milestone Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          const isComplete = isSectionComplete(section.id);
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`relative p-3 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between cursor-pointer group ${
                isActive
                  ? 'bg-white dark:bg-[#18202F] border-germany-red shadow-[0_2px_10px_rgba(230,57,70,0.12)] ring-1 ring-germany-red/30'
                  : isComplete
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 hover:border-emerald-300'
                  : 'bg-[#FDFBF7] dark:bg-[#0E121A] border-gray-200/80 dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {/* Top row: Number/Status badge */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${
                  isActive
                    ? 'text-germany-red dark:text-[#ff7885]'
                    : isComplete
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {section.stepNumber}
                </span>

                {isComplete ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-germany-red animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                )}
              </div>

              {/* Icon & Title */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    isActive 
                      ? 'text-germany-red dark:text-[#ff7885]' 
                      : isComplete 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500'
                  }`} />
                  <span className={`text-xs font-bold truncate ${
                    isActive
                      ? 'text-germany-black dark:text-white font-extrabold'
                      : isComplete
                      ? 'text-emerald-900 dark:text-emerald-300'
                      : 'text-gray-600 dark:text-gray-300 group-hover:text-germany-black dark:group-hover:text-white'
                  }`}>
                    {section.shortTitle}
                  </span>
                </div>
              </div>

              {/* Bottom active indicator */}
              {isActive && (
                <div className="absolute -bottom-px left-3 right-3 h-[2px] bg-germany-red rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

