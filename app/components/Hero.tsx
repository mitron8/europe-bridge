"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  Check
} from 'lucide-react';

const slides = [
  {
    image: "/hero/hero-1.jpg",
    number: "01",
    tag: "TU9 Universities",
    title: "World-Class Public Education",
    subtitle: "Study at Munich, Aachen, Berlin & Karlsruhe with €0 tuition and globally recognized degrees."
  },
  {
    image: "/hero/hero-2.jpg",
    number: "02",
    tag: "Work & Careers",
    title: "18-Month Job Seeker Visa",
    subtitle: "Direct pathways to the EU Blue Card with average starting salaries of €48,000+ in German tech & engineering."
  },
  {
    image: "/hero/hero-3.jpg",
    number: "03",
    tag: "Alumni Network",
    title: "1-on-1 TU9 Mentorship",
    subtitle: "Learn directly from Indian students already studying in Germany. From APS certification to blocked accounts and housing."
  }
];

const topUniversities = [
  { short: "TUM", name: "TU Munich" },
  { short: "RWTH Aachen", name: "RWTH Aachen" },
  { short: "KIT", name: "Karlsruhe Inst." },
  { short: "TU Berlin", name: "TU Berlin" },
  { short: "Heidelberg", name: "Heidelberg Uni" },
  { short: "LMU", name: "LMU Munich" }
];

const SLIDE_DURATION = 10000; // 10 seconds per slide

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Continuous 10-second carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, current]);

  return (
    <section 
      id="hero" 
      className="relative w-full h-[100vh] min-h-[660px] flex flex-col justify-between pt-16 sm:pt-20 pb-3 sm:pb-5 px-4 sm:px-6 lg:px-12 overflow-hidden neu-bg"
    >
      {/* ======================================================== */}
      {/* CONTINUOUS 10-SECOND BACKGROUND CAROUSEL                  */}
      {/* Opacity set to 0.40 for subtle transparency              */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#F4F1EA]">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <motion.div
              key={slide.image}
              initial={false}
              animate={{
                opacity: isActive ? 0.40 : 0,
                scale: isActive ? 1.05 : 1.0,
              }}
              transition={{
                opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 10, ease: "linear" }
              }}
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
          );
        })}

        {/* Soft, airy warm-clay veil: keep photos transparent, text razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA]/95 via-[#F4F1EA]/80 to-[#F4F1EA]/25 pointer-events-none hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F1EA]/95 via-[#F4F1EA]/70 to-[#F4F1EA]/95 pointer-events-none lg:hidden" />
      </div>

      {/* ======================================================== */}
      {/* MAIN HERO CONTENT (CLEAN LEFT-ALIGNED MINIMAL LAYOUT)    */}
      {/* ======================================================== */}
      <div className="w-full max-w-7xl mx-auto relative z-10 pt-2 sm:pt-4 pb-2 my-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-5 text-left">
          
          {/* Static Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-3"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.2rem] font-black text-germany-black tracking-tight leading-[1.08]">
              Study in Germany.
              <span className="block text-germany-red mt-1">
                Direct TU9 Admissions.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-xl">
              Your direct pathway to tuition-free German universities. From profile evaluation and APS fast-tracking to blocked accounts and visa approvals — mentored 1-on-1 by TU9 alumni.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
          >
            <Link 
              href="/tools/admission-chance" 
              className="neu-btn-primary px-8 py-3.5 text-xs sm:text-sm font-extrabold tracking-wide cursor-pointer inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Check Admission Chances Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/#our-process" 
              className="neu-btn px-7 py-3.5 text-xs sm:text-sm font-bold text-germany-black hover:text-germany-red cursor-pointer inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm transition-colors"
            >
              <Compass className="w-4 h-4 text-germany-red" />
              <span>Explore 5-Step Process</span>
            </Link>
          </motion.div>

          {/* Key Advantages Checklist Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200/70 max-w-2xl"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>€0 Public Tuition</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>99.2% Visa Rate</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>18-Mo Job Visa</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>1-on-1 TU9 Mentors</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM SLIDE CONTROLLER & TARGET UNIVERSITIES DOCK        */}
      {/* Fits comfortably above the fold with NO clipping         */}
      {/* ======================================================== */}
      <div className="w-full max-w-7xl mx-auto relative z-10 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl bg-white/75 backdrop-blur-md border border-gray-200/60 shadow-[0_4px_16px_rgba(71,85,105,0.04)]">
          
          {/* 3 Interactive Slide Tabs with 10s Progress Bar */}
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-2">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`relative px-3 py-1.5 rounded-xl text-left transition-all border cursor-pointer overflow-hidden ${
                    isActive 
                      ? 'bg-white border-germany-red/30 shadow-xs text-germany-black' 
                      : 'bg-transparent hover:bg-white/60 border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {/* 10-Second Live Progress Bar */}
                  {isActive && (
                    <motion.div
                      key={`progress-${current}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      className="absolute top-0 left-0 h-[2px] bg-germany-red"
                    />
                  )}
                  
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className={isActive ? 'text-germany-red font-black' : 'text-gray-400'}>{slide.number}</span>
                    <span className="truncate">{slide.tag}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Target Universities Badges & Arrow Navigation */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
              <span className="font-bold text-germany-black">Target Unis:</span>
              {topUniversities.map((uni, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white/90 border border-gray-100 text-gray-700 font-bold text-[10px]">
                  {uni.short}
                </span>
              ))}
            </div>

            {/* Prev & Next Controls */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-germany-black flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-germany-black flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
