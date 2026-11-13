export interface EducationItem {
  id?: string;
  degree?: string;
  course?: string;
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

export interface ExperienceItem {
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

export interface ProjectItem {
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

export interface CertificationItem {
  id?: string;
  name?: string;
  issuer?: string;
  issueDate?: string;
  url?: string;
  isIncluded?: boolean;
}

export interface AchievementItem {
  id?: string;
  title?: string;
  date?: string;
  description?: string;
  isIncluded?: boolean;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface CvFormData {
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
    createdAt?: string;
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
  quota?: {
    generationCount: number;
    maxGenerations: number;
    remainingAttempts: number;
    extraAttemptsGranted: boolean;
    canGrantExtra: boolean;
  };
}
