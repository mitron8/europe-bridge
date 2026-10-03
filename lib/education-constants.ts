export interface CanonicalOption {
  id: string;
  label: string;
  category?: string;
  aliases: string[];
  allowedFieldCategories?: string[]; // Used for Degree Types to filter Field of Study
}

export const DEGREE_TYPE_OPTIONS: CanonicalOption[] = [
  { id: 'bachelor_engineering_technology', label: 'Bachelor of Engineering / Technology (B.E. / B.Tech. / B.Eng.)', category: 'Bachelor', aliases: ['BE', 'B.E.', 'BTech', 'B.Tech', 'BEng', 'B.Eng.', 'Bachelor of Engineering', 'Bachelor of Technology'], allowedFieldCategories: ['Computing', 'Engineering & Technology', 'Architecture & Built Environment', 'Mathematics & Natural Sciences', 'Interdisciplinary / Other'] },
  { id: 'bachelor_science', label: 'Bachelor of Science (B.Sc.)', category: 'Bachelor', aliases: ['BSc', 'B.Sc.', 'BS', 'B.S.', 'Bachelor of Science'], allowedFieldCategories: ['Computing', 'Mathematics & Natural Sciences', 'Medicine & Health', 'Agriculture / Forestry / Veterinary', 'Business & Economics', 'Social Sciences', 'Interdisciplinary / Other'] },
  { id: 'bachelor_arts', label: 'Bachelor of Arts (B.A.)', category: 'Bachelor', aliases: ['BA', 'B.A.', 'AB', 'A.B.', 'Bachelor of Arts'], allowedFieldCategories: ['Humanities & Languages', 'Social Sciences', 'Communication & Media', 'Arts / Design / Creative', 'Education', 'Business & Economics', 'Interdisciplinary / Other'] },
  { id: 'bachelor_computer_applications', label: 'Bachelor of Computer Applications (B.C.A.)', category: 'Bachelor', aliases: ['BCA', 'B.C.A.', 'Bachelor of Computer Applications'], allowedFieldCategories: ['Computing', 'Interdisciplinary / Other', 'Business & Economics', 'Mathematics & Natural Sciences'] },
  { id: 'bachelor_business_administration', label: 'Bachelor of Business Administration / Commerce (B.B.A. / B.Com.)', category: 'Bachelor', aliases: ['BBA', 'B.B.A.', 'BCom', 'B.Com.', 'Bachelor of Business Administration', 'Bachelor of Commerce'], allowedFieldCategories: ['Business & Economics', 'Computing', 'Communication & Media', 'Social Sciences', 'Interdisciplinary / Other'] },
  { id: 'bachelor_architecture_design', label: 'Bachelor of Architecture / Design (B.Arch. / B.Des.)', category: 'Bachelor', aliases: ['BArch', 'B.Arch.', 'BDes', 'B.Des.', 'Bachelor of Architecture', 'Bachelor of Design'], allowedFieldCategories: ['Architecture & Built Environment', 'Arts / Design / Creative', 'Engineering & Technology', 'Interdisciplinary / Other'] },
  { id: 'bachelor_pharmacy_nursing', label: 'Bachelor of Pharmacy / Nursing (B.Pharm. / B.Sc. Nursing)', category: 'Bachelor', aliases: ['BPharm', 'B.Pharm.', 'B.Sc. Nursing', 'Bachelor of Pharmacy', 'Bachelor of Nursing'], allowedFieldCategories: ['Medicine & Health', 'Mathematics & Natural Sciences', 'Interdisciplinary / Other'] },
  { id: 'bachelor_law', label: 'Bachelor of Laws (LL.B. / B.A.LL.B.)', category: 'Bachelor', aliases: ['LLB', 'LL.B.', 'B.A.LL.B.', 'Bachelor of Laws'], allowedFieldCategories: ['Law', 'Business & Economics', 'Social Sciences', 'Humanities & Languages', 'Interdisciplinary / Other'] },
  { id: 'master_engineering_technology', label: 'Master of Engineering / Technology (M.E. / M.Tech. / M.Eng.)', category: 'Master', aliases: ['ME', 'M.E.', 'MTech', 'M.Tech.', 'MEng', 'M.Eng.', 'Master of Engineering', 'Master of Technology'], allowedFieldCategories: ['Computing', 'Engineering & Technology', 'Architecture & Built Environment', 'Mathematics & Natural Sciences', 'Interdisciplinary / Other'] },
  { id: 'master_science', label: 'Master of Science (M.Sc.)', category: 'Master', aliases: ['MSc', 'M.Sc.', 'MS', 'M.S.', 'Master of Science'], allowedFieldCategories: ['Computing', 'Mathematics & Natural Sciences', 'Medicine & Health', 'Agriculture / Forestry / Veterinary', 'Business & Economics', 'Social Sciences', 'Interdisciplinary / Other'] },
  { id: 'master_arts', label: 'Master of Arts (M.A.)', category: 'Master', aliases: ['MA', 'M.A.', 'AM', 'A.M.', 'Master of Arts'], allowedFieldCategories: ['Humanities & Languages', 'Social Sciences', 'Communication & Media', 'Arts / Design / Creative', 'Education', 'Business & Economics', 'Interdisciplinary / Other'] },
  { id: 'master_computer_applications', label: 'Master of Computer Applications (M.C.A.)', category: 'Master', aliases: ['MCA', 'M.C.A.', 'Master of Computer Applications'], allowedFieldCategories: ['Computing', 'Interdisciplinary / Other', 'Business & Economics', 'Mathematics & Natural Sciences'] },
  { id: 'master_business_administration', label: 'Master of Business Administration (M.B.A. / M.I.B.)', category: 'Master', aliases: ['MBA', 'M.B.A.', 'MIB', 'M.I.B.', 'Master of Business Administration', 'Master of International Business'], allowedFieldCategories: ['Business & Economics', 'Computing', 'Communication & Media', 'Social Sciences', 'Interdisciplinary / Other'] },
  { id: 'integrated_bachelors_masters', label: 'Integrated Bachelor\'s + Master\'s', category: 'Other', aliases: ['Integrated', 'Dual Degree', 'Integrated MTech', 'Integrated MSc'] },
  { id: 'diploma', label: 'Diploma / Advanced Diploma', category: 'Other', aliases: ['Diploma', 'Advanced Diploma', 'PG Diploma', 'PGDCA', 'Polytechnic'] },
  { id: 'doctorate', label: 'Doctorate / PhD', category: 'Other', aliases: ['PhD', 'Ph.D.', 'Doctorate', 'DPhil', 'D.Phil.'] },
  { id: 'other_degree', label: 'Other / Foreign Equivalent', category: 'Other', aliases: ['Other', 'Foreign Equivalent', 'Staatsexamen', 'State Examination'] }
];

