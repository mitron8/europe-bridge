import React from 'react';
import { ProfileData } from '../types';

interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FinanceSection({ data, onChange, onNext, onPrev }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange({ [e.target.name]: value });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Financial Preferences</h3>
      <p className="text-gray-500 mb-8">This helps us match you with suitable programs, scholarships, and plan your blocked account requirements.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Funding Source *</label>
          <select name="fundingPreference" value={data.fundingPreference} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">Select Funding Source</option>
            <option value="Self-funded">Self-funded</option>
            <option value="Family-funded">Family-funded</option>
            <option value="Education Loan">Education Loan</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Combination">Combination / Multiple Sources</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Tuition Budget (EUR/Year)</label>
          <input 
            type="number" 
            name="maxTuitionBudget" 
            value={data.maxTuitionBudget} 
            onChange={(e) => onChange({ maxTuitionBudget: e.target.value ? parseInt(e.target.value) : '' })} 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g. 5000 (Leave empty if no limit)" 
          />
        </div>
      </div>

      <div className="mb-8 p-6 border rounded-md bg-gray-50">
        <h4 className="text-lg font-bold mb-2">Blocked Account Requirement</h4>
        <p className="text-sm text-gray-600 mb-4">
          Germany requires a blocked account (Sperrkonto) for the student visa, currently around 11,208 EUR per year to cover living expenses.
        </p>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input 
            type="checkbox" 
            name="blockedAccountReady" 
            checked={data.blockedAccountReady} 
            onChange={handleChange} 
            className="rounded" 
          />
          <span>I am aware of this and have the funds ready/planned for the blocked account.</span>
        </label>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">Back</button>
        <button onClick={onNext} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Save & Finish</button>
      </div>
    </div>
  );
}
