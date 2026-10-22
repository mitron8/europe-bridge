export type DegreeLevel = 'Masters' | 'Bachelors' | 'MBA' | 'PhD';

export type UniversityTier = 'TU9' | 'Public Research' | 'UAS (HAW)' | 'Private';

export type AdmissionMode = 'Non-NC (Open)' | 'NC (Restricted)' | 'Aptitude Assessment';

export type LanguageOfInstruction = 'English (100%)' | 'Bilingual (EN + DE)' | 'German (100%)';

export type IntakeSemester = 'Winter' | 'Summer' | 'Both';

export type FieldOfStudy = 
  | 'Computer Science & AI'
  | 'Data Science & Analytics'
  | 'Mechanical & Automotive'
  | 'Electrical & Embedded Systems'
  | 'Industrial & Systems Engineering'
  | 'Civil & Environmental'
  | 'Business, Economics & MBA'
  | 'Biotechnology & Life Sciences';

export interface Course {
  id: string;
  title: string;
  slug: string;
  degree: DegreeLevel;
  degreeTitle: string; // e.g. "Master of Science (M.Sc.)"
  university: string;
  universityShort: string; // e.g. "TUM", "RWTH"
  universityTier: UniversityTier;
  city: string;
  state: string; // e.g. "Bavaria", "North Rhine-Westphalia"
  field: FieldOfStudy;
  subdiscipline: string; // e.g. "Autonomous Systems", "Renewable Energy"
  language: LanguageOfInstruction;
  tuitionFeePerSemester: number; // 0 for tuition-free
  semesterTicketFee: number; // e.g. ~150-350€ includes public transit
  durationSemesters: number; // e.g. 4
  ectsCredits: number; // e.g. 120
  intake: IntakeSemester;
  winterDeadline: string; // e.g. "May 31 (Non-EU) / July 15"
  summerDeadline?: string; // e.g. "Nov 30 / Jan 15"
  admissionMode: AdmissionMode;
  minGermanGpa: number; // e.g. 2.0 (Bavarian scale, lower is better)
  ieltsRequirement: number; // e.g. 6.5
  toeflRequirement: number; // e.g. 88
  germanRequirement?: string; // e.g. "None (A1 recommended by 2nd sem)" or "B2 TestDaF"
  apsRequired: boolean;
  greRequired: 'No' | 'Optional' | 'Mandatory';
  description: string;
  curriculumHighlights: string[];
  careerOutcomes: {
    averageSalary: string; // e.g. "€58,000 – €68,000 / year"
    topRoles: string[]; // e.g. ["Machine Learning Engineer", "Robotics Specialist"]
    topCompanies: string[]; // e.g. ["Siemens", "BMW", "SAP", "Infineon"]
  };
  officialUrl: string;
  featured?: boolean;
}

export interface CourseFilterState {
  searchQuery: string;
  degreeLevels: DegreeLevel[];
  fields: FieldOfStudy[];
  tuitionFilter: 'all' | 'free' | 'nominal';
  languages: LanguageOfInstruction[];
  admissionModes: AdmissionMode[];
  universityTiers: UniversityTier[];
  intakes: ('Winter' | 'Summer')[];
  selectedCities: string[];
  maxGpa?: number;
  sortBy: 'recommended' | 'tuition-asc' | 'gpa-asc' | 'deadline' | 'title-asc' | 'university-asc';
}
