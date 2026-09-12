"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProfileCompletionGate from '@/components/ProfileCompletionGate';
import {
  Compass,
  Bookmark,
  FileText,
  CheckCircle2,
  Send,
  Plane,
  UserCheck,
  Settings,
  ArrowRight,
  Upload,
  Search,
  Filter,
  GraduationCap,
  Building2,
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const VALID_SECTIONS = [
  'matching', 'shortlist', 'documents', 
  'aps', 'applications', 'visa', 'account'
];

const RESTRICTED_SECTIONS = [
  'matching', 'shortlist', 'documents', 
  'aps', 'applications', 'visa'
];

interface SectionConfig {
  title: string;
  subtitle: string;
  doodle: string;
  icon: any;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  matching: {
    title: 'AI Matching Engine',
    subtitle: 'Find German universities matching your exact academic profile and career goals.',
    doodle: '/doodles/match.png',
    icon: Compass,
  },
  documents: {
    title: 'Document Hub',
    subtitle: 'Upload, manage, and verify all essential admission and visa documents.',
    doodle: '/doodles/CV.png',
    icon: FileText,
  },
  aps: {
    title: 'APS India Checklist',
    subtitle: 'Step-by-step verification checklist for the mandatory APS Certificate.',
    doodle: '/doodles/sucesss.png',
    icon: CheckCircle2,
  },
  shortlist: {
    title: 'My Shortlist',
    subtitle: 'Your selected universities and programs ready for application.',
    doodle: '/doodles/university.png',
    icon: Bookmark,
  },
  applications: {
    title: 'College Applications',
    subtitle: 'Track your Uni-Assist and direct university submissions in real-time.',
    doodle: '/doodles/laptop.png',
    icon: Send,
  },
  visa: {
    title: 'Visa & Relocation Support',
    subtitle: 'Blocked account setup, health insurance, and embassy appointment assistance.',
    doodle: '/doodles/visa approved.png',
    icon: Plane,
  },
  account: {
    title: 'Account Settings',
    subtitle: 'Manage your credentials, notification preferences, and assigned counsellor.',
    doodle: '/doodles/happy.png',
    icon: Settings,
  },
};

export default function StudentSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const config = SECTION_CONFIGS[section] || {
    title: section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: `Manage your ${section}`,
    doodle: '/doodles/university.png',
    icon: Compass,
  };

  const Icon = config.icon;
  const isRestricted = RESTRICTED_SECTIONS.includes(section);
  const [completionPercentage, setCompletionPercentage] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(isRestricted);

  useEffect(() => {
    if (!isRestricted) return;

    const checkProfileStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/student/profile`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setCompletionPercentage(typeof data.completionPercentage === 'number' ? data.completionPercentage : 0);
          if (data.firstName) setUserName(data.firstName);
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
      {/* Sleek Compact Section Header */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
        {/* Subtle German Tricolor Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-germany-red/10 text-germany-red flex items-center justify-center shrink-0 border border-germany-red/20 shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-display font-bold text-germany-black tracking-tight leading-tight">
                {config.title}
              </h1>
              {isRestricted && completionPercentage !== null && completionPercentage >= 100 && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Unlocked
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-normal mt-0.5">
              {config.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
          <Link
            href="/dashboard/student"
            className="text-[11px] font-bold text-gray-600 hover:text-germany-black px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-1.5 border border-gray-200/70"
          >
            <span>Overview</span>
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isRestricted && isLoading && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <div className="w-10 h-10 bg-[#EBE7E0] rounded-full mx-auto" />
          <p className="text-xs font-bold text-gray-400">Loading your profile status...</p>
        </div>
      )}

      {/* Profile Incomplete Sweet Restriction Message */}
      {isRestricted && !isLoading && completionPercentage !== null && completionPercentage < 100 && (
        <ProfileCompletionGate
          sectionTitle={config.title}
          completionPercentage={completionPercentage}
          userName={userName}
        />
      )}

      {/* Section-Specific Themed Content (Only shown if unlocked) */}
      {(!isRestricted || (!isLoading && completionPercentage !== null && completionPercentage >= 100)) && (
        <>
          {section === 'matching' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="neu-card p-5 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-96 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by program, university, or city..."
                className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-extrabold text-gray-400 mr-1">Filter:</span>
              {['All', 'TU9 Only', '100% English', 'No Tuition Fee', 'Bavaria'].map((f, i) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    i === 0 ? 'bg-germany-black text-white' : 'bg-[#EBE7E0] text-germany-black hover:bg-germany-red hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Matches List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: 'Technical University of Munich',
                program: 'M.Sc. Data Engineering and Analytics',
                city: 'Munich, Bavaria',
                match: '98%',
                tuition: '€0/term',
                type: 'Public / TU9',
              },
              {
                name: 'RWTH Aachen University',
                program: 'M.Sc. Computer Science',
                city: 'Aachen, NRW',
                match: '94%',
                tuition: '€0/term',
                type: 'Public / TU9',
              },
              {
                name: 'Heidelberg University',
                program: 'M.Sc. Scientific Computing',
                city: 'Heidelberg, BW',
                match: '91%',
                tuition: '€1,500/term',
                type: 'Excellence Uni',
              },
              {
                name: 'TU Berlin',
                program: 'M.Sc. Global Production Engineering',
                city: 'Berlin',
                match: '89%',
                tuition: '€0/term',
                type: 'Public / TU9',
              },
              {
                name: 'University of Stuttgart',
                program: 'M.Sc. Information Technology (INFOTECH)',
                city: 'Stuttgart, BW',
                match: '87%',
                tuition: '€1,500/term',
                type: 'Public / TU9',
              },
              {
                name: 'FAU Erlangen-Nuremberg',
                program: 'M.Sc. Artificial Intelligence',
                city: 'Erlangen, Bavaria',
                match: '86%',
                tuition: '€0/term',
                type: 'Public',
              },
            ].map((uni) => (
              <div key={uni.name + uni.program} className="neu-card p-5 bg-white space-y-4 hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">{uni.type}</span>
                    <h3 className="font-display text-base text-germany-black leading-tight">{uni.name}</h3>
                    <p className="text-xs font-bold text-gray-500">{uni.program}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                    {uni.match}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EBE7E0] flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>📍 {uni.city}</span>
                  <span className="text-germany-black font-extrabold">{uni.tuition}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 neu-btn-primary py-2 px-3 text-xs font-extrabold cursor-pointer">
                    Shortlist
                  </button>
                  <button className="neu-btn p-2 text-gray-600 hover:text-germany-red cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'documents' && (
        <div className="space-y-6">
          <div className="neu-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-germany-black">Uploaded Documents Repository</h3>
              <button className="neu-btn-primary py-2 px-4 text-xs font-extrabold flex items-center gap-2 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="divide-y divide-[#EBE7E0]">
              {[
                { name: 'Bachelor Degree Certificate (Provisional)', status: 'Approved', date: 'Aug 24, 2026', size: '2.4 MB' },
                { name: 'Official Bachelor Transcripts (Sem 1-8)', status: 'Approved', date: 'Aug 24, 2026', size: '4.8 MB' },
                { name: 'IELTS Academic Test Report (7.5 Band)', status: 'Approved', date: 'Aug 20, 2026', size: '1.1 MB' },
                { name: 'Statement of Purpose (TUM Draft)', status: 'In Review', date: 'Aug 26, 2026', size: '0.6 MB' },
                { name: 'Academic Curriculum Vitae (Europass Format)', status: 'Action Needed', date: 'Aug 26, 2026', size: '0.4 MB' },
              ].map((doc) => (
                <div key={doc.name} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-germany-gold/20 text-germany-black shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-germany-black">{doc.name}</p>
                      <p className="text-[11px] font-bold text-gray-400">Uploaded {doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      doc.status === 'In Review' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                    <button className="neu-btn px-3 py-1 text-xs font-bold text-gray-600 hover:text-germany-red">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fallback for other sub-sections */}
      {!['matching', 'documents', 'aps'].includes(section) && (
        <div className="neu-card p-8 bg-white text-center space-y-4">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="font-display text-xl text-germany-black">{config.title} Module</h3>
            <p className="text-xs font-bold text-gray-500">
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
