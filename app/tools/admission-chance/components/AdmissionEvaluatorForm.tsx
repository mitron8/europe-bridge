"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Languages, 
  Briefcase, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  CheckCircle2,
  Target
} from 'lucide-react';
import { EvaluationResults } from './EvaluationResults';

export interface UserProfileData {
  scale: '10-point' | '4-point' | 'percentage' | 'german';
  score: number;
  field: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  english: 'ielts_7_5' | 'ielts_6_5' | 'ielts_6_0' | 'moi';
  german: 'c1' | 'b1_b2' | 'a1_a2' | 'none';
  workExp: '2_plus' | '1_to_2' | 'less_1' | 'none';
  extras: 'gre_gmat' | 'research' | 'both' | 'none';
}

export const AdmissionEvaluatorForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const [formData, setFormData] = useState<UserProfileData>({
    scale: '10-point',
    score: 8.2,
    field: 'Computer Science & IT',
    tier: 'tier1',
    english: 'ielts_6_5',
    german: 'a1_a2',
    workExp: 'less_1',
    extras: 'none'
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsCalculated(false);
    setCurrentStep(1);
  };

  if (isCalculated) {
    return <EvaluationResults data={formData} onReset={handleReset} />;
  }

  return (
    <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quick Criteria Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#e5e0d3] text-center shadow-2xs">
            <span className="text-[11px] font-semibold text-[#787369] block">Bavarian GPA</span>
            <span className="text-[13px] font-bold text-[#9e2a2b]">Max 40 Pts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#e5e0d3] text-center shadow-2xs">
            <span className="text-[11px] font-semibold text-[#787369] block">Credit Match</span>
            <span className="text-[13px] font-bold text-[#9e2a2b]">Max 25 Pts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#e5e0d3] text-center shadow-2xs">
            <span className="text-[11px] font-semibold text-[#787369] block">Language (IELTS)</span>
            <span className="text-[13px] font-bold text-[#9e2a2b]">Max 15 Pts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#e5e0d3] text-center shadow-2xs">
            <span className="text-[11px] font-semibold text-[#787369] block">Experience &amp; GRE</span>
            <span className="text-[13px] font-bold text-[#9e2a2b]">Max 20 Pts</span>
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Progress Bar Header */}
          <div className="space-y-3 border-b border-[#e5e0d3] pb-6 mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--lp-text-muted)]">
              <span className="text-[var(--lp-red)] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-[#eae5d8] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--lp-gold)] to-[var(--lp-red)] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Grading Scale & Score */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 1: Your Academic Grading System</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select transcript scale and enter your score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: '10-point', label: '10-Point CGPA (India)', sub: 'e.g. 8.2 of 10.0' },
                    { id: '4-point', label: '4-Point GPA (US Scale)', sub: 'e.g. 3.4 of 4.0' },
                    { id: 'percentage', label: 'Percentage System (%)', sub: 'e.g. 78% of 100%' },
                    { id: 'german', label: 'German Scale (1.0 to 4.0)', sub: 'e.g. 1.9 (1.0 is best)' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setFormData({ ...formData, scale: item.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.scale === item.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{item.label}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 font-medium">{item.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-[var(--lp-text)] mb-2">Enter Your Score / CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                    className="w-full px-5 py-3 rounded-2xl border border-[#e5e0d3] bg-white text-lg font-bold text-[#16161a] focus:border-[#16161a] focus:ring-2 focus:ring-[#16161a]/15 focus:outline-none transition-all"
                    placeholder="e.g. 8.2 or 78"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Field of Study */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 2: Target Master&apos;s Discipline</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select your intended major field</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Computer Science & IT",
                    "Data Science & AI",
                    "Mechanical & Automotive",
                    "Electrical & Electronics",
                    "Business & Management",
                    "Civil & Environmental",
                    "Biotechnology & Life Sciences",
                    "Other Engineering Discipline"
                  ].map((field) => (
                    <div
                      key={field}
                      onClick={() => setFormData({ ...formData, field })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.field === field 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{field}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Target University Tier */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 3: Target University Tier</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select the tier of German universities you are targeting</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'tier1', title: 'Tier 1: Top Research & TU9 Universities', desc: 'TU Munich, RWTH Aachen, LMU Munich, Heidelberg, TU Berlin. Highly competitive cutoff criteria.' },
                    { id: 'tier2', title: 'Tier 2: Public Universities & Applied Sciences', desc: 'TU Darmstadt, FH Aachen, TH Köln, Univ of Stuttgart, FAU Erlangen. Excellent job outcomes.' },
                    { id: 'tier3', title: 'Tier 3: Unrestricted / Non-NC Public & Private', desc: 'Programs with open seat capacity or private universities. Easiest admission cutoffs.' },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setFormData({ ...formData, tier: t.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.tier === t.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{t.title}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-1 font-medium leading-relaxed">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: English Test Scores */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 4: English Proficiency Level</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select your current or target test score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'ielts_7_5', label: 'IELTS 7.5+ / TOEFL 100+', sub: 'High competitive tier score' },
                    { id: 'ielts_6_5', label: 'IELTS 6.5 / TOEFL 85–95', sub: 'Standard cutoff for most Master\'s' },
                    { id: 'ielts_6_0', label: 'IELTS 6.0 / TOEFL 80', sub: 'Minimum entry score' },
                    { id: 'moi', label: 'Medium of Instruction (MOI)', sub: 'Degree taught 100% in English' },
                  ].map((e) => (
                    <div
                      key={e.id}
                      onClick={() => setFormData({ ...formData, english: e.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.english === e.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{e.label}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 font-medium">{e.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: German Language Level */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 5: German Language Skills</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select your current German proficiency</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'c1', label: 'C1 / C2 (TestDaF 4x4, DSH-2)', sub: 'Qualified for German-taught programs' },
                    { id: 'b1_b2', label: 'B1 / B2 Level', sub: 'Intermediate conversational proficiency' },
                    { id: 'a1_a2', label: 'A1 / A2 Level', sub: 'Basic beginner knowledge' },
                    { id: 'none', label: 'No German Knowledge Yet', sub: 'Applying purely to English-taught courses' },
                  ].map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setFormData({ ...formData, german: g.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.german === g.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{g.label}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 font-medium">{g.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6: Work Experience */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 6: Work Experience &amp; Internships</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select relevant industry experience duration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: '2_plus', label: '2+ Years Full-Time Experience', sub: 'Significant industry background' },
                    { id: '1_to_2', label: '1 to 2 Years Full-Time', sub: 'Solid professional experience' },
                    { id: 'less_1', label: 'Under 1 Year / Internships', sub: 'Academic projects & internships' },
                    { id: 'none', label: 'Fresh Graduate / No Experience', sub: 'Direct transition from Bachelor\'s' },
                  ].map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setFormData({ ...formData, workExp: w.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.workExp === w.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{w.label}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 font-medium">{w.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 7: Extras (GRE / Research) */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4f1ea] border border-[#dcd7cb] text-[#16161a] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">Step 7: Additional Credentials (GRE &amp; Research)</h2>
                    <p className="text-xs text-[var(--lp-text-muted)] font-medium">Select optional profile boosters</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: 'gre_gmat', label: 'GRE 315+ or GMAT 650+', sub: 'Standardized test score' },
                    { id: 'research', label: 'Published Research Paper / Patent', sub: 'Peer-reviewed conference or journal' },
                    { id: 'both', label: 'Both GRE &amp; Research Paper', sub: 'Strong academic profile combo' },
                    { id: 'none', label: 'None of the Above', sub: 'Standard academic profile' },
                  ].map((ex) => (
                    <div
                      key={ex.id}
                      onClick={() => setFormData({ ...formData, extras: ex.id as any })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        formData.extras === ex.id 
                          ? 'bg-[var(--lp-red)]/5 border-[var(--lp-red)] ring-2 ring-[var(--lp-red)]/15 shadow-sm' 
                          : 'bg-white/70 border-[#e5e0d3] hover:border-[#cfc8b8]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--lp-text)]">{ex.label}</div>
                      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 font-medium">{ex.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Action Controls */}
          <div className="mt-8 pt-6 border-t border-[#e5e0d3] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border border-[#e5e0d3] ${
                currentStep === 1 
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[var(--lp-text-muted)]' 
                  : 'bg-white text-[var(--lp-text)] hover:border-[#cfc8b8]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="lp-btn lp-btn--red px-7 py-3 text-xs font-bold inline-flex items-center gap-2"
            >
              <span>{currentStep === totalSteps ? 'Calculate My Chances' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
