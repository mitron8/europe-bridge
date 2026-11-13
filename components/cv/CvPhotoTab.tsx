'use client';

import React from 'react';
import { Camera, Trash2, ShieldCheck, UploadCloud, Image as ImageIcon, Loader2, User } from 'lucide-react';
import { CvFormData } from './cv-types';

export interface CvPhotoTabProps {
  formData: CvFormData;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploadingPhoto: boolean;
  photoUploadStatusText: string;
  photoUploadProgress: number;
  handlePhotoSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemovePhoto: () => void;
}

export function CvPhotoTab({
  formData,
  fileInputRef,
  isUploadingPhoto,
  photoUploadStatusText,
  photoUploadProgress,
  handlePhotoSelect,
  handleRemovePhoto,
}: CvPhotoTabProps) {
  return (
        <div className="space-y-6">
          <div className="neu-card p-6 md:p-8 bg-white space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-germany-red" />
                <h2 className="text-base font-black uppercase tracking-wider text-gray-700">
                  Academic Headshot Photo
                </h2>
              </div>
              <p className="text-xs font-bold text-gray-500 mt-1 max-w-2xl">
                German Europass format features an academic portrait in the top-left sidebar. Upload a professional headshot with neutral background. The photo is automatically center-cropped to 1:1, compressed for high-resolution 300 DPI print, and stored securely in ImageKit under your student folder.
              </p>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {/* Upload Progress Bar */}
            {isUploadingPhoto && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-900">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-germany-red" />
                    <span>{photoUploadStatusText}</span>
                  </span>
                  <span>{photoUploadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-germany-red to-germany-gold rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${photoUploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live German CV Sidebar Preview */}
              <div className="lg:col-span-5 bg-[#183b52] text-white p-6 rounded-2xl shadow-md space-y-5 text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white/90 border border-white/20">
                  <span>CV Sidebar Live Preview</span>
                </div>

                {/* 43mm circular frame matching template */}
                <div className="w-36 h-36 rounded-full overflow-hidden bg-[#edf1f3] border-4 border-white/80 shadow-inner flex items-center justify-center relative group">
                  {formData.cvDetails.photoUrl ? (
                    <img
                      src={formData.cvDetails.photoUrl}
                      alt="Student CV Headshot"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 gap-1">
                      <User className="w-12 h-12 text-[#183b52]/40" />
                      <span className="text-[10px] font-bold text-gray-500">No Photo</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">
                    {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </h3>
                  <p className="text-[11px] font-bold text-white/70">
                    {formData.cvDetails.headline || 'Software Developer & Cloud Specialist'}
                  </p>
                  <p className="text-[10px] text-white/50 pt-1">
                    {[formData.personalInfo.city, formData.personalInfo.country].filter(Boolean).join(', ') || 'Germany'}
                  </p>
                </div>

                <div className="text-[10px] font-bold text-white/60 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 w-full text-center">
                  Sidebar Standard: 43mm Circular Crop @ 300 DPI
                </div>
              </div>

              {/* Right Column: Upload Actions & Guidelines */}
              <div className="lg:col-span-7 space-y-5">
                <div className="p-6 border-2 border-dashed border-[#EBE7E0] hover:border-germany-red/40 rounded-2xl bg-[#FDFBF7] space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-germany-red/10 text-germany-red mx-auto flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-germany-black">
                      {formData.cvDetails.photoUrl ? 'Update Your Photo' : 'Upload Your Professional Portrait'}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold">
                      PNG, JPG, or WebP up to 15MB. Automatically cropped to 1:1 and compressed.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="px-5 py-2.5 neu-btn-primary text-xs font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{formData.cvDetails.photoUrl ? 'Choose New Photo' : 'Select Photo to Upload'}</span>
                    </button>

                    {formData.cvDetails.photoUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        disabled={isUploadingPhoto}
                        className="px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove Photo</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* German Application Guidelines */}
                <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2 text-germany-black font-extrabold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>German Academic &amp; Industry Standards (Bewerbungsfoto)</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] font-bold text-gray-500">
                    <li>Front-facing business portrait from the chest up.</li>
                    <li>Neutral, uncluttered, light-toned background (white, light gray, soft blue).</li>
                    <li>Professional attire suitable for university admission and research labs.</li>
                    <li>Even, soft lighting without heavy shadows or sunglasses.</li>
                    <li>Optional for admissions, but strongly recommended by German universities.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
