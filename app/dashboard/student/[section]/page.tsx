"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
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
  'profile', 'matching', 'shortlist', 'documents', 
  'aps', 'applications', 'visa', 'account'
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
    icon: Sparkles,
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
  profile: {
    title: 'Complete My Profile',
    subtitle: 'Your academic scores, English & German proficiencies, and preferences.',
    doodle: '/doodles/thinking.png',
    icon: UserCheck,
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
    icon: Sparkles,
  };

  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header Banner Card */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-red/10 text-germany-red rounded-full font-extrabold text-[11px]">
              <Icon className="w-3.5 h-3.5" />
              <span>Student Portal Section</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black">
              {config.title}
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
              {config.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <img
              src={config.doodle}
              alt={config.title}
              className="w-24 h-24 object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Section-Specific Themed Content */}
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

      {section === 'aps' && (
        <div className="space-y-6">
          <div className="neu-card p-6 bg-white space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-germany-black">APS India Certificate Roadmap</h3>
                <p className="text-xs font-bold text-gray-400">Mandatory for all students holding Indian academic qualifications</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-extrabold rounded-full">
                Phase: Document Verification
              </span>
            </div>

            <div className="space-y-3">
              {[
                { title: '1. Online Registration on APS India Portal', status: 'Completed', detail: 'Registration Number: APS-2026-98124' },
                { title: '2. Payment of ₹18,000 APS Processing Fee', status: 'Completed', detail: 'Transaction ID: HDFC-98234710' },
                { title: '3. Submission of Printed Application & Notarized Documents', status: 'Completed', detail: 'Delivered to New Delhi Embassy Center' },
                { title: '4. Professor Verification / Digilocker Consent', status: 'In Progress', detail: 'Awaiting college registrar email confirmation' },
                { title: '5. Issuance of Digital APS Certificate', status: 'Pending', detail: 'Expected within 15 working days' },
              ].map((step, i) => (
                <div key={step.title} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold text-germany-black">{step.title}</div>
                    <div className="text-[11px] font-bold text-gray-500">{step.detail}</div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full shrink-0 ${
                    step.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    step.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {step.status}
                  </span>
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
    </div>
  );
}
