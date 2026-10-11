"use client";

import React from 'react';

const universities = [
  { name: "Technical University of Munich (TUM)", logo: "/universities/tum.svg" },
  { name: "RWTH Aachen University", logo: "/universities/rwth.svg" },
  { name: "Karlsruhe Institute of Technology (KIT)", logo: "/universities/kit.svg" },
  { name: "Technical University of Berlin (TU Berlin)", logo: "/universities/tu-berlin.svg" },
  { name: "Ludwig Maximilian University of Munich (LMU)", logo: "/universities/lmu.svg" },
  { name: "Heidelberg University", logo: "/universities/heidelberg.svg" },
  { name: "University of Stuttgart", logo: "/universities/stuttgart.svg" },
  { name: "Technical University of Darmstadt (TU Darmstadt)", logo: "/universities/darmstadt.svg" },
  { name: "Humboldt University of Berlin", logo: "/universities/humboldt.svg" }
];

const UniversityMarquee = () => {
  return (
    <section className="relative w-full py-8 sm:py-10 bg-[#F4F1EA] border-y border-[#E2DDD3]/60 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA] via-white/40 to-[#F4F1EA] pointer-events-none" />

      {/* Clean, Discreet Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center relative z-10">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-gray-500">
          Direct Admissions & Mentorship Across Germany's Top Universities
        </p>
      </div>

      {/* Pure Logo Carousel Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Smooth Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F4F1EA] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F4F1EA] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-8 sm:gap-12 md:gap-16 items-center py-2">
          {/* Duplicate list to create seamless infinite loop */}
          {[...universities, ...universities].map((uni, idx) => (
            <div
              key={idx}
              title={uni.name}
              className="flex items-center justify-center px-4 sm:px-6 shrink-0 transition-transform duration-300 hover:scale-105 cursor-default"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="h-9 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-[160px] object-contain opacity-75 hover:opacity-100 transition-all duration-300 filter grayscale-[15%] hover:grayscale-0"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement?.remove();
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityMarquee;
