import React from 'react';
import { ProfileData } from '../types';

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
      <h3 className="text-2xl font-bold mb-6">Personal & Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input type="text" name="firstName" value={data.firstName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
          <input type="text" name="middleName" value={data.middleName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input type="text" name="lastName" value={data.lastName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
          <input type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
          <select name="gender" value={data.gender} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
          <input type="text" name="nationality" value={data.nationality} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="e.g. India" />
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4">Contact Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" title="Email cannot be changed here" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input type="tel" name="phone" value={data.phone} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="+1234567890" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
          <input type="tel" name="whatsapp" value={data.whatsapp} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="+1234567890" />
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4">Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line *</label>
          <input type="text" name="addressLine" value={data.addressLine} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input type="text" name="city" value={data.city} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
          <input type="text" name="stateProvince" value={data.stateProvince} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <input type="text" name="country" value={data.country} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
          <input type="text" name="postalCode" value={data.postalCode} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <h4 className="text-xl font-bold mb-4">Passport & Identity</h4>
      <div className="mb-4">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input type="checkbox" name="passportAvailable" checked={data.passportAvailable} onChange={handleChange} className="rounded" />
          <span>I have a valid passport</span>
        </label>
      </div>

      {data.passportAvailable && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 border rounded-md bg-gray-50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
            <input type="text" name="passportNumber" value={data.passportNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Country</label>
            <input type="text" name="passportIssuingCountry" value={data.passportIssuingCountry} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
            <input type="date" name="passportIssueDate" value={data.passportIssueDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input type="date" name="passportExpiryDate" value={data.passportExpiryDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Save & Continue</button>
      </div>
    </div>
  );
}
