"use client";

import React from 'react';
import Image from 'next/image';
import { Compass } from 'lucide-react';

export function CounsellorHeroBanner() {
  return (
    <div className="bg-[#FFF6F6] dark:bg-[#1A1015] border border-[#F6E6E7] dark:border-[#381B24] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden shadow-2xs min-h-[135px] sm:min-h-[145px] flex items-center">
      {/* Left Text Block */}
      <div className="space-y-1.5 sm:space-y-2 relative z-10 max-w-lg lg:max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/80 dark:bg-black/30 border border-rose-200/80 dark:border-rose-900/40 text-[#8C2434] dark:text-rose-300 rounded-full font-bold text-[10px] sm:text-[11px] shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#B91C1C]" />
          <span>Counsellor Strategy Hub</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-[#2A080F] dark:text-white tracking-tight">
          Welcome, Advisor!
        </h1>

        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed max-w-md sm:max-w-lg">
          Guide students, manage enquiries, and deliver counselling services efficiently.
        </p>
      </div>

      {/* Right Landmark Panorama Illustration - Responsive opacity and scale to prevent text overlap */}
      <div className="absolute right-0 bottom-0 top-0 flex items-end justify-end pointer-events-none select-none overflow-hidden w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[560px]">
        <Image
          src="/images/counsellor/europe-landmarks-full.png"
          alt="European Landmarks Panorama"
          width={650}
          height={150}
          priority
          className="h-20 sm:h-26 md:h-30 lg:h-36 w-auto object-contain object-right-bottom opacity-25 sm:opacity-35 md:opacity-45 xl:opacity-95 transition-opacity"
        />
      </div>
    </div>
  );
}

