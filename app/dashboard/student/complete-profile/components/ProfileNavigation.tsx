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
  
  // Basic validation to check if a section is complete for the UI tick mark
  const isSectionComplete = (section: ProfileSection) => {
    switch(section) {
      case 'personal':
        return !!(data.firstName && data.lastName && data.dateOfBirth && data.email && data.phone && data.addressLine && data.city && data.country && data.postalCode && data.nationality && data.gender);
      case 'education':
        return data.educationRecords.length > 0;
      case 'preferences':
        return !!(data.intendedDegreeLevel && data.preferredFieldOfStudy && data.intakeSeason && data.intakeYear);
      case 'finance':
        return !!data.fundingPreference;
      case 'tests':
      case 'experience':
        return true; // Optional sections can always have a checkmark if we don't have hard requirements
      default:
        return false;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold">Profile Completion</h2>
        <div className="text-lg font-bold">{completionPercentage}%</div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
      </div>

      <nav className="flex flex-wrap gap-2 text-sm font-medium text-center text-gray-500">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          const isComplete = isSectionComplete(section.id);
          
          return (
            <React.Fragment key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`inline-flex p-2 items-center rounded-lg border-b-2 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {section.label}
                {isComplete && (
                  <span className="ml-2 text-green-500">✓</span>
                )}
              </button>
              {idx < SECTIONS.length - 1 && (
                <span className="flex items-center text-gray-300 mx-1">→</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
