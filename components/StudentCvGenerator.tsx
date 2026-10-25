"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileText,
  Sparkles,
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
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export interface CvGeneratorProps {
  onBack?: () => void;
}

interface EducationItem {
  id?: string;
  educationLevel?: string;
  degreeType?: string;
  fieldOfStudy?: string;
  specialization?: string;
  institutionName?: string;
  institutionCountry?: string;
  startYear?: number | null;
  endYear?: number | null;
  score?: number | null;
  scale?: number | null;
  germanGrade?: number | null;
  isIncluded?: boolean;
}

interface ExperienceItem {
  id?: string;
  companyName?: string;
  jobTitle?: string;
  employmentType?: string;
  industry?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  isIncluded?: boolean;
}

interface ProjectItem {
  id?: string;
  title?: string;
  role?: string;
  technologies?: string[] | string;
  startDate?: string;
  endDate?: string;
  url?: string;
  description?: string;
  isIncluded?: boolean;
}

interface CertificationItem {
  id?: string;
  name?: string;
  issuer?: string;
  issueDate?: string;
  url?: string;
  isIncluded?: boolean;
}

interface AchievementItem {
  id?: string;
  title?: string;
  date?: string;
  description?: string;
  isIncluded?: boolean;
}

interface LanguageItem {
  name: string;
  level: string;
}

