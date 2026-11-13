'use client';

import React from 'react';
import { Award, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CvFormData, CertificationItem, AchievementItem } from './cv-types';

export interface CvExtrasTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
  handleDeleteCertification: (index: number) => void;
  handleDeleteAchievement: (index: number) => void;
}

export function CvExtrasTab({
  formData,
  setFormData,
  handleDeleteCertification,
  handleDeleteAchievement,
}: CvExtrasTabProps) {
  return (
        <div className="space-y-6">
          {/* Certifications */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Certifications &amp; Licenses
                </h2>
                <p className="text-xs font-bold text-gray-500">
                  Official certifications from recognized providers (AWS, Microsoft, Google, Cisco, etc.).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newCert: CertificationItem = {
                    id: `cert-${Date.now()}`,
                    name: '',
                    issuer: '',
                    issueDate: '',
                    isIncluded: true,
                  };
                  setFormData({
                    ...formData,
                    certifications: [...formData.certifications, newCert],
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.certifications.length === 0 ? (
                <p className="text-xs font-bold text-gray-400 italic">No certifications added yet.</p>
              ) : (
                formData.certifications.map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="p-3 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cert.isIncluded !== false}
                          onChange={(e) => {
                            const updated = [...formData.certifications];
                            updated[cIdx] = { ...updated[cIdx], isIncluded: e.target.checked };
                            setFormData({ ...formData, certifications: updated });
                          }}
                          className="rounded text-germany-red"
                        />
                        <span className="text-xs font-black text-gray-700">Include in CV</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDeleteCertification(cIdx)}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={cert.name || ''}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                          setFormData({ ...formData, certifications: updated });
                        }}
                        placeholder="Certification Title"
                        className="sm:col-span-2 px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      />
                      <input
                        type="text"
                        value={cert.issuer || ''}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[cIdx] = { ...updated[cIdx], issuer: e.target.value };
                          setFormData({ ...formData, certifications: updated });
                        }}
                        placeholder="Issuing Organization"
                        className="px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Awards &amp; Achievements
                </h2>
                <p className="text-xs font-bold text-gray-500">
                  Academic scholarships, hackathon recognitions, or publications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newAch: AchievementItem = {
                    id: `ach-${Date.now()}`,
                    title: '',
                    date: '',
                    description: '',
                    isIncluded: true,
                  };
                  setFormData({
                    ...formData,
                    achievements: [...formData.achievements, newAch],
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Award</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.achievements.length === 0 ? (
                <p className="text-xs font-bold text-gray-400 italic">No achievements added yet.</p>
              ) : (
                formData.achievements.map((ach, aIdx) => (
                  <div key={ach.id || aIdx} className="p-3 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ach.isIncluded !== false}
                          onChange={(e) => {
                            const updated = [...formData.achievements];
                            updated[aIdx] = { ...updated[aIdx], isIncluded: e.target.checked };
                            setFormData({ ...formData, achievements: updated });
                          }}
                          className="rounded text-germany-red"
                        />
                        <span className="text-xs font-black text-gray-700">Include in CV</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDeleteAchievement(aIdx)}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={ach.title || ''}
                        onChange={(e) => {
                          const updated = [...formData.achievements];
                          updated[aIdx] = { ...updated[aIdx], title: e.target.value };
                          setFormData({ ...formData, achievements: updated });
                        }}
                        placeholder="Award / Competition Title"
                        className="sm:col-span-2 px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      />
                      <input
                        type="text"
                        value={ach.date || ''}
                        onChange={(e) => {
                          const updated = [...formData.achievements];
                          updated[aIdx] = { ...updated[aIdx], date: e.target.value };
                          setFormData({ ...formData, achievements: updated });
                        }}
                        placeholder="Date (e.g. 2023-10)"
                        className="px-3 py-1.5 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
  );
}
