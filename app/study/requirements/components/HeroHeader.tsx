"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';

export const HeroHeader = () => {
  const [quickPercentage, setQuickPercentage] = useState<number>(78);

  // Quick Bavarian formula estimation with standard Indian scale (Max 100, Pass 40)
  const calculateQuickGermanGrade = (pct: number) => {
    if (!pct || pct < 40) return "N/A";
    const grade = 1 + 3 * ((100 - pct) / (100 - 40));
    return grade.toFixed(2);
  };

  const germanGrade = calculateQuickGermanGrade(quickPercentage);

  return (
    <section className="pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Study</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Admission Requirements</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Admission Guide 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                Admission Requirements for <span className="text-germany-red">German Universities</span>
              </h1>
              <motion.img 
                src="/doodles/graduation.png" 
                alt="Graduation Doodle"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              GPA conversion rules, language score cutoffs (IELTS, TOEFL, TestDaF), document checklists, and application timelines to qualify for tuition-free public German universities.
            </p>

            {/* At a Glance Box */}
            <div className="neu-card p-6 border-l-4 border-l-germany-red relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-germany-red">At a Glance Summary</span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated May 2026
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                To study in Germany, you need a recognized secondary or Bachelor's degree (converted via the modified Bavarian formula to the German 1.0–4.0 scale), language proficiency (IELTS 6.0–6.5 or TestDaF 4x4), and an <strong className="text-germany-black">APS certificate</strong> (mandatory for India, China, Vietnam). Standard deadlines: <strong className="text-germany-red">July 15</strong> (Winter) &amp; <strong className="text-germany-red">Jan 15</strong> (Summer).
              </p>
            </div>
          </div>

          {/* Quick Grade Estimator Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-5 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5 text-germany-black" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">Instant German GPA Check</h3>
                  <p className="text-xs text-gray-500 font-medium">Estimate your grade on the German scale (1.0 to 4.0)</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                  <span>Your Academic Score (%)</span>
                  <span className="text-germany-red font-black text-sm">{quickPercentage}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={quickPercentage} 
                  onChange={(e) => setQuickPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-germany-red"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>40% (Passing)</span>
                  <span>70% (First Class)</span>
                  <span>100% (Distinction)</span>
                </div>
              </div>

              <div className="bg-red-50/80 rounded-2xl p-4 flex items-center justify-between border border-red-100">
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">German Scale Result</div>
                  <div className="text-3xl font-black text-germany-black font-display">
                    {germanGrade} <span className="text-xs font-semibold text-gray-500">(1.0 is best)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                    Number(germanGrade) <= 1.5 ? 'bg-green-100 text-green-800' :
                    Number(germanGrade) <= 2.2 ? 'bg-blue-100 text-blue-800' :
                    Number(germanGrade) <= 2.8 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {Number(germanGrade) <= 1.5 ? 'Highly Competitive' :
                     Number(germanGrade) <= 2.2 ? 'Competitive' :
                     Number(germanGrade) <= 2.8 ? 'Good Prospects' : 'Limited Options'}
                  </span>
                </div>
              </div>

              <a 
                href="#section-bavarian"
                className="w-full neu-btn py-3 text-xs font-bold text-germany-black flex items-center justify-center gap-2 hover:text-germany-red"
              >
                <span>Full Grade Conversion Formula</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
