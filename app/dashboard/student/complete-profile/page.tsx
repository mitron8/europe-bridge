"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProfileSection, ProfileData, emptyProfile } from './types';
import ProfileNavigation from './components/ProfileNavigation';
import { normalizeDegreeType } from '@/lib/profileHelpers';
import PersonalSection from './components/PersonalSection';
import EducationSection from './components/EducationSection';
import TestsSection from './components/TestsSection';
import ExperienceSection from './components/ExperienceSection';
import PreferencesSection from './components/PreferencesSection';
import FinanceSection from './components/FinanceSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export default function CompleteProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('personal');
  const [profileData, setProfileData] = useState<ProfileData>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);

  // Fetch profile — replaces state directly from DB, never merges with emptyProfile
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/student/profile`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data: ProfileData = await res.json();

        // Check if education section was marked incomplete purely because degreeType missed 'bachelor'
        let needsSync = false;
        const normalizedRecords = data.educationRecords?.map((edu) => {
          const normalized = normalizeDegreeType(edu.degreeType, edu.educationLevel);
          if (normalized !== edu.degreeType) {
            needsSync = true;
          }
          return { ...edu, degreeType: normalized };
        }) || [];

        // If records needed normalization and education is not marked complete, auto-patch immediately
        if (needsSync && data.educationRecords && data.educationRecords.length > 0 && !data.sectionCompletion?.education) {
          try {
            const patchPayload = {
              ...data,
              educationRecords: normalizedRecords,
            };
            const patchRes = await fetch(`${API_URL}/student/profile`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(patchPayload, (_, v) => (v === '' ? null : v)),
            });
            if (patchRes.ok) {
              const patchedData: ProfileData & { journeyStatus?: string } = await patchRes.json();
              setProfileData(patchedData);
              if (patchedData.journeyStatus === 'profile_completed') {
                setJustCompleted(true);
              }
              return;
            }
          } catch (syncErr) {
            console.error('Silent degree normalization error:', syncErr);
          }
        }

        data.educationRecords = normalizedRecords;
        setProfileData(data);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleDataChange = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  const saveProfile = async (nextSection?: ProfileSection | 'finish') => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const payload = {
        ...profileData,
        educationRecords: profileData.educationRecords?.map((edu) => ({
          ...edu,
          degreeType: normalizeDegreeType(edu.degreeType, edu.educationLevel),
        })),
      };

      const res = await fetch(`${API_URL}/student/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        // Convert empty strings to null so validators pass
        body: JSON.stringify(payload, (_, v) => (v === '' ? null : v)),
      });

      if (res.ok) {
        // Update form from the confirmed DB response — the API returns the saved state
        const saved: ProfileData & { journeyStatus?: string } = await res.json();
        setProfileData(saved);
        if (saved.journeyStatus === 'profile_completed') {
          setJustCompleted(true);
        }
        setSaveMessage('Saved');
        setTimeout(() => setSaveMessage(''), 3000);
        if (nextSection) {
          if (nextSection === 'finish') {
            window.location.href = '/dashboard/student';
          } else {
            setActiveSection(nextSection);
          }
        }
      } else {
        const err = await res.json().catch(() => ({}));
        setSaveMessage(`Failed to save: ${err?.message ?? res.status}`);
      }
    } catch (err) {
      console.error('Save failed:', err);
      setSaveMessage('Failed to save — network error');
    } finally {
      setIsSaving(false);
    }
  };



  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('education')} />;
      case 'education':
        return <EducationSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('tests')} onPrev={() => saveProfile('personal')} />;
      case 'tests':
        return <TestsSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('experience')} onPrev={() => saveProfile('education')} />;
      case 'experience':
        return <ExperienceSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('preferences')} onPrev={() => saveProfile('tests')} />;
      case 'preferences':
        return <PreferencesSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('finance')} onPrev={() => saveProfile('experience')} />;
      case 'finance':
        return <FinanceSection data={profileData} onChange={handleDataChange} onNext={() => saveProfile('finish')} onPrev={() => saveProfile('preferences')} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 flex items-center justify-center min-h-[300px]">
        <div className="text-gray-500 font-bold flex items-center gap-2">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-germany-red"></span>
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold text-germany-black mb-6">
        Complete My Profile
      </h1>

      {justCompleted && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 dark:border-emerald-500/30 bg-green-50 dark:bg-emerald-950/40 px-5 py-4 text-green-800 dark:text-emerald-200 shadow-sm dark:shadow-[0_4px_20px_rgba(16,185,129,0.12)]">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-green-900 dark:text-emerald-200">Profile complete!</p>
            <p className="text-sm text-green-800 dark:text-emerald-300 font-medium">Your application journey has started. We&apos;ll be in touch soon.</p>
          </div>
          <button
            onClick={() => setJustCompleted(false)}
            className="ml-auto text-green-600 dark:text-emerald-400 hover:text-green-800 dark:hover:text-emerald-100 text-lg font-bold leading-none cursor-pointer p-1 rounded-lg hover:bg-green-100 dark:hover:bg-emerald-900/40 transition-colors"
            aria-label="Dismiss"
          >✕</button>
        </div>
      )}

      <div className="neu-card p-6 sm:p-10 relative overflow-hidden bg-white">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <ProfileNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          completionPercentage={profileData.completionPercentage || 0}
          data={profileData}
        />

        <div className="mt-8">{renderSection()}</div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
          <span className={`text-sm font-bold ${saveMessage.toLowerCase().includes('fail') ? 'text-red-600' : 'text-green-600'}`}>
            {saveMessage}
          </span>
          <button
            onClick={() => saveProfile()}
            disabled={isSaving}
            className="neu-btn-primary px-6 py-2.5 text-sm font-bold disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
