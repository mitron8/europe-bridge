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
      <h3 className="text-xl font-extrabold text-germany-black font-display mb-6">Language & Standardized Tests</h3>

      {/* ENGLISH TESTS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-extrabold text-germany-black font-display">English Proficiency Tests</h4>
          <button onClick={addEnglishTest} className="px-3 py-1.5 rounded-xl bg-[#EBE7E0] hover:bg-germany-black hover:text-white font-extrabold text-xs transition-all text-germany-black cursor-pointer">
            + Add Test
          </button>
        </div>
        
        {data.englishTests.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold bg-gray-50/50">No English tests added.</div>
        ) : (
          <div className="space-y-6">
            {data.englishTests.map((test, index) => (
              <div key={test.id} className="border border-gray-150 rounded-2xl p-6 bg-gray-50/50 relative shadow-sm">
                <button onClick={() => removeEnglishTest(test.id)} className="absolute top-4 right-4 text-germany-red hover:underline text-xs font-bold cursor-pointer">Remove</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Test Type *</label>
                    <select value={test.testType} onChange={(e) => updateEnglishTest(test.id, 'testType', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]">
                      <option value="">Select Test</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="PTE">PTE</option>
                      <option value="Duolingo">Duolingo</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Test Date *</label>
                    <input type="date" value={test.testDate} onChange={(e) => updateEnglishTest(test.id, 'testDate', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Overall</label>
                    <input type="number" step="0.5" value={test.overallScore} onChange={(e) => updateEnglishTest(test.id, 'overallScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Reading</label>
                    <input type="number" step="0.5" value={test.readingScore} onChange={(e) => updateEnglishTest(test.id, 'readingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Listening</label>
                    <input type="number" step="0.5" value={test.listeningScore} onChange={(e) => updateEnglishTest(test.id, 'listeningScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Speaking</label>
                    <input type="number" step="0.5" value={test.speakingScore} onChange={(e) => updateEnglishTest(test.id, 'speakingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Writing</label>
                    <input type="number" step="0.5" value={test.writingScore} onChange={(e) => updateEnglishTest(test.id, 'writingScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GERMAN LANGUAGE */}
      <div className="mb-10">
        <h4 className="text-md font-extrabold text-germany-black font-display mb-4">German Language Proficiency</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm animate-fade-in">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Proficiency Level *</label>
            <select name="germanLevel" value={data.germanLevel} onChange={handleGermanChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]">
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
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Certificate Type (If Any)</label>
            <select name="germanCertificateType" value={data.germanCertificateType} onChange={handleGermanChange} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]">
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
          <h4 className="text-md font-extrabold text-germany-black font-display">Standardized Tests (GRE/GMAT)</h4>
          <button onClick={addStandardizedTest} className="px-3 py-1.5 rounded-xl bg-[#EBE7E0] hover:bg-germany-black hover:text-white font-extrabold text-xs transition-all text-germany-black cursor-pointer">
            + Add Test
          </button>
        </div>

        {data.standardizedTests.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold bg-gray-50/50">No standardized tests added.</div>
        ) : (
          <div className="space-y-6">
            {data.standardizedTests.map((test) => (
              <div key={test.id} className="border border-gray-150 rounded-2xl p-6 bg-gray-50/50 relative shadow-sm">
                <button onClick={() => removeStandardizedTest(test.id)} className="absolute top-4 right-4 text-germany-red hover:underline text-xs font-bold cursor-pointer">Remove</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Test Type *</label>
                    <select value={test.testType} onChange={(e) => updateStandardizedTest(test.id, 'testType', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0]">
                      <option value="">Select Test</option>
                      <option value="GRE">GRE</option>
                      <option value="GMAT">GMAT</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Test Date *</label>
                    <input type="date" value={test.testDate} onChange={(e) => updateStandardizedTest(test.id, 'testDate', e.target.value)} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Overall Score</label>
                    <input type="number" step="0.1" value={test.overallScore} onChange={(e) => updateStandardizedTest(test.id, 'overallScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Quant Score</label>
                    <input type="number" step="0.1" value={test.quantScore} onChange={(e) => updateStandardizedTest(test.id, 'quantScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">Verbal Score</label>
                    <input type="number" step="0.1" value={test.verbalScore} onChange={(e) => updateStandardizedTest(test.id, 'verbalScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">AWA Score</label>
                    <input type="number" step="0.1" value={test.awaScore} onChange={(e) => updateStandardizedTest(test.id, 'awaScore', e.target.value ? parseFloat(e.target.value) : '')} className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all font-bold text-xs cursor-pointer text-gray-700 bg-white">Back</button>
        <button onClick={onNext} className="neu-btn-primary px-6 py-2.5 text-xs font-bold cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
}
