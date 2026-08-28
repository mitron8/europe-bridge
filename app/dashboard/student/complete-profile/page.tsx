"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProfileSection, ProfileData, emptyProfile } from './types';
import ProfileNavigation from './components/ProfileNavigation';
import PersonalSection from './components/PersonalSection';
import EducationSection from './components/EducationSection';
import TestsSection from './components/TestsSection';
import ExperienceSection from './components/ExperienceSection';
import PreferencesSection from './components/PreferencesSection';
import FinanceSection from './components/FinanceSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CompleteProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('personal');
  const [profileData, setProfileData] = useState<ProfileData>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch profile — replaces state directly from DB, never merges with emptyProfile
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/student/profile`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data: ProfileData = await res.json();
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
      const res = await fetch(`${API_URL}/student/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        // Convert empty strings to null so validators pass
        body: JSON.stringify(profileData, (_, v) => (v === '' ? null : v)),
      });

      if (res.ok) {
        // Update form from the confirmed DB response — the API returns the saved state
        const saved: ProfileData = await res.json();
        setProfileData(saved);
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

  const calculateCompletion = () => {
    // Based entirely on actual loaded profileData — no hardcoded values
    const checks = [
      !!profileData.firstName,
      !!profileData.lastName,
      !!profileData.dateOfBirth,
      !!profileData.gender,
      !!profileData.nationality,
      !!profileData.email,
      !!profileData.phone,
      !!profileData.addressLine,
      !!profileData.city,
      !!profileData.country,
      !!profileData.postalCode,
      profileData.educationRecords.length > 0,
      !!profileData.intendedDegreeLevel,
      !!profileData.preferredFieldOfStudy,
      !!profileData.intakeSeason,
      !!profileData.intakeYear,
      !!profileData.fundingPreference,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
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
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-gray-500">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Complete My Profile</h1>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ProfileNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          completionPercentage={calculateCompletion()}
          data={profileData}
        />

        <div className="mt-8">{renderSection()}</div>

        <div className="mt-8 pt-4 border-t flex justify-between items-center">
          <span className={`text-sm ${saveMessage.toLowerCase().includes('fail') ? 'text-red-600' : 'text-green-600'}`}>
            {saveMessage}
          </span>
          <button
            onClick={() => saveProfile()}
            disabled={isSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
