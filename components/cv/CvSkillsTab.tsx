'use client';

import React from 'react';
import { Code2, Globe, Plus, Trash2, X } from 'lucide-react';
import { CvFormData, LanguageItem } from './cv-types';

export interface CvSkillsTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
  newSkillInput: string;
  setNewSkillInput: (val: string) => void;
  handleDeleteSkill: (index: number) => void;
  handleDeleteLanguage: (index: number) => void;
}

export function CvSkillsTab({
  formData,
  setFormData,
  newSkillInput,
  setNewSkillInput,
  handleDeleteSkill,
  handleDeleteLanguage,
}: CvSkillsTabProps) {
  return (
        <div className="space-y-6">
          {/* Technical Skills */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Skills (Synced with Profile)
              </h2>
              <p className="text-xs font-bold text-gray-500">
                These skills will be categorized into clean groups (Programming Languages, Frameworks, Tools) on your German CV.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, newSkillInput.trim()],
                      });
                      setNewSkillInput('');
                    }
                  }
                }}
                className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                placeholder="Type a skill and press Enter or Add..."
              />
              <button
                type="button"
                onClick={() => {
                  if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
                    setFormData({
                      ...formData,
                      skills: [...formData.skills, newSkillInput.trim()],
                    });
                    setNewSkillInput('');
                  }
                }}
                className="px-4 py-2.5 neu-btn-primary text-xs font-extrabold cursor-pointer"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-extrabold text-gray-700 shadow-2xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(sIdx)}
                    className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Languages &amp; Proficiency
                </h2>
                <p className="text-xs font-bold text-gray-500">
                  English, German, and native languages. European CEFR levels (A1–C2) or IELTS/TOEFL scores are accepted.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    languages: [...formData.languages, { name: '', level: 'B2 (Upper Intermediate)' }],
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Language</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.languages.map((lang, lIdx) => (
                <div key={lIdx} className="flex items-center gap-3 p-3 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => {
                        const updated = [...formData.languages];
                        updated[lIdx] = { ...updated[lIdx], name: e.target.value };
                        setFormData({ ...formData, languages: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      placeholder="Language (e.g. German, English, Hindi)"
                    />
                  </div>
                  <div className="w-48">
                    <input
                      type="text"
                      value={lang.level}
                      onChange={(e) => {
                        const updated = [...formData.languages];
                        updated[lIdx] = { ...updated[lIdx], level: e.target.value };
                        setFormData({ ...formData, languages: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      placeholder="Level (e.g. B2, Native, IELTS 7.5)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLanguage(lIdx)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}
