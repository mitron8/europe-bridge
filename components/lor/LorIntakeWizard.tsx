"use client";

import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  GraduationCap,
  Loader2,
  UserCheck,
} from 'lucide-react';
import type { LorFormData, LorRoleType, LorSection } from '../StudentLorGenerator';
import { COHORT_PERCENTILE_PRESETS, LOR_ROLE_PRESETS } from '../StudentLorGenerator';

interface LorIntakeWizardProps {
  formData: LorFormData;
  selectedSection: LorSection;
  onSelectSection: (section: LorSection) => void;
  onRolePresetSelect: (role: LorRoleType) => void;
  onFormDataChange: (updated: LorFormData) => void;
  newSkill: string;
  onNewSkillChange: (val: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
  onInitiateGenerate: () => void;
  isGenerating: boolean;
  remainingAttempts: number;
}

export function LorIntakeWizard({
  formData,
  selectedSection,
  onSelectSection,
  onRolePresetSelect,
  onFormDataChange,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
  onInitiateGenerate,
  isGenerating,
  remainingAttempts,
}: LorIntakeWizardProps) {
  return (
    <div className="space-y-6 print:hidden">
      {/* LOR Recommendation Style Preset Buttons */}
      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-germany-red" />
            <span>Select Recommendation Profile Type</span>
          </span>
          <span className="text-[11px] font-bold text-gray-400">
            Tailors academic tone to your professor&apos;s role
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(Object.keys(LOR_ROLE_PRESETS) as LorRoleType[]).map((roleKey) => {
            const preset = LOR_ROLE_PRESETS[roleKey];
            const isSelected = formData.lorType === roleKey;
            return (
              <button
                key={roleKey}
                type="button"
                onClick={() => onRolePresetSelect(roleKey)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-gray-900 dark:border-white bg-white dark:bg-[#151B27] shadow-xs ring-1 ring-gray-900 dark:ring-white'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-900 dark:text-gray-100">
                    {preset.label}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-germany-red" />}
                </div>
                <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 block mt-0.5">
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Step Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Step 1: Referee Profile */}
        <div
          onClick={() => onSelectSection('recommender')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            selectedSection === 'recommender'
              ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
              : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          <div
            className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              selectedSection === 'recommender'
                ? 'bg-red-50 text-germany-red dark:bg-red-950/50'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 1</span>
              {formData.recommenderName && <Check className="w-3.5 h-3.5 text-emerald-500" />}
            </div>
            <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Referee Profile</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {formData.recommenderName || 'Professor credentials'}
            </p>
          </div>
        </div>

        {/* Step 2: Cohort Standing */}
        <div
          onClick={() => onSelectSection('relationship')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            selectedSection === 'relationship'
              ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
              : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          <div
            className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              selectedSection === 'relationship'
                ? 'bg-amber-50 text-germany-gold dark:bg-amber-950/50'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 2</span>
              {formData.studentRank && <Check className="w-3.5 h-3.5 text-emerald-500" />}
            </div>
            <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Cohort Standing</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {formData.studentRank || 'Percentile & courses'}
            </p>
          </div>
        </div>

        {/* Step 3: Research & Evidence */}
        <div
          onClick={() => onSelectSection('research')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
            selectedSection === 'research'
              ? 'border-gray-900 dark:border-white bg-white dark:bg-[#111622] shadow-md ring-2 ring-gray-900/10 dark:ring-white/10'
              : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          <div
            className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              selectedSection === 'research'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Step 3</span>
              {formData.keyAchievements && <Check className="w-3.5 h-3.5 text-emerald-500" />}
            </div>
            <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5">Thesis &amp; Leadership</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {formData.thesisTitle || 'Research paper & forum work'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Step Details */}
      <div className="neu-card p-6 md:p-8 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
        {/* STEP 1: RECOMMENDER PROFILE */}
        {selectedSection === 'recommender' && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                Step 1: Professor &amp; Referee Academic Credentials
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Official contact information to be printed on your university letterhead.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Professor / Referee Full Name
                </label>
                <input
                  type="text"
                  value={formData.recommenderName || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderName: e.target.value })}
                  placeholder="e.g. Associate Professor Peter Johnson"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Designation &amp; Academic Chair
                </label>
                <input
                  type="text"
                  value={formData.recommenderTitle || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderTitle: e.target.value })}
                  placeholder="e.g. Associate Professor & Chair of Applied Informatics"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  University / Institution Name
                </label>
                <input
                  type="text"
                  value={formData.recommenderInstitution || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderInstitution: e.target.value })}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Academic Department
                </label>
                <input
                  type="text"
                  value={formData.recommenderDepartment || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderDepartment: e.target.value })}
                  placeholder="e.g. Department of Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Official Institutional Email (.edu / .ac)
                </label>
                <input
                  type="email"
                  value={formData.recommenderEmail || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderEmail: e.target.value })}
                  placeholder="e.g. p.johnson@nit.ac.in"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Official Contact Phone / Mobile
                </label>
                <input
                  type="text"
                  value={formData.recommenderPhone || ''}
                  onChange={(e) => onFormDataChange({ ...formData, recommenderPhone: e.target.value })}
                  placeholder="e.g. +91 98765 43210 (German universities verify via phone)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                Campus / Directorate Address
              </label>
              <input
                type="text"
                value={formData.recommenderAddress || ''}
                onChange={(e) => onFormDataChange({ ...formData, recommenderAddress: e.target.value })}
                placeholder="e.g. Campus Directorate, Academic Block III, Tech City"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => onSelectSection('relationship')}
                className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Cohort Standing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: RELATIONSHIP & COHORT STANDING */}
        {selectedSection === 'relationship' && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                Step 2: Academic Standing &amp; Cohort Benchmark (DIW Berlin Matrix)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                German admission boards require quantifiable percentile rankings over general subjective compliments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Duration of Academic Relationship
                </label>
                <input
                  type="text"
                  value={formData.relationshipDuration || ''}
                  onChange={(e) => onFormDataChange({ ...formData, relationshipDuration: e.target.value })}
                  placeholder="e.g. four years / over 2 years (4 academic semesters)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                  Capacity Known
                </label>
                <input
                  type="text"
                  value={formData.capacityKnown || ''}
                  onChange={(e) => onFormDataChange({ ...formData, capacityKnown: e.target.value })}
                  placeholder="e.g. Professor and Head of Department / Thesis Advisor"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                Advanced Courses / Seminars Taught by This Referee
              </label>
              <input
                type="text"
                value={formData.courseTaught || ''}
                onChange={(e) => onFormDataChange({ ...formData, courseTaught: e.target.value })}
                placeholder="e.g. Design & Analysis of Algorithms, Distributed Operating Systems"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block">
                Cohort Rank / Relative Academic Standing (Crucial for Germany)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COHORT_PERCENTILE_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => onFormDataChange({ ...formData, studentRank: p.value })}
                    className={`p-2.5 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.studentRank === p.value
                        ? 'border-germany-red bg-red-50/50 dark:bg-red-950/30 text-germany-red font-black'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.studentRank || ''}
                onChange={(e) => onFormDataChange({ ...formData, studentRank: e.target.value })}
                placeholder="e.g. Top 5% in a cohort of 140 undergraduate students"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white mt-1"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => onSelectSection('recommender')}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
              >
                Back to Referee
              </button>
              <button
                onClick={() => onSelectSection('research')}
                className="px-5 py-2.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Thesis &amp; Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: THESIS & LEADERSHIP */}
        {selectedSection === 'research' && (
          <div className="space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">
                Step 3: Thesis Presentation, Technical Forum &amp; Scientific Independence
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Concrete achievements including seminar thesis paper, circuitry/coding projects, and leadership in student technical forums.
              </p>
            </div>

            <div>
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                Bachelor Thesis / Seminar Paper Title &amp; Topic
              </label>
              <input
                type="text"
                value={formData.thesisTitle || ''}
                onChange={(e) => onFormDataChange({ ...formData, thesisTitle: e.target.value })}
                placeholder="e.g. Autonomous Edge Computing for Real-Time Sensor Networks"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Highlights your seminar thesis presentation directly to the German examination board.
              </p>
            </div>

            <div>
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                Key Academic &amp; Technical Achievements (Projects, Circuitry, Coding, Forum Leadership)
              </label>
              <textarea
                rows={4}
                value={formData.keyAchievements || ''}
                onChange={(e) => onFormDataChange({ ...formData, keyAchievements: e.target.value })}
                placeholder="Describe laboratory achievements, handling complex concepts with finesse, coding, and role in student technical forum or volunteer work..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-black text-gray-700 dark:text-gray-300 block mb-1">
                Target Master&apos;s Program in Germany
              </label>
              <input
                type="text"
                value={formData.targetProgram || ''}
                onChange={(e) => onFormDataChange({ ...formData, targetProgram: e.target.value })}
                placeholder="e.g. Master of Science in Computer Science (Public University, Germany)"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Demonstrated Scientific Competencies */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                Evaluated Competency Dimensions (DIW Berlin Matrix)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => onNewSkillChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddSkill())}
                  placeholder="e.g. Empirical Benchmark Design or Peer Forum Leadership"
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={onAddSkill}
                  className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-extrabold rounded-xl cursor-pointer"
                >
                  Add Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.softSkills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  >
                    {sk}
                    <button
                      onClick={() => onRemoveSkill(sk)}
                      className="text-gray-400 hover:text-red-500 font-black cursor-pointer text-sm"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Trigger: Generate AI Button */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onSelectSection('relationship')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer text-center"
              >
                Back to Standing
              </button>

              <button
                onClick={onInitiateGenerate}
                disabled={isGenerating || remainingAttempts <= 0}
                className="w-full sm:w-auto px-8 py-3.5 neu-btn-primary flex items-center justify-center gap-2.5 text-xs font-black rounded-xl cursor-pointer shadow-md disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                    <span>Drafting Academic LOR...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 text-germany-gold" />
                    <span>
                      {remainingAttempts <= 0
                        ? 'Limit Reached (0 left)'
                        : `Generate Academic LOR (${remainingAttempts} left)`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
