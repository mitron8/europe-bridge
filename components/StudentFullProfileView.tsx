"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, Loader2, AlertCircle } from 'lucide-react';

interface StudentFullProfileViewProps {
  studentId: string;
  onClose: () => void;
}

// Helper to format values correctly
function formatValue(value: any): string {
  if (value === null || value === undefined || value === '') return 'NA';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'NA';
    return value.join(', ');
  }
  return String(value);
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
          <p className="text-sm font-bold text-gray-600">Loading student profile document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <h3 className="text-lg font-bold text-black">Access Error</h3>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm overflow-y-auto p-4 sm:p-10 print:bg-white print:p-0 print:block">
      <div className="relative mx-auto w-full max-w-5xl bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-2xl print:shadow-none print:border-none print:m-0 print:p-0 print:rounded-none">
        
        {/* Actions Bar - Hidden on Print */}
        <div className="flex justify-end gap-4 mb-10 print:hidden border-b border-gray-200 pb-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm font-bold border border-gray-400 hover:bg-gray-50 text-black flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download as PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close Profile
          </button>
        </div>

        {/* Document Header */}
        <div className="mb-10 text-center border-b-2 border-black pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-black mb-2 uppercase">Student Profile</h1>
          <h2 className="text-xl font-medium text-black mb-1">{profile.firstName} {profile.lastName}</h2>
          <p className="text-sm text-gray-700">{profile.email} &bull; ID: {studentId}</p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1: Personal Information */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="First Name" value={profile.firstName} />
              <Field label="Middle Name" value={profile.middleName} />
              <Field label="Last Name" value={profile.lastName} />
              <Field label="Date of Birth" value={profile.dateOfBirth} />
              <Field label="Gender" value={profile.gender} />
              <Field label="Nationality" value={profile.nationality} />
              <Field label="Passport Available" value={profile.passportAvailable} />
              <Field label="Passport Number" value={profile.passportNumber} />
              <Field label="Passport Issue Date" value={profile.passportIssueDate} />
              <Field label="Passport Expiry Date" value={profile.passportExpiryDate} />
              <Field label="Issuing Country" value={profile.passportIssuingCountry} />
            </div>
          </Section>

          {/* Section 2: Contact Information */}
          <Section title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Phone" value={profile.phone} />
              <Field label="WhatsApp" value={profile.whatsapp} />
              <Field label="Address Line" value={profile.addressLine} className="sm:col-span-2 md:col-span-3" />
              <Field label="City" value={profile.city} />
              <Field label="State/Province" value={profile.stateProvince} />
              <Field label="Country" value={profile.country} />
              <Field label="Postal Code" value={profile.postalCode} />
            </div>
          </Section>

          {/* Section 3: Academic Information */}
          <Section title="Academic Information">
            {profile.educationRecords && profile.educationRecords.length > 0 ? (
              <div className="space-y-8">
                {profile.educationRecords.map((edu: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-bold text-sm mb-4 text-black border-b border-gray-100 pb-2">{edu.degreeType} - {edu.fieldOfStudy}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                      <Field label="Education Level" value={edu.educationLevel} />
                      <Field label="Specialization" value={edu.specialization} />
                      <Field label="Institution Name" value={edu.institutionName} />
                      <Field label="Country" value={edu.institutionCountry} />
                      <Field label="Start Year" value={edu.startYear} />
                      <Field label="End Year" value={edu.endYear} />
                      <Field label="Academic Status" value={edu.academicStatus} />
                      <Field label="Current Semester" value={edu.currentSemester} />
                      <Field label="Grading System" value={edu.gradingSystem} />
                      <Field label="Score" value={edu.score} />
                      <Field label="Scale" value={edu.scale} />
                      <Field label="Backlogs" value={edu.backlogs} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Field label="Education Records" value={null} />
            )}
          </Section>

          {/* Section 4: Language / Test Information */}
          <Section title="Language & Test Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 mb-8">
              <Field label="German Level" value={profile.germanLevel} />
              <Field label="German Certificate" value={profile.germanCertificateType} />
            </div>
            
            {profile.englishTests && profile.englishTests.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-sm mb-4 text-gray-800 uppercase tracking-widest text-[10px]">English Tests</h4>
                {profile.englishTests.map((test: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
                      <Field label="Test Type" value={test.testType} />
                      <Field label="Test Date" value={test.testDate} />
                      <Field label="Overall Score" value={test.overallScore} className="md:col-span-2" />
                      <Field label="Reading" value={test.readingScore} />
                      <Field label="Listening" value={test.listeningScore} />
                      <Field label="Speaking" value={test.speakingScore} />
                      <Field label="Writing" value={test.writingScore} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {profile.standardizedTests && profile.standardizedTests.length > 0 && (
              <div>
                <h4 className="font-bold text-sm mb-4 text-gray-800 uppercase tracking-widest text-[10px]">Standardized Tests</h4>
                {profile.standardizedTests.map((test: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
                      <Field label="Test Type" value={test.testType} />
                      <Field label="Test Date" value={test.testDate} />
                      <Field label="Overall Score" value={test.overallScore} />
                      <Field label="Quantitative" value={test.quantScore} />
                      <Field label="Verbal" value={test.verbalScore} />
                      <Field label="AWA Score" value={test.awaScore} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Section 5: Study Preferences */}
          <Section title="Study Preferences">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <Field label="Intended Degree Level" value={profile.intendedDegreeLevel} />
              <Field label="Field of Study" value={profile.preferredFieldOfStudy} />
              <Field label="Specialization" value={profile.preferredSpecialization} />
              <Field label="Target Intake" value={`${formatValue(profile.intakeSeason)} ${formatValue(profile.intakeYear)}`.trim() === 'NA NA' ? null : `${formatValue(profile.intakeSeason)} ${formatValue(profile.intakeYear)}`} />
              <Field label="University Type" value={profile.universityType} />
              <Field label="Study Mode" value={profile.studyMode} />
              <Field label="Funding Preference" value={profile.fundingPreference} />
              <Field label="Max Tuition Budget" value={profile.maxTuitionBudget} />
              <Field label="Blocked Account Ready" value={profile.blockedAccountReady} />
              <Field label="Preferred Universities" value={profile.preferredUniversities} className="sm:col-span-2 md:col-span-3" />
              <Field label="Skills" value={profile.skills} className="sm:col-span-2 md:col-span-3" />
            </div>
          </Section>

          {/* Section 6: Experience Records */}
          <Section title="Experience Records">
            {profile.experienceRecords && profile.experienceRecords.length > 0 ? (
              <div className="space-y-6">
                {profile.experienceRecords.map((exp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-bold text-sm mb-4 text-black border-b border-gray-100 pb-2">{exp.jobTitle} at {exp.companyName}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                      <Field label="Employment Type" value={exp.employmentType} />
                      <Field label="Industry" value={exp.industry} />
                      <Field label="Current Role" value={exp.isCurrent} />
                      <Field label="Start Date" value={exp.startDate} />
                      <Field label="End Date" value={exp.endDate} />
                      <Field label="Description" value={exp.description} className="sm:col-span-2 md:col-span-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Field label="Experience Records" value={null} />
            )}
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
        <h3 className="text-[13px] font-bold text-black uppercase tracking-[0.2em] whitespace-nowrap">{title}</h3>
        <div className="h-px bg-gray-300 w-full"></div>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}

function Field({ label, value, className = "" }: { label: string, value: any, className?: string }) {
  return (
    <div className={`flex flex-col border-b border-gray-200 pb-2 ${className}`}>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-medium text-black break-words">
        {formatValue(value)}
      </span>
    </div>
  );
}
