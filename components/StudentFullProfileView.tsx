"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, Loader2, AlertCircle } from 'lucide-react';

interface StudentFullProfileViewProps {
  studentId: string;
  onClose: () => void;
}

// Helper to format values consistently, ensuring NA is shown when data is missing
function formatValue(value: any): string {
  if (value === null || value === undefined || value === '') return 'NA';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'NA';
    return value.join(', ');
  }
  return String(value);
}

function formatDate(value: any): string {
  if (value === null || value === undefined || value === '') return 'NA';
  if (typeof value === 'string' && value.includes('T')) {
    return value.split('T')[0];
  }
  return String(value);
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export function StudentFullProfileView({ studentId, onClose }: StudentFullProfileViewProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/counsellor/students/${studentId}/profile`, {
          credentials: 'include'
        });
        if (!response.ok) {
          if (response.status === 403) throw new Error("Access Denied: Student is not assigned to you.");
          if (response.status === 401) throw new Error("Unauthorized: Please log in.");
          throw new Error("Failed to load student profile");
        }
        const data = await response.json();
        if (isMounted) setProfile(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "An error occurred");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, [studentId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white dark:bg-[#0B0E14]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-800 dark:text-gray-200" />
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Loading student profile document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <h3 className="text-lg font-bold text-black dark:text-white">Access Error</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const fullName = [profile.firstName, profile.middleName, profile.lastName]
    .filter(Boolean)
    .join(' ') || 'NA';

  const targetIntake = (profile.intakeSeason || profile.intakeYear)
    ? `${profile.intakeSeason || ''} ${profile.intakeYear || ''}`.trim()
    : 'NA';

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-10 print:bg-white print:p-0 print:block">
      <div className="relative mx-auto w-full max-w-5xl bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-2xl print:shadow-none print:border-none print:m-0 print:p-0 print:rounded-none">
        
        {/* Actions Bar - Hidden on Print */}
        <div className="flex justify-end gap-4 mb-10 print:hidden border-b border-gray-200 dark:border-gray-800/80 pb-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm font-bold border border-gray-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 text-black dark:text-white flex items-center gap-2 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download as PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold bg-slate-800 hover:bg-slate-900 dark:bg-[#151B27] text-white dark:hover:bg-[#1A2130] border border-transparent dark:border-gray-800 flex items-center gap-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            Close Profile
          </button>
        </div>

        {/* Document Header */}
        <div className="mb-10 text-center border-b-2 border-gray-300 dark:border-gray-800 pb-6">
          <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            Student Profile Record
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 uppercase">{fullName}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatValue(profile.email)} &bull; ID: {studentId} &bull; Status: <span className="font-bold text-germany-red">{formatValue(profile.leadStatus)}</span> &bull; Completion: <span className="font-bold">{profile.completionPercentage != null && profile.completionPercentage !== '' ? `${profile.completionPercentage}%` : 'NA'}</span>
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1: Personal Information */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="First Name" value={profile.firstName} />
              <Field label="Middle Name" value={profile.middleName} />
              <Field label="Last Name" value={profile.lastName} />
              <Field label="Date of Birth" value={formatDate(profile.dateOfBirth)} />
              <Field label="Gender" value={profile.gender} />
              <Field label="Nationality" value={profile.nationality} />
            </div>
          </Section>

          {/* Section 2: Contact Information */}
          <Section title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Phone" value={profile.phone} />
              <Field label="WhatsApp" value={profile.whatsapp} />
              <Field label="Address Line" value={profile.addressLine} className="sm:col-span-2 md:col-span-3" />
              <Field label="City" value={profile.city} />
              <Field label="State / Province" value={profile.stateProvince} />
              <Field label="Country" value={profile.country} />
              <Field label="Postal Code" value={profile.postalCode} />
            </div>
          </Section>

          {/* Section 3: Passport & Identification */}
          <Section title="Passport & Identification">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Passport Available" value={profile.passportAvailable} />
              <Field label="Passport Number" value={profile.passportNumber} />
              <Field label="Passport Issue Date" value={formatDate(profile.passportIssueDate)} />
              <Field label="Passport Expiry Date" value={formatDate(profile.passportExpiryDate)} />
              <Field label="Issuing Country" value={profile.passportIssuingCountry} />
            </div>
          </Section>

          {/* Section 4: Academic History (Education) */}
          <Section title="Academic History">
            {profile.educationRecords && profile.educationRecords.length > 0 ? (
              <div className="space-y-8">
                {profile.educationRecords.map((edu: any, idx: number) => {
                  const germanGradeDisplay = edu.germanGrade != null && edu.germanGrade !== '' 
                    ? Number(edu.germanGrade).toFixed(2) 
                    : 'NA';
                  return (
                    <div key={edu.id || idx} className="border border-gray-200 dark:border-gray-800/80 dark:bg-[#0E121A] rounded-xl p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800/80 pb-2 mb-4">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                          Record {idx + 1}: {edu.degreeType || 'Degree'} - {edu.fieldOfStudy || 'Field of Study'}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-gray-500 uppercase">German Equivalent:</span>
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                            {germanGradeDisplay}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                        <Field label="Education Level" value={edu.educationLevel} />
                        <Field label="Degree Type" value={edu.degreeType} />
                        <Field label="Field of Study" value={edu.fieldOfStudy} />
                        <Field label="Specialization" value={edu.specialization} />
                        <Field label="Institution Name" value={edu.institutionName} />
                        <Field label="Institution Country" value={edu.institutionCountry} />
                        <Field label="Start Year" value={edu.startYear} />
                        <Field label="End Year" value={edu.endYear} />
                        <Field label="Academic Status" value={edu.academicStatus} />
                        <Field label="Current Semester" value={edu.currentSemester} />
                        <Field label="Grading System" value={edu.gradingSystem} />
                        <Field label="Achieved Score" value={edu.score} />
                        <Field label="Scale Max" value={edu.scale} />
                        <Field label="Min Passing Grade" value={edu.minPassingScore} />
                        <Field label="German Equivalent Grade" value={germanGradeDisplay} />
                        <Field label="Backlogs" value={edu.backlogs} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500">
                No education records added
              </div>
            )}
          </Section>

          {/* Section 5: English Language Tests */}
          <Section title="English Language Proficiency">
            <div className="mb-6">
              <Field label="English Proficiency State" value={profile.englishProficiencyState} />
            </div>
            
            {profile.englishTests && profile.englishTests.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Saved English Tests</h4>
                {profile.englishTests.map((test: any, idx: number) => (
                  <div key={test.id || idx} className="border border-gray-200 dark:border-gray-800/80 dark:bg-[#0E121A] rounded-xl p-5">
                    <h5 className="font-bold text-xs mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">
                      Test {idx + 1}: {test.testType || 'English Test'}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
                      <Field label="Test Type" value={test.testType} />
                      <Field label="Test Date" value={formatDate(test.testDate)} />
                      <Field label="Score Scale" value={test.scoreScale} />
                      {test.testType === 'TOEFL' && test.scoreScale === '0_120' ? (
                        <>
                          <Field label="Legacy Total (0-120)" value={test.scores?.toeflLegacyTotal} />
                          <Field label="Reading" value={test.scores?.reading} />
                          <Field label="Listening" value={test.scores?.listening} />
                          <Field label="Speaking" value={test.scores?.speaking} />
                          <Field label="Writing" value={test.scores?.writing} />
                        </>
                      ) : (
                        <>
                          <Field label="Overall Score" value={test.scores?.overall} />
                          <Field label="Reading" value={test.scores?.reading} />
                          <Field label="Listening" value={test.scores?.listening} />
                          <Field label="Speaking" value={test.scores?.speaking} />
                          <Field label="Writing" value={test.scores?.writing} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500">
                No English tests recorded
              </div>
            )}
          </Section>

          {/* Section 6: German Language Proficiency */}
          <Section title="German Language Proficiency">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Proficiency Status" value={profile.germanProficiencyState} />
              <Field label="German Level" value={profile.germanLevel} />
              <Field label="Certificate Type" value={profile.germanCertificateType} />
            </div>
          </Section>

          {/* Section 7: dMAT Proficiency */}
          <Section title="dMAT Proficiency">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="dMAT Proficiency Status" value={profile.dmatProficiencyState} />
              <Field label="dMAT Score" value={profile.dmatScore} />
            </div>
          </Section>

          {/* Section 8: Standardized Tests */}
          <Section title="Standardized Tests">
            {profile.standardizedTests && profile.standardizedTests.length > 0 ? (
              <div className="space-y-4">
                {profile.standardizedTests.map((test: any, idx: number) => (
                  <div key={test.id || idx} className="border border-gray-200 dark:border-gray-800/80 dark:bg-[#0E121A] rounded-xl p-5">
                    <h5 className="font-bold text-xs mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">
                      Test {idx + 1}: {test.testType || 'Standardized Test'}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
                      <Field label="Test Type" value={test.testType} />
                      <Field label="Test Date" value={formatDate(test.testDate)} />
                      <Field label="Overall Score" value={test.overallScore} />
                      <Field label="Quantitative Score" value={test.quantScore} />
                      <Field label="Verbal Score" value={test.verbalScore} />
                      <Field label="AWA Score" value={test.awaScore} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500">
                No standardized tests recorded
              </div>
            )}
          </Section>

          {/* Section 9: Professional Experience */}
          <Section title="Professional Experience">
            {profile.experienceRecords && profile.experienceRecords.length > 0 ? (
              <div className="space-y-6">
                {profile.experienceRecords.map((exp: any, idx: number) => (
                  <div key={exp.id || idx} className="border border-gray-200 dark:border-gray-800/80 dark:bg-[#0E121A] rounded-xl p-5">
                    <h4 className="font-bold text-sm mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800/80 pb-2">
                      {exp.jobTitle || 'Role'} at {exp.companyName || 'Company'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                      <Field label="Company Name" value={exp.companyName} />
                      <Field label="Job Title" value={exp.jobTitle} />
                      <Field label="Employment Type" value={exp.employmentType} />
                      <Field label="Industry" value={exp.industry} />
                      <Field label="Current Role" value={exp.isCurrent} />
                      <Field label="Start Date" value={formatDate(exp.startDate)} />
                      <Field label="End Date" value={formatDate(exp.endDate)} />
                      <Field label="Description" value={exp.description} className="sm:col-span-2 md:col-span-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500">
                No experience records added
              </div>
            )}
          </Section>

          {/* Section 10: Study Preferences */}
          <Section title="Study Preferences">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Intended Degree Level" value={profile.intendedDegreeLevel} />
              <Field label="Field of Study" value={profile.preferredFieldOfStudy} />
              <Field label="Specialization" value={profile.preferredSpecialization} />
              <Field label="Target Intake" value={targetIntake} />
              <Field label="Intake Season" value={profile.intakeSeason} />
              <Field label="Intake Year" value={profile.intakeYear} />
              <Field label="University Type" value={profile.universityType} />
              <Field label="Study Mode" value={profile.studyMode} />
              <Field label="Preferred Universities" value={profile.preferredUniversities} className="sm:col-span-2 md:col-span-3" />
            </div>
          </Section>

          {/* Section 11: Financial Information */}
          <Section title="Financial Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Funding Preference" value={profile.fundingPreference} />
              <Field 
                label="Max Tuition Budget" 
                value={profile.maxTuitionBudget != null && profile.maxTuitionBudget !== '' ? `€${profile.maxTuitionBudget}` : 'NA'} 
              />
              <Field label="Blocked Account Ready" value={profile.blockedAccountReady} />
            </div>
          </Section>

          {/* Section 12: Additional Stored Information */}
          <Section title="Additional Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Skills" value={profile.skills} className="sm:col-span-2 md:col-span-3" />
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white uppercase tracking-[0.2em] whitespace-nowrap">{title}</h3>
        <div className="h-px bg-gray-300 dark:bg-gray-800 w-full"></div>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}

function Field({ label, value, className = "" }: { label: string, value: any, className?: string }) {
  return (
    <div className={`flex flex-col border-b border-gray-200 dark:border-gray-800/80 pb-2 ${className}`}>
      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-200 break-words">
        {formatValue(value)}
      </span>
    </div>
  );
}