interface CvFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
  };
  cvDetails: {
    headline: string;
    keywords: string;
    profileSummary: string;
    linkedin: string;
    portfolio: string;
    photoUrl: string;
  };
  skills: string[];
  languages: LanguageItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  latestJob?: {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    error_message?: string | null;
    model_used?: string;
    total_tokens?: number;
    created_at?: string;
  } | null;
  document?: {
    id: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    originalFilename?: string;
    url?: string | null;
    uploadedAt?: string;
    verifiedAt?: string;
    rejectionNote?: string | null;
    isVerified?: boolean;
    isPendingVerification?: boolean;
    isRejected?: boolean;
  } | null;
}

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
          }>('/student/cv/status');

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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neu-card p-6 md:p-8 bg-white relative shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* German Tricolor Header Line */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  title="Back to Document Hub"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-germany-gold" />
                <span>AI CV Generator</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black">
              Academic Curriculum Vitae (CV)
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-2xl">
              German university format (Europass two-column standard). Profile data is automatically synchronized, and your final generated PDF is reviewed and verified by your assigned EuroBridge counsellor.
            </p>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving || isGenerating}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 rounded-xl text-xs font-extrabold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-germany-red" /> : <Save className="w-4 h-4 text-gray-500" />}
              <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isSaving || isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 neu-btn-primary text-xs font-extrabold shadow-md disabled:opacity-60 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-germany-gold" />
                  <span>Generate CV</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generation Status & Verification Alerts */}
      {isGenerating && (
        <div className="neu-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-800">Your CV is being generated</h3>
            <p className="text-xs font-bold text-blue-700 mt-1">
              Our durable background engine is formulating your summary, structuring experience bullets, and compiling the registered HTML template.
            </p>
            <p className="text-[11px] font-extrabold text-blue-600/90 mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>You can close your browser or navigate away. Your document generation will safely persist and complete on our servers.</span>
            </p>
          </div>
        </div>
      )}

      {isPendingVerification && !isGenerating && (
        <div className="neu-card p-5 bg-amber-50/90 border border-amber-200 text-amber-900 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-800">CV Generated • Pending Counsellor Review</h3>
              <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-extrabold">In Review</span>
            </div>
            <p className="text-xs font-bold text-amber-700 mt-1">
              Your academic CV has been generated and queued for counsellor verification. To maintain strict German application quality standards, official downloads are released upon counsellor sign-off.
            </p>
            <p className="text-[11px] font-medium text-amber-600 mt-1">
              Generated: {formData.document?.uploadedAt ? new Date(formData.document.uploadedAt).toLocaleString() : 'Recently'}
            </p>
          </div>
        </div>
      )}

      {isVerified && !isGenerating && (
        <div className="neu-card p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800">Verified &amp; Approved</h3>
                <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full text-[10px] font-extrabold">Ready for Submission</span>
              </div>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">
                Your counsellor has verified your academic CV. It is officially certified for uni-assist and university portal uploads.
              </p>
            </div>
            {formData.document?.url && (
              <a
                href={formData.document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View &amp; Download PDF</span>
              </a>
            )}
          </div>
        </div>
      )}

      {isRejected && !isGenerating && (
        <div className="neu-card p-5 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-800">Revision Requested by Counsellor</h3>
            <p className="text-xs font-bold text-red-700 mt-1">
              Note: {formData.document?.rejectionNote || 'Please update your details and re-generate your CV.'}
            </p>
          </div>
        </div>
      )}

      {isFailed && !isGenerating && (
        <div className="neu-card p-5 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-start gap-3.5 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-red-800">Generation Issue</h3>
              <p className="text-xs font-bold text-red-700 mt-0.5">
                {formData.latestJob?.error_message || 'An error occurred during CV compilation. Please try again.'}
              </p>
            </div>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Generation</span>
            </button>
          </div>
        </div>
      )}

      {/* Temporary Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Tab Navigation for CV Sections */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#EBE7E0]">
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
                  ? 'bg-white text-germany-black border-t-2 border-t-germany-red border-x border-[#EBE7E0] shadow-xs'
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
        <div className="space-y-6">
          {/* Identity & Canonical Profile */}
          <div className="neu-card p-6 bg-white space-y-4">
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Professional Headline & Summary */}
          <div className="neu-card p-6 bg-white space-y-4">
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red leading-relaxed"
                  placeholder="Summarize your academic focus, core technical capabilities, and preparation for rigorous graduate study in Germany..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: EDUCATION (SYNCED)
      ======================================================== */}
      {activeTab === 'education' && (
        <div className="neu-card p-6 bg-white space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
                Education Records
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Synced with your student education history. Uncheck &quot;Include in CV&quot; to omit from this CV without deleting from your profile.
              </p>
            </div>
            <button
              onClick={() => {
                const newEdu: EducationItem = {
                  institutionName: '',
                  degreeType: "Bachelor's",
                  fieldOfStudy: '',
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
                        placeholder="e.g. Pune University"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Degree / Qualification
                      </label>
                      <input
                        type="text"
                        value={edu.degreeType || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], degreeType: e.target.value };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
                        placeholder="e.g. Bachelor of Engineering"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy || ''}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = { ...updated[idx], fieldOfStudy: e.target.value };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
                        placeholder="e.g. Computer Science"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: EXPERIENCE & INTERNSHIPS (SYNCED)
      ======================================================== */}
      {activeTab === 'experience' && (
        <div className="neu-card p-6 bg-white space-y-5">
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 disabled:bg-gray-100"
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
                      className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 leading-relaxed"
                      placeholder="Built backend REST APIs with NestJS, optimized database queries, collaborated with senior engineers..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: PROJECTS (VARIABLE LENGTH)
      ======================================================== */}
      {activeTab === 'projects' && (
        <div className="neu-card p-6 bg-white space-y-5">
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                        className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800"
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
                      className="w-full px-3 py-2 bg-white border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 leading-relaxed"
                      placeholder="Designed resilient background jobs with atomic row locking, built REST API gateway..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: SKILLS & LANGUAGES
      ======================================================== */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Technical Skills */}
          <div className="neu-card p-6 bg-white space-y-4">
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
                className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-germany-red"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl text-xs font-extrabold text-gray-700 shadow-2xs"
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
          <div className="neu-card p-6 bg-white space-y-4">
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
                <div key={lIdx} className="flex items-center gap-3 p-3 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => {
                        const updated = [...formData.languages];
                        updated[lIdx] = { ...updated[lIdx], name: e.target.value };
                        setFormData({ ...formData, languages: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
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
                      className="w-full px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
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
      )}

      {/* ========================================================
          TAB 6: CERTIFICATIONS & ACHIEVEMENTS
      ======================================================== */}
      {activeTab === 'extras' && (
        <div className="space-y-6">
          {/* Certifications */}
          <div className="neu-card p-6 bg-white space-y-4">
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
                  <div key={cert.id || cIdx} className="p-3 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl space-y-2">
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
                        className="sm:col-span-2 px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
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
                        className="px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="neu-card p-6 bg-white space-y-4">
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
                  <div key={ach.id || aIdx} className="p-3 bg-[#FDFBF7] border border-[#EBE7E0] rounded-xl space-y-2">
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
                        className="sm:col-span-2 px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
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
                        className="px-3 py-1.5 bg-white border border-[#EBE7E0] rounded-lg text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: PHOTO & PRESENTATION
      ======================================================== */}
      {activeTab === 'photo' && (
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
      )}

      {/* Sticky Bottom Actions Bar */}
      <div className="neu-card p-4 bg-white/95 backdrop-blur-md sticky bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EBE7E0]">
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
            disabled={isSaving || isGenerating}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 neu-btn-primary text-xs font-extrabold shadow-md disabled:opacity-60 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-germany-gold" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-germany-gold" />
                <span>Generate CV</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
