export interface CatalogueDocument {
  type: string;
  name: string;
  section: 'aps' | 'general' | 'lor_sop_cv' | 'cv' | 'sop' | 'lor' | 'admission' | 'visa';
  category: string;
  description: string;
  required: boolean;
  matchedDocumentTypes?: string[];
}

export const APS_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'passport', name: 'Valid International Passport', section: 'aps', category: 'Identity & Travel', description: 'Scanned copy of valid passport (all pages)', required: true, matchedDocumentTypes: ['passport'] },
  { type: 'aadhaar', name: 'Aadhaar Card / National ID', section: 'aps', category: 'Identity & Travel', description: 'Scanned copy of Aadhaar card (front & back)', required: true, matchedDocumentTypes: ['aadhaar'] },
  { type: 'class10_marksheet', name: 'Class 10 Marksheet', section: 'aps', category: 'Academic Records', description: 'Official Class 10 marksheet from secondary examination board', required: true, matchedDocumentTypes: ['class10_marksheet'] },
  { type: 'class10_certificate', name: 'Class 10 Certificate', section: 'aps', category: 'Academic Records', description: 'Passing certificate for Class 10', required: true, matchedDocumentTypes: ['class10_certificate'] },
  { type: 'class12_marksheet', name: 'Class 12 Marksheet', section: 'aps', category: 'Academic Records', description: 'Official Class 12 marksheet from higher secondary examination board', required: true, matchedDocumentTypes: ['class12_marksheet'] },
  { type: 'class12_certificate', name: 'Class 12 Certificate', section: 'aps', category: 'Academic Records', description: 'Passing certificate for Class 12', required: true, matchedDocumentTypes: ['class12_certificate'] },
  { type: 'bachelors_marksheets', name: "Bachelor's Marksheets", section: 'aps', category: 'Academic Records', description: "All semester/year grade marksheets for Bachelor's degree", required: true, matchedDocumentTypes: ['bachelors_marksheets'] },
  { type: 'aps_application', name: 'APS Application Form', section: 'aps', category: 'APS Compliance', description: 'Completed and signed official APS India application printout', required: true, matchedDocumentTypes: ['aps_application'] },
  { type: 'aps_fee_receipt', name: 'APS Fee Receipt', section: 'aps', category: 'APS Compliance', description: 'Proof of APS application verification fee payment', required: true, matchedDocumentTypes: ['aps_fee_receipt'] },
  { type: 'testas_result', name: 'TestAS Result', section: 'aps', category: 'Standardized Tests', description: 'Official TestAS certificate or score report', required: false, matchedDocumentTypes: ['testas_result'] },
  { type: 'english_certificate', name: 'English Proficiency Certificate', section: 'aps', category: 'Language Proficiency', description: 'IELTS / TOEFL official result certificate', required: false, matchedDocumentTypes: ['english_certificate'] },
  { type: 'german_certificate', name: 'German Proficiency Certificate', section: 'aps', category: 'Language Proficiency', description: 'Goethe-Zertifikat / TestDaF / DSH official score report', required: false, matchedDocumentTypes: ['german_certificate'] },
  { type: 'student_authorization_letter', name: 'Student Authorization Letter', section: 'aps', category: 'Official Letters', description: 'Official consent/authorization letter for document verification', required: false, matchedDocumentTypes: ['student_authorization_letter'] },
];

