"use client";
import React, { useState } from 'react';
import { Calculator, HelpCircle, CheckCircle2, TrendingUp, Lightbulb } from 'lucide-react';

export const GradeConversionSection = () => {
  const [maxGrade, setMaxGrade] = useState<number>(100);
  const [passGrade, setPassGrade] = useState<number>(40);
  const [userScore, setUserScore] = useState<number>(75);

  const calculateGermanGrade = () => {
    if (!userScore || userScore < passGrade) return "4.0 (Fail)";
    if (userScore >= maxGrade) return "1.0 (Best)";
    
    const result = 1 + 3 * ((maxGrade - userScore) / (maxGrade - passGrade));
    return result.toFixed(2);
  };

  const germanGrade = calculateGermanGrade();

  return (
    <section id="section-bavarian" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Calculator className="w-6 h-6 text-germany-black" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #5</span>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Grade Conversion &amp; Bavarian Formula</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">
              German admissions convert foreign grades to the German 1.0–4.0 scale using the standardized modified Bavarian formula.
            </p>
          </div>
        </div>

        {/* Interactive Bavarian Calculator Card */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-extrabold text-germany-black text-lg">Interactive Bavarian Formula Calculator</h3>
            <p className="text-xs text-gray-500 font-medium">Input your grading system's maximum score, passing score, and your achieved marks.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Maximum Possible Score (Nmax)</label>
                  <input
                    type="number"
                    value={maxGrade}
                    onChange={(e) => setMaxGrade(Number(e.target.value))}
                    className="w-full neu-input px-4 py-2.5 text-sm font-bold"
                    placeholder="e.g. 100 or 10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Minimum Passing Score (Npass)</label>
                  <input
                    type="number"
                    value={passGrade}
                    onChange={(e) => setPassGrade(Number(e.target.value))}
                    className="w-full neu-input px-4 py-2.5 text-sm font-bold"
                    placeholder="e.g. 40 or 4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Score / CGPA (N-achieved)</label>
                <input
                  type="number"
                  value={userScore}
                  onChange={(e) => setUserScore(Number(e.target.value))}
                  className="w-full neu-input px-4 py-2.5 text-sm font-bold text-germany-red font-display text-base"
                  placeholder="e.g. 78 or 8.2"
                />
              </div>

              {/* Mathematical Formula Preview */}
              <div className="p-4 rounded-2xl bg-gray-100/80 text-xs text-gray-700 space-y-1 font-mono">
                <div className="font-bold text-germany-black">Formula: German Grade = 1 + 3 × [(Nmax - Nd) / (Nmax - Npass)]</div>
                <div>Calculation: 1 + 3 × [({maxGrade} - {userScore}) / ({maxGrade} - {passGrade})]</div>
              </div>
            </div>

            {/* Calculated Result Display */}
            <div className="lg:col-span-5 neu-card p-6 border-2 border-germany-red/30 bg-red-50/20 text-center space-y-3">
              <span className="text-xs font-black uppercase text-gray-500 tracking-wider">Converted German GPA</span>
              <div className="text-4xl font-black text-germany-black font-display tracking-tight">
                {germanGrade}
              </div>
              <p className="text-xs font-semibold text-gray-600">
                Scale: 1.0 (Very Good / Excellent) &rarr; 4.0 (Sufficient / Pass)
              </p>
            </div>
          </div>
        </div>

        {/* NC vs Non-NC Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-card p-6 space-y-3 border-l-4 border-l-germany-red">
            <span className="text-xs font-black uppercase text-germany-red">Restricted Admission</span>
            <h4 className="text-lg font-black text-germany-black font-display">NC Programs (Numerus Clausus)</h4>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              NC programs have a fixed quota of seats. Applicants are ranked strictly by GPA. Popular subjects (Business, Data Science, Psychology) may require a top grade of 1.2–1.8.
            </p>
          </div>

          <div className="neu-card p-6 space-y-3 border-l-4 border-l-emerald-500">
            <span className="text-xs font-black uppercase text-emerald-600">Unrestricted Admission</span>
            <h4 className="text-lg font-black text-germany-black font-display">Non-NC Programs (Zulassungsfrei)</h4>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              No seat limit. As long as you meet the minimum academic prerequisite credits (e.g. German grade 2.5 or better) and language score, you are guaranteed admission.
            </p>
          </div>
        </div>

        {/* How to Compensate for Borderline GPA */}
        <div className="neu-card p-6 sm:p-8 space-y-4 border-t-4 border-t-germany-gold">
          <div className="flex items-center gap-2 text-germany-black font-extrabold text-lg">
            <Lightbulb className="w-5 h-5 text-germany-gold" />
            <span>How to Compensate for a Borderline GPA (2.6 – 3.0)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
              <span className="text-xs font-bold text-germany-red">1. Work Experience</span>
              <p className="text-xs text-gray-600 font-medium">2+ years of relevant industry experience can boost your rank points.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
              <span className="text-xs font-bold text-germany-red">2. Research Papers</span>
              <p className="text-xs text-gray-600 font-medium">Published papers or patents demonstrate advanced research capabilities.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
              <span className="text-xs font-bold text-germany-red">3. GRE Scores</span>
              <p className="text-xs text-gray-600 font-medium">A high GRE score (315+) can offset a lower undergraduate GPA at TU Munich/RWTH.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
              <span className="text-xs font-bold text-germany-red">4. Tailored SOP</span>
              <p className="text-xs text-gray-600 font-medium">A compelling motivation letter explaining academic growth and project work.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
