import React, { useMemo } from 'react';
import AsyncSelect from 'react-select/async';
import { ProfileData } from '../types';
import { ClaySelect } from '@/components/ClaySelect';
import Select from 'react-select';
import { PROGRAMME_SUBJECTS, PROGRAMME_SPECIALIZATIONS } from '@/lib/programme-constants';

interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '0.75rem', 
    border: '2px solid #EBE7E0',
    boxShadow: state.isFocused ? 'none' : '4px 4px 0px 0px rgba(0,0,0,0.1)', 
    padding: '0.15rem', 
    fontSize: '0.75rem', 
    fontWeight: '700', 
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

export default function PreferencesSection({ data, onChange, onNext, onPrev }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const handleUniversitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic comma separated text to array for now
    const unisArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
    onChange({ preferredUniversities: unisArray });
  };

  const subjects = useMemo(() => PROGRAMME_SUBJECTS.map(s => ({ label: s, value: s })), []);
  const specializations = useMemo(() => PROGRAMME_SPECIALIZATIONS.map(s => ({ label: s, value: s })), []);

  return (
    <div>
      <h3 className="text-xl font-extrabold text-germany-black font-display mb-6">Study Preferences</h3>
      <p className="text-gray-500 mb-6 font-medium text-xs">This information helps our matching engine find the best universities for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Select 
              options={subjects}
              value={subjects.find(s => s.value === data.preferredFieldOfStudy) || null}
              onChange={(option) => onChange({ preferredFieldOfStudy: option?.value || '' })}
              isSearchable
              isClearable
              styles={customStyles}
              placeholder="Select Subject"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Preferred Specialization</label>
            <Select 
              options={specializations}
              value={specializations.find(s => s.value === data.preferredSpecialization) || null}
              onChange={(option) => onChange({ preferredSpecialization: option?.value || '' })}
              isSearchable
              isClearable
              styles={customStyles}
              placeholder="Select Specialization"
            />
          </div>
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
          <Select 
            options={Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + 10 - i).map(y => ({ label: y.toString(), value: y }))}
            value={data.intakeYear ? { label: data.intakeYear.toString(), value: data.intakeYear as number } : null}
            onChange={(option) => onChange({ intakeYear: option?.value || '' })}
            isSearchable
            styles={customStyles}
            placeholder="Select Year"
          />
        </div>
      </div>

      <h4 className="text-md font-extrabold text-germany-black font-display mb-4">Institution Preferences</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Preferred Universities</label>
          <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={async (inputValue: string) => {
              if (inputValue.length < 2) return [];
              try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/student/universities/search?q=${encodeURIComponent(inputValue)}`, {
                  credentials: 'include'
                });
                if (!res.ok) return [];
                const data = await res.json();
                return data.map((u: any) => ({ 
                  label: `${u.name} ${u.city ? `- ${u.city}` : ''} (${u.country})`, 
                  value: u.name 
                }));
              } catch (err) {
                return [];
              }
            }}
            value={data.preferredUniversities.map(name => ({ label: name, value: name }))}
            onChange={(selected) => {
              const values = (selected as any[]).map(option => option.value);
              onChange({ preferredUniversities: values });
            }}
            styles={customStyles}
            placeholder="Search and select universities..."
            noOptionsMessage={({ inputValue }) => inputValue.length < 2 ? "Type at least 2 characters to search..." : "No universities found"}
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
