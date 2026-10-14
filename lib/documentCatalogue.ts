export interface CatalogueDocument {
  type: string;
  name: string;
  section: 'aps' | 'general';
  category: string;
  description: string;
  required: boolean;
}

export const APS_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'passport', name: 'Passport', section: 'aps', category: 'Identity & Travel', description: 'Scanned copy of valid passport (all pages)', required: true },
  { type: 'aadhaar', name: 'Aadhaar Card', section: 'aps', category: 'Identity & Travel', description: 'Scanned copy of Aadhaar card (front & back)', required: true },
  { type: 'class10_marksheet', name: 'Class 10 Marksheet', section: 'aps', category: 'Academic Records', description: 'Official Class 10 marksheet from secondary examination board', required: true },
  { type: 'class10_certificate', name: 'Class 10 Certificate', section: 'aps', category: 'Academic Records', description: 'Passing certificate for Class 10', required: true },
  { type: 'class12_marksheet', name: 'Class 12 Marksheet', section: 'aps', category: 'Academic Records', description: 'Official Class 12 marksheet from higher secondary examination board', required: true },
  { type: 'class12_certificate', name: 'Class 12 Certificate', section: 'aps', category: 'Academic Records', description: 'Passing certificate for Class 12', required: true },
  { type: 'bachelors_marksheets', name: "Bachelor's Marksheets", section: 'aps', category: 'Academic Records', description: "All semester/year grade marksheets for Bachelor's degree", required: true },
  { type: 'aps_application', name: 'APS Application Form', section: 'aps', category: 'APS Compliance', description: 'Completed and signed official APS India application printout', required: true },
  { type: 'aps_fee_receipt', name: 'APS Fee Receipt', section: 'aps', category: 'APS Compliance', description: 'Proof of APS application verification fee payment', required: true },
  { type: 'testas_result', name: 'TestAS Result', section: 'aps', category: 'Standardized Tests', description: 'Official TestAS certificate or score report', required: false },
  { type: 'english_certificate', name: 'English Proficiency Certificate', section: 'aps', category: 'Language Proficiency', description: 'IELTS / TOEFL official result certificate', required: false },
  { type: 'german_certificate', name: 'German Proficiency Certificate', section: 'aps', category: 'Language Proficiency', description: 'Goethe-Zertifikat / TestDaF / DSH official score report', required: false },
  { type: 'student_authorization_letter', name: 'Student Authorization Letter', section: 'aps', category: 'Official Letters', description: 'Official consent/authorization letter for document verification', required: false },
];

export const GENERAL_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'degree_certificate', name: 'Bachelor Degree Certificate (Provisional)', section: 'general', category: 'Academic Records', description: 'Provisional or original graduation degree certificate from university', required: true },
  { type: 'official_transcripts', name: 'Official University Transcripts', section: 'general', category: 'Academic Records', description: 'Consolidated official transcripts issued by university registrar', required: true },
  { type: 'financial_statement', name: 'Financial Proof / Blocked Account Confirmation', section: 'general', category: 'Financial Records', description: 'Confirmation of German blocked account (e.g. Expatrio) or sponsor proof', required: true },
  { type: 'health_insurance', name: 'Health Insurance Confirmation', section: 'general', category: 'Relocation & Visa', description: 'Statutory or preparatory travel German health insurance confirmation', required: false },
  { type: 'work_experience', name: 'Work Experience / Internship Letter', section: 'general', category: 'Employment & Experience', description: 'Professional employment or internship completion certificates', required: false },
];

export const DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  ...APS_DOCUMENT_CATALOGUE,
  ...GENERAL_DOCUMENT_CATALOGUE,
];

export const DOCUMENT_TYPE_LABELS: Record<string, { name: string; category: string }> = {
  passport: { name: 'Passport', category: 'Identity & Travel' },
  aadhaar: { name: 'Aadhaar Card', category: 'Identity & Travel' },
  class10_marksheet: { name: 'Class 10 Marksheet', category: 'Academic Records' },
  class10_certificate: { name: 'Class 10 Certificate', category: 'Academic Records' },
  class12_marksheet: { name: 'Class 12 Marksheet', category: 'Academic Records' },
  class12_certificate: { name: 'Class 12 Certificate', category: 'Academic Records' },
  bachelors_marksheets: { name: "Bachelor's Marksheets", category: 'Academic Records' },
  testas_result: { name: 'TestAS Result', category: 'Standardized Tests' },
  english_certificate: { name: 'English Proficiency Certificate', category: 'Language Proficiency' },
  german_certificate: { name: 'German Proficiency Certificate', category: 'Language Proficiency' },
  aps_application: { name: 'APS Application Form', category: 'APS Compliance' },
  aps_fee_receipt: { name: 'APS Fee Receipt', category: 'APS Compliance' },
  student_authorization_letter: { name: 'Student Authorization Letter', category: 'Official Letters' },
  cv: { name: 'Curriculum Vitae (CV)', category: 'Curriculum Vitae' },
  sop: { name: 'Statement of Purpose (SOP)', category: 'Motivation Letter' },
  lor: { name: 'Letter of Recommendation (LOR)', category: 'References' },
  degree_certificate: { name: 'Bachelor Degree Certificate (Provisional)', category: 'Academic Records' },
  official_transcripts: { name: 'Official University Transcripts', category: 'Academic Records' },
  financial_statement: { name: 'Financial Proof / Blocked Account Confirmation', category: 'Financial Records' },
  health_insurance: { name: 'Health Insurance Confirmation', category: 'Relocation & Visa' },
  work_experience: { name: 'Work Experience / Internship Letter', category: 'Employment & Experience' },
};

export function formatBytes(bytes: number | string | null | undefined): string {
  if (!bytes) return 'N/A';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num <= 0) return 'N/A';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}
