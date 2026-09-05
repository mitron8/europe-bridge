import React from 'react';
import { ProfileData } from '../types';
import { ClaySelect } from '@/components/ClaySelect';

interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
}

export default function PersonalSection({ data, onChange, onNext }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // grab the checked state for checkboxes, otherwise standard value
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange({ [e.target.name]: value });
  };

  return (
    <div>
      <h3 className="text-xl font-extrabold text-germany-black font-display mb-6">Personal & Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">First Name *</label>
          <input type="text" name="firstName" value={data.firstName} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Middle Name</label>
          <input type="text" name="middleName" value={data.middleName} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Last Name *</label>
          <input type="text" name="lastName" value={data.lastName} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Date of Birth *</label>
          <input type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Gender *</label>
          <ClaySelect
            name="gender"
            value={data.gender}
            onChange={(val) => onChange({ gender: val as any })}
            placeholder="Select Gender"
            options={['Male', 'Female', 'Other', 'Prefer not to say']}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Nationality *</label>
          <input type="text" name="nationality" value={data.nationality} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" placeholder="e.g. India" />
        </div>
      </div>

      <h4 className="text-lg font-extrabold text-germany-black font-display mb-4">Contact Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Email *</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} disabled className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]/50 text-gray-400 cursor-not-allowed shadow-none" title="Email cannot be changed here" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Phone *</label>
          <input type="tel" name="phone" value={data.phone} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" placeholder="+1234567890" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">WhatsApp</label>
          <input type="tel" name="whatsapp" value={data.whatsapp} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" placeholder="+1234567890" />
        </div>
      </div>

      <h4 className="text-lg font-extrabold text-germany-black font-display mb-4">Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Address Line *</label>
          <input type="text" name="addressLine" value={data.addressLine} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">City *</label>
          <input type="text" name="city" value={data.city} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">State / Province</label>
          <input type="text" name="stateProvince" value={data.stateProvince} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Country *</label>
          <input type="text" name="country" value={data.country} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Postal Code *</label>
          <input type="text" name="postalCode" value={data.postalCode} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" />
        </div>
      </div>

      <h4 className="text-lg font-extrabold text-germany-black font-display mb-4">Passport & Identity</h4>
      <div className="mb-6">
        <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 cursor-pointer select-none">
          <input type="checkbox" name="passportAvailable" checked={data.passportAvailable} onChange={handleChange} className="rounded text-germany-red focus:ring-germany-red w-4 h-4 accent-germany-red cursor-pointer" />
          <span>I have a valid passport</span>
        </label>
      </div>

      {data.passportAvailable && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Passport Number</label>
            <input type="text" name="passportNumber" value={data.passportNumber} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Issuing Country</label>
            <input type="text" name="passportIssuingCountry" value={data.passportIssuingCountry} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Issue Date</label>
            <input type="date" name="passportIssueDate" value={data.passportIssueDate} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Expiry Date</label>
            <input type="date" name="passportExpiryDate" value={data.passportExpiryDate} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="neu-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
}
