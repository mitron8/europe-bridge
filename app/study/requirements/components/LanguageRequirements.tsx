"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, CheckCircle, Info, FileCheck } from 'lucide-react';

export const LanguageRequirements = () => {
  const [activeTab, setActiveTab] = useState<'english' | 'german'>('english');

  const englishExams = [
    { test: "IELTS Academic", minScore: "6.0 – 6.5", competitiveScore: "7.0+", notes: "Overall band score required. No band below 6.0 in most cases." },
    { test: "TOEFL iBT", minScore: "80 – 90", competitiveScore: "100+", notes: "Subscores usually 20+ in each section (Reading, Writing, Listening, Speaking)." },
    { test: "Cambridge C1 Advanced", minScore: "Grade C (180+)", competitiveScore: "Grade B (193+)", notes: "Lifetime validity, accepted across Germany." },
  ];

  const germanExams = [
    { test: "TestDaF", reqLevel: "TDN 4 (4x4)", notes: "Most widely accepted. Score of at least 4 in all 4 parts (Reading, Listening, Writing, Speaking)." },
    { test: "DSH", reqLevel: "DSH-2 (or DSH-3)", notes: "University-administered exam taken directly on-campus in Germany before semester start." },
    { test: "Goethe-Zertifikat", reqLevel: "C1 or C2", notes: "Official Goethe Institute certificate. C1 is recognized by nearly all universities." },
    { test: "telc Deutsch C1 Hochschule", reqLevel: "C1 Hochschule", notes: "Popular alternative to TestDaF, especially at Fachhochschulen (Applied Sciences)." },
  ];

  return (
    <section id="section-language" className="py-12 px-6 lg:px-12 scroll-mt-24 bg-gradient-to-b from-transparent via-amber-50/40 to-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shrink-0 shadow-sm">
              <Languages className="w-6 h-6 text-germany-red" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #2</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Language Proficiency Scores</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Whether your course is taught in English or German, you must submit valid standardized proof of language ability.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex justify-center">
          <div className="bg-gray-200 p-1.5 rounded-full inline-flex gap-2 neu-card">
            <button
              onClick={() => setActiveTab('english')}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'english'
                  ? 'bg-germany-red text-white shadow-md'
                  : 'text-gray-700 hover:text-germany-black'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English Taught Programs</span>
            </button>
            <button
              onClick={() => setActiveTab('german')}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'german'
                  ? 'bg-germany-black text-white shadow-md'
                  : 'text-gray-700 hover:text-germany-black'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>German Taught Programs</span>
            </button>
          </div>
        </div>

        {/* English Requirements */}
        {activeTab === 'english' && (
          <div className="space-y-6">
            <div className="neu-card p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-germany-black text-lg">Accepted English Proficiency Tests</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-xs font-black uppercase">
                      <th className="p-3.5 rounded-l-xl">Test Name</th>
                      <th className="p-3.5">Typical Minimum</th>
                      <th className="p-3.5">Competitive Score</th>
                      <th className="p-3.5 rounded-r-xl">Important Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {englishExams.map((exam, idx) => (
                      <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                        <td className="p-3.5 font-bold text-germany-black">{exam.test}</td>
                        <td className="p-3.5 font-extrabold text-gray-800">{exam.minScore}</td>
                        <td className="p-3.5 font-black text-germany-red font-display">{exam.competitiveScore}</td>
                        <td className="p-3.5 text-xs text-gray-600 font-medium">{exam.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Medium of Instruction (MOI) Exemption Box */}
            <div className="neu-card p-6 border-l-4 border-l-emerald-500 bg-emerald-50/30 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-germany-black text-sm">English Test Waiver (MOI Certificate)</h4>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Can you skip IELTS/TOEFL? Yes, if your Bachelor's degree was 100% instructed in English and your university issues an official <strong>Medium of Instruction (MOI) Certificate</strong>. However, top universities like TU Munich and RWTH Aachen still require official IELTS/TOEFL test scores regardless of MOI.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* German Requirements */}
        {activeTab === 'german' && (
          <div className="space-y-6">
            <div className="neu-card p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-germany-black text-lg">Accepted German Proficiency Certificates</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-xs font-black uppercase">
                      <th className="p-3.5 rounded-l-xl">Certificate</th>
                      <th className="p-3.5">Required German Level</th>
                      <th className="p-3.5 rounded-r-xl">Key Details &amp; Validity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {germanExams.map((exam, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                        <td className="p-3.5 font-bold text-germany-black">{exam.test}</td>
                        <td className="p-3.5 font-black text-germany-red font-display text-base">{exam.reqLevel}</td>
                        <td className="p-3.5 text-xs text-gray-600 font-medium">{exam.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="neu-card p-6 border-l-4 border-l-amber-500 bg-amber-50/40 flex items-start gap-4">
              <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-germany-black text-sm">German Basics for English Programs</h4>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Even if your Master's course is taught 100% in English, learning basic German (A1/A2 level) is strongly recommended. It boosts your student visa approval rate and is essential for finding part-time jobs and post-grad employment in Germany.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
