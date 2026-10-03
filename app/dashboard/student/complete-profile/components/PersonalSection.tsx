import React, { useMemo } from 'react';
import { ProfileData } from '../types';
import { ClaySelect } from '@/components/ClaySelect';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '0.75rem', // rounded-xl like neu-input
    border: '2px solid #EBE7E0',
    boxShadow: state.isFocused ? 'none' : '4px 4px 0px 0px rgba(0,0,0,0.1)', 
    padding: '0.15rem', 
    fontSize: '0.75rem', // text-xs
    fontWeight: '700', // font-bold
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  }),
  option: (provided: any, state: any) => ({
      ...provided,
      fontSize: '0.75rem',
      fontWeight: '700',
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#FF4F4F' : state.isFocused ? '#fde8e8' : 'white',
      color: state.isSelected ? 'white' : '#1e1e1e'
  })
};

export default function PersonalSection({ data, onChange, onNext }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // grab the checked state for checkboxes, otherwise standard value
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange({ [e.target.name]: value });
  };

  const countries = useMemo(() => Country.getAllCountries().map(c => ({
    label: c.name,
    value: c.name,
    isoCode: c.isoCode
  })), []);

  const selectedCountry = useMemo(() => countries.find(c => c.value === data.country), [countries, data.country]);
  
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.isoCode).map(s => ({
      label: s.name,
      value: s.name,
      isoCode: s.isoCode
    }));
  }, [selectedCountry]);

  const selectedState = useMemo(() => states.find(s => s.value === data.stateProvince), [states, data.stateProvince]);

  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    return City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode).map(c => ({
      label: c.name,
      value: c.name
    }));
  }, [selectedCountry, selectedState]);

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
          <Select 
             options={countries}
             value={countries.find(c => c.value === data.nationality) || null}
             onChange={(option) => onChange({ nationality: option?.value || '' })}
             isSearchable
             styles={customStyles}
             placeholder="Select Nationality"
          />
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
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Country *</label>
          <Select 
             options={countries}
             value={countries.find(c => c.value === data.country) || null}
             onChange={(option) => {
                 onChange({ country: option?.value || '', stateProvince: '', city: '' });
             }}
             isSearchable
             styles={customStyles}
             placeholder="Select Country"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-2">
            <span>State / Province</span>
            {!data.country && <em className="text-gray-400 font-normal normal-case lowercase text-[10px] italic">*(choose a country first)</em>}
          </label>
          <Select 
             options={states}
             value={states.find(s => s.value === data.stateProvince) || null}
             onChange={(option) => {
                 onChange({ stateProvince: option?.value || '', city: '' });
             }}
             isDisabled={!data.country || states.length === 0}
             isSearchable
             styles={customStyles}
             placeholder={states.length === 0 && data.country ? "No states available" : "Select State"}
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-2">
            <span>City *</span>
            {!data.stateProvince && data.country && <em className="text-gray-400 font-normal normal-case lowercase text-[10px] italic">*(choose a state first)</em>}
          </label>
          { data.stateProvince && cities.length === 0 ? (
             <input type="text" name="city" value={data.city} onChange={handleChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold" placeholder="Type city name" />
          ) : (
            <Select 
                options={cities}
                value={cities.find(c => c.value === data.city) || null}
                onChange={(option) => onChange({ city: option?.value || '' })}
                isDisabled={!data.stateProvince}
                isSearchable
                styles={customStyles}
                placeholder="Select City"
            />
          )}
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
