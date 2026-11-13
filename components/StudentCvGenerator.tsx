"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  Check,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Code2,
  FolderGit2,
  User,
  Camera,
  UploadCloud,
  Image as ImageIcon,
  Layers,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface CvGeneratorProps {
  onBack?: () => void;
}

import {
  CvFormData,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
  AchievementItem,
  LanguageItem,
} from './cv/cv-types';
import { CvProfileTab } from './cv/CvProfileTab';
import { CvEducationTab } from './cv/CvEducationTab';
import { CvExperienceTab } from './cv/CvExperienceTab';
import { CvProjectsTab } from './cv/CvProjectsTab';
import { CvSkillsTab } from './cv/CvSkillsTab';
import { CvExtrasTab } from './cv/CvExtrasTab';
import { CvPhotoTab } from './cv/CvPhotoTab';
import { CvHeaderAlerts } from './cv/CvHeaderAlerts';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export function StudentCvGenerator({ onBack }: CvGeneratorProps) {
  const [formData, setFormData] = useState<CvFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [maxGenerations, setMaxGenerations] = useState(3);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'experience' | 'projects' | 'skills' | 'extras' | 'photo'>('profile');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadProgress, setPhotoUploadProgress] = useState(0);
  const [photoUploadStatusText, setPhotoUploadStatusText] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadCvData = useCallback(async (isPolling = false) => {
    try {
      if (!isPolling) setIsLoading(true);
      const data = await apiFetch<CvFormData>('/student/cv');
      setFormData(data);

      if (data.quota) {
        setMaxGenerations(data.quota.maxGenerations || 3);
        setRemainingAttempts(data.quota.remainingAttempts);
      }

      const jobStatus = data.latestJob?.status;
      if (jobStatus === 'pending' || jobStatus === 'processing') {
        setIsGenerating(true);
      } else {
        setIsGenerating(false);
      }
    } catch (err: any) {
      if (!isPolling) {
        setStatusMessage({ text: err.message || 'Failed to load CV data', type: 'error' });
      }
    } finally {
      if (!isPolling) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCvData();
  }, [loadCvData]);

  // Polling hook when generation is in flight
  useEffect(() => {
    if (isGenerating) {
      pollTimerRef.current = setInterval(async () => {
        try {
          const statusRes = await apiFetch<{
            job: CvFormData['latestJob'];
            document: CvFormData['document'];
            quota?: {
              generationCount: number;
              maxGenerations: number;
              remainingAttempts: number;
              extraAttemptsGranted: boolean;
              canGrantExtra: boolean;
            };
          }>('/student/cv/status');

          if (statusRes.quota) {
            setMaxGenerations(statusRes.quota.maxGenerations || 3);
            setRemainingAttempts(statusRes.quota.remainingAttempts);
          }

          if (statusRes.job) {
            const status = statusRes.job.status;
            if (status === 'completed' || status === 'failed') {
              setIsGenerating(false);
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              loadCvData();
              if (status === 'completed') {
                setStatusMessage({
                  text: 'Your CV has been generated successfully and is now awaiting counsellor verification.',
                  type: 'success',
                });
              } else {
                setStatusMessage({
                  text: `Generation failed: ${statusRes.job.error_message || 'Please check your inputs and try again.'}`,
                  type: 'error',
                });
              }
            }
          }
        } catch (pollErr) {
          console.error('Polling error:', pollErr);
        }
      }, 4000);
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isGenerating, loadCvData]);

  const savePayload = async (dataToSave: CvFormData, showBanner = false) => {
    try {
      setIsSaving(true);
      const payload = {
        firstName: dataToSave.personalInfo.firstName,
        lastName: dataToSave.personalInfo.lastName,
        phone: dataToSave.personalInfo.phone,
        city: dataToSave.personalInfo.city,
        country: dataToSave.personalInfo.country,
        headline: dataToSave.cvDetails.headline,
        keywords: dataToSave.cvDetails.keywords,
        profileSummary: dataToSave.cvDetails.profileSummary,
        linkedin: dataToSave.cvDetails.linkedin,
        portfolio: dataToSave.cvDetails.portfolio,
        photoUrl: dataToSave.cvDetails.photoUrl,
        skills: dataToSave.skills,
        languages: dataToSave.languages,
        education: dataToSave.education,
        experience: dataToSave.experience,
        projects: dataToSave.projects,
        certifications: dataToSave.certifications,
        achievements: dataToSave.achievements,
      };

      const updated = await apiFetch<CvFormData>('/student/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setFormData(updated);
      if (showBanner) {
        setStatusMessage({ text: 'CV details saved and synchronized with your profile.', type: 'success' });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to save CV details', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (showSuccessBanner = true) => {
    if (!formData) return;
    await savePayload(formData, showSuccessBanner);
  };

  const handleDeleteEducation = (idx: number) => {
    if (!formData) return;
    const updated = formData.education.filter((_, i) => i !== idx);
    const next = { ...formData, education: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteExperience = (idx: number) => {
    if (!formData) return;
    const updated = formData.experience.filter((_, i) => i !== idx);
    const next = { ...formData, experience: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteProject = (idx: number) => {
    if (!formData) return;
    const updated = formData.projects.filter((_, i) => i !== idx);
    const next = { ...formData, projects: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteSkill = (sIdx: number) => {
    if (!formData) return;
    const updated = formData.skills.filter((_, i) => i !== sIdx);
    const next = { ...formData, skills: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteLanguage = (lIdx: number) => {
    if (!formData) return;
    const updated = formData.languages.filter((_, i) => i !== lIdx);
    const next = { ...formData, languages: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteCertification = (cIdx: number) => {
    if (!formData) return;
    const updated = formData.certifications.filter((_, i) => i !== cIdx);
    const next = { ...formData, certifications: updated };
    setFormData(next);
    savePayload(next, false);
  };

  const handleDeleteAchievement = (aIdx: number) => {
    if (!formData) return;
    const updated = formData.achievements.filter((_, i) => i !== aIdx);
    const next = { ...formData, achievements: updated };
    setFormData(next);
    savePayload(next, false);
  };

  /**
   * Resizes and center-crops user's photo to a clean 600x600 px square
   * and compresses it to JPEG at 0.90 quality for crisp 300 DPI print clarity.
   */
  const resizeAndCompressPhoto = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to load image. Please provide a valid JPG, PNG, or WebP.'));
        img.onload = () => {
          try {
            const targetSize = 600;
            const canvas = document.createElement('canvas');
            canvas.width = targetSize;
            canvas.height = targetSize;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Canvas 2D context not available.'));
              return;
            }

            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetSize, targetSize);
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatusMessage({ text: 'Please select a valid image file (JPG, PNG, or WebP).', type: 'error' });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setStatusMessage({ text: 'Selected image exceeds 15MB limit. Please choose a smaller photo.', type: 'error' });
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoUploadProgress(15);
    setPhotoUploadStatusText('Resizing & center-cropping photo to 600×600 px...');

    try {
      const compressedDataUrl = await resizeAndCompressPhoto(file);
      setPhotoUploadProgress(40);
      setPhotoUploadStatusText('Optimizing JPEG compression (crisp print clarity)...');

      await new Promise((r) => setTimeout(r, 200));
      setPhotoUploadProgress(65);
      setPhotoUploadStatusText('Uploading to ImageKit (/students/{id}/photo)...');

      const res = await apiFetch<{ photoUrl: string; photoFileId: string; photoFilePath: string }>('/student/cv/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: compressedDataUrl,
          mimeType: 'image/jpeg',
        }),
      });

      setPhotoUploadProgress(100);
      setPhotoUploadStatusText('Photo successfully processed and saved to ImageKit!');

      if (formData) {
        setFormData({
          ...formData,
          cvDetails: {
            ...formData.cvDetails,
            photoUrl: res.photoUrl,
          },
        });
      }

      setStatusMessage({ text: 'Photo uploaded and saved to your German Academic CV!', type: 'success' });
      setTimeout(() => {
        setIsUploadingPhoto(false);
        setPhotoUploadProgress(0);
        setPhotoUploadStatusText('');
        setStatusMessage(null);
      }, 2000);
    } catch (err: any) {
      setIsUploadingPhoto(false);
      setPhotoUploadProgress(0);
      setPhotoUploadStatusText('');
      setStatusMessage({ text: err.message || 'Failed to upload photo.', type: 'error' });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = async () => {
    if (!formData?.cvDetails.photoUrl) return;
    setIsUploadingPhoto(true);
    setPhotoUploadProgress(30);
    setPhotoUploadStatusText('Removing photo from ImageKit and database...');

    try {
      await apiFetch('/student/cv/photo', {
        method: 'DELETE',
      });

      setPhotoUploadProgress(100);
      setFormData({
        ...formData,
        cvDetails: {
          ...formData.cvDetails,
          photoUrl: '',
        },
      });

      setStatusMessage({ text: 'Photo removed from your CV.', type: 'success' });
      setTimeout(() => {
        setIsUploadingPhoto(false);
        setPhotoUploadProgress(0);
        setPhotoUploadStatusText('');
        setStatusMessage(null);
      }, 1500);
    } catch (err: any) {
      setIsUploadingPhoto(false);
      setPhotoUploadProgress(0);
      setPhotoUploadStatusText('');
      setStatusMessage({ text: err.message || 'Failed to remove photo.', type: 'error' });
    }
  };

  const handleGenerate = async () => {
    if (!formData) return;
    if (remainingAttempts <= 0) {
      setStatusMessage({
        text: `You have reached your limit of ${maxGenerations} generation chances. Please ask your counsellor for additional attempts.`,
        type: 'error',
      });
      return;
    }
    setIsGenerating(true);
    setStatusMessage(null);

    try {
      // First save current form state
      await handleSave(false);

      // Trigger generation endpoint
      const result = await apiFetch<{ jobId: string; status: string; message: string }>('/student/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      setRemainingAttempts((prev) => Math.max(0, prev - 1));

      setStatusMessage({
        text: 'Your CV is being generated in the background. You can safely close your browser or navigate away. Your progress is saved.',
        type: 'info',
      });
    } catch (err: any) {
      setIsGenerating(false);
      setStatusMessage({ text: err.message || 'Failed to start CV generation', type: 'error' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
          <p className="text-xs font-bold text-gray-500">Loading CV Generator &amp; Profile...</p>
        </div>
      </div>
    );
  }

  if (!formData) return null;

  const isPendingVerification = formData.document?.status === 'PENDING';
  const isVerified = formData.document?.status === 'VERIFIED';
  const isRejected = formData.document?.status === 'REJECTED';
  const isFailed = formData.latestJob?.status === 'failed';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <CvHeaderAlerts
        formData={formData}
        onBack={onBack}
        remainingAttempts={remainingAttempts}
        maxGenerations={maxGenerations}
        isGenerating={isGenerating}
        isSaving={isSaving}
        isPendingVerification={isPendingVerification}
        isVerified={isVerified}
        isRejected={isRejected}
        isFailed={isFailed}
        statusMessage={statusMessage}
        handleSave={handleSave}
        handleGenerate={handleGenerate}
      />


      {/* Tab Navigation for CV Sections */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#EBE7E0] dark:border-gray-800">
        {[
          { id: 'profile', label: '1. Personal & Summary', icon: User },
          { id: 'education', label: '2. Education', icon: GraduationCap },
          { id: 'experience', label: '3. Experience', icon: Briefcase },
          { id: 'projects', label: '4. Projects', icon: FolderGit2 },
          { id: 'skills', label: '5. Skills & Languages', icon: Code2 },
          { id: 'extras', label: '6. Certs & Awards', icon: Award },
          { id: 'photo', label: '7. Photo & Headshot', icon: Camera },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#151B27] text-germany-black dark:text-white border-t-2 border-t-germany-red border-x border-[#EBE7E0] dark:border-gray-800 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-red' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: PERSONAL & PROFESSIONAL SUMMARY
      ======================================================== */}
      {activeTab === 'profile' && (
        <CvProfileTab
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {activeTab === 'education' && (
        <CvEducationTab
          formData={formData}
          setFormData={setFormData}
          handleDeleteEducation={handleDeleteEducation}
        />
      )}

      {activeTab === 'experience' && (
        <CvExperienceTab
          formData={formData}
          setFormData={setFormData}
          handleDeleteExperience={handleDeleteExperience}
        />
      )}

      {activeTab === 'projects' && (
        <CvProjectsTab
          formData={formData}
          setFormData={setFormData}
          handleDeleteProject={handleDeleteProject}
        />
      )}

      {activeTab === 'skills' && (
        <CvSkillsTab
          formData={formData}
          setFormData={setFormData}
          newSkillInput={newSkillInput}
          setNewSkillInput={setNewSkillInput}
          handleDeleteSkill={handleDeleteSkill}
          handleDeleteLanguage={handleDeleteLanguage}
        />
      )}

      {activeTab === 'extras' && (
        <CvExtrasTab
          formData={formData}
          setFormData={setFormData}
          handleDeleteCertification={handleDeleteCertification}
          handleDeleteAchievement={handleDeleteAchievement}
        />
      )}

      {activeTab === 'photo' && (
        <CvPhotoTab
          formData={formData}
          fileInputRef={fileInputRef}
          isUploadingPhoto={isUploadingPhoto}
          photoUploadStatusText={photoUploadStatusText}
          photoUploadProgress={photoUploadProgress}
          handlePhotoSelect={handlePhotoSelect}
          handleRemovePhoto={handleRemovePhoto}
        />
      )}

      {/* Sticky Bottom Actions Bar */}
      <div className="neu-card p-4 bg-white/95 dark:bg-[#111622]/95 backdrop-blur-md sticky bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EBE7E0] dark:border-gray-800">
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <span className="flex items-center gap-2 text-xs font-extrabold text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Background Generation in Progress...</span>
            </span>
          ) : isPendingVerification ? (
            <span className="flex items-center gap-1.5 text-xs font-extrabold text-amber-700">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Awaiting Counsellor Clearance</span>
            </span>
          ) : isVerified ? (
            <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CV Verified &amp; Ready</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-gray-500">
              Changes are safely saved and synced with your canonical profile.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => handleSave(true)}
            disabled={isSaving || isGenerating}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-gray-300 hover:border-gray-500 text-gray-700 rounded-xl text-xs font-extrabold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Draft</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={isSaving || isGenerating || remainingAttempts <= 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 neu-btn-primary text-xs font-extrabold shadow-md disabled:opacity-60 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-germany-gold" />
                <span>{remainingAttempts <= 0 ? 'Limit Reached (0 left)' : 'Generate CV'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
