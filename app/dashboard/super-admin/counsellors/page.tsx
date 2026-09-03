"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Search, Plus, X, UserCheck, AlertCircle, MoreHorizontal, ChevronDown } from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type Counsellor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  assignedStudentCount: number;
};

type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
  counsellorId: string | null;
  counsellorFirstName: string | null;
  counsellorLastName: string | null;
};

export default function SuperAdminCounsellorPage() {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state - this toggles the popup when we want to add a new person
  // honestly might switch to a proper dialog primitive later but this works for now
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // gotta keep track of the form data here. maybe we should use a proper form library later if this gets big
  // like react-hook-form or formik... but 4 fields is fine in regular state
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // three-dot menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // assign student modal state
  const [assignModal, setAssignModal] = useState<{ counsellor: Counsellor } | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isFetchingStudents, setIsFetchingStudents] = useState(false);

  const fetchCounsellors = async () => {
    setIsLoading(true);
    setError('');
    try {
      // fetching the list. make sure we include credentials or the backend throws a fit about missing cookies
      // the api gives us the derived counts now too so we don't need to manually match them up
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch counsellors');
      }
      const data = await response.json();
      setCounsellors(data);
      
      setAssignModal(prev => {
        if (!prev) return null;
        const updatedC = data.find((c: Counsellor) => c.id === prev.counsellor.id);
        return updatedC ? { counsellor: updatedC } : prev;
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async () => {
    setIsFetchingStudents(true);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/students`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch {
      // ignore
    } finally {
      setIsFetchingStudents(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
  }, []);

  // close the three-dot menu if user clicks outside of it
  // kinda standard hook pattern. could abstract this into a useClickOutside hook but 
  // we only have one menu on this page anyway
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAssignModal = (counsellor: Counsellor) => {
    setActiveMenu(null);
    setAssignModal({ counsellor });
    setSelectedStudentId('');
    setAssignError('');
    setIsSelectOpen(false);
    setIsAddingStudent(false);
    
    fetchStudents();
  };

  const handleAssignStudent = async () => {
    if (!selectedStudentId || !assignModal) return;
    setIsAssigning(true);
    setAssignError('');

    try {
      // hitting the generic assign endpoint. it handles upserts magically
      // so if they already have one it just overwrites it safely.
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/assign-counsellor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          studentId: selectedStudentId,
          counsellorId: assignModal.counsellor.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to assign student');
      }

      setIsAddingStudent(false);
      setSelectedStudentId('');
      
      // refresh both lists so modal is updated and background list is updated natively from DB
      await fetchStudents();
      await fetchCounsellors();
    } catch (err: any) {
      setAssignError(err.message || 'Failed to assign student');
    } finally {
      setIsAssigning(false);
    }
  };

  const handleCreateCounsellor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // pinging the backend to create the user
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // nest.js sometimes returns an array of validation errors, so we gotta join them up cleanly
        let errorMsg = data.message;
        if (Array.isArray(data.message)) {
          errorMsg = data.message.join(', ');
        }
        throw new Error(errorMsg || 'Failed to create counsellor');
      }

      // success! close the modal and wipe the form so it's fresh for next time
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      fetchCounsellors();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-germany-gold" />
              <span>Super Admin Management</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black">
              Counsellors
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500">
              Manage platform counsellor accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="neu-card p-6 bg-white space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search counsellors..."
              className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="neu-btn-primary py-2 px-4 text-xs font-extrabold flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add More Counsellors</span>
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
            Loading counsellors...
          </div>
        ) : counsellors.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
            <UserCheck className="w-8 h-8 text-gray-300" />
            <span>No counsellors found.</span>
          </div>
        ) : (
          <div className="overflow-x-auto" ref={menuRef}>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EBE7E0] text-gray-400 font-extrabold uppercase text-[10px]">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Assigned Students</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7E0] font-bold text-germany-black">
                {counsellors.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FDFBF7] relative">
                    <td className="py-3.5">{c.firstName} {c.lastName}</td>
                    <td className="py-3.5 text-gray-500">{c.email}</td>
                    <td className="py-3.5 text-gray-600">{c.assignedStudentCount}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 capitalize">
                        {c.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-right relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === c.id ? null : c.id)}
                        className="p-1.5 rounded-lg hover:bg-[#EBE7E0] transition-colors text-gray-400 hover:text-germany-black"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {activeMenu === c.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white neu-card shadow-lg z-30 py-1 rounded-xl border border-[#EBE7E0]">
                          <button
                            onClick={() => openAssignModal(c)}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-germany-black hover:bg-[#FDFBF7] transition-colors"
                          >
                            Assign Student
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] neu-card w-full max-w-md p-6 relative border-none animate-in fade-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-xl font-display font-extrabold text-germany-black mb-6">Create Counsellor</h2>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
            
            <form onSubmit={handleCreateCounsellor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Counsellor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Student Modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] neu-card w-full max-w-md p-6 relative border-none animate-in fade-in duration-200">
            <button
              onClick={() => setAssignModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-display font-extrabold text-germany-black mb-5">Assign Student</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Counsellor</p>
                  <p className="text-sm font-extrabold text-germany-black">
                    {assignModal.counsellor.firstName} {assignModal.counsellor.lastName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Assigned Students</p>
                  <p className="text-sm font-bold text-gray-600">
                    {assignModal.counsellor.assignedStudentCount}
                  </p>
                </div>
              </div>

              {!isAddingStudent ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Assigned Students
                    </label>
                    <div className="max-h-48 overflow-y-auto border border-[#EBE7E0] rounded-xl bg-white">
                      {isFetchingStudents ? (
                        <div className="p-4 text-center text-xs text-gray-400 font-bold">Loading...</div>
                      ) : (() => {
                        const assignedStudents = students.filter(s => s.counsellorId === assignModal.counsellor.id);
                        if (assignedStudents.length === 0) {
                          return <div className="p-4 text-center text-xs text-gray-400 font-bold">No students assigned yet.</div>;
                        }
                        return (
                          <div className="divide-y divide-[#EBE7E0]">
                            {assignedStudents.map(s => (
                              <div key={s.userId} className="p-3">
                                <p className="text-xs font-bold text-germany-black">{s.firstName} {s.lastName}</p>
                                <p className="text-[10px] font-bold text-gray-500">{s.email}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsAddingStudent(true)}
                      className="w-full neu-btn-primary py-3 text-sm font-extrabold"
                    >
                      + Add Student
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Select Student
                    </label>
                    <div className="relative">
                      {/* Custom select trigger button */}
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0] text-germany-black text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-germany-red/30"
                      >
                        <span>
                          {selectedStudentId
                            ? (() => {
                                const s = students.find((x) => x.userId === selectedStudentId);
                                const currentCounsellorName = s?.counsellorFirstName
                                  ? `${s.counsellorFirstName} ${s.counsellorLastName}`
                                  : 'Unassigned';
                                return s ? `${s.firstName} ${s.lastName} — ${currentCounsellorName}` : '— Choose a student —';
                              })()
                            : '— Choose a student —'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Custom select options dropdown */}
                      {isSelectOpen && (
                        <div className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-[#FDFBF7] rounded-2xl shadow-[6px_6px_25px_rgba(210,205,195,0.45)] z-50 py-1 border border-[#EBE7E0]/40">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStudentId('');
                              setIsSelectOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-400 hover:bg-[#EBE7E0] transition-colors"
                          >
                            — Choose a student —
                          </button>
                          {students.filter(s => s.counsellorId !== assignModal.counsellor.id).map((s) => {
                            const currentCounsellorName = s.counsellorFirstName
                              ? `${s.counsellorFirstName} ${s.counsellorLastName}`
                              : 'Unassigned';
                            return (
                              <button
                                key={s.userId}
                                type="button"
                                onClick={() => {
                                  setSelectedStudentId(s.userId);
                                  setIsSelectOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                                  selectedStudentId === s.userId
                                    ? 'bg-germany-red text-white'
                                    : 'text-germany-black hover:bg-[#EBE7E0]'
                                }`}
                              >
                                {s.firstName} {s.lastName} — {currentCounsellorName}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {assignError && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{assignError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setIsAddingStudent(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 text-sm font-extrabold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssignStudent}
                      disabled={!selectedStudentId || isAssigning}
                      className="flex-1 neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
                    >
                      {isAssigning ? 'Assigning...' : 'Confirm'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