export const ADMISSION_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'passport', name: 'Valid International Passport', section: 'admission', category: 'Identity & Legal', description: 'Scanned clear copy of your valid international passport (all pages)', required: true, matchedDocumentTypes: ['passport'] },
  { type: 'aadhaar', name: 'National Identity / Aadhaar Card', section: 'admission', category: 'Identity & Legal', description: 'Government-issued national identity card (front & back)', required: false, matchedDocumentTypes: ['aadhaar'] },
  { type: 'class10_marksheet', name: 'Class 10 Marksheet', section: 'admission', category: 'Secondary Education', description: 'Official Class 10 marksheet from your secondary school board', required: true, matchedDocumentTypes: ['class10_marksheet'] },
  { type: 'class10_certificate', name: 'Class 10 Passing Certificate', section: 'admission', category: 'Secondary Education', description: 'Passing certificate for secondary school completion', required: true, matchedDocumentTypes: ['class10_certificate'] },
  { type: 'class12_marksheet', name: 'Class 12 Marksheet', section: 'admission', category: 'Higher Secondary Education', description: 'Official Class 12 / Higher Secondary examination marksheet', required: true, matchedDocumentTypes: ['class12_marksheet'] },
  { type: 'class12_certificate', name: 'Class 12 Passing Certificate', section: 'admission', category: 'Higher Secondary Education', description: 'Higher secondary school completion / provisional certificate', required: true, matchedDocumentTypes: ['class12_certificate'] },
  { type: 'bachelors_marksheets', name: "Bachelor's Marksheets", section: 'admission', category: 'University Higher Education', description: "All semester-wise/annual marksheets for your Bachelor's degree", required: true, matchedDocumentTypes: ['bachelors_marksheets'] },
  { type: 'official_transcripts', name: 'Official Academic Transcripts', section: 'admission', category: 'University Higher Education', description: 'Consolidated official university transcripts signed by registrar', required: true, matchedDocumentTypes: ['official_transcripts'] },
  { type: 'degree_certificate', name: 'Bachelor Degree Certificate (Provisional)', section: 'admission', category: 'University Higher Education', description: 'Final Bachelor Degree or provisional certificate issued by university', required: true, matchedDocumentTypes: ['degree_certificate'] },
  { type: 'aps_application', name: 'APS India Certificate / Form', section: 'admission', category: 'APS Verification', description: 'Academic Evaluation Centre (APS) verification certificate or application proof', required: true, matchedDocumentTypes: ['aps_application', 'aps_certificate'] },
  { type: 'english_certificate', name: 'English Language Test (IELTS / TOEFL)', section: 'admission', category: 'Language Proficiency', description: 'Official test report form (TRF) satisfying minimum band score', required: false, matchedDocumentTypes: ['english_certificate'] },
  { type: 'german_certificate', name: 'German Language Certificate (Goethe / TestDaF)', section: 'admission', category: 'Language Proficiency', description: 'Official German language certificate (A1-C1) where required by programme', required: false, matchedDocumentTypes: ['german_certificate'] },
  { type: 'financial_statement', name: 'Financial Proof / Blocked Account', section: 'admission', category: 'Financial & Relocation', description: 'Proof of German Blocked Account (e.g. Expatrio/Fintiba) or sponsor proof', required: false, matchedDocumentTypes: ['financial_statement'] },
  { type: 'health_insurance', name: 'Health Insurance Proof', section: 'admission', category: 'Financial & Relocation', description: 'Statutory or preparatory travel German health insurance certificate', required: false, matchedDocumentTypes: ['health_insurance'] },
  { type: 'work_experience', name: 'Work Experience / Internship Letter', section: 'admission', category: 'Experience & Other', description: 'Professional experience letters, internships, or service certs', required: false, matchedDocumentTypes: ['work_experience'] },
];

