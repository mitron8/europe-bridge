import React from 'react';
import { ProfileData } from '../types';

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
      <h3 className="text-2xl font-bold mb-6">Study Preferences</h3>
      <p className="text-gray-500 mb-6">This information helps our matching engine find the best universities for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intended Degree Level *</label>
          <select name="intendedDegreeLevel" value={data.intendedDegreeLevel} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">Select Level</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
            <option value="Diploma">Diploma</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Field of Study *</label>
          <input type="text" name="preferredFieldOfStudy" value={data.preferredFieldOfStudy} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="e.g. Computer Science" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Specialization</label>
          <input type="text" name="preferredSpecialization" value={data.preferredSpecialization} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="e.g. Artificial Intelligence" />
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4">Intake & Timeline</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 border rounded-md bg-gray-50">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Intake Season *</label>
          <select name="intakeSeason" value={data.intakeSeason} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">Select Season</option>
            <option value="WINTER">WINTER (Oct/Nov)</option>
            <option value="SUMMER">SUMMER (Mar/Apr)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Year *</label>
          <input 
            type="number" 
            name="intakeYear" 
            value={data.intakeYear} 
            onChange={(e) => onChange({ intakeYear: e.target.value ? parseInt(e.target.value) : '' })} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g. 2025" 
          />
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4">Institution Preferences</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Universities (Comma separated)</label>
          <input 
            type="text" 
            value={data.preferredUniversities.join(', ')} 
            onChange={handleUniversitiesChange} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g. Technical University of Munich, RWTH Aachen" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">University Type</label>
          <select name="universityType" value={data.universityType} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">No Preference</option>
            <option value="Public">Public (State-funded)</option>
            <option value="Private">Private</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Study Mode</label>
          <select name="studyMode" value={data.studyMode} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">No Preference</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">Back</button>
        <button onClick={onNext} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Save & Continue</button>
      </div>
    </div>
  );
}
