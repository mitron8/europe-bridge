'use client';

import React from 'react';
import { GraduationCap, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CvFormData, EducationItem } from './cv-types';

export interface CvEducationTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
  handleDeleteEducation: (index: number) => void;
}

export function CvEducationTab({
  formData,
  setFormData,
  handleDeleteEducation,
}: CvEducationTabProps) {
  return (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Education Records
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Independent CV education details. Enter your degree and course as you wish them to appear on your CV without affecting your profile.
              </p>
            </div>
            <button
              onClick={() => {
                const newEdu: EducationItem = {
                  institutionName: '',
                  degree: '',
                  course: '',
                  startYear: new Date().getFullYear() - 4,
                  endYear: new Date().getFullYear(),
                  score: null,
                  scale: null,
                  isIncluded: true,
                };
                setFormData({ ...formData, education: [...formData.education, newEdu] });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Education</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.education.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <GraduationCap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-extrabold text-gray-600">No education entries yet</p>
                <p className="text-[11px] font-bold text-gray-400 mt-1">
                  Add your Bachelor&apos;s or secondary education to build your CV.
                </p>
              </div>
            ) : (
              formData.education.map((edu, idx) => (
                <div
                  key={edu.id || `edu-${idx}`}
                  className={`p-4 rounded-2xl border transition-all ${
                    edu.isIncluded !== false
                      ? 'bg-[#FDFBF7] border-[#EBE7E0]'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={edu.isIncluded !== false}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], isIncluded: e.target.checked };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="rounded text-germany-red focus:ring-germany-red"
                      />
                      <span className="text-xs font-black text-gray-700">Include in CV</span>
                    </label>

                    <button
                      onClick={() => handleDeleteEducation(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={edu.institutionName || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], institutionName: e.target.value };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. Pune University"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], degree: e.target.value };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. B.Tech, B.E., B.Com"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Course
                      </label>
                      <input
                        type="text"
                        value={edu.course || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], course: e.target.value };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. Computer Science, Information Technology"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Start Year
                      </label>
                      <input
                        type="number"
                        value={edu.startYear || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], startYear: Number(e.target.value) || null };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="2019"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        End Year / Passing
                      </label>
                      <input
                        type="number"
                        value={edu.endYear || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], endYear: Number(e.target.value) || null };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
  );
}
