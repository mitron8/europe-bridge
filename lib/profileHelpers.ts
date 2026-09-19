export const DEGREE_TYPE_OPTIONS = [
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Science (B.Sc.)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Arts (B.A.)",
  "Bachelor's Degree (Other)",
  "Master of Technology (M.Tech)",
  "Master of Science (M.Sc.)",
  "Master of Business Administration (MBA)",
  "Master of Computer Applications (MCA)",
  "Diploma",
  "High School Diploma",
  "Other"
];

/**
 * Normalizes degreeType so that Bachelor's degree records explicitly contain
 * the word "Bachelor" (case-insensitive), matching backend profile completion checks
 * (edu.degree_type.toLowerCase().includes('bachelor')).
 */
export function normalizeDegreeType(deg?: string | null, level?: string | null): string {
  if (!deg) return '';
  const trimmed = deg.trim();
  const lower = trimmed.toLowerCase();

  if (lower === 'bba' || lower === 'b.b.a' || lower === 'b.b.a.') {
    return 'Bachelor of Business Administration (BBA)';
  }
  if (lower === 'b.tech' || lower === 'btech' || lower === 'b tech') {
    return 'Bachelor of Technology (B.Tech)';
  }
  if (lower === 'b.e.' || lower === 'be' || lower === 'b e') {
    return 'Bachelor of Engineering (B.E.)';
  }
  if (lower === 'b.sc.' || lower === 'bsc' || lower === 'b.sc' || lower === 'b sc') {
    return 'Bachelor of Science (B.Sc.)';
  }
  if (lower === 'bca' || lower === 'b.c.a' || lower === 'b.c.a.') {
    return 'Bachelor of Computer Applications (BCA)';
  }
  if (lower === 'b.com' || lower === 'bcom' || lower === 'b.com.') {
    return 'Bachelor of Commerce (B.Com)';
  }
  if (lower === 'b.a.' || lower === 'ba' || lower === 'b.a') {
    return 'Bachelor of Arts (B.A.)';
  }

  // If the student selected Bachelor's as education level, ensure the string has "Bachelor"
  const isBachelorsLevel = level === "Bachelor's" || (level && level.toLowerCase().includes('bachelor'));
  if (isBachelorsLevel && !lower.includes('bachelor')) {
    return `${trimmed} (Bachelor's)`;
  }

  return trimmed;
}
