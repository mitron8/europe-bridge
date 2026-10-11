"use client";

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const comparison = [
  {
    feature: "University Focus",
    others: "Pushes paid private colleges for high commissions",
    europeBridge: "100% focus on €0-tuition public universities (TU9)"
  },
  {
    feature: "SOP & Mentorship",
    others: "Generic copy-paste templates written by agents",
    europeBridge: "1-on-1 review by real German university alumni"
  },
  {
    feature: "APS & Visa Success",
    others: "Slow manual filing with unexpected visa delays",
    europeBridge: "Expedited APS tracking & 99.2% visa approval rate"
  },
  {
    feature: "On-Ground Support",
    others: "Support ends at the airport boarding gate",
    europeBridge: "On-ground help for WG housing & city registration"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-24 px-4 neu-bg relative overflow-hidden z-20">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Clean, Centered Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white rounded-full font-bold text-germany-red shadow-xs text-xs tracking-wide mb-4">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Why Choose Us
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-germany-black mb-3">
            The Smart Way to Germany
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-bold text-sm sm:text-base leading-relaxed">
            See how EuropeBridge compares to traditional study abroad agencies.
          </p>
        </div>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Column 1: Traditional Agencies (Muted) */}
          <div className="neu-card p-6 sm:p-8 bg-white/60 border border-gray-200/70 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="pb-5 mb-6 border-b border-gray-200/60">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-1">
                  The Old Way
                </span>
                <h3 className="font-display text-2xl text-gray-500 font-bold">
                  Traditional Agencies
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  Commission-driven, slow, and manual.
                </p>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {item.feature}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug">
                        {item.others}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: EuropeBridge (Highlighted) */}
          <div className="neu-card p-6 sm:p-8 bg-white border-2 border-germany-red/20 shadow-lg rounded-3xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-germany-red" />

            <div>
              <div className="pb-5 mb-6 border-b border-gray-100 flex items-start justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-germany-red block mb-1">
                    The Smart Choice
                  </span>
                  <h3 className="font-display text-2xl text-germany-black font-extrabold">
                    EuropeBridge
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    Direct public admissions &amp; alumni mentorship.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-germany-red/10 text-germany-red">
                  Recommended
                </span>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#D4A373]">
                        {item.feature}
                      </p>
                      <p className="text-xs sm:text-sm text-germany-black font-bold leading-snug">
                        {item.europeBridge}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
