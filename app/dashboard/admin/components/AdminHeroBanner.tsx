"use client";

import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface AdminHeroBannerProps {
  adminName?: string;
}

export function AdminHeroBanner({ adminName = 'Admin' }: AdminHeroBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[#FFF5F6] via-[#FFF8F8] to-[#FDF4F5] dark:from-[#1E1318] dark:via-[#181320] dark:to-[#14121B] border border-[#FDE2E4] dark:border-[#382029] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden shadow-xs min-h-[145px] sm:min-h-[155px] flex items-center">
      {/* Left Text Block */}
      <div className="space-y-1.5 sm:space-y-2 relative z-10 max-w-lg lg:max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-black/40 border border-[#F9C9CE] dark:border-[#4A1D26] text-[#EF2D48] dark:text-rose-300 rounded-full font-bold text-[10px] sm:text-[11px] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#EF2D48]" />
          <span>Admin Operations Center</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          Welcome back, {adminName}
        </h1>

        <p className="text-xs sm:text-sm font-medium text-[#64748B] dark:text-gray-400 leading-relaxed max-w-md sm:max-w-lg">
          Here&apos;s what&apos;s happening on the EuropeBridge platform today.
        </p>
      </div>

      {/* Right European Landmarks & Brandenburg Gate Silhouette Illustration */}
      <div className="absolute right-0 bottom-0 top-0 flex items-end justify-end pointer-events-none select-none overflow-hidden w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[560px]">
        <Image
          src="/images/counsellor/europe-landmarks-full.png"
          alt="European Landmarks Skyline"
          width={650}
          height={150}
          priority
          className="h-20 sm:h-26 md:h-30 lg:h-36 w-auto object-contain object-right-bottom opacity-35 sm:opacity-45 md:opacity-55 dark:opacity-40 transition-opacity"
        />
      </div>
    </div>
  );
}
