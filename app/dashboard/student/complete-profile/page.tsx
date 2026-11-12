"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { ProfileSection, ProfileData, emptyProfile } from './types';
import ProfileNavigation from './components/ProfileNavigation';
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
      const payload = { ...profileData };

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
        if (saved.journeyStatus === 'profile_completed' || (saved.completionPercentage ?? 0) >= 100) {
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
      <div className="max-w-5xl mx-auto py-16 px-4 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 font-bold flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-germany-red" />
          <span className="text-sm font-medium">Loading your academic profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 px-3 sm:px-4 space-y-6">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-germany-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-germany-black dark:text-white tracking-tight">
            Academic Profile Setup
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Provide your verified educational credentials and study preferences. This information powers your Bavarian GPA conversion, AI university matching, and APS checklist.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4F1EA] dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800 rounded-full text-[11px] font-bold text-gray-600 dark:text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted & Confidential</span>
          </div>
        </div>
      </div>

      {/* Profile Complete Alert Banner (Executive & Clean, No Emojis) */}
      {justCompleted && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/50 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-100 font-display">
                Profile Completed & Verified
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Your academic profile is 100% complete. Your full student dashboard and AI university matches are now unlocked.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/dashboard/student"
              className="w-full sm:w-auto neu-btn-primary py-2 px-4 text-xs font-bold text-center cursor-pointer"
            >
              Access Dashboard →
            </Link>
            <button
              onClick={() => setJustCompleted(false)}
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-white text-xs font-bold px-2 py-1 cursor-pointer"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container Card */}
      <div className="neu-card p-6 sm:p-8 relative bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)]">
        {/* Subtle German Tricolor Header Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex overflow-hidden rounded-t-2xl">
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

        <div className="mt-6 pt-2">{renderSection()}</div>

        {/* Global Save & Status Bar */}
        <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className={`text-xs font-bold inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
                saveMessage.toLowerCase().includes('fail')
                  ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-300'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300'
              }`}>
                {!saveMessage.toLowerCase().includes('fail') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                {saveMessage}
              </span>
            )}
            {!saveMessage && (
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                Step changes save automatically when clicking Save & Continue.
              </span>
            )}
          </div>

          <button
            onClick={() => saveProfile()}
            disabled={isSaving}
            className="neu-btn px-5 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-germany-red hover:border-germany-red dark:hover:text-germany-red disabled:opacity-50 cursor-pointer inline-flex items-center gap-2 transition-colors"
          >
            {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin text-germany-red" />}
            <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

