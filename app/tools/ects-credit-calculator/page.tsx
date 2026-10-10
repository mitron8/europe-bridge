"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { 
  GraduationCap, 
  Calculator, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ChevronDown 
} from 'lucide-react';

interface SubjectEntry {
  id: string;
  name: string;
  homeCredits: number;
}

export default function EctsCreditCalculatorPage() {
  const [degreeYears, setDegreeYears] = useState<number>(4);
  const [totalHomeCredits, setTotalHomeCredits] = useState<number>(160);
  const [calculatorMode, setCalculatorMode] = useState<'ratio' | 'hours'>('ratio');
  const [hoursPerEcts, setHoursPerEcts] = useState<number>(30); // 25, 28, 30
  const [lectureHours, setLectureHours] = useState<number>(45);
  const [selfStudyHours, setSelfStudyHours] = useState<number>(45);

  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    { id: '1', name: 'Mathematics & Statistics', homeCredits: 16 },
    { id: '2', name: 'Core Computer Science', homeCredits: 36 },
    { id: '3', name: 'Software Engineering & Labs', homeCredits: 20 },
  ]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ECTS degree target: 3 years = 180 ECTS, 4 years = 240 ECTS, 5 years = 300 ECTS
  const targetTotalEcts = degreeYears * 60;

  // Ratio multiplier
  const ectsMultiplier = useMemo(() => {
    if (!totalHomeCredits || totalHomeCredits <= 0) return 0;
    return targetTotalEcts / totalHomeCredits;
  }, [targetTotalEcts, totalHomeCredits]);

  // Hours calculation
  const totalCourseHours = lectureHours + selfStudyHours;
  const hoursBasedEcts = useMemo(() => {
    if (hoursPerEcts <= 0) return 0;
    return Math.round((totalCourseHours / hoursPerEcts) * 10) / 10;
  }, [totalCourseHours, hoursPerEcts]);

  const addSubject = () => {
    setSubjects(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: '', homeCredits: 4 }
    ]);
  };

  const updateSubject = (id: string, field: 'name' | 'homeCredits', value: any) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const totalCalculatedEcts = useMemo(() => {
    return subjects.reduce((sum, s) => sum + (s.homeCredits * ectsMultiplier), 0);
  }, [subjects, ectsMultiplier]);

  return (
    <div className="min-h-screen neu-bg text-germany-black dark:text-white transition-colors duration-200">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-germany-red/10 border border-germany-red/20 text-germany-red dark:text-[#FF6B7A] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            European Credit Transfer and Accumulation System
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-germany-black dark:text-white">
            ECTS Credit Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Convert university credit points, semester credit hours, or lecture workloads from India, the US, and abroad into European ECTS credits required by German Master’s admissions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Tabs */}
            <div className="flex rounded-xl bg-gray-100 dark:bg-[#111622] p-1.5 border border-gray-200/80 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setCalculatorMode('ratio')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  calculatorMode === 'ratio'
                    ? 'bg-white dark:bg-[#0A0D14] text-germany-black dark:text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Degree Credit Ratio (Standard)
              </button>
              <button
                type="button"
                onClick={() => setCalculatorMode('hours')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  calculatorMode === 'hours'
                    ? 'bg-white dark:bg-[#0A0D14] text-germany-black dark:text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Hours / Workload Mode
              </button>
            </div>

            {calculatorMode === 'ratio' ? (
              <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md space-y-6">
                <h3 className="text-base font-bold font-display text-germany-black dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-germany-red" />
                  1. Degree Baseline Settings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Bachelor&apos;s Duration *
                    </label>
                    <select
                      value={degreeYears}
                      onChange={(e) => setDegreeYears(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                    >
                      <option value={3}>3 Years (Europe Standard = 180 ECTS)</option>
                      <option value={4}>4 Years (B.Tech / B.E. / BS = 240 ECTS)</option>
                      <option value={5}>5 Years (Dual Degree / Integrated = 300 ECTS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Total Home Credits On Transcript *
                    </label>
                    <input
                      type="number"
                      value={totalHomeCredits}
                      onChange={(e) => setTotalHomeCredits(parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                      placeholder="e.g. 160 or 180"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-600 dark:text-gray-300">
                    Calculated Exchange Ratio:
                  </span>
                  <span className="font-black text-germany-red dark:text-[#FF6B7A]">
                    1 Home Credit = {ectsMultiplier.toFixed(2)} ECTS
                  </span>
                </div>

                {/* Subject / Module Prerequisite Check */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-germany-black dark:text-white">
                        Subject Module Prerequisite Check
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Check if you have enough ECTS in specific subjects (Maths, CS, Electrical, etc.)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addSubject}
                      className="px-3 py-1.5 rounded-lg bg-germany-red/10 text-germany-red dark:text-[#FF6B7A] font-bold text-xs hover:bg-germany-red/20 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Subject
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {subjects.map((sub) => {
                      const converted = sub.homeCredits * ectsMultiplier;
                      return (
                        <div 
                          key={sub.id} 
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800"
                        >
                          <input
                            type="text"
                            value={sub.name}
                            onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                            placeholder="Subject Area (e.g. Discrete Math)"
                            className="flex-1 px-3 py-1.5 neu-input text-xs font-bold rounded-lg bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800"
                          />
                          <div className="flex items-center gap-1.5 shrink-0">
                            <input
                              type="number"
                              value={sub.homeCredits}
                              onChange={(e) => updateSubject(sub.id, 'homeCredits', parseFloat(e.target.value) || 0)}
                              className="w-16 px-2 py-1.5 neu-input text-xs font-bold rounded-lg bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 text-center"
                              placeholder="Credits"
                            />
                            <span className="text-[10px] font-bold text-gray-400">pts</span>
                          </div>
                          <div className="w-20 text-right shrink-0">
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                              {converted.toFixed(1)} ECTS
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSubject(sub.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove Subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Hours Mode */
              <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 shadow-md space-y-5">
                <h3 className="text-base font-bold font-display text-germany-black dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-germany-red" />
                  Workload & Study Hours Calculation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  German universities define 1 ECTS as equal to <strong>25 to 30 total student workload hours</strong> (consisting of classroom lectures, lab hours, plus outside self-study).
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      Classroom / Lecture & Lab Hours
                    </label>
                    <input
                      type="number"
                      value={lectureHours}
                      onChange={(e) => setLectureHours(parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      Independent Self-Study & Exam Prep Hours
                    </label>
                    <input
                      type="number"
                      value={selfStudyHours}
                      onChange={(e) => setSelfStudyHours(parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 neu-input text-xs font-bold rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      German University Standard Hours per ECTS
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[25, 28, 30].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setHoursPerEcts(hrs)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                            hoursPerEcts === hrs
                              ? 'bg-germany-red text-white border-germany-red'
                              : 'bg-gray-50 dark:bg-[#0A0D14] border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {hrs} Hours
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results Overview */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="neu-card p-6 sm:p-8 bg-white dark:bg-[#111622] border-2 border-germany-red/30 dark:border-germany-red/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold" />

              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">
                Equivalent European Credits
              </span>

              {calculatorMode === 'ratio' ? (
                <>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black font-display text-germany-black dark:text-white">
                      {targetTotalEcts}
                    </span>
                    <span className="text-sm font-bold text-gray-400">Total Program ECTS</span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    A completed {degreeYears}-year Bachelor&apos;s degree translates directly into <strong>{targetTotalEcts} ECTS credits</strong> under the Bologna European standard.
                  </p>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200/80 dark:border-gray-800 space-y-2 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-500">Subject Total:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        {totalCalculatedEcts.toFixed(1)} ECTS
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-500">Degree Standard:</span>
                      <span className="font-bold text-germany-black dark:text-white">
                        60 ECTS / Year
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black font-display text-germany-black dark:text-white">
                      {hoursBasedEcts.toFixed(1)}
                    </span>
                    <span className="text-sm font-bold text-gray-400">ECTS Credits</span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    Based on {totalCourseHours} total hours divided by {hoursPerEcts} hours per credit.
                  </p>
                </>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href="/tools/german-grade-calculator"
                  className="w-full neu-btn-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md text-white"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Calculate German Grade (Bavarian Formula)
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/tools/admission-chance"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block text-gray-600 dark:text-gray-300 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Evaluate Admission Chances →
                </Link>
              </div>
            </div>

            {/* What German Universities Look For */}
            <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-germany-red" />
                Credit Prerequisite Rules (Fachliche Eignung)
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                German public universities do <strong>not</strong> look solely at your GPA. They strictly verify subject prerequisites. For instance, an MSc in Computer Science might reject an 8.5 CGPA candidate if their bachelor transcript lacks at least 18 ECTS in Theoretical Computer Science & Higher Mathematics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto pb-20">
        <h2 className="text-2xl font-black font-display text-germany-black dark:text-white mb-6 text-center">
          ECTS Conversion FAQ
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "How many ECTS is an Indian 4-year B.Tech / B.E. worth?",
              a: "Under the Bologna system, every full academic year is equivalent to 60 ECTS. A completed 4-year engineering degree in India is universally treated as equivalent to 240 ECTS credits."
            },
            {
              q: "How many ECTS is a 3-year Bachelor's degree (B.Sc, BCA, B.Com)?",
              a: "A 3-year bachelor's degree equals 180 ECTS. Some German universities require 210 or 240 ECTS for a 3-semester or 4-semester Master's, requiring applicants to take bridge courses (Auflagen) or apply for 4-semester programs."
            },
            {
              q: "How do I calculate ECTS for an individual course?",
              a: "Take the total ECTS of your degree (e.g. 240 ECTS for 4 years) and divide by the total home credits required by your university (e.g. 160 credits). If the multiplier is 1.5, a 4-credit course equals 4 × 1.5 = 6 ECTS."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="neu-card bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-germany-black dark:text-white flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
