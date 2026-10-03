export type ProfileSection =
  | 'personal'
  | 'education'
  | 'tests'
  | 'experience'
  | 'preferences'
  | 'finance';

export interface EducationRecord {
  id: string;
  educationLevel: 'High School' | 'Diploma' | "Bachelor's" | "Master's" | 'PhD' | 'Other' | '';
  degreeType: string;
  fieldOfStudy: string;
  specialization: string;
  institutionName: string;
  institutionCountry: string;
  startYear: number | '';
  endYear: number | '';
  academicStatus: 'Currently Studying' | 'Graduated' | 'Discontinued' | 'Other' | '';
  currentSemester: number | '';
  gradingSystem: 'CGPA/10' | 'CGPA/4' | 'Percentage' | 'Grade' | 'Other' | '';
  score: number | '';
  scale: number | '';
  backlogs: number | '';
}

export interface EnglishTestScores {
  overall: number | '';
  reading: number | '';
  listening: number | '';
  speaking: number | '';
  writing: number | '';
  toeflLegacyTotal?: number | '';
}

export interface EnglishTest {
  id: string;
  testType: 'IELTS' | 'TOEFL' | '';
  testDate: string;
  scoreScale: '9_BAND' | '1_6' | '0_120' | '';
  scores: EnglishTestScores;
}

export interface StandardizedTest {
  id: string;
  testType: 'GRE' | 'GMAT' | 'Other' | '';
  testDate: string;
  overallScore: number | '';
  quantScore: number | '';
  verbalScore: number | '';
  awaScore: number | '';
}

export interface ExperienceRecord {
  id: string;
  companyName: string;
  jobTitle: string;
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance' | 'Contract' | 'Other' | '';
  industry: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface ProfileData {
  // Calculated on backend
  completionPercentage: number;
  sectionCompletion: Record<string, boolean>;

  // From users table — read-only, populated from GET /student/profile
  firstName: string;
  lastName: string;
  email: string;

  // From student_profiles — editable via PATCH /student/profile
  middleName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say' | '';
  nationality: string;

  phone: string;
  whatsapp: string;
  addressLine: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;

  passportAvailable: boolean;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuingCountry: string;

  englishProficiencyState: 'NO' | 'LEVEL' | '';
  germanProficiencyState: 'NO' | 'LEVEL' | '';

  germanLevel: 'None' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | '';
  germanCertificateType: 'Goethe' | 'TELC' | 'TestDaF' | 'DSH' | 'Other' | 'None' | '';

  intendedDegreeLevel: "Bachelor's" | "Master's" | 'PhD' | 'Diploma' | 'Other' | '';
  preferredFieldOfStudy: string;
  preferredSpecialization: string;
  intakeSeason: 'WINTER' | 'SUMMER' | '';
  intakeYear: number | '';
  preferredUniversities: string[];
  universityType: 'Public' | 'Private' | 'Both' | '';
  studyMode: 'On-Campus' | 'Hybrid' | 'Online' | '';

  fundingPreference: 'Self-funded' | 'Family-funded' | 'Education Loan' | 'Scholarship' | 'Combination' | '';
  maxTuitionBudget: number | '';
  blockedAccountReady: boolean;

  skills: string[];

  // Child tables
  educationRecords: EducationRecord[];
  englishTests: EnglishTest[];
  standardizedTests: StandardizedTest[];
  experienceRecords: ExperienceRecord[];
}

// Used only as loading placeholder while GET /student/profile is in flight.
// Never used as fallback for persistence.
export const emptyProfile: ProfileData = {
  completionPercentage: 0,
  sectionCompletion: {
    personal: false,
    education: false,
    tests: false,
    experience: false,
    preferences: false,
    finance: false,
  },
  firstName: '',
  lastName: '',
  email: '',

  middleName: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',

  phone: '',
  whatsapp: '',
  addressLine: '',
  city: '',
  stateProvince: '',
  country: '',
  postalCode: '',

  passportAvailable: false,
  passportNumber: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  passportIssuingCountry: '',

  englishProficiencyState: '',
  germanProficiencyState: '',

  germanLevel: '',
  germanCertificateType: '',

  intendedDegreeLevel: '',
  preferredFieldOfStudy: '',
  preferredSpecialization: '',
  intakeSeason: '',
  intakeYear: '',
  preferredUniversities: [],
  universityType: '',
  studyMode: '',

  fundingPreference: '',
  maxTuitionBudget: '',
  blockedAccountReady: false,

  skills: [],
  educationRecords: [],
  englishTests: [],
  standardizedTests: [],
  experienceRecords: [],
};
