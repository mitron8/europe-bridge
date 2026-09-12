import React from 'react';
import { ProfileSection, ProfileData } from '../types';

interface Props {
  activeSection: ProfileSection;
  setActiveSection: (section: ProfileSection) => void;
  completionPercentage: number;
  data: ProfileData;
}

const SECTIONS: { id: ProfileSection; label: string }[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'education', label: 'Education' },
  { id: 'tests', label: 'Tests' },
  { id: 'experience', label: 'Experience' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'finance', label: 'Finance' },
];

export default function ProfileNavigation({ activeSection, setActiveSection, completionPercentage, data }: Props) {
  
  // The backend strictly calculates whether each section is fully complete according to business rules.
  // We simply read from the authoritative sectionCompletion object.
  const isSectionComplete = (section: ProfileSection) => {
    return !!data.sectionCompletion?.[section];
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-extrabold text-germany-black font-display">Profile Completion</h2>
        <div className="text-lg font-extrabold text-germany-red font-display">{completionPercentage}%</div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-germany-gold to-germany-red h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
 
      <nav className="flex flex-wrap gap-2 items-center">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          const isComplete = isSectionComplete(section.id);
          
          return (
            <React.Fragment key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`inline-flex px-4 py-2 items-center rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-germany-black text-white shadow-md'
                    : 'bg-[#EBE7E0] text-germany-black hover:bg-germany-red hover:text-white'
                }`}
              >
                {section.label}
                {isComplete && (
                  <span className={`ml-1.5 font-bold ${isActive ? 'text-germany-gold' : 'text-green-600'}`}>✓</span>
                )}
              </button>
              {idx < SECTIONS.length - 1 && (
                <span className="text-gray-400 font-extrabold mx-0.5 select-none">→</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