export const VISA_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'passport', name: 'Valid International Passport', section: 'visa', category: 'Identity & Personal', description: 'Valid national passport with at least 2 blank pages, valid for 12+ months beyond departure', required: true, matchedDocumentTypes: ['passport'] },
  { type: 'passport_photo', name: '3 Biometric Passport Photos (35x45mm)', section: 'visa', category: 'Identity & Personal', description: 'Recent biometric passport photos adhering to German consular specifications', required: true, matchedDocumentTypes: ['passport_photo'] },
  { type: 'visa_application_form', name: 'Completed VIDEX Visa Application Form', section: 'visa', category: 'Identity & Personal', description: 'Electronically completed German National Visa form & signed Section 54/55 declaration', required: true, matchedDocumentTypes: ['visa_application_form'] },
  { type: 'admission_letter', name: 'University Admission Letter (Zulassungsbescheid)', section: 'visa', category: 'University & Admission', description: 'Official unconditional admission offer letter from a recognized German university', required: true, matchedDocumentTypes: ['admission_letter'] },
  { type: 'aps_certificate', name: 'Original APS Certificate (India)', section: 'visa', category: 'University & Admission', description: 'Academic Evaluation Centre (APS) verification certificate issued by German Embassy New Delhi', required: true, matchedDocumentTypes: ['aps_application', 'aps_certificate'] },
  { type: 'bachelors_transcripts', name: "Bachelor's Transcripts & Marksheets", section: 'visa', category: 'Academic Documents', description: "All semester marks cards and consolidated transcripts for Bachelor's degree", required: true, matchedDocumentTypes: ['official_transcripts', 'bachelors_marksheets'] },
  { type: 'degree_certificate', name: "Bachelor's Degree Certificate / Provisional", section: 'visa', category: 'Academic Documents', description: 'Final Bachelor Degree parchment or university provisional certificate', required: true, matchedDocumentTypes: ['degree_certificate'] },
  { type: 'school_certificates', name: 'Class 10 & 12 Certificates & Marksheets', section: 'visa', category: 'Academic Documents', description: 'Secondary (Class 10) and Higher Secondary (Class 12) passing certificates & marksheets', required: true, matchedDocumentTypes: ['class12_marksheet', 'class12_certificate', 'class10_marksheet', 'class10_certificate'] },
  { type: 'blocked_account', name: 'German Blocked Account Confirmation (€11,904)', section: 'visa', category: 'Financial Documents', description: 'Official confirmation letter of an approved blocked account proving at least €11,904', required: true, matchedDocumentTypes: ['financial_statement'] },
  { type: 'health_insurance', name: 'Statutory & Travel Health Insurance', section: 'visa', category: 'Health Insurance', description: 'Proof of statutory student health insurance (GKV) or travel health insurance (min €30,000 coverage)', required: true, matchedDocumentTypes: ['health_insurance'] },
  { type: 'cv', name: 'Tabular Curriculum Vitae (Europass Format)', section: 'visa', category: 'Additional Supporting', description: 'Academic Curriculum Vitae generated in German Europass format without gaps', required: true, matchedDocumentTypes: ['cv'] },
  { type: 'language_certificate', name: 'Language Proficiency Certificate', section: 'visa', category: 'Additional Supporting', description: 'Official English (IELTS / TOEFL) or German (Goethe / TestDaF) test report', required: false, matchedDocumentTypes: ['english_certificate', 'german_certificate'] },
  { type: 'motivation_letter_visa', name: 'Statement of Purpose for Visa', section: 'visa', category: 'Additional Supporting', description: 'Personal motivation letter explaining study choice in Germany and post-study plans', required: false, matchedDocumentTypes: ['motivation_letter_visa', 'sop'] },
  { type: 'accommodation_proof', name: 'Proof of Accommodation in Germany', section: 'visa', category: 'Additional Supporting', description: 'Rental agreement, dormitory booking confirmation, or temporary booking', required: false, matchedDocumentTypes: ['accommodation_proof'] },
];

export const GENERAL_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'degree_certificate', name: 'Bachelor Degree Certificate (Provisional)', section: 'general', category: 'Academic Records', description: 'Provisional or original graduation degree certificate from university', required: true, matchedDocumentTypes: ['degree_certificate'] },
  { type: 'official_transcripts', name: 'Official University Transcripts', section: 'general', category: 'Academic Records', description: 'Consolidated official transcripts issued by university registrar', required: true, matchedDocumentTypes: ['official_transcripts'] },
  { type: 'financial_statement', name: 'Financial Proof / Blocked Account Confirmation', section: 'general', category: 'Financial Records', description: 'Confirmation of German blocked account (e.g. Expatrio) or sponsor proof', required: true, matchedDocumentTypes: ['financial_statement'] },
  { type: 'health_insurance', name: 'Health Insurance Confirmation', section: 'general', category: 'Relocation & Visa', description: 'Statutory or preparatory travel German health insurance confirmation', required: false, matchedDocumentTypes: ['health_insurance'] },
  { type: 'work_experience', name: 'Work Experience / Internship Letter', section: 'general', category: 'Employment & Experience', description: 'Professional employment or internship completion certificates', required: false, matchedDocumentTypes: ['work_experience'] },
];

