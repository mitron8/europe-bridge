import React from 'react';
import { ProfileData, EducationRecord } from '../types';


interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationSection({ data, onChange, onNext, onPrev }: Props) {
  const addEducation = () => {
    const newRecord: EducationRecord = {
      id: crypto.randomUUID(),
      educationLevel: '',
      degreeType: '',
      fieldOfStudy: '',
      specialization: '',
      institutionName: '',
      institutionCountry: '',
      startYear: '',
      endYear: '',
      academicStatus: '',
      currentSemester: '',
      gradingSystem: '',
      score: '',
      scale: '',
      backlogs: ''
    };
    onChange({ educationRecords: [...data.educationRecords, newRecord] });
  };

  const updateEducation = (id: string, field: keyof EducationRecord, value: any) => {
    const updatedRecords = data.educationRecords.map((record) => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    });
    onChange({ educationRecords: updatedRecords });
  };

  const removeEducation = (id: string) => {
    onChange({ educationRecords: data.educationRecords.filter((record) => record.id !== id) });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Academic History</h3>
        <button onClick={addEducation} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium border border-blue-200 hover:bg-blue-100">
          + Add Education Record
        </button>
      </div>

      {data.educationRecords.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 mb-8">
          No education records added yet. Click the button above to add your academic history.
        </div>
      ) : (
        <div className="space-y-8 mb-8">
          {data.educationRecords.map((record, index) => (
            <div key={record.id} className="border rounded-lg p-6 bg-gray-50 relative">
              <button 
                onClick={() => removeEducation(record.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
              <h4 className="font-bold text-lg mb-4 border-b pb-2">Education Record {index + 1}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education Level *</label>
                  <select 
                    value={record.educationLevel} 
                    onChange={(e) => updateEducation(record.id, 'educationLevel', e.target.value)} 
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type *</label>
                  <select 
                    value={record.degreeType} 
                    onChange={(e) => updateEducation(record.id, 'degreeType', e.target.value)} 
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.E.">B.E.</option>
                    <option value="B.Sc.">B.Sc.</option>
                    <option value="BBA">BBA</option>
                    <option value="BCA">BCA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="M.E.">M.E.</option>
                    <option value="M.Sc.">M.Sc.</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study *</label>
                  <select 
                    value={record.fieldOfStudy} 
                    onChange={(e) => updateEducation(record.id, 'fieldOfStudy', e.target.value)} 
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select Field</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Economics">Economics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input 
                    type="text" 
                    value={record.specialization} 
                    onChange={(e) => updateEducation(record.id, 'specialization', e.target.value)} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. Artificial Intelligence"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name *</label>
                  <input 
                    type="text" 
                    value={record.institutionName} 
                    onChange={(e) => updateEducation(record.id, 'institutionName', e.target.value)} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="University/School Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Country *</label>
                  <input 
                    type="text" 
                    value={record.institutionCountry} 
                    onChange={(e) => updateEducation(record.id, 'institutionCountry', e.target.value)} 
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year *</label>
                  <input 
                    type="number" 
                    value={record.startYear} 
                    onChange={(e) => updateEducation(record.id, 'startYear', e.target.value ? parseInt(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 2019"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                  <input 
                    type="number" 
                    value={record.endYear} 
                    onChange={(e) => updateEducation(record.id, 'endYear', e.target.value ? parseInt(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Status *</label>
                  <select 
                    value={record.academicStatus} 
                    onChange={(e) => updateEducation(record.id, 'academicStatus', e.target.value)} 
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="Currently Studying">Currently Studying</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Discontinued">Discontinued</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Sem (If Studying)</label>
                  <input 
                    type="number" 
                    value={record.currentSemester} 
                    onChange={(e) => updateEducation(record.id, 'currentSemester', e.target.value ? parseInt(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grading System *</label>
                  <select 
                    value={record.gradingSystem} 
                    onChange={(e) => updateEducation(record.id, 'gradingSystem', e.target.value)} 
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="">Select System</option>
                    <option value="CGPA/10">CGPA / 10</option>
                    <option value="CGPA/4">CGPA / 4</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Grade">Grade</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={record.score} 
                    onChange={(e) => updateEducation(record.id, 'score', e.target.value ? parseFloat(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scale Max</label>
                  <input 
                    type="number" 
                    value={record.scale} 
                    onChange={(e) => updateEducation(record.id, 'scale', e.target.value ? parseFloat(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backlogs *</label>
                  <input 
                    type="number" 
                    value={record.backlogs} 
                    onChange={(e) => updateEducation(record.id, 'backlogs', e.target.value ? parseInt(e.target.value) : '')} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="e.g. 0"
                  />
                </div>
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
