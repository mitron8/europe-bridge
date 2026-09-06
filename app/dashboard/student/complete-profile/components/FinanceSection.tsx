import React from 'react';
import { ProfileData } from '../types';
import { ClaySelect } from '@/components/ClaySelect';

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
      <h3 className="text-xl font-extrabold text-germany-black font-display mb-6">Financial Preferences</h3>
      <p className="text-gray-500 mb-8 font-medium text-xs">This helps us match you with suitable programs, scholarships, and plan your blocked account requirements.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Primary Funding Source *</label>
          <ClaySelect
            name="fundingPreference"
            value={data.fundingPreference}
            onChange={(val) => onChange({ fundingPreference: val as any })}
            placeholder="Select Funding Source"
            options={[
              "Self-funded",
              "Family-funded",
              "Education Loan",
              "Scholarship",
              "Combination"
            ]}
          />
        </div>
        
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Maximum Tuition Budget (EUR/Year)</label>
          <input 
            type="number" 
            name="maxTuitionBudget" 
            value={data.maxTuitionBudget} 
            onChange={(e) => onChange({ maxTuitionBudget: e.target.value ? parseInt(e.target.value) : '' })} 
            className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" 
            placeholder="e.g. 5000 (Leave empty if no limit)" 
          />
        </div>
      </div>

      <div className="mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm animate-fade-in">
        <h4 className="text-md font-extrabold text-germany-black font-display mb-2">Blocked Account Requirement</h4>
        <p className="text-xs text-gray-500 mb-4 font-bold">
          Germany requires an official blocked account for the student visa, currently around €11,904 per year to cover living expenses.
        </p>
        <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 cursor-pointer select-none">
          <input 
            type="checkbox" 
            name="blockedAccountReady" 
            checked={data.blockedAccountReady} 
            onChange={handleChange} 
            className="rounded text-germany-red focus:ring-germany-red w-4 h-4 accent-germany-red cursor-pointer" 
          />
          <span>I am aware of this and have the funds ready/planned for the blocked account.</span>
        </label>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all font-bold text-xs cursor-pointer text-gray-700 bg-white">Back</button>
        <button onClick={onNext} className="neu-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer">Save & Finish</button>
      </div>
    </div>
  );
}
