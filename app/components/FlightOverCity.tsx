"use client";

import React from 'react';

const FlightOverCity = () => {
  return (
    <section className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] bg-[#F4F1EA] overflow-hidden select-none pointer-events-none">
      
      {/* Soft Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F1EA] via-[#F4F1EA] to-[#EAE6DE]/50" />

      {/* Subtle Drifting Cartoon Clouds (Seamless 2-track marquee) */}
      <div className="absolute top-4 left-0 right-0 opacity-40 pointer-events-none overflow-hidden flex w-max">
        {/* Track 1 */}
        <div className="animate-cloud-track">
          <svg className="w-[1200px] h-14 shrink-0" viewBox="0 0 1200 60" fill="none">
            <path d="M 50 30 Q 70 10 90 30 Q 110 15 130 30 Q 140 45 120 50 L 50 50 Z" fill="#FFFFFF" />
            <path d="M 450 25 Q 475 8 500 25 Q 525 12 550 25 Q 560 42 540 48 L 440 48 Z" fill="#FFFFFF" />
            <path d="M 850 35 Q 870 18 895 35 Q 915 22 935 35 Q 945 48 925 52 L 840 52 Z" fill="#FFFFFF" />
          </svg>
        </div>
        {/* Track 2 */}
        <div className="animate-cloud-track" aria-hidden="true">
          <svg className="w-[1200px] h-14 shrink-0" viewBox="0 0 1200 60" fill="none">
            <path d="M 50 30 Q 70 10 90 30 Q 110 15 130 30 Q 140 45 120 50 L 50 50 Z" fill="#FFFFFF" />
            <path d="M 450 25 Q 475 8 500 25 Q 525 12 550 25 Q 560 42 540 48 L 440 48 Z" fill="#FFFFFF" />
            <path d="M 850 35 Q 870 18 895 35 Q 915 22 935 35 Q 945 48 925 52 L 840 52 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2D CARTOON AIRPLANE: FLYING TOWARD THE RIGHT             */}
      {/* ======================================================== */}
      <div className="animate-airplane-fly z-20 flex items-center">
        {/* Subtle Wind / Vapor Contrail behind the jet */}
        <div className="hidden sm:block w-24 md:w-36 h-[2px] bg-gradient-to-l from-white/90 via-white/40 to-transparent -mr-2 mb-1" />
        
        {/* Airplane Illustration (Transparent PNG) */}
        <img
          src="/illustrations/airplane.png"
          alt="Airplane flying to Germany"
          className="w-28 sm:w-36 md:w-44 h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
        />
      </div>

      {/* ======================================================== */}
      {/* GERMAN CITY SKYLINE: 100% SEAMLESS INFINITE MARQUEE      */}
      {/* ======================================================== */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
        <div className="flex w-max">
          {/* Primary Track (8 continuous skyline units = ~3,440px wide) */}
          <div className="animate-city-track items-end">
            {Array.from({ length: 8 }).map((_, idx) => (
              <img
                key={`city-track1-${idx}`}
                src="/illustrations/german-city.png"
                alt="German City Skyline"
                className="h-[140px] sm:h-[180px] md:h-[220px] w-auto max-w-none object-contain object-bottom shrink-0 translate-y-[13.4%] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
              />
            ))}
          </div>
          {/* Secondary Track (Identical continuation to eliminate any gap) */}
          <div className="animate-city-track items-end" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, idx) => (
              <img
                key={`city-track2-${idx}`}
                src="/illustrations/german-city.png"
                alt="German City Skyline"
                className="h-[140px] sm:h-[180px] md:h-[220px] w-auto max-w-none object-contain object-bottom shrink-0 translate-y-[13.4%] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ground Base Line meeting the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D8D2C6] z-15" />

    </section>
  );
};

export default FlightOverCity;