export const LOR_SOP_CV_DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  { type: 'cv', name: 'Curriculum Vitae (CV)', section: 'cv', category: 'Application Dossier', description: 'Academic Curriculum Vitae generated in German Europass format', required: true, matchedDocumentTypes: ['cv'] },
  { type: 'lor', name: 'Letter of Recommendation (LOR)', section: 'lor', category: 'Application Dossier', description: 'Academic recommendation letter from university faculty or research mentor', required: false, matchedDocumentTypes: ['lor'] },
];

// Single combined list of unique document type definitions
export const DOCUMENT_CATALOGUE: CatalogueDocument[] = [
  ...APS_DOCUMENT_CATALOGUE,
  ...ADMISSION_DOCUMENT_CATALOGUE.filter((a) => !APS_DOCUMENT_CATALOGUE.some((aps) => aps.type === a.type)),
  ...VISA_DOCUMENT_CATALOGUE.filter((v) => !APS_DOCUMENT_CATALOGUE.some((aps) => aps.type === v.type) && !ADMISSION_DOCUMENT_CATALOGUE.some((a) => a.type === v.type)),
  ...LOR_SOP_CV_DOCUMENT_CATALOGUE.filter((l) => !APS_DOCUMENT_CATALOGUE.some((aps) => aps.type === l.type)),
];

export const DOCUMENT_TYPE_LABELS: Record<string, { name: string; category: string }> = {
  // APS Checklist
  passport: { name: 'Valid International Passport', category: 'Identity & Travel' },
  aadhaar: { name: 'Aadhaar Card / National ID', category: 'Identity & Travel' },
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

  // Application / Admission Documents
  degree_certificate: { name: 'Bachelor Degree Certificate (Provisional)', category: 'Academic Records' },
  official_transcripts: { name: 'Official University Transcripts', category: 'Academic Records' },
  financial_statement: { name: 'Financial Proof / Blocked Account Confirmation', category: 'Financial Records' },
  health_insurance: { name: 'Health Insurance Confirmation', category: 'Relocation & Visa' },
  work_experience: { name: 'Work Experience / Internship Letter', category: 'Employment & Experience' },

  // Visa Assistance Documents
  passport_photo: { name: '3 Biometric Passport Photos (35x45mm)', category: 'Identity & Personal' },
  visa_application_form: { name: 'Completed VIDEX Visa Application Form', category: 'Identity & Personal' },
  admission_letter: { name: 'University Admission Letter (Zulassungsbescheid)', category: 'University & Admission' },
  accommodation_proof: { name: 'Proof of Accommodation in Germany', category: 'Relocation & Accommodation' },
  motivation_letter_visa: { name: 'Statement of Purpose for Visa', category: 'Visa Application Dossier' },
  aps_certificate: { name: 'Original APS Certificate', category: 'University & Admission' },
  bachelors_transcripts: { name: "Bachelor's Transcripts & Marksheets", category: 'Academic Documents' },
  school_certificates: { name: 'Class 10 & 12 Certificates & Marksheets', category: 'Academic Documents' },
  blocked_account: { name: 'German Blocked Account Confirmation', category: 'Financial Documents' },
  language_certificate: { name: 'Language Proficiency Certificate', category: 'Additional Supporting' },

  // AI Generated Dossier
  cv: { name: 'Curriculum Vitae (CV)', category: 'Curriculum Vitae' },
  sop: { name: 'Statement of Purpose (SOP)', category: 'Motivation Letter' },
  lor: { name: 'Letter of Recommendation (LOR)', category: 'References' },
};

export function formatBytes(bytes: number | string | null | undefined): string {
  if (!bytes) return 'N/A';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num <= 0) return 'N/A';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}
