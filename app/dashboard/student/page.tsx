"use client";

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Plane,
  AlertCircle,
  Building2,
  Calendar,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function StudentDashboard() {
  const journeySteps = [
    { label: 'Profile', status: 'completed', desc: '100% Filled' },
    { label: 'Matching', status: 'current', desc: '12 Universities' },
    { label: 'Shortlist', status: 'upcoming', desc: '3 Selected' },
    { label: 'APS Checklist', status: 'upcoming', desc: 'Pending Uploads' },
    { label: 'Applications', status: 'upcoming', desc: 'Winter 2026' },
    { label: 'Visa Ready', status: 'upcoming', desc: 'Blocked Account' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Hero Card */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/15 border border-germany-gold/40 rounded-full font-bold text-germany-black text-[11px]">
              <span className="w-2 h-2 rounded-full bg-germany-gold animate-pulse"></span>
              Winter Intake 2026 Preparation
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black flex items-center justify-center md:justify-start gap-2">
              <span>Welcome back!</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
              You are currently on <span className="text-germany-red font-extrabold">Step 2: AI Matching Engine</span>. Review your recommended German universities and finalize your shortlist today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/dashboard/student/matching"
              className="neu-btn-primary py-3 px-6 text-sm font-extrabold cursor-pointer gap-2"
            >
              <span>Explore AI Matches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <img
              src="/doodles/german cutie.png"
              alt="Mascot"
              className="w-20 h-20 object-contain hidden lg:block drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Germany Application Journey Stepper */}
      <div className="neu-card p-6 bg-white relative overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-lg text-germany-black">Your Germany Journey Roadmap</h2>
            <p className="text-xs font-bold text-gray-400">Track your milestones from profile registration to German campus arrival</p>
          </div>
          <span className="text-xs font-extrabold text-germany-red bg-germany-red/10 px-3 py-1 rounded-full">
            35% Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {journeySteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            return (
              <div
                key={step.label}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#FDFBF7] border-germany-red shadow-[4px_4px_12px_rgba(230,57,70,0.2)]'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-[#EBE7E0]/40 border-transparent opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-germany-red text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] font-extrabold text-germany-red uppercase tracking-wider">Active</span>
                  )}
                </div>
                <div className="font-extrabold text-xs text-germany-black">{step.label}</div>
                <div className="text-[10px] font-bold text-gray-500 mt-0.5">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metric Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">German GPA</span>
            <div className="p-2 bg-germany-gold/20 rounded-xl text-germany-black">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">1.6 (Excellent)</div>
          <p className="text-[11px] font-bold text-emerald-600">Top 10% competitive tier</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Matched Unis</span>
            <div className="p-2 bg-germany-red/10 rounded-xl text-germany-red">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">14 Programs</div>
          <p className="text-[11px] font-bold text-gray-500">Across 8 Public Universities</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">APS Verification</span>
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">In Progress</div>
          <p className="text-[11px] font-bold text-amber-700">3 of 5 Documents Uploaded</p>
        </div>

        <div className="neu-card p-5 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Next Deadline</span>
            <div className="p-2 bg-blue-100 rounded-xl text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-display text-germany-black">July 15</div>
          <p className="text-[11px] font-bold text-gray-500">TUM Informatics Window</p>
        </div>
      </div>

      {/* Two-Column Actionable Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Shortlisted Universities & AI Picks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended Universities */}
          <div className="neu-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-germany-black">AI-Matched Universities</h3>
                <p className="text-xs font-bold text-gray-400">Tailored to your background and language proficiencies</p>
              </div>
              <Link
                href="/dashboard/student/matching"
                className="text-xs font-extrabold text-germany-red hover:underline inline-flex items-center gap-1"
              >
                <span>View All (14)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  uni: 'Technical University of Munich (TUM)',
                  program: 'M.Sc. Computer Science',
                  tuition: '€0 / semester',
                  match: '96% Match',
                  deadline: 'May 31, 2026',
                  badge: 'Public • English',
                },
                {
                  uni: 'RWTH Aachen University',
                  program: 'M.Sc. Software Systems Engineering',
                  tuition: '€0 / semester',
                  match: '92% Match',
                  deadline: 'June 15, 2026',
                  badge: 'TU9 • English',
                },
                {
                  uni: 'Karlsruhe Institute of Technology (KIT)',
                  program: 'M.Sc. Information Technology',
                  tuition: '€1,500 / sem (Non-EU)',
                  match: '88% Match',
                  deadline: 'July 15, 2026',
                  badge: 'Public • German/English',
                },
              ].map((item) => (
                <div
                  key={item.uni}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] hover:border-germany-gold transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-germany-black group-hover:text-germany-red transition-colors">
                        {item.uni}
                      </span>
                      <span className="text-[10px] font-extrabold bg-[#EBE7E0] text-gray-600 px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500">{item.program}</p>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                      <span>Tuition: <strong className="text-germany-black">{item.tuition}</strong></span>
                      <span>•</span>
                      <span>Deadline: <strong className="text-germany-black">{item.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {item.match}
                    </span>
                    <Link
                      href="/dashboard/student/shortlist"
                      className="neu-btn px-3 py-1.5 text-xs font-extrabold text-germany-black hover:text-germany-red"
                    >
                      Shortlist
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Document Status */}
          <div className="neu-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-germany-black">Document Hub & APS Checklist</h3>
              <Link href="/dashboard/student/documents" className="text-xs font-extrabold text-germany-red hover:underline">
                Manage Documents
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between text-emerald-800 font-extrabold text-xs">
                  <span>Bachelor Degree / Transcript</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[10px] font-bold text-emerald-700">Verified & Translated</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between text-emerald-800 font-extrabold text-xs">
                  <span>IELTS / TOEFL Score</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[10px] font-bold text-emerald-700">7.5 Band Confirmed</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between text-amber-900 font-extrabold text-xs">
                  <span>APS Certification Form</span>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[10px] font-bold text-amber-700">Notarization Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Mascot Tip & Counsellor Quick Connect */}
        <div className="space-y-6">
          {/* Peer the Penguin Guide Card */}
          <div className="neu-card p-6 bg-white relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/doodles/university.png"
                alt="Peer Penguin"
                className="w-14 h-14 object-contain drop-shadow"
              />
              <div>
                <h4 className="font-extrabold text-sm text-germany-black">Peer's Germany Tip</h4>
                <p className="text-[10px] font-bold text-germany-red">Alumni Advice</p>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-600 leading-relaxed bg-[#FDFBF7] p-3 rounded-2xl border border-[#EBE7E0]">
              "Ensure your module course descriptions match at least 80% of the target university's curriculum. German admissions committees evaluate ECTS alignment meticulously!"
            </p>
          </div>

          {/* Assigned Counsellor Card */}
          <div className="neu-card p-6 bg-white space-y-4">
            <h4 className="font-display text-base text-germany-black">Assigned Germany Expert</h4>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-germany-red/10 border-2 border-germany-red/40 flex items-center justify-center font-extrabold text-germany-red text-sm">
                MK
              </div>
              <div>
                <div className="font-extrabold text-sm text-germany-black">Max Keller</div>
                <div className="text-xs font-bold text-gray-500">TUM Alumnus • Senior Advisor</div>
              </div>
            </div>

            <div className="p-3 bg-[#EBE7E0]/50 rounded-2xl text-[11px] font-bold text-gray-600 space-y-1">
              <div>Next Available Slot: <strong className="text-germany-black">Tomorrow, 4:00 PM CEST</strong></div>
              <div>Topic: <strong className="text-germany-black">APS & Shortlist Review</strong></div>
            </div>

            <button
              type="button"
              className="w-full neu-btn py-2.5 text-xs font-extrabold text-germany-black hover:text-germany-red cursor-pointer"
            >
              Book 1-on-1 Consultation
            </button>
          </div>

          {/* Quick Free Tools Links */}
          <div className="neu-card p-5 bg-white space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
              Interactive Tools
            </h4>
            <div className="space-y-2">
              <Link
                href="/#hero"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBE7E0]/40 hover:bg-[#EBE7E0] text-xs font-extrabold text-germany-black transition-colors"
              >
                <span>German GPA Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link
                href="/dashboard/student/matching"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBE7E0]/40 hover:bg-[#EBE7E0] text-xs font-extrabold text-germany-black transition-colors"
              >
                <span>ECTS Credit Evaluator</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
