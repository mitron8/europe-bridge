import React from 'react';
import { ProfileData, ExperienceRecord } from '../types';
import { ClaySelect } from '@/components/ClaySelect';


interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ExperienceSection({ data, onChange, onNext, onPrev }: Props) {
  
  const addExperience = () => {
    const newRecord: ExperienceRecord = {
      id: crypto.randomUUID(),
      companyName: '',
      jobTitle: '',
      employmentType: '',
      industry: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    onChange({ experienceRecords: [...data.experienceRecords, newRecord] });
  };

  const updateExperience = (id: string, field: keyof ExperienceRecord, value: any) => {
    const updated = data.experienceRecords.map(record => {
      if (record.id === id) {
        // if they marked the job as current, wipe out the end date so we don't send conflicting data
        if (field === 'isCurrent' && value === true) {
          return { ...record, [field]: value, endDate: '' };
        }
        return { ...record, [field]: value };
      }
      return record;
    });
    onChange({ experienceRecords: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ experienceRecords: data.experienceRecords.filter(record => record.id !== id) });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-germany-black dark:text-white font-display">Experience</h3>
        <button onClick={addExperience} className="px-4 py-2 rounded-xl bg-[#EBE7E0] dark:bg-gray-800 hover:bg-germany-black dark:hover:bg-gray-700 hover:text-white font-extrabold text-xs transition-all text-germany-black dark:text-gray-100 cursor-pointer">
          + Add Experience
        </button>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium text-xs">Include your full-time jobs, internships, part-time work, and freelance projects.</p>

      {data.experienceRecords.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 mb-8 font-bold bg-gray-50/50">
          No experience records added yet.
        </div>
      ) : (
        <div className="space-y-8 mb-8">
          {data.experienceRecords.map((record, index) => (
            <div key={record.id} className="border border-gray-150 dark:border-gray-800 rounded-2xl p-6 bg-gray-50/50 dark:bg-[#0E121A] relative shadow-sm">
              <button onClick={() => removeExperience(record.id)} className="absolute top-4 right-4 text-germany-red dark:text-[#FF6B7A] hover:underline text-xs font-bold cursor-pointer">
                Remove
              </button>
              <h4 className="font-extrabold text-md text-germany-black dark:text-white font-display mb-4 border-b border-gray-200/60 dark:border-gray-800 pb-2">Experience Record {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Job Title *</label>
                  <input type="text" value={record.jobTitle} onChange={(e) => updateExperience(record.id, 'jobTitle', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#111622]" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Company / Organization *</label>
                  <input type="text" value={record.companyName} onChange={(e) => updateExperience(record.id, 'companyName', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#111622]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Employment Type *</label>
                  <ClaySelect 
                    value={record.employmentType} 
                    onChange={(val) => updateExperience(record.id, 'employmentType', val)} 
                    placeholder="Select Type"
                    options={["Full-time", "Part-time", "Internship", "Freelance", "Contract", "Other"]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Industry</label>
                  <input type="text" value={record.industry} onChange={(e) => updateExperience(record.id, 'industry', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" placeholder="e.g. IT, Finance" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 items-end">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Start Date *</label>
                  <input type="month" value={record.startDate} onChange={(e) => updateExperience(record.id, 'startDate', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">End Date</label>
                  <input type="month" value={record.endDate} onChange={(e) => updateExperience(record.id, 'endDate', e.target.value)} disabled={record.isCurrent} className={`w-full px-4 py-2.5 neu-input text-xs font-bold bg-white disabled:bg-[#EBE7E0]/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none`} />
                </div>
                <div className="pb-2">
                  <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                    <input type="checkbox" checked={record.isCurrent} onChange={(e) => updateExperience(record.id, 'isCurrent', e.target.checked)} className="rounded text-germany-red focus:ring-germany-red w-4 h-4 accent-germany-red cursor-pointer" />
                    <span>I currently work here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
                <textarea 
                  value={record.description} 
                  onChange={(e) => updateExperience(record.id, 'description', e.target.value)} 
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white h-24 resize-none" 
                  placeholder="Describe your responsibilities and achievements..."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold text-xs cursor-pointer text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0E121A]">Back</button>
        <button onClick={onNext} className="neu-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
}
