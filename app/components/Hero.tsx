"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  Calendar,
  GraduationCap,
  MapPin,
  Sparkles,
  Star,
  Award
} from 'lucide-react';

const topUniversities = [
  { 
    short: "TUM", 
    name: "Technical University of Munich", 
    location: "Munich, Bavaria", 
    badge: "Ranked #1 in Germany", 
    tuition: "€0 Tuition" 
  },
  { 
    short: "RWTH Aachen", 
    name: "RWTH Aachen University", 
    location: "Aachen, NRW", 
    badge: "Top Engineering Hub", 
    tuition: "€0 Tuition" 
  },
  { 
    short: "Heidelberg", 
    name: "Heidelberg University", 
    location: "Heidelberg, BW", 
    badge: "Founded 1386 • Elite", 
    tuition: "€0 Tuition" 
  },
  { 
    short: "KIT", 
    name: "Karlsruhe Institute of Tech", 
    location: "Karlsruhe, BW", 
    badge: "Leading Research Center", 
    tuition: "€0 Tuition" 
  },
  { 
    short: "TU Berlin", 
    name: "Technical University of Berlin", 
    location: "Berlin, Capital", 
    badge: "Center for Innovation", 
    tuition: "€0 Tuition" 
  },
  { 
    short: "LMU Munich", 
    name: "LMU Munich", 
    location: "Munich, Bavaria", 
    badge: "Global Top 50", 
    tuition: "€0 Tuition" 
  }
];

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative w-full flex flex-col items-center justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden neu-bg text-center"
    >
      {/* Ambient Lighting Background Accents */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[46rem] h-[22rem] bg-gradient-to-b from-germany-red/[0.04] via-germany-gold/[0.03] to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <div 
        className="absolute bottom-16 right-[8%] w-72 h-72 bg-germany-gold/[0.06] rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <div 
        className="absolute top-1/4 left-[6%] w-64 h-64 bg-germany-red/[0.03] rounded-full blur-3xl -z-10 pointer-events-none"
      />

      {/* Main Content Container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Top Proof Pill: Community Rating + Intake Status */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white/90 border border-gray-200/70 rounded-full shadow-[2px_2px_8px_rgba(71,85,105,0.08)] text-xs text-gray-700 mb-6 sm:mb-8 cursor-default backdrop-blur-sm"
        >
          <div className="flex items-center gap-1.5 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-extrabold text-germany-black text-xs">4.9/5</span>
          </div>

          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="text-gray-600 font-medium hidden sm:inline">
            Trusted by 1,500+ Indian students
          </span>
          <span className="text-gray-300 hidden md:inline">|</span>

          {/* Intake Status with Live Indicator */}
          <span className="inline-flex items-center gap-1.5 font-bold text-germany-red">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-germany-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-germany-red"></span>
            </span>
            Winter 2026 Applications Open
          </span>
        </motion.div>

        {/* Hero Impactful Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-bold text-germany-black tracking-tight leading-[1.12] drop-shadow-sm">
            <span>Germany Awaits.</span>
            <span className="block text-germany-red mt-1.5 sm:mt-2">
              We&apos;ll Take You There.
            </span>
          </h1>

          {/* Subheading / Value Proposition */}
          <p className="text-base sm:text-lg lg:text-[19px] text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto pt-2 sm:pt-3">
            Your direct gateway to tuition-free German universities. From program shortlisting and APS certification to blocked accounts and visa clearance — mentored 1-on-1 by TU9 alumni.
          </p>
        </motion.div>

        {/* Action Buttons (CTAs) */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none pt-7 sm:pt-8"
        >
          <Link 
            href="/tools/admission-chance" 
            className="neu-btn-primary w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide cursor-pointer inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <span>Check Admission Chances Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link 
            href="/#our-process" 
            className="neu-btn w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-gray-800 cursor-pointer inline-flex items-center justify-center gap-2 hover:text-germany-red transition-colors"
          >
            <Compass className="w-4 h-4 text-germany-red" />
            <span>Explore How It Works</span>
          </Link>
        </motion.div>

        {/* Micro-Reassurance Proof Points */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-4 sm:gap-x-6 pt-5 text-[11px] sm:text-xs font-semibold text-gray-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>€0 Tuition Public Universities</span>
          </span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>99.2% Visa Approval Rate</span>
          </span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>1-on-1 Mentorship from TU9 Alumni</span>
          </span>
        </motion.div>

        {/* ======================================================== */}
        {/* ATTRACTIVE TOP UNIVERSITY EXCELLENCE SHOWCASE            */}
        {/* ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
          className="w-full mt-12 sm:mt-16 pt-8 border-t border-gray-200/50"
        >
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-germany-red uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Targeting Top Public Universities</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Alumni placed across Germany&apos;s leading TU9 &amp; Excellence Universities
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 w-full">
            {topUniversities.map((uni, idx) => (
              <div 
                key={idx}
                className="bg-white/80 hover:bg-white p-3.5 rounded-2xl border border-gray-200/60 shadow-[2px_2px_8px_rgba(71,85,105,0.06)] hover:shadow-[4px_4px_14px_rgba(71,85,105,0.12)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-left group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm sm:text-base text-germany-black group-hover:text-germany-red transition-colors">
                      {uni.short}
                    </span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {uni.tuition}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-gray-700 line-clamp-1 leading-tight">
                    {uni.name}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-gray-400" />
                    {uni.location.split(',')[0]}
                  </span>
                  <span className="text-[9px] font-bold text-germany-red">
                    TU9
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
