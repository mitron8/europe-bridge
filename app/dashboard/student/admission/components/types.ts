export interface DocumentItem {
  type: string;
  category: string;
  title: string;
  description: string;
  required: boolean;
  isAiGenerated: boolean;
  status: 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_GENERATED' | 'GENERATING' | 'FAILED';
  uploadedAt: string | null;
  url: string | null;
  originalFilename: string | null;
  rejectionNote: string | null;
}

export interface ProgrammeSopItem {
  recommendationId: string;
  programmeId: number | null;
  universityName: string;
  programName: string;
  degree?: string;
  deadline?: string;
  documentId: string | null;
  status: 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_GENERATED' | 'GENERATING' | 'FAILED';
  url: string | null;
  originalFilename: string | null;
  rejectionNote: string | null;
  uploadedAt: string | null;
}

export interface ApplicationItem {
  id: string;
  recommendationId: string;
  programmeId: number | null;
  universityName: string;
  programmeName: string;
  degree: string;
  location: string;
  portalUrl: string;
  applicationId: string;
  applicationStatus: string;
  submissionDate: string | null;
  deadline: string | null;
  counsellorNotes: string;
  hasCredentials: boolean;
  updatedAt: string;
}

export const STATUS_BADGES: Record<string, { label: string; style: string }> = {
  VERIFIED: { label: 'Verified & Certified', style: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' },
  PENDING: { label: 'Pending Review', style: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800' },
  REJECTED: { label: 'Action Required', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
  MISSING: { label: 'Not Uploaded', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700' },
  NOT_GENERATED: { label: 'Not Generated', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700' },
  GENERATING: { label: 'Generating AI Draft...', style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800' },
  FAILED: { label: 'Generation Failed', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
};

export const APP_STATUS_STYLES: Record<string, { label: string; style: string }> = {
  NOT_STARTED: { label: 'Not Started', style: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700' },
  IN_PROGRESS: { label: 'In Progress', style: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800' },
  SUBMITTED: { label: 'Submitted', style: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800' },
  ACCEPTED: { label: 'Offer Received', style: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' },
  REJECTED: { label: 'Unsuccessful', style: 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800' },
  WAITLISTED: { label: 'Waitlisted', style: 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800' },
};
