'use client';

import React from 'react';
import { FolderGit2, Plus, Trash2, CheckCircle2, ExternalLink } from 'lucide-react';
import { CvFormData, ProjectItem } from './cv-types';

export interface CvProjectsTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
  handleDeleteProject: (index: number) => void;
}

export function CvProjectsTab({
  formData,
  setFormData,
  handleDeleteProject,
}: CvProjectsTabProps) {
  return (
        <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Academic &amp; Technical Projects
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Variable-length project section. Include genuine technical projects demonstrating practical implementation skills.
              </p>
            </div>
            <button
              onClick={() => {
                const newProj: ProjectItem = {
                  id: `proj-${Date.now()}`,
                  title: '',
                  technologies: '',
                  startDate: '',
                  endDate: '',
                  url: '',
                  description: '',
                  isIncluded: true,
                };
                setFormData({ ...formData, projects: [...formData.projects, newProj] });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 neu-btn-primary text-[11px] font-extrabold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.projects.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <FolderGit2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-extrabold text-gray-600">No projects added yet</p>
                <p className="text-[11px] font-bold text-gray-400 mt-1">
                  Add major capstone, research, or GitHub projects relevant to German university admission.
                </p>
              </div>
            ) : (
              formData.projects.map((proj, idx) => (
                <div
                  key={proj.id || `proj-${idx}`}
                  className={`p-4 rounded-2xl border transition-all ${
                    proj.isIncluded !== false
                      ? 'bg-[#FDFBF7] border-[#EBE7E0]'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={proj.isIncluded !== false}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx] = { ...updated[idx], isIncluded: e.target.checked };
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="rounded text-germany-red focus:ring-germany-red"
                      />
                      <span className="text-xs font-black text-gray-700">Include in CV</span>
                    </label>

                    <button
                      onClick={() => handleDeleteProject(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={proj.title || ''}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. Distributed Task Queue"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Technologies Used (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={
                          Array.isArray(proj.technologies)
                            ? proj.technologies.join(', ')
                            : proj.technologies || ''
                        }
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx] = { ...updated[idx], technologies: e.target.value };
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. Node.js, Redis, Docker, TypeScript"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Date / Duration
                      </label>
                      <input
                        type="text"
                        value={proj.startDate || ''}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx] = { ...updated[idx], startDate: e.target.value };
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="e.g. 2024-01 – 2024-04"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Repository / Demo URL
                      </label>
                      <input
                        type="url"
                        value={proj.url || ''}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                      Project Description &amp; Technical Contributions
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description || ''}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-2 bg-white dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 leading-relaxed"
                      placeholder="Designed resilient background jobs with atomic row locking, built REST API gateway..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
  );
}
