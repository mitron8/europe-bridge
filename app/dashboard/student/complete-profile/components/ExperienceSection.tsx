import React from 'react';
import { ProfileData, ExperienceRecord } from '../types';


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
        <h3 className="text-2xl font-bold">Experience</h3>
        <button onClick={addExperience} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium border border-blue-200 hover:bg-blue-100">
          + Add Experience
        </button>
      </div>

      <p className="text-gray-500 mb-6">Include your full-time jobs, internships, part-time work, and freelance projects.</p>

      {data.experienceRecords.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 mb-8">
          No experience records added yet.
        </div>
      ) : (
        <div className="space-y-8 mb-8">
          {data.experienceRecords.map((record, index) => (
            <div key={record.id} className="border rounded-lg p-6 bg-gray-50 relative">
              <button onClick={() => removeExperience(record.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium">
                Remove
              </button>
              <h4 className="font-bold text-lg mb-4 border-b pb-2">Experience Record {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input type="text" value={record.jobTitle} onChange={(e) => updateExperience(record.id, 'jobTitle', e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization *</label>
                  <input type="text" value={record.companyName} onChange={(e) => updateExperience(record.id, 'companyName', e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                  <select value={record.employmentType} onChange={(e) => updateExperience(record.id, 'employmentType', e.target.value)} className="w-full p-2 border rounded-md bg-white">
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Contract">Contract</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input type="text" value={record.industry} onChange={(e) => updateExperience(record.id, 'industry', e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. IT, Finance" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input type="month" value={record.startDate} onChange={(e) => updateExperience(record.id, 'startDate', e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="month" value={record.endDate} onChange={(e) => updateExperience(record.id, 'endDate', e.target.value)} disabled={record.isCurrent} className={`w-full p-2 border rounded-md ${record.isCurrent ? 'bg-gray-200 text-gray-400' : ''}`} />
                </div>
                <div className="pb-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <input type="checkbox" checked={record.isCurrent} onChange={(e) => updateExperience(record.id, 'isCurrent', e.target.checked)} className="rounded" />
                    <span>I currently work here</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={record.description} 
                  onChange={(e) => updateExperience(record.id, 'description', e.target.value)} 
                  className="w-full p-2 border rounded-md h-24 resize-none" 
                  placeholder="Describe your responsibilities and achievements..."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">Back</button>
        <button onClick={onNext} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Save & Continue</button>
      </div>
    </div>
  );
}
