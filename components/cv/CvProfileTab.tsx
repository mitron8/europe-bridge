'use client';

import React from 'react';
import { User, Wand2, Loader2, Globe } from 'lucide-react';
import { CvFormData } from './cv-types';

export interface CvProfileTabProps {
  formData: CvFormData;
  setFormData: React.Dispatch<React.SetStateAction<CvFormData | null>>;
}

export function CvProfileTab({
  formData,
  setFormData,
}: CvProfileTabProps) {
  return (
        <div className="space-y-6">
          {/* Identity & Canonical Profile */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Contact &amp; Location (Synced with Profile)
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Updating these fields synchronizes your canonical student profile records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, firstName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. Anshul"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, lastName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. Khandar"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">Email (Authenticated)</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={formData.personalInfo.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, city: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. Pune"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">Country</label>
                <input
                  type="text"
                  value={formData.personalInfo.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, country: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. India"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.cvDetails.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvDetails: { ...formData.cvDetails, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1">Portfolio / GitHub</label>
                <input
                  type="url"
                  value={formData.cvDetails.portfolio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvDetails: { ...formData.cvDetails, portfolio: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Professional Headline & Summary */}
          <div className="neu-card p-6 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Professional Headline &amp; Summary
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Concise European headline and professional summary. The AI will polish and refine this for your final PDF.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold text-gray-600 uppercase">
                    Professional Headline (Max 100 characters)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {formData.cvDetails.headline.length}/100
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  value={formData.cvDetails.headline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvDetails: { ...formData.cvDetails, headline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. Software Developer Focused on Cloud Systems"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold text-gray-600 uppercase">
                    Core Technical Keywords / Domain Focus
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {formData.cvDetails.keywords.length}/300
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={300}
                  value={formData.cvDetails.keywords}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvDetails: { ...formData.cvDetails, keywords: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red"
                  placeholder="e.g. TypeScript · React · PostgreSQL · Docker · Cloud Architecture"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold text-gray-600 uppercase">
                    Professional Summary / Motivation Pitch (60–100 words, Max 650 characters)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {formData.cvDetails.profileSummary.length}/650
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={650}
                  value={formData.cvDetails.profileSummary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvDetails: { ...formData.cvDetails, profileSummary: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-germany-red leading-relaxed"
                  placeholder="Summarize your academic focus, core technical capabilities, and preparation for rigorous graduate study in Germany..."
                />
              </div>
            </div>
          </div>
        </div>
  );
}
