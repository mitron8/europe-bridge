"use client";

import React from 'react';
import Image from 'next/image';
import { Compass } from 'lucide-react';

export function CounsellorHeroBanner() {
  return (
    <div className="bg-[#FFF6F6] dark:bg-[#1A1015] border border-[#F6E6E7] dark:border-[#381B24] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[140px]">
      {/* Left Text Block */}
      <div className="space-y-2 relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-black/30 border border-rose-200/80 dark:border-rose-900/40 text-[#8C2434] dark:text-rose-300 rounded-full font-bold text-[11px] shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#B91C1C]" />
          <span>Counsellor Strategy Hub</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-display font-extrabold text-[#2A080F] dark:text-white tracking-tight">
          Welcome, Advisor!
        </h1>

        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
          Guide students, manage enquiries, and deliver counselling services efficiently.
        </p>
      </div>

      {/* Right Landmark Panorama Illustration */}
      <div className="relative md:absolute md:right-0 md:bottom-0 md:top-0 flex items-end justify-end pointer-events-none select-none overflow-hidden max-w-lg w-full">
        <Image
          src="/images/counsellor/europe-landmarks-full.png"
          alt="European Landmarks Panorama"
          width={650}
          height={150}
          priority
          className="h-28 sm:h-32 md:h-36 w-auto object-contain object-bottom opacity-95 transition-opacity"
        />
      </div>
    </div>
  );
}

