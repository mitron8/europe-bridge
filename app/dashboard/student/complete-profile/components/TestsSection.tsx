import React from 'react';
import { ProfileData, EnglishTest, StandardizedTest } from '../types';


interface Props {
  data: ProfileData;
  onChange: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function TestsSection({ data, onChange, onNext, onPrev }: Props) {
  
  // English Tests
  const addEnglishTest = () => {
    const newRecord: EnglishTest = {
      id: crypto.randomUUID(),
      testType: '',
      testDate: '',
      overallScore: '',
      readingScore: '',
      listeningScore: '',
      speakingScore: '',
      writingScore: ''
    };
    onChange({ englishTests: [...data.englishTests, newRecord] });
  };

  const updateEnglishTest = (id: string, field: keyof EnglishTest, value: any) => {
    const updated = data.englishTests.map(record => record.id === id ? { ...record, [field]: value } : record);
    onChange({ englishTests: updated });
  };

  const removeEnglishTest = (id: string) => {
    onChange({ englishTests: data.englishTests.filter(record => record.id !== id) });
  };

  // Standardized Tests
  const addStandardizedTest = () => {
    const newRecord: StandardizedTest = {
      id: crypto.randomUUID(),
      testType: '',
      testDate: '',
      overallScore: '',
      quantScore: '',
      verbalScore: '',
      awaScore: ''
    };
    onChange({ standardizedTests: [...data.standardizedTests, newRecord] });
  };

  const updateStandardizedTest = (id: string, field: keyof StandardizedTest, value: any) => {
    const updated = data.standardizedTests.map(record => record.id === id ? { ...record, [field]: value } : record);
    onChange({ standardizedTests: updated });
  };

  const removeStandardizedTest = (id: string) => {
    onChange({ standardizedTests: data.standardizedTests.filter(record => record.id !== id) });
  };

  const handleGermanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Language & Standardized Tests</h3>

      {/* ENGLISH TESTS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold">English Proficiency Tests</h4>
          <button onClick={addEnglishTest} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded border border-blue-200">
            + Add Test
          </button>
        </div>
        
        {data.englishTests.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded text-gray-500">No English tests added.</div>
        ) : (
          <div className="space-y-6">
            {data.englishTests.map((test, index) => (
              <div key={test.id} className="border p-4 rounded bg-gray-50 relative">
                <button onClick={() => removeEnglishTest(test.id)} className="absolute top-4 right-4 text-red-500 text-sm">Remove</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Test Type *</label>
                    <select value={test.testType} onChange={(e) => updateEnglishTest(test.id, 'testType', e.target.value)} className="w-full p-2 border rounded bg-white">
                      <option value="">Select Test</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="PTE">PTE</option>
                      <option value="Duolingo">Duolingo</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Test Date *</label>
                    <input type="date" value={test.testDate} onChange={(e) => updateEnglishTest(test.id, 'testDate', e.target.value)} className="w-full p-2 border rounded bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Overall</label>
                    <input type="number" step="0.5" value={test.overallScore} onChange={(e) => updateEnglishTest(test.id, 'overallScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reading</label>
                    <input type="number" step="0.5" value={test.readingScore} onChange={(e) => updateEnglishTest(test.id, 'readingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Listening</label>
                    <input type="number" step="0.5" value={test.listeningScore} onChange={(e) => updateEnglishTest(test.id, 'listeningScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Speaking</label>
                    <input type="number" step="0.5" value={test.speakingScore} onChange={(e) => updateEnglishTest(test.id, 'speakingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Writing</label>
                    <input type="number" step="0.5" value={test.writingScore} onChange={(e) => updateEnglishTest(test.id, 'writingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GERMAN LANGUAGE */}
      <div className="mb-10">
        <h4 className="text-xl font-bold mb-4">German Language Proficiency</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-gray-50">
          <div>
            <label className="block text-sm font-medium mb-1">Proficiency Level *</label>
            <select name="germanLevel" value={data.germanLevel} onChange={handleGermanChange} className="w-full p-2 border rounded bg-white">
              <option value="">Select Level</option>
              <option value="None">None</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Certificate Type (If Any)</label>
            <select name="germanCertificateType" value={data.germanCertificateType} onChange={handleGermanChange} className="w-full p-2 border rounded bg-white">
              <option value="">Select Certificate</option>
              <option value="None">None</option>
              <option value="Goethe">Goethe</option>
              <option value="TELC">TELC</option>
              <option value="TestDaF">TestDaF</option>
              <option value="DSH">DSH</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* STANDARDIZED TESTS */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold">Standardized Tests (GRE/GMAT)</h4>
          <button onClick={addStandardizedTest} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded border border-blue-200">
            + Add Test
          </button>
        </div>

        {data.standardizedTests.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded text-gray-500">No standardized tests added.</div>
        ) : (
          <div className="space-y-6">
            {data.standardizedTests.map((test) => (
              <div key={test.id} className="border p-4 rounded bg-gray-50 relative">
                <button onClick={() => removeStandardizedTest(test.id)} className="absolute top-4 right-4 text-red-500 text-sm">Remove</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Test Type *</label>
                    <select value={test.testType} onChange={(e) => updateStandardizedTest(test.id, 'testType', e.target.value)} className="w-full p-2 border rounded bg-white">
                      <option value="">Select Test</option>
                      <option value="GRE">GRE</option>
                      <option value="GMAT">GMAT</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Test Date *</label>
                    <input type="date" value={test.testDate} onChange={(e) => updateStandardizedTest(test.id, 'testDate', e.target.value)} className="w-full p-2 border rounded bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Overall Score</label>
                    <input type="number" step="0.1" value={test.overallScore} onChange={(e) => updateStandardizedTest(test.id, 'overallScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quant Score</label>
                    <input type="number" step="0.1" value={test.quantScore} onChange={(e) => updateStandardizedTest(test.id, 'quantScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Verbal Score</label>
                    <input type="number" step="0.1" value={test.verbalScore} onChange={(e) => updateStandardizedTest(test.id, 'verbalScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">AWA Score</label>
                    <input type="number" step="0.1" value={test.awaScore} onChange={(e) => updateStandardizedTest(test.id, 'awaScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">Back</button>
        <button onClick={onNext} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Save & Continue</button>
      </div>
    </div>
  );
}
