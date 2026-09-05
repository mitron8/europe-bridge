import React from 'react';
import { ProfileData } from '../types';
import { ClaySelect } from '@/components/ClaySelect';

interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PreferencesSection({ data, onChange, onNext, onPrev }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const handleUniversitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic comma separated text to array for now
    const unisArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
    onChange({ preferredUniversities: unisArray });
  };

  return (
    <div>
      <h3 className="text-xl font-extrabold text-germany-black font-display mb-6">Study Preferences</h3>
      <p className="text-gray-500 mb-6 font-medium text-xs">This information helps our matching engine find the best universities for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Intended Degree Level *</label>
          <ClaySelect
            name="intendedDegreeLevel"
            value={data.intendedDegreeLevel}
            onChange={(val) => onChange({ intendedDegreeLevel: val as any })}
            placeholder="Select Level"
            options={["Bachelor's", "Master's", "PhD", "Diploma", "Other"]}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Preferred Field of Study *</label>
          <input type="text" name="preferredFieldOfStudy" value={data.preferredFieldOfStudy} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" placeholder="e.g. Computer Science" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Preferred Specialization</label>
          <input type="text" name="preferredSpecialization" value={data.preferredSpecialization} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" placeholder="e.g. Artificial Intelligence" />
        </div>
      </div>

      <h4 className="text-md font-extrabold text-germany-black font-display mb-4">Intake & Timeline</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Target Intake Season *</label>
          <ClaySelect
            name="intakeSeason"
            value={data.intakeSeason}
            onChange={(val) => onChange({ intakeSeason: val as any })}
            placeholder="Select Season"
            options={[
              { value: 'WINTER', label: 'WINTER (Oct/Nov)' },
              { value: 'SUMMER', label: 'SUMMER (Mar/Apr)' },
            ]}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Target Year *</label>
          <input 
            type="number" 
            name="intakeYear" 
            value={data.intakeYear} 
            onChange={(e) => onChange({ intakeYear: e.target.value ? parseInt(e.target.value) : '' })} 
            className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]/30 bg-white" 
            placeholder="e.g. 2025" 
          />
        </div>
      </div>

      <h4 className="text-md font-extrabold text-germany-black font-display mb-4">Institution Preferences</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Preferred Universities (Comma separated)</label>
          <input 
            type="text" 
            value={data.preferredUniversities.join(', ')} 
            onChange={handleUniversitiesChange} 
            className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" 
            placeholder="e.g. Technical University of Munich, RWTH Aachen" 
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">University Type</label>
          <ClaySelect
            name="universityType"
            value={data.universityType}
            onChange={(val) => onChange({ universityType: val as any })}
            placeholder="No Preference"
            options={[
              { value: '', label: 'No Preference' },
              { value: 'Public', label: 'Public (State-funded)' },
              { value: 'Private', label: 'Private' },
              { value: 'Both', label: 'Both' },
            ]}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Study Mode</label>
          <ClaySelect
            name="studyMode"
            value={data.studyMode}
            onChange={(val) => onChange({ studyMode: val as any })}
            placeholder="No Preference"
            options={[
              { value: '', label: 'No Preference' },
              { value: 'On-Campus', label: 'On-Campus' },
              { value: 'Hybrid', label: 'Hybrid' },
              { value: 'Online', label: 'Online' },
            ]}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all font-bold text-xs cursor-pointer text-gray-700 bg-white">Back</button>
        <button onClick={onNext} className="neu-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
}
