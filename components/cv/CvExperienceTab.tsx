'use client';

import React from 'react';
import { Briefcase, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CvFormData, ExperienceItem } from './cv-types';

export interface CvExperienceTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
  handleDeleteExperience: (index: number) => void;
}

export function CvExperienceTab({
  formData,
  setFormData,
  handleDeleteExperience,
}: CvExperienceTabProps) {
  return (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Work Experience &amp; Internships
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Synchronized with profile experience. The AI will turn your description notes into polished CV bullet points.
              </p>
            </div>
            <button
              onClick={() => {
                const newExp: ExperienceItem = {
                  companyName: '',
                  jobTitle: '',
                  employmentType: 'Full-time',
                  startDate: '',
                  endDate: '',
                  isCurrent: false,
                  description: '',
                  isIncluded: true,
                };
                setFormData({ ...formData, experience: [...formData.experience, newExp] });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.experience.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-extrabold text-gray-600">No experience records added yet</p>
                <p className="text-[11px] font-bold text-gray-400 mt-1">
                  Add full-time roles, internships, or academic research assistantships.
                </p>
              </div>
            ) : (
              formData.experience.map((exp, idx) => (
                <div
                  key={exp.id || `exp-${idx}`}
                  className={`p-4 rounded-2xl border transition-all ${
                    exp.isIncluded !== false
                      ? 'bg-[#FDFBF7] border-[#EBE7E0]'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isIncluded !== false}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx] = { ...updated[idx], isIncluded: e.target.checked };
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="rounded text-germany-red focus:ring-germany-red"
                      />
                      <span className="text-xs font-black text-gray-700">Include in CV</span>
                    </label>

                    <button
                      onClick={() => handleDeleteExperience(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Company / Employer
                      </label>
                      <input
                        type="text"
                        value={exp.companyName || ''}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx] = { ...updated[idx], companyName: e.target.value };
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. EuroBridge Tech"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Job Title / Role
                      </label>
                      <input
                        type="text"
                        value={exp.jobTitle || ''}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx] = { ...updated[idx], jobTitle: e.target.value };
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. Software Engineer Intern"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Start Date (YYYY-MM)
                      </label>
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx] = { ...updated[idx], startDate: e.target.value };
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="2023-01"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-extrabold text-gray-500 uppercase">
                          End Date (YYYY-MM)
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-gray-500">
                          <input
                            type="checkbox"
                            checked={Boolean(exp.isCurrent)}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[idx] = { ...updated[idx], isCurrent: e.target.checked };
                              setFormData({ ...formData, experience: updated });
                            }}
                            className="rounded text-germany-red"
                          />
                          <span>Current Role</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={Boolean(exp.isCurrent)}
                        value={exp.isCurrent ? 'Present' : exp.endDate || ''}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx] = { ...updated[idx], endDate: e.target.value };
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 disabled:bg-gray-100"
                        placeholder="2023-06"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                      Key Responsibilities &amp; Impact (Notes for AI Bullets)
                    </label>
                    <textarea
                      rows={2}
                      value={exp.description || ''}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 leading-relaxed"
                      placeholder="Built backend REST APIs with NestJS, optimized database queries, collaborated with senior engineers..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
  );
}
