"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { StudyFAQ } from '@/app/study/components/StudyFAQ';
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
  ChevronDown,
  ChevronRight
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
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 border-b border-[#e5e0d3] bg-[#fbf9f4]">
          <div 
            aria-hidden 
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-gradient-to-b from-[#e63946]/[0.025] to-transparent blur-3xl" 
          />

          <div className="lp-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] text-[#787369]">
              <Link href="/" className="transition-colors hover:text-[#16161a]">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <Link href="/tools" className="transition-colors hover:text-[#16161a]">
                Free Tools
              </Link>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <span className="font-semibold text-[#16161a]">ECTS Credit Calculator</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#f3efe6] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-medium text-[#4a4740] shadow-2xs mb-3.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#9e2a2b]" />
              <span className="font-semibold text-[#16161a]">Bologna Process European Standard</span>
              <span className="text-[#9a958c]">|</span>
              <span>60 ECTS per Academic Year</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal tracking-tight text-[#16161a] leading-[1.15]">
              ECTS Credit Calculator. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#9e2a2b]">Convert Your Bachelor Credits to German Standards.</span>
            </h1>

            <p className="mt-3.5 max-w-2xl mx-auto text-[14.5px] sm:text-[16px] text-[#5e5b54] leading-relaxed">
              Convert university credit points, semester credit hours, or lecture workloads from India, the US, and abroad into European ECTS credits required by German Master&apos;s admissions committees.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mode Tabs */}
              <div className="flex rounded-xl bg-white p-1.5 border border-[#e5e0d3] shadow-2xs">
                <button
                  type="button"
                  onClick={() => setCalculatorMode('ratio')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    calculatorMode === 'ratio'
                      ? 'bg-[#16161a] text-white shadow-2xs'
                      : 'text-[#5e5b54] hover:text-[#16161a]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Degree Credit Ratio (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setCalculatorMode('hours')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    calculatorMode === 'hours'
                      ? 'bg-[#16161a] text-white shadow-2xs'
                      : 'text-[#5e5b54] hover:text-[#16161a]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Hours / Workload Mode
                </button>
              </div>

              {calculatorMode === 'ratio' ? (
                <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm space-y-6">
                  <h3 className="text-[15px] font-serif font-bold text-[#16161a] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9e2a2b]" />
                    1. Degree Baseline Settings
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                        Bachelor&apos;s Duration *
                      </label>
                      <select
                        value={degreeYears}
                        onChange={(e) => setDegreeYears(parseInt(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-[13px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:outline-none focus:border-[#16161a]"
                      >
                        <option value={3}>3 Years (Europe Standard = 180 ECTS)</option>
                        <option value={4}>4 Years (B.Tech / B.E. / BS = 240 ECTS)</option>
                        <option value={5}>5 Years (Dual Degree / Integrated = 300 ECTS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                        Total Home Credits On Transcript *
                      </label>
                      <input
                        type="number"
                        value={totalHomeCredits}
                        onChange={(e) => setTotalHomeCredits(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 text-[13px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none"
                        placeholder="e.g. 160 or 180"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd] flex items-center justify-between text-[12.5px]">
                    <span className="font-semibold text-[#5e5b54]">
                      Calculated Exchange Ratio:
                    </span>
                    <span className="font-bold text-[#9e2a2b]">
                      1 Home Credit = {ectsMultiplier.toFixed(2)} ECTS
                    </span>
                  </div>

                  {/* Subject / Module Prerequisite Check */}
                  <div className="pt-5 border-t border-[#ece7dd] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[13.5px] font-bold text-[#16161a]">
                          Subject Module Prerequisite Check
                        </h4>
                        <p className="text-[11.5px] text-[#787369]">
                          Check whether you meet required ECTS in specific subject areas (Maths, CS, Mechanics, etc.)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addSubject}
                        className="px-3 py-1.5 rounded-lg bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] font-bold text-[12px] hover:bg-[#16161a] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
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
                            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#faf8f3] border border-[#ece7dd]"
                          >
                            <input
                              type="text"
                              value={sub.name}
                              onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                              placeholder="Subject Area (e.g. Discrete Math)"
                              className="flex-1 px-3 py-1.5 text-[12.5px] font-semibold rounded-lg bg-white border border-[#dcd7cb] text-[#16161a] focus:outline-none focus:border-[#16161a]"
                            />
                            <div className="flex items-center gap-1.5 shrink-0">
                              <input
                                type="number"
                                value={sub.homeCredits}
                                onChange={(e) => updateSubject(sub.id, 'homeCredits', parseFloat(e.target.value) || 0)}
                                className="w-16 px-2 py-1.5 text-[12px] font-bold rounded-lg bg-white border border-[#dcd7cb] text-[#16161a] text-center focus:outline-none focus:border-[#16161a]"
                                placeholder="Credits"
                              />
                              <span className="text-[11px] font-bold text-[#787369]">pts</span>
                            </div>
                            <div className="w-20 text-right shrink-0">
                              <span className="text-[12px] font-bold text-[#16161a]">
                                {converted.toFixed(1)} ECTS
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSubject(sub.id)}
                              className="p-1.5 text-[#9a958c] hover:text-[#9e2a2b] transition-colors cursor-pointer"
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
                <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 sm:p-7 shadow-sm space-y-5">
                  <h3 className="text-[15px] font-serif font-bold text-[#16161a] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9e2a2b]" />
                    Workload &amp; Study Hours Calculation
                  </h3>
                  <p className="text-[12.5px] text-[#5e5b54] leading-relaxed">
                    German universities define 1 ECTS as equal to <strong>25 to 30 total student workload hours</strong> (consisting of classroom lectures, lab hours, plus outside self-study).
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                        Classroom / Lecture &amp; Lab Hours
                      </label>
                      <input
                        type="number"
                        value={lectureHours}
                        onChange={(e) => setLectureHours(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 text-[13px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                        Independent Self-Study &amp; Exam Prep Hours
                      </label>
                      <input
                        type="number"
                        value={selfStudyHours}
                        onChange={(e) => setSelfStudyHours(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 text-[13px] font-bold rounded-xl bg-[#faf8f3] border border-[#dcd7cb] text-[#16161a] focus:border-[#16161a] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-wider text-[#4a4740] mb-1.5">
                        German University Standard Hours per ECTS
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[25, 28, 30].map((hrs) => (
                          <button
                            key={hrs}
                            type="button"
                            onClick={() => setHoursPerEcts(hrs)}
                            className={`py-2 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer ${
                              hoursPerEcts === hrs
                                ? 'bg-[#16161a] text-white border-[#16161a] shadow-2xs'
                                : 'bg-[#faf8f3] border-[#e5e0d3] text-[#4a4740] hover:border-[#16161a]'
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
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-[#e5e0d3] bg-[#faf8f3] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369] block mb-2">
                  Equivalent European Credits
                </span>

                {calculatorMode === 'ratio' ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-serif font-bold text-[#16161a] tracking-tight">
                        {targetTotalEcts}
                      </span>
                      <span className="text-[12px] font-bold text-[#787369]">Total Program ECTS</span>
                    </div>

                    <p className="text-[12.5px] text-[#5e5b54] mb-6 leading-relaxed">
                      A completed {degreeYears}-year Bachelor&apos;s degree translates directly into <strong>{targetTotalEcts} ECTS credits</strong> under the Bologna European standard.
                    </p>

                    <div className="p-4 rounded-xl bg-white border border-[#ece7dd] space-y-2.5 mb-6">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-[#5e5b54]">Selected Subjects Total:</span>
                        <span className="font-bold text-[#16161a] text-[13.5px]">
                          {totalCalculatedEcts.toFixed(1)} ECTS
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-[#5e5b54]">Standard Degree Pace:</span>
                        <span className="font-bold text-[#16161a]">
                          60 ECTS / Year
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-serif font-bold text-[#16161a] tracking-tight">
                        {hoursBasedEcts.toFixed(1)}
                      </span>
                      <span className="text-[12px] font-bold text-[#787369]">ECTS Credits</span>
                    </div>

                    <p className="text-[12.5px] text-[#5e5b54] mb-6 leading-relaxed">
                      Based on {totalCourseHours} total student workload hours divided by {hoursPerEcts} hours per credit.
                    </p>
                  </>
                )}

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    href="/tools/german-grade-calculator"
                    className="w-full rounded-xl bg-[#16161a] py-3 px-4 text-[13px] font-semibold flex items-center justify-center gap-2 text-white transition-all hover:bg-[#2e2e34] shadow-2xs"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate German Grade (Bavarian Formula)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/tools/admission-chance"
                    className="w-full rounded-xl border border-[#dcd7cb] bg-white py-2.5 px-4 text-[12.5px] font-semibold text-center block text-[#16161a] hover:bg-[#f7f5f0] transition-colors"
                  >
                    Evaluate Admission Chances &rarr;
                  </Link>
                </div>
              </div>

              {/* What German Universities Look For */}
              <div className="rounded-2xl border border-[#e5e0d3] bg-white p-5 shadow-sm space-y-2">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#4a4740] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#9e2a2b]" />
                  Credit Prerequisite Rules (Fachliche Eignung)
                </h4>
                <p className="text-[12.5px] text-[#5e5b54] leading-relaxed">
                  German public universities do <strong>not</strong> look solely at your GPA. They strictly verify subject prerequisites. For instance, an MSc in Computer Science might reject an 8.5 CGPA candidate if their bachelor transcript lacks at least 18 ECTS in Theoretical Computer Science &amp; Higher Mathematics.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <StudyFAQ
          id="faq"
          badge="ECTS System FAQs"
          title="Frequently Asked Questions"
          subtitle="Understanding Indian credit conversion multipliers, 3-year vs 4-year degree evaluations, and Bologna rules."
          faqs={[
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
          ]}
        />

        {/* Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
