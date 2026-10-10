"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, CheckCircle2, AlertCircle, Compass, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

interface DisciplineData {
  name: string;
  ambitiousExample: string;
  moderateExample: string;
  safeExample: string;
  keyCredits: string;
}

const DISCIPLINES: Record<string, DisciplineData> = {
  cs: {
    name: "Computer Science & AI",
    ambitiousExample: "TU Munich, RWTH Aachen, TU Berlin",
    moderateExample: "Uni Stuttgart, FAU Erlangen, Uni Freiburg",
    safeExample: "TH Köln, Frankfurt UAS, Deggendorf IT",
    keyCredits: "Theoretical CS (18 ECTS), Algorithms (12 ECTS), Advanced Math (18 ECTS)"
  },
  mech: {
    name: "Mechanical & Automotive Engineering",
    ambitiousExample: "KIT Karlsruhe, RWTH Aachen, TU Braunschweig",
    moderateExample: "TU Dortmund, Uni Hannover, TU Ilmenau",
    safeExample: "Esslingen UAS, Munich UAS, FH Aachen",
    keyCredits: "Thermodynamics (12 ECTS), Mechanics (18 ECTS), CAD & Manufacturing (12 ECTS)"
  },
  data: {
    name: "Data Analytics & Business Informatics",
    ambitiousExample: "Uni Mannheim, TU Munich, Uni Heidelberg",
    moderateExample: "Uni Hildesheim, Uni Bamberg, TU Chemnitz",
    safeExample: "HDA Darmstadt, Neu-Ulm UAS, Hof University",
    keyCredits: "Statistics (15 ECTS), Databases (10 ECTS), Business Foundations (18 ECTS)"
  },
  elec: {
    name: "Electrical & Embedded Systems",
    ambitiousExample: "TU Dresden, TU Darmstadt, Uni Stuttgart",
    moderateExample: "Uni Duisburg-Essen, TU Clausthal, Uni Siegen",
    safeExample: "Augsburg UAS, Darmstadt UAS, FH Dortmund",
    keyCredits: "Signals & Systems (12 ECTS), Circuit Design (15 ECTS), Control Theory (8 ECTS)"
  },
  bio: {
    name: "Biotechnology & Life Sciences",
    ambitiousExample: "Uni Heidelberg, LMU Munich, Uni Tübingen",
    moderateExample: "Uni Jena, Uni Potsdam, Uni Würzburg",
    safeExample: "Anhalt UAS, Rhine-Waal UAS, Krems / Bingen UAS",
    keyCredits: "Organic Chemistry (18 ECTS), Molecular Biology (15 ECTS), Lab Practice (12 ECTS)"
  }
};

export const ShortlistingReadinessWidget = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('cs');
  const [cgpa, setCgpa] = useState<number>(8.2);

  // Approximate Bavarian German Grade = 1 + 3 * ((10 - CGPA) / (10 - 4))
  const germanGrade = Math.max(1.0, Math.min(4.0, (1 + 3 * ((10 - cgpa) / 6)))).toFixed(2);
  const currentDiscipline = DISCIPLINES[selectedDiscipline];

  return (
    <section id="readiness" className="py-8 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 border-2 border-amber-200/90 bg-gradient-to-b from-white to-amber-50/30 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>Interactive 10-Course Distribution Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              How We Distribute Your 10 Universities
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              We never guess. We engineer a scientifically balanced 3-Tier portfolio (Safe, Moderate, Ambitious) based on your exact German Bavarian GPA and prerequisite credit matches.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs shrink-0 text-center">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block">Est. German GPA</span>
            <div className="text-2xl font-black text-germany-red">{germanGrade}</div>
            <span className="text-[10px] font-bold text-gray-400">1.0 = Best · 4.0 = Passing</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          {/* Discipline selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-germany-red" />
              Target Field of Study
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red transition-colors"
            >
              {Object.entries(DISCIPLINES).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* CGPA Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-germany-red" />
                Undergraduate CGPA (10-point scale)
              </label>
              <span className="text-sm font-black text-germany-black px-2.5 py-0.5 bg-red-50 text-germany-red rounded-lg border border-red-200">
                {cgpa.toFixed(1)} / 10
              </span>
            </div>
            <input 
              type="range"
              min="5.5"
              max="10.0"
              step="0.1"
              value={cgpa}
              onChange={(e) => setCgpa(parseFloat(e.target.value))}
              className="w-full accent-germany-red h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-bold text-gray-400">
              <span>5.5 (Average)</span>
              <span>7.5 (Good)</span>
              <span>9.0+ (Outstanding)</span>
            </div>
          </div>
        </div>

        {/* 3 Tiered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Ambitious */}
          <motion.div 
            className="p-5 rounded-2xl bg-white border-2 border-red-100 space-y-3 relative overflow-hidden"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-red-100 text-germany-red text-xs font-black rounded-full uppercase tracking-wider">
                3 Ambitious Courses
              </span>
              <span className="text-xs font-extrabold text-gray-500">Reach Category</span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Top Research &amp; TU9 Giants</h4>
            <p className="text-xs text-gray-600 font-medium">
              Elite institutions with competitive NC (Numerus Clausus) cutoffs and strict entrance tests or interviews.
            </p>
            <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 text-xs space-y-1">
              <span className="font-bold text-gray-700 block">Typical Target Peers:</span>
              <span className="font-extrabold text-germany-black">{currentDiscipline.ambitiousExample}</span>
            </div>
          </motion.div>

          {/* Moderate */}
          <motion.div 
            className="p-5 rounded-2xl bg-white border-2 border-amber-200 space-y-3 relative overflow-hidden shadow-2xs"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full uppercase tracking-wider">
                4 Moderate Courses
              </span>
              <span className="text-xs font-extrabold text-green-700">Target Sweet Spot</span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">High-Employability Public Unis</h4>
            <p className="text-xs text-gray-600 font-medium">
              Outstanding research profiles and high industry demand where your GPA and credits place you strongly in the top quartile.
            </p>
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-gray-700 block">Typical Target Peers:</span>
              <span className="font-extrabold text-germany-black">{currentDiscipline.moderateExample}</span>
            </div>
          </motion.div>

          {/* Safe */}
          <motion.div 
            className="p-5 rounded-2xl bg-white border-2 border-green-100 space-y-3 relative overflow-hidden"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-black rounded-full uppercase tracking-wider">
                3 Safe Courses
              </span>
              <span className="text-xs font-extrabold text-green-700">95%+ Admit Chance</span>
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Applied Sciences (UAS/FH)</h4>
            <p className="text-xs text-gray-600 font-medium">
              Direct-match practical universities with mandatory industry semesters, ensuring you secure at least one guaranteed offer.
            </p>
            <div className="p-3 bg-green-50/50 rounded-xl border border-green-100 text-xs space-y-1">
              <span className="font-bold text-gray-700 block">Typical Target Peers:</span>
              <span className="font-extrabold text-germany-black">{currentDiscipline.safeExample}</span>
            </div>
          </motion.div>
        </div>

        {/* ECTS Warning callout */}
        <div className="p-4 bg-amber-100/70 rounded-2xl border border-amber-300 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-black text-amber-900 uppercase tracking-wider block">
              Crucial: The ECTS Credit Prerequisite Audit
            </span>
            <p className="text-amber-950 font-medium leading-relaxed">
              Unlike the US or UK, German admission boards will reject candidates with even 9.8 CGPA if they are missing just 3 ECTS credits in prerequisite modules like: <strong className="font-extrabold text-germany-black">{currentDiscipline.keyCredits}</strong>. Our counselors review your full marksheet syllabus to avoid automatic rejection!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