export const FIELD_OF_STUDY_OPTIONS: CanonicalOption[] = [
  { id: 'computer_science_information_technology', label: 'Computer Science & Information Technology', category: 'Computing', aliases: ['Computer Science', 'Information Technology', 'IT', 'CS', 'Informatics', 'Applied Computer Science', 'Computing', 'Computer Engineering', 'Software Engineering', 'AI', 'Artificial Intelligence', 'Data Science'] },
  { id: 'information_systems_business_informatics', label: 'Information Systems & Business Informatics', category: 'Computing', aliases: ['Information Systems', 'Business Informatics', 'MIS', 'Management Information Systems', 'Wirtschaftsinformatik'] },
  { id: 'electrical_electronics_telecommunications', label: 'Electrical / Electronics / Telecommunications', category: 'Engineering & Technology', aliases: ['Electrical Engineering', 'Electronics Engineering', 'Telecommunications', 'ECE', 'EEE', 'Communications Engineering', 'Microelectronics'] },
  { id: 'mechanical_automotive', label: 'Mechanical / Automotive', category: 'Engineering & Technology', aliases: ['Mechanical Engineering', 'Automotive Engineering', 'Automobile Engineering', 'Manufacturing Engineering', 'Production Engineering'] },
  { id: 'civil_construction', label: 'Civil / Construction', category: 'Engineering & Technology', aliases: ['Civil Engineering', 'Construction Engineering', 'Structural Engineering', 'Architecture Engineering'] },
  { id: 'chemical_process', label: 'Chemical / Process', category: 'Engineering & Technology', aliases: ['Chemical Engineering', 'Process Engineering', 'Process Technology'] },
  { id: 'mechatronics_robotics', label: 'Mechatronics / Robotics / Systems', category: 'Engineering & Technology', aliases: ['Mechatronics', 'Robotics', 'Systems Engineering', 'Automation Technology'] },
  { id: 'materials_metallurgy', label: 'Materials / Metallurgy', category: 'Engineering & Technology', aliases: ['Materials Science', 'Metallurgy', 'Nanomaterials', 'Plastics Engineering'] },
  { id: 'aerospace_aeronautical', label: 'Aerospace / Aeronautical', category: 'Engineering & Technology', aliases: ['Aerospace Engineering', 'Aeronautical Engineering', 'Space Engineering'] },
  { id: 'environmental_energy', label: 'Environmental / Energy', category: 'Engineering & Technology', aliases: ['Environmental Engineering', 'Energy Engineering', 'Renewable Energies', 'Power Engineering'] },
  { id: 'biomedical_engineering', label: 'Biomedical Engineering', category: 'Engineering & Technology', aliases: ['Biomedical', 'Bioengineering', 'Medical Engineering'] },
  { id: 'mathematics_statistics', label: 'Mathematics & Statistics', category: 'Mathematics & Natural Sciences', aliases: ['Mathematics', 'Statistics', 'Applied Mathematics', 'Business Mathematics', 'Technomathematics'] },
  { id: 'physics_astronomy', label: 'Physics & Astronomy', category: 'Mathematics & Natural Sciences', aliases: ['Physics', 'Astronomy', 'Astrophysics', 'Engineering Physics'] },
  { id: 'chemistry', label: 'Chemistry', category: 'Mathematics & Natural Sciences', aliases: ['Chemistry', 'Physical Chemistry', 'Inorganic Chemistry', 'Food Chemistry'] },
  { id: 'biology_life_sciences', label: 'Biology & Life Sciences', category: 'Mathematics & Natural Sciences', aliases: ['Biology', 'Microbiology', 'Botany', 'Zoology', 'Life Sciences', 'Neuroscience'] },
  { id: 'biotechnology_bioinformatics', label: 'Biotechnology & Bioinformatics', category: 'Mathematics & Natural Sciences', aliases: ['Biotechnology', 'Bioinformatics', 'Biomedicine'] },
  { id: 'earth_geosciences', label: 'Earth & Geosciences', category: 'Mathematics & Natural Sciences', aliases: ['Geology', 'Geosciences', 'Geography', 'Geophysics'] },
  { id: 'environmental_science', label: 'Environmental Science', category: 'Mathematics & Natural Sciences', aliases: ['Environmental Science', 'Ecology', 'Nature Conservation'] },
  { id: 'business_administration_management', label: 'Business Administration & Management', category: 'Business & Economics', aliases: ['Business Administration', 'Management', 'Business Management', 'BBA', 'MBA', 'BWL', 'Business Studies'] },
  { id: 'international_business', label: 'International Business', category: 'Business & Economics', aliases: ['International Business', 'International Management', 'Global Business'] },
  { id: 'finance_accounting', label: 'Finance & Accounting', category: 'Business & Economics', aliases: ['Finance', 'Accounting', 'Controlling', 'Taxation', 'Insurance'] },
  { id: 'economics', label: 'Economics', category: 'Business & Economics', aliases: ['Economics', 'Economic Sciences', 'VWL'] },
  { id: 'marketing', label: 'Marketing', category: 'Business & Economics', aliases: ['Marketing', 'Sales', 'Distribution'] },
  { id: 'hr_organizational_management', label: 'HR & Organizational Management', category: 'Business & Economics', aliases: ['Human Resources', 'HR', 'Human Resource Management', 'Organizational Management'] },
  { id: 'logistics_supply_chain', label: 'Logistics & Supply Chain', category: 'Business & Economics', aliases: ['Logistics', 'Supply Chain', 'Transport Management'] },
  { id: 'law_jurisprudence', label: 'Law & Jurisprudence', category: 'Law', aliases: ['Law', 'Jurisprudence', 'Civil Law', 'Public Law', 'International Law'] },
  { id: 'social_sciences', label: 'Social Sciences', category: 'Social Sciences', aliases: ['Sociology', 'Political Science', 'International Relations', 'Social Work'] },
  { id: 'psychology', label: 'Psychology', category: 'Social Sciences', aliases: ['Psychology', 'Neuropsychology', 'Business Psychology'] },
  { id: 'humanities_languages', label: 'Humanities & Languages', category: 'Humanities & Languages', aliases: ['Humanities', 'Languages', 'Linguistics', 'Literature', 'History', 'Philosophy', 'Cultural Studies', 'English Studies', 'German Studies'] },
  { id: 'medicine_health', label: 'Medicine & Health', category: 'Medicine & Health', aliases: ['Medicine', 'Human Medicine', 'Dental Medicine', 'Public Health', 'Health Science', 'Pharmacy', 'Nursing'] },
  { id: 'agriculture_forestry', label: 'Agriculture & Forestry', category: 'Agriculture / Forestry / Veterinary', aliases: ['Agriculture', 'Forestry', 'Horticulture', 'Veterinary Medicine'] },
  { id: 'architecture_built_environment', label: 'Architecture & Built Environment', category: 'Architecture & Built Environment', aliases: ['Architecture', 'Urban Planning', 'Landscape Architecture', 'Spatial Planning'] },
  { id: 'education_pedagogy', label: 'Education & Pedagogy', category: 'Education', aliases: ['Education', 'Pedagogy', 'Educational Science', 'Teaching Degree', 'Special Education'] },
  { id: 'communication_media', label: 'Communication & Media', category: 'Communication & Media', aliases: ['Communication', 'Media Studies', "Journalism", "Public Relations"] },
  { id: 'arts_design_creative', label: 'Arts / Design / Creative', category: 'Arts / Design / Creative', aliases: ['Arts', 'Design', 'Graphic Design', 'Industrial Design', 'Fine Art', 'Music', 'Performing Arts'] },
  { id: 'interdisciplinary_other', label: 'Interdisciplinary / Other', category: 'Interdisciplinary / Other', aliases: ['Other', 'Interdisciplinary', 'General Studies'] }
];

export function normalizeSearchString(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}
