"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  X,
  GraduationCap,
  FileCheck2,
  Users2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export default function ProfileCompletionModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isDismissed, setIsDismissed] = useState(false);
  const [pillClosed, setPillClosed] = useState(false);

  // If already on the complete-profile page, don't show the popup
  const isProfilePage = pathname === '/dashboard/student/complete-profile';

  useEffect(() => {
    // Check if previously dismissed in this browser session
    const dismissed = sessionStorage.getItem('eb_profile_modal_dismissed') === 'true';
    const pillDismissed = sessionStorage.getItem('eb_profile_pill_dismissed') === 'true';
    if (dismissed) setIsDismissed(true);
    if (pillDismissed) setPillClosed(true);

    const checkProfileStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/student/profile`, {
          credentials: 'include',
        });

        if (!res.ok) return;

        const data = await res.json();
        const percentage = typeof data.completionPercentage === 'number' 
          ? data.completionPercentage 
          : 0;

        setCompletionPercentage(percentage);
        if (data.firstName) {
          setUserName(data.firstName);
        }

        // Trigger modal only if profile is strictly less than 100% and not previously dismissed
        if (percentage < 100 && !dismissed) {
          // Subtle gentle delay for natural feel
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        // Silent catch — do not break the dashboard on network hiccup
        console.error('Failed to verify profile status:', err);
      }
    };

    checkProfileStatus();
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    sessionStorage.setItem('eb_profile_modal_dismissed', 'true');
  };

  const handleClosePill = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPillClosed(true);
    sessionStorage.setItem('eb_profile_pill_dismissed', 'true');
  };

  // Only render modal or pill on the main overview dashboard (/dashboard/student)
  // Inner section pages (like /dashboard/student/matching) use the gentle inline message instead of a popup
  if (pathname !== '/dashboard/student' || completionPercentage === null || completionPercentage >= 100) {
    return null;
  }

  const remaining = 100 - completionPercentage;

  return (
    <>
      {/* Subtle Floating Reminder Pill (Rendered when modal is closed/dismissed) */}
      <AnimatePresence>
        {!isOpen && !pillClosed && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-40 max-w-sm"
          >
            <div 
              onClick={() => setIsOpen(true)}
              className="neu-card p-3.5 bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-[8px_8px_20px_rgba(210,205,195,0.7)] flex items-center gap-3 cursor-pointer group hover:scale-[1.02] transition-all"
            >
              {/* Progress Ring / Mini Badge */}
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#EBE7E0]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-germany-red transition-all duration-500"
                    strokeDasharray={`${completionPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-black text-germany-black">
                  {completionPercentage}%
                </span>
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-germany-red animate-pulse"></span>
                  <p className="text-xs font-extrabold text-germany-black truncate">
                    Complete Profile
                  </p>
                </div>
                <p className="text-[10px] font-bold text-gray-500 truncate">
                  Unlock AI Matching & Counsellor
                </p>
              </div>

              <div className="flex items-center gap-1">
                <span className="p-1 rounded-full bg-germany-red/10 text-germany-red group-hover:bg-germany-red group-hover:text-white transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <button
                  onClick={handleClosePill}
                  title="Dismiss reminder"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#EBE7E0]/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Subtle Themed Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className="relative w-full max-w-md neu-card bg-[#FDFBF7] p-5 sm:p-6 overflow-hidden shadow-[12px_12px_32px_rgba(210,205,195,0.7)] border border-white/80 z-10 my-auto"
            >
              {/* Flag Tricolor Strip */}
              <div className="absolute top-0 left-0 w-full h-1.5 flex">
                <div className="flex-1 bg-germany-black"></div>
                <div className="flex-1 bg-germany-red"></div>
                <div className="flex-1 bg-germany-gold"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0]/60 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge & Title */}
              <div className="space-y-2 mt-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-germany-gold/15 border border-germany-gold/40 rounded-full font-bold text-germany-black text-[10px]">
                  <Sparkles className="w-3 h-3 text-germany-red" />
                  <span>Profile Incomplete</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-display text-germany-black leading-tight">
                      {userName ? `Welcome, ${userName}!` : 'Welcome!'}
                    </h2>
                    <h3 className="text-xs sm:text-sm font-extrabold text-germany-red mt-0.5">
                      Finish your profile to unlock all tools
                    </h3>
                  </div>

                  <img
                    src="/doodles/german cutie.png"
                    alt="Mascot"
                    className="w-12 h-12 object-contain drop-shadow shrink-0"
                  />
                </div>

                <p className="text-xs text-gray-500 font-bold leading-relaxed">
                  Your profile is currently <span className="text-germany-red font-black">{completionPercentage}% complete</span>. Finish the remaining details to access personalized university matching and counsellor guidance.
                </p>
              </div>

              {/* Compact Progress Bar */}
              <div className="my-3.5 p-3 rounded-xl bg-white border border-[#EBE7E0]/80 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-germany-black">
                  <span>Profile Strength</span>
                  <span className="text-germany-red font-black">
                    {completionPercentage}% ({remaining}% remaining)
                  </span>
                </div>

                <div className="w-full h-2 bg-[#EBE7E0] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-germany-red via-germany-gold to-amber-500 transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(completionPercentage, 6)}%` }}
                  ></div>
                </div>
              </div>

              {/* Compact Features Unlocked */}
              <div className="space-y-2 mb-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Completing your profile unlocks:
                </p>

                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-[#F4F1EA]/70 border border-[#EBE7E0]/80 text-xs">
                    <div className="p-1 rounded-lg bg-germany-red/10 text-germany-red shrink-0">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-germany-black text-xs">AI University Matching</span>
                    <span className="text-[11px] text-gray-500 ml-auto font-medium">Bavarian GPA</span>
                  </div>

                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-[#F4F1EA]/70 border border-[#EBE7E0]/80 text-xs">
                    <div className="p-1 rounded-lg bg-germany-gold/25 text-germany-black shrink-0">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-germany-black text-xs">APS &amp; Visa Checklist</span>
                    <span className="text-[11px] text-gray-500 ml-auto font-medium">Document prep</span>
                  </div>

                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-[#F4F1EA]/70 border border-[#EBE7E0]/80 text-xs">
                    <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                      <Users2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-germany-black text-xs">Assigned Counsellor</span>
                    <span className="text-[11px] text-gray-500 ml-auto font-medium">1-on-1 review</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/dashboard/student/complete-profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full neu-btn-primary py-2.5 px-4 text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span>Complete Profile ({remaining}% left)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-1 text-[11px] font-bold text-gray-500 hover:text-germany-black transition-colors cursor-pointer text-center"
                >
                  Remind me later • Continue to dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
