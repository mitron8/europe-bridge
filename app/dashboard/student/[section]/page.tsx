"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProfileCompletionGate from '@/components/ProfileCompletionGate';
import StudentStageGate from '@/components/StudentStageGate';
import { StudentDocumentHub } from '@/components/StudentDocumentHub';
import { StudentServicesHub } from '@/components/StudentServicesHub';
import AccountSettingsView from '@/components/AccountSettingsView';
import StudentAdmissionPage from '../admission/page';
import StudentVisaAssistancePage from '../visa/page';
import {
  Compass,
  Bookmark,
  FileText,
  CheckCircle2,
  Send,
  Plane,
  Settings,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
  Award,
  GraduationCap,
  Layers,
  Trash2,
  Lock,
} from 'lucide-react';

const VALID_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa', 'account', 'help', 'services'
];

const RESTRICTED_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa'
];

interface SectionConfig {
  title: string;
  subtitle: string;
  icon: any;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  matching: {
    title: 'AI Matching Engine',
    subtitle: 'Find German universities matching your exact academic profile and career goals.',
    icon: Compass,
  },
  documents: {
    title: 'Document Hub',
    subtitle: 'Upload, manage, and verify all essential admission and visa documents.',
    icon: FileText,
  },
  aps: {
    title: 'APS India Checklist',
    subtitle: 'Step-by-step verification checklist for the mandatory APS Certificate.',
    icon: CheckCircle2,
  },
  shortlist: {
    title: 'My Shortlist',
    subtitle: 'Your selected universities and programs ready for application.',
    icon: Bookmark,
  },
  applications: {
    title: 'College Applications',
    subtitle: 'Track your Uni-Assist and direct university submissions in real-time.',
    icon: Send,
  },
  visa: {
    title: 'Visa & Relocation Support',
    subtitle: 'Blocked account setup, health insurance, and embassy appointment assistance.',
    icon: Plane,
  },
  account: {
    title: 'Account Settings',
    subtitle: 'Manage your credentials, notification preferences, and assigned counsellor.',
    icon: Settings,
  },
  services: {
    title: 'My Purchased Services',
    subtitle: 'Track your SOP, LOR, CV, Shortlisting, and Visa preparation orders, deliverables, and counselor feedback.',
    icon: Layers,
  },
};

// ── Eligibility badge helper ─────────────────────────────────────────────────
const ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CONDITIONAL: 'bg-amber-100 text-amber-700 border-amber-200',
  NEEDS_REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
  NOT_ELIGIBLE: 'bg-red-100 text-red-700 border-red-200',
};
const ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

import { MatchingSection } from './components/MatchingSection';
import { ShortlistSection } from './components/ShortlistSection';

export default function StudentSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const config = SECTION_CONFIGS[section] || {
    title: section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: `Manage your ${section}`,
    icon: Compass,
  };

  const Icon = config.icon;
  const isRestricted = RESTRICTED_SECTIONS.includes(section);
  const [completionPercentage, setCompletionPercentage] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [gates, setGates] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isRestricted);

  useEffect(() => {
    if (!isRestricted) return;

    const checkProfileStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const res = await fetch(`${API_URL}/student/profile`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const pct = typeof data.completionPercentage === 'number' ? data.completionPercentage : 0;
          setCompletionPercentage(pct);
          if (data.firstName) setUserName(data.firstName);
          if (data.gates) setGates(data.gates);
        } else {
          setCompletionPercentage(0);
        }
      } catch (err) {
        console.error('Failed to load profile for section check:', err);
        setCompletionPercentage(0);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileStatus();
  }, [isRestricted]);

  return (
    <div className="space-y-6">
      {/* Loading Skeleton */}
      {isRestricted && isLoading && (
        <div className="neu-card p-10 bg-white dark:bg-[#111622] text-center space-y-3 animate-pulse">
          <div className="w-10 h-10 bg-[#EBE7E0] dark:bg-gray-800 rounded-full mx-auto" />
          <p className="text-xs font-bold text-gray-400">Loading your profile status...</p>
        </div>
      )}

      {/* Profile incomplete gate */}
      {isRestricted && !isLoading && completionPercentage !== null && completionPercentage < 100 && (
        <ProfileCompletionGate
          sectionTitle={config.title}
          completionPercentage={completionPercentage}
          userName={userName}
        />
      )}

      {/* Section content (only shown if unlocked) */}
      {(!isRestricted || (!isLoading && completionPercentage !== null && completionPercentage >= 100)) && (
        <>
          {section === 'matching' && <MatchingSection />}
          {section === 'shortlist' && (
            gates && !gates.shortlistUnlocked ? (
              !gates.hasMatchingRun ? (
                <StudentStageGate type="shortlist_matching_needed" userName={userName} />
              ) : (
                <StudentStageGate type="shortlist_plan_needed" userName={userName} />
              )
            ) : (
              <ShortlistSection />
            )
          )}
          {section === 'documents' && (
            gates && !gates.documentsUnlocked ? (
              !gates.hasActivePlan ? (
                <StudentStageGate type="documents_plan_needed" userName={userName} />
              ) : (
                <StudentStageGate type="documents_lock_needed" userName={userName} />
              )
            ) : (
              <StudentDocumentHub />
            )
          )}
          {section === 'applications' && (
            gates && !gates.applicationsUnlocked ? (
              !gates.hasActivePlan ? (
                <StudentStageGate type="applications_plan_needed" userName={userName} />
              ) : (
                <StudentStageGate type="applications_lock_needed" userName={userName} />
              )
            ) : (
              <StudentAdmissionPage defaultTab="applications" />
            )
          )}
          {section === 'visa' && (
            gates && !gates.visaUnlocked ? (
              !gates.hasActivePlan ? (
                <StudentStageGate type="visa_plan_needed" userName={userName} />
              ) : (
                <StudentStageGate type="visa_lock_needed" userName={userName} />
              )
            ) : (
              <StudentVisaAssistancePage />
            )
          )}
          {section === 'services' && <StudentServicesHub />}
          {section === 'account' && <AccountSettingsView forcedRole='student' />}
          {!['matching', 'shortlist', 'documents', 'aps', 'applications', 'visa', 'services', 'account'].includes(section) && (
            <div className="neu-card p-8 bg-white dark:bg-[#111622] text-center space-y-4">
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="font-display text-xl text-germany-black dark:text-white">{config.title} Module</h3>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  This module is actively synced with your student records. You can update your details or schedule a consultation with your assigned Germany advisor.
                </p>
                <div className="pt-2">
                  <button className="neu-btn-primary py-2.5 px-5 text-xs font-extrabold mx-auto">
                    Update {config.title}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
