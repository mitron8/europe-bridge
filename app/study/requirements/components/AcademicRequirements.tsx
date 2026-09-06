"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export const AcademicRequirements = () => {
  const [selectedLevel, setSelectedLevel] = useState<'masters' | 'bachelors' | 'phd'>('masters');

  const gradeTableData = [
    { IndianPct: "85%+", germanGrade: "1.0 – 1.5", competitiveness: "Highly Competitive", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { IndianPct: "75% – 84%", germanGrade: "1.5 – 2.0", competitiveness: "Competitive", badgeColor: "bg-blue-100 text-blue-800 border-blue-300" },
    { IndianPct: "65% – 74%", germanGrade: "2.0 – 2.5", competitiveness: "Good Prospects", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300" },
    { IndianPct: "60% – 64%", germanGrade: "2.5 – 3.0", competitiveness: "Limited Options", badgeColor: "bg-amber-100 text-amber-800 border-amber-300" },
    { IndianPct: "Below 60%", germanGrade: "3.0+", competitiveness: "Very Few Programs", badgeColor: "bg-red-100 text-red-800 border-red-300" },
  ];

  return (
    <section id="section-academic" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-germany-black flex items-center justify-center font-bold shrink-0 shadow-sm">
              <GraduationCap className="w-6 h-6 text-germany-black" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #1</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Academic Requirements &amp; Grades</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                German universities evaluate your academic background based on degree recognition, subject relevance, and converted GPA.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/university.png" 
            alt="University Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Grade Conversion Benchmarks */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-germany-black text-lg">German Grade Competitiveness Scale</h3>
              <p className="text-xs text-gray-500 font-medium">Conversion from Indian Percentage to German Grade (1.0 = Highest, 4.0 = Minimum Pass)</p>
            </div>
            <a 
              href="#section-bavarian"
              className="text-xs font-bold text-germany-red hover:underline flex items-center gap-1"
            >
              See Bavarian Formula &rarr;
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-700 text-xs font-black uppercase">
                  <th className="p-3.5 rounded-l-xl">Your Percentage (India)</th>
                  <th className="p-3.5">German Grade (Approx.)</th>
                  <th className="p-3.5 rounded-r-xl">Competitiveness Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gradeTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-3.5 font-bold text-germany-black">{row.IndianPct}</td>
                    <td className="p-3.5 font-extrabold text-germany-red font-display text-base">{row.germanGrade}</td>
                    <td className="p-3.5">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${row.badgeColor}`}>
                        {row.competitiveness}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Degree Requirements by Level Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-germany-black">Degree Requirements by Level</h3>
            <div className="flex bg-gray-200/70 p-1 rounded-2xl gap-1">
              <button 
                onClick={() => setSelectedLevel('masters')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === 'masters' ? 'bg-white text-germany-black shadow' : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                Master's Degree
              </button>
              <button 
                onClick={() => setSelectedLevel('bachelors')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === 'bachelors' ? 'bg-white text-germany-black shadow' : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                Bachelor's Degree
              </button>
              <button 
                onClick={() => setSelectedLevel('phd')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === 'phd' ? 'bg-white text-germany-black shadow' : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                PhD / Doctorate
              </button>
            </div>
          </div>

          <div className="neu-card p-6 sm:p-8 border-l-4 border-l-germany-black space-y-4">
            {selectedLevel === 'masters' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-germany-black font-extrabold text-lg">
                  <Award className="w-5 h-5 text-germany-red" />
                  <span>Master's Program Requirements</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Completed Bachelor's Degree:</strong> Minimum 3 years / 180 ECTS credits from a recognized university (H+ status on Anabin).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>GPA Cutoff:</strong> Most public Master's programs require a German GPA of 2.5 or better (approx. 65%+ in Indian scale).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Subject Specificity (Consecutive Degrees):</strong> German Master's degrees are strict. Your Bachelor's major must directly align with the Master's discipline (e.g. Mechanical Eng to Mechanical Eng).</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedLevel === 'bachelors' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-germany-black font-extrabold text-lg">
                  <BookOpen className="w-5 h-5 text-germany-red" />
                  <span>Bachelor's Program Requirements</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Secondary School Certificate:</strong> 12th Standard Higher Secondary Certificate (CBSE/ICSE/State Board) with strong science/math grades.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span><strong>Foundation Year (Preparatory Course):</strong> If your 12th certificate is not considered 100% equivalent to the German high school leaving certificate, you must complete a 1-year preparatory course and pass the university entrance assessment exam (FSP).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Direct Entry Exemption:</strong> Students with 1 year of completed Bachelor's in home country or JEE Advanced rank may qualify for direct entry without a foundation year.</span>
                  </li>
                </ul>
              </div>
            )}

            {selectedLevel === 'phd' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-germany-black font-extrabold text-lg">
                  <GraduationCap className="w-5 h-5 text-germany-red" />
                  <span>PhD &amp; Doctoral Research Requirements</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Completed Master's Degree:</strong> Strong academic performance (German grade 2.0 or better) with thesis work.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Doctoral Advisor (Doktorvater):</strong> Acceptance from a German professor willing to supervise your research proposal or admission into a structured PhD program (Graduate School).</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ECTS & Subject Prerequisites Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold shrink-0">
            !
          </div>
          <div>
            <h4 className="font-extrabold text-germany-black text-base">Prerequisite Credit Watch (Zugangsvoraussetzungen)</h4>
            <p className="text-xs text-gray-700 font-medium leading-relaxed mt-1">
              Having a high GPA is not enough. German universities review your transcript course by course. For example, a CS Master's at TU Munich may require a minimum of 18 ECTS in Theoretical Computer Science, 12 ECTS in Higher Mathematics, and 8 ECTS in Databases. Always check specific module requirements beforehand!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
