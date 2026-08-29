"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Target, Award, BarChart3 } from 'lucide-react';

export const ToolHeroHeader = () => {
  return (
    <section className="pt-28 pb-10 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#free-tools" className="hover:text-germany-red transition-colors">Free Tools</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">Master's Admission Chance Evaluator</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Evaluation Tool 2026</span>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                German Master's <span className="text-germany-red">Admission Chance</span> Predictor
              </h1>
              <motion.img 
                src="/doodles/thinking.png" 
                alt="Thinking Doodle"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md shrink-0 hidden sm:block"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Evaluate your admission probability for public German universities based on your CGPA, field of study, target university tier, language test scores, and work experience.
            </p>

            {/* Quick Summary Card */}
            <div className="neu-card p-6 border-l-4 border-l-germany-red relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-germany-red">How It Works</span>
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> 100-Point Fit Scale
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Answer 7 quick profile questions to generate a <strong className="text-germany-black">customized fit score (0–100)</strong>, probability band (<strong className="text-emerald-700">High</strong>, <strong className="text-blue-700">Moderate</strong>, or <strong className="text-amber-700">Reach</strong>), and receive actionable recommendations to boost your profile.
              </p>
            </div>
          </div>

          {/* Snapshot Box */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-4 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-extrabold text-germany-black text-lg border-b border-gray-200 pb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-germany-red" />
                <span>Evaluation Criteria Included</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">Academic Score (German Bavarian GPA)</span>
                  <span className="text-xs font-extrabold text-germany-red">Max 40 Pts</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">Subject Credit Alignment</span>
                  <span className="text-xs font-extrabold text-germany-red">Max 25 Pts</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">Language Test Scores (IELTS/TestDaF)</span>
                  <span className="text-xs font-extrabold text-germany-red">Max 15 Pts</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">Work Exp / Projects / GRE</span>
                  <span className="text-xs font-extrabold text-germany-red">Max 20 Pts</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
